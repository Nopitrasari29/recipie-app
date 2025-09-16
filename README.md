# Recipie App - 1 Ide, Ribuan Rasa

**Recipie App** adalah aplikasi web resep masakan *full-stack* yang dibangun sebagai Capstone Project untuk program "Student Developer Initiative". Aplikasi ini tidak hanya berfungsi sebagai galeri resep, tetapi juga sebagai platform komunitas di mana pengguna dapat berbagi kreasi kuliner mereka sendiri, menyimpan resep favorit, dan memberikan ulasan.

**https://recipie-app-capstone.netlify.app/** 

---

## Deskripsi Proyek

Di era modern yang serba cepat, seringkali kita kehilangan momen berharga di dapur dan meja makan. Recipie App lahir dari sebuah gagasan sederhana: menjadikan memasak sebagai kegiatan yang menyenangkan, mudah, dan dapat diakses oleh semua orang. Aplikasi ini bertujuan untuk melestarikan warisan kuliner Nusantara dan menginspirasi generasi baru untuk menciptakan cerita mereka sendiri melalui masakan.

## Fitur-fitur Utama

Aplikasi ini dilengkapi dengan serangkaian fitur modern yang dirancang untuk memberikan pengalaman pengguna yang kaya dan interaktif:

#### Fitur Inti & Performa
-   **🍽️ Penjelajahan Resep:** Tampilan galeri resep yang bersih dan profesional dengan layout grid yang responsif.
-   **⚡ Pemuatan Cepat (Pagination):** Halaman utama hanya memuat 12 resep pertama dan menyediakan tombol "Muat Lebih Banyak" untuk memastikan performa aplikasi tetap optimal, bahkan dengan ribuan data.
-   **🔍 Pencarian Cepat (Server-Side):** Fitur pencarian yang langsung berinteraksi dengan database Firestore untuk memberikan hasil yang instan dan akurat.
-   **📖 Halaman Detail Resep:** Setiap resep memiliki halaman detailnya sendiri yang menampilkan bahan-bahan dan langkah-langkah pembuatan yang rapi.

#### Fitur Pengguna & Interaktivitas
-   **👤 Otentikasi Pengguna Penuh:** Sistem registrasi dan login yang aman menggunakan Firebase Authentication.
-   **⭐ Fitur Resep Favorit:** Pengguna yang sudah login dapat menyimpan (bookmark) resep yang mereka sukai dan melihatnya di halaman "Favorit Saya" yang terproteksi.
-   **✍️ Tambah Resep Sendiri:** Pengguna dapat berkontribusi dengan mengunggah resep kreasi mereka sendiri melalui form dinamis.
-   **🌟 Rating & Ulasan:** Pengguna dapat memberikan rating bintang dan menulis ulasan pada setiap resep, menciptakan nuansa komunitas dan membantu pengguna lain menemukan resep terbaik.
-   **📋 Salin Bahan Sekali Klik:** Tombol fungsional di halaman detail untuk menyalin seluruh daftar bahan ke clipboard, memudahkan persiapan belanja.

#### Fitur Antarmuka (UI/UX)
-   **🎨 Desain Profesional:** Menggunakan palet warna "Space Cadet" yang elegan dan tipografi modern (`Playfair Display` & `Montserrat`) untuk pengalaman visual yang premium.
-   **🔒 Keamanan Input Password:** Form Login dan Register dilengkapi dengan ikon mata untuk menampilkan/menyembunyikan password.
-   **ℹ️ Halaman Informasi:** Halaman "Tentang" yang informatif menjelaskan visi proyek dan teknologi yang digunakan.

---

## Tumpukan Teknologi (Technologies Used)

Aplikasi ini dibangun menggunakan tumpukan teknologi modern yang berfokus pada performa dan skalabilitas:

-   **Frontend:** React.js
-   **Backend & Database:** Google Firebase (Firestore & Authentication)
-   **Styling:** CSS3 Murni (dengan CSS Variables, Flexbox, & Grid)
-   **Deployment:** Netlify
-   **Library Tambahan:**
    -   `react-router-dom` untuk navigasi.
    -   `react-icons` untuk ikonografi.

---

## Penjelasan Dukungan AI (AI Support Explanation)

Dalam proses pengembangan, proyek ini secara aktif memanfaatkan dukungan dari AI, khususnya **IBM Granite**, untuk meningkatkan efisiensi dan kualitas kode. Berikut adalah beberapa contoh penggunaannya:

-   **Code Generation & Boilerplate:** IBM Granite digunakan untuk menghasilkan *boilerplate code* awal untuk komponen React, seperti form, kartu resep, dan struktur halaman. Ini secara signifikan mempercepat fase setup awal proyek.
-   **Problem Solving & Debugging:** Saat menghadapi tantangan teknis, seperti mengimplementasikan query yang kompleks di Firestore atau memperbaiki bug asinkron, saya berkonsultasi dengan AI untuk mendapatkan berbagai pendekatan solusi dan penjelasan konsep yang mendalam.
-   **Optimasi & Refactoring:** AI membantu dalam me-*refactor* kode agar lebih bersih dan efisien. Contohnya adalah saat menyederhanakan logika *state management* di komponen `HomePage.js` dan memberikan saran untuk struktur *Security Rules* di Firestore.
-   **Penulisan Script:** AI membantu dalam pembuatan script Node.js (seperti `refine.js` dan `seed.js`) untuk memproses dan mengunggah data dari file CSV/JSON ke database, termasuk memberikan solusi untuk membersihkan data yang tidak terstruktur.

**Dampak Nyata:** Penggunaan AI dalam proyek ini tidak hanya mempercepat waktu pengembangan, tetapi juga berfungsi sebagai "mentor" virtual yang memungkinkan eksplorasi solusi teknis yang lebih canggih dan efisien, menghasilkan produk akhir yang lebih solid.

---

## Setup & Instalasi Lokal

Untuk menjalankan proyek ini di lingkungan lokal, ikuti langkah-langkah berikut:

1.  **Clone repository ini:**
    ```bash
    git clone https://github.com/NAMA-ANDA/recipie-app.git
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd recipie-app
    ```

3.  **Install semua dependency:**
    ```bash
    npm install
    ```

4.  **Setup Environment Variables:**
    -   Buat file `.env.local` di root folder proyek.
    -   Isi file tersebut dengan kunci API Firebase Anda dengan format berikut:
        ```
        REACT_APP_FIREBASE_API_KEY="YOUR_API_KEY"
        REACT_APP_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
        # ... dan seterusnya
        ```

5.  **Jalankan aplikasi:**
    ```bash
    npm start
    ```

---

*Proyek ini didedikasikan untuk semua pencinta kuliner dan sebagai bukti perjalanan belajar dalam dunia pengembangan web. Dibuat oleh Aswalia Novitriasari.*
