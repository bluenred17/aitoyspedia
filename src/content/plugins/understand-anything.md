---
title: "Understand Anything"
summary: "Plugin multi-agent yang mengubah codebase, basis pengetahuan, atau dokumentasi menjadi graf pengetahuan interaktif."
category: coding
tags: [codebase, graf-pengetahuan, onboarding, dokumentasi]
surfaces: [claude-code]
source_url: "https://github.com/Egonex-AI/Understand-Anything/blob/main/README.md"
repo: Egonex-AI/Understand-Anything
stars: 90478
license: MIT
added: 2026-11-04
last_verified: 2026-11-04
status: aktif
install: |
  /plugin marketplace add Egonex-AI/Understand-Anything
  /plugin install understand-anything
includes: [understand, understand-dashboard, understand-chat, understand-diff, understand-explain, understand-onboard, understand-domain, understand-knowledge]
---

**Ubah codebase, basis pengetahuan, atau dokumentasi apa pun menjadi graf pengetahuan interaktif yang bisa kamu jelajahi, cari, dan tanyai.** Bekerja dengan Claude Code, Codex, Cursor, Copilot, Gemini CLI, dan lainnya. Demo langsung dan halaman utama ada di [understand-anything.com](https://understand-anything.com/).

**Kamu baru bergabung dengan tim. Codebase-nya 200.000 baris kode. Mulai dari mana?**

Understand Anything adalah [plugin Claude Code](https://code.claude.com/docs/en/plugins-reference#plugins-reference) yang menganalisis proyekmu dengan pipeline multi-agent, membangun graf pengetahuan dari setiap file, fungsi, kelas, dan dependensi, lalu membantumu memahami semuanya secara visual.

> **Tujuannya bukan graf yang membuatmu terkesan dengan rumitnya codebase, melainkan graf yang diam-diam mengajarkan bagaimana setiap bagian saling terhubung.**

## Fitur

### Jelajahi graf struktural

Telusuri codebase sebagai graf pengetahuan interaktif: setiap file, fungsi, dan kelas adalah node yang bisa diklik, dicari, dan dijelajahi. Pilih node mana pun untuk melihat ringkasan dalam bahasa sehari-hari, relasi, dan tur terpandu.

### Pahami logika bisnis

Beralih ke tampilan domain dan lihat bagaimana kodemu dipetakan ke proses bisnis nyata: domain, alur, dan langkah ditata sebagai graf horizontal.

### Analisis basis pengetahuan

Arahkan `/understand-knowledge` ke [wiki LLM berpola Karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) dan dapatkan graf pengetahuan force-directed dengan pengelompokan komunitas. Parser deterministik mengekstrak wikilink dan kategori dari `index.md`, lalu agent LLM menemukan relasi implisit, mengekstrak entitas, dan memunculkan klaim, sehingga wikimu menjadi graf gagasan yang saling terhubung dan bisa dinavigasi.

| | |
|---|---|
| **Tur terpandu.** Panduan arsitektur yang dibuat otomatis, diurutkan menurut dependensi. Pelajari codebase dengan urutan yang benar. | **Pencarian fuzzy dan semantik.** Temukan apa pun lewat nama atau maknanya. Cari "bagian mana yang menangani auth?" dan dapatkan hasil yang relevan di seluruh graf. |
| **Analisis dampak diff.** Lihat bagian sistem mana yang terpengaruh perubahanmu sebelum commit. Pahami efek riaknya di seluruh codebase. | **UI yang menyesuaikan persona.** Dashboard mengatur tingkat detailnya menurut siapa kamu: developer junior, PM, atau power user. |
| **Visualisasi layer.** Pengelompokan otomatis menurut layer arsitektur (API, Service, Data, UI, Utility) dengan legenda berkode warna. | **Konsep bahasa.** 12 pola pemrograman (generics, closure, decorator, dan lainnya) dijelaskan dalam konteks di mana pun muncul. |

## Mulai cepat

### 1. Pasang plugin

```bash
/plugin marketplace add Egonex-AI/Understand-Anything
/plugin install understand-anything
```

> **Memakai model lokal?** Untuk privasi atau kebutuhan perusahaan, arahkan platformmu ke penyedia model lokal seperti [Ollama](https://docs.ollama.com/integrations). Ikuti panduan integrasi mereka untuk mengganti penyedia model.

### 2. Analisis codebase kamu

```bash
/understand
```

Pipeline multi-agent memindai proyekmu, mengekstrak setiap file, fungsi, kelas, dan dependensi, lalu membangun graf pengetahuan yang disimpan di `.ua/knowledge-graph.json`. (Proyek yang sudah punya direktori `.understand-anything/` tetap memakainya: direktori itu tetap menjadi direktori data bila ada, jadi tidak ada yang perlu dimigrasi.)

> **Perhatian soal pemakaian token:** `/understand` pertama menganalisis seluruh codebase dan bisa menghabiskan token dalam jumlah besar pada proyek besar. Disarankan menjalankannya dengan paket token atau langganan, atau memakai model lokal (lihat di atas) untuk inisialisasi. Eksekusi berikutnya bersifat inkremental secara default (hanya file yang berubah yang dianalisis ulang), sehingga jauh lebih hemat token.

**Keluaran berbahasa lokal:** gunakan `--language` untuk menghasilkan konten dalam bahasa pilihanmu:

```bash
# Generate Chinese content (知识图节点描述和 Dashboard UI)
/understand --language zh

# Supported languages: en (default), zh, zh-TW, ja, ko, ru, vi
```

Pada **eksekusi pertama** di sebuah proyek, saat kamu tidak memberi `--language` dan belum ada bahasa tersimpan, `/understand` mendeteksi bahasa yang kamu pakai dalam percakapan. Jika bukan bahasa Inggris, ia meminta konfirmasi (atau penggantian) sebelum menghasilkan konten; percakapan berbahasa Inggris tidak terpengaruh. Pilihanmu disimpan di `.ua/config.json` dan dipakai lagi pada setiap eksekusi berikutnya.

Parameter `--language` memengaruhi:

- Ringkasan dan deskripsi node di graf pengetahuan
- Label, tombol, dan tooltip UI dashboard
- Penjelasan tur terpandu

### 3. Jelajahi dashboard

```bash
/understand-dashboard
```

Dashboard web interaktif terbuka dengan codebase-mu divisualisasikan sebagai graf yang berkode warna menurut layer arsitektur, bisa dicari, dan bisa diklik. Pilih node mana pun untuk melihat kodenya, relasinya, dan penjelasan dalam bahasa sehari-hari.

### 4. Terus belajar

```bash
# Ask anything about the codebase
/understand-chat How does the payment flow work?

# Analyze impact of your current changes
/understand-diff

# Deep-dive into a specific file or function
/understand-explain src/auth/login.ts

# Generate an onboarding guide for new team members
/understand-onboard

# Extract business domain knowledge (domains, flows, steps)
/understand-domain

# Analyze a Karpathy-pattern LLM wiki knowledge base
/understand-knowledge ~/path/to/wiki

# Re-run anytime — incremental by default (only re-analyzes changed files)
/understand

# Auto-update on every commit via a post-commit hook
/understand --auto-update

# Scope to a subdirectory (for huge monorepos)
/understand src/frontend
```

## Instalasi multi-platform

Understand-Anything bekerja di banyak platform coding AI.

### Claude Code (native)

```bash
/plugin marketplace add Egonex-AI/Understand-Anything
/plugin install understand-anything
```

### Instalasi satu baris (Codex / OpenCode / OpenClaw / Antigravity / Gemini CLI / Pi Agent / Vibe CLI / VS Code Copilot / Hermes / Cline / KIMI CLI / Trae / Nanobot / Kiro)

> **Catatan dari situs ini, bukan dari README:** dua perintah di bawah mengunduh skrip dari repo proyek ini lalu langsung menjalankannya. Baca isi `install.sh` / `install.ps1` di repo sebelum menjalankannya.

**macOS / Linux:**

```bash
curl -fsSL https://raw.githubusercontent.com/Egonex-AI/Understand-Anything/main/install.sh | bash
# or skip the prompt by passing the platform:
curl -fsSL https://raw.githubusercontent.com/Egonex-AI/Understand-Anything/main/install.sh | bash -s codex
```

**Windows (PowerShell):**

```powershell
iwr -useb https://raw.githubusercontent.com/Egonex-AI/Understand-Anything/main/install.ps1 | iex
```

Installer meng-clone repo ke `~/.understand-anything/repo` dan membuat symlink yang tepat untuk platform yang dipilih. Mulai ulang CLI/IDE-mu setelahnya.

> **Catatan soal menjalankan skill:** prefiks pemanggilan berbeda di tiap platform. Kebanyakan platform memakai perintah slash (`/understand`), tetapi **Codex memakai `$`**: ketik `$understand`, bukan `/understand`. Jika kedua prefiks tidak dikenali di platformmu, cukup minta dengan kalimat biasa: *"Gunakan skill understand untuk menganalisis proyek ini."*

- Nilai `<platform>` yang didukung: `gemini`, `codex`, `opencode`, `pi`, `openclaw`, `antigravity`, `vibe`, `vscode`, `hermes`, `cline`, `kimi`, `trae`, `nanobot`, `kiro`
- Perbarui nanti:
  - macOS / Linux: `./install.sh --update`
  - Windows: `& "$HOME/.understand-anything/repo/install.ps1" -Update`
- Hapus instalasi:
  - macOS / Linux: `./install.sh --uninstall <platform>`
  - Windows: `& "$HOME/.understand-anything/repo/install.ps1" -Uninstall <platform>`

### Cursor

Cursor menemukan plugin ini secara otomatis lewat `.cursor-plugin/plugin.json` saat repo di-clone. Tidak perlu instalasi manual: cukup clone dan buka di Cursor.

Jika penemuan otomatis tidak berhasil, pasang manual: buka **Cursor Settings → Plugins**, tempel `https://github.com/Egonex-AI/Understand-Anything` ke kolom pencarian, lalu tambahkan dari sana.

### VS Code + GitHub Copilot

VS Code dengan GitHub Copilot (v1.108+) menemukan plugin ini secara otomatis lewat `.copilot-plugin/plugin.json` saat repo di-clone. Tidak perlu instalasi manual: cukup clone dan buka di VS Code.

Untuk skill pribadi (tersedia di semua proyek), jalankan `install.sh` di atas dengan platform `vscode`.

### Copilot CLI

```bash
copilot plugin install Egonex-AI/Understand-Anything:understand-anything-plugin
```

### Kiro CLI / IDE

```bash
curl -fsSL https://raw.githubusercontent.com/Egonex-AI/Understand-Anything/main/install.sh | bash -s kiro
```

Setelah instalasi:

- **Kiro CLI**: `kiro-cli chat --agent understand "Analyze this project"`
- **Kiro IDE**: skill di-symlink ke `~/.kiro/skills/` dan agent `understand` ditulis ke `~/.kiro/agents/understand.json`, sehingga keduanya tersedia setelah IDE dimulai ulang.

Untuk skill pribadi (tersedia di semua proyek), jalankan `install.sh` di atas dengan platform `kiro`.

### Kompatibilitas platform

| Platform | Status | Cara instal |
|----------|--------|-------------|
| Claude Code | Native | Marketplace plugin |
| Cursor | Didukung | Penemuan otomatis |
| VS Code + GitHub Copilot | Didukung | Penemuan otomatis |
| Copilot CLI | Didukung | Instal plugin |
| Codex | Didukung | `install.sh codex` |
| OpenCode | Didukung | `install.sh opencode` |
| OpenClaw | Didukung | `install.sh openclaw` |
| Antigravity | Didukung | `install.sh antigravity` |
| Gemini CLI | Didukung | `install.sh gemini` |
| Pi Agent | Didukung | `install.sh pi` |
| Vibe CLI | Didukung | `install.sh vibe` |
| Hermes | Didukung | `install.sh hermes` |
| Cline | Didukung | `install.sh cline` |
| KIMI CLI | Didukung | `install.sh kimi` |
| Trae | Didukung | `install.sh trae` |
| Nanobot | Didukung | `install.sh nanobot` |
| Kiro CLI / IDE | Didukung | `install.sh kiro` |

## Bagikan graf ke tim kamu

Grafnya hanyalah JSON: **commit sekali, dan rekan tim tidak perlu menjalankan pipeline**. Cocok untuk onboarding, review PR, dan docs-as-code.

> **Contoh:** [GoogleCloudPlatform/microservices-demo](https://github.com/GoogleCloudPlatform/microservices-demo), referensi Go / Java / Python / Node dengan graf yang sudah di-commit.

**Yang di-commit:** semua isi `.ua/` *kecuali* `intermediate/` dan `diff-overlay.json` (keduanya sementara dan lokal). (Proyek lama memakai `.understand-anything/`; ganti nama direktori di bawah jika itu yang ada.)

```gitignore
.ua/intermediate/
.ua/diff-overlay.json
```

**Jaga tetap segar:** aktifkan `/understand --auto-update`; hook post-commit menambal graf secara inkremental sehingga tiap commit tiba bersama graf yang sesuai. Atau jalankan `/understand` manual sebelum rilis.

**Graf besar (10 MB+):** lacak dengan **git-lfs**.

```bash
git lfs install
git lfs track ".ua/*.json"
git add .gitattributes .ua/
```

### Melihat dashboard tanpa Claude Code

Setelah graf dibuat dan di-commit, siapa pun di tim bisa membukanya dengan satu perintah, tanpa Claude Code, tanpa LLM, tanpa API key. Hanya Node.js (>= 18) yang dibutuhkan:

```bash
npx https://github.com/Egonex-AI/Understand-Anything/releases/latest/download/understand-anything-viewer.tgz /path/to/analyzed/project
```

Terminal mencetak URL bertoken (`http://127.0.0.1:5173/?token=…`) dan membuka dashboard interaktif penuh di browser. Direktori proyek (default: direktori saat ini) harus berisi direktori data yang sudah di-commit (`.ua/`, atau `.understand-anything/` versi lama). Semuanya disajikan baca-saja dari disk lokal: tidak ada panggilan LLM dan tidak ada data yang keluar dari mesinmu.

Bekerja dari clone? `pnpm install && pnpm --filter @understand-anything/core build`, lalu `GRAPH_DIR=/path/to/analyzed/project pnpm dev:dashboard` melakukan hal yang sama lewat dev server Vite.

## Di balik layar

### Hibrida Tree-sitter dan LLM

Analisis statis dan LLM mengerjakan apa yang masing-masing kuasai:

- **Tree-sitter (deterministik)** mem-parse sumber menjadi concrete syntax tree dan mengekstrak fakta struktural: import, export, definisi fungsi/kelas, titik pemanggilan, pewarisan. Hasilnya di-resolve lebih dulu menjadi `importMap` pada fase pemindaian dan diteruskan ke file-analyzer agar tidak menurunkan import dari sumber lagi. Masukan sama menghasilkan keluaran sama, setiap kali. Juga menjadi dasar deteksi perubahan berbasis fingerprint untuk pembaruan inkremental.
- **LLM (semantik)** membaca struktur hasil parse bersama sumber aslinya untuk menghasilkan yang tidak bisa dihasilkan parser: ringkasan bahasa sehari-hari, tag, penetapan layer arsitektur, pemetaan domain bisnis, tur terpandu, dan catatan konsep bahasa.

Pemisahan inilah yang membuat graf bisa direproduksi di sisi struktural (kode yang sama selalu menghasilkan edge yang sama) sambil tetap menangkap maksud di sisi semantik (untuk apa sebuah file, bukan hanya apa yang diimpornya).

### Pipeline multi-agent

Perintah `/understand` mengorkestrasi 5 agent khusus, `/understand-domain` menambahkan yang ke-6, dan `/understand-knowledge` menambahkan yang ke-7:

| Agent | Peran | Dipakai oleh |
| --- | --- | --- |
| `project-scanner` | Menemukan file, mendeteksi bahasa dan framework | `/understand` |
| `file-analyzer` | Mengekstrak fungsi, kelas, import; menghasilkan node dan edge graf | `/understand` |
| `architecture-analyzer` | Mengidentifikasi layer arsitektur | `/understand` |
| `tour-builder` | Membuat tur belajar terpandu | `/understand` |
| `graph-reviewer` | Memvalidasi kelengkapan graf dan integritas referensial. Berjalan inline secara default; pakai `--review` untuk review LLM penuh | `/understand` |
| `domain-analyzer` | Mengekstrak domain bisnis, alur, dan langkah proses | `/understand-domain` |
| `article-analyzer` | Mengekstrak entitas, klaim, dan relasi implisit dari artikel wiki | `/understand-knowledge` |

File analyzer berjalan paralel, hingga 5 worker bersamaan dan 20 sampai 30 file per batch.

Pipeline juga mendukung pembaruan inkremental: hanya file yang berubah sejak eksekusi terakhir yang dianalisis ulang.

## Lisensi

Lisensi MIT. Hak cipta (c) Yuxiang Lin dan Infinite Universe, Inc.
