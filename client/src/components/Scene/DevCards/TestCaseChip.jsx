// client/src/components/Scene/DevCards/TestCaseChip.jsx
import React from 'react';
import DevCard from './DevCard.jsx';
import styles from './DevCards.module.css';

export default function TestCaseChip({
  floatVariant = 'B',
  parallaxFactor = 0.03,
  style = {},
  className = '',
}) {
  return (
    <DevCard
      name="testCase"
      floatVariant={floatVariant}
      parallaxFactor={parallaxFactor}
      className={`${styles.testCaseChip} ${className}`}
      style={style}
    >
      <span className={styles.passBadge}>PASS</span>
      <span className={styles.testCaseText}>input: 3 7 12 -&gt; output: 24</span>
    </DevCard>
  );
}
