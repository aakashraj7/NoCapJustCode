// client/src/components/Events/GoatTerminalVisual.jsx
import React, { useState } from 'react';
import styles from './Events.module.css';

export default function GoatTerminalVisual() {
  const [activeCase, setActiveCase] = useState(0);

  const testCases = [
    { input: '[12, 5, 8, 19, 3]', output: '39', status: 'LOCKED_IN' },
    { input: '[4, 4, 4, 4]', output: '16', status: 'LOCKED_IN' },
    { input: '[100, 25, -10]', output: '115', status: 'HIDDEN_SECRET' },
  ];

  return (
    <div className={styles.terminalContainer}>
      {/* Terminal Title Bar */}
      <div className={styles.terminalBar}>
        <div className={styles.terminalDots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <div className={styles.terminalTitle}>
          crack_the_code://round-2 (EXAMPLE)
        </div>
        <div className={styles.terminalBadge}>EXAMPLE PREVIEW</div>
      </div>

      {/* Terminal Body */}
      <div className={styles.terminalBody}>
        <div className={styles.terminalPromptLine}>
          <span className={styles.promptArrow}>&gt;</span>
          <span className={styles.promptCmd}>run telemetry --black-box-mode</span>
        </div>

        <div className={styles.terminalNotice}>
          [NOTICE] No problem statement provided. Reverse-engineer algorithmic mapping from test telemetry.
        </div>

        {/* Case selector tabs */}
        <div className={styles.testTabs}>
          {testCases.map((tc, idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.testTab} ${activeCase === idx ? styles.activeTab : ''}`}
              onClick={() => setActiveCase(idx)}
            >
              Test Case #{idx + 1}
            </button>
          ))}
        </div>

        {/* Test Case Inspection Box */}
        <div className={styles.caseBox}>
          <div className={styles.caseRow}>
            <span className={styles.caseLabel}>INPUT STREAM:</span>
            <code className={styles.caseCode}>{testCases[activeCase].input}</code>
          </div>
          <div className={styles.caseRow}>
            <span className={styles.caseLabel}>EXPECTED OUTPUT:</span>
            <code className={`${styles.caseCode} ${styles.caseSuccess}`}>
              {testCases[activeCase].output}
            </code>
          </div>
          <div className={styles.caseRow}>
            <span className={styles.caseLabel}>TARGET COMPLEXITY:</span>
            <span className={styles.caseMuted}>O(N) Time // O(1) Auxiliary Space</span>
          </div>
        </div>

        <div className={styles.terminalStatusBar}>
          <span className={styles.statusBlink}>● LIVE TELEMETRY</span>
          <span>Time Limit: 1200ms</span>
        </div>
      </div>
    </div>
  );
}
