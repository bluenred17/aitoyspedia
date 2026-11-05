---
title: "ECC (Everything Claude Code)"
summary: "Sistem rekayasa untuk agent: 71 agent, 314 skill, hook, rule, memori, dan pemindai keamanan AgentShield yang membuat agent merencanakan, menguji, meninjau, memverifikasi, mengingat, dan memperbaiki diri."
category: coding
tags: [agent-harness, tdd, code-review, hooks, memori, agentshield, subagent, workflow]
surfaces: [claude-code]
source_url: "https://github.com/affaan-m/ECC/blob/main/README.md"
repo: affaan-m/ECC
stars: 297314
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
install: |
  /plugin marketplace add https://github.com/affaan-m/ECC
  /plugin install ecc@ecc
includes: [tdd-workflow, security-review, security-scan, code-review, plan, build-fix, refactor-clean, quality-gate, verification-loop, eval-harness, continuous-learning-v2, strategic-compact, configure-ecc, issue-review, e2e-testing, search-first, skill-stocktake, unified-memory, autonomous-loops, mle-workflow, api-design, context-budget, save-session, resume-session]
---

# ECC

> [!WARNING]
> **Hanya sumber resmi.** Pasang ECC hanya dari kanal yang terverifikasi: repositori GitHub [github.com/affaan-m/ECC](https://github.com/affaan-m/ECC), paket npm [`ecc-universal`](https://www.npmjs.com/package/ecc-universal) dan [`ecc-agentshield`](https://www.npmjs.com/package/ecc-agentshield), [GitHub App](https://github.com/apps/ecc-tools), slug plugin `ecc@ecc`, dan situs [ecc.tools](https://ecc.tools). Unggahan ulang pihak ketiga dan mirror tidak resmi tidak dikelola atau ditinjau proyek ini dan bisa berisi malware.

> **Catatan dari situs ini:** ECC menjalankan hook (skrip shell) dan paket npm di komputermu. README sendiri menegaskan bahwa mematok versi paket bukan audit keamanan. Tinjau sumber rilis dan integritas registri sebelum menjalankan kode paket.

Agent kamu bisa menulis kode, tetapi ECC memberinya sistem dan perangkat rekayasa yang terkoordinasi: ia merencanakan sebelum membangun, memverifikasi perubahan dengan tes, meninjau pekerjaannya sendiri dari konteks yang segar, mengingat hal yang penting, dan mengubah kemenangan yang berulang menjadi skill dan alur kerja yang bisa dipakai ulang.

```text
plan -> test -> implement -> review -> verify -> remember -> improve
```

Alih-alih membangun ulang proses itu di setiap prompt, kamu memasangnya sekali dan menjadikannya bagian dari cara kerja agent.

> Optimalkan context window. Simpan yang lainnya.

ECC adalah open source berlisensi MIT. Ia paling cocok dengan Claude Code saat ini, punya jalur plugin native untuk Codex dan Qoder, dan menyediakan adapter dengan kapabilitas terbatas untuk Cursor, OpenCode, Gemini, Zed, GitHub Copilot, Antigravity, Qwen, dan harness lain. Lihat [matriks status dukungan](#dukungan-platform) sebelum berasumsi fiturnya setara.

Akses ke 71 agent, 314 skill, dan 98 shim perintah lama, ditambah hook, rule, memori, pembelajaran berkelanjutan, dan pemindaian keamanan AgentShield. Agent-nya dikhususkan untuk perencanaan, review, perbaikan build, keamanan, arsitektur, dan pekerjaan domain.

| Isi | Jumlah | Yang didapat |
| --- | ---: | --- |
| Agent | 71 agent | Perencanaan, review, perbaikan build, keamanan, arsitektur, dan pekerjaan domain |
| Skill | 314 skill | TDD, riset, keamanan, dokumentasi, frontend, data, ML, operasi, dan lainnya |
| Perintah | 98 perintah | Pintu masuk yang nyaman selagi ECC bergeser ke permukaan yang mengutamakan skill |
| Hook dan memori | Runtime | Penegakan aturan, ringkasan sesi, pembelajaran berkelanjutan, instinct, dan kontrol konteks |
| Rule | Selektif | Standar yang selalu dimuat, kamu pilih per bahasa atau proyek |
| AgentShield | Termasuk | Pemindaian prompt, hook, konfigurasi MCP, izin, rahasia, dan file agent |

## Pasang ECC

> [!IMPORTANT]
> ECC 2.2 menyertakan setup paket terpandu untuk Claude Code, Codex, dan Kimi Code. Paket universal membutuhkan Node.js 18 atau lebih baru. Setup plugin Claude juga membutuhkan Git dan Claude Code 2.1 atau lebih baru di `PATH`.

### Disarankan: setup terpandu universal

Untuk setup plugin Claude Code, pembaruan, perubahan scope, dan perubahan profil hook:

```bash
npx ecc-universal@2.2.3 setup
```

#### Panduan pertama kali di Windows

Kalau kamu baru mengenal alat baris perintah, ikuti jalur salin-tempel ini:

1. Pasang Node.js 18 atau lebih baru, Git, dan Claude Code.
2. Buka **PowerShell** dari menu Start Windows.
3. Pastikan setiap prasyarat tersedia:

   ```powershell
   node --version
   git --version
   claude --version
   ```

4. Jalankan installer terpandu:

   ```powershell
   npx ecc-universal@2.2.3 setup
   ```

5. Untuk setup pribadi yang umum, pilih **Global user**, pilih hook **Standard**, lalu konfirmasi.
6. Mulai sesi Claude Code baru dan jalankan `/plugin list` untuk memastikan `ecc@ecc` aktif.

Jalur ini tidak membutuhkan clone repositori. Kalau ada perintah prasyarat yang tidak ditemukan, pasang atau perbaiki prasyarat itu sebelum menjalankan ulang setup ECC.

Kalau npm melaporkan error versi atau cache, pastikan versi di registri sebelum mencoba lagi:

```bash
npm view ecc-universal version
```

ECC 2.2 mendukung setup terpandu yang sama lewat package runner modern:

| Package runner | Perintah setup terpandu |
|---|---|
| npm / npx | `npx ecc-universal@2.2.3 setup` |
| pnpm | `pnpm dlx ecc-universal@2.2.3 setup` |
| Yarn 2+ | `yarn dlx ecc-universal@2.2.3 setup` |
| Bun | `bunx ecc-universal@2.2.3 setup` |

Contoh di atas memilih [rilis ECC 2.2.3 yang dipublikasikan](https://www.npmjs.com/package/ecc-universal/v/2.2.3), sesuai versi rilis repositori ini. Mematok versi bukan audit keamanan atau pemeriksaan integritas. Tinjau sumber rilis dan integritas registri sebelum menjalankan kode paket; pakai checkout yang sudah ditinjau untuk perubahan yang belum dirilis.

Yarn Classic 1 tidak punya `yarn dlx`; pakai `npx`, pasang paket secara global, atau tingkatkan Yarn untuk sekali jalan sementara.

Wizard ini mendata marketplace resmi dan setiap scope pemasangan Claude native sebelum membuat perubahan, lalu memasang, memperbarui, atau memindahkan `ecc@ecc` dengan aman ke scope yang kamu pilih. Jalankan ulang perintah yang sama kapan pun kamu ingin memperbarui ECC, mengubah scope, atau mengubah profil hook-nya. Wizard setup ini saat ini hanya mengonfigurasi plugin Claude Code; pakai wizard multi-harness di bawah untuk Codex atau Kimi Code.

Untuk mengonfigurasi lebih dari satu coding agent dalam satu alur yang sudah ditinjau, pakai wizard multi-harness:

```bash
npx ecc-universal@2.2.3 install --guided
```

Wizard ini memungkinkan kamu memilih kombinasi apa pun dari Claude Code, Codex, dan Kimi Code, menampilkan setiap kanal pemasangan dan tujuannya, melakukan preflight atas semua pilihan sebelum penulisan pertama, dan meminta satu konfirmasi akhir.

| Harness | Perilaku pemasangan terpandu |
|---|---|
| Claude Code | Plugin `ecc@ecc` native dengan satu scope `user`, `project`, atau `local` dan profil hook ECC |
| Codex | Siklus hidup marketplace/plugin Codex native; peninjauan dan kepercayaan hook tetap dipegang Codex |
| Kimi Code | File terkelola di bawah `./.kimi-code` proyek; hook ECC, pengaturan model/provider, dan autentikasi tidak dikonfigurasi |

Untuk otomatisasi, buat setiap pilihan khusus provider secara eksplisit:

```bash
npx ecc-universal@2.2.3 install --guided \
  --harness claude --harness codex --harness kimi \
  --claude-scope local --claude-hooks standard \
  --profile core --yes
```

Verifikasi jalur Codex terpandu native dan jalur Kimi terkelola tanpa menulis apa pun lebih dulu:

```bash
npx ecc-universal@2.2.3 install --guided --harness codex --dry-run
npx ecc-universal@2.2.3 install --profile core --target kimi --dry-run
```

Perintah berbasis nama paket tambahan juga tersedia lewat alias 2.2:

```bash
npx ecc-universal@2.2.3 consult "security reviews" --target claude
npx ecc-universal@2.2.3 install --profile minimal --target claude --with capability:machine-learning
npx ecc-universal@2.2.3 doctor --target kimi
```

Jangan pakai `npx ecc-install --profile minimal --target claude`: `ecc-install` adalah nama binary di dalam `ecc-universal`, bukan paket npm yang dipublikasikan terpisah.

ECC juga menyediakan adapter terkelola tingkat lanjut untuk `cursor`, `antigravity`, `gemini`, `opencode`, `codebuddy`, `joycode`, `qwen`, `zed`, `hermes`, dan `openclaw`. Target-target itu masih memakai jalur `ecc install --target ...` yang terdokumentasi sampai tiap adapter lulus matriks siklus hidup tabrakan, pembaruan, perbaikan, dan uninstall terpandu. Kedua wizard tidak pernah diam-diam memasang ke setiap harness yang terdeteksi.

### Pilih satu jalur saja (per harness)

Kamu bisa memakai ECC dengan Claude Code, Codex, dan harness lain sekaligus. Pilih satu metode pemasangan untuk setiap harness:

- **Default yang disarankan:** jalankan setup plugin Claude terpandu di atas
- **Juga didukung untuk Claude Code:** pakai [perintah plugin native](#detail-claude-code)
- **Tersedia di rilis 2.2:** setup paket terpandu untuk Claude Code, Codex, dan Kimi Code
- **Berfungsi:** plugin Claude Code + plugin native Codex
- **Berfungsi:** plugin Claude Code + alur sync Codex lama
- **Hindari:** plugin Claude Code + pemasangan manual penuh Claude
- **Hindari:** sync Codex + plugin marketplace Codex

**Jangan menumpuk metode pemasangan.** Memasang ECC dua kali ke harness yang sama bisa menggandakan skill, perintah, hook, atau konfigurasi; memasangnya sekali ke beberapa harness tidak.

Kalau kamu sudah menumpuk beberapa pemasangan dan semuanya tampak ganda, langsung ke [Reset / Uninstall ECC](#reset-perbaiki-atau-uninstall).

**Masalah pemasangan?** Buka [formulir singkat masalah pemasangan atau runtime](https://github.com/affaan-m/ECC/issues/new?template=install-problem.yml), atau jalankan `ecc feedback`. ECC tidak pernah mengunggah diagnostik secara otomatis.

### Detail Claude Code

Atau, jalankan perintah plugin native Claude Code di dalam Claude Code:

```text
/plugin marketplace add https://github.com/affaan-m/ECC
/plugin install ecc@ecc
```

Jalur native memasang skill, agent, perintah, dan hook yang dikelola plugin. Kalau kamu memilihnya, berhenti di situ. Jangan juga menjalankan pemasangan manual penuh ke Claude Code.

Claude Code memegang perintah bawaan ini, termasuk error-nya ketika marketplace, plugin, atau scope yang bentrok sudah ada. ECC tidak bisa mencegat parser itu. Kalau salah satu perintah native melaporkan pemasangan atau konflik scope yang sudah ada, pakai setup terpandu 2.2 atau selesaikan konflik scope plugin Claude sebelum mencoba lagi; jangan menumpuk pemasangan manual.

Setelah ECC terpasang, `/ecc:configure-ecc` adalah skill konfigurasi ulang dalam Claude dengan namespace. Skill ini mendelegasikan ke alur setup aman yang sama, tetapi hanya tersedia setelah plugin terpasang dan tidak bisa menggantikan perintah bawaan `/plugin` milik Claude Code saat pemasangan pertama.

Plugin Claude Code tidak bisa mendistribusikan `rules`, jadi tambahkan hanya paket rule yang benar-benar kamu mau:

```bash
git clone https://github.com/affaan-m/ECC.git
cd ECC
mkdir -p ~/.claude/rules/ecc
cp -R rules/common ~/.claude/rules/ecc/
cp -R rules/typescript ~/.claude/rules/ecc/  # ganti dengan stack kamu
```

Mulai dengan `rules/common` ditambah satu paket bahasa atau framework yang benar-benar kamu pakai. Kalau kamu memasang plugin, jangan jalankan `./install.sh --profile full` sesudahnya.

**Lebih suka settings.json? Tambahkan marketplace secara deklaratif**

Tambahkan langsung ke `~/.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "ecc": {
      "source": {
        "source": "github",
        "repo": "affaan-m/ECC"
      }
    }
  },
  "enabledPlugins": {
    "ecc@ecc": true
  }
}
```

Hasilnya sama dengan dua perintah `/plugin` di atas.

**Catatan penamaan dan migrasi (ecc@ecc, affaan-m/ECC, ecc-universal)**

ECC punya tiga pengenal publik, dan ketiganya tidak bisa dipertukarkan:

- Repositori sumber GitHub: `affaan-m/ECC`
- Pengenal marketplace/plugin Claude: `ecc@ecc`
- Paket npm: `ecc-universal`

Ini disengaja. Pemasangan marketplace/plugin Anthropic dikunci oleh pengenal plugin kanonik, jadi ECC memakai `ecc@ecc` agar nama tool dan namespace slash command cukup pendek untuk validator Desktop/API yang ketat. Postingan lama mungkin masih menampilkan pengenal marketplace panjang sebelumnya; anggap itu sekadar alias lama. Secara terpisah, paket npm tetap bernama `ecc-universal`, sehingga pemasangan npm dan pemasangan marketplace sengaja memakai nama berbeda.

Rilis npm dipotong per tag versi, bukan per commit, jadi `ecc-universal` mengikuti rilis (2.1, 2.2, ...) dan bukan tiap push ke `main`. Pasang dari git bila kamu mau versi terbaru yang paling mutakhir.

Kalau setup Claude lokalmu terhapus atau direset, bukan berarti kamu perlu membeli ulang apa pun. Mulai dengan `node scripts/ecc.js list-installed`, lalu jalankan `node scripts/ecc.js doctor` dan `node scripts/ecc.js repair` sebelum memasang ulang. Itu biasanya memulihkan file yang dikelola ECC tanpa membangun ulang setup kamu.

### Codex App dan CLI

Rilis Codex saat ini bisa memasang ECC sebagai plugin repo-marketplace native. Entri marketplace memakai root repositori agar cache Codex menerima manifest bersama semua skill, konfigurasi MCP, runtime hook, skrip, dan aset yang dirujuk:

```bash
codex plugin marketplace add affaan-m/ECC
codex plugin add ecc@ecc
codex plugin list --json
node scripts/codex/check-plugin-cache.js
```

Kedua perintah add bersifat idempoten. Untuk menyegarkan kemudian, jalankan `codex plugin marketplace upgrade ecc` diikuti `codex plugin add ecc@ecc`. Codex menyimpan satu status plugin aktif di `CODEX_HOME` yang aktif; ia tidak menawarkan scope `user`, `project`, dan `local` seperti Claude. Hook native-nya membutuhkan keputusan kepercayaan yang eksplisit dan tidak memakai empat profil hook ECC milik Claude. Di dalam Codex, panggil `$configure-ecc` untuk alur terpandu yang sadar provider.

Jalur lama `scripts/sync-ecc-to-codex.sh` adalah opsi kompatibilitas yang sudah usang untuk pengguna yang sengaja membutuhkan konfigurasi yang disalin dan digabung di `~/.codex`; ia tidak dibutuhkan untuk plugin native. Run sync baru menulis manifest kepemilikan agar pembersihan bisa mempertahankan file pengguna yang sudah diubah. Jalankan Codex sekali dulu agar `~/.codex/config.toml` ada, lalu:

```bash
git clone https://github.com/affaan-m/ECC.git
cd ECC
npm install
bash scripts/sync-ecc-to-codex.sh
```

Untuk memeriksa atau menghapus lapisan lama itu tanpa menyentuh percakapan Codex atau cache plugin native:

```bash
node scripts/ecc.js uninstall --legacy-codex-sync --dry-run
node scripts/ecc.js uninstall --legacy-codex-sync
```

Pemasangan pra-manifest ditangani secara konservatif: ECC menghapus blok `AGENTS.md` yang ditandainya tetapi mempertahankan file hasil salinan yang tidak bisa dibuktikan sebagai miliknya dan melaporkannya untuk ditinjau.

Kamu juga bisa membuka repositori ECC langsung di Codex untuk setup lokal proyek. Codex membaca `AGENTS.md` di root dan konfigurasi proyek tepercaya di `.codex/` tanpa sync global. Jangan menambahkan plugin marketplace native di atas alur sync.

Untuk navigasi repo, kepemilikan permukaan, dan panduan paket diff PR, baca [Codex ECC Navigation Map](https://github.com/affaan-m/ECC/blob/main/docs/CODEX-NAVIGATION-GUIDE.md). Lihat [catatan plugin .codex](https://github.com/affaan-m/ECC/blob/main/.codex-plugin/README.md) untuk detail siklus hidup native.

**Codex macOS app + CLI secara mendalam**

```bash
# Pemasangan yang disarankan saat ini: tambahkan plugin native ECC dari marketplace repo
codex plugin marketplace add affaan-m/ECC
codex plugin add ecc@ecc
codex plugin list --json

# Atau jalankan Codex CLI di repo: AGENTS.md dan .codex/ terdeteksi otomatis
codex
```

Kompatibilitas konfigurasi hasil salinan yang lama masih tersedia bila kamu sengaja membutuhkannya:

```bash
# Sync terkelola khusus-kompatibilitas ke ~/.codex
npm install && bash scripts/sync-ecc-to-codex.sh

# Atau salin hanya konfigurasi referensi secara manual
cp .codex/config.toml ~/.codex/config.toml
```

Sync MCP normal mempertahankan pengaturan server yang sudah ada dan memperingatkan bila berbeda dari rekomendasi ECC. Entri `chrome-devtools-mcp@latest` yang sudah ada karena itu tetap tidak berubah; memperbarui repositori saja tidak mengadopsi pin `chrome-devtools-mcp@1.10.1` yang direkomendasikan. Pengguna sync lama bisa melihat pratinjau dan menerapkan penyegaran secara eksplisit dari checkout ECC yang sudah diperbarui:

```bash
bash scripts/sync-ecc-to-codex.sh --dry-run --update-mcp
bash scripts/sync-ecc-to-codex.sh --update-mcp
```

Tinjau pratinjau sebelum menerapkan: `--update-mcp` mengganti seluruh bagian server `chrome-devtools` yang direkomendasikan, termasuk argumen perintah kustom dan pengaturan bersarang. Server buatan pengguna yang tidak terkait tetap di tempatnya. Default yang sudah pensiun seperti Context7 tidak disegarkan atau dimigrasikan oleh flag ini.

Codex macOS app:
- Buka repositori ini sebagai workspace.
- `AGENTS.md` di root terdeteksi otomatis.
- `.codex/config.toml` dan `.codex/agents/*.toml` paling baik dijaga lokal proyek.
- `.codex/config.toml` referensi sengaja tidak mematok `model` atau `model_provider`, sehingga Codex memakai default terbarunya sendiri kecuali kamu menimpanya.
- Opsional: salin `.codex/config.toml` ke `~/.codex/config.toml` untuk default global; biarkan file peran multi-agent lokal proyek kecuali kamu juga menyalin `.codex/agents/`.

Isi di lapisan repo dan konfigurasi lama:

| Komponen | Jumlah | Detail |
|-----------|-------|---------|
| Config | 1 | `.codex/config.toml`: approval/sandbox/web_search tingkat atas, server MCP, notifikasi, profil |
| AGENTS.md | 2 | Root (universal) + `.codex/AGENTS.md` (suplemen khusus Codex) |
| Skill | 32 | `.agents/skills/`: SKILL.md + agents/openai.yaml per skill |
| Server MCP | 6 entri referensi lama | GitHub, Context7, Exa, Memory, Playwright, Sequential Thinking. Sync terkelola saat ini merekomendasikan `chrome-devtools`; lihat instruksi penyegaran eksplisit di atas. |
| Profil | 2 | `strict` (sandbox hanya-baca) dan `yolo` (setujui otomatis penuh) |
| Peran agent | 3 | `.codex/agents/`: explorer, reviewer, docs-researcher |

Skill di `.agents/skills/` dimuat otomatis oleh Codex. Skill Anthropic kanonik seperti `claude-api`, `frontend-design`, dan `skill-creator` sengaja tidak dibundel ulang di sini. Pasang itu dari [`anthropics/skills`](https://github.com/anthropics/skills) bila kamu mau versi resminya.

Keterbatasan utama: Codex **tidak** menyediakan kesetaraan eksekusi hook gaya Claude. Plugin ECC native menyertakan subset hook yang sudah ditinjau yang membutuhkan kepercayaan eksplisit di `/hooks`; `AGENTS.md`, override `model_instructions_file` opsional, dan pengaturan sandbox/approval menyediakan lapisan instruksi dan kebijakan sisanya.

Dukungan multi-agent: build Codex saat ini mendukung alur kerja multi-agent yang stabil. Aktifkan `features.multi_agent = true` di `.codex/config.toml`, definisikan peran di bawah `[agents.<name>]`, arahkan tiap peran ke file di bawah `.codex/agents/`, dan pakai `/agent` di CLI untuk memeriksa atau mengarahkan agent anak. ECC menyertakan tiga konfigurasi peran contoh: `explorer` (pengumpulan bukti codebase hanya-baca sebelum mengedit), `reviewer` (review kebenaran, keamanan, dan tes yang hilang), dan `docs_researcher` (verifikasi dokumentasi dan API sebelum perubahan rilis/dokumen).

### Qoder CLI dan IDE

ECC menyertakan plugin Qoder native yang memakai ulang skill kanonik, agent, 95 shim perintah lama, dan definisi MCP `chrome-devtools` yang dipatok. Dari checkout yang sudah ditinjau, validasi dan pasang dengan Qoder CLI:

```bash
qoder plugins validate . --strict
qoder plugins install .
qoder plugins list
```

Untuk Qoder IDE, unggah ZIP dari root repositori. Root ZIP harus berisi `.qoder-plugin/` bersama `skills/`, `agents/`, `commands/`, `hooks/`, `scripts/`, dan `.mcp.json`; mengunggah hanya direktori manifest atau satu `SKILL.md` akan menghilangkan sumber daya yang dibutuhkan.

Persyaratan Node.js 18+ yang universal berlaku untuk lingkungan hook non-interaktif Qoder. Server MCP juga membutuhkan `npx` dan akses jaringan pada pemakaian pertama. Qoder menerima satu bootstrap `SessionStart` lintas platform yang sudah ditinjau, memakai `QODER_PLUGIN_ROOT` dan argumen bentuk-exec. ECC tidak menyalin profil hook Claude lengkap ke Qoder: hook tool yang memblokir, job stop asinkron, dan matcher khusus Claude tetap di luar integrasi native awal ini. Lihat [catatan .qoder-plugin](https://github.com/affaan-m/ECC/blob/main/.qoder-plugin/README.md) untuk batas persisnya.

### Agent dan editor lain

Cursor, OpenCode, Gemini, Zed, Antigravity, Qwen, Hermes, OpenClaw, Kimi, CodeBuddy, JoyCode, Copilot.

Clone ECC sekali, lalu pilih target yang sesuai dengan harness kamu:

```bash
git clone https://github.com/affaan-m/ECC.git
cd ECC
```

| Harness | Pemasangan atau setup | Catatan |
|---|---|---|
| Cursor | `./install.sh --profile minimal --target cursor` | Adapter `.cursor/` lokal proyek |
| OpenCode | `npm install && npm run build:opencode && ./install.sh --profile full --target opencode --enable-hooks` | Membangun payload plugin sebelum pemasangan penuh |
| Gemini CLI | `./install.sh --profile minimal --target gemini` | Konfigurasi `.gemini/` lokal proyek |
| Zed | `./install.sh --profile minimal --target zed` | Adapter `.zed/` lokal proyek |
| Antigravity | `./install.sh --profile minimal --target antigravity` | Lihat [panduan Antigravity](https://github.com/affaan-m/ECC/blob/main/docs/ANTIGRAVITY-GUIDE.md) |
| Qwen CLI | `./install.sh --profile minimal --target qwen` | Lihat [panduan Qwen](https://github.com/affaan-m/ECC/blob/main/docs/QWEN-GUIDE.md) |
| Hermes | `./install.sh --profile minimal --target hermes` | Lihat [panduan setup Hermes](https://github.com/affaan-m/ECC/blob/main/docs/HERMES-SETUP.md) |
| OpenClaw | `./install.sh --profile minimal --target openclaw` | Pemasangan terkelola di direktori home |
| Kimi Code CLI | `./install.sh --profile minimal --target kimi` | Pemasangan `.kimi-code/` lokal proyek · [Dapatkan Kimi Code](https://www.kimi.ai/code?aff=ecc) |
| CodeBuddy | `./install.sh --profile minimal --target codebuddy` | Pemasangan `.codebuddy/` lokal proyek |
| JoyCode | `./install.sh --profile minimal --target joycode` | Pemasangan `.joycode/` lokal proyek |
| GitHub Copilot | `./install.sh --profile full --target copilot` | Memasang skill ke `.github/skills/` dan agent ke `.github/agents/` untuk Copilot CLI |

Dukungan GitHub Copilot sudah termasuk di repositori ini. `.github/copilot-instructions.md` menyediakan lapisan instruksi, `.github/prompts/` berisi prompt `/plan`, `/tdd`, `/security-review`, `/build-fix`, dan `/refactor` yang bisa dipakai ulang, dan `.vscode/settings.json` mengaktifkan `chat.promptFiles`. GitHub Copilot CLI juga menemukan subset `.agents/skills/` dari clone biasa tanpa setup; lihat [Dukungan Platform](#dukungan-platform) untuk katalog dan agent lengkap.

Untuk harness tanpa target ECC native, pakai [panduan adaptasi manual](https://github.com/affaan-m/ECC/blob/main/docs/MANUAL-ADAPTATION-GUIDE.md). Panduan itu menjelaskan cara membawa sejumlah kecil skill dan instruksi alur kerja ECC ke alat bergaya chat tanpa berpura-pura hook atau penemuan skill native tersedia.

Cursor memasang definisi agent di bawah `.cursor/agents/ecc-*.md`. Perilaku pemuatan native Cursor bisa bervariasi menurut build Cursor. ECC tidak memasang `AGENTS.md` root ke `.cursor/`. Adapter menjaga konteks Cursor tetap terbatas pada permukaan rule dan agent native-nya.

**Cursor IDE secara mendalam**

ECC menyediakan dukungan Cursor IDE dengan hook, rule, agent, skill, perintah, dan konfigurasi MCP yang disesuaikan dengan tata letak proyek Cursor.

```bash
# macOS/Linux
./install.sh --target cursor typescript
./install.sh --target cursor python golang swift php
```

```powershell
# Windows PowerShell
.\install.ps1 --target cursor typescript
.\install.ps1 --target cursor python golang swift php
```

Isi untuk Cursor: 15 event hook (sessionStart, beforeShellExecution, afterFileEdit, beforeMCPExecution, beforeSubmitPrompt, dan 10 lainnya) dengan 15 entrypoint tipis Node.js, 34 rule (9 common `alwaysApply` + 25 khusus bahasa), 48 agent di `.cursor/agents/ecc-*.md` (diberi awalan agar tidak bertabrakan dengan agent pengguna atau marketplace), skill di `.cursor/skills/`, perintah di `.cursor/commands/` bila dipasang, dan konfigurasi MCP di `.cursor/mcp.json` bila dipasang.

Catatan pemuatan: ECC tidak memasang `AGENTS.md` root ke `.cursor/`, karena Cursor memperlakukan file `AGENTS.md` bersarang sebagai konteks direktori dan menyalin identitas repo ECC ke proyek host akan mencemarinya. Kalau build Cursor kamu tidak menampilkan agent proyek, file-file itu tetap berfungsi sebagai definisi referensi eksplisit.

Isolasi memori dan data (Cursor + Claude Code): hook memori ECC memakai ulang `scripts/hooks/*.js` yang sama dengan Claude Code. Untuk Cursor, ECC berusaha menjaga memori **di luar `~/.claude` secara otomatis** lewat hook `sessionStart` Cursor (yang menyuntikkan `ECC_AGENT_DATA_HOME`), default runtime hook ke `~/.cursor/ecc` saat `CURSOR_VERSION` atau `CURSOR_PROJECT_DIR` ada, konfigurasi proyek `.cursor/ecc-agent-data.json`, dan rule selalu-aktif `.cursor/rules/ecc-agent-data-home.mdc`. Kamu tetap bisa menimpanya secara eksplisit:

```bash
export ECC_AGENT_DATA_HOME="$HOME/.cursor/ecc"
```

Untuk **berbagi** memori dengan Claude Code dengan sengaja, setel `ECC_AGENT_DATA_HOME=~/.claude` di shell atau di `.cursor/ecc-agent-data.json`. Instinct pembelajaran berkelanjutan v2 tetap terpisah di bawah `CLV2_HOMUNCULUS_DIR` (default `~/.local/share/ecc-homunculus`).

Arsitektur hook (pola adapter DRY): Cursor punya **lebih banyak event hook daripada Claude Code** (20 vs 8). Modul `.cursor/hooks/adapter.js` mengubah JSON stdin Cursor ke format Claude Code, sehingga `scripts/hooks/*.js` yang ada dipakai ulang tanpa duplikasi. Hook utama: `beforeShellExecution` memblokir bypass hook git dan dev server di luar tmux (exit 2); `afterFileEdit`/`stop` mengumpulkan file JS/TS yang diedit dan menjalankan satu batch format/typecheck; `beforeSubmitPrompt` mendeteksi rahasia (pola sk-, ghp_, AKIA) di prompt; `beforeTabFileRead` memblokir Tab membaca file .env, .key, .pem; `beforeMCPExecution`/`afterMCPExecution` mencatat audit MCP.

Format rule Cursor memakai frontmatter YAML dengan `description`, `globs`, dan `alwaysApply`:

```yaml
---
description: "TypeScript coding style extending common rules"
globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]
alwaysApply: false
---
```

**Dukungan Zed**

ECC menyediakan dukungan proyek Zed lewat adapter `.zed` yang konservatif untuk pengaturan, rule yang diratakan, agent, perintah, dan skill lokal proyek.

```bash
./install.sh --profile minimal --target zed
```

```powershell
.\install.ps1 --profile minimal --target zed
```

Adapter menulis file terkelola ECC di bawah `.zed/` dan menjaga kredensial BYOK/OpenRouter di luar repo. Konfigurasikan akun atau API key Zed lewat UI pengaturan Zed atau pengaturan pengguna lokalmu.

**Dukungan OpenCode secara mendalam**

ECC menyediakan integrasi plugin OpenCode beta dengan instruksi, subset katalog, perintah, tool kustom, dan event hook. Ia tidak menyediakan kesetaraan fitur dengan Claude Code. Konfigurasi referensi mewarisi pilihan model OpenCode pengguna, bukan mematok model khusus provider.

```bash
# Jalankan pemasangan OpenCode yang sudah kamu tinjau di root repositori
opencode
```

Untuk pemasangan, pakai [instruksi OpenCode resmi](https://opencode.ai/docs/), pilih rilis yang tepat, dan verifikasi sebelum dijalankan. Paket npm hulunya adalah `opencode-ai`, bukan `opencode`. ECC tidak menjamin versi runtime OpenCode yang sudah diaudit.

Konfigurasi terdeteksi otomatis dari `.opencode/opencode.json`. Sistem plugin OpenCode punya 20+ jenis event; pemetaannya: PreToolUse → `tool.execute.before`, PostToolUse → `tool.execute.after`, Stop → `session.idle`, SessionStart → `session.created`, SessionEnd → `session.deleted`. Event OpenCode tambahan: `file.edited`, `file.watcher.updated`, `message.updated`, `lsp.client.diagnostics`, `tui.toast.show`, dan lainnya.

Pemasangan plugin, opsi 1, pakai langsung:

```bash
cd ECC
opencode
```

Opsi 2, pasang sebagai paket npm:

```bash
npm install ecc-universal@2.2.3
```

Lalu tambahkan ke `opencode.json` kamu:

```json
{
  "plugin": ["ecc-universal"]
}
```

Entri plugin npm itu mengaktifkan modul plugin OpenCode ECC yang dipublikasikan (hook/event dan tool plugin). Ia **tidak** otomatis menambahkan katalog perintah/agent/instruksi lengkap ECC ke konfigurasi proyek kamu. Untuk setup OpenCode ECC penuh, jalankan OpenCode di dalam repositori ini, atau salin aset konfigurasi `.opencode/` yang dibundel ke proyekmu dan hubungkan entri `instructions`, `agent`, dan `command` di `opencode.json`. Dokumentasi: `.opencode/MIGRATION.md`, `.opencode/README.md`, `.opencode/instructions/INSTRUCTIONS.md`, dan `llms.txt`.

**Dukungan GitHub Copilot secara mendalam**

ECC mendukung **GitHub Copilot** di dua permukaan: Copilot Chat di VS Code lewat sistem file instruksi dan prompt native-nya, dan **GitHub Copilot CLI**, yang menemukan skill bersama yang sudah ada di repositori ini. Target pemasangan `copilot` opsional menaruh skill kanonik dan agent hasil adaptasi di direktori proyek native CLI.

Isi untuk GitHub Copilot:

| Komponen | File | Tujuan |
|-----------|------|---------|
| Instruksi inti | `.github/copilot-instructions.md` | Rule yang selalu dimuat: gaya kode, keamanan, tes, alur git |
| Pengaturan VS Code | `.vscode/settings.json` | File instruksi per tugas untuk pembuatan kode, pembuatan tes, dan pesan commit |
| Prompt rencana | `.github/prompts/plan.prompt.md` | Perencanaan implementasi bertahap |
| Prompt TDD | `.github/prompts/tdd.prompt.md` | Siklus Red-Green-Improve |
| Prompt review keamanan | `.github/prompts/security-review.prompt.md` | Analisis keamanan mendalam selaras OWASP |
| Prompt perbaikan build | `.github/prompts/build-fix.prompt.md` | Penyelesaian error build dan CI secara sistematis |
| Prompt refactor | `.github/prompts/refactor.prompt.md` | Pembersihan kode mati dan penyederhanaan |

File-filenya sudah tersedia: buka repo apa pun yang berisi proyek ini dan GitHub Copilot Chat akan otomatis mengambil `.github/copilot-instructions.md`. `.vscode/settings.json` yang di-commit mengaktifkan `chat.promptFiles` agar VS Code bisa memuat prompt yang bisa dipakai ulang dari `.github/prompts/`. Untuk memakai prompt alur kerja di Copilot Chat: buka panel Copilot Chat di VS Code, klik ikon **paperclip / attach** dan pilih **Prompt...** (atau ketik `/` dan pilih prompt), lalu pilih prompt (misalnya `plan`, `tdd`, `security-review`).

Copilot CLI: skill dan agent. GitHub Copilot CLI menemukan skill `SKILL.md` dari `.github/skills/`, `.agents/skills/`, `.claude/skills/`, `~/.copilot/skills/`, dan `~/.agents/skills/`, serta agent kustom dari `.github/agents/`. Frontmatter skill ECC kompatibel. Target `copilot` terkelola menyesuaikan frontmatter agent menjadi `name` dan `description`, membuang kunci model dan tool khusus Claude. Salinan agent manual mentah bisa mempertahankan metadata yang tidak didukung.

Karena ECC menyertakan subset skill di `.agents/skills/`, clone biasa repositori ini diambil Copilot CLI tanpa konfigurasi apa pun:

```bash
git clone https://github.com/affaan-m/ECC.git && cd ECC
copilot skill list
# Inventaris bergantung pada checkout dan versi CLI.
```

Untuk memeriksa ini dengan CLI sementara yang didistribusikan lewat npm, jalankan build yang dipatok terhadap clone sekali pakai:

```bash
git clone --depth 1 https://github.com/affaan-m/ECC.git && cd ECC
npx -y @github/copilot@1.0.82 skill list --json | jq '[.[] | select(.source=="project")] | length'
# Hitung inventaris saat ini, jangan berasumsi total yang tetap.
```

Untuk menampilkan katalog lengkap, taruh `skills/` di tempat Copilot CLI mencarinya:

```bash
mkdir -p .github/skills
cp -r skills/. .github/skills/
copilot skill list --json > copilot-skills.json
jq '[.[] | select(.path | contains(".github/skills"))] | length' copilot-skills.json
# Bandingkan dengan katalog skill kanonik saat ini.
```

Saring berdasarkan path, bukan `source`: CLI juga bisa menemukan skill dari lokasi proyek lain dan menghapus duplikat entri bernama sama. Jumlah bergantung pada checkout dan versi CLI. Pengalihan ke file juga menghindari keluaran JSON besar yang terpotong pada Copilot CLI 1.0.82 di macOS. Copilot mendaftarkan skill dengan `name` di frontmatter `SKILL.md`, bukan nama direktorinya.

Agent bekerja dengan cara yang sama:

```bash
./install.sh --profile full --target copilot
copilot --agent architect -p "Review this module's boundaries"
```

File agent yang disalin manual dan mendeklarasikan nama model Claude (`model: opus`, `model: sonnet`) menimbulkan peringatan dan jatuh ke model default sesi, jadi hapus atau petakan ulang `model:` bila kamu ingin mematok satu.

Memasang dengan target `copilot`: langkah di atas menyalin file dengan tangan. Target pemasangan `copilot` melakukan penempatan yang sama dan juga menulis ulang frontmatter agent agar tidak ada peringatan:

```bash
./install.sh --profile full --target copilot
# Windows: ./install.ps1 --profile full --target copilot
```

Ini menulis skill ke `.github/skills/`, agent ke `.github/agents/`, dan file install-state ke `.github/ecc-install-state.json`. Tidak ada yang ditulis di luar `.github/`. Profil `full` memilih modul yang dideklarasikan untuk Copilot, sehingga bisa menempatkan lebih sedikit skill daripada salinan manual seluruh katalog kanonik, karena modul yang membutuhkan runtime host lain dikecualikan. Frontmatter agent khusus Claude (`model`, `tools`, `color`) dibuang saat penyalinan: Copilot menentukan model dari konfigurasimu sendiri dan mengatur akses tool per sesi lewat `--allow-tool`/`--deny-tool`. Rule dipasang di bawah `.github/instructions/ecc/` sebagai file `.instructions.md`, dengan frontmatter `paths:` gaya Claude diubah menjadi daftar glob `applyTo:` milik Copilot. Perintah dan hook ECC tidak dipasang oleh target ini.

Keterbatasan: otomatisasi hook ECC (format otomatis, pemeriksaan TypeScript, persistensi sesi, penjaga dev-server) ditulis untuk model event hook Claude Code dan tidak di-port ke Copilot. Copilot Chat di VS Code tidak membaca `.github/skills/` atau `.github/agents/`; itu permukaan Copilot CLI. Lapisan instruksi dan prompt yang membawa filosofi kode ECC ke sesi Copilot Chat.

## Opsi pemasangan lanjutan

### Jalur konteks rendah / tanpa hook

Pakai ini bila kamu ingin rule, agent, perintah, konfigurasi platform, dan alur kerja inti ECC tanpa hook runtime:

```bash
npx ecc-universal@2.2.3 install --profile minimal --target claude
```

Dari source checkout, perintah yang setara:

```bash
./install.sh --profile minimal --target claude
```

Windows:

```powershell
.\install.ps1 --profile minimal --target claude
```

Profil ini sengaja mengecualikan `hooks-runtime`.

Pemasangan manual Claude menaruh tiap skill langsung di `~/.claude/skills/<skill-name>/` (atau `.claude/skills/<skill-name>/` untuk `claude-project`) agar Claude Code bisa menemukannya. Saat meningkatkan pemasangan manual ECC yang lebih lama, installer hanya memigrasikan file `skills/ecc/` bersarang yang tercatat di install-state ECC. Kalau direktori skill datar adalah milik pengguna, ECC mempertahankannya, mencetak peringatan konflik, dan tetap melacak salinan terkelola lama untuk uninstall yang aman alih-alih menimpa file pengguna.

Untuk profil core normal dengan hook dinonaktifkan:

```bash
./install.sh --profile core --without baseline:hooks --target claude
./install.sh --profile core --no-hooks --target claude
```

Tambahkan hook runtime nanti hanya bila kamu mau:

```bash
./install.sh --target claude --modules hooks-runtime --enable-hooks
```

Pemasangan apa pun yang profil atau modulnya akan mewujudkan hook runtime membutuhkan keputusan eksplisit. Tanpa `--enable-hooks` atau `--no-hooks`, installer mencetak apa yang bisa dilakukan hook dan berhenti sebelum menulis apa pun. Installer terpandu (`ecc install --guided`) menanyakan pilihan ini secara interaktif.

### Pilih hanya komponen yang kamu butuhkan

Tanyakan advisor yang dikemas komponen mana yang cocok dengan pekerjaanmu:

```bash
node scripts/ecc.js consult "security reviews" --target claude
```

Perintah ini mengembalikan komponen yang cocok, profil terkait, dan perintah pratinjau/pasang. Pakai perintah pratinjau sebelum memasang bila kamu ingin memeriksa rencana file yang tepat.

Kamu juga bisa memasang skill atau kapabilitas secara eksplisit:

```bash
./install.sh --target claude --skills tdd-workflow,security-review
node scripts/ecc.js install --profile minimal --target claude --with capability:machine-learning
```

Menyalin komponen satu per satu secara manual juga bisa. Tiap komponen sepenuhnya independen:

```bash
# Hanya agent
mkdir -p ~/.claude/agents
cp agents/*.md ~/.claude/agents/

# Direktori rule (common + khusus bahasa)
mkdir -p ~/.claude/rules/ecc
cp -r rules/common ~/.claude/rules/ecc/
cp -r rules/typescript ~/.claude/rules/ecc/   # pilih stack kamu

# Hanya skill inti/umum (Claude Code memuat skill dari anak langsung
# ~/.claude/skills; jangan menyarangkan pemasangan manual di bawah ~/.claude/skills/ecc/)
mkdir -p ~/.claude/skills
cp -r .agents/skills/* ~/.claude/skills/
cp -r skills/search-first ~/.claude/skills/

# Opsional: kompatibilitas slash-command yang dipertahankan selama migrasi
mkdir -p ~/.claude/commands
cp commands/*.md ~/.claude/commands/
```

Shim yang sudah pensiun ada di `legacy-command-shims/`. Salin file satu per satu dari sana hanya bila kamu masih membutuhkan nama lama seperti `/tdd`.

### Rule lokal proyek, bukan rule global

Pakai rule lokal proyek bila standar ECC harus berlaku untuk satu repositori, bukan setiap sesi Claude Code:

```bash
cd your-project
mkdir -p .claude/rules/ecc
cp -R /path/to/ECC/rules/common .claude/rules/ecc/
cp -R /path/to/ECC/rules/typescript .claude/rules/ecc/
```

Rule adalah konteks yang selalu dimuat, jadi mulailah dengan `common` dan satu paket untuk stack yang benar-benar kamu pakai. Saat menyalin rule secara manual, salin seluruh direktori bahasa (misalnya `rules/common` atau `rules/golang`), bukan file di dalamnya, agar referensi relatif tetap berfungsi dan nama file tidak bertabrakan.

### Pemasangan manual penuh Claude

Pakai ini hanya bila kamu sengaja melewati jalur plugin:

```bash
git clone https://github.com/affaan-m/ECC.git
cd ECC
./install.sh --profile full --enable-hooks
```

Windows:

```powershell
git clone https://github.com/affaan-m/ECC.git
cd ECC
.\install.ps1 --profile full --enable-hooks
```

Contoh-contoh ini mengaktifkan runtime hook otomatis. Untuk memasang tanpa hook, ganti `--enable-hooks` dengan `--no-hooks`.

Kalau kamu memilih jalur ini, berhenti di situ. Jangan juga menjalankan `/plugin install`.

Untuk pemasangan manual pilihan sendiri, Claude menemukan skill sebagai anak langsung `~/.claude/skills/`; jangan menyarangkannya di bawah `~/.claude/skills/ecc/`.

#### Memasang hook

Jangan salin `hooks/hooks.json` mentah dari repo ke `~/.claude/settings.json` atau `~/.claude/hooks/hooks.json`. File itu berorientasi plugin/repo; pakai installer agar path perintah hook ditulis ulang dengan benar:

```bash
bash ./install.sh --target claude --modules hooks-runtime --enable-hooks
```

Itu memasang skrip hook di bawah `~/.claude/` dan mendaftarkan entri hook yang sudah diselesaikan di `~/.claude/settings.json`. Pengaturan dan hook pengguna yang ada dipertahankan; entri milik ECC dilacak dengan ID stabil untuk pembaruan idempoten dan uninstall yang aman.

Kalau kamu memasang ECC lewat `/plugin install`, jangan salin hook itu ke `settings.json`. Claude Code v2.1+ sudah memuat otomatis `hooks/hooks.json` plugin, dan menduplikasinya di `settings.json` menyebabkan eksekusi ganda dan konflik hook lintas platform.

Di Windows, root konfigurasi Claude adalah `%USERPROFILE%\.claude`; pasang runtime hook dengan:

```powershell
pwsh -File .\install.ps1 --target claude --modules hooks-runtime --enable-hooks
```

#### Mengonfigurasi MCP

Pemasangan plugin Claude sengaja tidak mengaktifkan otomatis definisi server MCP bawaan ECC. Ini menghindari nama tool MCP plugin yang terlalu panjang pada gateway pihak ketiga yang ketat, sambil tetap menyediakan setup MCP manual.

Pakai perintah `/mcp` Claude Code atau setup MCP yang dikelola CLI untuk perubahan server Claude Code langsung; Claude Code menyimpan pilihan itu di `~/.claude.json`. Untuk akses MCP lokal repo, salin definisi server MCP yang diinginkan dari `mcp-configs/mcp-servers.json` ke `.mcp.json` lingkup proyek.

ECC hanya menyertakan satu konektor default (`chrome-devtools`); yang lainnya adalah skill yang membungkus CLI/REST API atau entri katalog opt-in. Aturan dan audit Juni 2026 yang mempensiunkan enam default sebelumnya ada di [docs/MCP-CONNECTOR-POLICY.md](https://github.com/affaan-m/ECC/blob/main/docs/MCP-CONNECTOR-POLICY.md).

Kalau kamu sudah menjalankan salinan MCP bawaan ECC milikmu sendiri, setel:

```bash
export ECC_DISABLED_MCPS="chrome-devtools"
```

Alur pemasangan dan sync Codex yang dikelola ECC akan melewati atau menghapus server bawaan itu alih-alih menambahkan duplikat. `ECC_DISABLED_MCPS` adalah filter pemasangan/sync ECC, bukan sakelar langsung Claude Code.

**Penting:** Ganti placeholder `YOUR_*_HERE` dengan API key milikmu yang sebenarnya.

### Perintah multi-model membutuhkan setup tambahan

Perintah `multi-*` **tidak** tercakup oleh pemasangan plugin/rule dasar.

Untuk memakai `/multi-plan`, `/multi-execute`, `/multi-backend`, `/multi-frontend`, dan `/multi-workflow`, kamu juga harus memasang runtime `ccg-workflow`. Pilih dan tinjau rilis yang tepat memakai [panduan pemasangan CCG hulu](https://github.com/fengshao1227/ccg-workflow#readme), lalu inisialisasi runtime terpasang itu. ECC tidak membundel CCG atau menjamin rilis CCG yang kompatibel dan teraudit; panduan ini tidak melakukan bootstrap versi registri yang tidak ditentukan.

Runtime itu menyediakan dependensi eksternal yang diharapkan perintah-perintah ini, termasuk `~/.claude/bin/codeagent-wrapper` dan `~/.claude/.ccg/prompts/*`. Tanpa `ccg-workflow`, perintah `multi-*` tidak akan berjalan dengan benar.

### Astra review membutuhkan Codex CLI

`/astra-review` mengirim kode yang ditulis Claude ke GPT-6-Astra untuk review lintas penyedia yang independen. Ia menjalankan [Codex CLI](https://github.com/openai/codex) yang terpasang secara lokal dengan login ChatGPT kamu (`codex login`); tidak butuh API key OpenAI, dan API key di lingkunganmu tidak diteruskan. Memanggil perintah ini berarti kamu menyetujui pengiriman diff itu ke OpenAI. Setup, scope, gerbang push, dan pemecahan masalah ada di [Astra Review Guide](https://github.com/affaan-m/ECC/blob/main/docs/ASTRA-REVIEW-GUIDE.md).

### Reset, perbaiki, atau uninstall

Kalau kamu memasang dari paket universal, jalankan perintah ini dari direktori proyek yang sama dengan yang dipakai saat pemasangan:

```bash
npx ecc-universal@2.2.3 list-installed
npx ecc-universal@2.2.3 doctor
npx ecc-universal@2.2.3 repair
npx ecc-universal@2.2.3 uninstall --dry-run
npx ecc-universal@2.2.3 uninstall
```

Dari source checkout, periksa status terkelola sebelum memasang ulang:

```bash
node scripts/ecc.js list-installed
node scripts/ecc.js doctor
node scripts/ecc.js repair
node scripts/ecc.js uninstall --dry-run
```

Untuk uninstall langsung dari source checkout:

```bash
node scripts/uninstall.js --dry-run
node scripts/uninstall.js
```

Kalau kamu berhenti memakainya, perintah uninstall mencetak [formulir umpan balik 20 detik](https://github.com/affaan-m/ECC/issues/new?template=quick-feedback.yml) opsional. Itu issue GitHub publik, tidak pernah menghalangi uninstall, dan ECC tidak mengunggah diagnostik. Kamu juga bisa menjalankan `ecc feedback` kapan saja.

Pengguna plugin sebaiknya menghapus plugin dari Claude Code, lalu menghapus hanya folder rule yang mereka salin secara manual dan tidak lagi diinginkan. ECC hanya menghapus file yang tercatat di install-state-nya. Ia tidak mengklaim file lain di direktori harness kamu.

Kalau kamu menumpuk metode, bersihkan dengan urutan ini:

1. Hapus pemasangan plugin Claude Code.
2. Jalankan perintah uninstall ECC dari direktori proyek yang berisi install-state terkelola.
3. Hapus folder rule tambahan yang kamu salin manual dan tidak lagi diinginkan.
4. Pasang ulang sekali, memakai satu jalur.

## Mulai memakai ECC

Mulai dari alur kerja yang kamu butuhkan, bukan seluruh katalog.

| Yang sedang kamu lakukan | Mulai di sini |
|---|---|
| Membangun fitur | `/ecc:plan "describe the feature"`, lalu `tdd-workflow` |
| Memperbaiki bug | Reproduksi dengan tes yang gagal, lalu pakai `tdd-workflow` |
| Meninjau kode baru | `/code-review` untuk review konteks segar |
| Triase issue GitHub | `/ecc:issue-review <number>` (plugin) atau `/issue-review <number>` (pemasangan manual) untuk memverifikasinya terhadap kode dan menyusun balasan |
| Memperbaiki build | `/build-fix` |
| Membersihkan codebase | `/refactor-clean` |
| Memeriksa tekanan konteks | `/context-budget` |
| Mengakhiri sesi panjang | `/save-session` atau `/learn-eval` |
| Melanjutkan nanti | `/resume-session` |
| Mengaudit konfigurasi agent | `/security-scan` dengan pemindai yang sudah ditinjau, atau `agentshield scan --path .` yang sudah terpasang |

Perintah plugin Claude Code memakai bentuk ber-namespace: `/ecc:plan "Add authentication"`. Pemasangan manual mungkin menyediakan bentuk kompatibilitas yang lebih pendek: `/plan "Add authentication"`. Skill adalah permukaan alur kerja utama. Perintah tetap menjadi pintu masuk yang nyaman dan shim kompatibilitas. Periksa apa yang terpasang dengan:

```bash
/plugin list ecc@ecc
```

**Agent mana yang harus saya pakai?**

| Saya ingin... | Pakai permukaan ini | Agent yang dipakai |
|--------------|-----------------|------------|
| Merencanakan fitur baru | `/ecc:plan "Add auth"` | planner |
| Merancang arsitektur sistem | `/ecc:plan` + agent architect | architect |
| Menulis kode dengan tes dulu | skill `tdd-workflow` | tdd-guide |
| Meninjau kode yang baru saya tulis | `/code-review` | code-reviewer |
| Meninjau issue GitHub | `/ecc:issue-review` (plugin), `/issue-review` (pemasangan manual) | skill issue-review |
| Memperbaiki build yang gagal | `/build-fix` | build-error-resolver |
| Menjalankan tes end-to-end | skill `e2e-testing` | e2e-runner |
| Mencari kerentanan keamanan | `/security-scan` | security-reviewer |
| Menghapus kode mati | `/refactor-clean` | refactor-cleaner |
| Memperbarui dokumentasi | `/update-docs` | doc-updater |
| Meninjau kode Go | `/go-review` | go-reviewer |
| Meninjau kode Python | `/python-review` | python-reviewer |
| Meninjau kode F# | panggil `fsharp-reviewer` langsung | fsharp-reviewer |
| Meninjau kode TypeScript/JavaScript | panggil `typescript-reviewer` langsung | typescript-reviewer |
| Mengembangkan aplikasi HarmonyOS | panggil `harmonyos-app-resolver` langsung | harmonyos-app-resolver |
| Mengaudit kueri database | (didelegasikan otomatis) | database-reviewer |
| Meninjau perubahan ML produksi | skill `mle-workflow` + agent `mle-reviewer` | mle-reviewer |

**Alur kerja umum**

Memulai fitur baru:

```
/ecc:plan "Add user authentication with OAuth"
                                              -> planner membuat cetak biru implementasi
tdd-workflow skill                            -> tdd-guide menegakkan tulis-tes-dulu
/code-review                                  -> code-reviewer memeriksa pekerjaanmu
```

Memperbaiki bug:

```
tdd-workflow skill                            -> tdd-guide: tulis tes gagal yang mereproduksinya
                                              -> implementasikan perbaikan, verifikasi tes lulus
/code-review                                  -> code-reviewer: tangkap regresi
```

Menyiapkan produksi:

```
/security-scan                                -> security-reviewer: audit OWASP Top 10
e2e-testing skill                             -> e2e-runner: tes alur pengguna kritis
/test-coverage                                -> verifikasi cakupan 80%+
```

## Model self-hosted dan endpoint kustom

ECC bekerja lewat konfigurasi normal tiap harness, sehingga kamu bisa memakai penyedia resmi, endpoint API kustom yang kompatibel atau gateway model, atau model self-hosted tanpa mengubah alur kerja ECC.

Untuk Claude Code, ECC tidak mematok pengaturan transport yang di-host Anthropic. Contoh gateway minimal:

```bash
export ANTHROPIC_BASE_URL=https://your-gateway.example.com
export ANTHROPIC_AUTH_TOKEN=your-token
claude
```

Kalau gateway kamu memetakan ulang nama model, konfigurasikan itu di Claude Code, bukan di ECC. Hook, skill, perintah, dan rule ECC tidak bergantung pada penyedia model begitu CLI `claude` sudah berfungsi. Lihat [dokumentasi LLM gateway](https://docs.anthropic.com/en/docs/claude-code/llm-gateway) dan [dokumentasi konfigurasi model](https://docs.anthropic.com/en/docs/claude-code/model-config) Anthropic.

Jalankan atau host sendiri model open source apa pun di balik gateway itu memakai setup komputasi dan serving terpisah. Kalau kamu butuh kapasitas GPU, [Itô](https://compute.itomarkets.com) adalah sponsor komputasi pilihan ECC; penyedia GPU apa pun bisa dipakai. Tautan sponsor bersifat pasif: tidak memanggil RFQ, mereservasi kapasitas, menyediakan komputasi, atau mengonfigurasi serving.

**Host sendiri Kimi dengan ECC.** Harness Kimi Code dan lapisan penyaji model itu terpisah. ECC mengonfigurasi harness agent; kamu membawa endpoint API ([dapatkan API key Kimi](https://platform.kimi.ai?aff=ecc)) atau meng-host sendiri model Kimi open-weight di kapasitas GPU milikmu. Adapter ini diverifikasi terhadap Kimi Code 0.31.x (`@moonshot-ai/kimi-code`). Konfigurasikan endpoint dengan [panduan provider resmi](https://moonshotai.github.io/kimi-cli/en/configuration/providers.html) Kimi Code, lalu pasang ECC:

```bash
bash ./install.sh --target kimi --profile minimal
node scripts/ecc.js doctor --target kimi
kimi
```

Kimi Code menemukan instruksi `.kimi-code/AGENTS.md` dan alur kerja `.kimi-code/skills/` yang terpasang secara native; `.agents/skills/` tingkat proyek juga merupakan lokasi penemuan resmi. ECC menggabungkan entri MCP proyek dengan aman ke `.kimi-code/mcp.json` dan tidak mengubah `~/.kimi-code/config.toml` tingkat pengguna. Kimi Code mendukung hook native, tetapi adapter proyek-terkelola ECC saat ini tidak mengonfigurasinya, sehingga installer ini tidak menawarkan profil hook Kimi.

README juga memuat bagian jembatan CLI komputasi Itô (`ecc ito`). Bagian itu tidak diterjemahkan di sini karena paket `ito-compute-cli` belum dipublikasikan dan hanya tersedia untuk mitra desain. Lihat [README aslinya](https://github.com/affaan-m/ECC/blob/main/README.md).

## Isi repositori

```text
ECC/
|-- agents/           # 71 subagent khusus untuk delegasi
|-- skills/           # 314 alur kerja yang bisa dipakai ulang, dimuat sesuai kebutuhan
|-- commands/         # 98 shim slash-command yang dipertahankan
|-- rules/            # standar common dan bahasa yang opt-in
|-- hooks/            # otomatisasi dan penegakan runtime
|-- scripts/          # pemasangan, perbaikan, sync, orkestrasi, dan pemeriksaan
|-- .claude-plugin/   # manifest marketplace Claude Code
|-- .codex/           # konfigurasi referensi Codex dan peran agent
|-- .opencode/        # plugin, perintah, dan instruksi OpenCode
|-- .cursor/          # rule dan adapter hook Cursor
|-- docs/             # panduan setup, arsitektur, dan operasi publik
```

Root adalah sumber kebenaran. Adapter platform mengemas atau memetakan alur kerja yang sama alih-alih memelihara salinan terpisah. README asli memuat katalog komponen beranotasi yang sangat panjang (daftar semua agent, skill, perintah, rule, hook, dan skrip); bagian itu tidak diterjemahkan di sini. Lihat [README aslinya](https://github.com/affaan-m/ECC/blob/main/README.md).

Dashboard GUI desktop untuk menjelajahi komponen ECC secara visual (antarmuka bertab Agents, Skills, Commands, Rules, Settings; tema gelap/terang; pencarian dan filter):

```bash
npm run dashboard
# atau
python3 ./ecc_dashboard.py
```

## Konsep utama

**Agent** menangani tugas yang didelegasikan dengan cakupan terbatas. Contoh:

```markdown
---
name: code-reviewer
description: Reviews code for quality, security, and maintainability
tools: Read, Grep, Glob, Bash
model: opus
---

You are a senior code reviewer...
```

**Skill** adalah permukaan alur kerja utama. Skill bisa dipanggil langsung, disarankan otomatis, dan dipakai ulang oleh agent. ECC masih menyertakan `commands/` yang dipertahankan selama migrasi, sementara shim nama pendek yang sudah pensiun ada di `legacy-command-shims/` hanya untuk opt-in eksplisit. Pengembangan alur kerja baru harus masuk ke `skills/` lebih dulu.

```markdown
# TDD Workflow

1. Define interfaces first
2. Write failing tests (RED)
3. Implement minimal code (GREEN)
4. Refactor (IMPROVE)
5. Verify 80%+ coverage
```

**Hook** dipicu pada event tool. Contoh: peringatan soal console.log:

```json
{
  "matcher": "tool == \"Edit\" && tool_input.file_path matches \"\\\\.(ts|tsx|js|jsx)$\"",
  "hooks": [{
    "type": "command",
    "command": "#!/bin/bash\ngrep -n 'console\\.log' \"$file_path\" && echo '[Hook] Remove console.log' >&2"
  }]
}
```

**Rule** adalah pedoman yang selalu diikuti, diorganisasi ke `common/` (tidak bergantung bahasa) + direktori khusus bahasa:

```
rules/
  common/          # Prinsip universal (selalu pasang)
  typescript/      # Pola dan alat khusus TS/JS
  python/          # Pola dan alat khusus Python
  golang/          # Pola dan alat khusus Go
  swift/           # Pola dan alat khusus Swift
  php/             # Pola dan alat khusus PHP
  arkts/           # Pola dan batasan HarmonyOS / ArkTS
```

Lihat [`rules/README.md`](https://github.com/affaan-m/ECC/blob/main/rules/README.md) untuk detail pemasangan dan struktur.

## Panduan

Repositori ini adalah kode mentahnya. Panduan menjelaskan semuanya.

- [The Shorthand Guide](https://github.com/affaan-m/ECC/blob/main/the-shortform-guide.md): setup, dasar, dan pemakaian hari pertama. **Baca ini dulu.**
- [The Longform Guide](https://github.com/affaan-m/ECC/blob/main/the-longform-guide.md): ekonomi konteks, memori, eval, dan agent paralel.
- [The Security Guide](https://github.com/affaan-m/ECC/blob/main/the-security-guide.md): prompt injection, hook, MCP, dan AgentShield.

| Topik | Yang akan kamu pelajari |
|-------|-------------------|
| Optimasi token | Pemilihan model, memangkas system prompt, proses latar belakang |
| Persistensi memori | Hook yang menyimpan/memuat konteks lintas sesi secara otomatis |
| Pembelajaran berkelanjutan | Mengekstrak pola dari sesi menjadi skill yang bisa dipakai ulang |
| Loop verifikasi | Eval checkpoint vs berkelanjutan, jenis grader, metrik pass@k |
| Paralelisasi | Git worktree, metode cascade, kapan menambah instans |
| Orkestrasi subagent | Masalah konteks, pola iterative retrieval |

[Commands Quick Reference](https://github.com/affaan-m/ECC/blob/main/COMMANDS-QUICK-REF.md) | [Manual Adaptation Guide](https://github.com/affaan-m/ECC/blob/main/docs/MANUAL-ADAPTATION-GUIDE.md) | [Astra Review Guide](https://github.com/affaan-m/ECC/blob/main/docs/ASTRA-REVIEW-GUIDE.md) | [Troubleshooting FAQ](https://github.com/affaan-m/ECC/blob/main/TROUBLESHOOTING.md) | [Roadmap](https://github.com/affaan-m/ECC/blob/main/docs/ROADMAP.md)

## Mengapa memilih ECC?

| Tanpa sistem | Dengan ECC |
| --- | --- |
| Rencana hilang dalam riwayat chat | Rencana menjadi artefak yang bisa diedit sebelum implementasi dimulai |
| "Tolong pakai TDD" adalah instruksi yang bisa dilupakan model | TDD menjadi alur RED -> GREEN -> REFACTOR yang digerbangi dengan bukti |
| Konteks yang sama menulis dan meninjau kode | Peninjau dengan konteks segar mencari regresi dan titik buta |
| Memori berarti menyimpan transkrip yang sangat besar | Sesi disarikan menjadi ringkasan, instinct, dan skill yang bisa dipakai ulang |
| Pemeriksaan kualitas bergantung pada pengingat | Hook bisa menegakkan pemeriksaan deterministik di luar prompt |
| Konfigurasi agent dipercaya secara default | AgentShield memindai harness itu sendiri sebagai permukaan serangan |

### TDD: Test-Driven Development

```text
/ecc:plan "Add usage-based billing alerts"
  -> konfirmasi atau edit rencana
  -> aktifkan tdd-workflow
  -> tangkap bukti RED sebelum implementasi
  -> implementasikan sampai GREEN
  -> review dari konteks segar
  -> perbaiki temuan dengan tes regresi
  -> verifikasi build, lint, tipe, dan tes
```

Hasilnya bukan sekadar kode. Hasilnya jejak bukti: rencana, tes yang gagal, tes yang lulus, temuan review, dan verifikasi akhir.

### Skill menjaga konteks tetap fokus

Rule, skill, agent, dan hook menyelesaikan masalah yang berbeda. Memisahkan tugas-tugas itu adalah cara ECC menambah kapabilitas tanpa membuang seluruh repositori ke setiap sesi.

| Konsep | Fungsinya | Perilaku konteks |
|---|---|---|
| Skill | Alur kerja yang bisa dipakai ulang seperti TDD, review keamanan, atau riset mendalam | Dimuat saat tugas membutuhkannya |
| Agent | Pekerja bercakupan dengan konteks dan izin tool sendiri | Mengisolasi perencanaan, implementasi, dan review |
| Rule | Standar proyek atau bahasa yang tahan lama | Selalu dimuat, jadi pasang secara selektif |
| Hook | Skrip yang dipicu event harness | Berjalan di luar konteks model |
| Instinct | Pola yang dipelajari dari sesi nyata dengan skor keyakinan | Dipanggil bila relevan |

### Berbagi konteks antar harness

Memory Vault ECC memberi Claude, Codex, Hermes, OpenClaw, Kimi, dan harness lain satu format Markdown lokal yang bisa diperiksa untuk konteks tahan lama dan serah terima. Memori proyek dan tim ada di bawah `.ecc/memory/`; memori pengguna ada di bawah `~/.ecc/memory/`.

Pemasangan hanya-skill, minimal, manual, dan plugin Claude tidak menaruh runtime Memory Vault di `PATH`. Pasang runtime npm secara terpisah sebelum memakai CLI atau server MCP opsional:

```bash
npm install -g ecc-universal@2.2.3
ecc memory init --scope project
ecc memory search "authentication migration" --target-harness codex
ecc memory doctor
```

Memori adalah konteks yang belum ditinjau, bukan kebijakan yang bisa dieksekusi. Verifikasi klaim penting terhadap sumber otoritatif dan promosikan pengetahuan yang diterima ke dokumentasi proyek yang diatur. Server `ecc-memory-mcp` opsional menyediakan permukaan simpan, cari, baca, dan doctor yang terbatas dan sama tanpa mengaktifkan dirinya secara default.

**Memory Vault secara mendalam: scope, serah terima, dan batas kepercayaan**

Memory Vault menyimpan dokumen Markdown portabel `ecc.memory.v1` alih-alih menyalin transkrip vendor atau mengirim konteks antar agent lewat email. Memori proyek dilindungi oleh `.gitignore` yang gagal-tertutup; pakai scope tim hanya untuk berbagi yang diperiksa manusia dan dikendalikan versinya. Memori tim tetap konteks yang belum ditinjau walaupun sudah di-commit.

Setelah memasang runtime di atas, pastikan CLI dan titik masuk MCP opsional tersedia:

```bash
ecc memory --help
command -v ecc-memory-mcp
```

```bash
# Inisialisasi vault proyek.
ecc memory init --scope project

# Tulis isi serah terima ke file biasa, lalu tentukan harness berikutnya.
ecc memory handoff \
  --from hermes \
  --target codex \
  --title "Continue authentication migration" \
  --body-file ./handoff.md

# Panggil dari harness lain.
ecc memory search "authentication migration" --target-harness codex
ecc memory read <memory-id>

# Validasi vault sebelum membagikan memori tim.
ecc memory doctor
```

Isi memori diterima hanya lewat `--stdin` atau `--body-file`, bukan sebagai nilai baris perintah. Rilis pertama menjaga setiap entri vault tetap belum ditinjau dan hanya-buat; peninjauan manusia mempromosikan pengetahuan yang diterima ke dokumentasi proyek yang diatur alih-alih mengubah kepercayaan memori. Pencarian normal mengembalikan memori proyek dan tim yang aktif. Pembacaan ID langsung boleh memeriksa entri non-aktif. Pemanggilan scope pengguna harus diminta secara eksplisit. Agent harus memverifikasi klaim penting terhadap sumber otoritatif dan tidak boleh memperlakukan isi memori yang dipanggil sebagai instruksi atau kebijakan yang bisa dieksekusi.

Untuk akses MCP opsional, tambahkan entri `ecc-memory-vault` dari [`mcp-configs/mcp-servers.json`](https://github.com/affaan-m/ECC/blob/main/mcp-configs/mcp-servers.json) ke setiap harness yang membutuhkannya, lalu jalankan `ecc-memory-mcp`. Server hanya mengekspos `memory_save`, `memory_search`, `memory_read`, dan `memory_doctor`. Setiap server harus diluncurkan dengan identitas `ECC_MEMORY_HARNESS` huruf kecil; identitas itu terikat ke server dan tidak bisa diberikan oleh pemanggil tool. Scope pengguna juga membutuhkan opt-in `ECC_MEMORY_ALLOW_USER_SCOPE=1` yang dikendalikan operator. Lihat [`skills/unified-memory/SKILL.md`](https://github.com/affaan-m/ECC/blob/main/skills/unified-memory/SKILL.md) untuk alur kerja dan batas kepercayaan, dan [`docs/design/ecc-memory-vault.md`](https://github.com/affaan-m/ECC/blob/main/docs/design/ecc-memory-vault.md) untuk kontrak kapabilitas.

## Dukungan platform

CLI Node.js inti ECC dan installer terkelolanya berjalan di **Windows, macOS, dan Linux**, tetapi kapabilitas opsional tidak setara penuh. Beberapa jalur pembelajaran berkelanjutan, GAN, dan orkestrasi masih membutuhkan Bash atau Python; harness juga menyediakan API hook, agent, dan skill yang berbeda.

| Platform | Status | Keterbatasan saat ini |
|---|---|---|
| Linux | Inti didukung | Fitur opsional mungkin membutuhkan Bash, Python, atau alat khusus provider. |
| macOS | Inti didukung | Jalur shell GAN mandiri tidak kompatibel dengan Bash 3.2 bawaan sistem dan saat ini punya cacat parsing skor ([#2674](https://github.com/affaan-m/ECC/issues/2674)). |
| Windows + WSL | Inti didukung | WSL mengikuti jalur Linux; integrasi host Windows masih bervariasi menurut harness. |
| Windows native | Didukung dengan keterbatasan | Daemon observer pembelajaran berkelanjutan v2 dan penulisan memory-vault punya cacat terbuka di Windows native ([#2489](https://github.com/affaan-m/ECC/issues/2489), [#2626](https://github.com/affaan-m/ECC/issues/2626)). Fitur opsional berbasis shell membutuhkan Git Bash/WSL atau tidak tersedia. |

Perlakukan `stable`, `beta`, `experimental`, dan `instruction-only` di bawah ini sebagai pernyataan kapabilitas, bukan tingkatan pemasaran.

| Harness | Status | Distribusi yang disarankan | Keterbatasan penting |
|---|---|---|---|
| Claude Code | Utama, stabil | Plugin atau installer selektif | Plugin mengiklankan katalog terpasang ke model; pakai profil selektif/manual bila jejak konteks penting. Skill berbasis shell opsional tidak portabel ke setiap OS. |
| Codex | Plugin native didukung | Plugin marketplace Codex atau konfigurasi repo | Hook native membutuhkan keputusan kepercayaan eksplisit dan tidak memakai profil hook Claude. Sync lama hanya untuk kompatibilitas. |
| Qoder | Plugin native didukung | Direktori plugin lokal di Qoder CLI atau unggah ZIP di Qoder IDE | Memuat skill, agent, perintah, dan konfigurasi MCP kanonik; hanya hook SessionStart yang sudah ditinjau yang aktif, dan Node.js 18+ harus ada di PATH non-interaktif. |
| Cursor | Adapter proyek beta | Installer selektif ke `.cursor/` | Penemuan agent bervariasi menurut build Cursor; event hook memakai dispatcher berbasis profil, tetapi kesetaraan fitur penuh dengan Claude Code tidak diklaim. |
| OpenCode | Plugin hasil build beta | Build plugin, lalu installer selektif | ECC menyertakan subset katalog; hubungkan provider dan pilih model di OpenCode ([#2617](https://github.com/affaan-m/ECC/issues/2617)). |
| GitHub Copilot Chat | Hanya instruksi | File instruksi dan prompt yang di-commit | Hook ECC tidak diadaptasi. |
| GitHub Copilot CLI | Adapter proyek beta | `--target copilot` menaruh skill, agent hasil adaptasi, dan rule hasil konversi di `.github/` | Hook dan shim perintah ECC tidak dipasang oleh target ini. |
| Gemini, Zed, Antigravity, Qwen, Hermes, OpenClaw, Kimi, CodeBuddy, JoyCode | Adapter eksperimental/minimal | Target selektif khusus harness | Penempatan file dan portabilitas instruksi diuji; kesetaraan fitur penuh dengan Claude tidak diklaim. |

**Deteksi package manager**

Plugin otomatis mendeteksi package manager pilihanmu (npm, pnpm, yarn, atau bun) dengan prioritas berikut: variabel lingkungan `CLAUDE_PACKAGE_MANAGER`, konfigurasi proyek `.claude/package-manager.json`, field `packageManager` di package.json, deteksi dari lock file (package-lock.json, yarn.lock, pnpm-lock.yaml, atau bun.lockb), konfigurasi global `~/.claude/package-manager.json`, lalu cadangan: package manager pertama yang tersedia.

```bash
# Lewat variabel lingkungan
export CLAUDE_PACKAGE_MANAGER=pnpm

# Lewat konfigurasi global
node scripts/setup-package-manager.js --global pnpm

# Lewat konfigurasi proyek
node scripts/setup-package-manager.js --project bun

# Deteksi pengaturan saat ini
node scripts/setup-package-manager.js --detect
```

Atau pakai perintah `/setup-pm`.

**Kontrol runtime hook (variabel lingkungan)**

Pakai flag runtime untuk menyetel ketatnya atau menonaktifkan hook tertentu sementara:

```bash
# Profil ketatnya hook (default: standard)
export ECC_HOOK_PROFILE=standard

# ID hook yang dinonaktifkan, dipisah koma
export ECC_DISABLED_HOOKS="pre:bash:tmux-reminder,post:edit:typecheck"

# Batasi konteks tambahan SessionStart (default: 8000 karakter)
export ECC_SESSION_START_MAX_CHARS=4000

# Matikan konteks tambahan SessionStart sepenuhnya untuk setup konteks rendah/model lokal
export ECC_SESSION_START_CONTEXT=off

# Jendela retensi session-tmp dalam hari (default: 30).
# Setel ke 0, off, false, disabled, never, atau none untuk menyimpan semua sesi (menonaktifkan pemangkasan).
export ECC_SESSION_RETENTION_DAYS=14

# Batasi berapa banyak instinct yang dipelajari yang disuntikkan SessionStart ke konteks (default: 6)
export ECC_MAX_INJECTED_INSTINCTS=6

# Keyakinan minimum yang dibutuhkan instinct untuk disuntikkan, 0-1 (default: 0.7)
export ECC_INSTINCT_CONFIDENCE_THRESHOLD=0.7

# SessionStart mengurutkan instinct yang disuntikkan berdasarkan keyakinan + relevansi proyek/stack
# (default: on). Setel ke off/false/0/no untuk mengurutkan hanya berdasarkan keyakinan.
export ECC_INSTINCT_RELEVANCE_RANKING=on

# Pertahankan peringatan konteks/scope/loop tetapi tekan estimasi biaya tarif API
export ECC_CONTEXT_MONITOR_COST_WARNINGS=off
```

Windows PowerShell:

```powershell
[Environment]::SetEnvironmentVariable('ECC_CONTEXT_MONITOR_COST_WARNINGS', 'off', 'User')
[Environment]::SetEnvironmentVariable('ECC_SESSION_RETENTION_DAYS', '14', 'User')
```

**Agent data home (isolasi multi-harness)**

Hook persistensi memori (ringkasan sesi, skill yang dipelajari, alias sesi, metrik) menyimpan data di bawah satu root data agent. Secara default root itu adalah `~/.claude`. Bila kamu memakai ECC di Claude Code dan Cursor di mesin yang sama, setel root terpisah untuk Cursor agar kedua lingkungan tidak saling menimpa file sesi:

```bash
# Batas khusus Cursor (Claude Code tetap memakai default ~/.claude)
export ECC_AGENT_DATA_HOME="$HOME/.cursor/ecc"
```

Path yang diselesaikan di bawah root itu mencakup `session-data/` (ringkasan sesi), `skills/learned/` (skill yang dipelajari dari evaluate-session), `session-aliases.json` (alias sesi), dan `metrics/` (metrik biaya dan aktivitas).

**Peta kapabilitas lintas alat dan keputusan arsitektur**

| Kapabilitas | Claude Code | Codex | Cursor | OpenCode | GitHub Copilot |
|---|---|---|---|---|---|
| Instruksi | Native | `AGENTS.md` native | Rule proyek | Instruksi plugin | File instruksi native |
| Skill | Set terpasang native | Set plugin native | Bergantung build/set proyek | Subset hasil build | Penemuan native (Copilot CLI) dari `.github/skills/`, `.agents/skills/`, `.claude/skills/` |
| Agent/delegasi | Agent native | Peran multi-agent Codex; file agent Claude tidak dipasang sebagai peran | Agent proyek bergantung build | Agent plugin | Agent kustom Copilot CLI lewat `.github/agents/` dan `--agent` |
| Hook ECC | Hook plugin native | Subset native yang ditinjau dengan kepercayaan eksplisit | Adapter hook Cursor; perbedaan jalur pemasangan tetap ada | Event plugin | Tidak di-port; Copilot CLI punya sistem hook plugin sendiri |
| Konfigurasi MCP | Tersedia, aktivasi eksplisit | Manifest plugin native; sync lama bisa menggabungkan TOML | Konfigurasi proyek/pengguna eksplisit | Konfigurasi provider/plugin | Tidak disediakan ECC |
| Kesetaraan dengan Claude Code | Acuan utama | Sebagian | Sebagian | Sebagian | Sebagian |

Keputusan arsitektur utama:
- **AGENTS.md** di root adalah file lintas alat yang universal (dibaca oleh Claude Code, Cursor, Codex, dan OpenCode; GitHub Copilot memakai `.github/copilot-instructions.md`)
- **Pola adapter DRY** memungkinkan Cursor memakai ulang skrip hook Claude Code tanpa duplikasi
- **Format skill** (SKILL.md dengan frontmatter YAML) bekerja di Claude Code, Codex, OpenCode, dan GitHub Copilot CLI
- Set hook native Codex yang lebih sempit dilengkapi oleh `AGENTS.md`, override `model_instructions_file` opsional, dan izin sandbox

## Optimasi token

Pemakaian agent bisa mahal bila kamu tidak mengelola konsumsi token. Pengaturan ini mengurangi biaya secara signifikan tanpa mengorbankan kualitas. Panduan lengkap: [docs/token-optimization.md](https://github.com/affaan-m/ECC/blob/main/docs/token-optimization.md).

Pengaturan yang disarankan, tambahkan ke `~/.claude/settings.json`:

```json
{
  "model": "sonnet",
  "env": {
    "CLAUDE_CODE_EFFORT_LEVEL": "medium",
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "50",
    "CLAUDE_CODE_SUBAGENT_MODEL": "haiku"
  }
}
```

Pengaturan effort membutuhkan model yang mendukung kontrol effort. Di Amazon Bedrock, Agent Platform Google Cloud, dan Microsoft Foundry, alias `sonnet` saat ini diselesaikan ke Sonnet 4.5, yang tidak mendukung kontrol effort. Pilih model yang mendukung effort dari penyedia kamu, atau hilangkan `CLAUDE_CODE_EFFORT_LEVEL`.

| Pengaturan | Default | Disarankan | Dampak |
|---------|---------|-------------|--------|
| `model` | opus | **sonnet** | ~60% pengurangan biaya; menangani 80%+ tugas coding |
| `CLAUDE_CODE_EFFORT_LEVEL` | Bergantung model | **medium**, bila didukung | Mengatur kedalaman penalaran adaptif pada model yang mendukung kontrol effort; effort lebih rendah menukar kedalaman penalaran dengan latensi dan biaya |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | 95 | **50** | Mengompaksi lebih awal, kualitas lebih baik pada sesi panjang |
| `ECC_CONTEXT_MONITOR_COST_WARNINGS` | on | **off untuk pengguna langganan** | Menekan peringatan estimasi tarif API yang ditujukan ke agent sambil mempertahankan peringatan konteks/scope/loop |

Untuk model dengan anggaran tetap, `MAX_THINKING_TOKENS` mengatur anggaran berpikir. Pada Opus 4.6 atau Sonnet 4.6, setel juga `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` untuk memakai mode itu. Nilai token positif tidak membatasi penalaran adaptif; lihat [rule performa](https://github.com/affaan-m/ECC/blob/main/rules/common/performance.md#extended-thinking--plan-mode).

Beralih ke Opus hanya bila kamu butuh penalaran arsitektur mendalam: `/model opus`.

| Perintah | Kapan dipakai |
|---------|-------------|
| `/model sonnet` | Default untuk kebanyakan tugas |
| `/model opus` | Arsitektur kompleks, debugging, penalaran mendalam |
| `/clear` | Antar tugas yang tidak berkaitan (gratis, reset instan) |
| `/compact` | Pada titik henti tugas yang logis (riset selesai, milestone tercapai) |
| `/cost` | Memantau pengeluaran token selama sesi |

Kompaksi strategis: skill `strategic-compact` menyarankan `/compact` pada titik henti logis alih-alih mengandalkan kompaksi otomatis di 95% konteks. Kapan harus kompaksi: setelah riset/eksplorasi sebelum implementasi, setelah menyelesaikan milestone sebelum memulai yang berikutnya, setelah debugging sebelum melanjutkan pekerjaan fitur, dan setelah pendekatan yang gagal sebelum mencoba yang baru. Kapan JANGAN kompaksi: di tengah implementasi (kamu akan kehilangan nama variabel, path file, dan status parsial).

Manajemen context window. **Kritis:** jangan aktifkan semua MCP sekaligus. Deskripsi tiap tool MCP memakan token dari window 200k kamu, berpotensi menguranginya menjadi ~70k. Jaga di bawah 10 MCP aktif per proyek dan di bawah 80 tool aktif; pakai `/mcp` untuk menonaktifkan server MCP Claude Code yang tidak dipakai; pakai `ECC_DISABLED_MCPS` hanya untuk menyaring konfigurasi MCP buatan ECC saat pemasangan/sync; bila konteks terasa berat, jalankan `/context-budget` dan hapus rule yang tidak kamu butuhkan. **Peringatan biaya Agent teams:** Agent Teams memunculkan banyak context window dan tiap anggota tim mengonsumsi token sendiri. Pakai hanya untuk tugas yang paralelismenya memberi nilai jelas.

## Persyaratan

**Versi minimum Claude Code CLI: v2.1.0 atau lebih baru.** Plugin membutuhkan Claude Code CLI v2.1.0+ karena perubahan cara sistem plugin menangani hook. Periksa versimu:

```bash
claude --version
```

Perilaku pemuatan otomatis hook: Claude Code v2.1+ **memuat otomatis** `hooks/hooks.json` dari plugin terpasang mana pun menurut konvensi. Mendeklarasikannya secara eksplisit di `plugin.json` menyebabkan error deteksi duplikat (`Duplicate hooks file detected: ./hooks/hooks.json resolves to already-loaded file`). Untuk kontributor: jangan menambahkan field `"hooks"` ke `.claude-plugin/plugin.json`; ini ditegakkan oleh tes regresi.

## Keamanan

Pasang ECC hanya dari sumber resmi:

- Repositori GitHub: <https://github.com/affaan-m/ECC>
- Plugin Claude Code: `ecc@ecc`
- Paket npm: [`ecc-universal`](https://www.npmjs.com/package/ecc-universal) dan [`ecc-agentshield`](https://www.npmjs.com/package/ecc-agentshield)
- GitHub App: <https://github.com/apps/ecc-tools>
- Situs: <https://ecc.tools>

Pindai proyek dengan binary AgentShield yang sudah terpasang dan ditinjau (lihat asal-usul runner di bawah):

```bash
agentshield scan --path .
```

- **Laporkan kerentanan.** Pakai proses privat di [SECURITY.md](https://github.com/affaan-m/ECC/blob/main/SECURITY.md) (pelaporan kerentanan privat GitHub). Jangan membuka issue publik untuk laporan keamanan.
- **Pengaman bawaan.** GateGuard menggerbangi perintah shell destruktif (termasuk `rm`, force/path `git checkout`, dan `find -exec` destruktif) sebelum dijalankan; pemindai IOC rantai pasok berjalan di CI; dan AgentShield mengaudit permukaan agent, hook, MCP, izin, dan rahasia milikmu sendiri (`/security-scan`).

Hook bisa menjalankan perintah shell, server MCP bisa menyimpan kredensial, dan instruksi proyek bisa masuk ke konteks agent. Perlakukan ketiganya sebagai konfigurasi yang bisa dieksekusi. Jangan salin `hooks/hooks.json` mentah ke `~/.claude/settings.json` setelah pemasangan plugin. Pakai `/mcp` untuk penonaktifan runtime Claude Code. `ECC_DISABLED_MCPS` adalah filter pemasangan/sync ECC, bukan sakelar langsung Claude Code.

Referensi keamanan: [kebijakan keamanan](https://github.com/affaan-m/ECC/blob/main/SECURITY.md), [panduan keamanan](https://github.com/affaan-m/ECC/blob/main/the-security-guide.md), [kebijakan konektor MCP](https://github.com/affaan-m/ECC/blob/main/docs/MCP-CONNECTOR-POLICY.md), dan [respons insiden rantai pasok](https://github.com/affaan-m/ECC/blob/main/docs/security/supply-chain-incident-response.md).

## Alat ekosistem

**Skill Creator: membuat skill dari riwayat git kamu.** Dua cara. Opsi A, analisis lokal (bawaan): pakai perintah `/skill-create` untuk analisis lokal tanpa layanan eksternal.

```bash
/skill-create                    # Analisis repo saat ini
/skill-create --instincts        # Juga hasilkan instinct untuk continuous-learning-v2
```

Perintah ini menganalisis riwayat git kamu secara lokal dan menghasilkan file SKILL.md. Opsi B, GitHub App (lanjutan), untuk fitur lanjutan (10k+ commit, PR otomatis, berbagi tim): [pasang ECC Tools GitHub App](https://github.com/apps/ecc-tools) | [ecc.tools](https://ecc.tools), lalu komentari issue apa pun dengan `/ecc-tools analyze`. Keduanya menghasilkan file SKILL.md, kumpulan instinct, dan ekstraksi pola dari riwayat commit.

**AgentShield: auditor keamanan untuk konfigurasi agent.** Dibangun di Claude Code Hackathon (Cerebral Valley x Anthropic, Feb 2026): 1282 tes, cakupan 98%, 102 aturan analisis statis. Memindai konfigurasi agent kamu untuk kerentanan, salah konfigurasi, dan risiko injeksi.

**Asal-usul runner:** perintah-perintah ini membutuhkan binary AgentShield dari `ecc-agentshield` yang sudah terpasang dan ditinjau. [Paket resmi](https://www.npmjs.com/package/ecc-agentshield) mendokumentasikan CLI `agentshield`. Catat rilis yang dipilih, sumber yang ditinjau, dan integritas paket yang diverifikasi di catatan pemasanganmu. Publikasi di registri saja tidak menetapkan audit; ECC tidak menyediakan pin AgentShield yang teraudit di sini. Jangan mengganti dengan unduhan sekali pakai tanpa versi. `/security-scan` adalah panduan alur kerja dan punya prasyarat runner yang sama.

```bash
# Pindai hanya direktori proyek yang dimaksud
agentshield scan --path .

# Perbaiki otomatis masalah yang aman
agentshield scan --path . --fix

# Analisis mendalam dengan tiga agent Opus 4.6
agentshield scan --path . --opus --stream

# Buat konfigurasi aman dari nol
agentshield init
```

Yang dipindai: CLAUDE.md, settings.json, konfigurasi MCP, hook, definisi agent, dan skill dalam 5 kategori: deteksi rahasia (14 pola), audit izin, analisis injeksi hook, profil risiko server MCP, dan review konfigurasi agent. Flag `--opus` menjalankan tiga agent Claude Opus 4.6 dalam pipeline red-team/blue-team/auditor: penyerang mencari rantai eksploit, pembela mengevaluasi perlindungan, dan auditor mensintesis keduanya menjadi penilaian risiko berprioritas. Format keluaran: Terminal (nilai A-F berwarna), JSON (pipeline CI), Markdown, HTML. Exit code 2 pada temuan kritis untuk gerbang build. Pakai `/security-scan` di Claude Code untuk menjalankannya, atau tambahkan ke CI dengan [GitHub Action](https://github.com/affaan-m/agentshield). [GitHub](https://github.com/affaan-m/agentshield) | [npm](https://www.npmjs.com/package/ecc-agentshield)

**Continuous Learning v2: instinct.** Sistem pembelajaran berbasis instinct mempelajari polamu secara otomatis:

```bash
/instinct-status        # Tampilkan instinct yang dipelajari beserta keyakinannya
/instinct-import <file> # Impor instinct dari orang lain
/instinct-export        # Ekspor instinct kamu untuk dibagikan
/evolve                 # Kelompokkan instinct terkait menjadi skill
```

Lihat `skills/continuous-learning-v2/` untuk dokumentasi lengkap. Simpan `continuous-learning/` hanya bila kamu secara eksplisit menginginkan alur skill hasil pembelajaran lama berbasis hook Stop v1.

## Pemecahan masalah

**ECC muncul dua kali atau hook berjalan dua kali.** Penyebab yang umum adalah memasang plugin Claude lalu menjalankan `./install.sh --profile full` di atasnya. Hapus pemasangan plugin Claude Code; jalankan `node scripts/ecc.js uninstall --dry-run` dari checkout ECC; hapus folder rule tambahan yang kamu salin manual dan tidak lagi diinginkan; pasang ulang sekali memakai satu jalur. Untuk pemeriksaan khusus hook, lihat [README hook](https://github.com/affaan-m/ECC/blob/main/hooks/README.md).

**Hook saya tidak berfungsi / error "Duplicate hooks file".** **Jangan** menambahkan field `"hooks"` ke `.claude-plugin/plugin.json`. Claude Code v2.1+ memuat otomatis `hooks/hooks.json` dari plugin terpasang. Mendeklarasikannya secara eksplisit menyebabkan error deteksi duplikat. Lihat [#29](https://github.com/affaan-m/ECC/issues/29), [#52](https://github.com/affaan-m/ECC/issues/52), [#103](https://github.com/affaan-m/ECC/issues/103).

**Marketplace Codex terpasang tetapi skill tidak dimuat.** Jalankan pemeriksaan cache dari checkout ECC:

```bash
node scripts/codex/check-plugin-cache.js
```

Kalau pemeriksaan melaporkan referensi induk yang tidak terselesaikan, segarkan cache native dengan `codex plugin marketplace upgrade ecc`, jalankan `codex plugin add ecc@ecc` lagi, dan mulai ulang Codex. Registrasi di `codex plugin list` mengonfirmasi entri marketplace, sedangkan pemeriksaan cache memverifikasi bahwa manifest terpasang bisa menyelesaikan skill, konfigurasi MCP, dan asetnya. Pakai `bash scripts/sync-ecc-to-codex.sh` hanya bila kamu sengaja membutuhkan jalur kompatibilitas konfigurasi-salinan lama. Kalau Codex 0.164.0 melaporkan `unsupported plugin entry type` setelah kamu memasang dependensi hook ke cache, lihat [prosedur dependensi runtime lokal-cache](https://github.com/affaan-m/ECC/blob/main/.codex-plugin/README.md#runtime-dependencies-and-codex-01640-cache-checks).

Jawaban lain: [TROUBLESHOOTING.md](https://github.com/affaan-m/ECC/blob/main/TROUBLESHOOTING.md) membahas memori, hook, pemasangan, performa, dan pesan error umum. [docs/TROUBLESHOOTING.md](https://github.com/affaan-m/ECC/blob/main/docs/TROUBLESHOOTING.md) mencatat solusi sementara untuk bug Claude Code yang masih terbuka.

## Menjalankan tes

Plugin menyertakan test suite yang komprehensif:

```bash
# Jalankan semua tes
node tests/run-all.js

# Jalankan file tes satu per satu
node tests/lib/utils.test.js
node tests/lib/package-manager.test.js
node tests/hooks/hooks.test.js
```

## Lisensi

MIT. Pakai dengan bebas, adaptasikan ke alur kerjamu, dan berkontribusilah kembali bila bisa.
