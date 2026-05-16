import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Clip<span>za</span>
        </div>
        <p>&copy; 2026 Clipza AI. All rights reserved.</p>
        <div className={styles.legal}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
