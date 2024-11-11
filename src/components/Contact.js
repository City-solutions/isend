import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { submitContact } from '../services/apiService';
import { useTranslation } from 'react-i18next'; // Import i18n hook

const Contact = () => {
  const { t } = useTranslation(); // Access translation function

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const response = await submitContact(formData);
      if (response.success) {
        setIsSuccess(true);
        setStatus(t('contact.statusSuccess'));
        setFormData({ name: '', email: '', message: '' });
      } else {
        setIsSuccess(false);
        setStatus(t('contact.statusFailure'));
      }
    } catch (error) {
      setIsSuccess(false);
      setStatus(t('contact.statusError'));
    }
    setLoading(false);

    // Show checkmark after submission and hide it after 3 seconds
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 3000); // Check disappears after 3 seconds
  };

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-gray-100 to-gray-300">
      <div className={`absolute inset-0 z-0 overflow-hidden ${loading ? 'blur-sm' : ''}`}>
        <div className="bg-blue-300 rounded-full w-64 h-64 absolute top-10 left-20 animate-moveShape1 opacity-30"></div>
        <div className="bg-purple-400 rounded-full w-80 h-80 absolute bottom-20 right-10 animate-moveShape2 opacity-40"></div>
        <div className="bg-green-500 rounded-full w-52 h-52 absolute top-1/3 right-1/4 animate-moveShape3 opacity-25"></div>
      </div>

      <div className={`container mx-auto relative z-10 ${loading ? 'pointer-events-none' : ''}`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 text-center" data-aos="fade-left">
          {t('contact.title')}
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-xl mx-auto text-center" data-aos="fade-up">
          {t('contact.description')}
        </p>

        <div className="flex flex-wrap lg:flex-nowrap gap-12">
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300" data-aos="fade-right">
              <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 text-4xl mb-4 animate-bounce" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('contact.emailTitle')}</h3>
              <p className="text-gray-600">{t('contact.email')}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300" data-aos="fade-right">
              <FontAwesomeIcon icon={faPhone} className="text-green-500 text-4xl mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('contact.phoneTitle')}</h3>
              <p className="text-gray-600">{t('contact.phone')}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300" data-aos="fade-right">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 text-4xl mb-4 animate-bounce" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('contact.addressTitle')}</h3>
              <p className="text-gray-600">{t('contact.address')}</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
            <form className="space-y-6" data-aos="fade-left" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-semibold" htmlFor="name">{t('contact.name')}</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="John Doe" 
                  className="p-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-semibold" htmlFor="email">{t('contact.emailLabel')}</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="you@example.com" 
                  className="p-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-semibold" htmlFor="message">{t('contact.message')}</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  placeholder="Your message here..." 
                  className="p-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {t('contact.button')}
              </button>
            </form>

            {status && (
              <div className="mt-4 text-center text-lg text-gray-800">
                {isSuccess ? (
                  <div className="flex items-center justify-center space-x-2">
                    {showCheck && <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />}
                    <p>{status}</p>
                  </div>
                ) : (
                  <p className="text-red-500">{status}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
