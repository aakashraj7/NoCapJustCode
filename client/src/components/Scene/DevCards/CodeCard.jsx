// client/src/components/Scene/DevCards/CodeCard.jsx
import React from 'react';
import DevCard from './DevCard.jsx';
import styles from './DevCards.module.css';

export default function CodeCard({
  floatVariant = 'B',
  parallaxFactor = -0.04,
  style = {},
  className = '',
}) {
  return (
    <DevCard
      name="code"
      floatVariant={floatVariant}
      parallaxFactor={parallaxFactor}
      className={`${styles.codeCard} ${className}`}
      style={style}
    >
      <table className={styles.codeTable}>
        <tbody>
          <tr>
            <td className={styles.lineNum}>1</td>
            <td className={styles.codeText}>
              <span className={styles.kwOrange}>function</span> <span className={styles.kwYellow}>solve</span>(n) &#123;
            </td>
          </tr>
          <tr>
            <td className={styles.lineNum}>2</td>
            <td className={`${styles.codeText} ${styles.codeComment}`}>
              {'  '}// check power of 2
            </td>
          </tr>
          <tr>
            <td className={styles.lineNum}>3</td>
            <td className={styles.codeText}>
              {'  '}<span className={styles.kwOrange}>if</span> (n &lt;= 0) <span className={styles.kwOrange}>return</span> <span className={styles.kwYellow}>false</span>;
            </td>
          </tr>
          <tr>
            <td className={styles.lineNum}>4</td>
            <td className={styles.codeText}>
              {'  '}<span className={styles.kwOrange}>return</span> (n &amp; (n - 1)) === 0;
            </td>
          </tr>
          <tr>
            <td className={styles.lineNum}>5</td>
            <td className={styles.codeText}>&#125;</td>
          </tr>
        </tbody>
      </table>
    </DevCard>
  );
}
