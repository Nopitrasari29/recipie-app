const admin = require('firebase-admin');
const fs = require('fs');

// Path ke file kunci akun layananmu
const serviceAccount = require('../serviceAccountKey.json');

// Inisialisasi Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Dapatkan referensi ke Firestore
const db = admin.firestore();

// Path ke file JSON datamu yang sudah bersih
const dataPath = './recipes-final.json';

async function uploadData() {
  try {
    console.log('Membaca file data...');
    const dataBuffer = fs.readFileSync(dataPath);
    const recipes = JSON.parse(dataBuffer);

    // Firestore memiliki batas 500 operasi per batch.
    // Karena data kita sekarang 500, ini akan dieksekusi dalam satu batch.
    const BATCH_SIZE = 500;
    let batch = db.batch();
    let count = 0;
    
    console.log(`Memulai proses upload ${recipes.length} resep...`);

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const docRef = db.collection('recipes').doc(); 
      batch.set(docRef, recipe);
      count++;

      if (count === BATCH_SIZE || i === recipes.length - 1) {
        console.log(`Mengirim batch ke-${Math.ceil((i + 1) / BATCH_SIZE)} berisi ${count} resep...`);
        await batch.commit();
        console.log('Batch berhasil diunggah.');
        
        batch = db.batch();
        count = 0;
      }
    }

    console.log('============================================');
    console.log('🎉 Semua data resep berhasil diunggah ke Firestore!');
    console.log('============================================');

  } catch (error) {
    console.error('Terjadi kesalahan saat mengunggah data:', error);
  }
}

// Jalankan fungsi upload
uploadData();