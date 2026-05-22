import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import styles from './PreOrderSubscribe.module.scss';
import { HiOutlinePlusSm } from 'react-icons/hi';
import redMailImage from '../assets/red-mail.png';
import { BsThreeDots } from 'react-icons/bs';

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
          className={styles.layoutWrapper}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.glow} />
          <div className={styles.splitLayout}>
            <div className={styles.leftContent}>
              <h2>Secure Your Early Access</h2>
              <p>
                Join the waitlist to secure your spot and lock in an exclusive <span className={styles.highlighted}>20%</span> lifetime discount on our premium plans.
              </p>
              <p className={styles.secondaryText}>No spam, just updates on our launch.</p>
            </div>
            
            <div className={styles.rightBox}>
              <div className={styles.topSection}>
                <div className={styles.glowEffectLeft} />
                <div className={styles.glowEffectRight} />
                <div className={styles.iconWrapper}>
                  <img src={redMailImage} alt="Mail" className={styles.mailImage} />
                </div>
              </div>
              <div className={styles.bottomSection}>
                <h3>Subscribe!</h3>
                <p className={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                </p>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.inputSubmitRow}>
                    <div className={styles.inputWrapper}>
                      <FiMail className={styles.icon} />
                      <input
                        type="email"
                        placeholder="Enter email address"
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
                      {status === 'idle' && <span className="btn-text">Send email</span>}
                      {status === 'loading' && <span className="btn-text">Sending</span>}
                      {status === 'success' && <span className="btn-text">Subscribed</span>}
                      <div className="btn-icon-wrapper">{status === 'idle' && <FiArrowRight />}
                      {status === 'loading' && <BsThreeDots />}
                      {status === 'success' && <FiCheckCircle />}</div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
