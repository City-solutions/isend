// src/components/ContactSection.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-gray-100 to-gray-300">
      {/* Background Animation Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="bg-blue-300 rounded-full w-64 h-64 absolute top-10 left-20 animate-moveShape1 opacity-30"></div>
        <div className="bg-purple-400 rounded-full w-80 h-80 absolute bottom-20 right-10 animate-moveShape2 opacity-40"></div>
        <div className="bg-green-500 rounded-full w-52 h-52 absolute top-1/3 right-1/4 animate-moveShape3 opacity-25"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 text-center" data-aos="fade-left">
          Contact Us
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-xl mx-auto text-center" data-aos="fade-up">
          Get in touch with us for any inquiries, support, or feedback. We’re here to help you.
        </p>

        <div className="flex flex-wrap lg:flex-nowrap gap-12">
          {/* Contact Cards (Left) */}
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            {/* Contact Item 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300" data-aos="fade-right">
              <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 text-4xl mb-4 animate-bounce" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600">contact@company.com</p>
            </div>

            {/* Contact Item 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300" data-aos="fade-right">
              <FontAwesomeIcon icon={faPhone} className="text-green-500 text-4xl mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600">+1 234 567 890</p>
            </div>

            {/* Contact Item 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300" data-aos="fade-right">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 text-4xl mb-4 animate-bounce" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Visit Us</h3>
              <p className="text-gray-600">1234 Address Street, City, Country</p>
            </div>
          </div>

          {/* Contact Form (Right) */}
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
            <form className="space-y-6" data-aos="fade-left">
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-semibold" htmlFor="name">Your Name</label>
                <input type="text" id="name" placeholder="John Doe" className="p-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-semibold" htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="you@example.com" className="p-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-semibold" htmlFor="message">Message</label>
                <textarea id="message" rows="4" placeholder="Your message here..." className="p-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
