---
title: "Composio"
summary: "SDK (TypeScript dan Python) dan CLI yang memberi agent AI akses ke 1000+ toolkit yang sudah terautentikasi, lengkap dengan sesi per pengguna, trigger, sandbox, adapter untuk Claude Agent SDK, dan endpoint MCP."
category: coding
tags: [agent, sdk, mcp, tool-calling, integrasi, autentikasi, cli, typescript, python]
surfaces: [claude-code, api]
source_url: "https://github.com/ComposioHQ/composio/blob/next/README.md"
repo: ComposioHQ/composio
stars: 30929
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
setup: |
  # Butuh COMPOSIO_API_KEY dari https://dashboard.composio.dev/settings (jangan simpan kunci asli di repo)

  # TypeScript (contoh dengan OpenAI Agents)
  npm install @composio/core @composio/openai-agents @openai/agents

  # Python (contoh dengan OpenAI Agents)
  pip install composio composio-openai-agents openai-agents

  # Claude Agent SDK: pakai adapter @composio/claude-agent-sdk (TypeScript) atau composio-claude-agent-sdk (Python)
---

# Composio

Composio memberi agent AI kamu 1000+ toolkit yang sudah terautentikasi, sesi per pengguna, autentikasi, trigger, dan sandbox, sehingga kamu bisa mengirim agent yang mengubah niat menjadi tindakan.

> **Catatan dari situs ini:** (1) Composio adalah layanan dengan dashboard dan API key sendiri; SDK-nya open source (MIT), tetapi toolkit berjalan lewat layanan Composio. Jangan menaruh `COMPOSIO_API_KEY` asli di repo atau entri. (2) README menawarkan pemasangan CLI satu baris `curl -fsSL https://composio.dev/install | sh`, yaitu perintah yang mengunduh skrip lalu langsung menjalankannya. Domainnya milik proyek sendiri, tetapi sebaiknya skripnya dibaca dulu sebelum dijalankan. Perintah pasang utama entri ini adalah paket npm dan pip. (3) Contoh README memakai OpenAI Agents; untuk Claude, pakai adapter Claude Agent SDK di tabel Provider atau endpoint MCP. (4) Badge, logo, dan bagian pengembangan internal tidak disalin seluruhnya.

Ini adalah monorepo SDK Composio. Isinya:

- **[`@composio/core`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/core)**: SDK TypeScript
- **[`composio`](https://github.com/ComposioHQ/composio/blob/next/python)**: SDK Python
- **[CLI `composio`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/cli)**: cari, jalankan, dan buat skrip tool dari shell kamu
- **Adapter provider** untuk OpenAI Agents, Claude Agent SDK, Vercel AI SDK, LangChain, dan [lainnya](#provider)

Tautan: [composio.dev](https://composio.dev) · [Dokumentasi](https://docs.composio.dev) · [Quickstart](https://docs.composio.dev/docs/quickstart) · [Changelog](https://docs.composio.dev/reference/changelog)

## Quickstart

Buat sesi untuk seorang pengguna, serahkan tool-nya ke agent kamu, dan biarkan agent mengambil tindakan di 1000+ aplikasi. Ambil dulu `COMPOSIO_API_KEY` dari [dashboard](https://dashboard.composio.dev/settings).

### TypeScript

```bash
npm install @composio/core @composio/openai-agents @openai/agents
```

> `@composio/core` sengaja membundel source TypeScript dan dokumen SDK-nya agar paket terpasang bisa diperiksa oleh agent coding. Jika kamu ingin pemasangan lebih kecil dengan API yang sama, pakai [`@composio/slim`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/slim).

```typescript
import { Composio } from "@composio/core";
import { OpenAIAgentsProvider } from "@composio/openai-agents";
import { Agent, run } from "@openai/agents";

const composio = new Composio({ provider: new OpenAIAgentsProvider() });

// Each session is scoped to one of your users
const session = await composio.create("user_123");
const tools = await session.tools();

const agent = new Agent({
  name: "Personal Assistant",
  instructions: "You are a helpful assistant. Use Composio tools to take action.",
  tools,
});

const result = await run(agent, "Summarize my emails from today");
console.log(result.finalOutput);
```

### Python

```bash
pip install composio composio-openai-agents openai-agents
```

```python
from composio import Composio
from composio_openai_agents import OpenAIAgentsProvider
from agents import Agent, Runner

composio = Composio(provider=OpenAIAgentsProvider())

# Each session is scoped to one of your users
session = composio.create(user_id="user_123")
tools = session.tools()

agent = Agent(
    name="Personal Assistant",
    instructions="You are a helpful assistant. Use Composio tools to take action.",
    tools=tools,
)

result = Runner.run_sync(starting_agent=agent, input="Summarize my emails from today")
print(result.final_output)
```

Secara default sebuah sesi mendapat meta tool yang menemukan, mengautentikasi, dan menjalankan tool aplikasi saat runtime, sehingga kamu tidak memuat ratusan definisi tool ke dalam konteks. Simpan `session.session_id` dan pakai ulang dengan `composio.use()` di antara giliran. Lihat [apa itu sesi](https://docs.composio.dev/docs/how-composio-works) dan [mengonfigurasi sesi](https://docs.composio.dev/docs/configuring-sessions) untuk membatasi toolkit, konfigurasi autentikasi, dan akun terhubung.

**Lebih suka MCP?** Setiap sesi juga mengekspos endpoint MCP yang di-host. Berikan `mcp: true` ke `composio.create()` lalu arahkan Claude, Cursor, atau klien MCP apa pun ke `session.mcp.url`. Lihat [sesi lewat MCP](https://docs.composio.dev/docs/sessions-via-mcp).

## CLI

CLI `composio` menjalankan Composio dari shell kamu dan memberi agent coding seperti Claude Code permukaan tool lokal.

```bash
curl -fsSL https://composio.dev/install | sh
```

Installer menaruh `composio` di `PATH` untuk terminal berikutnya. Buka terminal baru, lalu jalankan `composio login`. Lihat [INSTALL.md](https://github.com/ComposioHQ/composio/blob/next/INSTALL.md) untuk penimpaan setup shell, termasuk `COMPOSIO_INSTALL_SHELL=none` untuk menjalankan pemasangan saja.

Pakai `composio search` untuk menemukan tool, `composio execute` untuk menjalankannya, `composio link` untuk menghubungkan akun, dan `composio run` untuk membuat skrip workflow dalam TypeScript. Lihat [dokumen CLI](https://docs.composio.dev/docs/cli).

## Provider

Provider menyesuaikan tool Composio ke format tool native framework agent kamu:

| Provider | TypeScript | Python |
|----------|:----------:|:------:|
| OpenAI | [`@composio/openai`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/providers/openai) | [`composio-openai`](https://github.com/ComposioHQ/composio/blob/next/python/providers/openai) |
| OpenAI Agents | [`@composio/openai-agents`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/providers/openai-agents) | [`composio-openai-agents`](https://github.com/ComposioHQ/composio/blob/next/python/providers/openai_agents) |
| Anthropic | [`@composio/anthropic`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/providers/anthropic) | [`composio-anthropic`](https://github.com/ComposioHQ/composio/blob/next/python/providers/anthropic) |
| Claude Agent SDK | [`@composio/claude-agent-sdk`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/providers/claude-agent-sdk) | [`composio-claude-agent-sdk`](https://github.com/ComposioHQ/composio/blob/next/python/providers/claude_agent_sdk) |
| Vercel AI SDK | [`@composio/vercel`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/providers/vercel) | — |
| Google GenAI | [`@composio/google`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/providers/google) | [`composio-gemini`](https://github.com/ComposioHQ/composio/blob/next/python/providers/gemini), [`composio-google`](https://github.com/ComposioHQ/composio/blob/next/python/providers/google) |
| Google ADK | — | [`composio-google-adk`](https://github.com/ComposioHQ/composio/blob/next/python/providers/google_adk) |
| LangChain | [`@composio/langchain`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/providers/langchain) | [`composio-langchain`](https://github.com/ComposioHQ/composio/blob/next/python/providers/langchain) |
| LangGraph | lewat `@composio/langchain` | [`composio-langgraph`](https://github.com/ComposioHQ/composio/blob/next/python/providers/langgraph) |
| LlamaIndex | [`@composio/llamaindex`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/providers/llamaindex) | [`composio-llamaindex`](https://github.com/ComposioHQ/composio/blob/next/python/providers/llamaindex) |
| Mastra | [`@composio/mastra`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/providers/mastra) | — |
| Pi | [`@composio/experimental`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/experimental)* | — |
| Cloudflare Workers AI | [`@composio/cloudflare`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/providers/cloudflare) | — |
| TypeSafe (Jev) | [`@composio/typesafe`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/providers/typesafe) | [`composio-typesafe`](https://github.com/ComposioHQ/composio/blob/next/python/providers/typesafe) |
| CrewAI | — | [`composio-crewai`](https://github.com/ComposioHQ/composio/blob/next/python/providers/crewai) |
| AutoGen | — | [`composio-autogen`](https://github.com/ComposioHQ/composio/blob/next/python/providers/autogen) |

\* *[Provider Pi](https://docs.composio.dev/docs/providers/pi) bersifat eksperimental dan dirilis dari `@composio/experimental`.*

Tidak menemukan framework kamu? [Bangun provider kustom](https://docs.composio.dev/docs/providers/custom-providers), atau lewati provider sama sekali dan sambungkan lewat [MCP](https://docs.composio.dev/docs/sessions-via-mcp).

## Semua paket

Semua yang dipublikasikan dari repo ini:

| Paket | Deskripsi |
|---------|-------------|
| [`@composio/core`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/core) | SDK TypeScript |
| [`@composio/slim`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/slim) | `@composio/core` tanpa source dan dokumen yang dibundel; API sama, pemasangan lebih kecil |
| [CLI `composio`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/cli) | Biner CLI mandiri: `curl -fsSL https://composio.dev/install \| sh` |
| [`@composio/experimental`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/experimental) | Integrasi eksperimental, termasuk provider Pi |
| [`@composio/json-schema-to-zod`](https://github.com/ComposioHQ/composio/blob/next/ts/packages/json-schema-to-zod) | Konversi JSON Schema ke Zod |
| `@composio/*` [adapter provider](#provider) | OpenAI, OpenAI Agents, Anthropic, Claude Agent SDK, Vercel, Google, LangChain, LlamaIndex, Mastra, Cloudflare, TypeSafe |
| [`composio`](https://github.com/ComposioHQ/composio/blob/next/python) | SDK Python |
| `composio-*` [adapter provider](#provider) | OpenAI, OpenAI Agents, Anthropic, Claude Agent SDK, Gemini, Google, Google ADK, LangChain, LangGraph, LlamaIndex, CrewAI, AutoGen, TypeSafe |

## Tata letak repositori

```text
ts/                TypeScript SDK workspace
  packages/core/       @composio/core
  packages/providers/  Provider adapters
  packages/cli/        Composio CLI
python/            Python SDK and provider packages
docs/              Documentation site (docs.composio.dev)
```

SDK TypeScript diuji pada Node 22+; SDK Python mendukung Python 3.11+.

## Pengembangan

```bash
mise install    # pinned toolchain (Node, Python, pnpm)
pnpm install
pnpm build
pnpm test
```

Perintah Python dijalankan dari `python/`; lihat [`python/README.md`](https://github.com/ComposioHQ/composio/blob/next/python/README.md). Kami menyambut kontribusi untuk kedua SDK; baca [panduan kontribusi](https://github.com/ComposioHQ/composio/blob/next/CONTRIBUTING.md) sebelum mengirim pull request.

## Dukungan

- [Dokumentasi](https://docs.composio.dev)
- [Komunitas Discord](https://discord.gg/composio)
- [Buka issue](https://github.com/ComposioHQ/composio/issues)

## Lisensi

MIT. Lihat [LICENSE](https://github.com/ComposioHQ/composio/blob/next/LICENSE).
