import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>Tentang Recipie App</h1>
        <p>"Menghubungkan kembali setiap orang ke dalam kehangatan dapur."</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Visi & Misi Kami</h2>
          <p>
            Di era yang serba cepat, seringkali kita kehilangan momen berharga di meja makan. Recipie App lahir dari sebuah gagasan sederhana: menjadikan memasak sebagai kegiatan yang menyenangkan, mudah, dan dapat diakses oleh semua orang. Misi kami adalah melestarikan warisan kul-iner Nusantara dan menginspirasi generasi baru untuk menciptakan cerita mereka sendiri di dapur.
          </p>
          <p>
            Kami percaya bahwa setiap resep adalah sebuah cerita—cerita tentang keluarga, tradisi, dan cinta. Melalui platform ini, kami ingin menyediakan ribuan cerita tersebut untuk Anda jelajahi.
          </p>
        </section>

        <section className="about-section">
          <h2>Cerita di Balik Proyek Ini</h2>
          <p>
            Recipie App merupakan sebuah Capstone Project yang dikembangkan sebagai bagian dari program "Student Developer Initiative". Proyek ini adalah puncak dari perjalanan belajar yang intensif, di mana konsep diubah menjadi aplikasi web yang fungsional dan siap pakai.
          </p>
          <p>
            Dalam pengembangannya, proyek ini didukung oleh teknologi AI dari **IBM Granite** untuk mempercepat proses pembuatan kode, optimasi, dan dokumentasi, membuktikan bagaimana kolaborasi antara developer dan kecerdasan buatan dapat menghasilkan produk yang lebih baik dalam waktu yang lebih singkat.
          </p>
        </section>

        <section className="about-section">
          <h2>Teknologi yang Kami Gunakan</h2>
          <p>Aplikasi ini dibangun di atas tumpukan teknologi modern untuk memastikan performa yang cepat, skalabilitas, dan pengalaman pengguna yang luar biasa:</p>
          <ul className="tech-stack-list">
            <li><strong>Frontend:</strong> React.js</li>
            <li><strong>Backend & Database:</strong> Google Firebase (Firestore & Authentication)</li>
            <li><strong>AI Support:</strong> IBM Granite (Code Generation & Optimization)</li>
            <li><strong>Hosting/Deployment:</strong> Netlify / Vercel</li>
            <li><strong>Styling:</strong> CSS3 Murni dengan CSS Variables & Flexbox/Grid</li>
          </ul>
        </section>
        
        <section className="about-section">
          <h2>Terhubung dengan Developer</h2>
          <p>
            Proyek ini dikembangkan dengan penuh semangat oleh seorang developer. Anda dapat melihat portofolio lain atau terhubung melalui platform profesional di bawah ini.
          </p>
          <div className="developer-links">
            {/* ======================= PERBAIKAN DI SINI ======================= */}
            {/* Link dimasukkan ke dalam 'href', dan 'rel' untuk keamanan */}
            <a 
              href="https://github.com/Nopitrasari29" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/aswalianovitriasari/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            {/* =================================================================== */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;