import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home"; 
import SearchResults from "./pages/searchResults/SearchResults";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/search" element={<SearchResults />} /> 
      </Routes>
    </Router>
  );
}

export default App;
