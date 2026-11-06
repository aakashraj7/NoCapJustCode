// client/src/components/Events/EventDetailPanel.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Events.module.css';
import Button from '../ui/Button.jsx';
import TugOfAuraVisual from './TugOfAuraVisual.jsx';
import GoatTerminalVisual from './GoatTerminalVisual.jsx';
import { SHOW_UNCONFIRMED } from '../../data/event.js';
import { workshopPhotos } from '../../data/workshopPhotos.js';

export default function EventDetailPanel({ event, isOpen, onClose, onRegister, triggerRef }) {
  const [activeTab, setActiveTab] = useState('overview'); // For TLE: 'overview' | 'round1' | 'round2'
  const [activeSlide, setActiveSlide] = useState(0); // For workshop carousel
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [prevEventId, setPrevEventId] = useState(null);

  if (event?.id !== prevEventId) {
    setPrevEventId(event?.id);
    setActiveTab('overview');
    setActiveSlide(0);
    setDragY(0);
  }

  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const carouselRef = useRef(null);
  const dragStartY = useRef(0);
  const pushedHistoryRef = useRef(false);

  // Handle closing cleanly: pop history if pushed, call onClose, return focus
  const handleClose = useCallback(() => {
    if (pushedHistoryRef.current) {
      pushedHistoryRef.current = false;
      window.history.back();
    }
    onClose();
  }, [onClose]);

  // Lock body scroll, hide navbar, manage browser history
  useEffect(() => {
    if (!isOpen || !event) return;

    document.body.classList.add('detail-panel-open');

    // Browser back button handling
    window.history.pushState({ eventDetailOpen: true, eventId: event.id }, '');
    pushedHistoryRef.current = true;

    const handlePopState = () => {
      pushedHistoryRef.current = false;
      onClose();
    };

    window.addEventListener('popstate', handlePopState);

    // Focus close button
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const triggerEl = triggerRef?.current;

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('detail-panel-open');
      window.removeEventListener('popstate', handlePopState);
      if (triggerEl) {
        triggerEl.focus();
      }
    };
  }, [isOpen, event, triggerRef, onClose]);

  // Escape key closes panel
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Carousel touch/scroll synchronization
  const handleCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const slideWidth = el.offsetWidth;
    if (slideWidth > 0) {
      const index = Math.round(el.scrollLeft / slideWidth);
      if (index !== activeSlide && index >= 0 && index < workshopPhotos.length) {
        setActiveSlide(index);
      }
    }
  };

  const goToSlide = (idx) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({
      left: idx * el.offsetWidth,
      behavior: 'smooth',
    });
    setActiveSlide(idx);
  };

  const scrollCarousel = (dir) => {
    const next = Math.max(0, Math.min(workshopPhotos.length - 1, activeSlide + dir));
    goToSlide(next);
  };

  // Drag down to dismiss on mobile (<768px)
  const handlePointerDown = (e) => {
    if (window.innerWidth >= 768) return;
    if (e.target.closest('button')) return; // don't drag if clicking buttons
    dragStartY.current = e.clientY;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaY = e.clientY - dragStartY.current;
    if (deltaY > 0) {
      setDragY(deltaY);
    } else {
      setDragY(deltaY * 0.2); // rubber band if pulling up
    }
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    if (dragY >= 80) {
      handleClose();
    } else {
      setDragY(0);
    }
  };

  // Keyboard navigation for TLE tabs
  const handleTabKeyDown = (e, currentIdx) => {
    const tabsList = ['overview', 'round1', 'round2'];
    let nextIdx = currentIdx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIdx = (currentIdx + 1) % tabsList.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIdx = (currentIdx - 1 + tabsList.length) % tabsList.length;
    }
    if (nextIdx !== currentIdx) {
      setActiveTab(tabsList[nextIdx]);
      const btn = document.getElementById(`tab-btn-${tabsList[nextIdx]}`);
      btn?.focus();
    }
  };

  if (!isOpen || !event) return null;

  const isTrainingArc = event.id === 'training-arc';
  const isTle = event.id === 'tle';

  // RENDER MODAL VIA PORTAL INTO DOCUMENT.BODY
  return createPortal(
    <div
      className={styles.panelBackdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-panel-title"
    >
      <div
        className={styles.detailSheet}
        ref={panelRef}
        style={{
          transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
          transition: isDragging ? 'none' : undefined,
        }}
      >
        {/* 1. STICKY HEADER (56px) with drag handle on mobile */}
        <div
          className={styles.sheetHeader}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className={styles.dragPillIndicator} aria-hidden="true" />
          <div className={styles.headerBar}>
            <button
              ref={closeBtnRef}
              type="button"
              className={styles.headerCloseBtn}
              onClick={handleClose}
              aria-label="Close details"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 id="detail-panel-title" className={styles.headerTruncatedTitle}>
              {event.title}
            </h2>
            <div className={styles.headerSpacer} />
          </div>
        </div>

        {/* Segmented Tab Bar for TLE (Sticky under header) */}
        {isTle && (
          <div className={styles.segmentedTabBar} role="tablist" aria-label="TLE Competition Sections">
            <button
              id="tab-btn-overview"
              type="button"
              role="tab"
              aria-selected={activeTab === 'overview'}
              aria-controls="panel-overview"
              tabIndex={activeTab === 'overview' ? 0 : -1}
              className={`${styles.segmentedTab} ${activeTab === 'overview' ? styles.activeSegment : ''}`}
              onClick={() => setActiveTab('overview')}
              onKeyDown={(e) => handleTabKeyDown(e, 0)}
            >
              Overview
            </button>
            <button
              id="tab-btn-round1"
              type="button"
              role="tab"
              aria-selected={activeTab === 'round1'}
              aria-controls="panel-round1"
              tabIndex={activeTab === 'round1' ? 0 : -1}
              className={`${styles.segmentedTab} ${activeTab === 'round1' ? styles.activeSegment : ''}`}
              onClick={() => setActiveTab('round1')}
              onKeyDown={(e) => handleTabKeyDown(e, 1)}
            >
              Round 1
            </button>
            <button
              id="tab-btn-round2"
              type="button"
              role="tab"
              aria-selected={activeTab === 'round2'}
              aria-controls="panel-round2"
              tabIndex={activeTab === 'round2' ? 0 : -1}
              className={`${styles.segmentedTab} ${activeTab === 'round2' ? styles.activeSegment : ''}`}
              onClick={() => setActiveTab('round2')}
              onKeyDown={(e) => handleTabKeyDown(e, 2)}
            >
              Round 2
            </button>
          </div>
        )}

        {/* 2. SCROLLABLE CONTENT (Laptop: 2 Columns, Mobile: 1 Column) */}
        <div className={styles.sheetBody}>
          {/* LEFT COLUMN: Scrolls on laptop */}
          <div className={styles.leftContentCol}>
            {/* Title Block */}
            <div className={styles.modalTitleBlock}>
              <div className={styles.tagTimeRow}>
                <span className={styles.trackBadge}>{event.badge}</span>
                <span className={styles.timeBadge}>{event.time}</span>
              </div>
              <h1 className={styles.modalMainTitle}>{event.title}</h1>
              <div className={styles.metaPillsRow}>
                <span className={styles.metaPill}>📅 13 November 2026</span>
                <span className={styles.metaPill}>📍 Pega Lab</span>
                <span className={styles.metaPill}>👥 Pairs (2 coders)</span>
              </div>
            </div>

            {/* TRAINING ARC CONTENT */}
            {isTrainingArc && (
              <>
                {/* On mobile: Carousel shows inline inside content */}
                <div className={styles.mobileCarouselSlot}>
                  <div className={styles.carouselContainer}>
                    <div
                      className={styles.carouselTrack}
                      ref={carouselRef}
                      onScroll={handleCarouselScroll}
                    >
                      {workshopPhotos.map((photo, i) => (
                        <div key={photo.id} className={styles.carouselSlide}>
                          <picture>
                            <source srcSet={photo.srcset} type="image/webp" />
                            <img
                              src={photo.src}
                              alt={photo.alt}
                              width={photo.width}
                              height={photo.height}
                              loading={i === 0 ? 'eager' : 'lazy'}
                              decoding="async"
                              className={styles.carouselImg}
                              style={{ aspectRatio: '16 / 10' }}
                            />
                          </picture>
                        </div>
                      ))}
                    </div>

                    <div className={styles.carouselControls}>
                      <button
                        type="button"
                        className={styles.carouselArrowBtn}
                        onClick={() => scrollCarousel(-1)}
                        aria-label="Previous photo"
                      >
                        ‹
                      </button>
                      <div className={styles.carouselDots}>
                        {workshopPhotos.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`${styles.dotItem} ${activeSlide === i ? styles.activeDot : ''}`}
                            onClick={() => goToSlide(i)}
                            aria-label={`Slide ${i + 1}`}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        className={styles.carouselArrowBtn}
                        onClick={() => scrollCarousel(1)}
                        aria-label="Next photo"
                      >
                        ›
                      </button>
                    </div>
                    <p className={styles.carouselCaption}>From our past workshops</p>
                  </div>
                </div>

                {/* About Paragraph */}
                <div className={styles.sectionBlock}>
                  <h3 className={styles.sectionHeading}>// WORKSHOP OVERVIEW</h3>
                  <p className={styles.sectionBodyText}>
                    Competitive Coding &amp; Problem-Solving Workshop. {event.blurb}
                  </p>
                </div>

                {/* Instructor Card */}
                <div className={styles.sectionBlock}>
                  <h3 className={styles.sectionHeading}>// YOUR INSTRUCTOR</h3>
                  <div className={styles.instructorCard}>
                    <div className={styles.instructorAvatar} aria-hidden="true">
                      NA
                    </div>
                    <div className={styles.instructorMeta}>
                      <h4 className={styles.instructorName}>Navadeep Anna</h4>
                      <p className={styles.instructorRole}>3rd year senior</p>
                    </div>
                  </div>
                </div>

                {/* Unconfirmed sections are conditionally rendered */}
                {SHOW_UNCONFIRMED && (
                  <>
                    <div className={styles.sectionBlock}>
                      <h3 className={styles.sectionHeading}>// WHAT YOU WILL LEARN</h3>
                      <ul className={styles.bulletList}>
                        {event.topics?.map((t, idx) => (
                          <li key={idx} className={styles.bulletItem}>
                            ▸ {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.sectionBlock}>
                      <h3 className={styles.sectionHeading}>// WHO IS THIS FOR</h3>
                      <p className={styles.sectionBodyText}>{event.targetAudience}</p>
                    </div>
                    <div className={styles.sectionBlock}>
                      <h3 className={styles.sectionHeading}>// WHAT TO BRING</h3>
                      <ul className={styles.bulletList}>
                        {event.prerequisites?.map((p, idx) => (
                          <li key={idx} className={styles.bulletItem}>
                            ▸ {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </>
            )}

            {/* TLE COMPETITION CONTENT */}
            {isTle && (
              <>
                {activeTab === 'overview' && (
                  <div id="panel-overview" role="tabpanel" aria-labelledby="tab-btn-overview" className={styles.tabPanel}>
                    <div className={styles.sectionBlock}>
                      <h3 className={styles.sectionHeading}>// DEADLOCK OVERVIEW</h3>
                      <p className={styles.sectionBodyText}>{event.blurb}</p>
                    </div>
                    <div className={styles.sectionBlock}>
                      <h3 className={styles.sectionHeading}>// COMPETITION FORMAT</h3>
                      <p className={styles.sectionBodyText}>
                        Participate in pairs (2 coders per team). Both tracks (Round 1: Tug of Aura and Round 2: Who's the GOAT?) are fully included under the single team pass.
                      </p>
                    </div>
                    <div className={styles.sectionBlock}>
                      <h3 className={styles.sectionHeading}>// TIME & ARENA</h3>
                      <p className={styles.sectionBodyText}>
                        12:00 PM – 2:30 PM at Pega Lab. Immediate live leaderboard and instant verification.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'round1' && (
                  <div id="panel-round1" role="tabpanel" aria-labelledby="tab-btn-round1" className={styles.tabPanel}>
                    <div className={styles.sectionBlock}>
                      <h3 className={styles.sectionHeading}>// ROUND 1: TUG OF AURA</h3>
                      <p className={styles.sectionBodyText}>
                        {event.rounds?.[0]?.description}
                      </p>
                    </div>
                    <div className={styles.visualContainer}>
                      <TugOfAuraVisual />
                    </div>
                  </div>
                )}

                {activeTab === 'round2' && (
                  <div id="panel-round2" role="tabpanel" aria-labelledby="tab-btn-round2" className={styles.tabPanel}>
                    <div className={styles.sectionBlock}>
                      <h3 className={styles.sectionHeading}>// ROUND 2: WHO'S THE GOAT?</h3>
                      <p className={styles.sectionBodyText}>
                        {event.rounds?.[1]?.description}
                      </p>
                    </div>
                    <div className={styles.visualContainer}>
                      <GoatTerminalVisual />
                    </div>
                  </div>
                )}

                {SHOW_UNCONFIRMED && (
                  <>
                    <div className={styles.sectionBlock}>
                      <h3 className={styles.sectionHeading}>// RULES</h3>
                      <ul className={styles.bulletList}>
                        {event.rules?.map((r, idx) => (
                          <li key={idx} className={styles.bulletItem}>
                            ▸ {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.sectionBlock}>
                      <h3 className={styles.sectionHeading}>// PRIZES</h3>
                      <p className={styles.sectionBodyText}>{event.prizes}</p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* RIGHT COLUMN: Sticky on laptop (>= 768px) */}
          <div className={styles.rightStickyCol}>
            {/* Desktop visual showcase */}
            <div className={styles.desktopVisualArea}>
              {isTrainingArc ? (
                <div className={styles.carouselContainer}>
                  <div
                    className={styles.carouselTrack}
                    ref={carouselRef}
                    onScroll={handleCarouselScroll}
                  >
                    {workshopPhotos.map((photo, i) => (
                      <div key={photo.id} className={styles.carouselSlide}>
                        <picture>
                          <source srcSet={photo.srcset} type="image/webp" />
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            width={photo.width}
                            height={photo.height}
                            loading={i === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                            className={styles.carouselImg}
                            style={{ aspectRatio: '16 / 10' }}
                          />
                        </picture>
                      </div>
                    ))}
                  </div>

                  <div className={styles.carouselControls}>
                    <button
                      type="button"
                      className={styles.carouselArrowBtn}
                      onClick={() => scrollCarousel(-1)}
                      aria-label="Previous photo"
                    >
                      ‹
                    </button>
                    <div className={styles.carouselDots}>
                      {workshopPhotos.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`${styles.dotItem} ${activeSlide === i ? styles.activeDot : ''}`}
                          onClick={() => goToSlide(i)}
                          aria-label={`Slide ${i + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      className={styles.carouselArrowBtn}
                      onClick={() => scrollCarousel(1)}
                      aria-label="Next photo"
                    >
                      ›
                    </button>
                  </div>
                  <p className={styles.carouselCaption}>From our past workshops</p>
                </div>
              ) : (
                <div className={styles.desktopTleShowcase}>
                  <TugOfAuraVisual />
                </div>
              )}
            </div>

            {/* Desktop Sticky Booking / Summary Card */}
            <div className={styles.desktopStickyCard}>
              <div className={styles.cardPriceRow}>
                <div>
                  <div className={styles.pricePrimary}>₹298 per pair</div>
                  <div className={styles.priceSecondary}>₹149 x 2 coders</div>
                </div>
                <div className={styles.pairTagBadge}>PAIR ENTRY</div>
              </div>

              <div className={styles.cardDetailsList}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Date:</span>
                  <span className={styles.detailVal}>13 November 2026</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Venue:</span>
                  <span className={styles.detailVal}>Pega Lab</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Pass:</span>
                  <span className={styles.detailVal}>Full Day (Workshop + DEADLOCK)</span>
                </div>
              </div>

              <Button
                size="lg"
                variant="primary"
                fullWidth
                onClick={() => {
                  handleClose();
                  onRegister(event.id);
                }}
              >
                Register as a pair
              </Button>
            </div>
          </div>
        </div>

        {/* 3. STICKY BOTTOM BAR (Mobile only < 768px, fully opaque #0B0B0D) */}
        <div className={styles.sheetBottomBar}>
          <div className={styles.bottomBarPricing}>
            <span className={styles.bottomBarPrice}>₹298 per pair</span>
            <span className={styles.bottomBarSplit}>₹149 x 2</span>
          </div>

          <button
            type="button"
            className={styles.bottomBarRegisterBtn}
            onClick={() => {
              handleClose();
              onRegister(event.id);
            }}
          >
            Register as a pair
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
