import React from 'react';
import { FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            <p className={styles.copyright}>&copy; 2026 Clipza LLC</p>
            <div className={styles.divider}></div>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialBtn} aria-label="Twitter"><FaTwitter /></a>
              <a href="#" className={styles.socialBtn} aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="#" className={styles.socialBtn} aria-label="YouTube"><FaYoutube /></a>
              <a href="#" className={styles.socialBtn} aria-label="Instagram"><FaInstagram /></a>
            </div>
            <p className={styles.brandText}>
              The ultimate <strong>AI Video Automation</strong> platform.<br />
              Turn any link into a viral video in <strong>seconds</strong>.
            </p>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Platform</h4>
            <div className={styles.divider}></div>
            <ul className={styles.linkList}>
              <li><a href="#features">Features</a></li>
              <li><a href="#workflow">Workflow</a></li>
              <li><a href="#tools">Tools & Tech</a></li>
              <li><a href="#preorder">Pre-order</a></li>
            </ul>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Company</h4>
            <div className={styles.divider}></div>
            <ul className={styles.linkList}>
              <li><a href="#companies">Ecosystem</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className={styles.massiveLogoWrapper}>
        <h1 className={styles.massiveLogo}>Clipza</h1>
      </div>
    </footer>
  );
};

export default Footer;
