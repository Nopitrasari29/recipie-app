import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { doc, getDoc, collection, getDocs, runTransaction, query, orderBy, limit } from 'firebase/firestore';
import StarRating from '../components/StarRating';
import { FaClipboard } from 'react-icons/fa';
import './RecipeDetailPage.css';

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const { currentUser } = useAuth();

  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');
  
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  // ===================== INI BAGIAN LOGIKA YANG TADI HILANG =====================
  const fetchRecipeAndReviews = useCallback(async () => {
    if (!recipeId) return;
    setLoading(true);
    try {
      const recipeDocRef = doc(db, 'recipes', recipeId);
      const recipeSnap = await getDoc(recipeDocRef);

      if (recipeSnap.exists()) {
        setRecipe(recipeSnap.data());

        const reviewsQuery = query(collection(db, 'recipes', recipeId, 'reviews'), orderBy('createdAt', 'desc'), limit(10));
        const reviewsSnap = await getDocs(reviewsQuery);
        const reviewsData = reviewsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReviews(reviewsData);

        if (currentUser) {
          const userReviewRef = doc(db, 'recipes', recipeId, 'reviews', currentUser.uid);
          const userReviewSnap = await getDoc(userReviewRef);
          if (userReviewSnap.exists()) {
            setHasReviewed(true);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [recipeId, currentUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRecipeAndReviews();
  }, [fetchRecipeAndReviews]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (userRating === 0) {
      alert("Harap berikan rating bintang.");
      return;
    }
    setIsSubmitting(true);
    const recipeDocRef = doc(db, "recipes", recipeId);
    const reviewDocRef = doc(db, "recipes", recipeId, "reviews", currentUser.uid);
    try {
      await runTransaction(db, async (transaction) => {
        const recipeDoc = await transaction.get(recipeDocRef);
        if (!recipeDoc.exists()) throw "Resep tidak ditemukan!";
        const oldReviewCount = recipeDoc.data().reviewCount || 0;
        const oldAverageRating = recipeDoc.data().averageRating || 0;
        const newReviewCount = oldReviewCount + 1;
        const newAverageRating = ((oldAverageRating * oldReviewCount) + userRating) / newReviewCount;
        
        transaction.update(recipeDocRef, { 
          reviewCount: newReviewCount,
          averageRating: parseFloat(newAverageRating.toFixed(1))
        });
        
        transaction.set(reviewDocRef, {
          rating: userRating,
          comment: userComment,
          authorName: currentUser.email.split('@')[0],
          authorId: currentUser.uid,
          createdAt: new Date().toISOString()
        });
      });
      fetchRecipeAndReviews();
      setHasReviewed(true);
    } catch (error) {
      console.error("Gagal mengirim ulasan: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyIngredients = () => {
    if (!recipe || !recipe.ingredients) return;
    const ingredientsText = `Bahan untuk ${recipe.title}:\n\n` + recipe.ingredients.join('\n');
    navigator.clipboard.writeText(ingredientsText)
      .then(() => {
        setCopySuccess('Bahan berhasil disalin ke clipboard!');
        setTimeout(() => setCopySuccess(''), 3000);
      })
      .catch(err => {
        console.error('Gagal menyalin bahan: ', err);
        setCopySuccess('Gagal menyalin. Coba lagi.');
        setTimeout(() => setCopySuccess(''), 3000);
      });
  };
  // ===========================================================================

  if (loading) return <p className="status-message">Memuat detail resep...</p>;
  if (!recipe) return <p className="status-message">Resep tidak ditemukan.</p>;

  const placeholderImageUrl = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop`;

  return (
    <div className="recipe-detail-container">
      <h1 className="recipe-detail-title">{recipe.title}</h1>
      
      <div className="meta-info">
        <StarRating rating={recipe.averageRating} isInteractive={false} />
        <span>({recipe.reviewCount || 0} ulasan)</span>
        <span>|</span>
        <span>Oleh: {recipe.authorName}</span>
      </div>
      
      <div 
        className="recipe-detail-image" 
        style={{ backgroundImage: `url(${placeholderImageUrl})` }}
      ></div>
      
      <div className="recipe-content-grid">
        <div className="ingredients-section">
          <div className="section-header">
            <h2>Bahan-bahan</h2>
            <button className="copy-button" onClick={handleCopyIngredients}>
              <FaClipboard /> Salin Bahan
            </button>
          </div>
          {copySuccess && <p className="copy-feedback">{copySuccess}</p>}
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        
        <div className="steps-section">
          <div className="section-header">
            <h2>Langkah-langkah</h2>
          </div>
          <ol className="steps-list">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
      
      <div className="reviews-section">
        <h2>Ulasan Pengguna</h2>
        
        {currentUser && !hasReviewed && (
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <h3>Tulis Ulasan Anda</h3>
            <StarRating rating={userRating} onRatingChange={setUserRating} />
            <textarea 
              rows="4" 
              placeholder="Bagikan pengalaman Anda memasak resep ini..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            ></textarea>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
            </button>
          </form>
        )}
        {currentUser && hasReviewed && <p className="feedback-message">Anda sudah memberikan ulasan untuk resep ini.</p>}

        <div className="review-list">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <strong>{review.authorName}</strong>
                  <StarRating rating={review.rating} isInteractive={false} />
                </div>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>Belum ada ulasan untuk resep ini. Jadilah yang pertama!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;