---
title: "Supabase"
summary: "Platform pengembangan Postgres open-source dengan database hosted, autentikasi, API otomatis, fungsi, penyimpanan file, dan toolkit AI/vektor."
category: coding
tags: [postgres, database, autentikasi, backend, realtime, vektor, self-hosted]
surfaces: [api]
setup: |
  README tidak memuat perintah pasang. Tiga cara memulai menurut README:

  - Platform hosted (tanpa instalasi): https://supabase.com/dashboard
  - Self-host: https://supabase.com/docs/guides/hosting/overview
  - Pengembangan lokal: https://supabase.com/docs/guides/local-development
source_url: "https://github.com/supabase/supabase/blob/master/README.md"
repo: supabase/supabase
stars: 114550
license: Apache-2.0
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
---

[Supabase](https://supabase.com) adalah platform pengembangan Postgres. Menurut README, tujuannya membangun fitur-fitur Firebase dengan alat open source berkelas enterprise.

## Fitur

- Database Postgres hosted ([dokumentasi](https://supabase.com/docs/guides/database))
- Autentikasi dan otorisasi ([dokumentasi](https://supabase.com/docs/guides/auth))
- API yang dibuat otomatis:
  - REST ([dokumentasi](https://supabase.com/docs/guides/api))
  - GraphQL ([dokumentasi](https://supabase.com/docs/guides/graphql))
  - Realtime subscriptions ([dokumentasi](https://supabase.com/docs/guides/realtime))
- Fungsi:
  - Database Functions ([dokumentasi](https://supabase.com/docs/guides/database/functions))
  - Edge Functions ([dokumentasi](https://supabase.com/docs/guides/functions))
- File Storage ([dokumentasi](https://supabase.com/docs/guides/storage))
- Toolkit AI dan vektor/embedding ([dokumentasi](https://supabase.com/docs/guides/ai))
- Dashboard

Untuk dokumentasi lengkap, kunjungi [supabase.com/docs](https://supabase.com/docs). Untuk berkontribusi, lihat [DEVELOPERS.md](https://github.com/supabase/supabase/blob/master/DEVELOPERS.md).

## Cara memulai

README tidak memberi perintah pasang. Menurut README, Supabase adalah [platform hosted](https://supabase.com/dashboard): kamu bisa mendaftar dan mulai memakainya tanpa memasang apa pun. Kamu juga bisa [self-host](https://supabase.com/docs/guides/hosting/overview) dan [mengembangkan secara lokal](https://supabase.com/docs/guides/local-development).

## Cara kerja

Supabase adalah gabungan alat open source. Prinsipnya: jika alat dengan lisensi MIT, Apache 2, atau yang setara sudah ada, Supabase memakai dan mendukungnya. Jika belum ada, Supabase membuat dan membuka sumbernya sendiri. Supabase bukan pemetaan satu-satu dari Firebase. Tujuannya memberi pengembang pengalaman seperti Firebase dengan alat open source.

Arsitektur terdiri dari:

- **Postgres:** sistem database objek-relasional dengan lebih dari 30 tahun pengembangan aktif.
- **Realtime:** server Elixir yang memungkinkan kamu mendengarkan insert, update, dan delete di PostgreSQL lewat websocket. Server membaca perubahan dari replikasi bawaan Postgres, mengubahnya menjadi JSON, lalu menyiarkannya ke klien yang berwenang.
- **PostgREST:** server web yang mengubah database PostgreSQL menjadi RESTful API.
- **GoTrue:** API autentikasi berbasis JWT untuk pendaftaran, login, dan manajemen sesi.
- **Storage:** RESTful API untuk mengelola file di S3, dengan izin dikelola Postgres.
- **pg_graphql:** ekstensi PostgreSQL yang mengekspos GraphQL API.
- **postgres-meta:** RESTful API untuk mengelola Postgres, misalnya mengambil tabel, menambah role, dan menjalankan query.
- **Envoy:** proxy edge dan layanan berperforma tinggi.

## Pustaka klien

Pendekatan pustaka klien bersifat modular: setiap sub-pustaka adalah implementasi mandiri untuk satu sistem eksternal.

- **Resmi:** JavaScript/TypeScript (`supabase-js`), Flutter (`supabase-flutter`), Swift (`supabase-swift`), dan Python (`supabase-py`), masing-masing dengan klien fitur untuk PostgREST, auth, realtime, storage, dan functions.
- **Komunitas:** C#, Go, Java, Kotlin, Ruby, Rust, dan Godot Engine (GDScript), dengan cakupan fitur berbeda-beda. Tabel lengkap dan tautan tiap repo ada di README.

## Lisensi

Apache-2.0.
