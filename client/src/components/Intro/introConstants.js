// client/src/components/Intro/introConstants.js

export const INTRO_STATES = {
  LOADING: 'LOADING',             // 0 -> 2.4s: counter to 99%, segmented bar, single status line
  ALERT: 'ALERT',                 // 2.4s -> 4.4s: "LARPER DETECTED" banner above loader, 3x orange screen wash (peak 0.25)
  TURN_GREEN: 'TURN_GREEN',       // 4.4s -> 5.9s: cut to green, 3x green wash (peak 0.28), counter 99% -> 100% over 1.5s
  COMPLETE: 'COMPLETE',           // 5.9s -> 6.3s: 100% flash & 0.4s hold, clears loader & banner
  TYPE_LOGO: 'TYPE_LOGO',         // 6.3s -> 8.7s: LARPER OR CODER in real pixel style, hold 1s
  SWAP: 'SWAP',                   // 8.7s -> 11.0s: backspace, then PRESENTED BY CELESTIUS in same style, hold 1s
  AUTO_ENTER: 'AUTO_ENTER',       // ~11.0s: smooth fade-out (600ms) into the site
};

export const PRESENTER_NAME = 'CELESTIUS';

export const TIMINGS = {
  LOADING_DURATION: 2400,
  ALERT_DURATION: 2000,
  TURN_GREEN_DURATION: 1500,     // Counter animates 99% -> 100% over 1.5s
  COMPLETE_HOLD: 400,            // 0.4s hold at 100%
  HOLD_LOGO: 1000,
  TYPE_CHAR_SPEED: 90,           // Letters appear one by one (~90ms each)
  BACKSPACE_SPEED: 40,           // Backspace reverse removal
  HOLD_SWAP: 1000,
  FADE_OUT_DURATION: 600,
  REDUCED_MOTION_HOLD: 1500,
};

// Exact sampled colors from client/src/assets/logo.png
export const COLORS = {
  bgBase: '#050507',
  orange: '#F57546',
  orangeGrid: '#C95228',
  orangeEcho: '#7A280D',
  cream: '#F9EDD2',
  creamGrid: '#D8CCAE',
  creamEcho: '#3E3A32',
  yellow: '#FAA012',
  darkText: '#0B0A0D',
  green: '#3DDC84',
  greenGrid: '#228A4E',
  greenEcho: '#11522A',
  borderDark: 'rgba(247, 237, 216, 0.08)',
};

export const STATUS_LINE_LOADING = '> telemetry: scanning memory space...';

export const TOTAL_SEGMENTS = 26;
export const AREA_PER_PARTICLE = 7700; // Derived from 400x700 with 36 particles

export const SESSION_KEYS = {
  INTRO_SEEN: 'larper_or_coder_intro_seen',
  SOUND_ENABLED: 'larper_or_coder_sound_enabled',
};

/**
 * Hand-written 5x7 bitmap glyph table for authentic retro/chunky pixel typography.
 * Covers: L, A, R, P, E, C, O, D, T, S, I, U, B, Y, N, and space.
 */
export const GLYPHS = {
  L: ['11000', '11000', '11000', '11000', '11000', '11111', '11111'],
  A: ['01110', '11011', '11011', '11111', '11111', '11011', '11011'],
  R: ['11110', '11011', '11011', '11110', '11110', '11011', '11011'],
  P: ['11110', '11011', '11011', '11110', '11000', '11000', '11000'],
  E: ['11111', '11000', '11000', '11110', '11000', '11000', '11111'],
  C: ['01110', '11011', '11000', '11000', '11000', '11011', '01110'],
  O: ['01110', '11011', '11011', '11011', '11011', '11011', '01110'],
  D: ['11110', '11011', '11011', '11011', '11011', '11011', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  S: ['01111', '11000', '11000', '01110', '00011', '00011', '11110'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  U: ['11011', '11011', '11011', '11011', '11011', '11011', '01110'],
  B: ['11110', '11011', '11011', '11110', '11011', '11011', '11110'],
  Y: ['11011', '11011', '11011', '01110', '00100', '00100', '00100'],
  N: ['11011', '11101', '11101', '10111', '10011', '11011', '11011'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
};
