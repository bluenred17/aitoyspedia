---
title: "Crawlee"
summary: "Pustaka web scraping dan otomasi browser untuk Node.js (TypeScript) yang mencakup crawling dari ujung ke ujung: antrean URL, penyimpanan, proxy, dan crawling HTTP maupun browser sungguhan lewat Playwright dan Puppeteer."
category: coding
tags: [web-scraping, crawler, playwright, puppeteer, nodejs, typescript, browser-automation, proxy]
surfaces: [api]
source_url: "https://github.com/apify/crawlee/blob/master/README.md"
repo: apify/crawlee
stars: 26344
license: Apache-2.0
added: 2026-11-05
last_verified: 2026-11-05
status: aktif
setup: |
  # Butuh Node.js 22.13 atau lebih tinggi

  # Cara tercepat: Crawlee CLI (memilih contoh "Getting started")
  npx crawlee create my-crawler
  cd my-crawler
  npm start

  # Atau tambahkan ke proyekmu sendiri (Playwright tidak dibundel untuk mengurangi ukuran pemasangan)
  npm install crawlee playwright

  # Versi pra-rilis (beta)
  npm install crawlee@next
---

# Crawlee

*Pustaka web scraping dan otomasi browser*

Crawlee mencakup crawling dan scraping kamu dari ujung ke ujung dan **membantu kamu membangun scraper yang andal. Cepat.**

Crawler kamu akan tampak seperti manusia dan lolos dari perlindungan bot modern bahkan dengan konfigurasi default. Crawlee memberimu alat untuk meng-crawl web demi tautan, men-scrape data, dan menyimpannya ke disk atau cloud, sambil tetap bisa dikonfigurasi sesuai kebutuhan proyekmu.

Crawlee tersedia sebagai paket NPM [`crawlee`](https://www.npmjs.com/package/crawlee).

> 👉 **Lihat dokumentasi lengkap, panduan, dan contoh di [situs proyek Crawlee](https://crawlee.dev)** 👈

> Lebih suka 🐍 Python daripada JavaScript? [👉 Lihat Crawlee untuk Python 👈](https://github.com/apify/crawlee-python).

> **Catatan dari situs ini:** (1) README tidak menyebut integrasi dengan Claude; Crawlee adalah pustaka Node.js yang kamu pakai dari kode, jadi kolom `surfaces` diisi `api` sebagai nilai terdekat. Ia berguna bila agent coding kamu diminta membuat scraper. (2) README menonjolkan kemampuan menyamarkan crawler agar tampak seperti manusia dan lolos dari perlindungan bot. Itu tidak mengubah kewajibanmu: hormati `robots.txt`, ketentuan penggunaan situs, dan hukum privasi yang berlaku sebelum meng-crawl. (3) Bagian badge dan banner Trendshift tidak disalin.

## Pasang

Kami menyarankan mengunjungi [tutorial Pengantar](https://crawlee.dev/js/docs/introduction) di dokumentasi Crawlee untuk informasi lebih lanjut.

> Crawlee membutuhkan **Node.js 22.13 atau lebih tinggi**.

### Dengan Crawlee CLI

Cara tercepat mencoba Crawlee adalah memakai **Crawlee CLI** dan memilih **contoh Getting started**. CLI akan memasang semua dependensi yang diperlukan dan menambahkan kode boilerplate untuk kamu mainkan.

```bash
npx crawlee create my-crawler
```

```bash
cd my-crawler
npm start
```

### Pemasangan manual

Jika kamu lebih suka menambahkan Crawlee **ke proyekmu sendiri**, coba contoh di bawah. Karena memakai `PlaywrightCrawler`, kita juga perlu memasang [Playwright](https://playwright.dev). Playwright tidak dibundel dengan Crawlee untuk mengurangi ukuran pemasangan.

```bash
npm install crawlee playwright
```

```js
import { PlaywrightCrawler, Dataset } from 'crawlee';

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.
const crawler = new PlaywrightCrawler({
    // Use the requestHandler to process each of the crawled pages.
    async requestHandler({ request, page, enqueueLinks, log }) {
        const title = await page.title();
        log.info(`Title of ${request.loadedUrl} is '${title}'`);

        // Save results as JSON to ./storage/datasets/default
        await Dataset.pushData({ title, url: request.loadedUrl });

        // Extract links from the current page
        // and add them to the crawling queue.
        await enqueueLinks();
    },
    // Uncomment this option to see the browser window.
    // headless: false,
});

// Add first URL to the queue and start the crawl.
await crawler.run(['https://crawlee.dev']);
```

Secara default, Crawlee menyimpan data ke `./storage` di direktori kerja saat ini. Kamu bisa menimpa direktori ini lewat konfigurasi Crawlee. Untuk detailnya, lihat [panduan Konfigurasi](https://crawlee.dev/js/docs/guides/configuration), [Request storage](https://crawlee.dev/js/docs/guides/request-storage), dan [Result storage](https://crawlee.dev/js/docs/guides/result-storage).

### Memasang versi pra-rilis

Kami menyediakan build beta otomatis untuk setiap perubahan kode yang di-merge di Crawlee. Kamu bisa menemukannya di [daftar rilis](https://www.npmjs.com/package/crawlee?activeTab=versions) npm. Jika ingin menguji fitur baru atau perbaikan bug sebelum dirilis, silakan pasang build beta seperti ini:

```bash
npm install crawlee@next
```

Jika kamu juga memakai [Apify SDK](https://github.com/apify/apify-sdk-js), kamu perlu menentukan override dependensi di file `package.json` agar tidak berakhir dengan beberapa versi Crawlee terpasang:

```json
{
    "overrides": {
       "apify": {
           "@crawlee/core": "$crawlee",
           "@crawlee/types": "$crawlee",
           "@crawlee/utils": "$crawlee"
       }
    }
}
```

## 🛠 Fitur

- Satu antarmuka untuk crawling **HTTP dan browser headless**
- **Antrean** persisten untuk URL yang akan di-crawl (breadth & depth first)
- **Penyimpanan** yang dapat dipasang untuk data tabular maupun file
- **Penskalaan** otomatis sesuai sumber daya sistem yang tersedia
- **Rotasi proxy** dan manajemen sesi terintegrasi
- Siklus hidup yang bisa disesuaikan dengan **hook**
- **CLI** untuk memulai proyekmu
- **Routing**, **penanganan galat**, dan **retry** yang bisa dikonfigurasi
- **Dockerfile** siap deploy
- Ditulis dalam **TypeScript** dengan generics

### 👾 Crawling HTTP

- Dukungan **HTTP2** tanpa konfigurasi, bahkan untuk proxy
- Pembuatan otomatis **header ala browser**
- Replikasi **sidik jari TLS** browser
- **Parser HTML** cepat terintegrasi: Cheerio dan JSDOM
- Ya, kamu juga bisa men-scrape **API JSON**

### 💻 Crawling browser sungguhan

- **Rendering** JavaScript dan **screenshot**
- Dukungan **headless** dan **headful**
- Pembuatan **sidik jari mirip manusia** tanpa konfigurasi
- **Manajemen browser** otomatis
- Pakai **Playwright** dan **Puppeteer** dengan antarmuka yang sama
- **Chrome**, **Firefox**, **Webkit**, dan banyak lagi

## Pemakaian di platform Apify

Crawlee open source dan berjalan di mana saja, tetapi karena dikembangkan oleh [Apify](https://apify.com), mudah disiapkan di platform Apify dan dijalankan di cloud. Kunjungi [situs Apify SDK](https://sdk.apify.com) untuk mempelajari lebih lanjut tentang men-deploy Crawlee ke platform Apify.

## Dukungan

Jika kamu menemukan bug atau masalah pada Crawlee, silakan [kirim issue di GitHub](https://github.com/apify/crawlee/issues). Untuk pertanyaan, kamu bisa bertanya di [Stack Overflow](https://stackoverflow.com/questions/tagged/apify), di GitHub Discussions, atau bergabung di [server Discord](https://discord.com/invite/jyEM2PRvMU) kami.

## Berkontribusi

Kontribusi kode kamu diterima, dan kamu akan dipuji selamanya! Jika punya ide perbaikan, kirim issue atau buat pull request. Untuk panduan kontribusi dan kode etik, lihat [CONTRIBUTING.md](https://github.com/apify/crawlee/blob/master/CONTRIBUTING.md).

## Lisensi

Proyek ini berlisensi Apache License 2.0, lihat file [LICENSE.md](https://github.com/apify/crawlee/blob/master/LICENSE.md) untuk detailnya.
