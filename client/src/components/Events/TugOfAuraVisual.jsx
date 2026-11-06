// client/src/components/Events/TugOfAuraVisual.jsx
import React, { useState } from 'react';
import styles from './Events.module.css';

export default function TugOfAuraVisual() {
  // Kinetic position offset: -45 (full Omega) to +45 (full Alpha), default 0
  const [offset, setOffset] = useState(0);

  const pullOmega = () => setOffset((prev) => Math.max(prev - 12, -45));
  const pullAlpha = () => setOffset((prev) => Math.min(prev + 12, 45));
  const reset = () => setOffset(0);

  // Position percentage along the rope track (0% to 100%, 50% is center)
  const positionPct = 50 + offset;

  return (
    <div className={styles.demoCard}>
      <div className={styles.demoHeader}>
        <span className={styles.demoLabel}>INTERACTIVE DEMO</span>
      </div>

      {/* Team names at the ends */}
      <div className={styles.teamsRow}>
        <span className={styles.teamOmega}>[TEAM OMEGA]</span>
        <span className={styles.teamAlpha}>[TEAM ALPHA]</span>
      </div>

      {/* Thick rounded rope bar with a marker */}
      <div className={styles.ropeTrack} aria-label="Digital Tug of War Track">
        <div className={styles.ropeCenterMark} />
        <div
          className={styles.ropeMarker}
          style={{ left: `${positionPct}%` }}
          aria-label={`Rope position: ${positionPct}%`}
        />
      </div>

      {/* Single row of 3 buttons on laptop; 2 on top row + Reset below on phone (all 48px tall) */}
      <div className={styles.demoControlsGrid}>
        <button
          type="button"
          className={`${styles.demoBtn} ${styles.btnOmega}`}
          onClick={pullOmega}
          aria-label="Omega solves"
        >
          Omega solves
        </button>
        <button
          type="button"
          className={`${styles.demoBtn} ${styles.btnReset}`}
          onClick={reset}
          aria-label="Reset position"
        >
          Reset
        </button>
        <button
          type="button"
          className={`${styles.demoBtn} ${styles.btnAlpha}`}
          onClick={pullAlpha}
          aria-label="Alpha solves"
        >
          Alpha solves
        </button>
      </div>
    </div>
  );
}
