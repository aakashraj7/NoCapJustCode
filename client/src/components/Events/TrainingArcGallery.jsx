// client/src/components/Events/TrainingArcGallery.jsx
import React, { useState, useRef, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';
import styles from './Events.module.css';
import { workshopPhotos } from '../../data/workshopPhotos.js';

function TrainingArcGallery({ caption = 'From our past workshops' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const total = workshopPhotos.length;
  const currentPhoto = workshopPhotos[activeIndex] || workshopPhotos[0];

  const goTo = useCallback((idx) => {
    setActiveIndex((idx + total) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((prevIdx) => (prevIdx - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setActiveIndex((prevIdx) => (prevIdx + 1) % total);
  }, [total]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  return (
    <div className={styles.galleryWrapper} onKeyDown={handleKeyDown}>
      {/* 1. Framed Card: 2px solid #F26B3A, radius 24px, padding 6px, bg #0B0B0D */}
      <div
        className={styles.framedPhotoCard}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          className={styles.innerImageBtn}
          onClick={() => setIsLightboxOpen(true)}
          aria-label="Click to enlarge photo"
        >
          <picture>
            <source srcSet={currentPhoto.srcset} type="image/webp" />
            <img
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              width={currentPhoto.width}
              height={currentPhoto.height}
              loading="eager"
              decoding="async"
              className={styles.innerFramedImg}
              style={{ aspectRatio: '4 / 3' }}
            />
          </picture>
        </button>

        {/* Small dark 1/4 counter pill in top-right corner */}
        <div className={styles.counterPill} aria-hidden="true">
          {activeIndex + 1}/{total}
        </div>
      </div>

      {/* 2. Dots BELOW the frame, centered: 8px dots, active 22px orange pill, inactive cream 0.3, 12px under frame */}
      <div className={styles.dotsRow} aria-label="Photo gallery navigation">
        {workshopPhotos.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.galleryDot} ${activeIndex === i ? styles.galleryDotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
            aria-pressed={activeIndex === i}
          />
        ))}
      </div>

      {/* 3. Caption under the dots: muted cream, 13px */}
      <p className={styles.galleryCaptionText}>{caption}</p>

      {/* 4. Laptop-only Controls: Arrow buttons and thumbnail strip of 4 (64px, radius 12px, active 2px orange border) */}
      <div className={styles.laptopGalleryControls}>
        <div className={styles.laptopArrowRow}>
          <button
            type="button"
            className={styles.laptopArrowBtn}
            onClick={prev}
            aria-label="Previous photo"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className={styles.thumbStrip}>
            {workshopPhotos.map((photo, i) => (
              <button
                key={photo.id}
                type="button"
                className={`${styles.thumbBtn} ${activeIndex === i ? styles.thumbBtnActive : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Select photo ${i + 1}`}
              >
                <img
                  src={photo.src}
                  alt=""
                  width={64}
                  height={64}
                  loading="lazy"
                  className={styles.thumbImg}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            className={styles.laptopArrowBtn}
            onClick={next}
            aria-label="Next photo"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* 5. Lightbox: Portal, opaque backdrop, image keeps rounded corners and orange border */}
      {isLightboxOpen && typeof document !== 'undefined' && createPortal(
        <div
          className={styles.lightboxOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsLightboxOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo view"
        >
          <button
            type="button"
            className={styles.lightboxCloseBtn}
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close enlarged view"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            type="button"
            className={`${styles.lightboxNavBtn} ${styles.lightboxPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className={styles.lightboxContent}>
            <div className={styles.lightboxFramedBox}>
              <img
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                className={styles.lightboxImg}
              />
            </div>
            <p className={styles.lightboxCaption}>{currentPhoto.caption || currentPhoto.alt}</p>
          </div>

          <button
            type="button"
            className={`${styles.lightboxNavBtn} ${styles.lightboxNext}`}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}

export default memo(TrainingArcGallery);
