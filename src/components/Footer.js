// src/components/Footer.js
import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-800 text-white py-10 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12  text-left">
          {/* Column for Service Description and Navigation Links */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Service</h2>
            <p className="text-sm text-gray-400">
  We provide a dependable delivery service that begins with your pickup request and culminates in fast, reliable delivery. You can trust us to handle your needs with efficiency and care.
</p>
            <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
            <div className="flex flex-col">
              <a
                href="#how-it-works"
                className="hover:text-blue-400 transition duration-200 transform hover:scale-105"
              >
                How It Works
              </a>
              <a
                href="#features"
                className="hover:text-blue-400 transition duration-200 transform hover:scale-105"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="hover:text-blue-400 transition duration-200 transform hover:scale-105"
              >
                Pricing
              </a>
              <a
                href="#contact"
                className="hover:text-blue-400 transition duration-200 transform hover:scale-105"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Column for Map of Locations */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold mb-2">Our Locations</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3179.1617788577346!2d9.708495315739208!3d5.963109895778204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2f35e508c8726d39!2sBamenda%2C%20Cameroon!5e0!3m2!1sen!2sus!4v1631810931628!5m2!1sen!2sus"
              width="100%"
              height="200"
              allowFullScreen=""
              loading="lazy"
              title="Bamenda Location"
              className="rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            ></iframe>
            <p className="mt-2 text-sm text-gray-400">Northwest, Bamenda, Cameroon</p>
          </div>

          {/* Column for Social Media Links */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition duration-200 transform hover:scale-110"
              >
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a
                href="https://www.x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition duration-200 transform hover:scale-110"
              >
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a
                href="https://wa.me/yourwhatsappnumber"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition duration-200 transform hover:scale-110"
              >
                <i className="fab fa-whatsapp text-2xl"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition duration-200 transform hover:scale-110"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={scrollToTop}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200 transform hover:scale-105"
          >
            Scroll to Top
          </button>
        </div>

        <p className="text-sm text-center mt-6">&copy; {new Date().getFullYear()} iSend. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
