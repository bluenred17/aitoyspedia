---
title: "Claude-Mem"
summary: "Sistem memori persisten yang menangkap, meringkas, dan mengambil konteks lintas sesi coding agent."
category: productivity
tags: [memori, konteks, hook, mcp]
surfaces: [claude-code, desktop]
source_url: "https://github.com/thedotmack/claude-mem/blob/main/README.md"
repo: thedotmack/claude-mem
stars: 112520
license: Apache-2.0
added: 2026-11-04
last_verified: 2026-11-04
status: aktif
install: |
  npx claude-mem install
includes: [lifecycle hooks, worker service, mem-search skill, "MCP tools: search, timeline, get_observations"]
---

Sistem kompresi memori persisten yang dibangun untuk [Claude Code](https://claude.com/claude-code).

Claude-Mem menjaga konteks tetap utuh antar sesi dengan menangkap observasi pemakaian tool secara otomatis, membuat ringkasan semantik, lalu menyediakannya bagi sesi berikutnya. Dengan begitu Claude tetap punya kesinambungan pengetahuan tentang proyek, bahkan setelah sesi berakhir atau tersambung ulang.

## Mulai cepat

Pasang dengan satu perintah:

```bash
npx claude-mem install
```

Installer menyiapkan semuanya lebih dulu, lalu meminta kamu masuk ke claude-mem lewat browser (magic link email, tanpa kartu). Masuk akan membuatkan memory key untuk akunmu dan membuka **claude-mem observer** dengan **uji coba gratis 30 hari**: memori berjalan di luar paketmu, sehingga kamu mendapat sampai 100% lebih banyak pemakaian dari paketmu. Setelah uji coba berakhir, memori otomatis kembali memakai paket Anthropic-mu kecuali kamu berlangganan. Setelah masuk, kamu memilih penyedia memori: claude-mem observer, kunci OpenRouter atau Gemini milikmu sendiri, atau paket Anthropic-mu.

Ingin melewati proses masuk? Berikan flag `--provider` secara eksplisit, atur `CLAUDE_MEM_ONLINE_OPTIN=false`, atau jalankan di CI/shell non-interaktif: installer selesai tanpa interaksi akun apa pun.

Atau pasang dari marketplace plugin di dalam Claude Code:

```bash
/plugin marketplace add thedotmack/claude-mem

/plugin install claude-mem
```

Mulai ulang Claude Code. Konteks dari sesi sebelumnya akan muncul otomatis di sesi baru.

> **Catatan:** Claude-Mem juga dipublikasikan di npm, tetapi `npm install -g claude-mem` hanya memasang **SDK/library**. Perintah itu tidak mendaftarkan hook plugin dan tidak menyiapkan worker service. Selalu pasang lewat `npx claude-mem install` atau perintah `/plugin` di atas.

#### Harness lain

Installer yang sama juga mendukung harness lain lewat flag `--ide`:

```bash
npx claude-mem install --ide opencode      # OpenCode 1.3.4+ (termasuk OpenCode 2), lalu mulai ulang OpenCode
npx claude-mem install --ide t3code        # T3 Code (provider Codex dan Claude Code)
npx claude-mem install --ide antigravity   # Antigravity CLI
npx claude-mem install --ide omp           # OMP (Oh My Pi)
npx claude-mem install --ide pi            # ekstensi Pi native
npx claude-mem install --ide dsh --dsh-profile tui   # plugin DeepSeek Harness
npx claude-mem install --ide grok-bot      # Grok Bot
```

Pi dan DeepSeek Harness memakai runtime worker. Lihat [panduan setup harness native](https://github.com/thedotmack/claude-mem/blob/main/docs/native-harness-integrations.md) untuk capture, recall, dan pemecahan masalah, serta [panduan integrasi T3 Code](https://docs.claude-mem.ai/t3code-integration) dan [panduan setup Antigravity CLI](https://docs.claude-mem.ai/antigravity-cli/setup).

#### OpenClaw Gateway

Pasang claude-mem sebagai plugin memori persisten di gateway [OpenClaw](https://openclaw.ai) dengan satu perintah:

> **Catatan dari situs ini, bukan dari README:** perintah ini mengunduh skrip dari domain `install.cmem.ai` lalu langsung menjalankannya. Pastikan kamu memercayai domain itu sebelum memakainya.

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Installer menangani dependensi, setup plugin, konfigurasi penyedia AI, menjalankan worker, dan feed observasi real-time opsional ke Telegram, Discord, Slack, dan lainnya. Lihat [panduan integrasi OpenClaw](https://docs.claude-mem.ai/openclaw-integration).

## Fitur utama

- **Memori persisten:** konteks bertahan lintas sesi.
- **Progressive disclosure:** pengambilan memori berlapis dengan kejelasan biaya token.
- **Pencarian cerdas (default):** tanyai riwayat proyekmu dengan skill mem-search tiga langkah.
- **Local My Work:** permintaan live, progres, serah terima ke manusia, dan antrean review tersimpan, di URL worker yang dicetak saat startup. [Panduan](https://docs.claude-mem.ai/usage/my-work). Memori, sesi, dan pengaturan tetap di `/viewer`.
- **TeamBrain:** ruang kerja bersama opsional di samping My Work, dengan daftar kerja tim yang nyata, atribusi anggota, dan temuan yang saling terhubung. Tiap orang memilih apa yang dibagikan; permintaan pribadi dan catatan review tetap terpisah. [Menyiapkan tim](https://cmem.ai/teambrain/start).
- **Skill Claude Desktop:** cari memori dari percakapan Claude Desktop.
- **Kontrol privasi:** pakai tag `<private>` untuk mengecualikan konten sensitif dari penyimpanan.
- **Screenshot (opt-in, mati secara default):** menyimpan salinan hasil konversi screenshot tool di `~/.claude-mem/media-v1/`, mengunggahnya ke cmem.ai hanya saat Cloud Sync aktif, dan mengirimnya ke model observer hanya saat inferensi gambar diaktifkan secara terpisah ([detail](https://docs.claude-mem.ai/configuration#screenshots-and-images-opt-in)).
- **Konfigurasi konteks:** kontrol halus atas konteks apa yang disuntikkan.
- **Berjalan otomatis:** tanpa intervensi manual.
- **Sitasi:** merujuk observasi lama dengan ID lewat worker API atau melihat semuanya di web viewer.

## Dokumentasi

[Dokumentasi lengkap](https://docs.claude-mem.ai/) ada di situs resmi, antara lain:

- [Panduan instalasi](https://docs.claude-mem.ai/installation) dan [panduan pemakaian](https://docs.claude-mem.ai/usage/getting-started)
- [Search tools](https://docs.claude-mem.ai/usage/search-tools): kueri riwayat proyek dengan bahasa alami
- [Cloud Sync](https://docs.claude-mem.ai/cloud-sync): cadangkan memorimu ke cmem.ai; tanpa daemon, worker menyinkronkan saat menulis
- [Context engineering](https://docs.claude-mem.ai/context-engineering) dan [progressive disclosure](https://docs.claude-mem.ai/progressive-disclosure)
- Arsitektur: [ringkasan](https://docs.claude-mem.ai/architecture/overview), [hooks](https://docs.claude-mem.ai/hooks-architecture), [worker service](https://docs.claude-mem.ai/architecture/worker-service), [database](https://docs.claude-mem.ai/architecture/database), dan [arsitektur pencarian](https://docs.claude-mem.ai/architecture/search-architecture)
- [Konfigurasi](https://docs.claude-mem.ai/configuration), [pengembangan](https://docs.claude-mem.ai/development), dan [pemecahan masalah](https://docs.claude-mem.ai/troubleshooting)

## Cara kerja

**Komponen inti:**

1. **Lifecycle hooks:** SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, Stop, SessionEnd. Masing-masing adalah satu perintah tanpa shell, `claude-mem hook claude-code <event>`, yang dijalankan oleh launcher kecil yang dipasang installer ke PATH.
2. **Smart Install:** pemeriksa dependensi yang di-cache (hook Setup pada `claude --init` / `--maintenance`, ditambah `npx claude-mem install` / `repair`).
3. **Worker service:** HTTP API lokal dengan UI web viewer dan endpoint pencarian, dikelola Bun.
4. **Database SQLite:** menyimpan sesi, observasi, dan ringkasan.
5. **Skill mem-search:** kueri bahasa alami dengan progressive disclosure.
6. **Database vektor Chroma:** pencarian hibrida semantik dan kata kunci untuk pengambilan konteks yang cerdas.

Lihat [ringkasan arsitektur](https://docs.claude-mem.ai/architecture/overview) untuk detailnya.

## Tool pencarian MCP

Claude-Mem menyediakan pencarian memori yang cerdas lewat **tool MCP** dengan **pola alur 3 lapis** yang hemat token:

1. **`search`**: ambil indeks ringkas berisi ID (sekitar 50 sampai 100 token per hasil)
2. **`timeline`**: ambil konteks kronologis di sekitar hasil yang menarik
3. **`get_observations`**: ambil detail lengkap HANYA untuk ID yang sudah disaring (sekitar 500 sampai 1.000 token per hasil)

**Cara kerjanya:**

- Claude memakai tool MCP untuk mencari memorimu.
- Mulai dengan `search` untuk mendapat indeks hasil.
- Pakai `timeline` untuk melihat apa yang terjadi di sekitar observasi tertentu.
- Pakai `get_observations` untuk mengambil detail lengkap ID yang relevan (selalu kelompokkan beberapa ID sekaligus).
- **Hemat token sekitar 10x** karena menyaring sebelum mengambil detail.

`search` mendukung kueri teks lengkap dengan filter menurut tipe, tanggal, dan proyek.

**Contoh pemakaian:**

```typescript
// Step 1: Search for index
search(query="authentication bug", type="bugfix", limit=10)

// Step 2: Review index, identify relevant IDs (e.g., #123, #456)

// Step 3: Fetch full details
get_observations(ids=[123, 456])
```

Lihat [panduan Search Tools](https://docs.claude-mem.ai/usage/search-tools) untuk contoh lebih rinci.

## Persyaratan sistem

- **Node.js:** 20.0.0 atau lebih baru
- **Claude Code:** versi terbaru dengan dukungan plugin
- **Bun:** runtime JavaScript dan pengelola proses (dipasang otomatis jika belum ada)
- **uv:** pengelola paket Python untuk pencarian vektor (dipasang otomatis jika belum ada)
- **SQLite 3:** untuk penyimpanan persisten (sudah disertakan)

### Catatan setup Windows

Jika kamu melihat error seperti:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Pastikan Node.js dan npm sudah terpasang dan ada di PATH. Unduh installer Node.js terbaru dari https://nodejs.org dan mulai ulang terminal setelah instalasi.

Hook Claude Code tidak butuh Git Bash. Tiap hook menjalankan `claude-mem` secara langsung, dan `npx claude-mem install` menaruh launcher itu di `%LOCALAPPDATA%\claude-mem\bin\claude-mem.exe` lalu menambahkan foldernya ke Path pengguna. Mulai ulang terminal atau IDE setelahnya agar Claude Code mengenali Path baru. Jika hook melaporkan `Executable not found in $PATH: "claude-mem"`, jalankan `npx claude-mem doctor` dan lihat [pemecahan masalah](https://docs.claude-mem.ai/troubleshooting#claude-mem-command-not-found-in-hooks).

## Konfigurasi

Pengaturan dikelola di `~/.claude-mem/settings.json` (dibuat otomatis dengan nilai default pada eksekusi pertama). Atur model AI, port worker, direktori data, level log, dan pengaturan penyuntikan konteks.

Untuk menyertakan observasi dari setiap harness dalam konteks SessionStart Claude Code dan Codex, atur `"CLAUDE_MEM_SESSION_START_INCLUDE_ALL_SOURCES": "true"` di file itu, atau aktifkan **Include all sources at session start** di pengaturan viewer. Defaultnya `"false"`, yang membatasi konteks awal pada harness saat ini. Batas jumlah observasi tetap berlaku pada seluruh sumber yang dipilih.

Lihat **[panduan konfigurasi](https://docs.claude-mem.ai/configuration)** untuk semua pengaturan dan contohnya.

### Mode dan bahasa

Claude-Mem mendukung beberapa mode alur kerja dan bahasa lewat pengaturan `CLAUDE_MEM_MODE`. Opsi ini mengatur perilaku alur kerja (misalnya code, chill, investigation) sekaligus bahasa yang dipakai pada observasi yang dihasilkan.

Edit file pengaturanmu di `~/.claude-mem/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Mode didefinisikan di `plugin/modes/`. Untuk melihat semua mode yang tersedia secara lokal:

```bash
ls ~/.claude/plugins/marketplaces/thedotmack/plugin/modes/
```

| Mode | Deskripsi |
|------------|-------------------------|
| `code` | Mode default berbahasa Inggris |
| `code--chill` | Mencatat lebih sedikit observasi, hanya yang akan merepotkan jika harus ditemukan lagi |
| `code--[lang]` | Sama seperti `code`, dengan observasi dan ringkasan ditulis dalam bahasa lain |

Kode bahasa bawaan: `ar`, `bn`, `cs`, `da`, `de`, `el`, `es`, `fi`, `fr`, `he`, `hi`, `hu`, `id`, `it`, `ja`, `ko`, `nl`, `no`, `pl`, `pt-br`, `ro`, `ru`, `sv`, `th`, `tr`, `uk`, `ur`, `vi`, `zh`. Misalnya, `code--ko` menulis memori dalam bahasa Korea. Lihat [Modes](https://docs.claude-mem.ai/modes) untuk nama tiap bahasa, mode investigasi email, dan mode kustom.

> Catatan: semua mode ini sudah bawaan. Tidak perlu instalasi atau pembaruan plugin tambahan.

Setelah mengganti mode, mulai ulang Claude Code agar konfigurasi mode baru berlaku.

## Pemecahan masalah

Jika mengalami masalah, jelaskan masalahnya kepada Claude dan skill troubleshoot akan mendiagnosis serta memberi perbaikan secara otomatis. Lihat [panduan pemecahan masalah](https://docs.claude-mem.ai/troubleshooting) untuk masalah umum dan solusinya.

## Laporan bug

Buat laporan bug lengkap dengan generator otomatis:

```bash
cd ~/.claude/plugins/marketplaces/thedotmack
npm run bug-report
```

## Pengembangan

Lihat [panduan pengembangan](https://docs.claude-mem.ai/development) untuk instruksi build, pengujian, dan alur kontribusi.

## Lisensi

Claude-Mem berlisensi Apache License 2.0. Lisensi ini dipilih karena memori agentik yang tahan lama harus mudah disematkan di tool developer, agent lokal, server MCP, sistem enterprise, stack robotika, dan harness agent produksi.

Lihat berkas [LICENSE](https://github.com/thedotmack/claude-mem/blob/main/LICENSE) untuk detail lengkap, serta [docs/license.md](https://github.com/thedotmack/claude-mem/blob/main/docs/license.md) dan [docs/ip-boundary.md](https://github.com/thedotmack/claude-mem/blob/main/docs/ip-boundary.md) untuk cakupan lisensi dan batas antara bagian terbuka dan komersial.
