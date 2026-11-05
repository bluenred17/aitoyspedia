---
title: "yt-dlp"
summary: "Downloader audio dan video berbasis baris perintah dengan dukungan ribuan situs, fork dari youtube-dl, dan bisa dipakai dari agent atau skrip."
category: video
tags: [downloader, video, audio, cli, youtube, metadata, ffmpeg]
surfaces: [claude-code]
setup: |
  # Binary rilis (direkomendasikan untuk Windows: yt-dlp.exe; macOS: yt-dlp_macos; Linux/BSD: yt-dlp)
  # Unduh dari https://github.com/yt-dlp/yt-dlp/releases/latest

  # Lewat pip (versi nightly, sesuai README)
  python -m pip install -U --pre "yt-dlp[default]"

  # Perbarui binary rilis yang sudah terpasang
  yt-dlp -U

  # Pindah ke channel nightly
  yt-dlp --update-to nightly
source_url: "https://github.com/yt-dlp/yt-dlp/blob/master/README.md"
repo: yt-dlp/yt-dlp
stars: 205348
license: Unlicense
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
---

yt-dlp adalah downloader audio dan video berbasis baris perintah dengan dukungan [ribuan situs](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md). Proyek ini adalah fork dari youtube-dl, yang berakar pada youtube-dlc yang sudah tidak aktif. Tool ini sangat populer di kalangan pengguna dan developer, dan bisa dipanggil dari agent AI seperti Claude Code lewat shell.

## Yang bisa dilakukan

- **Unduh video atau audio** dari situs yang didukung, dengan pilihan format dan kualitas yang kompleks lewat `-f`/`-S`.
- **Gabungkan** video dan audio terpisah dengan FFmpeg.
- **Pascaproses:** ekstrak audio, tambahkan metadata, sematkan thumbnail, subtitle, dan chapter, serta hapus segmen sponsor lewat SponsorBlock.
- **Atur nama file** dengan template output, misalnya per uploader, playlist, atau tahun.
- **Ambil metadata saja** dengan `--dump-json` atau `--simulate`, tanpa mengunduh file.
- **Pakai sebagai library Python** lewat `yt_dlp.YoutubeDL`.
- **Perluas dengan plugin** yang dipasang dari folder atau paket.

## Yang perlu diperhatikan

- **Pembaruan cepat.** Situs sering berubah, jadi ekstractor yang lama bisa rusak. README menyarankan memperbarui secara rutin dengan `yt-dlp -U`.
- **FFmpeg dan ffprobe sangat disarankan.** Keduanya dibutuhkan untuk menggabungkan video dan audio, serta untuk banyak pascaproses. Ini binary FFmpeg, bukan paket Python dengan nama yang sama.
- **Dukungan YouTube penuh** membutuhkan `yt-dlp-ejs` dan runtime JavaScript seperti deno, node.js, bun, atau QuickJS. Lihat wiki proyek.
- **Autentikasi memakai cookie browser atau file netrc.** Opsi seperti `--cookies-from-browser` memberi akses ke sesi login kamu. Jangan membagikan file cookie atau nilai kredensial di log atau di repo.
- **Ada pembatasan dari sisi pengguna.** Tool ini tidak menentukan apakah sebuah unduhan diizinkan. Kamu harus memastikan konten yang diunduh sesuai hak cipta dan syarat layanan situs asal.
- **Perubahan channel update dan repo sumber.** `--update-to` bisa berpindah ke repo lain, dan README mengingatkan bahwa tidak ada verifikasi untuk binary dari repo berbeda.
- **Lisensi bergantung pada build.** Kode proyek di bawah Unlicense (domain publik). Namun binary PyInstaller memuat kode GPLv3+, sehingga gabungannya berlisensi GPLv3+. Lihat `THIRD_PARTY_LICENSES.txt` di repo.

## Contoh perintah

```bash
# Unduh video dengan kualitas terbaik sampai 1080p
yt-dlp -S "res:1080" "<URL_VIDEO>"

# Ekstrak audio sebagai mp3
yt-dlp -x --audio-format mp3 "<URL_VIDEO>"

# Ambil metadata tanpa mengunduh
yt-dlp --dump-json "<URL_VIDEO>"
```

Opsi lengkap ada di `yt-dlp --help` dan di README resmi.

## Lisensi

Unlicense untuk kode proyek. Binary PyInstaller tunduk pada GPLv3+ karena menyertakan kode dari proyek lain.
