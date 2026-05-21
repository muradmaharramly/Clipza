import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import styles from './PreOrderSubscribe.module.scss';
import { HiOutlinePlusSm } from 'react-icons/hi';

export default function PreOrderSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [selectedPlan, setSelectedPlan] = useState('Starter');

  const [dropdownOpen, setDropdownOpen] = useState(false);
const plans = ['Starter', 'Creator', 'Elit', 'Powerhouse', 'Custom'];
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
              <div className={styles.rightBoxGlow} />
              <div className={styles.rightBoxContent}>
                <h3>Select your plan</h3>
                {/* Plan description and pricing based on selectedPlan */}
                <p className={styles.planInfo}>
                  {selectedPlan === 'Starter' && 'Basic features for individuals. $9/mo'}
                  {selectedPlan === 'Creator' && 'Extended features for creators. $19/mo'}
                  {selectedPlan === 'Pro' && 'Professional suite for teams. $49/mo'}
                  {selectedPlan === 'Agency' && 'All‑in‑one solution for agencies. $99/mo'}
                </p>
                {/* Email input */}
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
                  {/* Dropdown and Submit button on same line */}
                  <div className={styles.dropdownSubmitRow}>
                    <div className={styles.customDropdown} onClick={() => setDropdownOpen(!dropdownOpen)}>
                      <button type="button" className={styles.dropdownButton}>
                        {selectedPlan}
                        <span className={styles.dropdownArrow}>▾</span>
                      </button>
                      {dropdownOpen && (
                        <div className={styles.dropdownList}>
                          {plans.map(plan => (
                            <div
                              key={plan}
                              className={styles.dropdownItem}
                              onClick={() => { setSelectedPlan(plan); setDropdownOpen(false); }}
                            >
                              {plan}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className={`primaryBtn ${styles.submitBtn} ${status !== 'idle' ? styles.loading : ''}`}
                      disabled={status !== 'idle'}
                    >
                      {status === 'idle' && (
                        <>
                          <span className="btn-text">Subscribe Now</span>
                          <div className="btn-icon-wrapper"><FiArrowRight /></div>
                        </>
                      )}
                      {status === 'loading' && <span className="btn-text">Processing...</span>}
                      {status === 'success' && (
                        <span className={styles.successText}>
                          <FiCheckCircle /> Subscribed
                        </span>
                      )}
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
