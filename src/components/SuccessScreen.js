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
  console.log(data?.data?.data?.cost);
  const price = data?.data?.data?.cost;

  const [isMoMoModalOpen, setMoMoModalOpen] = useState(false);
  const [isCardModalOpen, setCardModalOpen] = useState(false);

  // Function to handle hover effects
  const handleHover = (e) => {
    e.target.classList.toggle('hover:scale-110');
    e.target.classList.toggle('transition-transform');
  };

  return (
    <div className="relative py-20 bg-gradient-to-r from-gray-200 to-gray-300 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="bg-blue-300 rounded-full w-64 h-64 md:w-48 md:h-48 sm:w-32 sm:h-32 absolute top-10 left-10 animate-pulse opacity-30" onMouseEnter={handleHover} onMouseLeave={handleHover}></div>
        <div className="bg-blue-400 rounded-full w-48 h-48 md:w-36 md:h-36 sm:w-24 sm:h-24 absolute top-20 right-20 animate-pulse opacity-40" onMouseEnter={handleHover} onMouseLeave={handleHover}></div>
        <div className="bg-blue-500 rounded-full w-56 h-56 md:w-40 md:h-40 sm:w-28 sm:h-28 absolute bottom-10 left-20 animate-pulse opacity-50" onMouseEnter={handleHover} onMouseLeave={handleHover}></div>
        <div className="bg-blue-600 rounded-full w-40 h-40 md:w-32 md:h-32 sm:w-20 sm:h-20 absolute bottom-20 right-10 animate-pulse opacity-50" onMouseEnter={handleHover} onMouseLeave={handleHover}></div>
        <div className="bg-blue-700 rounded-full w-32 h-32 md:w-24 md:h-24 sm:w-[15%] sm:h-[15%] absolute top-[35%] left-[30%] animate-pulse opacity-50" onMouseEnter={handleHover} onMouseLeave={handleHover}></div>
        <div className="bg-blue-800 rounded-full w-36 h-36 md:w-[30%] md:h-[30%] sm:w-[20%] sm:h-[20%] absolute top-[60%] right-[25%] animate-pulse opacity-50" onMouseEnter={handleHover} onMouseLeave={handleHover}></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4 text-gray-800" data-aos="fade-right">
          Request Submitted Successfully!
        </h1>
        <p className="text-lg mb-4 text-gray-700">
          Your estimated price is:
          <span className="font-semibold text-green-500 text-2xl border-b-2 border-green-500 transition duration-300 hover:text-green-600">
            FCFA {price}
          </span>
        </p>
        <p className="text-md mb-8 text-gray-600">Choose a payment method:</p>

        {/* Centered Button Layout */}
        <div className="flex justify-center gap-x-4 gap-y-4 flex-wrap">
          <PaymentButton
            imageSrc={MoMoImage}
            text="Mobile Money"
            onClick={() => setMoMoModalOpen(true)}
            bgColor="bg-green-500"
          />
          <PaymentButton
            imageSrc={CardImage}
            text="Credit Card"
            onClick={() => setCardModalOpen(true)}
            bgColor="bg-blue-500"
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