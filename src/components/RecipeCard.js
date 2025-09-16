import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Impor hook auth kita
import { db } from '../services/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Impor ikon hati
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth(); // Ambil user yang login dan datanya

  // Cek apakah resep ini ada di daftar favorit pengguna
  const isFavorited = userData?.favorites?.includes(recipe.id);

  const handleCardClick = (e) => {
    // Mencegah navigasi saat mengklik tombol hati
    if (e.target.closest('.favorite-btn')) {
      return;
    }
    navigate(`/recipe/${recipe.id}`);
  };

  const handleFavorite = async () => {
    if (!currentUser) {
      alert("Silakan login untuk menambahkan resep ke favorit!");
      navigate('/login');
      return;
    }

    const userDocRef = doc(db, 'users', currentUser.uid);
    try {
      if (isFavorited) {
        // Jika sudah difavorit, hapus dari array
        await updateDoc(userDocRef, {
          favorites: arrayRemove(recipe.id)
        });
      } else {
        // Jika belum, tambahkan ke array
        await updateDoc(userDocRef, {
          favorites: arrayUnion(recipe.id)
        });
      }
    } catch (error) {
      console.error("Error updating favorites", error);
    }
  };

  const placeholderImageUrl = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop`;
  const cardImageStyle = { backgroundImage: `url(${placeholderImageUrl})` };

  return (
    <div className="recipe-card" onClick={handleCardClick}>
      {/* Tombol Hati (hanya muncul jika user login) */}
      {currentUser && (
        <button className="favorite-btn" onClick={handleFavorite}>
          {isFavorited ? <FaHeart color="#D5B893" /> : <FaRegHeart />}
        </button>
      )}

      <div className="card-image-background" style={cardImageStyle}>
        <div className="image-overlay"></div>
      </div>
      <div className="recipe-info">
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;