// client/src/components/Footer/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';
import logoImg from '../../assets/logo.png';
import { eventData } from '../../data/event.js';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.brandHeading}>
              <img src={logoImg} alt="LARPER OR CODER Logo" className={styles.footerLogo} />
              <span className={styles.brandName}>{eventData.name}</span>
            </div>
            <span className={styles.tagline}>{eventData.tagline}</span>
            <p className={styles.brandBio}>
              Part of {eventData.edition}, presented by {eventData.presentedBy}.
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
                <a href="#about" className={styles.colLink}>About CodeVerse</a>
              </li>
              <li>
                <a href="#schedule" className={styles.colLink}>Full Schedule</a>
              </li>
              <li>
                <a href="#events" className={styles.colLink}>Tracks & Arenas</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className={styles.footerCol}>
            <span className={styles.colTitle}>Contact & Community</span>
            <ul className={styles.colList}>
              <li className={styles.contactItem}>
                <span>Email:</span>
                <a href={`mailto:${eventData.contact.email}`} className={styles.colLink}>
                  {eventData.contact.email}
                </a>
              </li>
              <li className={styles.contactItem}>
                <span>Phone:</span>
                <span className={styles.colLink}>{eventData.contact.phone}</span>
              </li>
              <li>
                <a
                  href={eventData.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.colLink}
                >
                  Instagram (Celestials) &rarr;
                </a>
              </li>
              <li>
                <a
                  href={eventData.contact.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.colLink}
                >
                  Discord Server &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; 2026 {eventData.presentedBy}. All rights reserved. CodeVerse 2026.
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
