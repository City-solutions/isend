import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const InputField = ({ type, placeholder, value, onChange, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full mb-3 p-3 border border-gray-300 rounded-lg text-center focus:outline-none ${className}`}
  />
);

const PaymentModal = ({ open, onClose, method }) => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; // Reset on component unmount
    };
  }, [open]);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('bg-opacity-50')) {
      onClose();
    }
  };

  // Handle form submission for payment (just for demonstration)
  const handlePayment = () => {
    console.log({ phoneNumber, cardNumber, expiryDate, cvv });
    onClose(); // Close the modal after payment (or reset state as necessary)
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-8 rounded-lg w-full max-w-md mx-4 shadow-lg relative">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {t(`payment.${method === 'Mobile Money' ? 'mobileMoney' : 'cardPayment'}`)}
        </h2>

        {/* Form for Mobile Money */}
        {method === 'Mobile Money' && (
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-4 text-center">{t('payment.enterDetails')}</p>
            <InputField
              type="text"
              placeholder={t('payment.phoneNumber')}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="focus:ring-green-500"
            />
            <button
              onClick={handlePayment} // Handle payment action
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
            >
              {t('payment.confirmPayment')}
            </button>
          </div>
        )}

        {/* Form for Card Payment */}
        {method === 'Card' && (
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-4 text-center">{t('payment.enterCardDetails')}</p>
            <InputField
              type="text"
              placeholder={t('payment.cardNumber')}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="focus:ring-blue-500"
            />
            <InputField
              type="text"
              placeholder={t('payment.expiryDate')}
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="focus:ring-blue-500"
            />
            <InputField
              type="text"
              placeholder={t('payment.cvv')}
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="focus:ring-blue-500"
            />
            <button
              onClick={handlePayment} // Handle payment action
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
            >
              {t('payment.confirmCardPayment')}
            </button>
          </div>
        )}

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          {t('common.cancel')}
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
