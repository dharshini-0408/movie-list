import React, { useState } from "react";
import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Header({ setSearchQuery }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-fixed top-0 w-100 z-index-1000">
      <div className="container">
        <div className="logo">
          <Link className="nav-link" to="/">
            <img src="/logo.png" alt="logo" />
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item me-5">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/tv">
                TV Shows
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/movie">
                Movies
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/anime">
                Anime
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/cartoon">
                Cartoons
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-5"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
