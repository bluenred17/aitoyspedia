---
title: "n8n"
summary: "Platform fair-code untuk membangun dan menjalankan agen AI serta alur kerja otomatis dengan kanvas visual, kode kustom, dan lebih dari 1500 integrasi."
category: productivity
tags: [otomasi, workflow, agen-ai, self-hosted, docker, integrasi, fair-code]
surfaces: [api]
setup: |
  # Coba n8n langsung dengan skrip pasang dari README (butuh Docker).
  # Perhatian: pola curl | sh menjalankan skrip dari internet. Periksa skripnya dulu bila perlu.
  curl -fsSL https://get.n8n.io | sh

  # Atau jalankan manual dengan Docker
  docker volume create n8n_data
  docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n

  # Buka editor di http://localhost:5678
source_url: "https://github.com/n8n-io/n8n/blob/master/README.md"
repo: n8n-io/n8n
stars: 209591
license: "Sustainable Use License"
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
---

n8n adalah platform fair-code untuk membangun dan menjalankan agen AI dan alur kerja otomatis. Kamu bisa memadukan kanvas visual dengan kode kustom, menjalankannya sendiri (self-hosted) atau di cloud, dan menghubungkannya ke lebih dari 1500 integrasi. Menurut README, tujuannya adalah otomasi AI yang bisa dipercaya untuk pekerjaan nyata, dari prototipe sampai produksi.

## Kemampuan utama

- **Platform otomasi berbasis AI:** membangun alur kerja AI dan agen multi-langkah dengan data, model, dan tool milik kamu sendiri.
- **Fleksibel soal model:** terhubung ke OpenAI, Anthropic, Google, atau model open-source, dan bisa berganti penyedia tanpa mengubah arsitektur.
- **Dari prototipe ke produksi:** alur AI multi-langkah dengan logika, pemakaian tool, persetujuan manusia, dan observabilitas penuh.
- **Kode saat dibutuhkan:** menggabungkan pembuatan visual dengan JavaScript, Python, dan paket npm.
- **Siap untuk perusahaan:** self-host atau deploy dengan akses berbasis peran, jejak audit, dan dukungan untuk data sensitif.
- **Manfaatkan yang sudah ada:** lebih dari 1500 integrasi dan lebih dari 9.000 [template alur kerja](https://n8n.io/workflows).

## Mulai cepat

Coba n8n langsung dengan skrip pasang dari README (butuh [Docker](https://www.docker.com/)):

```sh
curl -fsSL https://get.n8n.io | sh
```

Atau deploy manual dengan [Docker](https://docs.n8n.io/hosting/installation/docker/):

```
docker volume create n8n_data
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

Buka editor di http://localhost:5678

## Sumber daya

- [Dokumentasi](https://docs.n8n.io)
- [1500+ integrasi](https://n8n.io/integrations)
- [Contoh alur kerja](https://n8n.io/workflows)
- [Panduan AI dan LangChain](https://docs.n8n.io/advanced-ai/)
- [Forum komunitas](https://community.n8n.io)
- [Tutorial komunitas](https://community.n8n.io/c/tutorials/28)

Bantuan didapat lewat forum komunitas di [community.n8n.io](https://community.n8n.io).

## Lisensi

n8n adalah [fair-code](https://faircode.io) yang didistribusikan di bawah [Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md) dan [n8n Enterprise License](https://github.com/n8n-io/n8n/blob/master/LICENSE_EE.md). **Ini bukan lisensi open-source standar (OSI).** Baca ketentuannya sebelum memakai n8n untuk kebutuhan komersial.

- **Source available:** kode sumber selalu terlihat.
- **Self-hostable:** bisa di-deploy di mana saja.
- **Extensible:** kamu bisa menambah node dan fungsi sendiri.

Lisensi Enterprise tersedia untuk fitur dan dukungan tambahan. Informasi lebih lengkap ada di [dokumen model lisensi](https://docs.n8n.io/sustainable-use-license/).

## Arti nama n8n

Singkatan dari "nodemation", dibaca n-eight-n. "node-" karena memakai tampilan node dan Node.js, dan "-mation" dari "automation". Nama itu dipendekkan karena terlalu panjang untuk diketik di CLI.
