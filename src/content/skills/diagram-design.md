---
title: "Diagram Design"
summary: "Skill agent yang menggambar diagram sebagai satu file HTML + SVG mandiri dengan gaya editorial sesuai merek kamu: 45 jenis diagram, tanpa bayangan, tanpa tampilan Mermaid generik."
category: productivity
tags: [diagram, svg, html, desain, arsitektur, flowchart, mermaid, drawio, editorial]
surfaces: [claude-code]
source_url: "https://github.com/cathrynlavery/diagram-design/blob/main/README.md"
repo: cathrynlavery/diagram-design
stars: 65061
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
trigger: "Saat kamu meminta diagram (arsitektur, flowchart, sequence, quadrant, dan 40+ jenis lain) atau meminta menggambar ulang file Mermaid, draw.io, atau Excalidraw."
install: |
  /plugin marketplace add cathrynlavery/diagram-design
  /plugin install diagram-design@diagram-design
---

# Diagram Design

**Skill agent yang menggambar diagram sebagai satu file HTML + SVG mandiri, dalam merek kamu. 45 jenis diagram. Tanpa bayangan. Tanpa tampilan Mermaid yang generik.**

Tautan: [Situs](https://diagramdesign.dev) · [Galeri](https://cathrynlavery.github.io/diagram-design/) · [Changelog](https://github.com/cathrynlavery/diagram-design/blob/main/CHANGELOG.md)

Minta agent kamu dengan kata-kata biasa:

- *"Make me an architecture diagram of my app: frontend, backend, database, Redis cache."*
- *"I need a quadrant showing Q2 projects by impact vs effort."*
- *"Give me a sequence of a bearer call with token refresh on 401."*
- *"Onboard diagram-design to https://yoursite.com"* (mengambil palet dan font situsmu agar setiap diagram sesudahnya cocok dengan situs kamu)

Agent memilih jenisnya, menyatakan rencananya, dan menulis satu file `.html` yang bisa kamu buka dengan klik dua kali.

---

## Pasang

Bekerja dengan host mana pun yang membaca Agent Skills, termasuk Cursor, Claude Code, Codex, Qoder, GitHub Copilot, Gemini CLI, Cline, Windsurf, dan Amp:

```bash
npx skills add cathrynlavery/diagram-design
```

Di Claude Code, marketplace plugin memberimu pembaruan dan slash command:

```text
/plugin marketplace add cathrynlavery/diagram-design
/plugin install diagram-design@diagram-design
```

Build resmi hanya datang dari repositori ini. LittleMight, perusahaan Cathryn Lavery, menerbitkan daftar direktori plugin; daftar dengan nama lain adalah salinan tidak resmi. [PRIVACY.md](https://github.com/cathrynlavery/diagram-design/blob/main/PRIVACY.md) mencantumkan apa yang dikirim skill ini lewat jaringan.

### Claude Code: aktifkan pembaruan otomatis

Setelah memasang, jalankan `/plugin`, buka **Marketplaces**, pilih **diagram-design**, dan pilih **Enable auto-update**. Claude Code menonaktifkan pembaruan otomatis secara default untuk marketplace pihak ketiga; setelah sakelar ini, ia menyegarkan marketplace dan plugin terpasang di latar belakang setelah startup. Jalankan `/reload-plugins` bila diminta, atau biarkan sesi berikutnya memuat pembaruan.

### Cursor, Cline, Gemini CLI, Windsurf, Amp, Zed, Warp, Roo, Kilo, dan host Agent Skills lain

CLI [`skills`](https://skills.sh) lintas agent menemukan repositori ini, mendeteksi `skills/diagram-design/SKILL.md`, dan memasang seluruh skill (`references/`, `assets/`, `scripts/`) ke setiap root host yang kamu pilih, termasuk milik Cursor:

```bash
npx skills add cathrynlavery/diagram-design
```

Bila root yang dipilih mengarah ke lebih dari satu direktori skills, CLI menanyakan metode pemasangan dan merekomendasikan **Symlink**: satu salinan kanonik yang ditautkan ke tiap root, sehingga pembaruan berikutnya menjangkau semuanya sekaligus. Tambahkan `--copy` untuk salinan terpisah per host. Pilihan yang mengarah ke satu direktori saja disalin, karena bedanya tidak berarti di situ. Bila symlink tidak tersedia (Windows tanpa Developer Mode), CLI jatuh ke salinan dan melaporkan root mana yang disalin.

Ini pemasangan mandiri, terpisah dari marketplace di bawah: ia tidak mengikuti pembaruan marketplace secara otomatis. Tarik pembaruan yang sudah di-merge dengan `npx skills update diagram-design`. Ia juga hanya memasang Agent Skill, sehingga permukaan perintah `/export-diagram`, `/import-mermaid`, `/profile`, dan `/doctor` tetap di paket native. Di host yang punya salah satu marketplace di bawah, pilih marketplace.

> **Migrasi sekali jalan:** salinan `npx skills add` mandiri yang sudah ada tidak akan otomatis mengikuti marketplace Codex. Hapus salinan mandiri itu, lalu pakai perintah marketplace Codex. Demikian juga, hapus salinan Cowork pribadi dan pasang ulang Diagram Design dari marketplace organisasimu. Kenaikan versi marketplace berikutnya lalu mengalir lewat jalur pembaruan native tiap klien.

### Codex

```bash
codex plugin marketplace add cathrynlavery/diagram-design
codex plugin add diagram-design@diagram-design
```

Codex menyegarkan marketplace Git yang dikonfigurasi saat startup. Untuk mengambil segera, jalankan `codex plugin marketplace upgrade diagram-design` dan mulai sesi baru.

### Qoder

Clone repositori, validasi plugin native, dan pasang secara lokal:

```bash
git clone https://github.com/cathrynlavery/diagram-design.git
qoder plugins validate ./diagram-design
qoder plugins install ./diagram-design
qoder plugins list
```

Qoder memuat pohon kanonik `skills/diagram-design/` dan definisi perintah bersama secara langsung; tidak ada salinan khusus Qoder yang dipelihara. Untuk Qoder IDE, bangun ZIP terbatas dari permukaan plugin yang dilacak dan impor lewat **Extensions → Plugins → Add Plugins → Upload Plugin**:

```bash
git -C diagram-design archive --format=zip \
  --output=../diagram-design-qoder.zip HEAD \
  .qoder-plugin commands skills LICENSE
```

Mulai tugas baru setelah memasang atau memperbarui plugin.

### GitHub Copilot

```bash
copilot plugin marketplace add cathrynlavery/diagram-design
copilot plugin install diagram-design@diagram-design
```

Copilot memasang skill Diagram Design bersama kemampuan doctor, export, import, dan profile dari marketplace repositori yang ada. Pastikan penemuan dengan `copilot skill list` (atau `/skills` di sesi interaktif), lalu minta diagram dengan bahasa natural. Untuk mengambil pembaruan yang sudah di-merge, jalankan `copilot plugin marketplace update diagram-design`, lalu `copilot plugin update diagram-design@diagram-design`.

### Factory Droid

```bash
droid plugin marketplace add https://github.com/cathrynlavery/diagram-design
droid plugin install diagram-design@diagram-design --scope user
```

Droid melacak plugin Git berdasarkan commit, bukan versi tampilan di manifest. Untuk mengambil pembaruan yang sudah di-merge, jalankan `droid plugin marketplace update diagram-design`, lalu `droid plugin update diagram-design@diagram-design --scope user`, dan mulai sesi baru.

### Claude Cowork (marketplace organisasi)

Marketplace GitHub organisasi saat ini mewajibkan repositori privat atau internal, jadi cerminkan dulu repositori publik ini ke repositori milik organisasimu. Di **Organization settings → Plugins**, pilih **Add plugin → GitHub**, hubungkan cermin itu, dan aktifkan **Sync automatically** dari menu marketplace. Sinkronisasi otomatis berjalan saat pull request berisi kenaikan versi plugin di-merge ke cabang default cermin; push langsung tidak memicu webhook. Pasang Diagram Design dari marketplace organisasi yang dihasilkan.

### Pi

```bash
pi install https://github.com/cathrynlavery/diagram-design
```

Jalankan `/reload` di sesi Pi yang terbuka. Pi menyediakan skill untuk permintaan diagram yang cocok; pakai `/skill:diagram-design` untuk memanggilnya secara eksplisit. Pi juga memuat template prompt `/export-diagram`, `/import-mermaid`, `/import-excalidraw`, `/profile`, dan `/doctor`. Pemasangan Git tanpa pin itu disengaja: Pi tidak punya penyegaran paket otomatis, jadi jalankan `pi update --extensions` untuk menarik pembaruan yang sudah di-merge.

### Kiro

Impor Agent Skill dari URL subdirektori repositori:

```text
https://github.com/cathrynlavery/diagram-design/tree/main/skills/diagram-design
```

Kiro menyalin skill yang diimpor ke `.kiro/skills/` untuk workspace atau `~/.kiro/skills/` secara global, jadi impor ulang URL-nya untuk mengambil pembaruan. Agent kustom yang mendeklarasikan resource harus menyertakan `skill://diagram-design/**/SKILL.md`.

### OpenCode

Salin atau symlink `skills/diagram-design/` ke `.opencode/skills/diagram-design` di sebuah proyek atau `~/.config/opencode/skills/diagram-design` secara global. OpenCode tidak punya paket marketplace Diagram Design; pemasangan hasil salinan hanya diperbarui saat kamu mengganti direktorinya dari checkout yang lebih baru.

### Pemasangan yang bisa diedit (kustomisasi style guide di clone)

Pemasangan terkelola nyaman, tetapi perubahan pada `references/style-guide.md` bisa tergantikan oleh pembaruan paket. Profil tersimpan di `~/.diagram-design/profiles/` bertahan dari pembaruan, dan proyek dengan penanda `.diagram-design` tidak terpengaruh. Clone repo dan pasang path lokalnya bila kamu berencana mengustomisasi style guide kerja secara langsung:

```bash
git clone git@github.com:cathrynlavery/diagram-design.git ~/code/diagram-design

# Pi: daftarkan checkout sebagai paket lokal
pi install ~/code/diagram-design

# Claude Code: symlink skill bagian dalam
ln -s ~/code/diagram-design/skills/diagram-design ~/.claude/skills/diagram-design

# Host Agent Skills lain: buat hanya root yang kamu pakai
mkdir -p ~/.agents/skills ~/.cursor/skills ~/.cline/skills ~/.kiro/skills ~/.config/opencode/skills ~/.copilot/skills
ln -s ~/code/diagram-design/skills/diagram-design ~/.agents/skills/diagram-design
ln -s ~/code/diagram-design/skills/diagram-design ~/.cursor/skills/diagram-design
ln -s ~/code/diagram-design/skills/diagram-design ~/.cline/skills/diagram-design
ln -s ~/code/diagram-design/skills/diagram-design ~/.kiro/skills/diagram-design
ln -s ~/code/diagram-design/skills/diagram-design ~/.config/opencode/skills/diagram-design
ln -s ~/code/diagram-design/skills/diagram-design ~/.copilot/skills/diagram-design
```

Skill bersama berada di `skills/diagram-design/`. Pi menemukannya lewat direktori paket `skills/` standar repo; Claude Code, GitHub Copilot, Codex, Factory Droid, Cursor, dan alat lain yang kompatibel dengan Agent Skills memakai file yang sama.

---

## Perbandingan

| | Mermaid / PlantUML | draw.io / Excalidraw | Diagram Design |
|---|---|---|---|
| Cara membuatnya | Menulis teks | Menyeret bentuk dengan tangan | Menjelaskannya ke agent kamu |
| Layout | Otomatis | Manual | Ditempatkan agent pada grid 4px, dengan pemeriksaan CI untuk tumpang tindih dan terpotong |
| Tampilan | Tema renderer | Apa pun yang kamu gambar | Satu gaya editorial yang beropini, disesuaikan dengan merekmu |
| Keluaran | Teks yang dirender di GitHub | File `.drawio` atau `.excalidraw` yang bisa diedit | Satu file HTML dengan SVG inline, bisa diekspor ke SVG atau PNG |
| Mengubahnya nanti | Edit teksnya | Edit kanvasnya | Minta agent lagi, atau edit SVG-nya |
| Diagram yang sudah ada | | | Menggambar ulang file Mermaid, draw.io, dan Excalidraw |

Kekurangannya nyata. Kualitas keluaran bergantung pada model yang kamu pakai, dan prompt yang sama bisa menghasilkan layout berbeda dua kali. Hasilnya bukan format sumber yang bisa diedit: tidak ada teks untuk di-diff di pull request dan tidak ada kanvas untuk menyeret kotak. Untuk dokumen yang hidup di Git dan berubah setiap sprint, Mermaid tetap lebih cocok. Diagram Design untuk diagram yang akan kamu terbitkan.

---

## Mengapa dibuat

Penulisnya ingin diagram yang benar-benar ia sukai untuk postingan blog di [littlemight.com](https://littlemight.com). Setiap kali butuh satu, entah sketsa arsitektur, flowchart, atau piramida tentang apa yang paling penting, ia meminta Claude dan mendapat benda kotak-bulat generik yang sama sekali tidak mirip dengan situsnya. Ia akan berkutat dengan Figma selama 30 menit atau melewatkan diagramnya.

Modelnya sudah memahami isinya. Yang kurang adalah selera, jadi ia menuliskan seleranya: satu warna aksen untuk satu atau dua hal yang penting, garis rambut 1px, tanpa bayangan, setiap koordinat pada grid 4px.

> *Langkah berkualitas tertinggi biasanya adalah penghapusan.* Setiap node harus layak berada di sana. Warna aksen disediakan untuk 1 atau 2 hal yang harus dilihat pembaca lebih dulu. Target kepadatan: 4/10.

---

## Apa yang dibuatnya

45 jenis diagram, masing-masing dalam tiga varian statis: minimal terang, minimal gelap, dan editorial penuh. Buka langsung di browser. Tidak ada langkah build, JavaScript, atau ketergantungan gambar eksternal.

Daftar jenisnya (nomor 01 sampai 45): Architecture, IT current-state, Flowchart, Sequence, State machine, ER / data model, Timeline, Swimlane, Quadrant, Radar / spider, Loop / flywheel, Nested, Tree, Org chart, Layer stack, Venn, Pyramid / funnel, Bar chart, Treemap, Line chart, Gantt, Scatter plot, High-Level, Process, Medallion, Data flow, DP integration, DP security matrix, Sankey, Fishbone, Wardley map, Kanban, User journey, Deployment, Dependency graph, UML class, Story map, Database schema, Polar chart, Waterfall, Architecture delta, Exploded axonometric, Axonometric plan, Heatmap, dan Service blueprint.

Beberapa jenis punya varian bernama yang berbagi referensinya: Line mencakup slopegraph, ridgeline, streamgraph, dan bump; Scatter mencakup bubble, beeswarm, dan box plot; Treemap mencakup marimekko.

Architecture bisa menyarangkan band administratif dan kotak lalu lintas dalam satu snapshot bila hierarki itu sendiri adalah klaimnya: band putus-putus rx=4 untuk penagihan dan izin, kotak solid rx=8 untuk jaringan, dan layanan terkelola di luar setiap subnet. Lihat [contoh containment](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-architecture-containment.html) dan [type-architecture.md](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/type-architecture.md).

Architecture delta membandingkan topologi yang disinkronkan lewat ledger Before · Changes · After berisi objek yang ditambah, dihapus, diubah, dipindah, dan disambung ulang. Lihat [referensinya](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/type-architecture-delta.md) dan [contoh order-fulfilment](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-architecture-delta.html). Perbandingan atribut saja tetap berupa tabel; satu snapshot memakai Architecture.

Exploded axonometric menggambar satu objek dalam proyeksi dimetrik 2:1 dengan bagian-bagiannya terangkat terpisah pada jarak sama: [bongkar ponsel](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-exploded-phone.html), [unboxing](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-exploded-unboxing.html), [tumpukan aplikasi](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-exploded.html), [tumpukan agent AI](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-exploded-ai-stack.html), atau [keyboard mekanik](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-exploded-keyboard.html). Setiap koordinat berasal dari satu fungsi proyeksi, dan [ponsel beranimasi](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-exploded-phone-animated.html) terbuka dalam keadaan terpasang lalu meledak sekali. Lihat [referensinya](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/type-exploded.md).

Axonometric plan memakai proyeksi yang sama untuk satu lantai atau satu situs: dinding dipotong setinggi meja agar setiap ruangan terbaca dari satu sudut pandang, atau gedung di kampus yang diberi tag fase pembangunan. Lihat [lantai kantor](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-axonometric-plan.html), [kampus](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-axonometric-plan-campus.html), [kedai kopi](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-axonometric-plan-coffee-shop.html), [lantai fulfillment](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-axonometric-plan-warehouse.html), [animasi kampus bertahap](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-axonometric-plan-campus-animated.html), dan [referensinya](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/type-axonometric-plan.md).

**Jelajahi galeri langsung:** [cathrynlavery.github.io/diagram-design](https://cathrynlavery.github.io/diagram-design/), atau buka [`skills/diagram-design/assets/index.html`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/index.html) secara lokal untuk membolak-balik semua diagram dengan tab terang / gelap / editorial penuh. Tiap jenis punya satu nomor, 01 sampai 45; varian dan contoh kerjanya membawa nomor yang sama dengan huruf.

---

## Onboarding: buat tampilannya seperti *merek kamu*

Intinya adalah diagram editorial dalam warna dan tipografi **kamu**, bukan template generik.

Secara bawaan, diagram dirender dalam palet **hitam pekat + tangerine** (kertas putih asap, tinta hitam pekat, aksen tangerine yang digelapkan hingga lolos kontras 4,5:1 sebagai teks, muted biru-batu, garis rambut perak). Cukup bagus untuk langsung di-screenshot. Onboarding enam puluh detik lebih baik: skill mengambil merek dari situs kamu dan menerapkannya di setiap diagram.

### Alurnya

```
You:     "onboard diagram-design to https://yoursite.com"
Agent:   → fetches the homepage
         → extracts the dominant palette + font stack
         → maps detected values to semantic roles:
             paper, ink, muted, accent, link
         → shows a proposed diff
         → writes your tokens to references/style-guide.md
You:     "yes, apply it"
```

Setiap diagram baru kini memakai warna kamu. Warna kertas situsmu menjadi latar diagram. Warna CTA-mu menjadi aksen fokal. Font body-mu menjadi keluarga label node.

Pencocokan merek juga menghasilkan tanda terima fidelitas: URL yang disampel, peran warna yang tepat, keluarga dan bobot font, URL sumber font, dan fallback apa pun. Font situs publik dipakai langsung dan diverifikasi setelah render, bukan diganti diam-diam dengan font sistem generik.

### Apa yang diambil

| Terdeteksi dari situsmu | Menjadi |
|---|---|
| Latar `<body>` | token `paper` |
| Warna teks utama | token `ink` |
| Teks sekunder / caption | token `muted` |
| Kartu atau kontainer | token `paper-2` |
| Warna merek paling banyak dipakai (CTA, tautan, heading) | token `accent` |
| Keluarga font `<h1>` | font `title` |
| Keluarga font `<body>` | font `node-name` |
| Font `<code>` / `<pre>` | font `sublabel` |

### Pemeriksaan kontras berjalan otomatis

Sebelum menulis token, skill memverifikasi kontras WCAG AA untuk `ink` di atas `paper`. Bila situsmu punya warna yang gagal kontras pada ukuran diagram (9 sampai 12px), ia mengusulkan nilai yang disesuaikan dan menjelaskan alasannya. Skin default menjalani kontrak yang sama di CI: peran teks lolos 4,5:1 dan tanda penting lolos 3:1 pada kertas terang maupun gelap.

### Aksesibel secara default

Setiap template diagram memberi SVG inline nama dan deskripsi yang bisa diakses: `role="img"`, `aria-labelledby` yang terselesaikan, dan slot `<title>` / `<desc>` sebagai anak pertama. ID diberi awalan per diagram dan varian, sehingga beberapa ekspor SVG bisa di-inline aman dalam satu halaman tanpa ID nama-aksesibel ganda. Ikon spesimen dekoratif disembunyikan dari teknologi bantu.

### Font offline

Secara default sebuah diagram memuat Instrument Serif, Geist, dan Geist Mono dari Google Fonts, satu-satunya permintaan jaringan yang dibuatnya. Minta **font sistem** (atau setel sumber font ke `system` di style guide kamu) dan file itu tidak membuat permintaan jaringan sama sekali: tumpukan font jatuh ke serif, sans, dan monospace bawaan platform. Lihat [Font source](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/style-guide.md#font-source).

### Override manual

Lebih suka menyetel token dengan tangan? Buka [`skills/diagram-design/references/style-guide.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/style-guide.md) dan edit tabelnya. Semua yang berikutnya membaca dari sana: setiap diagram, primitif anotasi, dan galeri memakai nama peran semantik (`accent`, bukan nilai hex).

### Gerbang pemakaian pertama

Skill tidak akan diam-diam merilis diagram berskin default ke proyek bermerek. Pada pemakaian pertama di proyek baru, ia memeriksa apakah `style-guide.md` sudah dikustomisasi. Jika belum, ia berhenti dan bertanya:

> *"This is your first diagram in this project. The style guide is still at the default. Want to run onboarding, paste tokens manually, or proceed with default?"*

Lihat [`skills/diagram-design/references/onboarding.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/onboarding.md) untuk spesifikasi lengkapnya.

### Bekerja dengan banyak klien

Lakukan onboarding sebuah merek sekali, simpan hasilnya sebagai profil bernama, lalu tambahkan penanda `.diagram-design` berisi `profile: <slug>` ke tiap proyek klien. Proyek bertanda membaca `~/.diagram-design/profiles/<slug>.md` langsung, sehingga workspace paralel bisa memakai merek berbeda tanpa menimpa `style-guide.md` terpasang yang dipakai bersama.

Pustaka profil dipakai bersama oleh Claude Code, Codex, Factory Droid, dan Pi. Pakai `/diagram-design:profile` di Claude Code, `/profile` di Factory Droid atau Pi, atau minta dengan bahasa natural di host mana pun. Lihat [`profiles.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/profiles.md) untuk kontrak penyimpanan, penanda, dan pemulihan.

---

## Mulai cepat

```bash
# Dari checkout hasil clone, buka galeri untuk melihat setiap diagram
open skills/diagram-design/assets/index.html       # macOS
xdg-open skills/diagram-design/assets/index.html  # Linux
```

Lalu minta agent kamu membuat diagram, seperti prompt di awal halaman ini. Sequence dengan token refresh memakai tata bahasa fragmen gabungan ALT di `type-sequence.md`; lihat [`example-sequence-oauth.html`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-sequence-oauth.html).

Resep operator untuk pemasangan yang bisa diedit, diagram pertama, setup merek, impor, ekspor, validasi, junction Windows, dan prompt yang bisa dipakai ulang ada di [`docs/cookbook.md`](https://github.com/cathrynlavery/diagram-design/blob/main/docs/cookbook.md).

Kamu juga bisa mulai dari template secara langsung:

```bash
cp skills/diagram-design/assets/template.html my-diagram.html        # minimal terang
cp skills/diagram-design/assets/template-full.html my-diagram.html   # editorial dengan kartu ringkasan
cp skills/diagram-design/assets/template-motion.html my-diagram.html # gerak aksesibel opsional
```

### Pola semantik dan gerak opsional

Saat perilaku penting, skill memilih pola semantik lebih dulu dan jenis visual kemudian. Sembilan pola yang dirutekan mencakup antrean fan-in dan bottleneck, slot tahap berulang, transformasi input tak terstruktur, jejak kebijakan berpasangan, jalan raya aman (secure paved roads), katalog tata kelola, lapisan keamanan kompensasi, dekomposisi blok yang bisa ditelusuri, dan peta fase siklus hidup. Tiap pola mendefinisikan pemicu, primitif, anggaran, anti-pola, fallback statis, dan jenis visual terdekat di [`semantic-patterns.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/semantic-patterns.md).

Gerak bersifat opsional dan tidak menciptakan jenis visual lain. [`animation.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/animation.md) mendefinisikan mode `none`, `reveal`, `step`, dan `loop` dengan frame pertama statis yang lengkap, waktu deterministik, dan kontrol bila interaksi tersedia. Keluaran dengan reduced-motion menampilkan frame statis lengkap dan menyembunyikan/menonaktifkan kontrol pemutaran. HTML gerak memakai pengendali yang sudah ditinjau persis dari `template-motion.html`; skrip inline yang sembarangan atau dimodifikasi, aset jarak jauh, impor CSS, dan atribut HTML yang bisa dieksekusi ditolak. Defaultnya `none`: keluaran biasa tetap statis dan bebas skrip. [`example-policy-trace-animated.html`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-policy-trace-animated.html) adalah contoh interaktif yang mandiri.

---

## Impor dari draw.io, Mermaid, atau Excalidraw

Sudah punya diagram di draw.io / diagrams.net, Mermaid, atau Excalidraw? Arahkan skill ke sumbernya dan ia **menggambar ulang**: isi yang sama, sistem desain ini, pada ukuran yang dibutuhkan tujuan.

*File draw.io 12 node digambar ulang pada detail `balanced` untuk postingan blog. Enam warna isi pastel sumbernya menjadi satu aksen; koordinat yang diseret dengan tangan menjadi grid 4px.*

```
/diagram-design:import-drawio platform.drawio
/diagram-design:import-drawio platform.drawio --size=slide-16x9 --detail=simplified --audience=executive
/diagram-design:import-drawio platform.drawio --detail=faithful --format=png --page=all
/diagram-design:import-mermaid README.md --diagram=all
/diagram-design:import-mermaid architecture.mmd --size=slide-16x9 --detail=simplified
/diagram-design:import-excalidraw whiteboard.excalidraw --size=slide-16x9 --detail=simplified
```

Atau cukup minta: *"redraw this drawio file for my deck"*, *"make this Mermaid block editorial"*, *"make this whiteboard sketch presentable"*, atau *"この Mermaid をスライド用にきれいにして"*.

Membaca kontainer umum yang ditulis draw.io (`.drawio`, `.drawio.xml`, `.drawio.png` dengan diagram tertanam, dan `.drawio.svg`), termasuk payload terkompresi yang tampak seperti sampah base64 di editor. Untuk Mermaid, menerima `.mmd`, `.mermaid`, dan satu atau lebih blok `mermaid` berpagar di Markdown. File UTF-8 boleh memuat byte-order mark. Untuk Excalidraw, menerima file scene `.excalidraw` dan `.excalidraw.json` (bukan ekspor `.excalidraw.png`/`.excalidraw.svg`). Ia hanya mem-parsing teks: tanpa render, JavaScript, browser, jaringan, atau target klik yang diikuti.

### Empat dial

Intinya bukan konversi, melainkan **menyesuaikan keluaran dengan tujuannya**. File sumber yang sama, tiga diagram berbeda:

| Dial | Opsi | Yang diubah |
|---|---|---|
| **Format** | `html` · `svg` · `png` · `html+png` | Hasil akhir. SVG untuk Figma, PNG untuk slide, HTML untuk web. |
| **Size** | `doc-inline` · `doc-wide` · `slide-16x9` · `slide-4x3` · `social-og` · `social-square` · `print-a4-landscape` · `print-a3-landscape` · `print-letter-landscape` · `fit` | `viewBox` **dan skala tipografi**: slide yang diproyeksikan mendapat nama node 16px, bukan 12px. |
| **Detail** | `faithful` (≤24 node, berzona) · `balanced` (≤12) · `simplified` (≤7) | Seberapa banyak sumber yang bertahan, lewat tangga degradasi tetap: dekorasi, lalu duplikat, lalu klaster daun, lalu infrastruktur. |
| **Audience** | `engineer` · `mixed` · `executive` | *Pilihan kata*, bukan jumlah. `Auth Service / JWT · RS256 · :8443` → `Auth Service / token check` → `Sign-in`. |

Setiap impor diakhiri dengan **ledger fidelitas** yang mendaftar apa yang digabung, diruntuhkan, atau dibuang. Kamu tahu sumbernya; kamu akan menyadarinya.

```
Detail: balanced · 12 source nodes → 8 drawn
Collapsed: "Token valid?" decision → edge label on Gateway → Auth
Dropped:   1 sticky note ("legacy path, to be retired"), unconnected in source
Kept in full: the request path (Web/Mobile → Gateway → Orders → Postgres)
```

Yang tidak pernah terbawa: koordinat sumber atau renderer, palet sumber, font sumber, "spageti konektor diagonal" draw.io, layout otomatis Mermaid, atau geometri gambar-tangan Excalidraw. Yang selalu terbawa: komponen, hubungan, pengelompokan, dan arah. Lihat [`references/import-drawio.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/import-drawio.md), [`references/import-mermaid.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/import-mermaid.md), [`references/import-excalidraw.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/import-excalidraw.md), dan [`references/output-spec.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/output-spec.md).

---

## Ekspor ke PNG / SVG

Diagram dikirim sebagai HTML mandiri, tetapi kamu bisa mengekspor diagramnya sendiri untuk Figma, slide, atau kartu sosial. Ekspor SVG juga membawa CSS diagram yang dibungkus CDATA, termasuk selektor yang terikat ke root SVG asli, dan mempertahankan nilai selektor bertanda kutip yang memuat pembatas komentar. Pakai slash command untuk agent kamu:

**Pi:**

```
/export-diagram path/to/diagram.html
/export-diagram path/to/diagram.html --svg-only
/export-diagram path/to/diagram.html --png-only --scale=3
/export-diagram path/to/diagram.html --registry
```

**Claude Code:**

```
/diagram-design:export-diagram path/to/diagram.html
/diagram-design:export-diagram path/to/diagram.html --svg-only
/diagram-design:export-diagram path/to/diagram.html --png-only --scale=3
/diagram-design:export-diagram path/to/diagram.html --registry
```

Atau cukup minta dengan bahasa natural:

```
"Export this diagram as SVG and PNG."
"Save my-diagram.html as PNG."
```

- **SVG** mengekstrak node `<svg>` dan menyuntikkan Google Fonts agar dirender mandiri di browser, Figma, dan Illustrator. Binding animasi mengikuti keyframes ber-namespace walaupun nama properti memakai escape CSS. Tambahkan `--system-fonts` untuk melewati impor font bila offline.
- **PNG** merasterisasi diagram lewat Playwright pada 2× secara default. Setup sekali: `pip install playwright && playwright install chromium`.

Kedua format hanya berisi diagram: kartu editorial dan header dari varian `-full` tidak disertakan. Untuk screenshot layout editorial penuh, pakai print-to-PDF atau screenshot halaman penuh di browser kamu. Lihat [`skills/diagram-design/references/export.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/export.md) untuk prosedur lengkapnya.

- **`--registry`**: untuk diagram yang memakai pola [dekomposisi blok yang bisa ditelusuri](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/semantic-patterns.md), juga menghasilkan `<basename>.registry.json`, proyeksi terstruktur dari metadata `data-block-*` setiap blok. Gabungkan dengan format raster mana pun atau jalankan sendiri. Lihat [`skills/diagram-design/references/export-registry.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/export-registry.md).

Untuk HTML dengan gerak, ekspor keadaan akhir yang eksplisit: buka `?motion=static`, tunggu `document.fonts.ready`, dan pastikan root gerak punya `data-frame="static"` sebelum menangkap. Pakai `?motion=step&step=N` hanya bila frame antara yang bernama diminta.

---

## Arsitektur

Pengungkapan bertahap. `SKILL.md` merutekan perilaku lebih dulu bila perlu, lalu layout. Referensi semantik, jenis, dan animasi hanya dimuat bila relevan.

Struktur repositori secara ringkas: manifest plugin untuk Claude, Codex, Factory Droid, dan Qoder; `commands/` (export-diagram, import-drawio, import-mermaid, import-excalidraw, profile, doctor); `prompts/` (template prompt Pi); `skills/diagram-design/` berisi `SKILL.md`, `references/` (style-guide, semantic-patterns, animation, onboarding, profiles, doctor, import-*, output-spec, export, primitif, layout-budget, dan satu referensi `type-*.md` per jenis diagram), `scripts/` (ekstraktor draw.io/Mermaid/Excalidraw, export_svg, export_png, self_check), dan `assets/` (galeri, template, serta tiga varian contoh per jenis); lalu `scripts/` untuk gerbang CI (lint-skin, lint-render, verify-docs-sync, verify-geometry), `docs/` (cookbook, ADR, spesifikasi desain), dan CHANGELOG serta CONTRIBUTING.

Ini menjaga konteks kerja agent tetap ketat: permintaan rutin memuat satu referensi jenis; diagram kaya perilaku menambahkan referensi semantik yang dirutekan; animasi menambahkan kontraknya hanya saat dipilih.

### Apa yang dimuat kapan

Saat startup, agent hanya melihat nama dan deskripsi skill. Ketika sebuah permintaan cocok, ia memuat `SKILL.md`; referensi semantik, jenis, dan animasi dimuat hanya bila relevan.

| Kamu meminta… | Agent memuat |
|---|---|
| "Make me a flowchart" | `SKILL.md` + `references/type-flowchart.md` |
| "Build an architecture diagram" | `SKILL.md` + `references/type-architecture.md` |
| "Show nested admin vs traffic scopes" | `SKILL.md` + `references/type-architecture.md` |
| "Show what was added, removed, changed, moved, or rewired in this migration" | `SKILL.md` + `references/type-architecture-delta.md` |
| "Show what's inside this device, exploded" | `SKILL.md` + `references/type-exploded.md` |
| "Draw our office floor plan" | `SKILL.md` + `references/type-axonometric-plan.md` |
| "Compare why these two policy requests differ" | `SKILL.md` + `references/semantic-patterns.md` + `references/type-flowchart.md` |
| "Animate that policy trace" | Pilihan sebelumnya + `references/animation.md` |
| "Onboard this skill to my site" | `SKILL.md` + `references/onboarding.md` + `references/style-guide.md` |
| "Use my saved Acme client profile" | `SKILL.md` + `references/profiles.md` + `~/.diagram-design/profiles/acme.md` |
| "Add an editorial callout to this diagram" | `SKILL.md` + `references/primitive-annotation.md` |
| "Give me a hand-drawn version" | `SKILL.md` + `references/primitive-sketchy.md` |
| "Give me a terminal / CLI-window version" | `SKILL.md` + `references/primitive-terminal.md` |
| "Redraw this .drawio file for my deck" | `SKILL.md` + `references/import-drawio.md` + `references/output-spec.md` + referensi jenis yang dipilih |
| "Redraw this Mermaid block for my deck" | `SKILL.md` + `references/import-mermaid.md` + `references/output-spec.md` + referensi jenis yang dipilih |
| "Redraw this Excalidraw sketch for my deck" | `SKILL.md` + `references/import-excalidraw.md` + `references/output-spec.md` + referensi jenis yang dipilih |
| Pembuatan diagram statis rutin (jenis visual apa pun) | `SKILL.md` + referensi satu jenis itu, ditambah `references/primitives-core.md` atau `references/layout-budget.md` hanya bila butuh markup persis atau baris anggaran per jenis |

Berapa pun jumlah jenisnya, agent hanya membaca yang kamu butuhkan. Tambahkan jenis baru besok dan tidak ada yang lain berubah.

---

## Tanda bahwa ini bekerja

- Permintaan rutin ("make me a flowchart") memuat `SKILL.md`, tepat satu referensi jenis, dan paling banyak dua referensi inti (`primitives-core.md`, `layout-budget.md`), dan tidak ada yang lain.
- Sebelum menggambar, agent menyatakan jenis, pola, ukuran, dan pemangkasan yang direncanakan, lalu merender.
- Keluarannya satu file `.html` yang terbuka dengan klik dua kali, offline, tanpa permintaan jaringan selain Google Fonts, dan tanpa permintaan sama sekali dengan font sistem.
- Pembaca layar mengumumkan judul dan deskripsi diagram; `prefers-reduced-motion` menampilkan frame statis lengkap.
- `python3 skills/diagram-design/scripts/self_check.py <file>` mencetak `OK` pada file yang dihasilkan (tambahkan `--offline` agar juga gagal pada tautan Google Fonts).
- Setelah onboarding merek, diagram baru memakai kertas, tinta, aksen, dan font situsmu, dengan tanda terima fidelitas yang menyebut masing-masing.

Kalau salah satu gagal, itu bug yang layak dilaporkan.

## Sistem desain (dalam satu paragraf)

Satu warna aksen, 1 atau 2 elemen fokal per diagram. Tiga keluarga font: Instrument Serif (judul + callout miring), Geist sans (nama node), Geist Mono (sublabel teknis). Border garis rambut 1px, tanpa bayangan, border-radius maksimum 10px. Setiap koordinat, lebar, dan jarak habis dibagi 4. Aturan itu tidak bisa ditawar; itulah yang menjaga diagram tidak terasa buatan AI. Mono untuk konten teknis (port, URL, tipe field), bukan estetika "dev" menyeluruh. Node fokal bertinta aksen menarik mata ke 1 atau 2 hal yang penting. Spesifikasi lengkap di [`SKILL.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/SKILL.md#5-design-system).

---

## Primitif

- **Annotation callout**: Instrument Serif miring + leader Bézier putus-putus, untuk catatan editorial di tepi. Lihat [`primitive-annotation.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/primitive-annotation.md).
- **Sketchy filter**: turbulensi SVG + displacement map untuk varian gambar-tangan. Bagus untuk esai, bukan dokumen teknis. Lihat [`primitive-sketchy.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/primitive-sketchy.md).
- **Set ikon**: 87 ikon IT/cloud monokrom (laptop, ponsel, pengguna, server, database, Docker, Kubernetes, AWS, Azure, GitHub, Postgres…) untuk diagram arsitektur dan sequence yang lebih kaya. Ikon garis dari [Tabler Icons](https://tabler.io/icons) (MIT); siluet merek dari [Simple Icons](https://simpleicons.org) (CC0). Tiap ikon memakai `currentColor` sehingga mewarisi skin editorial atau merek hasil onboarding. Lihat [`primitive-icons.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/primitive-icons.md); telusuri [galerinya](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/icons.html). Bangun ulang dengan `python scripts/build-icons.py`.

---

## Kapan *tidak* memakai skill ini

- **Diagram yang hidup di Git dan berubah setiap sprint** → Mermaid. Ia bisa di-diff, dan GitHub merendernya.
- **Diagram unicode cepat** untuk tweet atau keluaran terminal → skill bergaya wiretext.
- **Daftar apa pun** → tabel atau poin-poin.
- **Perbandingan sebelum/sesudah** → tabel.
- **"Diagram" satu bentuk** (satu kotak dengan label) → tulis saja kalimatnya.

Sebelum menggambar, tanyakan: *apakah pembaca akan belajar lebih banyak dari ini daripada dari satu paragraf yang ditulis dengan baik?* Kalau tidak, jangan menggambar.

---

## Berkontribusi

Kontribusi diterima: jenis diagram baru, dukungan tata bahasa impor, contoh, dokumentasi, dan tooling. [CONTRIBUTING.md](https://github.com/cathrynlavery/diagram-design/blob/main/CONTRIBUTING.md) membahas gerbang validasi (skin lint, render lint, verifier geometri dan pengodean data, sinkronisasi dokumen), cara kerja masing-masing, dan setup CI. Setiap pull request menjalankannya di Linux, Windows, dan macOS. Lihat [CODE_OF_CONDUCT.md](https://github.com/cathrynlavery/diagram-design/blob/main/CODE_OF_CONDUCT.md) untuk standar komunitas dan [CHANGELOG.md](https://github.com/cathrynlavery/diagram-design/blob/main/CHANGELOG.md) untuk riwayat rilis.

---

## Tentang

Dibuat oleh **Cathryn Lavery**. Ia menulis tentang AI, kewirausahaan, dan merancang hal-hal yang enak dilihat di [littlemight.com](https://littlemight.com), blog + newsletter.

Karya lain: [ShipRank](https://shiprank.dev) (papan peringkat publik untuk baris kode yang dirilis), [The Non-Technical Technical Dictionary](https://nontechnical.dev) (istilah teknologi dan AI dijelaskan dalam bahasa sederhana), dan [BestSelf.co](https://bestself.co) (SELF Journal dan alat kertas lain untuk menyelesaikan pekerjaan).

## Lisensi

MIT
