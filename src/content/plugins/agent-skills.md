---
title: "Agent Skills (addyosmani)"
summary: "25 skill rekayasa kelas produksi untuk agent coding AI yang mengikuti siklus hidup pengembangan (define, plan, build, verify, review, ship), plus 9 slash command, 4 persona agent, dan 7 checklist referensi."
category: coding
tags: [skills, engineering, workflow, code-review, tdd, spec, security, ci-cd, plugin, multi-agent]
surfaces: [claude-code]
source_url: "https://github.com/addyosmani/agent-skills/blob/main/README.md"
repo: addyosmani/agent-skills
stars: 113343
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
install: |
  # Jalur tercepat, agent apa pun: CLI skills terbuka memasang ke 70+ agent
  npx skills add addyosmani/agent-skills            # pasang semua 25 skill
  npx skills add addyosmani/agent-skills --list     # telusuri sebelum memasang
  npx skills add addyosmani/agent-skills --skill code-review-and-quality
  npx skills add addyosmani/agent-skills --skill interview-me
  npx skills add addyosmani/agent-skills --skill test-driven-development

  # Claude Code (disarankan): marketplace
  /plugin marketplace add addyosmani/agent-skills
  /plugin install agent-skills@addy-agent-skills

  # Bila ada galat SSH, pakai URL HTTPS penuh:
  /plugin marketplace add https://github.com/addyosmani/agent-skills.git
  /plugin install agent-skills@addy-agent-skills
  # Atau atur Git sekali agar URL SSH GitHub ditulis ulang ke HTTPS:
  git config --global url."https://github.com/".insteadOf git@github.com:

  # Claude Code, lokal / pengembangan
  git clone https://github.com/addyosmani/agent-skills.git
  claude --plugin-dir /path/to/agent-skills

  # Antigravity CLI
  agy plugin install https://github.com/addyosmani/agent-skills.git
  # atau dari clone lokal:
  git clone https://github.com/addyosmani/agent-skills.git
  agy plugin install ./agent-skills

  # Gemini CLI
  gemini skills install https://github.com/addyosmani/agent-skills.git --path skills
  # atau dari clone lokal:
  gemini skills install ./agent-skills/skills/

  # Codex (CLI v0.122+)
  codex plugin marketplace add addyosmani/agent-skills
  codex plugin add agent-skills@agent-skills

  # Command Code
  cmd skills add addyosmani/agent-skills            # pilih skill yang dipasang (proyek)
  cmd skills add addyosmani/agent-skills --global   # untuk semua proyek (~/.commandcode/skills/)
  cmd skills add addyosmani/agent-skills -s spec-driven-development

  # Cursor, Windsurf, OpenCode, GitHub Copilot, Kiro, dan agent lain: lihat panduan per-alat di bagian Pasang.
includes: [using-agent-skills, interview-me, idea-refine, spec-driven-development, constraint-driven-development, planning-and-task-breakdown, incremental-implementation, test-driven-development, context-engineering, source-driven-development, doubt-driven-development, frontend-ui-engineering, api-and-interface-design, browser-testing-with-devtools, debugging-and-error-recovery, code-review-and-quality, code-simplification, security-and-hardening, performance-optimization, git-workflow-and-versioning, ci-cd-and-automation, deprecation-and-migration, documentation-and-adrs, observability-and-instrumentation, shipping-and-launch]
---

# Agent Skills

**Skill rekayasa kelas produksi untuk agent coding AI.**

Skill mengodekan alur kerja, gerbang kualitas, dan praktik terbaik yang dipakai engineer senior saat membangun perangkat lunak. Skill-skill ini dikemas agar agent AI mengikutinya secara konsisten di setiap fase pengembangan.

> **Catatan dari situs ini:** (1) Instalasi per-skill lewat `npx` hanya menyalin `skills/<nama>/`, bukan direktori `references/` di tingkat repo; skill tetap berfungsi, tetapi path ke checklist bersama tidak tersedia (dilacak di [#361](https://github.com/addyosmani/agent-skills/issues/361)). Pakai integrasi seluruh-repo atau clone repositori bila membutuhkannya. (2) Perintah `/build auto` mengimplementasikan seluruh rencana dalam satu lintasan setelah kamu menyetujui rencananya; ia tetap memakai TDD dan commit per tugas, tetapi sebaiknya tinjau rencananya dengan teliti. (3) Bagian badge Trendshift, gambar, dan daftar tim tidak disalin.

```
  DEFINE          PLAN           BUILD          VERIFY         REVIEW          SHIP
 ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐
 │ Idea │ ───▶ │ Spec │ ───▶ │ Code │ ───▶ │ Test │ ───▶ │  QA  │ ───▶ │  Go  │
 │Refine│      │  PRD │      │ Impl │      │Debug │      │ Gate │      │ Live │
 └──────┘      └──────┘      └──────┘      └──────┘      └──────┘      └──────┘
  /spec          /plan          /build        /test         /review       /ship
```

## Perintah

9 slash command yang memetakan siklus hidup pengembangan. Setiap perintah mengaktifkan skill yang tepat secara otomatis.

| Yang sedang kamu kerjakan | Perintah | Prinsip kunci |
|-------------------|---------|---------------|
| Tentukan apa yang dibangun | `/spec` | Spesifikasi sebelum kode |
| Rencanakan cara membangunnya | `/plan` | Tugas kecil dan atomik |
| Bangun secara bertahap | `/build` | Satu irisan dalam satu waktu |
| Buktikan bahwa berfungsi | `/test` | Tes adalah bukti |
| Tetapkan standar kualitas | `/constraints` | Putuskan sekali, tegakkan di mana-mana |
| Review sebelum merge | `/review` | Perbaiki kesehatan kode |
| Audit performa web | `/webperf` | Ukur sebelum mengoptimalkan |
| Sederhanakan kode | `/code-simplify` | Kejelasan di atas kecerdikan |
| Kirim ke produksi | `/ship` | Lebih cepat lebih aman |

Di Claude Code, perintah ini dipasang sebagai perintah plugin. Bila ada perintah bawaan dengan nama yang sama, seperti `/review`, pakai bentuk ber-namespace: `/agent-skills:review`.

Ingin langkah manual lebih sedikit setelah spesifikasi ada? **`/build auto`** menghasilkan rencana dan mengimplementasikan setiap tugas dalam satu lintasan yang disetujui: kamu menyetujui rencananya sekali, lalu berjalan otomatis. Ia menghapus manusia yang melangkah *di antara* tugas, bukan verifikasinya: setiap tugas tetap berbasis tes dan di-commit tersendiri, dan ia berhenti saat ada kegagalan atau langkah berisiko.

Skill juga aktif otomatis berdasarkan apa yang sedang kamu kerjakan: merancang API memicu `api-and-interface-design`, membangun UI memicu `frontend-ui-engineering`, dan seterusnya.

## Mulai cepat

**Jalur tercepat, agent apa pun, satu perintah.** [CLI skills](https://github.com/vercel-labs/skills) terbuka memasang ke 70+ agent (Claude Code, Cursor, Codex, Copilot, Cline, dan lainnya):

```bash
npx skills add addyosmani/agent-skills            # pasang semua 25 skill
npx skills add addyosmani/agent-skills --list     # telusuri sebelum memasang
```

Atau ambil skill individual:

```bash
npx skills add addyosmani/agent-skills --skill code-review-and-quality   # review lima sumbu sebelum merge
npx skills add addyosmani/agent-skills --skill interview-me              # interogasi kebutuhan, satu pertanyaan sekali
npx skills add addyosmani/agent-skills --skill test-driven-development   # red-green-refactor, ditegakkan
```

> **Memasang satu skill?** Instalasi `npx` per-skill hanya menyalin `skills/<nama>/`, bukan direktori `references/` di tingkat repo. Skill tetap berfungsi, tetapi path ke checklist bersama tambahan tidak tersedia. Pakai integrasi seluruh-repo, clone repositori, atau salin checklist yang dibutuhkan ke direktori `references/` di dalam skill yang terpasang. Celah portabilitas ini dilacak di [#361](https://github.com/addyosmani/agent-skills/issues/361).

Lebih suka integrasi native? Pilih alatmu di bawah.

### Claude Code (disarankan)

**Instalasi marketplace:**

```
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills
```

> **Galat SSH?** Marketplace meng-clone repo lewat SSH. Jika kamu belum menyiapkan kunci SSH di GitHub, [tambahkan kunci SSH-mu](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) atau pakai URL HTTPS penuh untuk memaksa clone lewat HTTPS pada langkah marketplace-add:
> ```bash
> /plugin marketplace add https://github.com/addyosmani/agent-skills.git
> /plugin install agent-skills@addy-agent-skills
> ```
>
> Jika `/plugin install` masih gagal dengan `git@github.com: Permission denied (publickey)` di Windows atau macOS, solusi yang disarankan adalah mengonfigurasi Git sekali agar menulis ulang URL SSH GitHub ke HTTPS untuk clone subproses:
> ```bash
> git config --global url."https://github.com/".insteadOf git@github.com:
> ```

**Lokal / pengembangan:**

```bash
git clone https://github.com/addyosmani/agent-skills.git
claude --plugin-dir /path/to/agent-skills
```

### Cursor

Taruh skill alur kerja di `.cursor/skills/` (sinkronkan dari `agent-skills/skills/`) dan kebijakan singkat di `.cursor/rules/*.mdc`; jangan menempelkan skill penuh ke dalam aturan. Kedua direktori ada di proyekmu; repo ini tidak mengirim folder `.cursor/`. Lihat [docs/cursor-setup.md](https://github.com/addyosmani/agent-skills/blob/main/docs/cursor-setup.md).

### Antigravity CLI

Pasang sebagai plugin native untuk skill dan subagent. Pada rilis Antigravity CLI yang terdampak, TOML perintah lama dilaporkan terkonversi tetapi perintah pembungkusnya tidak bisa ditemukan; panggil skill ber-namespace di baliknya secara langsung. Lihat [docs/antigravity-setup.md](https://github.com/addyosmani/agent-skills/blob/main/docs/antigravity-setup.md#lifecycle-workflows-and-command-compatibility).

**Pasang dari repo:**

```bash
agy plugin install https://github.com/addyosmani/agent-skills.git
```

**Pasang dari clone lokal:**

```bash
git clone https://github.com/addyosmani/agent-skills.git
agy plugin install ./agent-skills
```

### Gemini CLI

Pasang sebagai skill native untuk penemuan otomatis, atau tambahkan ke `GEMINI.md` untuk konteks persisten. Lihat [docs/gemini-cli-setup.md](https://github.com/addyosmani/agent-skills/blob/main/docs/gemini-cli-setup.md).

**Pasang dari repo:**

```bash
gemini skills install https://github.com/addyosmani/agent-skills.git --path skills
```

**Pasang dari clone lokal:**

```bash
gemini skills install ./agent-skills/skills/
```

### Windsurf

Tambahkan isi skill ke konfigurasi aturan Windsurf kamu. Lihat [docs/windsurf-setup.md](https://github.com/addyosmani/agent-skills/blob/main/docs/windsurf-setup.md).

### OpenCode

Salin skill ke `.opencode/skills/` (atau `~/.config/opencode/skills/`), tambahkan `AGENTS.md` lokal proyek, dan pakai tool `skill` bawaan untuk eksekusi yang digerakkan agent. Slash command opsional bisa ditambahkan di bawah `.opencode/commands/`.

Lihat [docs/opencode-setup.md](https://github.com/addyosmani/agent-skills/blob/main/docs/opencode-setup.md).

### GitHub Copilot

Pakai definisi agent dari `agents/` sebagai persona Copilot dan isi skill di `.github/copilot-instructions.md`. Slash command siklus hidup (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`) adalah perintah Claude Code dan tidak muncul di Copilot; panggil skill berdasarkan namanya (`/spec-driven-development`, …) sebagai gantinya. Lihat [docs/copilot-setup.md](https://github.com/addyosmani/agent-skills/blob/main/docs/copilot-setup.md).

Memakai CLI `copilot` mandiri? Pasang sebagai plugin, lihat [docs/copilot-cli-setup.md](https://github.com/addyosmani/agent-skills/blob/main/docs/copilot-cli-setup.md).

### Kiro IDE & CLI

Skill untuk Kiro berada di bawah ".kiro/skills/" dan bisa disimpan di tingkat Proyek atau Global. Kiro juga mendukung Agents.md. Lihat dokumen Kiro di https://kiro.dev/docs/skills/

### Codex

Pasang sebagai plugin Codex native (Codex CLI v0.122+):

```bash
codex plugin marketplace add addyosmani/agent-skills
codex plugin add agent-skills@agent-skills
```

Perintah pertama mendaftarkan marketplace; yang kedua memasang plugin. Codex membaca direktori `skills/` di root langsung lewat `.codex-plugin/plugin.json`. Setelah terpasang, panggil skill di chat dengan `@` (misalnya `@spec-driven-development`). Lihat [docs/codex-setup.md](https://github.com/addyosmani/agent-skills/blob/main/docs/codex-setup.md) untuk instalasi lokal dan pemecahan masalah.

### Command Code

Pasang secara native dengan perintah bawaan `cmd skills`. Command Code meng-clone repo, menemukan setiap `SKILL.md`, dan memasang ke `.commandcode/skills/`:

```bash
cmd skills add addyosmani/agent-skills            # pilih skill yang dipasang (proyek)
cmd skills add addyosmani/agent-skills --global   # pasang untuk semua proyek (~/.commandcode/skills/)
cmd skills add addyosmani/agent-skills -s spec-driven-development  # pasang skill tertentu
```

Skill terpasang muncul di menu slash TUI, misalnya `/spec-driven-development`. Lihat [docs/commandcode-setup.md](https://github.com/addyosmani/agent-skills/blob/main/docs/commandcode-setup.md).

### Agent lain

Skill adalah Markdown biasa: berfungsi dengan agent apa pun yang menerima system prompt atau file instruksi. Lihat [docs/getting-started.md](https://github.com/addyosmani/agent-skills/blob/main/docs/getting-started.md). Host yang memasang paket ini tetapi tidak tercantum di atas ada di [docs/other-hosts.md](https://github.com/addyosmani/agent-skills/blob/main/docs/other-hosts.md).

## Adopsi

Sudah terpasang? Cara meluncurkan paket ini bergantung pada codebase kamu. **[Panduan Adopsi](https://github.com/addyosmani/agent-skills/blob/main/docs/adoption-guide.md)** mencakup dua jalur: siklus hidup penuh sejak hari pertama untuk proyek baru, atau peluncuran bertahap yang mengutamakan verifikasi untuk codebase yang sudah mapan.

## Semua 25 skill

Perintah di atas adalah pintu masuk. Paket ini memuat total 25 skill: 24 skill siklus hidup ditambah meta-skill `using-agent-skills`. Setiap skill adalah alur kerja terstruktur dengan langkah, gerbang verifikasi, dan tabel anti-rasionalisasi. Kamu juga bisa merujuk skill mana pun secara langsung.

### Meta: temukan skill mana yang berlaku

| Skill | Fungsinya | Pakai saat |
|-------|-------------|----------|
| [using-agent-skills](https://github.com/addyosmani/agent-skills/blob/main/skills/using-agent-skills/SKILL.md) | Memetakan pekerjaan masuk ke alur kerja skill yang tepat dan menetapkan aturan operasi bersama | Memulai sesi atau memutuskan skill mana yang berlaku |

### Define: perjelas apa yang dibangun

| Skill | Fungsinya | Pakai saat |
|-------|-------------|----------|
| [interview-me](https://github.com/addyosmani/agent-skills/blob/main/skills/interview-me/SKILL.md) | Wawancara satu pertanyaan sekali yang menggali apa yang benar-benar diinginkan pengguna, bukan apa yang mereka kira seharusnya mereka inginkan, sampai keyakinan ~95% | Permintaan kurang spesifik, atau pengguna memanggil "interview me" / "grill me" |
| [idea-refine](https://github.com/addyosmani/agent-skills/blob/main/skills/idea-refine/SKILL.md) | Pemikiran divergen/konvergen terstruktur untuk mengubah ide samar menjadi proposal konkret | Kamu punya konsep kasar yang perlu dieksplorasi |
| [spec-driven-development](https://github.com/addyosmani/agent-skills/blob/main/skills/spec-driven-development/SKILL.md) | Tulis PRD yang mencakup tujuan, perintah, struktur, gaya kode, pengujian, dan batasan sebelum kode apa pun | Memulai proyek, fitur, atau perubahan signifikan |
| [constraint-driven-development](https://github.com/addyosmani/agent-skills/blob/main/skills/constraint-driven-development/SKILL.md) | Mewawancaraimu soal standar kualitas dengan ambang default yang masuk akal, menulis CONSTRAINTS.md, menempatkan tiap pemeriksaan menurut biayanya, dan menangkap agent yang membungkam pemeriksaan atau melewati tes agar hijau | Belum ada standar tertulis, atau agent menghasilkan lebih banyak daripada yang dibaca siapa pun |

### Plan: pecah menjadi bagian

| Skill | Fungsinya | Pakai saat |
|-------|-------------|----------|
| [planning-and-task-breakdown](https://github.com/addyosmani/agent-skills/blob/main/skills/planning-and-task-breakdown/SKILL.md) | Uraikan spesifikasi menjadi tugas kecil yang bisa diverifikasi dengan kriteria penerimaan dan urutan dependensi | Kamu punya spesifikasi dan butuh unit yang bisa diimplementasikan |

### Build: tulis kode

| Skill | Fungsinya | Pakai saat |
|-------|-------------|----------|
| [incremental-implementation](https://github.com/addyosmani/agent-skills/blob/main/skills/incremental-implementation/SKILL.md) | Irisan vertikal tipis: implementasikan, uji, verifikasi, commit. Feature flag, default aman, perubahan yang ramah rollback | Perubahan apa pun yang menyentuh lebih dari satu file |
| [test-driven-development](https://github.com/addyosmani/agent-skills/blob/main/skills/test-driven-development/SKILL.md) | Red-Green-Refactor, piramida tes (80/15/5), ukuran tes, DAMP di atas DRY, Beyonce Rule, pengujian browser | Mengimplementasikan logika, memperbaiki bug, atau mengubah perilaku |
| [context-engineering](https://github.com/addyosmani/agent-skills/blob/main/skills/context-engineering/SKILL.md) | Beri agent informasi yang tepat pada waktu yang tepat: file aturan, pengemasan konteks, integrasi MCP | Memulai sesi, berganti tugas, atau saat kualitas keluaran turun |
| [source-driven-development](https://github.com/addyosmani/agent-skills/blob/main/skills/source-driven-development/SKILL.md) | Dasarkan setiap keputusan framework pada dokumentasi resmi: verifikasi, kutip sumber, tandai yang belum terverifikasi | Kamu ingin kode yang berotoritas dan mengutip sumber untuk framework atau pustaka apa pun |
| [doubt-driven-development](https://github.com/addyosmani/agent-skills/blob/main/skills/doubt-driven-development/SKILL.md) | Review adversarial berkonteks segar atas setiap keputusan non-trivial saat berjalan: CLAIM → EXTRACT → DOUBT → RECONCILE → STOP, dengan eskalasi lintas-model opsional yang diizinkan pengguna | Taruhannya tinggi (produksi, keamanan, tak bisa dibatalkan), bekerja di kode asing, atau keluaran yang meyakinkan lebih murah diverifikasi sekarang daripada di-debug nanti |
| [frontend-ui-engineering](https://github.com/addyosmani/agent-skills/blob/main/skills/frontend-ui-engineering/SKILL.md) | Arsitektur komponen, design system, manajemen state, desain responsif, aksesibilitas WCAG 2.1 AA | Membangun atau mengubah antarmuka yang dilihat pengguna |
| [api-and-interface-design](https://github.com/addyosmani/agent-skills/blob/main/skills/api-and-interface-design/SKILL.md) | Desain contract-first, Hyrum's Law, One-Version Rule, semantik galat, validasi batas | Merancang API, batas modul, atau antarmuka publik |

### Verify: buktikan bahwa berfungsi

| Skill | Fungsinya | Pakai saat |
|-------|-------------|----------|
| [browser-testing-with-devtools](https://github.com/addyosmani/agent-skills/blob/main/skills/browser-testing-with-devtools/SKILL.md) | Chrome DevTools MCP untuk data runtime langsung: inspeksi DOM, log konsol, jejak jaringan, profiling performa | Membangun atau men-debug apa pun yang berjalan di browser |
| [debugging-and-error-recovery](https://github.com/addyosmani/agent-skills/blob/main/skills/debugging-and-error-recovery/SKILL.md) | Triase lima langkah: reproduksi, lokalisasi, reduksi, perbaikan, penjagaan. Aturan stop-the-line, fallback aman | Tes gagal, build rusak, atau perilaku tak terduga |

### Review: gerbang kualitas sebelum merge

| Skill | Fungsinya | Pakai saat |
|-------|-------------|----------|
| [code-review-and-quality](https://github.com/addyosmani/agent-skills/blob/main/skills/code-review-and-quality/SKILL.md) | Review lima sumbu, ukuran perubahan (~100 baris), label tingkat keparahan (Nit/Optional/FYI), norma kecepatan review, strategi pemecahan | Sebelum merge perubahan apa pun |
| [code-simplification](https://github.com/addyosmani/agent-skills/blob/main/skills/code-simplification/SKILL.md) | Chesterton's Fence, Rule of 500, kurangi kompleksitas sambil mempertahankan perilaku persis | Kode berfungsi tetapi lebih sulit dibaca atau dipelihara dari seharusnya |
| [security-and-hardening](https://github.com/addyosmani/agent-skills/blob/main/skills/security-and-hardening/SKILL.md) | Pencegahan OWASP Top 10, pola autentikasi, manajemen rahasia, audit dependensi, sistem batas tiga tingkat | Menangani input pengguna, autentikasi, penyimpanan data, atau integrasi eksternal |
| [performance-optimization](https://github.com/addyosmani/agent-skills/blob/main/skills/performance-optimization/SKILL.md) | Pendekatan ukur-dulu: target Core Web Vitals, alur profiling, analisis bundle, deteksi anti-pola | Ada persyaratan performa atau kamu curiga ada regresi |

### Ship: deploy dengan percaya diri

| Skill | Fungsinya | Pakai saat |
|-------|-------------|----------|
| [git-workflow-and-versioning](https://github.com/addyosmani/agent-skills/blob/main/skills/git-workflow-and-versioning/SKILL.md) | Trunk-based development, commit atomik, ukuran perubahan (~100 baris), pola commit-sebagai-titik-simpan | Membuat perubahan kode apa pun (selalu) |
| [ci-cd-and-automation](https://github.com/addyosmani/agent-skills/blob/main/skills/ci-cd-and-automation/SKILL.md) | Shift Left, Faster is Safer, feature flag, pipeline gerbang kualitas, loop umpan balik kegagalan | Menyiapkan atau mengubah pipeline build dan deploy |
| [deprecation-and-migration](https://github.com/addyosmani/agent-skills/blob/main/skills/deprecation-and-migration/SKILL.md) | Pola pikir kode-sebagai-liabilitas, deprecation wajib vs anjuran, pola migrasi, penghapusan kode zombi | Menghapus sistem lama, memigrasi pengguna, atau menutup fitur |
| [documentation-and-adrs](https://github.com/addyosmani/agent-skills/blob/main/skills/documentation-and-adrs/SKILL.md) | Architecture Decision Record, dokumen API, standar dokumentasi inline: dokumentasikan *mengapa* | Mengambil keputusan arsitektur, mengubah API, atau mengirim fitur |
| [observability-and-instrumentation](https://github.com/addyosmani/agent-skills/blob/main/skills/observability-and-instrumentation/SKILL.md) | Logging terstruktur, metrik RED, tracing OpenTelemetry, alert berbasis gejala: instrumentasi saat membangun | Menambah telemetri, atau mengirim apa pun yang berjalan di produksi |
| [shipping-and-launch](https://github.com/addyosmani/agent-skills/blob/main/skills/shipping-and-launch/SKILL.md) | Checklist pra-peluncuran, siklus hidup feature flag, rollout bertahap, prosedur rollback, setup pemantauan | Bersiap men-deploy ke produksi |

## Persona agent

Persona spesialis yang sudah dikonfigurasi untuk review terarah:

| Agent | Peran | Perspektif |
|-------|------|-------------|
| [code-reviewer](https://github.com/addyosmani/agent-skills/blob/main/agents/code-reviewer.md) | Senior Staff Engineer | Code review lima sumbu dengan standar "apakah staff engineer akan menyetujui ini?" |
| [test-engineer](https://github.com/addyosmani/agent-skills/blob/main/agents/test-engineer.md) | Spesialis QA | Strategi tes, analisis cakupan, dan pola Prove-It |
| [security-auditor](https://github.com/addyosmani/agent-skills/blob/main/agents/security-auditor.md) | Security Engineer | Deteksi kerentanan, threat modeling, penilaian OWASP |
| [web-performance-auditor](https://github.com/addyosmani/agent-skills/blob/main/agents/web-performance-auditor.md) | Web Performance Engineer | Audit Core Web Vitals dengan mode Quick/Deep dan aturan kejujuran metrik; jalankan lewat `/webperf` |

Lihat [docs/agents.md](https://github.com/addyosmani/agent-skills/blob/main/docs/agents.md) untuk matriks keputusan, aturan orkestrasi, dan cara persona bersusun dengan skill dan slash command.

## Checklist referensi

Materi referensi cepat yang ditarik skill saat dibutuhkan:

| Referensi | Mencakup |
|-----------|--------|
| [definition-of-done.md](https://github.com/addyosmani/agent-skills/blob/main/references/definition-of-done.md) | Standar tetap tingkat proyek yang harus dilewati setiap perubahan, dibandingkan dengan kriteria penerimaan per tugas |
| [testing-patterns.md](https://github.com/addyosmani/agent-skills/blob/main/references/testing-patterns.md) | Struktur tes, penamaan, mocking, contoh React/API/E2E, anti-pola (JavaScript/TypeScript) |
| [security-checklist.md](https://github.com/addyosmani/agent-skills/blob/main/references/security-checklist.md) | Pemeriksaan pra-commit, autentikasi, validasi input, header, CORS, OWASP Top 10 |
| [performance-checklist.md](https://github.com/addyosmani/agent-skills/blob/main/references/performance-checklist.md) | Target Core Web Vitals, checklist frontend/backend, perintah pengukuran |
| [accessibility-checklist.md](https://github.com/addyosmani/agent-skills/blob/main/references/accessibility-checklist.md) | Navigasi keyboard, screen reader, desain visual, ARIA, alat pengujian |
| [observability-checklist.md](https://github.com/addyosmani/agent-skills/blob/main/references/observability-checklist.md) | Pertanyaan on-call, logging terstruktur, metrik RED/USE, tracing, alert berbasis gejala, gerbang pra-peluncuran |
| [orchestration-patterns.md](https://github.com/addyosmani/agent-skills/blob/main/references/orchestration-patterns.md) | Pola orkestrasi multi-persona yang disahkan, anti-pola, dan aturan "persona tidak memanggil persona" |

## Cara kerja skill

Setiap skill mengikuti anatomi yang konsisten:

```
┌─────────────────────────────────────────────────┐
│  SKILL.md                                       │
│                                                 │
│  ┌─ Frontmatter ─────────────────────────────┐  │
│  │ name: lowercase-hyphen-name               │  │
│  │ description: Guides agents through [task].│  │
│  │              Use when…                    │  │
│  └───────────────────────────────────────────┘  │
│  Overview         → What this skill does        │
│  When to Use      → Triggering conditions       │
│  Process          → Step-by-step workflow       │
│  Rationalizations → Excuses + rebuttals         │
│  Red Flags        → Signs something's wrong     │
│  Verification     → Evidence requirements       │
└─────────────────────────────────────────────────┘
```

**Pilihan desain utama:**

- **Proses, bukan prosa.** Skill adalah alur kerja yang diikuti agent, bukan dokumen referensi yang dibaca. Masing-masing punya langkah, checkpoint, dan kriteria keluar.
- **Anti-rasionalisasi.** Setiap skill menyertakan tabel alasan umum yang dipakai agent untuk melewati langkah (misalnya "saya tambah tes nanti") beserta sanggahan yang terdokumentasi.
- **Verifikasi tidak bisa ditawar.** Setiap skill berakhir dengan persyaratan bukti: tes lulus, keluaran build, data runtime. "Sepertinya benar" tidak pernah cukup.
- **Pengungkapan progresif.** `SKILL.md` adalah titik masuk. Referensi pendukung dimuat hanya bila dibutuhkan, menjaga pemakaian token tetap minimal.

## Struktur proyek

Inti portabel tetap berada di direktori bersama. Path khusus host adalah konvensi penemuan native, bukan alias merek; mengganti nama atau menggabungkannya akan merusak alat yang memindai lokasi persis itu.

| Lapisan / konsumen | Path repositori | Tujuan |
|---|---|---|
| Inti alur kerja bersama | `skills/` (25 skill) | Alur kerja `SKILL.md` portabel yang dipakai setiap integrasi |
| Materi review bersama | `agents/` (4 persona), `references/` (7 checklist) | Reviewer spesialis dan checklist tingkat paket yang dibawa instalasi seluruh-repo |
| Adapter Claude Code | `.claude/commands/` (9 perintah), `.claude-plugin/`, `hooks/` | Pembungkus slash command, metadata marketplace, dan hook siklus hidup |
| Adapter Gemini CLI | `.gemini/commands/` (9 perintah) | Pembungkus perintah TOML native Gemini |
| Adapter Antigravity CLI | `commands/` (9 perintah), `plugin.json` | Pembungkus TOML lama dan manifes plugin root; lihat [keterbatasan pembungkus yang diketahui](https://github.com/addyosmani/agent-skills/blob/main/docs/antigravity-setup.md#lifecycle-workflows-and-command-compatibility) |
| Adapter Codex | `.codex-plugin/`, `.agents/plugins/` | Metadata plugin Codex dan registrasi marketplace; Codex memakai `skills/` langsung |
| Adapter GitHub Copilot CLI | `plugin.json` | Metadata plugin root; Copilot CLI menemukan `skills/` lewat konvensi dan tidak mendaftarkan pembungkus siklus hidup |
| Alat kontributor | `scripts/` (13 skrip), `evals/` (25 file kasus), `.github/workflows/` | Validasi, eval routing, dan CI |
| Dokumentasi | `docs/` | Panduan universal dan panduan setup per alat |

Alat tanpa direktori adapter yang di-commit memasang atau menyalin inti `skills/` bersama ke lokasi native-nya sendiri. [Mulai cepat](#mulai-cepat) menautkan panduan setup untuk setiap host yang didukung.

## Mengapa Agent Skills?

Agent coding AI secara default mengambil jalan terpendek, yang sering berarti melewati spesifikasi, tes, review keamanan, dan praktik yang membuat perangkat lunak andal. Agent Skills memberi agent alur kerja terstruktur yang menegakkan disiplin yang sama yang dibawa engineer senior ke kode produksi.

Setiap skill mengodekan penilaian rekayasa yang diperoleh dengan susah payah: *kapan* menulis spesifikasi, *apa* yang diuji, *bagaimana* mereview, dan *kapan* mengirim. Ini bukan prompt generik; ini alur kerja yang beropini dan digerakkan proses yang membedakan kerja kualitas produksi dari kualitas prototipe.

Skill menanamkan praktik terbaik dari budaya rekayasa Google, termasuk konsep dari [Software Engineering at Google](https://abseil.io/resources/swe-book) dan [panduan praktik rekayasa](https://google.github.io/eng-practices/) Google. Kamu akan menemukan Hyrum's Law di desain API, Beyonce Rule dan piramida tes di pengujian, ukuran perubahan dan norma kecepatan review di code review, Chesterton's Fence di penyederhanaan, trunk-based development di alur kerja git, Shift Left dan feature flag di CI/CD, dan skill deprecation khusus yang memperlakukan kode sebagai liabilitas. Ini bukan prinsip abstrak: mereka tertanam langsung ke dalam alur kerja langkah demi langkah yang diikuti agent.

## Perbandingan

Penasaran bagaimana ini dibandingkan dengan [Superpowers](https://github.com/obra/superpowers) atau [skill Matt Pocock](https://github.com/mattpocock/skills)? Lihat **[docs/comparison.md](https://github.com/addyosmani/agent-skills/blob/main/docs/comparison.md)** untuk perbandingan jujur berdampingan tentang bagaimana ketiganya dibentuk secara berbeda dan kapan memakai masing-masing, termasuk tautan ke [eksperimen head-to-head terkontrol](https://www.linkedin.com/pulse/superpowers-vs-agent-skills-faster-shipping-safer-reasoning-om-mishra-dzakf/).

## Berkontribusi

Skill harus **spesifik** (langkah yang bisa dikerjakan, bukan saran samar), **bisa diverifikasi** (kriteria keluar yang jelas dengan persyaratan bukti), **teruji** (berdasarkan alur kerja nyata), dan **minimal** (hanya yang dibutuhkan untuk memandu agent).

Lihat [docs/skill-anatomy.md](https://github.com/addyosmani/agent-skills/blob/main/docs/skill-anatomy.md) untuk spesifikasi format, [CONTRIBUTING.md](https://github.com/addyosmani/agent-skills/blob/main/CONTRIBUTING.md) untuk panduan, dan [docs/advanced-per-agent-configuration.md](https://github.com/addyosmani/agent-skills/blob/main/docs/advanced-per-agent-configuration.md) untuk menerapkan routing model, pembatasan tool, dan kontrol runtime per-agent lain tanpa merusak frontmatter `SKILL.md` yang portabel.

## Lisensi

MIT: pakai skill ini di proyek, tim, dan alat kamu.
