---
title: "Graphify"
summary: "Skill dan CLI yang memetakan seluruh proyek (kode, dokumen, PDF, gambar, video) menjadi knowledge graph yang bisa di-query alih-alih meng-grep file, dengan kode diurai lokal lewat tree-sitter dan setiap edge diberi tag keyakinan."
category: coding
tags: [knowledge-graph, codebase, tree-sitter, query, arsitektur, token, cli, mcp, python]
surfaces: [claude-code]
source_url: "https://github.com/Graphify-Labs/graphify/blob/v8/README.md"
repo: Graphify-Labs/graphify
stars: 142610
license: Apache-2.0
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
trigger: "Ketik /graphify di asisten coding AI kamu (di Codex pakai $graphify) untuk membangun graph proyek; setelah graph ada, gunakan /graphify query, path, dan explain untuk bertanya."
install: |
  # Prasyarat: Python 3.10+ dan uv (atau pipx)
  uv tool install graphifyy      # pasang CLI (atau: pipx install graphifyy)
  graphify install               # mendeteksi asistenmu dan mendaftarkan skill

  # Lalu, di asisten AI kamu:
  # /graphify .

  # Pilihan metode pemasangan (pilih satu):
  uv tool install graphifyy   # disarankan, lingkungan terisolasi (bila 'graphify' tak ditemukan: uv tool update-shell)
  pipx install graphifyy      # alternatif
  pip install graphifyy       # mungkin butuh pengaturan PATH

  # Pasang skill ke repositori saat ini, bukan profil pengguna:
  graphify install --project
  graphify install --project --platform codex

  # Platform lain (pilih sesuai asistenmu):
  graphify install                              # Claude Code (Linux/Mac, dan Windows terdeteksi otomatis)
  graphify install --platform windows           # Claude Code (Windows)
  graphify install --platform codebuddy         # CodeBuddy
  graphify install --platform codex             # Codex
  graphify install --platform opencode          # OpenCode
  graphify install --platform kilo              # Kilo Code
  graphify install --platform copilot           # GitHub Copilot CLI
  graphify vscode install                       # VS Code Copilot Chat
  graphify install --platform aider             # Aider
  graphify install --platform claw              # OpenClaw
  graphify install --platform droid             # Factory Droid
  graphify install --platform trae              # Trae
  graphify install --platform trae-cn           # Trae CN
  graphify install --platform gemini            # Gemini CLI
  graphify install --platform hermes            # Hermes
  graphify install --platform kimi              # Kimi Code
  graphify amp install                          # Amp
  graphify install --platform agents            # Agent Skills lintas framework (alias --platform skills)
  graphify kiro install                         # Kiro IDE/CLI
  graphify install --platform pi                # Pi coding agent (plus: graphify pi guard install)
  graphify cursor install                       # Cursor
  graphify devin install                        # Devin CLI
  graphify antigravity install                  # Google Antigravity (terdeteksi otomatis di Windows)

  # Ekstra opsional (pasang hanya yang dibutuhkan), contoh:
  uv tool install "graphifyy[pdf]"
  uv tool install "graphifyy[all]"              # semua ekstra
---

# Graphify

Ketik `/graphify` di asisten coding AI kamu dan ia memetakan seluruh proyekmu (kode, dokumen, PDF, gambar, video) menjadi **knowledge graph** yang bisa **kamu query alih-alih meng-grep** file.

> **Catatan dari situs ini:** (1) **Nama paket:** paket PyPI resminya adalah `graphifyy` (dua huruf y). README memperingatkan bahwa paket `graphify*` lain di PyPI tidak berafiliasi; ketik namanya dengan teliti, repositori resminya [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify). (2) README menyebut perintah `curl -LsSf https://astral.sh/uv/install.sh | sh` untuk memasang `uv`, yaitu perintah yang mengunduh skrip lalu langsung menjalankannya; disalin utuh di bawah, tetapi alternatif seperti `brew`, `winget`, atau `pipx` bisa dipakai. (3) README ini dari branch `v8`, bukan `main`. (4) Graphify punya layanan berbayar terpisah, Graphify Cloud (uji coba 14 hari); bagian promosinya tidak disalin, dan semua yang ada di entri ini adalah CLI/skill open source. (5) Bagian daftar bahasa terjemahan, badge, kontributor, dan tautan komunitas tidak disalin.

- **Peta kode gratis dan sepenuhnya lokal.** Kode diurai dengan AST tree-sitter: deterministik, tanpa LLM, tidak ada yang keluar dari mesinmu. (Dokumen, PDF, gambar, dan video memakai model asistenmu, atau API key yang dikonfigurasi, untuk lintasan semantik.)
- **Setiap edge dijelaskan.** Tiap koneksi diberi tag `EXTRACTED` (eksplisit di sumber) atau `INFERRED` (diselesaikan graphify), sehingga kamu bisa membedakan apa yang dibaca langsung dari apa yang disimpulkan.
- **Bukan indeks vektor.** Tanpa embedding, tanpa vector store: graph sungguhan yang kamu telusuri. Ajukan pertanyaan, telusuri jalur antara dua hal, atau jelaskan satu konsep.

![graph.html milik graphify menampilkan codebase FastAPI sebagai knowledge graph force-directed dengan legenda komunitas yang terdeteksi](https://raw.githubusercontent.com/Graphify-Labs/graphify/v8/docs/graph-hero.png)

*Codebase FastAPI yang dipetakan graphify. Setiap node adalah konsep, warna adalah komunitas yang terdeteksi, dan semuanya bisa diklik di graph.html.*

**Mulai** (30 detik). Butuh Python 3.10+ dan uv (atau pipx):

```bash
uv tool install graphifyy      # pasang CLI (atau: pipx install graphifyy)
graphify install               # mendeteksi asistenmu dan mendaftarkan skill
```

Lalu, di asisten AI kamu:

```
/graphify .
```

Hanya itu. Kamu mendapat **tiga file**:

```
graphify-out/
├── graph.html       buka di browser mana pun: klik node, filter, cari
├── GRAPH_REPORT.md  sorotan: konsep kunci, koneksi mengejutkan, pertanyaan yang disarankan
└── graph.json       graph lengkap: query kapan saja tanpa membaca ulang file kamu
```

Graph yang disimpan menyertakan `graph.schema_version` agar integrasi bisa mendeteksi perubahan format yang tidak kompatibel, serta `graph.graphify_version` yang menunjukkan rilis Graphify yang menghasilkannya.

**Satu pemasangan, asisten apa pun, OS apa pun.** Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot, dan 20+ lainnya, di macOS, Linux, dan Windows: [pilih platformmu](#pasang).

## Lihat cara kerjanya

![Query path graphify: terminal meminta jalur terpendek antara FastAPI dan ModelField, dan jawabannya menyala hop demi hop di seluruh knowledge graph](https://raw.githubusercontent.com/Graphify-Labs/graphify/v8/docs/demo-path.svg)

Begitu graph dibangun, kamu meng-query-nya alih-alih membaca file. Keluaran nyata, graphify dijalankan pada codebase FastAPI di atas:

```text
$ graphify explain "APIRouter"
Node: APIRouter
  Source:    routing.py L2210
  Community: 2
  Degree:    47

Connections (47):
  --> RequestValidationError [uses] [INFERRED]
  --> Dependant [uses] [INFERRED]
  --> .get() [method] [EXTRACTED]
  <-- __init__.py [imports] [EXTRACTED]
  ...

$ graphify path "FastAPI" "ModelField"
Shortest path (3 hops):
  FastAPI --uses--> DefaultPlaceholder <--references-- get_request_handler() --references--> ModelField
```

Setiap edge membawa **tag keyakinan** (`EXTRACTED` = eksplisit di sumber, `INFERRED` = diturunkan lewat resolusi), sehingga kamu bisa membedakan apa yang dibaca langsung dari apa yang disimpulkan. `graphify query "<pertanyaan>"` mengembalikan subgraph terbatas untuk pertanyaan bahasa biasa, dan `graphify path A B` menelusuri bagaimana dua hal terhubung, diakhiri dengan keyakinan keseluruhan jalur itu: yaitu keyakinan hop terlemahnya.

## Fungsinya

Yang kamu dapat langsung:

| Kemampuan | Yang kamu dapat |
|---|---|
| **God nodes** | Konsep yang paling banyak terhubung, sehingga kamu melihat apa yang dilewati semuanya |
| **Komunitas** | Graph dibagi menjadi subsistem (Leiden), dengan label tanpa LLM |
| **Tautan lintas file** | `calls` / `imports` / `inherits` / `mixes_in` diselesaikan di ~40 bahasa lewat AST tree-sitter |
| **Query, path, explain** | Ajukan pertanyaan, telusuri jalur antara dua hal, atau jelaskan satu konsep, semuanya terhadap `graph.json` |
| **Rationale + referensi dokumen** | Komentar `# NOTE:` / `# WHY:` dan kutipan ADR/RFC menjadi node kelas satu yang terhubung ke kode |
| **Di luar kode** | Dokumen, PDF, gambar, dan video/audio semuanya dipetakan ke graph yang sama |
| **Local-first** | Kode diurai lokal dengan tree-sitter (tanpa LLM, tidak ada yang keluar dari mesinmu); hanya lintasan semantik atas dokumen/media yang memanggil backend, dan hanya jika kamu mengonfigurasinya |

## Benchmark: recall@10 0,497, 0 kredit LLM

| Benchmark | Metrik | graphify | Lainnya |
|---|---|---|---|
| LOCOMO (n=300) | recall@10 | **0,497** | mem0 0,048, supermemory 0,149 |
| LOCOMO (n=300) | akurasi QA | 45,3% | supermemory 49,7%, mem0 27,3% |
| LongMemEval-S (n=50) | akurasi QA | **76%** | setara dense RAG |
| ERPNext lintas-alat (n=6) | cakupan fakta kunci | **82,0%** | baseline grep/read 70,8% |
| Pembangunan graph | kredit LLM | **0** | per token untuk kebanyakan sistem |

Setiap sistem dijalankan pada harness yang sama dengan model dan anggaran yang sama, dinilai oleh juri yang divalidasi buta terhadap juri kedua (kesepakatan 90,6%, kappa Cohen 0,81). Tabel lengkap per sistem, hasil code-intelligence, dan perintah reproduksi: **[BENCHMARKS.md](https://github.com/Graphify-Labs/graphify/blob/v8/BENCHMARKS.md)**. (Ini angka klaim pembuatnya, bukan pengukuran kami.)

## Dokumentasi

Panduan lengkap dan referensi ada di **[docs.graphify.com](https://docs.graphify.com)**:

- **[Quickstart](https://docs.graphify.com/quickstart)**: bangun graph pertamamu
- **[Referensi CLI](https://docs.graphify.com/reference/overview)**: setiap perintah dan flag
- **[Ajukan pertanyaan graph yang lebih baik](https://docs.graphify.com/guides/querying)**: pola query
- **[Konfigurasi](https://docs.graphify.com/reference/configuration)**: variabel lingkungan dan penyetelan
- **[Input yang didukung](https://docs.graphify.com/concepts/supported-inputs)**: bahasa dan jenis file
- **[Alur kerja tim](https://docs.graphify.com/guides/team-workflows)** dan **[Review PR](https://docs.graphify.com/guides/pull-requests)**
- **[Pemecahan masalah](https://docs.graphify.com/troubleshooting)** dan **[Cara kerjanya](https://docs.graphify.com/concepts/architecture)**

## Prasyarat

| Kebutuhan | Minimum | Cek | Pasang |
|---|---|---|---|
| Python | 3.10+ | `python --version` | [python.org](https://www.python.org/downloads/) |
| uv *(disarankan)* | apa saja | `uv --version` | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| pipx *(alternatif)* | apa saja | `pipx --version` | `pip install pipx` |

**Pemasangan cepat macOS (Homebrew):**
```bash
brew install python@3.12 uv
```

**Pemasangan cepat Windows:**
```powershell
winget install astral-sh.uv
```

**Ubuntu/Debian:**
```bash
sudo apt install python3.12 python3-pip pipx
# atau pasang uv:
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Pasang

> **Paket resmi:** Paket PyPI-nya adalah `graphifyy` (dua y). Paket `graphify*` lain di PyPI tidak berafiliasi. Perintah CLI-nya tetap `graphify`.

Repositori sumber resminya adalah [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify).

Quickstart dua perintah ada di bagian atas README. Bagian ini mencakup metode pemasangan, pemasangan lingkup proyek, dan setiap platform yang didukung.

**Metode pemasangan** (pilih satu):

```bash
uv tool install graphifyy   # disarankan, lingkungan terisolasi (jika 'graphify' tidak ditemukan setelahnya, jalankan: uv tool update-shell)
pipx install graphifyy      # alternatif
pip install graphifyy       # mungkin butuh pengaturan PATH, lihat Pemecahan masalah di bawah
```

Lalu jalankan `graphify install` sekali. Ia mendeteksi asisten mana yang kamu pakai dan mendaftarkan skill, jadi tidak ada setup per asisten. Buka asisten AI kamu dan ketik `/graphify .`

Untuk memasang skill asisten ke repositori saat ini alih-alih profil penggunamu, tambahkan `--project`:

```bash
graphify install --project
graphify install --project --platform codex
```

Pemasangan lingkup proyek menulis di bawah direktori saat ini, misalnya `.claude/skills/graphify/SKILL.md` atau `.agents/skills/graphify/SKILL.md` (plus sidecar `references/` yang dimuat skill sesuai kebutuhan), dan mencetak petunjuk `git add` untuk file yang bisa di-commit. Perintah per platform yang mendukung pemasangan lingkup proyek menerima flag yang sama, misalnya `graphify claude install --project` atau `graphify codex install --project`.

> Mengalami `command not found`, masalah `pip` di Mac/Windows, quoting PowerShell, pemakaian `uvx`, keanehan PATH git-hook, atau strict mode? Lihat **[Installation](https://docs.graphify.com/installation)** dan **[Troubleshooting](https://docs.graphify.com/troubleshooting)**.

### Pilih platformmu (20+ asisten)

| Platform | Perintah pasang |
|----------|----------------|
| Claude Code (Linux/Mac) | `graphify install` |
| Claude Code (Windows) | `graphify install` (terdeteksi otomatis) atau `graphify install --platform windows` |
| CodeBuddy | `graphify install --platform codebuddy` |
| Codex | `graphify install --platform codex` |
| OpenCode | `graphify install --platform opencode` |
| Kilo Code | `graphify install --platform kilo` |
| GitHub Copilot CLI | `graphify install --platform copilot` |
| VS Code Copilot Chat | `graphify vscode install` |
| Aider | `graphify install --platform aider` |
| OpenClaw | `graphify install --platform claw` |
| Factory Droid | `graphify install --platform droid` |
| Trae | `graphify install --platform trae` |
| Trae CN | `graphify install --platform trae-cn` |
| Gemini CLI | `graphify install --platform gemini` |
| Hermes | `graphify install --platform hermes` |
| Kimi Code | `graphify install --platform kimi` |
| Amp | `graphify amp install` |
| Agent Skills (lintas framework) | `graphify install --platform agents` (alias `--platform skills`) |
| Kiro IDE/CLI | `graphify kiro install` |
| Pi coding agent | `graphify install --platform pi`, plus `graphify pi guard install` untuk guard native |
| Cursor | `graphify cursor install` |
| Devin CLI | `graphify devin install` |
| Google Antigravity | `graphify antigravity install` |
| Google Antigravity (Windows) | `graphify antigravity install` (terdeteksi otomatis di Windows) |

Pengguna Codex juga perlu `multi_agent = true` di bawah `[features]` pada `~/.codex/config.toml` untuk ekstraksi paralel. CodeBuddy memakai mekanisme tool Agent dan hook PreToolUse yang sama dengan Claude Code. Factory Droid memakai tool `Task` untuk dispatch subagent paralel. OpenClaw dan Aider memakai ekstraksi berurutan (dukungan agent paralel masih awal di platform itu). Trae memakai tool Agent untuk dispatch subagent paralel dan **tidak** mendukung hook `PreToolUse`, jadi AGENTS.md adalah mekanisme yang selalu aktif.

`--platform agents` (alias `--platform skills`) menargetkan lokasi [Agent-Skills](https://github.com/anthropics/skills) lintas framework yang generik: `~/.agents/skills/` global menurut spesifikasi (dibaca oleh `npx skills` dan framework yang patuh spesifikasi) untuk pemasangan global, dan `./.agents/skills/` untuk pemasangan proyek (`--project`). `graphify install` polos tetap satu platform (Claude Code) secara desain: pakai platform bernama `agents` bila kamu ingin skill bisa ditemukan oleh framework apa pun yang membaca `.agents/skills`.

`graphify install --project --strict` di Claude Code membuat Read dan Grep khusus berbagi satu penolakan per sesi kecuali query graph baru-baru ini telah mengarahkan agent (default 30 menit). Grep atas sebuah direktori tidak butuh kecocokan file terindeks; Grep yang dikunci ke satu file hanya ditolak bila graph mengindeks file itu, seperti Read. Target Grep eksternal dan keluaran graph tidak menghasilkan penolakan maupun dorongan, baik di mode lunak maupun strict, sesuai cakupan Read. Graph yang ditandai `needs_update` tidak pernah memicu penolakan Grep. Pencarian Bash dan Glob tetap bersifat anjuran. `GRAPHIFY_HOOK_STRICT=1` mengaktifkan kebijakan tanpa memasang ulang; `GRAPHIFY_HOOK_STRICT=0` menonaktifkannya bahkan saat dipasang dengan `--strict`. Pemasangan strict yang sudah ada perlu dipasang ulang untuk menambah flag `--strict` pada hook pencarian, atau memakai penimpaan lingkungan.

Pi tidak punya hook `PreToolUse`, jadi `graphify pi guard install` mendaftarkan ekstensi Pi native (lewat `pi install <direktori paket>` milik Pi sendiri) yang menjalankan `graphify hook-guard` terpasang sebelum panggilan `read`, `grep`, `find`, dan `bash` bergaya pencarian milik Pi. Keputusan graph segar/basi dan penolakan sekali-per-sesi `GRAPHIFY_HOOK_STRICT=1` yang dibagi oleh Read terindeks dan Grep khusus berasal dari kebijakan yang sama, sehingga Pi cocok dengan perilaku hook Claude Code; Bash dan daftar file tetap bersifat anjuran. Panduan datang sebagai pesan pengarah `<system-reminder source="graphify">`. Butuh Pi 0.58.4 atau lebih baru: versi sebelumnya membiarkan pesan pengarah melewati sisa batch panggilan tool paralel. Paketnya dikirim di dalam instalasi Graphify, jadi pasang Graphify secara persisten (`uv tool install graphifyy` atau `pipx install graphifyy`, bukan `uvx`), restart Pi setelah memasang atau memperbarui, dan hapus dengan `graphify pi guard uninstall`. Hanya target file lokal yang diperiksa; hook membutuhkan `graphify` pada entri `PATH` absolut di luar proyek, dibatasi panggilan dua detik, 256 KiB masuk / 64 KiB keluar, dan gagal terbuka (fail open). Paket yang sama juga dimuat di [Oh My Pi](https://github.com/can1357/oh-my-pi): `omp plugin install "$(graphify pi guard path)"`. Path terdaftar memuat versi Python dan venv, jadi jalankan ulang `graphify pi guard install` setelah mengubah salah satunya, dan hapus entri lama dengan `pi remove <path lama>`.

> Codex memakai `$graphify` alih-alih `/graphify`.

### Ekstra opsional (pasang hanya yang dibutuhkan)

| Ekstra | Yang ditambahkan | Pasang |
|---|---|---|
| `pdf` | Ekstraksi PDF | `uv tool install "graphifyy[pdf]"` |
| `office` | Dukungan `.docx` dan `.xlsx` | `uv tool install "graphifyy[office]"` |
| `google` | Rendering Google Sheets | `uv tool install "graphifyy[google]"` |
| `video` | Transkripsi video/audio (faster-whisper + yt-dlp) | `uv tool install "graphifyy[video]"` |
| `mcp` | Server MCP stdio | `uv tool install "graphifyy[mcp]"` |
| `watch` | Bangun ulang otomatis saat file berubah (`graphify watch`) | `uv tool install "graphifyy[watch]"` |
| `neo4j` | Dukungan push ke Neo4j | `uv tool install "graphifyy[neo4j]"` |
| `falkordb` | Dukungan push ke FalkorDB | `uv tool install "graphifyy[falkordb]"` |
| `svg` | Ekspor graph SVG | `uv tool install "graphifyy[svg]"` |
| `leiden` | Deteksi komunitas Leiden (graspologic di Python < 3.13; backend native di 3.13+) | `uv tool install "graphifyy[leiden]"` |
| `ollama` | Inferensi lokal Ollama | `uv tool install "graphifyy[ollama]"` |
| `openai` | OpenAI / API yang kompatibel dengan OpenAI | `uv tool install "graphifyy[openai]"` |
| `gemini` | API Google Gemini | `uv tool install "graphifyy[gemini]"` |
| `anthropic` | API Anthropic Claude (`--backend claude`, memakai `ANTHROPIC_API_KEY`) | `uv tool install "graphifyy[anthropic]"` |
| `bedrock` | AWS Bedrock (memakai IAM, tanpa API key) | `uv tool install "graphifyy[bedrock]"` |
| `azure` | Azure OpenAI Service (`--backend azure`, memakai `AZURE_OPENAI_API_KEY` + `AZURE_OPENAI_ENDPOINT`) | `uv tool install "graphifyy[openai]"` |
| `sql` | Ekstraksi skema SQL | `uv tool install "graphifyy[sql]"` |
| `postgres` | Introspeksi PostgreSQL langsung (`--postgres DSN`) | `uv tool install "graphifyy[postgres]"` |
| `dm` | Ekstraksi AST BYOND DreamMaker `.dm`/`.dme` (mungkin butuh compiler C + `python3-dev` bila tak ada wheel yang cocok) | `uv tool install "graphifyy[dm]"` |
| `terraform` | Ekstraksi AST Terraform / HCL `.tf`/`.tfvars`/`.hcl` | `uv tool install "graphifyy[terraform]"` |
| `pascal` | Ekstraksi AST Pascal / Delphi `.pas`/`.dpr`/`.dpk`/`.inc` (edge `calls`/`inherits` lebih akurat; kembali ke ekstraktor regex bila tidak ada) | `uv tool install "graphifyy[pascal]"` |
| `ocaml` | Ekstraksi AST OCaml `.ml`/`.mli` | `uv tool install "graphifyy[ocaml]"` |
| `commonlisp` | Ekstraksi AST Common Lisp `.lisp`/`.cl`/`.lsp`/`.asd` | `uv tool install "graphifyy[commonlisp]"` |
| `robot` | Ekstraksi Robot Framework `.robot`/`.resource` (suite, test case, keyword, edge pemanggilan keyword dan impor resource/library) | `uv tool install "graphifyy[robot]"` |
| `chinese` | Segmentasi query bahasa Mandarin (jieba) | `uv tool install "graphifyy[chinese]"` |
| `all` | Semua di atas | `uv tool install "graphifyy[all]"` |

## Buat asistenmu selalu memakai graph

Jalankan sekali di proyekmu setelah membangun graph:

Jalankan `graphify <platform> install` sekali di proyekmu, misalnya `graphify claude install` atau `graphify codex install` (atau `graphify install --platform <nama>`).

Ini menulis file konfigurasi kecil yang memberi tahu asistenmu untuk berkonsultasi dengan knowledge graph untuk pertanyaan codebase, mengutamakan query terbatas seperti `graphify query "<pertanyaan>"` dibanding membaca laporan penuh atau meng-grep file mentah.

- **Platform berbasis hook** (Claude Code, Gemini CLI): sebuah hook menyala otomatis sebelum panggilan tool bergaya pencarian (dan, di Claude Code, sebelum membaca file sumber satu per satu lewat tool Read/Glob) dan mengarahkan asistenmu ke jalur graph.
- **Platform berbasis file instruksi** (Codex, OpenCode, Cursor, dan lainnya): file instruksi persisten (`AGENTS.md`, `.cursor/rules/`, dan sebagainya) memberi panduan query-dulu yang sama.

`GRAPH_REPORT.md` tetap tersedia untuk tinjauan arsitektur yang luas.

File apa persisnya yang ditulis tiap platform (`CODEBUDDY.md` + hook `PreToolUse` milik CodeBuddy, `AGENTS.md` milik Codex, plugin `.kilo` native milik Kilo, aturan `alwaysApply` milik Cursor, dan seterusnya) dicakup di **[Always-on setup](https://docs.graphify.com/guides/always-on)**.

Untuk menghapus graphify dari semua platform sekaligus: `graphify uninstall` (tambahkan `--purge` untuk sekaligus menghapus `graphify-out/`). Atau pakai perintah per platform (misalnya `graphify claude uninstall`).

### Skill CLI atau instruksi MCP?

Instruksi yang dipasang `graphify install` dan yang disediakan koneksi MCP Graphify menjelaskan cara berbeda untuk meng-query graph:

| Setup | Panduan yang dipakai | Akses query |
|---|---|---|
| CLI lokal dan skill asisten terpasang | Instruksi platform yang ditulis `graphify install` | Jalankan `graphify query`, `graphify path`, dan `graphify explain` terhadap graph lokal (`graphify-out/` secara default). |
| Server MCP Graphify yang terhubung | Instruksi koneksi dan tool yang didaftarkan server itu | Panggil tool MCP yang terdaftar terhadap graph yang dilayani koneksi itu. Nama dan deskripsi tool berasal dari server. |

Keduanya mendorong query graph terbatas sebelum pencarian sumber yang luas. Pilih instruksi yang cocok dengan tool yang benar-benar bisa diakses asistenmu; tidak ada blok yang menetapkan aturan prioritas universal untuk file instruksi asistenmu. Jika kamu memakai kedua integrasi, identifikasi graph mana yang di-query tiap integrasi dan pilih satu jalur query utama alih-alih menyalin dua blok instruksi tanpa syarat ke `AGENTS.md`.

`graphify install` memasang integrasi asisten lokal; ia tidak membuat koneksi MCP. Klien MCP tidak perlu menjalankan query CLI lokal untuk memakai servernya yang terhubung. Server yang di-host lokal tetap butuh instalasi Graphify dan graph-nya sendiri, sedangkan koneksi hosted bisa melayani graph yang tidak ada di direktori kerja klien. Jika tool yang diharapkan tidak ada, periksa instalasi CLI atau koneksi MCP yang relevan alih-alih menganggap instruksi setup yang lain bisa dipertukarkan.

## Isi laporan

`GRAPH_REPORT.md` merangkum god node, komunitas, dan jalur kunci untuk tinjauan arsitektur yang luas. Cara graph dibangun dan isinya: **[Cara kerja graphify](https://docs.graphify.com/concepts/architecture)**.

## File yang ditangani: ~40 bahasa

graphify mengurai ~40 bahasa pemrograman secara lokal dengan AST tree-sitter, dan memetakan dokumen, PDF, gambar, dan audio/video lewat lintasan semantik opsional. Daftar lengkap: **[Input yang didukung](https://docs.graphify.com/concepts/supported-inputs)**.

## Perintah umum

```bash
/graphify .                        # bangun graph untuk folder saat ini
/graphify ./docs --update          # ekstrak ulang hanya file yang berubah
/graphify . --cluster-only         # jalankan ulang clustering tanpa ekstraksi ulang
/graphify . --cluster-only --resolution 1.5      # komunitas lebih granular
/graphify . --cluster-only --exclude-hubs 99     # tekan super-hub utilitas dari peringkat god-node
/graphify . --no-viz               # lewati HTML, hanya laporan + JSON
/graphify . --wiki                 # bangun wiki markdown dari graph
graphify export callflow-html      # HTML arsitektur/call-flow Mermaid (dibuat ulang otomatis di setiap git commit bila hook terpasang)

/graphify query "what connects auth to the database?"
/graphify path "UserService" "DatabasePool"
/graphify explain "RateLimiter"

/graphify add https://arxiv.org/abs/1706.03762   # ambil paper dan tambahkan
/graphify add <youtube-url>                       # transkripsikan dan tambahkan video

graphify hook install              # bangun ulang otomatis saat commit + checkout branch (jalankan `graphify update .` setelah `git pull`)
graphify merge-graphs a.json b.json              # gabungkan dua graph

graphify prs                       # dasbor PR: status CI, status review, pemetaan worktree
graphify prs 42                    # telaah mendalam PR #42 dengan dampak graph
graphify prs --triage              # AI mengurutkan antrean review kamu (memakai backend yang dikonfigurasi)
graphify prs --conflicts           # PR yang berbagi komunitas graph: risiko urutan merge
```

Referensi lengkap perintah: [CLI reference](https://docs.graphify.com/reference/overview).

## Batas pelabelan dan rendering

- **`--batch-size`**: 100 komunitas per panggilan pelabelan secara default, dimensikan untuk konteks ~16k token (~150 token/komunitas). Pakai `--batch-size 40` untuk jendela 8k. Overflow konteks tidak dicoba ulang dengan memecah; batch yang gagal mempertahankan nama turunan hub.
- **`--missing-only`**: `label --missing-only` mempertahankan label yang ada dan hanya menamai entri tak bernama / `Community N`. Pakai `label` (relabel penuh) untuk menyegarkan nama setelah set komunitas berubah.
- **`.graphify_labels.json.sig`**: mencatat tanda tangan keanggotaan komunitas; label bertahan setelah re-cluster hanya selama tanda tangannya cocok.
- **`export html`**: default 5.000 node; di atasnya graphify merender tampilan komunitas agregat. Pakai `--node-limit N`. `GRAPHIFY_VIZ_NODE_LIMIT` / `viz_node_limit=N` di `.graphifyrc` berlaku untuk `cluster-only`, `update`, `watch`, dan hook, bukan `export html`.
- **Fallback Leiden**: tanpa ekstra `leiden`, clustering diam-diam memakai Louvain networkx. Berpindah belakangan mengacak ulang setiap komunitas, jadi rencanakan relabel penuh.

## Mengabaikan file

graphify menghormati `.gitignore` dan mendukung pola `--exclude` serta `.graphifyignore` proyek. Detail: **[Konfigurasi](https://docs.graphify.com/reference/configuration)**.

`graphify extract` melaporkan path yang dilewati aturan ignore, dengan hingga tiga contoh terurut relatif terhadap root pemindaian. Setiap direktori yang dipangkas dihitung sekali; isinya tidak dienumerasi. Direktori noise default seperti `node_modules` dikecualikan dari ringkasan ini. Jika sumber hilang, tinjau aturan ignore. `--no-gitignore` hanya melewati aturan ignore VCS; `.graphifyignore` dan `--exclude` tetap berlaku.

## Konfigurasi proyek

Buat `.graphifyrc` di root pemindaian untuk pengaturan yang milik proyek, bukan satu kali jalan. Satu `key=value` per baris; baris yang diawali `#` adalah komentar.

**Ekstensi yang ambigu.** Beberapa ekstensi berarti bahasa berbeda di proyek berbeda: `.inc` adalah PHP di pfSense, Pascal di pohon Delphi, SQL atau assembly di tempat lain; `.h` adalah C atau C++; `.m` adalah Objective-C atau MATLAB. graphify harus memilih satu default global, dan bila salah pilih file tidak gagal: ia diurai sebagai bahasa yang salah dan menghasilkan beberapa node kebetulan, sehingga graph tampak terisi padahal simbol sebenarnya hilang. Nyatakan apa arti ekstensi itu di repo kamu:

```
# .graphifyrc
# Nama bahasa:
language.inc=php
# Atau ekstensi yang sudah dikenal graphify:
language.tpl=.ts
# Dipanggang ke git hook (lihat Setup tim):
viz_node_limit=0
```

Deklarasi itu mengalir melalui klasifikasi, pemilihan ekstraktor, grammar dan resolusi, impor, `graphify watch`, dan cache AST (file yang diurai ulang dengan bahasa berbeda tidak pernah memakai ulang entri lama), dan `.graphifyrc` yang sama dibaca oleh `extract`, `update`, hook, server MCP, dan skill `/graphify`. Salah ketik dilaporkan sekali di stderr dan pemindaian dilanjutkan dengan default. Bagaimana deklarasi berinteraksi dengan caching, rebuild inkremental, dan resolusi impor: **[Konfigurasi](https://docs.graphify.com/reference/configuration)**.

**Default query.** Setel `query_budget` ke bilangan bulat positif dan `query_depth` ke bilangan bulat dari 1 sampai 6:

```ini
query_budget=4000
query_depth=3
```

Untuk `graphify query`, `--budget N` / `--budget=N` dan `--depth N` / `--depth=N` yang eksplisit menimpa pengaturan ini secara independen. Tanpa pengaturan proyek atau opsi eksplisit, default tetap budget 2000 dan depth 2. Kunci ini tidak mengubah default server MCP.

Pengaturan berasal dari proyek pemilik `--graph` yang dipilih, bahkan saat perintah dijalankan dari direktori lain. Direktori absolut yang ada di marker `.graphify_root` bersaudara dari graph itu mengidentifikasi proyek tersebut. Jika tidak, akhiran `GRAPHIFY_OUT` relatif yang cocok mengidentifikasinya; path keluaran absolut, kosong, berisi traversal, atau tidak cocok kembali ke direktori file graph. Marker relatif diabaikan.

Perintah query selalu membaca `.graphifyrc` proyek itu. Pengaturan yang dikenali tetapi tidak valid, atau file yang tidak terbaca, menghasilkan satu peringatan stderr dan membuang semua pengaturan proyek untuk query itu; opsi eksplisit tetap berlaku. Parser pengaturan tetap ketat untuk pemanggil lainnya. Nilai budget eksplisit yang ada mempertahankan perilakunya; nilai `query_budget` yang disimpan harus positif.

## Setup tim

Commit atau bagikan graph agar seluruh timmu meng-query konteks yang sama, dan review pull request dengan konteks graph. Lihat **[Bagikan konteks dengan timmu](https://docs.graphify.com/guides/team-workflows)** dan **[Review pull request](https://docs.graphify.com/guides/pull-requests)**.

## Memakai graph secara langsung

Di luar asisten AI kamu, query `graph.json` langsung dari CLI dengan `graphify query`, `graphify path`, dan `graphify explain`. Nama yang cocok dengan beberapa node ditolak dengan daftar kandidat alih-alih ditebak. Skrip bisa membaca hasilnya dari exit code: `0` jawaban, `3` nama ambigu, `4` tidak ada node yang cocok. Lihat **[Ajukan pertanyaan graph yang lebih baik](https://docs.graphify.com/guides/querying)** dan **[referensi query](https://docs.graphify.com/reference/query)**.

## Variabel lingkungan

Backend, API key, perilaku hook, dan penyetelan dikendalikan oleh variabel lingkungan. Tabel lengkap: **[Konfigurasi](https://docs.graphify.com/reference/configuration)**.

- **Prompt caching API Claude**: `GRAPHIFY_CLAUDE_PROMPT_CACHE` mengatur caching system prompt untuk `--backend claude`. Tidak disetel atau kosong tetap mengaktifkan caching; `1`, `true`, `yes`, atau `on` mengaktifkannya secara eksplisit, dan `0`, `false`, `no`, atau `off` menonaktifkannya (tidak peka huruf besar-kecil, spasi di sekitarnya diabaikan). Nilai tidak valid memunculkan galat sebelum permintaan dikirim. Misalnya, jalankan `GRAPHIFY_CLAUDE_PROMPT_CACHE=0 graphify extract . --backend claude` saat endpoint yang kompatibel dengan Anthropic menolak `cache_control`. Menonaktifkan mengirim system prompt teks biasa yang asli. Pengaturan ini berlaku sama untuk Anthropic resmi dan endpoint kustom `ANTHROPIC_BASE_URL` / `ANTHROPIC_MODEL`, termasuk mode deep; tidak memengaruhi Bedrock, Claude CLI, atau cache ekstraksi lokal Graphify. Mengaktifkan meminta caching tetapi tidak bisa menjamin cache hit: endpoint/model harus mendukungnya dan prompt harus memenuhi panjang minimumnya. Galat caching yang tidak didukung tidak diam-diam dicoba ulang tanpa caching.
- **Model Claude CLI**: `GRAPHIFY_CLAUDE_CLI_MODEL` menimpa model untuk backend `claude-cli` (default: Opus). `haiku` atau `sonnet` biasanya cukup untuk penamaan komunitas; lintasan ekstraksi semantik diuntungkan oleh model yang lebih besar.

## Privasi

- **File kode**: diproses lokal lewat tree-sitter. Tidak ada yang keluar dari mesinmu. Korpus yang hanya berisi kode tidak butuh API key: `graphify extract` berjalan sepenuhnya offline. Pada repo campuran, tambahkan `--code-only` untuk mengindeks hanya kode dan melewati dokumen/PDF/gambar yang kalau tidak akan butuh LLM.
- **Video / audio**: ditranskripsikan lokal dengan faster-whisper. Tidak ada yang keluar dari mesinmu.
- **Dokumen, PDF, gambar**: dikirim ke asisten AI kamu untuk ekstraksi semantik (lewat skill `/graphify`, memakai model apa pun yang dijalankan sesi IDE kamu). `graphify extract` headless membutuhkan `GEMINI_API_KEY` / `GOOGLE_API_KEY` (Gemini), `MOONSHOT_API_KEY` (Kimi), `ANTHROPIC_API_KEY` (Claude), `OPENAI_API_KEY` (OpenAI), `DEEPSEEK_API_KEY` (DeepSeek), instans Ollama yang berjalan (`OLLAMA_BASE_URL`), kredensial AWS lewat rantai penyedia standar (Bedrock, tanpa API key, memakai IAM), atau biner CLI `claude` (Claude Code, tanpa API key, memakai langganan Claude kamu). Flag `--dedup-llm` memakai kunci yang sama.
- **Residensi data**: `graphify extract` mendeteksi otomatis penyedia mana yang dipakai berdasarkan API key yang disetel (prioritas: Gemini → Kimi → Claude → OpenAI → DeepSeek → Azure → Bedrock → Ollama). Saat mendeteksi otomatis, ia mencetak variabel lingkungan persis yang memilih penyedia, jadi sebuah eksekusi tidak pernah mengejutkan. Untuk memilih secara eksplisit, berikan `--backend`, atau setel `GRAPHIFY_BACKEND=<nama>`; setel `GRAPHIFY_BACKEND=none` untuk menonaktifkan semua backend LLM (ekstraksi semantik dan fallback pelabelan `claude -p`) dan mempertahankan graph khusus kode. Untuk kode dengan persyaratan residensi data, pakai `GRAPHIFY_BACKEND=ollama` / `--backend ollama` (sepenuhnya lokal). Kimi (`MOONSHOT_API_KEY`) mengarahkan ke server Moonshot AI di Tiongkok.
- **Tanpa telemetri**, tanpa pelacakan pemakaian, tanpa analitik.
- **Pencatatan query**: setiap panggilan `graphify query`, `graphify path`, `graphify explain`, dan `query_graph` MCP dicatat ke `~/.cache/graphify-queries.log` dalam format JSON Lines (stempel waktu, pertanyaan, korpus, node yang dikembalikan, durasi). Respons subgraph penuh **tidak** disimpan secara default. Setel `GRAPHIFY_QUERY_LOG_DISABLE=1` untuk menolak, atau `GRAPHIFY_QUERY_LOG=/dev/null` untuk membungkam tanpa menonaktifkan jalur kodenya.

## Pemecahan masalah

Masalah pemasangan dan ekstraksi yang umum beserta perbaikannya: **[Troubleshooting](https://docs.graphify.com/troubleshooting)**.

## Pelajari lebih lanjut

- [docs.graphify.com](https://docs.graphify.com): dokumentasi lengkap: panduan, referensi perintah, dan integrasi
- [Cara kerjanya](https://github.com/Graphify-Labs/graphify/blob/v8/docs/how-it-works.md): pipeline ekstraksi, deteksi komunitas, penilaian keyakinan, benchmark
- [ARCHITECTURE.md](https://github.com/Graphify-Labs/graphify/blob/v8/ARCHITECTURE.md): rincian modul, cara menambah bahasa
- [Integrasi opsional](https://github.com/Graphify-Labs/graphify/blob/v8/docs/docker-mcp-sqlite.md): Docker MCP Toolkit + SQLite

## Membangun di atas graphify

Membangun sesuatu di ekosistem graphify? Itu didorong. Jika proyekmu memakai "graphify" dalam namanya (misalnya `graphify-dashboard` atau `graphify-action`), tambahkan catatan singkat di README kamu yang menjelaskan bahwa itu dibuat komunitas dan tidak berafiliasi atau didukung Graphify Labs. "graphify" dan logo graphify adalah merek Graphify Labs; jangan memakainya dengan cara yang menyiratkan status resmi.

## Lisensi

Apache-2.0 (menurut metadata repositori; README tidak menuliskan teks lisensi di luar badge).
