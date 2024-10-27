import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCogs, faDollarSign, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-900 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center p-4 md:px-8 lg:px-16">
        <a href="#" className="text-2xl font-bold text-white transition duration-200 hover:text-blue-300">
          iSend
        </a>

        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            aria-label="Open Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:w-auto md:space-x-8`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 text-white">
            <li className="flex items-center">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              <a href="#how-it-works" className="hover:text-blue-300 transition duration-200">How It Works</a>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faCogs} className="mr-2" />
              <a href="#features" className="hover:text-blue-300 transition duration-200">Features</a>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
              <a href="#pricing" className="hover:text-blue-300 transition duration-200">Pricing</a>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              <a href="#contact" className="hover:text-blue-300 transition duration-200">Contact</a>
            </li>
          </ul>

          {/* Request Pickup Button */}
          <a
            href="#request-form"
            className="block md:inline-block bg-gradient-to-r from-blue-800 to-blue-600 text-white mt-4 md:mt-0 md:ml-4 px-6 py-2 rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105 hover:shadow-xl"
          >
            Request Pickup
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
