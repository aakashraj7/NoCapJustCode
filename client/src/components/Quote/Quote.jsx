// client/src/components/Quote/Quote.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './Quote.module.css';
import thinkerWebp from '../../assets/thinker.webp';
import thinker450Webp from '../../assets/thinker-450w.webp';
import { QUOTE, QUOTE_ATTRIBUTION } from '../../data/event.js';

// Dense hatching reads strong, keep statue quiet at 0.6 opacity
const STATUE_OPACITY = 0.6;

export default function Quote() {
  const sectionRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Apply interactive pre-state only after JS observer is ready
    el.setAttribute('data-ready', 'true');

    // 1500ms safety fallback to ensure content is never trapped in pre-state
    const fallbackTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 1500);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          setIsRevealed(true);
          clearTimeout(fallbackTimer);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(el);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="quote"
      ref={sectionRef}
      className={styles.quoteSection}
      data-revealed={isRevealed ? 'true' : 'false'}
      style={{ '--statue-opacity': STATUE_OPACITY }}
    >
      <div className={styles.quoteContainer}>
        <figure className={styles.quoteFigure}>
          {/* Statue Column */}
          <div className={styles.statueWrapper}>
            <img
              src={thinkerWebp}
              srcSet={`${thinker450Webp} 450w, ${thinkerWebp} 900w`}
              sizes="(min-width: 1024px) 450px, (min-width: 768px) 320px, 62vw"
              width={900}
              height={1461}
              alt="Orange line drawing of The Thinker statue, seated with his chin on his hand"
              className={styles.statueImage}
              decoding="async"
              loading="lazy"
            />
          </div>

          {/* Quote Column */}
          <div className={styles.quoteContent}>
            {/* Mobile / Tablet orange divider */}
            <div className={styles.mobileDivider} aria-hidden="true" />

            {/* Screen readers read complete quote immediately */}
            <blockquote className={styles.srOnly}>
              “{QUOTE}”
            </blockquote>

            {/* CRT Display with Scanlines, Glow, and typing effect */}
            <div className={styles.quoteDisplay} aria-hidden="true">
              {/* Ghost block: reserves height to eliminate CLS */}
              <div className={styles.quoteGhost}>
                <span>
                  The more u <span className={styles.larpCream}>larp</span>,
                </span>
                <span>
                  the less u <span className={styles.larpCream}>larp</span>.
                </span>
              </div>

              {/* Animated overlay */}
              <div className={styles.quoteAnimated}>
                <span className={`${styles.quoteLine} ${styles.line1}`}>
                  The more u <span className={styles.larpCream}>larp</span>,
                  <span className={styles.cursor1} />
                </span>
                <span className={`${styles.quoteLine} ${styles.line2}`}>
                  the less u <span className={styles.larpCream}>larp</span>.
                  <span className={styles.cursor2} />
                </span>
              </div>
            </div>

            <figcaption className={styles.attribution}>
              — {QUOTE_ATTRIBUTION}
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
