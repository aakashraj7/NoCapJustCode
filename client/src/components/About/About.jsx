// client/src/components/About/About.jsx
import React from 'react';
import styles from './About.module.css';
import { eventData } from '../../data/event.js';
import Prop from '../Scene/Prop.jsx';

export default function About() {
  return (
    <section id="about" className={`section ${styles.aboutSection}`}>
      {/* Background Coding Props */}
      <Prop
        name="gitBranch"
        parallaxFactor={0.035}
        variant="fadeToLeft"
        style={{ top: '8%', right: '-6%', width: 'clamp(220px, 30vw, 480px)' }}
      />
      <Prop
        name="chip"
        parallaxFactor={-0.03}
        variant="fadeToRight"
        className="phoneHide"
        style={{ bottom: '4%', left: '-5%', width: 'clamp(190px, 25vw, 380px)' }}
      />

      <div className={`container ${styles.aboutContainer}`}>
        <div className={styles.aboutGrid}>
          {/* Left Text */}
          <div className={styles.textContent}>
            <div className="section-tag">
              // 01. ABOUT THE EVENT
            </div>
            <h2 className="section-title">
              Built for real problem solvers, not resume larpers.
            </h2>
            <p className={styles.description}>
              {eventData.name} is the flagship coding fixture of {eventData.edition}, presented by {eventData.presentedBy}.
              It brings together developers and competitive programmers who prefer writing clean, working algorithms over talking about them.
            </p>
            <p className={styles.subDescription}>
              From deep-dive conceptual workshops to live algorithmic battlegrounds, this is where theory gets tested under real pressure.
            </p>
          </div>

          {/* Right Neutral Stat Tiles */}
          <div className={styles.statsGrid}>
            {eventData.stats.map((stat, idx) => (
              <div key={idx} className={styles.statCard}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
