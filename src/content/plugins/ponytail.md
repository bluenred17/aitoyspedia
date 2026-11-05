---
title: "Ponytail"
summary: "Plugin yang menanamkan 'senior dev pemalas' ke agent AI: menulis hanya kode yang dibutuhkan tugas tanpa memangkas validasi, keamanan, atau aksesibilitas, lengkap dengan perintah review, audit, dan band biaya di Claude Code."
category: coding
tags: [coding, code-review, audit, hemat-token, minimalis, hooks, claude-code, codex]
surfaces: [claude-code]
source_url: "https://github.com/DietrichGebert/ponytail/blob/main/README.md"
repo: DietrichGebert/ponytail
stars: 184651
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
install: |
  # Claude Code (dua prompt terpisah)
  /plugin marketplace add DietrichGebert/ponytail
  /plugin install ponytail@ponytail

  # Codex
  codex plugin marketplace add DietrichGebert/ponytail
  codex plugin add ponytail@ponytail
  # lalu buka /hooks di Codex, percayai dua lifecycle hook-nya, dan mulai thread baru

  # Agent lain: salin AGENTS.md ke proyekmu, atau minta agent memasang skills/ponytail/SKILL.md sebagai skill.
  # Langkah rinci untuk Copilot, Cursor, OpenCode, Gemini, dan lainnya ada di INSTALL.md:
  # https://github.com/DietrichGebert/ponytail/blob/main/INSTALL.md
includes: [ponytail, ponytail-review, ponytail-audit, ponytail-debt, ponytail-gain, ponytail-help, band]
---

# Ponytail

*Dia tidak bilang apa-apa. Dia menulis satu baris. Jalan.*

> **Catatan dari situs ini:** (1) Angka benchmark di bawah adalah klaim pembuat repo, diukur di Claude Code dengan Opus 5.5 (39 tugas, 5 kali jalan tiap tugas); metode dan tabelnya ada di [laporan benchmark](https://github.com/DietrichGebert/ponytail/blob/main/benchmarks/results/2026-10-07-agentic.md). (2) Pemasangan agent selain Claude Code dan Codex ada di [INSTALL.md](https://github.com/DietrichGebert/ponytail/blob/main/INSTALL.md) yang ditautkan README; isinya tidak disalin di sini. (3) Bagian promosi, sponsor, badge, dan riwayat bintang tidak disalin.

![Ponytail 5: -53% kode, -41% waktu, -26% biaya, -45% token, dan 98% logika berisiko punya tes](https://raw.githubusercontent.com/DietrichGebert/ponytail/main/assets/v5/hero.jpg)

**Ponytail 5: dibangun ulang dari dasar.**
**-53% kode · -41% waktu · -26% biaya · -45% token**
**Namun: 98% logika berisiko dikirim bersama tes.** Tanpa Ponytail: 68%.
Diuji di Claude Code, agent yang sama dengan dan tanpa skill: 39 tugas termasuk repo FastAPI + React sungguhan, Opus 5.5, 5 kali jalan tiap tugas. [Detail](#angka).

Kamu kenal dia. Ekor kuda panjang. Kacamata oval. Sudah di perusahaan lebih lama daripada version control. Kamu tunjukkan lima puluh baris; dia melihatnya, tidak bilang apa-apa, lalu menggantinya dengan satu baris.

Ponytail menaruh dia di dalam agent AI kamu.

## Angka

![Porsi dari baseline tanpa skill. Baris kode: Ponytail v4.13 52%, Ponytail 5 47%. Token keluaran: 57% dan 55%. Biaya: 84% dan 74%. Waktu: 62% dan 59%.](https://raw.githubusercontent.com/DietrichGebert/ponytail/main/assets/v5/chart.png)

![Setengah kode, tapi lebih baik: 98% logika berisiko dikirim dengan tes (tanpa skill 68%); tes buatan agent menangkap 66% bug yang disuntikkan (tanpa skill 46%).](https://raw.githubusercontent.com/DietrichGebert/ponytail/main/assets/v5/tests.png)

Dua hal yang tidak ditampilkan grafik: dalam perbandingan buta, balasan Ponytail 5 mengalahkan Ponytail sebelumnya 110 banding 67. Dan pada enam tugas keamanan (SQL injection, path traversal, token palsu, pembatasan laju, baris CSV rusak, caching), ia lulus semua 30 kali jalan: kode lebih sedikit, tidak kurang aman. Metode, tabel per tugas, dan batasannya: [benchmarks/results/2026-10-07-agentic.md](https://github.com/DietrichGebert/ponytail/blob/main/benchmarks/results/2026-10-07-agentic.md).

**Aturannya bukan pernah "token paling sedikit".** Aturannya: tulis hanya yang dibutuhkan tugas, dan jangan pernah memangkas validasi, penanganan galat, keamanan, atau aksesibilitas. Kodenya jadi kecil karena memang itu yang perlu, bukan karena di-golf. Biaya dan latensi yang lebih rendah hanyalah efek samping.

## Sebelum / sesudah

![Tambah date picker ke frontend. Tanpa skill: 335 baris, kalender dan date picker dibuat manual. Ponytail 5: satu file 10 baris yang memakai ulang Input repo dengan type date, sehingga browser yang membawa kalendernya.](https://raw.githubusercontent.com/DietrichGebert/ponytail/main/assets/v5/beforeafter.png)

Kamu meminta date picker. Tanpa Ponytail, agent memasang pustaka date picker atau membangun seluruh kalender dengan tangan: 335 baris. Ponytail 5 lebih dulu melihat apa yang sudah ada: repo punya komponen `Input`, dan setiap browser punya date picker. Ia menggabungkan keduanya. 10 baris.

Contoh lain yang selamat ada di [examples/](https://github.com/DietrichGebert/ponytail/blob/main/examples/).

## Review, dibangun ulang

![Review dibangun ulang. Temuan /ponytail-review nyata dari benchmark: perubahan mengganti nama sebuah field, dan file yang tak tersentuh, src/routes/feed.js, kini crash. Harus diperbaiki: feed Atom crash di setiap permintaan. 100% masalah yang ditanam ditemukan, tanpa skill 87%. 100% masalah di luar diff ditemukan, tanpa skill 78%.](https://raw.githubusercontent.com/DietrichGebert/ponytail/main/assets/v5/review.png)

`/ponytail-review` dulu hanya mencari kode yang bisa dibuang. Sekarang ia mereview seperti senior dev yang dipanggil saat sesuatu rusak: membaca kode yang disentuh perubahanmu, bukan hanya diff-nya, dan memeriksa bug, keamanan, beban nyata, tes yang hilang, kecepatan, dan apa yang bisa dibuang. Tiap temuan menyebut apa yang dilakukan kode, apa yang salah, cara memperbaikinya, dan apa yang terjadi bila dilewati.

## Audit, dibangun ulang

![Seluruh repomu, diurutkan. Perbaiki ini dulu. /ponytail-audit nyata dari benchmark pada repo stok gudang: 1 harus diperbaiki, batch kantor berisi 1.200 gagal total; 2 harus diperbaiki, impor diam-diam melewati baris rusak; 3 harus diperbaiki, SKU salah ketik di batch kantor diabaikan diam-diam; 4 sebaiknya diperbaiki, jalur kode berisiko tanpa tes; 5 bagus kalau ada, API crash pada body yang bukan objek. Vonis: perbaiki nomor 1 dulu.](https://raw.githubusercontent.com/DietrichGebert/ponytail/main/assets/v5/audit.png)

`/ponytail-audit` menjalankan pemeriksaan yang sama pada seluruh repo. Ia memetakan kode dulu: titik masuk, aliran data, beban yang diharapkan proyek. Lalu ia mengurutkan temuannya dan memberi tahu apa yang harus diperbaiki pertama. Audit lama hanya mendaftar apa yang bisa dihapus.

## Baru di 5.3: band

![Band ponytail di Claude Code, di atas prompt. Mode detail: biaya $23,80, giliran terakhir $1,14, rata-rata $0,72 per giliran; 56,7 juta token, 168 ribu keluaran, 33 giliran; waktu agent 52m 14s; pemakaian ulang 71%, 5 dipakai, 2 baru; tes lulus setelah perubahan terakhir. Mode ringkas menampilkan hal yang sama dalam satu baris.](https://raw.githubusercontent.com/DietrichGebert/ponytail/main/assets/band/band.png)

Di Claude Code, ponytail kini menampilkan band di atas prompt: berapa biaya tugas saat ini, berapa token dan waktu agent yang terpakai, seberapa sering ia memakai ulang kode yang ada alih-alih menulis kode baru, dan apakah tes lulus setelah perubahan terakhir. Tombolnya mengganti level, menjalankan `/ponytail-review` atau `/ponytail-audit`, menyalin tugas sebagai Markdown, dan melipat band menjadi satu baris. Tidak mau? `/ponytail band` menyembunyikannya, perintah yang sama mengembalikannya. Membutuhkan Claude Code 2.1.290 atau lebih baru, di terminal atau aplikasi desktop. Band tidak tampil di panel chat VS Code, sesi cloud, atau `claude -p`.

![Board ponytail, halaman lokal: 61 sesi, 20j 13m waktu agent, $285,30 dan 492,5 juta token dalam 30 hari terakhir; waktu agent per proyek dari waktu ke waktu; sesi terbaru beserta tesnya; hari aktif dan beruntun.](https://raw.githubusercontent.com/DietrichGebert/ponytail/main/assets/band/board.png)

**Board** membuka halaman lokal berisi setiap tugas di semua proyekmu: biaya, waktu agent, dan token dari waktu ke waktu, setiap sesi beserta tesnya, dan hari-hari kamu bekerja. Secara default, semuanya tetap di mesinmu, di `~/.config/ponytail/band/`. `/ponytail band import` menambahkan sesi Claude Code lamamu ke dalamnya, lengkap dengan biaya, waktu agent, dan token.

## Cara kerja

![Sebelum menulis kode, berhenti di anak tangga pertama yang berlaku: 1 apakah ini perlu ada, 2 sudah ada di codebase ini, 3 apakah standard library bisa, 4 fitur native platform, 5 dependensi terpasang, 6 bisakah jadi satu baris, 7 baru kemudian minimum yang berfungsi, ditambah satu tes kecil bila ada logika.](https://raw.githubusercontent.com/DietrichGebert/ponytail/main/assets/v5/ladder.png)

Tangga itu berjalan *setelah* ia memahami masalahnya, bukan sebagai gantinya: ia membaca kode yang disentuh perubahan dan menelusuri alur sebenarnya sebelum memilih anak tangga. Malas soal solusi, tidak pernah malas soal membaca.

Malas, bukan lalai: validasi di batas kepercayaan, penanganan kehilangan data, keamanan, dan aksesibilitas tidak pernah masuk talenan.

Logika dengan percabangan, perulangan, parser, uang, atau keamanan meninggalkan satu tes kecil. Setiap balasan diakhiri dengan apa yang dilewati atau tidak diperiksa dan risiko apa pun yang perlu kamu ketahui.

## Prompt-nya

Ponytail adalah satu prompt: [`skills/ponytail/SKILL.md`](https://github.com/DietrichGebert/ponytail/blob/main/skills/ponytail/SKILL.md). Versi ringkasnya, untuk agent yang membaca file aturan, adalah [`AGENTS.md`](https://github.com/DietrichGebert/ponytail/blob/main/AGENTS.md). Semua yang lain di repo ini memuat prompt itu ke berbagai agent.

## Pasang

**Claude Code**, sebagai dua prompt terpisah:

```
/plugin marketplace add DietrichGebert/ponytail
```
```
/plugin install ponytail@ponytail
```

**Codex:**

```bash
codex plugin marketplace add DietrichGebert/ponytail
codex plugin add ponytail@ponytail
```

Lalu buka `/hooks` di Codex, percayai dua lifecycle hook-nya, dan mulai thread baru.

**Agent lain:** salin [`AGENTS.md`](https://github.com/DietrichGebert/ponytail/blob/main/AGENTS.md) ke proyekmu, atau minta agent kamu memasang [`skills/ponytail/SKILL.md`](https://github.com/DietrichGebert/ponytail/blob/main/skills/ponytail/SKILL.md) sebagai skill. Langkah demi langkah untuk Copilot, Cursor, OpenCode, Gemini, dan sisanya: **[INSTALL.md](https://github.com/DietrichGebert/ponytail/blob/main/INSTALL.md)**.

Hanya itu. Dia akan bangga. Dia tidak akan mengatakannya.

Aktif di setiap sesi, dengan beberapa perintah (lihat [Perintah](#perintah)). `/ponytail ultra` ada untuk saat codebase telah menzalimimu secara pribadi. Teks saat mulai dan saat pergantian mode menampilkan mode saat ini.

Pasang ponytail hanya dari `DietrichGebert/ponytail` di GitHub atau `@dietrichgebert/ponytail` di npm. Ia tidak pernah menyertakan file `.exe` atau `.dll`; salinan yang menyertakannya bukan milik pembuatnya.

## Perintah

| Perintah | Fungsinya |
|---------|--------------|
| `/ponytail [lite \| full \| ultra \| off]` | Atur intensitas, atau matikan. Tanpa argumen, ponytail dinyalakan di level default bila sedang mati, dan bila tidak, melaporkan level saat ini. |
| `/ponytail band [on \| off]` | Hanya Claude Code: sembunyikan atau tampilkan band di atas prompt. Tanpa argumen, ia menukar keadaannya. Level tetap. |
| `/ponytail band import` | Hanya Claude Code: tambahkan sesi Claude Code lamamu ke board, dengan biaya, waktu agent, dan token. |
| `/ponytail-review` | Review diff saat ini seperti senior dev yang dipanggil saat sesuatu rusak: bug, keamanan, beban nyata, kode berisiko tanpa tes, jalur lambat, dan apa yang bisa dibuang. Tiap temuan menyebut apa yang dilakukan kode, apa yang salah, cara memperbaikinya, dan apa yang terjadi bila dilewati. Sebut target dengan kata biasa untuk mempersempit atau memperluasnya: `uncommitted`, `staged`, `branch`, atau tautan PR. |
| `/ponytail-audit` | Pemeriksaan yang sama untuk seluruh repo, yang terpenting lebih dulu. |
| `/ponytail-debt` | Kumpulkan komentar `shortcut:` yang kamu tunda ke dalam buku besar, agar "nanti" tidak menjadi "tidak pernah". |
| `/ponytail-gain` | Tampilkan papan skor dampak terukur (kode lebih sedikit, biaya lebih rendah, lebih cepat) dari benchmark. |
| `/ponytail-help` | Referensi cepat untuk perintah di atas. |

Perintah membutuhkan host yang mampu memuat skill (Claude Code, Codex, Devin CLI, OpenCode, Gemini, Antigravity CLI, pi, Hermes Agent, Qoder, Grok Build). Di Codex CLI dan ekstensi IDE, perintah itu berupa skill di bawah namespace plugin; panggil dengan `$ponytail:ponytail-review`. Cursor dengan [hooks](https://github.com/DietrichGebert/ponytail/blob/main/INSTALL.md#cursor) hanya mendapat pergantian level `/ponytail`, diketik sebagai pesan biasa. Adapter yang hanya berisi instruksi (file aturan Cursor, Windsurf, Cline, Copilot, Kiro, fallback `AGENTS.md` Antigravity) memuat aturan yang selalu aktif tanpa perintah.

## FAQ

**Apakah butuh file konfigurasi?**
Tidak. File opsional `~/.config/ponytail/config.json` atau variabel lingkungan `PONYTAIL_DEFAULT_MODE` bisa menetapkan level default, tetapi tidak ada yang wajib.

**Mengapa ia menulis komentar `shortcut:`?**
Komentar itu menandai jalan pintas yang disengaja dan kapan harus ditinjau ulang, dan `/ponytail-debt` mengumpulkannya ke buku besar. Mau kata lain, atau tidak ada? Katakan di `CLAUDE.md` atau `AGENTS.md` proyekmu, lalu jalankan `/ponytail-debt <kata kamu>`.

**Bagaimana kalau aku benar-benar butuh kelas cache 120 baris itu?**
Tidak butuh. Tetap memaksa pun dia akan membuatnya. Pelan-pelan. Dengan benar. Sambil menatapmu.

**Apakah ini skalabel?**
Kode yang tidak pernah kamu tulis skalabel tanpa batas. Nol bug, nol CVE, uptime 100% sejak dulu.

**Mengapa "ponytail"?**
Kamu tahu persis kenapa.

## Lisensi

[MIT](https://github.com/DietrichGebert/ponytail/blob/main/LICENSE). Lisensi terpendek yang berfungsi.
