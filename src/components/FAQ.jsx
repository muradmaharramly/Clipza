import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiZap } from 'react-icons/fi';
import styles from './FAQ.module.scss';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.item} ${isOpen ? styles.active : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.question}>
        <h3>{question}</h3>
        <div className={styles.iconWrapper}>
          <div className={styles.iconCircle}>
            <FiChevronDown />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={styles.answerWrapper}
          >
            <div className={styles.answer}>
              <p>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What makes Clipza unique?",
      answer: "We focus on high-fidelity AI generation with a minimalist workflow that respects your time."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, our subscriptions are flexible. You can scale up, down, or cancel whenever you need."
    },
    {
      question: "Is support included?",
      answer: "Every plan comes with our core support. Premium plans include priority and dedicated account managers."
    }
  ];

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          <motion.div 
            className={styles.leftPanel}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <h2 className="text-gradient">Questions?</h2>
            <p>Everything you need to know about Clipza. Can't find the answer? Reach out to us.</p>
            
            <div className={styles.promptBox}>
              <div className={styles.promptInner}>
                <input type="text" placeholder="Ask us anything..." />
                <div className={styles.sparkle}><FiZap /></div>
              </div>
            </div>
          </motion.div>

          <div className={styles.rightPanel}>
            <div className={styles.list}>
              {faqs.map((faq, index) => (
                <FAQItem key={index} {...faq} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
