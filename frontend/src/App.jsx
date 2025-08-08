import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import HomePage from './Pages/Home/HomePage';
import SignupPage from './Pages/Signup/SignupPage';
import LoginPage from './Pages/Login/LoginPage';
import RestaurantPage from './Pages/Restorant/RestaurantPage';
import ContactUsPage from './Pages/ContactPage';
import AboutPage from './Pages/AboutPage';

function App(){
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/RestaurantPage/:id" element={<RestaurantPage/>}/>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
