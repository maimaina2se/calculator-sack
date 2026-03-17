# Calculator Sack

Calculator web sederhana untuk menghitung harga per Kg dan keuntungan per sak.
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
- Hitung biaya plastik per Kg dan per sak (opsional)

## Rumus

- Harga per sak / total Kg = harga per Kg
- Harga jual per Kg - harga per Kg = keuntungan per Kg
- Keuntungan per Kg x total Kg = keuntungan per sak
- Harga plastik 1 bundle = 5 pack
- 1 pack = 34 plastik
- 1 Kg = 1 plastik
- Biaya plastik per Kg = harga bundle / 170
- Biaya plastik per sak = biaya plastik per Kg x total Kg

## Cara Pakai

1. Buka `index.html` di browser (atau akses URL web jika sudah di-host).
2. Isi `Harga per sak`, `Total Kg`, dan `Harga jual per Kg`.
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

A simple web calculator to compute price per Kg and profit per Sack. The page
is accessible on desktop and Android browsers (mobile-friendly with dark mode).

Live access:

https://maimaina2se.github.io/calculator-sack/


## Features

- Auto calculation without submit button
- Rupiah (IDR) formatting
- Automatic dark mode (mobile always dark)
- Responsive layout for small screens
- Web icon for mobile shortcut (PWA)
- Plastic cost per Kg and per Sack (optional)

## Formulas

- Price per Sack / total Kg = price per Kg
- Selling price per Kg - price per Kg = profit per Kg
- Profit per Kg x total Kg = profit per Sack
- 1 plastic bundle = 5 packs
- 1 pack = 34 plastics
- 1 Kg = 1 plastic
- Plastic cost per Kg = bundle price / 170
- Plastic cost per Sack = plastic cost per Kg x total Kg

## How to Use

1. Open `index.html` in a browser (or visit the hosted URL).
2. Fill in `Price per Sack`, `Total Kg`, and `Selling price per Kg`.
3. To calculate plastic cost, fill `Plastic bundle price`.
4. Results update automatically.

## File Structure

- `index.html` - Main layout
- `styles.css` - Styling + dark mode + mobile friendly
- `app.js` - Calculation logic
- `manifest.webmanifest` - PWA configuration
- `icons/` - Web & shortcut icons
- `README.md` - Project description
