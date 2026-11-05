---
title: "gstack"
summary: "Paket skill Markdown yang mengubah Claude Code (dan agent coding lain) menjadi tim engineering virtual: CEO, eng manager, desainer, reviewer, QA lead, petugas keamanan, dan release engineer, dengan alur sprint dari office-hours sampai ship."
category: coding
tags: [workflow, code-review, qa, security, sprint, release, claude-code, skills, browser]
surfaces: [claude-code]
source_url: "https://github.com/garrytan/gstack/blob/main/README.md"
repo: garrytan/gstack
stars: 139534
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
install: |
  # Prasyarat: Claude Code, Git, Bun v1.4.2+ (setup menolak Bun < 1.3.3), dan Node.js di Windows.

  # Langkah 1: pasang di mesinmu. Buka Claude Code dan tempel prompt ini (Claude yang menjalankannya):
  Install gstack: run `git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup` then add a "gstack" section to CLAUDE.md that says to use the /browse skill from gstack for all web browsing and never use mcp__claude-in-chrome__* tools. Claude Code lists the installed skills itself, so the section needs no skill list. Then ask the user if they also want to add gstack to the current project so teammates get it.

  # Langkah 2 (disarankan untuk repo bersama): team mode. Jalankan dari dalam repo kamu.
  # Ini mengubah repo dan membuat commit.
  (cd ~/.claude/skills/gstack && ./setup --team) && ~/.claude/skills/gstack/bin/gstack-team-init required && git add .claude/ CLAUDE.md && git commit -m "require gstack for AI-assisted work"
  # Ganti `required` dengan `optional` bila hanya ingin mengingatkan rekan tim, bukan memblokir.

  # Agent lain: bare ./setup hanya memasang untuk Claude Code. Pilih agent dengan --host <nama>,
  # atau pasang untuk semua agent yang terdeteksi dengan --host auto:
  git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/gstack
  cd ~/gstack && ./setup --host auto      # atau: ./setup --host codex
  ./setup --status                         # satu baris per instalasi: host, tier, scope, versi, path

  # Windows (PowerShell): .\setup.ps1 (argumen sama dengan ./setup) memeriksa Git for Windows, Bun, dan Node.js
includes: [office-hours, plan-ceo-review, plan-eng-review, plan-design-review, plan-devex-review, design-consultation, review, investigate, verify, design-review, devex-review, design-shotgun, design-html, design-motion, qa, qa-only, pair-agent, cso, ship, land-and-deploy, modernize, canary, benchmark, document-release, document-generate, retro, browse, scrape, autoplan, spec, learn, make-pdf, diagram, codex, claude-code, careful, freeze, guard, unfreeze, setup-deploy, setup-gbrain, sync-gbrain, gstack-upgrade, captain, ios-qa]
---

# gstack

gstack mengubah Claude Code (dan agent coding lain) menjadi tim engineering virtual: CEO yang memikirkan ulang produk, eng manager yang mengunci arsitektur, desainer yang menangkap AI slop, reviewer yang menemukan bug produksi, QA lead yang membuka browser sungguhan, petugas keamanan yang menjalankan audit OWASP + STRIDE, dan release engineer yang mengirim PR. Semuanya slash command, semuanya Markdown, semuanya gratis, lisensi MIT.

Saya [Garry Tan](https://x.com/garrytan), President & CEO [Y Combinator](https://www.ycombinator.com/). Ini software factory open source yang saya pakai setiap hari, dan saya membagikannya karena alat-alat ini seharusnya tersedia untuk semua orang. Ceritanya, angka produktivitas, dan cara saya menjalankan sepuluh sprint sekaligus ada di [Why gstack](https://github.com/garrytan/gstack/blob/main/docs/why-gstack.md). *(Pernyataan pembuat repo.)*

Fork. Perbaiki. Jadikan milikmu.

**Untuk siapa:**
- **Founder dan CEO**, terutama yang teknis dan masih ingin mengirim produk
- **Pengguna Claude Code pemula**: peran terstruktur alih-alih prompt kosong
- **Tech lead dan staff engineer**: review, QA, dan otomasi rilis yang ketat di setiap PR

> **Catatan dari situs ini:** Baca sebelum memasang, karena gstack mengubah lebih dari sekadar menambah skill.
> 1. **Pemasangan mengubah CLAUDE.md-mu.** Prompt pasang menyuruh Claude menjalankan `./setup`, menambahkan bagian "gstack" ke `CLAUDE.md`, dan menyatakan **jangan pernah memakai tool `mcp__claude-in-chrome__*`** (semua browsing lewat `/browse`). `./setup` juga membangun biner terkompilasi di mesinmu (tidak ditandatangani) dan mendaftarkan hook (di Claude Code, hook keselamatan memblokir perintah berbahaya). Daftar hook ada di [docs/install.md](https://github.com/garrytan/gstack/blob/main/docs/install.md).
> 2. **Team mode mengubah repo dan membuat commit.** Langkah 2 men-commit `.claude/` dan `CLAUDE.md`, dan hook `required` memblokir rekan tim yang belum memasangnya.
> 3. **Pemeriksaan pembaruan dan outside review aktif secara default.** Telemetri mati secara default, tetapi pemeriksaan pembaruan (beberapa permintaan GitHub) dan *outside review* (mengirim kode ke Codex atau Claude Code atas login kamu sendiri; pemakaian pertama mencetak pemberitahuan) menyala secara default. Lihat bagian Privasi di bawah.
> 4. **Menjalankan `./setup` dan skill dari repo pihak ketiga:** periksa isinya dulu; install ini mengunduh kode dan menjalankan skrip pemasangan.
> 5. Angka produktivitas di README adalah klaim pembuatnya. Bagian rekrutmen, daftar dokumen lengkap, dan promosi tidak disalin.

## Mulai cepat

1. Pasang gstack (dua kali tempel, sekitar 30 detik setup; lihat di bawah).
2. Jalankan `/office-hours` dan jelaskan apa yang kamu bangun. Ia menyanggah framing-mu dan menulis dokumen desain yang dibaca skill lain.
3. Jalankan `/review` pada branch mana pun yang berubah. Ia menemukan bug yang lolos CI tetapi rusak di produksi, dan memperbaiki yang jelas.
4. Jalankan `/qa` pada URL staging kamu, atau pada API lokal, CLI, job, atau webhook yang terisolasi. Ia membuka browser sungguhan, mereproduksi bug, dan memperbaikinya.

Berhenti di situ. Kamu akan tahu apakah ini cocok untukmu. Saat kamu ingin seluruh sprint, `/autoplan` me-review rencana dari ujung ke ujung dan `/ship` menjalankan tes, review, dan PR.

## Pasang: sekitar 30 detik

**Persyaratan:** [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Git](https://git-scm.com/), [Bun](https://bun.sh/) v1.4.2+ (versi yang diuji; setup menolak Bun yang lebih lama dari 1.3.3, yang akan membiarkan alat terkompilasi membaca `.env` proyek), dan [Node.js](https://nodejs.org/) di Windows. **Disarankan di macOS:** browser [Aside](https://aside.com) (macOS 15+), yang dikendalikan lebih dulu oleh skill browser, `/make-pdf`, dan `/diagram` dengan sesi login sungguhanmu; tanpa itu, `./setup` membangun browser bawaan gstack sendiri. `/cso` juga butuh toolchain native; setup memberi tahu dan membiarkannya tidak tersedia bila toolchain tidak ada. Waktu, prasyarat `/cso`, dan hook yang didaftarkan setup: [docs/install.md](https://github.com/garrytan/gstack/blob/main/docs/install.md).

### Langkah 1: pasang di mesinmu

Buka Claude Code dan tempel ini. Claude mengerjakan sisanya.

> Install gstack: run **`git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup`** then add a "gstack" section to CLAUDE.md that says to use the /browse skill from gstack for all web browsing and never use mcp\_\_claude-in-chrome\_\_\* tools. Claude Code lists the installed skills itself, so the section needs no skill list. Then ask the user if they also want to add gstack to the current project so teammates get it.

### Langkah 2: team mode, pembaruan otomatis untuk repo bersama (disarankan)

Dari dalam repo kamu, tempel ini. Ia mengalihkanmu ke team mode, menyiapkan repo agar rekan tim mendapat gstack secara otomatis, dan men-commit perubahannya:

```bash
(cd ~/.claude/skills/gstack && ./setup --team) && ~/.claude/skills/gstack/bin/gstack-team-init required && git add .claude/ CLAUDE.md && git commit -m "require gstack for AI-assisted work"
```

Tanpa file yang di-vendor di repomu, tanpa drift versi, tanpa upgrade manual. Setiap sesi Claude Code dimulai dengan pemeriksaan pembaruan otomatis yang cepat (dibatasi sekali per jam, aman bila jaringan gagal, sepenuhnya senyap). Team mode mengikuti channel `stable`: rilis bertag dua kali seminggu (Senin dan Kamis, paling sering sekali tiap 72 jam, plus perbaikan keamanan dan regresi yang terverifikasi), bukan setiap merge ke main. `gstack-config set update_channel main` mengikuti setiap merge; lihat [docs/releases.md](https://github.com/garrytan/gstack/blob/main/docs/releases.md).

Ganti `required` dengan `optional` bila kamu lebih suka mengingatkan rekan tim daripada memblokir mereka.

Hook `required` di team mode berjalan di Node.js, jadi setiap rekan tim butuh Node.js di PATH ([detail](https://github.com/garrytan/gstack/blob/main/docs/install.md#team-mode)). Untuk menghapus gstack nanti: [docs/uninstall.md](https://github.com/garrytan/gstack/blob/main/docs/uninstall.md).

### Agent AI lain

gstack berjalan di lebih banyak agent selain Claude. `./setup` polos hanya memasang untuk Claude Code (bila dijalankan di dalam OpenClaw, Hermes, atau Dot, ia juga mendaftarkan skill gstack ke harness itu: [docs/hosts.md](https://github.com/garrytan/gstack/blob/main/docs/hosts.md#agent-harnesses)). Pilih agent lain dengan `--host <nama>`, atau pasang untuk setiap agent yang terdeteksi setup di mesin ini dengan `--host auto`:

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/gstack
cd ~/gstack && ./setup --host auto      # atau: ./setup --host codex
./setup --status                         # satu baris per instalasi: host, tier, scope, versi, path
```

`--host X` yang eksplisit hanya memasang untuk X dan tidak pernah mengubah instalasi agent lain. `/gstack-upgrade` menyegarkan setiap instalasi yang didaftarkannya, satu baris per host, dan menyebut mana yang gagal.

Tier: **full** disertifikasi oleh eksekusi alur kerja nyata (lihat [Certify your host](https://github.com/garrytan/gstack/blob/main/docs/ADDING_A_HOST.md#certify-your-host)); **experimental** terpasang dan lulus tes konformitas tetapi belum punya eksekusi sertifikasi; **instruction-only** tidak memasang apa pun: setup mencetak apa yang harus disalin.

| Agent | Tier | Pasang | Pemanggilan pertama | Skill keselamatan | Outside review butuh | Perbaikan |
|-------|------|---------|------------------|---------------|----------------------|--------|
| Claude Code | full | `--host claude` (default) | `/office-hours` | ditegakkan (hook memblokir) | Codex CLI, sudah login | `./setup --host claude` |
| OpenAI Codex CLI | experimental | `--host codex` → `${CODEX_HOME:-~/.codex}/skills/gstack-*/` | minta `gstack-office-hours` | anjuran, tidak memblokir | Claude Code CLI, sudah login | `./setup --host codex` |
| OpenCode | experimental | `--host opencode` → `~/.config/opencode/skills/gstack-*/` + perintah `/gstack-*` | `/gstack-office-hours` | anjuran, tidak memblokir | Codex CLI, sudah login | `./setup --host opencode` |
| Cursor | experimental | `--host cursor` → `~/.cursor/skills/gstack-*/` | minta `gstack-office-hours` | anjuran, tidak memblokir | Codex CLI, sudah login | `./setup --host cursor` |
| Factory Droid | experimental | `--host factory` → `~/.factory/skills/gstack-*/` | minta `gstack-office-hours` | anjuran, tidak memblokir | Codex CLI, sudah login | `./setup --host factory` |
| Kiro | experimental | `--host kiro` → `~/.kiro/skills/gstack-*/` | minta `gstack-office-hours` | anjuran, tidak memblokir | Codex CLI, sudah login | `./setup --host kiro` |
| GitHub Copilot CLI | experimental | `--host copilot` → `~/.copilot/skills/gstack-*/` | `/gstack-office-hours` | anjuran, tidak memblokir | Codex CLI, sudah login | `./setup --host copilot` |
| Antigravity CLI | experimental | `--host agy` (atau `--host antigravity`) → `~/.gemini/antigravity-cli/skills/gstack-*/` | `/gstack-office-hours` | anjuran, tidak memblokir | Codex CLI, sudah login | `./setup --host agy` |
| Gemini CLI | experimental | `--host gemini` (atau `--host gemini-cli`) → `~/.gemini/skills/gstack-*/` | minta `gstack-office-hours` | anjuran, tidak memblokir | Codex CLI, sudah login | `./setup --host gemini` |
| Slate | instruction-only | `--host slate` (menunjuk ke instalasi Claude; Slate membaca `.claude/skills`) | `/office-hours` lewat instalasi Claude | anjuran, tidak memblokir | — | `./setup --host claude` |
| OpenClaw | experimental | `--host openclaw` (lima skill tugas dan satu skill router `gstack` di folder skill OpenClaw; otomatis saat setup berjalan di dalam OpenClaw; rute ACP di [docs/OPENCLAW.md](https://github.com/garrytan/gstack/blob/main/docs/OPENCLAW.md)) | minta tugasnya; agent membuka skill tugas yang cocok atau router `gstack` | anjuran, tidak memblokir | — | `./setup --host openclaw` |
| Hermes | experimental | `--host hermes` (setiap skill di `$HERMES_HOME/skills/gstack`; otomatis saat setup berjalan di dalam Hermes) | minta tugasnya, atau `/gstack-review` | anjuran, tidak memblokir | — | `./setup --host hermes` |
| GBrain (mod) | instruction-only | `--host gbrain` (varian yang sadar-brain dikirim dari repo GBrain) | — | anjuran, tidak memblokir | — | — |

Catatan per host (harness agent, Copilot, Antigravity, Gemini CLI, OpenClaw dan ClawHub, profil perilaku Codex dan tier model, penyedia outside-review, model biner design) ada di [docs/hosts.md](https://github.com/garrytan/gstack/blob/main/docs/hosts.md). Agent pembaca aturan apa pun (Zed, Amp, Jules) bisa memakai [agents digest](https://github.com/garrytan/gstack/blob/main/agents-digest/gstack-AGENTS.md) 2KB tanpa pemasangan. Menambah host: [docs/ADDING_A_HOST.md](https://github.com/garrytan/gstack/blob/main/docs/ADDING_A_HOST.md).

## Lihat cara kerjanya

```
You:    I want to build a daily briefing app for my calendar.
You:    /office-hours
Claude: [asks about the pain — specific examples, not hypotheticals]

You:    Multiple Google calendars, events with stale info, wrong locations.
        Prep takes forever and the results aren't good enough...

Claude: I'm going to push back on the framing. You said "daily briefing
        app." But what you actually described is a personal chief of
        staff AI.
        [extracts 5 capabilities you didn't realize you were describing]
        [challenges 4 premises — you agree, disagree, or adjust]
        [generates 3 implementation approaches with effort estimates]
        RECOMMENDATION: Ship the narrowest wedge tomorrow, learn from
        real usage. The full vision is a 3-month project — start with
        the daily briefing that actually works.
        [writes design doc → feeds into downstream skills automatically]

You:    /plan-ceo-review
        [reads the design doc, challenges scope, runs 10-section review]

You:    /plan-eng-review
        [ASCII diagrams for data flow, state machines, error paths]
        [test matrix, failure modes, security concerns]

You:    Approve plan. Exit plan mode.
        [writes 2,400 lines across 11 files. ~8 minutes.]

You:    /review
        [AUTO-FIXED] 2 issues. [ASK] Race condition → you approve fix.

You:    /qa https://staging.myapp.com
        [opens real browser, clicks through flows, finds and fixes a bug]

You:    /ship
        Tests: 42 → 51 (+9 new). PR: github.com/you/app/pull/42
```

Kamu bilang "aplikasi daily briefing." Agent bilang "kamu sedang membangun AI chief of staff", karena ia mendengarkan rasa sakitmu, bukan permintaan fiturmu. Delapan perintah, dari ujung ke ujung. Itu bukan copilot. Itu tim.

## Sprint

gstack adalah proses, bukan kumpulan alat. Skill berjalan sesuai urutan sprint:

**Think → Plan → Build → Review → Test → Ship → Reflect**

Setiap skill menyuapi skill berikutnya. `/office-hours` menulis dokumen desain yang dibaca `/plan-ceo-review`. `/plan-eng-review` menulis rencana tes yang diambil `/qa`. `/review` menangkap bug yang diverifikasi `/ship` sudah diperbaiki. Tidak ada yang terlewat karena setiap langkah tahu apa yang mendahuluinya.

| Skill | Spesialismu | Yang dilakukan |
|-------|----------------|--------------|
| `/office-hours` | **YC Office Hours** | Mulai di sini. Enam pertanyaan pemaksa yang membingkai ulang produkmu sebelum menulis kode. Menyanggah framing-mu, menantang premis, menghasilkan alternatif implementasi. Dokumen desain menyuapi setiap skill hilir. |
| `/plan-ceo-review` | **CEO / Founder** | Pikirkan ulang masalahnya. Temukan produk 10-bintang yang tersembunyi di dalam permintaan. Empat mode: Expansion, Selective Expansion, Hold Scope, Reduction. |
| `/plan-eng-review` | **Eng Manager** | Kunci arsitektur, aliran data, diagram, kasus tepi, dan tes. Memaksa asumsi tersembunyi keluar ke permukaan. |
| `/plan-design-review` | **Senior Designer** | Menilai tiap dimensi desain 0-10, menjelaskan seperti apa nilai 10, lalu mengedit rencana untuk mencapainya. Deteksi AI Slop. Interaktif, satu AskUserQuestion per pilihan desain. |
| `/plan-devex-review` | **Developer Experience Lead** | Review DX interaktif: menelusuri persona developer, membandingkan TTHW dengan kompetitor, merancang momen ajaib kamu, menelusuri titik gesekan langkah demi langkah. Menilai pesan galat untuk agent yang membacanya ([agent-ready errors](https://github.com/garrytan/gstack/blob/main/docs/agent-ready-errors.md)). Tiga mode: DX EXPANSION, DX POLISH, DX TRIAGE. 20-45 pertanyaan pemaksa. |
| `/design-consultation` | **Design Partner** | Bangun design system lengkap dari nol. Meriset lanskap, mengusulkan risiko kreatif, menghasilkan mockup produk realistis. Menulis `DESIGN.md` dalam format DESIGN.md terbuka, sehingga impeccable, Google Stitch, dan alat apa pun yang membacanya berbagi satu file. |
| `/review` | **Staff Engineer** | Temukan bug yang lolos CI tetapi meledak di produksi. Memperbaiki otomatis yang jelas. Menandai celah kelengkapan dan integritas gerbang: setiap tes, timeout, snapshot, atau suppression yang dilemahkan sampai ke manusia dengan nama. Lensa penyederhanaan bersifat anjuran: menandai kode yang terlalu rumit, tidak pernah memblokir, tidak pernah menerapkan otomatis. |
| `/deslop-shared-libs` | **Shared Code Reviewer** | Temukan ekstraksi kode bersama yang layak dalam pekerjaan terbaru. Membandingkan hingga lima peluang dan merekomendasikan tiga terbaik, dengan bukti sumber, peningkatan keandalan, dan total penghematan kode. Hanya rekomendasi. |
| `/write-skill` | **Skill Editor** | Tulis skill agent baru atau perbaiki yang ada tanpa membengkak. Tangga edit lima langkah, `gstack-skill-bill` untuk ukuran per level dan pertumbuhan sejak diet terakhir, pemeriksaan drift bahwa setiap perintah dan flag gstack yang disebut skill masih ada, dan diet penuh yang dibuktikan dengan tes sebelum/sesudah/tanpa-skill. |
| `/test-audit` | **Test Auditor** | Sisir tes yang ada untuk yang lebih mahal daripada yang dilindunginya: grep sumber, duplikat, probe tanpa assertion, ekspor khusus tes. Setiap kandidat membawa kartu bukti; hanya laporan kecuali kamu menyetujui satu batch. |
| `/investigate` | **Debugger** | Debugging akar masalah yang sistematis. Hukum Besi: tidak ada perbaikan tanpa investigasi. Menelusuri aliran data, menguji hipotesis, berhenti setelah 3 perbaikan gagal. |
| `/verify` | **Build Loop** | Jalankan pemeriksaan milik repo sendiri (typecheck, lint, build) dan tes yang akan dipilih pre-gate `/ship` untuk perubahanmu, perbaiki yang rusak, ulangi sampai hijau, lalu serahkan ke `/ship`. Bertanya sekali sebelum menjalankan perintah repo; tidak pernah menyebut perubahan hijau bila tidak ada tes yang mencakupnya. |
| `/design-review` | **Designer Who Codes** | Audit yang sama dengan /plan-design-review, lalu memperbaiki yang ditemukan. Commit atomik, screenshot sebelum/sesudah. Bila impeccable terpasang, mesinnya berjalan lebih dulu dan setiap temuan mekanis datang dengan tag id aturannya. |
| `/devex-review` | **DX Tester** | Audit pengalaman developer langsung. Benar-benar menguji onboarding kamu: menelusuri dokumen, mencoba alur getting started, mengukur TTHW, memicu galat CLI seperti yang dialami agent (`gstack-error-capture`: tanpa terminal, terkandung, disamarkan). Membandingkan dengan skor `/plan-devex-review`: bumerang yang menunjukkan apakah rencanamu cocok dengan kenyataan. |
| `/design-shotgun` | **Design Explorer** | "Tunjukkan opsi." Menghasilkan 4-6 varian mockup AI, membuka papan perbandingan di browser, mengumpulkan umpan balik, dan beriterasi. Memori selera mempelajari apa yang kamu suka. Ulangi sampai kamu suka, lalu serahkan ke `/design-html`. |
| `/design-html` | **Design Engineer** | Ubah mockup menjadi HTML produksi yang benar-benar berfungsi. Layout terhitung Pretext: teks mengalir ulang, tinggi menyesuaikan, layout dinamis. 30KB, nol dependensi. Mendeteksi React/Svelte/Vue. Routing API cerdas per jenis desain (landing page vs dashboard vs formulir). Satu lintasan gerbang slop lewat mesin impeccable bila kamu punya. Keluarannya siap dikirim, bukan demo. |
| `/design-motion` | **Motion Designer** | Ubah mockup yang disetujui, halaman final, atau URL menjadi loop showcase. Membangun ulang frame persis, memuatnya dari kosong, memberi setiap visual satu cerita, merekam frame deterministik pada jam palsu, dan mengekspor MP4 untuk X, GIF situs, dan GIF 800×500 setelah pemeriksaan seam, beat kosong, istirahat, dan overflow lulus. Butuh ffmpeg. |
| `/qa` | **QA Lead** | Jelajahi perilaku browser, API, CLI, job, dan webhook. Mereproduksi bug, menulis regresi yang gagal, memperbaiki penyebabnya, dan memverifikasi ulang sebelum commit. |
| `/qa-only` | **QA Reporter** | Jelajahi dan laporkan dengan bukti yang bisa diputar ulang. Menyarankan kasus regresi tanpa mengubah kode produk atau tes. |
| `/pair-agent` | **Multi-Agent Coordinator** | Bagikan browser milik gstack sendiri dengan agent AI mana pun. Satu perintah, satu tempel, terhubung. Bekerja dengan OpenClaw, Hermes, Codex, Cursor, atau apa pun yang bisa curl. Setiap agent mendapat tab sendiri. Otomatis meluncurkan mode headed agar kamu menonton semuanya. Otomatis memulai tunnel ngrok untuk agent jarak jauh. Token terbatas, isolasi tab, pembatasan laju, atribusi aktivitas. (Berjalan di browser bawaan, mesin fallback; agent yang mengendalikan Aside cukup membuka tab sendiri.) |
| `/cso` | **Chief Security Officer** | Audit keamanan dengan model aplikasi, temuan yang didukung, tantangan independen, dan cakupan eksplisit. Penilaian statis tetap tersedia tanpa profil katalog. Dengan profil terkualifikasi yang cocok, mode komprehensif menambah eksekusi runtime/scanner terkandung dan kandidat perbaikan yang bisa ditinjau untuk Node/Bun, Python, dan Rails. Image runtime dan scanner terkualifikasi dipublikasikan untuk linux/amd64 dan linux/arm64. Tanpa Docker, audit hanya menjalankan penilaian statis. Bundel yang diuji runtime mengautentikasi asersi eksternal yang terpisah. Penyelesaian tes proyek tetap `self_reported` karena kode target mengendalikan proses tes; `tested` dicadangkan untuk saksi penyelesaian yang independen dari target di masa depan. |
| `/ship` | **Release Engineer** | Sinkronkan main, jalankan tes, jelajahi perilaku yang berubah, audit cakupan, integritas gerbang, dan dokumen, lalu verifikasi, push, dan buka PR. |
| `/land-and-deploy` | **Release Engineer** | Merge PR, tunggu CI dan deploy, verifikasi kesehatan produksi. Satu perintah dari "disetujui" ke "terverifikasi di produksi." |
| `/modernize` | **Stale-PR Maintainer** | Bawa PR yang menua ke basis terkininya dan katakan apakah ia masih layak ada: MODERNIZE (rebase, bukti `git range-diff`, push dengan lease yang dipatok ke head yang diamati), REWORK (masalahnya masih ada, diff-nya tidak) atau CLOSE (direkomendasikan, tidak pernah dilakukan tanpa izin). Membaca rentang basis yang bergerak untuk konflik makna, bukan hanya teks. |
| `/canary` | **SRE** | Loop pemantauan pasca-deploy. Mengawasi galat konsol, regresi performa, dan kegagalan halaman. |
| `/benchmark` | **Performance Engineer** | Baseline waktu muat halaman, Core Web Vitals, dan ukuran sumber daya. Bandingkan sebelum/sesudah di setiap PR. |
| `/ubicloud` | **Remote Runner** | Jalankan suite berat, build, atau eval di VM Ubicloud 16-vCPU efemeral: VM bernama pemilik dan TTL dengan reaper, preflight kuota, watchdog hang, dan satu verifikasi ter-commit per repositori. |
| `/runaway-stopper` | **Spend Warden** | Temukan thread agent dan subagent yang lepas kendali di Capy (konteks sendiri lewat 500M token, aktif lebih dari 3 hari, subagent lewat 100M, wake kosong, ronde review tanpa akhir), hentikan di titik bersih, putar thread lewat handoff, dan setel default yang mencegahnya kembali. `gstack-runaway scan` membaca data thread milik host sendiri dan tidak pernah bertindak. |
| `/eval-plan` | **Eval Planner** | Prapendaftaran eval berbayar sebelum panggilan berbayar pertama: batas, lengan, umpan dan aturan berhenti, uji kering model-stub $0 atas input sebenarnya, dan pilot berbayar tiga item yang ekstrapolasi dan tabel pengeluarannya menjadi gerbang persetujuan. |
| `/document-release` | **Technical Writer** | Audit perilaku yang berubah terhadap dokumen proyek di setiap ship, sebelum verifikasi akhir dan publikasi. Juga bisa berjalan sendiri. Menampilkan dokumen yang diperbarui, ditinjau/terkini, atau terblokir dan celah yang tersisa. |
| `/document-generate` | **Documentation Author** | Hasilkan dokumen yang hilang dari nol memakai kerangka Diataxis. Meriset codebase dulu, lalu menulis dokumen reference / how-to / tutorial / explanation yang benar-benar cocok dengan kode. Bisa dipanggil sendiri atau dirantai dari `/document-release` saat peta cakupan menemukan celah. Pelajari lebih lanjut: [tutorial](https://github.com/garrytan/gstack/blob/main/docs/tutorial-document-generate.md) • [how-to](https://github.com/garrytan/gstack/blob/main/docs/howto-document-a-shipped-feature.md) • [mengapa Diataxis](https://github.com/garrytan/gstack/blob/main/docs/explanation-diataxis-in-gstack.md). |
| `/retro` | **Eng Manager** | Retro mingguan yang sadar tim. Rincian per orang, streak pengiriman, tren kesehatan tes, peluang pertumbuhan. `/retro global` berjalan di semua proyek dan alat AI kamu (Claude Code, Codex, Gemini, Kimi Code, OMP, Antigravity). |
| `/browse` | **QA Engineer** | Beri agent mata. Mengendalikan browser [Aside](https://aside.com) lebih dulu, dengan sesi sungguhanmu, klik sungguhan, screenshot sungguhan, lewat skrip `aside repl` deterministik. Tanpa Aside? Ia kembali ke Chromium milik gstack sendiri: klik sungguhan, ~100ms per perintah, dan `/open-gstack-browser` menampilkannya dalam mode headed dengan sidebar, stealth anti-bot, dan routing model otomatis. Setiap skill browser lain bersandar padanya. |
| `/scrape` | **Data Extractor** | Tarik data terstruktur dari halaman web (tabel, daftar, harga) di browser Aside dengan status login nyata halaman itu. Di browser fallback, `/skillify` mengubah alurnya menjadi browser-skill permanen yang berjalan ~200ms lain kali. |
| `/setup-browser-cookies` | **Session Manager** | Salin cookie terpilih dari Chrome, Chromium, Brave, Edge, Opera dan Opera GX (khusus Windows), atau Comet dan Arc (khusus macOS) ke browser bawaan gstack. Pilih profil dan domainmu; penyalinan dan verifikasi login terpisah. Hanya dibutuhkan di jalur fallback; Aside sudah punya sesimu. |
| `/autoplan` | **Review Pipeline** | Satu perintah, rencana yang ter-review penuh. Menjalankan review CEO → desain → DX → eng otomatis (eng selalu terakhir, agar gerbang pengiriman me-review rencana akhir yang sudah diamendemen) dengan prinsip keputusan yang dikodekan. Hanya memunculkan keputusan selera untuk persetujuanmu. |
| `/spec` | **Spec Author** | Ubah niat yang samar menjadi spesifikasi yang presisi dan bisa dieksekusi dalam lima fase (mengapa, cakupan, teknis dengan pembacaan kode wajib, draf, arsip). Gerbang kualitas outside-review sebelum mengajukan (Claude Code lewat Codex; Codex di harness lain; memblokir di bawah 7/10), penyamaran rahasia fail-closed, dedup terhadap issue yang ada, arsip ke `$GSTACK_STATE_ROOT/projects/$SLUG/specs/` untuk recall korpus tim. `--execute` memunculkan `claude -p` di worktree baru; `/ship` menutup issue sumber otomatis saat merge. Sadar plan-mode. |
| `/learn` | **Memory** | Kelola apa yang dipelajari gstack lintas sesi. Tinjau, cari, pangkas, dan ekspor pola, jebakan, dan preferensi khusus proyek. Pembelajaran bertumpuk lintas sesi sehingga gstack makin cerdas di codebase kamu. |
| `/make-pdf` | **Publisher** | Markdown masuk, dokumen berkualitas publikasi keluar. Fence Mermaid dan excalidraw dirender sebagai diagram vektor, sepenuhnya offline. Gambar menyesuaikan halaman dan tidak pernah terpotong; diagram lebar mendapat halaman lanskap sendiri. `--to html` menghasilkan satu file mandiri, `--to docx` dokumen Word. |
| `/diagram` | **Diagram Maker** | Bahasa Inggris masuk, diagram yang bisa diedit keluar. Menghasilkan triplet: sumber mermaid, `.excalidraw` yang bisa dibuka dan diedit di excalidraw.com (gaya gambar tangan), dan SVG/PNG yang dirender. Nol jaringan. Sematkan sumbernya di markdown dan `/make-pdf` merendernya. |

Perintah `/qa` dan `/qa-only` yang sama menguji CLI, API, job, worker, dan webhook tanpa browser: [QA tanpa halaman web](https://github.com/garrytan/gstack/blob/main/docs/qa-without-a-webpage.md).

### Review mana yang harus saya pakai?

| Membangun untuk... | Tahap rencana (sebelum kode) | Audit langsung (setelah dikirim) |
|-----------------|--------------------------|----------------------------|
| **Pengguna akhir** (UI, web app, mobile) | `/plan-design-review` | `/design-review` |
| **Developer** (API, CLI, SDK, dokumen) | `/plan-devex-review` | `/devex-review` |
| **Arsitektur** (aliran data, perf, tes) | `/plan-eng-review` | `/review` |
| **Semua di atas** | `/autoplan` (menjalankan CEO → desain → DX → eng, mendeteksi otomatis mana yang berlaku; eng selalu terakhir) | — |

### Alat bantu tambahan

| Skill | Fungsinya |
|-------|-------------|
| `/codex` | **Second Opinion**: review kode independen dari OpenAI Codex CLI. Mode review, challenge, dan consult. Tersedia di setiap harness kecuali Codex. |
| `/claude-code` | **Second Opinion**: review kode independen dari Claude Code. Mode review, challenge, dan consult, dengan kontinuitas sesi untuk konsultasi. Tersedia di setiap harness kecuali Claude Code. |
| `/careful` | **Pagar pengaman**: memperingatkan sebelum perintah destruktif (rm -rf, DROP TABLE, force-push). Ucapkan "be careful" untuk mengaktifkan. Peringatan MEDIUM mana pun bisa ditimpa; penghapusan rekursif root/home dan force-push ke branch default ditolak keras. |
| `/freeze` | **Kunci edit**: batasi edit file ke satu direktori. Mencegah perubahan tak sengaja di luar cakupan saat debugging. |
| `/guard` | **Keselamatan penuh**: `/careful` + `/freeze` dalam satu perintah. Keselamatan maksimum untuk kerja produksi. |
| `/unfreeze` | **Buka kunci**: hapus batas `/freeze`. |
| `/open-gstack-browser` | **GStack Browser**: luncurkan browser milik gstack sendiri dalam mode headed, dengan sidebar, stealth anti-bot, routing model otomatis (Sonnet untuk aksi, Opus untuk analisis), impor cookie satu klik, dan integrasi Claude Code. Bersihkan halaman, ambil screenshot cerdas, edit CSS, dan kirim info kembali ke terminalmu. Wajah yang terlihat dari mesin fallback; dengan Aside terbuka kamu menonton tab agent di sana. |
| `/setup-deploy` | **Deploy Configurator**: setup sekali untuk `/land-and-deploy`. Mendeteksi platform, URL produksi, dan perintah deploy kamu. |
| `/setup-gbrain` | **GBrain Onboarding**: dari nol ke gbrain berjalan dalam waktu kurang dari 5 menit. PGLite lokal, URL Supabase yang ada, atau menyediakan otomatis proyek Supabase baru lewat Management API. Registrasi MCP untuk Claude Code + triad kepercayaan per-repo (baca-tulis/baca-saja/tolak). [Panduan lengkap](https://github.com/garrytan/gstack/blob/main/USING_GBRAIN_WITH_GSTACK.md). |
| `/sync-gbrain` | **Jaga Brain Tetap Terkini**: indeks ulang kode repo ini ke gbrain lewat `gbrain sources add` + `gbrain sync --strategy code`, segarkan blok `## GBrain Search Guidance` di CLAUDE.md, dan hapus panduan otomatis bila pemeriksaan kapabilitas gagal. `--incremental` (default), `--full`, `--dry-run`. Idempoten; aman dijalankan ulang. |
| `/gstack-upgrade` | **Self-Updater**: upgrade gstack ke yang terbaru. Mendeteksi instalasi global vs vendored, menyinkronkan keduanya, menampilkan apa yang berubah. |
| `/captain` | **Crew Controller**: jalankan banyak agent coding dari satu controller: lane mengirim blok READY dan tidak pernah merge, controller me-merge lewat train (stempel saat dipanggil, verifikasi, merge dengan head yang diharapkan), menyimpan digest, meneruskan persetujuan dalam bentuk tetap, dan menjalankan lintasan perbaikan flaky harian. Juga menjawab `/crew`. [Panduan tim](https://github.com/garrytan/gstack/blob/main/docs/captain.md). |
| `/ios-qa` | **QA perangkat iOS langsung (v1.43.0.0+)**: kendalikan iPhone atau iPad sungguhan lewat USB CoreDevice melalui `StateServer` tertanam di aplikasi. Membaca sumber Swift, codegen accessor `@Observable` bertipe, menjalankan loop agent. Flag opsional `--tailnet` mengekspos perangkat ke OpenClaw atau agent berkemampuan HTTP di tailnet Tailscale kamu agar agent jarak jauh bisa menjalankan QA iOS tanpa menyentuh perangkat kerasnya. Allowlist tier kapabilitas (observe/interact/mutate/restore), kunci sesi per perangkat, log audit. |
| `/ios-fix`, `/ios-design-review`, `/ios-clean`, `/ios-sync` | Loop perbaikan bug iOS, audit HIG dari sudut pandang desainer, pembersihan debug-bridge, dan sinkron ulang accessor. Lihat `docs/skills.md`. Panduan ujung ke ujung: [docs/howto-ios-testing-with-gstack.md](https://github.com/garrytan/gstack/blob/main/docs/howto-ios-testing-with-gstack.md). |

Di luar slash command, gstack mengirim CLI mandiri (`gstack-egress`, `gstack-context-bill`, `gstack-model-benchmark`, `gstack-pr-wait`, ledger review dan bukti, daemon QA iOS): [docs/standalone-binaries.md](https://github.com/garrytan/gstack/blob/main/docs/standalone-binaries.md). [Skill domain](https://github.com/garrytan/gstack/blob/main/docs/domain-skills.md) per situs milik browser fallback dan pintu keluar CDP mentah, serta [alias input suara](https://github.com/garrytan/gstack/blob/main/docs/voice-input.md) yang dibawa banyak skill, punya halamannya sendiri.

**[Pembahasan mendalam dengan contoh dan filosofi untuk setiap skill →](https://github.com/garrytan/gstack/blob/main/docs/skills.md)**

## GBrain: pengetahuan persisten untuk agent coding kamu

[GBrain](https://github.com/garrytan/gbrain) adalah basis pengetahuan persisten untuk agent AI, anggap saja memori yang benar-benar disimpan agent kamu di antara sesi. GStack memberimu jalur satu perintah dari nol ke "sudah berjalan, agent saya bisa memanggilnya."

```bash
/setup-gbrain
```

Empat jalur setup, kebijakan kepercayaan per-repo, dan sinkronisasi memori, singkatnya: [docs/gbrain-quick-tour.md](https://github.com/garrytan/gstack/blob/main/docs/gbrain-quick-tour.md). **Selengkapnya, setiap skenario, flag, helper bin, dan langkah pemecahan masalah:** [USING_GBRAIN_WITH_GSTACK.md](https://github.com/garrytan/gstack/blob/main/USING_GBRAIN_WITH_GSTACK.md)

Referensi lain: [docs/gbrain-sync.md](https://github.com/garrytan/gstack/blob/main/docs/gbrain-sync.md) (panduan khusus sinkronisasi) • [docs/gbrain-sync-errors.md](https://github.com/garrytan/gstack/blob/main/docs/gbrain-sync-errors.md) (indeks galat)

## Catatan platform

macOS dan Linux mendapat dukungan penuh. Windows dan model Gemini mendapat dukungan minimal: pemasangan dan skill inti berfungsi, tidak lebih dari itu yang dijanjikan. Lihat [tier dukungan](https://github.com/garrytan/gstack/blob/main/docs/support-tiers.md).

**macOS:** semuanya berjalan. Dengan browser [Aside](https://aside.com) (macOS 15+) terbuka dan sudah login, skill browser, `/make-pdf`, dan `/diagram` memakainya beserta sesi sungguhanmu; jika tidak, mereka memakai browser bawaan yang dibangun `./setup`. gstack tidak pernah memasang Aside.

**Linux:** semuanya berjalan di browser bawaan; Aside hanya untuk macOS, jadi probe kesiapan mengatakan `NEEDS_ASIDE: Linux` sekali dan skill memakai Chromium milik gstack sendiri. Jika Chromium terpasang tetapi tidak bisa diluncurkan karena host memblokir user namespace tanpa hak istimewa (default AppArmor Ubuntu 24.04+), setel `GSTACK_CHROMIUM_NO_SANDBOX=1`.

**Pengguna Windows:** gstack berfungsi di Windows 11 lewat Git Bash atau WSL. Aside hanya untuk macOS, jadi di Windows (dan Linux) skill browser, `/make-pdf`, dan `/diagram` selalu memakai browser bawaan gstack. Node.js dibutuhkan selain Bun: Bun punya bug yang diketahui dengan pipe transport Playwright di Windows ([bun#4253](https://github.com/oven-sh/bun/issues/4253)). Server browse otomatis kembali ke Node.js. Pastikan `bun` dan `node` ada di PATH kamu. `/cso` native juga membutuhkan PowerShell (PowerShell 7 `pwsh` lebih disukai; Windows PowerShell 5.1 sebagai fallback) dan Visual Studio 2022 Build Tools dengan workload Desktop development with C++; setup membiarkan skill itu eksplisit tidak tersedia bila tidak ada. /cso bersifat opsional: bila helper native-nya gagal dibangun atau dipublikasikan, setup tetap selesai, menyebut langkah mana yang gagal beserta path log dan perintah coba-ulang, dan mempertahankan helper sebelumnya bila ada (`GSTACK_STRICT_BUILD=1` membuat kegagalan itu fatal, seperti di CI).

**Masalah yang diketahui: Windows Smart App Control** ([#2595](https://github.com/garrytan/gstack/issues/2595)). Biner terkompilasi gstack (`browse`, `find-browse`, `design`, `pdf`, `gstack-global-discover`) dibangun di mesinmu dan tidak ditandatangani, sehingga Windows 11 dengan Smart App Control menyala menolak menjalankannya; Git Bash menampilkan `Permission denied`. Setup mendeteksi ini, menyebut biner yang diblokir dan skill yang membutuhkannya, dan `gstack-doctor` melaporkannya sebagai `blocked`. Solusi saat ini adalah menjalankan gstack di dalam WSL, atau mematikan Smart App Control. Detail: [troubleshooting](https://github.com/garrytan/gstack/blob/main/docs/troubleshooting.md#windows-smart-app-control). Terminal sidebar memakai Consolas di Windows, sehingga teksnya tidak lagi tampil renggang.

Dari PowerShell, `.\setup.ps1` (argumen sama dengan `./setup`) memeriksa bahwa Git for Windows, Bun, dan Node.js ada di PATH, mencetak perintah `winget` untuk yang hilang, dan selain itu menjalankan `./setup` di Git Bash.

Di Windows tanpa Developer Mode (MSYS2 / Git Bash), `setup` jatuh ke salinan file alih-alih symlink karena `ln -snf` menghasilkan salinan beku yang tidak menyegar saat `git pull`. **Jalankan ulang `cd ~/.claude/skills/gstack && ./setup` setelah setiap `git pull`** agar file skill cocok dengan repo. `setup` mencetak catatan satu baris sebagai pengingat. Unix dan WSL mempertahankan symlink dan tidak butuh dijalankan ulang.

## Privasi & Telemetri

gstack tidak mengirim apa pun tentang cara kamu memakainya kecuali kamu ikut serta. Telemetri mati secara default dan ditanyakan sekali; pemeriksaan pembaruan (dua atau tiga permintaan GitHub: `git ls-remote`, pengambilan `VERSION` dan, bila versi itu sama dengan milikmu tetapi `main` sudah bergerak, panggilan compare-API; dengan telemetri menyala ia juga melaporkan versi gstack dan OS kamu; menyala secara default) dimatikan dengan `gstack-config set update_check false`; outside review (menyala secara default; yang pertama mencetak pemberitahuan) mengirim kode ke Codex atau Claude Code atas login kamu sendiri dan dimatikan dengan `gstack-config set codex_reviews disabled`. Setiap pengiriman keluar mesin menulis tanda terima yang bisa kamu audit dengan `gstack-egress list`. Penjelasan lengkap, termasuk field persis yang dibawa telemetri dan status lokal yang bukan telemetri: [docs/privacy.md](https://github.com/garrytan/gstack/blob/main/docs/privacy.md).

## Pemecahan masalah

**Tidak yakin apa yang salah?** Jalankan doctor: `~/.claude/skills/gstack/bin/gstack-doctor` (di host lain, `./setup --status` di checkout gstack kamu berakhir dengan path absolut doctor). Tanpa memulai skill atau mengeluarkan biaya, ia mencetak satu baris per pemeriksaan (instalasi, state root, Bun, hook, Codex dan probe modelnya yang di-cache, sinkron artefak, bundel browse, biner terkompilasi lain, helper native /cso, Claude Code, jurnal sesi terbesarmu, dan kode guard /autoplan terbaru), masing-masing `ok`, `warn`, `not configured`, atau `fail` dengan perintah yang memperbaikinya. Ia keluar non-nol hanya pada `fail`. `--live` juga menjalankan pemeriksaan model Codex berbayar (satu panggilan singkat). Tempel keluarannya ke laporan bug.

**Sebuah pesan berkata `not run`, `unavailable`, atau menyebut perbaikan?** Cari di [docs/troubleshooting.md](https://github.com/garrytan/gstack/blob/main/docs/troubleshooting.md): setiap pesan gerbang yang dicetak gstack, artinya, apa yang dipertahankan, dan perintah yang memperbaikinya.

**Claude bilang tidak bisa melihat skill?** Periksa bahwa skill terpasang (`ls ~/.claude/skills`) dan restart Claude Code; ia mendaftar setiap skill terpasang beserta deskripsinya, jadi CLAUDE.md tidak perlu menyebutnya satu per satu (daftar yang ditempel menjadi usang di setiap rilis). `CLAUDE.md` proyekmu hanya butuh aturan browsing:

```
## gstack
Use /browse from gstack for all web browsing. Never use mcp__claude-in-chrome__* tools.
```

Jika prompt pasang lama meninggalkan baris "Available skills:" di CLAUDE.md kamu, hapus.

Skill tidak muncul, instalasi basi, deskripsi skill Codex, mode prefiks, menonaktifkan skill, masalah pemasangan Chromium: [jawaban cepat](https://github.com/garrytan/gstack/blob/main/docs/troubleshooting.md#quick-answers).

## Lisensi

MIT. Gratis selamanya. Tanpa tier premium, tanpa daftar tunggu.
