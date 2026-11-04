---
title: "Lemo-Opuscar"
summary: "Skill Claude Code untuk membuat film pendek dengan kode, memakai puluhan gaya visual siap pakai atau merancang gaya sendiri."
category: video
tags: [film, animasi, video, gaya-visual]
surfaces: [claude-code]
source_url: "https://github.com/lemomo-ai/lemo-opuscar/blob/main/README.md"
repo: lemomo-ai/lemo-opuscar
stars: 12117
license: "MIT (kode dan dokumen); CC BY 4.0 (film demo)"
added: 2026-11-04
last_verified: 2026-11-04
status: aktif
trigger: "Minta film dengan menyebut gaya dan topik. Ketik /lemo-opuscar:lemo-opuscar tanpa permintaan lain untuk memulai panduan interaktif."
install: |
  claude plugin marketplace add lemomo-ai/lemo-opuscar
  claude plugin install lemo-opuscar@lemolab
---

**Kotak perkakas gaya film yang dibuat dengan kode: 66 siap pakai, dan gayamu sendiri.** Pilih satu gaya atau buat dari nol, bawa ceritamu, dan biarkan coding agent kamu menyutradarai.

[Tonton galerinya](https://lemomo-ai.github.io/lemo-opuscar/) · [Repo resmi](https://github.com/lemomo-ai/lemo-opuscar) oleh Lemomo ([@lemomo_ai](https://x.com/lemomo_ai))

> **Dibuat untuk Claude.** Gaya-gayanya disetel untuk Claude Opus 5.5; model lain mungkin tidak mereproduksinya dengan baik, jadi pakailah dengan hati-hati.

## Film unggulan: OPUSCAR 98

Satu Clawd berjalan melewati seluruh 98 pemenang Best Picture, masing-masing digambar ulang dalam gaya yang cocok dengan filmnya. Durasi 6 menit 31 detik, 1927 sampai 2025. Seluruh 98 gaya terbuka: 77 dalam 2D, 4 dalam 2,5D, dan 17 dalam 3D, masing-masing dengan sebuah frame dan prompt gaya yang bisa dipakai ulang untuk topikmu sendiri. [Tonton filmnya](https://lemomo-ai.github.io/lemo-opuscar/opuscar98/) · [Semua 98 gaya](https://lemomo-ai.github.io/lemo-opuscar/opuscar98/#styles)

Setiap frame, catatan, dan potongan ditulis dengan kode oleh Claude Opus 5.5.

## Tentang pembuatnya

> **Bukan awesome list.** Setiap film di sini dibuat oleh Lemomo bersama Claude Opus 5.5. Gaya-gayanya disetel untuk Opus 5.5; model lain mungkin tidak mereproduksinya.

![Semua gaya](https://raw.githubusercontent.com/lemomo-ai/lemo-opuscar/main/docs/cover.jpg)

Setiap film disutradarai, digambar, diberi musik, dan dimixing oleh agent AI yang menulis kode:

- **Gambar:** halaman canvas dan WebGL, dirender frame demi frame
- **Musik:** skor orisinal dari pustaka sampel gratis
- **Suara:** narasi text-to-speech

Tanpa video generatif, tanpa stock footage.

## Cara memakai

Ada dua jalur masuk; skill adalah yang paling mudah.

### Opsi 1: pasang skill (disarankan)

Di terminal:

```sh
claude plugin marketplace add lemomo-ai/lemo-opuscar
claude plugin install lemo-opuscar@lemolab
```

Lalu pakai dari folder mana pun.

- Pada penggunaan pertama, panduan, tool, dan prompt gaya diunduh ke `~/lemo-opuscar` dan dipakai bersama oleh semua filmmu.
- Proyek tiap film, dari sumber sampai video jadi, berada di folder tempat kamu memulai.
- Untuk agent lain, salin [`plugin/skills/lemo-opuscar/`](https://github.com/lemomo-ai/lemo-opuscar/blob/main/plugin/skills/lemo-opuscar/) ke folder skills milik agent itu.

### Opsi 2: clone repo

```sh
git clone https://github.com/lemomo-ai/lemo-opuscar.git
cd lemo-opuscar
claude
```

Film disimpan di `films/<nama>/` di dalam repo.

### Lalu cukup katakan apa yang kamu mau

> Buat film 45 detik bergaya **watercolor** tentang kebun kopi yang dikelola keluargaku. Narator perempuan yang hangat.

> Buat film 40 detik bergaya **LiDAR Survey** tentang tambang tua di perbukitan di belakang kota kami, dari data pindai laser publik.

Sebut gayanya dalam bahasa Inggris atau Mandarin; [indeks gaya](https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/README.md) mendaftar semuanya.

Belum yakin? Dengan skill terpasang, ketik `/lemo-opuscar:lemo-opuscar` tanpa yang lain. Skill menanyakan bahasa yang dipakai, lalu apa yang ingin kamu lakukan: film dalam gaya pustaka, [membuat gaya jadi milikmu](#membuat-gaya-jadi-milikmu), atau film dalam gaya yang sudah kamu simpan.

Skill bertanya sekali di awal:

- hal apa pun yang tidak bisa diputuskannya tentang topikmu;
- apakah kamu punya **suara, musik, atau bahan lain** sendiri;
- apakah kamu mau melihat **storyboard** dulu. Jawab ya dan ia berhenti sekali untuk menunjukkan shot utama dalam gaya yang sebenarnya; jika tidak, ia langsung membuat film jadinya.

Agent membaca tiga panduan dan bekerja seperti studio kecil:

| Berkas | Yang diberikannya kepada agent |
|---|---|
| [`DIRECTOR.md`](https://github.com/lemomo-ai/lemo-opuscar/blob/main/DIRECTOR.md) | cara menyutradarai: cerita, suara, ritme, kamera, performa, pemeriksaan mandiri |
| [`TECHNIQUE.md`](https://github.com/lemomo-ai/lemo-opuscar/blob/main/TECHNIQUE.md) | cara membangun: render frame demi frame, suara, musik, mixing |
| `styles/<gaya>/STYLE.md` | tampilan dan suara gaya itu; ceritanya milikmu |

### Membuat gaya jadi milikmu

Setiap orang menginginkan hal yang berbeda: warna brand, logo, karakter, dan nada kanal mereka sendiri. Sekarang kamu bisa mengubah gaya pustaka menjadi gaya yang hanya milikmu, atau membuat dari halaman kosong gaya yang tidak ada di pustaka. Prosesnya sama dengan yang dipakai pembuatnya untuk menambah gaya baru ke pustaka.

**Dua jalur masuk.** Pilih salah satu setelah memulai skill, atau ucapkan dalam satu baris:

> Aku ingin mengubah gaya **Ukiyo-e** menjadi versiku sendiri.

> Mulai dari halaman kosong: gaya kapur di papan tulis, hangat dan pelan.

- **Mengubah gaya pustaka:** skill mendaftar semua gaya beserta link galeri, dan kamu mengetik yang ingin diubah.
- **Mulai dari halaman kosong:** jelaskan tampilannya dengan kata-katamu sendiri, atau bagikan gambar atau film yang kamu suka. Claude memilih gaya pustaka terdekat sebagai dasar teknik, menjelaskan alasannya, dan kamu setuju atau memilih yang lain.

**Lalu lima langkah:**

1. **Rencanakan satu pertanyaan demi satu.** Tiap pertanyaan punya beberapa opsi, yang direkomendasikan di urutan pertama beserta alasannya. Kira-kira:
   - untuk apa: film jenis apa, di platform mana (feed vertikal butuh 1080×1920 atau 1080×1440), warna brand, logo, font, atau karakter yang berulang;
   - apa yang diubah: untuk gaya pustaka, skill lebih dulu memilah gaya itu menjadi tiga kelompok, **aman diubah** (palet, tipografi, tempo, suara, gerakan khas), **mengubah karakternya** (material dan rendering, logika warna, tata bahasa kamera), dan **tidak bisa diubah** (esensi gaya itu: ubah dan ia menjadi gaya lain);
   - arah untuk tiap bagian, dan terakhir, sebuah nama.

   Tidak jelas pun tidak apa-apa: katakan "lebih premium" atau "lebih hidup" dan skill mengubahnya menjadi perubahan konkret untuk dipilih. Terlalu lambat? Pilih "percakapan bebas", opsi terakhir di setiap pertanyaan, dan ngobrol saja; katakan "kamu yang putuskan" kapan saja dan skill mengisi sisanya dengan rekomendasinya. Paling banyak lima perubahan per putaran saat mengubah gaya pustaka; semuanya digambar dengan kode, tanpa generasi gambar.
2. **Tinjau ringkasannya.** Tiap bagian sebelum, sesudah, dan biayanya. Tidak ada yang ditulis sebelum kamu setuju.
3. **Lihat satu frame gaya lebih dulu**, digambar dengan kode yang sebenarnya. Jika kamu mengubah gaya pustaka, frame yang sama juga dirender dalam versi aslinya, berdampingan: asli di kiri, milikmu di kanan. Katakan apa yang kurang pas; jika setelah dua putaran masih belum benar, skill mengatakannya dan menyarankan dasar yang lebih dekat.
4. **Film demo 15 sampai 30 detik.** Setiap perubahan tampil di layar, dengan musik dan efek suara. Skill memeriksa filmnya dan memperbaikinya satu kali sebelum menyerahkannya.
5. **Simpan jika sudah puas.** Skill bertanya: simpan sebagai gayaku, putaran lagi, atau nanti saja. Sampai kamu mengatakan ya, semuanya tetap di folder proyek itu.

Setelah disimpan, gaya itu berada di `~/lemo-my-styles/<nama>/`, berbentuk seperti gaya pustaka: prompt gaya, apa yang berubah, film demo dan sumbernya, sehingga film berikutnya bisa memakai ulang tekniknya. Lalu sebut namanya seperti gaya lain: *"Buat film 30 detik dalam gaya **Night Ukiyo-e** milikku tentang…"*. Saat kamu memilih gaya, gayamu sendiri tercantum paling atas.

Pembaruan pustaka dan instal ulang tidak pernah menyentuhnya. Saat gaya dasarnya diperbarui nanti, Claude menyebutkannya sekali dan bertanya apakah perbaikan yang berguna ingin dibawa ke salinanmu. Langkah yang diikuti Claude ada di [`MY-STYLES.md`](https://github.com/lemomo-ai/lemo-opuscar/blob/main/MY-STYLES.md).

### Sebelum mulai

- Satu film memakan waktu agent sekitar 30 sampai 60 menit dan cukup banyak token.
- Kamu butuh Node 20+, ffmpeg 7+, dan Python 3.11+ (atau [uv](https://docs.astral.sh/uv/)); agent memasang sisanya. Ubuntu 24.04 membawa ffmpeg 6.1, yang terlalu lama: pakai [build statis](https://johnvansickle.com/ffmpeg/).
- Keluaran default 1920×1080, 24 fps; ukuran lain atas permintaan.

### Memperbarui atau menghapus

Perbarui, lalu mulai ulang Claude Code (pustaka di `~/lemo-opuscar` memperbarui dirinya pada film berikutnya):

```sh
claude plugin marketplace update lemolab && claude plugin update lemo-opuscar@lemolab
```

Setelah pembaruan, minta film seperti biasa; untuk membuat gaya jadi milikmu, lihat [di atas](#membuat-gaya-jadi-milikmu).

Hapus, lalu hapus `~/lemo-opuscar`:

```sh
claude plugin uninstall lemo-opuscar@lemolab
```

Gayamu sendiri di `~/lemo-my-styles/` tetap ada setelah pembaruan dan penghapusan; hapus folder itu sendiri jika tidak menginginkannya.

Jika sebuah langkah macet, [buka issue](https://github.com/lemomo-ai/lemo-opuscar/issues).

## Gaya-gayanya

Katalog lengkap beserta frame tiap gaya ada di [galeri](https://lemomo-ai.github.io/lemo-opuscar/). Kelompok yang tersedia:

- **Baru (2026-10-29):** 7 gaya, antara lain Memphis Diorama (kontribusi [@EianLu](https://x.com/EianLu)), Transit Map, Chalkboard, Isometric Picture Book, Printed Long Take, Circuit Board, dan Desktop Flythrough
- **Edit & Dokumenter:** 8 gaya yang dipotong dari footage nyata, dokumen, dan data (misalnya Caption News, 1920s Newsreel, Live Countdown Split-screen)
- **Film Bukti (Evidence Films):** 8 gaya yang memfilmkan bahan nyata, setiap angka bersumber
- **Gambar tangan dan lukisan**, **Tradisi Asia Timur**, **Cetak dan seni grafis**, **Grafis dan tipografi**, **Informasi dan keynote**, **Kartun dan anime**, **Game**, **Sinema dan zaman**, serta **Material dan 3D**

## Lisensi

Dibuat oleh **LemoLab × Claude Opus 5.5**.

- **Kode dan dokumen:** MIT.
- **Film demo dan still-nya** (di `styles/`, galeri, dan Releases): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Boleh dibagikan, diadaptasi, dan dipakai secara komersial; beri kredit **LemoLab** dengan link ke repositori ini, dan sebutkan jika kamu mengubahnya.
- **Film yang kamu buat dengan pustaka ini:** milikmu, tanpa kredit.
- **Aset pihak ketiga dalam demo:** tetap memakai lisensinya masing-masing (lihat `CREDITS` tiap demo).
- **Tiga trek suara bukan CC BY 4.0:** teriakan di Game Show Flat (suara sistem macOS, `say`), narasi di Paper-cut Lightbox (Microsoft Edge TTS, yang akan diisi ulang dengan Kokoro), dan narasi di Broadcast News Package (Doubao TTS). Lihat README asli untuk ketentuannya.

Kamu bertanggung jawab atas bahan yang kamu pakai dalam filmmu.

> Catatan: terjemahan ini meringkas katalog 66 gaya menjadi daftar kelompok, serta membuang bagian riwayat bintang, ucapan terima kasih, dan proyek LemoLab lainnya. Lihat README asli untuk semuanya.
