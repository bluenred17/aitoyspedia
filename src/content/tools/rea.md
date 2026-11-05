---
title: "REA: Reverse Engineer Anything"
summary: "Satu MCP server dan CLI untuk membongkar cara kerja biner, aplikasi Electron, assembly .NET, APK, dan situs web, lengkap dengan bukti dan batasan tiap kesimpulan."
category: coding
tags: [reverse-engineering, mcp, biner, electron, ghidra, hopper, apk, analisis]
surfaces: [claude-code]
source_url: "https://github.com/morluto/rea/blob/main/README.md"
repo: morluto/rea
stars: 431217
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
setup: |
  npx rea-agents setup
---

# REA: Reverse Engineer Anything

### Satu MCP untuk reverse engineering biner, aplikasi, dan perilaku saat berjalan.

**Lihat fitur yang kamu suka. Pahami cara kerjanya sampai ke tingkat biner.**

Situs: [rea.tools](https://rea.tools/) · [Panduan](https://rea.tools/guides/) · [Showcase](https://rea.tools/showcase/)

> [!IMPORTANT]
> Ambil REA hanya dari [morluto/rea](https://github.com/morluto/rea), [rea.tools](https://rea.tools/), atau paket npm [rea-agents](https://www.npmjs.com/package/rea-agents). Ikuti tautan instalasi dan rilis dari sumber resmi ini. Nama repositori yang mirip atau README salinan tidak membuktikan bahwa sebuah unduhan itu resmi.

![REA menjalankan jembatan analisisnya di dalam Hopper saat memeriksa biner native](https://raw.githubusercontent.com/morluto/rea/main/docs/assets/rea-hopper-analysis.png)

---

Melihat fitur di sebuah aplikasi yang ingin kamu punya di produkmu sendiri? Minta agent kamu menyelidikinya dengan REA. Agent bisa memeriksa aplikasi tanpa kode sumbernya, menjelaskan cara kerja fitur itu, menunjukkan buktinya, lalu membuat versi untuk proyekmu.

REA menghubungkan agent kamu ke alat untuk memeriksa biner native, aplikasi JavaScript dan Electron, assembly .NET, serta situs web. Alat yang sama bisa dipakai dari terminal. Analisis berjalan secara lokal, dan hasilnya menyertakan bukti serta batasan di balik setiap kesimpulan.

Setup mendaftarkan REA ke agent kamu dan memasang instruksi alur kerja yang sesuai. Analisis native bisa memakai instalasi Hopper, Ghidra, IDA, atau Kuna yang sudah ada. Setup juga bisa memasang Hopper dengan persetujuanmu. Analisis JavaScript statis tidak membutuhkan mesin analisis native.

## Mulai cepat

Di Linux, peluncuran Ghidra, JADX, alat firmware, dan analisis JavaScript/Electron statis membutuhkan `ps` yang kompatibel dengan procps di `PATH` REA untuk memeriksa kepemilikan proses. Langkah pemulihannya ada di `docs/installation.md` pada bagian "Linux owned-process prerequisite".

### Siapkan agent kamu

Dengan Node.js dan npm terpasang, jalankan:

```bash
npx rea-agents setup
```

Pilih agent kamu, tinjau perubahan yang diusulkan, lalu setujui. Setup menambahkan MCP server REA dan instruksi alur kerja yang sesuai, dengan cadangan konfigurasi yang sudah ada. Setelah itu mulai ulang agent kamu. Setup mencatat runtime yang dipilih dan skrip masuk REA secara langsung. Kalau REA diperoleh lewat package runner, biarkan entri cache-nya tetap ada. Jalankan pengambilan paket dari direktori tepercaya di luar proyek target. Detail instalasi dan pemulihan ada di panduan setup di bawah.

Setup mendukung Claude Code, Codex, Cursor, Gemini CLI, Grok Build, dan [agent lain](https://github.com/morluto/rea/blob/main/docs/installation.md#supported-agents). Lihat [instalasi dan setup](https://github.com/morluto/rea/blob/main/docs/installation.md) untuk konfigurasi provider, pendaftaran MCP manual, dan pemasangan plugin Claude Code/Codex.

MCP memakai skema input ringkas secara bawaan untuk mengurangi beban konteks. Setel `REA_MCP_INPUT_SCHEMA_PROFILE=full` pada pendaftaran MCP kamu bila membutuhkan panduan field lengkap dan detail validasi bertingkat. Kedua profil tetap memuat seluruh alat dan validasi server yang kanonik. Lihat "Compact input schema profile" di panduan kontrak MCP.

Skema output lengkap diiklankan secara bawaan. Kalau klien kamu membatasi ukuran frame `tools/list`, setel `REA_MCP_OUTPUT_SCHEMA_PROFILE=compact` untuk membatasi tiap skema output, atau `off` untuk menghilangkan skema output sama sekali. Kedua pengaturan tetap mempertahankan validasi server dan hasil terstruktur yang lengkap. Lihat "Output schemas" di panduan kontrak MCP.

### Tanyakan ke agent kamu

```text
Understand how search works in the Notes app, show me the evidence, and build a
similar feature for my project.
```

Ganti Notes dengan aplikasi target dan fitur yang ingin kamu pahami.

### Pakai dari terminal

Periksa direktori aplikasi JavaScript/Electron yang sudah diekstrak, atau ASAR:

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

Hasilnya mencakup modul, impor, batas Electron, beserta buktinya. Ganti path dengan targetmu, misalnya `"D:/apps/example"` di Windows.

Untuk memasang perintah `rea` agar dipakai rutin:

```bash
npm install --global rea-agents
rea --help
```

Untuk analisis native, konfigurasikan provider lebih dulu. Lihat [panduan CLI dan Evidence](https://github.com/morluto/rea/blob/main/docs/cli.md) untuk perintah native, pemilihan provider, snapshot, dan scripting.

### Memperbarui REA

REA berubah dengan cepat, dan rilis baru sering memuat perbaikan bug. Jaga instalasimu tetap mutakhir.

Untuk CLI yang dipasang dengan `npm install --global` atau `bun add --global`:

```bash
rea update
```

`rea --update` adalah alias untuk alur terverifikasi ini dan menerima flag output global yang sama. Pakai `rea update` bila digabung dengan kontrol perintah lain.

Perintah updater menyimpan paling banyak 4 MiB stdout dan stderr gabungan. Balasan metadata yang terlalu besar ditolak setelah perintah selesai. Instalasi verbose tetap berjalan dengan diagnostik terbatas. Keluaran progres untuk manusia menghormati backpressure terminal dan menunggu penulisan yang sudah diajukan selesai.

Pembaruan Bun global membutuhkan Bun 1.2.17 atau lebih baru. Dengan Bun yang lebih lama, perbarui Bun secara manual sebelum menjalankan `rea update`.

Untuk menyegarkan pendaftaran agent dan skill, jalankan perintah setup yang dicetak oleh update.

Kalau memakai `npx`, perbarui setup agent kamu dengan:

```bash
npx rea-agents@latest setup
```

Tinjau perubahan setup dan mulai ulang agent kamu. Untuk perintah CLI sekali pakai, gunakan `npx rea-agents@latest` diikuti perintahnya. Dengan Bun, pakai `bunx rea-agents@latest` sebagai pengganti `npx rea-agents@latest`.

## Cara kerja REA

Agent kamu memanggil REA lewat MCP untuk memeriksa target dan menelusuri kode yang relevan. REA mengembalikan temuan beserta buktinya. Agent memakainya untuk mengajukan pertanyaan lanjutan, menjelaskan perilaku, atau menulis dan menguji implementasi. Perintah CLI memakai alur kerja yang sama.

![Alur investigasi REA: agent bertanya tentang target lokal, REA memeriksa dan menelusurinya dengan alat analisis, lalu agent memakai kode, referensi, dan hal yang belum diketahui untuk menjelaskan, mengimplementasikan, dan menguji.](https://raw.githubusercontent.com/morluto/rea/main/website/public/assets/figures/rea-investigation-flow.svg)

[Buka gambar ukuran penuh](https://raw.githubusercontent.com/morluto/rea/main/website/public/assets/figures/rea-investigation-flow.svg).

## Apa yang bisa dianalisis

REA membutuhkan Node.js 22.x (>=22.23.4), 24.x (>=24.22.1), atau 26.12.1+, ditambah npm. Alat tambahan dan dukungan host bergantung pada targetnya:

| Target | Yang dikembalikan REA | Kebutuhan dan panduan |
| --- | --- | --- |
| Instalasi desktop | Kandidat runtime, file pendukung, penanda komponen, dan probe berikutnya | Pemeriksaan direktori/header terbatas bawaan; [aplikasi desktop](https://github.com/morluto/rea/blob/main/docs/desktop-applications.md) |
| Biner native | Pseudocode, assembly, string, simbol, pemanggilan, dan referensi | Hopper, Ghidra, IDA, atau Kuna; [analisis native](https://github.com/morluto/rea/blob/main/docs/native-investigation.md) |
| Tata letak ELF offline | Section, segment, simbol/relokasi asli, dan kandidat mitigasi statis | pwntools dari pemanggil di Linux x64; [diagnostik biner](https://github.com/morluto/rea/blob/main/docs/binary-diagnostics.md) |
| Biner Go | Versi compiler tertanam, modul, penggantian, dan pengaturan build | Pemeriksaan statis ELF/PE/Mach-O thin bawaan; tidak perlu Go |
| Objek kode GPU | Target CUDA/HIP, parameter dan sumber daya kernel terpilih, teks PTX yang tersimpan | Pemeriksaan statis ELF/PE/fatbin/CUBIN/PTX bawaan; [objek kode GPU](https://github.com/morluto/rea/blob/main/docs/gpu-code-objects.md) |
| Artefak model | Metadata GGUF / safetensors, deklarasi tensor, dan total turunan | Pemeriksaan header bawaan; hash file penuh opsional; [file model](https://github.com/morluto/rea/blob/main/docs/model-artifacts.md) |
| Metadata IL2CPP | Image assembly Unity global-metadata.dat, nama tipe dan method, serta rentang indeks | Decoding statis bawaan versi 24, 27, 29, 31, dan 39; tidak perlu Unity |
| Godot PCK | Inventaris dan ekstraksi arsip, fakta header/direktori asli, dan identitas konten terpilih | Format statis 2, 3, dan 4 bawaan; tidak perlu Godot |
| Biner Rust | Nama crate, versi, sumber, dan hubungan dependensi cargo-auditable yang tertanam | Pemeriksaan statis ELF/PE/Mach-O thin bawaan; [biner Rust](https://github.com/morluto/rea/blob/main/docs/rust-binaries.md) |
| Sertifikat PE | Entri Authenticode WIN_CERTIFICATE dan field identitas penanda tangan PKCS#7/X.509 | Pemeriksaan statis PE bawaan; [sertifikat PE](https://github.com/morluto/rea/blob/main/docs/pe-certificates.md) |
| Impor PE | Nama DLL impor dan delay-load, ordinal, RVA IAT, dan hash impor pefile | Pemeriksaan statis PE bawaan; [impor PE](https://github.com/morluto/rea/blob/main/docs/pe-imports.md) |
| Catatan ELF | Pemilik, tipe, dan field GNU build-id serta ABI-tag dari PT_NOTE/SHT_NOTE | Pemeriksaan statis ELF bawaan; [catatan ELF](https://github.com/morluto/rea/blob/main/docs/elf-notes.md) |
| Crash Apple IPS | Metadata .ips, thread, image, register, dan kelas crash yang terdokumentasi | Pemeriksaan JSON statis bawaan; [Apple IPS](https://github.com/morluto/rea/blob/main/docs/apple-ips.md) |
| Modul kernel Linux | Kunci .modinfo, CRC __versions, keberadaan this_module, dan trailer tanda tangan | Pemeriksaan statis ELF bawaan; [modul kernel](https://github.com/morluto/rea/blob/main/docs/kernel-modules.md) |
| Erlang BEAM | Chunk IFF, atom, ekspor, impor, lambda, dan header Code | Pemeriksaan statis BEAM bawaan; [Erlang BEAM](https://github.com/morluto/rea/blob/main/docs/erlang-beam.md) |
| Artefak WASM | Validasi, section, bentuk WAT impor/ekspor yang tepat, dan WAT hasil decode | WABT 1.0.42 dari pemanggil; `inspect_wasm_artifact` |
| Bytecode EVM | Selector dispatch, offset byte, argumen yang disimpulkan, dan mutabilitas | Carrier raw/hex lokal di Linux x64; [panduan EVM offline](https://github.com/morluto/rea/blob/main/docs/evm-bytecode.md) |
| Database SQLite | Tabel, kolom, indeks, view, trigger, dan baris tabel biasa terpilih | Snapshot database/WAL lokal; Node.js 24.x >=24.15 atau 26+ dengan batas SQLite native |
| Crash Linux yang terekam | Catatan mentah, register/sinyal tiap thread yang terekam, dan kandidat mapping opsional | pwntools dari pemanggil di Linux x64; GDB/pwndbg opsional; [crash terekam](https://github.com/morluto/rea/blob/main/docs/recorded-crashes.md) |
| JavaScript / Electron | Modul, impor, source map, rute, IPC, dan hubungan add-on native | Node.js dan npm; Linux: `ps` kompatibel procps; [analisis aplikasi](https://github.com/morluto/rea/blob/main/docs/javascript-application-workflows.md) |
| Situs web | Struktur halaman, skrip, observasi jaringan, dan tangkapan layar yang diminta | Browser keluarga Chrome; [analisis browser](https://github.com/morluto/rea/blob/main/docs/browser-observation.md) |
| Tangkapan jaringan tersimpan | Permintaan, respons, payload yang terpapar, dan lokasi sumber | HAR atau Fiddler Everywhere SAZ; mitmdump di Linux untuk mitmproxy native; [panduan tangkapan](https://github.com/morluto/rea/blob/main/docs/web-network-captures.md) |
| Assembly .NET | Metadata, instruksi CIL, dependensi native yang dideklarasikan, dan perbandingan build | Tidak ada (hanya statis); [panduan kode terkelola](https://github.com/morluto/rea/blob/main/docs/managed-code-analysis.md) |
| APK Android | Deklarasi manifest, kelas, method hasil dekompilasi, dan referensi | JADX headless dan JDK penuh di Linux/macOS/Windows x64; [panduan Android](https://github.com/morluto/rea/blob/main/docs/android-analysis.md) |
| Tanda tangan APK | Penanda tangan v1/v2/v3/v3.1, sidik jari sertifikat, rotasi kunci, dan konsistensi digest | Tidak ada (hanya statis); `inspect_apk_signature` |
| Perangkat Android | Perangkat, paket, proses, log, dump, tangkapan layar, dan transfer APK/file | adb dari pemanggil (emulator atau perangkat keras); [panduan ADB](https://github.com/morluto/rea/blob/main/docs/adb-device-analysis.md) |
| Proyek JEB | Unit proyek berbasis engine, digest artefak, dan pseudo-code tipe/method | Klien JEB yang dijalankan pemanggil dan melayani MCP, dipilih dengan REA_JEB_MCP_URL; [panduan JEB](https://github.com/morluto/rea/blob/main/docs/jeb-analysis.md) |
| Resource Android | Manifest yang didecode, tabel string, locale, dan fakta versi | Launcher Apktool dari pemanggil; [panduan resource](https://github.com/morluto/rea/blob/main/docs/apktool-resource-analysis.md) |
| Aplikasi Flutter | Hash snapshot Dart, digest library per ABI, dan asal build engine | Tidak ada (parsing APK statis); [panduan Flutter](https://github.com/morluto/rea/blob/main/docs/flutter-analysis.md) |
| Firmware | Region, hasil ekstraksi, dan serah terima ke analisis native | Binwalk / Unblob di Linux; [panduan firmware](https://github.com/morluto/rea/blob/main/docs/firmware-analysis.md) |
| Paket yang terekam | Field terpilih, nilai berulang, filter, dan aturan decode-as | Linux: TShark 4.x + prlimit; [panduan tangkapan](https://github.com/morluto/rea/blob/main/docs/packet-captures.md) |
| Ringkasan paket | Endpoint, DNS, TLS SNI, distribusi protokol, dan permintaan HTTP | tshark dan capinfos dari pemanggil (terverifikasi di Linux); [panduan pcap](https://github.com/morluto/rea/blob/main/docs/pcap-analysis.md) |
| Sinyal logika yang terekam | Anotasi decoder, rentang sampel, dan diagnostik | Linux: sigrok-cli 0.7.2 + prlimit; [rekaman sinyal](https://github.com/morluto/rea/blob/main/docs/signal-recordings.md) |
| Paket dan resource | Inventaris file, digest, plist, anatomi bundle Apple, dan resource hasil ekstraksi | [Panduan artefak dan JavaScript](https://github.com/morluto/rea/blob/main/docs/javascript-artifact-reconstruction.md), [aplikasi Apple](https://github.com/morluto/rea/blob/main/docs/apple-application-analysis.md) |
| Perilaku proses | Keluaran terminal, interaksi, observasi exit dan filesystem, serta perbandingan run | Linux/macOS dengan PTY native; [process capture](https://github.com/morluto/rea/blob/main/docs/process-capture.md) |
| Executable PyInstaller | Anggota CArchive, versi Python, skrip masuk, dan bytecode hasil ekstraksi | Tidak ada (hanya statis); [aplikasi Python yang dikemas](https://github.com/morluto/rea/blob/main/docs/python-packaged-applications.md) |

Pemeriksaan JavaScript dan .NET statis membaca file yang diberikan tanpa menjalankan aplikasinya. Perekaman runtime menjalankan atau berinteraksi dengan target yang dipilih memakai izin penggunamu. Setiap panduan runtime menjelaskan efeknya.

Untuk inspeksi biner native offline, REA juga mendukung GNU objdump dan Rizin yang disediakan pemanggil. Lihat [panduan alat reverse-engineering](https://github.com/morluto/rea/blob/main/docs/reverse-engineering-tools.md) untuk setup provider, perintah CLI, dan batasan Evidence. REA tidak memasang atau memperbarui keduanya.

Format native dan dukungan host berbeda-beda per provider. Lihat [setup Hopper dan Ghidra](https://github.com/morluto/rea/blob/main/docs/installation.md#hopper), [panduan IDA](https://github.com/morluto/rea/blob/main/docs/ida-provider.md) (termasuk jembatan MCP native opsional), [panduan dekompiler Kuna](https://github.com/morluto/rea/blob/main/docs/kuna-provider.md), dan [dukungan Ghidra Windows eksperimental](https://github.com/morluto/rea/blob/main/docs/windows-ghidra-p0.md). Ghidra juga mendukung [analisis DOS 16-bit](https://github.com/morluto/rea/blob/main/docs/ghidra-dos.md). Untuk biner besar, naikkan batas waktu startup provider dengan `REA_GHIDRA_STARTUP_TIMEOUT_MS` atau `REA_HOPPER_STARTUP_TIMEOUT_MS`. Untuk memilih provider, lihat [panduan CLI](https://github.com/morluto/rea/blob/main/docs/cli.md#choose-a-provider). Periksa [ketersediaan rilis](https://github.com/morluto/rea/blob/main/docs/installation.md#released-package-and-main) untuk fitur yang ditambahkan setelah rilis npm terbaru.

## Showcase

### DX-Ball: merekonstruksi perhitungan sound-pan

Ikuti pemanggilan suara sampai ke helper posisi-ke-pan, periksa instruksinya, lalu ubah pseudocode yang belum lengkap menjadi C. Rekonstruksi ini lulus 3.205 kasus x86 asli dan mereproduksi seluruh 63 byte fungsi hasil kompilasi.

[Baca studi kasus](https://rea.tools/showcase/dx-ball/) · [Repositori rekonstruksi](https://github.com/N0zoM1z0/dx-ball)

### Notion: menelusuri jembatan clipboard Electron

Temukan API clipboard di renderer, ikuti lewat preload dan IPC ke proses utama, lalu periksa format clipboard yang kaya.

[Baca studi kasus](https://rea.tools/showcase/notion/)

### TH04: memulihkan perhitungan cincin peluru DOS

Periksa instruksi 16-bit game PC-98 aslinya, pulihkan perhitungan sudut tetap dan sudut membidik, lalu bandingkan C++ hasil rekonstruksi dengan keluaran compiler historisnya.

[Baca studi kasus](https://rea.tools/showcase/th04/) · [Repositori rekonstruksi](https://github.com/N0zoM1z0/th04)

## Membangun lingkungan RL

Beri agent AI lingkungan lokal untuk berlatih tugas seperti menemukan masalah atau membuat folder, tanpa menjalankan aplikasi aslinya. Pakai untuk reinforcement learning (RL) atau untuk menguji seberapa baik agent menyelesaikan tugas.

REA mengubah permintaan dan respons API yang terekam menjadi alat yang bisa dipanggil agent. Lingkungan memakai data rekaman dan hanya mendukung perubahan bila rekaman mengonfirmasi efeknya.

Dengan REA sudah terpasang di agent kamu, ganti contoh URL dan tugas folder di bawah dengan milikmu:

```text
Use REA to build an RL environment from my test web app at
http://127.0.0.1:3000.
Cover listing, creating, renaming, and deleting folders. You may create and
remove test folders. Leave existing data unchanged.
Save it in a folder named my-env. Check which operations work and tell me
how to run it.
```

### Pakai baris perintah

Pakai perintah ini bila kamu sudah punya file berisi permintaan dan respons browser aplikasi yang terekam. Menjalankan hasilnya juga membutuhkan AgentEnv dan Docker.

```sh
rea environment-build ./session.har ./my-env --name my-env --json
agent-env run ./my-env
```

REA mengekspor lingkungan yang bisa dijalankan beserta tes dasar untuk memeriksa bahwa lingkungan itu menyala dan merespons. Pakai bersama framework RL kamu untuk menentukan tujuan tugas, menambahkan pemeriksaan reward, dan menjalankan pelatihan.

[Bangun lingkungan](https://rea.tools/guides/rl-environments/) · [Referensi lingkungan](https://github.com/morluto/rea/blob/main/docs/agent-environments.md)

## FAQ

**Agent mana yang bisa memakai REA?** Agent apa pun yang mendukung MCP server lokal. Setup mengonfigurasi [agent yang didukung](https://github.com/morluto/rea/blob/main/docs/installation.md#supported-agents). Klien lain bisa memakai [pendaftaran MCP manual](https://github.com/morluto/rea/blob/main/docs/installation.md#mcp-registry).

**Apakah saya perlu mesin analisis native?** Analisis native mendalam memakai Hopper, Ghidra, IDA, atau Kuna, tergantung target dan operasinya. Inspeksi JavaScript dan .NET statis berjalan tanpa mesin analisis native. Setup bisa memasang Hopper setelah disetujui. Ghidra, IDA, dan Kuna memakai instalasi yang sudah kamu punya. Lihat [setup provider](https://github.com/morluto/rea/blob/main/docs/installation.md#hopper) untuk pilihan dan target yang didukung.

**Apakah saya perlu menjalankan Hopper dulu?** REA menjalankan Hopper saat sebuah operasi membutuhkannya. Di macOS, dialog saat pertama kali jalan mungkin meminta kamu memilih mode demo atau mengaktifkan lisensi. Selesaikan dialog itu di sesi pengguna yang sama sebelum operasi CLI/MCP pertama atau pekerjaan tanpa pengawasan. Buka Hopper secara manual bila perlu. Lihat [startup Hopper dan pemecahan masalah](https://github.com/morluto/rea/blob/main/docs/installation.md#launcher-paths-and-troubleshooting).

**Apa fungsi memasang skill dari skills.sh?** Skill menyediakan instruksi investigasi untuk agent kamu. Pakai `npx rea-agents setup` untuk mendaftarkan MCP server REA dan memasang instruksi yang sesuai, lalu mulai ulang agent kamu. Lihat [instalasi khusus skill](https://github.com/morluto/rea/blob/main/docs/installation.md#skill-only-installation).

**Kode apa yang dikembalikan REA?** Analisis native mengembalikan pseudocode dan assembly. Analisis JavaScript/Electron memulihkan modul beserta hubungannya. Agent kamu memakai temuan ini untuk menulis dan menguji implementasi. Showcase di atas memberi contoh nyata.

**Apakah REA mengunggah aplikasi saya?** REA menganalisis target secara lokal. Agent kamu menerima hasil alatnya, dan penyedia modelnya punya kebijakan datanya sendiri.

**Apa yang harus dilakukan bila saya menemui bug?** Perbarui dulu, karena rilis terbaru mungkin sudah memperbaikinya.

Untuk CLI yang dipasang dengan `npm install --global` atau `bun add --global`:

```bash
rea update
```

Untuk setup agent lewat `npx`:

```bash
npx rea-agents@latest setup
```

Kalau memakai agent, selesaikan penyegaran setup lalu mulai ulang agent. Coba ulang tugas yang sama. Bila masalah berlanjut, [buka issue](https://github.com/morluto/rea/issues) dengan menyertakan versi REA, jenis target, langkah untuk mereproduksi, dan keluaran error.

## Dokumentasi

Mulai dari [panduan langkah demi langkah](https://rea.tools/guides/) di situs. Untuk opsi, prasyarat, dan kontrak hasil yang tepat:

- [Instalasi dan setup](https://github.com/morluto/rea/blob/main/docs/installation.md): pendaftaran agent, konfigurasi provider, pembaruan, dan uninstall.
- [Kesiapan dan pemecahan masalah](https://github.com/morluto/rea/blob/main/docs/installation.md#check-readiness-for-your-task): mendiagnosis satu agent atau mesin analisis.
- [CLI dan Evidence](https://github.com/morluto/rea/blob/main/docs/cli.md): perintah, pemilihan provider, snapshot, impor/ekspor, dan status exit.
- [Kontrak MCP](https://github.com/morluto/rea/blob/main/docs/mcp-contracts.md) dan [prompt agent](https://github.com/morluto/rea/blob/main/docs/mcp-prompts.md): hasil alat, sesi, dan investigasi terpandu.
- [Katalog alat](https://github.com/morluto/rea/blob/main/docs/mcp-contracts.md#generated-catalog): inventaris alat, provider, dan perintah CLI yang dihasilkan otomatis.
- [Roadmap](https://github.com/morluto/rea/blob/main/docs/roadmap.md): pekerjaan yang direncanakan dan pelacak kapabilitas.

Laporkan kerentanan lewat [SECURITY.md](https://github.com/morluto/rea/blob/main/SECURITY.md).

## Penafian

Lihat [DISCLAIMER.md](https://github.com/morluto/rea/blob/main/DISCLAIMER.md) untuk panduan penggunaan yang bertanggung jawab.

Sikap proyek terhadap penggunaan ilegal atau tanpa izin berlaku untuk semua versi, saluran distribusi, dan platform REA. Setiap salinan tetap memegang lisensinya masing-masing.

REA ditujukan untuk riset yang sah, pendidikan, interoperabilitas, pelestarian perangkat lunak, dan analisis perangkat lunak yang kamu miliki atau yang kamu berwenang untuk memeriksanya.

## Lisensi

[MIT](https://github.com/morluto/rea/blob/main/LICENSE)

Kode buatan REA berlisensi MIT. Materi pihak ketiga tetap memegang lisensi dan pemberitahuan hak ciptanya masing-masing. Lihat [Third-party notices](https://github.com/morluto/rea/blob/main/THIRD_PARTY_NOTICES.md) untuk inventaris dependensi, teks lisensi yang dipertahankan, dan ketentuan alat eksternal.

**Kamu harus memperoleh secara legal dan berwenang memakai alat komersial**, termasuk dekompiler IDA Pro / Hex-Rays, Hopper, dan JEB, sesuai lisensinya masing-masing. REA tidak memberikan lisensi alat, kunci, atau hak aktivasi apa pun. Versi percobaan dan demo tetap tunduk pada ketentuan vendor, termasuk pembatasan pengguna, fitur, otomatisasi, dan pembagian keluaran. Salinan bajakan, kunci curian, pembagian kunci tanpa izin, dan pengabaian pembatasan lisensi tidak diizinkan. Panduan ini tidak mengubah MIT atau lisensi pihak ketiga.
