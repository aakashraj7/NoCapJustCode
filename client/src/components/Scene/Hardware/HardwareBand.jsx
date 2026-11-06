// client/src/components/Scene/Hardware/HardwareBand.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { OPACITY } from '../hardwareConfig.js';

import Cpu from './Cpu.jsx';
import Gpu from './Gpu.jsx';
import M2Ssd from './M2Ssd.jsx';
import MotherboardFragment from './MotherboardFragment.jsx';
import Monitor from './Monitor.jsx';
import Keyboard from './Keyboard.jsx';
import Mouse from './Mouse.jsx';
import UsbDrive from './UsbDrive.jsx';
import Laptop from './Laptop.jsx';
import RamStick from './RamStick.jsx';

/**
 * HardwareBand: In-flow circuit bus divider between sections.
 * Full width, height clamp(120px, 15vw, 240px).
 * Thin PCB-style trace with traveling pulse animation.
 * Exactly 3 pieces on laptop, 2 on phone.
 * Mixes:
 * - hero-about: keyboard, CPU, SSD
 * - about-schedule: RAM, GPU, board
 * - schedule-events: monitor, mouse, USB
 * - events-footer: laptop, CPU
 */
export default function HardwareBand({ variant = 'hero-about', className = '' }) {
  const creamTrace = `rgba(247, 237, 216, ${OPACITY.trace})`;
  const orangePulse = `rgba(242, 107, 58, ${OPACITY.tracePulse})`;

  const renderPieces = () => {
    switch (variant) {
      case 'hero-about':
        return (
          <>
            <Keyboard width={160} height={60} floatVariant="A" />
            <div className={styles.desktopOnlyPiece}>
              <Cpu width={86} height={86} floatVariant="B" />
            </div>
            <M2Ssd width={120} height={38} floatVariant="C" />
          </>
        );

      case 'about-schedule':
        return (
          <>
            <RamStick width={138} height={40} floatVariant="B" />
            <Gpu width={170} height={75} floatVariant="A" />
            <div className={styles.desktopOnlyPiece}>
              <MotherboardFragment width={88} height={88} floatVariant="C" />
            </div>
          </>
        );

      case 'schedule-events':
        return (
          <>
            <Monitor width={150} height={118} floatVariant="C" />
            <div className={styles.desktopOnlyPiece}>
              <Mouse width={56} height={84} floatVariant="A" />
            </div>
            <UsbDrive width={84} height={40} floatVariant="B" />
          </>
        );

      case 'events-footer':
      default:
        return (
          <>
            <Laptop width={180} height={112} floatVariant="A" />
            <Cpu width={86} height={86} floatVariant="B" />
          </>
        );
    }
  };

  return (
    <div
      className={`${styles.hardwareBand} ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {/* Background Circuit Bus Traces (cream at 0.14, orange pulse at 0.5, via dots <= 3px) */}
      <svg
        className={styles.bandCircuitSvg}
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Base Trace */}
        <path
          d="M 0 90 L 180 90 L 220 50 L 520 50 L 560 90 L 860 90 L 900 130 L 1220 130 L 1260 90 L 1440 90"
          stroke={creamTrace}
          strokeWidth="1.6"
        />

        {/* Parallel Secondary Trace */}
        <path
          d="M 0 110 L 160 110 L 200 70 L 500 70 L 540 110 L 840 110 L 880 150 L 1200 150 L 1240 110 L 1440 110"
          stroke="rgba(247, 237, 216, 0.08)"
          strokeWidth="1.2"
        />

        {/* Traveling Glowing Pulse along Primary Trace */}
        <path
          d="M 0 90 L 180 90 L 220 50 L 520 50 L 560 90 L 860 90 L 900 130 L 1220 130 L 1260 90 L 1440 90"
          stroke={orangePulse}
          strokeWidth="2.2"
          strokeLinecap="round"
          className={styles.pulseTrace}
        />

        {/* Traveling pulse on secondary trace */}
        <path
          d="M 0 110 L 160 110 L 200 70 L 500 70 L 540 110 L 840 110 L 880 150 L 1200 150 L 1240 110 L 1440 110"
          stroke={orangePulse}
          strokeWidth="1.8"
          strokeLinecap="round"
          className={styles.pulseTraceFast}
        />

        {/* PCB Via Dots (r=1.5 => diameter 3px, no dark patches) */}
        {[
          [180, 90],
          [220, 50],
          [520, 50],
          [560, 90],
          [860, 90],
          [900, 130],
          [1220, 130],
          [1260, 90],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill={orangePulse} />
        ))}
      </svg>

      <div className={styles.bandContainer}>
        <div className={styles.bandItemsWrapper}>
          {renderPieces()}
        </div>
      </div>
    </div>
  );
}
