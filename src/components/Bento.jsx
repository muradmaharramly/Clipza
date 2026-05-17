import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiVideo, FiZap, FiLayout, FiTrendingUp } from 'react-icons/fi';
import styles from './Bento.module.scss';

const Bento = () => {
  const features = [
    {
      title: "AI Scripting Engine",
      desc: "Generate highly engaging, viral scripts tailored to your specific niche in seconds. Our AI analyzes top-performing content trends to ensure maximum viewer retention.",
      icon: <FiCpu />,
      size: "card1"
    },
    {
      title: "ElevenLabs Integration",
      desc: "Use ultra-realistic AI voiceovers. Deliver emotion and perfect pacing that keeps your audience completely hooked.",
      icon: <FiZap />,
      size: "card2"
    },
    {
      title: "Auto-Sync Editing",
      desc: "Instantly match visuals, transitions, and B-roll to the rhythm of your audio. No manual timeline tweaking required.",
      icon: <FiVideo />,
      size: "card3"
    },
    {
      title: "Premium Templates",
      desc: "Apply high-converting aesthetics instantly. From minimalist tech to bold storytelling, use skins designed for every genre.",
      icon: <FiLayout />,
      size: "card4"
    },
    {
      title: "Algorithmic Analysis",
      desc: "Uncover unsaturated topics before they trend. Analyze competitor tags to find your winning angle on YouTube and TikTok.",
      icon: <FiTrendingUp />,
      size: "card5"
    }
  ];

  const springConfig = { type: "spring", stiffness: 100, damping: 20 };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ...springConfig
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: springConfig }
  };

  return (
    <section className={styles.bentoSection} id="features">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springConfig}
        >
          <h2 className="text-gradient">Essential Toolkit</h2>
          <p>Crafted for speed. Built for quality.</p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((item, index) => (
            <motion.div 
              key={index}
              className={`${styles.card} ${styles[item.size]}`}
              variants={itemVariants}
            >
              <div className={styles.visualHeader}>
                <div className={styles.iconWrapper}>{item.icon}</div>
              </div>
              <div className={styles.tabContent}>
                <div className={styles.tabHandle} />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Bento;
