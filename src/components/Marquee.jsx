import React from 'react';
import styles from './Marquee.module.scss';
import { FiYoutube, FiGithub, FiTwitter, FiInstagram, FiFramer, FiLayers } from 'react-icons/fi';

const Marquee = () => {
  const logos = [
    { name: "YouTube", icon: <FiYoutube /> },
    { name: "GitHub", icon: <FiGithub /> },
    { name: "Twitter", icon: <FiTwitter /> },
    { name: "Instagram", icon: <FiInstagram /> },
    { name: "Framer", icon: <FiFramer /> },
    { name: "ElevenLabs", icon: <FiLayers /> },
  ];

  const items = [...logos, ...logos]; // 12 items to form a complete ring

  return (
    <div className={styles.marquee}>
      <div className={styles.titleWrapper}>
        <p>Companies we collaborate with</p>
      </div>
      <div className={styles.scene}>
        <div className={styles.track}>
          {items.map((logo, index) => {
            const angle = index * (360 / items.length);
            return (
              <div 
                key={index} 
                className={styles.item}
                style={{ transform: `rotateY(${angle}deg) translateZ(var(--translate-z, 500px))` }}
              >
                {logo.icon}
                <span>{logo.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
