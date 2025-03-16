import React, { useState } from "react";
import { Home, Play, Trophy, User } from "lucide-react"; 
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img
              src="https://guhuza.com/logo/logo_white_large.png"
              alt="Guhuza Logo"
              className="logo"
            />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={`navbar-toggler d-lg-none ${menuOpen ? "open" : ""}`}
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="navbarMenu"
          >
            {menuOpen ? <span className="close-icon">✖</span> : <span className="hamburger-icon"></span>}
          </button>

          {/* Navigation Menu */}
          <nav className={`nav-menu ${menuOpen ? "open" : ""}`} id="navbarMenu">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/Dashboard" className="nav-link text-white" onClick={closeMenu}>
                  <Home className="me-2" size={18} /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Play" className="nav-link text-white" onClick={closeMenu}>
                  <Play className="me-2" size={18} /> Play
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Leaderboard" className="nav-link text-white" onClick={closeMenu}>
                  <Trophy className="me-2" size={18} /> Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Profile" className="nav-link text-white" onClick={closeMenu}>
                  <User className="me-2" size={18} /> Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
