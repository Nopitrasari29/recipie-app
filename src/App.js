import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Impor semua Halaman (Pages)
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import FavoritesPage from './pages/FavoritesPage';
import AddRecipePage from './pages/AddRecipePage';

// Impor semua Komponen (Components)
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Impor CSS Global
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            {/* Rute Publik yang Bisa Diakses Siapa Saja */}
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Rute yang Dilindungi (Hanya untuk User yang Login) */}
            <Route 
              path="/favorites" 
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add-recipe" 
              element={
                <ProtectedRoute>
                  <AddRecipePage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;