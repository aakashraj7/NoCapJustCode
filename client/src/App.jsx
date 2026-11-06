// client/src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { checkHealth } from './services/api.js';
import Scene from './components/Scene/Scene.jsx';
import Intro from './components/Intro/Intro.jsx';
import CelestiusSplash from './components/Splash/CelestiusSplash.jsx';
import { SESSION_KEYS } from './components/Intro/introConstants.js';
import { logTimelineEvent } from './utils/timelineLogger.js';
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Schedule from './components/Schedule/Schedule.jsx';
import EventCards from './components/Events/EventCards.jsx';
import RegisterModal from './components/Register/RegisterModal.jsx';
import Footer from './components/Footer/Footer.jsx';

export default function App() {
  const [appFlow, setAppFlow] = useState(() => {
    if (typeof window === 'undefined') return 'INTRO';
    const seen =
      sessionStorage.getItem(SESSION_KEYS?.INTRO_SEEN || 'larper_or_coder_intro_seen') === 'true' ||
      sessionStorage.getItem('INTRO_SEEN') === 'true';
    return seen ? 'SITE' : 'INTRO';
  });
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

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

  // Handle tab visibility to pause animations when hidden
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        document.documentElement.classList.add('tab-hidden');
      } else {
        document.documentElement.classList.remove('tab-hidden');
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  // Lock scroll while intro or splash is active
  useEffect(() => {
    if (appFlow !== 'SITE') {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [appFlow]);

  const handleOpenRegister = () => {
    setRegisterModalOpen(true);
  };

  const handleCloseRegister = () => {
    setRegisterModalOpen(false);
  };

  const handleIntroComplete = useCallback(() => {
    setAppFlow('SPLASH');
  }, []);

  const handleSplashComplete = useCallback(() => {
    setAppFlow('SITE');
    logTimelineEvent('site visible');
    try {
      sessionStorage.setItem('INTRO_SEEN', 'true');
      sessionStorage.setItem(
        SESSION_KEYS?.INTRO_SEEN || 'larper_or_coder_intro_seen',
        'true'
      );
    } catch {
      // Storage safety
    }
  }, []);

  return (
    <div className="appWrapper">
      {/* Background Coding Scene (Dot Grid, Ambient Glows, Rising Embers) */}
      <Scene />

      {/* Story Introduction Overlay */}
      {appFlow === 'INTRO' && (
        <Intro onComplete={handleIntroComplete} />
      )}

      {/* Celestius Splash Screen Overlay */}
      {appFlow === 'SPLASH' && (
        <CelestiusSplash onComplete={handleSplashComplete} />
      )}

      {/* Main Site Container: inert while intro/splash active */}
      <div
        className="siteWrapper"
        inert={appFlow !== 'SITE'}
        aria-hidden={appFlow !== 'SITE'}
      >
        {/* Floating Pill Navbar */}
        <Navbar onOpenRegister={handleOpenRegister} />

        {/* Main Sections */}
        <main className="mainContent">
          <Hero onOpenRegister={handleOpenRegister} />
          <About />
          <Schedule />
          <EventCards onOpenRegister={handleOpenRegister} />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Registration Modal / Bottom Sheet */}
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={handleCloseRegister}
      />
    </div>
  );
}
