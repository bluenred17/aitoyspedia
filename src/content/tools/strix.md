---
title: "Strix"
summary: "Alat pentest AI open-source: agen otonom yang menjalankan kode dan aplikasi kamu, mencari kerentanan, lalu memvalidasinya dengan bukti konsep (PoC)."
category: keamanan
tags: [pentest, keamanan, sast, dast, owasp, bug-bounty, docker, agent]
surfaces: [claude-code]
setup: |
  # Pasang CLI Strix (perintah ini dari README; periksa skripnya dulu bila perlu)
  curl -sSL https://strix.ai/install | bash

  # Atur penyedia LLM (ganti <API_KEY> dengan kunci milikmu sendiri)
  export STRIX_LLM="vercel_ai_gateway/zai/glm-5.3"
  export LLM_API_KEY="<API_KEY>"

  # Pindai folder kode lokal
  strix --target ./app-directory

  # Pasang sebagai skill untuk agent (Claude Code, Cursor, Codex)
  npx skills add usestrix/strix
source_url: "https://github.com/usestrix/strix/blob/main/README.md"
repo: usestrix/strix
stars: 73829
license: Apache-2.0
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
---

> **Hanya untuk pengujian yang sah.** Strix benar-benar menyerang target yang kamu tunjuk. Jalankan hanya pada sistem yang kamu miliki, atau yang sudah memberimu izin tertulis dan jelas, dan tetap dalam ruang lingkup yang disepakati. Pengujian tanpa izin ilegal di sebagian besar yurisdiksi. README menyatakan bahwa kamu sendiri bertanggung jawab atas izin dan kepatuhan hukum, dan Strix disediakan apa adanya tanpa jaminan.

Strix adalah agen pentest AI otonom. Agen menjalankan kode atau aplikasi kamu secara dinamis, mencari kerentanan, dan memvalidasinya lewat bukti konsep (PoC), bukan hanya laporan pola seperti pemindai statis. Hasilnya berupa temuan dengan panduan perbaikan, serta laporan dan patch yang bisa dibuat otomatis.

## Yang bisa dilakukan

- **Pengujian keamanan aplikasi:** reconnaissance, eksploitasi, dan validasi, dengan tim agen yang bekerja paralel dan saling berbagi temuan.
- **Pemindaian kode dan aplikasi:** SAST dan DAST, untuk folder lokal, repo GitHub, atau URL aplikasi yang berjalan.
- **Pengujian API:** dari file OpenAPI atau Swagger, export Postman, atau koleksi Postman langsung.
- **Pengujian terautentikasi:** dengan instruksi tambahan untuk login atau skenario khusus.
- **Mode headless dan CI/CD:** `strix -n` untuk server atau pipeline. Proses keluar dengan kode non-nol bila ada kerentanan. README juga memberi contoh workflow GitHub Actions untuk pull request.
- **Viewer lokal:** `strix view` membuka dashboard temuan dan riwayat run di `127.0.0.1`. Tautan yang dicetak memuat token akses, jadi jangan dibagikan sembarangan.
- **Skill untuk agent:** `npx skills add usestrix/strix` memasang sembilan skill untuk pentest, perbaikan temuan, dan pemindaian CI.

Ada juga layanan terkelola, Strix Cloud dan Enterprise, yang tidak dibahas di sini. Layanan itu dijual terpisah dan README menjelaskan fiturnya di bagian masing-masing.

## Persyaratan

- Docker yang sedang berjalan. Run pertama otomatis menarik image Docker sandbox.
- Kunci API dari penyedia LLM yang didukung, misalnya OpenAI, Anthropic, Google, atau lewat gateway. Model lokal lewat `LLM_API_BASE` juga didukung.
- Hasil run disimpan di `strix_runs/<nama-run>`.

Konfigurasi disimpan otomatis di `~/.strix/cli-config.json`. Kunci API tidak perlu ditulis ulang setiap kali, tetapi tetap jaga file itu.

## Catatan keamanan

- **Pemasangan lewat `curl | bash`.** Ini satu-satunya perintah pasang CLI di README. Pasang dari sumber resmi hanya jika kamu sudah memeriksa skripnya. Pemasangan lewat skill (`npx skills add`) tidak memerlukan skrip ini.
- **Server MCP.** Strix bisa terhubung ke server MCP yang kamu tentukan di `~/.strix/mcp-servers.json`. Token di contoh README bersifat placeholder. Jangan menulis token asli di file yang ikut ter-commit.
- **Dampak pengujian.** Agen mengirim traffic dan mencoba eksploitasi ke target. Pastikan target dan jendela waktunya sudah disepakati tertulis.

## Contoh

```bash
# Pindai folder kode lokal
strix --target ./app-directory

# Pindai aplikasi yang sudah berjalan (hanya dengan izin tertulis)
strix --target https://your-app.com

# Mode headless untuk CI
strix -n --target https://your-app.com
```

## Lisensi

Apache-2.0.
