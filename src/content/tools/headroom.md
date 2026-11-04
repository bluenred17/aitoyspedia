---
title: "Headroom"
summary: "Lapisan kompresi konteks untuk mengurangi token masukan AI agent melalui library, proxy, wrapper agent, dan server MCP."
category: coding
tags: [token, konteks, proxy, mcp, kompresi]
surfaces: [claude-code, api]
source_url: "https://github.com/headroomlabs-ai/headroom/blob/main/README.md"
repo: headroomlabs-ai/headroom
stars: 78826
license: Apache-2.0
added: 2026-11-04
last_verified: 2026-11-04
status: aktif
setup: |
  uv tool install --python 3.13 "headroom-ai[all]"
  headroom wrap claude
---

**Headroom** (`headroom-ai` di PyPI dan npm) mengompresi semua yang dibaca AI agent kamu (output tool, log, potongan RAG, file, dan riwayat percakapan) sebelum sampai ke LLM. Jawaban sama, token masukan lebih sedikit. Hasil pengukuran: 21 sampai 57% lebih sedikit token masukan pada empat skenario agent, lebih dari 90% pada array JSON berulang dan baris log, dan sedikit pada teks prosa. Kompresi berjalan di mesinmu; tidak ada prompt atau isi file yang dikirim ke mana pun untuk dikompresi.

## Mulai dari sini

**Aplikasiku memanggil LLM** (Python, LangChain, LiteLLM, Agno, Strands):

```bash
pip install headroom-ai
```

```python
from headroom import compress

result = compress(messages, model="gpt-4o")  # OpenAI or Anthropic message dicts
client.chat.completions.create(model="gpt-4o", messages=result.messages)
```

Tanpa API key, tanpa unduh model, berjalan di dalam proses. Atur `HEADROOM_OFFLINE=1` untuk eksekusi tanpa jaringan sama sekali. Pesan tool dan asisten dikompresi; pesan pengguna dibiarkan kecuali kamu memberi `compress_user_messages=True`. Contoh [FastAPI](https://docs.headroomlabs.ai/docs/fastapi) dan [referensi API](https://docs.headroomlabs.ai/docs/api-reference). Untuk aplikasi TypeScript: `npm install headroom-ai` ditambah proxy (`pip install "headroom-ai[proxy]"`, `headroom proxy --port 8787`); SDK npm mengirim pesan ke proxy itu. Lihat [quickstart TypeScript](https://docs.headroomlabs.ai/docs/quickstart).

**Aku menjalankan coding agent** (Claude Code, Codex, Cursor, Copilot, OpenCode, Aider):

```bash
uv tool install --python 3.13 "headroom-ai[all]"
headroom wrap claude
```

Tanpa perubahan kode. Lihat [dokumentasi proxy](https://docs.headroomlabs.ai/docs/proxy).

## Fungsinya

- **Library:** `compress(messages)` di Python atau TypeScript, langsung di aplikasi mana pun.
- **Proxy:** `headroom proxy --port 8787`, tanpa perubahan kode, untuk bahasa apa pun.
- **Wrap agent:** `headroom wrap claude|codex|grok|copilot|cursor|aider|opencode|cline|continue|goose|openhands|openclaw|vibe|omp|zcode` dalam satu perintah; batalkan dengan `headroom unwrap <tool>`.
- **Server MCP:** `headroom_compress`, `headroom_retrieve`, `headroom_stats` untuk klien MCP mana pun.
- **Memori lintas agent:** satu penyimpanan bersama untuk Claude, Codex, Gemini, dan Grok, dengan dedup otomatis.
- **`headroom learn`:** menambang sesi yang gagal dan menulis koreksinya ke `CLAUDE.local.md` (default, diabaikan git), `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, atau `GROK.md`.
- **Pengurangan token keluaran:** memangkas apa yang *ditulis balik* model, bukan hanya yang kamu kirim.
- **Bisa dibalik (CCR):** versi asli disimpan di lokal dan diambil bila dibutuhkan.

## Cara kerja

```
 Your agent / app
   (Claude Code, Cursor, Codex, LangChain, Agno, Strands, your own code…)
        │   prompts · tool outputs · logs · RAG results · files
        ▼
    ┌────────────────────────────────────────────────────┐
    │  Headroom   (runs locally — your data stays here)  │
    │  ────────────────────────────────────────────────  │
    │  CacheAligner  →  ContentRouter  →  CCR            │
    │                    ├─ SmartCrusher   (JSON)        │
    │                    ├─ CodeCompressor (AST)         │
    │                    └─ Kompress-v2-base (text, HF)  │
    │                                                    │
    │  Cross-agent memory  ·  headroom learn  ·  MCP     │
    └────────────────────────────────────────────────────┘
        │   compressed prompt  +  retrieval tool
        ▼
 LLM provider  (Anthropic · OpenAI · Bedrock · …)
```

- **ContentRouter** mendeteksi jenis konten dan memilih kompresor untuknya.
- **SmartCrusher / CodeCompressor / Kompress-v2-base** masing-masing menangani JSON, kode sumber, dan prosa.
- **CacheAligner** menandai konten yang mudah berubah dan bisa merusak prefiks KV-cache penyedia. Ia tidak pernah menulis ulang prompt.
- **CCR** menyimpan versi asli secara lokal sehingga model bisa memanggil `headroom_retrieve` saat butuh teks lengkap.

Selengkapnya: [arsitektur](https://docs.headroomlabs.ai/docs/architecture), [CCR](https://docs.headroomlabs.ai/docs/ccr), dan [kartu model Kompress-v2-base](https://huggingface.co/chopratejas/kompress-v2-base).

## Mulai (60 detik)

```bash
# 1 — Install
uv tool install --python 3.13 "headroom-ai[all]"  # CLI in a self-contained env
pip install "headroom-ai[all]"                    # Python — ships the `headroom` CLI
npm install headroom-ai                           # TypeScript SDK only — no CLI

# 2 — Pick a mode
headroom deploy                         # turnkey local deployment + agent config
headroom wrap claude                    # wrap a coding agent
headroom proxy --port 8787              # drop-in proxy, zero code changes
# or: from headroom import compress     # inline library

# 3 — Check it and watch the savings
headroom doctor                         # health check — confirms routing works
headroom perf
headroom dashboard                      # live savings (proxy must be running)
```

### Mengurangi token masukan di aplikasimu sendiri

```python
from headroom import compress
from openai import OpenAI

messages = [{"role": "user", "content": "Analyze these results"}]
result = compress(messages, model="gpt-4o")

client = OpenAI()
response = client.chat.completions.create(model="gpt-4o", messages=result.messages)
print(f"Saved {result.tokens_saved} tokens ({result.compression_ratio:.0%})")
```

Jalankan sesi agent yang di-wrap setiap kali, agar setup-nya berjalan. `headroom wrap` menjalankan proxy lokal, memasang **[Serena](https://github.com/oraios/serena)** untuk navigasi kode semantik, dan meluncurkan agent yang sudah dikonfigurasi untuk lewat Headroom. Untuk Claude Code, Serena didaftarkan hanya untuk proyek yang di-wrap (sebagai server MCP berscope `local` di `~/.claude.json`). Pakai `--code-memory-scope user` agar tersedia di semua proyek, atau `--code-memory none` untuk melewatinya. `headroom unwrap` menghapus kedua pendaftaran itu.

`headroom wrap ...` terikat sesi: proxy-nya berhenti bersama agent yang di-wrap. Untuk proxy yang bertahan setelah reboot, pakai perintah turnkey `headroom deploy`. Pakai `headroom install apply` bila kamu perlu memilih layanan persisten, tugas terjadwal, runtime Docker, scope, atau target penyedia tertentu; lihat [panduan instalasi persisten](https://docs.headroomlabs.ai/docs/persistent-installs).

CLI `headroom` hanya ada di paket PyPI. Paket npm `headroom-ai` adalah SDK TypeScript, yaitu library yang kamu impor (`import { compress } from 'headroom-ai'`), dan tidak menyediakan perintah `headroom`.

## Kompatibilitas agent

`headroom wrap` mendukung Claude Code (opsi `--memory`, `--code-graph`, `--1m`, `--tool-search`), Codex (berbagi memori dengan Claude), Grok CLI, Aider, Copilot CLI, VS Code Copilot, OpenClaw, OpenCode, Cline, Continue, Goose, OpenHands, Mistral Vibe, Oh My Pi, Kimi CLI, dan ZCode. Cursor memakai setup manual: Headroom menjalankan proxy lalu mencetak base URL untuk dimasukkan ke pengaturan Cursor. Cortex Code hanya lewat mode library (hemat sekitar 60 sampai 65%).

Untuk Claude Code di VS Code, ekstensi resmi membaca pengaturan pengguna yang sama dengan CLI:

```bash
pip install "headroom-ai[proxy]"
headroom wrap vscode-claude
# Optional: persist Claude Code's client-owned 1M model selector
headroom wrap vscode-claude --1m
```

Muat ulang jendela VS Code pada eksekusi pertama dan biarkan terminal wrapper tetap berjalan selama kamu memakai panel Claude Code. Autentikasi Anthropic dan model pilihanmu dipertahankan. `Ctrl+C` menghentikan proxy; `headroom unwrap vscode-claude` memulihkan pengaturan yang ada sebelum setup. Dengan `--1m`, Headroom menulis selector model `[1m]` ke pengaturan pengguna tingkat atas Claude Code dan memulihkan model sebelumnya saat `unwrap`. Dukungan model 1M dan kelayakan akun dimiliki Claude Code dan Anthropic; tes lokal membuktikan pengaturan tersimpan dan pemulihannya, bukan sesi VS Code yang berhak secara live. [Panduan lengkap](https://docs.headroomlabs.ai/docs/vscode-claude-code).

## Kapan dipakai dan kapan dilewati

**Pakai library** (`compress()`) saat kodemu sendiri yang menyusun prompt: API yang meneruskan hasil tool, log, hasil pencarian, baris database, atau riwayat obrolan panjang ke model. Ia berupa fungsi atas daftar pesan, berjalan di dalam proses tanpa key dan tanpa jaringan, dan bisa dipakai di mana pun Python berjalan, termasuk sandbox dan fungsi serverless.

**Pakai proxy atau `headroom wrap`** saat kamu ingin penghematan pada coding agent atau klien yang tidak kamu kendalikan, tanpa perubahan kode, atau saat kamu ingin satu memori bersama di beberapa agent. Keduanya sama-sama bisa dibalik: versi asli tetap bisa diambil lewat CCR selama TTL yang dikonfigurasi.

**Lewati** untuk prompt percakapan pendek dan prosa: hampir tidak ada yang bisa dikompresi, dan blok di bawah batas `min_input_words` Kompress dikembalikan identik byte demi byte. Jika kompaksi bawaan penyedia sudah mencakup lalu lintasmu dan kamu tidak butuh kemampuan dibalik atau memori lintas agent, kamu mungkin tidak butuh Headroom. [Batasan](https://docs.headroomlabs.ai/docs/limitations) memuat daftar lengkapnya.

## Telemetri

Beacon anonim **menyala secara default**. Ia melaporkan bagaimana kompresi berperilaku: rasio, penghitung, ID penyedia dan model, serta OS dan arsitektur. Ia tidak pernah mengirim prompt, completion, kode, atau path file. Tujuannya agar tim Headroom bisa melihat kapan sebuah rilis menurunkan rasio kompresi pada beban kerja nyata, bukan hanya korpus tes mereka sendiri.

Matikan dengan `HEADROOM_BEACON=off`, `HEADROOM_TELEMETRY=off`, konvensi `DO_NOT_TRACK=1`, atau `HEADROOM_OFFLINE=1`. Daftar lengkap field ada di [dokumentasi proxy](https://docs.headroomlabs.ai/docs/proxy).

## headroom learn

`headroom learn` menambang sesi yang gagal dan menulis koreksinya ke `CLAUDE.local.md` (default, diabaikan git; pakai `--target CLAUDE.md` untuk file tim bersama), `AGENTS.md`, atau `GEMINI.md`. Lihat [failure learning](https://docs.headroomlabs.ai/docs/failure-learning).

## Headroom untuk tim

Headroom OSS adalah framework yang dibuat untuk menunjukkan apa yang mungkin di laptop satu developer, jadi penghematannya lebih kecil dari yang bisa dicapai. Headroom Enterprise (berbayar) menambahkan penghematan biaya lebih besar, pengamanan token, penyebaran on-premise, atribusi mendalam, dan fitur lain. Semua isi repo ini tetap open source di bawah Apache 2.0. Informasi: [headroomlabs.ai](https://headroomlabs.ai).

## Dibandingkan dengan

Headroom berjalan lokal, mencakup setiap jenis konten, bekerja dengan semua framework besar, dan bisa dibalik. Alternatif seperti Compresr dan Token Co. mengirim teks ke API mereka (tidak lokal, tidak bisa dibalik), dan kompaksi bawaan OpenAI hanya untuk riwayat percakapan (tidak lokal, tidak bisa dibalik). Pendamping yang direkomendasikan adalah **[Serena](https://github.com/oraios/serena)** untuk navigasi kode semantik, yang dipasang secara default saat kamu me-wrap agent.

## Dokumentasi

[Quickstart](https://docs.headroomlabs.ai/docs/quickstart) · [Proxy](https://docs.headroomlabs.ai/docs/proxy) · [Tool MCP](https://docs.headroomlabs.ai/docs/mcp) · [Memori](https://docs.headroomlabs.ai/docs/memory) · [Konfigurasi](https://docs.headroomlabs.ai/docs/configuration) · [Instalasi persisten](https://docs.headroomlabs.ai/docs/persistent-installs) · [Arsitektur](https://docs.headroomlabs.ai/docs/architecture) · [Benchmark](https://docs.headroomlabs.ai/docs/benchmarks) · [Batasan](https://docs.headroomlabs.ai/docs/limitations)

## Lisensi

Apache 2.0. Lihat [LICENSE](https://github.com/headroomlabs-ai/headroom/blob/main/LICENSE).

> Catatan: terjemahan ini meringkas bagian bukti pengukuran, pengurangan token keluaran, tabel kompatibilitas agent, rincian instalasi per platform, dan isi internal pipeline. Lihat README asli untuk daftar lengkapnya.
