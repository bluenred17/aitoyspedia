---
title: "i-have-adhd"
summary: "Skill yang membuat jawaban coding assistant ramah ADHD: aksi dulu, langkah bernomor, satu langkah berikutnya yang jelas, tanpa basa-basi pembuka dan penutup. Tidak perlu diagnosis ADHD."
category: productivity
tags: [adhd, gaya-jawaban, keluaran-ringkas, aksesibilitas, skill, claude-code]
surfaces: [claude-code]
source_url: "https://github.com/ayghri/i-have-adhd/blob/main/README.md"
repo: ayghri/i-have-adhd
stars: 60099
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
trigger: "Dipanggil dengan /i-have-adhd; aturannya berlaku sepanjang percakapan sampai kamu mengucapkan \"stop adhd mode\" atau \"normal mode\"."
install: |
  claude plugin marketplace add ayghri/i-have-adhd
  claude plugin install i-have-adhd@i-have-adhd
---

# i-have-adhd

**Keluaran yang ramah ADHD. Tidak perlu diagnosis ADHD!**

README tersedia dalam bahasa lain: Mandarin Sederhana, Spanyol, Portugis (Brasil), Jepang, Vietnam, Korea, Persia, Thai, Arab, dan Prancis (lihat [README aslinya](https://github.com/ayghri/i-have-adhd/blob/main/README.md)).

> **Catatan dari situs ini:** cara pasang yang tertulis di README asli adalah sebuah prompt yang menyuruh agent kamu membaca `AGENTS.md` di repo itu lalu memasang sendiri. Ini mengandalkan agent mengikuti instruksi dari repositori jarak jauh. Perintah pasang di entri ini diambil dari berkas [INSTALL.md](https://github.com/ayghri/i-have-adhd/blob/main/INSTALL.md) yang ditautkan README, yaitu perintah biasa yang bisa kamu baca dan jalankan sendiri. INSTALL.md itu bukan bagian dari README, jadi periksa sumbernya bila ada keraguan.

## Pasang

Salin/tempel ke prompt CLI kamu (cara yang tertulis di README):

```text
Install the i-have-adhd skill/plugin from https://github.com/ayghri/i-have-adhd, refer to the repo's AGENTS.md for instructions.
```

Atau 🔗 [lihat instruksi pemasangan](https://github.com/ayghri/i-have-adhd/blob/main/INSTALL.md). Isi INSTALL.md untuk tiap harness (bagian "Install"-nya) disalin di bawah.

### Claude Code

```bash
claude plugin marketplace add ayghri/i-have-adhd
claude plugin install i-have-adhd@i-have-adhd
```

Ketik `/i-have-adhd`.

Verifikasi:

```bash
claude plugin list
```

Perbarui:

```bash
claude plugin marketplace update i-have-adhd
claude plugin update i-have-adhd@i-have-adhd
```

Perintah pertama menyegarkan daftar marketplace. Yang kedua memperbarui plugin terpasang. Mulai ulang Claude Code untuk memuatnya. `claude plugin update` melewati plugin yang `version`-nya tidak berubah. Kalau kamu memelihara fork, naikkan `version` di `.claude-plugin/plugin.json` setelah mengedit aturannya.

Uninstall:

```bash
claude plugin uninstall i-have-adhd
claude plugin marketplace remove i-have-adhd
```

Atau biarkan terpasang dan matikan: `claude plugin disable i-have-adhd`.

Selalu aktif (opsional): hook `SessionStart` memuat seluruh aturan di awal setiap sesi, tanpa perlu `/i-have-adhd`:

```bash
touch ~/.claude/.i-have-adhd-always
```

Kalau kamu memakai direktori konfigurasi Claude kustom, buat flag-nya di sana:

```bash
touch "$CLAUDE_CONFIG_DIR/.i-have-adhd-always"
```

Kembali ke sesuai-permintaan:

```bash
rm ~/.claude/.i-have-adhd-always
```

Hook hanya berjalan bila file flag ada, jadi memasang plugin tidak mengubah apa pun dengan sendirinya. "stop adhd mode" tetap mematikannya untuk sesi saat ini.

### Antigravity (`agy`)

```bash
agy plugin install https://github.com/ayghri/i-have-adhd
```

### AstronClaw (skill kustom)

1. Unduh [SKILL.md kanonik](https://raw.githubusercontent.com/ayghri/i-have-adhd/main/skills/i-have-adhd/SKILL.md) dan simpan sebagai `SKILL.md`. Tinjau isinya sebelum mengunggah.
2. Di AstronClaw, buka **我的技能 (My skills)**, pilih **新建 (New)**, dan unggah file `.md` itu.
3. Pastikan skill yang diimpor bernama `i-have-adhd`. Pakai **启用/禁用 (Enable/Disable)** untuk mengatur ketersediaannya.

Hanya Markdown skill yang dibutuhkan. Mengunggah mengirim file itu ke AstronClaw; manifest plugin dan hook repositori bukan bagian dari setup ini.

### Codex

```bash
codex plugin marketplace add ayghri/i-have-adhd --ref main
codex plugin add i-have-adhd@i-have-adhd
```

Panggil skill secara eksplisit dengan mengetik `$i-have-adhd`. Codex tidak mengaktifkannya otomatis.

### Grok (`grok`)

```bash
grok plugin install ayghri/i-have-adhd --trust
grok plugin enable i-have-adhd
```

Mulai sesi Grok baru dan ketik `/i-have-adhd`. Grok menghormati `disable-model-invocation: true`, jadi tidak ada yang berlaku sampai kamu memanggil skill atau menyalakan mode selalu-aktif. `--trust` dibutuhkan (hook dan skill tidak aktif tanpanya), dan `grok plugin enable` diperlukan (plugin mati sampai diaktifkan).

### Gemini CLI

Perintah (opt-in):

```bash
mkdir -p ~/.gemini/commands
curl -fsSL https://raw.githubusercontent.com/ayghri/i-have-adhd/main/skills/i-have-adhd/agents/gemini.toml \
  -o ~/.gemini/commands/i-have-adhd.toml
```

Mulai sesi baru, ketik `/i-have-adhd`. Aktif selama sesi itu.

Ekstensi (selalu aktif):

```bash
gemini extensions install https://github.com/ayghri/i-have-adhd
```

Ekstensi memuat `GEMINI.md`, yang mengimpor seluruh skill, sehingga aturan berlaku sejak pesan pertama. `git` harus terpasang.

### GitHub Copilot (VS Code dan Copilot CLI)

```bash
npx skills add ayghri/i-have-adhd -a github-copilot        # proyek ini
npx skills add ayghri/i-have-adhd -a github-copilot -g     # semua proyek
```

Tanpa CLI, salin folder skill ke direktori mana pun yang dipindai Copilot:

```bash
git clone https://github.com/ayghri/i-have-adhd
mkdir -p ~/.copilot/skills
cp -R i-have-adhd/skills/i-have-adhd ~/.copilot/skills/
```

### Hermes

```bash
hermes skills install ayghri/i-have-adhd/skills/i-have-adhd
```

Ketik `/i-have-adhd`. Skill terpasang di `~/.hermes/skills/` dan tersedia sebagai slash command pada awal sesi berikutnya.

Mau menelusuri dulu? Tambahkan repo ini sebagai sumber skill ("tap"), lalu cari dan pasang:

```bash
hermes skills tap add ayghri/i-have-adhd
hermes skills search adhd
hermes skills install ayghri/i-have-adhd/skills/i-have-adhd
```

### Kimi Code CLI

Mulai sesi Kimi Code, lalu:

1. Jalankan `/plugins`.
2. Pilih **Custom**.
3. Tempel `https://github.com/ayghri/i-have-adhd` dan tekan `Enter`.
4. Pilih **Trust and install**.

Pakai slash command `/skill:i-have-adhd` untuk memanggil skill secara eksplisit.

### OpenCode

Untuk dipakai lintas proyek:

```bash
git clone https://github.com/ayghri/i-have-adhd ~/.config/opencode/vendor/i-have-adhd
mkdir -p ~/.config/opencode/plugins
cat > ~/.config/opencode/plugins/i-have-adhd.js <<'EOF'
export { default } from '../vendor/i-have-adhd/.opencode/plugins/i-have-adhd.mjs';
EOF
```

Untuk instalasi V1 yang sudah ada, pertahankan entri `plugin` di `opencode.json`. Kalau beralih ke loader di atas, hapus entri itu.

Mulai sesi baru dan ketik `/i-have-adhd`. Aturan berlaku sampai kamu mengucapkan `stop adhd mode` atau `normal mode`.

Hanya skill dan perintah (tanpa selalu-aktif): dari sebuah checkout, salin skill dan perintah ke direktori global OpenCode:

```bash
mkdir -p ~/.config/opencode/skills/i-have-adhd ~/.config/opencode/commands
cp skills/i-have-adhd/SKILL.md ~/.config/opencode/skills/i-have-adhd/SKILL.md
cp .opencode/command/i-have-adhd.md ~/.config/opencode/commands/i-have-adhd.md
```

### Pi

```bash
pi install https://github.com/ayghri/i-have-adhd
```

Mulai sesi Pi baru. Aktifkan/matikan keluaran ramah ADHD untuk sesi saat ini:

```text
/i-have-adhd
```

Footer menampilkan `● ADHD ON` selama mode aktif. Jalankan perintah lagi untuk mematikannya, atau eksplisit:

```text
/i-have-adhd on
/i-have-adhd off
stop adhd mode
```

Seperti hook Claude Code, ekstensi menambahkan set aturan ke percakapan sekali alih-alih menulis ulang system prompt di setiap permintaan, dan menambahkannya lagi setelah kompaksi membuangnya.

Perintah Agent Skills yang sudah ada tetap tersedia sebagai alias:

```text
/skill:i-have-adhd
```

Mulai sesi Pi baru dengan mode aktif secara default:

```bash
pi --adhd
```

### Oh My Pi (OMP)

```bash
omp plugin marketplace add ayghri/i-have-adhd
omp plugin install --scope user i-have-adhd@i-have-adhd
```

Mulai sesi OMP baru dan jalankan `/i-have-adhd` untuk menyalakan/mematikan mode.

### Qwen Code

```bash
qwen extensions install ayghri/i-have-adhd
```

Qwen Code mendukung singkatan GitHub dan memasang repositori sebagai ekstensi native. Ekstensi menemukan skill di bawah `skills/`. Ketik `/i-have-adhd` untuk memanggil skill secara eksplisit. Memasang ekstensi tidak mengubah keluaran sampai skill dipanggil.

### Zed

Di Agent Panel, buka manajer Skills dan pilih **Create skill from URL** (juga ada di command palette sebagai `agent: create skill from url`), lalu tempel:

```
https://github.com/ayghri/i-have-adhd/blob/main/skills/i-have-adhd/SKILL.md
```

Simpan di scope **User** untuk setiap proyek, atau scope **Project** untuk satu proyek. Lalu ketik `/i-have-adhd` di Agent Panel.

Lebih suka lewat filesystem? Clone repo dan taruh folder skill ke direktori skill pengguna:

```bash
git clone https://github.com/ayghri/i-have-adhd
mkdir -p ~/.agents/skills
cp -R i-have-adhd/skills/i-have-adhd ~/.agents/skills/
```

### Cursor, Amp, dan harness agent-skills lain

```bash
npx skills add ayghri/i-have-adhd                  # workspace ini
npx skills add ayghri/i-have-adhd -g               # semua proyek
npx skills add ayghri/i-have-adhd -a cursor -y     # satu agent saja
npx skills add ayghri/i-have-adhd -a opencode -y
```

Chat agent baru, ketik `/i-have-adhd`.

Tanpa CLI, salin folder skill ke path mana pun yang dipindai agent kamu:

```bash
git clone https://github.com/ayghri/i-have-adhd
mkdir -p ~/.cursor/skills     # Cursor. Use .agents/skills for OpenCode, or your agent's own path
cp -R i-have-adhd/skills/i-have-adhd ~/.cursor/skills/
```

## Apa yang dilakukannya

Skill untuk coding assistant kamu yang mencegahnya mengubur jawabannya. Aksi dulu. Langkah bernomor. Tanpa "Hope this helps!"

[Kacper Rutkiewicz | AI Made Simple](https://youtu.be/NEl8kPWZP_Y) membuat uraian yang bagus tentang versi awal skill ini.

## Apa yang berubah

**Sebelum**

> Great question! Let me think about this. Your auth flow has a few moving pieces: the middleware, the token verification, and the cookie handling. Looking at `src/auth.ts`, the `verifyToken` function (around lines 42-58) seems to be using an older `jsonwebtoken` API. One approach would be to update the package and rewrite that function. After making the change, you'd want to run the auth tests to confirm nothing breaks. By the way, you might also want to look at your dependency versions overall. Hope this helps! Let me know if you want to dig deeper.

**Sesudah**

> Edit `src/auth.ts:42` to update the token validation.
>
> 1. Open `src/auth.ts`
> 2. Replace `verifyToken` (lines 42–58) with the snippet below
> 3. Run `npm test -- auth.spec.ts`
>
> Next: paste the first failing line if any test fails.

## Aturannya

10 aturan. Teks lengkap di [SKILL.md](https://github.com/ayghri/i-have-adhd/blob/main/skills/i-have-adhd/SKILL.md).

1. Mulai dengan aksi berikutnya.
2. Beri nomor pada tugas multi-langkah.
3. Akhiri dengan satu langkah berikutnya yang konkret.
4. Tekan penyimpangan topik.
5. Nyatakan ulang keadaan di setiap giliran.
6. Perkiraan waktu yang spesifik (menit, bukan "sebentar").
7. Buat kemenangan terlihat.
8. Error disampaikan apa adanya.
9. Batasi daftar sampai 5 butir.
10. Tanpa pembuka. Tanpa rekap. Tanpa penutup.

## Setel sendiri

Fork, edit `skills/i-have-adhd/SKILL.md`, lalu tukar dengan salinanmu:

```bash
claude plugin uninstall i-have-adhd            # drop the upstream copy first:
claude plugin marketplace remove i-have-adhd   # fork and upstream share both names
claude plugin marketplace add <your-username>/i-have-adhd
claude plugin install i-have-adhd@i-have-adhd
```

Mulai ulang coding assistant kamu, lalu panggil lagi `/i-have-adhd`.

## Kredit

Secara longgar didasarkan pada *The Adult ADHD Tool Kit* oleh J. Russell Ramsay dan Anthony L. Rostain. Diadaptasi untuk bagaimana LLM sebaiknya merespons, bukan bagaimana manusia sebaiknya mengatur harinya.

## Lisensi

[MIT](https://github.com/ayghri/i-have-adhd/blob/main/LICENSE).

Beri bintang ⭐ kalau ini menghemat satu gulir melewati satu "Great question!"
