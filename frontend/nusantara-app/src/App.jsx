import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import HomePage from './Pages/Home/HomePage';
import SignupPage from './Pages/Signup/SignupPage';
import LoginPage from './Pages/Login/LoginPage';

function App(){
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
