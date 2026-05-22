import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiMenu, FiX, FiSun, FiMoon, FiChevronDown } from 'react-icons/fi';
import styles from './Navbar.module.scss';
import MagneticButton from './MagneticButton';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Workflow', href: '#workflow' },
   {
    name: 'Ecosystem',
    dropdown: [
      { name: 'Tools & Technologies', href: '#tools' },
      { name: 'Companies', href: '#companies' },
      { name: 'FAQ', href: '#faq' }
    ]
  },
  { name: 'Pricing', href: '#pricing' },
  
  { name: 'Pre-order', href: '#preorder', special: 'redBtn' }
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('Home');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPosition = window.scrollY + 150; // added buffer
      
      const flatLinks = navLinks.flatMap(l => l.dropdown ? l.dropdown : [l]).filter(l => l.href);
      
      const sections = flatLinks.map(link => {
        const element = document.querySelector(link.href);
        return {
          name: link.name,
          offsetTop: element ? element.offsetTop : -1
        };
      }).filter(s => s.offsetTop !== -1);
      
      sections.sort((a, b) => b.offsetTop - a.offsetTop);
      
      // If at the very bottom of the page, set to the last section
      const isBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;
      if (isBottom && sections.length > 0) {
        setActiveSection(sections[0].name);
        return;
      }
      
      for (const section of sections) {
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(section.name);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleLinkClick = (e, link) => {
    if (link.dropdown) {
      e.preventDefault();
      setDropdownOpen(!dropdownOpen);
      return;
    }
    
    e.preventDefault();
    setActiveSection(link.name);
    setIsMobileMenuOpen(false);
    setDropdownOpen(false);
    
    if (link.href) {
      const element = document.querySelector(link.href);
      if (element) {
        isScrollingRef.current = true;
        clearTimeout(scrollTimeoutRef.current);
        
        const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });

        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      }
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
            {navLinks.map((link) => {
              if (link.dropdown) {
                const isActive = activeSection === link.name || link.dropdown.some(sl => sl.name === activeSection);
                return (
                  <div key={link.name} className={styles.dropdownContainer} ref={dropdownRef}>
                    <div
                      className={`${styles.navLink} ${isActive ? styles.activeText : ''}`}
                      onClick={(e) => handleLinkClick(e, link)}
                    >
                      <span className={styles.navLinkText}>{link.name}</span>
                      <FiChevronDown className={`${styles.chevron} ${dropdownOpen ? styles.open : ''}`} />
                      {isActive && (
                        <motion.div 
                          layoutId="activePill" 
                          className={styles.activePill} 
                          transition={{ type: "spring", stiffness: 300, damping: 30 }} 
                        />
                      )}
                    </div>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div 
                          className={styles.dropdownMenu}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.dropdown.map(sublink => (
                            <a 
                              key={sublink.name} 
                              href={sublink.href} 
                              className={styles.dropdownItem}
                              onClick={(e) => { e.stopPropagation(); handleLinkClick(e, sublink); }}
                            >
                              {sublink.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              
              const isSpecial = link.special === 'redBtn';
              const isActive = activeSection === link.name;
              
              return (
                <a 
                  key={link.name}
                  href={link.href}
                  className={`${styles.navLink} ${isSpecial ? styles.redBtn : ''} ${isActive && !isSpecial ? styles.activeText : ''} ${isActive && isSpecial ? styles.redActiveText : ''}`}
                  onClick={(e) => handleLinkClick(e, link)}
                >
                  <span className={styles.navLinkText}>
                    {isSpecial ? <span className={styles.redBtnText}>{link.name}</span> : link.name}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="activePill" 
                      className={`${styles.activePill} ${isSpecial ? styles.redPill : ''}`} 
                      transition={{ type: "spring", stiffness: 300, damping: 30 }} 
                    />
                  )}
                </a>
              );
            })}
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
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.name} className={styles.mobileDropdownContainer}>
                  <div 
                    className={styles.mobileDropdownTitle}
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  >
                    {link.name} <FiChevronDown className={`${styles.chevron} ${mobileDropdownOpen ? styles.open : ''}`} />
                  </div>
                  <AnimatePresence>
                    {mobileDropdownOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={styles.mobileDropdownItems}
                      >
                        {link.dropdown.map(sublink => (
                          <a 
                            key={sublink.name}
                            href={sublink.href}
                            className={activeSection === sublink.name ? styles.active : ''}
                            onClick={(e) => handleLinkClick(e, sublink)}
                          >
                            {sublink.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <a 
                key={link.name}
                href={link.href}
                className={`${activeSection === link.name ? styles.active : ''} ${link.special ? styles.redText : ''}`}
                onClick={(e) => handleLinkClick(e, link)}
              >
                {link.name}
              </a>
            );
          })}
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
