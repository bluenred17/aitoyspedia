---
title: "Open Generative AI"
summary: "Studio gambar, video, lip sync, dan sinema open source (MIT) yang bisa di-self-host, dengan 400+ model lewat gateway Muapi.ai dan inferensi lokal opsional (sd.cpp dan Wan2GP) di aplikasi desktop."
category: video
tags: [gambar, video, lip-sync, text-to-video, image-to-video, studio, self-hosted, electron, nextjs, muapi]
surfaces: [desktop]
source_url: "https://github.com/Anil-matcha/Open-Generative-AI/blob/main/README.md"
repo: Anil-matcha/Open-Generative-AI
stars: 32301
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
setup: |
  # Prasyarat: Node.js v18+ dan access key Muapi.ai (opsional bila hanya memakai model lokal)
  git clone --recurse-submodules https://github.com/Anil-matcha/Open-Generative-AI.git
  cd Open-Generative-AI

  # Bila sudah clone tanpa --recurse-submodules, jalankan sekali:
  # git submodule update --init --recursive

  # Wajib: memasang dependensi dan membangun paket workspace (studio, workflow, agents).
  # `npm install` saja tidak cukup.
  npm run setup

  # Lalu jalankan SALAH SATU:
  npm run electron:dev   # Aplikasi desktop (Electron + Vite), disarankan
  npm run dev            # Versi web (Next.js) di http://localhost:3000
---

# Open Generative AI

> **Alternatif gratis dan open source untuk platform video AI.** Hasilkan gambar dan video AI memakai 600+ model mutakhir di 14 studio, tanpa ekosistem tertutup dan tanpa biaya langganan.

> **Catatan dari situs ini:** Baca dulu sebelum memasang.
> 1. **Tanpa filter konten.** README menjual proyek ini sebagai "tanpa filter konten, tanpa guardrail". Itu berarti keamanan konten sepenuhnya jadi tanggung jawabmu. Studio Lip Sync, Body Swap (Recast), dan AI Influencer bisa disalahgunakan untuk meniru orang; pakai hanya dengan izin pihak yang digambarkan dan sesuai hukum yang berlaku.
> 2. **Butuh akses ke layanan pihak ketiga.** Model cloud berjalan lewat gateway Muapi.ai dan memakai access key Muapi (layanan berbayar). Prompt dan file yang kamu unggah dikirim ke Muapi, jadi klaim "datamu tetap di mesinmu" hanya berlaku untuk inferensi lokal di aplikasi desktop.
> 3. **Installer desktop tidak ditandatangani.** README sendiri meminta kamu melewati Gatekeeper macOS (`xattr -cr`) dan SmartScreen Windows. Unduh hanya dari halaman [Releases resmi](https://github.com/Anil-matcha/Open-Generative-AI/releases), atau bangun dari sumber.
> 4. Perintah `setup` di atas adalah jalur bangun dari sumber di README. Untuk pemakai biasa, README menyarankan installer desktop (lihat bagian Unduh Aplikasi Desktop di bawah).
> 5. Bagian promosi (White Label/jual ulang, tabel harga pesaing, daftar proyek terkait, tautan Discord dan video) tidak disalin.

Komunitas: [Discord](https://discord.com/invite/zpnuBRXhKg)

## Coba online, tanpa instalasi

**Versi hosted:** [muapi.ai/open-generative-ai](https://muapi.ai/open-generative-ai)

Pakai semua studio (Image, Video, Audio, AI Clipping, Vibe Motion, Lip Sync, Cinema, Marketing, Workflows, Agents, Design Agent, Apps, MCP & CLI) langsung di browser, tanpa Node.js dan tanpa setup. Daftar akun gratis untuk mulai menghasilkan. Versi hosted selalu memuat model terbaru.

Ikuti [pembuatnya](https://x.com/matchaman11) untuk pembaruan.

## Unduh aplikasi desktop

Installer sekali klik, tanpa Node.js atau terminal.

| Platform | Unduhan |
|---|---|
| macOS Apple Silicon (M1/M2/M3/M4) | [Open Generative AI-2.0.0-arm64.dmg](https://github.com/Anil-matcha/Open-Generative-AI/releases/download/v2.0.0/Open.Generative.AI-2.0.0-arm64.dmg) |
| macOS Intel (x64) | [Open Generative AI-2.0.0.dmg](https://github.com/Anil-matcha/Open-Generative-AI/releases/download/v2.0.0/Open.Generative.AI-2.0.0.dmg) |
| Windows (x64) | [Open Generative AI Setup 2.0.0.exe](https://github.com/Anil-matcha/Open-Generative-AI/releases/download/v2.0.0/Open.Generative.AI.Setup.2.0.0.exe) |
| Linux (Ubuntu x64) | [`.AppImage`](https://github.com/Anil-matcha/Open-Generative-AI/releases/download/v2.0.0/Open.Generative.AI-2.0.0.AppImage) / [`.deb`](https://github.com/Anil-matcha/Open-Generative-AI/releases/download/v2.0.0/open-generative-ai_2.0.0_amd64.deb), atau bangun lokal dengan `npm run electron:build:linux`. |

Semua rilis: [github.com/Anil-matcha/Open-Generative-AI/releases](https://github.com/Anil-matcha/Open-Generative-AI/releases)

### Panduan instalasi macOS

Karena aplikasi tidak dinotarisasi oleh Apple, Gatekeeper macOS akan memblokirnya saat pertama dibuka. Ikuti langkah ini:

**Langkah 1**: Mount DMG dan seret aplikasi ke `/Applications`

**Langkah 2**: Buka Terminal dan jalankan:
```bash
xattr -cr "/Applications/Open Generative AI.app"
```

**Langkah 3**: Klik kanan aplikasi di `/Applications` → klik **Open** → klik **Open** lagi pada dialog

> Kamu hanya perlu melakukan ini sekali. Sesudahnya aplikasi terbuka seperti biasa.

**Alternatif (tanpa Terminal):**
1. Coba buka aplikasi; macOS akan memblokirnya
2. Buka **System Settings → Privacy & Security**
3. Gulir ke bawah sampai menemukan _"Open Generative AI was blocked"_
4. Klik **Open Anyway** → **Open**

### Instalasi Windows: mengatasi peringatan SmartScreen

Windows SmartScreen bisa menampilkan peringatan karena installer tidak ditandatangani kode:

1. Klik **More info** pada dialog SmartScreen
2. Klik **Run anyway**

Aplikasi akan terpasang secara senyap ke `%LocalAppData%` dengan pintasan Start Menu.

### Instalasi Ubuntu / Linux

Artefak Linux tersedia saat membangun dengan Electron Builder:

```bash
# Bangun installer Linux (AppImage + .deb)
npm run electron:build:linux
```

File yang dihasilkan ditulis ke folder `release/`:
- **AppImage**: portabel, jalankan langsung setelah dibuat executable:
  ```bash
  chmod +x "release/Open Generative AI-*.AppImage"
  ./release/Open\ Generative\ AI-*.AppImage
  ```
- **.deb**: pasang di Debian/Ubuntu:
  ```bash
  sudo apt install ./release/open-generative-ai_*_amd64.deb
  ```

Jika AppImage gagal dijalankan di sistem lama, pasang `libfuse2`:

```bash
sudo apt install libfuse2
```

#### Ubuntu 24.04+ / pembatasan sandbox AppArmor

Ubuntu 24.04 ke atas mengaktifkan kebijakan keamanan kernel (`apparmor_restrict_unprivileged_userns`) yang memblokir sandbox user-namespace Chromium. Jika aplikasi gagal berjalan secara diam-diam atau langsung crash, kamu punya dua opsi:

**Opsi A, disarankan: pasang `.deb` saja.**
Paket `.deb` membawa profil AppArmor yang memberi izin yang dibutuhkan secara otomatis saat dipasang, tanpa perubahan di seluruh sistem.

**Opsi B, perbaikan sistem sementara (pengguna AppImage):**
```bash
sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0
```
Ini bertahan sampai reboot berikutnya. Untuk membuatnya permanen:
```bash
echo 'kernel.apparmor_restrict_unprivileged_userns=0' | sudo tee /etc/sysctl.d/99-userns.conf
```

---

Open Generative AI adalah studio gambar, video, sinema, dan lip sync yang gratis dan open source, yang membawa alur kerja kreatif untuk semua orang. Ditenagai [Muapi.ai](https://muapi.ai), ia mendukung text-to-image, image-to-image, text-to-video, image-to-video, dan lip sync berbasis audio lewat model seperti Flux, Nano Banana, Midjourney, Kling, Sora, Veo, Seedream, Infinite Talk, LTX Lipsync, Wan 2.2, dan lainnya, semuanya dari antarmuka modern yang bisa kamu self-host dan sesuaikan.

**Mengapa Open Generative AI dan bukan platform video AI lain?**
- **Tanpa filter**: tanpa filter konten, tanpa guardrail, tanpa penolakan prompt (lihat catatan di atas)
- **Gratis & open source**: tanpa langganan, tanpa vendor lock-in
- **Self-hosted**: kendali kreatif penuh
- **200+ model**: text-to-image, image-to-image, text-to-video, image-to-video, lip sync
- **Input multi-gambar**: masukkan hingga 14 gambar referensi ke model yang kompatibel
- **Lip Sync Studio**: animasikan potret atau sinkronkan bibir ke audio apa pun dengan 9 model khusus
- **Dapat diperluas**: tambah model sendiri, ubah UI, bangun di atasnya

## Inferensi model lokal (hanya aplikasi desktop)

Aplikasi desktop mendukung **dua engine lokal yang independen**. Pilih yang cocok dengan mesin yang benar-benar kamu pakai:

| Engine | Apa itu | Terbaik untuk |
|---|---|---|
| **sd.cpp** (bawaan) | Engine C++ dari [stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp), berjalan di mesin yang sama dengan aplikasi. GPU Metal di Apple Silicon, CUDA/Vulkan/ROCm di Linux/Windows. | Model khusus gambar. Berjalan di Mac seri M. |
| **Wan2GP** (pasang sendiri) | [Wan2GP](https://github.com/deepbeepmeep/Wan2GP) yang dipasang pengguna: folder di mesin ini (aplikasi menjalankan `wgp.py` sendiri) atau server MCP-nya di mesin lain. Python + PyTorch di GPU CUDA/ROCm. | Model video (Wan 2.1/2.2, Hunyuan, LTX-2) di **Video Studio** dan model gambar besar (Flux, Qwen-Image). Butuh GPU NVIDIA/AMD di mesin Wan2GP; aplikasi desktopnya sendiri bisa berjalan di Mac. |

Keduanya memakai UI yang sama: buka **Settings → Local Models** untuk mengonfigurasi masing-masing.

### Engine 1: sd.cpp (bawaan)

| Model | Jenis | Ukuran | Catatan |
|---|---|---|---|
| **Z-Image Turbo** ⚡ | Diffusion Transformer | 2,5 GB + 2,7 GB tambahan | Turbo 8 langkah. Berat di memori. |
| **Z-Image Base** ⚡ | Diffusion Transformer | 3,5 GB + 2,7 GB tambahan | 50 langkah, kualitas tinggi. Berat di memori. |
| **Dreamshaper 8** | SD 1.5 | 2,1 GB | Serbaguna 20 langkah. Opsi teringan yang diuji di Mac. |
| **Realistic Vision v5.1** | SD 1.5 | 2,1 GB | Fotorealistis 25 langkah |
| **Anything v5** | SD 1.5 | 2,1 GB | Anime/ilustrasi 20 langkah |
| **SDXL Base 1.0** | SDXL | 6,9 GB | Resolusi tinggi 30 langkah |

> **Model Z-Image** membutuhkan dua file tambahan bersama (diunduh sekali, dipakai bersama kedua model):
> - **Qwen3-4B Text Encoder**: 2,4 GB
> - **FLUX VAE**: 335 MB

**Cara pakai:**
1. Buka **Settings → Local Models** di aplikasi desktop
2. Pasang **engine inferensi sd.cpp** (sekali klik, diunduh otomatis)
3. Unduh model pilihanmu (dan file tambahan untuk Z-Image)
4. Di **Image Studio**, klik tombol **⚡ Local** di sebelah pemilih model
5. Pilih model lokal kamu lalu hasilkan, tanpa API key

Semua unduhan terjadi di dalam aplikasi. Tidak ada yang dipasang di seluruh sistem.

Secara default, `sd.cpp` menyimpan engine, bobot model, dan unduhan sementara di direktori app data Electron. Lokasi umumnya:

- macOS: `~/Library/Application Support/open-generative-ai/local-ai`
- Windows: `%APPDATA%\open-generative-ai\local-ai`
- Linux: `~/.config/open-generative-ai/local-ai`

Untuk menyimpan bobot model multi-GB di drive lain, setel `OPEN_GENERATIVE_AI_LOCAL_AI_DIR` sebelum menjalankan aplikasi desktop. Aplikasi akan membuat `bin/`, `models/`, dan `tmp/` di dalam direktori itu, dan **Settings -> Local Models** menampilkan folder model yang sudah di-resolve. Keluaran engine lokal dan galat unduhan ditulis ke konsol proses aplikasi, jadi jalankan dari Terminal atau PowerShell saat butuh log pemecahan masalah.

### Engine 2: Wan2GP (pemasanganmu sendiri)

Aplikasi **tidak** membundel Python atau bobot model untuk Wan2GP. Pasang Wan2GP sendiri di mesin dengan GPU CUDA atau ROCm:

```bash
git clone https://github.com/deepbeepmeep/Wan2GP
cd Wan2GP
./install.sh                          # atau install.bat di Windows
```

**Mesin yang sama (disarankan).** Di aplikasi desktop buka **Settings → Local Models → Wan2GP**, setel folder Wan2GP (Python default ke `<folder>/venv/bin/python`), klik **Save**, lalu **Check**: ia menjalankan `wgp.py --dry-run` pada tugas uji. Tiap generasi menjalankan CLI headless Wan2GP (`wgp.py --process settings.json`); bobot diunduh otomatis saat model pertama kali dipakai, dan unduhannya tampil di bilah kemajuan.

**Mesin lain.** Jalankan server MCP WanGP di sana dan masukkan URL-nya (misalnya `http://192.168.1.42:7866/mcp`) di panel pengaturan yang sama:

```bash
python wgp.py --mcp --mcp-api-version 1 --mcp-transport streamable-http --mcp-host 0.0.0.0 --mcp-port 7866
```

Pakai `--mcp-host 0.0.0.0` hanya di jaringan tepercaya (lihat `docs/AUTHENTICATION.md` milik Wan2GP untuk OAuth/HTTPS). Port web UI Gradio (7860) **bukan** API dan tidak bisa dipakai di sini.

Lalu alihkan **Video Studio** ke **⚡ Local** dan pilih model. Model yang tidak ada di versi Wan2GP kamu ditampilkan beserta alasannya; model yang bobotnya belum diunduh ditandai.

| Model | `model_type` WanGP | Jenis | Catatan |
|---|---|---|---|
| **Wan 2.1 1.3B** | `t2v_1.3B` | Video | Opsi teringan, 480p, ~8 GB VRAM |
| **Wan 2.2 14B T2V / I2V** | `t2v_2_2` / `i2v_2_2` | Video | 480p, lambat di GPU konsumen; I2V butuh frame awal |
| **Hunyuan Video 1.5** | `hunyuan_1_5_480_t2v` | Video | T2V 480p |
| **LTX-2 Distilled** | `ltx2_22B_distilled` | Video | 8 langkah, 720p |
| **Flux.1 Dev** | `flux` | Gambar | Image Studio |
| **Qwen Image** | `qwen_image_20B` | Gambar | Image Studio |

> **Mengapa opsi remote?** Runtime Wan2GP (Sage attention, flash-attn, kernel AWQ/GGUF) hanya untuk CUDA/ROCm, dan tidak ada jalur MPS / Apple Silicon. Server MCP memungkinkan pengguna yang hanya punya Mac tetap memakai aplikasi desktop sambil memindahkan inferensi ke mesin GPU Linux/Windows, PC gaming di LAN, atau instance RunPod/vast.ai sewaan.

> **Inferensi lokal hanya tersedia di aplikasi desktop.** Versi web hosted selalu memakai API cloud.

### Catatan perangkat keras

- **sd.cpp** berjalan di CPU (semua platform) dan **GPU Metal** di Apple Silicon (M1/M2/M3/M4); CUDA/Vulkan/ROCm di Linux/Windows.
- Akselerasi GPU Metal sudah tertanam di biner macOS desktop dan jauh lebih cepat daripada CPU saja.
- Disarankan untuk sd.cpp Z-Image: RAM 16 GB (7,4 GB bobot + 2,4 GB buffer komputasi). Di Mac seri M dasar 8 GB, **Z-Image diketahui membuat sistem hang**; tetap pakai SD 1.5 di sana.
- Untuk SD 1.5 di M2: harapkan ~1–2 dtk/langkah dengan dylib Metal aktif. Jika kamu melihat ~10 dtk/langkah, biner mungkin jatuh ke CPU; lihat verifikasi di bawah.

### Memverifikasi jalur SD 1.5 (uji kewarasan tercepat di Mac)

Jika ingin memastikan sd.cpp terpasang benar tanpa lewat UI, kamu bisa menjalankan `sd-cli` langsung. Ini biner yang sama dengan yang dipakai aplikasi.

```bash
# 1. Tata letak app data (dibuat saat aplikasi pertama dijalankan)
APP_DATA="${OPEN_GENERATIVE_AI_LOCAL_AI_DIR:-$HOME/Library/Application Support/open-generative-ai/local-ai}"
ls "$APP_DATA/bin"     # sd-cli, libstable-diffusion.dylib
ls "$APP_DATA/models"  # apa pun yang sudah kamu unduh

# 2. Ambil model SD 1.5 kecil langsung (Dreamshaper 8, ~2 GB)
curl -L --fail --progress-bar \
  -o "$APP_DATA/models/DreamShaper_8_pruned.safetensors" \
  "https://huggingface.co/Lykon/DreamShaper/resolve/main/DreamShaper_8_pruned.safetensors"

# 3. Jalankan satu inferensi 512x512 / 12 langkah
DYLD_LIBRARY_PATH="$APP_DATA/bin" "$APP_DATA/bin/sd-cli" \
  -m "$APP_DATA/models/DreamShaper_8_pruned.safetensors" \
  -p "a serene mountain lake at sunrise, oil painting" \
  -o /tmp/sd15-test.png \
  --steps 12 -H 512 -W 512 --cfg-scale 7.5 --seed 42 \
  --sampling-method euler_a
```

Eksekusi yang sehat di Apple Silicon mencetak `total params memory size = 1969.78MB (VRAM 1969.78MB, RAM 0.00MB)` (didukung Metal) dan menghasilkan PNG 512×512 yang koheren. Jika `VRAM` justru `0.00MB`, dylib hanya untuk CPU: periksa dengan `otool -L "$APP_DATA/bin/libstable-diffusion.dylib" | grep -i metal` dan pasang ulang engine dari **Settings → Local Models** jika Metal tidak ada.

---

## Fitur

- **Image Studio**: hasilkan gambar dari prompt teks (50+ model text-to-image) atau ubah gambar yang ada (55+ model image-to-image). Set model berganti otomatis tergantung ada tidaknya gambar referensi. Kontrol kualitas dan resolusi tampil untuk model yang mendukungnya.
- **Local Inference**: dua engine, **sd.cpp** (bawaan, berjalan di Mac/Win/Linux dengan Metal/CUDA/Vulkan/ROCm) untuk SD 1.5, SDXL, dan Z-Image; dan **Wan2GP** (pemasanganmu sendiri, folder lokal atau server MCP remote) untuk Flux, Qwen-Image, dan model video di Video Studio (Wan 2.1/2.2, Hunyuan, LTX-2). Konfigurasi keduanya di Settings → Local Models.
- **Multi-Image Input**: unggah hingga 14 gambar referensi untuk model edit yang kompatibel (Nano Banana 2 Edit, Flux Kontext Dev, GPT-4o Edit, dan lainnya). Pemilih multi-pilih dengan lencana urutan, unggah batch, dan alur konfirmasi "Use Selected".
- **Video Studio**: hasilkan video dari prompt teks (40+ model text-to-video) atau animasikan gambar frame awal (60+ model image-to-video). Pergantian mode cerdas yang sama seperti Image Studio.
- **Audio Studio**: hasilkan dan edit audio/musik AI dari prompt teks.
- **AI Clipping**: klip otomatis dan ekstrak sorotan dari video yang lebih panjang.
- **Vibe Motion Studio**: studio pembuat gerak/animasi untuk efek video bergaya.
- **Lip Sync Studio**: animasikan gambar potret atau sinkronkan bibir pada video yang ada memakai audio. 9 model khusus di dua mode: potret + audio → video bicara, dan video + audio → video lipsync.
- **Body Swap (Recast) Studio**: tukar/recast tubuh atau penampilan subjek di gambar atau video.
- **Cinema Studio**: antarmuka untuk bidikan sinematik fotorealistis dengan kontrol kamera pro (Lensa, Panjang Fokus, Apertur)
- **Marketing Studio**: hasilkan variasi kreatif siap iklan dan pemasaran dari satu input.
- **Workflow Studio**: bangun dan jalankan pipeline AI multilangkah secara visual. Rangkai model gambar, video, dan audio menjadi alur otomatis. Telusuri template komunitas, buat sendiri dengan editor berbasis node, dan jalankan lewat playground interaktif.
- **Agent Studio**: agent kreatif multi-giliran yang merencanakan dan mengeksekusi tugas generasi lewat percakapan.
- **Design Agent Studio**: agent desain otomatis berbasis kanvas untuk kerja visual iteratif.
- **Explore Apps**: direktori template aplikasi dan kasus penggunaan yang dibangun di atas katalog model yang sama.
- **AI Influencer Studio**: alat untuk membuat dan mengelola konten persona/influencer AI yang konsisten.
- **Upload History**: gambar referensi diunggah sekali dan disimpan lokal. Panel pemilih memungkinkan kamu memakai ulang gambar yang pernah diunggah di berbagai sesi.
- **Smart Controls**: pemilih rasio aspek, resolusi/kualitas, dan durasi yang dinamis dan menyesuaikan kemampuan tiap model.
- **Generation History**: telusuri, buka kembali, dan unduh semua hasil sebelumnya (disimpan di penyimpanan browser)
- **Image & Video Download**: unduh hasil dalam resolusi penuh sekali klik
- **API Key Management**: penyimpanan API key di localStorage browser (tidak pernah dikirim ke server mana pun kecuali Muapi)
- **Desain responsif**: berfungsi baik di desktop dan ponsel dengan UI glassmorphism gelap

### Image Studio: dua mode

Image Studio berganti otomatis antara dua set model:

| Mode | Pemicu | Model | Prompt |
| :--- | :--- | :--- | :--- |
| **Text-to-Image** | Default (tanpa gambar) | 50+ model t2i (Flux, Nano Banana 2, Seedream 5.0, Ideogram, GPT-4o, Midjourney…) | Wajib |
| **Image-to-Image** | Gambar referensi diunggah | 55+ model i2i (Kontext, Nano Banana 2 Edit, Seedream 5.0 Edit, Seededit, Upscaler…) | Opsional |

#### Model yang baru ditambahkan

| Model | Jenis | Fitur utama |
| :--- | :--- | :--- |
| **Nano Banana 2** | Text-to-Image | Google Gemini 3.1 Flash Image · Resolusi 1K/2K/4K · Peningkatan Google Search · rasio aspek `auto` |
| **Nano Banana 2 Edit** | Image-to-Image | Hingga **14 gambar referensi** · Resolusi 1K/2K/4K · Peningkatan Google Search |
| **Seedream 5.0** | Text-to-Image | ByteDance · Kualitas basic/high · 8 rasio aspek · hingga 4K |
| **Seedream 5.0 Edit** | Image-to-Image | ByteDance · Transfer gaya bahasa alami · Kualitas basic/high |
| **MiniMax Image 01** | Text-to-Image | MiniMax · 8 rasio aspek · hingga 4 gambar per permintaan · prompt 1500 karakter |

#### Input multi-gambar

Model yang menerima banyak gambar referensi menampilkan pemilih multi-pilih saat aktif:

| Model | Maks. gambar |
| :--- | :--- |
| Nano Banana 2 Edit | 14 |
| Nano Banana Edit | 10 |
| Flux Kontext Dev I2I | 10 |
| Kling O1 Edit Image | 10 |
| GPT-4o Edit / GPT Image 1.5 Edit | 10 |
| Bytedance Seedream Edit v4 / v4.5 | 10 |
| Vidu Q2 Reference to Image | 7 |
| Flux 2 Flex/Pro Edit | 8 |
| Nano Banana Pro Edit | 8 |
| Flux Kontext Pro/Max I2I | 2 |
| Wan 2.5/2.6 Image Edit | 2–3 |
| Qwen Image Edit Plus / 2511 | 3 |
| GPT-4o Image to Image | 5 |
| Flux 2 Klein 4b/9b Edit | 4 |

Saat model multi-gambar dipilih, tombol unggah beralih ke mode multi-pilih:
- **Kotak centang dengan nomor urutan**: gambar dikirim ke model sesuai urutan pilihanmu
- **Unggah batch**: pilih banyak file sekaligus dari dialog file
- **Lencana hitungan** pada tombol menunjukkan berapa gambar yang aktif; lencana `+` muncul bila masih ada slot
- **Tombol "Use Selected"** mengonfirmasi dan menutup pemilih

### Video Studio: dua mode

Video Studio mengikuti pola yang sama:

| Mode | Pemicu | Model | Prompt |
| :--- | :--- | :--- | :--- |
| **Text-to-Video** | Default (tanpa gambar) | 40+ model t2v (Kling, Sora, Veo, Wan, Seedance 2.0, Hailuo, Runway…) | Wajib |
| **Image-to-Video** | Frame awal diunggah | 60+ model i2v (Kling I2V, Veo3 I2V, Runway I2V, Wan I2V, Seedance 2.0 I2V, Midjourney I2V…) | Opsional |

#### Model yang baru ditambahkan

| Model | Jenis | Fitur utama |
| :--- | :--- | :--- |
| **Seedance 2.0** | Text-to-Video | ByteDance · Rasio 16:9 / 9:16 / 4:3 / 3:4 · Durasi 5 / 10 / 15 dtk · Kualitas basic/high |
| **Seedance 2.0 I2V** | Image-to-Video | ByteDance · Animasikan gambar jadi video · Hingga 9 gambar referensi · Rasio 16:9 / 9:16 / 4:3 / 3:4 · Durasi 5 / 10 / 15 dtk · Kualitas basic/high |
| **Seedance 2.0 Extend** | Video Extension | ByteDance · Lanjutkan hasil Seedance 2.0 dengan mulus · Mempertahankan gaya, gerak, dan audio · Prompt lanjutan opsional · Durasi 5 / 10 / 15 dtk · Kualitas basic/high |
| **Grok Imagine T2V** | Text-to-Video | xAI · Durasi 6 / 10 / **15 dtk** · Mode: fun / normal / spicy · Rasio 9:16 / 16:9 / 2:3 / 3:2 / 1:1 |
| **Grok Imagine I2V** | Image-to-Video | xAI · Durasi 6 / 10 / **15 dtk** · Mode: fun / normal / spicy · Gerak sinematik dari gambar diam |
| **MiniMax Hailuo 02 / 2.3 Standard & Pro** | Text-to-Video / Image-to-Video | MiniMax · Video Full HD · Beberapa rasio aspek · termasuk varian cepat |

### Lip Sync Studio

**Lip Sync Studio** menghasilkan video bicara berbasis audio memakai 9 model di dua mode input:

| Mode | Pemicu | Deskripsi |
| :--- | :--- | :--- |
| **Portrait Image** | Default | Unggah gambar potret + file audio → video bicara beranimasi |
| **Video** | Beralih ke mode Video | Unggah video yang ada + file audio → video lipsync |

#### Model berbasis gambar (Potret + Audio → Video)

| Model | Endpoint | Resolusi | Prompt |
| :--- | :--- | :--- | :--- |
| **Infinite Talk** | `infinitetalk-image-to-video` | 480p, 720p | Opsional |
| **Wan 2.2 Speech to Video** | `wan2.2-speech-to-video` | 480p, 720p | Opsional |
| **LTX 2.3 Lipsync** | `ltx-2.3-lipsync` | 480p, 720p, 1080p | Opsional |
| **LTX 2 19B Lipsync** | `ltx-2-19b-lipsync` | 480p, 720p, 1080p | Opsional |

#### Model berbasis video (Video + Audio → Video Lipsync)

| Model | Endpoint | Resolusi | Prompt |
| :--- | :--- | :--- | :--- |
| **Sync Lipsync** | `sync-lipsync` | — | — |
| **LatentSync** | `latentsync-video` | — | — |
| **Creatify Lipsync** | `creatify-lipsync` | — | — |
| **Veed Lipsync** | `veed-lipsync` | — | — |
| **Infinite Talk V2V** | `infinitetalk-video-to-video` | 480p, 720p | Opsional |

**Cara kerjanya:**
1. Pilih mode **Portrait Image** atau **Video** dengan sakelar
2. Unggah gambar potret (atau video) lewat tombol unggah gambar/video
3. Unggah file audio lewat tombol unggah audio
4. Opsional, masukkan prompt untuk memandu gaya gerak
5. Pilih model dan resolusi (bila didukung), lalu klik **Generate**

Riwayat generasi disimpan terpisah di `lipsync_history` dan pekerjaan yang tertunda dilanjutkan otomatis saat halaman dimuat ulang.

### Workflow Studio

**Workflow Studio** memungkinkan kamu membangun dan menjalankan pipeline AI multilangkah tanpa menulis kode.

**Kemampuan utama:**
- **Templates**: mulai dari workflow bawaan (rantai gambar, pipeline video, dan lainnya)
- **My Workflows**: simpan dan kelola pipeline kustom milikmu
- **Community**: telusuri dan jalankan workflow yang diterbitkan pengguna lain
- **Node-based Builder**: editor visual seret-dan-lepas untuk menghubungkan model dan mengarahkan keluaran antar langkah
- **Playground**: jalankan workflow secara interaktif dengan UI formulir; hasil tampil inline
- **API execution**: setiap workflow juga bisa dipanggil lewat API Muapi

> 💡 **Mau menambahkan workflow ke aplikasimu sendiri?** Lihat **[Vibe Workflow](https://github.com/SamurAIGPT/Vibe-Workflow)**, mesin workflow open source yang menggerakkan fitur ini. Masukkan ke proyek apa pun.

### Kontrol Cinema Studio

**Cinema Studio** menawarkan kontrol presisi atas kamera virtual, menerjemahkan pilihanmu menjadi modifier prompt yang dioptimalkan:

| Kategori | Opsi yang tersedia |
| :--- | :--- |
| **Cameras** | Modular 8K Digital, Full-Frame Cine Digital, Grand Format 70mm Film, Studio Digital S35, Classic 16mm Film, Premium Large Format Digital |
| **Lenses** | Creative Tilt, Compact Anamorphic, Extreme Macro, 70s Cinema Prime, Classic Anamorphic, Premium Modern Prime, Warm Cinema Prime, Swirl Bokeh Portrait, Vintage Prime, Halation Diffusion, Clinical Sharp Prime |
| **Focal Lengths** | 8mm (Ultra-Wide), 14mm, 24mm, 35mm (Human Eye), 50mm (Portrait), 85mm (Tight Portrait) |
| **Apertures** | f/1.4 (Shallow DoF), f/4 (Balanced), f/11 (Deep Focus) |

### Upload History & Picker

Setiap gambar yang kamu unggah disimpan lokal (URL + thumbnail) sehingga kamu tidak perlu mengunggah file yang sama dua kali:

- Klik tombol unggah untuk membuka **pemilih gambar referensi**
- Gambar yang pernah diunggah tampil dalam grid 3 kolom dengan thumbnail
- **Model satu gambar**: klik thumbnail untuk langsung memilih dan menutup
- **Model multi-gambar**: alihkan beberapa thumbnail (bernomor urutan), lalu klik **Use Selected**
- Unggah gambar baru dengan tombol **Upload files** (mendukung multi-file di mode multi-gambar)
- Hapus gambar dari riwayat dengan tombol ✕
- Riwayat bertahan lintas sesi browser (disimpan di `localStorage`)

## Mulai cepat

### Prasyarat

- [Node.js](https://nodejs.org/) (v18+)
- [Access key Muapi.ai](https://muapi.ai/access-keys). Salin nilai key yang dihasilkan ke aplikasi; jangan memasukkan nama atau label key.

### Setup

> **Kebanyakan pengguna butuh aplikasi desktop, bukan jalur dev ini.** Jika kamu hanya ingin menjalankan Open Generative AI di mesinmu, [unduh installer siap pakai](#unduh-aplikasi-desktop) saja, tanpa Node.js. Instruksi di bawah untuk kontributor yang membangun dari sumber.

Pilih titik masuk yang sesuai tujuanmu:

- **Aplikasi desktop (Electron)** → `npm run electron:dev`
- **Versi web hosted (Next.js)** → `npm run dev`

```bash
# Clone repositori (dengan submodule: wajib untuk paket workflow + agent)
git clone --recurse-submodules https://github.com/Anil-matcha/Open-Generative-AI.git
cd Open-Generative-AI

# Jika sudah clone tanpa --recurse-submodules, jalankan sekali:
# git submodule update --init --recursive

# Pasang dependensi + bangun paket workspace (studio, workflow, agents).
# Langkah ini WAJIB: `npm install` saja tidak cukup; workspace perlu
# dibangun sebelum salah satu skrip dev bisa jalan.
npm run setup

# Lalu jalankan SALAH SATU:
npm run electron:dev   # Aplikasi desktop (Electron + Vite): disarankan
npm run dev            # Versi web hosted (Next.js) → http://localhost:3000
```

Kamu akan diminta memasukkan API key Muapi saat pertama dipakai (lewati kuncinya jika hanya berencana memakai model lokal).

> **Pemecahan masalah, `Couldn't find a 'pages' directory`**: artinya Next.js tidak bisa melihat folder `app/`. Pastikan kamu menjalankan `npm run dev` dari root repositori (direktori yang berisi `app/`, `package.json`, dan `next.config.mjs`), dan kamu meng-clone dengan submodule. Jalankan ulang `npm run setup` jika `packages/Vibe-Workflow` atau `packages/agents` kosong.

### Build produksi

```bash
npm run build
npm run start
```

### Build aplikasi desktop

Bangun aplikasi desktop native dengan Electron:

```bash
# macOS (DMG: Intel + Apple Silicon)
npm run electron:build

# Windows (installer NSIS: x64 + ARM64)
npm run electron:build:win

# Linux (AppImage + DEB: x64)
npm run electron:build:linux

# Semua platform sekaligus
npm run electron:build:all
```

Installer dikeluarkan ke folder `release/`. Biner siap pakai juga tersedia di [halaman Releases](https://github.com/Anil-matcha/Open-Generative-AI/releases).

## Arsitektur

Aplikasi ini adalah **monorepo Next.js** dengan pustaka komponen bersama `packages/studio`.

```
Open-Generative-AI/
├── app/                        # Next.js App Router
│   ├── layout.js               # Root layout (Tailwind, fonts)
│   ├── page.js                 # Redirects → /studio
│   └── studio/
│       └── page.js             # Studio page — renders StandaloneShell
├── components/
│   ├── StandaloneShell.js      # Tab nav + BYOK (API key from localStorage)
│   └── ApiKeyModal.js          # API key entry modal
├── packages/
│   └── studio/                 # Shared React component library
│       └── src/
│           ├── index.js        # Exports: ImageStudio, VideoStudio, AudioStudio, ClippingStudio, VibeMotionStudio, LipSyncStudio, RecastStudio, CinemaStudio, MarketingStudio, WorkflowStudio, AgentStudio, DesignAgentStudio, AppsStudio, AiInfluencerStudio, McpCliStudio
│           ├── models.js       # 400+ model definitions (single source of truth)
│           ├── muapi.js        # API client (named exports, apiKey as first param)
│           └── components/
│               ├── ImageStudio.jsx    # Dual-mode t2i/i2i studio
│               ├── VideoStudio.jsx    # Dual-mode t2v/i2v studio
│               ├── LipSyncStudio.jsx  # Portrait/video + audio → talking video
│               ├── CinemaStudio.jsx   # Pro studio with camera controls
│               └── WorkflowStudio.jsx # Multi-step pipeline builder & playground
├── next.config.mjs             # transpilePackages: ['studio']
├── tailwind.config.js
└── package.json                # workspaces: ["packages/studio"]
```

Pustaka `packages/studio` juga dipakai oleh versi hosted di [muapi.ai](https://muapi.ai); pembaruan model di `packages/studio/src/models.js` berlaku otomatis ke aplikasi self-hosted dan versi hosted.

## Integrasi API

Aplikasi berkomunikasi dengan [Muapi.ai](https://muapi.ai) memakai pola dua langkah:

1. **Submit**: `POST /api/v1/{model-endpoint}` dengan prompt dan parameter
2. **Poll**: `GET /api/v1/predictions/{request_id}/result` sampai status `completed`

Autentikasi memakai header `x-api-key`. Saat pengembangan, proxy Vite menangani CORS dengan mengarahkan permintaan `/api` ke `https://api.muapi.ai`.

Unggahan file memakai `POST /api/v1/upload_file` (multipart/form-data) dan mengembalikan URL hosted yang diteruskan ke model berkondisi gambar. Untuk model multi-gambar, seluruh array `images_list` diteruskan ke API dalam satu permintaan.

Pekerjaan lip sync memakai pola dua langkah yang sama: metode khusus `processLipSync()` menerima `image_url` atau `video_url` bersama `audio_url`, mengirim ke endpoint model, dan polling sampai URL video keluaran tersedia.

## Kategori model yang didukung

| Kategori | Jumlah | Contoh |
|---|---|---|
| **Text-to-Image** | 70+ | Flux Dev, Nano Banana 2, Seedream 5.0, Ideogram v3, Midjourney v7, GPT-4o, SDXL |
| **Image-to-Image** | 70+ | Nano Banana 2 Edit (×14), Flux Kontext Pro, GPT-4o Edit, Seededit v3, Upscaler, Background Remover |
| **Text-to-Video** | 85+ | Kling v3, Sora 2, Veo 3, Wan 2.6, Seedance 2.0, Seedance 2.0 Extend, Seedance Pro, Hailuo 2.3, Runway Gen-3 |
| **Image-to-Video** | 120+ | Kling v2.1 I2V, Veo3 I2V, Runway I2V, Seedance 2.0 I2V, Midjourney v7 I2V, Hunyuan I2V, Wan2.2 I2V |
| **Video-to-Video** | 35+ | Efek video, AI Clipping, Vibe Motion, edit berkondisi video |
| **Lip Sync** | 15 | Infinite Talk I2V, Wan 2.2 Speech to Video, LTX 2.3 Lipsync, LTX 2 19B Lipsync, Sync, LatentSync, Creatify, Veed, Infinite Talk V2V |
| **Body Swap / Recast** | 3 | Recast subjek/penampilan di gambar dan video |
| **Audio** | 15+ | Model text-to-music, remix, dan pengeditan audio |

(Jumlah diverifikasi terhadap `packages/studio/src/models.js`: total 420+ model di 8 kategori ini, ditambah model lain yang muncul lewat studio Marketing, Agent, dan Design Agent.)

## Tech stack

- **Next.js 14**: App Router, server components, dev server cepat
- **React 18**: komponen UI studio
- **Tailwind CSS v3**: styling utility-first
- **npm workspaces**: monorepo dengan pustaka bersama `packages/studio`
- **Muapi.ai**: gateway API model AI

## Apa bedanya dengan platform video AI lain?

**Open Generative AI** adalah alternatif open source yang digerakkan komunitas, dengan kemampuan kreatif serupa tanpa ekosistem tertutup:

| | Penyedia lain | Open Generative AI |
| :--- | :--- | :--- |
| **Biaya** | Berlangganan | Gratis (open source), kecuali biaya pemakaian model cloud lewat Muapi |
| **Filter konten** | Ya, prompt diblokir atau diubah | Tidak ada |
| **Pembatasan** | Guardrail platform diberlakukan | Kebebasan kreatif penuh |
| **Model** | Proprietary | 400+ model terbuka & komersial |
| **Input multi-gambar** | Terbatas | Hingga 14 gambar per permintaan |
| **Lip sync** | Tidak | 9 model, mode gambar & video |
| **Versi hosted** | Berlangganan | Gratis di [muapi.ai/open-generative-ai](https://muapi.ai/open-generative-ai) |
| **Self-hosting** | Tidak | Ya |
| **Dapat dikustomisasi** | Tidak | Sepenuhnya bisa dimodifikasi |
| **Source code** | Tertutup | Berlisensi MIT |

## Lisensi

MIT

## Kredit

Dibangun dengan [Muapi.ai](https://muapi.ai), API terpadu untuk model pembuatan gambar dan video AI.
