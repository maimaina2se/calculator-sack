# Calculator Sack

Kalkulator web sederhana untuk menghitung harga per kg dan keuntungan per sak.
Halaman ini bisa diakses lewat browser di komputer atau Android (mobile-friendly
dan mendukung dark mode).

Akses langsung:

https://maimaina2se.github.io/calculator-sack/


## Fitur

- Hitung otomatis tanpa tombol submit
- Format Rupiah (IDR)
- Dark mode otomatis (mobile selalu dark)
- Tampilan responsif untuk layar kecil
- Ikon web untuk shortcut di mobile (PWA)
- Hitung biaya plastik per kg dan per sak (opsional)

## Rumus

- Harga per sak / total kg = harga per kg
- Harga jual per kg - harga per kg = keuntungan per kg
- Keuntungan per kg x total kg = keuntungan per sak
- Harga plastik 1 bundle = 5 pack
- 1 pack = 34 plastik
- 1 kg = 1 plastik
- Biaya plastik per kg = harga bundle / 170
- Biaya plastik per sak = biaya plastik per kg x total kg

## Cara Pakai

1. Buka `index.html` di browser (atau akses URL web jika sudah di-host).
2. Isi `Harga per sak`, `Total kg`, dan `Harga jual per kg`.
3. Jika ingin hitung plastik, isi `Harga plastik per bundle`.
4. Hasil akan muncul otomatis.

## Struktur File

- `index.html` - Tampilan utama
- `styles.css` - Desain + dark mode + mobile friendly
- `app.js` - Logika perhitungan
- `manifest.webmanifest` - Konfigurasi PWA
- `icons/` - Ikon web & shortcut
- `README.md` - Deskripsi proyek

---

# Sack Calculator

A simple web calculator to compute price per kg and profit per sack. The page
is accessible on desktop and Android browsers (mobile-friendly with dark mode).

Live access:

https://maimaina2se.github.io/calculator-sack/


## Features

- Auto calculation without submit button
- Rupiah (IDR) formatting
- Automatic dark mode (mobile always dark)
- Responsive layout for small screens
- Web icon for mobile shortcut (PWA)
- Plastic cost per kg and per sack (optional)

## Formulas

- Price per sack / total kg = price per kg
- Selling price per kg - price per kg = profit per kg
- Profit per kg x total kg = profit per sack
- 1 plastic bundle = 5 packs
- 1 pack = 34 plastics
- 1 kg = 1 plastic
- Plastic cost per kg = bundle price / 170
- Plastic cost per sack = plastic cost per kg x total kg

## How to Use

1. Open `index.html` in a browser (or visit the hosted URL).
2. Fill in `Price per sack`, `Total kg`, and `Selling price per kg`.
3. To calculate plastic cost, fill `Plastic bundle price`.
4. Results update automatically.

## File Structure

- `index.html` - Main layout
- `styles.css` - Styling + dark mode + mobile friendly
- `app.js` - Calculation logic
- `manifest.webmanifest` - PWA configuration
- `icons/` - Web & shortcut icons
- `README.md` - Project description
