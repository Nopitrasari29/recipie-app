import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, query, getDocs, limit, startAfter, orderBy, where } from 'firebase/firestore';
import RecipeList from '../components/RecipeList';
import './HomePage.css';

const RECIPES_PER_PAGE = 12;
const recipesCollectionRef = collection(db, 'recipes');

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  
  const [activeQuery, setActiveQuery] = useState(null);

  // Fungsi utama untuk menjalankan query
  const runQuery = async (q, isLoadingMore = false) => {
    if (!isLoadingMore) setLoading(true); else setLoadingMore(true);

    try {
      const snapshots = await getDocs(q);
      const lastDoc = snapshots.docs[snapshots.docs.length - 1];
      setLastVisible(lastDoc);
      
      const newRecipes = snapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      if (isLoadingMore) setRecipes(prev => [...prev, ...newRecipes]);
      else setRecipes(newRecipes);
      
      setHasMore(snapshots.docs.length === RECIPES_PER_PAGE);
    } catch (error) {
      console.error("Error executing query: ", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Handler untuk form pencarian
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value.trim();
    
    let q;
    if (searchTerm) {
      const formattedTerm = searchTerm.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
      const endQuery = formattedTerm + '\uf8ff';
      q = query(recipesCollectionRef, 
        where('title', '>=', formattedTerm), 
        where('title', '<=', endQuery), 
        orderBy('title'), 
        limit(RECIPES_PER_PAGE));
    } else {
      q = query(recipesCollectionRef, orderBy('title'), limit(RECIPES_PER_PAGE));
    }
    setActiveQuery(q);
    runQuery(q);
  };
  
  // Handler untuk tombol "Muat Lebih Banyak"
  const loadMoreRecipes = () => {
    if (lastVisible && hasMore && activeQuery) {
      const nextQuery = query(activeQuery, startAfter(lastVisible));
      runQuery(nextQuery, true);
    }
  };

  // useEffect HANYA untuk pemuatan awal
  useEffect(() => {
    const initialQuery = query(recipesCollectionRef, orderBy('title'), limit(RECIPES_PER_PAGE));
    setActiveQuery(initialQuery);
    runQuery(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="homepage-container">
      <div className="hero-section">
        <h1>Temukan Inspirasi Memasakmu</h1>
        <p>1 Ide, Ribuan Rasa. Jelajahi ribuan resep dari seluruh nusantara.</p>
      </div>
      
      <div className="filter-bar">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            name="search"
            type="text"
            placeholder="Cari berdasarkan nama resep..."
            className="search-bar"
          />
          <button type="submit" className="search-button">Cari</button>
        </form>
        {/* Dropdown kategori sudah dihapus dari sini */}
      </div>

      {loading ? (
        <p className="status-message">Memuat resep...</p>
      ) : (
        <>
          <RecipeList recipes={recipes} />
          {hasMore && !loadingMore && (
            <div className="load-more-container">
              <button onClick={loadMoreRecipes} className="load-more-button">
                Muat Lebih Banyak
              </button>
            </div>
          )}
          {loadingMore && <p className="status-message">Memuat...</p>}
        </>
      )}
    </div>
  );
};

export default HomePage;