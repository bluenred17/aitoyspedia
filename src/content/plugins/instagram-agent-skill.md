---
title: "Instagram Agent Skill"
summary: "Tiga belas skill Claude untuk menjalankan akun Instagram (Reels, caption, carousel, story, profil, rencana mingguan, komentar, DM, dan audit) dengan lima alat Python lokal, tanpa API key dan tanpa auto-posting."
category: marketing
tags: [instagram, media-sosial, reels, caption, carousel, humanizer, konten, hook]
surfaces: [claude-ai, claude-code]
source_url: "https://github.com/Jakeschincariol/instagram-agent-skill/blob/main/README.md"
repo: Jakeschincariol/instagram-agent-skill
stars: 4883
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
install: |
  # Cara 1: tempel ini ke Claude
  https://github.com/Jakeschincariol/instagram-agent-skill

  Install this skill, then confirm /ig-reel works.

  # Cara 2: di Claude Code, lakukan sendiri
  git clone https://github.com/Jakeschincariol/instagram-agent-skill.git
  cp -r instagram-agent-skill/skills/ig-* ~/.claude/skills/

  # Cara 3: sebagai plugin
  /plugin marketplace add Jakeschincariol/instagram-agent-skill
  /plugin install instagram-agent

  # Proyek-lokal alih-alih global: salin folder yang sama ke .claude/skills/ di repo kamu.
  # Tanpa Claude Code sama sekali: tempel satu SKILL.md di awal chat dan ia berjalan sebagai mode
  # (lima alat Python tidak tersedia).
includes: [ig-reel, ig-viral, ig-caption, ig-carousel, ig-story, ig-profile, ig-plan, ig-human, ig-comment, ig-reply, ig-dm, ig-repurpose, ig-audit]
---

# Instagram Agent Skill

Tiga belas skill Claude yang menjalankan akun Instagram. Gratis, MIT, tanpa pendaftaran, tanpa API key, tidak ada yang perlu dihubungkan.

Salah satunya menulis Reels kamu dari 26 formula hook dan menilai hook-nya sebelum kamu membuang satu take. Satu lagi mencari reel yang benar-benar berhasil di niche kamu dan mengurutkannya berdasarkan seberapa jauh masing-masing mengalahkan akunnya sendiri. Satu menulis caption dan menunjukkan persis apa yang tampil di feed sebelum "... more". Satu menilai profilmu dari 100 dan menulis ulang bagian yang kehilangan poin. Satu merencanakan minggumu.

Dan satu adalah humanizer, yang menjadi alasan sisanya bisa dipakai. Ia membuang em dash, kosakata klise, dan karakter watermark tak terlihat dari sebuah draf, lalu menilai sisanya dengan panel lima pemeriksaan sebelum kamu sempat melihatnya.

**Tidak ada yang diposting sampai kamu bilang ya.** Skill ini menulis. Kamu yang memposting.

> **Catatan dari situs ini:** (1) Skill ini tidak memposting ke Instagram dan tidak meminta login atau kredensial; itu disengaja (lihat bagian "Catatan kecil" di bawah). (2) Cara pasang pertama adalah prompt yang ditempel ke Claude, bukan perintah shell; Claude yang menjalankan pemasangannya, jadi periksa apa yang ia lakukan. (3) Lima alat Python berjalan di mesinmu dan butuh `python3`. (4) Bagian kredit dan tautan repo kembaran (LinkedIn) tidak disalin.

## Pasang

Tempel ini ke Claude:

```
https://github.com/Jakeschincariol/instagram-agent-skill

Install this skill, then confirm /ig-reel works.
```

Atau lakukan sendiri, di Claude Code:

```bash
git clone https://github.com/Jakeschincariol/instagram-agent-skill.git
cp -r instagram-agent-skill/skills/ig-* ~/.claude/skills/
```

Atau sebagai plugin:

```
/plugin marketplace add Jakeschincariol/instagram-agent-skill
/plugin install instagram-agent
```

Proyek-lokal alih-alih global: salin folder yang sama ke `.claude/skills/` di repo kamu. Tanpa Claude Code sama sekali? Tempel satu `SKILL.md` di bagian atas chat dan ia berjalan sebagai mode. Kamu kehilangan lima alat Python, yang merupakan inti dari `/ig-reel` dan `/ig-human`, tetapi sisanya berfungsi.

Lalu luangkan sepuluh menit untuk `templates/voice.md`. Salin ke `~/.claude/instagram/voice.md` dan isi, atau kirim ke Claude tiga reel milikmu dan katakan "write my voice.md from these". Setiap skill membaca file itu. Ia lebih penting di sini daripada di platform lain, karena kamu harus mengucapkan kata-katanya dengan lantang.

## Tiga belas skill

| Perintah | Fungsinya |
| --- | --- |
| `/ig-reel` | Satu ide menjadi Reel. Tiga hook dari [26 formula](https://github.com/Jakeschincariol/instagram-agent-skill/blob/main/skills/ig-reel/hooks.json), dinilai, lalu skrip, teks di layar, dan beat sheet berwaktu. |
| `/ig-viral` | Mencari apa yang berhasil di niche kamu, mengurutkannya berdasarkan kelipatan terhadap median tiap akun, menamai formulanya, dan menulis swipe file. |
| `/ig-caption` | Caption yang di-lint. Menunjukkan 125 karakter yang benar-benar tampil di feed sebelum diketuk. |
| `/ig-carousel` | Postingan swipe. Cover yang layak di-swipe, teks slide, dan file 1080x1350. |
| `/ig-story` | Urutan story harian, stiker mana yang punya tugas apa, dan funnel DM yang dimulai dari mereka yang bergerak lebih dulu. |
| `/ig-profile` | Menilai profilmu terhadap [rubrik 12 bagian](https://github.com/Jakeschincariol/instagram-agent-skill/blob/main/skills/ig-profile/rubric.json) dari 100, lalu menulis ulang dengan urutan perbaiki-dulu. |
| `/ig-plan` | Minggunya. Apa yang diposting, format apa, kapan, dan 10 akun yang perlu dilibatkan. |
| `/ig-human` | Humanizer. Dua skrip yang benar-benar berjalan. Lihat di bawah. |
| `/ig-comment` | Komentar di postingan orang lain. Sembilan jenis, dipilih menurut apa postingan itu sebenarnya. Tidak pernah "🔥🔥🔥". |
| `/ig-reply` | Thread di bawah postinganmu sendiri. Memilah menjadi keyword / lead / substansi / pertanyaan / dukungan / noise, lalu menulis dalam urutan itu. |
| `/ig-dm` | Pengiriman keyword, pesan pertama, pitch kolaborasi, dan dua tindak lanjut. Dua. |
| `/ig-repurpose` | Satu video, podcast, atau newsletter menjadi sepekan reel dan carousel yang masing-masing bisa berdiri sendiri. |
| `/ig-audit` | Post-mortem atas apa yang sudah kamu posting. Mengurutkan berdasarkan kelipatan outlier dan kiriman per jangkauan, bukan views. |

## Lima alat yang benar-benar berjalan

Tanpa dependensi, tanpa jaringan, tidak ada yang diunggah. Berjalan di mesinmu, pada teksmu.

### Hook

```bash
python3 hookscore.py hooks.txt              # urutkan opsi kamu
python3 beats.py script.txt --target 30     # hitung waktunya sebelum syuting
```

```
HOOK RANKING
==============================================================================
->  85.6 STRONG  Nobody tells you that your first 30 reels are supposed to f...
        weakest: SPECIFICITY (75)
    81.4 STRONG  I lost $18,000 because of one missing contract.
        weakest: ADDRESS (70)
    54.4 OK      Stop scrolling if you want to grow on Instagram in 2026 🔥
        weakest: STAKES (70)
        dealbreaker: Opens with "stop scrolling". Asking for attention proves
                     you have not earned it.
     9.6 WEAK    Hey guys, today I wanted to talk about content strategy
        weakest: FRONTLOAD (0)
        dealbreaker: Greeting. Nobody came to the feed to be greeted.
```

`beats.py` memperkirakan berapa lama tiap baris diucapkan, menumpuknya menjadi timecode, dan menandai empat hal yang mematikan sebuah Reel saat editing: hook yang melewati tiga detik, satu beat yang cukup panjang bagi penonton untuk pergi, serangkaian baris tanpa sesuatu yang konkret, dan tidak ada loop kembali ke baris pertama.

```
BEAT SHEET  ·  73 words  ·  ~26.6s at 165 wpm  ·  target 30.0s
========================================================================
  0:00.0   2.9s  HOOK    I lost $18,000 because of one missing contract.
  0:02.9  14.6s  MID     Here is the exact clause I now put in every single...
                         ^ 14.6s on one beat
  0:17.4   2.9s          Section 4. Payment on delivery, not on approval.
  0:20.4   2.9s          Approval is a feeling. Delivery is a date.
  0:23.3   3.3s  CTA     That one word change is worth $18,000 to me.
------------------------------------------------------------------------
  - Beat 2 runs past 4s. Either split the line or change what is on screen
    inside it. A static frame is where people leave.
  - Loops: the last beat repeats "$18,000" from the hook. Second watches are
    free reach.
  - 3.5s under target. Either add 9 words or shoot it short. Short is usually
    right.
```

### Caption

```bash
python3 caption.py caption.txt --keywords "client contracts,freelance pricing"
```

Instagram menampilkan sekitar 125 karakter caption di feed dan menyembunyikan sisanya di balik ketukan. Hampir setiap caption yang gagal, gagal di situ. Jadi hal pertama yang dicetak adalah jendela itu, sebagai kotak, seperti yang dibaca orang asing yang sedang scroll:

```
  WHAT THE FEED SHOWS
  +------------------------------------------------------+
  | I lost $18,000 because of one missing clause in a    |
  | contract, and the worst part is that I had read the  |
  | thing twice before I si                              |
  +-------------------------------------------- ... more +

  PASS  LENGTH            389 / 2200 characters
  WARN  FIRST LINE        133 characters, so it gets cut at 125 mid-thought
  PASS  HOOK IS CONCRETE  2 numbers or names in the visible window
  PASS  HASHTAGS          3 tags: #freelance #contracts #agencyowner
  PASS  ONE ASK           one call to action: comment a keyword
  WARN  SEARCH TERMS      1/2 present. Missing: client contracts
```

Ia menegakkan batas hashtag saat ini, yaitu **lima per postingan**, bukan tiga puluh. Instagram memangkasnya pada 18 Desember 2025.

### Humanizer

```bash
python3 humanize.py draft.txt --report      # bersihkan, tunjukkan setiap perubahan
python3 detect.py draft.txt                  # nilai, lima pemeriksaan
python3 detect.py before.txt after.txt       # buktikan selisihnya
```

**Yang dibuang otomatis:**

- **Karakter tak terlihat.** Zero-width space dan joiner, word joiner, soft hyphen, byte-order mark, karakter tag Unicode, pemisah tak terlihat, spasi tak terputus dan spasi sempit. Keyboard kamu tidak membuatnya. Ia bertahan saat copy-paste dan tak terlihat di editor mana pun yang kamu punya.
- **Tipografi.** Em dash menjadi koma, en dash menjadi tanda hubung, tanda kutip melengkung menjadi lurus, elipsis menjadi tiga titik, dan tanda baca yatim yang tersisa.
- **Leksikon.** 154 kata dan frasa klise dengan pengganti bahasa sederhana. Blok terakhirnya khusus Instagram: "stop scrolling", "in today's video", "follow for more", "tag someone who needs this", "the algorithm loves", "run don't walk". Ia ada di [`slop.json`](https://github.com/Jakeschincariol/instagram-agent-skill/blob/main/skills/ig-human/slop.json) dan memang dimaksudkan untuk diedit.

**Yang ditandai alih-alih diperbaiki:** "It's not just X, it's Y", triad aturan-tiga, pembuka video, daftar bullet emoji, tiga kata berteriak berturut-turut, tembok hashtag, umpan follow refleks, panjang kalimat yang seragam. Mengubah bentuk sebuah kalimat butuh penilaian, jadi hal-hal itu dikembalikan untuk ditulis ulang alih-alih dirusak oleh regex.

Dijalankan pada caption yang ditulis seburuk mungkin:

```
  BURSTINESS    ###################.....  78.4
  SPECIFICITY   #############...........  53.6    3.4 concrete markers per 100 words
  SLOP DENSITY  ........................   0.0    20 stock terms, 23.0 per 100 words
  FINGERPRINT   ################........  68.7    1 em dash
  VOICE         #################.......  70.0    9 structural tells
  ------------------------------------------------------------
  HUMAN SCORE   ########................  32.5   FLAGGED
```

Setelah `humanize.py`, dengan struktur yang ditandai masih belum ditulis ulang:

```
  HUMAN SCORE   ###################.....  79.7   PASS    (+47.2)
```

### Swipe file

```bash
python3 swipe.py captured.tsv --out ~/.claude/instagram/swipe.md
```

Views mentah bukan bukti. Akun 2.000.000 pengikut dengan 400.000 views sedang melewati Selasa yang sepi. Akun 4.000 pengikut dengan 400.000 views menemukan sesuatu. `swipe.py` mengurutkan berdasarkan kelipatan terhadap median tiap akun, menamai formula hook, dan mencetak apa yang memisahkan sepertiga teratas dari sepertiga terbawah.

```
SWIPE FILE  ·  4 reels  ·  4 accounts  ·  baseline: account median
==============================================================================
    60.0x  hook  57  #9  The Steal              @c                 180,000
           "steal this four line follow up it took me two years"
    37.5x  hook  86  #3  Nobody Tells You       @a                 412,000
           "nobody tells you that your first 30 reels are supposed to flop"
     1.3x  hook  13  -   unclassified           @b               1,200,000
           "in this video I am going to show you my morning routine"
```

## Yang benar-benar saya ukur, bagian yang layak dibaca

Saya tidak mau menerbitkan penilai hook hanya dengan klaim bahwa rasanya benar, jadi saya mengujinya. Korpusnya adalah **74 hook short-form nyata**: tiga detik pertama track auto-caption dari delapan short berperforma terbaik dan delapan terbawah di lima kanal, dengan jumlah view dari 931 sampai 550.000.

Itu YouTube Shorts, bukan Reels, karena Instagram tidak memberi jumlah view yang bisa dikumpulkan tanpa login ke akun orang lain, dan men-scrape-nya akan melanggar Ketentuan yang diminta repo ini untuk tidak dilanggar. Tata bahasa hook-nya sama dan sumbernya publik. Itu keterbatasan nyata dan dinyatakan di sini, bukan disembunyikan.

**Tiga hasil, dua di antaranya tidak menyenangkan:**

**1. Ia menangkap hook yang buruk dengan baik.** Terhadap sepuluh hook yang sengaja ditulis buruk, AUC 0,83, dan sembilan dari sepuluh mendapat skor di bawah median korpus nyata. Jika hook kamu dibuka dengan sapaan, pembuka, atau tanpa sesuatu yang konkret, ia akan memberi tahu.

**2. Ia tidak memilih pemenang.** Memisahkan hit seorang kreator yang bagus dari kegagalan kreator yang sama: **AUC 0,56, di mana 0,50 adalah lempar koin.** Dari lima pemeriksaan, hanya SPECIFICITY yang memisahkan kelompok secara berarti, dengan selisih median 60 poin. STAKES dan ADDRESS punya median identik di kedua kelompok, artinya pada korpus ini keduanya tidak mengukur apa pun.

Jadi pemakaian yang jujur adalah: singkirkan hook yang jelas lemah sebelum syuting, lalu percayai grafik retensimu sendiri. Tidak ada yang membaca teks yang bisa memberi tahu mana dari dua hook yang layak yang akan menyebar, karena itu ditentukan oleh wajahmu, editmu, audiomu, dan siapa yang ditunjukkan Instagram.

**3. Klasifikator formula rusak dan pengujianlah yang menangkapnya.** Regex `match` di `hooks.json` ditulis dari template saya sendiri, dan hanya menamai **8%** hook nyata. Orang tidak bicara dalam template. Menulis ulang terhadap ucapan transkrip yang sebenarnya menaikkannya menjadi **49%**, dan empat formula masuk ke set karena terus muncul dan belum ada: Contrarian Flip, The Statistic, The Reveal, Someone Else's Result, ditambah The Superlative. Pada 51% sisanya ia abstain, yang benar: banyak short-form adalah klip podcast yang tidak punya formula hook sama sekali.

Satu bug yang diperbaiki layak disebut: `SPECIFICITY` hanya menghitung digit, sehingga "zero dollars" dan "three marketing books" dianggap tidak punya sesuatu yang konkret. Hook yang diucapkan menyebut angkanya dengan lantang.

Jika kamu menjalankan ulang ini pada korpus yang lebih besar atau lebih bersih dan mendapat jawaban berbeda, saya lebih suka tahu. Skrip pengukurannya tidak ada di repo karena bergantung pada `yt-dlp`, tetapi metodenya empat baris dan dituliskan di [`/ig-viral`](https://github.com/Jakeschincariol/instagram-agent-skill/blob/main/skills/ig-viral/SKILL.md).

## Catatan kecil, bagian yang jujur

**Skill ini tidak memposting ke Instagram.** Ada Content Publishing API yang nyata untuk akun Profesional, dan ia butuh aplikasi developer Meta, Page yang terhubung, token berumur panjang, dan app review, yang bukan sesuatu yang bisa diberikan sebuah skill. Semua hal lain yang dipakai orang untuk mengotomatiskan posting, komentar, follow, atau DM adalah otomasi browser atau alat pihak ketiga, dan keduanya melanggar [Ketentuan Penggunaan Instagram](https://help.instagram.com/581066165581870) dan membuat akun terkena action-block. Jadi setiap skill di sini berakhir dengan cara yang sama: blok siap salin, dan kamu yang memposting. Itu bukan keterbatasan yang ditempelkan belakangan, melainkan desainnya, dan itulah mengapa gerbang persetujuan itu nyata dan bukan sekadar pengaturan.

Satu pengecualian adalah balasan otomatis keyword di DM, yang didukung Instagram lewat alatnya sendiri dan mitra yang disetujui, dan yang hanya terpicu setelah seseorang berkomentar lebih dulu. `/ig-dm` menyebut di mana garis itu berada.

**`/ig-viral` membaca, tidak men-scrape.** Sepuluh akun, selusin reel masing-masing, dengan kecepatan manusia, dengan kamu yang mengendalikan browsermu sendiri. Ia tidak pernah meminta kata sandimu dan tidak pernah login sebagai kamu. Pengumpulan otomatis dalam volume besar adalah hal yang membuat akun dibatasi, dan ini bukan crawler.

**Lima pemeriksaan deteksi adalah heuristik lokal, bukan API detektor.** Mereka dimodelkan dari sinyal yang dipakai detektor publik dan berjalan sepenuhnya di mesinmu. Mereka bukan GPTZero, Originality, Copyleaks, Winston, atau Turnitin, tidak memanggil layanan-layanan itu, dan tidak bisa menjanjikan vonis mereka. Memperbaiki apa yang mereka ukur cenderung menggeser angka-angka itu, karena mereka mengukur hal dasar yang sama. Hanya itu klaimnya. Tidak ada yang bisa jujur menjual "tidak terdeteksi", dan siapa pun yang melakukannya sedang menjual sesuatu kepadamu.

**Pembersihan karakter tak terlihat itu nyata dan sempit.** Ia membuang karakter zero-width dan format yang berakhir di teks hasil generasi dan bertahan saat copy-paste. Itu sidik jari yang nyata dan bisa diperiksa. Itu bukan klaim tentang mengalahkan skema watermarking kriptografis, dan repo ini tidak membuat klaim itu.

**Tidak ada yang dikarang di sini.** Tidak ada metrik, klien, atau hasil rekaan yang ditaruh atas namamu. Jika sebuah draf butuh angka yang belum kamu berikan, ia kembali dengan `{{your number}}` di dalamnya dan sebuah penanda, setiap kali.

**Angka platform menjadi usang.** Batas hashtag berpindah dari 30 ke 5 pada Desember 2025 saat repo ini ditulis, dan linter masih memakai angka lama sampai fakta itu diperiksa. Jika sesuatu di sini bertentangan dengan yang dilakukan Instagram saat kamu membacanya, Instagram yang benar.

## File

```
skills/ig-reel/hooks.json          26 hook formulas: template, example, on-screen line,
                                   what it is for, how it gets ruined, and a match regex
skills/ig-reel/hookscore.py        the five-property hook panel
skills/ig-reel/beats.py            script to timed beat sheet
skills/ig-caption/caption.py       the truncation preview and the caption linter
skills/ig-human/slop.json          the lexicon: 154 terms, 18 invisible classes, 16 tells
skills/ig-human/humanize.py        the three cleaning passes
skills/ig-human/detect.py          the five-check panel
skills/ig-viral/swipe.py           outlier ranking and formula classification
skills/ig-profile/rubric.json      the 100-point profile score
templates/voice.md                 your voice profile. Fill this in first.
```

## Lisensi

MIT. Ambil, ubah, kirim.
