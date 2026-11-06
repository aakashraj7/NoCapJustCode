// client/src/components/Scene/DevCards/DevCard.jsx
import React, { useEffect, useRef } from 'react';
import styles from './DevCards.module.css';

/**
 * DevCard: base wrapper for floating code cards.
 * Handles:
 * - Parallax scroll (max 0.15x speed, passive listener, RAF)
 * - Pause animations on tab hidden
 * - Disabled on prefers-reduced-motion
 * - Consistent border, rounded corners, backdrop-filter
 */
export default function DevCard({
  name,
  floatVariant = 'A',
  parallaxFactor = 0.04,
  className = '',
  style = {},
  children,
}) {
  const cardRef = useRef(null);
  const animStateRef = useRef({ ticking: false, animId: null });

  // Scroll Parallax
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced || !parallaxFactor) return;

    // Clamp parallax factor strictly to max 0.15x
    const clampedFactor = Math.max(-0.15, Math.min(0.15, parallaxFactor));
    const animState = animStateRef.current;

    const handleScroll = () => {
      if (!animState.ticking) {
        animState.animId = requestAnimationFrame(() => {
          if (cardRef.current && !document.hidden) {
            const scrollY = window.scrollY || window.pageYOffset;
            const yOffset = Math.round(scrollY * clampedFactor * 10) / 10;
            cardRef.current.style.setProperty('--parallax-y', `${yOffset}px`);
          }
          animState.ticking = false;
        });
        animState.ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animState.animId) cancelAnimationFrame(animState.animId);
    };
  }, [parallaxFactor]);

  // Handle document visibilitychange to pause animations
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        document.documentElement.classList.add('tab-hidden');
      } else {
        document.documentElement.classList.remove('tab-hidden');
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const floatClass =
    floatVariant === 'B'
      ? styles.floatB
      : floatVariant === 'C'
        ? styles.floatC
        : styles.floatA;

  return (
    <div
      ref={cardRef}
      data-dev-card="true"
      data-card-name={name}
      className={`${styles.devCard} ${floatClass} ${className}`}
      style={style}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
