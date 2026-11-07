// client/src/components/Intro/Intro.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Intro.module.css';
import ImageTypewriter from './ImageTypewriter.jsx';
import logoTypingImg from '../../assets/intro/logo-typing.png';
import presentedTypingImg from '../../assets/intro/presented-typing.png';
import { logTimelineEvent } from '../../utils/timelineLogger.js';
import {
  INTRO_STATES,
  PRESENTER_NAME,
  TIMINGS,
  TOTAL_SEGMENTS,
  STATUS_LINE_LOADING,
  PARTICLES_PHONE,
  PARTICLES_TABLET,
  PARTICLES_DESKTOP,
  SESSION_KEYS,
  LOGO_REVEAL_BOXES,
  PRESENTED_REVEAL_BOXES,
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

  // Sound enabled state: default ON on desktop, OFF on mobile/tablet unless user has a stored preference
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEYS.SOUND_ENABLED);
      if (stored !== null) {
        return stored === 'true';
      }
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;
      }
      return false;
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

  // Logo typing states: active brand image & number of revealed boxes
  const [activeLogo, setActiveLogo] = useState(() => (isReducedMotion ? 'presented' : 'logo'));
  const [revealedCount, setRevealedCount] = useState(() =>
    isReducedMotion ? PRESENTED_REVEAL_BOXES.length : 0
  );

  const skipBtnRef = useRef(null);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const animationFrameRef = useRef(null);
  const containerRef = useRef(null);
  const initialRectRef = useRef(null);

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

  // Timeline event tracking
  const prevStateRef = useRef(null);
  useEffect(() => {
    if (alreadySeen) return;
    if (prevStateRef.current === null) {
      logTimelineEvent('intro start');
      logTimelineEvent(`phase: ${state}`);
      prevStateRef.current = state;
    } else if (prevStateRef.current !== state) {
      logTimelineEvent(`phase: ${state}`);
      prevStateRef.current = state;
    }
  }, [state, alreadySeen]);

  // Layout Invariant Verification (verifies getBoundingClientRect stays constant within subpixels)
  useEffect(() => {
    if (containerRef.current && (state === INTRO_STATES.TYPE_LOGO || state === INTRO_STATES.SWAP)) {
      const rect = containerRef.current.getBoundingClientRect();
      if (!initialRectRef.current) {
        initialRectRef.current = { width: rect.width, height: rect.height };
      } else {
        const dw = Math.abs(rect.width - initialRectRef.current.width);
        const dh = Math.abs(rect.height - initialRectRef.current.height);
        if (dw > 2.0 || dh > 2.0) {
          console.warn(`[Intro] Container size shifted: delta w=${dw.toFixed(2)}, h=${dh.toFixed(2)}`);
        }
      }
    }
  }, [state, activeLogo, revealedCount]);

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

  // Autoplay handler: on desktop, try immediate resume; if browser suspends, unlock on first user gesture
  useEffect(() => {
    if (!soundEnabled) return;

    const ctx = getAudioCtx();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});

      const unlockAudio = () => {
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }
      };

      const events = ['click', 'keydown', 'pointerdown', 'touchstart'];
      events.forEach((evt) => window.addEventListener(evt, unlockAudio, { once: true, passive: true }));

      return () => {
        events.forEach((evt) => window.removeEventListener(evt, unlockAudio));
      };
    }
  }, [soundEnabled, getAudioCtx]);

  const cleanupAudio = useCallback(() => {
    if (audioCtxRef.current) {
      try {
        if (audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close().catch(() => {});
        }
      } catch {
        // Audio safety
      }
      audioCtxRef.current = null;
    }
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, [cleanupAudio]);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      const ctx = getAudioCtx();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend().catch(() => {});
      }
    }
    try {
      sessionStorage.setItem(SESSION_KEYS.SOUND_ENABLED, String(nextState));
    } catch {
      // Storage safety
    }
  };

  // Dismiss intro immediately and transition to splash (no extra delay, no seen flag here)
  const dismiss = useCallback(() => {
    cleanupAudio();
    onComplete?.();
  }, [onComplete, cleanupAudio]);

  const handleSkip = useCallback(() => {
    cleanupAudio();
    logTimelineEvent('skip pressed');
    dismiss();
  }, [dismiss, cleanupAudio]);

  // Keyboard shortcut listener (Enter, Escape)
  useEffect(() => {
    if (alreadySeen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault();
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [alreadySeen, handleSkip]);

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

    // Strict viewport-based particle counts: Phone (36), Tablet (54), Desktop (72)
    const calculateParticles = (w, h) => {
      let count = PARTICLES_PHONE;
      let scale = 1.0;
      if (w >= 1200) {
        count = PARTICLES_DESKTOP;
        scale = 1.12;
      } else if (w >= 768) {
        count = PARTICLES_TABLET;
        scale = 1.0;
      }

      return Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vy: 0.28 + Math.random() * 0.45,
        char: glyphs[Math.floor(Math.random() * glyphs.length)],
        size: Math.round((12 + Math.random() * 4) * scale),
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

  // Main state sequence controller (Phases 1 - 4)
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

  // 5. TYPE_LOGO (6.3s to 8.7s): LARPER OR CODER letter-by-letter image reveal
  useEffect(() => {
    if (alreadySeen || isReducedMotion || state !== INTRO_STATES.TYPE_LOGO) return;

    let count = 0;
    const total = LOGO_REVEAL_BOXES.length; // 13 boxes

    const interval = setInterval(() => {
      count++;
      setRevealedCount(count);
      playKeyClick();

      if (count >= total) {
        clearInterval(interval);
        // Hold 1.0s, then proceed to backspace / swap
        setTimeout(() => {
          setState(INTRO_STATES.SWAP);
        }, TIMINGS.HOLD_LOGO);
      }
    }, TIMINGS.TYPE_STEP_SPEED);

    return () => clearInterval(interval);
  }, [state, alreadySeen, isReducedMotion, playKeyClick]);

  // 6. SWAP (8.7s to 11.0s): Reverse backspace of logo, then type PRESENTED BY CELESTIUS
  useEffect(() => {
    if (alreadySeen || isReducedMotion || state !== INTRO_STATES.SWAP) return;

    let current = LOGO_REVEAL_BOXES.length; // 13

    // Step A: Backspace logo boxes in reverse order (~30ms per step)
    const backspaceInterval = setInterval(() => {
      current--;
      setRevealedCount(Math.max(0, current));
      playKeyClick();

      if (current <= 0) {
        clearInterval(backspaceInterval);

        // Step B: Switch image immediately, log event, then type PRESENTED BY CELESTIUS
        setActiveLogo('presented');
        logTimelineEvent('swap: PRESENTED');
        let presCount = 0;
        const presTotal = PRESENTED_REVEAL_BOXES.length; // 20 boxes

        const typePresInterval = setInterval(() => {
          presCount++;
          setRevealedCount(presCount);
          playKeyClick();

          if (presCount >= presTotal) {
            clearInterval(typePresInterval);

            // Step C: Hold 0.5s, then immediately transition to Splash
            setTimeout(() => {
              dismiss();
            }, TIMINGS.HOLD_SWAP);
          }
        }, TIMINGS.TYPE_PRES_STEP_SPEED || 65);
      }
    }, TIMINGS.BACKSPACE_STEP_SPEED);

    return () => clearInterval(backspaceInterval);
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

  const activeBoxes = activeLogo === 'logo' ? LOGO_REVEAL_BOXES : PRESENTED_REVEAL_BOXES;
  const activeImgSrc = activeLogo === 'logo' ? logoTypingImg : presentedTypingImg;
  const activeAlt = activeLogo === 'logo' ? 'LARPER OR CODER' : `PRESENTED BY ${PRESENTER_NAME}`;

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
          onClick={handleSkip}
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

        {/* Sequence Part 5 & 6: EXACT BRAND LOGO TYPING & SWAP SCENE */}
        {isLogoStage && (
          <div ref={containerRef} className={styles.logoContainer} aria-live="polite">
            <ImageTypewriter
              imageSrc={activeImgSrc}
              boxes={activeBoxes}
              revealedCount={revealedCount}
              showActiveCursor={!isReducedMotion}
              isComplete={isReducedMotion}
              alt={activeAlt}
            />
          </div>
        )}
      </div>
    </div>
  );
}
