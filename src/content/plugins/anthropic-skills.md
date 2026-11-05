---
title: "Skills (anthropics/skills)"
summary: "Repositori resmi Anthropic berisi implementasi skill untuk Claude: contoh kreatif, teknis, dan enterprise, plus skill dokumen (docx, pdf, pptx, xlsx) yang menjadi dasar kemampuan dokumen Claude, spesifikasi Agent Skills, dan template skill."
category: productivity
tags: [skills, anthropic, resmi, agent-skills, marketplace, dokumen, template, spesifikasi]
surfaces: [claude-ai, claude-code, api]
source_url: "https://github.com/anthropics/skills/blob/main/README.md"
repo: anthropics/skills
stars: 187468
license: "Campuran: sebagian besar skill Apache-2.0; skill docx, pdf, pptx, dan xlsx source-available (bukan open source)"
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
install: |
  /plugin marketplace add anthropics/skills
  /plugin install document-skills@anthropic-agent-skills
  /plugin install example-skills@anthropic-agent-skills
includes: [document-skills, example-skills, docx, pdf, pptx, xlsx, template-skill]
---

> **Catatan:** Repositori ini berisi implementasi skill milik Anthropic untuk Claude. Untuk informasi tentang standar Agent Skills, lihat [agentskills.io](http://agentskills.io).

> **Catatan dari situs ini:** GitHub tidak mendeteksi satu lisensi untuk repo ini. Kolom lisensi mengikuti pernyataan README: banyak skill berlisensi Apache 2.0, sedangkan skill dokumen (`skills/docx`, `skills/pdf`, `skills/pptx`, `skills/xlsx`) source-available, bukan open source. Periksa lisensi tiap folder sebelum memakainya kembali.

# Skills

Skill adalah folder berisi instruksi, skrip, dan sumber daya yang dimuat Claude secara dinamis untuk meningkatkan kinerja pada tugas khusus. Skill mengajari Claude cara menyelesaikan tugas tertentu dengan cara yang bisa diulang, entah itu membuat dokumen dengan pedoman merek perusahaanmu, menganalisis data memakai alur kerja khusus organisasimu, atau mengotomatiskan tugas pribadi.

Untuk informasi lebih lanjut, lihat:
- [Apa itu skill?](https://support.claude.com/en/articles/12512176-what-are-skills)
- [Memakai skill di Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
- [Cara membuat skill kustom](https://support.claude.com/en/articles/12512198-creating-custom-skills)
- [Membekali agent untuk dunia nyata dengan Agent Skills](https://anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)

# Tentang repositori ini

Repositori ini berisi skill yang menunjukkan apa yang mungkin dilakukan sistem skill Claude. Skill-skill ini berkisar dari aplikasi kreatif (seni, musik, desain), tugas teknis (menguji aplikasi web, pembuatan server MCP), sampai alur kerja enterprise (komunikasi, branding, dan sebagainya).

Setiap skill berdiri sendiri di foldernya masing-masing dengan file `SKILL.md` yang berisi instruksi dan metadata yang dipakai Claude. Telusuri skill-skill ini untuk mencari inspirasi bagi skill milikmu atau untuk memahami berbagai pola dan pendekatan.

Banyak skill di repo ini open source (Apache 2.0). Kami juga menyertakan skill pembuatan & pengeditan dokumen yang menopang [kemampuan dokumen Claude](https://www.anthropic.com/news/create-files) di balik layar, di subfolder [`skills/docx`](https://github.com/anthropics/skills/blob/main/skills/docx), [`skills/pdf`](https://github.com/anthropics/skills/blob/main/skills/pdf), [`skills/pptx`](https://github.com/anthropics/skills/blob/main/skills/pptx), dan [`skills/xlsx`](https://github.com/anthropics/skills/blob/main/skills/xlsx). Ini source-available, bukan open source, tetapi kami ingin membagikannya kepada developer sebagai acuan untuk skill yang lebih kompleks yang aktif dipakai dalam aplikasi AI produksi.

## Penafian

**Skill-skill ini disediakan hanya untuk tujuan demonstrasi dan pendidikan.** Walaupun sebagian kemampuan ini mungkin tersedia di Claude, implementasi dan perilaku yang kamu dapat dari Claude bisa berbeda dari yang ditunjukkan di skill-skill ini. Skill-skill ini dimaksudkan untuk menggambarkan pola dan kemungkinan. Selalu uji skill secara menyeluruh di lingkunganmu sendiri sebelum mengandalkannya untuk tugas penting.

# Kumpulan skill
- [./skills](https://github.com/anthropics/skills/blob/main/skills): Contoh skill untuk Creative & Design, Development & Technical, Enterprise & Communication, dan Document Skills
- [./spec](https://github.com/anthropics/skills/blob/main/spec): Spesifikasi Agent Skills
- [./template](https://github.com/anthropics/skills/blob/main/template): Template skill

# Coba di Claude Code, Claude.ai, dan API

## Claude Code

Kamu bisa mendaftarkan repositori ini sebagai marketplace plugin Claude Code dengan menjalankan perintah berikut di Claude Code:
```
/plugin marketplace add anthropics/skills
```

Lalu, untuk memasang sekumpulan skill tertentu:
1. Pilih `Browse and install plugins`
2. Pilih `anthropic-agent-skills`
3. Pilih `document-skills` atau `example-skills`
4. Pilih `Install now`

Atau, pasang langsung salah satu plugin lewat:
```
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

Setelah memasang plugin, kamu bisa memakai skill dengan cukup menyebutnya. Misalnya, jika kamu memasang plugin `document-skills` dari marketplace, kamu bisa meminta Claude Code melakukan sesuatu seperti: "Use the PDF skill to extract the form fields from `path/to/some-file.pdf`"

## Claude.ai

Skill contoh ini semuanya sudah tersedia untuk paket berbayar di Claude.ai.

Untuk memakai skill apa pun dari repositori ini atau mengunggah skill kustom, ikuti petunjuk di [Memakai skill di Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude#h_a4222fa77b).

## Claude API

Kamu bisa memakai skill bawaan Anthropic, dan mengunggah skill kustom, lewat Claude API. Lihat [Skills API Quickstart](https://docs.claude.com/en/api/skills-guide#creating-a-skill) untuk selengkapnya.

# Membuat skill dasar

Skill itu sederhana dibuat: cukup sebuah folder dengan file `SKILL.md` berisi frontmatter YAML dan instruksi. Kamu bisa memakai **template-skill** di repositori ini sebagai titik awal:

```markdown
---
name: my-skill-name
description: A clear description of what this skill does and when to use it
---

# My Skill Name

[Add your instructions here that Claude will follow when this skill is active]

## Examples
- Example usage 1
- Example usage 2

## Guidelines
- Guideline 1
- Guideline 2
```

Frontmatter hanya membutuhkan dua field:
- `name`: pengenal unik untuk skill kamu (huruf kecil, tanda hubung sebagai pengganti spasi)
- `description`: deskripsi lengkap tentang apa yang dilakukan skill dan kapan dipakai

Isi markdown di bawahnya berisi instruksi, contoh, dan pedoman yang akan diikuti Claude. Untuk detail lebih lanjut, lihat [Cara membuat skill kustom](https://support.claude.com/en/articles/12512198-creating-custom-skills).

# Skill mitra

Skill adalah cara yang bagus untuk mengajari Claude agar lebih mahir memakai perangkat lunak tertentu. Saat kami melihat skill contoh yang bagus dari mitra, kami mungkin menyorot sebagian di sini:

- **Notion**: [Notion Skills for Claude](https://www.notion.so/notiondevs/Notion-Skills-for-Claude-28da4445d27180c7af1df7d8615723d0)
