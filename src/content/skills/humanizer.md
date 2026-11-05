---
title: "Humanizer"
summary: "Skill yang menulis ulang teks buatan AI agar terdengar seperti ditulis manusia tanpa mengubah isinya, berdasarkan panduan Wikipedia \"Signs of AI writing\" dan 26 pola yang diperiksanya."
category: writing
tags: [penulisan, editing, humanize, gaya-bahasa, teks-ai, wikipedia]
surfaces: [claude-ai, claude-code, desktop]
source_url: "https://github.com/blader/humanizer/blob/main/README.md"
repo: blader/humanizer
stars: 64913
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
trigger: "Dipanggil dengan /humanizer (atau /humanizer:humanizer sebagai plugin) atau permintaan seperti \"humanize this text\" untuk menulis ulang teks yang terdengar buatan AI."
install: |
  /plugin marketplace add blader/humanizer
  /plugin install humanizer@humanizer
---

# Humanizer

Disponsori oleh [cfo.ai](https://cfo.ai).

Humanizer membuat teks tulisan AI terdengar seperti ditulis manusia, tanpa mengubah apa yang dikatakannya. Ia dibangun di atas [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) milik Wikipedia, panduan yang dipakai editor Wikipedia untuk menangkap teks buatan AI, dan bekerja di Claude Code, Codex, dan agent lain yang mendukung skill.

**Sebelum:**
> I'm thrilled to announce that shared drafts are finally here! 🚀 For months, our own team was drowning in files named final_v7.docx — and we knew there had to be a better way. Now two people can edit the same doc at once, with every change appearing live for both of them. It's not just a feature; it's a whole new way to collaborate. Comments stay anchored to the exact sentence they reference, even as the text around them evolves. And the best part? It's available today on every plan, completely free. Let that sink in.

**Sesudah:**
> Shared drafts are out today. For months our own team passed around files named final_v7.docx, so we built a way for two people to edit the same doc at once, with each person's changes showing up live for the other. Comments stay pinned to the sentence they're about, even when the text around them changes. It's free on every plan.

Dalam tes buta, juri memilih hasil tulis ulang Humanizer dibanding teks AI aslinya sebanyak 16 dari 16 kali ([#229](https://github.com/blader/humanizer/issues/229)).

Humanizer menyunting untuk pembaca manusia. Lolos dari detektor AI bukan tujuannya, dan detektor masih menandai sebagian besar keluarannya.

> **Catatan dari situs ini:** pola-pola dan contoh di README ini ditulis untuk bahasa Inggris. Teks contoh dibiarkan dalam bahasa aslinya karena menunjukkan kebiasaan penulisan AI berbahasa Inggris; nama pola dan penjelasannya saya terjemahkan.

## Lima tanda terkuat

Ini adalah tanda tulisan AI yang paling umum, dan Humanizer menulis ulang yang mana pun begitu terlihat:

1. **Not X but Y:** "It's not just a feature, it's a shift."
2. **Penutup satu baris:** "Let that sink in."
3. **Ungkapan yang terdengar dalam:** "At its core, what really matters is..."
4. **Pengantar yang dipentaskan:** "Here's the thing." "Honestly?"
5. **Berdebat dengan tak seorang pun:** "I'm not saying X, but..."

Secara keseluruhan Humanizer memeriksa [26 pola](#26-pola).

## Pemasangan

Setelah terpasang, skill menjawab `/humanizer`.

### Claude Code

```text
/plugin marketplace add blader/humanizer
/plugin install humanizer@humanizer
```

Plugin menjawab `/humanizer:humanizer`. Membutuhkan Claude Code 2.1.142 atau lebih baru; pada versi yang lebih lama, pakai `npx skills add blader/humanizer --global --agent claude-code`.

### Codex

```bash
npx skills add blader/humanizer --global --agent codex
```

### Claude.ai dan Claude Desktop

Unduh repositori ini sebagai ZIP (**Code → Download ZIP**) dan unggah sebagai skill di Settings.

### Agent lain

```bash
npx skills add blader/humanizer --global --agent '*'
```

Ini memasang Humanizer untuk setiap agent yang didukung Skills CLI, termasuk Gemini CLI, GitHub Copilot, dan Windsurf. Hilangkan `--global` di perintah mana pun di atas untuk memasangnya hanya di proyek saat ini. Untuk agent yang tidak dikenal Skills CLI, salin `SKILL.md` ke folder skill-nya.

## Cara memakai

Panggil skill secara langsung:

```
/humanizer

[paste your text here]
```

Atau minta dengan bahasa biasa:

```
Please humanize this text: [your text]
```

Untuk menulis ulang sebuah file, berikan path-nya ke Humanizer:

```
Humanize the prose in docs/launch-post.md
```

### Cocokkan suaramu

Kalau kamu ingin tulis ulangnya terdengar lebih seperti kamu, sertakan contoh:

```
/humanizer

Here's a sample of my writing for voice matching:
[paste 2-3 paragraphs of your own writing]

Now humanize this text:
[paste AI text to humanize]
```

Humanizer mengikuti irama, pilihan kata, tanda baca, dan kekhasan yang disengaja dari contohmu, termasuk tanda pisah (dash) bila kamu memakainya.

## Cara kerjanya

Model bahasa menulis apa pun yang paling mungkin muncul berikutnya, jadi secara default ia membuat pilihan yang cocok untuk rentang pembaca dan subjek paling luas. Manusia memilih untuk satu pembaca dan satu subjek. Setiap tanda yang dicari Humanizer adalah bentuk dari pilihan default itu: kalimat yang menandakan pentingnya sesuatu alih-alih menambahkan fakta, irama atau format yang diterapkan menurut aturan, fakta biasa yang didandani seolah penting, sisa teks dari chat, atau balasan yang menjelaskan ulang apa yang sudah diketahui pembaca.

> "LLMs use statistical algorithms to guess what should come next. The result tends toward the most statistically likely result that applies to the widest variety of cases."
> Wikipedia, ["Signs of AI writing"](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)

Humanizer menandai setiap tanda yang ditemukannya, dari yang terkuat. Ia membuat draf tulis ulang tanpa menganggap struktur aslinya tetap, memeriksa draf terhadap pola dan klaim aslinya, lalu menulis versi akhir. Ia tidak mengarang. Nama, angka, tanggal, kutipan, sitasi, atau detail fakta lain harus berasal dari sumber atau penulisnya, dan kalau sebuah kalimat membutuhkan detail yang hilang, Humanizer bertanya alih-alih menciptakannya.

Saat kamu menempelkan teks, Humanizer menunjukkan prosesnya: tulis ulang pertama, kritik singkat atas apa pun yang masih terdengar buatan, dan versi akhir. Arahkan ke sebuah file dan ia hanya mengubah prosanya, membiarkan kode, data, frontmatter, dan target tautan. Tulisan pribadi mempertahankan opini dan kekhasan penulisnya. Prosa teknis dan referensi tetap netral dan sederhana.

## 26 pola

Pola diberi nomor menurut kekuatan dan frekuensi. Lima yang pertama membenarkan suntingan hanya dengan satu kali terlihat. Pola yang bertanda *lemah sendirian* baru dihitung bila beberapa tanda berada dalam satu bagian, karena penulis yang cermat bisa memakai salah satunya dengan sengaja.

### A. Mementaskan alih-alih menyatakan

| # | Pola | Sebelum | Sesudah |
|---|---------|--------|-------|
| 1 | **Not X but Y** | "It's not just X, it's Y", "This doesn't mean X. It means Y." | Nyatakan intinya langsung |
| 2 | **Penutup satu baris dan fragmen dramatis** | "That is the real win." setelah tiap bagian; "This shows the importance of..." setelah contoh; "No prior. No nostalgia." | Buang penutup yang mengulang atau menjelaskan contoh; gabungkan fragmen menjadi satu klaim spesifik |
| 3 | **Ungkapan yang terdengar dalam** | "At its core, what matters is...", "Symmetry is the language of trust" | Ganti ungkapan itu dengan klaim yang spesifik |
| 4 | **Pengantar yang dipentaskan sebelum inti** | "Let's dive in", "Honestly? It depends..." | Buang pengantar dan nyatakan intinya |
| 5 | **Berdebat dengan tak seorang pun** | "This isn't mainly about...", "A tempting approach would be..." | Buang keberatan yang tidak diajukan atau pilihan palsu; pertahankan klaim yang nyata |

### B. Irama menurut aturan

| # | Pola | Sebelum | Sesudah |
|---|---------|--------|-------|
| 6 | **Triad paksa** | "innovation, inspiration, and insights"; tiga contoh plus pelajaran | Pakai jumlah butir yang dibutuhkan maknanya |
| 7 | **Awalan kalimat yang berulang** | "She noted... She noted... She filed..." | Gabungkan kalimat atau ganti subjeknya |
| 8 | **Tanda pisah sebagai penghubung universal** (*lemah sendirian*) | "institutions—not the people—yet this continues—" | Pakai titik, koma, titik dua, atau tanda kurung; cocokkan dengan contoh yang memakai tanda pisah |
| 9 | **Kualifikator bertumpuk** (*lemah sendirian*) | "could potentially possibly be argued" | Pertahankan hanya kualifikator yang didukung sumber |
| 10 | **Pasangan bertanda hubung di mana-mana** (*lemah sendirian*) | "the report is high-quality" | Pertahankan tanda hubung sebelum kata benda atau bila kamus memilikinya |
| 11 | **Kalimat pasif dan subjek yang hilang** (*lemah sendirian*) | "No configuration file needed" | Sebut pelakunya bila itu membantu |

### C. Inflasi dan otoritas pinjaman

| # | Pola | Sebelum | Sesudah |
|---|---------|--------|-------|
| 12 | **Kata yang terlalu sering dipakai AI** | "delve... testament... landscape... showcasing" | Pakai kata sederhana |
| 13 | **Pentingnya yang digelembungkan** | "marking a pivotal moment", "Despite challenges... continues to thrive", "The future looks bright" | Pertahankan faktanya dan buang klaim pentingnya; akhiri pada fakta konkret terakhir |
| 14 | **Hubungan atau asosiasi yang kabur** | "associated with the leadership of", "in connection with" | Nyatakan hubungan yang diberikan sumber |
| 15 | **Pendamping "-ing" yang dangkal** | "symbolizing... reflecting... showcasing..." | Pertahankan hanya yang didukung sumber |
| 16 | **Bahasa penjualan** | "nestled within the breathtaking region" | Nyatakan apa benda itu |
| 17 | **Otoritas pinjaman** | "Experts believe...", "cited in NYT, BBC, FT, and The Hindu" | Sebut sumber nyata dan apa yang dikatakannya, atau buang klaim atau daftarnya |
| 18 | **Menghindari is, are, dan has** | "serves as... features... boasts" | "is... has" |

### D. Pemformatan menurut aturan

| # | Pola | Sebelum | Sesudah |
|---|---------|--------|-------|
| 19 | **Huruf tebal sebagai hiasan** | "**OKRs**, **KPIs**"; "**Performance:** Performance improved" | Buang tebalnya; ubah daftar berlabel menjadi prosa |
| 20 | **Heading dekoratif** | "Strategic Negotiations And Partnerships", "🚀 Launch Phase:", "The decision, on one screen" | Huruf kapital gaya kalimat; buang emoji dan panah; namai isi bagian itu |
| 21 | **Tanda kutip melengkung** (*lemah sendirian*) | `said “the project”` | `said "the project"` |

### E. Sisa dari chat dan draf

| # | Pola | Sebelum | Sesudah |
|---|---------|--------|-------|
| 22 | **Residu chatbot** | "Great question! ... I hope this helps!" | Buang pembungkusnya dan pertahankan isinya |
| 23 | **Penafian batas pengetahuan dan tebakan** | "While details are limited in available sources, it appears..." | Nyatakan apa yang ditunjukkan sumber, atau buang kalimatnya |
| 24 | **Heading yang diulang di kalimat pertama** | "## Performance" + "Speed matters." | Biarkan heading bekerja |
| 25 | **Menulis tentang dokumen alih-alih subjeknya** | "This function was added to replace...", "compiled from...", "The table below compares..." | Jelaskan subjeknya; nyatakan konvensi hanya bila pembaca tidak bisa melihatnya |

### F. Menulis untuk pembaca yang salah

| # | Pola | Sebelum | Sesudah |
|---|---------|--------|-------|
| 26 | **Menjelaskan ulang apa yang diketahui pembaca** | Balasan yang menelusuri diagnosis dan membuktikan rencana berhasil sebelum keputusan | Mulai dari keputusan; simpan diagnosis dan buktinya untuk tiket berikutnya |

## Contoh lengkap

**Sebelum (terdengar AI):**
> I recently spent five unforgettable days in Lisbon last October, and let me tell you — this city completely stole my heart. From the moment I checked into my charming hotel perched high in the historic Alfama district, I knew I was somewhere truly special.
>
> Yes, the famous hills are challenging — with countless stairs between my hotel and everything else, my legs certainly felt it! — but every climb rewards you with breathtaking, panoramic views that make it all worthwhile.
>
> No trip would be complete without riding the iconic Tram 28, a roughly forty-minute journey shared with plenty of fellow travelers eager to capture the magic. And the food? Simply divine. While the pastéis de nata at Pastéis de Belém are a beloved national treasure, my absolute favorite came from a hidden gem in Graça, still warm from the oven.
>
> But what truly makes Lisbon special isn't just the sights — it's the feeling. Wander just a block or two above the main squares and you'll discover a quieter, more authentic side of the city, inviting you to slow down and savor every moment.
>
> Of course, the must-see São Jorge Castle offers stunning views over the rooftops below. The queues can be long, but the experience is absolutely worth it for any history buff or curious traveler.
>
> Would I go back? Absolutely — next time in spring, and with better shoes! Lisbon isn't just a place to visit; it's a place to fall in love with, again and again. ✨

**Sesudah:**
> I spent five days in Lisbon last October. My hotel was up in Alfama, with a lot of stairs between it and everything else, and my legs felt every one of them. The views from the top were worth the climb.
>
> Everyone tells you to ride Tram 28, so I did. The trip took about forty minutes, and most of the car was other tourists taking pictures out the windows. The custard tarts at Pastéis de Belém are the famous ones, but my favorite came from a place in Graça, still warm from the oven.
>
> The part of Lisbon I liked best starts a block or two above the main squares, where the streets go quiet and nobody is in a hurry. São Jorge Castle has good views over the rooftops and a long queue to get them.
>
> I'd go back, in spring next time, and with better shoes.

## Sumber

- [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) adalah sumber daftar polanya.
- [WikiProject AI Cleanup](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_AI_Cleanup) memelihara halaman itu.

## Riwayat versi

Lihat [CHANGELOG.md](https://github.com/blader/humanizer/blob/main/CHANGELOG.md).

## Lisensi

MIT

Kalau Humanizer membantu kamu, bintang membantu orang lain menemukannya.
