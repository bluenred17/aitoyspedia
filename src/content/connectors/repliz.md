---
title: "Repliz"
summary: "Dashboard tunggal untuk mengelola komentar dan DM di banyak akun media sosial, dengan server MCP hosted (115 tool) yang bisa dihubungkan ke Claude untuk membalas, menjadwalkan posting, dan mengatur otomasi lewat bahasa natural."
category: marketing
tags: [media-sosial, komentar, dm, otomasi, mcp, penjadwalan, instagram, tiktok]
surfaces: [claude-ai, claude-code, desktop]
source_url: "https://docs.repliz.com/tutorial/mcp.html"
license: null
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
provider: "Repliz"
auth: oauth
install: |
  claude mcp add --transport http repliz https://mcp.repliz.com/mcp --scope user
---

# Repliz

> **Catatan dari situs ini:** Repliz adalah layanan komersial berbayar, bukan proyek open source, jadi tidak ada repo GitHub, jumlah bintang, atau lisensi (`license: null`). Entri ini disusun dari halaman dokumentasi resmi di [docs.repliz.com](https://docs.repliz.com/), bukan dari README. Halaman dokumentasi dibaca lewat alat pembaca halaman web yang merangkum isinya, jadi periksa dokumentasi aslinya untuk detail yang tepat.

Repliz adalah satu dashboard untuk mengelola beberapa akun media sosial. Ia tidak menggantikan platformnya sendiri. Dari satu ruang kerja kamu bisa membalas komentar dan DM, mengotomatiskan moderasi, dan menjadwalkan posting.

**Kemampuan:**
- Mengelola komentar dan DM dari semua akun yang terhubung.
- Mengotomatiskan balasan, penghapusan spam, like komentar, dan DM memakai teks tetap, kata kunci, atau AI.
- Menjadwalkan posting teks, gambar, video, reel, album, tautan, dan story.
- Melacak engagement.
- Memakai AI dengan API key milik kamu sendiri atau Token Balance yang dibeli.
- Menyambungkan alat lewat Public API, webhook, node n8n, atau server MCP.

**Platform yang didukung:** Facebook (Page), Instagram, Threads, TikTok, YouTube, LinkedIn (pribadi atau organisasi), Shopee, X (Twitter), WhatsApp (beta), Telegram, dan Pinterest. Fitur berbeda-beda per platform.

**Untuk siapa:** pemilik bisnis kecil, kreator konten, agensi, dan tim dukungan pelanggan.

## Server MCP Repliz

Server MCP Repliz memungkinkan klien yang kompatibel dengan MCP (seperti Claude, ChatGPT, Codex, dan Cursor) mengelola ruang kerja Repliz lewat permintaan bahasa natural. Tool-nya mencakup daftar dan balasan komentar, penjadwalan posting, penanganan DM, penelusuran konten dan statistik, riset Threads, serta pengelolaan otomasi dan template. Server di-host oleh Repliz, jadi tidak ada yang perlu dipasang.

**Endpoint:**

```
https://mcp.repliz.com/mcp
```

Dokumentasi menyebut endpoint hosted ini sedang diluncurkan bertahap, sehingga sebagian klien mungkin belum bisa menjangkaunya.

### Autentikasi

Repliz memakai Public API **Access Key** dan **Secret Key** milik kamu. Keduanya ada di Settings → Public API di Dashboard Repliz (https://repliz.com/user/setting/api).

- **Sign in with Repliz (gaya OAuth):** Aplikasi yang mendukung sign-in MCP, seperti Claude dan ChatGPT, hanya butuh URL. Aplikasi membuka halaman sign-in Repliz tempat kamu menempel kunci sekali saja. Aplikasi lalu memperbarui koneksi secara otomatis, tetapi kamu harus masuk lagi setelah 30 hari tidak aktif atau setelah mereset Secret Key.
- **Kunci lewat header:** Aplikasi tanpa sign-in mengirim kunci pada setiap permintaan, dengan salah satu bentuk:

```
Authorization: Basic base64(accessKey:secretKey)
```

```
X-Repliz-Access-Key: <accessKey>
X-Repliz-Secret-Key: <secretKey>
```

Kunci yang hilang atau tidak valid ditolak dengan `401`.

### Persyaratan

- Access Key dan Secret Key kamu.
- Paket Repliz yang mencakup tool yang kamu butuhkan. Accounts, Comments, dan Contacts membutuhkan Standard. Account Connect, Chat, Content, Automation, Templates, Reports, dan Research membutuhkan Gold. Schedule dan Add-ons membutuhkan Premium. Tool Storage membutuhkan add-on Storage.
- Konektor MCP Anthropic API belum didukung.

### Tool (115 total)

- **Accounts:** daftar, hitung, ambil, statistik, ubah otomasi, hapus
- **Account Connect:** alur OAuth atau kode QR untuk Facebook, Instagram, Threads, YouTube, LinkedIn, TikTok, Shopee, X/Twitter, Pinterest, WhatsApp, dan Telegram (42 tool). Persetujuan tetap dilakukan di browser atau dengan memindai kode QR.
- **Comments:** daftar, ambil, balas, ubah status, hapus
- **Contacts:** daftar, hitung, tag, ambil, ubah, pengingat tindak lanjut, hapus
- **Chat:** daftar chat, ambil chat, daftar pesan, kirim pesan, tandai sudah dibaca
- **Content:** daftar, ambil, komentar, statistik, moderasi, hapus
- **Schedule:** daftar, ambil, buat, ubah, coba ulang, hapus
- **Automation:** daftar, ambil, buat, ubah, hapus
- **Templates:** daftar, ambil, buat, ubah, hapus
- **Storage:** statistik, daftar, ambil, hapus, ditambah alur unggah tiga langkah (`repliz_init_file`, `repliz_upload_file`, `repliz_complete_file`)
- **Reports:** daftar, ambil, coba ulang
- **Research (Threads):** cari konten, cari konten pengguna, cari pengguna
- **Add-ons:** musik trending TikTok, produk Shopee, kanal WhatsApp, kanal Telegram, board Pinterest, metadata tautan, dan alokasi add-on

### Catatan lain

- Unggahan membutuhkan URL `https` yang bisa dijangkau publik, bukan path file lokal.
- Koneksi yang menganggur ditutup setelah 30 menit.
- Batas pemakaian wajar: 120 permintaan per menit.
- Aksi menulis seperti membalas, menjadwalkan, mengirim, atau menghapus memengaruhi akun nyata, jadi tinjau sebelum mengonfirmasi.

## Cara menghubungkan

### Claude Code

**Prasyarat:** paket Repliz **Standard**, **Premium**, atau **Gold** (tool yang tersedia bergantung paket); Claude Code terpasang dan sudah masuk; Access Key dan Secret Key dari Settings → Public API.

1. **Salin kunci.** Buka Settings → Public API di Repliz dan salin Access Key dan Secret Key.
2. **Tambahkan server.** Jalankan di terminal:

   ```sh
   claude mcp add --transport http repliz https://mcp.repliz.com/mcp --scope user
   ```

   Flag `--scope user` membuat Repliz tersedia di setiap folder. Tanpa flag itu, server hanya berfungsi di folder saat ini.

3. **Masuk.** Mulai Claude Code dengan `claude`, lalu jalankan `/mcp`. Pilih **repliz** dan pilih **Authenticate**. Di halaman sign-in Repliz, tempel Access Key dan Secret Key, lalu klik **Connect**. Kembali ke Claude Code; `/mcp` seharusnya menampilkan Repliz terhubung. Di mesin tanpa browser (misalnya lewat SSH), jalankan `claude mcp login repliz`; perintah ini mencetak URL untuk dibuka di tempat lain.
4. **Verifikasi koneksi.**

   ```sh
   claude mcp list
   ```

   Repliz seharusnya muncul terhubung: `repliz: https://mcp.repliz.com/mcp (HTTP) - ✔ Connected`

**Opsional: bagikan setup ke tim proyek.** Buat file `.mcp.json` di root proyek. File ini tidak berisi kunci, jadi aman di-commit:

```json
{
  "mcpServers": {
    "repliz": {
      "type": "http",
      "url": "https://mcp.repliz.com/mcp"
    }
  }
}
```

Tiap anggota tim lalu masuk dengan kunci masing-masing lewat `/mcp`.

**Opsional: autentikasi dengan header (untuk CI atau tanpa browser).** Susun nilai header: kata `Basic`, spasi, lalu `AccessKey:SecretKey` yang di-encode base64 (halaman dokumentasi menyediakan alat di browser untuk langkah ini). Tambahkan server dengan header itu, ganti `YOUR_VALUE` dengan nilai lengkapnya:

```sh
claude mcp add --transport http repliz https://mcp.repliz.com/mcp --scope user --header "Authorization: Basic YOUR_VALUE"
```

Untuk `.mcp.json` bersama, rujuk variabel lingkungan alih-alih menulis kunci ke dalam file:

```json
{
  "mcpServers": {
    "repliz": {
      "type": "http",
      "url": "https://mcp.repliz.com/mcp",
      "headers": {
        "Authorization": "${REPLIZ_AUTHORIZATION}"
      }
    }
  }
}
```

Setel variabelnya di shell kamu:

```sh
export REPLIZ_AUTHORIZATION="Basic YOUR_VALUE"
```

Jangan pernah meng-commit file yang berisi kunci sebenarnya.

### Claude di web (claude.ai)

**Prasyarat:** paket Repliz **Standard**, **Premium**, atau **Gold** (paket Free mengunci halaman Public API); akun Claude (konektor kustom bekerja di semua paket Claude, paket Free mengizinkan satu; di Team atau Enterprise, Owner harus menambahkan konektornya); Access Key dan Secret Key.

1. **Salin kunci Repliz.** Buka Settings → Public API (https://repliz.com/user/setting/api). Salin **Access key** dan **Secret key** dengan tombol salin di sebelah masing-masing. Jaga kerahasiaannya.
2. **Tambahkan konektor di Claude.** Buka Customize → Connectors (https://claude.ai/customize/connectors), klik **+ Add**, dan pilih **Add custom connector**.
   - **Name:** `Repliz`
   - **Remote MCP server URL:** `https://mcp.repliz.com/mcp`
   - Klik **Continue**.
   - Di bawah **Authentication**, pilih **Sign in now**.
   - Di bawah **OAuth client**, biarkan **Use Claude's published identity**.
   - Klik **Add**.

   Kalau dialogmu menampilkan nama, URL, dan **Advanced settings** dalam satu layar, isi nama dan URL, biarkan **Advanced settings** kosong, lalu klik **Add**.
3. **Masuk ke Repliz.** Claude membuka halaman sign-in Repliz di jendela baru. Kalau tidak terbuka, klik **Connect** di sebelah Repliz di Customize → Connectors. Tempel Access Key dan Secret Key, lalu klik **Connect**. Tujuan yang disebut di halaman harus Claude (claude.ai). Kalau halaman menyebut alamat lain, klik **Cancel**.
4. **Aktifkan konektor di chat.** Mulai chat baru, klik **+** di kotak pesan, pilih **Connectors**, dan aktifkan **Repliz**. Lalu tanyakan sesuatu seperti "Tampilkan akun Repliz saya yang terhubung." Tinjau tiap tool yang diminta Claude sebelum mengizinkannya.

Catatan: metode header permintaan (untuk Owner Team atau Enterprise) masih beta dan bukan bagian dari setup standar.

### Claude Desktop

**Prasyarat:** paket Repliz Standard, Premium, atau Gold; aplikasi Claude Desktop. Hanya untuk opsi konfigurasi lokal: Node.js 18 atau lebih baru (periksa dengan `node --version`), serta Access key dan Secret key dari Settings → Public API.

**Opsi 1: Konektor (disarankan)**

1. Di Claude Desktop, pilih **Customize** di sidebar, lalu **Connectors**.
2. Tambahkan Repliz dan masuk, ikuti langkah 1 sampai 3 panduan Claude di web di atas. Kalau kamu sudah menambahkan Repliz di web, lompat ke langkah 3.
3. Di chat, klik **+** di kotak pesan, pilih **Connectors**, lalu aktifkan **Repliz**.

**Opsi 2: Konfigurasi lokal**

1. Buka Dashboard Repliz di Settings → Public API. Salin Access key dan Secret key, tempel ke generator header di halaman dokumentasi, lalu salin nilai header yang dihasilkan. Nilainya diawali `Basic`.
2. Di Claude Desktop, buka pengaturan aplikasi. Di macOS, pakai **Claude → Settings…** dari bilah menu. Di Windows, pakai menu aplikasi di kiri atas. Masuk ke **Developer** dan klik **Edit Config**.
3. Filenya `claude_desktop_config.json`:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
4. Tambahkan entri Repliz di bawah `mcpServers`. Ganti `Basic YOUR_VALUE` dengan nilai header lengkap dari langkah 1:

   ```json
   {
     "mcpServers": {
       "repliz": {
         "command": "npx",
         "args": [
           "-y",
           "mcp-remote",
           "https://mcp.repliz.com/mcp",
           "--header",
           "Authorization:${REPLIZ_AUTH}"
         ],
         "env": {
           "REPLIZ_AUTH": "Basic YOUR_VALUE"
         }
       }
     }
   }
   ```

   Kalau file sudah berisi server lain, taruh entri `"repliz"` di dalam objek `mcpServers` yang ada, dipisah koma.
5. Simpan file, keluar sepenuhnya dari Claude Desktop, lalu buka lagi.
6. Di chat, klik **+**, pilih **Connectors**, dan aktifkan **repliz**.

Argumen `Authorization:${REPLIZ_AUTH}` sengaja tanpa spasi. Nilai dengan spasinya ditaruh di `env`, yang menghindari masalah escaping di Windows. Konfigurasi lokal hanya berfungsi di komputer tempat kamu menyiapkannya dan tidak tersinkron ke aplikasi web atau mobile.

### ChatGPT

**Prasyarat:** paket Repliz Standard, Premium, atau Gold (paket Free mengunci halaman Public API); ChatGPT di web pada akun yang bisa menambahkan server MCP kustom (di workspace Business, Enterprise, atau Edu, admin mungkin perlu mengizinkannya lebih dulu; kalau "Add custom MCP server" tidak terlihat, akunmu belum memilikinya).

1. **Salin kunci Repliz.** Di dashboard Repliz, buka Settings → Public API (https://repliz.com/user/setting/api). Salin **Access key** dan **Secret key**. Jaga kerahasiaannya.
2. **Buka ChatGPT Plugins.** Buka https://chatgpt.com/plugins, klik **+**, dan pilih **Add custom MCP server**.
3. **Isi formulir:** Name `Repliz`; Description opsional (misalnya "Manage my Repliz workspace"); Connection: Server URL `https://mcp.repliz.com/mcp`; Authentication: **OAuth**.
4. **Konfirmasi.** Pilih **I understand and want to continue**, lalu klik **Create as a plugin**.
5. **Masuk ke Repliz.** Halaman sign-in Repliz terbuka. Tempel Access Key dan Secret Key, lalu klik **Connect**. Repliz seharusnya mengembalikanmu ke chatgpt.com. Kalau halaman menyebut alamat lain, klik **Cancel**.
6. **Pasang.** ChatGPT menampilkan tool yang ditemukan. Tinjau dan pasang plugin-nya.
7. **Pakai.** Mulai chat baru, ketik **@**, pilih **Repliz**, dan tanyakan sesuatu seperti "Tampilkan akun Repliz saya yang terhubung."

ChatGPT langsung menjalankan tool hanya-baca. Untuk tool yang mengubah sesuatu, seperti balasan, DM, posting terjadwal, atau penghapusan, ChatGPT meminta konfirmasi dulu.

| Field | Nilai |
|---|---|
| Name | `Repliz` |
| Server URL | `https://mcp.repliz.com/mcp` |
| Authentication | OAuth |
| Halaman kunci | https://repliz.com/user/setting/api |

### Codex

**Prasyarat:** paket Repliz Standard, Premium, atau Gold (paketmu menentukan tool yang bisa dipakai Codex); Codex terpasang dan sudah masuk, di aplikasi desktop ChatGPT, Codex CLI, atau ekstensi IDE Codex.

1. **Salin kunci Repliz.** Di dashboard Repliz, buka Settings → Public API. Salin Access key dan Secret key.
2. **Tambahkan server.** Jalankan di terminal:

   ```sh
   codex mcp add repliz --url https://mcp.repliz.com/mcp
   ```

   Atau edit file konfigurasi sendiri. Path-nya `~/.codex/config.toml` di macOS/Linux, atau `%USERPROFILE%\.codex\config.toml` di Windows. Buat file bila belum ada, lalu tambahkan:

   ```toml
   [mcp_servers.repliz]
   url = "https://mcp.repliz.com/mcp"
   ```

3. **Masuk.**
   - **CLI:**
     ```sh
     codex mcp login repliz
     ```
   - **Aplikasi desktop ChatGPT:** mulai ulang aplikasi, buka Settings, pilih MCP servers, lalu pilih Authenticate di sebelah Repliz.
   - **Ekstensi IDE:** mulai ulang ekstensi, buka menu gerigi, pilih MCP servers, lalu pilih Authenticate.

   Halaman sign-in Repliz terbuka di browser. Tempel Access Key dan Secret Key, lalu klik Connect. Browser mengembalikanmu ke Codex.
4. **Periksa koneksi.** Mulai sesi `codex` baru, atau mulai ulang aplikasi atau ekstensinya. Lalu jalankan:

   ```sh
   codex mcp list
   ```

   Repliz seharusnya muncul terdaftar dan aktif. Di dalam Codex, ketik `/mcp` untuk melihat server aktif dan tool-nya.

**Alternatif: header Authorization.** Pakai ini sebagai pengganti sign-in lewat browser. Susun nilai header `Basic ` diikuti `AccessKey:SecretKey` dalam base64, memakai alat bantu di halaman dokumentasi. Lalu tambahkan ke `config.toml`:

```toml
[mcp_servers.repliz]
url = "https://mcp.repliz.com/mcp"
http_headers = { "Authorization" = "Basic YOUR_VALUE" }
```

Untuk menjaga kunci tetap di luar file (hanya CLI dan ekstensi IDE), pakai variabel lingkungan:

```toml
[mcp_servers.repliz]
url = "https://mcp.repliz.com/mcp"
env_http_headers = { "Authorization" = "REPLIZ_AUTHORIZATION" }
```

```sh
export REPLIZ_AUTHORIZATION="Basic YOUR_VALUE"
```

Aplikasi desktop ChatGPT mungkin tidak melihat variabel yang disetel di terminal, jadi pakai `http_headers` di sana.

**Opsional: sembunyikan tool.** Untuk memblokir tool yang mengubah data, seperti menghapus konten atau akun:

```toml
[mcp_servers.repliz]
url = "https://mcp.repliz.com/mcp"
disabled_tools = ["repliz_delete_account", "repliz_delete_content"]
```

**Pemecahan masalah Codex:**
- **Repliz tidak terdaftar:** pastikan file bernama `config.toml` di folder Codex dan mulai ulang Codex. Kesalahan sintaks, seperti tanda kutip yang hilang, mencegahnya dimuat.
- **Registrasi gagal saat login:** jalankan `codex mcp login repliz --oauth-client-registration dcr`.
- **Kunci ditolak:** salin kedua kunci lagi dari Settings → Public API. Kalau Secret Key direset, hanya yang baru yang berlaku.
- **Error `Unauthorized`:** jalankan `codex mcp login repliz` lagi. Kalau memakai header, nilainya harus diawali `Basic` dan spasi. Jangan pakai `bearer_token_env_var`, karena mengirim `Bearer`.

### Cursor

**Opsi A: Sign in with Repliz.** Tambahkan ini ke `~/.cursor/mcp.json` (semua proyek) atau `.cursor/mcp.json` (satu proyek):

```json
{
  "mcpServers": {
    "repliz": {
      "url": "https://mcp.repliz.com/mcp"
    }
  }
}
```

Lalu buka **Customize** di sidebar, cari Repliz, dan klik **Connect**. Tempel kunci di halaman sign-in yang terbuka di browser dan klik **Connect** lagi.

**Opsi B: header Authorization.**

```json
{
  "mcpServers": {
    "repliz": {
      "url": "https://mcp.repliz.com/mcp",
      "headers": {
        "Authorization": "${env:REPLIZ_AUTHORIZATION}"
      }
    }
  }
}
```

Setel variabel di profil shell kamu, misalnya:

```bash
export REPLIZ_AUTHORIZATION="Basic YOUR_VALUE"
```

Mulai ulang Cursor sesudahnya.

### VS Code (GitHub Copilot)

**Menambahkan server:** jalankan **MCP: Add Server** dari Command Palette, pilih **HTTP**, masukkan URL, dan beri nama server `repliz`. Kamu juga bisa mengedit `.vscode/mcp.json` atau menjalankan **MCP: Open User Configuration**:

```json
{
  "servers": {
    "repliz": {
      "type": "http",
      "url": "https://mcp.repliz.com/mcp"
    }
  }
}
```

Saat dimulai pertama kali, VS Code meminta kamu masuk ke Repliz. Izinkan, dan browser membuka halaman sign-in.

**Opsi B: header Authorization.** Versi ini meminta nilainya sekali dan menjaganya di luar file:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "repliz-authorization",
      "description": "Repliz Authorization header (Basic …)",
      "password": true
    }
  ],
  "servers": {
    "repliz": {
      "type": "http",
      "url": "https://mcp.repliz.com/mcp",
      "headers": {
        "Authorization": "${input:repliz-authorization}"
      }
    }
  }
}
```

### Aplikasi lain

1. Cari pengaturan remote MCP server, custom connector, atau Streamable HTTP server.
2. Masukkan `https://mcp.repliz.com/mcp`.
3. Kalau aplikasi menawarkan sign-in atau OAuth, pakai itu.
4. Kalau aplikasi hanya menerima header, tambahkan header `Authorization` dengan nilai `Basic` kamu.

Aplikasi yang hanya menjalankan server MCP secara lokal bisa terhubung lewat alat mcp-remote.

**Pemecahan masalah umum:**
- **Halaman sign-in tidak muncul:** sebagian aplikasi belum mendukung sign-in MCP. Pakai metode header.
- **Kunci ditolak di halaman sign-in:** salin kedua kunci lagi dari Settings → Public API. Kalau Secret Key direset, hanya yang baru yang berlaku.
- **401 Unauthorized:** pastikan nilainya diawali `Basic` diikuti spasi. `Bearer` tidak berfungsi.
- **Sebuah tool tidak tersedia:** paket Repliz kamu menentukan tool yang bisa dipakai.

## Paket dan harga

Repliz punya empat paket sekali bayar (tanpa perpanjangan otomatis). Semua paket mencakup setiap otomasi dan platform tempat otomasi berjalan. Harga di bawah dibaca dari halaman paket pada 2026-11-05 dan bisa berubah.

| Paket | Akun | Operator | Tambahan utama | 1 / 3 / 6 / 12 bulan (IDR) |
|---|---|---|---|---|
| **Free** | 1 | Tidak ada | Otomasi dan enam platform inti (Facebook, Instagram, Threads, TikTok, YouTube, LinkedIn). Tanpa penjadwalan, inbox, atau API. | Gratis |
| **Standard** | 20 | 1 | Akses API terbatas (Me, Account, Comment, Contact) dan webhook. Tanpa penjadwalan atau inbox. | Rp18.000 / Rp48.000 / Rp85.000 / Rp145.000 |
| **Premium** | 75 | 10 | Penjadwalan konten, inbox percakapan, Shopee, X, WhatsApp, Telegram, Pinterest, dan API terbatas (menambah API Addon dan Schedule). | Rp29.000 / Rp79.000 / Rp139.000 / Rp249.000 |
| **Gold** | 200 | 30 | Semua yang ada di Premium, ditambah akses API penuh dan webhook. | Rp49.000 / Rp135.000 / Rp235.000 / Rp420.000 |

Harga lain: **Token Balance** (untuk fitur AI, dijual per 100.000 token): Rp5.000 untuk 100.000 token, Rp15.000 untuk 300.000, Rp50.000 untuk 1.000.000, dan Rp100.000 untuk 2.000.000. **Add-on:** akun tambahan dan operator tambahan (khusus Gold) seharga Rp39.000 per blok, storage seharga Rp39.000 per 5 GB (paket berbayar mana pun), dan Credit X seharga Rp39.000 per 50 kredit (semua paket). Pembayaran PayPal ditagih dalam USD, dikonversi dari harga IDR dengan kurs saat itu.

## Halaman dokumentasi lain

Dokumentasi memuat panduan menghubungkan tiap akun (Facebook, Instagram, Threads, TikTok, YouTube, LinkedIn, Shopee, X, WhatsApp, Telegram, Pinterest), panduan mengatur otomasi (hapus komentar, balas komentar, like komentar, DM dari komentar, balas DM, balas story, template), spesifikasi penjadwalan per platform, node n8n, webhook, dan video resmi serta komunitas. Bagian itu tidak diterjemahkan di sini. Lihat [docs.repliz.com](https://docs.repliz.com/) (tersedia juga dalam [Bahasa Indonesia](https://docs.repliz.com/id/tutorial/introduction.html)).
