// client/src/components/Scene/hardwareConfig.js

/**
 * Global Hardware Scene Configuration:
 * Allows one-place tuning of stroke opacities, halos, colors, and piece allocations.
 */
export const OPACITY = {
  strokeStandard: 0.30,         // Stroke opacity 0.22 to 0.38
  strokeHeroLaptop: 0.42,       // Hero laptop up to 0.45
  strokePhone: 0.35,            // Phone pieces opacity 0.30 to 0.40
  accent: 0.50,                 // Accent parts (one per piece) orange at 0.5
  fillCream: 'rgba(247, 237, 216, 0.025)', // Pure line art: at most 3% cream fill
  trace: 0.14,                  // Circuit trace cream at 0.14
  tracePulse: 0.50,             // Orange pulses at 0.5
};

export const HALO_OPACITY = {
  center: 'rgba(242, 107, 58, 0.10)',
  mid: 'rgba(245, 168, 28, 0.04)',
  outer: 'transparent',
  radiusMultiplier: 1.4,
};

export const PIECES_PER_BAND_DESKTOP = 3;
export const PIECES_PER_BAND_PHONE = 2;

export const BAND_MIX = {
  'hero-about': {
    desktop: ['keyboard', 'cpu', 'ssd'],
    phone: ['keyboard', 'ssd'],
  },
  'about-schedule': {
    desktop: ['ram', 'gpu', 'motherboard'],
    phone: ['ram', 'gpu'],
  },
  'schedule-events': {
    desktop: ['monitor', 'mouse', 'usb'],
    phone: ['monitor', 'usb'],
  },
  'events-footer': {
    desktop: ['laptop', 'cpu'],
    phone: ['laptop', 'cpu'],
  },
};

export const HERO_MIX = {
  desktop: {
    supporting: ['cpu', 'ram'], // 2 supporting pieces on trace near laptop
  },
  phone: {
    topStrip: ['cpu', 'ssd', 'ram'], // exactly 3 pieces in strip under navbar
  },
};

export const WIDE_MARGINS = {
  minWidth: 1600,
  maxPiecesPerSide: 1, // at most 1 piece per side
};
