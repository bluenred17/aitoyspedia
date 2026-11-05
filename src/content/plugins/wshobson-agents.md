---
title: "Plugins, Agents, and Skills (wshobson/agents)"
summary: "Satu koleksi plugin, agent, skill, dan command (94 plugin, 202 agent, 185 skill, 105 command) untuk Claude Code, Codex CLI, Cursor, OpenCode, Antigravity CLI, GitHub Copilot, dan Pi, dari satu sumber Markdown."
category: coding
tags: [plugin, agents, skills, marketplace, multi-harness, python, javascript, code-review, security, testing]
surfaces: [claude-code]
source_url: "https://github.com/wshobson/agents/blob/main/README.md"
repo: wshobson/agents
stars: 42223
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
install: |
  # Claude Code: daftarkan marketplace lalu pasang plugin (jalankan di dalam Claude Code)
  /plugin marketplace add wshobson/agents
  /plugin install python-development@claude-code-workflows

  # Contoh memakai plugin: perintah scaffolding
  /python-development:python-scaffold Create a FastAPI service with tests

  # Codex CLI (di terminal dengan Codex CLI terbaru)
  codex plugin marketplace add wshobson/agents
  codex plugin add python-development@claude-code-workflows

  # Cursor: pakai registri marketplace plugin yang di-commit (.cursor-plugin/marketplace.json),
  # ikuti https://github.com/wshobson/agents/blob/main/docs/harnesses.md#native-install

  # Hanya skill (tanpa agent, command, atau hook milik plugin)
  gh skill install wshobson/agents python-testing-patterns
  npx skills add wshobson/agents --skill python-testing-patterns
  # gh skill butuh GitHub CLI 2.90+; npx butuh Node.js dan npm

  # OpenCode, Antigravity CLI, GitHub Copilot, Pi: clone repo lalu pakai installer harness-mu.
  # Butuh uv, Python 3.12+, dan alat coding yang dipakai.
  gh repo clone wshobson/agents ~/agents
  cd ~/agents
  make install-opencode
  make install-antigravity
  make install-copilot
  make install-pi
includes: [python-development, javascript-typescript, developer-essentials, security-scanning, plugin-eval]
---

# Plugin, agent, dan skill untuk alat coding AI

Pakai satu koleksi plugin, agent, skill, dan command di Claude Code, OpenAI Codex CLI, Cursor, OpenCode, Antigravity CLI, GitHub Copilot, dan Pi. Harness adalah alat coding yang memuat dan menjalankan komponen. Plugin mencakup pengembangan Python dan JavaScript, code review, pengujian, infrastruktur, keamanan, dan pekerjaan lain.

Katalognya berisi 94 plugin, termasuk 92 plugin lokal dan 2 entri eksternal. Sumber lokal memuat 202 agent, 185 skill, dan 105 command. Komponennya berbagi satu sumber Markdown, dengan pemasangan dan kapabilitas disesuaikan untuk tiap harness.

> **Catatan dari situs ini:** (1) Entri eksternal Pensyve di katalog dikelola Major7 Apps, yang didirikan oleh pemelihara repo ini; README menyebut Pensyve Cloud sudah ditutup pada 1 Oktober 2026, jadi hanya runtime open source yang bisa dijalankan sendiri. Plugin eksternal punya lisensi sendiri. (2) Skor LLM judge dan Monte Carlo di `plugin-eval` bersifat eksperimental dan tidak divalidasi terhadap label manusia. (3) Bagian bintang riwayat tidak disalin.

## Dukungan multi-harness

Pilih harness yang kamu pakai dan ikuti rute setup-nya. Komponen yang tersedia bergantung pada rute pemasangan dan kapabilitas harness.

| Alat | Pemasangan | Komponen dan batasan |
|---|---|---|
| Claude Code | Plugin marketplace | Agent, skill, dan command sumber; hook dan konfigurasi MCP khusus plugin |
| OpenAI Codex CLI | Marketplace native atau artefak yang dihasilkan | Skill sumber native; agent TOML dan command sebagai skill yang dihasilkan memakai rute terpisah |
| Cursor | Plugin marketplace | Agent, skill, dan command sumber, dengan aturan proyek terkurasi |
| OpenCode | `make install-opencode` | Agent, skill, dan command yang dihasilkan, dengan izin tool yang diterjemahkan |
| Antigravity CLI | `make install-antigravity` | Plugin yang dihasilkan berisi agent, skill, dan command |
| GitHub Copilot | `make install-copilot` | Profil agent dan skill yang dihasilkan; command juga menjadi skill yang bisa dipanggil |
| Pi | `make install-pi` | Skill dan template prompt yang dihasilkan; agent membutuhkan ekstensi subagent |

Lihat [matriks kapabilitas](https://github.com/wshobson/agents/blob/main/docs/harnesses.md) untuk pemetaan model, izin tool, hook, dan perbedaan pemasangan.

Untuk skill individual, pakai [installer khusus skill](#hanya-skill) dan pilih alat coding kamu.

## Mulai cepat

Pilih plugin untuk pekerjaan yang kamu lakukan:

| Plugin | Dipakai untuk |
|---|---|
| [python-development](https://github.com/wshobson/agents/blob/main/plugins/python-development/) | Python, Django, FastAPI, pengujian, dan pengemasan |
| [javascript-typescript](https://github.com/wshobson/agents/blob/main/plugins/javascript-typescript/) | Pengembangan JavaScript dan TypeScript serta setup proyek |
| [developer-essentials](https://github.com/wshobson/agents/blob/main/plugins/developer-essentials/) | Code review, debugging, Git, dan pola pengujian |
| [security-scanning](https://github.com/wshobson/agents/blob/main/plugins/security-scanning/) | Review keamanan, pemeriksaan dependensi, dan pemindaian kode |

Lihat [katalog plugin](https://github.com/wshobson/agents/blob/main/docs/plugins.md) untuk semua 94 plugin dan [panduan pemakaian](https://github.com/wshobson/agents/blob/main/docs/usage.md) untuk perintah dan contoh.

### Claude Code

Jalankan perintah ini di dalam Claude Code untuk mendaftarkan marketplace dan memasang plugin pengembangan Python:

```text
/plugin marketplace add wshobson/agents
/plugin install python-development@claude-code-workflows
```

Lalu minta Claude memakai agent Python untuk tugasmu, atau jalankan perintah scaffolding milik plugin:

```text
/python-development:python-scaffold Create a FastAPI service with tests
```

### Codex CLI

Jalankan perintah ini di terminal dengan Codex CLI terbaru:

```bash
codex plugin marketplace add wshobson/agents
codex plugin add python-development@claude-code-workflows
```

Manifes Codex native mengekspos skill sumber. Agent TOML dan skill turunan command yang dihasilkan memakai jalur adapter terpisah. Pemasangan native juga membaca isi skill asli, sedangkan salinan yang dihasilkan memecah isi yang terlalu besar menjadi file referensi untuk anggaran 8 KB. Lihat [detail setup Codex](https://github.com/wshobson/agents/blob/main/docs/harnesses.md#native-install) sebelum memilih rute pemasangan.

### Cursor

Cursor memakai [registri marketplace plugin](https://github.com/wshobson/agents/blob/main/.cursor-plugin/marketplace.json) yang di-commit. Ikuti [petunjuk setup Cursor](https://github.com/wshobson/agents/blob/main/docs/harnesses.md#native-install) untuk menambah marketplace dan memasang plugin.

### Hanya skill

Pasang satu skill dengan perintah `gh skill` dari GitHub CLI atau installer `npx skills`. Pilih alat coding kamu saat diminta. Keduanya membaca skill dari GitHub tanpa meng-clone repositori dan memasangnya tanpa agent, command, atau hook milik plugin.

```bash
gh skill install wshobson/agents python-testing-patterns
npx skills add wshobson/agents --skill python-testing-patterns
```

`gh skill` membutuhkan GitHub CLI 2.90 atau lebih baru. Perintah `npx` membutuhkan Node.js dan npm. Lihat [pemasangan khusus skill](https://github.com/wshobson/agents/blob/main/docs/harnesses.md#skills-only-installers) untuk agent lain, cakupan pemasangan, dan pematokan versi.

### Pasang dari clone

Untuk OpenCode, Antigravity CLI, GitHub Copilot, dan Pi, clone repositori dan pakai installer untuk harness kamu. Pasang [uv](https://docs.astral.sh/uv/getting-started/installation/), Python 3.12 atau lebih baru, dan alat coding yang ingin dipakai. Perintah clone berikut memakai GitHub CLI:

```bash
gh repo clone wshobson/agents ~/agents
cd ~/agents
```

Jalankan perintah untuk alat kamu. Setiap target menghasilkan artefak dan menautkan semua plugin lokal ke konfigurasi pengguna alat itu:

```bash
make install-opencode
make install-antigravity
make install-copilot
make install-pi
```

Agent Pi membutuhkan ekstensi `subagent` referensinya atau ekstensi yang kompatibel. Lihat [panduan pemasangan global](https://github.com/wshobson/agents/blob/main/docs/harnesses.md#global-install) untuk path konfigurasi dan perintah uninstall.

## Isinya

| Komponen | Jumlah | Fungsi |
|---|---:|---|
| Plugin | 94 | Kelompok komponen yang bisa dipasang, termasuk 92 plugin lokal dan 2 entri eksternal |
| Agent | 202 | Instruksi untuk subagent spesialis yang menangani pekerjaan yang didelegasikan |
| Skill | 185 | Panduan dan materi referensi yang dimuat agent saat relevan |
| Command | 105 | Alur kerja bernama yang kamu panggil, seperti scaffolding proyek atau pemindaian keamanan |

Jumlah agent, skill, dan command mencakup file sumber lokal. Plugin eksternal menyediakan komponen dan persyaratan pemasangannya sendiri.

## Cara kerjanya

Plugin mengelompokkan agent, skill, dan command yang berkaitan di bawah `plugins/`. Misalnya, `python-development` berisi tiga agent, enam belas skill, dan satu command scaffolding. Harness yang dipilih memuat komponen terpasang sesuai aturan penemuan dan pemanggilannya sendiri.

Kontributor memelihara satu sumber Markdown dalam format plugin Claude Code. Registri native menunjuk ke sumber itu bila didukung, dan adapter menghasilkan format yang dibutuhkan tiap harness. Command bisa menjadi skill atau template prompt, dan format agent, pilihan model, serta izin tool berbeda antar harness.

Agent sumber menetapkan alias model seperti `opus`, `sonnet`, `haiku`, `fable`, atau `inherit`. Adapter memetakan alias itu ke pengaturan model tiap harness, termasuk default tetap untuk sebagian entri `inherit`. Lihat [konfigurasi model](https://github.com/wshobson/agents/blob/main/docs/agents.md#model-configuration) dan [pemetaan adapter](https://github.com/wshobson/agents/blob/main/tools/adapters/capabilities.py).

## Evaluasi kualitas

Repositori memvalidasi struktur plugin, artefak yang dihasilkan, dan dokumentasi. Kontributor bisa menjalankan pemeriksaan ini dari root repositori:

```bash
make generate-all
make validate STRICT=1
make garden
```

[`plugin-eval`](https://github.com/wshobson/agents/blob/main/plugins/plugin-eval/) juga menyediakan pemeriksaan skill statis tanpa panggilan model. Contohnya:

```bash
uv run --project plugins/plugin-eval plugin-eval score plugins/python-development/skills/python-testing-patterns --depth quick
```

Lapisan LLM judge dan Monte Carlo bersifat eksperimental dan tidak divalidasi terhadap label manusia. Skornya menggambarkan penilaian model dan simulasi berulang dan tidak membuktikan bahwa sebuah tugas berhasil di proyek. Keduanya membutuhkan dependensi `llm` opsional. Panggilan model memakai `ANTHROPIC_API_KEY` bila disetel dan menagih akun API itu. Jika tidak, ia memakai login Claude Code kamu. Lihat [panduan evaluasi](https://github.com/wshobson/agents/blob/main/docs/plugin-eval.md) untuk setup dan batasannya.

## Peta dokumentasi

| Panduan | Mencakup |
|---|---|
| [Katalog plugin](https://github.com/wshobson/agents/blob/main/docs/plugins.md) | Plugin menurut tugas dan domain |
| [Agent](https://github.com/wshobson/agents/blob/main/docs/agents.md) dan [skill](https://github.com/wshobson/agents/blob/main/docs/agent-skills.md) | Komponen yang tersedia dan konfigurasi model |
| [Pemakaian](https://github.com/wshobson/agents/blob/main/docs/usage.md) dan [setup alat](https://github.com/wshobson/agents/blob/main/docs/harnesses.md) | Perintah, contoh, dan pemasangan |
| [Arsitektur](https://github.com/wshobson/agents/blob/main/ARCHITECTURE.md) dan [detail desain](https://github.com/wshobson/agents/blob/main/docs/architecture.md) | Tata letak sumber dan adapter |
| [Evaluasi kualitas](https://github.com/wshobson/agents/blob/main/docs/plugin-eval.md) dan [verifikasi CLI](https://github.com/wshobson/agents/blob/main/docs/round-trip-results.md) | Pemeriksaan dan batasannya |

Lihat [CONTRIBUTING.md](https://github.com/wshobson/agents/blob/main/CONTRIBUTING.md) untuk mengusulkan perubahan dan [konvensi penulisan](https://github.com/wshobson/agents/blob/main/docs/authoring.md) untuk menulis konten plugin.

## Integrasi memori eksternal

[Pensyve](https://github.com/major7apps/pensyve) tetap menjadi entri marketplace Claude Code eksternal yang opsional. Major7 Apps memelihara Pensyve, dan pemelihara repositori ini mendirikan Major7 Apps. Runtime open source-nya bisa berjalan lokal atau di servermu sendiri. [Pensyve Cloud ditutup pada 1 Oktober 2026](https://pensyve.com/), dan dasbor, API, serta endpoint MCP hosted-nya tidak tersedia. Pakai [panduan self-hosting](https://github.com/major7apps/pensyve/blob/main/docs/self-host.md) saat mengonfigurasi runtime.

## Lisensi

Repositori ini [berlisensi MIT](https://github.com/wshobson/agents/blob/main/LICENSE). Plugin eksternal punya lisensinya sendiri.
