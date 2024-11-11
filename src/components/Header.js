import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDollarSign, faEnvelope, faTruck, faGlobe, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoWhite from '../assets/images/logo-white.png'; 

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const menuRef = useRef(null);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false); // Close the menu when a menu item is selected
  };

  return (
    <header className="bg-blue-900 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center p-4 md:px-8 lg:px-16">
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold text-white hover:text-blue-300">
          <img src={logoWhite} alt="Logo" className="h-12 mr-3" /> {/* Logo Image */}
         
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8 text-lg text-white">
            <li>
              <Link to="/how-it-works" className="flex items-center hover:text-blue-300">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                {t('menu.howItWorks')}
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="flex items-center hover:text-blue-300">
                <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                {t('menu.pricing')}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="flex items-center hover:text-blue-300">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                {t('menu.contact')}
              </Link>
            </li>
            <li>
              <Link to="/track" className="flex items-center hover:text-blue-300">
                <FontAwesomeIcon icon={faTruck} className="mr-2" />
                {t('menu.track')}
              </Link>
            </li>
          </ul>

          {/* Language Selector */}
          <div className="ml-4 flex items-center">
            <FontAwesomeIcon icon={faGlobe} className="text-white mr-2" />
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              defaultValue={i18n.language}
              className="bg-blue-900 text-white border border-white rounded-lg px-2 py-1 focus:outline-none hover:bg-blue-800"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>

          {/* Pickup Request Button for Desktop */}
          <div className="ml-8">
            <Link
              to="/make-request"
              className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <FontAwesomeIcon icon={faTruck} className="mr-2" />
              {t('menu.pickupRequest')}
            </Link>
          </div>
        </div>

        {/* Toggler Button for Mobile */}
        <button
          className="md:hidden text-white hover:text-blue-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-0 left-0 w-full p-5 bg-blue-900 text-white md:hidden z-40"
          >
            <ul className="flex flex-col space-y-6 text-lg">
              <li>
                <Link to="/how-it-works" onClick={handleMenuItemClick} className="flex items-center hover:text-blue-300">
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  {t('menu.howItWorks')}
                </Link>
              </li>
              <li>
                <Link to="/pricing" onClick={handleMenuItemClick} className="flex items-center hover:text-blue-300">
                  <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                  {t('menu.pricing')}
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={handleMenuItemClick} className="flex items-center hover:text-blue-300">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  {t('menu.contact')}
                </Link>
              </li>
              <li>
                <Link to="/track" onClick={handleMenuItemClick} className="flex items-center hover:text-blue-300">
                  <FontAwesomeIcon icon={faTruck} className="mr-2" />
                  {t('menu.track')}
                </Link>
              </li>
            </ul>

            {/* Language Selector for Mobile */}
            <div className="mt-6">
              <FontAwesomeIcon icon={faGlobe} className="mr-2" />
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                defaultValue={i18n.language}
                className="bg-blue-900 text-white border border-white rounded-lg px-2 py-1 w-full"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>

            {/* Pickup Request Button for Mobile */}
            <div className="mt-8">
              <Link
                to="/make-request"
                onClick={handleMenuItemClick}
                className="flex items-center justify-center bg-gradient-to-r from-blue-800 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
              >
                <FontAwesomeIcon icon={faTruck} className="mr-2" />
                {t('menu.pickupRequest')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
