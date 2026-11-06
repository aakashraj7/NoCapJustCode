// client/src/components/Events/MiniTugVisual.jsx
import React from 'react';
import styles from './Events.module.css';

export default function MiniTugVisual() {
  return (
    <div className={styles.miniTugWrapper} aria-hidden="true">
      <div className={styles.miniTugHeader}>
        <span className={styles.miniTugBadge}>DIGITAL TUG-OF-WAR</span>
        <span className={styles.miniTugAura}>KINETIC FORCE</span>
      </div>

      <div className={styles.miniTugTeams}>
        <span className={styles.miniTeamOmega}>[OMEGA]</span>
        <span className={styles.miniRopeCenter}>0.0</span>
        <span className={styles.miniTeamAlpha}>[ALPHA]</span>
      </div>

      <div className={styles.miniRopeTrack}>
        <div className={styles.miniCenterLine} />
        <div className={styles.miniRopeMarker}>
          <div className={styles.miniKnotGlow} />
          <span className={styles.miniKnotText}>⚡</span>
        </div>
      </div>

      <div className={styles.miniTugGrid}>
        <div className={styles.miniForceBarLeft} />
        <div className={styles.miniForceBarRight} />
      </div>
    </div>
  );
}
