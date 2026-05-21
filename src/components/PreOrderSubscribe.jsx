import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import styles from './PreOrderSubscribe.module.scss';

export default function PreOrderSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section className={styles.preOrderSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.card}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.glow} />
          <div className={styles.content}>
            <h2>Be the First to Access Clipza</h2>
            <p>
              Pre-order now to secure your early access and get an exclusive 50% lifetime discount on our pro plans. 
              Join thousands of creators waiting for the launch.
            </p>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputWrapper}>
                <FiMail className={styles.icon} />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status !== 'idle'}
                  required
                />
              </div>
              <button 
                type="submit" 
                className={`primaryBtn ${styles.submitBtn} ${status !== 'idle' ? styles.loading : ''}`}
                disabled={status !== 'idle'}
              >
                {status === 'idle' && <span className="btn-text">Subscribe Now</span>}
                {status === 'loading' && <span className="btn-text">Processing...</span>}
                {status === 'success' && (
                  <span className={styles.successText}>
                    <FiCheckCircle /> Subscribed
                  </span>
                )}
              </button>
            </form>
            <p className={styles.disclaimer}>No spam, unsubscribe anytime. Early access invites roll out soon.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
