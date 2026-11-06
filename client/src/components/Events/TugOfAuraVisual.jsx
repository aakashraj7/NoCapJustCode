// client/src/components/Events/TugOfAuraVisual.jsx
import React, { useState } from 'react';
import styles from './Events.module.css';

export default function TugOfAuraVisual() {
  // Kinetic force position: -50 (full Omega) to +50 (full Alpha), default 0 (balanced)
  const [force, setForce] = useState(6);

  const pullAlpha = () => setForce((prev) => Math.min(prev + 12, 45));
  const pullOmega = () => setForce((prev) => Math.max(prev - 12, -45));
  const reset = () => setForce(0);

  // Position percentage: 0% = Omega edge, 50% = Center, 100% = Alpha edge
  const positionPct = 50 + force;

  return (
    <div className={styles.tugContainer}>
      <div className={styles.tugHeader}>
        <span className={styles.tugBadge}>ROUND 1 SIMULATION</span>
        <span className={styles.tugLabel}>Live Kinetic Force Engine</span>
      </div>

      {/* Teams Indicator */}
      <div className={styles.teamsRow}>
        <div className={`${styles.teamCol} ${styles.teamOmega}`}>
          <span className={styles.teamTag}>[TEAM OMEGA]</span>
          <span className={styles.teamStatus}>{force < 0 ? 'Surging' : 'Defending'}</span>
        </div>
        <div className={styles.ropeCenterPin}>CENTER</div>
        <div className={`${styles.teamCol} ${styles.teamAlpha}`}>
          <span className={styles.teamTag}>[TEAM ALPHA]</span>
          <span className={styles.teamStatus}>{force > 0 ? 'Surging' : 'Defending'}</span>
        </div>
      </div>

      {/* The Digital Rope Bar */}
      <div className={styles.ropeTrack} aria-label="Digital Tug of War Track">
        <div className={styles.ropeCenterMarker} />
        {/* Kinetic Marker Node */}
        <div
          className={styles.ropeKnot}
          style={{ left: `${positionPct}%` }}
        >
          <div className={styles.knotPulse} />
          <span className={styles.knotFlag}>FORCE</span>
        </div>
      </div>

      {/* Controls to demonstrate the dynamic force */}
      <div className={styles.tugControls}>
        <button type="button" className={styles.tugActionBtn} onClick={pullOmega}>
          &larr; Omega Solve (+force)
        </button>
        <button type="button" className={styles.tugResetBtn} onClick={reset}>
          Reset
        </button>
        <button type="button" className={styles.tugActionBtn} onClick={pullAlpha}>
          Alpha Solve (+force) &rarr;
        </button>
      </div>
      <p className={styles.tugFootnote}>
        Every accepted challenge exerts Kinetic Force pulling the center marker toward your team.
      </p>
    </div>
  );
}
