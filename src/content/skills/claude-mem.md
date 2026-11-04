---
title: "Claude-Mem"
summary: "Sistem memori persisten yang menangkap, meringkas, dan mengambil konteks lintas sesi coding agent."
category: productivity
tags: [memori, konteks]
surfaces: [claude-code]
source_url: "https://github.com/thedotmack/claude-mem/blob/main/README.md"
repo: thedotmack/claude-mem
stars: 112499
license: Apache-2.0
added: 2026-11-04
last_verified: 2026-11-04
status: aktif
trigger: "Aktif otomatis di setiap sesi setelah dipasang dan Claude Code dimulai ulang."
install: |
  npx claude-mem install
---

Sistem memori persisten untuk coding agent. Konteks dari sesi sebelumnya muncul otomatis di sesi baru.

```bash
npx claude-mem install
```
