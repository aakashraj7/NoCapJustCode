// client/src/components/Scene/Hardware/HardwareBand.jsx
import React from 'react';
import styles from './Hardware.module.css';

import Cpu from './Cpu.jsx';
import Gpu from './Gpu.jsx';
import CaseFan from './CaseFan.jsx';
import M2Ssd from './M2Ssd.jsx';
import MotherboardFragment from './MotherboardFragment.jsx';
import Monitor from './Monitor.jsx';
import Keyboard from './Keyboard.jsx';
import Mouse from './Mouse.jsx';
import UsbDrive from './UsbDrive.jsx';
import Sbc from './Sbc.jsx';
import Laptop from './Laptop.jsx';
import RamStick from './RamStick.jsx';

/**
 * HardwareBand: In-flow circuit bus divider between sections.
 * Full width, height clamp(120px, 15vw, 240px).
 * Thin PCB-style trace runs through the band with glowing traveling pulse animation.
 * Different mix of 4-6 hardware pieces per band.
 */
export default function HardwareBand({ variant = 'hero-about', className = '' }) {
  const creamFaint = 'rgba(247, 237, 216, 0.2)';
  const orange = '#F26B3A';
  const yellow = '#F8BB3A';

  const renderPieces = () => {
    switch (variant) {
      case 'hero-about':
        return (
          <>
            <Cpu width={80} height={80} floatVariant="A" />
            <Gpu width={170} height={75} floatVariant="B" />
            <CaseFan width={75} height={75} floatVariant="C" />
            <M2Ssd width={115} height={36} floatVariant="A" />
            <MotherboardFragment width={85} height={85} floatVariant="B" />
          </>
        );

      case 'about-schedule':
        return (
          <>
            <Monitor width={145} height={115} floatVariant="B" />
            <Keyboard width={155} height={58} floatVariant="A" />
            <Mouse width={45} height={64} floatVariant="C" />
            <UsbDrive width={65} height={32} floatVariant="B" />
            <Sbc width={105} height={72} floatVariant="A" />
          </>
        );

      case 'schedule-events':
        return (
          <>
            <Laptop width={175} height={110} floatVariant="C" />
            <RamStick width={145} height={42} floatVariant="A" />
            <Cpu width={80} height={80} floatVariant="B" />
            <M2Ssd width={115} height={36} floatVariant="C" />
            <CaseFan width={75} height={75} floatVariant="A" />
          </>
        );

      case 'events-footer':
      default:
        return (
          <>
            <Gpu width={165} height={72} floatVariant="A" />
            <MotherboardFragment width={85} height={85} floatVariant="C" />
            <Keyboard width={150} height={56} floatVariant="B" />
            <UsbDrive width={65} height={32} floatVariant="A" />
            <Monitor width={140} height={110} floatVariant="C" />
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
      {/* Background Circuit Bus Traces */}
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
          stroke={creamFaint}
          strokeWidth="1.8"
        />

        {/* Parallel Secondary Trace */}
        <path
          d="M 0 110 L 160 110 L 200 70 L 500 70 L 540 110 L 840 110 L 880 150 L 1200 150 L 1240 110 L 1440 110"
          stroke="rgba(247, 237, 216, 0.1)"
          strokeWidth="1.2"
        />

        {/* Traveling Glowing Pulse along Primary Trace */}
        <path
          d="M 0 90 L 180 90 L 220 50 L 520 50 L 560 90 L 860 90 L 900 130 L 1220 130 L 1260 90 L 1440 90"
          stroke={orange}
          strokeWidth="2.5"
          strokeLinecap="round"
          className={styles.pulseTrace}
        />

        {/* Second traveling pulse with phase offset */}
        <path
          d="M 0 110 L 160 110 L 200 70 L 500 70 L 540 110 L 840 110 L 880 150 L 1200 150 L 1240 110 L 1440 110"
          stroke={yellow}
          strokeWidth="2"
          strokeLinecap="round"
          className={styles.pulseTraceFast}
        />

        {/* PCB Via Dots at Corners */}
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
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="#0B0B0D" stroke={creamFaint} strokeWidth="1.5" />
            <circle cx={x} cy={y} r="1.5" fill={orange} />
          </g>
        ))}
      </svg>

      {/* Hardware Pieces Content */}
      <div className={styles.bandContainer}>
        <div className={styles.bandItemsWrapper}>{renderPieces()}</div>
      </div>
    </div>
  );
}
