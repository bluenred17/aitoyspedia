---
title: "Impeccable"
summary: "Kumpulan perintah dan detektor desain untuk mengarahkan, meninjau, dan menyempurnakan antarmuka yang dibuat coding agent."
category: image
tags: [desain, ui, review, detektor]
surfaces: [claude-code]
source_url: "https://github.com/pbakaus/impeccable/blob/main/README.md"
repo: pbakaus/impeccable
stars: 102143
license: Apache-2.0
added: 2026-11-04
last_verified: 2026-11-04
status: aktif
trigger: "Ketik /impeccable diikuti nama perintah dan target (misalnya /impeccable critique the pricing cards). Jalankan /impeccable init sekali per proyek."
install: |
  npx impeccable install
---

Kosakata desain untuk coding agent kamu. Arahkan dengan `polish` dan `bolder`, tinjau dengan `critique` dan `audit`, dan tangkap AI slop sebelum rilis.

Dari root proyek:

```bash
npx impeccable install
```

Muat ulang coding tool kamu, lalu jalankan `/impeccable init` di agent (`$impeccable init` di Codex).

Bekerja dengan Claude Code, Cursor, Codex CLI, GitHub Copilot, Devin, Replit Agent, Gemini CLI, Grok Build, OpenCode, Google Antigravity, Kiro, Trae, Rovo Dev, Qoder, Mistral Vibe, Pi, Hermes Agent, DeepSeek Harness, dan Veto. Dokumentasi lengkap ada di [impeccable.style/docs](https://impeccable.style/docs).

| Tanpa Impeccable | Dengan Impeccable |
|---|---|
| ![Villa Castagneto dibuat tanpa Impeccable: latar krem, judul serif tipis dengan aksen miring, dua tombol pil, dan ilustrasi vektor datar dalam kartu membulat](https://github.com/pbakaus/impeccable/raw/main/docs/images/readme-without.webp) | ![Villa Castagneto dibuat dengan Impeccable: pemandangan malam berukir layar penuh dari vila di atas tebing menghadap laut, judul krem dan merah vermilion yang ramping, serta strip bulan di bagian bawah](https://github.com/pbakaus/impeccable/raw/main/docs/images/readme-with.webp) |

Model yang sama (Fable 5.1), brief yang sama: wisma keluarga berkamar empat belas di pesisir Liguria. Tanpa Impeccable, hasilnya adalah desain default yang aman: halaman krem, serif tipis, aksen miring, tombol pil. Dengan Impeccable, halaman dibangun di sekitar satu gambar: rumah itu di malam hari, dilihat dari laut.

Untuk proyek utuh, lihat [studi kasus Neo Mirai](https://impeccable.style/cases/neo-mirai): situs konferensi yang dibawa dari mockup sampai halaman yang dirilis.

## Mengapa

Inter untuk semuanya. Gradasi ungu ke biru. Kartu di dalam kartu, teks abu-abu di atas latar berwarna, ubin ikon persegi membulat di atas setiap judul. Minta agent membuat halaman tanpa arahan lain dan pola-pola ini muncul berulang kali, di berbagai model dan proyek.

- **Kata-kata untuk apa yang kamu mau.** "Bikin lebih menonjol" membuat agent menebak. `/impeccable bolder the pricing cards` memuat panduan yang ditulis khusus untuk satu langkah itu dan mengarahkannya ke satu target.
- **Seorang peninjau.** `critique` menilai desain berdasarkan heuristik usability dan mengurutkan apa yang harus diperbaiki lebih dulu. `audit` memeriksa aksesibilitas, performa, tema, dan perilaku responsif, dengan temuan diberi peringkat dari P0 (menghalangi) sampai P3 (poles).
- **Detektor slop.** 62 aturan deterministik menandai ciri-ciri di atas, ditambah masalah kualitas seperti padding sempit dan judul yang terlewat. Tanpa LLM, tanpa API key.

Impeccable paling kuat pada antarmuka yang sudah ada: arahkan ke sebuah halaman atau komponen lalu iterasi. Ia juga bisa membuat halaman baru; lihat [Build something new](https://impeccable.style/docs/new-work) untuk cara memanfaatkan mode yang lebih sulit itu. Untuk mulai, pilih satu komponen:

```
/impeccable critique the pricing cards
```

## Cara kerja

Jalankan `/impeccable init` sekali per proyek. Perintah ini membaca kodemu, hanya menanyakan apa yang tidak bisa disimpulkan (untuk siapa produknya, apa yang harus dilakukannya, batasannya), dan menulis `PRODUCT.md`. Setiap perintah berikutnya membacanya. Jalankan `/impeccable document` untuk menyimpan sistem visual yang sudah ada ke `DESIGN.md`, supaya perubahan tetap sesuai brand. [Selengkapnya tentang file konteks](https://impeccable.style/docs/context).

Lalu sebutkan perintah dan target:

```
/impeccable critique the onboarding flow
/impeccable quieter the landing page
/impeccable polish settings
/impeccable harden checkout
```

Atau cukup jelaskan apa yang kamu mau: `/impeccable redo this hero section`. Target yang sempit memberi hasil lebih baik; satu bagian yang ditinjau dengan teliti mengalahkan seluruh halaman yang dilihat sekilas. Sematkan perintah yang sering dipakai dengan `/impeccable pin audit` agar `/audit` menjadi pintasannya sendiri.

### 24 perintah

| | Perintah |
|---|---|
| **Mengarahkan** | `bolder` mempertegas desain yang terlalu aman · `quieter` meredam yang terlalu ramai · `distill` membuang yang tidak dibutuhkan halaman · `colorize` memberi warna pada antarmuka abu-abu · `typeset` memperbaiki font, hierarki, dan ukuran · `layout` memperbaiki jarak dan ritme · `animate` menambah transisi dan umpan balik interaksi · `delight` menambah kepribadian · `overdrive` memakai shader, fisika pegas, dan efek yang digerakkan scroll |
| **Meninjau** | `critique` adalah tinjauan UX bernilai skor · `audit` adalah laporan kualitas teknis |
| **Menyelesaikan** | `polish` adalah pass terakhir sebelum rilis · `harden` mencakup error, i18n, overflow, dan kasus tepi · `clarify` menulis ulang teks yang tidak jelas · `adapt` menangani ukuran layar dan perangkat · `optimize` memperbaiki performa loading dan rendering · `onboard` merancang alur pertama kali pakai dan keadaan kosong |
| **Iterasi langsung** | `live` memungkinkan kamu memilih elemen di browser dan menggilir varian · `generate` membuat varian dari elemen yang disebutkan tanpa memilih manual |
| **Merencanakan dan menyiapkan** | `shape` merencanakan UX sebelum kode · `init` menulis `PRODUCT.md` · `document` menulis `DESIGN.md` · `extract` menarik pola yang berulang ke sistem desainmu |

Yang ke-24, `craft`, adalah alias usang untuk permintaan build biasa. Ketik `/impeccable` saja untuk melihat daftarnya di agent kamu. Tiap perintah punya halamannya sendiri: [impeccable.style/docs](https://impeccable.style/docs).

Di Codex, buka `/skills` atau ketik `$impeccable` sebagai ganti perintah slash.

### Live mode

`/impeccable live` membuka dev server yang sedang berjalan dengan overlay. Pilih sebuah elemen, pilih arah, dan Impeccable menukar varian langsung di tempat. Terima salah satunya dan hasilnya ditulis kembali ke sumber kodemu. Bekerja dengan Vite, Next, SvelteKit, Astro, Nuxt, dan HTML biasa. [Iterasi di browser](https://impeccable.style/tutorials/iterate-live).

Live mode hanya mengedit checkout lokal; jangan menyuntikkannya ke situs yang sudah di-deploy atau melemahkan CSP produksi agar bisa berjalan. Menerapkan perubahan teks menjalankan skrip opsional `impeccable:manual-edit-validate` di `package.json` milikmu dengan izin yang kamu punya, jadi tinjau dulu sebelum memakai live mode di repo yang belum dikenal.

> **Peringatan keamanan dari README:** Apply mengirim perubahan teks yang sudah disiapkan ke agent chat selama sesi live sedang polling. Jika tidak ada yang polling dalam satu menit terakhir, Apply menjalankan CLI `codex` dari PATH (atau `claude` jika codex tidak ada), dengan persetujuan, pemeriksaan izin, dan sandbox dimatikan (`--dangerously-bypass-approvals-and-sandbox` atau `--permission-mode bypassPermissions`) dan environment kamu diwariskan. Prompt-nya memuat perubahan yang disiapkan, HTML elemen yang diedit dan teks di sekitarnya, URL halaman, dan kandidat path sumber. Atur `IMPECCABLE_LIVE_COPY_AGENT=chat` di environment yang memulai live mode agar Apply tetap di sesi chat kamu, atau `off` untuk mematikan Apply. Server membacanya sekali saat startup.

## Tiga cara menjalankan detektor

**Di agent kamu.** Hook desain memindai setiap file UI yang diedit agent dan mengembalikan temuannya sebelum agent menyatakan pekerjaan selesai. Di sinilah kebanyakan slop tertangkap: tanpa hook, detektor hanya berjalan saat seseorang ingat menjalankannya. Tersedia di Claude Code, Cursor, Codex, GitHub Copilot, Grok Build, dan Hermes Agent, dan installer yang memasangnya. Pilih ya. [Pemeriksaan desain otomatis](https://impeccable.style/docs/hooks).

**Di CI atau terminal.** CLI tidak butuh agent:

```bash
npx impeccable detect src/                   # scan a directory
npx impeccable detect https://example.com    # scan a rendered page (uses your installed Chrome or Edge)
npx impeccable detect --json .               # machine-readable output
npx impeccable detect --github src/          # GitHub Actions annotations
npx impeccable detect --list-rules           # every rule with its id and description
```

File sumber seperti JSX dan TSX hanya diperiksa dengan aturan pola. Aturan yang butuh halaman yang sudah dirender, seperti kontras rendah dan teks terlalu kecil, berjalan saat kamu memindai URL, jadi arahkan juga CLI ke dev server kamu: `npx impeccable detect http://localhost:5173`.

Exit code `2` berarti ada temuan, `1` berarti target tidak bisa dipindai. Untuk mengizinkan font brand kamu di mana-mana, jalankan `npx impeccable ignores add-value overused-font Inter --reason "Brand font"`. Untuk mematikan sebuah aturan pada satu file, tambahkan komentar: `<!-- impeccable-disable overused-font: exported brand doc -->`. [Menjalankan pemindaian detektor](https://impeccable.style/docs/detector) · [Konfigurasi dan pengabaian](https://impeccable.style/docs/config).

**Di browser kamu.** [Ekstensi Chrome](https://chromewebstore.google.com/detail/impeccable/bdkgmiklpdmaojlpflclinlofgjfpabf) menempelkan temuan yang sama di atas halaman live mana pun, milikmu atau milik orang lain. [Tinjau dengan overlay visual](https://impeccable.style/tutorials/critique-with-overlay).

## Instalasi

```bash
npx impeccable install
```

Installer mendeteksi coding tool kamu, menanyakan apakah dipasang untuk proyek ini atau global, dan menawarkan hook desain di tempat tool kamu mendukungnya. Terima hook-nya. Muat ulang tool kamu setelahnya. `npx impeccable update` menyegarkan instalasi yang ada. Untuk skrip, berikan `--providers=claude,codex,cursor` dan `--scope=project|global`.

Tiga tool butuh satu langkah lagi sebelum hook berjalan. Di Codex, buka `/hooks` dan setujui hook proyek (setujui lagi setelah update yang mengubahnya). Di Grok Build, jalankan `/hooks-trust` atau mulai dengan `--trust`. Di Hermes Agent, hook berupa plugin: jalankan `hermes plugins enable impeccable-design-hook` sekali. [Mengizinkan hook di harness kamu](https://impeccable.style/docs/hooks#allow-the-hook-in-your-harness).

Node hanya dibutuhkan untuk `npx`. Skill itu sendiri menjalankan binary engine mandiri yang disertakan di sampingnya atau diunduh sekali ke `~/.impeccable/bin/`.

#### Plugin Claude Code, Copilot, dan Grok

**Claude Code:** `/plugin marketplace add pbakaus/impeccable`, lalu buka `/plugin` dan pasang Impeccable.

**GitHub Copilot di VS Code:** pasang [Impeccable dari Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=renaissance-geek.impeccable) atau jalankan `code --install-extension renaissance-geek.impeccable`. Butuh VS Code 1.109.3+, Copilot Chat, dan workspace tepercaya. Ini memasang skill tanpa hook. [Detail](https://github.com/pbakaus/impeccable/blob/main/docs/VSCODE-EXTENSION.md).

**Grok Build:** `grok plugin install pbakaus/impeccable#plugin --trust` memasang skill, agent, dan hook.

#### Git submodule (versi terkunci untuk seluruh tim)

```bash
git submodule add https://github.com/pbakaus/impeccable vendor/impeccable
npx impeccable link --source=vendor/impeccable --providers=claude,cursor
```

Commit `.gitmodules`, submodule, dan link yang dihasilkan. Rekan tim menjalankan `git submodule update --init --recursive`. Untuk upgrade, jalankan `git submodule update --remote vendor/impeccable`, jalankan ulang perintah `link`, lalu commit. Linking memasang skill, bukan hook. Folder skill yang sudah ada tidak diganti kecuali kamu memberi `--force`.

#### Salin manual, tanpa Node

Unduh ZIP untuk tool kamu dari [impeccable.style](https://impeccable.style), atau clone repo ini: build tiap tool di-commit di root repo. Salin `skills/impeccable` dari folder di bawah ini ke tempat yang sama di proyekmu, atau ke folder global.

| Tool | Folder repo | Folder skills global |
|---|---|---|
| Claude Code | `.claude/` | `~/.claude/skills/` |
| Cursor | `.cursor/` | |
| Codex CLI, Replit Agent | `.agents/` | `~/.agents/skills/` |
| Devin | `.devin/` | `${XDG_CONFIG_HOME:-$HOME/.config}/devin/skills/` |
| GitHub Copilot | `.github/` | |
| Gemini CLI | `.gemini/` | |
| Google Antigravity | `.agent/` | `~/.gemini/config/skills/` |
| OpenCode | `.opencode/` | |
| Grok Build | `.grok/` | `~/.grok/skills/` |
| Hermes Agent | `.hermes/` | `${HERMES_HOME:-$HOME/.hermes}/skills/` |
| DeepSeek Harness | `.dsh/` | `${DSH_HOME:-$HOME/.dsh}/skills/` |
| Pi | `.pi/` | |
| Qoder | `.qoder/` | `~/.qoder/skills/` |
| Rovo Dev | `.rovodev/` | `~/.rovodev/skills/` |
| Mistral Vibe | `.vibe/` | `~/.vibe/skills/` |
| Trae | `.trae/` | `~/.trae/skills/` |
| Trae China | `.trae-cn/` | `~/.trae-cn/skills/` |

Contoh: `mkdir -p your-project/.claude/skills && cp -r .claude/skills/impeccable your-project/.claude/skills/`.

Catatan:

- Salin manual melewati hook desain dan subagent. Jalankan `npx impeccable install` untuk mendapatkannya; perintah itu menulis hook tiap tool yang menunjuk ke path skill yang benar.
- OpenCode juga butuh `.opencode/commands/impeccable.md` disalin ke `.opencode/commands/` proyekmu agar `/impeccable` tersedia.
- Hermes meminta kamu memercayai skill lokal proyek satu kali: jalankan `hermes skills trust` dari root proyek. Instalasi global tidak butuh langkah ini.
- Cursor dan Gemini CLI mungkin perlu Agent Skills diaktifkan di pengaturan. Lihat dokumentasi skills [Cursor](https://cursor.com/docs/context/skills) dan [Gemini CLI](https://geminicli.com/docs/cli/skills/).
- Mulai ulang Trae setelah menyalin.
- `impeccable install` dan `update` hanya mengelola salinan global DeepSeek Harness jika `DSH_HOME` berada di dalam direktori home kamu.

## File proyek dan git

Impeccable menulis file kerjanya di bawah `.impeccable/`. Sebagian adalah artefak proyek bersama yang harus ada di repo: `config.json`, `live/config.json`, `design.json`, `surfaces/*.md`, dan `critique/*.md`. Simpan juga `PRODUCT.md` dan `DESIGN.md` di repo. Sisanya adalah screenshot, cache, dan status runtime.

#### Salin entri `.gitignore`

```gitignore
# impeccable-ignore-start
# Ephemeral output, runtime state, and per-dev overrides.
# The **/ prefix covers .impeccable at the repo root or in a nested workspace.
# Shared artifacts stay tracked: config.json, live/config.json,
# design.json, surfaces/*.md, critique/*.md.
**/.impeccable/config.local.json
**/.impeccable/hook.cache.json
**/.impeccable/hook.pending.json
**/.impeccable/*.png
**/.impeccable/review/
**/.impeccable/questions/
**/.impeccable/live/server.json
**/.impeccable/live/sessions/
**/.impeccable/live/previews/
**/.impeccable/live/annotations/
**/.impeccable/live/cache/
**/.impeccable/live/manual-edit-apply-transaction.json
**/.impeccable/live/manual-edit-events.jsonl
**/.impeccable/live/manual-edit-evidence/
**/.impeccable/live/pending-manual-edits.json
**/.impeccable/live/deferred-svelte-component-accepts.json
**/.impeccable/live/*.png
# impeccable-ignore-end
```

Folder yang menyimpan status putaran keputusan (`.impeccable/questions/`, `.impeccable/mocks/worlds/`) juga mengabaikan dirinya sendiri. `.gitignore` tidak bisa berhenti melacak file yang sudah dilacak git; jika kamu pernah meng-commit-nya, jalankan `git rm --cached <path>`.

## Perlu diketahui

**Jalur build.** Untuk landing page dan permukaan showcase baru, Impeccable bisa membuat comp berfidelitas penuh lebih dulu lalu membangun agar cocok dengannya (lebih berani, lebih lambat), atau langsung membangun dalam kode (lebih ramping, lebih cepat). Layar aplikasi dan dokumen selalu dibangun dalam kode. `init` bertanya sekali dan menyimpan jawabannya sebagai `buildPath` di `.impeccable/config.json`; halaman keputusan memungkinkan kamu menimpanya untuk satu sesi. Pilihan ini hanya muncul ketika harness kamu bisa menghasilkan gambar. [Pembuatan gambar](https://impeccable.style/docs/image-generation) · [Konfigurasi](https://impeccable.style/docs/config).

**Hook berjalan di luar persetujuan model.** Di Claude Code, command hook yang terpasang tetap berjalan bahkan ketika kamu menolak perintah milik model, jadi edit pertama bisa mengunduh engine. Tinjau hook yang terpasang sebelum menjalankan tanpa pengawasan, atau berikan `--settings '{"disableAllHooks": true}'` untuk mematikannya pada satu kali jalan. Installer membiarkan entri hook yang tidak ia tambahkan.

**Ada yang rusak?** `/impeccable doctor` menemukan file konteks yang usang, pengaturan yang tidak terpakai, dan hook yang rusak. [Memperbaiki masalah setup](https://impeccable.style/docs/doctor).

**Telemetri.** Saat desain baru dimulai, skill mengambil sekumpulan arah visual dari katalog impeccable.style. Mematikan telemetri tidak menghentikan permintaan itu; ia menghentikan catatan anonim tentang arah mana yang ditampilkan dan mana yang kamu pilih, yang menjadi cara katalog belajar apa yang berhasil. Nama proyek, file, kode, dan `PRODUCT.md` kamu tidak pernah dikirim. Matikan telemetri dengan `npx impeccable telemetry off`, `DO_NOT_TRACK=1`, atau `"telemetry": false` di `.impeccable/config.json` untuk seluruh proyek. Daftar lengkap yang dikirim ada di [halaman privasi](https://impeccable.style/privacy).

## Lisensi

Apache 2.0. Lihat [LICENSE](https://github.com/pbakaus/impeccable/blob/main/LICENSE). Impeccable bermula dari skill [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) milik Anthropic.

Dibuat oleh [Paul Bakaus](https://www.paulbakaus.com)
