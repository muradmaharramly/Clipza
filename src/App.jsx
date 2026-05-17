import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Bento from './components/Bento';
import AutomationFlow from './components/AutomationFlow';
import Marquee from './components/Marquee';
import ToolsRing from './components/ToolsRing';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
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
      <ToolsRing />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
