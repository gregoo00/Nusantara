import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css"
import { FaUtensils, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { MdDriveFileRenameOutline } from 'react-icons/md';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Data for search suggestions (same as in Home.jsx)
  const Data = [
    {
      id: 1,
      imgSrc: "cimol.jpg",
      foodTitle: "Cimol",
      location: "Jl. Anggrek Cakra No.9 4, RT.4/RW.6, Sukabumi Utara, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11530",
      grade: "4.3",
      fees: " Rp.6.000 - 20.000/orang",
      description: "Ayam Bakar Klaten Pak Beng, menyediakan menu khusus Ayam bakar dan ayam Goreng dengan ciri khas rasa Klaten, manis, gurih dan rasa nya meresap sampai ke tulang-tulangnya",
    },
    {
      id: 2,
      imgSrc: "WarungNasi.jpg",
      foodTitle: "Warung Nasi Sederhana Pring Lestari",
      location: "RQ2Q+M4V, RT.5/RW.11, Palmerah, West Jakarta City, Jakarta 11480",
      fees: "Rp.10.000 - 30.000/Orang",
      grade: "4.5",
    },
    {
      id: 3,
      imgSrc: "NasgorLegend.jpeg",
      foodTitle: "Nasi Goreng Legend Binus Syahdan",
      location: "Jl. H. Sennin No.51, Palmerah, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11480",
      fees: "Rp.15.000 - 35.000/Orang",
      grade: "4.2",
    },
  ];

  const getSuggestions = (query) => {
    if (query.trim() === "") return [];
    const filteredSuggestions = Data.filter((item) =>
      item.foodTitle.toLowerCase().includes(query.toLowerCase())
    );
    return filteredSuggestions.slice(0, 5);
  };

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    setSuggestions(getSuggestions(newQuery));
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    const foodId = Data.find((item) =>
      item.foodTitle.toLowerCase().includes(trimmedQuery)
    )?.id;

    if (foodId) {
      navigate(`/RestaurantPage/${foodId}`);
    } else {
      console.log("No matching food found");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/Home" className="logo-link">
            <FaUtensils className="logo-icon" />
            <span className="logo-text">Nusantara</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="foodInput">
            <div className="input flex">
              <MdDriveFileRenameOutline className="icon" />
              <input
                type="search"
                placeholder="Enter restaurant name here..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              {suggestions.length > 0 && (
                <ul className="suggestionsDropdown">
                  {suggestions.map((item) => (
                    <li key={item.id} onClick={() => handleSearch()}>
                      {item.foodTitle}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className="search-button" onClick={handleSearch}>
              <FaSearch className="icon" />
            </button>
          </div>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="nav-links-desktop">
          <Link to="/Home" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/login" className="nav-link auth-link">Login</Link>
          <Link to="/signup" className="nav-link auth-link">Sign Up</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-button">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="menu-toggle"
          >
            {isOpen ? <FaTimes className="menu-icon" /> : <FaBars className="menu-icon" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="nav-links-mobile">
          <Link to="/HomePage" className="nav-link-mobile">Home</Link>
          <Link to="/about" className="nav-link-mobile">About</Link>
          <Link to="/contact" className="nav-link-mobile">Contact</Link>
          <Link to="/login" className="nav-link-mobile auth-link">Login</Link>
          <Link to="/signup" className="nav-link-mobile auth-link">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}