# React - Manajemen Produk

## Identitas

Dewa Ngakan Gede Wira Adhimukti



## Fitur

- Pencarian menyaring kartu sambil mengetik. Tidak ada tombol cari, tidak perlu menekan Enter.
- Grid tiga kolom di desktop, dua kolom di tablet, satu kolom di ponsel.
- Tiga dialog: tambah produk, ubah produk, dan konfirmasi hapus. Hanya satu yang bisa terbuka.
- Validasi per field dengan error message berbahasa Indonesia.
- Focus trap di dialog, tombol Escape menutup, dan fokus balik ke tombol yang membukanya.
- Dua empty state: belum ada produk, dan pencarian tidak menemukan apa pun.
- Data bertahan setelah reload, termasuk saat daftar sudah kosong.
- Halaman detail di `/products/:id`. Nama produk di kartu menjadi link ke halaman ini.
- Halaman 404 untuk alamat yang tidak ada, termasuk ID produk yang tidak dikenal.

## Tech Stack

React 19.3.1, Vite 7.3.8, dan React Router 7.18.5 untuk routing di sisi klien. JavaScript dan JSX, CSS murni dengan custom property.

Font Sora dan Epilogue dibundel lewat paket `@fontsource-variable`, jadi tidak ada request ke server font saat aplikasi jalan.

## Menjalankan

Butuh Node.js 20.19 atau lebih baru. Vite 7 sudah tidak mendukung Node 18.

```bash
npm install
npm run dev
```

Buka alamat yang dicetak Vite, biasanya `http://localhost:5173/`.

Untuk mencoba hasil build:

```bash
npm run build
npm run preview
```

## Struktur

```text
src/
├── components/
│   ├── DeleteConfirmModal.jsx
│   ├── Modal.jsx
│   ├── ProductCard.jsx
│   └── ProductFormModal.jsx
├── data/
│   └── initialProducts.js
├── hooks/
│   └── useProducts.js
├── pages/
│   ├── NotFoundPage.jsx
│   └── ProductDetailPage.jsx
├── utils/
│   ├── currency.js
│   └── storage.js
├── App.jsx
├── main.jsx
└── styles.css
```

Pembagian tugasnya:

- `App.jsx` menyusun halaman, menyimpan query pencarian, dan menentukan dialog mana yang terbuka.
- `main.jsx` memegang router dan daftar rute.
- `useProducts.js` memegang array produk dan operasi tambah, ubah, hapus.
- `storage.js` membaca dan menulis `localStorage`.
- `Modal.jsx` menangani backdrop, focus trap, Escape, scroll lock, dan pengembalian fokus.
- `ProductFormModal.jsx` dipakai dialog tambah dan ubah, termasuk validasinya.
- `DeleteConfirmModal.jsx` menampilkan produk yang akan dihapus sebelum konfirmasi.
- `ProductCard.jsx` merender satu kartu.
- `ProductDetailPage.jsx` menampilkan satu produk berdasarkan ID di URL.
- `NotFoundPage.jsx` halaman 404 dengan mask dan palet bergaya Persona.
- `currency.js` memformat harga jadi Rupiah.

## Rute

| Path | Halaman |
|---|---|
| `/` | Daftar produk |
| `/products/:id` | Detail produk |
| Path lain, termasuk `/products/:id` dengan ID yang tidak ada | Halaman 404 |

Router memakai `BrowserRouter`, jadi URL-nya bersih tanpa tanda pagar. Vite dev dan preview sudah mengarahkan semua path ke `index.html`. Kalau nanti di-deploy ke GitHub Pages, tambahkan salinan `index.html` bernama `404.html` supaya deep link seperti `/products/2` tidak menghasilkan 404 dari server.

## Data

Satu produk punya tiga field: `id` (string unik), `name`, dan `price` (bilangan bulat positif dalam rupiah).

Key `localStorage`: `product-management-products-v1`

Yang terjadi saat aplikasi dibuka:

- Key belum ada: aplikasi mengisi lima produk awal.
- Key berisi array kosong: daftar dibiarkan kosong, data awal tidak muncul lagi.
- Isinya rusak atau tidak valid: aplikasi kembali ke data awal dan menulis warning di console, bukan crash.
- Penulisan gagal, misalnya `localStorage` diblokir: aplikasi tetap jalan dan menampilkan banner peringatan.

Produk baru mendapat ID angka dari ID terbesar ditambah satu. Lima produk awal memakai `1` sampai `5`, jadi produk berikutnya `6`, `7`, dan seterusnya. ID disimpan sebagai string. Konsekuensinya, kalau produk dengan ID terbesar dihapus, nomor itu dipakai lagi oleh produk berikutnya, jadi ID bukan penanda permanen. Harga tetap angka selama disimpan. Format Rupiah baru dibuat saat render lewat `Intl.NumberFormat('id-ID')`: `5000` tampil `Rp5.000`.

## Validasi

| Field | Aturan | Error message |
|---|---|---|
| Nama Produk | Wajib, spasi di awal dan akhir dibuang, maksimal 100 karakter | `Nama produk wajib diisi.` dan `Nama produk maksimal 100 karakter.` |
| Harga (Rp) | Wajib, bilangan bulat lebih dari 0, maksimal Rp1.000.000.000 | `Harga produk wajib diisi.`, `Harga harus berupa bilangan bulat lebih dari 0.`, dan `Harga maksimal Rp1.000.000.000.` |

Nol, angka negatif, desimal, `NaN`, dan teks biasa ditolak. Input yang salah tidak pernah diubah diam-diam jadi 0.

## Aksesibilitas

- Satu `<main>` dan satu `<h1>`.
- Dialog memakai `role="dialog"`, `aria-modal`, dan `aria-labelledby`, dengan initial focus, focus trap, dan fokus kembali ke tombol pemicu.
- Field yang salah dapat `aria-invalid` dan `aria-describedby` yang menunjuk ke error message.
- Tap target minimal 44 px, termasuk tombol tutup dialog.
- Focus ring kelihatan jelas dan tidak hilang di atas border tebal.
- `prefers-reduced-motion` dihormati.
- Tidak ada overflow horizontal di lebar 320 px.

## Hasil pengujian

Diuji di Windows, Node 24.16.0, Chrome headless lewat DevTools Protocol, pada dev server dan hasil build produksi.

| Skenario | Hasil yang Diharapkan | Hasil Aktual |
|---|---|---|
| Muat pertama | Lima produk, `5 produk`, `Menampilkan 5 dari 5 produk` | Sesuai |
| Cari `pul` lalu `BUKU` | Hanya produk yang cocok yang tampil, huruf besar kecil diabaikan | Sesuai |
| Cari `xyz` | Panel `Produk tidak ditemukan`, footer `Menampilkan 0 dari 5 produk` | Sesuai |
| Tambah produk dengan harga 4000 | Produk baru tampil dengan `Rp4.000`, jumlah naik satu | Sesuai |
| Tambah dua produk berturut-turut | ID berlanjut `6` lalu `7` | Sesuai |
| Simpan harga 0, negatif, desimal, atau kosong | Simpan ditolak, error message muncul di field harga | Sesuai |
| Buka Edit di Buku Tulis | Dialog menampilkan `ID: 2`, nama Buku Tulis, harga `12000` | Sesuai |
| Ubah lalu klik Batal | Tidak ada data yang berubah | Sesuai |
| Hapus Spidol | Konfirmasi menampilkan `ID: 3`, Spidol, `Rp8.000`, hanya produk itu yang hilang | Sesuai |
| Reload setelah perubahan | Perubahan tetap ada | Sesuai |
| Hapus semua lalu reload | Daftar tetap kosong, data awal tidak kembali | Sesuai |
| Klik nama produk di kartu | Halaman detail produk itu terbuka | Sesuai |
| Buka `/products/2` langsung | Detail Buku Tulis dengan `ID: 2` dan `Rp12.000` | Sesuai |
| Buka `/products/999` | Halaman 404 muncul | Sesuai |
| Buka alamat yang tidak ada | Halaman 404 muncul | Sesuai |
| Klik tombol kembali di halaman 404 | Kembali ke daftar produk | Sesuai |
| Lebar 320 px di halaman detail dan 404 | Tidak ada overflow horizontal | Sesuai |
| Lebar 320, 375, dan 800 px | Satu, satu, dan dua kolom, tanpa overflow | Sesuai |
| Navigasi keyboard di dialog | Tab tetap di dalam dialog, Escape menutup | Sesuai |
| Kontras teks | Semua teks lulus WCAG AA | Sesuai, rasio 5,85 sampai 17,08 |

Angka akhirnya: 38 dari 38 pemeriksaan browser lulus, 11 dari 11 pemeriksaan routing lulus, 7 dari 7 pemeriksaan ID lulus, 21 dari 21 pemeriksaan logika lulus, tanpa error di console. `npm run build` menghasilkan 274,94 kB JavaScript dan 14,35 kB CSS.

## Catatan penyimpangan

Beberapa hal sengaja dibedakan dari spesifikasi awal:

- Sudut semua kotak 0 px, bukan 4 sampai 8 px, sesuai permintaan saat pengembangan.
- Font Sora dan Epilogue diambil dari paket npm, bukan font sistem.
- Ada banner peringatan kalau penyimpanan gagal. Ini tambahan kecil supaya kegagalan tidak lewat begitu saja.
- README dan deskripsi PR berbahasa Indonesia, sedangkan pesan commit tetap bahasa Inggris.
- Belum ada dark mode. Tampilan selalu terang.
- Spesifikasi awal menyebut halaman detail sebagai di luar cakupan dan tidak memakai router. Sekarang ada `/products/:id` dan React Router, sesuai permintaan.
- Nama produk di kartu sekarang berupa link. Sebelumnya kartu tidak bernavigasi ke mana pun.
- Halaman 404 memakai bahasa visual seri game Persona: merah, hitam, putih, panel miring, dan halftone. Masknya digambar sendiri sebagai SVG, tidak ada karakter atau aset dari game yang disalin.

## Batasan

Hanya jalan di browser. Data terikat ke satu browser di satu perangkat dan tidak tersinkron ke mana pun. Kalau data situs dibersihkan, produk ikut hilang.
