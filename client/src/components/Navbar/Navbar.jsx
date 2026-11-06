// client/src/components/Navbar/Navbar.jsx
import React, { useState } from 'react';
import styles from './Navbar.module.css';
import navbarLogoWebp from '../../assets/logo-navbar.webp';
import navbarLogoPng from '../../assets/logo-navbar.png';
import Button from '../ui/Button.jsx';
import { useScrollSpy } from '../../hooks/useScrollSpy.js';
import { EVENT_YEAR } from '../../data/event.js';

export default function Navbar({ onOpenRegister }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(['hero', 'about', 'schedule', 'events', 'contact']);

  const navItems = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Schedule', href: '#schedule', id: 'schedule' },
    { label: 'Events', href: '#events', id: 'events' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.headerWrapper}>
      <nav className={styles.navbar} aria-label="Main Navigation">
        {/* Brand */}
        <a href="#hero" className={styles.brand} onClick={(e) => handleNavClick(e, '#hero')}>
          <picture className={styles.brandLogoWrapper}>
            <source srcSet={navbarLogoWebp} type="image/webp" />
            <img
              src={navbarLogoPng}
              alt="LARPER OR CODER Logo"
              className={styles.brandLogo}
              width={320}
              height={163}
              style={{ aspectRatio: '320 / 163' }}
            />
          </picture>
          <span className={styles.brandTitle}>LARPER OR CODER</span>
          {EVENT_YEAR && <span className={styles.brandBadge}>{EVENT_YEAR}</span>}
        </a>

        {/* Desktop Links */}
        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className={styles.actions}>
          <div className={styles.registerBtnDesktop}>
            <Button size="sm" variant="primary" onClick={() => onOpenRegister()}>
              Register as a pair
            </Button>
          </div>

          {/* Mobile Hamburger Toggle (44px tap target) */}
          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNavList}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`${styles.mobileNavLink} ${activeSection === item.id ? styles.active : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Button fullWidth size="md" variant="primary" onClick={() => {
            setMobileMenuOpen(false);
            onOpenRegister();
          }}>
            Register as a pair
          </Button>
        </div>
      )}
    </header>
  );
}
