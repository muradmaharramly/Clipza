import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import styles from './Navbar.module.scss';
import MagneticButton from './MagneticButton';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
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
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
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
