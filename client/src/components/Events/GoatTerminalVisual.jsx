// client/src/components/Events/GoatTerminalVisual.jsx
import React from 'react';
import styles from './Events.module.css';

export default function GoatTerminalVisual() {
  const sampleRows = [
    { input: '[12, 5, 8, 19, 3]', output: '39' },
    { input: '[4, 4, 4, 4]', output: '16' },
    { input: '[100, 25, -10]', output: '115' },
  ];

  return (
    <div className={styles.terminalCard}>
      {/* Window card with three dots, labeled "EXAMPLE" */}
      <div className={styles.terminalBar}>
        <div className={styles.terminalDots} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <span className={styles.terminalBadge}>EXAMPLE</span>
      </div>

      {/* Monospace table of 3 sample input/output rows */}
      <div className={styles.terminalTableWrapper}>
        <table className={styles.terminalTable}>
          <thead>
            <tr>
              <th scope="col">SAMPLE INPUT</th>
              <th scope="col">EXPECTED OUTPUT</th>
            </tr>
          </thead>
          <tbody>
            {sampleRows.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <code className={styles.sampleInput}>{row.input}</code>
                </td>
                <td>
                  <code className={styles.sampleOutput}>{row.output}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with target complexity */}
      <div className={styles.terminalFooter}>
        <span className={styles.complexityText}>
          Target: O(N) Time · O(1) Auxiliary Space
        </span>
      </div>
    </div>
  );
}
