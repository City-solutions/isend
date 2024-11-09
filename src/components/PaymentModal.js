import React from 'react';

const PaymentModal = ({ open, onClose, method }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md mx-4 shadow-lg relative">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {method} Payment
        </h2>

        {/* Form for Mobile Money */}
        {method === 'Mobile Money' && (
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-4 text-center">Enter your Mobile Money details:</p>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={onClose} // Placeholder for confirmation action
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
            >
              Confirm MoMo Payment
            </button>
          </div>
        )}

        {/* Form for Card Payment */}
        {method === 'Card' && (
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-4 text-center">Enter your card details:</p>
            <input
              type="text"
              placeholder="Card Number"
              className="w-full mb-3 p-3 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              className="w-full mb-3 p-3 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={onClose} // Placeholder for confirmation action
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
            >
              Confirm Card Payment
            </button>
          </div>
        )}

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
