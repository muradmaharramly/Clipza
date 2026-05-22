import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import styles from './Hero.module.scss';
import MagneticButton from './MagneticButton';

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let particles = [];
    const particleCount = 80; // Reduced for minimalism
    const mouse = { x: null, y: null, radius: 200 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 20 + 1;
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 15;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 15;
          }
        }
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const springConfig = { type: "spring", stiffness: 100, damping: 20 };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, duration: 1.2 }}
        >
          <h1 className={styles.title}>
            Automate Your YouTube <br />
            <span className="text-gradient">Empire with AI</span>
          </h1>
          <p className={styles.subtitle}>
            Premium AI content generation for the modern creator. <br />
            Minimal effort. Maximum impact.
          </p>
          <div className={styles.actions}>
            <MagneticButton className={styles.primaryBtn} icon={<FiArrowRight />}>
              Get Started Free
            </MagneticButton>
            <MagneticButton className={styles.secondaryBtn} icon={<FiPlay />} noRotate>
              Watch Demo
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
