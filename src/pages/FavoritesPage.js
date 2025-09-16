import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, query, where, getDocs, documentId } from 'firebase/firestore';
import RecipeList from '../components/RecipeList';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useAuth();

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      if (!userData || !userData.favorites || userData.favorites.length === 0) {
        setFavoriteRecipes([]);
        setLoading(false);
        return;
      }

      try {
        const recipesRef = collection(db, 'recipes');
        // Query spesial: ambil dokumen di mana ID-nya ada di dalam array 'favorites'
        const q = query(recipesRef, where(documentId(), 'in', userData.favorites));
        
        const querySnapshot = await getDocs(q);
        const recipes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFavoriteRecipes(recipes);
      } catch (error) {
        console.error("Error fetching favorite recipes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteRecipes();
  }, [userData]); // Jalankan ulang setiap kali data pengguna (termasuk favorit) berubah

  return (
    <div className="favorites-page-container">
      <div className="page-header">
        <h1>Resep Favorit Saya</h1>
        <p>Koleksi resep pilihan yang siap menginspirasi Anda kapan saja.</p>
      </div>
      
      {loading ? (
        <p className="status-message">Memuat resep favorit...</p>
      ) : favoriteRecipes.length > 0 ? (
        <RecipeList recipes={favoriteRecipes} />
      ) : (
        <p className="status-message">Anda belum memiliki resep favorit. Mulai jelajahi dan simpan resep yang Anda sukai!</p>
      )}
    </div>
  );
};

export default FavoritesPage;