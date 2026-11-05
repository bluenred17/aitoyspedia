---
title: "Playwright MCP"
summary: "Server MCP resmi Microsoft yang memberi LLM kemampuan otomasi browser lewat snapshot aksesibilitas Playwright yang terstruktur, tanpa screenshot atau model visual, untuk Claude Code, Claude Desktop, Cursor, VS Code, dan klien MCP lain."
category: coding
tags: [mcp, playwright, browser, otomasi, testing, accessibility-tree, web]
surfaces: [claude-code, desktop]
source_url: "https://github.com/microsoft/playwright-mcp/blob/main/README.md"
repo: microsoft/playwright-mcp
stars: 39194
license: Apache-2.0
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
provider: "Microsoft (Playwright)"
auth: none
install: |
  # Claude Code
  claude mcp add playwright npx @playwright/mcp@latest

  # Konfigurasi standar (berfungsi di kebanyakan klien MCP)
  # {
  #   "mcpServers": {
  #     "playwright": {
  #       "command": "npx",
  #       "args": ["@playwright/mcp@latest"]
  #     }
  #   }
  # }

  # Codex
  codex mcp add playwright npx "@playwright/mcp@latest"

  # VS Code
  code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}'

  # Amp CLI
  amp mcp add playwright -- npx @playwright/mcp@latest

  # Grok
  grok mcp add playwright -- npx @playwright/mcp@latest

  # Factory
  droid mcp add playwright "npx @playwright/mcp@latest"

  # Server mandiri (transport HTTP), mis. saat browser headed dijalankan di sistem tanpa display:
  npx @playwright/mcp@latest --port 8931
  # lalu di konfigurasi klien: { "mcpServers": { "playwright": { "url": "http://localhost:8931/mcp" } } }

  # Docker (hanya Chromium headless)
  # { "mcpServers": { "playwright": { "command": "docker", "args": ["run", "-i", "--rm", "--init", "--pull=always", "mcr.microsoft.com/playwright/mcp"] } } }
---

# Playwright MCP

Server Model Context Protocol (MCP) yang menyediakan kemampuan otomasi browser memakai [Playwright](https://playwright.dev). Server ini memungkinkan LLM berinteraksi dengan halaman web lewat snapshot aksesibilitas yang terstruktur, tanpa perlu screenshot atau model yang disetel untuk visual.

> **Catatan dari situs ini:** (1) **Bukan batas keamanan.** README menyatakan Playwright MCP **bukan** batas keamanan; pembatasan origin, akses file, dan penyamaran rahasia hanyalah pagar kenyamanan. Browser yang dikendalikan agent bisa membuka halaman, mengisi formulir, dan memakai sesi yang sudah login (terutama dengan profil persisten atau ekstensi browser), jadi jangan arahkan ke akun atau situs sensitif tanpa pengawasan. (2) README menyarankan **Playwright CLI + SKILLS** untuk agent coding karena lebih hemat token; MCP lebih cocok untuk loop agentik khusus yang membutuhkan state persisten. (3) Server dijalankan lewat `npx @playwright/mcp@latest`, yang mengunduh dan menjalankan paket npm terbaru setiap kali; kunci versi bila membutuhkan stabilitas. (4) Daftar parameter lengkap tiap tool dan skema file konfigurasi di README asli sangat panjang dan dihasilkan otomatis; di sini hanya ringkasannya, selengkapnya di README sumber. (5) Instruksi untuk klien yang berupa tombol "Install" (VS Code, Cursor, Goose, LM Studio) disebut tanpa tautan deep-link.

## Playwright MCP vs Playwright CLI

Paket ini menyediakan antarmuka MCP ke Playwright. Jika kamu memakai **agent coding**, kamu mungkin lebih diuntungkan memakai [CLI+SKILLS](https://github.com/microsoft/playwright-cli).

- **CLI**: **agent coding** modern semakin menyukai alur kerja berbasis CLI yang diekspos sebagai SKILL dibanding MCP, karena pemanggilan CLI lebih hemat token: mereka menghindari pemuatan skema tool yang besar dan pohon aksesibilitas yang bertele-tele ke konteks model, sehingga agent bisa bertindak lewat perintah ringkas yang dibuat khusus. Ini membuat CLI + SKILLS lebih cocok untuk agent coding berkapasitas tinggi yang harus menyeimbangkan otomasi browser dengan codebase besar, tes, dan penalaran dalam jendela konteks terbatas.<br>**Pelajari lebih lanjut [Playwright CLI dengan SKILLS](https://github.com/microsoft/playwright-cli)**.

- **MCP**: MCP tetap relevan untuk loop agentik khusus yang diuntungkan oleh state persisten, introspeksi yang kaya, dan penalaran berulang atas struktur halaman, seperti otomasi eksploratif, tes yang menyembuhkan diri, atau alur kerja otonom berjalan lama di mana menjaga konteks browser yang berkelanjutan lebih penting daripada biaya token.

### Fitur utama

- **Cepat dan ringan.** Memakai pohon aksesibilitas Playwright, bukan input berbasis piksel.
- **Ramah LLM.** Tanpa model visi, beroperasi murni pada data terstruktur.
- **Penerapan tool yang deterministik.** Menghindari ambiguitas yang umum pada pendekatan berbasis screenshot.

### Persyaratan
- Node.js 18 atau lebih baru
- VS Code, Cursor, Windsurf, Claude Desktop, Goose, Grok, Junie, atau klien MCP lainnya

## Memulai

Pertama, pasang server Playwright MCP dengan klien kamu.

**Konfigurasi standar** berfungsi di kebanyakan alat:

```js
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

### Amp

Tambahkan lewat layar pengaturan ekstensi Amp VS Code atau dengan memperbarui file settings.json:

```json
"amp.mcpServers": {
  "playwright": {
    "command": "npx",
    "args": [
      "@playwright/mcp@latest"
    ]
  }
}
```

**Setup Amp CLI:** tambahkan lewat perintah `amp mcp add` di bawah

```bash
amp mcp add playwright -- npx @playwright/mcp@latest
```

### Antigravity

Tambahkan lewat pengaturan Antigravity atau dengan memperbarui file konfigurasi:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

### Claude Code

Pakai CLI Claude Code untuk menambahkan server Playwright MCP:

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

### Claude Desktop

Ikuti [panduan](https://modelcontextprotocol.io/quickstart/user) pemasangan MCP, pakai konfigurasi standar di atas.

### Cline

Ikuti instruksi di bagian [Configuring MCP Servers](https://docs.cline.bot/mcp/configuring-mcp-servers)

**Contoh: setup lokal.** Tambahkan ini ke file [`cline_mcp_settings.json`](https://docs.cline.bot/mcp/configuring-mcp-servers#editing-mcp-settings-files) kamu:

```json
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "timeout": 30,
      "args": [
        "-y",
        "@playwright/mcp@latest"
      ],
      "disabled": false
    }
  }
}
```

### Codex

Pakai CLI Codex untuk menambahkan server Playwright MCP:

```bash
codex mcp add playwright npx "@playwright/mcp@latest"
```

Atau buat/edit file konfigurasi `~/.codex/config.toml` dan tambahkan:

```toml
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest"]
```

Untuk informasi lebih lanjut, lihat [dokumentasi MCP Codex](https://github.com/openai/codex/blob/main/codex-rs/config.md#mcp_servers).

### Copilot

Pakai CLI Copilot untuk menambahkan server Playwright MCP secara interaktif:

```bash
/mcp add
```

Atau buat/edit file konfigurasi `~/.copilot/mcp-config.json` dan tambahkan:

```json
{
  "mcpServers": {
    "playwright": {
      "type": "local",
      "command": "npx",
      "tools": [
        "*"
      ],
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

Untuk informasi lebih lanjut, lihat [dokumentasi CLI Copilot](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli).

### Cursor

Tombol pemasangan satu klik tersedia di README sumber. Atau pasang manual: buka `Cursor Settings` -> `MCP` -> `Add new MCP Server`. Beri nama sesukamu, pakai tipe `command` dengan perintah `npx @playwright/mcp@latest`. Kamu juga bisa memverifikasi konfigurasi atau menambahkan argumen perintah lewat klik `Edit`.

### Factory

Pakai CLI Factory untuk menambahkan server Playwright MCP:

```bash
droid mcp add playwright "npx @playwright/mcp@latest"
```

Atau ketik `/mcp` di dalam Factory droid untuk membuka UI interaktif pengelola server MCP.

Untuk informasi lebih lanjut, lihat [dokumentasi MCP Factory](https://docs.factory.ai/cli/configuration/mcp).

### Gemini CLI

Ikuti [panduan](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md#configure-the-mcp-server-in-settingsjson) pemasangan MCP, pakai konfigurasi standar di atas.

### Goose

Tombol pemasangan tersedia di README sumber. Atau pasang manual: buka `Advanced settings` -> `Extensions` -> `Add custom extension`. Beri nama sesukamu, pakai tipe `STDIO`, dan setel `command` ke `npx @playwright/mcp`. Klik "Add Extension".

### Grok

Pakai CLI Grok untuk menambahkan server Playwright MCP:

```bash
grok mcp add playwright -- npx @playwright/mcp@latest
```

Atau buat/edit file konfigurasi `~/.grok/config.toml` dan tambahkan:

```toml
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest"]
```

Untuk informasi lebih lanjut, lihat [dokumentasi MCP Grok](https://docs.x.ai/build/features/mcp-servers).

### Junie

Untuk menambahkan server Playwright MCP di Junie CLI:

1. Ketik `/mcp`
2. Tekan `Ctrl+A` untuk menambah server MCP baru
3. Pilih **Playwright** dari daftar

Atau tambahkan ke `.junie/mcp/mcp.json`:

```json
{
  "mcpServers": {
    "Playwright": {
      "command": "npx",
      "args": [
        "-y",
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

Untuk informasi lebih lanjut, lihat [dokumentasi konfigurasi MCP Junie](https://junie.jetbrains.com/docs/junie-cli-mcp-configuration.html).

### Kiro

Ikuti [dokumentasi](https://kiro.dev/docs/mcp/) Server MCP. Misalnya di `.kiro/settings/mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

### LM Studio

Tombol pemasangan tersedia di README sumber. Atau pasang manual: buka `Program` di sidebar kanan -> `Install` -> `Edit mcp.json`. Pakai konfigurasi standar di atas.

### opencode

Ikuti [dokumentasi](https://opencode.ai/docs/mcp-servers/) Server MCP. Misalnya di `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "playwright": {
      "type": "local",
      "command": [
        "npx",
        "@playwright/mcp@latest"
      ],
      "enabled": true
    }
  }
}
```

### Qodo Gen

Buka panel chat [Qodo Gen](https://docs.qodo.ai/qodo-documentation/qodo-gen) di VSCode atau IntelliJ → Connect more tools → + Add new MCP → tempel konfigurasi standar di atas. Klik `Save`.

### VS Code

Tombol pemasangan ("Install Server") tersedia di README sumber untuk VS Code dan VS Code Insiders. Atau pasang manual: ikuti [panduan](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server) pemasangan MCP, pakai konfigurasi standar di atas. Kamu juga bisa memasang server Playwright MCP lewat CLI VS Code:

```bash
# For VS Code
code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}'
```

Setelah terpasang, server Playwright MCP akan tersedia untuk agent GitHub Copilot kamu di VS Code.

### Warp

Buka `Settings` -> `AI` -> `Manage MCP Servers` -> `+ Add` untuk [menambah server MCP](https://docs.warp.dev/knowledge-and-collaboration/mcp#adding-an-mcp-server). Pakai konfigurasi standar di atas.

Atau, pakai slash command `/add-mcp` di prompt Warp dan tempel konfigurasi standar dari atas:
```js
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

### Windsurf

Ikuti [dokumentasi](https://docs.windsurf.com/windsurf/cascade/mcp) MCP Windsurf. Pakai konfigurasi standar di atas.

## Konfigurasi

Server Playwright MCP mendukung argumen berikut. Argumen ini bisa diberikan di konfigurasi JSON di atas, sebagai bagian dari daftar `"args"`. Setiap opsi juga punya variabel lingkungan `PLAYWRIGHT_MCP_*` (README sumber mencantumkan nama persisnya per opsi).

| Opsi | Deskripsi |
|--------|-------------|
| `--allowed-hosts <hosts...>` | Daftar host yang boleh dilayani server ini (dipisah koma). Default: localhost, IP loopback, dan host dari `--host`; host lain harus didaftarkan eksplisit. Beri `'*'` untuk menonaktifkan pemeriksaan host. |
| `--allowed-origins <origins>` | Daftar origin TERPERCAYA yang boleh diminta browser (dipisah titik koma). Default: izinkan semua. Penting: *bukan* batas keamanan dan *tidak* memengaruhi redirect. |
| `--allow-unrestricted-file-access` | Izinkan akses file di luar root workspace dan akses tanpa batas ke URL file://. Default: akses sistem file dibatasi ke direktori root workspace (atau cwd) dan navigasi ke file:// diblokir. |
| `--blocked-origins <origins>` | Daftar origin yang diblokir dari permintaan browser (dipisah titik koma). Blocklist dievaluasi sebelum allowlist. Penting: *bukan* batas keamanan dan *tidak* memengaruhi redirect. |
| `--block-service-workers` | Blokir service worker |
| `--browser <browser>` | Browser atau channel chrome yang dipakai: chrome, firefox, webkit, msedge. |
| `--caps <caps>` | Daftar kapabilitas tambahan (dipisah koma): vision, pdf, devtools. |
| `--cdp-endpoint <endpoint>` | Endpoint CDP untuk dihubungi. |
| `--cdp-header <headers...>` | Header CDP yang dikirim bersama permintaan koneksi; bisa beberapa. |
| `--cdp-timeout <timeout>` | Timeout (ms) menghubungi endpoint CDP, default 30000ms |
| `--codegen <lang>` | Bahasa untuk pembuatan kode: "typescript", "python", "java", "csharp", "none". Default "typescript". |
| `--config <path>` | Path ke file konfigurasi. |
| `--console-level <level>` | Level pesan konsol yang dikembalikan: "error", "warning", "info", "debug". |
| `--device <device>` | Perangkat yang ditiru, misalnya "iPhone 15" |
| `--mobile` | Tiru perangkat seluler generik (Pixel 10 untuk Chromium, iPhone 17 untuk WebKit). Halaman seluler biasanya lebih ringan, sehingga menghemat token. Tidak bisa digabung dengan `--device`. |
| `--executable-path <path>` | Path ke executable browser. |
| `--extension` | Hubungkan ke instans browser yang sedang berjalan (hanya Edge/Chrome). Membutuhkan "Playwright Extension" terpasang. |
| `--endpoint <endpoint>` | Endpoint browser terikat untuk dihubungi. |
| `--file-paths <mode>` | Cara path file ditampilkan di hasil tool, "relative" terhadap root workspace atau "absolute". Default "relative". |
| `--grant-permissions <permissions...>` | Daftar izin yang diberikan ke konteks browser, misalnya "geolocation", "clipboard-read", "clipboard-write". |
| `--headless` | Jalankan browser mode headless, default headed |
| `--host <host>` | Host tempat server diikat. Default localhost. Pakai 0.0.0.0 untuk mengikat ke semua antarmuka. |
| `--idle-timeout <timeout>` | Tutup browser setelah sekian milidetik tanpa panggilan tool selesai; panggilan berikutnya meluncurkannya lagi. Default satu jam untuk browser headless, tidak pernah untuk headed, 0 menonaktifkan. |
| `--ignore-https-errors` | Abaikan galat https |
| `--ignore-roots` | Jangan minta root workspace dari klien, pakai direktori kerja saat ini. Pakai dengan klien yang mengiklankan roots tetapi tidak bisa menjawab permintaan roots. |
| `--init-page <path...>` | Path ke file TypeScript yang dievaluasi pada objek page Playwright |
| `--init-script <path...>` | Path ke file JavaScript yang ditambahkan sebagai skrip inisialisasi, dievaluasi di setiap halaman sebelum skrip halaman mana pun. Bisa ditentukan beberapa kali. |
| `--isolated` | Simpan profil browser di memori, jangan simpan ke disk. |
| `--image-responses <mode>` | Apakah respons gambar dikirim ke klien: "allow", "omit", atau "only". Default "allow". |
| `--no-sandbox` | Nonaktifkan sandbox untuk semua jenis proses yang biasanya di-sandbox. |
| `--no-webmcp` | Jangan kumpulkan atau ekspos tool yang didaftarkan halaman lewat API WebMCP. |
| `--output-dir <path>` | Direktori untuk file keluaran bernama otomatis, misalnya screenshot tanpa nama file eksplisit. |
| `--output-max-size <bytes>` | Ambang untuk mengusir file keluaran lama, dalam byte. |
| `--port <port>` | Port yang didengarkan untuk transport SSE. |
| `--profile-dir-name <name>` | Nama direktori profil di direktori data pengguna untuk dihubungi dengan `--extension`, misalnya "Profile 1". Default: profil terakhir yang dipakai dan memiliki ekstensi terpasang. |
| `--proxy-bypass <bypass>` | Domain yang melewati proxy (dipisah koma), misalnya ".com,chromium.org,.domain.com" |
| `--proxy-server <proxy>` | Tentukan server proxy, misalnya "http://myproxy:3128", "http://user:password@myproxy:3128", atau "socks5://myproxy:8080" |
| `--redact-url-params <names>` | Nama parameter query dan fragmen URL (dipisah koma), misalnya "access_token,code", yang nilainya diganti `<redacted>` di respons tool. |
| `--sandbox` | Aktifkan sandbox untuk semua jenis proses yang biasanya tidak di-sandbox. |
| `--save-session` | Apakah sesi Playwright MCP disimpan ke direktori keluaran. |
| `--secrets <path>` | Path ke file berisi rahasia dalam format dotenv |
| `--shared-browser-context` | Pakai ulang konteks browser yang sama di semua klien HTTP yang terhubung. |
| `--snapshot-boxes` | Sertakan bounding box tiap elemen sebagai `[box=x,y,width,height]` di snapshot. Koordinat relatif viewport, dalam piksel CSS. |
| `--snapshot-mode <mode>` | Mode snapshot untuk respons: "full" atau "none". Default "full". |
| `--storage-state <path>` | Path ke file storage state untuk sesi terisolasi. |
| `--test-id-attribute <attribute>` | Atribut untuk test id, default "data-testid" |
| `--timeout-action <timeout>` | Timeout aksi dalam milidetik, default 5000ms |
| `--timeout-navigation <timeout>` | Timeout navigasi dalam milidetik, default 60000ms |
| `--timeout-settle <timeout>` | Berapa lama menunggu setelah tiap aksi agar pekerjaan yang terpicu selesai, dalam milidetik, default 500ms |
| `--user-agent <ua string>` | Tentukan string user agent |
| `--user-data-dir <path>` | Path ke direktori data pengguna. Jika tidak ditentukan, direktori sementara dibuat. |
| `--viewport-size <size>` | Ukuran viewport browser dalam piksel, misalnya "1280x720" |

### Profil pengguna

Kamu bisa menjalankan Playwright MCP dengan profil persisten seperti browser biasa (default), dalam konteks terisolasi untuk sesi pengujian, atau terhubung ke browser yang sudah kamu pakai lewat ekstensi browser.

**Profil persisten**

Semua informasi login disimpan di profil persisten; kamu bisa menghapusnya antar sesi bila ingin membersihkan state offline. Profil persisten berada di lokasi berikut dan bisa ditimpa dengan argumen `--user-data-dir`.

```bash
# Windows
%USERPROFILE%\AppData\Local\ms-playwright\mcp-{channel}-{workspace-hash}

# macOS
- ~/Library/Caches/ms-playwright/mcp-{channel}-{workspace-hash}

# Linux
- ~/.cache/ms-playwright/mcp-{channel}-{workspace-hash}
```

`{workspace-hash}` berasal dari root workspace klien MCP, sehingga proyek berbeda otomatis mendapat profil terpisah.

> **Penting:** Profil persisten hanya bisa dipakai satu instans browser dalam satu waktu, jadi klien MCP bersamaan yang berbagi workspace yang sama akan berbenturan. Untuk menjalankan beberapa klien paralel, mulai setiap klien tambahan dengan `--isolated` atau arahkan ke `--user-data-dir` yang berbeda.

**Terisolasi**

Pada mode terisolasi, setiap sesi dimulai di profil terisolasi. Setiap kali kamu meminta MCP menutup browser, sesi ditutup dan semua storage state sesi itu hilang. Kamu bisa memberi storage state awal ke browser lewat `contextOptions` di konfigurasi atau argumen `--storage-state`. Pelajari storage state lebih lanjut [di sini](https://playwright.dev/docs/auth).

```js
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--isolated",
        "--storage-state={path/to/storage.json}"
      ]
    }
  }
}
```

**Ekstensi browser**

Ekstensi Chrome Playwright MCP memungkinkan kamu terhubung ke tab browser yang sudah ada dan memanfaatkan sesi login serta state browsermu. Lihat [microsoft/playwright › packages/extension](https://github.com/microsoft/playwright/tree/main/packages/extension#readme) untuk petunjuk pemasangan dan setup.

### State awal

Ada beberapa cara memberi state awal ke konteks browser atau halaman.

Untuk storage state, kamu bisa:
- Mulai dengan direktori data pengguna memakai argumen `--user-data-dir`. Ini mempertahankan semua data browser antar sesi.
- Mulai dengan file storage state memakai argumen `--storage-state`. Ini memuat cookie dan local storage dari file ke konteks browser terisolasi.

Untuk state halaman, kamu bisa memakai:

- `--init-page` untuk menunjuk file TypeScript yang dievaluasi pada objek page Playwright. Ini memungkinkanmu menjalankan kode apa pun untuk menyiapkan halaman.

```ts
// init-page.ts
export default async ({ page }) => {
  await page.context().grantPermissions(['geolocation']);
  await page.context().setGeolocation({ latitude: 37.7749, longitude: -122.4194 });
  await page.setViewportSize({ width: 1280, height: 720 });
};
```

- `--init-script` untuk menunjuk file JavaScript yang ditambahkan sebagai skrip inisialisasi. Skrip dievaluasi di setiap halaman sebelum skrip halaman mana pun. Berguna untuk menimpa API browser atau menyiapkan lingkungan.

```js
// init-script.js
window.isPlaywrightMCP = true;
```

### File konfigurasi

Server Playwright MCP bisa dikonfigurasi memakai file konfigurasi JSON. Tentukan file konfigurasi dengan opsi baris perintah `--config`:

```bash
npx @playwright/mcp@latest --config path/to/config.json
```

Kunci tingkat atas pada skema file konfigurasi (tipe dan komentar lengkap ada di README sumber): `browser` (`browserName`, `isolated`, `userDataDir`, `launchOptions`, `contextOptions`, `cdpEndpoint`, `cdpHeaders`, `cdpTimeout`, `remoteEndpoint`, `initPage`, `initScript`), `extension`, `server` (`port`, `host`, `allowedHosts`), `capabilities` (`core`, `pdf`, `vision`, `devtools`), `saveSession`, `webmcp`, `sharedBrowserContext`, `secrets`, `redactUrlParams`, `outputDir`, `outputMaxSize`, `console.level`, `network` (`allowedOrigins`, `blockedOrigins`), `testIdAttribute`, `timeouts` (`action`, `navigation`, `expect`, `settle`, `idle`), `imageResponses`, `filePaths`, `snapshot` (`mode`, `boxes`), `allowUnrestrictedFileAccess`, `ignoreRoots`, dan `codegen`.

Catatan dari README untuk beberapa kunci: `secrets` dipakai mengganti teks biasa yang cocok di respons tool agar LLM tidak tak sengaja mendapat data sensitif, dan hanya kenyamanan, bukan fitur keamanan; `allowUnrestrictedFileAccess` adalah pagar agar LLM tidak tersasar keluar workspace, bukan batas aman, dan untuk keamanan sejati andalkan izin tingkat klien.

### Server MCP mandiri

Saat menjalankan browser headed pada sistem tanpa display atau dari proses worker IDE, jalankan server MCP dari lingkungan dengan DISPLAY dan berikan flag `--port` untuk mengaktifkan transport HTTP.

```bash
npx @playwright/mcp@latest --port 8931
```

Lalu di konfigurasi klien MCP, setel `url` ke endpoint HTTP:

```js
{
  "mcpServers": {
    "playwright": {
      "url": "http://localhost:8931/mcp"
    }
  }
}
```

## Keamanan

Playwright MCP **bukan** batas keamanan. Lihat [MCP Security Best Practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) untuk panduan mengamankan deployment kamu.

### Docker

**CATATAN:** Implementasi Docker saat ini hanya mendukung Chromium headless.

```js
{
  "mcpServers": {
    "playwright": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "--init", "--pull=always", "mcr.microsoft.com/playwright/mcp"]
    }
  }
}
```

Atau jika kamu lebih suka menjalankan container sebagai layanan jangka panjang alih-alih membiarkan klien MCP memunculkannya, pakai:

```
docker run -d -i --rm --init --pull=always \
  --entrypoint node \
  --name playwright \
  -p 8931:8931 \
  mcr.microsoft.com/playwright/mcp \
  /app/cli.js --headless --browser chromium --no-sandbox --port 8931 --host 0.0.0.0
```

Server akan mendengarkan di port host **8931** dan bisa dijangkau klien MCP mana pun.

Kamu bisa membangun image Docker sendiri.

```
docker build -t mcr.microsoft.com/playwright/mcp .
```

### Pemakaian programatik

```js
import http from 'http';

import { createConnection } from '@playwright/mcp';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';

http.createServer(async (req, res) => {
  // ...

  // Creates a headless Playwright MCP server with SSE transport
  const connection = await createConnection({ browser: { launchOptions: { headless: true } } });
  const transport = new SSEServerTransport('/messages', res);
  await connection.connect(transport);

  // ...
});
```

## Tool

README sumber memuat daftar tool lengkap beserta parameter dan penanda read-only (dihasilkan otomatis). Ringkasannya menurut kelompok:

| Kelompok | Tool |
|---|---|
| **Core automation** (selalu aktif) | `browser_click`, `browser_close`, `browser_console_messages`, `browser_drag`, `browser_drop`, `browser_emulate_media`, `browser_evaluate`, `browser_file_upload`, `browser_fill_form`, `browser_find`, `browser_handle_dialog`, `browser_hover`, `browser_navigate`, `browser_navigate_back`, `browser_network_request`, `browser_network_requests`, `browser_press_key`, `browser_resize`, `browser_run_code_unsafe`, `browser_select_option`, `browser_snapshot`, `browser_take_screenshot`, `browser_type`, `browser_wait_for` |
| **Tab management** | `browser_tabs` |
| **Browser installation** | pemasangan browser |
| **Configuration** (opt-in `--caps=config`) | `browser_get_config` |
| **Network** (opt-in `--caps=network`) | `browser_network_state_set`, `browser_route`, `browser_route_list`, `browser_unroute` |
| **Storage** (opt-in `--caps=storage`) | `browser_cookie_*` (clear, delete, get, list, set), `browser_localstorage_*`, `browser_sessionstorage_*`, `browser_set_storage_state`, `browser_storage_state` |
| **DevTools** (opt-in `--caps=devtools`) | `browser_annotate`, `browser_highlight`, `browser_hide_highlight`, `browser_resume`, `browser_start_recording` / `browser_stop_recording`, `browser_start_tracing` / `browser_stop_tracing`, `browser_start_video` / `browser_stop_video`, `browser_video_chapter`, `browser_video_hide_actions` / `browser_video_show_actions` |
| **Coordinate-based** (opt-in `--caps=vision`) | `browser_mouse_click_xy`, `browser_mouse_down`, `browser_mouse_drag_xy`, `browser_mouse_move_xy`, `browser_mouse_up`, `browser_mouse_wheel` |
| **PDF generation** (opt-in `--caps=pdf`) | `browser_pdf_save` |
| **Test assertions** (opt-in `--caps=testing`) | `browser_generate_locator`, `browser_verify_element_visible`, `browser_verify_list_visible`, dan lainnya |

Perhatian: `browser_evaluate` dan `browser_run_code_unsafe` menjalankan kode sembarang di halaman atau konteks Playwright; `browser_run_code_unsafe` sengaja diberi nama "unsafe". Tinjau pemanggilannya, terutama pada situs yang sudah login.

## Lisensi

Apache-2.0 (menurut metadata repositori).
