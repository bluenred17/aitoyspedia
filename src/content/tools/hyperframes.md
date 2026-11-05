---
title: "HyperFrames"
summary: "Framework open-source untuk membuat dan merender video MP4 deterministik dari HTML, CSS, media, dan animasi."
category: video
tags: [video, html, render, agent, skills]
surfaces: [claude-code]
source_url: "https://github.com/heygen-com/hyperframes/blob/main/README.md"
repo: heygen-com/hyperframes
stars: 79035
license: Apache-2.0
added: 2026-11-04
last_verified: 2026-11-05
status: aktif
setup: |
  claude plugin marketplace add heygen-com/hyperframes
  claude plugin install hyperframes@hyperframes
---

**Tulis HTML. Render video. Dibuat untuk agent.**

HyperFrames adalah framework open-source untuk mengubah HTML, CSS, media, dan animasi yang bisa di-seek menjadi video MP4 yang deterministik. Pakai secara lokal lewat CLI, dari coding agent AI lewat skill, atau sebagai inti rendering di balik alur penulisan yang di-host.

Link penting: [Studio](https://hyperframes.studio/studio) · [Quickstart](https://hyperframes.heygen.com/quickstart) · [Showcase](https://hyperframes.heygen.com/showcase) · [Playground](https://hyperframes.studio/) · [Katalog](https://hyperframes.heygen.com/catalog/blocks/data-chart) · [Dokumentasi](https://hyperframes.heygen.com/introduction)

Aplikasi desktop tersedia untuk macOS, Windows, dan Linux (.deb); unduh dari [hyperframes.studio](https://hyperframes.studio/studio/download).

Memakai Claude Code, Codex, Cursor, atau coding agent lain? Jalankan `npx hyperframes skills update` sekali, lalu minta agent kamu membuat video.

## Mulai cepat

### Dengan coding agent AI

Untuk Claude Code, pasang plugin berversi:

```bash
claude plugin marketplace add heygen-com/hyperframes
claude plugin install hyperframes@hyperframes
```

Untuk mengaktifkan pembaruan otomatis marketplace **hyperframes**, jalankan `claude` di terminal pada proyekmu. Di UI terminal Claude Code, jalankan `/plugin`, lalu pilih **Marketplaces** → **hyperframes** → **Enable auto-update**. Setelahnya, pakai `/hyperframes:hyperframes`. Lihat [panduan plugin](https://github.com/heygen-com/hyperframes/blob/main/docs/guides/plugins.mdx) untuk Copilot, VS Code, Cursor, Gemini CLI, pembaruan, dan migrasi.

Untuk skill mandiri (termasuk OpenCode), pakai:

```bash
npx skills add heygen-com/hyperframes
```

> Pemilih terbuka tanpa pilihan terpilih; grup **Core Skills** sudah cukup, sedangkan `/slideshow`, `/remotion-to-hyperframes`, `/reverse-any-video`, `/style-sampling`, dan `/figma` dipasang sesuai kebutuhan. Tanpa pemilih (skrip atau job CI), `npx hyperframes skills update` memasang persis set inti, sementara `skills add --all` memasang seluruh 9 skill yang dipublikasikan. Enam skill internal repo di `.claude/skills` / `.agents/skills` dikecualikan secara default. Untuk set lengkap yang dipublikasikan, pakai `npx hyperframes skills`.
>
> `skills add` mengambil blob registry skills.sh, yang bisa tertinggal dari `main` beberapa jam. `npx hyperframes skills update` memasang skill dari tag rilis yang cocok dengan versi CLI-mu, sehingga cocok dengan CLI yang menjalankannya.

Jalankan instalasi lokal-proyek dari direktori proyek videomu. Dari checkout HyperFrames, pakai `npx hyperframes skills update` untuk instalasi global sebagai gantinya: target installer lokal-proyek bisa tumpang tindih dengan sumber `skills/` yang dilacak dan menimpa suntingan yang belum di-commit. Lihat [setup kontributor](https://github.com/heygen-com/hyperframes/blob/main/CONTRIBUTING.md#getting-started).

Coba prompt seperti ini:

> Dengan `/hyperframes`, buat intro produk 10 detik dengan judul yang fade-in, video latar, dan musik latar yang halus.

Skill mengajari agent alur produksi HyperFrames: merencanakan video, menulis HTML yang valid, menyambungkan animasi yang bisa di-seek, menambah media, lint, pratinjau, dan render. Bekerja dengan Claude Code, Codex, Cursor, Gemini CLI, IBM Bob, dan coding agent lain yang mendukung skill.

### Manual dengan CLI

```bash
npx hyperframes init my-video
cd my-video
npx hyperframes preview      # preview in browser with live reload
npx hyperframes render       # render to MP4
```

**Persyaratan:** Node.js 22+, FFmpeg

## Skill

HyperFrames menyertakan 9 skill. Buat video apa pun cukup dengan memintanya; skill `/hyperframes` memegang kontrak dan referensinya (film, caption, overlay, gerak, tampilan). Baca itu lebih dulu.

Untuk instalasi mandiri, gunakan **set inti** (`/hyperframes`, `/hyperframes-cli`, `/hyperframes-registry`, `/media-use`). `npx hyperframes skills update` memasang persis itu dari mana saja; pemilih interaktif (`npx skills add heygen-com/hyperframes`) menampilkannya sebagai grup "Core Skills" tanpa pilihan terpilih. Pemilih hanya interaktif: eksekusi non-interaktif atau oleh agent tanpa `--skill` memasang semua 9. Pakai `npx skills add heygen-com/hyperframes --all` untuk memasang set lengkap secara sengaja (melewati pemilih), atau `npx skills add heygen-com/hyperframes --skill <nama>` untuk satu saja (nama polos, tanpa `/` di depan).

Setelah itu instalasi mandiri tetap ramping: `npx hyperframes init` memasang **set inti** hanya jika belum ada dan tidak pernah menyentuh skill yang sudah kamu punya (`npx hyperframes skills update` menyegarkannya dan tidak pernah menghapus satu pun); `/figma`, `/slideshow`, `/remotion-to-hyperframes`, dan `/reverse-any-video` dipasang **sesuai kebutuhan** dengan `npx hyperframes skills update <nama>`. Tidak ada yang menarik ulang seluruh set di belakangmu.

### Set inti

| Skill | Dipakai saat |
| --- | --- |
| `/hyperframes` | **Baca dulu** untuk setiap permintaan membuat, mengedit, menganimasikan, atau merender video, motion graphic, caption, atau overlay dengan HyperFrames (HTML yang dirender menjadi video). Memegang kontrak render dan alur kerja, dan menunjuk ke referensi untuk format, gerak, tampilan, caption, film utuh, dan storyboard. |
| `/hyperframes-cli` | CLI HyperFrames menurut tugasnya: scaffold, periksa, lihat frame, edit timeline, pratinjau, render lokal atau di cloud, publikasi, riwayat proyek, plus membaca JSON-nya dan pulih dari kegagalan build atau render. |
| `/hyperframes-registry` | Sekitar 450 blok dan komponen siap pakai yang dipasang sebagai sumber yang bisa diedit: transisi, overlay, judul, kinetic type, caption, grafik, peta, 3D, gerak kamera. Pakai sebelum membuat manual visual apa pun yang bernama; juga untuk `hyperframes add` dan `catalog`. |
| `/media-use` | Mendapatkan atau membuat media apa pun untuk video (musik, efek suara, gambar, ikon, logo, voiceover, avatar dan video hasil generasi, transkrip, cutout, color grade dan look) dengan HeyGen atau tool lokal gratis, serta memadukan audio yang ditempatkan. Juga untuk footage yang tampak gelap, datar, atau kusam. |

### Sesuai kebutuhan

| Skill | Dipakai saat |
| --- | --- |
| `/figma` | Membawa Figma ke video: aset hasil render, token brand, komponen, frame storyboard sebagai gerak yang direkonstruksi, shader, dan gerak berbantuan konektor. Dipakai saat kamu menempelkan link figma.com. |
| `/slideshow` | Presentasi, pitch deck, atau deck interaktif: slide terpisah, pengungkapan fragmen, percabangan, navigasi hotspot, mode presenter dengan catatan pembicara. Keluarannya deck yang bisa dinavigasi, bukan MP4 hasil render. |
| `/remotion-to-hyperframes` | Membawa kode atau footage video yang sudah ada ke HyperFrames (Remotion lebih dulu; juga Motion Canvas, Lottie, Three.js, canvas, render tool lain), diverifikasi frame demi frame. |
| `/reverse-any-video` | Membangun ulang file video apa pun sebagai proyek HyperFrames yang bisa diedit (motion graphic, talking head, live action, footage hasil AI), diperiksa frame demi frame terhadap aslinya. HyperFrames Pro. |
| `/style-sampling` | Membuat episode baru tentang topikmu dalam satu dari lima gaya teruji: Collage Explainer, Finance Explainer, Animated Science Explainer, 3D Brand Explainer, 3D True Crime. HyperFrames Pro. |

Untuk alur serah terima desain visual, lihat [panduan Claude Design](https://hyperframes.heygen.com/guides/claude-design) dan [panduan Open Design](https://hyperframes.heygen.com/guides/open-design).

## Yang bisa kamu buat

Butuh ide? Telusuri [Showcase](https://hyperframes.heygen.com/showcase) untuk video jadi yang bisa kamu tonton, baca, jalankan, dan remix.

- Video peluncuran produk dan pengumuman fitur
- Walkthrough PR dengan diff kode beranimasi, narasi, dan caption
- Visualisasi data, chart race, dan animasi peta
- Video sosial dengan caption kinetik, overlay, dan musik
- Docs-to-video, PDF-to-video, dan explainer tur situs
- Motion graphic yang bisa dipakai ulang untuk pipeline konten otomatis

## Frame.md

**frame.md adalah design system kamu, siap untuk video.**

Setiap brand punya `design.md`. Tidak satu pun ditulis untuk kamera. `frame.md` adalah lapisan terjemahan yang hilang: ia mengambil spesifikasi desain berkonteks webmu dan membaliknya untuk frame: token dan aturan yang sama, tetapi ditulis ulang agar agent AI bisa menyusun video promo tanpa menebak skala atau memakai elemen khas web.

Keluarannya adalah superset `DESIGN.md` yang bisa dibaca seluruh toolchain-mu. Atom tetap sakral. Komposisi tetap bebas. Angka datang dari skrip. Telusuri dan remix semua template di [hyperframes.studio/design](https://hyperframes.studio/design).

## Cara kerja

Definisikan video sebagai HTML. Tambahkan atribut data untuk timing dan track. Pakai GSAP, CSS, Lottie, Three.js, Anime.js, WAAPI, atau frame adapter milikmu sendiri untuk animasi yang bisa di-seek.

```html
<div id="stage" data-composition-id="launch" data-start="0" data-width="1920" data-height="1080">
  <video
    class="clip"
    data-start="0"
    data-duration="6"
    data-track-index="0"
    src="intro.mp4"
    muted
    playsinline
  ></video>

  <h1 id="title" class="clip" data-start="1" data-duration="4" data-track-index="1">Launch day</h1>

  <audio
    data-start="0"
    data-duration="6"
    data-track-index="2"
    data-volume="0.5"
    src="music.wav"
  ></audio>

  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script>
    const tl = gsap.timeline({ paused: true });
    tl.from("#title", { opacity: 0, y: 40, duration: 0.8 }, 1);
    window.__timelines = window.__timelines || {};
    window.__timelines.launch = tl;
  </script>
</div>
```

Pratinjau langsung di browser. Render secara lokal atau di Docker. Renderer men-seek tiap frame di Chrome headless dan meng-encode hasilnya dengan FFmpeg, sehingga masukan yang sama menghasilkan video yang sama.

## Stack HyperFrames

HyperFrames adalah mesin rendering open-source, ditambah sekumpulan tool yang terus bertambah di sekitar pembuatan video berbasis HTML.

| Bagian | Status | Fungsi |
| --- | --- | --- |
| CLI | Tersedia | Scaffold, pratinjau, lint, inspeksi, dan render proyek video lokal |
| Core / Engine / Producer | Tersedia | Mem-parse komposisi, mengendalikan Chrome headless, meng-encode video, dan memadukan audio |
| Katalog | Tersedia | Blok dan komponen yang bisa dipakai ulang untuk transisi, overlay, caption, grafik, peta, dan efek |
| Skill agent | Tersedia | Mengajari coding agent pola produksi video yang tidak ada di dokumentasi web umum |
| Studio | Tersedia, terus berkembang | Antarmuka browser untuk pratinjau dan pengeditan komposisi |
| Render AWS Lambda | Tersedia | Menyebarkan stack render terdistribusi dan menjalankan render dari laptop atau CI |
| [hyperframes.studio](https://hyperframes.studio/) | Tersedia | Playground komunitas untuk pratinjau, iterasi, berbagi, dan render proyek video berbasis HTML |
| [frame.md](https://hyperframes.studio/design) | Tersedia | Membalik design system untuk kamera: superset DESIGN.md yang bisa dijadikan bahan video oleh agent |

## Katalog

Pasang blok dan komponen siap pakai:

```bash
npx hyperframes add flash-through-white   # shader transition
npx hyperframes add instagram-follow      # social overlay
npx hyperframes add data-chart            # animated chart
```

Telusuri katalog di [hyperframes.heygen.com/catalog](https://hyperframes.heygen.com/catalog/blocks/data-chart).

## Mengapa HyperFrames?

- **Berbasis HTML:** komposisi adalah file HTML dengan atribut data. Tanpa kewajiban React, tanpa format timeline proprietary.
- **Ramah agent:** agent sudah terbiasa menulis HTML, dan CLI-nya non-interaktif secara default.
- **Deterministik:** masukan sama, frame sama, keluaran sama. Dibuat untuk CI, tes regresi, dan render otomatis.
- **Tanpa langkah build:** komposisi `index.html` langsung diputar apa adanya dan bisa dipratinjau langsung di browser.
- **Animasi berbasis adapter:** bawa GSAP, animasi CSS, Lottie, Three.js, Anime.js, WAAPI, atau runtime kustom.
- **Open source:** lisensi Apache 2.0, tanpa biaya per render atau ambang pemakaian komersial.

## HyperFrames vs Remotion

HyperFrames terinspirasi oleh [Remotion](https://www.remotion.dev). Keduanya merender video dengan Chrome headless dan FFmpeg. Perbedaan utamanya ada di model penulisan: taruhan Remotion adalah komponen React; taruhan HyperFrames adalah HTML polos yang mudah ditulis manusia maupun agent.

| | **HyperFrames** | **Remotion** |
| --- | --- | --- |
| Penulisan | HTML + CSS + animasi yang bisa di-seek | Komponen React |
| Langkah build | Tidak ada; `index.html` diputar apa adanya | Butuh bundler |
| Serah terima ke agent | File HTML polos | Proyek JSX / React |
| Animasi berbasis clock library | Bisa di-seek, akurat per frame lewat adapter | Pola animasi wall-clock perlu kehati-hatian |
| Render terdistribusi | Jalur render lokal dan AWS Lambda | Remotion Lambda, renderer cloud yang matang |
| Lisensi | Apache 2.0 | Remotion License yang source-available |

Baca perbandingan lengkapnya di [panduan HyperFrames vs Remotion](https://hyperframes.heygen.com/guides/hyperframes-vs-remotion).

## Paket plugin

Plugin membundel katalog skill lengkap dan memakai pengelola pembaruan agent-nya. `bun run package:agent-plugin` membangun ZIP portabel yang di-commit, metadata sumber, dan checksum SHA-256. Lihat [daftar periksa maintainer](https://github.com/heygen-com/hyperframes/blob/main/docs/contributing/agent-plugins.mdx).

## Unggah ke Codex

Bangun arsip plugin Codex yang siap diunggah dari versi `HEAD` yang di-commit untuk manifest, aset brand, dan skill:

```bash
bun run package:codex-plugin
```

Perintah ini menulis `dist/hyperframes-plugin.zip` dengan folder akar `hyperframes/` dan gagal bila arsip melebihi batas unggah Codex sebesar 100 MB.

## Catatan pengembangan (Git LFS)

Repo memakai [Git LFS](https://git-lfs.com) untuk baseline regresi golden di bawah `packages/producer/tests/**/output.mp4` (sekitar 240 MB file `.mp4`). Kalau kamu meng-clone repo penuh untuk pengembangan, pasang Git LFS dulu:

```bash
# macOS
brew install git-lfs

# Ubuntu / Debian
sudo apt install git-lfs

# Windows
winget install GitHub.GitLFS

# Then, once per machine
git lfs install
```

Kalau kamu hanya butuh file sumber, kamu bisa melewati konten LFS:

```bash
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/heygen-com/hyperframes.git
```

## Dokumentasi dan paket

Dokumentasi lengkap: [hyperframes.heygen.com/introduction](https://hyperframes.heygen.com/introduction), termasuk [Quickstart](https://hyperframes.heygen.com/quickstart), [panduan](https://hyperframes.heygen.com/guides/gsap-animation), [referensi API](https://hyperframes.heygen.com/packages/core), [contoh](https://hyperframes.heygen.com/examples), dan [render AWS Lambda](https://hyperframes.heygen.com/deploy/aws-lambda).

Paket utamanya: `hyperframes` (CLI untuk membuat, pratinjau, lint, dan render komposisi), `@hyperframes/core` (tipe, parser, generator, linter, runtime, frame adapter), `@hyperframes/engine` (mesin capture halaman-ke-video dengan Puppeteer dan FFmpeg), `@hyperframes/producer` (pipeline render penuh), `@hyperframes/studio` (editor komposisi di browser), `@hyperframes/player` (web component `<hyperframes-player>`), `@hyperframes/shader-transitions` (transisi shader WebGL), dan `@hyperframes/aws-lambda` (SDK dan penyebaran render terdistribusi).

HyperFrames dipakai dalam produksi di [HeyGen](https://www.heygen.com). Laporan keamanan: [SECURITY.md](https://github.com/heygen-com/hyperframes/blob/main/SECURITY.md).

## Lisensi

[Apache 2.0](https://github.com/heygen-com/hyperframes/blob/main/LICENSE)

> Catatan: ringkasan dan terjemahan ini membuang galeri template frame.md dan bagian komunitas. Lihat README asli untuk semuanya.
