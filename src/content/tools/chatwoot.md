---
title: "Chatwoot"
summary: "Platform dukungan pelanggan open source dan self-hosted, alternatif Intercom dan Zendesk, dengan kotak masuk omnichannel, Help Center, dan Captain, agent AI untuk menjawab pertanyaan rutin."
category: bisnis
tags: [customer-support, helpdesk, omnichannel, live-chat, whatsapp, self-hosted, ai-agent, ruby]
surfaces: [api]
source_url: "https://github.com/chatwoot/chatwoot/blob/develop/README.md"
repo: chatwoot/chatwoot
stars: 38901
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
setup: |
  README tidak memuat perintah pasang. Opsi deploy yang disebutnya:

  - Heroku one-click deploy: https://heroku.com/deploy?template=https://github.com/chatwoot/chatwoot/tree/master
    (atur environment variable sesuai https://www.chatwoot.com/docs/environment-variables, bila tidak sebagian fitur bisa rusak)
  - DigitalOcean 1-Click Kubernetes: https://marketplace.digitalocean.com/apps/chatwoot
  - Opsi lain yang didukung: https://chatwoot.com/deploy
  - Dokumentasi lengkap: https://www.chatwoot.com/help-center
---

# Chatwoot

Platform dukungan pelanggan modern, alternatif open source untuk Intercom, Zendesk, Salesforce Service Cloud, dan sejenisnya.

> **Catatan dari situs ini:** (1) GitHub tidak mendeteksi lisensi repo ini; kolom lisensi mengikuti pernyataan README: "Released under the MIT License" (© 2017-2026 Chatwoot Inc). (2) README tidak memuat perintah pasang, jadi kolom `setup` hanya berisi tautan opsi deploy yang disebut README, tanpa perintah tambahan dari kami. (3) Chatwoot adalah aplikasi dukungan pelanggan; README tidak menyebut integrasi khusus dengan Claude. Kolom `surfaces` diisi `api` sebagai nilai terdekat. (4) Tautan DigitalOcean di README memuat kode referal; di sini dipakai URL polos tanpa kode itu. (5) Bagian badge, kontributor, dan tangkapan layar tidak disalin.

Chatwoot adalah platform dukungan pelanggan modern, open source, dan self-hosted yang dirancang untuk membantu bisnis memberikan pengalaman dukungan yang luar biasa. Dibangun untuk skala dan fleksibilitas, Chatwoot memberimu kendali penuh atas data pelanggan sambil menyediakan alat yang kuat untuk mengelola percakapan di berbagai kanal.

### ✨ Captain: agent AI untuk dukungan

Perkuat dukunganmu dengan Captain, agent AI milik Chatwoot. Captain membantu mengotomatiskan balasan, menangani pertanyaan umum, dan mengurangi beban kerja agent, sehingga pelanggan mendapat jawaban instan dan akurat. Dengan Captain, timmu bisa fokus pada percakapan yang rumit sementara pertanyaan rutin diselesaikan secara otomatis. Baca selengkapnya tentang Captain [di sini](https://chwt.app/captain-docs).

### 💬 Support desk omnichannel

Chatwoot memusatkan semua percakapan pelanggan dalam satu kotak masuk yang kuat, dari mana pun pelanggan menghubungi. Ia mendukung live chat di situs web, email, Facebook, Instagram, Twitter, WhatsApp, Telegram, Line, SMS, dan lainnya.

### 📚 Portal Help Center

Terbitkan artikel bantuan, FAQ, dan panduan lewat portal Help Center bawaan. Biarkan pelanggan menemukan jawaban sendiri, kurangi pertanyaan berulang, dan jaga agar tim dukunganmu fokus pada masalah yang lebih kompleks.

### 🗂️ Fitur lainnya

#### Kolaborasi & produktivitas

- Catatan Pribadi dan @mention untuk diskusi tim internal.
- Label untuk mengatur dan mengategorikan percakapan.
- Pintasan Keyboard dan Command Bar untuk navigasi cepat.
- Canned Responses untuk membalas lebih cepat pertanyaan yang sering muncul.
- Auto-Assignment untuk mengarahkan percakapan berdasarkan ketersediaan agent.
- Dukungan Multibahasa untuk melayani pelanggan dalam banyak bahasa.
- Custom Views dan Filters untuk pengaturan kotak masuk yang lebih baik.
- Jam Kerja dan Auto-Responders untuk mengelola ekspektasi waktu respons.
- Tim dan alat Otomasi untuk menskalakan alur kerja dukungan.
- Manajemen Kapasitas Agent untuk menyeimbangkan beban kerja tim.

#### Data pelanggan & segmentasi

- Manajemen Kontak dengan profil dan riwayat interaksi.
- Segmen Kontak dan Catatan untuk komunikasi yang tertarget.
- Kampanye untuk melibatkan pelanggan secara proaktif.
- Custom Attributes untuk menyimpan data pelanggan tambahan.
- Formulir Pra-Chat untuk mengumpulkan informasi pengguna sebelum percakapan dimulai.

#### Integrasi

- Integrasi Slack untuk mengelola percakapan langsung dari Slack.
- Integrasi Dialogflow untuk otomasi chatbot.
- Dashboard Apps untuk menanamkan alat internal di dalam Chatwoot.
- Integrasi Shopify untuk melihat dan mengelola pesanan pelanggan langsung di Chatwoot.
- Pakai Google Translate untuk menerjemahkan pesan pelanggan secara real-time.
- Buat dan kelola tiket Linear di dalam Chatwoot.

#### Laporan & wawasan

- Live View percakapan yang sedang berlangsung untuk pemantauan real-time.
- Laporan Percakapan, Agent, Inbox, Label, dan Tim untuk visibilitas operasional.
- Laporan CSAT untuk mengukur kepuasan pelanggan.
- Laporan yang bisa diunduh untuk analisis dan pelaporan offline.

## Dokumentasi

Dokumentasi lengkap tersedia di [chatwoot.com/help-center](https://www.chatwoot.com/help-center).

## Proses terjemahan

Proses terjemahan untuk aplikasi web dan mobile Chatwoot dikelola di [https://translate.chatwoot.com](https://translate.chatwoot.com) memakai Crowdin. Baca [panduan terjemahan](https://www.chatwoot.com/docs/contributing/translating-chatwoot-to-your-language) untuk berkontribusi.

## Model branching

Kami memakai model branching [git-flow](https://nvie.com/posts/a-successful-git-branching-model/). Branch dasarnya adalah `develop`. Jika kamu mencari versi stabil, pakai `master` atau tag berlabel `v1.x.x`.

## Deployment

### Deploy satu klik di Heroku

Men-deploy Chatwoot ke Heroku sangat mudah: cukup klik tombol deploy di [halaman template Heroku](https://heroku.com/deploy?template=https://github.com/chatwoot/chatwoot/tree/master).

Ikuti [tautan ini](https://www.chatwoot.com/docs/environment-variables) untuk memahami cara menyetel environment variable yang benar agar aplikasi berjalan dengan semua fiturnya. Bisa terjadi kerusakan bila environment variable yang relevan tidak disetel.

### Deploy 1-Click Kubernetes di DigitalOcean

Chatwoot kini mendukung deploy 1-Click ke DigitalOcean sebagai aplikasi Kubernetes: [Deploy ke DigitalOcean](https://marketplace.digitalocean.com/apps/chatwoot).

### Opsi deployment lain

Untuk opsi lain yang didukung, lihat [halaman deployment](https://chatwoot.com/deploy) mereka.

## Keamanan

Ingin melaporkan kerentanan? Silakan lihat file [SECURITY.md](https://github.com/chatwoot/chatwoot/blob/develop/SECURITY.md).

## Komunitas

Jika kamu butuh bantuan atau sekadar ingin berkumpul, mampir dan sapa kami di server [Discord](https://discord.gg/cJXdrwS).

## Lisensi

*Chatwoot* © 2017-2026, Chatwoot Inc. Dirilis di bawah Lisensi MIT.
