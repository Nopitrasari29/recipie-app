import React from 'react';
import RecipeForm from '../components/RecipeForm';
import './AddRecipePage.css'; // Kita akan buat file CSS ini

const AddRecipePage = () => {
  return (
    <div className="add-recipe-container">
      <div className="page-header">
        <h1>Bagikan Resep Andalannmu</h1>
        <p>Isi form di bawah ini untuk mempublikasikan resep kreasimu kepada dunia.</p>
      </div>
      <RecipeForm />
    </div>
  );
};

export default AddRecipePage;