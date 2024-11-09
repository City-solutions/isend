import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import html2canvas from 'html2canvas';
import PaymentModal from './PaymentModal';
import PaymentButton from './PaymentButton';
import MoMoImage from '../assets/images/momo-image.jpg';
import CardImage from '../assets/images/card-image.jpeg';
import Logo from '../assets/images/isend.png';  // Sample logo file

const SuccessScreen = () => {
  const { data } = useContext(AppContext);

  const price = data?.data?.data?.cost;
  const itemName = data?.data?.data?.item_name;
  const deliveryCode = data?.data?.data?.delivery_code;
  const fromAddress = data?.data?.data?.from_address;
  const toAddress = data?.data?.data?.to_address;
  const recipientName = data?.data?.data?.recipient_name;

  const [isMoMoModalOpen, setMoMoModalOpen] = useState(false);
  const [isCardModalOpen, setCardModalOpen] = useState(false);

  // Function to download table as image
  const handleDownload = () => {
    const printContent = document.getElementById('printable-table');
    
    html2canvas(printContent).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Create a link and set it to download the image
      const downloadLink = document.createElement('a');
      downloadLink.href = imgData;
      downloadLink.download = 'receipt.png';
      downloadLink.click();
    });
  };

  return (
    <div className="relative py-20 bg-gradient-to-r from-blue-200 to-blue-400 overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4 text-gray-800">
          Request Submitted Successfully!
        </h1>

        {/* Conditional message for the user */}
        { !deliveryCode && (
          <p className="text-md text-red-600 font-semibold mb-4">
            Note: Your delivery code is still processing. Check back later.
          </p>
        )}

        {/* Table displaying transaction details */}
        <div className="overflow-x-auto mb-8">
          <table className="min-w-[400px] max-w-[700px] mx-auto table-auto border-collapse border-2 border-blue-600 rounded-md shadow-md" id="printable-table">
            <thead>
              {/* Logo, Service Name, and Description */}
              <tr>
              <th colSpan="2" className="py-2 px-4 text-md text-gray-700 bg-blue-50 border-b-2 border-blue-600 mb-2">
                  <img src={Logo} alt="ISendXpress Logo" className="h-12 w-12 text-center mx-auto mb-2" />
                  <span className="text-3xl font-bold text-blue-800 mb-2">ISendXpress</span>
                </th>
              </tr>
              <tr>
                <th colSpan="2" className="py-2 px-4 text-md text-gray-700 bg-blue-50 border-b-2 border-blue-600 o mb-2" style={{ marginBottom: '10px', textAlign: 'center' }}>
                  Fast, reliable, and secure delivery service.
                </th>
              </tr>
              {/* Column Headers */}
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
                <td className="py-2 px-4 text-gray-700 border-b border-blue-600">Delivery Code</td>
                <td className="py-2 px-4 text-blue-600 font-semibold border-b border-blue-600">{deliveryCode || "Processing"}</td>
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

        {/* Payment method buttons */}
        <p className="text-md mb-8 text-gray-600">Choose a payment method:</p>
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

        {/* Download button */}
        <div className="mt-6">
          <button 
            onClick={handleDownload}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
