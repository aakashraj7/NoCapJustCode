// client/src/components/Intro/Intro.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Intro.module.css';
import {
  INTRO_STATES,
  PRESENTER_NAME,
  TIMINGS,
  TOTAL_SEGMENTS,
  STATUS_LINES,
  SESSION_KEYS,
} from './introConstants.js';

export default function Intro({ onComplete }) {
  // Check session storage for "seen"
  const [alreadySeen] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEYS.INTRO_SEEN) === 'true';
    } catch {
      return false;
    }
  });

  // Sound enabled state (persisted in sessionStorage)
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEYS.SOUND_ENABLED) === 'true';
    } catch {
      return false;
    }
  });

  // Check prefers-reduced-motion
  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // State machine state
  const [state, setState] = useState(() =>
    isReducedMotion ? INTRO_STATES.SWAP : INTRO_STATES.LOADING
  );

  // Loading & status values
  const [progress, setProgress] = useState(0);
  const [activeStatusIndex, setActiveStatusIndex] = useState(0);

  // Logo typing states
  const [typedTop, setTypedTop] = useState(() => (isReducedMotion ? 'PRESENTED' : ''));
  const [showTag, setShowTag] = useState(() => isReducedMotion);
  const [tagText, setTagText] = useState(() => (isReducedMotion ? 'BY' : 'OR'));
  const [typedBottom, setTypedBottom] = useState(() => (isReducedMotion ? PRESENTER_NAME : ''));

  const skipBtnRef = useRef(null);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const animationFrameRef = useRef(null);

  // If already seen, trigger complete immediately
  useEffect(() => {
    if (alreadySeen) {
      onComplete?.();
    }
  }, [alreadySeen, onComplete]);

  // Lock body scroll on mount, restore on unmount
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

  // Web Audio Context initialization & synthesis
  const getAudioCtx = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
      return audioCtxRef.current;
    } catch {
      return null;
    }
  }, []);

  const playTick = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.018);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch {
      // Audio errors must never break the intro
    }
  }, [soundEnabled, getAudioCtx]);

  const playAlarm = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      osc.frequency.setValueAtTime(640, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Audio safety
    }
  }, [soundEnabled, getAudioCtx]);

  const playDing = useCallback((freq = 587, targetFreq = 880) => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(targetFreq, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.42);
    } catch {
      // Audio safety
    }
  }, [soundEnabled, getAudioCtx]);

  const playKeyClick = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, ctx.currentTime);
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.016);
    } catch {
      // Audio safety
    }
  }, [soundEnabled, getAudioCtx]);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      getAudioCtx();
    }
    try {
      sessionStorage.setItem(SESSION_KEYS.SOUND_ENABLED, String(nextState));
    } catch {
      // Storage safety
    }
  };

  // Dismiss intro immediately and transition to site
  const dismiss = useCallback(() => {
    setState(INTRO_STATES.AUTO_ENTER);
    try {
      sessionStorage.setItem(SESSION_KEYS.INTRO_SEEN, 'true');
    } catch {
      // Storage safety
    }
    setTimeout(() => {
      onComplete?.();
    }, TIMINGS.FADE_OUT_DURATION);
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

  // Reduced motion: show static "PRESENTED BY CELESTIUS" logo for 1.5s then auto-enter
  useEffect(() => {
    if (alreadySeen || !isReducedMotion) return;

    const timer = setTimeout(() => {
      dismiss();
    }, TIMINGS.REDUCED_MOTION_HOLD);

    return () => clearTimeout(timer);
  }, [alreadySeen, isReducedMotion, dismiss]);

  // Canvas particle background (drifting dim code glyphs)
  useEffect(() => {
    if (alreadySeen || isReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    const glyphs = ['{', '}', '<', '/', '>', ';', '_', '0', '1'];
    const particles = Array.from({ length: 36 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vy: 0.3 + Math.random() * 0.45,
      char: glyphs[Math.floor(Math.random() * glyphs.length)],
      size: 11 + Math.random() * 6,
      alpha: 0.05 + Math.random() * 0.05,
      isOrange: Math.random() > 0.4,
    }));

    const isGreen = state === INTRO_STATES.TURN_GREEN || state === INTRO_STATES.COMPLETE;

    const render = () => {
      if (!document.hidden && canvas) {
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.textAlign = 'center';

        particles.forEach((p) => {
          p.y += p.vy;
          if (p.y > h + 20) {
            p.y = -10;
            p.x = Math.random() * w;
          }

          if (isGreen) {
            ctx.fillStyle = `rgba(61, 220, 132, ${p.alpha * 1.2})`;
          } else if (p.isOrange) {
            ctx.fillStyle = `rgba(242, 107, 58, ${p.alpha})`;
          } else {
            ctx.fillStyle = `rgba(247, 237, 216, ${p.alpha})`;
          }

          ctx.font = `${p.size}px monospace`;
          ctx.fillText(p.char, p.x, p.y);
        });
      }
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [alreadySeen, isReducedMotion, state]);

  // Main state sequence controller
  useEffect(() => {
    if (alreadySeen || isReducedMotion) return;

    // 1. LOADING (0 to 2400ms): Non-linear climb to 99% with a few stutters
    if (state === INTRO_STATES.LOADING) {
      const startTime = performance.now();
      const tickTracker = { lastTick: 0 };

      const progressInterval = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const ratio = Math.min(elapsed / TIMINGS.LOADING_DURATION, 1);

        // Realistic non-linear progress with micro-stutters
        let target;
        if (ratio < 0.35) {
          target = Math.floor(ratio * 1.5 * 100);
        } else if (ratio < 0.6) {
          // slight stutter hold
          target = 54 + Math.floor((ratio - 0.35) * 60);
        } else if (ratio < 0.85) {
          target = 76 + Math.floor((ratio - 0.6) * 70);
        } else {
          target = 94 + Math.floor((ratio - 0.85) * 33);
        }

        const nextProgress = Math.min(Math.max(target, 0), 99);
        setProgress(nextProgress);

        if (nextProgress > tickTracker.lastTick + 10) {
          tickTracker.lastTick = nextProgress;
          playTick();
        }

        // Status lines progression
        if (ratio > 0.65) {
          setActiveStatusIndex(2);
        } else if (ratio > 0.3) {
          setActiveStatusIndex(1);
        }

        if (ratio >= 1) {
          clearInterval(progressInterval);
          setProgress(99);
          setState(INTRO_STATES.ALERT);
        }
      }, 40);

      return () => clearInterval(progressInterval);
    }

    // 2. ALERT (2400ms to 4400ms, 2000ms duration): "LARPER DETECTED" banner slides in above
    if (state === INTRO_STATES.ALERT) {
      playAlarm();
      const timer = setTimeout(() => {
        setState(INTRO_STATES.TURN_GREEN);
      }, TIMINGS.ALERT_DURATION);
      return () => clearTimeout(timer);
    }

    // 3. TURN_GREEN (4400ms to 5600ms, 1200ms duration): Banner & bar turn green, 3x soft green wash, VERIFIED
    if (state === INTRO_STATES.TURN_GREEN) {
      playDing(587, 880);
      const timer = setTimeout(() => {
        setState(INTRO_STATES.COMPLETE);
      }, TIMINGS.TURN_GREEN_DURATION);
      return () => clearTimeout(timer);
    }

    // 4. COMPLETE (5600ms to 6400ms, 800ms duration): Snaps to 100% with flash, clears loader & banner
    if (state === INTRO_STATES.COMPLETE) {
      playDing(880, 1174);
      const timer = setTimeout(() => {
        setState(INTRO_STATES.TYPE_LOGO);
      }, TIMINGS.COMPLETE_DURATION);
      return () => clearTimeout(timer);
    }
  }, [state, alreadySeen, isReducedMotion, playTick, playAlarm, playDing]);

  // 5. TYPE_LOGO (6.4s to 8.8s): LARPER OR CODER letter-by-letter in real logo style
  useEffect(() => {
    if (alreadySeen || isReducedMotion || state !== INTRO_STATES.TYPE_LOGO) return;

    const fullTop = 'LARPER';
    const fullBottom = 'CODER';

    let topIndex = 0;
    const typeTopInterval = setInterval(() => {
      topIndex++;
      setTypedTop(fullTop.slice(0, topIndex));
      playKeyClick();

      if (topIndex >= fullTop.length) {
        clearInterval(typeTopInterval);

        // Reveal middle slanted tag & brackets
        setTimeout(() => {
          setShowTag(true);
          setTagText('OR');
          playKeyClick();

          // Type bottom row CODER
          let bottomIndex = 0;
          const typeBottomInterval = setInterval(() => {
            bottomIndex++;
            setTypedBottom(fullBottom.slice(0, bottomIndex));
            playKeyClick();

            if (bottomIndex >= fullBottom.length) {
              clearInterval(typeBottomInterval);

              // Hold for 1 second, then swap to presenter
              setTimeout(() => {
                setState(INTRO_STATES.SWAP);
              }, TIMINGS.HOLD_LOGO);
            }
          }, TIMINGS.TYPE_CHAR_SPEED);
        }, 180);
      }
    }, TIMINGS.TYPE_CHAR_SPEED);

    return () => clearInterval(typeTopInterval);
  }, [state, alreadySeen, isReducedMotion, playKeyClick]);

  // 6. SWAP (8.8s to 11.0s): Backspaces logo, then types PRESENTED BY CELESTIUS in exact same style
  useEffect(() => {
    if (alreadySeen || isReducedMotion || state !== INTRO_STATES.SWAP) return;

    const fullPresenterTop = 'PRESENTED';
    const fullPresenterBottom = PRESENTER_NAME;

    // Step A: Backspace CODER
    let coderCount = 'CODER'.length;
    const backspaceBottom = setInterval(() => {
      coderCount--;
      setTypedBottom((prev) => prev.slice(0, Math.max(0, coderCount)));
      playKeyClick();

      if (coderCount <= 0) {
        clearInterval(backspaceBottom);

        // Step B: Backspace LARPER
        let larperCount = 'LARPER'.length;
        const backspaceTop = setInterval(() => {
          larperCount--;
          setTypedTop((prev) => prev.slice(0, Math.max(0, larperCount)));
          playKeyClick();

          if (larperCount <= 0) {
            clearInterval(backspaceTop);
            setShowTag(false);

            // Step C: Type PRESENTED
            let pTopIdx = 0;
            const typePresentTop = setInterval(() => {
              pTopIdx++;
              setTypedTop(fullPresenterTop.slice(0, pTopIdx));
              playKeyClick();

              if (pTopIdx >= fullPresenterTop.length) {
                clearInterval(typePresentTop);

                // Reveal middle tag with BY
                setTimeout(() => {
                  setTagText('BY');
                  setShowTag(true);
                  playKeyClick();

                  // Step D: Type CELESTIUS
                  let pBottomIdx = 0;
                  const typePresentBottom = setInterval(() => {
                    pBottomIdx++;
                    setTypedBottom(fullPresenterBottom.slice(0, pBottomIdx));
                    playKeyClick();

                    if (pBottomIdx >= fullPresenterBottom.length) {
                      clearInterval(typePresentBottom);

                      // Hold 1.0s, then AUTO ENTER (about 11.0s total)
                      setTimeout(() => {
                        dismiss();
                      }, TIMINGS.HOLD_SWAP);
                    }
                  }, TIMINGS.TYPE_CHAR_SPEED);
                }, 160);
              }
            }, TIMINGS.TYPE_CHAR_SPEED);
          }
        }, TIMINGS.BACKSPACE_SPEED);
      }
    }, TIMINGS.BACKSPACE_SPEED);

    return () => clearInterval(backspaceBottom);
  }, [state, alreadySeen, isReducedMotion, playKeyClick, dismiss]);

  if (alreadySeen) {
    return null;
  }

  const isGreenPhase = state === INTRO_STATES.TURN_GREEN || state === INTRO_STATES.COMPLETE;
  const isLoaderVisible =
    state === INTRO_STATES.LOADING ||
    state === INTRO_STATES.ALERT ||
    state === INTRO_STATES.TURN_GREEN ||
    state === INTRO_STATES.COMPLETE;
  const showAlert = state === INTRO_STATES.ALERT || state === INTRO_STATES.TURN_GREEN;
  const isLogoStage = state === INTRO_STATES.TYPE_LOGO || state === INTRO_STATES.SWAP;

  // Segment count calculation (snaps to 100% on complete)
  const displayProgress = state === INTRO_STATES.COMPLETE ? 100 : progress;
  const activeSegmentsCount = Math.floor((displayProgress / 100) * TOTAL_SEGMENTS);

  // Screen reader text announcement derived directly from state
  const liveAnnouncement = (() => {
    switch (state) {
      case INTRO_STATES.LOADING:
        return 'Loading scanner...';
      case INTRO_STATES.ALERT:
        return 'Alert: Larper Detected';
      case INTRO_STATES.TURN_GREEN:
        return 'Verified';
      case INTRO_STATES.TYPE_LOGO:
        return 'LARPER OR CODER';
      case INTRO_STATES.SWAP:
        return `Presented by ${PRESENTER_NAME}`;
      default:
        return '';
    }
  })();

  return (
    <div
      className={`${styles.overlay} ${state === INTRO_STATES.AUTO_ENTER ? styles.fadingOut : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Story Introduction"
    >
      {/* Background canvas for floating code glyphs */}
      {!isReducedMotion && <canvas ref={canvasRef} className={styles.particleCanvas} />}

      {/* Full-screen soft green wash on VERIFIED cut */}
      {state === INTRO_STATES.TURN_GREEN && !isReducedMotion && (
        <div className={styles.greenWash} aria-hidden="true" />
      )}

      {/* Screen reader live updates */}
      <div className="sr-only" aria-live="polite">
        {liveAnnouncement}
      </div>

      {/* Top Controls: Sound Toggle (Top Left) & Skip Button (Top Right) */}
      <div className={styles.topControls}>
        <button
          type="button"
          className={`${styles.soundButton} ${soundEnabled ? styles.soundActive : ''}`}
          onClick={toggleSound}
          aria-label={soundEnabled ? 'Disable intro audio' : 'Enable intro audio'}
        >
          {soundEnabled ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>

        <button
          ref={skipBtnRef}
          type="button"
          className={styles.skipButton}
          onClick={dismiss}
          aria-label="Skip intro to site"
        >
          SKIP
        </button>
      </div>

      {/* Center Stage */}
      <div className={styles.stage}>
        {/* Sequence Part 1 - 4: Loader + Alert Banner */}
        {isLoaderVisible && (
          <div className={`${styles.loaderArea} ${state === INTRO_STATES.COMPLETE ? styles.clearing : ''}`}>
            {/* ALERT BANNER - Slides in ABOVE the loader */}
            {showAlert && (
              <div
                className={`${styles.alertBanner} ${
                  state === INTRO_STATES.TURN_GREEN ? styles.alertBannerGreen : ''
                }`}
              >
                <div className={styles.hazardStripes} />
                <div className={styles.alertContent}>
                  <span className={styles.alertIcon}>
                    {state === INTRO_STATES.TURN_GREEN ? '✓' : '⚠️'}
                  </span>
                  <span className={styles.alertText}>
                    {state === INTRO_STATES.TURN_GREEN ? 'VERIFIED' : 'LARPER DETECTED'}
                  </span>
                </div>
                <div className={styles.hazardStripes} />
              </div>
            )}

            {/* Very Large Percentage Counter */}
            <div className={`${styles.counterRow} ${isGreenPhase ? styles.greenText : ''}`}>
              <span>{displayProgress}</span>
              <span className={styles.counterPercent}>%</span>
            </div>

            {/* Thick Segmented Bar made of small blocks */}
            <div
              className={`${styles.segmentedBar} ${isGreenPhase ? styles.greenMode : ''}`}
              aria-label="System verification progress"
            >
              {Array.from({ length: TOTAL_SEGMENTS }).map((_, idx) => {
                const isFilled = idx < activeSegmentsCount;
                const isTip = idx === activeSegmentsCount && displayProgress < 100;
                return (
                  <div
                    key={idx}
                    className={`${styles.segmentBlock} ${isFilled ? styles.filled : ''} ${
                      isTip ? styles.tip : ''
                    }`}
                  />
                );
              })}
            </div>

            {/* Status Lines Console */}
            <div className={styles.statusConsole}>
              <div className={styles.statusLine}>
                <span className={styles.statusPrompt}>&gt;</span>
                <span>{STATUS_LINES[activeStatusIndex]}</span>
              </div>
            </div>
          </div>
        )}

        {/* Sequence Part 5 & 6: Real Logo Typing & Swap Scene */}
        {isLogoStage && (
          <div className={styles.logoContainer} aria-live="polite">
            {/* Top Row: LARPER (orange) or PRESENTED (cream) */}
            <div
              className={`${styles.logoRowTop} ${
                state === INTRO_STATES.TYPE_LOGO ? styles.larperColor : styles.presentedColor
              }`}
            >
              {typedTop}
            </div>

            {/* Middle Row: Brackets, Dashed Lines, Checkers, and Slanted Tag */}
            {showTag && (
              <div className={styles.logoRowMiddle}>
                <span className={styles.bracketLeft}>[--</span>
                <span className={styles.checkerBox} />
                <span className={styles.dashedLine} />
                <div className={styles.slantedBadge}>
                  <span className={styles.badgeText}>{tagText}</span>
                </div>
                <span className={styles.dashedLine} />
                <span className={styles.checkerBox} />
                <span className={styles.bracketRight}>--]</span>
              </div>
            )}

            {/* Bottom Row: CODER (cream) or CELESTIUS (orange) + Yellow Underscore Cursor */}
            <div
              className={`${styles.logoRowBottom} ${
                state === INTRO_STATES.TYPE_LOGO ? styles.coderColor : styles.celestiusColor
              }`}
            >
              <span>{typedBottom}</span>
              <span className={styles.cursorUnderscore} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
