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
 * Renders ONLY:
 * 1. The PRESENTED BY brand tag (slanted cream parallelogram with dark pixel text, yellow checkers & brackets)
 * 2. The Celestius logo image
 * 3. Visually hidden aria-live announcement
 *
 * Sequence:
 * - Fade in (300ms, scale 0.96 -> 1.0)
 * - Hold (1000ms)
 * - Fade out into site (300ms)
 * Total duration: 1600ms (1.6s)
 */
export default function CelestiusSplash({ onComplete }) {
  const [animState, setAnimState] = useState('entering');
  const splashRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Dev-only assertion: Assert Splash DOM contains only BrandTag, logo, and sr-only
  useEffect(() => {
    if (import.meta.env.DEV && splashRef.current) {
      const walker = document.createTreeWalker(
        splashRef.current,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            if (parent.closest('.sr-only') || parent.classList.contains('sr-only')) {
              return NodeFilter.FILTER_REJECT;
            }
            if (parent.closest('svg') || parent.tagName.toLowerCase() === 'text') {
              return NodeFilter.FILTER_REJECT;
            }
            const text = node.textContent?.trim();
            return text ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          },
        }
      );

      const strayTexts = [];
      while (walker.nextNode()) {
        strayTexts.push(walker.currentNode.textContent?.trim());
      }

      if (strayTexts.length > 0) {
        console.error('[Splash Assertion Failed] Stray visible text nodes found in splash DOM:', strayTexts);
      } else {
        console.info('[Splash Assertion Passed] Splash DOM contains ONLY brand tag, logo, and aria-live.');
      }
    }
  }, []);

  useEffect(() => {
    logTimelineEvent('splash start');

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
      ref={splashRef}
      className={`${styles.splashOverlay} ${animState === 'exiting' ? styles.overlayExiting : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Celestius Splash"
    >
      {/* Background Dot Grid and Radial Yellow Tint */}
      <div className={styles.dotGrid} aria-hidden="true" />
      <div className={styles.radialTint} aria-hidden="true" />

      {/* Visually hidden screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Presented by Celestius
      </div>

      {/* Centered Presentation Box */}
      <div className={`${styles.content} ${stateClass}`}>
        {/* Pixel-styled brand tag (cream parallelogram with yellow checkers & brackets) */}
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
