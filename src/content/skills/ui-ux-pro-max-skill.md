---
title: "UI UX Pro Max"
summary: "Skill yang memberi agent AI kecerdasan desain untuk membuat UI/UX profesional: generator design system dengan 192 aturan penalaran industri, 79 gaya UI, 192 palet warna, 74 pasangan font, dan panduan untuk 22 stack."
category: coding
tags: [ui, ux, desain, design-system, tailwind, tipografi, warna, frontend, accessibility]
surfaces: [claude-code]
source_url: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/README.md"
repo: nextlevelbuilder/ui-ux-pro-max-skill
stars: 145313
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
trigger: "Aktif otomatis saat kamu meminta pekerjaan UI/UX (membangun, mendesain, membuat, mengimplementasikan, meninjau, memperbaiki, atau menyempurnakan tampilan); di agent bermode workflow (Kiro, Roo Code, KiloCode) dipanggil dengan /ui-ux-pro-max."
install: |
  /plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
  /plugin install ui-ux-pro-max@ui-ux-pro-max-skill

  # Atau lewat CLI (disarankan README):
  npm install -g ui-ux-pro-max-cli
  cd /path/to/your/project
  uipro init --ai claude      # Claude Code
  uipro init --ai cursor      # Cursor
  uipro init --ai windsurf    # Windsurf
  uipro init --ai antigravity # Antigravity
  uipro init --ai copilot     # GitHub Copilot
  uipro init --ai kiro        # Kiro
  uipro init --ai codex       # Codex CLI
  uipro init --ai qoder       # Qoder
  uipro init --ai roocode     # Roo Code
  uipro init --ai gemini      # Gemini CLI
  uipro init --ai trae        # Trae
  uipro init --ai opencode    # OpenCode
  uipro init --ai continue    # Continue
  uipro init --ai codebuddy   # CodeBuddy
  uipro init --ai droid       # Droid (Factory)
  uipro init --ai kilocode    # KiloCode
  uipro init --ai warp        # Warp
  uipro init --ai augment     # Augment
  uipro init --ai codewhale   # CodeWhale
  uipro init --ai zcode       # ZCode
  uipro init --ai kimi        # Kimi Code
  uipro init --ai amazonq     # Amazon Q Developer
  uipro init --ai openclaw    # OpenClaw (.agents/skills/)
  uipro init --ai autoclaw    # AutoClaw (skills/ atau ~/.openclaw-autoclaw/skills)
  uipro init --ai universal   # Universal / Agent Standard (.agents/skills/)
  uipro init --ai all         # Semua asisten

  # Pasang global (untuk semua proyek):
  uipro init --ai claude --global   # Pasang ke ~/.claude/skills/
  uipro init --ai cursor --global   # Pasang ke ~/.cursor/skills/
  uipro init --ai zcode --global    # Pasang ke ~/.zcode/skills/
  uipro init --ai kimi --global     # Pasang ke ~/.kimi-code/skills/
  uipro init --ai universal --global # Pasang ke ~/.agents/skills/
---

# UI UX Pro Max

Skill AI yang menyediakan kecerdasan desain untuk membangun UI/UX profesional di berbagai platform dan framework.

![UI UX Pro Max](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/main/screenshots/website.png)

> **Catatan dari situs ini:** (1) Situs resmi proyek ini ada di [uupm.cc](https://uupm.cc). README juga menyebut versi Premium berbayar yang terpisah dari repositori ini. (2) Skill ini membutuhkan Python 3.x untuk skrip pencariannya. (3) Bagian pengembangan internal (kontribusi, rilis otomatis, refresh katalog) tidak disalin di sini; lihat README asli.

## Yang baru di v2.0

### Pembuatan design system yang cerdas

Fitur andalan v2.0 adalah **Design System Generator**, mesin penalaran berbasis AI yang menganalisis kebutuhan proyekmu dan menghasilkan design system lengkap yang disesuaikan, dalam hitungan detik.

```
+----------------------------------------------------------------------------------------+
|  TARGET: Serenity Spa - RECOMMENDED DESIGN SYSTEM                                      |
+----------------------------------------------------------------------------------------+
|                                                                                        |
|  PATTERN: Hero-Centric + Social Proof                                                  |
|     Conversion: Emotion-driven with trust elements                                     |
|     CTA: Above fold, repeated after testimonials                                       |
|     Sections:                                                                          |
|       1. Hero                                                                          |
|       2. Services                                                                      |
|       3. Testimonials                                                                  |
|       4. Booking                                                                       |
|       5. Contact                                                                       |
|                                                                                        |
|  STYLE: Soft UI Evolution                                                              |
|     Keywords: Soft shadows, subtle depth, calming, premium feel, organic shapes        |
|     Best For: Wellness, beauty, lifestyle brands, premium services                     |
|     Performance: cost:low | Accessibility: risk:conditional; verify requirements       |
|                                                                                        |
|  COLORS:                                                                               |
|     Primary:    #E8B4B8 (Soft Pink)                                                    |
|     Secondary:  #A8D5BA (Sage Green)                                                   |
|     CTA:        #D4AF37 (Gold)                                                         |
|     Background: #FFF5F5 (Warm White)                                                   |
|     Text:       #2D3436 (Charcoal)                                                     |
|     Notes: Calming palette with gold accents for luxury feel                           |
|                                                                                        |
|  TYPOGRAPHY: Cormorant Garamond / Montserrat                                           |
|     Mood: Elegant, calming, sophisticated                                              |
|     Best For: Luxury brands, wellness, beauty, editorial                               |
|     Google Fonts: https://fonts.google.com/share?selection.family=...                  |
|                                                                                        |
|  KEY EFFECTS:                                                                          |
|     Soft shadows + Context-appropriate transitions + Gentle hover states               |
|                                                                                        |
|  AVOID (Anti-patterns):                                                                |
|     Bright neon colors + Harsh animations + Dark mode + AI purple/pink gradients       |
|                                                                                        |
|  PRE-DELIVERY CHECKLIST:                                                               |
|     [ ] No emojis as icons (use SVG: Heroicons/Lucide)                                 |
|     [ ] cursor-pointer on all clickable elements                                       |
|     [ ] Interaction timing follows the platform, component, and user preference        |
|     [ ] Light mode: text contrast 4.5:1 minimum                                        |
|     [ ] Focus states visible for keyboard nav                                          |
|     [ ] prefers-reduced-motion respected                                               |
|     [ ] Text, chips, and badges reflow without clipping or broken labels               |
|     [ ] Responsive: 375px, 768px, 1024px, 1440px                                       |
|                                                                                        |
+----------------------------------------------------------------------------------------+
```

### Cara kerja pembuatan design system

```
┌─────────────────────────────────────────────────────────────────┐
│  1. USER REQUEST                                                │
│     "Build a landing page for my beauty spa"                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. MULTI-DOMAIN SEARCH (5 parallel searches)                   │
│     • Product type matching (192 categories)                    │
│     • Style recommendations (79 searchable; 50 active)          │
│     • Color palette selection (192 palettes)                    │
│     • Landing page patterns (34 patterns)                       │
│     • Typography pairing (74 font combinations)                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. REASONING ENGINE                                            │
│     • Match product → UI category rules                         │
│     • Apply style priorities (BM25 ranking)                     │
│     • Filter anti-patterns for industry                         │
│     • Process decision rules (JSON conditions)                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. COMPLETE DESIGN SYSTEM OUTPUT                               │
│     Pattern + Style + Colors + Typography + Effects             │
│     + Anti-patterns to avoid + Pre-delivery checklist           │
└─────────────────────────────────────────────────────────────────┘
```

### 192 aturan penalaran khusus industri

Mesin penalaran memuat aturan khusus untuk:

| Kategori | Contoh |
|----------|--------|
| **Tech & SaaS** | SaaS, Micro SaaS, B2B Service, Developer Tool / IDE, AI/Chatbot Platform, Cybersecurity Platform |
| **Keuangan** | Fintech/Crypto, Banking, Insurance, Personal Finance Tracker, Invoice & Billing Tool |
| **Kesehatan** | Medical Clinic, Pharmacy, Dental, Veterinary, Mental Health, Medication Reminder |
| **E-commerce** | General, Luxury, Marketplace (P2P), Subscription Box, Food Delivery |
| **Layanan** | Beauty/Spa, Restaurant, Hotel, Legal, Home Services, Booking & Appointment |
| **Kreatif** | Portfolio, Agency, Photography, Gaming, Music Streaming, Photo/Video Editor |
| **Gaya hidup** | Habit Tracker, Recipe & Cooking, Meditation, Weather, Diary, Mood Tracker |
| **Teknologi baru** | Web3/NFT, Spatial Computing, Quantum Computing, Autonomous Drone Fleet |

Setiap aturan mencakup:
- **Recommended Pattern**: struktur landing page
- **Style Priority**: gaya UI yang paling cocok
- **Color Mood**: palet yang sesuai industri
- **Typography Mood**: karakter font yang cocok
- **Key Effects**: animasi dan interaksi
- **Anti-Patterns**: apa yang TIDAK boleh dilakukan (misalnya "AI purple/pink gradients" untuk perbankan)

## Fitur

- **79 gaya UI yang bisa dicari (50 aktif)**: Glassmorphism, Claymorphism, Minimalism, Brutalism, Neumorphism, Bento Grid, Dark Mode, AI-Native UI, dan lainnya
- **192 palet warna**: palet khusus industri yang selaras 1:1 dengan 192 jenis produk
- **74 pasangan font**: kombinasi tipografi terkurasi beserta impor Google Fonts
- **25 jenis grafik**: rekomendasi untuk dashboard dan analitik
- **22 tech stack**: React, Next.js, Astro, Vue, Nuxt.js, Nuxt UI, Svelte, SwiftUI, React Native, Flutter, HTML+Tailwind, shadcn/ui, Jetpack Compose, Angular, Laravel, Three.js, JavaFX, WPF, WinUI 3, UWP, Avalonia, Uno Platform
- **119 panduan UX**: praktik terbaik, anti-pola, aturan aksesibilitas, tata letak teks yang tahan banting, label ringkas, dan interaksi yang bisa dibatalkan
- **192 aturan penalaran**: pembuatan design system khusus industri (BARU di v2.0)

### Teks yang tahan banting dan UI ringkas

Panduan ini mencakup kegagalan produksi yang umum pada judul, token panjang, chip, badge, dan micro-interaction yang terpotong:

- Pembungkusan judul yang seimbang adalah peningkatan progresif, bukan jaminan bahwa kata tertentu akan tetap di baris terakhir. Desain harus tetap berfungsi dengan pembungkusan alami di berbagai lebar, font, dan locale.
- Teks penting harus mengalir ulang tanpa terpotong pada lebar sempit, zoom browser, penskalaan teks, dan penimpaan spasi oleh pengguna. URL dan pengenal yang panjang boleh dibungkus dengan aman.
- Kumpulan chip dan tag harus membungkus atau memakai pengungkapan `+n` yang bisa dioperasikan. Label ringkas sebaiknya tetap utuh bila praktis; pemotongan yang tak terhindarkan butuh jalur nilai penuh yang aksesibel bagi pengguna keyboard, pointer, dan sentuh.
- Makna badge tidak boleh bergantung pada warna saja. Chip interaktif butuh semantik native, fokus yang terlihat, dan status yang terbaca program; hitungan langsung butuh konteks yang bermakna.
- Interaksi cepat boleh membatalkan animasi, tetapi status semantik akhir, fokus, dan konten harus tetap benar. Waktu dipilih sesuai platform dan komponen, dengan menghormati preferensi reduced-motion.

### Taksonomi gaya

Katalog memuat **79 gaya yang bisa dicari** dengan ID stabil dan alias:

| Status | Jumlah | Perilaku pencarian |
|--------|------:|-----------------|
| Active | 50 | Masuk rekomendasi normal dan tampil secara default di galeri |
| Supplemental | 29 | Muncul untuk niat varian/sistem yang persis atau eksplisit; tersedia lewat filter status di galeri |
| Deprecated | 9 | Dikecualikan dari peringkat normal; nama lama dialihkan ke gaya kanonis atau pola landing |

Set aktif mencakup 43 keluarga visual umum, 2 gaya khusus mobile, 3 sistem desain platform resmi, 1 material platform, dan 1 gaya analitik inti. Sistem resmi saat ini mencakup Fluent 2, Shopify Polaris, dan Adobe Spectrum; Liquid Glass dicakup sebagai material platform Apple, Material 3 Expressive tetap varian Material untuk mobile, dan Spectrum 2 bersifat supplemental. Struktur landing page ada di dataset landing terpisah berisi 34 pola, sehingga tidak bersaing dengan gaya visual dalam peringkat BM25.

Lihat [`styles.csv`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/src/ui-ux-pro-max/data/styles.csv) untuk taksonomi lengkap dan metadata asal-usulnya.

## Perbandingan versi Basic dan Premium

Banyak pengguna bertanya tentang perbedaan versi open source dan premium. Berikut rinciannya.

### Versi Basic (repositori ini)
- **Sepenuhnya open source:** cocok untuk developer individu, hobi, dan proyek standar.
- **Kecerdasan UI/UX inti:** akses penuh ke 79 gaya UI yang bisa dicari (50 aktif), 192 jenis produk, palet warna, dan pasangan font terkurasi.
- **Rekomendasi cerdas:** mesin pencarian BM25 bawaan untuk pencocokan desain yang sangat akurat.
- **Dukungan lintas platform:** panduan khusus stack untuk 22 framework utama (React, Vue, Tailwind, iOS, Android, dan lainnya).
- **Pembuatan design system:** langsung hasilkan aturan UI, pola, dan logika yang disesuaikan lewat CLI.

### Versi Premium
- **Skill desain merek yang diperluas:** melampaui UI/UX hingga pembuatan identitas merek, desain logo, program identitas korporat (CIP), banner, slide presentasi, dan ikonografi kustom.
- **Pembuatan aset lanjutan:** integrasi mendalam dengan pembuatan gambar berbasis AI untuk menghasilkan aset visual nyata, bukan sekadar placeholder.
- **Arsitektur enterprise:** arsitektur Design Token yang lebih komprehensif dan skalabel, dibangun untuk penerapan tim besar.
- **Dukungan prioritas:** bantuan teknis khusus untuk tim dan profesional yang membutuhkan alur kerja desain penuh tanpa gangguan.

Untuk detail peningkatan ke tingkat Premium, kunjungi [uupm.cc](https://uupm.cc).

## Instalasi

### Lewat Claude Marketplace (Claude Code)

Pasang langsung di Claude Code dengan dua perintah:

```
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

### Lewat CLI (disarankan)

```bash
# Pasang CLI secara global
npm install -g ui-ux-pro-max-cli

# Masuk ke proyekmu
cd /path/to/your/project

# Pasang untuk asisten AI kamu
uipro init --ai claude      # Claude Code
uipro init --ai cursor      # Cursor
uipro init --ai windsurf    # Windsurf
uipro init --ai antigravity # Antigravity
uipro init --ai copilot     # GitHub Copilot
uipro init --ai kiro        # Kiro
uipro init --ai codex       # Codex CLI
uipro init --ai qoder       # Qoder
uipro init --ai roocode     # Roo Code
uipro init --ai gemini      # Gemini CLI
uipro init --ai trae        # Trae
uipro init --ai opencode    # OpenCode
uipro init --ai continue    # Continue
uipro init --ai codebuddy   # CodeBuddy
uipro init --ai droid       # Droid (Factory)
uipro init --ai kilocode    # KiloCode
uipro init --ai warp        # Warp
uipro init --ai augment     # Augment
uipro init --ai codewhale   # CodeWhale
uipro init --ai zcode       # ZCode
uipro init --ai kimi        # Kimi Code
uipro init --ai amazonq     # Amazon Q Developer
uipro init --ai openclaw    # OpenClaw (.agents/skills/)
uipro init --ai autoclaw    # AutoClaw (skills/ atau ~/.openclaw-autoclaw/skills)
uipro init --ai universal   # Universal / Agent Standard (.agents/skills/)
uipro init --ai all         # Semua asisten
```

Paket npm-nya adalah `ui-ux-pro-max-cli`; ia tetap memasang perintah `uipro`. Rilis lama `uipro-cli` sudah usang dan tidak boleh dipakai untuk aset terbaru.

### Pasang global (tersedia untuk semua proyek)

```bash
uipro init --ai claude --global   # Pasang ke ~/.claude/skills/
uipro init --ai cursor --global   # Pasang ke ~/.cursor/skills/
uipro init --ai zcode --global    # Pasang ke ~/.zcode/skills/
uipro init --ai kimi --global     # Pasang ke ~/.kimi-code/skills/
uipro init --ai universal --global # Pasang ke ~/.agents/skills/
```

### Perintah CLI lainnya

```bash
uipro versions              # Daftar versi yang tersedia
uipro update                # Segarkan file skill dari paket CLI yang terpasang
uipro update --global       # Segarkan file skill global dari paket CLI yang terpasang
uipro init --offline        # Flag kompatibilitas; memasang template bawaan
uipro init --dry-run        # Pratinjau aksi pemasangan tanpa menulis file
uipro uninstall             # Hapus skill (deteksi platform otomatis)
uipro uninstall --ai claude # Hapus platform tertentu
uipro uninstall --global    # Hapus dari pemasangan global
```

## Prasyarat

Python 3.x dibutuhkan untuk skrip pencarian (hanya pustaka standar; skrip tidak memasang apa pun dan tidak melakukan panggilan jaringan).

Periksa apakah Python sudah terpasang:

```bash
python3 --version
```

Jika belum ada, pasang sendiri dari [python.org](https://www.python.org/downloads/) atau lewat package manager OS (Homebrew, apt, winget). Langkah pemasangan ini untuk **kamu, pengguna manusia**: agent AI yang memakai skill ini tidak boleh memasang perangkat lunak di mesinmu; mereka diinstruksikan untuk bertanya kepadamu.

## Cara pakai

### Mode Skill (aktif otomatis)

**Didukung:** Claude Code, Cursor, Windsurf, Antigravity, Codex CLI, Continue, Gemini CLI, OpenCode, Qoder, CodeBuddy, Droid (Factory), KiloCode, Warp, Augment, CodeWhale, ZCode, Kimi Code, Amazon Q Developer, OpenClaw, GitHub Copilot

Skill aktif otomatis saat kamu meminta pekerjaan UI/UX. Cukup mengobrol seperti biasa:

```
Build a landing page for my SaaS product
```

> **Trae**: Pindah ke mode **SOLO** dulu. Skill akan aktif untuk permintaan UI/UX.

### Mode Workflow (slash command)

**Didukung:** Kiro, Roo Code, KiloCode

Pakai slash command untuk memanggil skill:

```
/ui-ux-pro-max Build a landing page for my SaaS product
```

### Contoh prompt

```
Build a landing page for my SaaS product

Create a dashboard for healthcare analytics

Design a portfolio website with dark mode

Make a mobile app UI for e-commerce

Build a fintech banking app with dark theme
```

### Menerapkan tema ke aplikasi yang sudah ada

Setelah [memasang skill](#instalasi), buka aplikasimu di asisten AI dan pakai prompt seperti ini. Di Mode Workflow, awali dengan `/ui-ux-pro-max`.

```text
Use the ui-ux-pro-max skill to retheme my existing React app.
Target style: Minimalism & Swiss Style.
First inspect the framework and styling-library versions, routes, components,
styles, and existing theme tokens. Keep the current component structure,
behavior, and business logic.
Reuse and update the existing semantic tokens for colors, typography, spacing,
radii, shadows, and interaction states; add missing tokens rather than creating
a parallel theme system. Replace hard-coded styles one component at a time.
Verify contrast, keyboard focus, responsive layouts, and all supported light/dark
modes. Summarize changed files and any remaining hard-coded styles.
```

Ganti `Minimalism & Swiss Style` dengan [gaya katalog](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/src/ui-ux-pro-max/data/styles.csv) atau arah visual pilihanmu. Hasil pencarian memberi panduan desain; ia tidak otomatis menulis ulang aplikasimu.

**Daftar periksa migrasi tema:**

- **Audit:** Temukan nilai yang di-hard-code terkait tema di stylesheet, gaya inline, dan utilitas seperti `bg-blue-600` atau `text-[#1e293b]`.
- **Petakan:** Pakai ulang peran semantik seperti `background`, `surface`, `foreground`, `primary`, `border`, dan `ring` di sistem styling aplikasi yang sudah ada. Tambahkan peran yang kurang sesuai konvensi versi pustaka terpasang.
- **Migrasikan:** Ganti nilai yang di-hard-code dengan referensi token dalam batch komponen kecil. Mengubah token saja tidak memengaruhi gaya yang tidak memakainya.
- **Verifikasi:** Periksa kontras teks/UI, status hover/fokus/nonaktif, layout responsif, dan tiap tema yang didukung setelah setiap batch.

### Cara kerjanya

1. **Kamu meminta**: permintaan UI/UX apa pun (bangun, desain, buat, implementasikan, tinjau, perbaiki, sempurnakan)
2. **Design system dibuat**: AI otomatis menghasilkan design system lengkap memakai mesin penalaran
3. **Rekomendasi cerdas**: berdasarkan jenis produk dan kebutuhanmu, ia mencari gaya, warna, dan tipografi yang paling cocok
4. **Pembuatan kode**: mengimplementasikan UI dengan warna, font, spasi, dan praktik terbaik yang tepat
5. **Pemeriksaan sebelum serah**: memvalidasi terhadap anti-pola UI/UX yang umum

### Stack yang didukung

Skill menyediakan panduan khusus stack untuk:

| Kategori | Stack |
|----------|-------|
| **Web (HTML)** | HTML + Tailwind (default) |
| **Ekosistem React** | React, Next.js, shadcn/ui |
| **Ekosistem Vue** | Vue, Nuxt.js, Nuxt UI |
| **Angular** | Angular |
| **PHP** | Laravel (Blade, Livewire, Inertia.js) |
| **Web lainnya** | Svelte, Astro, Three.js |
| **Desktop** | JavaFX, WPF, WinUI 3, Avalonia, Uno Platform, UWP |
| **iOS** | SwiftUI |
| **Android** | Jetpack Compose |
| **Lintas platform** | React Native, Flutter |

Cukup sebut stack pilihanmu di prompt, atau biarkan default ke HTML + Tailwind.

## Contoh

### Sebelum/sesudah: dashboard operasi

Dashboard operasi polos ([sebelum](https://skill-fixture-before.theroost.dev)) ditata ulang hanya dengan design system yang dihasilkan UI UX Pro Max untuknya ([sesudah](https://ui-ux-pro-max-after.theroost.dev)), dari `search.py "internal operations dashboard" --design-system --density 8 --motion 3 --variance 4`.

*Contoh ilustratif sumbangan komunitas; bukan demo resmi, tolok ukur, atau uji jalan skill.*

## Perintah design system (lanjutan)

Untuk akses langsung ke generator design system:

> Catatan: Jika kamu memasang lewat Continue, ganti `.claude/skills/` dengan `.continue/skills/` pada perintah di bawah. Untuk Droid (Factory), pakai `.factory/skills/`. Untuk ZCode, pakai `.zcode/skills/`. Untuk Amazon Q Developer, pakai `.amazonq/skills/` (Amazon Q hanya memuat otomatis aturan di `.amazonq/rules/ui-ux-pro-max.md`; data dan skrip di bawah `.amazonq/skills/` adalah file yang ditunjuk aturan itu).

```bash
# Hasilkan design system dengan keluaran ASCII
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness" --design-system -p "Serenity Spa"

# Hasilkan dengan keluaran Markdown
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech banking" --design-system -f markdown

# Pencarian per domain
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "glassmorphism" --domain style
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "elegant serif" --domain typography
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "dashboard" --domain chart
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "error summary validation" --domain ux
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "decorative icon aria hidden" --domain icons
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "icon button accessible label" --domain icons
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "orphan heading line balance" --domain ux
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "badge chip label wraps to second line" --domain ux
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "rapid chip animation interrupted" --domain ux

# Antarmuka RTL / Arab, Ibrani, Persia (domain style dan product)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "dashboard" --domain style --rtl=full
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech" --domain product --rtl=partial

# Panduan khusus stack
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "form validation" --stack react
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "responsive layout" --stack html-tailwind
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "chip badge overflow nowrap" --stack html-tailwind
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "tableview binding" --stack javafx
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "atlantafx primer enterprise theme" --stack javafx
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "enterprise tableview density permission" --stack javafx
```

Pencarian stack web sadar versi. Kueri tanpa mayor yang lebih lama mengembalikan panduan terkini yang aktif. Istilah legacy yang eksplisit atau mayor lama (misalnya `Svelte 4` atau `Next.js 15`) hanya mengembalikan baris legacy terkurasi, diberi label `Status` dan `Applies To`; bila tidak ada panduan legacy terkurasi yang cocok, pencarian tidak mengembalikan hasil alih-alih mencampur generasi framework.

### Kompatibilitas RTL (`--rtl`)

Setiap baris style dan product membawa `rtl_level` untuk antarmuka kanan-ke-kiri (Arab, Ibrani, Persia, Urdu):

| Level | Arti |
|-------|------|
| `full` | Tidak bergantung arah: layout bertahan saat dicerminkan tanpa perubahan. |
| `partial` | Tercermin dengan baik, tetapi komponen dan gerakan tertentu perlu disesuaikan. |
| `caveats` | Gaya atau produk mengodekan arah baca (tipografi kinetik, timeline LTR, permukaan kode/terminal, peta, dan urutan kursi). |

```bash
# Hanya gaya yang tercermin tanpa kerja tambahan
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "dashboard" --domain style --rtl=full

# Semua level, hasil yang disaring tetap diberi tag rtl_level
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "mobile" --domain style --rtl
```

`--rtl` membutuhkan `--domain style` atau `--domain product` yang eksplisit. Filter diterapkan setelah peringkat tetapi sebelum pemotongan `-n/--max-results`, sehingga batas sempit tidak pernah menyembunyikan baris yang cocok. Opsi ini ditolak bersama `--design-system` dan `--stack`.

### Menyimpan design system (pola Master + Overrides)

Simpan design system ke file untuk **pengambilan hierarkis lintas sesi**:

```bash
# Hasilkan dan simpan ke design-system/myapp/MASTER.md
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" --design-system --persist -p "MyApp"

# Sekaligus buat file override khusus halaman
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" --design-system --persist -p "MyApp" --page "dashboard"
```

Ini membuat struktur folder `design-system/`:

```
design-system/
└── myapp/                  # Satu folder per proyek (slug dari -p "MyApp")
    ├── MASTER.md           # Sumber kebenaran global (warna, tipografi, spasi, komponen)
    └── pages/
        └── dashboard.md    # Override khusus halaman (hanya penyimpangan dari Master)
```

**Cara kerja pengambilan hierarkis:**
1. Saat membangun halaman tertentu (misalnya "Checkout"), periksa dulu `design-system/[project-slug]/pages/checkout.md`
2. Jika file halaman ada, aturannya **menimpa** file Master
3. Jika tidak, pakai `design-system/[project-slug]/MASTER.md` saja

**Prompt pengambilan yang sadar konteks:**
```
I am building the [Page Name] page. Please read design-system/[project-slug]/MASTER.md.
Also check if design-system/[project-slug]/pages/[page-name].md exists.
If the page file exists, prioritize its rules.
If not, use the Master rules exclusively.
Now, generate the code...
```

## Arsitektur untuk pengguna

Basis kode memakai **sistem pembuatan berbasis template**. Semua file khusus platform (`.cursor/`, `.windsurf/`, `.kiro/`, `.factory/`, dan seterusnya) dihasilkan secara dinamis oleh CLI.

**Selalu pasang lewat CLI:**

```bash
npm install -g ui-ux-pro-max-cli
uipro init --ai <platform>
```

Ini memastikan kamu mendapat template terbaru yang dibundel dengan paket CLI terpasang dan struktur file yang benar untuk asisten AI kamu. Perbarui paket npm lebih dulu saat rilis baru terbit.

## Pemecahan masalah

### Claude Code melaporkan `response exceeded the ... output token maximum`

Ini batas pada satu respons Claude Code, bukan galat pada installer atau skrip pencarian UI/UX Pro Max. Pertama, minta Claude memecah tugas menjadi langkah lebih kecil dan menulis hasil besar ke file secara bertahap.

Jika kamu memang butuh satu respons yang lebih besar dan model aktif mendukungnya, setel batas token keluaran Claude Code sebelum memulai sesi baru. Contoh:

```bash
# macOS, Linux, atau WSL
export CLAUDE_CODE_MAX_OUTPUT_TOKENS="64000"
claude
```

```powershell
# Windows PowerShell
$env:CLAUDE_CODE_MAX_OUTPUT_TOKENS = "64000"
claude
```

Perubahan environment shell hanya berlaku untuk program yang dijalankan dari shell itu, jadi mulai ulang Claude Code setelah menyetel variabelnya. Claude Code membatasi nilai di atas batas keluaran model aktif; batas model dan penyedia berbeda-beda. Menaikkan nilai ini juga bisa menambah latensi dan pemakaian, serta mengurangi konteks efektif sebelum auto-compaction. Lihat [referensi variabel lingkungan Claude Code](https://code.claude.com/docs/en/env-vars#variables) resmi.

### `uipro: unknown command 'uninstall'` atau `unknown command 'update'`

Versi `ui-ux-pro-max-cli` yang terpasang sudah usang. Perbarui lalu coba lagi:

```bash
npm install -g ui-ux-pro-max-cli@latest
uipro uninstall
```

### `uipro uninstall` menampilkan "No installed AI skill directories detected"

Skill dipasang di direktori yang berbeda dari tempat kamu menjalankan perintah. Pilih salah satu:

```bash
# Opsi A — jalankan dari root proyek tempat kamu memasangnya dulu
cd /path/to/your/project
uipro uninstall

# Opsi B — hapus pemasangan global
uipro uninstall --global

# Opsi C — hapus manual
rm -rf .claude/skills/ui-ux-pro-max   # Claude Code
rm -rf .cursor/skills/ui-ux-pro-max   # Cursor
rm -rf .windsurf/skills/ui-ux-pro-max # Windsurf
rm -rf .agents/skills/ui-ux-pro-max   # Antigravity / Codex
```

### Dialog "Upload a skill" di Claude.ai menampilkan "Zip contains too many files (maximum 200)"

Jangan unggah ZIP repositori GitHub lengkap. Itu checkout pengembangan yang berisi kode sumber, aset CLI, dokumentasi, pratinjau, dan beberapa skill bawaan, sehingga melebihi batas 200 file unggahan Claude. Itu bukan artefak unggahan skill Claude, dan proyek ini saat ini tidak menerbitkan ZIP unggah manual terpisah untuk Claude.ai.

Untuk Claude Code, pasang lewat Marketplace:

```bash
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

Atau pakai installer CLI:

```bash
npx ui-ux-pro-max-cli init --ai claude
```

### Pemasangan Claude Marketplace gagal dengan "Zip file contains a symbolic link"

Ini masalah yang sudah diketahui pada versi sebelum v2.5.1. Repositori dulu memakai symlink internal yang tidak bisa ditangani sebagian alat pemasangan. **Perbaikan:** pakai installer CLI.

```bash
npm install -g ui-ux-pro-max-cli
uipro init --ai claude
```

Atau tunggu rilis berikutnya yang menyelesaikannya.

### `npm install -g ui-ux-pro-max-cli` gagal dengan galat izin

Pakai pengelola versi Node (disarankan), atau lewati pemasangan global sama sekali:

```bash
# npx tanpa memasang global
npx ui-ux-pro-max-cli init --ai claude
```

### Python tidak ditemukan saat menjalankan perintah design system

Skrip pencarian membutuhkan Python 3.x. Pasang manual dari [python.org](https://www.python.org/downloads/) atau lewat package manager OS. Agent AI tidak boleh memasangnya untukmu; mereka diinstruksikan untuk bertanya kepadamu.

### Keluaran design system terpotong / field terpangkas

Keluaran yang terbaca manusia memotong field panjang pada 300 karakter. Pakai `--json` untuk mendapat data lengkap tanpa pemotongan:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "SaaS" --domain style --json
```

## Lisensi

Proyek ini berlisensi [MIT License](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/LICENSE).

## Agent yang kompatibel

Skill ini bekerja dengan:
- [Claude Code](https://claude.com/product/claude-code)
- [AdaL](https://sylph.ai/): agent coding AI yang berevolusi sendiri ([Docs](https://docs.sylph.ai/) | [GitHub](https://github.com/SylphAI-Inc/adal-cli))
