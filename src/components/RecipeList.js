import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-list">
      {recipes.length > 0 ? (
        recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <p className="status-message">Resep tidak ditemukan. Coba kata kunci lain.</p>
      )}
    </div>
  );
};

export default RecipeList;