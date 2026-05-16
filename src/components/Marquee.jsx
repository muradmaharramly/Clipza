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

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div key={index} className={styles.item}>
            {logo.icon}
            <span>{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
