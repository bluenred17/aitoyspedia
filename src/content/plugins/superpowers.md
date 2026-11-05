---
title: "Superpowers"
summary: "Metodologi pengembangan perangkat lunak lengkap untuk coding agent: brainstorming, rencana, TDD, subagent, dan review, dipicu otomatis lewat kumpulan skill."
category: coding
tags: [metodologi, tdd, brainstorming, subagent, code-review, workflow]
surfaces: [claude-code]
source_url: "https://github.com/obra/superpowers/blob/main/README.md"
repo: obra/superpowers
stars: 312492
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
install: |
  /plugin install superpowers@claude-plugins-official
includes: [brainstorming, using-git-worktrees, writing-plans, subagent-driven-development, executing-plans, test-driven-development, requesting-code-review, receiving-code-review, finishing-a-development-branch, systematic-debugging, verification-before-completion, diagnosing-superpowers, dispatching-parallel-agents, writing-skills, using-superpowers]
---

# Superpowers

Superpowers adalah metodologi pengembangan perangkat lunak lengkap untuk coding agent kamu. Isinya kumpulan skill yang bisa disusun bersama, ditambah beberapa instruksi awal yang memastikan agent benar-benar memakainya.

## Cara kerjanya

Semuanya dimulai sejak agent dijalankan. Begitu agent melihat kamu sedang membangun sesuatu, ia *tidak* langsung menulis kode. Ia mundur selangkah dan menanyakan apa yang sebenarnya ingin kamu capai.

Setelah spesifikasi tergali dari percakapan, agent menampilkannya dalam potongan yang cukup pendek untuk dibaca dan dicerna.

Setelah kamu menyetujui desainnya, agent menyusun rencana implementasi yang cukup jelas untuk diikuti seorang engineer junior yang antusias, tanpa selera, tanpa penilaian, tanpa konteks proyek, dan enggan menulis tes. Rencana itu menekankan TDD red/green sejati, YAGNI (You Aren't Gonna Need It), dan DRY.

Lalu, begitu kamu bilang "go", agent menjalankan proses *subagent-driven-development*: tiap tugas rekayasa dikerjakan agent, hasilnya diperiksa dan ditinjau, lalu lanjut ke tugas berikutnya. Agent sering bekerja mandiri selama beberapa jam tanpa menyimpang dari rencana yang sudah kamu susun.

Masih ada banyak hal lain, tetapi itulah inti sistemnya. Karena skill dipicu otomatis, kamu tidak perlu melakukan apa pun yang khusus. Coding agent kamu langsung punya Superpowers.

## Instalasi

### Claude Code

Superpowers tersedia lewat [marketplace plugin resmi Claude](https://claude.com/plugins/superpowers).

#### Marketplace resmi

- Pasang plugin dari marketplace resmi Anthropic:

  ```bash
  /plugin install superpowers@claude-plugins-official
  ```

#### Marketplace Superpowers

Marketplace Superpowers menyediakan Superpowers dan beberapa plugin terkait lainnya untuk Claude Code.

- Daftarkan marketplace-nya:

  ```bash
  /plugin marketplace add obra/superpowers-marketplace
  ```

- Pasang plugin dari marketplace tersebut:

  ```bash
  /plugin install superpowers@superpowers-marketplace
  ```

Cara pasang berbeda-beda per harness. Kalau kamu memakai lebih dari satu, pasang Superpowers secara terpisah untuk masing-masing.

### Antigravity

Pasang Superpowers sebagai plugin dari repositori ini:

```bash
agy plugin install https://github.com/obra/superpowers
```

Antigravity menampilkan deskripsi setiap skill yang terpasang, dan deskripsi skill `using-superpowers` mendorong model memuat skill itu di awal percakapan. Pasang ulang dengan perintah yang sama untuk memperbarui.

### Codex App

Superpowers tersedia lewat [marketplace plugin Codex resmi](https://github.com/openai/plugins).

- Di aplikasi Codex, klik Plugins di sidebar.
- Kamu akan melihat `Superpowers` di bagian Coding.
- Klik `+` di sebelah Superpowers dan ikuti petunjuknya.

### Codex CLI

Superpowers tersedia lewat [marketplace plugin Codex resmi](https://github.com/openai/plugins).

- Buka antarmuka pencarian plugin:

  ```bash
  /plugins
  ```

- Cari Superpowers:

  ```bash
  superpowers
  ```

- Pilih `Install Plugin`.

### Cursor

- Di chat Cursor Agent, pasang dari marketplace:

  ```text
  /add-plugin superpowers
  ```

- Atau cari "superpowers" di marketplace plugin.

### Devin CLI

- Pasang plugin dari repositori ini:

  ```bash
  devin plugins install obra/superpowers
  ```

- Perbarui ke versi terbaru dengan:

  ```bash
  devin plugins update superpowers
  ```

### Factory Droid

- Daftarkan marketplace-nya:

  ```bash
  droid plugin marketplace add https://github.com/obra/superpowers
  ```

- Pasang plugin-nya:

  ```bash
  droid plugin install superpowers@superpowers
  ```

### Gemini CLI

- Pasang ekstensinya:

  ```bash
  gemini extensions install https://github.com/obra/superpowers
  ```

- Perbarui kemudian:

  ```bash
  gemini extensions update superpowers
  ```

### GitHub Copilot CLI

- Daftarkan marketplace-nya:

  ```bash
  copilot plugin marketplace add obra/superpowers-marketplace
  ```

- Pasang plugin-nya:

  ```bash
  copilot plugin install superpowers@superpowers-marketplace
  ```

### Grok Build CLI

Superpowers tersedia lewat [marketplace plugin Grok resmi](https://github.com/xai-org/plugin-marketplace).

- Pasang plugin dari marketplace resmi xAI:

  ```bash
  grok plugin install superpowers@xai-official --trust
  ```

- Atau buka marketplace di TUI, cari Superpowers, lalu pasang:

  ```text
  /marketplace
  ```

### Kimi Code

Superpowers tersedia di marketplace plugin Kimi Code.

- Buka pengelola plugin Kimi Code:

  ```text
  /plugins
  ```

- Masuk ke `Marketplace` > `Superpowers` lalu pasang.

- Atau pasang langsung dari repositori ini:

  ```text
  /plugins install https://github.com/obra/superpowers
  ```

- Dokumentasi rinci: [docs/README.kimi.md](https://github.com/obra/superpowers/blob/main/docs/README.kimi.md)

### OpenCode

OpenCode memakai pemasangan plugin sendiri. Pasang Superpowers secara terpisah walaupun kamu sudah memakainya di harness lain.

- Katakan kepada OpenCode:

  ```
  Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
  ```

  Perhatikan bahwa cara ini membuat agent mengambil lalu mengikuti instruksi dari sebuah URL jarak jauh. Bacalah isi file itu dulu sebelum menjalankannya.

- Dokumentasi rinci: [docs/README.opencode.md](https://github.com/obra/superpowers/blob/main/docs/README.opencode.md)

### Pi

Pasang Superpowers sebagai paket Pi dari repositori ini:

```bash
pi install git:github.com/obra/superpowers
```

Untuk pengembangan lokal, jalankan Pi dengan checkout ini dimuat sebagai paket sementara:

```bash
pi -e /path/to/superpowers
```

Paket Pi memuat skill Superpowers dan ekstensi kecil yang menyuntikkan bootstrap `using-superpowers` saat sesi dimulai dan sekali lagi setelah kompaksi. Pi punya skill native, sehingga tidak perlu tool `Skill` kompatibilitas. Tool subagent dan daftar tugas tetap berupa paket pendamping Pi yang opsional.

### Qwen Code

Qwen Code memasang plugin langsung dari marketplace Claude Code.

- Pasang plugin dari repositori ini, dan pilih `superpowers` saat diminta:

  ```bash
  qwen extensions install obra/superpowers
  ```

- Perbarui kemudian:

  ```bash
  qwen extensions update superpowers
  ```

### Hermes Agent

Pasang Superpowers sebagai plugin Hermes dari repositori ini:

```bash
hermes plugins install obra/superpowers --enable
```

Mulai ulang sesi Hermes yang aktif setelah memasang. Catatan: Hermes tidak punya hook pasca-kompaksi, jadi sesi yang sangat panjang dan terkompaksi melewati giliran pertamanya akan kehilangan bootstrap. Mulai sesi baru bila skill berhenti terpicu.

### Muse

Superpowers tersedia sebagai plugin Muse native: repositori sama, skill sama, semua harness. Bootstrap `using-superpowers` disuntikkan lewat hook `SessionStart` native, seperti pada Claude Code, Codex, Cursor, Gemini, Pi, dan lainnya, tanpa opt-in per sesi.

- Pasang dari checkout lokal:

  ```bash
  muse plugins install ./
  muse plugins approve superpowers
  ```

  Atau clone lalu pasang:

  ```bash
  git clone https://github.com/obra/superpowers.git
  muse plugins install ./superpowers
  muse plugins approve superpowers
  ```

- Perbarui kemudian:

  ```bash
  muse plugins update superpowers
  ```

Mulai ulang sesi Muse yang aktif setelah memasang agar hook `SessionStart` berlaku. Skill langsung aktif, sedangkan hook membutuhkan persetujuan pada pemasangan pertama. Untuk memverifikasi, mulai sesi baru dan kirim `Let's make a react todo list`; pemasangan yang berfungsi akan memicu `brainstorming` otomatis sebelum kode apa pun ditulis. Versi dilacak di `.version-bump.json` sehingga `scripts/bump-version.sh` menjaganya tetap sinkron.

## Alur kerja dasar

1. **brainstorming** - Aktif sebelum membangun apa pun. Menggali apa yang sebenarnya kamu mau dan mengapa, lewat pertanyaan yang membuat kamu menjelaskannya, lalu memutar ulang pemahamannya untuk dikoreksi. Perubahan kecil disepakati di chat. Proyek mendapat dokumen desain tertulis yang bisa dipakai penyusun rencana.

2. **using-git-worktrees** - Aktif setelah desain disetujui. Membuat ruang kerja terisolasi di branch baru, menjalankan setup proyek, dan memastikan baseline tes bersih.

3. **writing-plans** - Aktif setelah desain disetujui. Memecah pekerjaan menjadi tugas kecil (2-5 menit). Tiap tugas punya path file yang tepat, kode lengkap, dan langkah verifikasi.

4. **subagent-driven-development** atau **executing-plans** - Aktif setelah ada rencana. Pilihannya: menjalankan subagent baru per tugas dengan review setelah tiap tugas (paling teliti), atau mengerjakan semua tugas langsung di sesi saat ini dengan satu review segar atas seluruh branch di akhir (paling hemat).

5. **test-driven-development** - Aktif saat implementasi. Menegakkan RED-GREEN-REFACTOR: tulis tes yang gagal, lihat ia gagal, tulis kode seminimal mungkin, lihat ia lulus, lalu commit. Kode yang ditulis sebelum tes dihapus.

6. **requesting-code-review** - Aktif di antara tugas. Meninjau terhadap rencana dan melaporkan masalah menurut tingkat keparahan. Masalah kritis menghentikan kemajuan.

7. **finishing-a-development-branch** - Aktif saat semua tugas selesai. Memverifikasi tes, menyajikan pilihan (merge/PR/simpan/buang), dan membersihkan worktree.

**Agent memeriksa skill yang relevan sebelum tugas apa pun.** Alur ini wajib, bukan sekadar saran.

## Bila ada yang salah

Kadang sesi berperilaku aneh: skill aktif padahal tidak seharusnya, diam padahal seharusnya aktif, atau agent mengabaikan rencananya, mengulang pekerjaan, atau memakai token lebih banyak dari yang diperkirakan. Minta coding agent kamu untuk "mencari tahu apa yang salah dengan superpowers di sesi ini", maka ia akan memanggil skill **diagnosing-superpowers**. Untuk memeriksa sesi sebelumnya, sebutkan sesinya: "cari tahu apa yang salah dengan superpowers di sesi `<id>`".

Skill itu membaca transkrip sesi, melaporkan apa yang terjadi lengkap dengan bukti per baris, dan, bila kamu mau, mengemas bundel yang sudah dibersihkan untuk laporan bug.

## Isi paket

### Pustaka skill

**Pengujian**
- **test-driven-development** - Siklus RED-GREEN-REFACTOR (termasuk referensi anti-pola pengujian)

**Debugging**
- **systematic-debugging** - Proses akar masalah 4 fase (termasuk teknik root-cause-tracing, defense-in-depth, dan condition-based-waiting)
- **verification-before-completion** - Pastikan benar-benar sudah beres
- **diagnosing-superpowers** - Mencari tahu apa yang salah di sebuah sesi, dengan bukti; ekspor bundel yang sudah dibersihkan atau buat issue

**Kolaborasi**
- **brainstorming** - Menggali maksud sebelum membangun
- **writing-plans** - Rencana implementasi rinci
- **executing-plans** - Eksekusi rencana langsung di sesi: satu konteks, satu review akhir
- **dispatching-parallel-agents** - Alur kerja subagent yang berjalan bersamaan
- **requesting-code-review** - Daftar periksa sebelum review
- **receiving-code-review** - Menanggapi masukan
- **using-git-worktrees** - Branch pengembangan paralel
- **finishing-a-development-branch** - Alur keputusan merge/PR
- **subagent-driven-development** - Iterasi cepat dengan review dua tahap (kesesuaian spesifikasi, lalu kualitas kode)

**Meta**
- **writing-skills** - Membuat skill baru mengikuti praktik terbaik (termasuk metodologi pengujian)
- **using-superpowers** - Pengantar sistem skill

## Filosofi

- **Test-Driven Development** - Selalu tulis tes dulu
- **Sistematis, bukan ad-hoc** - Proses lebih baik daripada menebak
- **Mengurangi kompleksitas** - Kesederhanaan sebagai tujuan utama
- **Bukti di atas klaim** - Verifikasi sebelum menyatakan berhasil

Baca [pengumuman rilis aslinya](https://blog.fsck.com/2025/10/09/superpowers/).

## Pembaruan

Pembaruan Superpowers bergantung pada coding agent yang dipakai, tetapi umumnya berjalan otomatis.

## Telemetri visual companion

Skill dan plugin tidak memberi umpan balik kepada pembuatnya, sehingga mereka tidak tahu berapa banyak orang yang memakai Superpowers. Secara bawaan, logo Prime Radiant pada fitur opsional visual companion di brainstorming dimuat dari situs web mereka. Permintaan itu menyertakan versi Superpowers yang dipakai. Isinya tidak mencakup detail proyek, prompt, atau coding agent kamu. Klik kamu atau apa yang kamu bangun tidak terlihat oleh mereka. Fitur ini 100% opsional. Untuk menonaktifkannya, setel variabel lingkungan `SUPERPOWERS_DISABLE_TELEMETRY` ke nilai true apa pun. Superpowers juga menghormati opsi `DISABLE_TELEMETRY` dan `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` milik Claude Code.

## Lisensi

Lisensi MIT. Lihat file LICENSE di repo.
