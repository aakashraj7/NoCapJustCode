// client/src/components/Intro/introConstants.js

export const INTRO_STATES = {
  LOADING: 'LOADING',             // 0 -> 2.4s: counter to 99%, segmented bar, typing status lines
  ALERT: 'ALERT',                 // 2.4s -> 4.4s: large LARPER DETECTED banner above loader, hazard stripes, orange pulse
  TURN_GREEN: 'TURN_GREEN',       // 4.4s -> 5.6s: cut to green, VERIFIED text, 3x soft green screen wash, 0.4s freeze
  COMPLETE: 'COMPLETE',           // 5.6s -> 6.4s: snaps to 100% with flash, clears loader & banner
  TYPE_LOGO: 'TYPE_LOGO',         // 6.4s -> 8.8s: LARPER OR CODER in real logo style, hold 1s
  SWAP: 'SWAP',                   // 8.8s -> 11.0s: backspace, then PRESENTED BY CELESTIUS in same style, hold 1s
  AUTO_ENTER: 'AUTO_ENTER',       // ~11.0s: smooth fade-out (600ms) into the site
};

export const PRESENTER_NAME = 'CELESTIUS';

export const TIMINGS = {
  LOADING_DURATION: 2400,
  ALERT_DURATION: 2000,
  TURN_GREEN_DURATION: 1200,
  COMPLETE_DURATION: 800,
  HOLD_LOGO: 1000,
  TYPE_CHAR_SPEED: 45,
  BACKSPACE_SPEED: 30,
  HOLD_SWAP: 1000,
  FADE_OUT_DURATION: 600,
  REDUCED_MOTION_HOLD: 1500,
};

export const COLORS = {
  bgBase: '#050507',
  orange: '#F26B3A',
  orangeTip: '#FF9568',
  yellow: '#F5A81C',
  cream: '#F7EDD8',
  green: '#3DDC84',
  greenTip: '#6BF7A7',
  borderDark: 'rgba(247, 237, 216, 0.08)',
};

export const STATUS_LINES = [
  'booting larper-scanner...',
  'scanning resume telemetry...',
  'checking vibes & aura...',
];

export const TOTAL_SEGMENTS = 28;

export const SESSION_KEYS = {
  INTRO_SEEN: 'larper_or_coder_intro_seen',
  SOUND_ENABLED: 'larper_or_coder_sound_enabled',
};
