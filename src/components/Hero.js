import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const [displayText, setDisplayText] = useState('');
  const fullText = t('hero.heading');
  const typingSpeed = 100; // Speed of typing effect in milliseconds

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (displayText.length < fullText.length) {
        setDisplayText(prev => prev + fullText[displayText.length]);
      } else {
        clearInterval(typingEffect);
      }
    }, typingSpeed);

    return () => clearInterval(typingEffect);
  }, [displayText, fullText]);

  return (
    <section className="hero bg-gradient-to-r from-blue-500 to-blue-900 text-white py-20 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center z-10" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInOut">
          {displayText}
        </h2>
        <p className="text-lg md:text-xl mb-6">
          {t('hero.description')}
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a
            href="#request-form"
            className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105"
          >
            {t('hero.getStarted')}
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.citysolution.isend&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-900 py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            <i className="fab fa-google-play text-xl"></i>
            <span className="text-sm">{t('hero.getApp')}</span>
          </a>
          <a
            href="/track"
            className="bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-800 transition duration-300 transform hover:scale-105"
          >
            {t('hero.trackProgress')}
          </a>
        </div>
      </div>

      <div className="absolute inset-0 z-0 bg-blue-800 opacity-30 rounded-lg transform scale-110 animate-pulse"></div>

      <div className="hidden md:block absolute right-0 bottom-0 w-1/4 h-1/4 bg-blue-600 rounded-full opacity-30 animate-spin"></div>
      <div className="hidden md:block absolute left-0 top-0 w-1/5 h-1/5 bg-blue-500 rounded-full opacity-20 animate-swing"></div>
      <div className="hidden md:block absolute top-1/4 left-1/4 w-1/6 h-1/6 bg-blue-700 rounded-full opacity-25 animate-pulse"></div>
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-blue-800 rounded-full opacity-15 animate-float"></div>
      <div className="hidden md:block absolute top-1/2 left-0 w-1/8 h-1/8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-300"></div>
      <div className="hidden md:block absolute top-0 right-1/4 w-1/4 h-1/4 bg-blue-500 rounded-full opacity-10 animate-flip delay-100"></div>
      <div className="hidden md:block absolute bottom-0 left-1/4 w-1/6 h-1/6 bg-blue-400 rounded-full opacity-25 animate-shake delay-400"></div>

      <div className="block md:hidden absolute right-0 bottom-0 w-1/4 h-1/4 bg-blue-600 rounded-full opacity-30 animate-spin"></div>
      <div className="block md:hidden absolute left-0 top-0 w-1/5 h-1/5 bg-blue-500 rounded-full opacity-20 animate-swing"></div>
      <div className="block md:hidden absolute top-1/4 left-1/4 w-1/6 h-1/6 bg-blue-700 rounded-full opacity-25 animate-pulse"></div>
    </section>
  );
};

export default Hero;
