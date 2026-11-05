---
title: "Karpathy-Inspired Claude Code Guidelines"
summary: "Satu file CLAUDE.md berisi empat prinsip (berpikir sebelum coding, kesederhanaan, perubahan bedah, eksekusi berbasis tujuan) untuk memperbaiki perilaku Claude Code, diturunkan dari pengamatan Andrej Karpathy tentang jebakan coding LLM."
category: coding
tags: [claude-md, pedoman, karpathy, kesederhanaan, code-review, prinsip]
surfaces: [claude-code]
source_url: "https://github.com/multica-ai/andrej-karpathy-skills/blob/main/README.md"
repo: multica-ai/andrej-karpathy-skills
stars: 229547
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
trigger: "Aktif sebagai pedoman perilaku saat Claude Code menulis atau mengubah kode, terutama pekerjaan non-trivial."
install: |
  /plugin marketplace add forrestchang/andrej-karpathy-skills
  /plugin install andrej-karpathy-skills@karpathy-skills
---

# Karpathy-Inspired Claude Code Guidelines

> **Catatan dari situs ini:** GitHub tidak mendeteksi lisensi apa pun di repo `multica-ai/andrej-karpathy-skills`, tetapi README menyatakan lisensi MIT. Lisensi MIT di entri ini mengikuti pernyataan README. Perintah pasang di bawah mengambil dari repo `forrestchang/andrej-karpathy-skills`, bukan `multica-ai/...` yang menjadi `source_url`. Perintah disalin persis dari README dan hubungan kedua repo belum diverifikasi.

> Lihat proyek baru saya [Multica](https://github.com/multica-ai/multica), platform open source untuk menjalankan dan mengelola coding agent dengan skill yang bisa dipakai ulang.
>
> Ikuti saya di X: [https://x.com/jiayuan_jy](https://x.com/jiayuan_jy)

Satu file `CLAUDE.md` untuk memperbaiki perilaku Claude Code, diturunkan dari [pengamatan Andrej Karpathy](https://x.com/karpathy/status/2015883857489522876) tentang jebakan coding LLM.

README juga tersedia dalam bahasa [Mandarin Sederhana](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/README.zh.md).

## Masalahnya

Dari unggahan Andrej:

> "Model membuat asumsi yang keliru atas namamu lalu terus berjalan dengannya tanpa memeriksa. Mereka tidak mengelola kebingungan mereka, tidak meminta klarifikasi, tidak memunculkan inkonsistensi, tidak menyajikan tradeoff, tidak membantah ketika seharusnya."

> "Mereka sangat suka membuat kode dan API terlalu rumit, menggelembungkan abstraksi, tidak membersihkan kode mati... mengimplementasikan konstruksi yang membengkak lebih dari 1000 baris padahal 100 sudah cukup."

> "Mereka masih kadang mengubah/menghapus komentar dan kode yang kurang mereka pahami sebagai efek samping, bahkan yang tidak berkaitan dengan tugasnya."

## Solusinya

Empat prinsip dalam satu file yang langsung menjawab masalah-masalah itu:

| Prinsip | Menjawab |
|-----------|-----------|
| **Think Before Coding** (Berpikir sebelum coding) | Asumsi keliru, kebingungan tersembunyi, tradeoff yang tidak disajikan |
| **Simplicity First** (Kesederhanaan dulu) | Terlalu rumit, abstraksi membengkak |
| **Surgical Changes** (Perubahan bedah) | Edit yang tidak berkaitan, menyentuh kode yang tidak seharusnya |
| **Goal-Driven Execution** (Eksekusi berbasis tujuan) | Daya ungkit lewat tes dulu dan kriteria sukses yang bisa diverifikasi |

## Empat prinsip secara rinci

### 1. Think Before Coding

**Jangan berasumsi. Jangan sembunyikan kebingungan. Munculkan tradeoff.**

LLM sering memilih satu tafsir secara diam-diam lalu terus berjalan. Prinsip ini memaksa penalaran yang eksplisit:

- **Nyatakan asumsi secara eksplisit** — Kalau ragu, tanyakan, jangan menebak
- **Sajikan beberapa tafsir** — Jangan memilih diam-diam saat ada ambiguitas
- **Membantah bila perlu** — Kalau ada pendekatan yang lebih sederhana, katakan
- **Berhenti saat bingung** — Sebutkan apa yang tidak jelas dan minta klarifikasi

### 2. Simplicity First

**Kode minimum yang menyelesaikan masalah. Tidak ada yang spekulatif.**

Lawan kecenderungan rekayasa berlebihan:

- Tidak ada fitur di luar yang diminta
- Tidak ada abstraksi untuk kode sekali pakai
- Tidak ada "fleksibilitas" atau "konfigurabilitas" yang tidak diminta
- Tidak ada penanganan error untuk skenario yang mustahil
- Kalau 200 baris bisa jadi 50, tulis ulang

**Ujinya:** Apakah seorang senior engineer akan bilang ini terlalu rumit? Kalau ya, sederhanakan.

### 3. Surgical Changes

**Sentuh hanya yang harus disentuh. Bersihkan hanya kekacauanmu sendiri.**

Saat mengedit kode yang sudah ada:

- Jangan "memperbaiki" kode, komentar, atau pemformatan di sekitarnya
- Jangan merefaktor hal yang tidak rusak
- Cocokkan gaya yang ada, walau kamu akan melakukannya berbeda
- Kalau kamu melihat kode mati yang tidak berkaitan, sebutkan — jangan hapus

Saat perubahanmu menciptakan yatim (kode tak terpakai):

- Hapus impor/variabel/fungsi yang menjadi tak terpakai karena perubahan KAMU
- Jangan hapus kode mati yang sudah ada sebelumnya kecuali diminta

**Ujinya:** Setiap baris yang berubah harus bisa ditelusuri langsung ke permintaan pengguna.

### 4. Goal-Driven Execution

**Tentukan kriteria sukses. Ulangi sampai terverifikasi.**

Ubah tugas imperatif menjadi tujuan yang bisa diverifikasi:

| Alih-alih... | Ubah menjadi... |
|--------------|-----------------|
| "Tambahkan validasi" | "Tulis tes untuk input tidak valid, lalu buat lulus" |
| "Perbaiki bug" | "Tulis tes yang mereproduksinya, lalu buat lulus" |
| "Refaktor X" | "Pastikan tes lulus sebelum dan sesudah" |

Untuk tugas multi-langkah, nyatakan rencana singkat:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Kriteria sukses yang kuat memungkinkan LLM mengulang secara mandiri. Kriteria yang lemah ("buat jalan") membutuhkan klarifikasi terus-menerus.

## Pasang

**Opsi A: Plugin Claude Code (disarankan)**

Dari dalam Claude Code, tambahkan marketplace-nya lebih dulu:
```
/plugin marketplace add forrestchang/andrej-karpathy-skills
```

Lalu pasang plugin-nya:
```
/plugin install andrej-karpathy-skills@karpathy-skills
```

Ini memasang pedoman sebagai plugin Claude Code, sehingga skill tersedia di semua proyekmu.

**Opsi B: CLAUDE.md (per proyek)**

Proyek baru:
```bash
curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
```

Proyek yang sudah ada (tambahkan di akhir):
```bash
echo "" >> CLAUDE.md
curl https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md >> CLAUDE.md
```

Perintah di Opsi B mengunduh file dari internet lalu menulisnya ke `CLAUDE.md` kamu. Isi `CLAUDE.md` akan dimuat Claude Code sebagai instruksi, jadi bacalah isinya dulu sebelum memakainya.

## Memakai dengan Cursor

Repositori ini menyertakan rule proyek Cursor yang sudah di-commit ([`.cursor/rules/karpathy-guidelines.mdc`](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/.cursor/rules/karpathy-guidelines.mdc)) sehingga pedoman yang sama berlaku ketika kamu membuka proyek di Cursor. Lihat **[CURSOR.md](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/CURSOR.md)** untuk setup, memakai rule di proyek lain, dan hubungannya dengan Claude Code.

## Wawasan utama

Dari Andrej:

> "LLM luar biasa baik dalam mengulang sampai memenuhi tujuan tertentu... Jangan beri tahu apa yang harus dilakukan, beri kriteria sukses dan lihat ia bekerja."

Prinsip "Goal-Driven Execution" menangkap ini: ubah instruksi imperatif menjadi tujuan deklaratif dengan loop verifikasi.

## Cara tahu ini berhasil

Pedoman ini berhasil bila kamu melihat:

- **Lebih sedikit perubahan yang tidak perlu di diff** — Hanya perubahan yang diminta yang muncul
- **Lebih sedikit tulis ulang karena kerumitan berlebih** — Kode sederhana sejak pertama
- **Pertanyaan klarifikasi muncul sebelum implementasi** — Bukan setelah kesalahan
- **PR yang bersih dan minimal** — Tanpa refaktor sambil lalu atau "perbaikan" tambahan

## Kustomisasi

Pedoman ini dirancang untuk digabung dengan instruksi khusus proyek. Tambahkan ke `CLAUDE.md` yang sudah ada atau buat yang baru.

Untuk aturan khusus proyek, tambahkan bagian seperti:

```markdown
## Project-Specific Guidelines

- Use TypeScript strict mode
- All API endpoints must have tests
- Follow the existing error handling patterns in `src/utils/errors.ts`
```

## Catatan tradeoff

Pedoman ini condong ke **kehati-hatian dibanding kecepatan**. Untuk tugas sepele (perbaikan typo sederhana, one-liner yang jelas), gunakan penilaian — tidak setiap perubahan butuh ketelitian penuh.

Tujuannya mengurangi kesalahan mahal pada pekerjaan non-trivial, bukan memperlambat tugas sederhana.

## Lisensi

MIT
