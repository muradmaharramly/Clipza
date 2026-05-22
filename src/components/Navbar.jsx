import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import styles from './Navbar.module.scss';
import MagneticButton from './MagneticButton';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('Home');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
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
              onClick={() => setActiveSection(link.name)}
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
          <MagneticButton className={styles.btnStarted} icon={<FiArrowRight />}>
            Get Started
          </MagneticButton>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
