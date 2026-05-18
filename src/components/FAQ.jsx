import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap } from 'react-icons/fi';
import { FaQuestion } from 'react-icons/fa';
import styles from './FAQ.module.scss';

const FAQItem = ({ question, answer, isLoading }) => {
  return (
    <div className={`${styles.item} ${styles.active}`}>
      <div className={styles.question} style={{ position: 'relative' }}>
        {/* Natural-sized Question Text (Hidden when loading but reserves height) */}
        <motion.div 
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{ width: '100%' }}
        >
          <motion.h3
            key={question}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {question}
          </motion.h3>
        </motion.div>

        {/* Skeleton overlay for Question */}
        <AnimatePresence>
          {isLoading && (
            <div style={{ position: 'absolute', left: 24, right: 80, top: 0, bottom: 0, display: 'flex', alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className={styles.skeletonQuestion}
              />
            </div>
          )}
        </AnimatePresence>

        <div className={styles.iconWrapper}>
          <div className={styles.iconCircle}>
            <FaQuestion />
          </div>
        </div>
      </div>
      <div className={styles.answerWrapper} style={{ height: 'auto', opacity: 1 }}>
        <div className={styles.answer} style={{ position: 'relative' }}>
          {/* Natural-sized Answer Text (Hidden when loading but reserves height) */}
          <motion.div 
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ width: '100%' }}
          >
            <motion.p
              key={answer}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {answer}
            </motion.p>
          </motion.div>

          {/* Skeleton overlay for Answer */}
          <AnimatePresence>
            {isLoading && (
              <div style={{ position: 'absolute', left: 24, right: 24, top: 0, bottom: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className={styles.skeletonAnswer}
                >
                  <div className={styles.skeletonLineShort} />
                  <div className={styles.skeletonLineLong} />
                </motion.div>
              </div>
            )}
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

  const [faqIndex, setFaqIndex] = useState(0);
  const [transmitKey, setTransmitKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setTransmitKey(prev => prev + 1);
      setIsLoading(true);

      setTimeout(() => {
        setFaqIndex((prev) => (prev + 1) % 2);
        setIsLoading(false);
      }, 1200);

    }, 6000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleManualTrigger = () => {
    if (isLoading) return;
    setTransmitKey(prev => prev + 1);
    setIsLoading(true);

    setTimeout(() => {
      setFaqIndex((prev) => (prev + 1) % 2);
      setIsLoading(false);
    }, 1200);
  };

  const item1 = faqGroups[0][faqIndex];
  const item2 = faqGroups[1][faqIndex];
  const item3 = faqGroups[2][faqIndex];

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* Left Sticky Panel */}
          <motion.div 
            className={styles.leftPanel}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <h2>Questions?</h2>
            <p>Everything you need to know about Clipza. Can't find the answer? Reach out to us.</p>
            
            {/* Premium Input Capsule with Static Placeholder */}
            <div className={styles.promptBox}>
              <div className={styles.promptInner}>
                <input 
                  type="text" 
                  placeholder="Enter your question..." 
                  className={styles.promptInput}
                />
                <div 
                  className={styles.sparkle} 
                  onClick={handleManualTrigger}
                  role="button"
                  tabIndex={0}
                  aria-label="Trigger FAQ Flow"
                >
                  <FiZap />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Symmetrical glowing energy paths */}
          <div className={styles.connectionWrapper}>
            <svg className={styles.connectionSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Branch 1: Top Item (Center-left is at Y=16.5) */}
              <path 
                d="M 38 75 L 43 75 C 47 75, 47 16.5, 51 16.5 L 56 16.5" 
                className={styles.dashedLine} 
                vectorEffect="non-scaling-stroke"
              />
              <motion.path 
                key={`b1-${transmitKey}`}
                d="M 38 75 L 43 75 C 47 75, 47 16.5, 51 16.5 L 56 16.5" 
                className={styles.animatedLight} 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.8, 1.0]
                }}
                vectorEffect="non-scaling-stroke"
              />

              {/* Branch 2: Middle Item (Center-left is at Y=50) */}
              <path 
                d="M 38 75 L 43 75 C 47 75, 47 50, 51 50 L 56 50" 
                className={styles.dashedLine} 
                vectorEffect="non-scaling-stroke"
              />
              <motion.path 
                key={`b2-${transmitKey}`}
                d="M 38 75 L 43 75 C 47 75, 47 50, 51 50 L 56 50" 
                className={styles.animatedLight} 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.8, 1.0]
                }}
                vectorEffect="non-scaling-stroke"
              />

              {/* Branch 3: Bottom Item (Center-left is at Y=83.5) */}
              <path 
                d="M 38 75 L 43 75 C 47 75, 47 83.5, 51 83.5 L 56 83.5" 
                className={styles.dashedLine} 
                vectorEffect="non-scaling-stroke"
              />
              <motion.path 
                key={`b3-${transmitKey}`}
                d="M 38 75 L 43 75 C 47 75, 47 83.5, 51 83.5 L 56 83.5" 
                className={styles.animatedLight} 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.8, 1.0]
                }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Right Panel listing FAQItems with Hover Pause */}
          <div 
            className={styles.rightPanel}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={styles.list}>
              <div className={styles.singleFaqWrapper}>
                <FAQItem question={item1.question} answer={item1.answer} isLoading={isLoading} />
              </div>
              <div className={styles.singleFaqWrapper}>
                <FAQItem question={item2.question} answer={item2.answer} isLoading={isLoading} />
              </div>
              <div className={styles.singleFaqWrapper}>
                <FAQItem question={item3.question} answer={item3.answer} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
