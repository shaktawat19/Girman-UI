import React from "react";
import Navbar from "../../components/navbar/Navbar";
import SearchBar from "../../components/searchBar/SearchBar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="mid-section">
        <div className="home-logo-container">
          <img src="logo.svg" alt="Girman Technologies Logo" className="logo" />
          <div className="company-name">
            <h1 className="girman">Girman</h1>
          </div>
        </div>
        <SearchBar />
      </div>
    </div>
  );
};

export default Home;
