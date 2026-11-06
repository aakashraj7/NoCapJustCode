// client/src/components/Events/TugOfAuraVisual.jsx
import React, { useState, useCallback, memo } from 'react';
import styles from './Events.module.css';

function TugOfAuraVisual() {
  // Offset in percent: -50 (full Omega) to +50 (full Alpha), default 0 (centered)
  const [offset, setOffset] = useState(0);

  const pullOmega = useCallback(() => {
    setOffset((prev) => Math.max(prev - 12, -50));
  }, []);

  const pullAlpha = useCallback(() => {
    setOffset((prev) => Math.min(prev + 12, 50));
  }, []);

  const reset = useCallback(() => {
    setOffset(0);
  }, []);

  const omegaWon = offset <= -50;
  const alphaWon = offset >= 50;

  // Scale of orange fill from center: 0 to 1
  const fillScale = Math.abs(offset) / 50;
  const isLeft = offset < 0;

  return (
    <div className={styles.tugCard}>
      {/* Header: "INTERACTIVE DEMO" (mono 11.5px, orange), nothing on the right */}
      <div className={styles.tugHeader}>
        <span className={styles.tugTitle}>INTERACTIVE DEMO</span>
      </div>

      {/* Labels row: "OMEGA" left and "ALPHA" right (mono 13px cream, no brackets), 14px above rope */}
      <div className={styles.tugLabelsRow}>
        <span className={styles.teamLabelOmega}>OMEGA</span>
        <span className={styles.teamLabelAlpha}>ALPHA</span>
      </div>

      {/* Rope: 14px-tall rounded bar with center tick */}
      <div className={styles.ropeTrack} aria-label="Digital Tug of War Track">
        {/* Center tick: 2px, cream 0.35, taller than the bar */}
        <div className={styles.centerTick} aria-hidden="true" />

        {/* Orange fill growing from center toward winner using transform: scaleX */}
        <div
          className={`${styles.ropeFill} ${isLeft ? styles.fillOriginLeft : styles.fillOriginRight}`}
          style={{
            transform: `scaleX(${fillScale})`,
          }}
          aria-hidden="true"
        />

        {/* Marker: 28px circle moving by transform: translateX */}
        <div
          className={styles.ropeMarker28}
          style={{
            transform: `translateX(calc(-50% + ${offset * 2.8}px))`,
          }}
          aria-label={`Rope position: ${offset}%`}
        />
      </div>

      {/* Outcome text under the rope when an end is reached */}
      <div className={styles.ropeOutcomeRow} aria-live="polite">
        {omegaWon && <span className={styles.outcomeText}>Omega pulled it</span>}
        {alphaWon && <span className={styles.outcomeText}>Alpha pulled it</span>}
      </div>

      {/* Controls: 2-column grid, 12px gap, both buttons equal width, 52px tall, radius 14px */}
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

      {/* Below: Centered Reset text button (44px tap area, muted cream, underlined, rotate icon) */}
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
