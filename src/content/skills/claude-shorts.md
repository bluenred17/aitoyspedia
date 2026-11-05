---
title: "claude-shorts"
summary: "Skill Claude Code interaktif yang memotong video panjang menjadi klip vertikal dengan caption animasi, memberi skor segmen, lalu merendernya dengan Remotion."
category: video
tags: [shorts, video, remotion, whisper, caption, reels, tiktok, youtube-shorts]
surfaces: [claude-code]
trigger: "Saat pengguna minta mengubah video panjang, podcast, atau talk menjadi shorts, reels, atau TikTok vertikal dengan caption."
install: |
  # Clone the repository
  git clone https://github.com/AgriciDaniel/claude-shorts.git
  cd claude-shorts

  # Install Python + Node.js dependencies
  bash setup.sh

  # Install as a Claude Code skill
  bash install.sh

  # Windows: jalankan perintah di atas di dalam WSL 2
  git clone https://github.com/AgriciDaniel/claude-shorts.git
  cd claude-shorts
  bash setup.sh
  bash install.sh
source_url: "https://github.com/AgriciDaniel/claude-shorts/blob/main/README.md"
repo: AgriciDaniel/claude-shorts
stars: 313
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
---

Claude Shorts adalah skill Claude Code interaktif untuk membuat klip vertikal dari video panjang. Claude membaca seluruh transkrip, memberi skor kandidat segmen, lalu kamu memilih segmen, gaya caption, dan platform. Render dilakukan dengan Remotion, dan encoding akhir dengan FFmpeg.

## Alur kerja

Claude Code memandu 10 langkah:

1. **Preflight:** memeriksa file input, ruang disk, dan GPU.
2. **Transkripsi:** dengan faster-whisper, timestamp per kata.
3. **Deteksi konten:** otomatis mengenali talking-head, rekaman layar, atau podcast.
4. **Analisis:** Claude membaca transkrip dan memberi skor 8 sampai 12 kandidat.
5. **Tampilkan:** kandidat dalam tabel dengan skor, hook, dan alasan.
6. **Setujui:** kamu memilih segmen, menyesuaikan timecode, lalu memilih gaya caption dan platform.
7. **Snap batas:** titik potong disesuaikan ke batas kata, akhir kalimat, dan jeda audio.
8. **Persiapan:** klip diambil dengan stream copy FFmpeg, dan koordinat reframe dihitung.
9. **Render:** Remotion membuat video 1080×1920 dengan caption animasi.
10. **Ekspor:** encoding sesuai platform (YouTube Shorts, TikTok, Instagram Reels).

## Fitur

- **Penilaian segmen oleh Claude** dengan rubrik lima dimensi: kekuatan hook (bobot 0,30), koherensi mandiri (0,25), intensitas emosi (0,20), kepadatan nilai (0,15), dan kualitas penutup (0,10). Skor 0 sampai 100, ambang minimum 60.
- **Tiga gaya caption:** Bold (huruf kapital, kuning untuk kata aktif), Bounce (animasi pegas dan warna bergantian), dan Clean (fade-in sederhana).
- **Pelacakan kursor** untuk rekaman layar. Kursor dideteksi dengan selisih frame, lalu crop mengikutinya.
- **Snap batas berbasis audio.** Potongan tidak memotong di tengah kata atau kalimat.
- **Akselerasi GPU opsional:** CUDA untuk transkripsi dan NVENC untuk encoding. Jika tidak ada, proses kembali ke CPU.

## Yang dipasang `setup.sh`

- Virtual environment Python di `~/.shorts-skill/`, atau memakai `~/.video-skill/` bila sudah ada.
- `faster-whisper`, `mediapipe`, `numpy`, `opencv-python`, dan PyTorch (versi CUDA atau CPU).
- `npm install` di folder `remotion/`.
- Pemeriksaan FFmpeg dan jq.

## Persyaratan

- FFmpeg dan jq (paket sistem)
- Python 3.10 atau lebih baru
- Node.js 18 atau lebih baru
- Claude Code (CLI)
- GPU NVIDIA direkomendasikan, untuk CUDA dan NVENC

Di Windows, skill ini memerlukan alat Unix (bash dan FFmpeg), jadi jalankan dari dalam [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install).

## Cara pakai

Di Claude Code, jalankan:

```
/shorts
```

Lalu berikan file video. Contoh:

```
You: /shorts ~/Videos/my-talk.mp4
Claude: [Transcribes, detects content type, scores segments]

| # | Time          | Dur  | Score | Hook                           |
|---|---------------|------|-------|--------------------------------|
| 1 | 04:22 - 05:01 | 39s  | 87    | "Nobody talks about this..."  |
| 2 | 12:45 - 13:28 | 43s  | 82    | "Here's the exact framework." |
| 3 | 08:11 - 08:52 | 41s  | 79    | "I tested this for 6 months." |

Claude: Which segments? Caption style? Platform?
You: 1 and 3, bounce style, youtube

Claude: [Snaps boundaries, extracts clips, renders, exports]
Output: shorts/short_01_yt.mp4, shorts/short_03_yt.mp4
```

## Spesifikasi ekspor per platform

| Platform | Codec | Bitrate | Audio |
|----------|-------|---------|-------|
| **YouTube Shorts** | H.264 High 4.2 | 12 Mbps | AAC 192k |
| **TikTok** | H.264 | CRF 18, preset slow | AAC 128k |
| **Instagram Reels** | H.264 High 4.2 | 4,5 Mbps (maks. 5000k) | AAC 128k |

## Strategi per jenis konten

| Jenis konten | Strategi reframe | Zoom |
|--------------|-----------------|------|
| **Talking-head** | Crop tengah dengan pelacakan wajah (MediaPipe) | 9:16 tepat |
| **Rekaman layar** | Pan mengikuti kursor | 55% lebar sumber |
| **Podcast** | Pelacakan pembicara dominan | 9:16 tepat |

## Font

Font caption dibundel dari Google Fonts dengan lisensi SIL Open Font License: Montserrat Bold (Bold), Bangers Regular (Bounce), dan Inter Bold (Clean).

## Lisensi

MIT.
