import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faMapMarkerAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <section
      id="how-it-works"
      className="relative py-20 bg-gradient-to-r from-gray-200 to-gray-300 w-full overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="bg-blue-300 rounded-full w-64 h-64 absolute top-10 left-20 animate-moveShape1 opacity-30"></div>
        <div className="bg-blue-400 rounded-full w-80 h-80 absolute bottom-20 right-10 animate-moveShape2 opacity-40"></div>
        <div className="bg-blue-500 rounded-full w-52 h-52 absolute top-1/3 right-1/3 animate-moveShape3 opacity-25"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800" data-aos="fade-left">
          {t('howItWorks.title')}
        </h2>
        <div className="steps grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="step p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-72 flex flex-col items-center justify-center transform hover:scale-105"
            data-aos="fade-up"
          >
            <FontAwesomeIcon icon={faBoxOpen} className="text-green-500 text-5xl mb-4 animate-bounce" />
            <h3 className="text-xl font-semibold mb-2 text-gray-700">{t('howItWorks.step1.title')}</h3>
            <p className="text-gray-600">{t('howItWorks.step1.description')}</p>
          </div>
          <div
            className="step p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-72 flex flex-col items-center justify-center transform hover:scale-105"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-orange-500 text-5xl mb-4 animate-spin" />
            <h3 className="text-xl font-semibold mb-2 text-gray-700">{t('howItWorks.step2.title')}</h3>
            <p className="text-gray-600">{t('howItWorks.step2.description')}</p>
          </div>
          <div
            className="step p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-72 flex flex-col items-center justify-center transform hover:scale-105"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 text-5xl mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold mb-2 text-gray-700">{t('howItWorks.step3.title')}</h3>
            <p className="text-gray-600">{t('howItWorks.step3.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
