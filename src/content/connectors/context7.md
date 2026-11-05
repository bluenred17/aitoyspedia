---
title: "Context7"
summary: "Server MCP dan CLI yang menarik dokumentasi dan contoh kode terbaru yang spesifik versi langsung ke konteks agent coding, sehingga API tidak dikarang dan kode tidak usang."
category: coding
tags: [mcp, dokumentasi, library, cli, skill, upstash]
surfaces: [claude-code]
provider: "Upstash (Context7)"
auth: api-key
install: |
  npx ctx7 setup

  # Target agen tertentu
  npx ctx7 setup --claude
  npx ctx7 setup --cursor
  npx ctx7 setup --opencode

  # Hapus pengaturan yang dihasilkan
  npx ctx7 remove
  npm uninstall -g ctx7    # jika CLI dipasang global dengan npm install -g ctx7

  # Konfigurasi manual: gunakan URL server berikut di klien MCP
  # https://mcp.context7.com/mcp
  # dan kirim API key lewat header:
  # Authorization: Bearer <API_KEY>
source_url: "https://github.com/upstash/context7/blob/master/README.md"
repo: upstash/context7
stars: 64220
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
---

Context7 menarik dokumentasi dan contoh kode terbaru yang spesifik versi langsung dari sumbernya, lalu memberikannya ke agent coding kamu.

## Tanpa Context7

LLM mengandalkan informasi usang atau generik tentang pustaka yang kamu pakai. Hasilnya:

- Contoh kode usang, berdasarkan data pelatihan setahun lalu.
- API halusinasi yang sebenarnya tidak ada.
- Jawaban generik untuk versi paket lama.

## Dengan Context7

Context7 mengambil dokumentasi dan contoh kode terbaru langsung ke konteks agent coding kamu, tanpa pindah tab, tanpa API halusinasi, dan tanpa kode usang. Contoh prompt:

```txt
Create a Next.js proxy that checks for a valid JWT in cookies
and redirects unauthenticated users to `/login`. use context7
```

```txt
Configure a Cloudflare Worker script to cache
JSON API responses for five minutes. use context7
```

```txt
Show me the Supabase auth API for email/password sign-up.
```

Context7 berjalan dalam dua mode:

- **CLI + Skills:** memasang skill yang memandu agent mengambil dokumentasi lewat perintah CLI `ctx7` (tanpa MCP).
- **MCP:** mendaftarkan server MCP Context7 agar agent bisa memanggil tool dokumentasi secara langsung.

## Pemasangan

> **API key disarankan.** Dapatkan API key gratis di [context7.com/dashboard](https://context7.com/dashboard) untuk batas laju yang lebih tinggi.

Atur Context7 untuk agent coding kamu dengan satu perintah. CLI `ctx7` membutuhkan Node.js 22.13 atau lebih baru.

```bash
npx ctx7 setup
```

Perintah ini mengautentikasi lewat OAuth, membuat API key, dan memasang skill yang sesuai. Kamu bisa memilih mode CLI + Skills atau MCP. Pakai `--cursor`, `--claude`, atau `--opencode` untuk menarget agent tertentu.

Untuk menghapus pengaturan yang dihasilkan, jalankan `npx ctx7 remove`. Jika kamu memasang CLI secara global dengan `npm install -g ctx7`, hapus paket itu terpisah dengan `npm uninstall -g ctx7`.

Untuk konfigurasi manual, gunakan URL server Context7 `https://mcp.context7.com/mcp` di klien MCP kamu, dan kirim API key lewat header `Authorization: Bearer <API_KEY>`. Petunjuk untuk tiap klien ada di [panduan instalasi manual](https://context7.com/docs/resources/all-clients).

## Tips penting

### Pakai ID pustaka

Jika kamu sudah tahu pustaka mana yang ingin dipakai, tambahkan ID Context7-nya ke prompt. Context7 lalu melewati langkah pencocokan pustaka dan langsung mengambil dokumentasi.

```txt
Implement basic authentication with Supabase. use library /supabase/supabase for API and docs.
```

Sintaks garis miring memberi tahu Context7 persis pustaka mana yang harus dimuat.

### Tentukan versi

Untuk dokumentasi versi tertentu, sebutkan versinya di prompt:

```txt
How do I set up a Next.js 16 proxy? use context7
```

Context7 akan mencocokkan versi yang sesuai secara otomatis.

### Tambahkan aturan

Jika kamu memasang lewat `ctx7 setup`, skill yang memicu Context7 untuk pertanyaan seputar pustaka sudah dikonfigurasi otomatis. Untuk mengatur aturan secara manual, tambahkan ke agent coding kamu:

- **Cursor:** `Cursor Settings > Rules`
- **Claude Code:** `CLAUDE.md`
- Atau yang setara di agent coding lain

Contoh aturan:

```txt
Always use Context7 when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.
```

## Tool yang tersedia

### Perintah CLI

- `ctx7 library <name> <query>`: mencari indeks Context7 berdasarkan nama pustaka dan mengembalikan pustaka yang cocok beserta ID-nya.
- `ctx7 docs <libraryId> <query>`: mengambil dokumentasi pustaka dengan ID yang kompatibel dengan Context7 (misalnya `/mongodb/docs`, `/vercel/next.js`).

### Tool MCP

- `resolve-library-id`: mengubah nama pustaka umum menjadi ID yang kompatibel dengan Context7.
  - `query` (wajib): pertanyaan atau tugas pengguna, dipakai untuk mengurutkan hasil menurut relevansi.
  - `libraryName` (wajib): nama pustaka yang dicari.
- `query-docs`: mengambil dokumentasi pustaka dengan ID yang kompatibel dengan Context7.
  - `libraryId` (wajib): ID Context7 yang tepat (misalnya `/mongodb/docs`, `/vercel/next.js`).
  - `query` (wajib): pertanyaan atau tugas yang membutuhkan dokumentasi relevan.
  - `language` (opsional): bahasa pemrograman yang kamu pakai, untuk mengurutkan contoh kode dalam bahasa itu lebih dulu.

## Dokumentasi lain

- [Referensi CLI](https://context7.com/docs/clients/cli)
- [Klien MCP](https://context7.com/docs/resources/all-clients): instalasi manual untuk lebih dari 30 klien
- [Menambah pustaka](https://context7.com/docs/adding-libraries)
- [Pemecahan masalah](https://context7.com/docs/resources/troubleshooting)
- [Referensi API](https://context7.com/docs/api-guide)
- [Panduan pengembang](https://context7.com/docs/resources/developer): menjalankan Context7 MCP secara lokal

## Paket

- [`@upstash/context7-mcp`](https://www.npmjs.com/package/@upstash/context7-mcp): server MCP
- [`ctx7`](https://www.npmjs.com/package/ctx7): CLI
- [`@upstash/context7-sdk`](https://www.npmjs.com/package/@upstash/context7-sdk): SDK TypeScript
- [`@upstash/context7-tools-ai-sdk`](https://www.npmjs.com/package/@upstash/context7-tools-ai-sdk): tool untuk Vercel AI SDK
- [`@upstash/context7-pi`](https://www.npmjs.com/package/@upstash/context7-pi): ekstensi pi.dev

## Penafian

1. Proyek di Context7 dikontribusikan komunitas. Penyedia berusaha menjaga kualitas, tetapi tidak bisa menjamin akurasi, kelengkapan, atau keamanan semua dokumentasi pustaka. Proyek yang terdaftar dikembangkan dan dikelola pemiliknya masing-masing, bukan oleh Context7. Jika kamu menemukan konten mencurigakan, tidak pantas, atau berpotensi berbahaya, gunakan tombol "Report" di halaman proyek. Dengan memakai Context7, kamu mengakui bahwa kamu melakukannya atas kebijakan dan risiko sendiri.
2. Repo ini menyimpan kode sumber server MCP. Komponen pendukungnya, yaitu backend API, mesin parsing, dan mesin crawling, bersifat privat dan bukan bagian repo ini.

## Lisensi

MIT.
