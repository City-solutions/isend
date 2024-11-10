import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer

const NotFound = () => {
  return (
    <>
      {/* Header section */}
      <Header />
      
      {/* Main 404 Page Content */}
      <div className="flex justify-center items-center p-5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400 text-white">
        <div className="text-center max-w-2xl mx-6 p-8 bg-dark-blue rounded-lg shadow-lg">
          <FontAwesomeIcon icon={faExclamationTriangle} size="6x" className="text-red-600 mb-4" />
          <h1 className="text-5xl font-bold mb-4 text-white">Oops! Page Not Found</h1>
          <p className="text-lg mb-6 text-whitez">
            Sorry, the page you are looking for does not exist. It might have been removed or moved to a different URL.
          </p>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 inline-flex items-center"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Go to Home
          </Link>
        </div>
      </div>
      
      {/* Footer section */}
      <Footer />
    </>
  );
};

export default NotFound;
