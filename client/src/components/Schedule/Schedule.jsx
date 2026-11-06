// client/src/components/Schedule/Schedule.jsx
import React, { useEffect, useRef } from 'react';
import styles from './Schedule.module.css';
import { eventData } from '../../data/event.js';
import { SectionScene } from '../Scene/index.js';

export default function Schedule() {
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="schedule" className={`section ${styles.scheduleSection}`}>
      <SectionScene section="schedule" />
      <div className={`container ${styles.scheduleContainer}`}>
        <div className={styles.scheduleHeader}>
          <div className="section-tag">
            // 02. FULL SCHEDULE
          </div>
          <h2 className="section-title">
            Event Timeline
          </h2>
          <p className="section-subtitle">
            A single day structured for learning, testing your endurance, and crowning the problem-solving champions.
          </p>
        </div>

        <div className={styles.timeline}>
          {eventData.schedule.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => (itemRefs.current[idx] = el)}
              className={`${styles.timelineItem} ${item.highlight ? styles.highlight : ''}`}
            >
              {/* Node indicator */}
              <div className={styles.nodeDot} aria-hidden="true" />

              {/* Time Column */}
              <div className={styles.timeCol}>
                <span className={styles.timeText}>{item.time}</span>
              </div>

              {/* Content Card */}
              <div className={styles.contentCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <span className={styles.badge}>{item.type}</span>
                </div>
                <p className={styles.itemDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
