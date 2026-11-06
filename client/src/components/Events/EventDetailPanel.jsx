// client/src/components/Events/EventDetailPanel.jsx
import React, { useEffect, useRef } from 'react';
import styles from './Events.module.css';
import Button from '../ui/Button.jsx';
import TugOfAuraVisual from './TugOfAuraVisual.jsx';
import GoatTerminalVisual from './GoatTerminalVisual.jsx';

export default function EventDetailPanel({ event, isOpen, onClose, onRegister, triggerRef }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Lock body scroll while panel is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add('scroll-locked');
    closeBtnRef.current?.focus();

    const triggerEl = triggerRef?.current;

    return () => {
      document.body.classList.remove('scroll-locked');
      // Return focus to trigger button
      if (triggerEl) {
        triggerEl.focus();
      }
    };
  }, [isOpen, triggerRef]);

  // Keyboard navigation: Escape key closes panel
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const isTrainingArc = event.id === 'training-arc';
  const isTle = event.id === 'tle';

  return (
    <div
      className={styles.panelBackdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="panel-title"
    >
      <div className={styles.detailPanel} ref={panelRef}>
        {/* Header */}
        <div className={styles.panelHeader}>
          <div className={styles.headerInfo}>
            <span className={styles.trackBadge}>{event.badge}</span>
            <h2 id="panel-title" className={styles.cardTitle}>
              {event.title}
            </h2>
            <span className={styles.timeChip}>
              {event.time} // {isTrainingArc ? 'Individual Participation' : 'Team of 2 to 4'}
            </span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close details panel"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className={styles.panelScrollContent}>
          {/* Overview */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeading}>// TRACK OVERVIEW</div>
            <p className={styles.cardBlurb}>{event.blurb}</p>
          </div>

          {/* Training Arc Specific Sections */}
          {isTrainingArc && (
            <>
              {/* Speakers */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>// WORKSHOP INSTRUCTORS</div>
                <div className={styles.speakersGrid}>
                  {event.speakers?.map((sp, idx) => (
                    <div key={idx} className={styles.speakerCard}>
                      <div className={styles.speakerName}>{sp.name}</div>
                      <div className={styles.speakerRole}>{sp.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What You Will Learn */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>// WHAT YOU WILL LEARN</div>
                <ul className={styles.bulletList}>
                  {event.topics?.map((topic, idx) => (
                    <li key={idx} className={styles.bulletItem}>
                      <span className={styles.bulletIcon}>▸</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who It Is For */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>// WHO IS THIS FOR</div>
                <p className={styles.cardBlurb}>{event.targetAudience}</p>
              </div>

              {/* What to Bring */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>// WHAT TO BRING</div>
                <ul className={styles.bulletList}>
                  {event.prerequisites?.map((req, idx) => (
                    <li key={idx} className={styles.bulletItem}>
                      <span className={styles.bulletIcon}>▸</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* TLE Competition Specific Sections */}
          {isTle && (
            <>
              {/* Round 1: Tug of Aura */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>
                  // ROUND 1: TUG OF AURA (DIGITAL TUG-OF-WAR)
                </div>
                <p className={styles.cardBlurb}>{event.rounds?.[0]?.description}</p>
                <TugOfAuraVisual />
              </div>

              {/* Round 2: Who's the GOAT? */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>
                  // ROUND 2: WHO'S THE GOAT? (CRACK THE CODE)
                </div>
                <p className={styles.cardBlurb}>{event.rounds?.[1]?.description}</p>
                <GoatTerminalVisual />
              </div>

              {/* Rules Placeholder */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>// COMPETITION RULES</div>
                <ul className={styles.bulletList}>
                  {event.rules?.map((rule, idx) => (
                    <li key={idx} className={styles.bulletItem}>
                      <span className={styles.bulletIcon}>▸</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results & Prizes Note */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>// RESULTS & PRIZES</div>
                <p className={styles.cardBlurb}>{event.prizes}</p>
              </div>
            </>
          )}
        </div>

        {/* Panel Footer with Register CTA */}
        <div className={styles.panelFooter}>
          <div className={styles.footerNote}>
            {isTrainingArc ? 'Individual Entry // Limited Seats' : 'Teams of 2 to 4 // Live Leaderboard'}
          </div>
          <Button
            size="md"
            variant="primary"
            onClick={() => {
              onClose();
              onRegister(event.id);
            }}
          >
            Register for {event.title}
          </Button>
        </div>
      </div>
    </div>
  );
}
