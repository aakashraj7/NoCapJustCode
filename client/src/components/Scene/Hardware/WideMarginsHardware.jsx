// client/src/components/Scene/Hardware/WideMarginsHardware.jsx
import React from 'react';
import styles from './Hardware.module.css';

import RamStick from './RamStick.jsx';
import Gpu from './Gpu.jsx';

/**
 * WideMarginsHardware:
 * Displayed only at viewport >= 1600px in the margins outside the 1280px container.
 * At most 1 piece per side. Below 1600px none.
 */
export default function WideMarginsHardware() {
  return (
    <>
      {/* Left Margin: exactly 1 piece */}
      <aside className={styles.wideMarginLeft} aria-hidden="true">
        <RamStick width={135} height={42} floatVariant="A" style={{ transform: 'rotate(-90deg)' }} />
      </aside>

      {/* Right Margin: exactly 1 piece */}
      <aside className={styles.wideMarginRight} aria-hidden="true">
        <Gpu width={150} height={66} floatVariant="B" style={{ transform: 'rotate(90deg)' }} />
      </aside>
    </>
  );
}
