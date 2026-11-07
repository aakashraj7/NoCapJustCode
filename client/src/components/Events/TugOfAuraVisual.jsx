// client/src/components/Events/TugOfAuraVisual.jsx
import React, { useState, useCallback, useRef, memo } from 'react';
import styles from './Events.module.css';

function TugOfAuraVisual() {
  // Single source of truth: -100 (full Omega) to +100 (full Alpha), 0 at center
  const [value, setValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);

  // Convert value (-100 to +100) to percentage (0 to 100)
  const pct = (value + 100) / 2; // e.g. -100 -> 0%, 0 -> 50%, 100 -> 100%

  const pullOmega = useCallback(() => {
    setValue((prev) => Math.max(-100, prev - 10));
  }, []);

  const pullAlpha = useCallback(() => {
    setValue((prev) => Math.min(100, prev + 10));
  }, []);

  const reset = useCallback(() => {
    setValue(0);
  }, []);

  const omegaWon = value <= -100;
  const alphaWon = value >= 100;

  // Pointer drag and track click handling
  const handlePointerDown = (e) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);

    const updateFromClientX = (clientX) => {
      const rect = track.getBoundingClientRect();
      const ratio = (clientX - rect.left) / rect.width;
      const clampedRatio = Math.max(0, Math.min(1, ratio));
      const newVal = Math.round(clampedRatio * 200 - 100);
      setValue(newVal);
    };

    updateFromClientX(e.clientX);

    const onPointerMove = (moveEvt) => {
      updateFromClientX(moveEvt.clientX);
    };

    const onPointerUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setValue((prev) => Math.max(-100, prev - 10));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setValue((prev) => Math.min(100, prev + 10));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setValue(-100);
    } else if (e.key === 'End') {
      e.preventDefault();
      setValue(100);
    }
  };

  return (
    <div className={styles.tugCard}>
      {/* Header: "INTERACTIVE DEMO" */}
      <div className={styles.tugHeader}>
        <span className={styles.tugTitle}>INTERACTIVE DEMO</span>
      </div>

      {/* Labels row: "OMEGA" left and "ALPHA" right */}
      <div className={styles.tugLabelsRow}>
        <span className={styles.teamLabelOmega}>OMEGA</span>
        <span className={styles.teamLabelAlpha}>ALPHA</span>
      </div>

      {/* Track Container: Inset by half thumb width (14px) so 28px thumb never overflows track ends */}
      <div
        className={styles.ropeTrackContainer}
        onPointerDown={handlePointerDown}
      >
        <div
          ref={trackRef}
          className={`${styles.ropeTrack} ${isDragging ? styles.trackDragging : ''}`}
          style={{ '--pct': pct }}
        >
          {/* Center tick at 50% */}
          <div className={styles.centerTick} aria-hidden="true" />

          {/* Orange fill: starts at center (50%) and grows left or right exactly to the thumb center */}
          <div
            className={styles.ropeFill}
            style={
              value >= 0
                ? {
                    left: '50%',
                    width: `${pct - 50}%`,
                    borderRadius: '0 7px 7px 0',
                  }
                : {
                    left: `${pct}%`,
                    width: `${50 - pct}%`,
                    borderRadius: '7px 0 0 7px',
                  }
            }
            aria-hidden="true"
          />

          {/* Thumb marker: 28px circle centered at pct% */}
          <div
            className={styles.ropeMarker28}
            role="slider"
            tabIndex={0}
            aria-valuemin={-100}
            aria-valuemax={100}
            aria-valuenow={value}
            aria-label="Tug of Aura rope balance"
            onKeyDown={handleKeyDown}
            style={{
              left: `${pct}%`,
            }}
          />
        </div>
      </div>

      {/* Outcome text under the rope */}
      <div className={styles.ropeOutcomeRow} aria-live="polite">
        {omegaWon && <span className={styles.outcomeText}>Omega pulled it</span>}
        {alphaWon && <span className={styles.outcomeText}>Alpha pulled it</span>}
      </div>

      {/* Controls: Omega pulls & Alpha pulls */}
      <div className={styles.tugControlsGrid}>
        <button
          type="button"
          className={styles.pullBtn}
          onClick={pullOmega}
          disabled={omegaWon}
          aria-label="Omega pulls"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Omega pulls
        </button>

        <button
          type="button"
          className={styles.pullBtn}
          onClick={pullAlpha}
          disabled={alphaWon}
          aria-label="Alpha pulls"
        >
          Alpha pulls
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      {/* Centered Reset Button */}
      <div className={styles.resetRow}>
        <button
          type="button"
          className={styles.resetTextBtn}
          onClick={reset}
          aria-label="Reset position"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
          </svg>
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}

export default memo(TugOfAuraVisual);
