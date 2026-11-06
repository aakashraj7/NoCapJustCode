// client/src/components/Splash/CelestiusSplash.jsx
import React, { useState, useEffect } from 'react';
import styles from './CelestiusSplash.module.css';
import { SPLASH_TIMINGS } from '../Intro/introConstants.js';

import celestiusWebp from '../../assets/celestius-transparent.webp';
import celestius2xWebp from '../../assets/celestius-transparent@2x.webp';
import celestiusPng from '../../assets/celestius-transparent.png';
import celestius2xPng from '../../assets/celestius-transparent@2x.png';

/**
 * CelestiusSplash screen:
 * Displays centered "presented by" caption and Celestius logo on black background
 * with dot grid and radial yellow tint.
 * Sequence:
 * - Fade in (400ms, scale 0.94 -> 1.0)
 * - Hold (1400ms)
 * - Fade out into site (450ms)
 * Total duration: 2250ms (< 2.3s)
 */
export default function CelestiusSplash({ onComplete }) {
  const [animState, setAnimState] = useState('entering');

  useEffect(() => {
    // Body scroll lock
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fadeInDuration = isReduced ? 150 : SPLASH_TIMINGS.FADE_IN;
    const holdDuration = isReduced ? SPLASH_TIMINGS.REDUCED_HOLD : SPLASH_TIMINGS.HOLD;
    const fadeOutDuration = isReduced ? 200 : SPLASH_TIMINGS.FADE_OUT;

    // Start entering -> holding on next animation frame
    const startTimer = setTimeout(() => {
      setAnimState('holding');
    }, 20);

    // Transition from holding to exiting
    const exitTimer = setTimeout(() => {
      setAnimState('exiting');
    }, fadeInDuration + holdDuration);

    // Complete splash
    const completeTimer = setTimeout(() => {
      document.body.style.overflow = prevOverflow;
      onComplete();
    }, fadeInDuration + holdDuration + fadeOutDuration);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, [onComplete]);

  const stateClass =
    animState === 'holding'
      ? styles.stateHolding
      : animState === 'exiting'
        ? styles.stateExiting
        : styles.stateEntering;

  return (
    <div
      className={styles.splashOverlay}
      role="dialog"
      aria-modal="true"
      aria-label="Celestius Splash"
    >
      {/* Background Dot Grid and Radial Yellow Tint */}
      <div className={styles.dotGrid} aria-hidden="true" />
      <div className={styles.radialTint} aria-hidden="true" />

      {/* Screen Reader Announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Presented by Celestius
      </div>

      {/* Centered Presentation Box */}
      <div className={`${styles.content} ${stateClass}`}>
        <div className={styles.caption} aria-hidden="true">
          presented by
        </div>

        <div className={styles.logoWrapper}>
          <picture>
            <source
              srcSet={`${celestiusWebp} 1x, ${celestius2xWebp} 2x`}
              type="image/webp"
            />
            <img
              src={celestiusPng}
              srcSet={`${celestiusPng} 1x, ${celestius2xPng} 2x`}
              alt="Celestius"
              className={styles.logoImg}
              width={773}
              height={241}
              loading="eager"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
