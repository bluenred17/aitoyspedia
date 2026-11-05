---
title: "ghost-editor"
summary: "Skill Claude Code open-source untuk mengubah rekaman talking-head mentah menjadi reel video 30 detik, dirender di Mac."
category: video
tags: [video, reels, talking-head, ffmpeg, whisper, editing]
surfaces: [claude-code]
trigger: "Saat pengguna minta mengedit video talking-head atau rekaman mentah menjadi reel dengan gaya tertentu, misalnya Clean OS, Seoul list, RESULT, atau Whiteboard."
install: |
  Install the ghost-editor skill: clone https://github.com/kurbaitaev/ghost-editor into ~/.claude/skills/ghost-editor and follow its docs/INSTALL.md.
source_url: "https://github.com/kurbaitaev/ghost-editor/blob/main/README.md"
repo: kurbaitaev/ghost-editor
stars: 218
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
---

Ghost-editor adalah editor video AI open-source untuk reel talking-head. Dijalankan sebagai skill Claude Code dan dirender di Mac. Kamu merekam naskah secara mentah, lalu skill memilih take terbaik, memotong jeda, menambahkan caption, B-roll, dan suara, lalu memeriksa hasilnya sendiri sebelum mengirim.

## Cara kerja

- Rekaman mentah sekitar 3 menit dengan puluhan percobaan per kalimat diubah menjadi reel 30 detik.
- Take yang buruk ditandai dan dibuang. Take terbaik tiap kalimat dipindahkan ke timeline.
- Kamu menyetujui satu halaman yang memuat frame di setiap potongan.
- Pemeriksaan mandiri memeriksa jeda, level suara, ukuran caption, anggaran B-roll, dan wajah yang tidak boleh tertutup.
- Menurut pengembang, satu batch 21 reel selesai dalam 3 jam 40 menit di satu Mac mini, dan 2 kesalahan sendiri tertangkap sebelum pengiriman.

## Gaya yang bisa diminta

| Permintaan | Hasil |
|---|---|
| `edit this in Clean OS` | Talking head gaya iklan Apple yang berada di dalam layar ponsel |
| `make a Seoul list` | Daftar dengan voice-over di atas B-roll cepat dan halaman kolase putih |
| `edit this in RESULT style` | Edit podcast hangat dengan kartu navy dan polaroid |
| `edit this in stan style` | Tutorial alat dengan layar kamu di belakang kepala |
| `make an animated explainer` | Tanpa kamera: narator dan dunia yang menggambar dirinya sendiri |
| `cut these POV clips into a reel` | Klip kacamata pintar atau GoPro dipotong menjadi cerita |
| `edit this in Face RESULT` | Gaya RESULT di sekitar wajah, dengan properti kertas, polaroid, dan kartu kutipan di samping wajah |
| `make a kinetic doc` | Dokumenter arsip hitam putih dengan satu aksen merah, kata muncul saat diucapkan |
| `edit this in Whiteboard` | Layar terbagi: papan tulis di atas menggambar tiap gagasan, kamu di bawah |
| `make a Step Deck` | Deck tips bernomor dengan angka miring besar, kartu kata, dan cetakan |
| `edit this as a Product page` | Ulasan alat yang ditata seperti halaman produk |
| `edit this in Tactile paper` | Presentasi di atas kertas cetak yang bergerak seperti stop-motion |
| `edit this in Caption News` | Caption besar per potong, kata kunci di blok kuning, label sumber |
| `make a News Package` | Kamu sebagai pembawa berita segmen TV |
| `edit this in Telestrator` | Bekukan frame lalu gambar di atasnya seperti replay olahraga |
| `make a Halftone Dossier` | Berkas kasus cetak bergaya retro |
| `edit this in Swiss Grid` | Poster grid ketat dengan satu warna merah |
| `make a Data Story` | Grafik pensil dari angka nyata yang bersumber |
| `edit this in Hologram HUD` | Pemindaian wireframe dengan kotak target |
| `edit mine like this reel` | Skill mempelajari reel yang kamu suka, lalu mengedit video kamu dengan cara yang sama |

Ada juga tujuh preset satu kata: `clean`, `editorial`, `meme`, `cinematic`, `launch`, `kinetic`, `pop`.

## Yang kamu butuhkan

- [Claude Code](https://claude.com/claude-code) dengan paket Claude berbayar. Ghost-editor sendiri gratis.
- Mac dengan Apple silicon. Linux dan Mac Intel belum diuji.
- Sekitar 4 GB ruang disk. Instalasi memasang ffmpeg, Node, Python, Whisper, dan OpenCV.
- Kunci [Gemini API](https://aistudio.google.com/apikey) gratis untuk pemeriksaan B-roll. Bingkai yang diperiksa dikirim ke Google. Tanpa kunci ini, pemeriksaan tersebut dilewati.
- Kunci ElevenLabs hanya untuk narator pada gaya explainer.

Reel 60 detik memakan sekitar 15 hingga 25 menit waktu mesin di MacBook Air M3, menurut pengembang.

## Pertanyaan umum

- **Bahasa?** Diuji dalam bahasa Inggris dan Rusia. Demo dibuat dalam bahasa Rusia karena pengembang memposting dalam bahasa itu.
- **Bisakah membuat gaya yang tidak ada di daftar?** Bisa. Deskripsikan atau tunjukkan sebuah reel, lalu skill menulis resepnya.
- **Suara dan musik?** Pustaka gratis Mixkit yang diunduh saat instalasi, plus paket suara meme CC0 yang ikut di repo.

Selengkapnya: [cara kerja](https://github.com/kurbaitaev/ghost-editor/blob/main/docs/HOW-IT-WORKS.md) · [setiap blok bangunan](https://github.com/kurbaitaev/ghost-editor/blob/main/docs/PLAYBOOK.md) · [lisensi](https://github.com/kurbaitaev/ghost-editor/blob/main/docs/THIRD_PARTY/README.md)

## Lisensi

Kode berlisensi MIT. Klip demo di README adalah milik pengembang dan tidak untuk digunakan ulang. Reel yang kamu buat tetap milik kamu.
