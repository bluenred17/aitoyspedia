---
title: "Skills For Real Engineers (mattpocock/skills)"
summary: "Kumpulan skill harian Matt Pocock untuk rekayasa perangkat lunak sungguhan, bukan vibe coding: grilling, bahasa bersama, TDD, debugging terdisiplin, dan desain kode, kecil dan mudah diadaptasi."
category: coding
tags: [skills, tdd, grilling, debugging, arsitektur, spec, code-review, workflow]
surfaces: [claude-code]
source_url: "https://github.com/mattpocock/skills/blob/main/README.md"
repo: mattpocock/skills
stars: 313477
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
install: |
  claude plugin install mattpocock-skills@claude-plugins-official
includes: [ask-matt, grill-with-docs, triage, improve-codebase-architecture, setup-matt-pocock-skills, to-spec, to-tickets, implement, implement-spec, wayfinder, retro, prototype, diagnosing-bugs, research, tdd, domain-modeling, codebase-design, code-review, pr, wizard, grill-me, handoff, teach, to-questionnaire, wait-what, grilling, writing-for-agents]
---

# Skills For Real Engineers

Skill agent milik Matt Pocock yang ia pakai setiap hari untuk rekayasa sungguhan, bukan vibe coding.

Membangun aplikasi sungguhan itu sulit. Pendekatan seperti GSD, BMAD, dan Spec-Kit mencoba membantu dengan cara memiliki proses. Tetapi dengan begitu, mereka mengambil kendali dari kamu dan membuat bug dalam prosesnya sulit diatasi.

Skill-skill ini dirancang agar kecil, mudah diadaptasi, dan bisa disusun bersama. Mereka bekerja dengan model apa pun dan didasarkan pada pengalaman rekayasa puluhan tahun. Oprek, jadikan milikmu sendiri, dan nikmati.

## Instalasi (setup 30 detik)

Plugin memperbarui dirinya sendiri. [skills.sh](https://skills.sh/mattpocock/skills) menyalin file yang bisa diedit ke proyekmu, dan kamu memperbaruinya secara manual. Pilih satu cara per agent, karena memasang keduanya membuat setiap skill muncul dua kali.

### 1. Pasang skill-nya

**Claude Code**

```bash
claude plugin install mattpocock-skills@claude-plugins-official
```

Memperbarui dirinya sendiri secara default.

**Codex**

```bash
codex plugin marketplace add mattpocock/skills
codex plugin add mattpocock-skills@mattpocock
```

Memperbarui dirinya sendiri saat startup.

**GitHub Copilot** (CLI dan VS Code)

```bash
copilot plugin marketplace add mattpocock/skills
copilot plugin install mattpocock-skills@mattpocock
```

Lalu, sekali saja, tambahkan ke `~/.copilot/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "mattpocock": { "source": { "source": "github", "repo": "mattpocock/skills" }, "autoUpdate": true }
  }
}
```

Di VS Code, jalankan **Chat: Install Plugin From Source** dan masukkan `https://github.com/mattpocock/skills`. Diperbarui setiap hari.

**Gemini CLI** (pembaruan manual)

```bash
gemini skills install https://github.com/mattpocock/skills.git --path skills/engineering
gemini skills install https://github.com/mattpocock/skills.git --path skills/productivity
```

Jalankan ulang kedua perintah itu untuk memperbarui.

**Agent lain, atau file yang bisa diedit** (pembaruan manual)

```bash
npx skills@latest add mattpocock/skills -a <agent>  # cursor, opencode, devin, windsurf, amp, pi; omit -a to choose
```

Saat installer menanyakan skill mana yang diambil, sertakan `setup-matt-pocock-skills`. Untuk memperbarui, jalankan `npx skills@latest update`, dan jalankan ulang `add` untuk mengambil skill baru.

### 2. Jalankan `/setup-matt-pocock-skills`

Di agent kamu, jalankan sekali per repo. Skill ini akan:

- Menanyakan issue tracker yang ingin kamu pakai (GitHub, GitLab, file lokal, atau apa pun yang kamu jelaskan)
- Menanyakan label apa yang kamu pasang pada tiket saat triase (`/triage` memakai label)
- Menanyakan di mana kamu ingin menyimpan dokumen yang dibuat

### 3. Selesai, kamu siap jalan.

## Mengapa skill ini ada

Matt membuat skill ini untuk memperbaiki kegagalan umum yang ia lihat pada Claude Code, Codex, dan coding agent lain.

### #1: Agent tidak melakukan yang saya mau

> "Tidak ada yang tahu persis apa yang mereka inginkan."
>
> David Thomas & Andrew Hunt, *The Pragmatic Programmer*

**Masalahnya.** Kegagalan paling umum dalam pengembangan perangkat lunak adalah ketidakselarasan. Kamu mengira developer tahu apa yang kamu mau. Lalu kamu melihat apa yang dibangunnya, dan sadar ia sama sekali tidak memahamimu.

Di era AI pun sama. Ada jurang komunikasi antara kamu dan agent. Perbaikannya adalah **sesi grilling**: membuat agent menanyakan pertanyaan rinci tentang apa yang sedang kamu bangun.

**Perbaikannya** adalah memakai:

- [`/grill-me`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) untuk keperluan non-kode
- [`/grill-with-docs`](https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md): sama seperti `/grill-me`, tetapi dengan tambahan lain (lihat di bawah)

Ini adalah skill paling populer di repo ini. Keduanya membantu kamu selaras dengan agent sebelum mulai, dan berpikir mendalam tentang perubahan yang kamu buat. Pakai _setiap kali_ kamu ingin membuat perubahan.

### #2: Agent terlalu bertele-tele

> Dengan bahasa yang ada di mana-mana (ubiquitous language), percakapan antar developer dan ekspresi kodenya semuanya diturunkan dari model domain yang sama.
>
> Eric Evans, *Domain-Driven Design*

**Masalahnya.** Di awal proyek, developer dan orang yang dibuatkan perangkat lunaknya (pakar domain) biasanya berbicara dalam bahasa yang berbeda.

Matt merasakan ketegangan yang sama dengan agent-nya. Agent biasanya dijatuhkan ke dalam proyek dan diminta mencari tahu jargonnya sambil jalan, sehingga mereka memakai 20 kata di mana 1 sudah cukup.

**Perbaikannya** adalah bahasa bersama: sebuah dokumen yang membantu agent menerjemahkan jargon yang dipakai di proyek.

Contoh: ini [glosarium](https://github.com/mattpocock/course-video-manager/blob/076a5a7a182db0fe1e62971dd7a68bcadf010f1c/CONTEXT.md) dari repo `course-video-manager` miliknya (di commit yang dipatok itu masih bernama `CONTEXT.md`, sebelum skill mengganti konvensinya). Mana yang lebih mudah dibaca?

- **SEBELUM**: "Ada masalah ketika sebuah lesson di dalam section sebuah course dibuat 'nyata' (yaitu diberi tempat di file system)"
- **SESUDAH**: "Ada masalah dengan materialization cascade"

Keringkasan ini terbayar sesi demi sesi.

Ini sudah menyatu dalam [`/grill-with-docs`](https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md). Ini sesi grilling yang membantu kamu membangun bahasa bersama dengan AI, serta mendokumentasikan keputusan yang sulit dijelaskan dalam ADR. Sulit menjelaskan betapa kuatnya ini. Mungkin ini teknik paling keren di repo ini. Coba dan lihat sendiri.

> [!TIP]
> Bahasa bersama punya manfaat lain selain mengurangi kebertele-teleannya:
>
> - **Variabel, fungsi, dan file dinamai secara konsisten** memakai bahasa bersama
> - Akibatnya, **codebase lebih mudah dinavigasi** oleh agent
> - Agent juga **memakai lebih sedikit token untuk berpikir**, karena punya akses ke bahasa yang lebih ringkas

### #3: Kodenya tidak jalan

> "Selalu ambil langkah kecil yang disengaja. Kecepatan umpan balik adalah batas kecepatanmu. Jangan pernah mengambil tugas yang terlalu besar."
>
> David Thomas & Andrew Hunt, *The Pragmatic Programmer*

**Masalahnya.** Anggap kamu dan agent sudah selaras tentang apa yang dibangun. Apa yang terjadi bila agent _tetap_ menghasilkan kode jelek?

Saatnya melihat feedback loop kamu. Tanpa umpan balik tentang bagaimana kode yang dihasilkannya benar-benar berjalan, agent terbang buta.

**Perbaikannya**: kamu butuh rangkaian feedback loop yang lazim: tipe statis, akses browser, dan tes otomatis.

Untuk tes otomatis, loop red-green-refactor itu penting. Agent menulis tes yang gagal dulu, lalu memperbaikinya. Ini memberi agent tingkat umpan balik yang konsisten sehingga kodenya jauh lebih baik.

Matt membuat skill **[`/tdd`](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md)** yang bisa kamu masukkan ke proyek apa pun. Skill ini mendorong red-green-refactor dan memberi agent banyak panduan tentang tes yang baik dan buruk.

Untuk debugging, ia juga membuat skill **[`/diagnosing-bugs`](https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md)** yang membungkus praktik debugging terbaik dalam loop yang disiplin dan diberi gerbang fase demi fase.

### #4: Kita membangun bola lumpur

> "Berinvestasilah pada desain sistem _setiap hari_."
>
> Kent Beck, *Extreme Programming Explained*

> "Modul terbaik itu dalam (deep). Mereka memungkinkan banyak fungsionalitas diakses lewat antarmuka yang sederhana."
>
> John Ousterhout, *A Philosophy Of Software Design*

**Masalahnya.** Kebanyakan aplikasi yang dibangun dengan agent kompleks dan sulit diubah. Karena agent bisa mempercepat penulisan kode secara radikal, mereka juga mempercepat entropi perangkat lunak. Codebase menjadi kompleks dengan kecepatan yang belum pernah ada.

**Perbaikannya** adalah pendekatan baru yang radikal untuk pengembangan berbasis AI: peduli pada desain kode.

Ini tertanam di setiap lapisan skill ini:

- [`/to-spec`](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md) menanyai kamu tentang modul mana yang disentuh sebelum membuat spec

Dan yang terpenting, [`/improve-codebase-architecture`](https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md) memeriksa codebase untuk peluang memperdalam modul dan menyerahkan kandidatnya kepadamu. Disarankan menjalankannya pada codebase kamu setiap beberapa hari. Ini survei, bukan penyelamatan: pada codebase yang benar-benar tua ia akan menemukan kandidat nyata, tetapi tidak akan mengurai lumpurnya untukmu.

### Ringkasan

Dasar-dasar rekayasa perangkat lunak lebih penting dari sebelumnya. Skill ini adalah usaha terbaik untuk memadatkan dasar-dasar itu menjadi praktik yang bisa diulang, agar kamu merilis aplikasi terbaik dalam kariermu. Selamat menikmati.

## Referensi

Skill dibagi menurut satu sumbu: siapa yang bisa memanggilnya. Skill **dipanggil pengguna** hanya bisa dijangkau saat kamu mengetiknya (misalnya `/grill-me`), tugasnya mengorkestrasi. Skill **dipanggil model** bisa dipanggil oleh kamu _atau_ dijangkau otomatis oleh agent saat tugasnya cocok, dan memegang disiplin yang bisa dipakai ulang. Skill yang dipanggil pengguna boleh memanggil skill yang dipanggil model, tetapi tidak pernah skill lain yang dipanggil pengguna.

### Engineering

Skill yang dipakai harian untuk pekerjaan kode.

**Dipanggil pengguna**

- **[ask-matt](https://github.com/mattpocock/skills/blob/main/skills/engineering/ask-matt/SKILL.md)**: Tanyakan skill atau alur mana yang cocok dengan situasimu. Router atas skill yang dipanggil pengguna di repo ini.
- **[grill-with-docs](https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md)**: Sesi grilling yang juga membangun model domain proyekmu, mempertajam terminologi, dan memperbarui `GLOSSARY.md` serta ADR secara langsung.
- **[triage](https://github.com/mattpocock/skills/blob/main/skills/engineering/triage/SKILL.md)**: Memindahkan issue melalui state machine peran triase.
- **[improve-codebase-architecture](https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md)**: Memindai codebase untuk peluang pendalaman, menyajikannya sebagai laporan HTML visual, lalu meng-grill kamu tentang yang kamu pilih.
- **[setup-matt-pocock-skills](https://github.com/mattpocock/skills/blob/main/skills/engineering/setup-matt-pocock-skills/SKILL.md)**: Mengonfigurasi repo ini untuk skill engineering (issue tracker, label triase, tata letak dokumen domain). Jalankan sekali per repo sebelum memakai skill engineering lainnya.
- **[to-spec](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md)**: Mengubah percakapan saat ini menjadi spec dan menerbitkannya ke issue tracker. Tanpa wawancara, hanya merangkum yang sudah kamu bahas.
- **[to-tickets](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-tickets/SKILL.md)**: Memecah rencana, spec, atau percakapan menjadi sekumpulan tiket tracer-bullet, masing-masing menyatakan ketergantungannya, ditulis sebagai teks di file lokal atau sebagai tautan pemblokir asli di tracker sungguhan.
- **[implement](https://github.com/mattpocock/skills/blob/main/skills/engineering/implement/SKILL.md)**: Membangun pekerjaan yang dijelaskan oleh spec atau sekumpulan tiket, menjalankan `/tdd` pada seam yang disepakati dan menutup dengan `/code-review` sebelum commit.
- **[implement-spec](https://github.com/mattpocock/skills/blob/main/skills/engineering/implement-spec/SKILL.md)**: Mengimplementasikan seluruh spec di satu branch integrasi. Mengerjakan tiket sebagai graf tugas, menjalankan subagent implementer di seluruh frontier yang siap untuk konkurensi maksimal, lalu menutup dengan `/code-review`.
- **[wayfinder](https://github.com/mattpocock/skills/blob/main/skills/engineering/wayfinder/SKILL.md)**: Merencanakan pekerjaan besar, lebih dari yang muat dalam satu sesi agent, sebagai peta bersama berisi tiket keputusan di issue tracker, lalu menyelesaikannya satu per satu sampai jalan menuju tujuan jelas.
- **[retro](https://github.com/mattpocock/skills/blob/main/skills/engineering/retro/SKILL.md)**: Menyarankan perbaikan pada lingkungan coding agent (navigasi, pemeriksaan otomatis, standar kode, file pengarah, tooling) setelah sebuah sesi, dari yang paling parah.

**Dipanggil model**

- **[prototype](https://github.com/mattpocock/skills/blob/main/skills/engineering/prototype/SKILL.md)**: Membangun prototipe sekali pakai untuk menjawab pertanyaan desain, berupa satu file HTML yang bisa dibagikan untuk pertanyaan state/logika, atau beberapa variasi UI yang sangat berbeda yang bisa digonta-ganti dari satu rute.
- **[diagnosing-bugs](https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md)**: Loop diagnosis yang disiplin untuk bug sulit dan regresi performa: bangun feedback loop yang merah pada bug ini → minimalkan → hipotesis → instrumentasi → perbaiki → tes regresi.
- **[research](https://github.com/mattpocock/skills/blob/main/skills/engineering/research/SKILL.md)**: Menyelidiki pertanyaan terhadap sumber primer tepercaya dan menyimpan temuan sebagai file Markdown berkutipan di repo, dijalankan sebagai agent latar belakang.
- **[tdd](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md)**: Test-driven development dengan loop red-green-refactor. Membangun fitur atau memperbaiki bug satu irisan vertikal demi satu.
- **[domain-modeling](https://github.com/mattpocock/skills/blob/main/skills/engineering/domain-modeling/SKILL.md)**: Aktif membangun dan mempertajam model domain proyek: menantang istilah terhadap glosarium, menguji dengan skenario kasus tepi, dan memperbarui `GLOSSARY.md` serta ADR secara langsung.
- **[codebase-design](https://github.com/mattpocock/skills/blob/main/skills/engineering/codebase-design/SKILL.md)**: Disiplin dan kosakata bersama untuk merancang modul dalam: banyak perilaku di balik antarmuka kecil, ditempatkan pada seam yang bersih, dan bisa diuji lewat antarmuka itu.
- **[code-review](https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md)**: Review dua sumbu atas diff sejak titik tetap: **Standar** (apakah mengikuti standar kode repo, ditambah baseline code smell Fowler?) dan **Spec** (apakah setia mengimplementasikan issue/spec asalnya?), dijalankan sebagai sub-agent paralel agar keduanya tidak saling mencemari.
- **[pr](https://github.com/mattpocock/skills/blob/main/skills/engineering/pr/SKILL.md)**: Bentuk isi pull request: ringkasan sebagai visual terkecil yang menjelaskan perubahan, bukti sebelum/sesudah bahwa ia berfungsi, dan penilaian bahaya merge (pintu satu arah atau dua arah, serta radius dampak).
- **[wizard](https://github.com/mattpocock/skills/blob/main/skills/engineering/wizard/SKILL.md)**: Membuat wizard bash interaktif yang memandu manusia melalui langkah yang hanya bisa dilakukan mereka: menyiapkan infrastruktur, menyetel kredensial atau secret CI, menelusuri dasbor pihak ketiga yang asing, atau menjalankan migrasi atau cutover sekali jalan.

### Productivity

Alat alur kerja umum, tidak khusus kode.

**Dipanggil pengguna**

- **[grill-me](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md)**: Diwawancarai tanpa henti tentang sebuah rencana atau desain sampai setiap cabang pohon desain terselesaikan.
- **[handoff](https://github.com/mattpocock/skills/blob/main/skills/productivity/handoff/SKILL.md)**: Memadatkan percakapan saat ini menjadi dokumen serah terima agar agent lain bisa melanjutkan pekerjaannya.
- **[teach](https://github.com/mattpocock/skills/blob/main/skills/productivity/teach/SKILL.md)**: Mengajari pengguna keterampilan atau konsep baru selama beberapa sesi, memakai direktori saat ini sebagai ruang kerja belajar yang menyimpan state.
- **[to-questionnaire](https://github.com/mattpocock/skills/blob/main/skills/productivity/to-questionnaire/SKILL.md)**: Mengubah keputusan yang tidak bisa kamu jawab sendiri menjadi kuesioner Markdown untuk satu orang yang bisa, diisi secara asinkron atau bersama dalam rapat. Skill ini menanyai kamu tentang pengirimannya (untuk siapa, apa yang kamu butuhkan kembali), bukan subjeknya.
- **[wait-what](https://github.com/mattpocock/skills/blob/main/skills/productivity/wait-what/SKILL.md)**: Jalankan saat sebuah pesan tidak tersampaikan. Agent menyampaikan ulang dengan konteks yang kamu lewatkan, dalam bahasa sederhana, memakai kosakata `GLOSSARY.md` milikmu.

**Dipanggil model**

- **[grilling](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md)**: Mewawancarai pengguna tanpa henti tentang rencana, keputusan, atau ide sampai setiap cabang pohon desain terselesaikan. Primitif wawancara yang bisa dipakai ulang di balik `grill-me`, `grill-with-docs`, `triage`, `wayfinder`, dan `improve-codebase-architecture`.
- **[writing-for-agents](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md)**: Menulis dokumen untuk agent: skill, AGENTS.md/CLAUDE.md, dan dokumen apa pun yang dijangkau agent lewat sebuah penunjuk.
