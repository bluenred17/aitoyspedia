---
title: "Claude Code Skills & Plugins (claude-skills)"
summary: "Pustaka open source berisi 411 skill dan plugin untuk Claude Code dan 12 coding agent lain, mencakup engineering, produk, marketing, kepatuhan, penasihat C-level, riset, dan produktivitas, dengan ratusan skrip Python tanpa dependensi."
category: coding
tags: [skills, plugin, marketplace, engineering, devops, marketing, c-level, riset, persona, orkestrasi]
surfaces: [claude-code]
source_url: "https://github.com/alirezarezvani/claude-skills/blob/main/README.md"
repo: alirezarezvani/claude-skills
stars: 29308
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
install: |
  /plugin marketplace add alirezarezvani/claude-skills
  /plugin install engineering-skills@claude-code-skills
includes: [engineering-skills, engineering-advanced-skills, product-skills, marketing-skills, ra-qm-skills, pm-skills, c-level-skills, business-growth-skills, finance-skills, pw, self-improving-agent, karpathy-coder, grill-me, skill-security-auditor]
---

# Claude Code Skills & Plugins: skill agent untuk setiap alat coding

**411 skill, plugin, dan agent skill siap produksi untuk Claude Code, untuk 13 alat coding AI.**

Pustaka open source paling lengkap untuk skill Claude Code dan plugin agent. Juga bekerja dengan OpenAI Codex, Gemini CLI, Cursor, dan 9 coding agent lain. Paket keahlian yang bisa dipakai ulang, mencakup engineering, DevOps, marketing (termasuk AEO, yaitu Answer Engine Optimization untuk sitasi LLM), keamanan (hook PreToolUse), kepatuhan, penasihat C-level (termasuk persona mode-pendiri CFO/CMO/CRO/CPO/COO/CHRO/CISO/GC/CDO/CAIO/CCO/VPE plus 21 slash command `/c-level-agents:*`), produktivitas (capture/email/reflect/weekly-review/deep-work/meetings), tumpukan riset akademik (litreview/grants/dossier/patent/syllabus/pulse/notebooklm/meta-research plus router hibrida), dan Research Operations enterprise (clinical-research/research-finance/market-research/product-research, v2.9.0).

**Bekerja dengan:** Claude Code · OpenAI Codex · Gemini CLI · OpenClaw · Hermes Agent[^hermes] · Mistral Vibe[^vibe] · Cursor · Aider · Windsurf · Kilo Code · OpenCode · Augment · Antigravity

[^hermes]: Hermes Agent adalah tingkat **BYO-sync**: repo menyertakan pohon `.hermes/skills/claude-skills/` yang sudah dibuat, tetapi kamu menjalankan `python scripts/sync-hermes-skills.py` sekali secara lokal untuk memasang ke `~/.hermes/skills/`. Memakai standar SKILL.md agentskills.io yang sama, tanpa konversi format.
[^vibe]: Mistral Vibe juga tingkat **BYO-sync**: repo menyertakan pohon `.vibe/skills/claude-skills/` yang sudah dibuat, jalankan `./scripts/vibe-install.sh` sekali secara lokal untuk memasang ke `~/.vibe/skills/`. Standar SKILL.md agentskills.io yang sama, tanpa konversi format. Dokumen: <https://docs.mistral.ai/mistral-vibe/agents-skills>.

> **Catatan dari situs ini:** angka di README ini tidak konsisten satu sama lain (misalnya 411 skill di judul, 345 di bagian konversi, dan "5.200+ bintang" di README padahal repo kini punya sekitar 29 ribu bintang). Entri ini menyalin angka README apa adanya. Instalasi OpenClaw memakai `bash <(curl -s …)`, yaitu mengunduh skrip dari repo ini lalu langsung menjalankannya; baca skripnya dulu sebelum menjalankan.

---

## Apa itu skill Claude Code dan plugin agent?

Skill Claude Code (juga disebut agent skill atau plugin coding agent) adalah paket instruksi modular yang memberi agent coding AI keahlian domain yang tidak mereka miliki secara bawaan. Setiap skill mencakup:

- **SKILL.md**: instruksi terstruktur, alur kerja, dan kerangka keputusan
- **Alat Python**: 706 skrip CLI (semuanya hanya stdlib, tanpa pip install)
- **Dokumen referensi**: 823 template, daftar periksa, dan file pengetahuan khusus domain

**Satu repo, tiga belas platform.** Bekerja secara native sebagai plugin Claude Code, skill agent Codex, skill Gemini CLI, skill Hermes Agent, skill Mistral Vibe, dan bisa dikonversi ke lebih banyak alat lewat `scripts/convert.sh`. Seluruh 807 alat Python berjalan di mana pun Python berjalan.

### Skill vs Agent vs Persona

| | Skill | Agent | Persona |
|---|---|---|---|
| **Tujuan** | Cara mengeksekusi tugas | Tugas apa yang dikerjakan | Siapa yang berpikir |
| **Cakupan** | Satu domain | Satu domain | Lintas domain |
| **Suara** | Netral | Profesional | Berkepribadian |
| **Contoh** | "Ikuti langkah ini untuk SEO" | "Jalankan audit keamanan" | "Berpikirlah seperti CTO startup" |

Ketiganya bekerja bersama. Lihat [Orkestrasi](#orkestrasi) untuk cara menggabungkannya.

---

## Pasang cepat

> **Pengguna Windows:** clone dengan `git clone -c core.symlinks=true` (Developer Mode aktif), kalau tidak pohon cermin `.gemini/`/`.codex/`/`.vibe/`/`.hermes/` akan ter-checkout sebagai file teks penunjuk satu baris, bukan skill, dan setel `PYTHONUTF8=1` agar alat yang mencetak Unicode tidak crash pada konsol codepage lama. Rinciannya: [INSTALLATION.md → Windows Notes](https://github.com/alirezarezvani/claude-skills/blob/main/INSTALLATION.md#windows-notes).

### Gemini CLI (baru)

```bash
# Clone the repository
git clone https://github.com/alirezarezvani/claude-skills.git
cd claude-skills

# Run the setup script
./scripts/gemini-install.sh

# Start using skills
> activate_skill(name="senior-architect")
```

### Claude Code (disarankan)

```bash
# Add the marketplace
/plugin marketplace add alirezarezvani/claude-skills

# Install by domain
/plugin install engineering-skills@claude-code-skills          # 24 core engineering
/plugin install engineering-advanced-skills@claude-code-skills  # 25 POWERFUL-tier
/plugin install product-skills@claude-code-skills               # 12 product skills
/plugin install marketing-skills@claude-code-skills             # 43 marketing skills
/plugin install ra-qm-skills@claude-code-skills                 # 12 regulatory/quality
/plugin install pm-skills@claude-code-skills                    # 6 project management
/plugin install c-level-skills@claude-code-skills               # 28 C-level advisory (full C-suite)
/plugin install business-growth-skills@claude-code-skills       # 4 business & growth
/plugin install finance-skills@claude-code-skills               # 2 finance (analyst + SaaS metrics)

# Or install a standalone plugin
/plugin install pw@claude-code-skills                           # Playwright testing toolkit
/plugin install self-improving-agent@claude-code-skills         # Auto-memory curation
/plugin install karpathy-coder@claude-code-skills               # Coding-discipline reviewer
/plugin install grill-me@claude-code-skills                     # Plan interrogator
```

Hanya nama yang tercantum di [`.claude-plugin/marketplace.json`](https://github.com/alirezarezvani/claude-skills/blob/main/.claude-plugin/marketplace.json) yang bisa dipasang. Sebagian besar skill (misalnya `skill-security-auditor` atau `content-creator`) datang di dalam bundel domain, jadi pasang bundel yang memuatnya. Jalankan `/plugin` dan buka marketplace untuk menelusuri semua nama yang bisa dipasang.

### OpenAI Codex

```bash
npx agent-skills-cli add alirezarezvani/claude-skills --agent codex
# Or: git clone + ./scripts/codex-install.sh --category <name>  (no arguments lists categories)
```

### OpenClaw

```bash
bash <(curl -s https://raw.githubusercontent.com/alirezarezvani/claude-skills/main/scripts/openclaw-install.sh)
```

### Pemasangan manual

```bash
git clone https://github.com/alirezarezvani/claude-skills.git
# Copy any skill folder to ~/.claude/skills/ (Claude Code) or ~/.codex/skills/ (Codex)
```

---

## Dukungan multi-alat (baru)

**Konversi semua 345 skill ke 9 alat coding AI** dengan satu skrip:

| Alat | Format | Pasang |
|------|--------|---------|
| **Cursor** | aturan `.mdc` | `./scripts/install.sh --tool cursor --target .` |
| **Aider** | `CONVENTIONS.md` | `./scripts/install.sh --tool aider --target .` |
| **Kilo Code** | `.kilocode/rules/` | `./scripts/install.sh --tool kilocode --target .` |
| **Windsurf** | `.windsurf/skills/` | `./scripts/install.sh --tool windsurf --target .` |
| **OpenCode** | `.opencode/skills/` | `./scripts/install.sh --tool opencode --target .` |
| **Augment** | `.augment/rules/` | `./scripts/install.sh --tool augment --target .` |
| **Antigravity** | `~/.gemini/antigravity/skills/` | `./scripts/install.sh --tool antigravity` |
| **Hermes Agent** | `~/.hermes/skills/` | `python scripts/sync-hermes-skills.py --verbose` |
| **Mistral Vibe** | `~/.vibe/skills/` | `./scripts/vibe-install.sh` |

**Cara kerjanya:**

```bash
# 1. Convert all skills to all tools (takes ~15 seconds)
./scripts/convert.sh --tool all

# 2. Install into your project (with confirmation)
./scripts/install.sh --tool cursor --target /path/to/project

# Or use --force to skip confirmation:
./scripts/install.sh --tool aider --target . --force

# 3. Verify
find .cursor/rules -name "*.mdc" | wc -l  # Should show 346
```

**Setiap alat mendapat:**
- ✅ Semua 345 skill dikonversi ke format native
- ✅ README per alat dengan langkah pasang/verifikasi/pembaruan
- ✅ Dukungan untuk skrip, referensi, template bila berlaku
- ✅ Tanpa kerja konversi manual

Jalankan `./scripts/convert.sh --tool all` untuk menghasilkan keluaran khusus alat secara lokal.

---

## Ikhtisar skill

**411 skill siap produksi di 20 domain:**

| Domain | Skill | Sorotan | Detail |
|--------|--------|------------|---------|
| **🔧 Engineering — Core** | 54 | Arsitektur, frontend, backend, fullstack, QA, DevOps, SecOps, AI/ML, data, Playwright Pro (pembuatan tes, perbaikan tes flaky, migrasi), self-improving agent (kurasi memori otomatis), suite keamanan, audit a11y, **named-persona-adversarial-review** (review lewat filosofi engineering bernama), **embedded-iot-mentor** (pemilihan MCU/board, firmware-reuse-first, disiplin MVP breadboard) | [engineering-team/](https://github.com/alirezarezvani/claude-skills/blob/main/engineering-team/) |
| **⚡ Engineering — POWERFUL** | 104 | Agent designer, RAG architect, database designer, CI/CD builder, security auditor, MCP builder, AgentHub, Helm chart, Terraform, self-eval, llm-wiki, tc-tracker, autoresearch-agent, **portofolio keandalan** (feature-flags-architect, kubernetes-operator, chaos-engineering, slo-architect), ship-gate, hook PreToolUse security-guidance, **skill Matt Pocock** (write-a-skill, caveman, grill-me, handoff, grill-with-docs), **zero-hallucination-coder** (Discuss→Map→Decompose→Execute→Verify), **agent-harness** (loop goal→plan→execute→verify→close untuk domain apa pun), **memory-engineering**, **skillopt-sleep** (evolusi diri malam hari yang digerbangi dari sesi Claude Code nyata, di-vendor dari microsoft/SkillOpt), **book-to-skill** (kompilasi buku, folder dokumen, atau kumpulan spesifikasi menjadi skill basis pengetahuan), **boost-asio-pro** (jaringan C++ asinkron), **human-gate** (review manusia berkelompok sebagai artefak terstruktur), **agent-memory** (tangga memori empat tingkat L0-L3 di atas hook Claude Code), **skill-retro**, **deep-learning-book**, **spinning-up-deep-rl**, **agent-regression-evals**, **coding-agent-rollout**, **commit-craft**, **i18n-localization** | [engineering/](https://github.com/alirezarezvani/claude-skills/blob/main/engineering/) |
| **🎯 Product** | 19 | Product manager, agile PO, strategist, UX researcher, UI design, landing page, SaaS scaffolder, analitik, experiment designer, discovery, roadmap communicator, code-to-prd, apple-hig-expert, UI finish QA (design-qa) | [product-team/](https://github.com/alirezarezvani/claude-skills/blob/main/product-team/) |
| **📣 Marketing** | 50 | 8 pod: Content, SEO + AEO (`aeo`: audit E-E-A-T, pelacakan sitasi di 5 LLM) + lokal (`local-seo-manager`: GBP/NAP/Map-Pack), CRO, Channels, Growth, Intelligence, Sales + `business-name-fit` (penamaan lintas budaya) + fondasi konteks + router orkestrasi | [marketing-skill/](https://github.com/alirezarezvani/claude-skills/blob/main/marketing-skill/) |
| **🚀 Productivity** | 12 | `capture` (brain-dump jadi aksi), pasangan `email` (inbox-setup + inbox-triage), `reflect` (jurnal), `handoff` (terinspirasi Matt Pocock), `andreessen` (mode keputusan market-first), `roast` (panel ide 5 sudut → GO/RESHAPE/KILL), `fable-goal` (ocehan → prompt /goal otonom), `weekly-review` (loop GTD dengan gerbang penolakan), `deep-work` (time-blocking + anggaran kerja dangkal), `meetings` (gerbang biaya + agenda + butir aksi), `swedish-mentor` (jalur belajar bahasa Swedia berjenjang CEFR) | [productivity/](https://github.com/alirezarezvani/claude-skills/blob/main/productivity/) |
| **🎨 Marketing (tingkat atas)** | 7 | `landing`: generator landing page HTML satu file (4 gaya desain, pola GSAP, validator palet merek); `linkedin`: kehadiran LinkedIn organik dengan penolakan Perjanjian Pengguna §8.2 di kode (orkestrator + profil, strategi, konten, engagement, analitik) | [marketing/](https://github.com/alirezarezvani/claude-skills/blob/main/marketing/) |
| **🔬 Research (akademik)** | 10 | Orkestrator `research` (router hibrida + fallback) + 8 spesialis: `pulse`, `litreview`, `grants` (NIH), `dossier`, `patent`, `syllabus`, `notebooklm`, `meta-research`, `deepread` | [research/](https://github.com/alirezarezvani/claude-skills/blob/main/research/) |
| **🧪 Research Operations** ✨v2.9.0 | 6 | Riset enterprise/lintas fungsi: orkestrator + `clinical-research` (desain studi), `research-finance` (keuangan program R&D), `market-research` (pengukuran pasar/survei/segmentasi), `product-research` (riset pengguna), `interview-mapper` (pengodean transkrip dengan verifikasi kutipan) | [research-ops/](https://github.com/alirezarezvani/claude-skills/blob/main/research-ops/) |
| **📋 Project Management** | 9 | Senior PM, scrum master, Jira, Confluence, admin Atlassian, template + Atlassian Remote MCP terbundel | [project-management/](https://github.com/alirezarezvani/claude-skills/blob/main/project-management/) |
| **🏥 Regulatory & QM** | 23 | ISO 13505, MDR 2017/745, FDA, ISO 27001, GDPR, SOC 2, CAPA, manajemen risiko, tinjauan akses, CMMC 2.0 Level 2, agent-decision-receipts | [ra-qm-team/](https://github.com/alirezarezvani/claude-skills/blob/main/ra-qm-team/) |
| **🛡️ Compliance OS** | 9 | Sistem operasi kepatuhan: kontrol, bukti, alur audit-readiness | [compliance-os/](https://github.com/alirezarezvani/claude-skills/blob/main/compliance-os/) |
| **💼 C-Level Advisory** | 46 | C-suite lengkap (CEO/CTO/CFO/CMO/CRO/CPO/COO/CHRO/CISO/GC/CDO/CAIO/CCO/VPE) + executive mentor + orkestrasi + rapat dewan + budaya & kolaborasi | [c-level-advisor/](https://github.com/alirezarezvani/claude-skills/blob/main/c-level-advisor/) |
| **🎩 C-Level Agents (mode pendiri)** | 22 | 13 agent persona cs-* + 21 perintah /c-level-agents:* (office hours, boardroom, pipeline strategic sprint, cross-eval, freeze) | [c-level-agents/](https://github.com/alirezarezvani/claude-skills/blob/main/c-level-agents/) |
| **📈 Business & Growth** | 5 | Customer success, sales engineer, revenue ops, kontrak & proposal, toolkit BizDev | [business-growth/](https://github.com/alirezarezvani/claude-skills/blob/main/business-growth/) |
| **🏭 Business Operations** | 7 | Orkestrator + process-mapper, vendor-management, capacity-planner, internal-comms, knowledge-ops, procurement-optimizer | [business-operations/](https://github.com/alirezarezvani/claude-skills/blob/main/business-operations/) |
| **🤝 Commercial** | 8 | Orkestrator + pricing-strategist, deal-desk, partnerships-architect, channel-economics, commercial-policy, rfp-responder, commercial-forecaster | [commercial/](https://github.com/alirezarezvani/claude-skills/blob/main/commercial/) |
| **💰 Finance** | 8 | Analis keuangan (DCF, anggaran, peramalan), pelatih metrik SaaS, penasihat investasi bisnis, stock-analysis, passive-deal-screener (bukan nasihat investasi), **month-end-close** | [finance/](https://github.com/alirezarezvani/claude-skills/blob/main/finance/) |
| **🧬 Agent Launcher** ✨baru | 6 | Membangun/meluncurkan/menilai/menjadwalkan **Claude Managed Agents** di akunmu sendiri: orkestrator + `interview` + `stage-launch` + `grade-iterate` + `run-without-you` + `wrap-up`. Scaffolder BYOK deterministik (tanpa panggilan API). Mengimplementasi ulang launch-your-agent milik Anthropic (Apache-2.0) | [agent-launcher/](https://github.com/alirezarezvani/claude-skills/blob/main/agent-launcher/) |
| **🔄 Loop Library** | 1 | `loop-library`: menemukan, mencari, mengaudit/memperbaiki, mengadaptasi, dan merancang loop agent AI terbatas; membaca katalog langsung dari signals.forwardfuture.ai saat runtime (di-vendor dari [Forward-Future/loop-library](https://github.com/Forward-Future/loop-library)) | [loop-library/](https://github.com/alirezarezvani/claude-skills/blob/main/loop-library/) |
| **📄 Markdown → HTML** | 5 | `markdown-html-orchestrator` (router tipe dokumen) + `design-system` (token merek WCAG-AA) + `md-document` + `md-review` + `md-slides`: konverter markdown ke HTML interaktif | [markdown-html/](https://github.com/alirezarezvani/claude-skills/blob/main/markdown-html/) |

---

## Persona

Identitas agent yang sudah dikonfigurasi dengan muatan skill yang dikurasi, alur kerja, dan gaya komunikasi yang khas. Persona melampaui "pakai skill ini": mereka mendefinisikan bagaimana agent berpikir, memprioritaskan, dan berkomunikasi.

| Persona | Domain | Terbaik untuk |
|---------|--------|----------|
| [**Startup CTO**](https://github.com/alirezarezvani/claude-skills/blob/main/agents/personas/startup-cto.md) | Engineering + Strategi | Keputusan arsitektur, pemilihan tech stack, membangun tim, due diligence teknis |
| [**Growth Marketer**](https://github.com/alirezarezvani/claude-skills/blob/main/agents/personas/growth-marketer.md) | Marketing + Growth | Pertumbuhan berbasis konten, strategi peluncuran, optimasi kanal, marketing bootstrap |
| [**Solo Founder**](https://github.com/alirezarezvani/claude-skills/blob/main/agents/personas/solo-founder.md) | Lintas domain | Startup satu orang, proyek sampingan, membangun MVP, merangkap semua peran |

**Cara pakai:**
```bash
# Claude Code
cp agents/personas/startup-cto.md ~/.claude/agents/

# Any tool
./scripts/convert.sh --tool cursor  # Converts personas too
```

Lihat [agents/personas/](https://github.com/alirezarezvani/claude-skills/blob/main/agents/personas/) untuk detail. Buat milikmu sendiri dengan [TEMPLATE.md](https://github.com/alirezarezvani/claude-skills/blob/main/agents/personas/TEMPLATE.md).

---

## Orkestrasi

Protokol ringan untuk mengoordinasikan persona, skill, dan agent pada pekerjaan yang melintasi batas domain. Tidak butuh framework.

**Empat pola:**

| Pola | Apa | Kapan |
|---------|------|------|
| **Solo Sprint** | Berganti persona di sepanjang fase proyek | Proyek sampingan, MVP, solo founder |
| **Domain Deep-Dive** | Satu persona + beberapa skill bertumpuk | Review arsitektur, audit kepatuhan |
| **Multi-Agent Handoff** | Persona saling meninjau keluaran | Keputusan berisiko tinggi, kesiapan peluncuran |
| **Skill Chain** | Skill berurutan, tanpa persona | Pipeline konten, daftar periksa berulang |

**Contoh: peluncuran produk 6 minggu**
```
Week 1-2: startup-cto + aws-solution-architect + senior-frontend → Build
Week 3-4: growth-marketer + launch-strategy + copywriting + seo-audit → Prepare
Week 5-6: solo-founder + email-sequence + analytics-tracking → Ship and iterate
```

Lihat [orchestration/ORCHESTRATION.md](https://github.com/alirezarezvani/claude-skills/blob/main/orchestration/ORCHESTRATION.md) untuk protokol lengkap dan contohnya.

---

## Tingkat POWERFUL

25 skill lanjutan dengan kapabilitas mendalam kelas produksi:

| Skill | Fungsinya |
|-------|-------------|
| **agent-designer** | Orkestrasi multi-agent, skema tool, evaluasi performa |
| **agent-workflow-designer** | Pola sequential, parallel, router, orchestrator, dan evaluator |
| **rag-architect** | Pembangun pipeline RAG, pengoptimal chunking, evaluator retrieval |
| **database-designer** | Penganalisis skema, pembuatan ERD, pengoptimal indeks, generator migrasi |
| **database-schema-designer** | Kebutuhan → migrasi, tipe, data seed, kebijakan RLS |
| **migration-architect** | Perencana migrasi, pemeriksa kompatibilitas, generator rollback |
| **skill-security-auditor** | 🔒 Gerbang keamanan: memindai skill untuk kode berbahaya sebelum pemasangan |
| **ci-cd-pipeline-builder** | Analisis stack → hasilkan konfigurasi GitHub Actions / GitLab CI |
| **mcp-server-builder** | Bangun server MCP dari spesifikasi OpenAPI |
| **pr-review-expert** | Analisis radius dampak, pemindaian keamanan, delta cakupan |
| **api-design-reviewer** | Linter REST API, pendeteksi breaking change, scorecard desain |
| **api-test-suite-builder** | Pindai rute API → hasilkan suite tes lengkap |
| **dependency-auditor** | Pemindai multi-bahasa, kepatuhan lisensi, perencana upgrade |
| **observability-designer** | Perancang SLO, pengoptimal alert, generator dasbor |
| **performance-profiler** | Profiling Node/Python/Go, analisis bundle, load testing |
| **monorepo-navigator** | Manajemen workspace Turborepo/Nx/pnpm & analisis dampak |
| **changelog-generator** | Conventional commits → changelog terstruktur |
| **codebase-onboarding** | Hasilkan dokumen onboarding otomatis dari analisis codebase |
| **runbook-generator** | Codebase → runbook operasional dengan perintah |
| **git-worktree-manager** | Pengembangan paralel dengan isolasi port, sinkronisasi env |
| **env-secrets-manager** | Manajemen .env, deteksi kebocoran, alur rotasi |
| **incident-commander** | Playbook respons insiden, pengklasifikasi tingkat keparahan, generator PIR |
| **tech-debt-tracker** | Pemindai utang teknis, prioritisasi, dasbor tren |
| **interview-system-designer** | Perancang loop wawancara, bank pertanyaan, kalibrator |

---

## 🔒 Skill Security Auditor

Baru di v2.0.0: audit skill mana pun untuk risiko keamanan sebelum pemasangan:

```bash
python3 engineering/skill-security-auditor/scripts/skill_security_auditor.py /path/to/skill/
```

Memindai: command injection, eksekusi kode, eksfiltrasi data, prompt injection, risiko rantai pasok dependensi, eskalasi hak istimewa. Mengembalikan **PASS / WARN / FAIL** dengan panduan perbaikan.

**Nol dependensi.** Bekerja di mana pun Python berjalan.

---

## Skill yang baru ditingkatkan

Peningkatan kualitas produksi ditambahkan untuk:

- `engineering/git-worktree-manager`: skrip siklus hidup worktree + otomatisasi pembersihan
- `engineering/mcp-server-builder`: scaffold OpenAPI -> MCP + validator manifest
- `engineering/changelog-generator`: generator catatan rilis + linter conventional commit
- `engineering/ci-cd-pipeline-builder`: pendeteksi stack + generator pipeline
- `marketing-skill/prompt-engineer-toolkit`: penguji A/B prompt + pengelola versi/diff prompt

Masing-masing kini menyertakan `scripts/`, `references/` yang diekstrak, dan `README.md` yang berfokus pada pemakaian.

---

## Contoh pemakaian

### Review arsitektur
```
Using the senior-architect skill, review our microservices architecture
and identify the top 3 scalability risks.
```

### Pembuatan konten
```
Using the content-creator skill, write a blog post about AI-augmented
development. Optimize for SEO targeting "Claude Code tutorial".
```

### Audit kepatuhan
```
Using the mdr-745-specialist skill, review our technical documentation
for MDR Annex II compliance gaps.
```

---

## Alat analisis Python

580 alat CLI disertakan bersama skill (semuanya terverifikasi, hanya stdlib):

```bash
# SaaS health check
python3 finance/saas-metrics-coach/scripts/metrics_calculator.py --mrr 80000 --customers 200 --churned 3 --json

# Brand voice analysis
python3 marketing-skill/content-production/scripts/brand_voice_analyzer.py article.txt

# Tech debt scoring
python3 c-level-advisor/cto-advisor/scripts/tech_debt_analyzer.py /path/to/codebase

# RICE prioritization
python3 product-team/product-manager-toolkit/scripts/rice_prioritizer.py features.csv

# Security audit
python3 engineering/skill-security-auditor/scripts/skill_security_auditor.py /path/to/skill/

# Landing page (TSX + Tailwind)
python3 product-team/landing-page-generator/scripts/landing_page_scaffolder.py config.json --format tsx
```

---

## Proyek terkait

| Proyek | Deskripsi |
|---------|-------------|
| [**Claude Code Skills & Agents Factory**](https://github.com/alirezarezvani/claude-code-skills-agents-factory) | Metodologi membangun skill dalam skala besar |
| [**Claude Code Tresor**](https://github.com/alirezarezvani/claude-code-tresor) | Toolkit produktivitas dengan 60+ template prompt |
| [**Product Manager Skills**](https://github.com/Digidai/product-manager-skills) | Agent senior PM dengan 6 domain pengetahuan, 12 template, 30+ kerangka kerja |
| [**toprank**](https://github.com/nowork-studio/toprank) | 9 skill SEO dan Google Ads untuk Claude Code, terhubung ke Google Search Console, PageSpeed Insights, dan Google Ads API. MIT |
| [**LinkedIn Skills**](https://github.com/sergebulaev/linkedin-skills) | 11 skill LinkedIn untuk Claude Code dan Codex. MIT |

---

## FAQ

**Bagaimana cara memasang plugin Claude Code?** Tambahkan marketplace dengan `/plugin marketplace add alirezarezvani/claude-skills`, lalu pasang bundel skill apa pun dengan `/plugin install <name>@claude-code-skills`.

**Apakah skill ini bekerja dengan OpenAI Codex / Cursor / Windsurf / Aider / Mistral Vibe?** Ya. Skill bekerja secara native dengan 13 alat: Claude Code, OpenAI Codex, Gemini CLI, OpenClaw, Hermes Agent, Mistral Vibe, Cursor, Aider, Windsurf, Kilo Code, OpenCode, Augment, dan Antigravity. Hermes Agent dan Mistral Vibe memakai standar SKILL.md agentskills.io yang sama; jalankan `python scripts/sync-hermes-skills.py` atau `./scripts/vibe-install.sh` untuk memasang. Untuk alat lain jalankan `./scripts/convert.sh --tool all` lalu `./scripts/install.sh --tool <name>`. Lihat [Multi-Tool Integrations](https://alirezarezvani.github.io/claude-skills/integrations/) untuk detail.

**Apakah pembaruan akan merusak instalasi saya?** Tidak. Mereka mengikuti semantic versioning dan menjaga kompatibilitas mundur dalam rilis patch. Argumen skrip yang ada, path sumber plugin, dan struktur SKILL.md tidak pernah diubah pada versi patch. Lihat [CHANGELOG](https://github.com/alirezarezvani/claude-skills/blob/main/CHANGELOG.md) untuk detail tiap rilis.

**Apakah alat Python bebas dependensi?** Ya. Seluruh 807 alat Python hanya memakai pustaka standar, tanpa pip install. Titik masuk CLI tiap skill diverifikasi berjalan dengan `--help`. Beberapa alat, seperti ekstraktor dokumen `engineering/book-to-skill`, *opsional* bisa memakai parser pihak ketiga untuk keluaran lebih akurat, tetapi setiap format punya cadangan parser pustaka standar dan tidak ada yang dipasang secara implisit.

**Bagaimana cara membuat skill Claude Code sendiri?** Setiap skill adalah folder dengan `SKILL.md` (frontmatter + instruksi), serta `scripts/`, `references/`, dan `assets/` opsional. Lihat [Skills & Agents Factory](https://github.com/alirezarezvani/claude-code-skills-agents-factory) untuk panduan langkah demi langkah.

---

## Berkontribusi

Kontribusi diterima! Lihat [CONTRIBUTING.md](https://github.com/alirezarezvani/claude-skills/blob/main/CONTRIBUTING.md) untuk panduannya.

**Ide cepat:** tambah skill baru di domain yang kurang terlayani, perbaiki alat Python yang ada, tambah cakupan tes untuk skrip, terjemahkan skill untuk pasar non-Inggris.

---

## Lisensi

MIT. Lihat [LICENSE](https://github.com/alirezarezvani/claude-skills/blob/main/LICENSE) untuk detailnya.
