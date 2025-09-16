const fs = require('fs');
const rawDataPath = './recipie.json';
const finalDataPath = './recipes-final.json';
const RECIPE_LIMIT = 10000; 

console.log('Membaca data mentah dari recipie.json...');

try {
  const rawDataBuffer = fs.readFileSync(rawDataPath);
  const recipesRaw = JSON.parse(rawDataBuffer);
  const recipesToProcess = recipesRaw.slice(0, RECIPE_LIMIT);

  console.log(`Memproses ${recipesToProcess.length} resep...`);

  const recipesFinal = recipesToProcess.map(rawRecipe => {

    const stepsArray = rawRecipe.Steps
      ? rawRecipe.Steps.replace(/\\n/g, '\n').split('\n').map(step => step.trim().replace(/^(\(?\d+\)?\.?\s*)+/, '')).filter(step => step.length > 5)
      : [];

    const rawImageURL = rawRecipe.Image;
    const placeholderImage = `https://placehold.co/600x400/617891/FFFFFF?text=${encodeURIComponent(rawRecipe.Title)}`;
    const finalImageURL = (rawImageURL && (rawImageURL.startsWith('http'))) ? rawImageURL : placeholderImage;
    
    const rawCategory = rawRecipe.Category || "Lainnya";
    const formattedCategory = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase();

    return {
      title: rawRecipe.Title || "Tanpa Judul",
      category: formattedCategory,
      ingredients: rawRecipe.Ingredients ? rawRecipe.Ingredients.split('--').map(item => item.trim()) : [],
      steps: stepsArray,
      imageUrl: finalImageURL,
      authorId: 'system-generated',
      authorName: 'Admin',
      createdAt: new Date().toISOString(),
      // ================ PENAMBAHAN BARU UNTUK RATING ================
      reviewCount: 0,
      averageRating: 0
      // ==============================================================
    };
  });

  console.log('Proses pembersihan selesai.');
  fs.writeFileSync(finalDataPath, JSON.stringify(recipesFinal, null, 2));

  console.log(`🎉 BERHASIL! ${recipesFinal.length} resep bersih telah disimpan di ${finalDataPath}`);

} catch (error) {
  console.error('Terjadi kesalahan selama proses:', error);
}