// client/src/components/Footer/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';
import navbarLogoWebp from '../../assets/logo-navbar.webp';
import navbarLogoPng from '../../assets/logo-navbar.png';
import { eventData } from '../../data/event.js';
import Prop from '../Scene/Prop.jsx';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className={styles.footer}>
      {/* Background Coding Props */}
      <Prop
        name="braces"
        parallaxFactor={-0.03}
        variant="fadeToRight"
        className="phoneHide"
        style={{ top: '8%', left: '-5%', width: 'clamp(180px, 22vw, 340px)' }}
      />
      <Prop
        name="cursor"
        parallaxFactor={0.03}
        variant="fadeToLeft"
        style={{ bottom: '12%', right: '-4%', width: 'clamp(180px, 24vw, 360px)' }}
      />

      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.brandHeading}>
              <picture>
                <source srcSet={navbarLogoWebp} type="image/webp" />
                <img src={navbarLogoPng} alt="LARPER OR CODER Logo" className={styles.footerLogo} width={160} height={80} />
              </picture>
              <span className={styles.brandName}>{eventData.name}</span>
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
