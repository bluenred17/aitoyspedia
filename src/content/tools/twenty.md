---
title: "Twenty"
summary: "CRM open-source yang bisa dibangun dan di-versioning seperti kode, dengan objek, tampilan, alur kerja, dan agen AI yang dapat diperluas lewat CLI dan SDK."
category: bisnis
tags: [crm, open-source, self-hosted, typescript, agen-ai, skills, docker]
surfaces: [claude-code, api]
setup: |
  # Bangun aplikasi dengan Twenty CLI
  npm install -g twenty
  twenty app init my-app
  cd my-app
  yarn install

  # Kirim aplikasi ke workspace
  twenty auth login --url https://your-workspace.twenty.com
  twenty app publish --private

  # Skill agent resmi (Claude Code, Codex, Cursor, Pi, dan harness lain yang didukung CLI skills)
  npx skills add https://github.com/twentyhq/twenty/tree/agent-skills --list

  # Self-hosting: lihat panduan Docker Compose di docs.twenty.com
  # https://docs.twenty.com/developers/self-host/capabilities/docker-compose
source_url: "https://github.com/twentyhq/twenty/blob/main/README.md"
repo: twentyhq/twenty
stars: 60466
license: "AGPL-3.0 (sebagian Enterprise dan MIT)"
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
---

Twenty memberi tim teknis blok bangunan untuk CRM kustom yang memenuhi kebutuhan bisnis yang rumit dan bisa cepat menyesuaikan diri saat bisnis berubah. Menurut README, ini CRM yang kamu bangun, kirim, dan versikan seperti bagian lain dari stack kamu.

## Cara memakai

- **Cloud:** cara tercepat. Daftar di [twenty.com](https://twenty.com) dan buat workspace dalam kurang dari semenit, tanpa mengelola infrastruktur.
- **Bangun aplikasi:** gunakan Twenty CLI untuk membuat aplikasi baru, lalu definisikan objek, field, dan tampilan sebagai kode.
- **Self-hosting:** jalankan Twenty di infrastruktur sendiri dengan [Docker Compose](https://docs.twenty.com/developers/self-host/capabilities/docker-compose), atau berkontribusi secara lokal lewat [panduan setup lokal](https://docs.twenty.com/developers/contribute/capabilities/local-setup).

## Membangun aplikasi

Buat aplikasi baru dengan Twenty CLI:

```bash
npm install -g twenty
twenty app init my-app
cd my-app
yarn install
```

Definisikan objek, field, dan tampilan sebagai kode:

```ts
import { defineObject, FieldType } from 'twenty-sdk/define';

export default defineObject({
  nameSingular: 'deal',
  namePlural: 'deals',
  labelSingular: 'Deal',
  labelPlural: 'Deals',
  fields: [
    { name: 'name', label: 'Name', type: FieldType.TEXT },
    { name: 'amount', label: 'Amount', type: FieldType.CURRENCY },
    { name: 'closeDate', label: 'Close Date', type: FieldType.DATE_TIME },
  ],
});
```

Lalu kirim ke workspace kamu:

```bash
twenty auth login --url https://your-workspace.twenty.com
twenty app publish --private
```

Lihat [panduan pengembangan aplikasi](https://docs.twenty.com/developers/extend/apps/getting-started) untuk objek, tampilan, agen, dan fungsi logika.

## Membangun dengan agen coding

Pasang [skill aplikasi Twenty](https://github.com/twentyhq/twenty/blob/main/packages/twenty-agent-skills) resmi. Skill ini bekerja di Claude Code, Codex, Cursor, Pi, dan harness lain yang didukung CLI `skills`:

```bash
npx skills add https://github.com/twentyhq/twenty/tree/agent-skills --list
```

Branch `agent-skills` dibuat oleh publish pertama yang berhasil dari `main`. Sebelum itu ada, pakai [instruksi build lokal](https://github.com/twentyhq/twenty/blob/main/packages/twenty-agent-skills#local-development). [`SKILLS.md`](https://github.com/twentyhq/twenty/blob/main/SKILLS.md) menjelaskan keluarga skill lain di repo ini dan untuk siapa saja.

## Yang tersedia

Twenty menyediakan blok bangunan CRM modern: objek, tampilan, alur kerja, dan agen, yang bisa diperluas sebagai kode. Dokumentasi mencakup [panduan pengguna](https://docs.twenty.com/user-guide/introduction) dan [referensi pengembang](https://docs.twenty.com).

- Buat aplikasi sendiri, dan kelola dengan version control.
- Atur tata letak tampilan.
- Agen dan chat AI.
- Fitur CRM umum lainnya.

## Stack

TypeScript, Nx, NestJS (dengan BullMQ, PostgreSQL, dan Redis), serta React (dengan Jotai, Linaria, dan Lingui).

## Lisensi

Menurut file `LICENSE` di repo, proyek ini sebagian besar berlisensi **AGPLv3**, dengan dua pengecualian:

1. File yang diberi komentar `/* @license Enterprise */` berlisensi komersial, bukan AGPLv3.
2. Beberapa paket berlisensi **MIT**: Twenty CLI, `twenty-sdk`, `twenty-client-sdk`, `create-twenty-app`, `twenty-shared`, pustaka komponen `twenty-ui`, dan aplikasi di `packages/twenty-apps`.

README tidak mencantumkan lisensi. Informasi ini diambil dari file `LICENSE`, dan GitHub mencatat lisensinya sebagai tidak terdeteksi. Baca file `LICENSE` sebelum memakai Twenty untuk kebutuhan komersial atau menyediakannya sebagai layanan.
