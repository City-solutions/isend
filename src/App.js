import React, { createContext, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RequestForm from './components/RequestForm';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Aos from 'aos';
import Contact from './components/Contact';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SuccessScreen from './components/SuccessScreen';

// Initialize AOS (Animate On Scroll)
Aos.init({
  duration: 1200,
  once: true,
});

// Create a Context for managing application state
export const AppContext = createContext();

function App() {
  const [data, setData] = useState(null); // State to hold data (e.g., price)

  return (
    <AppContext.Provider value={{ data, setData }}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            {/* Success page - Only Header, SuccessScreen, and Footer */}
            <Route
              path="/success"
              element={
                <div className="App">
                  <Header />
                  <SuccessScreen />
                  <Footer />
                </div>
              }
            />


            {/* Main pages - Hero, RequestForm, HowItWorks, Pricing, Contact, Footer */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <RequestForm />
                  <HowItWorks />
                  <Pricing />
                  <Contact />
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;