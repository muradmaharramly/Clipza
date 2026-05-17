import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap } from 'react-icons/fi';
import styles from './FAQ.module.scss';
import { LiaQuestionSolid } from 'react-icons/lia';
import { FaQuestion } from 'react-icons/fa';

const FAQItem = ({ question, answer }) => {
  return (
    <div className={`${styles.item} ${styles.active}`}>
      <div className={styles.question}>
        <h3>
          <AnimatePresence mode="wait">
            <motion.span
              key={question}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {question}
            </motion.span>
          </AnimatePresence>
        </h3>
        <div className={styles.iconWrapper}>
          <div className={styles.iconCircle}>
            <FaQuestion   style={{ color: '#10B981', fill: 'rgb(16, 185, 129)' }} />
          </div>
        </div>
      </div>
      <div className={styles.answerWrapper} style={{ height: 'auto', opacity: 1 }}>
        <div className={styles.answer}>
          <AnimatePresence mode="wait">
            <motion.p
              key={answer}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {answer}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqGroups = [
    // Slot 1
    [
      {
        question: "What makes Clipza unique?",
        answer: "We focus on high-fidelity AI generation with a minimalist workflow that respects your time."
      },
      {
        question: "Which APIs do you use?",
        answer: "We use OpenAI, ElevenLabs, and various social media APIs to fully automate your content pipeline."
      }
    ],
    // Slot 2
    [
      {
        question: "Can I cancel anytime?",
        answer: "Yes, our subscriptions are flexible. You can scale up, down, or cancel whenever you need."
      },
      {
        question: "Is support included?",
        answer: "Every plan comes with our core support. Premium plans include priority and dedicated account managers."
      }
    ],
    // Slot 3
    [
      {
        question: "How fast is rendering?",
        answer: "Our cloud rendering pipeline delivers fully polished, animated videos in under 60 seconds."
      },
      {
        question: "Do you offer a free trial?",
        answer: "Yes, you can create up to 3 automated videos completely free to test the pipeline."
      }
    ]
  ];

  const [promptIndex, setPromptIndex] = useState(0);
  const [faqIndex, setFaqIndex] = useState(0);
  const [transmitKey, setTransmitKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      // 1. Advance prompt index and fire pulse
      setPromptIndex((prev) => (prev + 1) % 2);
      setTransmitKey((prev) => prev + 1);
      
      // 2. Sync switch with pulse reaching the right-side cards
      setTimeout(() => {
        setFaqIndex((prev) => (prev + 1) % 2);
      }, 1200);

    }, 6000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Current items for the 3 slots
  const item1 = faqGroups[0][faqIndex];
  const item2 = faqGroups[1][faqIndex];
  const item3 = faqGroups[2][faqIndex];

  // Prompt shows the upcoming question for slot 1
  const upcomingQuestion = faqGroups[0][promptIndex].question;

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          
          {/* Curved splitting connection lines targeting exact centers */}
          <div className={styles.connectionWrapper}>
            <svg className={styles.connectionSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Branch 1: Top Item (Center-left is at Y=16.5) */}
              <path 
                d="M 38 75 L 43 75 C 47 75, 47 16.5, 51 16.5 L 56 16.5" 
                className={styles.dashedLine} 
                vectorEffect="non-scaling-stroke"
              />
              <path 
                key={`b1-${transmitKey}`}
                d="M 38 75 L 43 75 C 47 75, 47 16.5, 51 16.5 L 56 16.5" 
                className={styles.animatedLight} 
                pathLength="100" 
                vectorEffect="non-scaling-stroke"
              />

              {/* Branch 2: Middle Item (Center-left is at Y=50) */}
              <path 
                d="M 38 75 L 43 75 C 47 75, 47 50, 51 50 L 56 50" 
                className={styles.dashedLine} 
                vectorEffect="non-scaling-stroke"
              />
              <path 
                key={`b2-${transmitKey}`}
                d="M 38 75 L 43 75 C 47 75, 47 50, 51 50 L 56 50" 
                className={styles.animatedLight} 
                pathLength="100" 
                vectorEffect="non-scaling-stroke"
              />

              {/* Branch 3: Bottom Item (Center-left is at Y=83.5) */}
              <path 
                d="M 38 75 L 43 75 C 47 75, 47 83.5, 51 83.5 L 56 83.5" 
                className={styles.dashedLine} 
                vectorEffect="non-scaling-stroke"
              />
              <path 
                key={`b3-${transmitKey}`}
                d="M 38 75 L 43 75 C 47 75, 47 83.5, 51 83.5 L 56 83.5" 
                className={styles.animatedLight} 
                pathLength="100" 
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

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
                <div className={styles.promptText}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={promptIndex}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {upcomingQuestion}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className={styles.sparkle}><FiZap /></div>
              </div>
            </div>
          </motion.div>

          <div 
            className={styles.rightPanel}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={styles.list}>
              <div className={styles.singleFaqWrapper}>
                <FAQItem question={item1.question} answer={item1.answer} />
              </div>
              <div className={styles.singleFaqWrapper}>
                <FAQItem question={item2.question} answer={item2.answer} />
              </div>
              <div className={styles.singleFaqWrapper}>
                <FAQItem question={item3.question} answer={item3.answer} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
