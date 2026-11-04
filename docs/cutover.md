# Panduan pergantian: aplikasi Express ke situs statis

Dokumen ini untuk **pengelola**, dijalankan di server Ubuntu yang melayani `ai.toyspedia.fun`. Semua perintah di sini
**belum pernah dijalankan di servermu**. Saya (Claude) belum melihat konfigurasi nginx, daftar proses, atau jenis
database aplikasi lama, jadi bagian bertanda **CEK** harus dicocokkan dengan keluaran perintah di Langkah 0 sebelum
kamu mengubah apa pun. Jika keluarannya berbeda dari yang diasumsikan di sini, hentikan dan sesuaikan dulu.

Rencana mengikuti `docs/superpowers/specs/2026-11-04-ai-encyclopedia-design.md` §9. Deploy berjalan lewat GitHub
Actions (`.github/workflows/deploy.yml`) ke folder rilis, lalu nginx diarahkan ke symlink `current`.

## Yang kamu butuhkan

- Akses `sudo` ke server.
- Repo `https://github.com/bluenred17/aitoyspedia` dengan hak mengatur **Settings → Secrets and variables → Actions**.
- Port SSH server bisa dijangkau dari runner GitHub Actions. Jika firewall membatasi IP, runner GitHub memakai
  rentang IP yang luas dan berubah; pertimbangkan membuka port SSH untuk `deploy` saja, atau memakai runner sendiri.

## Langkah 0: kumpulkan fakta (hanya membaca)

```bash
# Konfigurasi nginx yang berlaku untuk domain ini. Simpan keluarannya untuk dibandingkan nanti.
sudo nginx -T 2>/dev/null | grep -n -B2 -A40 "server_name ai.toyspedia.fun" > ~/nginx-ai-before.txt
cat ~/nginx-ai-before.txt

# Siapa yang mendengarkan port aplikasi (CEK: port yang di-proxy nginx, misalnya 3000 atau 8080)
sudo ss -ltnp

# Bagaimana aplikasi Express dijalankan (CEK: salah satu dari ini)
pm2 ls 2>/dev/null
systemctl list-units --type=service --state=running | grep -i -E "node|express|toys"
```

Catat: (1) path folder aplikasi Express, (2) nama proses atau service-nya, (3) jenis dan lokasi databasenya, (4) apakah
ada proses lain yang memakai nginx atau port yang sama. Hanya blok `ai.toyspedia.fun` yang boleh berubah.

## Langkah 1: cadangkan

Data akun, rating, favorit, komentar, dan tayangan **tidak dipindahkan** ke situs baru. Cadangan inilah satu-satunya
salinannya.

```bash
sudo mkdir -p /root/backup-ai-toyspedia && cd /root/backup-ai-toyspedia

# Konfigurasi nginx
sudo cp -a /etc/nginx /root/backup-ai-toyspedia/nginx-$(date +%F)

# Folder aplikasi (CEK: ganti dengan path dari Langkah 0)
sudo tar czf app-$(date +%F).tar.gz <PATH_APLIKASI_EXPRESS>
```

Database: **CEK** jenisnya dulu, lalu pakai perintah yang sesuai.

```bash
# SQLite: salin file databasenya
sudo cp -a <PATH_FILE_DB>.sqlite /root/backup-ai-toyspedia/

# PostgreSQL
sudo -u postgres pg_dump <NAMA_DB> | gzip > /root/backup-ai-toyspedia/db-$(date +%F).sql.gz

# MySQL / MariaDB
sudo mysqldump <NAMA_DB> | gzip > /root/backup-ai-toyspedia/db-$(date +%F).sql.gz
```

Pastikan berkas cadangan tidak kosong (`ls -lh /root/backup-ai-toyspedia`) sebelum lanjut.

## Langkah 2: siapkan pengguna dan folder deploy

Pengguna `deploy` tidak punya `sudo` dan hanya memiliki `/var/www/ai-encyclopedia`. Itu yang membatasi kunci SSH-nya
agar hanya bisa menulis ke folder tersebut.

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo mkdir -p /var/www/ai-encyclopedia/releases
sudo chown -R deploy:deploy /var/www/ai-encyclopedia
```

Buat pasangan kunci **di komputermu**, bukan di server, dan jangan menyimpan kunci privatnya di repo:

```bash
ssh-keygen -t ed25519 -N "" -C "github-actions-ai-encyclopedia" -f ./deploy_key
```

Pasang kunci publik di server. Opsi `restrict` mematikan pty, port forwarding, dan agent forwarding, tetapi tetap
mengizinkan `rsync` dan perintah aktivasi yang dipakai workflow.

```bash
sudo -u deploy mkdir -p /home/deploy/.ssh
sudo -u deploy chmod 700 /home/deploy/.ssh
echo "restrict $(cat deploy_key.pub)" | sudo -u deploy tee /home/deploy/.ssh/authorized_keys
sudo -u deploy chmod 600 /home/deploy/.ssh/authorized_keys
```

Catat fingerprint host server dari **server itu sendiri**, lalu bandingkan dengan yang kamu dapat dari komputermu.
Ini yang mencegah workflow tertipu server palsu (workflow memakai `StrictHostKeyChecking=yes`).

```bash
# Di server:
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub

# Di komputermu (fingerprint harus sama dengan yang di atas):
ssh-keyscan -t ed25519 <HOST_SERVER> > known_hosts.txt
ssh-keygen -lf known_hosts.txt
```

Isi **GitHub Secrets** (Settings → Secrets and variables → Actions → New repository secret):

| Secret | Isi |
|---|---|
| `DEPLOY_HOST` | Hostname atau IP server |
| `DEPLOY_USER` | `deploy` |
| `DEPLOY_SSH_KEY` | Seluruh isi berkas `deploy_key` (kunci privat) |
| `DEPLOY_KNOWN_HOSTS` | Seluruh isi berkas `known_hosts.txt` |

Setelah itu **hapus** `deploy_key` dan `known_hosts.txt` dari komputermu, atau simpan di password manager.

## Langkah 3: deploy pertama (belum mengubah situs yang tayang)

Dorong ke `main` (ini sekaligus meminta persetujuanmu atas push pertama). Workflow menjalankan semua tes, lalu
mengunggah ke `/var/www/ai-encyclopedia/releases/<sha>/` dan mengarahkan symlink `current`. Situs lama **belum
terpengaruh** karena nginx masih mengarah ke Express.

```bash
ls -la /var/www/ai-encyclopedia/
# Harapan: current -> /var/www/ai-encyclopedia/releases/<sha>
```

Jika `current` sudah ada sebagai **folder biasa** (bukan symlink), langkah aktivasi workflow gagal karena `mv -T` tidak
menimpa folder. Hapus folder itu sekali, lalu jalankan ulang workflow.

## Langkah 4: uji di port sementara

Tambahkan blok server sementara agar kamu bisa mencoba situs baru tanpa menyentuh domain asli. File ini terpisah,
sehingga mudah dihapus.

```bash
sudo tee /etc/nginx/conf.d/ai-encyclopedia-test.conf >/dev/null <<'EOF'
server {
    listen 127.0.0.1:8081;
    root /var/www/ai-encyclopedia/current;
    index index.html;
    add_header X-Robots-Tag "noindex" always;
    location / { try_files $uri $uri/ $uri.html =404; }
    error_page 404 /404.html;
}
EOF
sudo nginx -t && sudo systemctl reload nginx

curl -s http://127.0.0.1:8081/ | grep -o "<title>[^<]*</title>"     # harapan: AI Encyclopedia
curl -sI http://127.0.0.1:8081/skills/lemo-opuscar/ | head -1       # harapan: HTTP/1.1 200
curl -sI http://127.0.0.1:8081/ | grep -i x-robots-tag              # harapan: noindex
```

## Langkah 5: arahkan domain ke situs baru

Buka berkas konfigurasi yang memuat blok `server_name ai.toyspedia.fun` (lihat `~/nginx-ai-before.txt`). **CEK**:
yang diganti hanya arahan yang menghubungkan domain ke Express. Baris `listen` dan `ssl_certificate*` dari certbot
**tetap**. Isi pengganti ada di `deploy/nginx-ai-encyclopedia.conf` (`root`, `try_files`, `error_page`, dan
`X-Robots-Tag`).

```bash
sudo nano <BERKAS_NGINX_DOMAIN_INI>     # ganti arahan proxy ke Express dengan isi acuan
sudo nginx -t                           # harus "syntax is ok" dan "test is successful"
sudo systemctl reload nginx             # hanya jalankan jika nginx -t lulus
```

Verifikasi dari luar:

```bash
curl -sI https://ai.toyspedia.fun/ | head -1                        # HTTP/2 200
curl -sI https://ai.toyspedia.fun/ | grep -i x-robots-tag            # noindex
curl -s https://ai.toyspedia.fun/skills/582/ | grep -o 'url=[^"]*'   # url=/skills/lemo-opuscar/
curl -s https://ai.toyspedia.fun/skills/lemo-opuscar/ | grep -o "<title>[^<]*</title>"
```

Redirect dari URL lama berupa **halaman HTML dengan `meta refresh`** (status 200), bukan 301. Browser mengikutinya
langsung, tetapi klien yang hanya membaca kode status tidak akan melihat pengalihan.

## Langkah 6: hentikan Express (setelah situs baru terbukti)

Tunggu sampai kamu yakin situs baru benar, lalu hentikan **hanya** proses aplikasi lama (CEK nama dari Langkah 0).
Jangan menghapus folder aplikasi atau database sebelum kamu siap, karena itu jalur rollback.

```bash
pm2 stop <NAMA_PROSES>        # atau:
sudo systemctl stop <NAMA_SERVICE>
sudo systemctl disable <NAMA_SERVICE>    # opsional, agar tidak menyala saat reboot

# Bersihkan blok uji dari Langkah 4
sudo rm /etc/nginx/conf.d/ai-encyclopedia-test.conf && sudo nginx -t && sudo systemctl reload nginx
```

## Rollback

**Rilis situs baru bermasalah** (masih memakai situs statis): arahkan `current` ke rilis sebelumnya. Tiga rilis
terakhir disimpan.

```bash
ls -1dt /var/www/ai-encyclopedia/releases/*          # terbaru di atas
sudo -u deploy bash -c '
  ln -sfn /var/www/ai-encyclopedia/releases/<SHA_SEBELUMNYA> /var/www/ai-encyclopedia/current.tmp &&
  mv -T /var/www/ai-encyclopedia/current.tmp /var/www/ai-encyclopedia/current'
```

Deploy berikutnya dari `main` tetap menggantikan `current`, jadi perbaiki masalahnya di repo juga.

**Pergantian secara keseluruhan bermasalah** (kembali ke Express): pulihkan nginx dan nyalakan aplikasi lama.

```bash
sudo cp /root/backup-ai-toyspedia/nginx-<TANGGAL>/<BERKAS_NGINX_DOMAIN_INI> /etc/nginx/<LOKASI_ASLI>
sudo nginx -t && sudo systemctl reload nginx
pm2 start <NAMA_PROSES>       # atau: sudo systemctl start <NAMA_SERVICE>
```

## Setelah beberapa hari

- Mesin pencari yang sudah mengindeks halaman lama akan melihat `noindex` dan menjatuhkannya dari indeks (itu
  disengaja). `robots.txt` memang tidak memblokir perayapan agar mereka bisa membaca tanda itu.
- Setelah yakin tidak perlu rollback, kamu bisa mengarsipkan atau menghapus folder dan database Express. Simpan
  cadangan di `/root/backup-ai-toyspedia` selama yang kamu butuhkan.
