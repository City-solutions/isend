import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';

const browserLanguage = navigator.language || navigator.userLanguage; 
const language = browserLanguage.includes('fr') ? 'fr' : 'en'; 

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: language, 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
