// client/src/components/Events/EventCard.jsx
import React, { useRef } from 'react';
import styles from './Events.module.css';

export default function EventCard({ event, onOpenDetails }) {
  const cardRef = useRef(null);

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
      className={styles.eventCard}
      onClick={() => onOpenDetails(event, cardRef)}
      onKeyDown={handleKeyDown}
      aria-haspopup="dialog"
      aria-label={`Open details: ${event.title}`}
    >
      <div className={styles.cardTop}>
        <div className={styles.tagRow}>
          <span className={styles.trackBadge}>{event.badge}</span>
          <span className={styles.timeChip}>{event.time}</span>
        </div>

        <h3 className={styles.cardTitle}>{event.title}</h3>
        <p className={styles.cardBlurb}>{event.blurb}</p>

        <div className={styles.cardMeta}>
          <span>Format: Pairs (2 coders) // Both tracks included</span>
        </div>
      </div>

      <div className={styles.cardBottomRow}>
        <span className={styles.viewDetailsHint} aria-hidden="true">
          View details <span className={styles.hintArrow}>&rarr;</span>
        </span>
      </div>
    </button>
  );
}
