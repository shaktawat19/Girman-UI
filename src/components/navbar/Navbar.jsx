import React, { useState, useEffect } from "react";
import "./Navbar.css";
import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img
          src="logoNavbar.png"
          alt="Girman Technologies Logo"
          className="logo"
        />
        <div className="company-name ">
          <h1 className="girman primary-heading">Girman</h1>
        </div>
      </div>

      {
        <>
          {!isMobile && (
            <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
              <li className="nav-item">
                <a href="#search" className="nav-link search-link">
                  Search
                </a>
              </li>
              <li className="nav-item">
                <a href="https://girmantech.com" className="nav-link">
                  Website
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.linkedin.com/company/girmantech"
                  className="nav-link"
                >
                  LinkedIn
                </a>
              </li>
              <li className="nav-item">
                <a href="mailto:contact@girmantech.com" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
          )}
          {isMobile && (
            <>
              <button className="hamburger" onClick={toggleMenu}>
                &#9776;
              </button>
              {isMenuOpen && (
                <ul className={`nav-links-mobile ${isMenuOpen ? "open" : ""}`}>
                  <li className="nav-item">
                    <a href="#search" className="nav-link search-link">
                      Search
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="https://girmantech.com" className="nav-link">
                      Website
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://www.linkedin.com/company/girmantech"
                      className="nav-link"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="mailto:contact@girmantech.com"
                      className="nav-link"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              )}
            </>
          )}
        </>
      }
    </nav>
  );
};

export default Navbar;
