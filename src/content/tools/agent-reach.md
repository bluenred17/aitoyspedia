---
title: "Agent Reach"
summary: "CLI yang memberi agent coding akses baca ke platform yang sulit dijangkau, seperti X, Reddit, YouTube, Bilibili, dan Xiaohongshu, dengan satu antarmuka perintah."
category: productivity
tags: [web, pencarian, scraping, youtube, bilibili, reddit, cli, skill]
surfaces: [claude-code]
setup: |
  # Catatan: README tidak memuat perintah pasang. Dua perintah ini diambil dari docs/install.md di repo yang sama.
  uv tool install https://github.com/Panniantong/Agent-Reach/releases/latest/download/agent-reach.zip
  agent-reach setup

  # Jika `uv` belum terpasang (docs/install.md memasangnya dengan skrip jarak jauh).
  # Perhatian: pola curl | sh dan irm | iex menjalankan skrip dari internet. Periksa skripnya dulu bila perlu.
  curl -LsSf https://astral.sh/uv/install.sh | sh                                           # macOS / Linux
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"       # Windows

  # Perbarui
  agent-reach update
source_url: "https://github.com/Panniantong/Agent-Reach/blob/main/README.md"
repo: Panniantong/Agent-Reach
stars: 109239
license: MIT
added: 2026-11-06
last_verified: 2026-11-06
status: aktif
---

> **Peringatan.** Paket bernama `agent-reach` di PyPI **bukan** proyek ini. Jangan memasangnya dari PyPI. README menyatakan hanya alamat GitHub di panduan instalasi yang boleh dipakai.

Agent Reach membuat agent kamu benar-benar terhubung ke internet, termasuk platform dan kemampuan yang tidak bisa dijangkau agent sendiri. Claude Code, Codex, Hermes Agent, OpenClaw, dan CLI agent sejenis sudah punya pencarian dan pembacaan web bawaan, tetapi sebagian besar hal berikut sulit dijangkau:

- **Fitur yang butuh login:** mencari catatan di Xiaohongshu, melihat aktivitas akun di X, membaca detail lowongan kerja.
- **Isi dalam video:** subtitle Bilibili dan YouTube, serta transkripsi suara dari video YouTube dan podcast Xiaoyuzhou.
- **Platform berbahasa Mandarin:** Bilibili, Xiaohongshu, V2EX, Xueqiu, yang cakupannya buruk di pencarian umum.
- **Data terstruktur yang bersih:** kuotasi Xueqiu, topik dan balasan V2EX, repositori dan issue GitHub.

Agent Reach memasang dan menguji alat di balik platform-platform itu. Agent cukup memakai satu perintah:

```bash
agent-reach channels                          # channel apa saja dan apa yang bisa dilakukan tiap channel
agent-reach bilibili search "大模型"           # agent-reach <channel> <aksi> [argumen]
agent-reach read https://www.v2ex.com/t/123   # pilih channel otomatis dari tautan
```

## Yang perlu diketahui sebelum memakai

- **Agent apa saja yang bisa memakainya?** Menurut README, semua agent.
- **Apakah menyentuh browser dan akun saya?** Untuk platform yang butuh login, Agent Reach memakai browser khusus miliknya sendiri yang berjalan di latar belakang tanpa jendela. Saat pertama memakai sebuah situs, login situs itu disalin dari Chrome kamu. Browser asli tidak berubah, dan Agent Reach tidak membaca password manager. Yang disalin biasanya akun utama, jadi disarankan memakai akun cadangan. Lihat [konfigurasi sesi](https://github.com/Panniantong/Agent-Reach/blob/main/agent_reach/skill/references/sessions.md).

## Platform yang didukung

| Channel | Tingkat | Fungsi | Kebutuhan |
|---|---|---|---|
| bilibili | Default | Pencarian, info video, populer, subtitle | Tidak ada; subtitle butuh login (scan QR) |
| v2ex | Default | Populer, node, topik dan balasan, pengguna | Tidak ada |
| github | Default | Cari repo, baca repo/README, baca issue dan PR (termasuk komentar) | Tidak ada |
| youtube | Default | Info video, pencarian, subtitle, suara ke teks | Tidak ada; transkripsi butuh kunci Groq atau OpenAI |
| web | Default | Pencarian web, pembacaan halaman (cadangan) | Tidak ada |
| xiaohongshu | Opsional | Cari catatan, baca isi, lihat komentar | Login |
| xueqiu | Opsional | Kuotasi real-time, cari saham, posting dan saham populer | Kuotasi tanpa login; posting dan saham populer butuh login |
| boss | Opsional | Cari lowongan dan deskripsinya | Login |
| xiaoyuzhou | Opsional | Transkripsi podcast | Kunci Groq |
| linkedin | Opsional | Cari lowongan, baca detail | Lowongan publik tanpa login; pencarian dalam situs butuh login |
| reddit | Opsional | Cari posting, baca isi, lihat komentar dan subreddit | Login |
| twitter | Eksperimen | Cari tweet, profil, tweet pengguna, baca thread | Login |
| facebook | Eksperimen | Pencarian, profil halaman | Login |
| instagram | Eksperimen | Cari pengguna, profil, posting pengguna | Login |

- **Default:** langsung bisa dipakai setelah pemasangan. Boleh dibuang, dan pembaruan berikutnya tidak menambahkannya lagi.
- **Opsional:** aktifkan dengan mengatakan "tambahkan XX". Perangkat lunak yang dibutuhkan dipasang otomatis.
- **Eksperimen:** berfungsi, tetapi anti-bot platform lebih ketat sehingga bisa berhenti bekerja kapan saja.

## Pemasangan

README memberi satu kalimat untuk dikirim ke agent kamu (isinya mengarahkan agent ke `docs/install.md`):

```
帮我安装 Agent Reach：https://raw.githubusercontent.com/Panniantong/Agent-Reach/main/docs/install.md
```

Artinya: "Bantu saya memasang Agent Reach", diikuti alamat panduan instalasi. README menyatakan kalimat yang sama berlaku untuk pemasangan maupun peningkatan. Agent mengerjakan sisanya dan mungkin bertanya:

- **Izin menjalankan perintah:** jika agent bilang tidak bisa menjalankan perintah, aktifkan "izinkan eksekusi perintah" di pengaturannya.
- **Memasang uv:** uv adalah alat kecil untuk memasang program baris perintah dan tidak butuh password admin. Agent memasangnya lebih dulu jika belum ada, dan memberi tahu kamu.
- **Menambah channel opsional:** setelah selesai, agent menyebut channel mana yang sudah bisa dipakai dan mana yang bisa ditambahkan.

Mengenai login: sebagian platform memakai ulang login yang sudah ada di komputer kamu. Untuk memakai akun tertentu (misalnya akun cadangan), cukup katakan ke agent. Menurut README, agent tidak pernah login untukmu dan tidak meminta password.

**Catatan sumber perintah.** Perintah di bagian `setup` entri ini **tidak ada di README**. Perintah itu diambil dari `docs/install.md` di repo yang sama:

```bash
uv tool install https://github.com/Panniantong/Agent-Reach/releases/latest/download/agent-reach.zip
agent-reach setup
```

Jika `uv` belum ada, `docs/install.md` memasangnya dengan skrip jarak jauh: `curl -LsSf https://astral.sh/uv/install.sh | sh` di macOS/Linux, atau `irm https://astral.sh/uv/install.ps1 | iex` di Windows. **Perhatian:** pola `curl | sh` dan `irm | iex` menjalankan skrip dari internet. Periksa dulu skripnya, atau pasang `uv` dengan cara resmi lain.

## Mengelola setelah terpasang

Semua yang dipasang Agent Reach (alat tiap channel, login, pengaturan) ada di satu folder di komputer kamu, `~/.agent-reach/`. Kamu cukup berbicara biasa ke agent:

| Kamu bilang | Agent melakukan |
|---|---|
| "Lihat status Agent Reach" | Memberi tahu channel mana yang berfungsi dan mana yang rusak |
| "Tambahkan Xiaohongshu" / "Hapus Xiaohongshu" | Mengaktifkan dan memasang kebutuhannya / menonaktifkan dan menghapus login serta alatnya |
| "Login Xiaohongshu kedaluwarsa" / "ganti akun" / "logout" | Membuka jendela login untuk kamu isi sendiri / menghapus login situs itu |
| "Perbarui Agent Reach" | Memperbarui program dan alat tiap channel, lalu memberi tahu langkah lanjutan |
| "Copot Agent Reach" | Mendaftar yang akan dihapus dan menghapus setelah kamu konfirmasi |
| "Buat AI lain juga bisa pakai" | Menaruh petunjuk pemakaian untuk AI itu |

Jika ada masalah, agent menjelaskan platform mana, penyebabnya, dan langkah berikutnya. Lihat [troubleshooting.md](https://github.com/Panniantong/Agent-Reach/blob/main/docs/troubleshooting.md).

## Desain

Setiap aksi di tiap platform punya daftar alat berurutan: alat pertama dicoba dulu, dan jika gagal otomatis pindah ke alat cadangan. Misalnya membaca video Bilibili memakai bili-cli lebih dulu, lalu API publik Bilibili. Membaca halaman web memakai Jina Reader, lalu Exa. Platform berubah dan alat rusak itu hal biasa; mengganti alat hanya mengubah daftar ini, tanpa mengubah cara agent memakainya.

## Keamanan

- **Hanya baca.** Hanya mencari dan membaca. Tidak memposting, mengomentari, menyukai, atau mengirim pesan pribadi.
- **Tidak pernah login untukmu dan tidak meminta password.** Sebagian platform memakai ulang login yang ada di komputer (hanya satu situs itu yang disalin, browser asli tidak berubah). Jendela khusus hanya dibuka bila perlu login ulang, dan kamu sendiri yang mengisinya.
- **Browser khusus hanya terbuka untuk komputer kamu.** Komputer lain tidak bisa menghubunginya.
- **Pakai akun cadangan.** Yang disalin biasanya akun utama, dan platform bisa membatasi akun yang diakses otomatis.
- **Jangan kirim kunci di chat.** Isi lewat terminal sendiri dengan `agent-reach configure groq-key`.

Untuk mencopot, katakan "copot Agent Reach". Agent mendaftar yang akan dihapus dan baru menghapus setelah kamu konfirmasi. Hanya yang dipasang Agent Reach yang dihapus; file dan browser lain tidak disentuh.

## Peringatan penipuan

Agent Reach tidak punya token resmi, koin, produk investasi, acara pembagian biaya, koneksi dompet, ataupun proyek Solana/Pump.fun. Proyek kripto apa pun yang memakai nama, alamat GitHub, atau identitas penulis Agent Reach tidak berkaitan dengan repo ini. Jangan menghubungkan dompet atau membayar biaya apa pun karenanya.

## Catatan

- README utama berbahasa Mandarin. Versi Inggrisnya ada di [docs/README_en.md](https://github.com/Panniantong/Agent-Reach/blob/main/docs/README_en.md).
- README menandai channel X, Facebook, dan Instagram sebagai "eksperimen" karena anti-bot platform ketat, dan menyarankan akun cadangan. Periksa syarat layanan platform sebelum memakainya dengan akun yang kamu pedulikan.

## Lisensi

MIT.
