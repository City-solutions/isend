import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendPaymentRequest, checkPaymentStatus } from '../services/paymentService';

const InputField = ({ type, placeholder, value, onChange, readOnly, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    readOnly={readOnly}
    className={`w-full mb-3 p-3 border border-gray-300 rounded-lg text-center focus:outline-none ${className}`}
  />
);

const PaymentModal = ({ open, onClose, requestId, amount = 10 }) => {
  const { t } = useTranslation();
  const [mobileWalletNumber, setMobileWalletNumber] = useState('');
  const [name, setName] = useState('');
  const [carrier, setCarrier] = useState('MTN_MOMO');
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('bg-opacity-50')) {
      onClose();
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setStatus('');

    const payload = {
      amount,
      mobileWalletNumber,
      name,
      requestId,
      carrier,
      currencyCode: 'XAF',
      description: 'payment',
    };

    try {
      const result = await sendPaymentRequest(payload);
      setPolling(true);
      setTimeout(() => pollPaymentStatus(requestId), 30000);
    } catch (error) {
      console.error('Payment Request Failed:', error);
      alert(t('payment.error'));
    } finally {
      setLoading(false);
    }
  };

  const pollPaymentStatus = async (requestId) => {
    try {
      const result = await checkPaymentStatus({ requestId });
      const paymentStatus = result.data?.status || 'UNKNOWN';
      setStatus(paymentStatus);

      if (paymentStatus === 'SUCCESSFUL') {
        alert(t('payment.success'));
        onClose();
      } else {
        setTimeout(() => pollPaymentStatus(requestId), 30000); // Retry polling every 30 seconds
      }
    } catch (error) {
      console.error('Payment Status Check Failed:', error);
      alert(t('payment.statusError'));
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-8 rounded-lg w-full max-w-md mx-4 shadow-lg relative">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{t('payment.mobileMoney')}</h2>

        <div className="flex flex-col items-center">
          <InputField
            type="text"
            placeholder={t('payment.amount')}
            value={`FCFA ${amount}`}
            readOnly
            className="bg-gray-100 focus:ring-gray-300"
          />

          <InputField
            type="text"
            placeholder={t('payment.name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputField
            type="text"
            placeholder={t('payment.mobileWalletNumber')}
            value={mobileWalletNumber}
            onChange={(e) => setMobileWalletNumber(e.target.value)}
          />

          <select
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
            className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none text-center"
          >
            <option value="MTN_MOMO">MTN MOMO</option>
            <option value="ORANGE_MOMO">ORANGE MOMO</option>
          </select>

          <button
            onClick={handlePayment}
            disabled={loading || polling}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200 disabled:opacity-50"
          >
            {loading || polling ? t('common.loading') : t('payment.confirmPayment')}
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          {t('common.cancel')}
        </button>
      </div>

      {/* Full-screen Loading Overlay */}
      {(polling || loading) && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50 mb-4"></div>
            <p className="text-lg font-semibold">{t('payment.pollingMessage')}</p>
            <p className="mt-2">{t('payment.dialMessage')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentModal;
