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

README juga memuat cara pasang untuk harness lain (Codex, Cursor, Gemini CLI, OpenCode, dan seterusnya). Bagian itu tidak diterjemahkan di sini karena situs ini berfokus pada Claude. Lihat [README aslinya](https://github.com/obra/superpowers/blob/main/README.md).

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
