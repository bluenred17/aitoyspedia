---
title: "Whisper"
summary: "Model pengenalan ucapan serbaguna dari OpenAI untuk transkripsi multibahasa, terjemahan ucapan ke bahasa Inggris, dan deteksi bahasa, yang bisa dijalankan lokal."
category: audio
tags: [speech-to-text, transkripsi, asr, whisper, openai, subtitle, python]
surfaces: [claude-code]
setup: |
  pip install -U openai-whisper

  # atau langsung dari commit terbaru repo
  pip install git+https://github.com/openai/whisper.git

  # perbarui ke versi terbaru repo
  pip install --upgrade --no-deps --force-reinstall git+https://github.com/openai/whisper.git

  # FFmpeg wajib ada di sistem
  sudo apt update && sudo apt install ffmpeg      # Ubuntu / Debian
  sudo pacman -S ffmpeg                           # Arch Linux
  brew install ffmpeg                             # macOS (Homebrew)
  choco install ffmpeg                            # Windows (Chocolatey)
  scoop install ffmpeg                            # Windows (Scoop)

  # Contoh pemakaian dari baris perintah
  whisper audio.flac audio.mp3 audio.wav --model turbo
  whisper japanese.wav --language Japanese
  whisper japanese.wav --model medium --language Japanese --task translate
source_url: "https://github.com/openai/whisper/blob/main/README.md"
repo: openai/whisper
stars: 111988
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
---

Whisper adalah model pengenalan ucapan serbaguna dari OpenAI. Model ini dilatih dengan data audio yang beragam dan bisa melakukan tiga tugas sekaligus: transkripsi multibahasa, terjemahan ucapan ke bahasa Inggris, dan identifikasi bahasa. Semua tugas itu direpresentasikan sebagai urutan token dalam satu model Transformer sequence-to-sequence, sehingga satu model menggantikan beberapa tahap dalam pipeline pemrosesan ucapan tradisional.

## Model

| Ukuran | Parameter | Model khusus Inggris | Model multibahasa | VRAM | Kecepatan relatif |
|:------:|:---------:|:--------------------:|:-----------------:|:----:|:-----------------:|
| tiny | 39 M | `tiny.en` | `tiny` | ~1 GB | ~10x |
| base | 74 M | `base.en` | `base` | ~1 GB | ~7x |
| small | 244 M | `small.en` | `small` | ~2 GB | ~4x |
| medium | 769 M | `medium.en` | `medium` | ~5 GB | ~2x |
| large | 1550 M | N/A | `large` | ~10 GB | 1x |
| turbo | 809 M | N/A | `turbo` | ~6 GB | ~8x |

Kecepatan relatif diukur pada A100 dengan ucapan bahasa Inggris, dan hasilnya bisa berbeda jauh tergantung bahasa, kecepatan bicara, dan perangkat keras.

- Model `.en` lebih baik untuk ucapan bahasa Inggris, terutama `tiny.en` dan `base.en`.
- `turbo` adalah versi yang dioptimalkan dari `large-v3`, dengan transkripsi lebih cepat dan penurunan akurasi yang kecil.
- **`turbo` tidak dilatih untuk terjemahan.** Untuk menerjemahkan ucapan non-Inggris ke Inggris, pakai model multibahasa (`tiny`, `base`, `small`, `medium`, `large`). Menurut README, `turbo` tetap mengembalikan bahasa asli walaupun `--task translate` diberikan, dan `medium` atau `large` memberi hasil terjemahan terbaik.
- Akurasi berbeda-beda per bahasa. README memuat grafik WER dan CER per bahasa untuk `large-v3` dan `large-v2`. Angka lengkapnya ada di makalah.

## Cara pakai

Baris perintah:

```bash
whisper audio.flac audio.mp3 audio.wav --model turbo
whisper japanese.wav --language Japanese
whisper japanese.wav --model medium --language Japanese --task translate
whisper --help
```

Python:

```python
import whisper

model = whisper.load_model("turbo")
result = model.transcribe("audio.mp3")
print(result["text"])
```

`transcribe()` membaca seluruh file dan memproses audio dengan jendela geser 30 detik. Untuk kontrol lebih rendah, README juga menunjukkan `whisper.detect_language()` dan `whisper.decode()`.

## Persyaratan

- Python. README menguji dengan Python 3.9.9 dan PyTorch 1.10.1, dan menyatakan kompatibel dengan Python 3.8 sampai 3.11 serta PyTorch versi baru.
- FFmpeg terpasang di sistem.
- Rust, hanya jika tiktoken tidak menyediakan wheel untuk platform kamu. README memberi langkah pemasangannya.

## Catatan

- Kode dan bobot model dirilis di bawah lisensi MIT. Lihat LICENSE di repo untuk rinciannya.

## Lisensi

MIT.
