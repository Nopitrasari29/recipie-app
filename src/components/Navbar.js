import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import './Navbar.css';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Fungsi ini akan memberikan class 'active' ke NavLink yang sedang aktif
  const getLinkClass = ({ isActive }) => isActive ? "nav-item active" : "nav-item";

  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        <Link to="/" className="nav-brand">Recipie App</Link>
        
        <ul className="nav-menu">
          <li><NavLink to="/" className={getLinkClass}>Beranda</NavLink></li>
          
          {/* Menu yang hanya muncul saat pengguna sudah login */}
          {currentUser && (
            <>
              <li><NavLink to="/favorites" className={getLinkClass}>Favorit Saya</NavLink></li>
              <li><NavLink to="/add-recipe" className={getLinkClass}>Tambah Resep</NavLink></li>
            </>
          )}
          
          <li><NavLink to="/about" className={getLinkClass}>Tentang</NavLink></li>
        </ul>

        <div className="nav-actions">
          {currentUser ? (
            // Tampilan jika sudah login
            <>
              <span className="nav-user">Halo, {currentUser.email.split('@')[0]}</span>
              <button onClick={handleLogout} className="nav-button logout-btn">Logout</button>
            </>
          ) : (
            // Tampilan jika belum login
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-button register-btn">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;