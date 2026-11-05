---
title: "OpenSEO"
summary: "Alternatif open source untuk Semrush dan Ahrefs yang bayar sesuai pakai (kunci DataForSEO milik sendiri), dengan server MCP dan Agent Skills agar Claude Code dan agent lain bisa memakai data SEO langsung."
category: seo
tags: [seo, mcp, keyword-research, rank-tracking, backlink, site-audit, self-hosted, dataforseo]
surfaces: [claude-ai, claude-code, desktop]
source_url: "https://github.com/every-app/open-seo/blob/main/README.md"
repo: every-app/open-seo
stars: 26402
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
setup: |
  git clone https://github.com/every-app/open-seo.git
  cd open-seo
  export COMPOSE_FILE=deploy/standalone/compose.yaml
  cp deploy/standalone/.env.example deploy/standalone/.env
  # edit deploy/standalone/.env: set STORAGE_SECRET_KEY (random) and DATAFORSEO_API_KEY
  docker compose pull
  docker compose up -d
  docker compose logs -f init
---

# OpenSEO

> Alternatif open source untuk Semrush dan Ahrefs

OpenSEO adalah alat SEO untuk _rakyat_. Kalau alat seperti Semrush atau Ahrefs terlalu mahal atau membengkak, OpenSEO adalah alternatif bayar-sesuai-pakai yang benar-benar kamu kendalikan.

> Alat SEO serba ada untuk kamu dan agent AI kamu.

Hubungkan dengan agent apa pun seperti Claude Code, OpenClaw, atau Hermes. Tersedia skill siap pakai, tetapi kamu bisa membuat sendiri untuk menyesuaikan OpenSEO dengan kebutuhanmu.

![Riset kata kunci di OpenSEO](https://github.com/user-attachments/assets/8ebdc439-3e72-41ab-8bde-8cda771ef2e8)

> **Catatan dari situs ini:** (1) Perintah `setup` di atas bukan dari README, melainkan dari dokumen [SELF_HOSTING_DOCKER.md](https://github.com/every-app/open-seo/blob/main/docs/SELF_HOSTING_DOCKER.md) yang ditautkan README; itu cara self-hosting Docker. README sendiri hanya menautkan ke panduan, tidak memuat perintah. (2) Kamu butuh kunci API DataForSEO (layanan berbayar pihak ketiga). Tautan DataForSEO di README dan dokumennya memuat kode afiliasi (`?aff=255379`). (3) Jangan menaruh kunci asli di mana pun selain file `.env` milikmu sendiri.

## Versi hosted

Coba OpenSEO gratis di situs mereka. Kalau kamu ingin mendukung proyeknya, langganan hosted seharga $10/bulan.

[openseo.so](https://openseo.so)

### EveryApp

Host OpenSEO dan aplikasi open source lainnya di platform kami, EveryApp.

[Self-host di EveryApp dan beri bintang →](https://github.com/every-app/every-app)

## Mengapa memakai OpenSEO?

- MCP dan AI Skills terbaik di kelasnya.
- UI modern dan sederhana.
  - Alur kerja yang terfokus, bukan suite SEO yang membengkak dan rumit.
- Tanpa langganan.
  - Bawa kunci API DataForSEO sendiri dan bayar hanya untuk yang kamu pakai.
- Fork dan buat sendiri alat kustom lewat vibe coding.

## Alur kerja SEO utama

- Riset kata kunci
- Pelacakan peringkat
- Wawasan pesaing
- Backlink
- Audit situs
- AI Visibility

## MCP & Agent Skills OpenSEO

OpenSEO mengekspos server MCP agar agent AI seperti Claude Code, OpenClaw, dan Hermes bisa memakai data SEO kamu secara langsung. Agent Skills adalah alur kerja yang bisa dipakai ulang yang memandu agent melewati tugas SEO memakai MCP.

- [Setup ChatGPT web atau desktop](https://openseo.so/docs/chatgpt) (bekerja di paket ChatGPT Free dan berbayar)
- [Setup Codex](https://openseo.so/docs/codex-plugin)
- [Setup OpenSEO MCP](https://openseo.so/docs/mcp)
- [Setup OpenSEO Agent Skills](https://openseo.so/docs/skills/setup)

## Self-hosting

OpenSEO mendukung dua jalur self-hosting. Keduanya memakai akun email dan kata sandi: pengunjung pertama membuat akun admin, rekan tim bergabung lewat tautan undangan, dan klien MCP (Claude, ChatGPT, Codex, Cursor) masuk dengan akun yang sama.

- **Docker**: di server atau komputermu sendiri, dengan image siap pakai yang siap dalam hitungan detik. Bekerja dengan platform berbasis Compose seperti Coolify, Portainer, dan Dokploy. Lihat [`docs/SELF_HOSTING_DOCKER.md`](https://github.com/every-app/open-seo/blob/main/docs/SELF_HOSTING_DOCKER.md).
  - Masih memakai image satu-kontainer yang lama? Ia tetap mendapat pembaruan; [pindah ke setup baru](https://github.com/every-app/open-seo/blob/main/docs/SELF_HOSTING_DOCKER.md#move-from-the-old-docker-image) bila sudah siap, beserta datanya.
- **Cloudflare**: tanpa server yang harus dijalankan; satu perintah deploy menaruh OpenSEO di akun Cloudflare milikmu (bekerja di paket gratis). Lihat [`docs/SELF_HOSTING_CLOUDFLARE.md`](https://github.com/every-app/open-seo/blob/main/docs/SELF_HOSTING_CLOUDFLARE.md).

Untuk setup yang peduli keamanan, dua opsi lanjutan menggantikan akun dengan kontrol jaringanmu sendiri:

- **Cloudflare Access** di depan deploy Cloudflare, sehingga Cloudflare memeriksa setiap permintaan sebelum sampai ke OpenSEO. Lihat [`docs/SELF_HOSTING_CLOUDFLARE.md`](https://github.com/every-app/open-seo/blob/main/docs/SELF_HOSTING_CLOUDFLARE.md).
- **Tanpa sign-in di Docker**, di balik Tailscale, jaringan privat, atau proxy autentikasi milikmu sendiri. Lihat [Without sign-in](https://github.com/every-app/open-seo/blob/main/docs/SELF_HOSTING_DOCKER.md#without-sign-in-advanced).

Bagaimanapun, kamu butuh kunci API DataForSEO untuk mendapat data SEO. Lihat [`docs/DATAFORSEO_API_KEY.md`](https://github.com/every-app/open-seo/blob/main/docs/DATAFORSEO_API_KEY.md).

### Docker (dari dokumen yang ditautkan README)

Kamu butuh Docker Engine atau Docker Desktop dengan Compose, memori Docker minimal 4 GiB, dan [kunci API DataForSEO](https://github.com/every-app/open-seo/blob/main/docs/DATAFORSEO_API_KEY.md). Setiap perintah di bawah dijalankan dari root repositori:

```sh
git clone https://github.com/every-app/open-seo.git
cd open-seo
export COMPOSE_FILE=deploy/standalone/compose.yaml
cp deploy/standalone/.env.example deploy/standalone/.env
```

Di `deploy/standalone/.env`, setel `STORAGE_SECRET_KEY` ke nilai acak yang unik (misalnya keluaran `openssl rand -hex 32`) dan `DATAFORSEO_API_KEY` ke kunci kamu. Biarkan `BETTER_AUTH_URL=http://localhost:3001` untuk dipakai di mesin ini. Lalu jalankan OpenSEO:

```sh
docker compose pull
docker compose up -d
docker compose logs -f init
```

Tunggu `OpenSEO initialized and ready.`, buka <http://localhost:3001>, dan buat akun administrator. Pendaftaran tertutup begitu akun itu ada, jadi buat dulu sebelum menaruh instalasi di internet.

Untuk Coolify, Portainer, dan Dokploy: `deploy/standalone/compose.yaml` tidak membaca file lain dari repositori, sehingga bisa ditempel ke platform yang menjalankan file Compose, dengan variabel dari `deploy/standalone/.env.example`. Arahkan domain platform ke layanan `web` di port 80 dan setel `BETTER_AUTH_URL` ke alamat `https://` itu.

Variabel opsional penting: `OPENROUTER_API_KEY` (percakapan SAM, riset situs, ringkasan), `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` (menghubungkan Search Console dan Analytics dengan aplikasi OAuth Google milikmu), `CONTEXT_API_KEY` (rendering JavaScript untuk audit situs), `GOOGLE_MAPS_API_KEY` (peta Local SEO). Terapkan perubahan tanpa membangun ulang:

```sh
docker compose up -d --force-recreate init web crawl-gateway
```

Klien MCP terhubung ke `/mcp` dan masuk dengan akun OpenSEO kamu, atau memakai kunci API dari Settings.

Pembaruan: buat cadangan, lalu tarik image baru dan restart.

```sh
node scripts/celld/backup.mjs backup ./backups/before-update
docker compose pull
docker compose stop web crawl-gateway runtime
docker compose up -d
docker compose logs init
```

### Cloudflare (dari dokumen yang ditautkan README)

Prasyarat: Node 22.6 atau lebih baru dan pnpm (`corepack enable`), akun Cloudflare dengan R2 aktif (mengaktifkan R2 membutuhkan metode pembayaran, bahkan untuk tingkat gratisnya), dan akun DataForSEO.

```bash
git clone https://github.com/every-app/open-seo.git
cd open-seo
corepack enable
pnpm install

pnpm alchemy login
pnpm alchemy cloudflare bootstrap

cp deploy/.env.selfhost.example .env.selfhost
# set DATAFORSEO_API_KEY di .env.selfhost

pnpm deploy:selfhost --yes
```

Buka URL Worker yang dicetak di akhir deploy dan segera buat akun administrator: pendaftaran tertutup setelah akun pertama ada, dan sebelum itu siapa pun yang menemukan URL bisa mengklaim instalasi. Pembaruan: `git pull`, `pnpm install`, lalu `pnpm deploy:selfhost --yes`. Untuk menghapus semuanya: `pnpm alchemy destroy --env-file .env.selfhost --stage selfhost` (menghapus Workers dan sumber daya D1/KV/R2 termasuk datamu).

## Biaya

OpenSEO membutuhkan kunci API [DataForSEO](https://dataforseo.com/?aff=255379) agar kamu bisa mendapat data SEO. Kamu membayar mereka langsung saat self-hosting.

Lihat [openseo.so/pricing](https://openseo.so/pricing)

Saat self-hosting, biayamu akan sedikit lebih rendah daripada estimasi di situs mereka. Cara layanan hosted menghasilkan uang adalah mengenakan 28% ekstra untuk setiap permintaan ke DataForSEO.

## Pengembangan lokal

Lihat [`docs/LOCAL_DEVELOPMENT.md`](https://github.com/every-app/open-seo/blob/main/docs/LOCAL_DEVELOPMENT.md).

## Berkontribusi

Membuat issue yang jelas adalah cara berkontribusi terbaik.

Baca selengkapnya: [`docs/CONTRIBUTING.md`](https://github.com/every-app/open-seo/blob/main/docs/CONTRIBUTING.md)

Kami punya skill ini: `/simple-issue-description` yang membantu.

```sh
npx skills add every-app/open-seo --skill simple-issue-description
```

## Komunitas

Gabung Discord untuk mengobrol: [Discord](https://discord.gg/c9uGs3cFXr)

Ikuti pembaruan:

- Ikuti di X: https://x.com/bensenescu
- Daftar milis di situs mereka: [openseo.so](https://openseo.so)

## Lisensi

MIT.
