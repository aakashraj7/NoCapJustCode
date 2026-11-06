// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { checkHealth } from './services/api.js';
import Intro from './components/Intro/Intro.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Schedule from './components/Schedule/Schedule.jsx';
import EventCards from './components/Events/EventCards.jsx';
import RegisterModal from './components/Register/RegisterModal.jsx';
import Footer from './components/Footer/Footer.jsx';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [defaultRegisterEvent, setDefaultRegisterEvent] = useState('training-arc');

  // Non-blocking background health check
  useEffect(() => {
    checkHealth().then((status) => {
      if (status.healthy) {
        console.info('[System] Connected to backend server successfully.');
      } else {
        console.info('[System] Backend server offline or mock mode active. Mock adapter will handle registrations.');
      }
    });
  }, []);

  const handleOpenRegister = (eventId = 'training-arc') => {
    setDefaultRegisterEvent(eventId);
    setRegisterModalOpen(true);
  };

  const handleCloseRegister = () => {
    setRegisterModalOpen(false);
  };

  return (
    <div className="appWrapper">
      {/* Story Introduction Overlay */}
      {!introFinished && (
        <Intro onComplete={() => setIntroFinished(true)} />
      )}

      {/* Floating Pill Navbar */}
      <Navbar onOpenRegister={() => handleOpenRegister('training-arc')} />

      {/* Main Sections */}
      <main className="mainContent">
        <Hero onOpenRegister={() => handleOpenRegister('training-arc')} />
        <About />
        <Schedule />
        <EventCards onOpenRegister={handleOpenRegister} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Registration Modal / Bottom Sheet */}
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={handleCloseRegister}
        defaultEventId={defaultRegisterEvent}
      />
    </div>
  );
}
