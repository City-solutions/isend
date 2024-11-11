import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import RequestForm from './components/RequestForm';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import SuccessScreen from './components/SuccessScreen';
import Tracking from './components/Tracking';
import NotFound from './components/NotFound';  // Importing custom 404 page
import './i18n'

export const AppContext = createContext();

function PageLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <AppContext.Provider value={{ data, setData }}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <PageLayout>
                  <Hero />
                  <RequestForm />
                  <HowItWorks />
                  <Pricing />
                  <Contact />
                </PageLayout>
              }
            />

            <Route
              path="/make-request"
              element={
                <PageLayout>
                  <RequestForm />
                </PageLayout>
              }
            />
            <Route
              path="/success"
              element={
                <PageLayout>
                  <SuccessScreen />
                </PageLayout>
              }
            />
            <Route
              path="/track"
              element={
                <PageLayout>
                  <Tracking />
                </PageLayout>
              }
            />
            <Route
              path="/how-it-works"
              element={
                <PageLayout>
                  <HowItWorks />
                </PageLayout>
              }
            />
            <Route
              path="/pricing"
              element={
                <PageLayout>
                  <Pricing />
                </PageLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PageLayout>
                  <Contact />
                </PageLayout>
              }
            />
            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
