// client/src/components/Events/EventDetailPanel.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Events.module.css';
import TugOfAuraVisual from './TugOfAuraVisual.jsx';
import GoatTerminalVisual from './GoatTerminalVisual.jsx';
import { workshopPhotos } from '../../data/workshopPhotos.js';
import { eventData } from '../../data/event.js';

export default function EventDetailPanel({ event, isOpen, onClose, onRegister, triggerRef }) {
  const [activeTab, setActiveTab] = useState('overview'); // For TLE: 'overview' | 'round1' | 'round2'
  const [activePhotoIndex, setActivePhotoIndex] = useState(0); // For Training Arc gallery
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [prevEventId, setPrevEventId] = useState(null);

  if (event?.id !== prevEventId) {
    setPrevEventId(event?.id);
    setActiveTab('overview');
    setActivePhotoIndex(0);
    setIsLightboxOpen(false);
    setDragY(0);
  }

  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const phoneCarouselRef = useRef(null);
  const dragStartY = useRef(0);
  const pushedHistoryRef = useRef(false);

  // Close handler: handles history pop cleanly and notifies parent
  const handleClose = useCallback(() => {
    setIsLightboxOpen(false);
    if (pushedHistoryRef.current) {
      pushedHistoryRef.current = false;
      window.history.back();
    }
    onClose();
  }, [onClose]);

  // Lock body scroll, manage browser history, and manage focus
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

    // Initial focus on close button for accessibility
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

  // Focus trap inside the modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          handleClose();
        }
        return;
      }

      if (e.key === 'Tab') {
        const modalEl = panelRef.current;
        if (!modalEl) return;
        const focusable = modalEl.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLightboxOpen, handleClose]);

  // Drag down to close on mobile (< 768px)
  const handlePointerDown = (e) => {
    if (window.innerWidth >= 768) return;
    if (e.target.closest('button')) return; // do not drag if clicking button
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
    } catch {
      // ignore
    }
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

  // Gallery keyboard navigation (ArrowLeft / ArrowRight)
  const handleGalleryKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : workshopPhotos.length - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActivePhotoIndex((prev) => (prev < workshopPhotos.length - 1 ? prev + 1 : 0));
    }
  };

  // Phone carousel scroll sync
  const handlePhoneCarouselScroll = () => {
    const el = phoneCarouselRef.current;
    if (!el) return;
    const width = el.offsetWidth;
    if (width > 0) {
      const idx = Math.round(el.scrollLeft / width);
      if (idx !== activePhotoIndex && idx >= 0 && idx < workshopPhotos.length) {
        setActivePhotoIndex(idx);
      }
    }
  };

  const scrollPhoneCarouselTo = (idx) => {
    const el = phoneCarouselRef.current;
    if (!el) return;
    el.scrollTo({
      left: idx * el.offsetWidth,
      behavior: 'smooth',
    });
    setActivePhotoIndex(idx);
  };

  if (!isOpen || !event) return null;

  const isTrainingArc = event.id === 'training-arc';
  const isTle = event.id === 'tle';
  const eyebrowText = event.eyebrow || (isTrainingArc ? 'WORKSHOP 01' : 'COMPETITION 02');
  const activePhoto = workshopPhotos[activePhotoIndex] || workshopPhotos[0];

  const handleRegisterClick = () => {
    if (onRegister) {
      onRegister(event.id);
    } else if (eventData.ticketUrl) {
      window.open(eventData.ticketUrl, '_blank', 'noopener,noreferrer');
    }
  };

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
        {/* (a) HEADER (64px laptop, 56px phone, border-bottom) */}
        <div
          className={styles.sheetHeader}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className={styles.dragPillIndicator} aria-hidden="true" />
          <div className={styles.headerBar}>
            <span className={styles.headerEyebrow}>{eyebrowText}</span>
            <button
              ref={closeBtnRef}
              type="button"
              className={styles.headerCloseBtn}
              onClick={handleClose}
              aria-label="Close details"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* (b) BODY (scrolls internally on an inner element so scrollbar stays inside rounded clip) */}
        <div className={styles.sheetBody}>
          {/* PHONE: Training Arc Full-Bleed Carousel first */}
          {isTrainingArc && (
            <div className={styles.phoneCarouselArea}>
              <div
                className={styles.phoneCarouselTrack}
                ref={phoneCarouselRef}
                onScroll={handlePhoneCarouselScroll}
              >
                {workshopPhotos.map((photo, idx) => (
                  <div key={photo.id} className={styles.phoneCarouselSlide}>
                    <picture>
                      <source srcSet={photo.srcset} type="image/webp" />
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className={styles.phoneCarouselImg}
                        style={{ aspectRatio: '4 / 3' }}
                      />
                    </picture>
                  </div>
                ))}
              </div>

              {/* Overlaid 1/4 Counter top-right */}
              <div className={styles.phoneCarouselCounter} aria-hidden="true">
                {activePhotoIndex + 1}/{workshopPhotos.length}
              </div>

              {/* Overlaid dots at bottom */}
              <div className={styles.phoneCarouselDots} aria-hidden="true">
                {workshopPhotos.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`${styles.phoneDot} ${activePhotoIndex === idx ? styles.phoneDotActive : ''}`}
                    onClick={() => scrollPhoneCarouselTo(idx)}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>

              <p className={styles.galleryCaptionPhone}>{event.photoCaption || 'From our past workshops'}</p>
            </div>
          )}

          {/* LEFT COLUMN */}
          <div className={styles.leftCol}>
            {/* Title & Meta Row */}
            <div className={styles.detailTitleSection}>
              <h1 id="detail-panel-title" className={styles.detailTitle}>
                {event.title}
              </h1>

              {/* Meta Chips Row */}
              <div className={styles.detailMetaRow}>
                <span className={styles.detailMetaChip}>
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

                <span className={styles.detailMetaChip}>
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

                <span className={styles.detailMetaChip}>
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
            </div>

            {/* TRAINING ARC CONTENT */}
            {isTrainingArc && (
              <div className={styles.detailSectionsStack}>
                {/* 1. About: ONE paragraph */}
                <section className={styles.detailSection}>
                  <h2 className={styles.sectionMonoLabel}>ABOUT</h2>
                  <p className={styles.sectionParagraph}>
                    {event.about || 'A hands-on workshop on competitive coding and problem-solving, conducted by Navadeep Anna, a 3rd year senior.'}
                  </p>
                </section>

                {/* 2. Your instructor: compact card */}
                <section className={styles.detailSection}>
                  <h2 className={styles.sectionMonoLabel}>YOUR INSTRUCTOR</h2>
                  <div className={styles.instructorCard}>
                    <div className={styles.instructorAvatar} aria-hidden="true">
                      {event.instructor?.initials || 'NA'}
                    </div>
                    <div className={styles.instructorInfo}>
                      <span className={styles.instructorName}>
                        {event.instructor?.name || 'Navadeep Anna'}
                      </span>
                      <span className={styles.instructorRole}>
                        {event.instructor?.role || '3rd year senior'}
                      </span>
                    </div>
                  </div>
                </section>

                {/* 3. At a glance: definition list */}
                <section className={styles.detailSection}>
                  <h2 className={styles.sectionMonoLabel}>AT A GLANCE</h2>
                  <dl className={styles.glanceList}>
                    {event.atAGlance?.map((item, idx) => (
                      <div key={idx} className={styles.glanceRow}>
                        <dt className={styles.glanceLabel}>{item.label}</dt>
                        <dd className={styles.glanceValue}>{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </div>
            )}

            {/* TLE CONTENT */}
            {isTle && (
              <div className={styles.detailSectionsStack}>
                {/* Segmented Control (auto width laptop, full width sticky phone) */}
                <div
                  className={styles.segmentedControl}
                  role="tablist"
                  aria-label="TLE Competition Sections"
                >
                  <button
                    id="tab-btn-overview"
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'overview'}
                    aria-controls="panel-overview"
                    tabIndex={activeTab === 'overview' ? 0 : -1}
                    className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabBtnActive : ''}`}
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
                    className={`${styles.tabBtn} ${activeTab === 'round1' ? styles.tabBtnActive : ''}`}
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
                    className={`${styles.tabBtn} ${activeTab === 'round2' ? styles.tabBtnActive : ''}`}
                    onClick={() => setActiveTab('round2')}
                    onKeyDown={(e) => handleTabKeyDown(e, 2)}
                  >
                    Round 2
                  </button>
                </div>

                {/* Tab 1: Overview */}
                {activeTab === 'overview' && (
                  <div
                    id="panel-overview"
                    role="tabpanel"
                    aria-labelledby="tab-btn-overview"
                    className={styles.tabPanelFade}
                  >
                    <section className={styles.detailSection}>
                      <h2 className={styles.sectionMonoLabel}>ABOUT</h2>
                      <p className={styles.sectionParagraph}>
                        {event.overview?.about}
                      </p>
                    </section>

                    <section className={styles.detailSection}>
                      <h2 className={styles.sectionMonoLabel}>FORMAT</h2>
                      <p className={styles.sectionParagraph}>
                        {event.overview?.format}
                      </p>
                    </section>

                    <section className={styles.detailSection}>
                      <h2 className={styles.sectionMonoLabel}>AT A GLANCE</h2>
                      <dl className={styles.glanceList}>
                        {event.overview?.atAGlance?.map((item, idx) => (
                          <div key={idx} className={styles.glanceRow}>
                            <dt className={styles.glanceLabel}>{item.label}</dt>
                            <dd className={styles.glanceValue}>{item.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </section>

                    {/* On phone: Event Day stepper is displayed at the end of Overview */}
                    <div className={styles.phoneStepperBlock}>
                      <section className={styles.detailSection}>
                        <h2 className={styles.sectionMonoLabel}>EVENT DAY</h2>
                        <div className={styles.stepperCard}>
                          <div className={styles.stepperTrack}>
                            {event.stepper?.map((step, idx) => (
                              <div key={idx} className={styles.stepperItem}>
                                <div className={styles.stepperLineWrap}>
                                  <span className={styles.stepperDot} />
                                  {idx < event.stepper.length - 1 && <span className={styles.stepperLine} />}
                                </div>
                                <div className={styles.stepperContent}>
                                  <span className={styles.stepperTime}>{step.time}</span>
                                  <span className={styles.stepperTitle}>{step.title}</span>
                                  {step.subItems && (
                                    <ul className={styles.stepperSublist}>
                                      {step.subItems.map((sub, sIdx) => (
                                        <li key={sIdx} className={styles.stepperSubitem}>
                                          {sub}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className={styles.noteCard}>
                          <p className={styles.noteCardText}>{event.noteCard}</p>
                        </div>
                      </section>
                    </div>
                  </div>
                )}

                {/* Tab 2: Round 1 (Tug of Aura) */}
                {activeTab === 'round1' && (
                  <div
                    id="panel-round1"
                    role="tabpanel"
                    aria-labelledby="tab-btn-round1"
                    className={styles.tabPanelFade}
                  >
                    <section className={styles.detailSection}>
                      <h2 className={styles.sectionMonoLabel}>ROUND 1: TUG OF AURA</h2>
                      <p className={styles.sectionParagraph}>
                        {event.round1?.description}
                      </p>
                    </section>

                    <div className={styles.visualSlot}>
                      <TugOfAuraVisual />
                    </div>
                  </div>
                )}

                {/* Tab 3: Round 2 (Who's the GOAT?) */}
                {activeTab === 'round2' && (
                  <div
                    id="panel-round2"
                    role="tabpanel"
                    aria-labelledby="tab-btn-round2"
                    className={styles.tabPanelFade}
                  >
                    <section className={styles.detailSection}>
                      <h2 className={styles.sectionMonoLabel}>ROUND 2: WHO'S THE GOAT?</h2>
                      <p className={styles.sectionParagraph}>
                        {event.round2?.description}
                      </p>
                    </section>

                    <div className={styles.visualSlot}>
                      <GoatTerminalVisual />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN (Laptop >= 768px) */}
          <div className={styles.rightCol}>
            {/* TRAINING ARC: Photo Gallery */}
            {isTrainingArc && (
              <div className={styles.desktopGalleryArea}>
                {/* Main 4:3 Image Frame */}
                <button
                  type="button"
                  className={styles.mainImageFrame}
                  onClick={() => setIsLightboxOpen(true)}
                  onKeyDown={handleGalleryKeyDown}
                  aria-label="Click to enlarge photo"
                >
                  <picture>
                    <source srcSet={activePhoto.srcset} type="image/webp" />
                    <img
                      src={activePhoto.src}
                      alt={activePhoto.alt}
                      width={activePhoto.width}
                      height={activePhoto.height}
                      loading="eager"
                      decoding="async"
                      className={styles.mainPhotoImg}
                      style={{ aspectRatio: '4 / 3' }}
                    />
                  </picture>
                </button>

                {/* Thumbnail Strip (64px thumbs, radius 10px) */}
                <div
                  className={styles.thumbStrip}
                  role="region"
                  aria-label="Photo gallery thumbnails"
                  onKeyDown={handleGalleryKeyDown}
                >
                  {workshopPhotos.map((photo, idx) => (
                    <button
                      key={photo.id}
                      type="button"
                      className={`${styles.thumbBtn} ${activePhotoIndex === idx ? styles.thumbBtnActive : ''}`}
                      onClick={() => setActivePhotoIndex(idx)}
                      aria-label={`Select photo ${idx + 1}`}
                      aria-pressed={activePhotoIndex === idx}
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

                <p className={styles.galleryCaption}>
                  {event.photoCaption || 'From our past workshops'}
                </p>
              </div>
            )}

            {/* TLE: Stepper & Note Card */}
            {isTle && (
              <div className={styles.desktopTleFactsArea}>
                <section className={styles.detailSection}>
                  <h2 className={styles.sectionMonoLabel}>EVENT DAY</h2>
                  <div className={styles.stepperCard}>
                    <div className={styles.stepperTrack}>
                      {event.stepper?.map((step, idx) => (
                        <div key={idx} className={styles.stepperItem}>
                          <div className={styles.stepperLineWrap}>
                            <span className={styles.stepperDot} />
                            {idx < event.stepper.length - 1 && <span className={styles.stepperLine} />}
                          </div>
                          <div className={styles.stepperContent}>
                            <span className={styles.stepperTime}>{step.time}</span>
                            <span className={styles.stepperTitle}>{step.title}</span>
                            {step.subItems && (
                              <ul className={styles.stepperSublist}>
                                {step.subItems.map((sub, sIdx) => (
                                  <li key={sIdx} className={styles.stepperSubitem}>
                                    {sub}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.noteCard}>
                    <p className={styles.noteCardText}>{event.noteCard}</p>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>

        {/* (c) STICKY FOOTER BAR */}
        <div className={styles.stickyFooterBar}>
          <div className={styles.footerPricingBlock}>
            <span className={styles.footerPricePrimary}>
              {eventData.pricingSummary.pair}
            </span>
            <span className={styles.footerPriceSplitLaptop}>
              {eventData.pricingSummary.split}
            </span>
            <span className={styles.footerPriceSplitPhone}>
              {eventData.pricingSummary.splitShort}
            </span>
          </div>

          <button
            type="button"
            className={styles.primaryRegisterBtn}
            onClick={handleRegisterClick}
          >
            Register as a pair
          </button>
        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL (Training Arc) */}
      {isLightboxOpen && (
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            type="button"
            className={`${styles.lightboxNavBtn} ${styles.lightboxPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : workshopPhotos.length - 1));
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className={styles.lightboxContent}>
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              className={styles.lightboxImg}
            />
            <p className={styles.lightboxCaption}>{activePhoto.caption || activePhoto.alt}</p>
          </div>

          <button
            type="button"
            className={`${styles.lightboxNavBtn} ${styles.lightboxNext}`}
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) => (prev < workshopPhotos.length - 1 ? prev + 1 : 0));
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </div>,
    document.body
  );
}
