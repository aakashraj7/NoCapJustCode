// client/src/components/Intro/introConstants.js

export const INTRO_STATES = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',             // 0% -> 99% progress bar (2000ms)
  DETECTED: 'DETECTED',           // "larper detected" box appears with orange handles & blink
  CUT_TO_GREEN: 'CUT_TO_GREEN',   // Popup, handles, blink, and bar turn green in one cut (freezes 1s)
  TYPE_LOGO: 'TYPE_LOGO',         // Types LARPER / OR / CODER_ (holds 1s)
  BACKSPACE: 'BACKSPACE',         // Backspaces away
  TYPE_PRESENTER: 'TYPE_PRESENTER', // Types PRESENTED BY CELESTIALS
  ENTER_READY: 'ENTER_READY',     // Pulsing "ENTER" button shown
  FADING_OUT: 'FADING_OUT',       // Smooth fade out to main site
};

export const TIMINGS = {
  LOADING: 2000,
  DETECTED_ORANGE: 1200,
  FREEZE_GREEN: 1000,
  HOLD_LOGO: 1000,
  TYPE_INTERVAL: 40,
  BACKSPACE_INTERVAL: 25,
};

export const SESSION_KEY = 'larper_or_coder_intro_seen';
