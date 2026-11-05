---
title: "Taste Skill"
summary: "Agent Skill untuk memberi coding agent arahan seni, referensi visual nyata, dan pemeriksaan browser saat merancang UI."
category: image
tags: [desain, ui, frontend, browser]
surfaces: [claude-code]
source_url: "https://github.com/Leonxlnx/taste-skill/blob/main/README.md"
repo: Leonxlnx/taste-skill
stars: 109839
license: MIT
added: 2026-11-04
last_verified: 2026-11-04
status: aktif
trigger: "Saat meminta agent merancang website, landing page, dashboard, atau layar aplikasi. Skill menjalankan prosesnya sendiri dari satu brief."
install: |
  npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
---

**Taste Skill** adalah Agent Skill yang membuat coding agent benar-benar merancang website dan layar aplikasi, bukan sekadar merakit landing page rata-rata. Skill ini memberi agent arahan seni, gambar asli, dan cara memeriksa hasil kerjanya sendiri di browser sungguhan.

Halaman yang pernah dibuatnya, masing-masing dari satu brief:

| | |
|---|---|
| ![Halaman kedai kopi dengan tampak depan toko yang digambar sebagai hero](https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/examples/v2/coffee-storefront.webp) | ![Halaman malam techno dengan tanggalnya disusun ke dalam foto arsip](https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/examples/v2/night-dates.webp) |
| ![Bagian halaman kedai kopi yang menampilkan sangrai dalam empat foto](https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/examples/v2/coffee-roast.webp) | ![Pertanyaan di halaman kedai kopi berupa kartu indeks bertumpuk](https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/examples/v2/coffee-questions.webp) |

Fotonya asli, ditemukan di arsip terbuka dan diberi kredit oleh skill ([kredit](https://github.com/Leonxlnx/taste-skill/blob/main/examples/v2/CREDITS.md)). Tonton [film peluncurannya](https://github.com/Leonxlnx/taste-skill/releases/tag/v2.0.0).

## Instalasi

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

Perintah ini memasang skill dengan CLI [`npx skills`](https://github.com/vercel-labs/agent-skills).

Skill menjalankan skripnya dengan **Node 22+** dan **Chrome, Edge, atau Chromium** yang terpasang. Skill tidak memasang apa pun dan tidak butuh API key. Mencari gambar butuh akses jaringan.

#### Plugin Claude Code

Jalankan ini di dalam Claude Code. Skill diberi namespace `taste-skill:`, sehingga tidak bentrok dengan skill lain milikmu.

```
/plugin marketplace add Leonxlnx/taste-skill
/plugin install taste-skill@taste-skill
```

`/plugin update` memperbaruinya nanti.

#### Plugin Codex

```bash
codex plugin marketplace add Leonxlnx/taste-skill
codex plugin add taste-skill@taste-skill
```

Mulai sesi Codex baru setelahnya agar skill dimuat.

#### Dari clone, di-link, bukan disalin

`./install.sh` membuat symlink skill ke Claude Code (`--codex` untuk Codex, `--all-agents` untuk keduanya), sehingga `git pull` memperbaruinya di tempat.

Sudah punya skill ini? Jalankan lagi perintah instalasinya; nama instalasinya tidak berubah. Mencari salah satu skill lama? Lihat [Skill yang dipindahkan](#skill-yang-dipindahkan).

## Cara kerja v2

Skill ini dibangun dari studi atas 247 situs pilihan. Satu build berjalan dalam enam langkah:

1. Membaca brief dan mendaftar apa yang hanya dimiliki klien ini.
2. Sebuah skrip membagikan tiga dari 20 arah hasil riset, lalu agent memilih satu.
3. Menemukan idenya: satu kalimat yang mengikat bahan milik klien dengan arah itu.
4. Membangun dengan gambar dan footage asli dari koleksi terbuka, lengkap dengan kredit.
5. Memeriksa halaman di browser sungguhan pada tiga lebar layar dan menggagalkannya jika masih berupa slop.
6. Melihat screenshot-nya sendiri dan memperbaiki tiga masalah teratas, sampai tiga putaran.

Satu build memakan waktu sekitar 30 sampai 45 menit dan beberapa ratus ribu token. Rinciannya ada di [changelog](https://github.com/Leonxlnx/taste-skill/blob/main/CHANGELOG.md) dan [studinya](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/references/research.md).

Dashboard dan layar aplikasi (v2.1) mengambil jalurnya sendiri: skill membagikan satu dari gaya aplikasi yang disarikan dari layar produk nyata, membangun shell, data, grafik, dan tabelnya sesuai angka-angka itu, lalu memeriksa hasilnya dengan aturan aplikasi: panel yang tenang, angka yang sejajar, warna yang dipakai untuk data, dan tata letak ponsel di mana navigasinya melipat. Landing page sebuah produk membangun aplikasi yang ditampilkannya dengan cara yang sama, sehingga screenshot-nya terlihat seperti produk yang berfungsi.

v2.1 juga memeriksa bingkai setiap halaman (judul yang jelas di layar pertama, margin yang sama, tidak ada bagian yang terdorong ke satu sisi, tidak ada bentangan kosong acak) dan bergerak seperti situs-situs pemenang penghargaan, diukur pada 100 Awwwards Sites of the Day terbaru.

## Skill yang dipindahkan

Repo ini hanya memuat satu skill, `design-taste-frontend`. Skill lainnya pindah ke repo masing-masing dan tetap memakai nama instalasi yang sama:

| Nama instalasi | Sekarang berada di |
| --- | --- |
| `high-end-visual-design`, `minimalist-ui`, `industrial-brutalist-ui`, `gpt-taste`, `stitch-design-taste`, `design-taste-frontend-v1`, `design-taste-frontend-v2-experimental` | **[Leonxlnx/taste-skill-classics](https://github.com/Leonxlnx/taste-skill-classics)** |
| `imagegen-frontend-web`, `imagegen-frontend-mobile`, `brandkit`, `image-to-code` | **[Leonxlnx/imagegen-skills](https://github.com/Leonxlnx/imagegen-skills)** |
| `redesign-existing-projects` | Bagian dari `design-taste-frontend`, yang mengaudit halaman yang sudah ada di browser sungguhan sebelum mengubah apa pun |
| `full-output-enforcement` | Dihapus. Untuk masalah yang sama, lihat **[Leonxlnx/unlazy](https://github.com/Leonxlnx/unlazy)** |

Pasang skill yang dipindahkan dari repo barunya dengan nama yang sama:

```bash
npx skills add https://github.com/Leonxlnx/taste-skill-classics --skill "high-end-visual-design"
```

## Pertanyaan umum

**Apa yang dibutuhkan skill ini?**
Node 22 atau lebih baru dan Chrome, Edge, atau Chromium. Skill tidak memasang apa pun dan tidak memakai API key. Internet hanya dibutuhkan untuk mencari gambar.

**Dari mana gambarnya, dan bolehkah saya memakainya?**
Dari koleksi terbuka seperti Wikimedia Commons, Openverse, dan Met. Hanya file domain publik, CC0, CC BY, dan CC BY-SA yang ditawarkan, dan skill menaruh kreditnya di halaman. Ganti dengan milikmu sendiri jika ada.

**Apakah bekerja dengan React, Vue, Svelte, HTML biasa?**
Ya. Aturannya tentang desain, bukan framework.

**Apakah untuk dashboard dan layar aplikasi?**
Ya, sejak v2.1. Skill membedakan halaman dari layar aplikasi dan membangun dashboard, tampilan admin, atau layar pengaturan dengan jalurnya sendiri: gaya yang dibagikan dari studi layar produk nyata, panel yang tenang, data dan grafik yang jujur, serta pemeriksaannya sendiri (`inspect.mjs --app`).

## Lisensi

[MIT License](https://github.com/Leonxlnx/taste-skill/blob/main/LICENSE) · Hak cipta (c) 2026 Leonxlnx
