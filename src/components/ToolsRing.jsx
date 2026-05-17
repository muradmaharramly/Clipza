import React from 'react';
import styles from './ToolsRing.module.scss';
import { FiCpu, FiCode, FiDatabase, FiCloud, FiActivity, FiGlobe, FiTool, FiZap, FiBox, FiCompass } from 'react-icons/fi';

const ToolsRing = () => {
  const tools = [
    { name: "OpenAI", icon: <FiCpu /> },
    { name: "ElevenLabs", icon: <FiZap /> },
    { name: "AWS", icon: <FiCloud /> },
    { name: "YouTube API", icon: <FiGlobe /> },
    { name: "TikTok API", icon: <FiActivity /> },
    { name: "Stripe", icon: <FiCode /> },
    { name: "PostgreSQL", icon: <FiDatabase /> },
    { name: "Render", icon: <FiBox /> },
    { name: "Midjourney", icon: <FiCompass /> },
    { name: "LangChain", icon: <FiTool /> },
  ];

  const items = [...tools, ...tools];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.ringWrapper}>
          <div className={styles.ring}>
            {items.map((tool, index) => {
              const angle = index * (360 / items.length);
              return (
                <div 
                  key={index} 
                  className={styles.toolCard}
                  style={{ '--base-transform': `translate(-50%, -50%) rotate(${angle}deg) translateY(-400px)` }}
                >
                  <div className={styles.icon}>{tool.icon}</div>
                  <span className={styles.name}>{tool.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className={styles.centerContent}>
          <h2>Tools & Technologies</h2>
          <p>
            We leverage industry-leading APIs and services to fully automate your content pipeline. 
            From AI generation to global distribution.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ToolsRing;
