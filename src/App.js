import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RequestForm from './components/RequestForm';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Aos from 'aos';
import Contact from './components/Contact';

Aos.init({
  duration: 1200, // Animation duration in milliseconds
  once: true, // Whether animation should happen only once - while scrolling down
});
function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <RequestForm />
      <HowItWorks />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
