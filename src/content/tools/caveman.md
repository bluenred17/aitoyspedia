---
title: "Caveman"
summary: "CLI dan paket skill yang membuat agent AI menjawab lebih singkat dan membaca lebih sedikit (suara caveman, kompresi input, routing model Auto, dan Blocks), dengan klaim hemat token yang disertai angka ukurannya."
category: productivity
tags: [hemat-token, token, cli, skill, routing, kompresi, claude-code]
surfaces: [claude-code]
source_url: "https://github.com/JuliusBrussee/caveman/blob/main/README.md"
repo: JuliusBrussee/caveman
stars: 117542
license: Apache-2.0
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
setup: |
  npx @caveman-ai/cli@latest
---

# Caveman: "why many token when few do trick"

**Caveman membuat agent AI kamu bicara lebih sedikit dan membaca lebih sedikit. Kode tetap persis. Otak tetap besar.**

> **Catatan dari situs ini:** (1) CLI Caveman mengirim statistik pemakaian secara default (lihat bagian Privasi di bawah; bisa dimatikan dengan `caveman telemetry off` atau `DO_NOT_TRACK=1`). (2) README menawarkan pemasangan satu baris `curl … | bash` dan `irm … | iex`, yaitu perintah yang mengunduh skrip lalu langsung menjalankannya. Perintah itu disalin utuh di bawah, tetapi sebaiknya skripnya dibaca dulu. Perintah pasang utama entri ini adalah `npx @caveman-ai/cli@latest`.

Angka utama dari README:

| Angka | Arti | Sumber |
|---|---|---|
| **33,2% lebih sedikit** | token input, per sesi penuh | 54 run Claude Code, 18 dari 18 jawaban benar |
| **54% lebih murah** | dengan Auto, skor sama | 85 tugas coding vs Opus 5.5 pada xhigh, sementara |
| **397 → 76** | token untuk satu kali jalan tes | Blocks vs `\| tail -20` |
| **1,4 sampai 2,4× lebih murah** | dengan keluaran bergaya caveman | Adobe Research, delapan model |

Dikutip oleh [Adobe Research](https://arxiv.org/abs/2606.24083) · diuji A/B oleh [JetBrains](https://blog.jetbrains.com/ai/2026/07/speak-to-ai-agents-like-cavemen-tosave-tokens/) · dibuat ulang untuk Elasticsearch di [Elasticsearch Labs](https://www.elastic.co/search-labs/blog/elastic-caveman-ai-token-reduction). **#1** di [Hacker News](https://news.ycombinator.com/item?id=47647455), **#1** di GitHub Trending.

Tautan: [Pasang](#pasang) · [Enam batu](#enam-batu-satu-pemasangan) · [Bukti](#bukti) · [Bicara lebih sedikit](#bicara-lebih-sedikit-suara-caveman) · [Baca lebih sedikit](#baca-lebih-sedikit-332-input-token-lebih-sedikit) · [Auto](#auto-54-lebih-murah-skor-sama) · [Blocks](#blocks-code-mode-skrip-ditulis-sekali) · [Perintah](#perintah) · [Caveman Cloud](#caveman-cloud)

## Contoh

| Agent normal · 63 token | Agent caveman · 20 token |
|---|---|
| The reason your React component is re-rendering is likely because you're creating a new object reference on each render cycle. When you pass an inline object as a prop, React's shallow comparison sees it as a different object every time, which triggers a re-render. I'd recommend using useMemo to memoize the object. | New object ref each render, so React re-renders. Wrap the prop in `useMemo`. |

**Perbaikan sama. 63 token jadi 20. Otak tetap besar.**

Pilih "gada" kamu:

| Skill | Jawaban yang sama | Token |
|---|---|---:|
| `/caveman` | New object ref each render, so React re-renders. Wrap the prop in `useMemo`. | 20 |
| `/ultracave` | Inline object prop, new ref, re-render. `useMemo`. | 14 |
| `/megacave` | 新參照致重繪。`useMemo`。 | **13** |

Jumlah token dihitung dengan tiktoken o200k.

## Pasang

```bash
npx @caveman-ai/cli@latest
```

Satu perintah. Mac, Linux, Windows. Caveman menemukan agent dan login kamu, menampilkan apa yang akan diubahnya. Tekan Enter. Selesai. Membutuhkan Node.js 22.13+.

Sesudah itu, `claude` biasa tetap dalam mode caveman. Begitu juga Codex, Gemini CLI, OpenCode, dan [30+ lainnya](https://github.com/JuliusBrussee/caveman/blob/main/INSTALL.md). Ia berjalan di mesinmu, dengan kunci dan login Claude Pro/Max milikmu. Satu batu. Itu saja.

Sudah punya Caveman sebelum 4.0? Tulis `@latest`, kalau tidak salinan lama di mesinmu yang menang. Sudah di-setup? `caveman setup` membuka layarnya lagi. Hanya mau jawaban yang lebih pendek? [Ambil skill-nya saja](#bicara-lebih-sedikit-suara-caveman).

### Cara lain masuk: aplikasi Claude dan ponsel, plugin Claude Code, Gemini, semua agent sekaligus, Windows, uninstall

Claude di web, aplikasi ponsel, atau Cowork? Tidak ada terminal. Tambahkan Caveman ke akun Claude kamu sekali saja di Customize > Plugins: [langkah-langkahnya](https://github.com/JuliusBrussee/caveman/blob/main/INSTALL.md#claude-apps-claudeai-desktop-mobile-cowork). Belum diuji ujung ke ujung.

```bash
# Plugin Claude Code, otomatis aktif di setiap sesi interaktif, termasuk subagent
claude plugin marketplace add JuliusBrussee/caveman && claude plugin install caveman@caveman

# Gemini CLI
gemini extensions install https://github.com/JuliusBrussee/caveman

# Semua agent di mesinmu sekaligus, ditambah badge statusline Claude Code (Node.js 22.13+)
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/v4.0.1/install.sh | bash
```

Sudah berada di dalam Claude Code? Batu yang sama, bentuk slash. Ketik ini di tempat kamu berbicara dengan Claude:

```text
/plugin marketplace add JuliusBrussee/caveman
/plugin install caveman@caveman
```

Windows, PowerShell 5.1+:

```powershell
irm https://raw.githubusercontent.com/JuliusBrussee/caveman/v4.0.1/install.ps1 | iex
```

Di npm 12 atau lebih baru, npm baru memblokir pemasangan git. Perintah satu baris di atas menanganinya sendiri sejak v3.2.0. Perintah satu baris lama yang dipatok ke v3.1.0 atau lebih lama masih gagal di sana: pakai yang di atas, atau ini:

```bash
npx --allow-git=root -y github:JuliusBrussee/caveman#v4.0.1
```

Berubah pikiran:

```bash
npx -y github:JuliusBrussee/caveman -- --uninstall
```

(di npm 12+, tambahkan juga `--allow-git=root`)

Hanya mengambil skill-nya? Cabut lagi dengan:

```bash
npx skills remove JuliusBrussee/caveman -g
```

Pemasangan rusak? Buka agent kamu di repo ini dan ucapkan *"Read CLAUDE.md and INSTALL.md, install caveman for me."* Agent memperbaiki otaknya sendiri.

## Enam batu, satu pemasangan

Baru di 4.0: Caveman terdiri dari enam bagian. Semuanya aktif setelah pemasangan. Masing-masing punya sakelar sendiri.

| Batu | Fungsinya | Terukur |
|---|---|---|
| **Say less** (bicara lebih sedikit) | Agent menjawab singkat. Kode tetap persis | 63 → 20 token, perbaikan sama |
| **Read less** (baca lebih sedikit) | Log, JSON, CSV, dan keluaran tes mengecil sebelum dibaca model | **33,2%** lebih sedikit token input per sesi |
| **Auto** · baru | Memilih model dan effort untuk setiap permintaan | **54%** lebih murah daripada Opus pada xhigh, skor sama |
| **Blocks** · baru | Code mode: agent menyimpan skrip yang ditulisnya dan menjalankannya lagi | **397 → 76** token untuk satu kali jalan tes |
| **Waste fixes** | Menemukan ke mana token kamu pergi dan memperbaikinya. Baru: menjaga prompt cache tetap hangat saat kamu berhenti sejenak | Belum diukur |
| **Browse** | Halaman web kembali dalam bentuk terkompresi | Halaman **129,8×** lebih kecil |

`caveman status` menampilkan apa yang aktif. `caveman off browse` mematikan satu bagian. Hanya Auto yang butuh akun, dan gratis. [Catatan rilis 4.0.0](https://github.com/JuliusBrussee/caveman/releases/tag/v4.0.0)

## Bukti

Lab luar dulu. Milik sendiri menyertai tiap batu di bawah. Tidak ada yang dibulatkan ke atas. Baris merah tetap merah.

| Siapa | Setup | Hasil |
|---|---|---|
| **[Adobe Research](https://arxiv.org/abs/2606.24083)**, paper CAVEWOMAN (mengutip repo ini) | Keluaran bergaya caveman, delapan model, lima dataset | **Biaya turun 1,4 sampai 2,4× per model, hingga 3×** |
| **[Elastic](https://www.elastic.co/search-labs/blog/elastic-caveman-ai-token-reduction)**, Elasticsearch Labs | Mode caveman dibuat ulang untuk Elasticsearch, delapan skenario MCP hidup | **63,6% lebih sedikit token respons.** *"Zero information loss."* |
| **[JetBrains](https://blog.jetbrains.com/ai/2026/07/speak-to-ai-agents-like-cavemen-tosave-tokens/)** | 86 tugas coding nyata, A/B berpasangan | **Tidak ada penurunan kualitas yang terukur** (p = 0,82). 8,5% lebih sedikit token output |

Dua temuan membentuk Caveman. Adobe: me-caveman-kan prompt *kamu* membuat jawaban lebih buruk, jadi Caveman tidak pernah menyentuh prompt kamu. JetBrains: sesi agent kebanyakan berisi kode dan pemanggilan tool, yang dibiarkan oleh suara caveman. Karena itu Caveman menumbuhkan batu yang mengecilkan apa yang *dibaca* agent dan apa yang *dijalankannya*.

## Bicara lebih sedikit: suara caveman

**Sebuah suara, bukan tata bahasa rusak. Setiap balasan mengikuti struktur yang sama.**

| Aturan | Artinya |
|---|---|
| **Jawaban dulu** | `[hal] [aksi] [alasan]. [langkah berikutnya].` Tanpa salam, tanpa "biar saya", tanpa rekap |
| **Satu ide per kalimat** | Dibangun di atas [ASD-STE100](https://www.asd-ste100.org/), bahasa Inggris terkendali untuk manual perawatan pesawat: maksimum 20 kata, kalimat aktif, satu istilah per hal |
| **Makna tidak pernah dibuang** | Artikel boleh hilang. *not*, *never*, *no*, *only* tidak pernah hilang. Angka dan satuan tetap persis |
| **Muatan apa adanya** | Kode, perintah, path, dan pesan error tidak disentuh, karakter demi karakter |
| **Tanpa sandiwara** | Tanpa "me think". Tanpa basa-basi di antara pemanggilan tool. Kalau frasa caveman tidak lebih pendek, yang biasa menang |
| **Tahu kapan berhenti** | Peringatan keamanan, aksi yang tidak bisa dibatalkan, dan pengguna yang bingung mendapat kalimat penuh. Lalu gaya caveman berlanjut |
| **Prompt kamu tetap milikmu** | Tidak pernah ditulis ulang. [Riset menunjukkan itu menjadi bumerang](#bukti) |

Sepuluh pertanyaan developer pada claude-opus-5-5:

| Instruksi | Token output |
|---|---:|
| Tanpa instruksi | 6.983 |
| `Answer concisely.` | 4.334 |
| `/caveman` | 4.119 |
| `/ultracave` | **2.693** |

"Be concise" adalah baseline yang sebenarnya; model baru sudah mengetahuinya. Di atas itu, `/caveman` memangkas 3% lagi pada median dan `/ultracave` 35% lagi. Diukur pada aturan 3.1.0, belum dijalankan ulang. Aturannya memakan sekitar 1.160 token input, dan kalau kamu membayar per permintaan (GitHub Copilot), jawaban yang lebih pendek tidak menghemat apa pun. [Harness](https://github.com/JuliusBrussee/caveman/blob/main/evals/README.md) · [Setiap kasus ketika Caveman kalah](https://github.com/JuliusBrussee/caveman/blob/main/docs/HONEST-NUMBERS.md)

**Hanya mau batu ini?** Skill saja, tanpa proxy:

```bash
npx skills add JuliusBrussee/caveman -g
```

Ketik `/caveman` (`$caveman` di Codex) kalau tidak mulai sendiri. Ucapkan `stop caveman` untuk kembali.

## Baca lebih sedikit: 33,2% input token lebih sedikit

**Suara mengecilkan apa yang dikatakan agent. Ini mengecilkan apa yang dibacanya. Jawaban sama: 18 dari 18 benar.**

| Jenis file | File, lewat Caveman | File hemat | Seluruh sesi Claude Code, 3 run | Sesi hemat |
|---|---:|---:|---:|---:|
| CSV | 28.041 → **314** | **98,9%** | 165.823 → 74.484 | **55,1%** |
| Log | 22.810 → **348** | **98,5%** | 148.807 → 74.068 | **50,2%** |
| YAML | 20.447 → **178** | **99,1%** | 132.124 → 71.027 | **46,2%** |
| Keluaran tes | 18.806 → **203** | **98,9%** | 150.377 → 108.514 | **27,8%** |
| JSON | 18.837 → **281** | **98,5%** | 147.975 → 108.939 | **26,4%** |
| HTML | 21.670 → 21.670 | belum ada | 140.687 → 154.641 | 9,9% lebih buruk |
| **Keenamnya** | 130.611 → 22.994 | 82,4% | **885.793 → 591.673** | **33,2%** |

*File* adalah tiap file uji lewat kompresor saat ini saja. *Sesi* adalah seluruh run agent, yang juga membawa system prompt dan tool, sehingga bergerak lebih sedikit. Bagian jujurnya: run sesi berasal dari Agustus 2026 pada engine yang lebih lama, HTML belum punya kompresor sehingga kalah, dan tiap file uji menyembunyikan satu rekaman dalam 61 sampai 72 KB noise. Hasil kamu akan bervariasi. Headroom pada suite yang sama: 15 dari 18 benar, 6,7% lebih sedikit token. [Metode](https://github.com/JuliusBrussee/caveman/blob/main/docs/WRAP-BENCHMARK.md#per-file-compression)

Setiap file asli tetap ada di disk kamu. Agent bisa mengambilnya kembali kapan saja.

## Auto: 54% lebih murah, skor sama

**Model baru di pemilih model agent kamu. Pilih Auto dan Caveman memilih model dan effort untuk setiap permintaan. Permintaan sulit, otak besar. Permintaan mudah, hemat batu.**

| Setup | Tugas terselesaikan | Biaya per percobaan | Median waktu |
|---|---:|---:|---:|
| Opus 5.5, effort xhigh, setiap permintaan | 44,3% | $7,83 | 35,2 menit |
| **Auto**, hanya model Claude | **43,7%** | **$3,59** | **15,9 menit** |
| **Auto**, ditambah OpenAI dan model terbuka | 42,9% | $3,47 | 16,7 menit |

Auto berbiaya 0,46× biaya Opus 5.5 pada xhigh. Itu 54% hemat, dalam waktu kurang dari setengahnya. 85 tugas coding nyata dari SWE-Interact dan SWE-Together, satu percobaan masing-masing. Bagian jujurnya: run baru setengah selesai, selisih skor 0,5 poin terlalu kecil untuk dibedakan pada ukuran ini (±7), dan sebagian besar penghematan berasal dari Auto menurunkan effort pada permintaan mudah. Sudah memakai Opus pada medium? Harapkan lebih sedikit; belum diukur. [Tabel lengkap dan batasannya](https://github.com/JuliusBrussee/caveman/blob/main/docs/AUTO-BENCHMARK.md)

```bash
caveman login                  # akun gratis. Auto muncul di pemilih model
caveman providers add openai   # opsional: beri Auto lebih banyak model, dengan kuncimu sendiri
```

Bekerja di Claude Code, OpenCode, dan Codex dengan login ChatGPT, dengan kunci API, Claude Pro/Max, atau ChatGPT. Model lain yang kamu pilih berjalan seperti yang dipilih. Belum masuk: tanpa Auto, tidak ada yang dikirim. [Apa yang dikirim Auto](#privasi)

## Blocks: code mode, skrip ditulis sekali

**skills.sh untuk code mode.** Code mode adalah agent menulis skrip alih-alih melakukan pemanggilan tool satu demi satu ([Cloudflare](https://blog.cloudflare.com/code-mode/), [Anthropic](https://www.anthropic.com/engineering/code-execution-with-mcp)). Masalahnya: agent menulis skrip yang sama setiap sesi, membuangnya, lalu menulisnya lagi. Blocks menyimpannya di repo kamu, memeriksanya di setiap pull request, dan menyerahkannya kembali.

| Input | Mentah | Yang diketik agent sekarang | Block |
|---|---:|---:|---:|
| `go test -v ./...`, 326 tes | 10.561 | 397 · `\| tail -20` | **76** · `test-summary` |
| File JSON 1,4 MB | 251.893 | 236 · heredoc buatan sendiri | **227** · `json-peek` |
| File Go 366 baris | 3.111 | **250** · `grep -n` | 489 · `grep-defs` |

Token yang dibaca kembali oleh agent. Dalam satu minggu, agent di satu mesin menulis skrip yang sama [394 kali](https://github.com/caveman-ai/blocks#one-script-written-394-times-in-a-week). [Purdue](https://arxiv.org/abs/2609.30725) mengukur kebiasaan itu hingga 9,57% dari biaya tugas. `grep-defs` kalah dari grep biasa; barisnya tetap ditampilkan. [Metode](https://github.com/caveman-ai/blocks#blocks-against-what-agents-type-now)

Datang bersama Caveman. Delapan block siap: `json-peek` · `jsonl-stats` · `test-summary` · `first-error` · `wait-for` · `grep-defs` · `http-json` · `replace-in-file`. Ketika agent mulai mengetik skrip yang sudah dicakup sebuah block, ia mendapat satu baris: pakai block itu. Tidak pernah menolak atau menulis ulang perintah.

```bash
caveman-blocks scan    # apa yang diketik ulang agent kamu bulan ini. Teks skrip tidak pernah meninggalkan mesinmu
caveman-blocks init    # aturan dan indeks block ke AGENTS.md repo ini
```

Pra-rilis (v0.1.0-rc.5). Hanya Python, belum ada sandbox. Repo sendiri, bintang sendiri: **[caveman-ai/blocks](https://github.com/caveman-ai/blocks)**

## Batu-batu kecil

| Batu | Fungsinya | Terukur |
|---|---|---|
| `caveman learn` | Meranking ke mana token kamu pergi, dari riwayat agent yang sudah ada di disk. `caveman learn implement` menerapkan perbaikan satu diff demi satu, hanya setelah kamu bilang ya | Belum |
| Warm cache · baru | Saat kamu menjauh, penyedia melupakan sesimu, sehingga permintaan berikutnya membayar penuh. Caveman menjaga prompt cache Anthropic tetap hangat selama kamu berhenti, hanya ketika riwayatmu sendiri menunjukkan kamu kembali tepat waktu. Setiap pemanasan tercatat di `caveman stats` | Belum |
| `caveman browse <url>` | Halaman web terkompresi untuk agent | **121 token alih-alih 15.704** untuk snapshot Playwright dari tabel 200 baris. Formulir kecil rugi 2,3×. [Bench](https://github.com/JuliusBrussee/caveman/blob/main/browse/BENCHMARK.md) |
| `/caveman-compress <file>` | Mengecilkan file memori seperti `CLAUDE.md`, menyimpan cadangan | **4.138 token alih-alih 6.198** di lima file, 22,8% sampai 49,1% tiap file, setiap heading, blok kode, dan path utuh. [Bench](https://github.com/JuliusBrussee/caveman/blob/main/skills/caveman-compress/README.md#benchmarks) |
| Middleware | Pengecilan yang sama di dalam Vercel AI SDK, LangChain, OpenAI, atau panggilan Anthropic yang sudah kamu buat. [TypeScript](https://github.com/JuliusBrussee/caveman/blob/main/packages/middleware/typescript/README.md) · [Python](https://github.com/JuliusBrussee/caveman/blob/main/packages/middleware/python/README.md) · [Semua framework](https://docs.caveman.so/caveman/middleware) · [Satu container untuk tim](https://github.com/JuliusBrussee/caveman/blob/main/docs/technical/deploy.md) | Belum |

![Laporan Caveman Learn: ringkasan dan kartu penghematan di kiri; tempat token paling banyak pergi dengan satu perbaikan terbuka, dan grafik seberapa penuh sesi di kanan](https://raw.githubusercontent.com/JuliusBrussee/caveman/main/docs/assets/learn-report.png)

## Perintah

Di terminal kamu:

```bash
caveman claude                # mulai agent dalam mode caveman: codex · gemini · opencode · aider · kilo · qwen · hermes · openclaw · pi
caveman status                # apa yang aktif, agent mana yang dijangkau, satu langkah berikutnya
caveman on browse             # nyalakan atau matikan satu batu: output · input · waste-fixes · routing · scripts · browse
caveman login                 # akun gratis, mengaktifkan Auto
caveman learn                 # ke mana token kamu pergi
caveman trial -- claude       # A/B sesi nyata pada pekerjaanmu sendiri
caveman shrink -- pnpm test   # kompres keluaran perintah yang bising
caveman convert --dry-run     # mode piksel: skill yang dibaca model sebagai gambar
caveman stats                 # riwayat token kamu
caveman doctor                # satu masalah per baris, dengan perbaikannya
```

Di agent kamu:

| Perintah | Fungsinya |
|---|---|
| `/caveman` · `/ultracave` · `/megacave` | Suaranya, gerutuannya, 文言文-nya. `/caveman status` menampilkan modenya, `/caveman off` menghentikannya |
| `/caveman-commit` | Conventional Commit satu baris |
| `/caveman-review` | Satu temuan per baris: `L42: 🔴 null deref. Guard it.` |
| `/caveman-compress <file>` | Mengecilkan file memori dan mencadangkan aslinya |
| `/caveman-stats` | Pemakaian token nyata untuk sesi Claude Code ini |
| `/caveman-help` | Semua mode dan perintah dalam satu layar |
| `cavecrew` | Subagent yang mencari, mengedit, dan meninjau kode, lalu melapor dengan gaya caveman |
| `investigate-first` · `lean-build` · `surgical-patch` · `safe-refactor` · `migration` · `verify-and-stop` | Pola kerja yang menulis lebih sedikit kode. Agent kamu memakainya ketika tugas cocok |
| `caveman-setup` · `caveman-discover` · `caveman-learn` · `caveman-manage` · `caveman-optimize` · `caveman-explore` · `caveman-evidence-review` | Mengendalikan proxy dari dalam agent kamu |

## Caveman Cloud

**Semua yang di atas untuk coding agent yang kamu pakai. Caveman Cloud untuk agent yang kamu bangun.**

Kamu merilis sebuah agent. Setiap run memakan biaya. Apakah bagus? Apakah murah? Perubahan mana yang membuatnya lebih buruk? Cloud menjawabnya.

| Cloud melakukan | Yang kamu dapat |
|---|---|
| **Observability** | Setiap run dilacak ke pekerjaan dan biayanya. Menyiapkan dirinya dari repo, kunci, dan log atau OpenTelemetry yang sudah kamu punya |
| **Evals** | Menilai seberapa bagus jawabannya, pada tugas kamu sendiri, dari trafik nyata kamu |
| **Autopilot** | Mengusulkan perubahan yang lebih murah, mengujinya pada pekerjaan terekam kamu, dan merilis hanya ketika eval menyatakan jawaban masih sebaik semula. Kamu menyetujui pull request-nya |
| **Proof** | Setiap angka menyatakan apakah ia terukur, disimpulkan, atau diverifikasi. Sebuah penghematan baru dihitung setelah trafik nyata menunjukkannya |

[Daftar gratis](https://app.caveman.so/signup) · [Coba demo](https://caveman.so/demo) · [Jadwalkan panggilan](https://cal.com/caveman/chat) · [Dokumentasi](https://docs.caveman.so)

## Di dunia nyata

**ThePrimeagen**: *"No way this actually works."* [Tonton](https://www.youtube.com/watch?v=L29q2LRiMRc)

**Adobe Research**: [CAVEWOMAN](https://arxiv.org/abs/2606.24083), arXiv, Juni 2026

**JetBrains**: *"It is fun, and it costs you nothing measurable in quality."* [Baca](https://blog.jetbrains.com/ai/2026/07/speak-to-ai-agents-like-cavemen-tosave-tokens/)

**Elastic**: [elastic-caveman](https://www.elastic.co/search-labs/blog/elastic-caveman-ai-token-reduction) di Elasticsearch Labs, April 2026

**Hacker News**: [#1, 904 poin](https://news.ycombinator.com/item?id=47647455)

**GitHub Trending** #1 secara keseluruhan, Juli 2026 · **[Trendshift](https://trendshift.io/repositories/25391)** #1 repo hari itu, April 2026 · **[Product Hunt](https://www.producthunt.com/products/caveman)** #8 hari itu

Dimulai sebagai lelucon pada April 2026. Sekarang melewati 100.000 bintang. Leluconnya jadi serius. Suaranya tidak.

## Privasi

- **Skill** berjalan di mesinmu dan tidak mengirim apa pun. Satu pengecualian: `/caveman-compress` mengirim file yang kamu kompres ke penyedia model yang kamu konfigurasikan.
- **CLI** mengirim statistik pemakaian secara default: perintah yang dijalankan, jumlah token, perintah dan jumlah pemakaian caveman-blocks, ID pemasangan acak, OS, dan IP. Tidak pernah prompt, kode, path file, atau skrip yang kamu tulis. Satu orang memeliharanya secara gratis, dan statistik itu menunjukkan apa yang perlu dibangun berikutnya. Matikan selamanya, termasuk Blocks: `caveman telemetry off` atau `DO_NOT_TRACK=1`.
- **Auto**, hanya setelah kamu masuk dan memilihnya: setiap permintaan mengirim ke Caveman Cloud permintaan terakhirmu (beserta apa pun yang dilampirkan agent kamu, seperti CLAUDE.md, memori, atau file yang di-@-mention), yang sebelumnya, dan akhir dari balasan terakhir agent, ditambah nama tool tiap permintaan, effort, beberapa header agent, dan jumlah token permintaan sebelumnya. Pada paket Free, Caveman boleh menyimpannya untuk memperbaiki routing. `caveman off routing` menghentikannya.
- **Ke mana permintaan pergi:** dari mesinmu ke penyedia kamu, atau ke penyedia lain yang kamu tambahkan dengan `caveman providers add`, dengan kunci milikmu sendiri. Hanya permintaan yang di-route ke model Caveman Cloud yang melewati Caveman Cloud, utuh (system prompt, hasil tool, kode), pada kunci tersimpan proyek Caveman kamu, ditagihkan ke proyek itu. `caveman providers cloud off` menghentikannya.

Daftar lengkapnya, dan cara menghapus telemetri yang sudah terkirim: [SECURITY.md](https://github.com/JuliusBrussee/caveman/blob/main/SECURITY.md).

## Lisensi

[Apache-2.0](https://github.com/JuliusBrussee/caveman/blob/main/LICENSE), seluruh repo. Baca, fork, rilis, host. Bebas seperti mamut di dataran terbuka. Rilis lama dan pemberitahuan pihak ketiga: [LICENSING.md](https://github.com/JuliusBrussee/caveman/blob/main/LICENSING.md). "Caveman" dan logo batu adalah merek dagang Julius Brussee.

## Sitasi

```bibtex
@software{brussee2026caveman,
  author = {Brussee, Julius},
  title  = {Caveman: why many token when few do trick},
  year   = {2026},
  url    = {https://github.com/JuliusBrussee/caveman}
}
```

Tautan: [Docs](https://github.com/JuliusBrussee/caveman/blob/main/docs/README.md) · [Matriks pemasangan](https://github.com/JuliusBrussee/caveman/blob/main/INSTALL.md) · [Angka jujur](https://github.com/JuliusBrussee/caveman/blob/main/docs/HONEST-NUMBERS.md) · [Berkontribusi](https://github.com/JuliusBrussee/caveman/blob/main/CONTRIBUTING.md) · [Caveman Cloud](https://app.caveman.so/signup) · [Issues](https://github.com/JuliusBrussee/caveman/issues)
