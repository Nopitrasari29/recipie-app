import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { FaPlus, FaTrash } from 'react-icons/fa';
import './RecipeForm.css'; // Kita akan buat file CSS ini

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState(['']); // Mulai dengan satu input kosong
  const [steps, setSteps] = useState(['']); // Mulai dengan satu input kosong
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Handler untuk input dinamis
  const handleDynamicChange = (index, event, fieldType) => {
    const newValues = fieldType === 'ingredients' ? [...ingredients] : [...steps];
    newValues[index] = event.target.value;
    fieldType === 'ingredients' ? setIngredients(newValues) : setSteps(newValues);
  };

  // Handler untuk menambah field input
  const addField = (fieldType) => {
    fieldType === 'ingredients'
      ? setIngredients([...ingredients, ''])
      : setSteps([...steps, '']);
  };

  // Handler untuk menghapus field input
  const removeField = (index, fieldType) => {
    const newValues = fieldType === 'ingredients' ? [...ingredients] : [...steps];
    if (newValues.length > 1) { // Selalu sisakan minimal satu input
      newValues.splice(index, 1);
      fieldType === 'ingredients' ? setIngredients(newValues) : setSteps(newValues);
    }
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setError("Anda harus login untuk menambahkan resep.");
      return;
    }
    setLoading(true);
    setError('');

    // Filter input kosong
    const finalIngredients = ingredients.filter(ing => ing.trim() !== '');
    const finalSteps = steps.filter(step => step.trim() !== '');

    if (!title || finalIngredients.length === 0 || finalSteps.length === 0) {
      setError("Judul, minimal satu bahan, dan satu langkah tidak boleh kosong.");
      setLoading(false);
      return;
    }

    try {
      const newRecipeData = {
        title,
        ingredients: finalIngredients,
        steps: finalSteps,
        authorId: currentUser.uid,
        authorName: currentUser.email.split('@')[0],
        createdAt: new Date().toISOString(),
        category: "Lainnya", // Default kategori, bisa dikembangkan nanti
        imageUrl: `https://placehold.co/600x400/617891/FFFFFF?text=${encodeURIComponent(title)}`
      };

      const docRef = await addDoc(collection(db, "recipes"), newRecipeData);
      console.log("Document written with ID: ", docRef.id);
      
      // Arahkan ke halaman detail resep yang baru dibuat
      navigate(`/recipe/${docRef.id}`);

    } catch (err) {
      setError("Gagal menyimpan resep. Silakan coba lagi.");
      console.error("Error adding document: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      
      <div className="form-group">
        <label htmlFor="title">Judul Resep</label>
        <input 
          type="text" 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Nasi Goreng Spesial"
          required 
        />
      </div>

      <div className="form-group">
        <label>Bahan-bahan</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="dynamic-input-group">
            <input 
              type="text" 
              value={ingredient}
              onChange={(e) => handleDynamicChange(index, e, 'ingredients')}
              placeholder={`Bahan #${index + 1}`}
            />
            <button type="button" className="remove-btn" onClick={() => removeField(index, 'ingredients')}>
              <FaTrash />
            </button>
          </div>
        ))}
        <button type="button" className="add-btn" onClick={() => addField('ingredients')}>
          <FaPlus /> Tambah Bahan
        </button>
      </div>

      <div className="form-group">
        <label>Langkah-langkah</label>
        {steps.map((step, index) => (
          <div key={index} className="dynamic-input-group">
            <textarea
              value={step}
              onChange={(e) => handleDynamicChange(index, e, 'steps')}
              placeholder={`Langkah #${index + 1}`}
              rows="3"
            />
            <button type="button" className="remove-btn" onClick={() => removeField(index, 'steps')}>
              <FaTrash />
            </button>
          </div>
        ))}
        <button type="button" className="add-btn" onClick={() => addField('steps')}>
          <FaPlus /> Tambah Langkah
        </button>
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Menyimpan...' : 'Publikasikan Resep'}
      </button>
    </form>
  );
};

export default RecipeForm;