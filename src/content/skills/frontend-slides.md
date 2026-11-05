---
title: "Frontend Slides"
summary: "Skill agent coding untuk membuat presentasi HTML yang memukau dari nol atau dengan mengonversi file PowerPoint, lewat pratinjau gaya visual dan tanpa dependensi."
category: productivity
tags: [slides, presentasi, html, powerpoint, pptx, desain, css, pdf]
surfaces: [claude-code]
source_url: "https://github.com/zarazhangrui/frontend-slides/blob/main/README.md"
repo: zarazhangrui/frontend-slides
stars: 31899
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
trigger: "Dipanggil dengan /frontend-slides:frontend-slides (dipasang sebagai plugin) atau /frontend-slides (dipasang manual sebagai skill mandiri) saat kamu ingin membuat presentasi baru atau mengonversi file PowerPoint ke slideshow web."
install: |
  # Claude Code lewat custom marketplace (jalankan sebagai dua pesan terpisah, jangan tempel keduanya sekaligus)
  /plugin marketplace add https://github.com/zarazhangrui/frontend-slides
  /plugin install frontend-slides@frontend-slides

  # Claude Code, pemasangan manual
  mkdir -p ~/.claude/skills/frontend-slides/scripts
  cp SKILL.md STYLE_PRESETS.md viewport-base.css html-template.md animation-patterns.md ~/.claude/skills/frontend-slides/
  cp -R bold-template-pack ~/.claude/skills/frontend-slides/
  cp scripts/extract-pptx.py scripts/deploy.sh scripts/export-pdf.sh ~/.claude/skills/frontend-slides/scripts/

  # atau clone langsung
  git clone https://github.com/zarazhangrui/frontend-slides.git ~/.claude/skills/frontend-slides

  # Agent lain (Codex, Kimi Code, OpenCode, Gemini CLI, dan sejenisnya): kirim tautan repo ini ke agent
  # dan minta ia memakai skill Frontend Slides:
  # https://github.com/zarazhangrui/frontend-slides
---

# Frontend Slides

Skill agent coding untuk membuat presentasi HTML yang memukau, dari nol atau dengan mengonversi file PowerPoint. Skill ini dikemas sebagai plugin Claude Code, dan `SKILL.md` intinya juga bisa dibaca agent coding lain yang punya akses filesystem dan shell.

> **Catatan dari situs ini:** (1) Opsi deploy memakai Vercel (akun gratis) dan ekspor PDF memakai Playwright yang dipasang otomatis bila perlu; keduanya dijalankan skrip bawaan repo atas permintaanmu. (2) Galeri 34 template dari `beautiful-html-templates` hanya didaftar nama dan deskripsinya, tanpa tangkapan layar. (3) Panduan video di YouTube dan video demo tidak disalin.

## Tutorial video

Baru di sini? Video ramah pemula ini memandumu dari awal sampai akhir: [Tonton di YouTube](https://www.youtube.com/watch?v=372Iksaz8b0).

## Fungsinya

**Frontend Slides** membantu non-desainer membuat presentasi web yang indah tanpa perlu tahu CSS atau JavaScript. Ia memakai pendekatan "tunjukkan, jangan ceritakan": alih-alih memintamu menjelaskan selera estetika dengan kata-kata, ia menghasilkan pratinjau visual dan membiarkanmu memilih yang kamu suka.

### Fitur utama

- **Nol dependensi**: satu file HTML dengan CSS/JS inline. Tanpa npm, tanpa alat build, tanpa framework.
- **Penemuan gaya visual**: tidak bisa mengungkapkan preferensi desain? Tidak masalah. Pilih dari pratinjau visual yang dihasilkan.
- **Konversi PPT**: ubah file PowerPoint yang ada ke web, dengan semua gambar dan konten tetap terjaga.
- **Anti-AI-Slop**: gaya khas terkurasi yang menghindari estetika AI generik (selamat tinggal gradien ungu di atas putih).
- **Bold Template Pack**: template opsional yang mengutamakan desain dari `beautiful-html-templates`, dimuat bertahap sehingga preset aman tetap menjadi fallback default.
- **Kualitas produksi**: aksesibel, 16:9 tetap, kode berkomentar baik yang bisa kamu sesuaikan.

## Pasang

### Lewat sumber marketplace kustom Claude Code

Pasang langsung dari repo GitHub publik ini. Jalankan keduanya sebagai dua pesan Claude Code yang terpisah; jangan tempel kedua baris ke prompt sekaligus.

```text
/plugin marketplace add https://github.com/zarazhangrui/frontend-slides
```

Setelah selesai, jalankan:

```text
/plugin install frontend-slides@frontend-slides
```

Pakai URL HTTPS. Bentuk singkat `zarazhangrui/frontend-slides` bisa membuat Claude Code mencoba SSH, yang bisa gagal bila GitHub belum ada di file `known_hosts` kamu.

Lalu pakai dengan mengetik `/frontend-slides:frontend-slides` di Claude Code. Claude Code memberi namespace pada skill yang dipasang lewat plugin sebagai `/nama-plugin:nama-skill`.

### Pemasangan manual di Claude Code

Salin file skill ke direktori skill Claude Code kamu:

```bash
# Buat direktori skill
mkdir -p ~/.claude/skills/frontend-slides/scripts

# Salin file skill untuk pengguna
cp SKILL.md STYLE_PRESETS.md viewport-base.css html-template.md animation-patterns.md ~/.claude/skills/frontend-slides/
cp -R bold-template-pack ~/.claude/skills/frontend-slides/
cp scripts/extract-pptx.py scripts/deploy.sh scripts/export-pdf.sh ~/.claude/skills/frontend-slides/scripts/
```

Atau clone langsung:

```bash
git clone https://github.com/zarazhangrui/frontend-slides.git ~/.claude/skills/frontend-slides
```

Lalu pakai dengan mengetik `/frontend-slides` di Claude Code. Skill mandiri tidak diberi namespace.

### Agent coding lain

Agent seperti Codex, Kimi Code, OpenCode, Gemini CLI, atau asisten coding lokal lainnya bisa memakai skill inti yang sama. Cara paling sederhana adalah mengirim tautan repo GitHub ini ke agent dan memintanya memakai skill Frontend Slides:

```text
https://github.com/zarazhangrui/frontend-slides
```

Jika agent bisa membaca repo GitHub atau menelusuri file, ia sebaiknya mulai dari `SKILL.md` dan hanya memuat file pendukung yang dirujuk dan dibutuhkannya:

- `STYLE_PRESETS.md`
- `viewport-base.css`
- `html-template.md`
- `animation-patterns.md`
- `bold-template-pack/`
- `scripts/`

Sebagian agent juga bisa memasang skill untukmu bila punya akses filesystem dan direktori skill lokal yang diketahui. Jika tidak, mereka tetap bisa mengikuti `SKILL.md` langsung untuk sesi saat ini.

Plugin Claude Code memberi Claude Code alur pemasangan sumber marketplace kustom dan perintah `/frontend-slides:frontend-slides`. Agent lain biasanya tidak memakai permukaan perintah itu.

## Cara pakai

### Membuat presentasi baru

```text
/frontend-slides:frontend-slides

> "I want to create a pitch deck for my AI startup"
```

Jika dipasang manual sebagai skill mandiri Claude Code, pakai `/frontend-slides`.

Di agent non-Claude, minta agent memakai skill Frontend Slides dan arahkan ke repo ini atau `SKILL.md`.

Skill akan:

1. Menanyakan kontenmu (slide, pesan, gambar)
2. Menghasilkan 3 pratinjau gaya visual untuk kamu bandingkan, dengan menyimpulkan suasana dari brief kamu kecuali kamu sudah menyebut satu gaya
3. Membiarkanmu memilih arah visual
4. Membuat presentasi lengkap dalam gaya pilihanmu
5. Membukanya di browser

### Mengonversi PowerPoint

```text
/frontend-slides:frontend-slides

> "Convert my presentation.pptx to a web slideshow"
```

Skill akan:

1. Mengekstrak semua teks, gambar, dan catatan dari PPT kamu
2. Menampilkan konten yang diekstrak untuk kamu konfirmasi
3. Membiarkanmu memilih gaya visual
4. Menghasilkan presentasi HTML dengan semua aset aslimu

## Gaya yang disertakan

### Tema gelap

- **Bold Signal**: percaya diri, berdampak tinggi, kartu cerah di atas gelap
- **Electric Studio**: bersih, profesional, panel terbelah
- **Creative Voltage**: energik, retro-modern, biru listrik + neon
- **Dark Botanical**: elegan, canggih, aksen hangat

### Tema terang

- **Notebook Tabs**: editorial, rapi, kertas dengan tab berwarna
- **Pastel Geometry**: ramah, mudah didekati, pil vertikal
- **Split Pastel**: ceria, modern, belahan vertikal dua warna
- **Vintage Editorial**: jenaka, penuh kepribadian, bentuk geometris

### Khusus

- **Neon Cyber**: futuristik, latar partikel, cahaya neon
- **Terminal Green**: berfokus pada developer, estetika hacker
- **Swiss Modern**: minimal, terinspirasi Bauhaus, geometris
- **Paper & Ink**: sastrawi, huruf awal besar, kutipan menonjol

### Bold Template Pack

Skill ini juga menyertakan 34 sistem desain tebal opsional dari `beautiful-html-templates`, seperti **Neo-Grid Bold**, **Editorial Tri-Tone**, **Creative Mode**, **Broadside**, **Signal**, dan **Vellum**.

Saat penemuan gaya, set pratinjaunya adalah:

- 1 preset aman dari `STYLE_PRESETS.md`
- minimal 1 opsi template tebal dari `bold-template-pack/selection-index.json`
- 1 opsi wildcard, entah template tebal lain atau desain kustom buatan sendiri

Agent membaca indeks template tebal yang ringkas lebih dulu, lalu memuat hanya kartu `preview.md` kecil milik kandidat terpilih untuk pratinjau slide judul. Ia memuat `design.md` penuh untuk tepat satu template tebal hanya setelah pengguna memilih template itu untuk deck akhir. Jika pengguna memilih wildcard kustom, agent memperluas sistem CSS dan layout milik pratinjau itu menjadi deck penuh.

## Galeri Bold Template

Frontend Slides kini bisa memakai 34 sistem desain tebal dari [`beautiful-html-templates`](https://github.com/zarazhangrui/beautiful-html-templates). Nama tiap template di bawah menaut ke pustaka sumbernya, tempat tangkapan layar tiap template tersedia.

- [Soft Editorial](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/soft-editorial/): serif Cormorant Garamond di atas kertas hangat dengan aksen sage, blush, dan lemon.
- [Editorial Forest](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/editorial-forest/): hijau hutan, merah muda berdebu, dan krem hangat dalam Source Serif 4; estetika tinjauan kuartalan yang tenang dan disengaja.
- [Pin & Paper](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/pin-and-paper/): kertas kuning dengan ilustrasi peniti, tulisan tangan Caveat biru tinta, tekstur serat kertas.
- [Sakura Chroma](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/sakura-chroma/): estetika kemasan kaset Jepang vintage: kertas krem, pita pelangi diagonal, huruf tebal sempit, kotak centang spesifikasi gaya JIS.
- [Stencil & Tablet](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/stencil-tablet/): kertas tulang dengan judul potongan stensil dan palet bumi enam warna: arkeologi bertemu merek.
- [Cobalt Grid](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/cobalt-grid/): serif miring biru kobalt listrik di kanvas kertas grafik, dijangkarkan dekorasi pixel-glitch berundak dan garis rambut tipis.
- [Vellum](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/vellum/): kanvas biru tua dengan serif Cormorant miring kuning hangat dan satu aksen teal berdebu; estetika akademis yang tenang.
- [Emerald Editorial](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/emerald-editorial/): deck bisnis ala sampul majalah: hijau zamrud + biru tua + kertas dengan ornamen masthead garis ganda dan serif display tebal bergaya Bodoni.
- [Neo-Grid Bold](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/neo-grid-bold/): neo-brutalisme editorial dengan satu aksen kuning neon di atas kertas putih gading.
- [Editorial Tri-Tone](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/editorial-tri-tone/): sistem editorial tiga warna: merah muda berdebu, krem mustard, dan merah marun tua, dalam Bricolage + Instrument Serif.
- [Creative Mode](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/creative-mode/): kanvas kertas krem dengan aksen multiwarna yang percaya diri (hijau, merah muda, oranye, kuning) dan display Archivo Black.
- [Monochrome](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/monochrome/): kertas buku besar gading dengan huruf serba hitam; judul serif Lora, isi Jost, tanpa warna sama sekali.
- [People's Platform (Block & Bold)](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/peoples-platform/): energi poster aktivis: biru, oranye, merah di atas krem, dengan Alfa Slab + Caveat Brush.
- [Pink Script — After Hours](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/pink-script/): kanvas hitam, aksen merah muda menyala, kertas krem mutiara, judul Instrument Serif: kemewahan editorial larut malam.
- [8-Bit Orbit](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/8-bit-orbit/): estetika arkade neon pixel-art di atas kehampaan biru tua.
- [BlockFrame](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/block-frame/): deck neobrutalis dengan blok warna pastel-neon dan batas hitam tebal.
- [Blue Professional](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/blue-professional/): latar kertas krem dengan aksen biru kobalt listrik; profesional modern yang bersih.
- [Bold Poster](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/bold-poster/): estetika poster editorial dengan Shrikhand display raksasa dan satu aksen merah mobil pemadam.
- [Broadside](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/broadside/): kanvas editorial gelap dengan satu aksen oranye api dan tumpukan huruf dwibahasa Latin/Mandarin.
- [Capsule](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/capsule/): kartu modular berbentuk pil di atas warna tulang hangat dengan palet pastel-pop lengkap.
- [Cartesian](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/cartesian/): palet netral hangat yang tenang dengan serif Playfair klasik; berselera dan tidak terburu-buru.
- [Coral](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/coral/): krem dan koral di atas hampir-hitam, dengan Bebas Neue berukuran besar.
- [Daisy Days](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/daisy-days/): deck pastel ceria dengan aster, bintang, dan pelangi gambar tangan. Ramah, lembut, hangat.
- [Grove](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/grove/): kanvas hijau hutan dengan huruf krem, serif Playfair klasik, dan satu aksen karat.
- [Mat](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/mat/): kanvas sage gelap dengan kertas tulang dan aksen oranye terbakar; mid-century modern dengan nuansa kayu.
- [Playful](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/playful/): latar persik hangat matahari dengan display Syne: deck peluncuran indie yang ramah.
- [Raw Grid](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/raw-grid/): deck neo-brutalis dengan batas tebal, bayangan offset, dan palet merah muda/sage/tinta.
- [Retro Windows](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/retro-windows/): chrome Windows 95: bilah judul abu-abu, MS Sans Serif, tipografi piksel, nostalgia penuh.
- [Retro Zine](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/retro-zine/): kertas beige dengan aksen hijau serta Bebas Neue + Caveat: zine cetak riso dalam bentuk HTML.
- [Scatterbrain](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/scatterbrain/): terinspirasi Post-it: sticky note pastel, tulisan tangan Caveat, tumpukan huruf Shrikhand dan Zilla Slab.
- [Signal](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/signal/): kanvas biru tua dengan kertas tulang dan satu aksen emas redup; institusional dengan bobot yang tenang.
- [Studio](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/studio/): kanvas hitam dengan huruf kuning listrik; estetika studio desain bertegangan tinggi.
- [Biennale Yellow](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/biennale-yellow/): kuning surya di atas perkamen hangat dengan serif indigo tua dan gradien cahaya matahari atmosferik. Energi poster editorial Belanda.
- [Long Table](https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/long-table/): estetika supper-club krem hangat dan merah karat dengan judul grotesk huruf kapital tebal, Fraunces miring, dan tombol berkontur berbentuk pil.

## Arsitektur

Skill ini memakai **progressive disclosure**: `SKILL.md` utama adalah peta alur kerja, dengan file pendukung dimuat sesuai kebutuhan saja.

| File | Fungsi | Dimuat saat |
| --- | --- | --- |
| `SKILL.md` | Alur kerja dan aturan inti | Selalu (saat skill dipanggil) |
| `STYLE_PRESETS.md` | 12 preset visual terkurasi | Fase 2 (pemilihan gaya) |
| `bold-template-pack/selection-index.json` | Metadata template tebal yang ringkas untuk memilih kandidat | Fase 2 (pemilihan gaya) |
| `bold-template-pack/templates/*/preview.md` | Kartu gaya mungil untuk pratinjau template tebal terpilih | Fase 2 setelah penyaringan |
| `bold-template-pack/templates/*/design.md` | Sistem desain penuh untuk template tebal yang dipilih | Fase 3 setelah pengguna memilih |
| `viewport-base.css` | CSS panggung tetap yang wajib | Fase 3 (pembuatan) |
| `html-template.md` | Struktur HTML dan fitur JS | Fase 3 (pembuatan) |
| `animation-patterns.md` | Referensi animasi CSS/JS | Fase 3 (pembuatan) |
| `scripts/extract-pptx.py` | Ekstraksi konten PPT | Fase 4 (konversi) |
| `scripts/deploy.sh` | Deploy ke Vercel | Fase 6 (berbagi) |
| `scripts/export-pdf.sh` | Ekspor slide ke PDF | Fase 6 (berbagi) |

Metadata sumber dan helper regenerasi yang hanya untuk pemeliharaan ada di luar paket skill untuk pengguna. Pengguna biasa tidak membutuhkannya.

Desain ini mengikuti praktik terbaik agent-skill: beri agent peta dulu, lalu ungkap hanya file spesifik yang dibutuhkan untuk pilihan saat ini.

## Filosofi

Skill ini lahir dari keyakinan bahwa:

1. **Kamu tidak perlu menjadi desainer untuk membuat hal indah.** Kamu hanya perlu bereaksi terhadap apa yang kamu lihat.
2. **Dependensi adalah utang.** Satu file HTML akan berfungsi 10 tahun lagi. Proyek React dari 2019? Semoga berhasil.
3. **Yang generik mudah dilupakan.** Setiap presentasi harus terasa dibuat khusus, bukan hasil template.
4. **Komentar adalah kebaikan.** Kode harus menjelaskan dirinya kepada dirimu di masa depan (atau siapa pun yang membukanya).

## Membagikan presentasimu

Setelah membuat presentasi, skill menawarkan dua cara untuk membagikannya:

### Deploy ke URL langsung

Satu perintah men-deploy slide kamu ke URL permanen yang bisa dibagikan dan berfungsi di perangkat apa pun: ponsel, tablet, laptop:

```bash
bash scripts/deploy.sh ./my-deck/
# atau
bash scripts/deploy.sh ./presentation.html
```

Memakai [Vercel](https://vercel.com) (tingkat gratis). Skill memandumu mendaftar dan login bila ini pertama kalinya.

### Ekspor ke PDF

Ubah slide kamu menjadi PDF untuk email, Slack, Notion, atau dicetak:

```bash
bash scripts/export-pdf.sh ./my-deck/index.html
bash scripts/export-pdf.sh ./presentation.html ./output.pdf
```

Memakai [Playwright](https://playwright.dev) untuk memotret tiap slide pada 1920×1080 lalu menggabungkannya menjadi PDF. Terpasang otomatis bila perlu. Animasi tidak dipertahankan (ini cuplikan statis).

## Persyaratan

- Agent coding lokal dengan akses filesystem dan kemampuan menjalankan perintah shell
- Claude Code hanya dibutuhkan untuk pemasangan sumber marketplace kustom dan perintah `/frontend-slides:frontend-slides`
- Untuk konversi PPT: Python dengan pustaka `python-pptx`
- Untuk deploy URL: Node.js + akun Vercel (gratis)
- Untuk ekspor PDF: Node.js (Playwright terpasang otomatis)

## Kredit

Dibuat oleh [@zarazhangrui](https://github.com/zarazhangrui).

## Lisensi

MIT: pakai, ubah, bagikan.
