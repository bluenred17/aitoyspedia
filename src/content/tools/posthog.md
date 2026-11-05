---
title: "PostHog"
summary: "Platform analitik produk open-source dengan session replay, feature flag, eksperimen, error tracking, survei, dan server MCP untuk agent coding."
category: bisnis
tags: [analitik, session-replay, feature-flag, eksperimen, mcp, self-hosted, observability]
surfaces: [claude-code, api]
setup: |
  # PostHog Cloud (direkomendasikan): daftar gratis
  # https://us.posthog.com/signup
  # https://eu.posthog.com/signup

  # Pasang dan konfigurasi PostHog di aplikasi kamu lewat wizard
  npx -y @posthog/wizard@latest

  # Pasang server MCP PostHog ke Claude Code, Cursor, Codex, VS Code, Zed, atau PostHog Desktop
  npx @posthog/wizard mcp add

  # Self-hosting hobby deploy di Linux dengan Docker (disarankan memori 4 GB).
  # Perhatian: pola curl | bash menjalankan skrip dari internet. Periksa skripnya dulu bila perlu.
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/posthog/posthog/HEAD/bin/deploy-hobby)"
source_url: "https://github.com/PostHog/posthog/blob/master/README.md"
repo: PostHog/posthog
stars: 40652
license: "MIT (kecuali direktori ee)"
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
---

PostHog menyerap dan menyimpan data analitik, galat, rekaman sesi, dan data bisnis kamu supaya kamu dan agent kamu bisa menanyainya dan bertindak atasnya. Menurut README, PostHog memberi semua alat untuk membangun produk yang sukses, dan menangkap konteks yang dibutuhkan agent untuk mendiagnosis masalah, menemukan peluang, dan mengirim perbaikan.

## Fitur

**Analitik**
- [Product analytics](https://posthog.com/product-analytics): analitik berbasis event, dengan autocapture atau instrumentasi manual. Analisis dengan visualisasi atau SQL.
- [Web analytics](https://posthog.com/web-analytics): memantau lalu lintas web dan sesi pengguna dengan dasbor ala GA. Melacak konversi, web vitals, dan pendapatan.
- [Group analytics](https://posthog.com/group-analytics): menganalisis akun multi-pengguna dan kelompok pengguna lain.

**Session replay**
- [Session replay](https://posthog.com/session-replay): menonton sesi pengguna nyata dari situs web atau aplikasi seluler.
- [Replay Vision](https://posthog.com/replay-vision): AI menonton rekaman dan mengubahnya menjadi observasi yang bisa ditanyai.
- [Heatmaps](https://posthog.com/heatmaps): melihat di mana pengguna mengeklik, menggulir, dan menggerakkan kursor.

**Observabilitas**
- [Error tracking](https://posthog.com/error-tracking): melacak galat, menerima peringatan, dan menyelesaikan masalah.
- [Logs](https://posthog.com/logs): menyerap, mencari, dan menganalisis log bersama data produk lain.
- [Tracing](https://posthog.com/tracing): mengikuti distributed trace sampai ke baris kode yang rusak.

**Kirim dan iterasi**
- [Feature flags](https://posthog.com/feature-flags): meluncurkan fitur dengan aman ke pengguna atau kohort tertentu.
- [Experiments](https://posthog.com/experiments): menguji perubahan dan mengukur dampak statistiknya, juga tanpa kode.
- [Early access features](https://posthog.com/early-access-features) (beta): pengguna bisa memilih ikut beta.

**Bicara dengan pengguna**
- [Surveys](https://posthog.com/surveys): survei dengan templat tanpa kode, atau survey builder kustom.
- [Support](https://posthog.com/support): dukungan pelanggan dengan widget chat dan inbox terpadu.
- [Workflows](https://posthog.com/workflows): mengotomasi aksi dan pesan ke pengguna berdasarkan data produk.

**Data**
- [Warehouse](https://posthog.com/context-warehouse/managed-warehouse): warehouse terkelola, lebih dari 120 sumber, dan editor SQL dengan BI.
- [Data pipelines](https://posthog.com/cdp): filter dan transformasi data masuk, kirim ke lebih dari 25 tool atau webhook, atau ekspor batch.
- [Endpoints](https://posthog.com/endpoints): membangun endpoint API kustom dari data PostHog.

**AI dan agent**
- [AI observability](https://posthog.com/ai-observability): menangkap trace, generasi, latensi, dan biaya aplikasi berbasis LLM, dengan evaluasi LLM-as-a-judge.
- [MCP analytics](https://posthog.com/docs/mcp-analytics) (beta): melihat bagaimana agent memakai server MCP kamu.
- [PostHog AI](https://posthog.com/ai): bertanya ke data produk. PostHog AI membuat insight, menulis SQL, dan mencari replay.
- [Self-driving](https://posthog.com/self-driving): mengubah sinyal di data produk (galat, rage click, query gagal) menjadi laporan dan pull request untuk kamu tinjau dan merge.

Semua ini bisa dikendalikan dari [Slack](https://posthog.com/slack), web, [PostHog Desktop](https://posthog.com/desktop), atau editor kamu lewat [MCP](https://posthog.com/mcp).

## Untuk agent: server MCP

Server MCP jarak jauh PostHog ada di `https://mcp.posthog.com/mcp`. Server ini mengarahkan ke wilayah data yang benar (AS atau UE) saat pengguna login. Pasang ke Claude Code, Cursor, Codex, VS Code, Zed, atau PostHog Desktop dengan:

```bash
npx @posthog/wizard mcp add
```

Dokumentasi diindeks di [posthog.com/llms.txt](https://posthog.com/llms.txt), changelog berupa Markdown di [posthog.com/changelog.md](https://posthog.com/changelog.md), dan panduan setup tiap klien MCP ada di [dokumentasi](https://posthog.com/docs/model-context-protocol).

## Memulai

### PostHog Cloud (direkomendasikan)

Cara tercepat dan paling andal: daftar gratis di [PostHog Cloud](https://us.posthog.com/signup) atau [PostHog Cloud EU](https://eu.posthog.com/signup). Setiap bulan, 1 juta event pertama, 5 ribu rekaman, 1 juta permintaan flag, 100 ribu pengecualian, 10 GB log, dan 1500 respons survei gratis. Setelah itu kamu membayar sesuai pemakaian. Rincian harga ada di [halaman harga](https://posthog.com/pricing).

### Self-hosting hobby deploy (lanjutan)

Untuk self-host, kamu bisa men-deploy instans hobby dengan satu baris di Linux dengan Docker (disarankan memori 4 GB):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/posthog/posthog/HEAD/bin/deploy-hobby)"
```

Perhatian: ini pola `curl | bash`, yang menjalankan skrip dari internet. Periksa skripnya dulu sebelum menjalankannya.

Deployment open source diperkirakan menangani sekitar 100 ribu event per bulan. Setelah itu README menyarankan [migrasi ke PostHog Cloud](https://posthog.com/docs/migrate/migrate-to-cloud). PostHog **tidak** menyediakan dukungan pelanggan atau jaminan untuk deployment open source. Lihat [dokumentasi self-hosting](https://posthog.com/docs/self-host), [panduan troubleshooting](https://posthog.com/docs/self-host/deploy/troubleshooting), dan [disclaimer](https://posthog.com/docs/self-host/open-source/disclaimer).

## Menyiapkan PostHog

Setelah punya instans PostHog, cara tercepat menyiapkannya adalah wizard, yang memasang dan mengonfigurasi PostHog di aplikasi kamu:

```bash
npx -y @posthog/wizard@latest
```

Kamu juga bisa memasang [snippet JavaScript web](https://posthog.com/docs/getting-started/install?tab=snippet), salah satu [SDK](https://posthog.com/docs/getting-started/install?tab=sdks), atau memakai [API](https://posthog.com/docs/getting-started/install?tab=api). Kamu juga bisa menghubungkan [MCP](https://posthog.com/mcp) untuk membawa PostHog ke Claude Code, Cursor, atau agent yang kompatibel dengan MCP.

SDK dan pustaka tersedia untuk bahasa dan framework populer:

| Frontend | Mobile | Backend |
|---|---|---|
| JavaScript | React Native | Python |
| Next.js | Android | Node |
| React | iOS | PHP |
| Vue | Flutter | Ruby |

Ada juga panduan untuk Go, .NET/C#, Django, Angular, WordPress, Webflow, dan lainnya, lengkap dengan tautan di README.

## Lisensi

Menurut README, repo ini tersedia di bawah [lisensi MIT expat](https://github.com/PostHog/posthog/blob/master/LICENSE), kecuali direktori `ee` yang punya [lisensi sendiri](https://github.com/PostHog/posthog/blob/master/ee/LICENSE). Untuk yang membutuhkan 100% FOSS, README menunjuk ke repo [posthog-foss](https://github.com/PostHog/posthog-foss) yang dibersihkan dari semua kode dan fitur proprietary.
