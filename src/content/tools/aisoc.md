---
title: "AiSOC"
summary: "Security Operations Center berbasis AI yang open source dan bisa di-host sendiri: mengumpulkan telemetri keamanan, mendeteksi dan mengorelasikan ancaman, menyelidikinya dengan agent AI yang jejak penalarannya bisa diaudit, lalu mengusulkan respons yang disetujui manusia."
category: keamanan
tags: [soc, siem, deteksi-ancaman, incident-response, ai-agent, self-hosted, ollama]
surfaces: [api]
source_url: "https://github.com/beenuar/AiSOC/blob/main/README.md"
repo: beenuar/AiSOC
stars: 7259
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
setup: |
  git clone https://github.com/beenuar/AiSOC && cd AiSOC
  make up
---

# AiSOC

**Security Operations Center berbasis AI yang open source dan bisa di-host sendiri.** AiSOC menerima telemetri keamanan kamu, mendeteksi dan mengorelasikan ancaman, menyelidikinya dengan agent AI yang penalarannya bisa diaudit sepenuhnya, dan mengusulkan respons yang disetujui manusia.

Tautan: [Technical Guide (PDF)](https://raw.githubusercontent.com/beenuar/AiSOC/main/apps/web/public/papers/aisoc-technical-guide.pdf) · [Dokumentasi](https://beenuar.github.io/AiSOC/) · [Arsitektur](https://github.com/beenuar/AiSOC/blob/main/docs/architecture/README.md) · [Apa yang benar-benar berfungsi](https://github.com/beenuar/AiSOC/blob/main/docs/audit/REPOSITORY_REALITY.md) · [Diskusi](https://github.com/beenuar/AiSOC/discussions)

> **Catatan dari situs ini:** AiSOC bukan alat khusus Claude. Modelnya bawaan lokal (Ollama), dan penyedia LLM lain bisa dipilih dari konsol. README tidak menyebut Claude.

> **Peringatan:** README juga menyebut pemasangan satu baris dengan `iwr … | iex` (Windows) dan `curl … | bash` (Linux/macOS). Perintah semacam itu mengunduh skrip lalu langsung menjalankannya. Entri ini memakai `git clone` dan `make up`, yang bisa kamu baca dulu sebelum dijalankan.

## Apa yang dilakukan AiSOC

Telemetri datang dari alat keamanan kamu. AiSOC menormalkannya, menjalankan 2966 aturan yang bisa dieksekusi dari pustaka 7407 aturannya, mengelompokkan yang terpicu menjadi insiden, menyelidiki tiap insiden dengan agent AI yang setiap prompt dan pemanggilan alatnya direkam, lalu mengusulkan tindakan. Intelijen ancaman baru memindai ulang riwayat yang sudah kamu kumpulkan, dan manusia menyetujui sebelum apa pun sampai ke vendor.

## Tampilannya saat berjalan

[Tonton tiga menit penuhnya](https://github.com/beenuar/AiSOC/blob/main/apps/web/public/demo/demo.mp4): dari instalasi sampai vonis AI di satu server memakai image yang dipublikasikan, dengan waktu tunggu terminal dipersingkat dan rekaman menyebutkannya di layar. Panduan langkah demi langkah ada di [walkthrough](https://github.com/beenuar/AiSOC/blob/main/apps/docs/docs/deployment/walkthrough.mdx), dan [apa yang nyata](https://github.com/beenuar/AiSOC/blob/main/apps/web/public/screenshots/README.md) dijelaskan di README tangkapan layar.

|  |  |
|---|---|
| ![Antrean alert](https://raw.githubusercontent.com/beenuar/AiSOC/main/apps/web/public/screenshots/alerts-queue.png) | ![Vonis triase AI di Investigation Rail](https://raw.githubusercontent.com/beenuar/AiSOC/main/apps/web/public/screenshots/ai-triage-verdict.png) |
| **Alert**: tiap alert dikaitkan dengan konektor yang mengirimnya. | **Triase otomatis**: vonis, tingkat keyakinan, dan alasan dari model lokal bawaan, apa adanya. |
| ![Halaman intelijen ancaman berisi entri CISA KEV](https://raw.githubusercontent.com/beenuar/AiSOC/main/apps/web/public/screenshots/threat-intel-kev.png) | ![Dasbor operasi SOC dengan keadaan kosong yang jujur](https://raw.githubusercontent.com/beenuar/AiSOC/main/apps/web/public/screenshots/soc-operations.png) |
| **Intelijen ancaman**: katalog CISA KEV asli, beberapa menit setelah boot, tanpa API key. | **Operasi SOC**: saat belum ada yang terhubung, dasbor mengatakannya, bukan menampilkan data tiruan. |

## Mulai cepat

```bash
git clone https://github.com/beenuar/AiSOC && cd AiSOC
make up
```

Di Windows, atau di mesin yang belum punya apa pun, README menyediakan pemasangan satu baris yang sekaligus memasang prasyarat (lihat peringatan di atas). **Tanpa Docker sama sekali**, `pip install aisoc-sandbox && aisoc-sandbox demo` menjalankan satu alert lewat corong agent secara offline dalam kurang dari 30 detik. **Tanpa mesin sendiri**, buka repo di GitHub Codespaces dan jalankan `make up` di terminalnya. Keempat cara berakhir di konsol yang sama. Hanya tiga yang pertama yang memasang sesuatu.

Panduan teknis (PDF) membahas ini lebih dalam: ukuran server, tempat model berjalan, setiap mode kegagalan beserta penyebab dan perbaikannya, REST API, MCP, dan semua permukaan konsol.

Dibutuhkan Docker Compose v2 dengan **memori 8 GB dan disk kosong 20 GB di VM Docker**, ditambah `python3` (3.9+) dan `bash`. `make doctor` memeriksa semuanya, dan [Installation](https://beenuar.github.io/AiSOC/docs/installation#requirements) menjelaskan angka-angka itu diukur terhadap apa. Run pertama mengunduh model sekitar 2 GB ke sebuah volume yang hanya dibersihkan oleh `make clean`.

`make up` juga membuat `.env` dan menghasilkan **lima belas** rahasia di dalamnya: brankas kredensial, kunci penandatanganan sesi, lima kredensial antarlayanan, dan empat kata sandi datastore. Lalu perintah ini membuat administrator dan mencetak kata sandinya, yang dibuat di mesinmu, ditampilkan sekali, dan tidak disimpan di mana pun. Kalau hilang, `make bootstrap ARGS=--reset-password` membuat yang baru.

**Port yang sudah terpakai tidak menghentikan instalasi.** AiSOC memakai port bebas, menyebutkan apa yang memakai port lama, dan memindahkan alamat konsol bersamanya: 64 detik sampai masuk ke konsol pada clone baru dengan port 5432 dan 11434 sama-sama terpakai.

Lalu **buktikan bahwa ia bekerja**. `make smoke` mengirim satu event nyata ke API ingest dan mengikutinya lewat Kafka, deteksi, korelasi, dan Postgres, lalu membaca alert itu kembali dari API publik. Setiap tahap melaporkan PASS atau FAIL:

```
$ make smoke
[PASS] raw telemetry accepted by ingest
[PASS] event traversed the spine and became an alert
PASS: 10/10 stages
```

Masuk di alamat yang dicetak `make up`. Tenant yang belum menghubungkan apa pun mendarat di **wizard setup**, bukan dasbor penuh angka nol, dan statusnya dibaca dari datamu sendiri. Spesifikasinya ada di [`docs/openapi.yaml`](https://github.com/beenuar/AiSOC/blob/main/docs/openapi.yaml); dokumentasi interaktif dimatikan di stack kelas produksi ini. Macet? Jalankan `make doctor`.

Tekan **Load sample data** di wizard. Lima skenario melewati jalur ingest yang sama dengan konektor sungguhan, bukan baris yang disisipkan, jadi menyaksikan mereka menjadi alert berarti menyaksikan pipeline bekerja. Skenarionya sengaja mencakup rendah sampai kritis, karena run pertama yang semuanya krisis tidak mengajarkan apa pun tentang bagaimana triase memisahkan sinyal dari rutinitas. Semuanya dikaitkan ke `AiSOC` di kolom sumber, menolak dimuat ke tenant yang sudah punya alert nyata, dan **tidak** menandai setup selesai. Untuk korpus tetap yang lebih besar bagi demo dan evaluasi, `make demo` memuat dataset **sintetis**: bentuk pipeline, bukan tolok ukur, pelanggan, atau insiden. Setiap baris berstatus `is_synthetic = true` dan diberi label di konsol.

## Menghubungkan data nyata

Dorong (push) dengan kredensial dari `make ingest-token` (tenant diambil dari kredensial itu, bukan dari header):

```bash
curl -X POST http://localhost:8081/v1/ingest/batch \
  -H 'Content-Type: application/json' -H "Authorization: Bearer $AISOC_INGEST_TOKEN" \
  -d '{"connector_id":"edr-1","connector_type":"crowdstrike","events":[{"severity":"high",
       "title":"Encoded PowerShell from Office","host":"WIN-FIN-01"}]}'
```

Atau tarik (pull), dengan mengonfigurasi salah satu dari **91 konektor data klik-dan-hubungkan** di **Settings → Connectors**. Di antaranya Splunk, Sentinel, Elastic, CrowdStrike, Okta, AWS, dan audit Kubernetes, dengan normalisasi khusus vendor dan dokumen setup ([cakupan](https://beenuar.github.io/AiSOC/docs/connectors/api-coverage)). Tanpa profil vendor, konektor tetap melakukan ingest lewat pemetaan generik yang mengenali host, pengguna, dan IP sumber.

**Lingkungan cloud nyata tidak menyerahkan lognya lewat satu panggilan REST.** Empat kolektor membaca permukaan yang benar-benar dipakai: trail organisasi CloudTrail di S3 yang diberi notifikasi lewat SQS (event manajemen, event data, dan VPC flow log), langganan **GCP Pub/Sub** pada sink Cloud Logging, tangkapan **Azure Event Hubs**, dan listener **syslog/CEF**. Masing-masing menyimpan kursor yang bisa dilanjutkan dan anggaran per polling yang terbatas, sehingga tumpukan data menimbulkan backpressure, bukan membanjiri ingest.

Sudah punya deteksi? `packages/aisoc-migrate` menerjemahkan Splunk SPL, Sentinel KQL, dan Elastic EQL, serta **menolak, bukan memperkirakan**, apa yang tidak bisa dibawa, karena aturan yang hampir benar lebih sulit ditemukan daripada aturan yang hilang. Dari 2.005 aturan Splunk yang disertakan, 1.734 bisa diterjemahkan dan 1.711 di antaranya parsial ([maksudnya](https://github.com/beenuar/AiSOC/blob/main/apps/docs/docs/migration/from-splunk.md)).

## Cara kerjanya

Ingest menormalkan event ke bentuk umum dan menempelkan **proyeksi aktivitas** pada setiap event (aktor, aksi, sumber daya, lokasi, hasil, dengan `actor.kind` dibaca dari field terdokumentasi tiap vendor, bukan ditebak), lalu Kafka membawanya. Kemudian fusion menjalankan 2966 aturan deteksi yang bisa dieksekusi dari 7407 yang ada di disk, ditambah 76 aturan jendela geser (73 menghitung lintas event; 3 mencocokkan urutan berurutan), lalu menerapkan **penyetelan milik tenant kamu**: aturan yang dimatikan, batas bawah, dan penekanan yang ditulis konsol, sehingga aturan yang kamu matikan benar-benar berhenti memicu. Fusion memutuskan apa yang menjadi alert.

Korelasi mengelompokkan alert yang berkaitan, agent menyelidiki dan menulis penalarannya ke Investigation Ledger, dan sebuah playbook bisa dimulai dari hasilnya. Secara terpisah, intelijen ancaman baru menyapu lake untuk penampakan yang sudah kamu kumpulkan, dan sebuah hipotesis menjadi perburuan tanpa ada yang menulis kueri: model mengisi skema tertutup dan setiap nilai diikat sebagai parameter, sehingga model tidak mungkin mengekspresikan kueri.

**Playbook yang dipicu alert melakukan pratinjau sebelum bertindak.** Tiga saklar harus sepakat (deployment, tenant, playbook), dan semua default-nya mati. Jika kurang dari itu, playbook berjalan dalam mode pratinjau dengan rencananya dilampirkan ke alert. Langkah persetujuan adalah jeda yang tahan lama: run ditangguhkan ke Postgres, bertahan saat restart, dilanjutkan setelah persetujuan, dan kedaluwarsa dengan hasil yang tercatat, bukan menggantung.

**"Bisa dieksekusi" harus dibuktikan, bukan dinyatakan.** Sebuah aturan masuk ke ruleset terkompilasi hanya setelah event berbentuk vendor diputar ulang lewat konektor dan engine yang sebenarnya dan aturan itu *terlihat terpicu*, bukan disimpulkan dari direktori atau flag `enabled:`. Buktinya bisa gagal: `--prove-gate` mengembalikan konektor Windows ke keadaan semula dan mensyaratkan seluruh 1.687 aturan Windows menjadi diam. Artinya terjangkau, bukan berarti mendeteksi serangan. **Dua** aturan masih tidak bisa terpicu (turun dari 119, karena aturan yang tidak bisa terpicu tidak lagi dihitung sebagai bisa dieksekusi), dan keduanya menunggu baseline perilaku. Ratchet hanya bergerak turun. ([mengapa 1.362 ditolak](https://github.com/beenuar/AiSOC/blob/main/docs/detections/sigma-compilation.md))

**Setiap jawaban menyertakan buktinya.** Copilot mengutip setiap klaim yang bisa diperiksa ke entri ledger di baliknya dan melabeli sisanya *tanpa kutipan*, bukan membuangnya. Investigasi apa pun bisa diekspor sebagai **paket bukti bertanda tangan**: identik byte demi byte, prompt sebagai digest, OCSF 1.9.0. ([caranya](https://github.com/beenuar/AiSOC/blob/main/docs/architecture/evidence-bundles.md))

[docs/architecture/README.md](https://github.com/beenuar/AiSOC/blob/main/docs/architecture/README.md) menelusuri jalur itu selangkah demi selangkah: sebelas langkah, lima diagram, setiap kotak tertaut ke kodenya, dan [dicerminkan ke portal dokumentasi](https://beenuar.github.io/AiSOC/docs/architecture).

## Profil deployment

| Profil | Perintah | Layanan | RAM | Yang didapat |
|---|---|---|---|---|
| **core** | `make up` | 16 | ~8 GB | Pipeline alert lengkap: ingest → deteksi → korelasi → alert → triase → konsol, ditambah gateway LLM, model lokal, feed CISA KEV, serta layanan konektor dan respons yang dijangkau alat vendor milik agent |
| **full** | `make up-full` | 22 | ~12 GB | Core ditambah event lake, graf entitas, pencarian teks penuh, dan enrichment |
| **demo** | `make up && make demo` | 16 | ~8 GB | Core ditambah data sintetis berlabel |

CORE adalah deployment terkecil yang mengambil event nyata dan menghasilkan alert nyata, dan **tidak membutuhkan kredensial untuk keduanya.**

**Model dikirim bersama gateway.** Ollama menjalankan `llama3.2:3b-instruct-q4_K_M` berukuran sekitar 2 GB yang dipatok versinya dan disesuaikan untuk inferensi hanya-CPU, sehingga `make up` menghasilkan vonis triase nyata dengan jumlah token nyata di Investigation Ledger, bukan stub. Ini bukan model frontier: dari 50 alert, model memberi keluaran triase yang bisa dipakai 44 kali sebelum balasan dibatasi ke JSON dan 50 kali sesudahnya ([metode](https://github.com/beenuar/AiSOC/blob/main/scripts/measure_triage_reliability.py)), dan rail melabeli jalur mana yang menjawab. Jalankan lebih cepat dengan `make up-gpu`, `make up-host-llm`, atau penyedia kamu sendiri dari konsol ([keempat cara](https://github.com/beenuar/AiSOC/blob/main/apps/docs/docs/operations/where-the-model-runs.md)). **Belum pernah ada penyedia hosted yang diuji di sini** karena tidak ada kunci berbayar, sehingga baris per-model tertulis *tidak diukur*, bukan nol. ([ADR-0006](https://github.com/beenuar/AiSOC/blob/main/docs/decisions/0006-llm-gateway-in-core.md))

**Satu feed eksternal nyata juga disertakan.** `services/threatintel` mengambil katalog CISA Known Exploited Vulnerabilities (publik, tanpa API key) ke halaman Threat Intelligence di konsol. Itu satu-satunya hal pada instalasi baru yang bukan sintetis dan bukan milikmu.

## Evaluasi, refleks, dan replay

Angka yang dipublikasikan membawa asal-usulnya sendiri. ([metodologi](https://beenuar.github.io/AiSOC/docs/benchmark) · [data nyata vs sintetis](https://github.com/beenuar/AiSOC/blob/main/apps/docs/docs/concepts/real-vs-synthetic.md))

- **Setiap scorecard vonis menyebut model yang benar-benar melayaninya**, diatestasi gateway atau dilaporkan sendiri, dengan status asal-usul yang eksplisit. Run tanpa atribusi, tanpa panggilan nyata, atau dengan fallback deterministik tidak boleh diiklankan sebagai performa model bernama.
- **Penyebut dipublikasikan, dan arah yang tidak enak yang menang.** Recall kohort penuh menyertakan abstain dan kegagalan dalam penyebut berbahaya. Klaim penutupan datang dengan tingkat kontaminasinya. Pengurangan alert punya tiga angka berlabel (75,3% pengelompokan lama, 33,3% kunci produksi, 24,5% pada kohort berbentuk deteksi setelah pengenal yang hilang diperbaiki untuk *mempersempit* kelompok). Yang tidak terukur tertulis *tidak diukur*, tidak pernah `0`.
- **Jalur refleks bisa diamati**: sembilan tahap bernama dari penundaan antrean sampai verifikasi, dengan kontrak keputusan yang memuat bukti pendukung, bukti yang bertentangan, prasyarat yang hilang, dan alasan eskalasi.
- **Replay dibekukan waktunya; perburuan ulang diberi label.** Replay historis menegakkan batas waktu bukti di kueri retrieval (bukan lewat prompt), mengungkapkan batas pengetahuan model, dan tidak bisa menjalankan aksi nyata, karena batas mutasi ada di write adapter. Menerapkan intelijen baru ke telemetri lama adalah mode tersendiri yang bisa dilatih, dan temuannya tidak pernah dihitung sebagai prediksi pada waktu event asli.
- **Kesesuaian model dinilai per tugas.** Matriks menilai tiap model yang dikonfigurasi pada bukti terkunci yang sama terhadap lantai baseline deterministik (akurasi seimbang tepat 0,250). Baris tanpa dana tertulis *tidak diukur*, dengan reproduksi satu perintah terhadap endpoint lokal yang kompatibel OpenAI.

## Agent AI

Agent melakukan triase alert dan menyelidiki insiden. Yang bisa dan tidak bisa mereka lakukan:

- **Mereka membaca** alert, alert saudaranya yang berkorelasi, konteks entitas, dan vonis sebelumnya untuk signature yang sama.
- **Mereka memanggil alat bertipe**: kueri lake, penelusuran graf, pencarian enrichment. Model memilih alat dan mengisi argumen, dan tidak pernah menulis SQL.
- **Semuanya dicatat** di Investigation Ledger (prompt, pemanggilan alat, kutipan, vonis, biaya token) dan bisa diekspor sebagai paket bertanda tangan.
- **Grounding diperiksa.** Vonis yang mengutip indikator yang tidak pernah ada di bukti diturunkan ke review manusia, bukan ditutup otomatis.
- **Prompt divalidasi sebelum dikirim.** Log mentah, payload OCSF, dan nilai berbentuk rahasia ditolak, bukan disamarkan setelahnya.
- **Tidak ada vendor yang disentuh tanpa manusia**, kecuali tenant secara eksplisit memberi otonomi untuk kata kerja itu. Setiap langkah respons dinilai terhadap kontrak kapabilitasnya sendiri saat dispatch, sehingga menyetujui sebuah playbook tidak pernah mengesahkan apa pun yang kebetulan ada di langkah-langkahnya. Penyetuju harus memegang tingkat izin yang diperlukan dan tidak boleh orang yang meminta aksi tersebut.

## Kematangan proyek

**Stable didefinisikan, dan ada gerbang yang menegakkannya.** Sebelumnya ia hanya prosa tanpa gerbang, sampai ditemukan tiga baris yang menggambarkan cakupan yang tidak ada. Sebuah baris baru berstatus Stable bila ada pemeriksaan yang berjalan di setiap pull request tanpa filter path, menjalankan jalur produksi sungguhan terhadap infrastruktur sungguhan, dan punya **kontrol negatif yang dibuktikan dengan merusak sesuatu lalu melihatnya menjadi merah**. ([batasnya](https://github.com/beenuar/AiSOC/blob/main/docs/audit/MATURITY_DEFINITION.md))

| Kapabilitas | Status | Diuji | Siap produksi |
|---|---|---|---|
| Ingest → deteksi → korelasi → alert | Stable | E2E + unit | Ya |
| Engine deteksi (2966 aturan yang bisa dieksekusi) dari 7407 | Stable | Bukti replay | Ya |
| Korelasi alert menjadi insiden | Stable | Unit | Ya |
| REST API + konsol web | Stable | Unit + integrasi | Ya |
| Triase AI + Investigation Ledger | Stable | Ledger Postgres hidup + run agent model lokal yang menjadi gerbang PR. Belum ada penyedia hosted yang diuji | Ya, mode copilot |
| Event lake + hunting (ClickHouse) | Stable | ClickHouse hidup pada DDL yang dikirim, dengan kontrol negatif | Ya, profil `full` |
| Retro-hunt saat intelijen baru tiba | Stable | ClickHouse + Kafka hidup dengan flag aktif, dengan kontrol negatif | Opt-in, profil `full` |
| Pustaka 68 hunt YAML, dikompilasi terhadap event tenant di lake | Stable | ClickHouse hidup: hunt terjadwal membaca data tenant dan menolak fallback ke fixture; ke-114 nama field yang disaring korpus berhasil dikompilasi | Ya, profil `full` |
| Provisioning SCIM 2.0 | Stable | Postgres hidup lewat aplikasi sungguhan, dengan kontrol negatif | Ya |
| Branding white-label | Stable | Postgres hidup: laporan terjadwal dan emailnya membawa merek organisasi, dengan dua kontrol negatif | Ya |
| Pengukuran penggunaan | Stable | ClickHouse hidup pada DDL yang dikirim, dengan kontrol negatif | Ya |
| Graf entitas (Neo4j) | Stable | Neo4j hidup terhadap pembaca produksi, dengan kontrol negatif | Ya, profil `full` |
| Aksi respons yang diatur | Stable | Soket hidup: mengizinkan, menolak, tidak pernah membocorkan penolakan, dengan kontrol negatif | Hanya dengan persetujuan manusia |
| Playbook yang dipicu alert, dengan jeda persetujuan yang tahan lama | Stable | Postgres hidup: suspend, restart, resume, kedaluwarsa, dengan kontrol negatif | Ya, tiga opt-in dalamnya, pratinjau secara default |
| Penyetelan deteksi per tenant di engine hidup | Stable | Postgres hidup: penyetelan yang ditulis mengubah apa yang dipicu engine, dengan kontrol negatif | Ya |
| Konektor terjadwal | Stable | Scheduler hidup melakukan polling vendor tiruan ke ingest, dengan kontrol negatif | Ya |
| UEBA | Stable | Postgres hidup: migrasi, penilaian, persistensi, isolasi, dengan kontrol negatif | Ya, profil `full` |
| Distribusi paket (npm/PyPI) | Beta | Lima paket PyPI terselesaikan pada versi pohon kode, diperiksa terhadap registri hidup di kedua arah; sisi npm belum punya status registri untuk diverifikasi | `pip install aisoc-sandbox` (dan empat lainnya) berfungsi hari ini; tiga paket npm masih menunggu `NPM_TOKEN` unggahan pertama, sebuah tindakan akun |

## Yang bukan AiSOC

- **Bukan pengganti SIEM yang bisa langsung dipasang.** Ia mengorelasikan dan menyelidiki, tetapi tidak menggantikan retensi log jangka panjang dan pencarian untuk kepatuhan.
- **Tidak bisa melihat telemetri yang belum kamu hubungkan.** Tidak ada penemuan otomatis.
- **Tidak otonom secara default.** Respons membutuhkan otorisasi kebijakan yang eksplisit dan penyetuju manusia.
- **Insiden demo dan sampel bukan insiden nyata**, dan angka benchmark adalah ukuran konsistensi substrat, bukan akurasi agent di lingkungan hidup, dan diberi label demikian di mana pun dipublikasikan.

## Pemecahan masalah

`make doctor` memeriksa alat host, memori, disk, setiap port, dan tiap datastore dengan *mengkuerinya*, bukan sekadar menanyakan apakah kontainernya hidup, lalu mencetak perintah berikutnya yang harus dijalankan. Kontainer yang dimatikan karena VM Docker penuh disebut sebagai itu, bukan sebagai layanan yang kebetulan mati. ([enam kegagalan paling umum](https://beenuar.github.io/AiSOC/docs/installation#the-six-most-common-failures))

## Keamanan

Rahasia dibuat per deployment dan tidak pernah di-commit. Kredensial konektor dienkripsi saat disimpan. Layanan terhubung ke Postgres sebagai peran khusus DML sehingga row-level security benar-benar berlaku, dan isolasi tenant ditegakkan di lapisan kueri di setiap penyimpanan. RBAC menjaga setiap rute yang mengubah data, ingest diautentikasi, dan instalasi default tidak mengirim prompt ke mana pun, karena model berjalan di sampingnya.

Ada sign-in SAML dan OIDC dengan pemetaan tenant dan grup per koneksi, provisioning SCIM, dan **MFA** konsol (TOTP dengan kode pemulihan, bisa diwajibkan per tenant). Kondisi atribut, elevasi berbatas waktu, dan identitas beban kerja berjalan di satu jalur izin, tempat sebuah kondisi hanya bisa mempersempit izin dan tidak pernah memberikannya. ([SSO](https://github.com/beenuar/AiSOC/blob/main/apps/docs/docs/operations/enterprise-sso.md) · [tata kelola akses](https://github.com/beenuar/AiSOC/blob/main/docs/security/access-governance.md))

**Layanan tanpa kredensial menolak melayani, bukan melayani tanpa autentikasi.** [Changelog](https://github.com/beenuar/AiSOC/blob/main/CHANGELOG.md) mencatat setiap perbaikan. Laporkan kerentanan lewat [SECURITY.md](https://github.com/beenuar/AiSOC/blob/main/SECURITY.md).

## Pengembangan

```bash
make test        # unit test untuk setiap layanan
make smoke       # pipeline emas, terhadap stack yang berjalan
make stats       # hitung ulang setiap angka yang dipublikasikan README ini
```

Panduan: [menambah konektor](https://beenuar.github.io/AiSOC/docs/plugins/hello-plugin) · [menambah deteksi](https://beenuar.github.io/AiSOC/docs/detections/hello-hunt) · [siklus hidup plugin](https://beenuar.github.io/AiSOC/docs/plugins/lifecycle). Setiap hitungan di atas dihitung ulang dari pohon kode, dan CI gagal bila README tidak sesuai.

## Pendanaan dan lisensi

Pengembangan didanai dan didukung oleh **[Cyble](https://cyble.com)**, yang membayar waktu rekayasa di balik AiSOC dan merilisnya di bawah lisensi MIT. Itu tidak memberi perlakuan khusus di sini: tidak ada fitur khusus Cyble, tidak ada modul berbayar, dan tidak ada telemetri. ([kredit lengkap](https://github.com/beenuar/AiSOC/blob/main/.github/CREDITS.md))

[ROADMAP.md](https://github.com/beenuar/AiSOC/blob/main/ROADMAP.md) · [CONTRIBUTING.md](https://github.com/beenuar/AiSOC/blob/main/CONTRIBUTING.md) · [SECURITY.md](https://github.com/beenuar/AiSOC/blob/main/SECURITY.md) · Lisensi MIT
