---
title: "MarkItDown MCP"
summary: "Server MCP lokal dari Microsoft yang mengubah URI http, https, file, atau data menjadi Markdown lewat satu tool, convert_to_markdown."
category: productivity
tags: [mcp, markdown, konversi-dokumen, microsoft, docker, stdio]
surfaces: [claude-code, desktop]
provider: "Microsoft (MarkItDown)"
auth: none
install: |
  pip install markitdown-mcp

  # STDIO (default)
  markitdown-mcp

  # Streamable HTTP dan SSE
  markitdown-mcp --http --host 127.0.0.1 --port 3001

  # Docker
  docker build -t markitdown-mcp:latest .
  docker run -it --rm markitdown-mcp:latest

  # Docker dengan folder lokal dipasang ke /workdir
  docker run -it --rm -v /home/user/data:/workdir markitdown-mcp:latest

  # Claude Desktop: tambahkan ke claude_desktop_config.json
  {
    "mcpServers": {
      "markitdown": {
        "command": "docker",
        "args": [
          "run",
          "--rm",
          "-i",
          "markitdown-mcp:latest"
        ]
      }
    }
  }

  # Claude Desktop dengan folder lokal
  {
    "mcpServers": {
      "markitdown": {
        "command": "docker",
        "args": [
          "run",
          "--rm",
          "-i",
          "-v",
          "/home/user/data:/workdir",
          "markitdown-mcp:latest"
        ]
      }
    }
  }
source_url: "https://github.com/microsoft/markitdown/blob/main/packages/markitdown-mcp/README.md"
repo: microsoft/markitdown
stars: 193951
license: MIT
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
---

> **Penting.** Paket MarkItDown-MCP dibuat untuk **penggunaan lokal**, dengan agent lokal yang tepercaya. Saat dijalankan dengan Streamable HTTP atau SSE, server mengikat ke `localhost` secara default dan tidak terbuka untuk mesin lain di jaringan atau internet. Jangan mengikat server ke antarmuka lain kecuali kamu paham [implikasi keamanannya](#pertimbangan-keamanan).

Paket `markitdown-mcp` menyediakan server MCP ringan dengan transport STDIO, Streamable HTTP, dan SSE untuk memanggil MarkItDown.

Server ini mengekspos satu tool: `convert_to_markdown(uri)`. URI boleh berupa `http:`, `https:`, `file:`, atau `data:`.

Entri ini mengambil README paket `markitdown-mcp`. Jumlah bintang di atas adalah milik repo induk `microsoft/markitdown`.

## Pemasangan

```bash
pip install markitdown-mcp
```

## Pemakaian

Untuk menjalankan server dengan STDIO (default):

```bash
markitdown-mcp
```

Untuk menjalankan dengan Streamable HTTP dan SSE:

```bash
markitdown-mcp --http --host 127.0.0.1 --port 3001
```

## Menjalankan di Docker

Bangun image Docker dengan Dockerfile yang tersedia:

```bash
docker build -t markitdown-mcp:latest .
```

Lalu jalankan:

```bash
docker run -it --rm markitdown-mcp:latest
```

Ini cukup untuk URI jarak jauh. Untuk mengakses file lokal, pasang folder lokal ke dalam container. Misalnya untuk mengakses file di `/home/user/data`:

```bash
docker run -it --rm -v /home/user/data:/workdir markitdown-mcp:latest
```

Setelah dipasang, semua file di folder `data` bisa diakses di `/workdir` dalam container. Misalnya file `example.txt` di `/home/user/data` akan berada di `/workdir/example.txt`.

## Mengakses dari Claude Desktop

README menyarankan memakai image Docker saat menjalankan server MCP untuk Claude Desktop.

Ikuti [petunjuk ini](https://modelcontextprotocol.io/quickstart/user#for-claude-desktop-users) untuk membuka file `claude_desktop_config.json` milik Claude. Edit file itu dan tambahkan entri berikut:

```json
{
  "mcpServers": {
    "markitdown": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "markitdown-mcp:latest"
      ]
    }
  }
}
```

Kalau ingin memasang folder, sesuaikan seperti ini:

```json
{
  "mcpServers": {
    "markitdown": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-v",
        "/home/user/data:/workdir",
        "markitdown-mcp:latest"
      ]
    }
  }
}
```

## Debugging

Untuk men-debug server MCP, pakai alat `MCP Inspector`:

```bash
npx @modelcontextprotocol/inspector
```

Hubungkan ke inspector lewat host dan port yang ditampilkan (misalnya `http://localhost:5173/`).

Jika memakai STDIO:
- pilih `STDIO` sebagai tipe transport,
- masukkan `markitdown-mcp` sebagai perintah, lalu
- klik `Connect`.

Jika memakai Streamable HTTP:
- pilih `Streamable HTTP` sebagai tipe transport,
- masukkan `http://127.0.0.1:3001/mcp` sebagai URL, lalu
- klik `Connect`.

Jika memakai SSE:
- pilih `SSE` sebagai tipe transport,
- masukkan `http://127.0.0.1:3001/sse` sebagai URL, lalu
- klik `Connect`.

Terakhir: buka tab `Tools`, klik `List Tools`, klik `convert_to_markdown`, lalu jalankan tool pada URI yang valid.

## Pertimbangan keamanan

Server ini tidak mendukung autentikasi dan berjalan dengan hak akses pengguna yang menjalankannya. Karena itu, pada mode SSE atau Streamable HTTP server mengikat ke `localhost` secara default. Namun, proses atau pengguna lain di mesin yang sama tetap bisa mengaksesnya, dan tool `convert_to_markdown` bisa dipakai untuk membaca file apa pun yang bisa diakses pengguna server, atau data apa pun dari jaringan.

Jika kamu butuh keamanan tambahan, jalankan server di lingkungan terisolasi seperti mesin virtual atau container, dan pastikan izin pengguna dibatasi pada file dan segmen jaringan sensitif. Di atas semuanya, **jangan** mengikat server ke antarmuka selain localhost kecuali kamu paham implikasinya.

## Lisensi

MIT.
