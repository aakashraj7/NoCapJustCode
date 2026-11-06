// client/src/components/Scene/Hardware/Keyboard.jsx
import React from 'react';
import styles from './Hardware.module.css';

export default function Keyboard({
  width = 200,
  height = 75,
  floatVariant = 'B',
  hasHalo = true,
  haloStrong = false,
  className = '',
  style = {},
}) {
  const cream = 'rgba(247, 237, 216, 0.85)';
  const creamFaint = 'rgba(247, 237, 216, 0.35)';
  const orange = '#F26B3A';
  const fillDark = 'rgba(11, 11, 13, 0.88)';

  return (
    <div
      className={`${styles.hardwarePiece} ${styles['float' + floatVariant]} ${className}`}
      style={{ width, height, ...style }}
      aria-hidden="true"
    >
      {hasHalo && (
        <div className={`${styles.halo} ${haloStrong ? styles.haloStrong : ''}`} />
      )}
      <svg
        className={styles.pieceSvg}
        width={width}
        height={height}
        viewBox="0 0 200 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Chassis Frame */}
        <rect
          x="6"
          y="6"
          width="188"
          height="63"
          rx="8"
          fill={fillDark}
          stroke={cream}
          strokeWidth="2"
        />

        {/* Row 1 Keys (Esc, Q..P, Backspace) */}
        <rect x="14" y="13" width="12" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="30" y="13" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="45" y="13" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="60" y="13" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="75" y="13" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="90" y="13" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="105" y="13" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="120" y="13" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="135" y="13" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="150" y="13" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="165" y="13" width="20" height="9" rx="2" stroke={cream} strokeWidth="1.2" />

        {/* Row 2 Keys (Tab, A..L, Enter) */}
        <rect x="14" y="26" width="18" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="36" y="26" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="51" y="26" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="66" y="26" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="81" y="26" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="96" y="26" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="111" y="26" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="126" y="26" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="141" y="26" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        {/* ONE Orange Enter Key */}
        <rect
          x="156"
          y="26"
          width="29"
          height="10"
          rx="2"
          fill="rgba(242, 107, 58, 0.18)"
          stroke={orange}
          strokeWidth="1.8"
        />
        <path d="M 176 31 L 170 31 L 173 29 M 170 31 L 173 33" stroke={orange} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Row 3 Keys (Shift, Z..M, Shift) */}
        <rect x="14" y="39" width="23" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="41" y="39" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="56" y="39" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="71" y="39" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="86" y="39" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="101" y="39" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="116" y="39" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="131" y="39" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="146" y="39" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="161" y="39" width="24" height="9" rx="2" stroke={cream} strokeWidth="1.2" />

        {/* Row 4 Keys (Ctrl, Alt, Spacebar, Arrows) */}
        <rect x="14" y="52" width="15" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="33" y="52" width="13" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        {/* Spacebar */}
        <rect x="50" y="52" width="76" height="9" rx="2" stroke={cream} strokeWidth="1.5" />
        <rect x="130" y="52" width="13" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="147" y="52" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="162" y="52" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />
        <rect x="177" y="52" width="11" height="9" rx="2" stroke={cream} strokeWidth="1.2" />

        {/* 3D bottom bevel shadow lines on keycaps */}
        <line x1="14" y1="23" x2="26" y2="23" stroke={creamFaint} strokeWidth="1" />
        <line x1="50" y1="62" x2="126" y2="62" stroke={creamFaint} strokeWidth="1.2" />
      </svg>
    </div>
  );
}
