import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import styles from './Pricing.module.scss';
import MagneticButton from './MagneticButton';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [calcVideos, setCalcVideos] = useState(100);
  const [calcAPI, setCalcAPI] = useState(10);

  const plans = [
    { name: "Starter", sub: "For side hustlers", price: billingCycle === 'monthly' ? 10 : 8, features: ["Standard Tools", "No API access"] },
    { name: "Creator", sub: "For growing channels", price: billingCycle === 'monthly' ? 30 : 24, features: ["15 Videos / mo", "API Access"] },
    { 
      name: "Elite", 
      sub: "Best for scaling",
      price: billingCycle === 'monthly' ? 59 : 47, 
      features: ["30 Videos / mo", "Priority AI", "Niche Adviser"], 
      highlighted: true 
    },
    { name: "Powerhouse", sub: "Unlimited growth", price: billingCycle === 'monthly' ? 99 : 79, features: ["60 Videos / mo", "24/7 Support", "Niche Adviser"] }
  ];

  const estimatedPrice = Math.floor((calcVideos * 1.5) + (calcAPI * 20));

  const springConfig = { type: "spring", stiffness: 100, damping: 20 };

  return (
    <section className={styles.pricingSection} id="pricing">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springConfig}
        >
          <h2 className="text-gradient">Premium Scaling</h2>
          <p>Investment for your content empire.</p>

          <div className={styles.toggleContainer}>
            <span className={billingCycle === 'monthly' ? styles.active : ''}>Monthly</span>
            <div 
              className={styles.toggle} 
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
            >
              <motion.div 
                className={styles.toggleBall}
                animate={{ x: billingCycle === 'monthly' ? 2 : 26 }}
                transition={springConfig}
              />
            </div>
            <span className={billingCycle === 'yearly' ? styles.active : ''}>Yearly <small>(-20%)</small></span>
          </div>
        </motion.div>

        <div className={styles.grid}>
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`${styles.card} ${plan.highlighted ? styles.highlighted : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springConfig, delay: index * 0.05 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.cardHeader}>
                {plan.highlighted && <div className={styles.badge}>Most Popular</div>}
                <h3>{plan.name}</h3>
                <p className={styles.planSub}>{plan.sub}</p>
                <div className={styles.price}>
                  <span className={styles.amount}>{plan.price}</span>
                  <span className={styles.currency}>AZN</span>
                </div>

                <MagneticButton 
                  className={`${styles.btn} ${plan.highlighted ? styles.btnPrimary : styles.btnSecondary}`}
                  icon={<FiArrowRight />}
                >
                  Choose Plan
                </MagneticButton>
              </div>
              
              <div className={styles.cardBody}>
                <ul className={styles.features}>
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <FiCheck className={styles.checkIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Plan Section */}
        <motion.div 
          className={styles.customPlanContainer}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springConfig}
        >
          <div className={styles.customInfo}>
            <h3>Custom Plan</h3>
            <p>Need more power? Tailor our services exactly to your agency or production house needs.</p>
            <ul className={styles.customFeatures}>
              <li><FiCheck /> Dedicated Account Manager</li>
              <li><FiCheck /> Custom API Rate Limits</li>
              <li><FiCheck /> White-label Reporting</li>
            </ul>
            <MagneticButton className={styles.customBtn} icon={<FiArrowRight />}>
              Contact Sales
            </MagneticButton>
          </div>

          <div className={styles.calculatorBox}>
            <div className={styles.calcHeader}>
              <h4>Plan Calculator</h4>
              <p>Estimate your custom enterprise cost</p>
            </div>
            
            <div className={styles.calcBody}>
              <div className={styles.calcItem}>
                <div className={styles.calcLabel}>
                  <span>Videos Per Month</span>
                  <span className={styles.val}>{calcVideos}</span>
                </div>
                <input 
                  type="range" min="100" max="5000" step="100" 
                  value={calcVideos} onChange={(e) => setCalcVideos(Number(e.target.value))}
                  className={styles.calcSlider}
                />
              </div>

              <div className={styles.calcItem}>
                <div className={styles.calcLabel}>
                  <span>API Requests (thousands)</span>
                  <span className={styles.val}>{calcAPI}k</span>
                </div>
                <input 
                  type="range" min="10" max="1000" step="10" 
                  value={calcAPI} onChange={(e) => setCalcAPI(Number(e.target.value))}
                  className={styles.calcSlider}
                />
              </div>

              <div className={styles.calcResult}>
                <div className={styles.resLabel}>Estimated Price</div>
                <div className={styles.resAmount}>
                  {estimatedPrice} <small>AZN / mo</small>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
