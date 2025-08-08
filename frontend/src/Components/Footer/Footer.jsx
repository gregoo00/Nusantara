import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaUtensils } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer flex">
      <div className="footer-content flex">
        <div className="footer-logo">
            <h1>
              <FaUtensils className="icon" />
              Nusantara
            </h1>
        </div>
        <div className="footer-links flex">
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
          <Link to="/terms" className="footer-link">Terms</Link>
          <Link to="/privacy" className="footer-link">Privacy</Link>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Nusantara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}