import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiArrowRight } from 'react-icons/fi';
import styles from './CtaSection.module.scss';

export default function CtaSection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.card}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.backgroundEffects}>
            <div className={styles.orb1} />
            <div className={styles.orb2} />
          </div>
          
          <div className={styles.content}>
            <div className={styles.badge}>
              <span>Ready to Start?</span>
            </div>
            <h2>Automate Your Video Production Today</h2>
            <p>
              Stop spending hours editing videos. Let Clipza's AI handle the script, visuals, voiceover, and distribution in seconds.
            </p>
            <div className={styles.actions}>
              <button className={`primaryBtn ${styles.btn}`}>
                <span className="btn-text">Get Started Free</span>
                <div className="btn-icon-wrapper"><FiArrowRight /></div>
              </button>
              <button className={`secondaryBtn ${styles.btn}`}>
                <span className="btn-text">View Examples</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
