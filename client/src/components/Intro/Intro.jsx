// client/src/components/Intro/Intro.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Intro.module.css';
import PixelText from './PixelText.jsx';
import {
  INTRO_STATES,
  PRESENTER_NAME,
  TIMINGS,
  COLORS,
  TOTAL_SEGMENTS,
  AREA_PER_PARTICLE,
  STATUS_LINE_LOADING,
  SESSION_KEYS,
  GLYPHS,
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

  // Sound enabled state (persisted in sessionStorage, OFF by default)
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

  // Logo typing states
  const [typedTop, setTypedTop] = useState(() => (isReducedMotion ? 'PRESENTED' : ''));
  const [showMiddleRow, setShowMiddleRow] = useState(() => isReducedMotion);
  const [middleTagText, setMiddleTagText] = useState(() => (isReducedMotion ? 'BY' : 'OR'));
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
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.018);
    } catch {
      // Audio safety
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
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(620, ctx.currentTime + 0.08);
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
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.38);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
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
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.012);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.015);
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

  // Canvas particle background with screen-scaled density & glyph size
  useEffect(() => {
    if (alreadySeen || isReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const glyphs = ['{', '}', '<', '/', '>', ';', '_', '0', '1'];

    // Derive particle count and size scaling from screen dimensions
    const calculateParticles = (w, h) => {
      const targetCount = Math.min(
        180,
        Math.max(24, Math.round((w * h) / AREA_PER_PARTICLE))
      );
      const scale = Math.min(1.8, Math.max(1.0, Math.min(w, 1200) / 400));
      return Array.from({ length: targetCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vy: 0.28 + Math.random() * 0.45,
        char: glyphs[Math.floor(Math.random() * glyphs.length)],
        size: Math.round((11 + Math.random() * 5) * scale),
        alpha: 0.06 + Math.random() * 0.04,
        isOrange: Math.random() > 0.45,
      }));
    };

    let particles = calculateParticles(canvas.width, canvas.height);

    const timerRef = { current: null };
    const handleResize = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          particles = calculateParticles(canvas.width, canvas.height);
        }
      }, 150);
    };
    window.addEventListener('resize', handleResize);

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
            ctx.fillStyle = `rgba(61, 220, 132, ${p.alpha * 1.3})`;
          } else if (p.isOrange) {
            ctx.fillStyle = `rgba(245, 117, 70, ${p.alpha})`;
          } else {
            ctx.fillStyle = `rgba(249, 237, 210, ${p.alpha})`;
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
      clearTimeout(timerRef.current);
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

        let target;
        if (ratio < 0.35) {
          target = Math.floor(ratio * 1.5 * 100);
        } else if (ratio < 0.6) {
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

        if (ratio >= 1) {
          clearInterval(progressInterval);
          setProgress(99);
          setState(INTRO_STATES.ALERT);
        }
      }, 40);

      return () => clearInterval(progressInterval);
    }

    // 2. ALERT (2400ms to 4400ms, 2000ms duration):
    // "LARPER DETECTED" banner appears above loader, 3x soft orange screen wash
    if (state === INTRO_STATES.ALERT) {
      playAlarm();
      const timer = setTimeout(() => {
        setState(INTRO_STATES.TURN_GREEN);
      }, TIMINGS.ALERT_DURATION);
      return () => clearTimeout(timer);
    }

    // 3. TURN_GREEN (4400ms to 5900ms, 1500ms duration):
    // In one cut: banner & handles & bar turn green (#3DDC84), 3x soft green wash.
    // Counter animates from 99% to 100% over the 1.5s window!
    if (state === INTRO_STATES.TURN_GREEN) {
      playDing(587, 880);
      const greenStartTime = performance.now();

      const greenInterval = setInterval(() => {
        const elapsed = performance.now() - greenStartTime;
        const ratio = Math.min(elapsed / TIMINGS.TURN_GREEN_DURATION, 1);
        if (ratio >= 0.85) {
          setProgress(100);
        }
      }, 50);

      const timer = setTimeout(() => {
        clearInterval(greenInterval);
        setProgress(100);
        setState(INTRO_STATES.COMPLETE);
      }, TIMINGS.TURN_GREEN_DURATION);

      return () => {
        clearInterval(greenInterval);
        clearTimeout(timer);
      };
    }

    // 4. COMPLETE (5900ms to 6300ms, 400ms hold at 100%):
    // Snaps to 100% with clean flash, 0.4s hold, clears loader & banner
    if (state === INTRO_STATES.COMPLETE) {
      playDing(880, 1174);
      const timer = setTimeout(() => {
        setState(INTRO_STATES.TYPE_LOGO);
      }, TIMINGS.COMPLETE_HOLD);
      return () => clearTimeout(timer);
    }
  }, [state, alreadySeen, isReducedMotion, playTick, playAlarm, playDing]);

  // 5. TYPE_LOGO (6.3s to 8.7s): LARPER OR CODER in exact real logo style
  useEffect(() => {
    if (alreadySeen || isReducedMotion || state !== INTRO_STATES.TYPE_LOGO) return;

    const fullTop = 'LARPER';
    const fullBottom = 'CODER';

    // Step A: Type LARPER on top line (cursor after last letter)
    let topIndex = 0;
    const typeTopInterval = setInterval(() => {
      topIndex++;
      setTypedTop(fullTop.slice(0, topIndex));
      playKeyClick();

      if (topIndex >= fullTop.length) {
        clearInterval(typeTopInterval);

        // Step B: Reveal middle row (tag OR, brackets, checkers, dashes)
        setTimeout(() => {
          setShowMiddleRow(true);
          setMiddleTagText('OR');
          playKeyClick();

          // Step C: Type bottom row CODER with cursor
          let bottomIndex = 0;
          const typeBottomInterval = setInterval(() => {
            bottomIndex++;
            setTypedBottom(fullBottom.slice(0, bottomIndex));
            playKeyClick();

            if (bottomIndex >= fullBottom.length) {
              clearInterval(typeBottomInterval);

              // Step D: Hold 1.0s, then swap
              setTimeout(() => {
                setState(INTRO_STATES.SWAP);
              }, TIMINGS.HOLD_LOGO);
            }
          }, TIMINGS.TYPE_CHAR_SPEED);
        }, 160);
      }
    }, TIMINGS.TYPE_CHAR_SPEED);

    return () => clearInterval(typeTopInterval);
  }, [state, alreadySeen, isReducedMotion, playKeyClick]);

  // 6. SWAP (8.7s to 11.0s): Backspaces logo, then types PRESENTED BY CELESTIUS in exact same style
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
            setShowMiddleRow(false);

            // Step C: Type PRESENTED
            let pTopIdx = 0;
            const typePresentTop = setInterval(() => {
              pTopIdx++;
              setTypedTop(fullPresenterTop.slice(0, pTopIdx));
              playKeyClick();

              if (pTopIdx >= fullPresenterTop.length) {
                clearInterval(typePresentTop);

                // Reveal middle row with BY
                setTimeout(() => {
                  setMiddleTagText('BY');
                  setShowMiddleRow(true);
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
                }, 150);
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

  // Segment count calculation
  const displayProgress = state === INTRO_STATES.COMPLETE ? 100 : progress;
  const activeSegmentsCount = Math.floor((displayProgress / 100) * TOTAL_SEGMENTS);

  // Derive which line has active cursor
  const isTopTarget = state === INTRO_STATES.TYPE_LOGO ? 'LARPER' : 'PRESENTED';
  const isBottomTarget = state === INTRO_STATES.TYPE_LOGO ? 'CODER' : PRESENTER_NAME;

  const showTopCursor = isLogoStage && (typedTop.length < isTopTarget.length || typedBottom.length === 0);
  const showBottomCursor = isLogoStage && typedTop.length === isTopTarget.length && typedBottom.length <= isBottomTarget.length;

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

      {/* ALERT PHASE: 3 soft orange blinks over ~1.0s (peak opacity 0.25) */}
      {state === INTRO_STATES.ALERT && !isReducedMotion && (
        <div className={styles.orangeWash} aria-hidden="true" />
      )}

      {/* GREEN PHASE: 3 soft green blinks over ~1.0s (peak opacity 0.28) */}
      {state === INTRO_STATES.TURN_GREEN && !isReducedMotion && (
        <div className={styles.greenWash} aria-hidden="true" />
      )}

      {/* 100% COMPLETE: Clean white flash on snap */}
      {state === INTRO_STATES.COMPLETE && !isReducedMotion && (
        <div className={styles.completeFlash} aria-hidden="true" />
      )}

      {/* Screen reader live updates - visually hidden with .srOnly */}
      <div className={styles.srOnly} aria-live="polite">
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
            {/* ALERT BANNER - Sits ABOVE the loader */}
            {showAlert && (
              <div className={styles.alertBannerWrapper}>
                <span className={styles.handleLeft} />
                <div
                  className={`${styles.alertBanner} ${
                    state === INTRO_STATES.TURN_GREEN ? styles.alertBannerGreen : ''
                  }`}
                >
                  <div className={styles.alertTitleRow}>
                    <span className={styles.alertText}>LARPER DETECTED</span>
                  </div>
                  <span className={styles.alertStatusSubline}>
                    {state === INTRO_STATES.TURN_GREEN
                      ? '> larper-scanner: cleared'
                      : '> larper-scanner: flagged'}
                  </span>
                </div>
                <span className={styles.handleRight} />
              </div>
            )}

            {/* Large Percentage Counter */}
            <div className={`${styles.counterRow} ${isGreenPhase ? styles.greenText : ''}`}>
              <span>{displayProgress}</span>
              <span className={styles.counterPercent}>%</span>
            </div>

            {/* Thick Segmented Bar with thinner 2px gaps & clean blocks */}
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

            {/* Single Muted Status Line under the bar */}
            <div className={styles.statusLineMuted}>
              {STATUS_LINE_LOADING}
            </div>
          </div>
        )}

        {/* Sequence Part 5 & 6: EXACT LOGO TYPING & SWAP SCENE (Matching logo.png) */}
        {isLogoStage && (
          <div className={styles.logoContainer} aria-live="polite">
            {/* ROW 1: TOP LINE ("LARPER" or "PRESENTED") */}
            <div className={styles.rowWrapper}>
              <PixelText
                text={typedTop}
                totalLength={state === INTRO_STATES.TYPE_LOGO ? 6 : 9}
                variant="chunky"
                color={state === INTRO_STATES.TYPE_LOGO ? COLORS.orange : COLORS.cream}
                gridColor={state === INTRO_STATES.TYPE_LOGO ? COLORS.orangeGrid : COLORS.creamGrid}
                echoColor={state === INTRO_STATES.TYPE_LOGO ? COLORS.orangeEcho : COLORS.creamEcho}
                showCursor={showTopCursor}
                cursorColor={COLORS.yellow}
              />
            </div>

            {/* ROW 2: MIDDLE ROW (SVG Brackets, Checkers, Dashes, and Slanted Parallelogram Tag) */}
            {showMiddleRow && (
              <div className={styles.rowWrapper}>
                <svg
                  className={styles.middleRowSvg}
                  viewBox="0 0 540 38"
                  aria-hidden="true"
                >
                  {/* Top-Left Rounded Bracket Corner (Open downward) */}
                  <path
                    d="M 12 36 L 12 16 Q 12 8 20 8 L 44 8"
                    stroke={COLORS.yellow}
                    strokeWidth="3.2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Orange Corner Accent */}
                  <rect x="22" y="6" width="18" height="4.5" fill={COLORS.orange} rx="1" />

                  {/* Left Dashed Yellow Line */}
                  <line
                    x1="50"
                    y1="8"
                    x2="185"
                    y2="8"
                    stroke={COLORS.yellow}
                    strokeWidth="2.5"
                    strokeDasharray="9 6"
                  />

                  {/* Left Checker Diamond Box */}
                  <g transform="translate(196, 2)">
                    <rect x="0" y="0" width="6" height="6" fill={COLORS.yellow} />
                    <rect x="6" y="0" width="6" height="6" fill={COLORS.cream} />
                    <rect x="0" y="6" width="6" height="6" fill={COLORS.cream} />
                    <rect x="6" y="6" width="6" height="6" fill={COLORS.yellow} />
                  </g>

                  {/* Slanted Cream Parallelogram Tag */}
                  <g>
                    <polygon
                      points="230,2 325,2 310,36 215,36"
                      fill={COLORS.cream}
                      stroke={COLORS.orange}
                      strokeWidth="2"
                    />
                    <polygon
                      points="234,5 321,5 307,33 220,33"
                      fill="none"
                      stroke={COLORS.yellow}
                      strokeWidth="1.2"
                    />
                    {/* Dark Pixel Text inside Tag ("OR" or "BY") */}
                    <g transform="translate(248, 8)">
                      {middleTagText.split('').map((char, cIdx) => {
                        const matrix = GLYPHS[char] || GLYPHS[' '];
                        const startX = cIdx * 20;
                        return matrix.map((rowStr, rIdx) =>
                          rowStr.split('').map((val, colIdx) => {
                            if (val !== '1') return null;
                            return (
                              <rect
                                key={`tag-cell-${cIdx}-${rIdx}-${colIdx}`}
                                x={startX + colIdx * 3}
                                y={rIdx * 3}
                                width={2.7}
                                height={2.7}
                                fill={COLORS.darkText}
                              />
                            );
                          })
                        );
                      })}
                    </g>
                  </g>

                  {/* Right Checker Diamond Box */}
                  <g transform="translate(336, 2)">
                    <rect x="0" y="0" width="6" height="6" fill={COLORS.yellow} />
                    <rect x="6" y="0" width="6" height="6" fill={COLORS.cream} />
                    <rect x="0" y="6" width="6" height="6" fill={COLORS.cream} />
                    <rect x="6" y="6" width="6" height="6" fill={COLORS.yellow} />
                  </g>

                  {/* Right Dashed Yellow Line */}
                  <line
                    x1="354"
                    y1="8"
                    x2="489"
                    y2="8"
                    stroke={COLORS.yellow}
                    strokeWidth="2.5"
                    strokeDasharray="9 6"
                  />

                  {/* Top-Right Rounded Bracket Corner (Open downward) */}
                  <path
                    d="M 495 8 L 519 8 Q 527 8 527 16 L 527 36"
                    stroke={COLORS.yellow}
                    strokeWidth="3.2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Orange Corner Accent */}
                  <rect x="499" y="6" width="18" height="4.5" fill={COLORS.orange} rx="1" />
                </svg>
              </div>
            )}

            {/* ROW 3: BOTTOM LINE ("CODER" or "CELESTIUS") */}
            <div className={styles.rowWrapper}>
              <PixelText
                text={typedBottom}
                totalLength={state === INTRO_STATES.TYPE_LOGO ? 5 : 9}
                variant="monoline"
                color={state === INTRO_STATES.TYPE_LOGO ? COLORS.cream : COLORS.orange}
                gridColor={state === INTRO_STATES.TYPE_LOGO ? COLORS.creamGrid : COLORS.orangeGrid}
                echoColor={state === INTRO_STATES.TYPE_LOGO ? COLORS.creamEcho : COLORS.orangeEcho}
                showCursor={showBottomCursor}
                cursorColor={COLORS.yellow}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
