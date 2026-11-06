// client/src/components/Scene/Hardware/HeroCluster.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { OPACITY } from '../hardwareConfig.js';

import Laptop from './Laptop.jsx';
import Cpu from './Cpu.jsx';
import RamStick from './RamStick.jsx';
import M2Ssd from './M2Ssd.jsx';

/**
 * HeroCluster:
 * - Desktop/Laptop: One LaptopHero with 2 supporting pieces (CPU, RAM) near it on the trace.
 * - Phone: One centered laptop (no cluster) after the hero logo, width clamp(220px, 62vw, 300px).
 */
export function HeroCluster({ isMobile = false }) {
  const creamTrace = `rgba(247, 237, 216, ${OPACITY.trace})`;
  const orangePulse = `rgba(242, 107, 58, ${OPACITY.tracePulse})`;

  if (isMobile) {
    return (
      <div className={styles.heroMobileLaptopWrapper} aria-hidden="true">
        <Laptop
          width={260}
          height={162}
          floatVariant="A"
          haloStrong
          isHero
          style={{ width: 'clamp(220px, 62vw, 300px)', height: 'auto', aspectRatio: '240 / 150' }}
        />
      </div>
    );
  }

  return (
    <div className={styles.heroClusterDesktop} aria-hidden="true">
      {/* Blended Circuit Trace (cream at 0.14, orange pulse at 0.5, via dots <= 3px) */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
        viewBox="0 0 520 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 20 120 L 110 120 L 140 60 L 380 60 L 410 120 L 500 120" stroke={creamTrace} strokeWidth="1.6" />
        <path
          d="M 20 120 L 110 120 L 140 60 L 380 60 L 410 120 L 500 120"
          stroke={orangePulse}
          strokeWidth="2.2"
          strokeLinecap="round"
          className={styles.pulseTrace}
        />
        {/* Via dots (r=1.5 => diameter 3px, no dark patches) */}
        <circle cx="110" cy="120" r="1.5" fill={orangePulse} />
        <circle cx="410" cy="120" r="1.5" fill={orangePulse} />
      </svg>

      {/* Composed Hardware Layers: Exactly Laptop + 2 Supporting pieces (CPU & RAM) */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 0.5rem' }}>
        <Cpu width={86} height={86} floatVariant="A" />
        <Laptop width={260} height={162} floatVariant="B" haloStrong isHero />
        <RamStick width={135} height={40} floatVariant="C" />
      </div>
    </div>
  );
}

/**
 * MobileTopHardwareStrip:
 * Rendered on phone (<768px) directly under the navbar and ABOVE "Presented by Celestius".
 * Height ~115px, exactly 3 pieces on a blended circuit trace.
 */
export function MobileTopHardwareStrip() {
  const creamTrace = `rgba(247, 237, 216, ${OPACITY.trace})`;
  const orangePulse = `rgba(242, 107, 58, ${OPACITY.tracePulse})`;

  return (
    <div className={styles.mobileTopStrip} aria-hidden="true">
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 360 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0 58 L 90 58 L 120 32 L 240 32 L 270 58 L 360 58" stroke={creamTrace} strokeWidth="1.4" />
        <path
          d="M 0 58 L 90 58 L 120 32 L 240 32 L 270 58 L 360 58"
          stroke={orangePulse}
          strokeWidth="2"
          strokeLinecap="round"
          className={styles.pulseTrace}
        />
        <circle cx="90" cy="58" r="1.5" fill={orangePulse} />
        <circle cx="270" cy="58" r="1.5" fill={orangePulse} />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', padding: '0 0.5rem' }}>
        <Cpu width={72} height={72} floatVariant="A" />
        <M2Ssd width={115} height={36} floatVariant="B" />
        <RamStick width={125} height={38} floatVariant="C" />
      </div>
    </div>
  );
}
