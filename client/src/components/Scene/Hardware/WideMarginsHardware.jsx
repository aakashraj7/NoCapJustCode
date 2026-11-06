// client/src/components/Scene/Hardware/WideMarginsHardware.jsx
import React from 'react';
import styles from './Hardware.module.css';

import RamStick from './RamStick.jsx';
import Gpu from './Gpu.jsx';
import M2Ssd from './M2Ssd.jsx';
import Cpu from './Cpu.jsx';
import MotherboardFragment from './MotherboardFragment.jsx';

/**
 * WideMarginsHardware:
 * Displayed only at viewport >= 1600px in the margins outside the 1280px container.
 * Complete and uncropped pieces sized to free space with halos.
 */
export default function WideMarginsHardware() {
  return (
    <>
      {/* Left Margin */}
      <aside className={styles.wideMarginLeft} aria-hidden="true">
        <RamStick width={125} height={38} floatVariant="A" style={{ transform: 'rotate(-90deg)' }} />
        <Cpu width={80} height={80} floatVariant="B" />
        <M2Ssd width={115} height={36} floatVariant="C" style={{ transform: 'rotate(-90deg)' }} />
      </aside>

      {/* Right Margin */}
      <aside className={styles.wideMarginRight} aria-hidden="true">
        <Gpu width={140} height={60} floatVariant="B" style={{ transform: 'rotate(90deg)' }} />
        <MotherboardFragment width={85} height={85} floatVariant="C" />
        <RamStick width={125} height={38} floatVariant="A" style={{ transform: 'rotate(90deg)' }} />
      </aside>
    </>
  );
}
