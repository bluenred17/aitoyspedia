---
title: "FreeLLMAPI"
summary: "Gateway AI self-hosted yang menyatukan free tier berbagai penyedia LLM di satu endpoint kompatibel OpenAI."
category: coding
tags: [gateway, llm, router, openai-compatible, self-hosted]
surfaces: [claude-code, api]
source_url: "https://github.com/tashfeenahmed/freellmapi/blob/main/README.md"
repo: tashfeenahmed/freellmapi
stars: 47377
license: MIT
added: 2026-11-04
last_verified: 2026-11-04
status: aktif
setup: |
  curl -fsSL https://freellmapi.co/install.sh | bash
---

> **Peringatan dari README (Disclaimer):** proyek ini untuk eksperimen dan belajar pribadi, **bukan produksi**. Free tier ada agar developer bisa membuat prototipe; ia bukan landasan inferensi yang stabil dan tidak boleh diperlakukan seperti itu. Jika kamu membangun sesuatu yang nyata di atas FreeLLMAPI, ganti ke API berbayar sebelum rilis. Hubunganmu dengan tiap penyedia upstream diatur oleh ketentuan yang kamu setujui saat membuat akun; ketentuan itu tetap berlaku ketika lalu lintas diproksikan lewat proyek ini, dan kamu bertanggung jawab mematuhinya. Tinjauan ToS tiap penyedia (Mei 2026) ada di [dokumentasi arsitektur](https://github.com/tashfeenahmed/freellmapi/blob/main/docs/en/architecture/00-high-level-index.md#terms-of-service-review).

**7,4 miliar token per bulan. 34 penyedia LLM gratis. 635 endpoint model gratis. Satu endpoint kompatibel OpenAI.**

Gabungkan free tier dari puluhan penyedia, ditambah endpoint chat, embedding, gambar, dan audio kompatibel OpenAI buatanmu sendiri, di balik satu API `/v1`. Key disimpan terenkripsi. Router memilih model terbaik yang tersedia untuk setiap permintaan dan berpindah ke model berikutnya saat yang sebelumnya habis atau gagal. Situs resmi: [freellmapi.co](https://freellmapi.co/) (katalog lengkap: 474 keluarga model, 635 endpoint gratis).

![Dashboard FreeLLMAPI: halaman Models dengan anggaran token bulanan](https://raw.githubusercontent.com/tashfeenahmed/freellmapi/main/repo-assets/github-hero.png)

## Mengapa ada

Setiap lab AI serius kini menawarkan free tier: beberapa juta token per bulan, beberapa ribu permintaan per hari. Sendiri-sendiri, tiap tier hanyalah mainan. Ditumpuk, jumlahnya sekitar **7,4 miliar token per bulan** kapasitas inferensi yang bisa dipakai, di 474 keluarga model.

Masalahnya, menumpuknya secara manual itu menyakitkan: tiga puluh empat SDK berbeda, tiga puluh empat batas laju berbeda, tiga puluh empat tempat sebuah permintaan bisa gagal. FreeLLMAPI menyatukannya menjadi satu endpoint kompatibel OpenAI. Arahkan library klien OpenAI mana pun ke instance lokalmu.

Dan lanskap free tier berubah tiap minggu: penyedia meluncurkan model, menghentikannya, dan mengubah kuota tanpa pemberitahuan. FreeLLMAPI melacak semua itu untukmu. Router mengambil katalog model bertanda tangan dari [freellmapi.co](https://freellmapi.co) secara otomatis.

## Penyedia yang didukung

Antara lain Google, Groq, Cerebras, OpenCode, Mistral, OpenRouter, Cloudflare, Cohere, Z.ai (Zhipu), NVIDIA, HuggingFace, dan ModelScope, ditambah 22 penyedia gratis lain. Ada juga penyedia **custom**: arahkan model chat, embedding, gambar, atau audio ke endpoint kompatibel OpenAI mana pun (llama.cpp, LM Studio, vLLM, Ollama lokal, atau gateway jarak jauh) dari halaman Keys. Daftar lengkap yang selalu terbaru, dengan batas laju per model, jendela konteks, dan anggaran token gratis, ada di [freellmapi.co/models](https://freellmapi.co/models.html).

## CLI dan coding agent yang kompatibel

Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, Roo Code, OpenCode, Aider, ditambah Continue, Goose, Qwen Code, Kilo Code, Crush, Zed, JetBrains AI, DeepSeek Harness, OpenClaw, Hermes Agent, Pi, ZCode, dan klien kompatibel OpenAI, Anthropic, atau Gemini mana pun.

Kebanyakan agent mengonfigurasi dirinya dengan satu perintah yang membaca katalog live-mu, mencadangkan konfigurasi yang ada, dan menggabungkannya:

```bash
npx freellmapi setup-claude --url http://localhost:3001 --api-key <unified-key>
```

[Semua agent yang didukung beserta perintah setup-nya](https://github.com/tashfeenahmed/freellmapi/blob/main/docs/en/clients/02-supported-agents.md).

## Fitur

- **Semua permukaan gaya OpenAI:** `/v1/chat/completions`, `/v1/responses` (yang dibutuhkan Codex CLI), `/v1/completions`, `/v1/images/generations`, `/v1/videos/generations`, `/v1/audio/speech`, `/v1/audio/transcriptions`, `/v1/embeddings`, dan `/v1/models`, streaming maupun tidak. [Referensi API](https://github.com/tashfeenahmed/freellmapi/blob/main/docs/en/api/01-rest-api.md)
- **Anthropic Messages API:** `/v1/messages` berbicara dengan format kawat Anthropic di router yang sama, sehingga **Claude Code** dan SDK Anthropic resmi berjalan di atas pool gratismu.
- **Permukaan Gemini dan Ollama native:** Gemini CLI bisa memakai `/v1beta`, dan emulasi Ollama opsional melayani Zed, JetBrains, dan klien model lokal lain.
- **Fusion (sintesis multi-model):** minta model virtual `fusion` dan router menyebarkan promptmu ke panel model gratis yang beragam secara paralel, lalu model juri mensintesis satu jawaban dari draf-draf itu.
- **Generasi gambar, video, dan suara** lewat penyedia yang melayani model media.
- **Tool calling dan keluaran terstruktur** lintas penyedia.
- **Routing cerdas, enam strategi:** skor kecepatan, kemampuan, dan keandalan per model mengurutkan rantaimu; fallover otomatis mencoba model berikutnya pada 429/5xx dengan cooldown dan rotasi key.
- **Pelacakan laju per key:** penghitung RPM/RPD/TPM/TPD per `(platform, model, key)` yang mempelajari batas yang dilaporkan penyedia, sehingga routing selalu di bawah setiap batas.
- **Katalog model yang memperbarui diri:** router menyinkronkan katalog bertanda tangan dari freellmapi.co dua kali sehari (model baru, perubahan kuota, dan perbaikan keanehan penyedia). Instalasi gratis mengikuti snapshot bulanan: sebuah model baru masuk 30 hari setelah masuk feed live. Setiap unduhan diverifikasi terhadap kunci Ed25519 yang dipatok sebelum diterapkan.
- **Sesi lengket dan serah terima konteks:** percakapan bertahan di satu model selama 30 menit.
- **Kompresi prompt (opt-in)**, **cache respons (opt-in)**, cadangan DB terenkripsi, pemeriksaan kesehatan key berkala, impor dan ekspor key massal.
- **Key terenkripsi, satu token keluar:** key penyedia dienkripsi AES-256-GCM di SQLite dan didekripsi di memori per permintaan; aplikasimu hanya melihat satu bearer token `freellmapi-…`.
- **Dashboard admin dan analitik:** UI React untuk mengelola key, mengurutkan rantai, playground, dan analitik p50/p95/TTFT.
- **Server MCP:** ChatGPT dan klien MCP lain bisa memanggil inferensi FreeLLMAPI lewat `/mcp`.
- **Berjalan di mana pun Node 20+ berjalan:** Windows, macOS, server Linux, atau SBC ARM kecil (termasuk Raspberry Pi).

Cakupannya sengaja sempit; lihat [yang belum didukung](https://github.com/tashfeenahmed/freellmapi/blob/main/docs/en/architecture/00-high-level-index.md#not-yet-supported).

## Mulai cepat

**Satu baris** (butuh Docker; menyiapkan `~/freellmapi`, membuat kunci enkripsi, menarik image, dan menjalankan container):

> **Catatan dari situs ini, bukan dari README:** perintah ini mengunduh skrip dari domain `freellmapi.co` (domain resmi proyek menurut README-nya) lalu langsung menjalankannya. Seperti yang disarankan README sendiri, baca skripnya dulu sebelum menjalankannya.

```bash
curl -fsSL https://freellmapi.co/install.sh | bash
```

Lebih suka membaca sebelum memasukkannya ke bash? [Skripnya ada di sini](https://freellmapi.co/install.sh). Menjalankannya ulang aman: `.env` (dan kunci enkripsimu) dipertahankan dan container diperbarui ke `:latest`.

Buka http://localhost:3001, tambahkan key penyedia di halaman **Keys**, atur urutan **Fallback Chain** sesukamu, dan ambil API key terpadumu dari header halaman **Keys**. Key terpadu itulah yang kamu arahkan ke SDK OpenAI-mu.

Di Windows, jalur termudah adalah **installer `.exe` desktop dari [Releases](https://github.com/tashfeenahmed/freellmapi/releases/latest)**. Di Android, lihat [panduan Termux](https://github.com/tashfeenahmed/freellmapi/blob/main/docs/en/install/02-android-termux.md) yang masih eksperimental. Semua cara lain (Docker Compose, pengembangan lokal, konfigurasi startup deklaratif, build produksi, akses LAN, dan cadangan) ada di [panduan instalasi](https://github.com/tashfeenahmed/freellmapi/blob/main/docs/en/install/01-install.md).

### Aplikasi desktop

Aplikasi menu-bar native tersedia di [`desktop/`](https://github.com/tashfeenahmed/freellmapi/blob/main/desktop): seluruh router dan dashboard berjalan lokal dari tray, dengan popover kaca yang menampilkan statistik permintaan live. Unduh `.dmg` macOS dan installer `.exe` Windows dari [Releases](https://github.com/tashfeenahmed/freellmapi/releases/latest). Tidak ada akun atau password yang perlu disiapkan; satu-satunya kredensial yang dibutuhkan adalah key API terpadu dari popover tray. Untuk macOS 12 Monterey atau lebih baru, pilih **arm64 (Apple Silicon)** atau **x64 (Intel)**.

## Bekerja dengan klien kompatibel OpenAI

Apa pun yang bisa menargetkan base URL kompatibel OpenAI akan bekerja: atur ke `http://localhost:3001/v1` dengan key terpadu dari dashboard. Setiap generator mendukung `--dry-run`; `npx freellmapi launch` (Claude Code) dan `launch-codex` (Codex) menjaga kredensial sepenuhnya di luar file konfigurasi. Router juga berfungsi sebagai server MCP yang bisa diintrospeksi agent-mu di tengah sesi.

Key penyedia juga bisa dikelola dari terminal dengan token sesi dashboard (`FREELLMAPI_DASHBOARD_TOKEN` atau `--token`): `npx freellmapi keys add|list|remove|test <platform>`.

FreeLLMAPI bersifat local-first dan single-user secara desain. Key penyedia tetap di database SQLite-mu, terenkripsi saat disimpan, dan permintaan berjalan dari mesinmu ke penyedia upstream yang kamu aktifkan.

## Memakai API

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:3001/v1",
    api_key="freellmapi-your-unified-key",
)

resp = client.chat.completions.create(
    model="auto",  # let the router pick; or "auto:fast", "auto:smart", a profile, or a model id
    messages=[{"role": "user", "content": "Summarise the fall of Rome in one sentence."}],
)
print(resp.choices[0].message.content)
print("Routed via:", resp.headers.get("x-routed-via"))
```

Streaming, strategi routing `auto:*`, tool calling, input visi, grounding Google Search Gemini, embedding, dan permukaan Anthropic Messages (dengan contoh curl dan Python untuk masing-masing) ada di [dokumentasi REST API](https://github.com/tashfeenahmed/freellmapi/blob/main/docs/en/api/01-rest-api.md). Setiap respons membawa header `X-Routed-Via: <platform>/<model>` sehingga kamu bisa melihat penyedia mana yang benar-benar melayaninya.

## Premium (katalog live)

Router menjaga katalog modelnya tetap segar sendiri: ia menarik katalog bertanda tangan dari freellmapi.co dua kali sehari dan menerapkan model baru, perubahan kuota, dan perbaikan keanehan penyedia ke DB lokalmu. Pilihan enable/disable dan penyedia kustommu tidak pernah disentuh. Instalasi gratis menarik katalog bertanda tangan yang sama dari snapshot bulanan; Premium membuat feed live itu tersedia di hari yang sama.

- Harga $19 per tahun atau $49 sekali bayar (seumur hidup). Checkout Stripe; berhenti kapan saja.
- Satu key `fla_` mencakup setiap router yang kamu jalankan.
- Router itu sendiri tetap berlisensi MIT dan sepenuhnya gratis. Premium hanya feed live-nya.
- Server katalog tidak pernah melihat prompt, completion, atau key penyediamu; router tetap sepenuhnya self-hosted.

## Cara kerja

Satu permintaan masuk, model gratis terbaik keluar: router memilih model berprioritas tertinggi dengan key sehat yang masih di bawah semua batas lajunya, mendekripsi key di memori, dan memanggil penyedia. Pada 429/5xx ia mendinginkan key itu dan mencoba model berikutnya di rantaimu. Penjelasan komponen dan internal routing ada di [dokumentasi arsitektur](https://github.com/tashfeenahmed/freellmapi/blob/main/docs/en/architecture/00-high-level-index.md).

## FAQ

**Apakah saya butuh password?** Tidak untuk aplikasi desktop: dashboard masuk sendiri dengan akun lokal tersembunyi. Instalasi server (Docker, satu baris, `npm run dev`) memang punya akun email dan password.

**Saya lupa password di instalasi server.** Klik **Forgot password?** di halaman login. Tidak ada email untuk mengirim link, jadi kode sekali pakai dicetak di log server; baca dengan `docker compose logs -f freellmapi`, lalu masukkan di form reset. Kode berlaku 15 menit.

**Di mana lognya?** Di log container untuk Docker, di terminal untuk eksekusi dari sumber, dan di `<data dir>/logs/freeapi.log` untuk aplikasi desktop.

**Bagaimana cara menghapus?** Hapus aplikasinya (Trash di macOS, *Settings → Apps* di Windows, `docker compose down -v` untuk Docker), lalu hapus direktori datanya: `%APPDATA%\FreeLLMAPI\`, `~/Library/Application Support/FreeLLMAPI/`, atau `~/.config/FreeLLMAPI/`. Penghapusan aplikasi tidak pernah menyentuh folder itu dengan sendirinya.

## Keterbatasan

Menumpuk free tier punya kompromi nyata: tidak ada model frontier, latensi bervariasi, tanpa SLA, dan kecerdasan efektif endpoint menurun menjelang akhir hari saat model teratas mencapai batas hariannya, lalu direset pada tengah malam UTC. Baca [daftar jujurnya](https://github.com/tashfeenahmed/freellmapi/blob/main/docs/en/architecture/00-high-level-index.md#limitations) sebelum membangun sesuatu yang nyata di atas ini.

## Lisensi

[MIT](https://github.com/tashfeenahmed/freellmapi/blob/main/LICENSE)

> Catatan: terjemahan ini meringkas daftar penyedia dan agent, bagian bahasa, screenshot, perbandingan fitur, bagian kontribusi, dan daftar kontributor. Lihat README asli untuk semuanya.
