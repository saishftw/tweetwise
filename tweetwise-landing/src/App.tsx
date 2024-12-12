import React from 'react';
import Header from './components/Header';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Installation from './components/Installation';
import Screenshots from './components/Screenshots';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Features />
      <HowItWorks />
      <Installation />
      <Screenshots />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;