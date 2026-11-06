// client/src/components/Scene/Hardware/HeroCluster.jsx
import React from 'react';
import styles from './Hardware.module.css';

import Laptop from './Laptop.jsx';
import Keyboard from './Keyboard.jsx';
import Cpu from './Cpu.jsx';
import RamStick from './RamStick.jsx';
import M2Ssd from './M2Ssd.jsx';

/**
 * HeroCluster:
 * - Desktop/Laptop: Composed hardware scene in Hero's right column under the logo.
 *   Large laptop, keyboard in front, CPU, RAM and SSD around it, on circuit trace with strong halo.
 * - Phone: Full cluster positioned after the hero logo.
 */
export function HeroCluster({ isMobile = false }) {
  const creamFaint = 'rgba(247, 237, 216, 0.2)';
  const orange = '#F26B3A';

  if (isMobile) {
    return (
      <div className={styles.heroClusterMobile} aria-hidden="true">
        {/* Circuit Trace Background */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          viewBox="0 0 360 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 20 110 L 100 110 L 130 50 L 230 50 L 260 110 L 340 110" stroke={creamFaint} strokeWidth="1.6" />
          <path
            d="M 20 110 L 100 110 L 130 50 L 230 50 L 260 110 L 340 110"
            stroke={orange}
            strokeWidth="2.2"
            strokeLinecap="round"
            className={styles.pulseTrace}
          />
        </svg>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Cpu width={70} height={70} floatVariant="A" />
            <Laptop width={170} height={105} floatVariant="B" haloStrong />
            <M2Ssd width={100} height={32} floatVariant="C" />
          </div>
          <Keyboard width={160} height={60} floatVariant="A" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.heroClusterDesktop} aria-hidden="true">
      {/* Circuit Trace Background */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
        viewBox="0 0 540 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 20 160 L 110 160 L 150 70 L 390 70 L 430 160 L 520 160" stroke={creamFaint} strokeWidth="1.8" />
        <path d="M 50 240 L 170 240 L 210 280 L 330 280 L 370 240 L 490 240" stroke="rgba(247, 237, 216, 0.12)" strokeWidth="1.4" />
        {/* Pulse */}
        <path
          d="M 20 160 L 110 160 L 150 70 L 390 70 L 430 160 L 520 160"
          stroke={orange}
          strokeWidth="2.5"
          strokeLinecap="round"
          className={styles.pulseTrace}
        />
        <circle cx="110" cy="160" r="3.5" fill="#0B0B0D" stroke={orange} strokeWidth="1.5" />
        <circle cx="430" cy="160" r="3.5" fill="#0B0B0D" stroke={orange} strokeWidth="1.5" />
      </svg>

      {/* Composed Hardware Layers */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {/* Top Orbiting Components */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '92%', marginBottom: '-1.5rem' }}>
          <Cpu width={80} height={80} floatVariant="A" />
          <M2Ssd width={115} height={36} floatVariant="C" />
          <RamStick width={135} height={40} floatVariant="B" />
        </div>

        {/* Centerpiece Large Laptop */}
        <Laptop width={250} height={155} floatVariant="A" haloStrong />

        {/* Foreground Mechanical Keyboard */}
        <div style={{ marginTop: '-1.8rem', zIndex: 3 }}>
          <Keyboard width={210} height={76} floatVariant="B" />
        </div>
      </div>
    </div>
  );
}

/**
 * MobileTopHardwareStrip:
 * Rendered on phone (<768px) directly under the navbar and ABOVE "Presented by Celestius".
 * Height ~115px, 3 pieces on a circuit trace.
 */
export function MobileTopHardwareStrip() {
  const creamFaint = 'rgba(247, 237, 216, 0.2)';
  const orange = '#F26B3A';

  return (
    <div className={styles.mobileTopStrip} aria-hidden="true">
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 360 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0 58 L 100 58 L 130 32 L 230 32 L 260 58 L 360 58" stroke={creamFaint} strokeWidth="1.5" />
        <path
          d="M 0 58 L 100 58 L 130 32 L 230 32 L 260 58 L 360 58"
          stroke={orange}
          strokeWidth="2"
          strokeLinecap="round"
          className={styles.pulseTrace}
        />
        <circle cx="100" cy="58" r="3" fill="#0B0B0D" stroke={orange} strokeWidth="1.2" />
        <circle cx="260" cy="58" r="3" fill="#0B0B0D" stroke={orange} strokeWidth="1.2" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', padding: '0 1rem' }}>
        <Cpu width={64} height={64} floatVariant="A" />
        <M2Ssd width={110} height={34} floatVariant="B" />
        <RamStick width={120} height={36} floatVariant="C" />
      </div>
    </div>
  );
}
