import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import Aos from 'aos';
import 'aos/dist/aos.css';
import PaymentModal from './PaymentModal';
import PaymentButton from './PaymentButton';
import MoMoImage from '../assets/images/momo-image.jpg';
import CardImage from '../assets/images/card-image.jpeg';

Aos.init({
  duration: 1200,
  once: true,
});

const SuccessScreen = () => {
  const { data } = useContext(AppContext);
  
  // Extracting relevant data
  const price = data?.data?.data?.cost;
  const itemName = data?.data?.data?.name; // Assuming you have an item name
  const fromAddress = data?.data?.data?.from_address;
  const toAddress = data?.data?.data?.to_address;
  const recipientName = data?.data?.data?.recipient_name;

  const [isMoMoModalOpen, setMoMoModalOpen] = useState(false);
  const [isCardModalOpen, setCardModalOpen] = useState(false);

  return (
    <div className="relative py-20 bg-gradient-to-r from-blue-200 to-blue-400 overflow-hidden">
      {/* Main Content */}
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4 text-gray-800" data-aos="fade-right">
          Request Submitted Successfully!
        </h1>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-[400px] max-w-[700px] mx-auto table-auto border-collapse border-2 border-blue-600 rounded-md shadow-md">
            <thead>
              <tr>
                <th className="py-3 px-4 text-lg font-semibold text-gray-700 text-left border-b-2 border-blue-600">Details</th>
                <th className="py-3 px-4 text-lg font-semibold text-gray-700 text-left border-b-2 border-blue-600">Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 text-gray-700 border-b border-blue-600">Item</td>
                <td className="py-2 px-4 text-blue-600 font-semibold border-b border-blue-600">{itemName}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-gray-700 border-b border-blue-600">Amount</td>
                <td className="py-2 px-4 text-blue-600 font-semibold border-b border-blue-600">FCFA {price}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-gray-700 border-b border-blue-600">From</td>
                <td className="py-2 px-4 text-gray-800 border-b border-blue-600">{fromAddress}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-gray-700 border-b border-blue-600">To</td>
                <td className="py-2 px-4 text-gray-800 border-b border-blue-600">{toAddress}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-gray-700 border-b border-blue-600">Recipient</td>
                <td className="py-2 px-4 text-gray-800 border-b border-blue-600">{recipientName}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-gray-700 border-b border-blue-600">Total Cost</td>
                <td className="py-2 px-4 text-blue-600 font-semibold border-b border-blue-600">FCFA {price}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-md mb-8 text-gray-600">Choose a payment method:</p>

        {/* Centered Button Layout */}
        <div className="flex justify-center gap-x-4 gap-y-4 flex-wrap">
          <PaymentButton
            imageSrc={MoMoImage}
            text="Mobile Money"
            onClick={() => setMoMoModalOpen(true)}
            bgColor="bg-blue-500"
          />
          <PaymentButton
            imageSrc={CardImage}
            text="Credit Card"
            onClick={() => setCardModalOpen(true)}
            bgColor="bg-blue-700"
          />
        </div>

        {/* Modals for Payment Options */}
        <PaymentModal
          open={isMoMoModalOpen}
          onClose={() => setMoMoModalOpen(false)}
          method="Mobile Money"
        />
        <PaymentModal
          open={isCardModalOpen}
          onClose={() => setCardModalOpen(false)}
          method="Card"
        />
      </div>
    </div>
  );
};

export default SuccessScreen;
