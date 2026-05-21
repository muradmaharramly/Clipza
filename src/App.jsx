import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Bento from './components/Bento';
import AutomationFlow from './components/AutomationFlow';
import Marquee from './components/Marquee';
import ToolsRing from './components/ToolsRing';
import PreOrderSubscribe from './components/PreOrderSubscribe';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import './styles/Global.scss';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Marquee />
      <Bento />
      <AutomationFlow />
      <CtaSection />
      <ToolsRing />
      <Pricing />
      <PreOrderSubscribe />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
