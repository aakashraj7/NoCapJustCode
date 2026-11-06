// client/src/components/Intro/Intro.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Intro.module.css';
import { INTRO_STATES, TIMINGS, SESSION_KEY } from './introConstants.js';

export default function Intro({ onComplete }) {
  // Check session storage before rendering
  const [alreadySeen] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Check prefers-reduced-motion initially: show final enter screen immediately, do not skip silently
  const isReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [state, setState] = useState(() =>
    isReducedMotion ? INTRO_STATES.ENTER_READY : INTRO_STATES.LOADING
  );
  const [progress, setProgress] = useState(() => (isReducedMotion ? 100 : 0));
  const [typedLarper, setTypedLarper] = useState(() => (isReducedMotion ? 'LARPER' : ''));
  const [showOrBadge, setShowOrBadge] = useState(() => isReducedMotion);
  const [typedCoder, setTypedCoder] = useState(() => (isReducedMotion ? 'CODER' : ''));
  const [typedPresenter, setTypedPresenter] = useState(() =>
    isReducedMotion ? 'PRESENTED BY CELESTIALS' : ''
  );
  const [isPoppingOut, setIsPoppingOut] = useState(false);

  const skipBtnRef = useRef(null);

  // If already seen, immediately trigger complete
  useEffect(() => {
    if (alreadySeen) {
      onComplete?.();
    }
  }, [alreadySeen, onComplete]);

  // Lock page scroll on mount, unlock on unmount
  useEffect(() => {
    if (alreadySeen) return;
    document.body.classList.add('scroll-locked');
    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, [alreadySeen]);

  // Focus skip button on mount
  useEffect(() => {
    if (!alreadySeen && skipBtnRef.current) {
      skipBtnRef.current.focus();
    }
  }, [alreadySeen]);

  // Dismiss handler
  const dismiss = useCallback(() => {
    setState(INTRO_STATES.FADING_OUT);
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // Ignore private browsing storage errors
    }
    setTimeout(() => {
      onComplete?.();
    }, 400);
  }, [onComplete]);

  // Keyboard shortcut listener (Enter, Escape)
  useEffect(() => {
    if (alreadySeen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault();
        dismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [alreadySeen, dismiss]);

  // State machine progression: Loading -> Detected -> Freeze/Green Cut
  useEffect(() => {
    if (alreadySeen || isReducedMotion) return;

    // Phase 1: LOADING (0% -> 99% in ~2000ms)
    if (state === INTRO_STATES.LOADING) {
      const startTime = performance.now();
      const interval = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const ratio = Math.min(elapsed / TIMINGS.LOADING, 1);
        const currentProgress = Math.min(Math.floor(ratio * 99), 99);
        setProgress(currentProgress);

        if (ratio >= 1) {
          clearInterval(interval);
          setState(INTRO_STATES.DETECTED);
        }
      }, 50);

      return () => clearInterval(interval);
    }

    // Phase 2: DETECTED (Orange popup box and blink)
    if (state === INTRO_STATES.DETECTED) {
      const timer = setTimeout(() => {
        setState(INTRO_STATES.CUT_TO_GREEN);
      }, TIMINGS.DETECTED_ORANGE);
      return () => clearTimeout(timer);
    }

    // Phase 3: CUT_TO_GREEN (Popup, handles, blink, and bar turn green in one cut, freeze 1000ms, bar hits 100%, pops out)
    if (state === INTRO_STATES.CUT_TO_GREEN) {
      const timer = setTimeout(() => {
        setIsPoppingOut(true);
        setTimeout(() => {
          setState(INTRO_STATES.TYPE_LOGO);
        }, 200);
      }, TIMINGS.FREEZE_GREEN);
      return () => clearTimeout(timer);
    }
  }, [state, alreadySeen, isReducedMotion]);

  // Phase 4: Type logo letter by letter
  useEffect(() => {
    if (alreadySeen || isReducedMotion || state !== INTRO_STATES.TYPE_LOGO) return;

    const fullLarper = 'LARPER';
    const fullCoder = 'CODER';

    let charIndex = 0;
    const typeLarperTimer = setInterval(() => {
      charIndex++;
      setTypedLarper(fullLarper.slice(0, charIndex));
      if (charIndex >= fullLarper.length) {
        clearInterval(typeLarperTimer);

        // Show OR badge
        setTimeout(() => {
          setShowOrBadge(true);

          // Type CODER
          let coderIndex = 0;
          const typeCoderTimer = setInterval(() => {
            coderIndex++;
            setTypedCoder(fullCoder.slice(0, coderIndex));
            if (coderIndex >= fullCoder.length) {
              clearInterval(typeCoderTimer);

              // Hold for 1 second, then backspace
              setTimeout(() => {
                setState(INTRO_STATES.BACKSPACE);
              }, TIMINGS.HOLD_LOGO);
            }
          }, TIMINGS.TYPE_INTERVAL);
        }, 180);
      }
    }, TIMINGS.TYPE_INTERVAL);

    return () => clearInterval(typeLarperTimer);
  }, [state, alreadySeen, isReducedMotion]);

  // Phase 5: Backspace logo
  useEffect(() => {
    if (alreadySeen || isReducedMotion || state !== INTRO_STATES.BACKSPACE) return;

    const fullCoder = 'CODER';
    const fullLarper = 'LARPER';
    let coderChars = fullCoder.length;

    const backspaceCoder = setInterval(() => {
      coderChars--;
      setTypedCoder(fullCoder.slice(0, Math.max(0, coderChars)));
      if (coderChars <= 0) {
        clearInterval(backspaceCoder);
        setShowOrBadge(false);

        let larperChars = fullLarper.length;
        const backspaceLarper = setInterval(() => {
          larperChars--;
          setTypedLarper(fullLarper.slice(0, Math.max(0, larperChars)));
          if (larperChars <= 0) {
            clearInterval(backspaceLarper);
            setState(INTRO_STATES.TYPE_PRESENTER);
          }
        }, TIMINGS.BACKSPACE_INTERVAL);
      }
    }, TIMINGS.BACKSPACE_INTERVAL);

    return () => clearInterval(backspaceCoder);
  }, [state, alreadySeen, isReducedMotion]);

  // Phase 6: Type PRESENTED BY CELESTIALS
  useEffect(() => {
    if (alreadySeen || isReducedMotion || state !== INTRO_STATES.TYPE_PRESENTER) return;

    const fullPresenter = 'PRESENTED BY CELESTIALS';
    let pIndex = 0;
    const typePresenterTimer = setInterval(() => {
      pIndex++;
      setTypedPresenter(fullPresenter.slice(0, pIndex));
      if (pIndex >= fullPresenter.length) {
        clearInterval(typePresenterTimer);
        setTimeout(() => {
          setState(INTRO_STATES.ENTER_READY);
        }, 300);
      }
    }, TIMINGS.TYPE_INTERVAL);

    return () => clearInterval(typePresenterTimer);
  }, [state, alreadySeen, isReducedMotion]);

  if (alreadySeen) {
    return null;
  }

  const isCutToGreen = state === INTRO_STATES.CUT_TO_GREEN;
  const isLogoStage = state === INTRO_STATES.TYPE_LOGO || state === INTRO_STATES.BACKSPACE;
  const isPresenterStage = state === INTRO_STATES.TYPE_PRESENTER || state === INTRO_STATES.ENTER_READY;
  const displayProgress = isCutToGreen ? 100 : progress;

  return (
    <div
      className={`${styles.overlay} ${state === INTRO_STATES.FADING_OUT ? styles.fadingOut : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Story Introduction"
    >
      {/* Skip Button - Always visible top right */}
      <button
        ref={skipBtnRef}
        type="button"
        className={styles.skipButton}
        onClick={dismiss}
        aria-label="Skip intro to site"
      >
        Skip
      </button>

      <div className={styles.stage}>
        {/* State: LOADING or DETECTED or CUT_TO_GREEN */}
        {(state === INTRO_STATES.LOADING ||
          state === INTRO_STATES.DETECTED ||
          state === INTRO_STATES.CUT_TO_GREEN) && (
          <div className={styles.loadingBox}>
            <div className={styles.loadingLabel}>
              loading.. {displayProgress}%
            </div>

            <div className={styles.progressBarContainer}>
              <div
                className={`${styles.progressBarFill} ${isCutToGreen ? styles.green : ''}`}
                style={{ width: `${displayProgress}%` }}
              />
            </div>

            {(state === INTRO_STATES.DETECTED || state === INTRO_STATES.CUT_TO_GREEN) && (
              <div className={`${styles.popupWrapper} ${isPoppingOut ? styles.poppingOut : ''}`}>
                <div className={`${styles.popupBox} ${isCutToGreen ? styles.greenCut : ''}`}>
                  <span className={styles.sideHandleLeft} />
                  <span className={styles.popupText}>larper detected</span>
                  <span className={styles.sideHandleRight} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* State: TYPE_LOGO & BACKSPACE */}
        {isLogoStage && (
          <div className={styles.logoScene} aria-live="polite">
            <div className={styles.larperRow}>{typedLarper}</div>
            {showOrBadge && (
              <div className={styles.orRow}>
                <span className={styles.orBracket}>[--</span>
                <span className={styles.orBadge}>OR</span>
                <span className={styles.orBracket}>--]</span>
              </div>
            )}
            <div className={styles.coderRow}>
              {typedCoder}
              <span className={styles.cursor} />
            </div>
          </div>
        )}

        {/* State: TYPE_PRESENTER & ENTER_READY */}
        {isPresenterStage && (
          <div className={styles.presenterScene} aria-live="polite">
            <div className={styles.presenterLabel}>
              {typedPresenter.startsWith('PRESENTED BY ') ? (
                <>
                  PRESENTED BY{' '}
                  <span className={styles.presenterHighlight}>
                    {typedPresenter.replace('PRESENTED BY ', '')}
                  </span>
                </>
              ) : (
                typedPresenter
              )}
            </div>

            {state === INTRO_STATES.ENTER_READY && (
              <button
                type="button"
                className={styles.enterButton}
                onClick={dismiss}
                autoFocus
              >
                ENTER
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
