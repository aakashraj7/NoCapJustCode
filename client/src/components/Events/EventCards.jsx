// client/src/components/Events/EventCards.jsx
import React, { useState } from 'react';
import styles from './Events.module.css';
import { eventData } from '../../data/event.js';
import EventCard from './EventCard.jsx';
import EventDetailPanel from './EventDetailPanel.jsx';
import { SectionScene } from '../Scene/index.js';

export default function EventCards({ onOpenRegister }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [triggerRef, setTriggerRef] = useState(null);

  const handleOpenDetails = (event, btnRef) => {
    setSelectedEvent(event);
    setTriggerRef(btnRef);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <section id="events" className={`section ${styles.eventsSection}`}>
      <SectionScene section="events" />
      <div className={`container ${styles.eventsContainer}`}>
        <div className={styles.eventsHeader}>
          <div className="section-tag">
            // 03. TRACKS & COMPETITIONS
          </div>
          <h2 className="section-title">
            Choose Your Arena
          </h2>
          <p className="section-subtitle">
            Two distinct tracks. Level up your algorithmic toolkit in the morning, then put your aura on the line in the afternoon.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {eventData.events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              onOpenDetails={handleOpenDetails}
            />
          ))}
        </div>

        {/* Expanded Detail Panel */}
        <EventDetailPanel
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={handleCloseDetails}
          onRegister={(eventId) => onOpenRegister(eventId)}
          triggerRef={triggerRef}
        />
      </div>
    </section>
  );
}
