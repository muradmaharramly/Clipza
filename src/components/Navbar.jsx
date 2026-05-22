import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import styles from './Navbar.module.scss';
import MagneticButton from './MagneticButton';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Workflow', href: '#workflow' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('Home');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // offset for navbar
      
      for (const link of navLinks.reverse()) {
        const section = document.querySelector(link.href);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(link.name);
          navLinks.reverse(); // restore order
          return;
        }
      }
      navLinks.reverse();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    setActiveSection(link.name);
    setIsMobileMenuOpen(false);
    const element = document.querySelector(link.href);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={styles.navbarWrapper}>
        <div className={styles.pillContainer}>
          <motion.div 
            className={styles.logo}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            Clip<span>za</span>
          </motion.div>
          
          <motion.div 
            className={styles.links}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          >
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className={activeSection === link.name ? styles.active : ''}
                onClick={(e) => handleLinkClick(e, link)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
          
          <motion.div
            className={styles.navActions}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          >
            <button className={styles.themeToggle} onClick={toggleTheme}>
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
            <div className={styles.desktopOnly}>
              <MagneticButton className={styles.btnStarted} icon={<FiArrowRight />}>
                Get Started
              </MagneticButton>
            </div>
            <button 
              className={styles.mobileMenuBtn} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileLinks}>
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className={activeSection === link.name ? styles.active : ''}
              onClick={(e) => handleLinkClick(e, link)}
            >
              {link.name}
            </a>
          ))}
          <div className={styles.mobileActions}>
             <MagneticButton className={styles.btnStarted} icon={<FiArrowRight />}>
               Get Started
             </MagneticButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
