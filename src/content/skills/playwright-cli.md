---
title: "Playwright CLI"
summary: "CLI Playwright dengan skill untuk agent coding: mengendalikan browser lewat perintah ringkas yang hemat token, tanpa memuat skema tool MCP yang besar."
category: coding
tags: [playwright, browser, otomasi, cli, testing, screenshot, microsoft]
surfaces: [claude-code]
trigger: "Saat pengguna minta agent mengotomasi browser, menguji alur web, mengambil screenshot atau PDF, merekam trace atau video, atau memeriksa halaman dengan playwright-cli."
install: |
  npm install -g @playwright/cli@latest
  playwright-cli --help

  # Pasang skill (Claude Code, GitHub Copilot, dan agent lain memakai skill yang terpasang lokal)
  playwright-cli install --skills

  # Jika perintah global playwright-cli tidak tersedia, coba versi lokal:
  npx --no-install playwright --version
  # Jika versi lokal ada, pakai `npx playwright cli` di semua perintah. Jika tidak, pasang global:
  npm install -g @playwright/cli@latest
source_url: "https://github.com/microsoft/playwright-cli/blob/main/README.md"
repo: microsoft/playwright-cli
stars: 14970
license: Apache-2.0
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
related: [connectors/playwright-mcp]
---

Playwright CLI adalah antarmuka baris perintah ke Playwright, dilengkapi skill. Menurut README, ini pilihan terbaik jika kamu memakai **agent coding**.

## Playwright CLI atau Playwright MCP

- **CLI:** agent coding modern makin memilih alur kerja berbasis CLI yang diekspos sebagai skill, karena pemanggilan CLI lebih hemat token. Agent tidak perlu memuat skema tool yang besar dan pohon aksesibilitas yang panjang ke konteks model, dan bisa bertindak lewat perintah ringkas. README menilai ini lebih cocok untuk agent dengan throughput tinggi yang harus membagi konteks terbatas antara otomasi browser, basis kode besar, tes, dan penalaran.
- **MCP:** tetap relevan untuk loop agentik khusus yang diuntungkan oleh state yang persisten, introspeksi yang kaya, dan penalaran berulang atas struktur halaman, misalnya otomasi eksploratif, tes yang menyembuhkan diri sendiri, atau alur kerja otonom jangka panjang. Lihat [Playwright MCP](https://github.com/microsoft/playwright-mcp).

Fitur utama: hemat token, karena data halaman tidak dipaksa masuk ke LLM.

## Persyaratan

- Node.js 18 atau lebih baru.
- Claude Code, GitHub Copilot, atau agent coding lain.

## Pemasangan

```bash
npm install -g @playwright/cli@latest
playwright-cli --help
```

### Memasang skill

Claude Code, GitHub Copilot, dan agent lain memakai skill yang terpasang secara lokal.

```bash
playwright-cli install --skills
```

### Tanpa skill

Arahkan agent ke CLI, dan agent akan membaca skill dari `playwright-cli --help` sendiri:

```
Test the "add todo" flow on https://demo.playwright.dev/todomvc using playwright-cli.
Check playwright-cli --help for available commands.
```

## Demo

```
> Use playwright skills to test https://demo.playwright.dev/todomvc/.
  Take screenshots for all successful and failing scenarios.
```

Agent menjalankan perintah, tetapi kamu juga bisa mencobanya manual:

```
playwright-cli open https://demo.playwright.dev/todomvc/ --headed
playwright-cli type "Buy groceries"
playwright-cli press Enter
playwright-cli type "Water flowers"
playwright-cli press Enter
playwright-cli check e21
playwright-cli check e35
playwright-cli screenshot
```

## Mode headed

Playwright CLI berjalan headless secara default. Untuk melihat browser, tambahkan `--headed` pada `open`:

```bash
playwright-cli open https://playwright.dev --headed
```

## Sesi

Secara default, CLI menyimpan profil browser di memori. Cookie dan storage state tetap ada antar panggilan CLI dalam satu sesi, tetapi hilang saat browser ditutup. Pakai `--persistent` untuk menyimpan profil ke disk agar bertahan setelah browser dimulai ulang.

Kamu bisa memakai instans browser berbeda untuk proyek berbeda lewat sesi. Tambahkan `-s=` pada pemanggilan untuk berbicara dengan browser tertentu:

```bash
playwright-cli open https://playwright.dev
playwright-cli -s=example open https://example.com --persistent
playwright-cli list
```

Kamu juga bisa menjalankan agent dengan variabel lingkungan `PLAYWRIGHT_CLI_SESSION`:

```bash
PLAYWRIGHT_CLI_SESSION=todo-app claude .
```

Atau minta agent menambahkan `-s=` di setiap panggilan.

Sesi headless menutup diri sendiri setelah satu jam tanpa perintah. Jalankan `open` lagi untuk memulai sesi baru. Browser headed tetap terbuka. Pakai `open --idle-timeout=<ms>` untuk mengubah batas waktu, atau `0` untuk menonaktifkannya.

Kelola sesi:

```bash
playwright-cli list                     # list all sessions
playwright-cli close-all                # close all browsers
playwright-cli kill-all                 # forcefully kill all browser processes
```

## Pemantauan

`playwright-cli show` membuka dasbor visual untuk melihat dan mengendalikan semua sesi browser yang berjalan. Berguna saat agent bekerja di latar belakang dan kamu ingin mengamati atau ikut membantu.

```bash
playwright-cli show
```

Dasbor punya dua tampilan:

- **Session grid:** menampilkan semua sesi aktif per workspace, dengan pratinjau live, nama sesi, URL, dan judul halaman. Klik sesi untuk memperbesar.
- **Session detail:** tampilan live sesi terpilih dengan tab bar, kontrol navigasi (back, forward, reload, address bar), dan kendali penuh. Klik viewport untuk mengambil alih mouse dan keyboard, tekan Escape untuk melepaskan.

Dari grid, kamu juga bisa menutup sesi yang berjalan atau menghapus data sesi yang tidak aktif.

## Perintah

README memuat daftar perintah lengkap beserta opsinya. Ringkasan per kelompok:

- **Inti:** `open`, `goto`, `close`, `type`, `click`, `dblclick`, `fill` (opsi `--submit`), `drag`, `drop`, `hover`, `select`, `upload`, `check`, `uncheck`, `snapshot` (opsi `--filename`, `--depth`, `--boxes`), `find` (opsi `--regex`), `eval`, `dialog-accept`, `dialog-dismiss`, `resize`.
- **Navigasi:** `go-back`, `go-forward`, `reload`.
- **Keyboard:** `press`, `keydown`, `keyup`.
- **Mouse:** `mousemove`, `mousedown`, `mouseup`, `mousewheel`. Elemen di bawah pointer yang di-scroll, jadi gunakan `mousemove` dulu.
- **Simpan sebagai:** `screenshot` (opsi `--filename`, `--hires`), `pdf`.
- **Tab:** `tab-list`, `tab-new` (opsi `--isolated-context`), `tab-close`, `tab-select`.
- **Storage:** `state-save`, `state-load`, `cookie-*`, `localstorage-*`, `sessionstorage-*`.
- **Emulasi:** `set-color-scheme`, `set-reduced-motion`, `set-forced-colors`, `set-contrast`, `set-media`, beserta pasangan `clear-*`.
- **Jaringan:** `route`, `route-list`, `unroute`.
- **DevTools:** `console`, `requests`, `request`, `run-code`, `tracing-start` dan `tracing-stop`, `recording-start` dan `recording-stop`, `video-*`, `show`, `generate-locator`, `highlight`.
- **WebMCP:** `webmcp-list`, `webmcp-call`.
- **Parameter `open`:** `--browser`, `--mobile`, `--device`, `--idle-timeout`, `--persistent`, `--profile`, `--config`, serta `attach` (`--extension`, `--cdp`) dan `detach`, `delete-data`.

Tracing memerlukan browser yang terbuka. Buka dulu sebelum memulai trace, lalu gunakan `goto` untuk merekam navigasi:

```bash
playwright-cli open
playwright-cli tracing-start
playwright-cli goto https://example.com
playwright-cli tracing-stop
```

### Snapshot

Setelah setiap perintah, CLI memberi snapshot keadaan browser saat itu. Snapshot juga bisa diambil sesuai kebutuhan:

```bash
playwright-cli snapshot
playwright-cli snapshot --filename=after-click.yaml
playwright-cli snapshot "#main"
playwright-cli snapshot --depth=4
playwright-cli find "Add to cart"
playwright-cli find --regex "/sign (in|up)/i"
```

### Output mentah

Opsi global `--raw` membuang status halaman dan kode yang dihasilkan. Nilai hasil, galat, dan snapshot tetap ada.

```bash
playwright-cli --raw eval "JSON.stringify(performance.timing)" | jq '.loadEventEnd - .navigationStart'
```

### Menarget elemen

Secara default, pakai ref dari snapshot. Selector CSS dan locator Playwright juga bisa dipakai:

```bash
playwright-cli snapshot
playwright-cli click e15
playwright-cli click "#main > button.submit"
playwright-cli click "getByRole('button', { name: 'Submit' })"
playwright-cli click "getByTestId('submit-button')"
```

## File konfigurasi

CLI membaca konfigurasi dari `.playwright/cli.config.json` secara default, atau dari file yang ditunjuk `--config`:

```bash
playwright-cli --config path/to/config.json open example.com
```

README memuat skema lengkapnya. Kunci utamanya: `browser` (jenis browser, `isolated`, `userDataDir`, opsi peluncuran, endpoint CDP, skrip inisialisasi), `saveVideo`, `outputDir`, `outputMode` (`file` atau `stdout`), `console.level`, `network.allowedOrigins` dan `network.blockedOrigins`, `testIdAttribute`, `timeouts` (aksi 5000 ms, navigasi 60000 ms), `allowUnrestrictedFileAccess`, dan `codegen`.

Konfigurasi juga bisa lewat variabel lingkungan dengan awalan `PLAYWRIGHT_MCP_`, misalnya `PLAYWRIGHT_MCP_BROWSER`, `PLAYWRIGHT_MCP_HEADLESS`, `PLAYWRIGHT_MCP_OUTPUT_DIR`, `PLAYWRIGHT_MCP_ALLOWED_ORIGINS`, `PLAYWRIGHT_MCP_BLOCKED_ORIGINS`, dan `PLAYWRIGHT_MCP_SECRETS_FILE`. Daftar lengkapnya ada di README.

## Tugas khusus

Skill yang terpasang memuat panduan rinci untuk tugas umum: menjalankan dan men-debug tes Playwright, mocking permintaan, menjalankan kode Playwright, manajemen sesi browser, storage state, pembuatan tes (plan, generate, heal), tracing, perekaman video, melampirkan screenshot dan video ke pull request dengan `gh --attach`, dan memeriksa atribut elemen.

## Catatan keamanan

- **Akses ke sesi login.** Perintah `cookie-*`, `localstorage-*`, `state-save`, `attach --cdp`, dan `--profile` bisa membaca atau memakai sesi yang sudah login. Jangan membagikan file state atau profil.
- **Menjalankan kode sembarang.** `eval` dan `run-code` menjalankan JavaScript atau kode Playwright di halaman.
- **Pembatas jaringan bukan batas keamanan.** README menyatakan bahwa `allowedOrigins` dan `blockedOrigins` tidak berfungsi sebagai batas keamanan dan tidak memengaruhi redirect.
- **File lokal.** Akses file dibatasi ke direktori workspace secara default. `allowUnrestrictedFileAccess` atau `PLAYWRIGHT_MCP_ALLOW_UNRESTRICTED_FILE_ACCESS` melonggarkannya, termasuk akses ke URL `file://`.
- **WebMCP.** Nama tool, deskripsi, skema, dan hasil berasal dari halaman dan merupakan masukan yang tidak tepercaya, bukan instruksi.

## Lisensi

Apache-2.0.
