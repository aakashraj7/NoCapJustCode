// client/src/components/Hero/Hero.jsx
import React from 'react';
import styles from './Hero.module.css';
import logoImg from '../../assets/logo-transparent.webp';
import logoPngFallback from '../../assets/logo-transparent.png';
import { eventData } from '../../data/event.js';
import Button from '../ui/Button.jsx';
import Chip from '../ui/Chip.jsx';
import Marquee from './Marquee.jsx';

export default function Hero({ onOpenRegister }) {
  const scrollToEvents = (e) => {
    e.preventDefault();
    const target = document.getElementById('events');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={styles.heroSection}>
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroGrid}>
          {/* Left Column */}
          <div className={styles.leftCol}>
            <div className={styles.presenterPill}>
              PRESENTED BY CELESTIUS
            </div>

            <h1 className={styles.headline}>
              LARPER OR CODER
            </h1>

            <div className={styles.tagline}>
              {eventData.tagline}
            </div>

            <p className={styles.leadText}>
              {eventData.description}
            </p>

            {/* Date, Venue & Pricing Chips */}
            <div className={styles.chipsRow}>
              <Chip
                icon={
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>₹</span>
                }
              >
                ₹149 per person // ₹298 per pair
              </Chip>

              <Chip
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                }
              >
                DATE: {eventData.date}
              </Chip>

              <Chip
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
              >
                VENUE: {eventData.venue}
              </Chip>
            </div>

            {/* Action Buttons */}
            <div className={styles.ctaGroup}>
              <Button size="lg" variant="primary" onClick={() => onOpenRegister()}>
                Register as a pair
              </Button>
              <Button size="lg" variant="secondary" href="#events" onClick={scrollToEvents}>
                See Events
              </Button>
            </div>
          </div>

          {/* Right Column Brand Display */}
          <div className={styles.rightCol}>
            <div className={styles.heroLogoWrapper}>
              <div className={styles.heroLogoGlow} aria-hidden="true" />
              <picture>
                <source srcSet={logoImg} type="image/webp" />
                <img
                  src={logoPngFallback}
                  alt="LARPER OR CODER Logo"
                  className={`${styles.heroLogoImg} heroLogo`}
                  loading="eager"
                  width={617}
                  height={314}
                  style={{ aspectRatio: '617 / 314' }}
                />
              </picture>
              <div className={styles.showcaseFootnote}>
                &gt; locked in. code only.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <Marquee />
    </section>
  );
}
