// client/src/components/Splash/CelestiusSplash.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './CelestiusSplash.module.css';
import { SPLASH_TIMINGS } from '../Intro/introConstants.js';
import { logTimelineEvent } from '../../utils/timelineLogger.js';
import PresentedBrandTag from './PresentedBrandTag.jsx';

import celestiusWebp from '../../assets/celestius-transparent.webp';
import celestius2xWebp from '../../assets/celestius-transparent@2x.webp';
import celestiusPng from '../../assets/celestius-transparent.png';
import celestius2xPng from '../../assets/celestius-transparent@2x.png';

/**
 * CelestiusSplash screen:
 * Displays centered PresentedBrandTag and Celestius logo on black background
 * with dot grid and radial yellow tint.
 * Fast & punchy timing:
 * - Fade in (200ms, scale 0.96 -> 1.0)
 * - Hold (650ms)
 * - Fade out into site (200ms)
 * Total duration: 1050ms (~1.05s)
 */
export default function CelestiusSplash({ onComplete }) {
  const [animState, setAnimState] = useState('entering');
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    logTimelineEvent('splash start');

    // Body scroll lock
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fadeInDuration = isReduced ? 120 : SPLASH_TIMINGS.FADE_IN;
    const holdDuration = isReduced ? SPLASH_TIMINGS.REDUCED_HOLD : SPLASH_TIMINGS.HOLD;
    const fadeOutDuration = isReduced ? 150 : SPLASH_TIMINGS.FADE_OUT;

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
      logTimelineEvent('splash end');
      onCompleteRef.current?.();
    }, fadeInDuration + holdDuration + fadeOutDuration);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const stateClass =
    animState === 'holding'
      ? styles.stateHolding
      : animState === 'exiting'
        ? styles.stateExiting
        : styles.stateEntering;

  return (
    <div
      className={`${styles.splashOverlay} ${animState === 'exiting' ? styles.overlayExiting : ''}`}
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
        {/* Pixel styled brand tag replaces plain white text */}
        <PresentedBrandTag className={styles.brandTag} />

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
              style={{ aspectRatio: '773 / 241' }}
              loading="eager"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
