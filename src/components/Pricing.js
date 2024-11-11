import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faClipboardCheck, faTruck } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next'; 
import 'aos/dist/aos.css'; 

const Pricing = () => {
  const { t } = useTranslation(); 

  return (
    <section
      id="pricing"
      className="relative py-20 bg-gradient-to-r from-gray-200 to-gray-300 overflow-hidden"
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="bg-blue-300 rounded-full w-64 h-64 absolute top-0 left-10 animate-shape1 opacity-30"></div>
        <div className="bg-blue-400 rounded-full w-48 h-48 absolute top-10 right-10 animate-shape2 opacity-40"></div>
        <div className="bg-blue-500 rounded-full w-72 h-72 absolute bottom-20 left-20 animate-shape3 opacity-30"></div>
        <div className="bg-blue-600 rounded-full w-56 h-56 absolute bottom-10 right-20 animate-shape4 opacity-20"></div>
        <div className="bg-blue-500 rounded-full w-80 h-80 absolute top-1/2 left-1/4 animate-shape5 opacity-25"></div>
        <div className="bg-blue-400 rounded-full w-52 h-52 absolute top-1/4 right-1/4 animate-shape6 opacity-30"></div>
        <div className="bg-blue-300 rounded-full w-36 h-36 absolute bottom-1/4 left-1/4 animate-shape7 opacity-40"></div>
        <div className="bg-blue-600 rounded-full w-40 h-40 absolute top-1/4 left-1/2 animate-shape8 opacity-25"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800" data-aos="fade-right">
          {t('pricing.title')}
        </h2>
        <div className="pricing-options grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Per Delivery Plan */}
          <div
            className="price-option p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <FontAwesomeIcon icon={faDollarSign} className="text-green-500 text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-700">{t('pricing.perDelivery.title')}</h3>
            <p className="text-gray-600">{t('pricing.perDelivery.description')}</p>
            <a
              href="#request-form"
              className="cta-button bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200 mt-4 inline-block"
            >
              {t('pricing.perDelivery.cta')}
            </a>
          </div>
          {/* Monthly Subscription Plan */}
          <div
            className="price-option p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <FontAwesomeIcon icon={faClipboardCheck} className="text-orange-500 text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-700">{t('pricing.monthlySubscription.title')}</h3>
            <p className="text-gray-600">{t('pricing.monthlySubscription.description')}</p>
            <a
              href="#request-form"
              className="cta-button bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200 mt-4 inline-block"
            >
              {t('pricing.monthlySubscription.cta')}
            </a>
          </div>
          {/* Premium Package Plan */}
          <div
            className="price-option p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <FontAwesomeIcon icon={faTruck} className="text-blue-500 text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-700">{t('pricing.premiumPackage.title')}</h3>
            <p className="text-gray-600">{t('pricing.premiumPackage.description')}</p>
            <a
              href="#request-form"
              className="cta-button bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200 mt-4 inline-block"
            >
              {t('pricing.premiumPackage.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
