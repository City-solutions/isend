import React from 'react';

const PaymentButton = ({ imageSrc, text, onClick, bgColor }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center ${bgColor} text-white py-4 px-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 w-75`} 
    data-aos="zoom-in"
  >
    <img
      src={imageSrc}
      alt={text}
      className="w-12 h-12 mr-2 rounded-full object-cover border-2 border-white"
    />
    <span className="text-lg">{text}</span>
  </button>
);

export default PaymentButton;