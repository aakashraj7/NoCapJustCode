// client/src/components/Events/EventCard.jsx
import React, { useRef } from 'react';
import styles from './Events.module.css';
import Button from '../ui/Button.jsx';

export default function EventCard({ event, onOpenDetails, onRegister }) {
  const detailsBtnRef = useRef(null);

  return (
    <div className={styles.eventCard}>
      <div className={styles.cardTop}>
        <div className={styles.tagRow}>
          <span className={styles.trackBadge}>{event.badge}</span>
          <span className={styles.timeChip}>{event.time}</span>
        </div>

        <h3 className={styles.cardTitle}>{event.title}</h3>
        <p className={styles.cardBlurb}>{event.blurb}</p>

        <div className={styles.cardMeta}>
          <span>Format: {event.registrationType === 'team' ? 'Teams of 2 to 4' : 'Individual'}</span>
        </div>
      </div>

      <div className={styles.cardActions}>
        <button
          ref={detailsBtnRef}
          type="button"
          className={styles.viewDetailsBtn}
          onClick={() => onOpenDetails(event, detailsBtnRef)}
        >
          View Full Details <span>&rarr;</span>
        </button>

        <Button
          size="md"
          variant="primary"
          onClick={() => onRegister(event.id)}
        >
          Register
        </Button>
      </div>
    </div>
  );
}
