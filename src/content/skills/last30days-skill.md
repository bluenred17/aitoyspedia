---
title: "/last30days"
summary: "Skill riset berbasis agent yang mencari Reddit, X, YouTube, TikTok, Hacker News, Polymarket, GitHub, dan banyak sumber lain secara paralel, menilainya dari upvote, like, dan taruhan uang sungguhan, lalu merangkum 30 hari terakhir menjadi satu brief."
category: productivity
tags: [riset, media-sosial, reddit, polymarket, tren, agent, brief]
surfaces: [claude-ai, claude-code, desktop]
source_url: "https://github.com/mvanhorn/last30days-skill/blob/main/README.md"
repo: mvanhorn/last30days-skill
stars: 66635
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
trigger: "Dipanggil dengan /last30days <topik> untuk meriset orang, perusahaan, produk, atau teknologi dari 30 hari terakhir; juga untuk mode penemuan tren, perbandingan 'X vs Y', dan sinyal rekrutmen."
install: |
  /plugin marketplace add mvanhorn/last30days-skill
  /plugin install last30days
---

# /last30days

**Mesin pencari berbasis agent AI yang dinilai oleh upvote, like, dan uang sungguhan, bukan oleh editor.**

README ini mengikuti pipeline v3 saat ini. Spesifikasi skill runtime ada di [skills/last30days/SKILL.md](https://github.com/mvanhorn/last30days-skill/blob/main/skills/last30days/SKILL.md), yang menjadi sumber kebenaran untuk perintah dan perilaku setup terbaru.

README memuat bahasa lain: [Français](https://github.com/mvanhorn/last30days-skill/blob/main/README.fr.md), [Deutsch](https://github.com/mvanhorn/last30days-skill/blob/main/README.de.md), [Español](https://github.com/mvanhorn/last30days-skill/blob/main/README.es.md), [Português (Brasil)](https://github.com/mvanhorn/last30days-skill/blob/main/README.pt-BR.md), [日本語](https://github.com/mvanhorn/last30days-skill/blob/main/README.ja.md), dan [简体中文](https://github.com/mvanhorn/last30days-skill/blob/main/README.zh-CN.md).

> **Catatan dari situs ini:** skill ini mengirim kueri ke banyak layanan pihak ketiga dan bisa memakai kunci API serta sesi browser milikmu (X, ScrapeCreators, Perplexity, Brave, dan lain-lain). Bagian "Penanganan data" di bawah menjelaskan apa yang keluar dari mesinmu. Menurut README, setup pertama juga memasang CLI gratis tambahan (arXiv dan Techmeme).

**Claude Code (disarankan, pembaruan otomatis lewat marketplace):**
```
/plugin marketplace add mvanhorn/last30days-skill
/plugin install last30days
```

**Codex, Cursor, Copilot, Gemini CLI, atau salah satu dari 50+ host [Agent Skills](https://agentskills.io):**
```
npx skills add mvanhorn/last30days-skill -g
```
(`-g` memasang secara global untuk pengguna kamu, tersedia di semua proyek. Hilangkan untuk cakupan per proyek.)

Opsi pemasangan lain (claude.ai web, OpenClaw, manual) ada di bagian [Pasang](#pasang) di bawah.

Tanpa konfigurasi. Reddit, HN, Polymarket, dan GitHub langsung bekerja. Jalankan sekali dan wizard setup membuka X, YouTube, TikTok, arXiv, Techmeme, dan lainnya dalam 30 detik.

---

Upvote Reddit. Like X. Transkrip YouTube. Engagement TikTok. Odds Polymarket yang didukung uang sungguhan dan informasi orang dalam. Itu jutaan orang yang memilih dengan perhatian dan dompet mereka setiap hari. /last30days mencari semuanya secara paralel, menilainya menurut apa yang benar-benar direspons orang, dan hakim berbasis agent AI menyintesisnya menjadi satu brief.

Google mengagregasi editor. /last30days mencari orang.

Pencarian ini tidak bisa kamu dapat di tempat lain karena tidak ada satu AI pun yang punya akses ke semuanya. Pencarian Google tidak menyentuh komentar Reddit atau postingan X. ChatGPT punya kesepakatan dengan Reddit tetapi tidak bisa mencari X atau TikTok. Gemini punya YouTube tetapi tidak Reddit. Claude tidak punya satu pun secara native. Tiap platform adalah taman bertembok dengan API, token, dan autentikasinya sendiri. Tetapi kamu bisa membawa kunci dan sesi browser sendiri, dan tiba-tiba agent AI bisa mencari semuanya sekaligus, menilainya satu sama lain, dan memberi tahu apa yang sebenarnya penting.

Itulah kuncinya. Bukan satu mesin pencari yang lebih baik, melainkan selusin platform yang saling terputus, dijembatani oleh sebuah agent.

```
/last30days Peter Steinberger
```

Kamu punya rapat besok. Kamu mengetik nama mereka di Google. Kamu mendapat LinkedIn mereka dari 2023. /last30days memberi apa yang sebenarnya mereka lakukan bulan ini: bergabung dengan OpenAI untuk mengerjakan Codex, berselisih soal larangan Anthropic atas agent pihak ketiga, merilis 23 PR dengan tingkat merge 85%, membangun "LobsterOS" untuk kontrol agent lintas perangkat, dan r/ClaudeCode mendapat 569 upvote memperdebatkan apakah ia pahlawan atau "insufferable". Tersebar di postingan X, thread Reddit, transkrip YouTube, dan commit GitHub. Tidak satu pun ada di Google.

## Mengapa ini ada

Penulisnya membuatnya untuk mengikuti perkembangan AI. Semuanya berubah setiap hari dan para penggemar Reddit dan X selalu lebih dulu mengetahuinya. Ia butuh prompt yang lebih baik, dan data pelatihan selalu tertinggal berbulan-bulan dari apa yang sudah ditemukan komunitas.

Tetapi ini menjadi sesuatu yang lebih besar. Sekarang ia menjalankannya sebelum panggilan penjualan untuk mengetahui kebenaran 30 hari terakhir tentang sebuah bisnis. Sebelum rapat untuk membaca tweet terbaru dan transkrip podcast seseorang. Sebelum perjalanan ke Disney World untuk tahu wahana mana yang tutup dan apa kata komunitas tentang Genie+. Sebelum membangun apa pun untuk tahu masalah apa yang sebenarnya dihadapi orang.

Kalau kamu bertemu seorang CEO, sudahkah kamu membaca semua tweet dan transkrip YouTube mereka dari 30 hari terakhir? Penulisnya sudah.

## Sumber, dinilai oleh orang

| Sumber | Apa kata orang |
|--------|--------------------------|
| **Reddit** | Pendapat tanpa filter. Komentar teratas dengan jumlah upvote nyata, gratis, tanpa API key. Opini nyata yang dikubur Google. |
| **X / Twitter** | Hot take, thread pakar, reaksi mendadak. Pertama tahu, pertama berdebat. |
| **YouTube** | Pembahasan mendalam 45 menit. Transkrip penuh dicari untuk 5 kalimat yang layak dikutip. |
| **TikTok** | Kreator yang menjangkau 3,6 juta orang dengan pendapat yang tak akan kamu temukan di Google. |
| **Instagram Reels** | Perspektif influencer dengan transkrip ucapan. Sinyal budaya visual. |
| **Hacker News** | Konsensus developer. 825 poin, 899 komentar. Tempat orang teknis benar-benar berdebat. |
| **Polymarket** | Bukan opini. Odds. Didukung uang sungguhan. Keyakinan 96% pada penjualan album. 4% pada akuisisi. |
| **GitHub** | Untuk orang: kecepatan PR, repo teratas menurut bintang, catatan rilis. Untuk topik: issue dan diskusi. |
| **Digg** | Klaster cerita dari bagian AI dan Tech Digg, dengan kutipan inline beratribusi dari X (tanpa autentikasi X). Aktif otomatis bila `digg-pp-cli` ada di PATH. |
| **arXiv** | Makalah di balik hype. Riset baru dalam jendela waktu, gratis, tanpa API key. Aktif otomatis bila `arxiv-pp-cli` ada di PATH (setup pertama memasangnya). |
| **Techmeme** | Lapisan editorial berita teknologi, dibatasi ke 30 harimu. Gratis, tanpa API key. Aktif otomatis bila `techmeme-pp-cli` ada di PATH (setup pertama memasangnya). |
| **LinkedIn** | Sinyal profesional. Postingan dan artikel, dengan artikel dibobot sebagai sinyal tinggi. |
| **Meta Ads** | Apa yang dibayar sebuah merek untuk dikatakan. Kreatif iklan Meta yang aktif diluncurkan bulan ini, dengan teks, kode promo, dan transkrip ucapan. |
| **StockTwits** | Sentimen trader. Aktif otomatis bila topikmu adalah ticker atau kripto. |
| **Threads** | Lapisan teks pasca-Twitter. Percakapan dari kreator dan merek. |
| **Pinterest** | Penemuan visual. Pin, simpanan, dan komentar tentang produk dan ide. |
| **Xiaohongshu (RED)** | Sinyal gaya hidup, produk, dan kreator Tiongkok. Diminta eksplisit dengan `--search xhs` saat plugin browser x-mcp yang sudah login atau layanan `xiaohongshu-mcp` berjalan lokal. |
| **Bluesky** | Lapisan sosial terdesentralisasi. Postingan AT Protocol dari migrasi pasca-Twitter. |
| **Perplexity** | Sintesis Agent API terkontrol, fallback OpenRouter Sonar, baris Search API mentah, dan Deep Research eksplisit. |
| **DEV Community (dev.to)** | Artikel developer dan komentar teratas lewat API publik tanpa kunci. Aktifkan dengan `--devto-tags`, `--search devto`, atau `INCLUDE_SOURCES=devto`. |
| **Truth Social** | Postingan dicari dengan `TRUTHSOCIAL_TOKEN`; tersedia saat terautentikasi. |
| **Telegram** | Postingan publik dari kanal bernama. Opt-in; membutuhkan `SCRAPECREATORS_API_KEY` dan daftar kanal. Tanpa penemuan kata kunci. |
| **Trustpilot** | TrustScore perusahaan, jumlah ulasan, dan ringkasan AI umpan balik pelanggan. Opt-in; membutuhkan `trustpilot-pp-cli` di PATH dan sesi yang bisa dipakai. |
| **Amazon** | Rating produk, harga, dan ulasan pelanggan. Opt-in; membutuhkan CLI `brightdata` yang terautentikasi dan memakai kredit Bright Data kamu. |
| **DripStack** | Newsletter keuangan dan tulisan analis lewat API publik tanpa kunci. Aktifkan dengan `--search dripstack` atau `INCLUDE_SOURCES=dripstack`. |
| **Jobs / halaman karier** | Lowongan publik sebagai bukti fokus sebuah perusahaan. Dipilih dengan `--hiring-signals`, `--search jobs`, atau rencana riset. |
| **Korpus lokal** | File Markdown dan teks lokalmu, plus PDF bila `pdftotext` ada di PATH. Aktifkan dengan `--corpus` atau `LAST30DAYS_CORPUS_DIRS`. |
| **Web** | Liputan editorial, perbandingan blog. Satu sinyal dari banyak, bukan satu-satunya. |

Minta `/last30days` menyertakan sumber yang kamu butuhkan. Ketersediaan bergantung pada kredensial, alat yang terpasang, topik, dan opt-in eksplisit. Lihat [persyaratan sumber](https://github.com/mvanhorn/last30days-skill/blob/main/CONFIGURATION.md#source-requirements) untuk konfigurasinya.

Thread Reddit dengan 1.500 upvote adalah sinyal yang lebih kuat daripada postingan blog yang tidak dibaca siapa pun. TikTok dengan 3,6 juta tayangan memberi tahu lebih banyak tentang apa yang relevan secara budaya daripada siaran pers. Odds Polymarket yang didukung volume $66 ribu lebih sulit dibantah daripada tebakan seorang pakar.

Sintesisnya mengurutkan menurut apa yang benar-benar direspons orang. Relevansi sosial, bukan relevansi SEO.

## Dipakai untuk apa

**Sebelum rapat.** `/last30days Peter Steinberger`: bergabung dengan tim Codex OpenAI, berselisih soal larangan Anthropic atas agent pihak ketiga, 23 PR di-merge dengan tingkat merge 85% di GitHub, membangun LobsterOS untuk kontrol agent lintas perangkat. r/ClaudeCode: "Ever since OpenClaw released, it was widely known that if you run it through anything other than the API, you were gonna get banned eventually" (227 upvote). Itu tidak ada di LinkedIn.

**Untuk membaca sinyal rekrutmen.** `/last30days Listen Labs --hiring-signals`: lowongan dan halaman karier saat ini menjadi bukti berkutipan tentang pergeseran fokus: merekrut ke keamanan enterprise, customer success, infrastruktur, atau perluasan produk. Laporannya mengatakan apa yang tampaknya ditandakan oleh rekrutmen itu, bukan apa yang akan dirilis dalam roadmap.

**Untuk menemukan topik sebelum memuncak.** Tanyakan `/last30days what's exploding in AI agents?` dan skill beralih ke mode penemuan: engine menyapu daftar kategori Reddit, cerita depan/terbaik Hacker News, feed AI dan Tech Digg, dan X bila terautentikasi; agent kamu menilai nominasi (nama, penyaringan sampah, kelayakan konten) dan menulis sudut podcast / artikel X; lalu kamu mendapat 5-10 topik berperingkat kecepatan. Setiap hasil menyertakan angka lintas sumber, label momentum, dan tindak lanjut `/last30days "<topik>"` yang siap dijalankan.

**Saat sesuatu terjadi.** `/last30days Kanye West`: Inggris memblokir visanya, Wireless Festival dibatalkan, sponsor kabur. Tetapi BULLY debut #2 di Billboard. Fantano kembali dari "Yay sabbatical" untuk mengulasnya (653 ribu tayangan). SoFi Homecoming menghadirkan Lauryn Hill dan Travis Scott untuk 44 lagu. Polymarket: "Will Kanye tweet again?" 86% Yes. 23 thread Reddit, 17 video YouTube, 86 ribu upvote.

**Untuk membandingkan alat.** `/last30days OpenClaw vs Hermes vs Paperclip`: "These aren't competitors, they're layers." OpenClaw adalah eksekutor (351 ribu bintang GitHub, live), Hermes adalah otak yang memperbaiki diri (31 ribu bintang), Paperclip adalah bagan organisasi (49 ribu bintang). Jumlah bintang diambil live dari API GitHub, bukan dari postingan blog yang usang. Tabel berdampingan dengan arsitektur, memori, keamanan, cocok-untuk. Menurut @IMJustinBrooke: "OpenClaw = Charmander, Hermes = Charizard."

**Untuk memahami dunia.** `/last30days Iran vs USA`: Hari ke-38 perang. Tenggat Selasa Trump agar Iran membuka kembali Selat Hormuz. Dua pesawat tempur AS ditembak jatuh. Minyak $126/barel. IEA menyebutnya "the largest supply disruption in the history of the global oil market." Polymarket: gencatan senjata sebelum 31 Des di 74%. 27 postingan X, 10 video YouTube, 20 pasar prediksi.

**Sebelum perjalanan.** `/last30days Universal Epic Universe`: Perluasan sudah dibangun. Izin "Project 680" diajukan. Pertunjukan kembang api dikonfirmasi oleh infrastruktur tetapi belum diumumkan. Waktu tunggu: Mine-Cart Madness rata-rata 148 menit. Belum ada annual pass, dan penduduk lokal frustrasi. Stardust Racers ditutup untuk renovasi sampai 5 April.

**Untuk belajar sesuatu dengan cepat.** `/last30days Nano Banana Pro prompting`: prompt terstruktur JSON menggantikan tag soup. Format bersarang @pictsbyai mencegah "concept bleeding". Alur edit-dulu mengalahkan regenerasi. Lalu skill menulis prompt produksi untukmu memakai persis apa yang dikatakan komunitas berhasil.

## Yang baru

Lihat [rilis terbaru](https://github.com/mvanhorn/last30days-skill/releases/latest) untuk versi terbit saat ini dan [CHANGELOG.md](https://github.com/mvanhorn/last30days-skill/blob/main/CHANGELOG.md) untuk perubahan versi demi versi. Perubahan yang belum dirilis di cabang default dicatat di [changelog.d/](https://github.com/mvanhorn/last30days-skill/blob/main/changelog.d/).

README ini menjelaskan pohon sumber saat ini; versi yang terpasang di komputermu mungkin berbeda.

## Pasang

| Permukaan | Pasang | Pembaruan |
|---------|---------|---------|
| **Claude Code** (disarankan) | `/plugin marketplace add mvanhorn/last30days-skill` | Otomatis lewat marketplace, atau `claude plugin update last30days@last30days-skill` |
| **Grok** (xAI Build CLI) | `grok plugin marketplace add mvanhorn/last30days-skill` lalu `grok plugin install last30days` | `grok plugin update last30days` |
| **Codex, Cursor, Copilot, Gemini CLI, atau salah satu dari 50+ host [Agent Skills](https://agentskills.io)** | `npx skills add mvanhorn/last30days-skill -g` | `npx skills update last30days -g` |
| **claude.ai** (web) | [Unduh `last30days.skill`](https://github.com/mvanhorn/last30days-skill/releases/latest/download/last30days.skill) dan unggah lewat claude.ai > Customize > Skills > + > Create skill > Upload a skill | Unduh ulang dan unggah ulang |
| **Claude Desktop** | [Unduh `.mcpb` untuk platformmu](https://github.com/mvanhorn/last30days-skill/releases/latest) dan seret ke Settings > Extensions | Unduh ulang dan seret bundel baru |
| **OpenClaw** | `clawhub install last30days-official` | `clawhub update last30days-official` |

### Claude Code (disarankan)

```
/plugin marketplace add mvanhorn/last30days-skill
```

Disarankan karena marketplace Claude Code menangani pembaruan untukmu: cache plugin berversi dan menyegarkan diri otomatis saat rilis baru terbit. Jalankan `claude plugin update last30days@last30days-skill` untuk memaksa pemeriksaan.

Kalau kamu lebih suka jalur pemasangan agent-skills di Claude Code, itu juga didukung:

```
npx skills add mvanhorn/last30days-skill -g -a claude-code
```

### Coba cepat lewat tautan

[Coba Last30Days Research Skill di Telegram atau WhatsApp](https://app.clawmama.run/skills/2ne05f/hermes?utm_source=github&utm_medium=issue&utm_campaign=skill_outreach_mvanhorn_last30days_skill)

Plugin native dan pemasangan `npx skills` bisa hidup berdampingan. Perhatikan bahwa Claude Code tidak menghapus duplikat lintas metode pemasangan: kalau kamu punya plugin marketplace dan salinan `npx skills` yang sama-sama aktif, `/last30days` akan menampilkan dua entri. Pakai satu metode pemasangan per mesin.

### Grok (xAI Build CLI)

[Grok Build](https://docs.x.ai/build/features/skills-plugins-marketplaces) (`grok`) memasang last30days sebagai plugin native. Pemasangan langsung mengikuti repositori:

```bash
grok plugin install mvanhorn/last30days-skill
```

Atau tambahkan repo ini sebagai sumber marketplace, lalu pasang berdasarkan nama plugin:

```bash
grok plugin marketplace add mvanhorn/last30days-skill
grok plugin install last30days
```

Tambahkan `--trust` untuk melewati konfirmasi pemasangan. Perbarui dengan `grok plugin update last30days`. Grok juga membaca manifest Claude Code untuk kompatibilitas; pasangan `.grok-plugin/` native adalah jalur kelas satu (dan yang ditunjuk oleh daftar [marketplace xAI](https://github.com/xai-org/plugin-marketplace) resmi). `npx skills add` tetap menjadi fallback lintas host yang valid. Di Grok Bot, X bekerja langsung lewat tool X bawaan bot, lalu konektor X milik bot, dengan API X resmi (`X_BEARER_TOKEN`) sebagai cadangan.

### Codex, Cursor, Copilot, Gemini CLI, dan host Agent Skills lain

Pasang lewat CLI [Agent Skills](https://agentskills.io) terbuka, yang mendukung 50+ harness termasuk `codex`, `cursor`, `github-copilot`, `gemini-cli`, `claude-code`, `windsurf`, `cline`, `continue`, `roo`, `aider-desk`, `opencode`, `goose`, dan lainnya (daftar lengkap di [repo vercel-labs/skills](https://github.com/vercel-labs/skills)).

```bash
npx skills add mvanhorn/last30days-skill -g
```

Flag `-g` (global) memasang ke direktori penggunamu agar skill tersedia di semua proyek. Tanpa `-g`, `npx skills` memasang lokal proyek ke `./.skills/` (di-commit bersama repo). Untuk alat riset-dunia, global adalah yang kamu mau.

Codex desktop dan host mode-folder lain bisa bekerja di folder biasa maupun repo Git. Untuk memeriksa apa yang akan dibaca dan ditulis sebuah run tanpa memulai riset, jalankan `scripts/last30days.py --preflight` yang dibundel dari direktori skill yang dimuat; di source checkout, perintah yang setara adalah `python3 skills/last30days/scripts/last30days.py --preflight`. Ini menampilkan sumber konfigurasi, rencana cookie browser, penulisan yang direncanakan, perintah opsional, dan konfigurasi proyek yang diabaikan tanpa membaca cookie, menulis file, atau menjalankan riset. Setup pertama tidak mewajibkannya.

Secara default ini memasang untuk harness yang terdeteksi `npx skills`. Untuk menargetkan satu harness tertentu (atau beberapa):

```bash
npx skills add mvanhorn/last30days-skill -g -a codex
npx skills add mvanhorn/last30days-skill -g -a cursor
npx skills add mvanhorn/last30days-skill -g -a gemini-cli
npx skills add mvanhorn/last30days-skill -g -a codex -a cursor
```

Perbarui kemudian dengan:

```bash
npx skills update last30days -g
```

Atau perbarui semua yang kamu pasang secara global lewat `npx skills`:

```bash
npx skills update -g
```

Daftar dan hapus dengan `npx skills list -g` dan `npx skills remove last30days -g`.

### claude.ai (web)

1. [Unduh `last30days.skill`](https://github.com/mvanhorn/last30days-skill/releases/latest/download/last30days.skill) dari rilis terbaru
2. Buka [claude.ai > Customize > Skills](https://claude.ai/customize/skills)
3. Klik tombol `+` di panel Skills > klik `Create skill` > `Upload a skill` lalu telusuri/jatuhkan file-nya

Aktifkan "Code execution and file creation" di bawah Capabilities lebih dulu: skill tidak akan berjalan tanpanya.

### Claude Desktop

Claude Desktop memasang `/last30days` sebagai server MCP lewat bundel `.mcpb` (paket Model Context Protocol sekali klik).

1. Buka [rilis terbaru](https://github.com/mvanhorn/last30days-skill/releases/latest) dan unduh `.mcpb` untuk platformmu:
   - macOS Apple Silicon: `last30days-pp-mcp-darwin-arm64.mcpb`
   - macOS Intel: `last30days-pp-mcp-darwin-amd64.mcpb`
   - Linux x86_64: `last30days-pp-mcp-linux-amd64.mcpb`
2. Buka Claude Desktop, masuk ke Settings > Extensions, dan seret file-nya.
3. Saat diminta, tempel API key untuk sumber yang ingin kamu aktifkan. Setiap kolom opsional: engine turun ke mode web-saja bila kamu melewati semuanya. Kunci disimpan di keychain OS-mu.
4. Mulai ulang Claude Desktop. Minta Claude untuk "research Peter Steinberger" atau topik apa pun dan ia akan memanggil tool `research`.

**Persyaratan host:** Python 3.12+ di PATH. Bundel menyertakan sumber engine tetapi memakai interpreter Python lokalmu. Di Windows, pasang dari [python.org](https://www.python.org/downloads/); macOS dan sebagian besar distro Linux menyertakan versi yang kompatibel.

**Kunci tidak tersinkron dengan skill Code.** Claude Desktop dan Claude Code memelihara penyimpanan kredensial terpisah secara sengaja. Kalau kamu sudah mengonfigurasi `~/.config/last30days/.env` untuk skill Code, kamu perlu memasukkan kunci yang sama lagi di sini sekali.

Dukungan Windows ditunda sampai titik masuk manifest per platform diselesaikan; lacak di issue lanjutan.

### OpenClaw

```bash
clawhub install last30days-official
```

Untuk alur aksi X/Twitter di luar riset `/last30days`, seperti memposting tweet atau balasan, ekspor pengikut, penanganan media, monitor, dan pengundian giveaway, gunakan [TweetClaw](https://github.com/Xquik-dev/tweetclaw) sebagai plugin OpenClaw pendamping. TweetClaw dipelihara oleh Xquik-dev dan dicantumkan hanya sebagai jalur pendamping opsional, bukan dependensi atau dukungan dari last30days.

### Manual (developer)

```bash
git clone https://github.com/mvanhorn/last30days-skill.git
ln -s "$(pwd)/last30days-skill/skills/last30days" ~/.claude/skills/last30days
```

Symlink menjaga pemasangan tetap sinkron dengan pohon kerjamu saat kamu mengedit, tanpa menyalin ulang. Untuk `claude.ai`, bangun file `.skill` dari sumber: `bash skills/last30days/scripts/build-skill.sh` menghasilkan `dist/last30days.skill`.

Reddit (dengan komentar), Hacker News, Polymarket, dan GitHub langsung bekerja. Tanpa konfigurasi. Jalankan `/last30days` sekali dan wizard setup membuka lebih banyak sumber dalam 30 detik, termasuk CLI arXiv dan Techmeme yang gratis.

## Bawa kunci sendiri

Platform-platform ini tidak punya hubungan satu sama lain. X tidak tahu apa pikiran Reddit. YouTube tidak melihat TikTok. Tetapi kamu bisa membawa API key dan token browser sendiri, dan tiba-tiba kamu punya akses ke semuanya sekaligus.

| Sumber | Yang kamu butuhkan | Biaya |
|---------|---------------|------|
| Reddit (dengan komentar) + HN + Polymarket + GitHub + StockTwits | Tidak ada | Gratis |
| arXiv + Techmeme | CLI gratis, dipasang otomatis oleh setup pertama | Gratis |
| X / Twitter | Setel `X_BEARER_TOKEN` untuk API X resmi (postingan terbaru, sekitar seminggu terakhir, kecuali proyek developer X kamu punya akses arsip penuh; cadangan di Grok Bot setelah tool X bawaan bot, opt-in di tempat lain dengan `LAST30DAYS_X_BACKEND=xapi`), atau login ke x.com di browser mana pun, atau setel `XQUIK_API_KEY` / `XAI_API_KEY` | Kredit API X datang dari proyek developer X kamu; cookie browser gratis; kunci lain khusus penyedia |
| YouTube | `brew install yt-dlp` | Gratis |
| Bluesky | App password dari bsky.app | Gratis |
| TikTok + Instagram + Threads + Pinterest + LinkedIn + komentar YouTube | Kunci ScrapeCreators | 10.000 panggilan gratis, lalu bayar sesuai pakai |
| Xiaohongshu (RED) | Jalankan plugin browser x-mcp yang sudah login atau layanan `xiaohongshu-mcp` dan opt-in dengan `--search xhs` per run atau `INCLUDE_SOURCES=xiaohongshu` di `.env`; last30days memeriksa otomatis `http://localhost:18060` lalu `http://host.docker.internal:18060`, atau pakai `XIAOHONGSHU_API_BASE` untuk URL kustom | Tanpa API key last30days; bergantung pada layanan sesi browser lokalmu |
| DripStack (newsletter keuangan premium) | Opt-in: `--search dripstack` per run, atau `INCLUDE_SOURCES=dripstack` di `.env` | Tanpa kunci; API pencarian publik gratis |
| Perplexity Agent API / Search API / Deep Research | Kunci Perplexity, atau kunci OpenRouter sebagai fallback Sonar | Bayar sesuai pakai; kunci langsung mengaktifkan Agent API dan Deep Research latar belakang |
| Pencarian web | Kunci Brave Search | 2.000 kueri gratis/bulan |

### macOS Keychain (opsional)

Di macOS kamu bisa menyimpan kunci di Keychain sistem alih-alih file `.env`. Skill mengambilnya otomatis sebagai sumber berprioritas terendah: file `.env` dan environment proses tetap menang bila bentrok.

```bash
# Setup interaktif, menanyakan tiap kunci yang dikenal, lewati dengan input kosong
skills/last30days/scripts/setup-keychain.sh

# Atau simpan satu kunci dengan tangan
security add-generic-password -a "$USER" -s last30days-XAI_API_KEY -w "xai-..."

# Periksa / bersihkan
skills/last30days/scripts/setup-keychain.sh --list
skills/last30days/scripts/setup-keychain.sh --delete XAI_API_KEY
```

Item disimpan dengan nama layanan `last30days-<KEY>` untuk pengguna saat ini. Di platform non-Darwin loader tidak melakukan apa-apa, sehingga tidak ada perubahan perilaku bagi pengguna Linux/Windows.

Sudah punya kunci dengan nama layanan Keychain berbeda? Setel pemetaan non-rahasia `LAST30DAYS_KEYCHAIN_ALIASES` yang dijelaskan di [CONFIGURATION.md](https://github.com/mvanhorn/last30days-skill/blob/main/CONFIGURATION.md#reusing-existing-macos-keychain-items) alih-alih menyalin rahasia.

Lihat [CONFIGURATION.md](https://github.com/mvanhorn/last30days-skill/blob/main/CONFIGURATION.md) untuk matriks kunci per sumber lengkap, prioritas penyedia penalaran, dan prioritas backend pencarian web.

## Konfigurasi

Dua hal yang mungkin ingin kamu ketahui di hari pertama:

**Tempat file riset disimpan.** `LAST30DAYS_MEMORY_DIR` default-nya `~/Documents/Last30Days/` (Windows: `C:\Users\<you>\Documents\Last30Days\`). Timpa dengan menyetel env var itu ke path mana pun di shell kamu, atau `--save-dir <path>` per run. Pakai `--output <file>` bila kamu butuh hasil render di path yang persis, dengan format yang dipilih oleh `--emit`. Pakai `--save-suffix=<name>` untuk memisahkan beberapa variasi topik yang sama (misalnya per klien). Setiap run `--save-dir` menghasilkan `<slug>-raw[-suffix].md`. Opsional, jalankan `python3 skills/last30days/scripts/last30days.py --preflight` untuk meninjau penulisan yang direncanakan tanpa memulai riset.

**Keluaran terstruktur untuk agent dan alur kerja.** Minta `/last30days` JSON yang bisa dibaca mesin untuk menerima profil agent yang stabil dan berversi. Untuk pemakaian engine langsung di skrip atau pengembangan, jalankan `python3 skills/last30days/scripts/last30days.py "AI coding agents" --emit=json`; tambahkan `--json-profile=raw` hanya bila kamu butuh dump `Report` internal tanpa versi. Lihat [referensi field ekspor JSON dan kebijakan versi](https://github.com/mvanhorn/last30days-skill/blob/main/docs/reference/json-export.md).

**Penemuan tanpa topik.** Tanyakan `/last30days what's trending in AI agents?` untuk mendapat brief penemuan berperingkat alih-alih meriset topik yang sudah kamu tahu. Di host agent, ini menjalankan protokol tiga perintah yang dinilai host (model menamai topik, menyaring sampah, menilai kelayakan, dan menulis sudut konten). Untuk pemakaian engine langsung di skrip atau cron, jalankan `python3 skills/last30days/scripts/last30days.py --discover "AI agents"` (sekali jalan: nama topik deterministik, tanpa sudut); tambahkan `--emit=json` untuk kontrak penemuan berversi. Penemuan tidak bisa digabung dengan topik posisional dan `--drill`.

**Pemantauan tren lintas run.** Mode default menghasilkan snapshot markdown baru per run. Untuk mengakumulasi temuan dari waktu ke waktu, tambahkan `--store` untuk menyimpan ke database SQLite, lalu pakai [`scripts/watchlist.py`](https://github.com/mvanhorn/last30days-skill/blob/main/skills/last30days/scripts/watchlist.py) untuk run terjadwal (dengan pengiriman Slack / webhook opsional untuk temuan baru) dan [`scripts/briefing.py`](https://github.com/mvanhorn/last30days-skill/blob/main/skills/last30days/scripts/briefing.py) untuk rangkuman harian / mingguan. Pola kadens lengkap ada di [CONFIGURATION.md](https://github.com/mvanhorn/last30days-skill/blob/main/CONFIGURATION.md#trend-monitoring-store--watchlist--briefings).

**Pustaka riset yang bisa dilanggani.** Minta `/last30days` membangun feed pustaka kamu, atau pakai `python3 skills/last30days/scripts/last30days.py library feed` langsung untuk skrip dan pengembangan. Ini mengubah brief tersimpan menjadi `index.html`, `feed.xml` Atom lokal, dan halaman brief yang bisa dibaca. Tambahkan `--publish` hanya bila kamu ingin indeks HTML dan halaman brief di-host; penerbitan adalah opt-in eksplisit dan publik secara default. Agar feed Atom bisa dilanggani, host direktori keluaran yang dihasilkan di host statis seperti GitHub Pages.

**Cari semua yang pernah kamu riset.** Minta `/last30days search my library for MCP servers` atau `/last30days have I researched MCP servers before?`. Untuk pemakaian engine langsung, jalankan `python3 skills/last30days/scripts/last30days.py library search "MCP servers"`. Pencarian bersifat offline dan deterministik: ia mengindeks secara inkremental brief tersimpan yang sama dengan feed pustaka, menggabungkan penampakan per-run yang cocok dari store, dan mengelompokkan hasil menurut topik dan tanggal. Run baru juga menampilkan bagian ringkas **From your library** bila riset sebelumnya tumpang tindih dengan topik saat ini; setel `LAST30DAYS_LIBRARY_CONTEXT=off` untuk mematikan konteks pasif itu.

Skrip pembungkus per klien, subreddit rekan kategori kustom, dan kanal beta eksperimental untuk kustomisasi yang sedang berjalan juga didokumentasikan di [CONFIGURATION.md](https://github.com/mvanhorn/last30days-skill/blob/main/CONFIGURATION.md).

## Showcase: feed riset komunitas

Pernah menerbitkan pembaruan AI berkala, pemantau pasar, atau obsesi sempit yang menakjubkan dengan last30days? Bagikan URL pustaka publik, atau URL Atom setelah meng-host `feed.xml` di host statis, di [thread showcase komunitas](https://github.com/mvanhorn/last30days-skill/issues/532). Feed komunitas akan ditautkan di sini begitu pemiliknya mengirimkannya; sementara itu thread tersebut menjadi tempat pengumpulan.

## Cara kerjanya

1. **Kamu mengetik topik.** Orang, perusahaan, produk, teknologi, "X vs Y". Apa saja.
2. **Agent menentukan siapa yang penting.** Menemukan handle X (termasuk pendiri), repo GitHub, subreddit, hashtag TikTok, kanal YouTube. Untuk "Kanye West" ia tahu r/hiphopheads, @kanyewest, dan "bully review" di YouTube. Untuk "OpenClaw" ia menentukan openclaw/openclaw di GitHub dan mengambil jumlah bintang secara live.
3. **Semua sumber dicari secara paralel.** Ekspansi multi-kueri. Hasil dinilai menurut engagement, relevansi, kesegaran.
4. **Kedalaman yang tidak dimiliki orang lain.** Transkrip YouTube penuh dari video reaksi. Komentar Reddit teratas dengan jumlah upvote. Caption TikTok. Odds Polymarket. Bukan hanya judul dan tautan.
5. **Cerita yang sama digabung.** Wireless Festival diumumkan di Reddit, dibahas di X, harga tiket di TikTok = satu klaster, bukan tiga item terpisah.
6. **Disintesis menjadi satu brief.** Berlandaskan data spesifik. Dikutip menurut sumber. Diurutkan menurut apa yang benar-benar direspons orang. Bukan "ini yang saya temukan". Melainkan "ini yang penting".
7. **Lalu ia menjadi pakarmu.** Setelah satu run, sesi Claude kamu tahu semua yang diketahui komunitas. Ajukan pertanyaan lanjutan. Minta ia menulis prompt, menyusun email, merencanakan perjalanan, merancang sistem, semuanya berlandaskan apa yang nyata saat ini.

## Kata orang

> "I found a Claude Code skill that researches any topic across Reddit, X, YouTube, and HN from the last 30 days. Then writes the prompts for you. I've been manually searching Reddit and X for research before every piece of content I write. Tab by tab. Thread by thread. That's the part that takes 90 minutes. This eliminates it." -@itsjasonai

> "This one skill replaced my entire research workflow. You give it a topic, it scrapes Reddit, X, and the web for what people are actually talking about. Not old blog posts. Real conversations from the last 30 days." -@itswilsoncharles

> "5 of the 10 trending repos on GitHub today are Claude tools. #1: mvanhorn/last30days-skill" -@yieldhunter95

## Open source

Lisensi MIT. Tanpa pelacakan. Tanpa analitik. Risetmu tetap di mesinmu (lihat Penanganan data di bawah).

Untuk perintah tes, lihat [CONTRIBUTING.md](https://github.com/mvanhorn/last30days-skill/blob/main/CONTRIBUTING.md#tests).

Dibangun dengan Python 3.12+, yt-dlp, Node.js (klien Bird yang di-vendor untuk pencarian X), dan API ScrapeCreators. Arsitektur engine v3 oleh [@j-sperling](https://github.com/j-sperling).

Lihat [CONTRIBUTING.md](https://github.com/mvanhorn/last30days-skill/blob/main/CONTRIBUTING.md) untuk membuka PR, [CONTRIBUTORS.md](https://github.com/mvanhorn/last30days-skill/blob/main/CONTRIBUTORS.md) untuk daftar lengkap kontributor komunitas, dan [CHANGELOG.md](https://github.com/mvanhorn/last30days-skill/blob/main/CHANGELOG.md) untuk riwayat versi.

## Penanganan data

Secara default skill berjalan sepenuhnya di mesinmu: tidak ada data yang keluar kecuali ke API pencarian yang kamu panggil (Reddit, ScrapeCreators, dan lainnya).

**Reranking.** Saat kamu mengonfigurasi penyedia penalaran (`OPENAI_API_KEY`, `XAI_API_KEY`, `OPENROUTER_API_KEY`, `GOOGLE_API_KEY`, `GEMINI_API_KEY`, atau `GOOGLE_GENAI_API_KEY`), engine mengirim topik risetmu dan cuplikan konten yang diambil ke penyedia itu untuk penilaian relevansi. Ini opt-in: kalau kamu tidak menyetel kunci penalaran, engine kembali ke model penilaian lokal dan tidak ada panggilan reranking eksternal. Lihat [CONFIGURATION.md](https://github.com/mvanhorn/last30days-skill/blob/main/CONFIGURATION.md) untuk prioritas penyedia.

**Store lokal.** Saat `LAST30DAYS_STORE=1` disetel, temuan disimpan ke database SQLite lokal bernama `research.db` di dalam direktori simpan yang berlaku (`--save-dir` didahulukan atas `LAST30DAYS_MEMORY_DIR`). Kalau tidak ada direktori simpan yang berlaku, database berada di `~/.local/share/last30days/research.db`. Mengaktifkan store tidak mengunggah databasenya ke layanan jarak jauh. Lihat [CONFIGURATION.md](https://github.com/mvanhorn/last30days-skill/blob/main/CONFIGURATION.md#--store-flag) untuk detail retensi dan instruksi penghapusan, termasuk menghentikan pengguna database sebelum menghapus.

## Lisensi

MIT. Kontak: **@slashlast30days** · [github.com/mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)
