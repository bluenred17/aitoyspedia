---
title: "OmniRoute"
summary: "Gateway AI open-source yang merutekan permintaan ke berbagai penyedia melalui satu endpoint, dengan strategi routing, pemantauan kuota, kompresi, dan fallback otomatis."
category: coding
tags: [gateway, routing, llm, mcp, kompresi, fallback]
surfaces: [claude-code, api]
source_url: "https://github.com/cheaper-inference/OmniRoute/blob/main/README.md"
repo: cheaper-inference/OmniRoute
stars: 84451
license: MIT
added: 2026-11-04
last_verified: 2026-11-04
status: aktif
setup: |
  npm install -g omniroute
  omniroute
---

**OmniRoute adalah gateway AI gratis. Jangan pernah berhenti ngoding.** Setiap tool AI diarahkan ke satu endpoint lokal yang mencakup 375 penyedia (lebih dari 150 punya free tier), dengan fallback otomatis, kompresi token, dan kontrol operasional.

> **Bawa akun penyediamu sendiri.** Angka sekitar 1,62 miliar token per bulan adalah estimasi agregat dari free tier pihak ketiga yang masing-masing memenuhi syarat, **bukan hibah token dari OmniRoute**. Daftar, ambil kredensial bila diperlukan, dan hubungkan penyedia yang bisa kamu pakai. OmniRoute mengkatalogkan 467 entri free tier di 34 pool berulang dan menghitung angka headline dari data itu. Menumpuk free tier secara manual itu menyakitkan: puluhan SDK, puluhan batas laju, dan tidak tahu berapa sebenarnya yang kamu punya.

## Instal, hubungkan penyedia, lalu rutekan lewat satu endpoint

Tiga langkah: instal dan jalankan OmniRoute, hubungkan penyedia yang memenuhi syarat dengan akun atau API key milikmu, lalu arahkan tool ke `localhost:20128/v1` dengan API key OmniRoute dan model `auto`. Routing bergantung pada koneksi yang memenuhi syarat dan batas penyedia.

```bash
# After connecting a provider, copy your OmniRoute key from Dashboard → Endpoints:
curl http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer YOUR_OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"Hello!"}]}'
```

`auto` membutuhkan rute yang memenuhi syarat. Instalasi baru bisa tidak punya target tanpa key yang memenuhi syarat, dan penyedia tanpa key bisa menolak klien pihak ketiga. Penyedia yang ditandai `tos: avoid`, termasuk Kiro, dikecualikan dari routing otomatis secara default; menghubungkan akun tidak menimpa pengaturan itu. Baca [Free Tiers Guide](https://github.com/cheaper-inference/OmniRoute/blob/main/docs/getting-started/FREE-TIERS-GUIDE.md) sebelum memilih penyedia. Skrip quickstart siap salin untuk Python, Node.js, PHP, dan cURL ada di [`examples/quickstart/`](https://github.com/cheaper-inference/OmniRoute/blob/main/examples/quickstart/).

## Janjinya

- Satu endpoint dan 375 penyedia. Fallback otomatis tetap merutekan selama ada target sehat lain.
- Hemat token sampai 95% pada beban kerja yang memenuhi syarat.
- Mulai dari $0: lebih dari 150 free tier dan 51 penyedia gratis berulang atau tanpa key.
- 37 integrasi CLI/agent lewat satu konfigurasi.
- Kompatibel dengan API OpenAI, Claude, Gemini, dan Responses di `/v1`.
- Kontrol tingkat produksi: circuit breaker, TLS stealth, MCP 110 tool, A2A, memori, guardrail, dan evaluasi.

## Mengapa OmniRoute?

Berhenti berpindah-pindah antara 10 dashboard, key yang mati, dan tagihan kejutan:

- Kuota langganan yang habis tak terpakai: maksimalkan langganan.
- Terkena batas laju saat ngoding: fallback otomatis 4 tingkat (Langganan, API, Murah, Gratis).
- Output tool yang menghabiskan token: kompresi RTK dan Caveman (15 sampai 95%).
- API yang mahal: routing yang mengoptimalkan biaya.
- Setiap tool punya setup sendiri: satu endpoint, satu dashboard.
- Akses AI diblokir: proxy 3 tingkat dan TLS stealth.
- Key yang mati: ketahanan 3 lapis (circuit breaker, cooldown key, kunci model).
- Tim berbagi satu langganan: pool key dengan kuota adil.
- Prompt lewat cloud orang lain: local-first dengan key terenkripsi AES-256-GCM.
- Tidak ada visibilitas pengeluaran: analitik live (pemakaian, kuota, penghematan, latensi p95).

## Combos: fitur unggulan

**Nol konfigurasi: pakai saja `auto`.** Atau bangun sendiri dengan **20 strategi routing**. Ketahanan sudah bawaan dalam tiga lapis independen: circuit breaker, cooldown key, dan penguncian model.

## CLI dan coding agent yang kompatibel

Satu konfigurasi, `http://localhost:20128/v1`, dan **setiap** IDE atau CLI AI berjalan di atas model gratis dan murah. Claude Code, Codex CLI, Cline, Kilo Code, Zoo Code, Continue, dan lainnya.

**Jalankan CLI apa pun yang didukung lewat OmniRoute dalam satu perintah.** Tidak ada file konfigurasi yang ditulis, kredensial disuntikkan per proses, dan Qwen/Gemini mendapat home terisolasi sekali pakai:

```bash
omniroute run claude   --model openai/gpt-5.4          # Claude Code
omniroute run codex    --model glm/glm-5.2             # OpenAI Codex CLI
omniroute run aider    --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose    --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen     --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Or pick provider+model interactively and write the tool's own config:
omniroute configure codex          # also: claude opencode qwen aider goose gemini cline continue kilo 5dive
```

Setiap perintah menghormati konteks remote yang aktif (`omniroute connect <host>`), `--dry-run` menampilkan env/argumen persisnya tanpa menjalankan, dan `--api-key-env NAME` menjaga rahasia dari riwayat shell. [Integrasi CLI](https://github.com/cheaper-inference/OmniRoute/blob/main/docs/guides/CLI-INTEGRATIONS.md)

## 375 penyedia AI, 153 di antaranya ditandai gratis di katalog

Mencakup setiap lab besar lewat satu endpoint, ditambah penyedia **gratis selamanya** ($0, tanpa kartu). Daftar lengkap ada di README asli dan dashboard.

## Berjalan di mana saja

OmniRoute berjalan sebagai aplikasi Node (CLI global npm), container Docker, dari sumber, atau lewat Bun, Nix, dan paket Arch. Tersedia juga integrasi di dalam Copilot Chat native VS Code dan aplikasi menu-bar OmniRouteTray.

## Privat dan local-first

Gateway dan control plane OmniRoute berjalan di mesinmu. **Prompt tetap dikirim ke penyedia upstream yang dipilih untuk setiap permintaan**; OmniRoute tidak menambah hop pemrosesan prompt yang di-host, dan telemetri mati secara default. Kredensial dienkripsi saat disimpan dengan AES-256-GCM. Kontrol yang tersedia mencakup pembatasan scope API key, filter IP, batas laju, penjaga prompt injection, pembersihan header upstream, redaksi PII (opt-in), error yang disanitasi, dan jejak audit SQLite lokal. OmniRoute berlisensi MIT dan bisa di-host sendiri.

Lihat [Authorization](https://github.com/cheaper-inference/OmniRoute/blob/main/docs/architecture/AUTHZ_GUIDE.md), [Guardrails](https://github.com/cheaper-inference/OmniRoute/blob/main/docs/security/GUARDRAILS.md), dan [Compliance](https://github.com/cheaper-inference/OmniRoute/blob/main/docs/security/COMPLIANCE.md).

## CLI lengkap, A2A, dan MCP

Selain server, OmniRoute adalah **kokpit baris perintah penuh** dengan **lebih dari 80 perintah**, ditambah protokol agent terbuka sehingga agen AI bisa mengendalikannya **sendiri**.

```bash
omniroute               # serve gateway + dashboard (port 20128)
omniroute chat          # interactive TUI chat client (slash: /model /combo /skill /memory)
omniroute setup         # guided first-run wizard
omniroute doctor        # diagnose providers, ports, native deps
```

**Mode remote:** jalankan CLI di sini, OmniRoute di VPS. Masuk sekali dengan token akses ber-scope; setiap perintah lalu menargetkan server remote.

```bash
omniroute connect 192.168.0.15            # password → scoped token, saved as a context
omniroute models                         # ← runs against the REMOTE server
omniroute configure codex                 # ← picks a remote model, writes a local Codex profile
omniroute tokens create --name ci --scope read   # mint narrower tokens for other machines
omniroute contexts use default            # ← switch back to the local server
```

Token punya scope `read` / `write` / `admin`; rute yang menjalankan proses hanya bisa diakses lewat loopback. [Remote Mode](https://github.com/cheaper-inference/OmniRoute/blob/main/docs/guides/REMOTE-MODE.md)

### Hubungkan agent, dan ia mengendalikan OmniRoute sendiri

> **Perhatian keamanan:** README menyatakan bahwa dengan membuka OmniRoute lewat MCP, A2A, REST API, webhook, atau CLI remote, agent yang mampu (atau kodemu sendiri) mendapat **kunci ke seluruh gateway**: routing, penyedia, combo, cache, kompresi, dan memori, secara otonom. Pemberlakuan scope MCP bersifat opt-in. Beri hanya ke agent yang kamu percaya.

| Antarmuka | Endpoint / perintah | Dipakai untuk |
| --- | --- | --- |
| MCP (stdio) | `omniroute --mcp` | Dicolokkan ke Claude Desktop, Cursor, atau klien MCP mana pun |
| MCP (HTTP) | `/api/mcp/stream` | MCP remote, **110 tool**, 33 scope (pemberlakuan opt-in), jejak audit penuh |
| MCP (SSE) | `/api/mcp/sse` | Transport MCP streaming |
| A2A | `/.well-known/agent.json` | Agent-ke-agent, **JSON-RPC 2.0** + SSE, 6 skill |
| REST API | `/v1/*` | Kompatibel OpenAI: chat, embedding, gambar, audio, OCR |
| Webhook | `/api/webhooks` | Mengirim event permintaan dan kuota ke Slack, Discord, Telegram, atau URL mana pun |
| CLI remote | `omniroute connect <host>` | Mengendalikan instance remote dengan token akses ber-scope |

```bash
# Give Claude Code the full OmniRoute toolset over MCP:
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

[Server MCP](https://github.com/cheaper-inference/OmniRoute/blob/main/docs/frameworks/MCP-SERVER.md) · [Server A2A](https://github.com/cheaper-inference/OmniRoute/blob/main/docs/frameworks/A2A-SERVER.md) · [Protokol agent](https://github.com/cheaper-inference/OmniRoute/blob/main/docs/frameworks/AGENT_PROTOCOLS_GUIDE.md)

## Hemat 15 sampai 95% token secara otomatis

Kompresi memakai tumpukan 12 mesin, ditambah gaya keluaran, dial adaptif, dan kontrol per permintaan. Cara kerja, arsitektur, dan hitungan penghematannya dijelaskan di dokumentasi proyek.

## Mulai cepat

**1) Instal dan jalankan**

```bash
npm install -g omniroute
omniroute
```

> Melihat peringatan `npm warn ERESOLVE` atau peer-dep? [Itu tidak berbahaya](https://github.com/cheaper-inference/OmniRoute/blob/main/docs/guides/TROUBLESHOOTING.md#npm-install-warnings-eresolve--peer--deprecated).
>
> **Memakai npm 11 atau lebih baru?** npm bisa memblokir skrip lifecycle paket kecuali diizinkan. `postinstall` OmniRoute (`node scripts/build/postinstall.mjs`) dibutuhkan untuk menyiapkan file runtime native. Izinkan paket yang disebut peringatan npm saat memasang secara global. Untuk set paket yang dilaporkan OmniRoute 3.8.52:
>
> ```bash
> npm install -g --allow-scripts=omniroute,keytar,onnxruntime-node,@parcel/watcher,@swc/core,protobufjs,esbuild omniroute
> ```
>
> Daftar dependensi bisa berubah antar rilis; jika npm melaporkan daftar lain, pakai nama paket dari peringatan itu. **Mengizinkan sebuah paket berarti mengizinkan skrip instalasinya berjalan.**
>
> **Memakai Gemini Web atau penyedia web-cookie lain?** Paket npm menyertakan Playwright tetapi bukan binary Chromium-nya. Lihat [catatan setup Playwright Chromium](https://github.com/cheaper-inference/OmniRoute/blob/main/docs/guides/TROUBLESHOOTING.md#gemini-web-and-playwright-chromium) sebelum permintaan web-provider pertama.

Dashboard di `http://localhost:20128` dan API di `http://localhost:20128/v1`.

**2) Hubungkan penyedia yang memenuhi syarat dengan akunmu sendiri**

Dashboard → **Providers** → pilih penyedia yang ketentuan dan kuotanya sesuai kebutuhanmu → tambahkan API key atau selesaikan alur akunnya. Free tier mungkin membutuhkan pendaftaran, persetujuan, atau metode pembayaran. Tinjau [Free Tiers Guide](https://github.com/cheaper-inference/OmniRoute/blob/main/docs/getting-started/FREE-TIERS-GUIDE.md); ketersediaan tanpa key tidak dijamin, dan penyedia bertanda `tos: avoid` dikecualikan dari `auto` secara default.

**3) Arahkan tool coding kamu**

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Dashboard → Endpoints]
Model:    auto            (routes among eligible connections — or choose provider/model)
```

**4) Verifikasi**

```bash
curl http://localhost:20128/v1/models -H "Authorization: Bearer YOUR_KEY"
```

Kamu akan melihat model yang terhubung. Selesai: mulai ngoding, dan OmniRoute merutekan serta berpindah otomatis untukmu.

Jika klienmu tidak bisa mengirim header kustom, OmniRoute juga menyediakan alias kompatibilitas bertoken (misalnya `http://localhost:20128/vscode/YOUR_KEY/chat/completions`). Pakai hanya untuk klien yang tidak bisa menyertakan `Authorization: Bearer ...`; autentikasi lewat header tetap mode yang diutamakan, karena key berada di dalam URL.

## Metode instal lain

**Docker**

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

`:latest` mengikuti SemVer stabil **yang dipublikasikan** tertinggi, bukan git `main`. Kunci ke `:X.Y.Z` untuk GitOps. Untuk satu coding agent, README menyarankan `OMNIROUTE_MEMORY_MB=8192` dan `--memory=10g`. Channel pra-rilis `:next` dan `:next-web` hanya untuk menguji perbaikan yang belum dirilis dan **tidak didukung untuk produksi**. Instalasi dari sumber, pnpm, Bun, Nix, devbox, Podman, dan paket Arch dijelaskan di README asli.

## Dokumentasi

Dokumentasi lengkap ada di folder `docs/` repo: [panduan memulai](https://github.com/cheaper-inference/OmniRoute/blob/main/docs/getting-started/FREE-TIERS-GUIDE.md), operasi dan penyebaran, fitur dan arsitektur, protokol dan API, serta kualitas proyek. Situs: [omniroute.online](https://omniroute.online).

## Lisensi

Lisensi MIT. Lihat [LICENSE](https://github.com/cheaper-inference/OmniRoute/blob/main/LICENSE).

> Catatan: terjemahan ini sangat meringkas README asli (sekitar 1.800 baris). Yang dibuang atau diringkas: daftar lengkap penyedia, rincian 12 mesin kompresi, 20 strategi routing, panduan video, "What's New", sponsor, kontributor, dan ucapan terima kasih. Lihat README asli untuk semuanya.
