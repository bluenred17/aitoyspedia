---
title: "ffmpeg-skill"
summary: "Skill Agent dengan 42 alat FFmpeg lokal untuk memotong, memfit, memberi caption, menormalkan audio, dan memeriksa hasil video, tanpa cloud dan tanpa API key."
category: video
tags: [ffmpeg, video, editing, caption, loudness, mcp, python]
surfaces: [claude-code]
trigger: "Saat pengguna minta mengedit, memotong, menggabung, memberi caption, menormalkan loudness, atau mengekspor video atau audio dengan FFmpeg secara lokal."
install: |
  npx ffmpeg-skill              # Claude Code   → ~/.claude/skills/ffmpeg-skill
  npx ffmpeg-skill --cursor     # Cursor        → ~/.cursor/skills/ffmpeg-skill
  npx ffmpeg-skill --codex      # Codex         → ~/.agents/skills/ffmpeg-skill (Cursor reads this location too)
  npx ffmpeg-skill --all        # all three
  npx ffmpeg-skill --project    # this project  → ./.claude/skills/ffmpeg-skill
  npx ffmpeg-skill --dir ./my-skills
  npx ffmpeg-skill --uninstall  # remove from the selected targets (--codex also clears the older ~/.codex/skills location)

  /plugin install ffmpeg-skill --marketplace kajisho5/ffmpeg-skill      # in Claude Code 2.1.275 or later
  claude plugin marketplace add kajisho5/ffmpeg-skill                    # older versions: add the marketplace,
  claude plugin install ffmpeg-skill@ffmpeg-skill                        # then install from it

  # Tanpa Node: clone repo ini, lalu salin SKILL.md, package.json, scripts/, templates/, references/, docs/, dan mcp/
  # ke folder skills agent kamu (set yang sama dengan yang dipasang npx ffmpeg-skill).
source_url: "https://github.com/kajisho5/ffmpeg-skill/blob/main/README.md"
repo: kajisho5/ffmpeg-skill
stars: 4554
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
---

ffmpeg-skill adalah Agent Skill yang memberi Claude Code, Cursor, Codex, dan agent lain yang membaca `SKILL.md` sebuah editor video lokal. Alurnya tetap: periksa file dengan `probe` → edit tanpa re-encode bila memungkinkan → periksa → verifikasi. Semua pekerjaan dijalankan oleh `ffmpeg` dan `ffprobe` di mesin kamu. Tidak ada cloud, tidak ada API key, dan tidak ada dependensi Python selain pustaka standar.

Menurut README, skill ini punya 42 alat yang bisa dipanggil sebagai skrip CLI maupun sebagai MCP tool. Dengan MCP, `tools/list` secara default hanya menampilkan 12 alat inti untuk menghemat konteks klien, dan `FFMPEG_SKILL_MCP_FULL=1` menampilkan semuanya.

## Yang bisa dilakukan

- **Potong dan gabung:** `cut.py` (potongan lossless dengan stream copy, `--accurate` untuk akurasi per frame), `join.py` (transisi xfade dengan normalisasi ukuran dan fps), `silence.py` (buang jeda, dengan margin dan pilihan `--speech-aware`).
- **Format dan durasi:** `fit.py` (sesuaikan durasi dan rasio, dengan pad, crop, atau blur), `crop.py`, `stabilize.py`, `straighten.py`, `loop.py`, `freeze.py`.
- **Caption dan grafis:** `caption.py` (SRT atau ASS, karaoke, deteksi huruf non-Latin, transkripsi lokal opsional lewat engine ASR yang sudah terpasang), `overlay.py`, `graphics.py` (lower-third, judul, progress bar).
- **Audio:** `audio.py` (pembersihan suara, kompresor, gate, ducking musik), `loudness.py` (EBU R128, default −14 LUFS), `sync.py` (sinkronisasi dua rekaman, dengan koreksi drift).
- **Warna dan HDR:** `color.py` (HDR ke SDR, LUT .cube, koreksi primer).
- **Ekspor dan pengiriman:** `export.py` (preset YouTube, Reels, TikTok, Shorts, dan lainnya), `render.py --template` untuk satu perintah per platform, `batch.py` untuk folder, `multicam.py`, serta `render.py --export-timeline` ke FCPXML, EDL, atau OTIO.
- **Pemeriksaan:** `check.py` memberi PASS, WARN, atau FAIL per platform. `look.py` membuat lembar kontak PNG supaya agent bisa melihat hasilnya sendiri sebelum melapor selesai. `doctor` memeriksa komponen FFmpeg yang dibutuhkan di mesin kamu.

Ada juga `redact.py` yang mengaburkan area piksel yang kamu tentukan. Alat ini tidak mendeteksi wajah, plat, atau logo sendiri.

## Batasan yang ditulis pengembang

- **Tidak ada deteksi subjek otomatis.** `look.py` hanya menghasilkan PNG. Pemilihan titik crop ada di tangan agent yang melihat gambar, atau di tangan kamu. Crop default adalah tengah.
- **Tidak ada filter graph mentah.** Pemanggil tidak bisa mengirim argumen `ffmpeg` atau `filter_complex` sembarang.
- **`doctor` `ok` tidak sama dengan `usable` per alat.** Lihat hasil `doctor --json` untuk jawaban per alat.
- **Di macOS, FFmpeg dari Homebrew harus `ffmpeg-full`.** Formula `ffmpeg` biasa tidak punya filter `subtitles`, `drawtext`, dan `zscale`.
- **Transkripsi caption bersifat opsional.** Perlu engine lokal yang dipasang terpisah, misalnya `faster-whisper`. Model diunduh saat pertama kali dijalankan. Audio tidak diunggah.
- Dokumen README mencatat bahwa pengguna perlu menjalankan `npx ffmpeg-skill` lagi untuk memperbarui salinan skill. Salinan tidak diperbarui otomatis.

## Persyaratan

- FFmpeg 6.1 atau lebih baru. Versi 5.x ditolak.
- Python 3.10 atau lebih baru, dengan pustaka standar saja.
- Node 16 atau lebih baru, hanya untuk installer `npx`.

Instalasi FFmpeg per sistem operasi:

| OS | Perintah |
|----|---------|
| macOS | `brew install ffmpeg-full`, lalu tambahkan ke `PATH`. Lihat catatan `ffmpeg-full` di bawah |
| Ubuntu / Debian | `sudo apt install ffmpeg` |
| Windows | `winget install Gyan.FFmpeg` |

**Di macOS, `ffmpeg-full` tidak otomatis masuk `PATH`.** Formula ini keg-only. Ada dua cara: tambahkan `export PATH="$(brew --prefix ffmpeg-full)/bin:$PATH"` ke profil shell, atau jalankan `brew unlink ffmpeg 2>/dev/null; brew link --overwrite --force ffmpeg-full`. Cara kedua membuat `brew doctor` memberi peringatan, dan upgrade formula `ffmpeg` biasa bisa menautkannya kembali. Setelah upgrade, cek ulang bahwa `command -v ffmpeg` masih mengarah ke `ffmpeg-full`.

Setelah pasang, jalankan:

```bash
npx ffmpeg-skill doctor           # every required FFmpeg component present?
npx ffmpeg-skill contract --json  # what the agent framework will see
```

## Lisensi

MIT.
