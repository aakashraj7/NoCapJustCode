// client/src/components/ui/Chip.jsx
import React from 'react';
import styles from './Chip.module.css';

export default function Chip({ icon, children, className = '' }) {
  return (
    <div className={`${styles.chip} ${className}`}>
      {icon && <span className={styles.chipIcon}>{icon}</span>}
      <span>{children}</span>
    </div>
  );
}
