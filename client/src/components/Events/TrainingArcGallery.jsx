// client/src/components/Events/TrainingArcGallery.jsx
import React, { useState, useCallback, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import styles from './Events.module.css';
import { workshopPhotos } from '../../data/workshopPhotos.js';

function TrainingArcGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const total = workshopPhotos.length;

  const goTo = useCallback(
    (idx) => {
      setActiveIndex(Math.max(0, Math.min(total - 1, idx)));
    },
    [total]
  );

  const prev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const next = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const openLightbox = useCallback(() => {
    setLightboxIndex(activeIndex);
    setIsLightboxOpen(true);
  }, [activeIndex]);

  const closeLightbox = useCallback(() => {
    setActiveIndex(lightboxIndex);
    setIsLightboxOpen(false);
  }, [lightboxIndex]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(activeIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(activeIndex + 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(total - 1);
      }
    },
    [activeIndex, goTo, total]
  );

  // Lightbox keyboard controls: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightboxIndex((prevIdx) => Math.max(0, prevIdx - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightboxIndex((prevIdx) => Math.min(total - 1, prevIdx + 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isLightboxOpen, closeLightbox, total]);

  return (
    <div
      className={styles.galleryWrapper}
      role="region"
      aria-roledescription="carousel"
      aria-label="Workshop photos"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Visually hidden aria-live status */}
      <div className={styles.srOnly} aria-live="polite">
        Photo {activeIndex + 1} of {total}
      </div>

      {/* 1. Framed Card: 2px solid #F26B3A, radius 24px, padding 6px, bg #0B0B0D */}
      <div className={styles.framedPhotoCard}>
        {/* Viewport: overflow hidden, radius 18px, aspect-ratio 4/3 */}
        <button
          type="button"
          className={styles.galleryViewport}
          onClick={openLightbox}
          aria-label="Click to enlarge photo"
        >
          {/* Top-left pill: PAST WORKSHOP */}
          <span className={styles.categoryPill} aria-hidden="true">
            PAST WORKSHOP
          </span>

          {/* Top-right pill: 1/4 counter */}
          <span className={styles.counterPill} aria-hidden="true">
            {activeIndex + 1}/{total}
          </span>

          {/* Track: flex row of slides moved by transform */}
          <div
            className={styles.galleryTrack}
            style={{ '--index': activeIndex }}
          >
            {workshopPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className={styles.gallerySlide}
                aria-hidden={activeIndex !== i}
              >
                <picture>
                  <source srcSet={photo.srcset} type="image/webp" />
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                    className={styles.galleryImg}
                  />
                </picture>
              </div>
            ))}
          </div>
        </button>
      </div>

      {/* 2. Navigation Row: [arrow] [4 dots] [arrow] */}
      <div className={styles.galleryNavRow}>
        <button
          type="button"
          className={styles.galleryArrowBtn}
          onClick={prev}
          disabled={activeIndex === 0}
          aria-disabled={activeIndex === 0}
          aria-label="Previous photo"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.dotsGroup} role="group" aria-label="Choose photo">
          {workshopPhotos.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.galleryDotBtn} ${activeIndex === i ? styles.galleryDotBtnActive : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={activeIndex === i ? 'true' : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.galleryArrowBtn}
          onClick={next}
          disabled={activeIndex === total - 1}
          aria-disabled={activeIndex === total - 1}
          aria-label="Next photo"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* 3. Lightbox: Portal, opaque backdrop, image keeps rounded corners and orange border */}
      {isLightboxOpen && typeof document !== 'undefined' && createPortal(
        <div
          className={styles.lightboxOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo view"
        >
          <button
            type="button"
            className={styles.lightboxCloseBtn}
            onClick={closeLightbox}
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
              setLightboxIndex((prevIdx) => Math.max(0, prevIdx - 1));
            }}
            disabled={lightboxIndex === 0}
            aria-disabled={lightboxIndex === 0}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className={styles.lightboxContent}>
            <div className={styles.lightboxFramedBox}>
              <picture>
                <source srcSet={workshopPhotos[lightboxIndex].srcset} type="image/webp" />
                <img
                  src={workshopPhotos[lightboxIndex].src}
                  alt={workshopPhotos[lightboxIndex].alt}
                  className={styles.lightboxImg}
                />
              </picture>
            </div>
            <p className={styles.lightboxCaption}>
              {workshopPhotos[lightboxIndex].caption || workshopPhotos[lightboxIndex].alt}
            </p>
          </div>

          <button
            type="button"
            className={`${styles.lightboxNavBtn} ${styles.lightboxNext}`}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prevIdx) => Math.min(total - 1, prevIdx + 1));
            }}
            disabled={lightboxIndex === total - 1}
            aria-disabled={lightboxIndex === total - 1}
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
