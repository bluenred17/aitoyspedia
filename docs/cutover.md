# Panduan pergantian: aplikasi Express ke situs statis

Dokumen ini untuk **pengelola**. Semua perintah di sini **belum pernah dijalankan oleh Claude di servermu**, jadi
cocokkan setiap langkah bertanda **CEK** dengan keluaran yang kamu lihat sebelum mengubah apa pun.

Tempat menjalankan perintah ditandai di tiap blok: **Server** (bash di Ubuntu) atau **Windows** (PowerShell).

## Fakta tentang servermu (dari keluaran Langkah 0 yang kamu kirim)

- Satu blok `server` 443 dengan `server_name ai.toyspedia.fun aipedia.toyspedia.fun toyspedia.fun www.toyspedia.fun`
  meneruskan **keempat nama** ke `127.0.0.1:3000`. Blok port 80 memakai empat nama yang sama.
- Port 3000 dilayani proses `node` dari `ai-encyclopedia.service` ("AI Encyclopedia (Node.js)"). Layanan ini melayani
  keempat nama, bukan hanya `ai.toyspedia.fun`.
- Sertifikat `live/ai.toyspedia.fun` dipakai untuk keempat nama. Ada juga proses `python` di port 8000 dan `opencode`
  yang tidak berkaitan dengan situs ini; jangan disentuh.

Akibatnya: **jangan mengganti isi blok lama.** Yang dilakukan adalah memisahkan `ai.toyspedia.fun` ke blok sendiri
(Langkah 5). Tiga nama lain tetap dilayani Express sampai kamu memutuskan nasibnya.

## Langkah 0: kumpulkan fakta tambahan (hanya membaca)

Pastikan folder dan data aplikasi lama tidak berada di folder yang akan dipakai situs baru.

```bash
# Server: di mana aplikasi lama berjalan dan siapa pemiliknya
systemctl cat ai-encyclopedia.service
systemctl show ai-encyclopedia.service -p User -p WorkingDirectory -p ExecStart
ls -ld /var/www/* 2>&1
```

**CEK:** `WorkingDirectory` dan lokasi database aplikasi lama **tidak boleh** berada di
`/var/www/ai-encyclopedia-site`. Folder itu dipilih karena namanya berbeda dari `ai-encyclopedia`, tetapi
pastikan sendiri. Catat juga jenis dan lokasi database aplikasi lama untuk Langkah 1.

## Langkah 1: cadangkan

Data akun, rating, favorit, komentar, dan tayangan **tidak dipindahkan** ke situs baru. Cadangan inilah satu-satunya
salinannya. Cadangan disimpan di home-mu sendiri supaya semua perintah bisa jalan tanpa shell root.

```bash
# Server
mkdir -p ~/backup-ai-toyspedia

# Konfigurasi nginx dan sertifikat
sudo tar czf ~/backup-ai-toyspedia/nginx-$(date +%F).tar.gz /etc/nginx
sudo chown "$USER": ~/backup-ai-toyspedia/nginx-$(date +%F).tar.gz

# Folder aplikasi (CEK: ganti dengan WorkingDirectory dari Langkah 0)
sudo tar czf ~/backup-ai-toyspedia/app-$(date +%F).tar.gz <PATH_APLIKASI_EXPRESS>
sudo chown "$USER": ~/backup-ai-toyspedia/app-$(date +%F).tar.gz
```

Database: **CEK** jenisnya, lalu pakai satu dari ini. Pengalihan `>` dijalankan oleh shell-mu ke folder milikmu
sendiri, jadi aman.

```bash
# SQLite (hentikan penulisan sebentar bila memungkinkan, lalu salin file-nya)
sudo cp -a <PATH_FILE_DB> ~/backup-ai-toyspedia/ && sudo chown "$USER": ~/backup-ai-toyspedia/*

# PostgreSQL
sudo -u postgres pg_dump <NAMA_DB> | gzip > ~/backup-ai-toyspedia/db-$(date +%F).sql.gz

# MySQL / MariaDB
sudo mysqldump <NAMA_DB> | gzip > ~/backup-ai-toyspedia/db-$(date +%F).sql.gz
```

Pastikan tidak ada berkas berukuran 0 (`ls -lh ~/backup-ai-toyspedia`) sebelum lanjut, dan salin juga ke komputermu
(misalnya dengan `scp`), karena cadangan yang hanya ada di server yang sama tidak melindungi dari kerusakan server.

## Langkah 2: siapkan pengguna, folder, dan kunci deploy

Pengguna `deploy` tidak punya `sudo`. Folder rilis dimiliki `deploy`, tetapi **kunci SSH-nya dimiliki root**, supaya
kunci yang bocor tidak bisa menulis ulang `authorized_keys` dan bertahan. Pembatasan ini nyata, tapi tidak mutlak:
pengguna `deploy` tetap punya shell, bisa menulis ke `/tmp` dan home-nya sendiri, dan bisa membaca file yang bisa
dibaca semua pengguna.

**Server:**

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo mkdir -p /var/www/ai-encyclopedia-site/releases
sudo chown -R deploy:deploy /var/www/ai-encyclopedia-site
```

**Windows (PowerShell):** buat pasangan kunci **di luar folder proyek**. Tanda kutip `'""'` diperlukan karena
Windows PowerShell 5.1 membuang string kosong biasa.

```powershell
ssh-keygen -t ed25519 -N '""' -C "github-actions-ai-encyclopedia" -f "$HOME\.ssh\ai-encyclopedia-deploy"
Get-Content "$HOME\.ssh\ai-encyclopedia-deploy.pub"
```

Di Linux atau macOS, perintahnya `ssh-keygen -t ed25519 -N "" -C "github-actions-ai-encyclopedia" -f ~/.ssh/ai-encyclopedia-deploy`.

**Server:** pasang kunci **publik** (satu baris dari `.pub`, bukan kunci privat). Opsi `restrict` mematikan pty dan
forwarding tetapi tetap mengizinkan `rsync` dan perintah aktivasi workflow. Ganti `PASTE_KUNCI_DI_SINI`.

```bash
sudo mkdir -p /home/deploy/.ssh
sudo tee /home/deploy/.ssh/authorized_keys >/dev/null <<'EOF'
restrict PASTE_KUNCI_DI_SINI
EOF
sudo chown root:root /home/deploy/.ssh /home/deploy/.ssh/authorized_keys
sudo chmod 755 /home/deploy/.ssh
sudo chmod 644 /home/deploy/.ssh/authorized_keys
sudo cat /home/deploy/.ssh/authorized_keys     # harus satu baris: restrict ssh-ed25519 AAAA...
```

**Windows:** uji (kali pertama SSH menanyakan fingerprint host; jawab `yes`).

```powershell
ssh -i "$HOME\.ssh\ai-encyclopedia-deploy" deploy@<HOST_SERVER> "echo berhasil"
```

**Server:** ambil baris known_hosts langsung dari server (tanpa `ssh-keyscan`, yang gagal di OpenSSH Windows lama
terhadap server Ubuntu 24.04). Ganti `<HOST_SERVER>` dengan nilai yang **sama persis** dengan secret `DEPLOY_HOST`.

```bash
echo "<HOST_SERVER> $(cut -d' ' -f1,2 /etc/ssh/ssh_host_ed25519_key.pub)"
```

**GitHub Secrets** (Settings → Secrets and variables → Actions → New repository secret):

| Secret | Isi |
|---|---|
| `DEPLOY_HOST` | Hostname atau IP server, sama persis dengan yang dipakai di baris known_hosts |
| `DEPLOY_USER` | `deploy` |
| `DEPLOY_SSH_KEY` | Seluruh isi kunci **privat** `ai-encyclopedia-deploy` (`Get-Content "$HOME\.ssh\ai-encyclopedia-deploy" -Raw \| Set-Clipboard`, lalu tempel) |
| `DEPLOY_KNOWN_HOSTS` | Satu baris dari perintah known_hosts di atas |

Setelah itu bersihkan clipboard (`Set-Clipboard -Value " "`). Jangan pernah menempel kunci privat ke chat, repo, atau
berkas di dalam folder proyek.

## Langkah 3: deploy pertama (belum mengubah situs yang tayang)

Dorong ke `main` (ini sekaligus meminta persetujuanmu atas push pertama). Workflow menjalankan semua tes, lalu
mengunggah ke `/var/www/ai-encyclopedia-site/releases/<sha>/` dan mengarahkan symlink `current`. Situs lama **belum
terpengaruh** karena nginx masih mengarah ke Express.

```bash
ls -la /var/www/ai-encyclopedia-site/
# Harapan: current -> /var/www/ai-encyclopedia-site/releases/<sha>
```

Jika `current` sudah ada sebagai **folder biasa** (bukan symlink), langkah aktivasi gagal karena `mv -T` tidak
menimpa folder. Hapus folder itu sekali, lalu jalankan ulang workflow.

## Langkah 4: uji di port sementara

Blok sementara ini hanya mendengarkan `127.0.0.1:8081`, jadi tidak menyentuh domain asli.

```bash
sudo tee /etc/nginx/conf.d/ai-encyclopedia-test.conf >/dev/null <<'EOF'
server {
    listen 127.0.0.1:8081;
    root /var/www/ai-encyclopedia-site/current;
    index index.html;
    add_header X-Robots-Tag "noindex" always;
    location / { try_files $uri $uri/ $uri.html =404; }
    error_page 404 /404.html;
}
EOF
sudo nginx -t && sudo systemctl reload nginx

curl -s http://127.0.0.1:8081/ | grep -o "<title>[^<]*</title>"          # harapan: AI Encyclopedia
curl -sI http://127.0.0.1:8081/skills/lemo-opuscar/ | head -1             # harapan: HTTP/1.1 200
curl -sI http://127.0.0.1:8081/ | grep -i x-robots-tag                    # harapan: noindex
curl -sI http://127.0.0.1:8081/pagefind/pagefind.js | grep -i content-type # harapan: javascript
```

## Langkah 5: pisahkan ai.toyspedia.fun ke blok sendiri

Berkas konfigurasimu adalah `/etc/nginx/sites-enabled/toyspedia.fun`. Karena empat nama berbagi satu blok, kamu
**mengeluarkan** `ai.toyspedia.fun` dari blok lama dan menambah berkas baru untuknya.

1. **Cadangkan dulu**, lalu keluarkan `ai.toyspedia.fun` dari **kedua** baris `server_name` di berkas lama (blok 443
   dan blok 80). Hasil akhirnya:

   ```
   server_name aipedia.toyspedia.fun toyspedia.fun www.toyspedia.fun;
   ```

   ```bash
   sudo cp -a /etc/nginx/sites-enabled/toyspedia.fun ~/backup-ai-toyspedia/toyspedia.fun.conf.bak
   sudo nano /etc/nginx/sites-enabled/toyspedia.fun
   ```

2. Buat berkas untuk situs baru dengan isi `deploy/nginx-ai-encyclopedia.conf` (blok 443 dan blok 80):

   ```bash
   sudo nano /etc/nginx/sites-available/ai.toyspedia.fun       # tempel isi deploy/nginx-ai-encyclopedia.conf
   sudo ln -s /etc/nginx/sites-available/ai.toyspedia.fun /etc/nginx/sites-enabled/ai.toyspedia.fun
   ```

   Blok baru memakai `listen [::]:443 ssl;` **tanpa** `ipv6only=on`. Blok lamamu sudah memakai opsi itu untuk
   alamat dan port yang sama, dan mengulanginya membuat `nginx -t` gagal.

3. Uji dan muat ulang. Muat ulang **hanya** bila `nginx -t` lulus:

   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

4. Verifikasi dari luar. Tiga nama lain **harus tetap berjalan seperti sebelumnya**:

   ```bash
   curl -sI https://ai.toyspedia.fun/ | head -1                          # HTTP/2 200 (situs baru)
   curl -sI https://ai.toyspedia.fun/ | grep -i x-robots-tag              # noindex
   curl -s  https://ai.toyspedia.fun/skills/582/ | grep -o 'url=[^"]*'    # url=/skills/lemo-opuscar/
   curl -sI http://ai.toyspedia.fun/ | head -1                            # 301 ke https
   curl -sI https://toyspedia.fun/ | head -1                              # tetap dari Express, bukan situs baru
   curl -sI https://www.toyspedia.fun/ | head -1
   curl -sI https://aipedia.toyspedia.fun/ | head -1
   ```

Redirect dari URL lama berupa **halaman HTML dengan `meta refresh`** (status 200), bukan 301. Browser mengikutinya
langsung, tetapi klien yang hanya membaca kode status tidak akan melihat pengalihan.

## Langkah 6: Express, jangan dihentikan dulu

**Jangan menghentikan `ai-encyclopedia.service`** selama `toyspedia.fun`, `www.toyspedia.fun`, atau
`aipedia.toyspedia.fun` masih dilayani olehnya. Layanan itu bukan hanya untuk `ai.toyspedia.fun`.

Putuskan dulu nasib tiga nama itu:

- **Tetap dipertahankan di aplikasi lama:** biarkan layanan berjalan. Tidak ada yang perlu dilakukan.
- **Dialihkan ke situs baru atau dipensiunkan:** ubah dulu blok lamanya (misalnya `return 301 https://ai.toyspedia.fun$request_uri;`),
  uji, lalu baru hentikan layanan.

```bash
# Hanya setelah tiga nama lain tidak lagi memakainya:
sudo systemctl stop ai-encyclopedia.service
sudo systemctl disable ai-encyclopedia.service       # opsional, agar tidak menyala saat reboot

# Bersihkan blok uji dari Langkah 4
sudo rm /etc/nginx/conf.d/ai-encyclopedia-test.conf && sudo nginx -t && sudo systemctl reload nginx
```

## Rollback

**Rilis situs baru bermasalah:** arahkan `current` ke rilis sebelumnya. Tiga rilis terakhir disimpan.

```bash
ls -1dt /var/www/ai-encyclopedia-site/releases/*          # terbaru di atas
sudo -u deploy bash -c '
  ln -sfn /var/www/ai-encyclopedia-site/releases/<SHA_SEBELUMNYA> /var/www/ai-encyclopedia-site/current.tmp &&
  mv -T /var/www/ai-encyclopedia-site/current.tmp /var/www/ai-encyclopedia-site/current'
```

Deploy berikutnya dari `main` tetap menggantikan `current`, jadi perbaiki masalahnya di repo juga.

**Pergantian secara keseluruhan bermasalah:** kembalikan blok lama dan hapus blok baru.

```bash
sudo rm /etc/nginx/sites-enabled/ai.toyspedia.fun
sudo cp -a ~/backup-ai-toyspedia/toyspedia.fun.conf.bak /etc/nginx/sites-enabled/toyspedia.fun
sudo nginx -t && sudo systemctl reload nginx
sudo systemctl start ai-encyclopedia.service        # bila sempat dihentikan
```

## Setelah beberapa hari

- Mesin pencari yang sudah mengindeks halaman lama akan melihat `noindex` dan menjatuhkannya dari indeks (itu
  disengaja). `robots.txt` memang tidak memblokir perayapan agar mereka bisa membaca tanda itu.
- Setelah yakin tidak perlu rollback, kamu bisa mengarsipkan folder dan database Express. Simpan cadangan di
  `~/backup-ai-toyspedia` dan salinannya di komputermu selama yang kamu butuhkan.
