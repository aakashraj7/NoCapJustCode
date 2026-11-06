// client/src/components/Events/EventCard.jsx
import React, { useRef } from 'react';
import styles from './Events.module.css';
import { workshopPhotos } from '../../data/workshopPhotos.js';
import MiniTugVisual from './MiniTugVisual.jsx';

export default function EventCard({ event, index, onOpenDetails }) {
  const cardRef = useRef(null);
  const isTrainingArc = event.id === 'training-arc';
  const trackNumber = String(index + 1).padStart(2, '0');
  const tagLabel = isTrainingArc ? 'WORKSHOP' : 'COMPETITION';
  const instructorPhoto = workshopPhotos[0];

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
      {/* 1. Cover Area: 16/9 fixed aspect ratio, radius 16px, overflow hidden */}
      <div className={styles.cardCover}>
        {isTrainingArc ? (
          <picture className={styles.coverPicture}>
            <source srcSet={instructorPhoto.srcset} type="image/webp" />
            <img
              src={instructorPhoto.src}
              alt={instructorPhoto.alt}
              width={1024}
              height={569}
              loading="lazy"
              decoding="async"
              className={styles.coverImg}
              style={{ aspectRatio: '16 / 9' }}
            />
          </picture>
        ) : (
          <MiniTugVisual />
        )}
      </div>

      {/* 2. Row: "01" mono orange, tag chip, time chip right */}
      <div className={styles.cardHeaderRow}>
        <div className={styles.headerLeft}>
          <span className={styles.trackNumber}>{trackNumber}</span>
          <span className={styles.trackTypeChip}>{tagLabel}</span>
        </div>
        <span className={styles.timeBadge}>{event.time}</span>
      </div>

      {/* 3. Title at clamp(1.35rem, 5.4vw, 1.75rem), line-height 1.15 */}
      <h3 className={styles.cardTitle}>{event.title}</h3>

      {/* 4. Description in 2 lines max (line-clamp), 15.5px, muted cream */}
      <p className={styles.cardDescription}>{event.blurb}</p>

      {/* 5. Info chips: "13 Nov 2026", "Pega Lab", "2 per team" */}
      <div className={styles.infoChipsRow}>
        <span className={styles.infoChip}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          13 Nov 2026
        </span>
        <span className={styles.infoChip}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Pega Lab
        </span>
        <span className={styles.infoChip}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          2 per team
        </span>
      </div>

      {/* 6. Footer row: "View details" + 44px circular arrow button (decorative) */}
      <div className={styles.cardFooterRow}>
        <span className={styles.viewDetailsText}>View details</span>
        <span className={styles.circularArrowBtn} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </button>
  );
}
