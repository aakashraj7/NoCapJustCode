// client/src/components/Footer/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';
import navbarLogoWebp from '../../assets/logo-navbar.webp';
import navbarLogoPng from '../../assets/logo-navbar.png';
import { eventData } from '../../data/event.js';
import { SectionScene } from '../Scene/index.js';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="connect" className={styles.footer}>
      <SectionScene section="footer" />
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.brandHeading}>
              <picture>
                <source srcSet={navbarLogoWebp} type="image/webp" />
                <img
                  src={navbarLogoPng}
                  alt="Larper or Coder"
                  className={styles.footerLogo}
                  width={320}
                  height={163}
                  style={{ aspectRatio: '320 / 163' }}
                />
              </picture>
            </div>
            <span className={styles.tagline}>{eventData.tagline}</span>
            <p className={styles.brandBio}>
              Presented by {eventData.presentedBy}.
              The definitive battleground for developers and problem solvers.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.footerCol}>
            <span className={styles.colTitle}>Navigation</span>
            <ul className={styles.colList}>
              <li>
                <a href="#hero" className={styles.colLink}>Home</a>
              </li>
              <li>
                <a href="#about" className={styles.colLink}>About the Event</a>
              </li>
              <li>
                <a href="#schedule" className={styles.colLink}>Full Schedule</a>
              </li>
              <li>
                <a href="#events" className={styles.colLink}>Tracks & Arenas</a>
              </li>
            </ul>
          </div>

          {/* Connect Details */}
          <div className={styles.footerCol}>
            <span className={styles.colTitle}>Connect</span>
            <ul className={styles.colList}>
              <li>
                <a
                  href={eventData.connect.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.colLink}
                >
                  Website &rarr;
                </a>
              </li>
              <li>
                <a
                  href={eventData.connect.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.colLink}
                >
                  Instagram ({eventData.connect.instagramLabel}) &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {eventData.presentedBy}. All rights reserved.
          </p>

          <button type="button" className={styles.backToTopBtn} onClick={scrollToTop}>
            <span>Back to top</span>
            <span>&uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
