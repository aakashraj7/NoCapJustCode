// client/src/components/Events/EventCard.jsx
import React, { useRef } from 'react';
import styles from './Events.module.css';

export default function EventCard({ event, index, onOpenDetails }) {
  const cardRef = useRef(null);
  const numeral = event.numeral || String(index + 1).padStart(2, '0');
  const tagLabel = event.tagLabel || (index === 0 ? 'WORKSHOP' : 'COMPETITION');
  const isSecondCard = index === 1;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenDetails(event, cardRef);
    }
  };

  return (
    <button
      ref={cardRef}
      type="button"
      className={`${styles.eventCard} ${isSecondCard ? styles.cardYellowAccent : styles.cardOrangeAccent}`}
      onClick={() => onOpenDetails(event, cardRef)}
      onKeyDown={handleKeyDown}
      aria-haspopup="dialog"
      aria-label={`Open details: ${event.title}`}
    >
      {/* 3px top accent line inside rounded clip */}
      <span className={styles.accentLine} aria-hidden="true" />

      {/* Ghost numeral behind text */}
      <span className={styles.ghostNumeral} aria-hidden="true">
        {numeral}
      </span>

      {/* 1. Top row: tag chip (left), time (right) */}
      <div className={styles.cardTopRow}>
        <span className={styles.tagChip}>{tagLabel}</span>
        <span className={styles.timeText}>{event.time}</span>
      </div>

      {/* 3. Title: clamp(1.45rem, 5.6vw, 2rem), weight 700, line-height 1.12, 18px space above */}
      <h3 className={styles.cardTitle}>{event.title}</h3>

      {/* 4. 2-line clamped description at 15.5px, muted cream, line-height 1.6 */}
      <p className={styles.cardDescription}>{event.blurb}</p>

      {/* 5. Meta row: 3 chips with monochrome orange line SVG icons */}
      <div className={styles.metaRow}>
        <span className={styles.metaChip}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          13 Nov 2026
        </span>

        <span className={styles.metaChip}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Pega Lab
        </span>

        <span className={styles.metaChip}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Pair entry
        </span>
      </div>

      {/* 6. Footer row after 1px divider */}
      <div className={styles.cardFooterRow}>
        <span className={styles.viewDetailsText}>View details</span>
        <span className={styles.circularArrowBadge} aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </button>
  );
}
