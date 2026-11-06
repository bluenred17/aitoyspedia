---
title: "Docling"
summary: "Pustaka dan CLI untuk mengurai berbagai format dokumen, termasuk PDF dengan pemahaman tata letak dan tabel, lalu mengekspornya ke Markdown, HTML, atau JSON untuk ekosistem AI generatif."
category: productivity
tags: [dokumen, pdf, ocr, markdown, parsing, mcp, rag, ibm]
surfaces: [claude-code, api]
setup: |
  pip install docling

  # Konversi dokumen lewat CLI
  docling https://arxiv.org/pdf/2206.01062

  # Pakai GraniteDocling dan VLM lain lewat CLI
  docling --pipeline vlm --vlm-model granite_docling https://arxiv.org/pdf/2206.01062
source_url: "https://github.com/docling-project/docling/blob/main/README.md"
repo: docling-project/docling
stars: 70167
license: MIT
added: 2026-11-06
last_verified: 2026-11-06
status: aktif
---

Docling menyederhanakan pemrosesan dokumen dengan mengurai berbagai format, termasuk pemahaman PDF tingkat lanjut, dan menyediakan integrasi mulus dengan ekosistem AI generatif.

## Fitur

- Mengurai [banyak format dokumen](https://docling-project.github.io/docling/usage/supported_formats/): PDF, DOCX, PPTX, XLSX, HTML, EPUB, Apple Pages, Numbers, dan Keynote, WAV, MP3, WebVTT, Box Notes, format email (EML, MSG), iCalendar (ICS), gambar (PNG, TIFF, JPEG, dan lainnya), LaTeX, DocLang, teks biasa, dan lainnya.
- Pemahaman PDF tingkat lanjut: tata letak halaman, urutan baca, struktur tabel, kode, rumus, klasifikasi gambar, dan lainnya.
- Representasi [DoclingDocument](https://docling-project.github.io/docling/concepts/docling_document/) yang terpadu dan ekspresif.
- Berbagai format ekspor dan opsi: Markdown, HTML, WebVTT, DocLang, [DocTags](https://arxiv.org/abs/2503.11576), dan JSON lossless.
- Dukungan beberapa skema XML khusus aplikasi: [DocLang](https://doclang.ai), paten [USPTO](https://www.uspto.gov/patents), artikel [JATS](https://jats.nlm.nih.gov/), dan laporan keuangan [XBRL](https://www.xbrl.org/).
- Eksekusi lokal untuk data sensitif dan lingkungan air-gapped.
- Integrasi plug-and-play dengan LangChain, LlamaIndex, Crew AI, dan Haystack.
- Dukungan OCR luas untuk PDF hasil pindai dan gambar.
- Dukungan beberapa Visual Language Model, seperti [GraniteDocling](https://huggingface.co/ibm-granite/granite-docling-258M).
- Dukungan audio dengan model Automatic Speech Recognition (ASR).
- Hubungkan ke agent mana pun lewat [server MCP](https://docling-project.github.io/docling/usage/mcp/).
- Jalankan Docling sebagai layanan lewat [API server](https://docling-project.github.io/docling/usage/api_server/) (docling-serve).
- CLI yang sederhana dan nyaman.

### Yang baru

- Mengurai file video (MP4, AVI, MOV, MKV, WebM) dengan transkrip ASR dan keyframe representatif.
- Mengurai file ODF (OpenDocument): `.odt`, `.ods`, `.odp`.
- Mengurai dokumen XBRL untuk laporan keuangan.
- Mengurai file email (`.eml`, `.msg`).
- Mengurai file kalender (`.ics`, `.ical`, `.icalendar`, `.ifb`), termasuk acara, tugas, jurnal, waktu luang/sibuk, peserta, pengingat, dan nama lampiran.
- Mengurai file EPUB untuk e-book.
- Mengurai Apple Pages (`.pages`), Numbers (`.numbers`), dan Keynote (`.key`).
- Mengurai file teks biasa (`.txt`, `.text`) dan superset Markdown (`.qmd`, `.Rmd`).
- Pemahaman grafik (batang, lingkaran, garis): mengubahnya menjadi tabel atau kode dan menambahkan deskripsi rinci.

### Segera hadir

- Ekstraksi metadata: judul, penulis, referensi, dan bahasa.
- Pemahaman kimia kompleks (struktur molekul).

## Mulai cepat

### 1. Pasang

```bash
pip install docling
```

Catatan: dukungan Python 3.9 dihentikan pada Docling versi 2.70.0. Pakai Python 3.10 atau lebih baru.

Berjalan di macOS, Linux, dan Windows, baik pada arsitektur x86_64 maupun arm64. [Petunjuk instalasi rinci](https://docling-project.github.io/docling/getting_started/installation/) ada di dokumentasi.

### 2. Konversi dokumen (CLI)

```bash
docling https://arxiv.org/pdf/2206.01062
```

Perintah ini menghasilkan file `.md` di direktori saat ini yang berisi konten dokumen terstruktur.

Kamu juga bisa memakai GraniteDocling dan VLM lain lewat CLI:

```bash
docling --pipeline vlm --vlm-model granite_docling https://arxiv.org/pdf/2206.01062
```

### 3. Pemakaian Python (direkomendasikan)

```python
from docling.document_converter import DocumentConverter

source = "https://arxiv.org/pdf/2408.09869"  # a document via a local path or URL
converter = DocumentConverter()
result = converter.convert(source)
print(result.document.export_to_markdown())  # output: "## Docling Technical Report[...]"
```

Opsi [pemakaian](https://docling-project.github.io/docling/usage/) dan [konfigurasi](https://docling-project.github.io/docling/getting_started/installation/) lain ada di dokumentasi.

## Sumber lain

- [Dokumentasi](https://docling-project.github.io/docling/): instalasi, pemakaian, konsep, resep, ekstensi.
- [Contoh](https://docling-project.github.io/docling/examples/): kasus penggunaan praktis.
- [Integrasi](https://docling-project.github.io/docling/integrations/) dengan kerangka kerja dan alat populer.
- [Laporan teknis Docling](https://arxiv.org/abs/2408.09869).
- [Diskusi](https://github.com/docling-project/docling/discussions) untuk bantuan.

## Lisensi

Kode Docling berlisensi MIT. Untuk penggunaan model individual, lihat lisensi model di paket aslinya. Docling dihosting sebagai proyek di LF AI & Data Foundation, dan proyek ini dimulai oleh tim AI for knowledge di IBM Research Zurich.
