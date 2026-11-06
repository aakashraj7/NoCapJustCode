// client/src/components/Scene/hardwareConfig.js

/**
 * Global Hardware Scene Configuration (Scattered Promptverse Gears Aesthetic):
 * Tunable knobs for stroke opacities, halos, colors, animation speeds, and per-section layouts.
 */

// Tunable Knobs
export const BIG_OPACITY = 0.13;        // 0.10 to 0.18 (larger pieces on the lower end)
export const SMALL_OPACITY = 0.16;      // 0.12 to 0.22 (screws, bolts, small chips)
export const CREAM_DETAIL_OPACITY = 0.09;// 0.08 to 0.12 (faint cream accents)
export const HALO_OPACITY = 0.04;       // At most 0.05, default 0.04 (mix-blend-mode: screen)

export const SPIN_SPEED = {
  fan: 12,                              // 10 to 16s linear fan spin
  bolt: 90,                             // 60 to 120s slow screw/bolt spin
};

export const FLOAT_AMOUNT = 10;         // translateY under 12px, rotation under 2deg

export const BREAKPOINT_COUNTS = {
  desktop: { big: 2, small: 3 },        // laptop: 2 big + 3 small
  mobile: { big: 1, small: 2 },         // phone: 1 to 2 big + 2 small
};

export const THEME = {
  bigPieceOpacity: BIG_OPACITY,
  smallPieceOpacity: SMALL_OPACITY,
  creamDetailOpacity: CREAM_DETAIL_OPACITY,
  haloOpacity: HALO_OPACITY,

  // Palette
  orange: '#F26B3A',
  yellow: '#F5A81C',
  cream: '#F7EDD8',
};

// Backwards compatibility for existing imports
export const OPACITY = {
  strokeStandard: BIG_OPACITY,
  strokeHeroLaptop: 0.16,
  accent: 0.20,
  fillCream: 'rgba(247, 237, 216, 0.02)',
};

export const MOTION = {
  floatDuration: 24,            // 18 to 30s staggered float
  fanSpinDuration: SPIN_SPEED.fan, // 10 to 16s fan spin
  boltSpinDuration: SPIN_SPEED.bolt,// 60 to 120s slow screw/bolt spin
  parallaxFactor: 0.04,         // Max scroll parallax factor (< 0.1x)
};

/**
 * Utility to convert hex color (#F26B3A) and alpha to rgba string.
 */
export function hexToRgba(hex, alpha) {
  if (!hex || typeof hex !== 'string') return `rgba(242, 107, 58, ${alpha})`;
  if (hex.startsWith('rgba')) return hex;
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Hand-placed layout per section (free-standing, unconnected, cropped 10-40% at corners & edges).
 * Never repeating the same layout.
 */
export const SECTION_SCENES = {
  hero: {
    desktop: {
      big: [
        // Laptop at lower-left, ~25% cropped beyond section bottom-left
        { type: 'Laptop', size: 340, pos: { bottom: '-12%', left: '-8%' }, rotate: -10, float: 'A', color: THEME.orange },
        // GPU at lower-right, ~20% cropped beyond section bottom-right
        { type: 'Gpu', size: 300, pos: { bottom: '-8%', right: '-6%' }, rotate: 12, float: 'B', color: THEME.yellow },
      ],
      small: [
        { type: 'Screw', size: 38, pos: { top: '18%', left: '4%' }, rotate: 25, spin: 85, color: THEME.orange },
        { type: 'HexBolt', size: 42, pos: { top: '22%', right: '5%' }, rotate: -40, spin: 105, color: THEME.yellow },
        { type: 'Standoff', size: 44, pos: { bottom: '28%', left: '8%' }, rotate: 15, color: THEME.yellow },
        { type: 'TinyChip', size: 40, pos: { bottom: '26%', right: '9%' }, rotate: -18, color: THEME.orange },
      ],
    },
    mobile: {
      big: [
        // Laptop at lower-right corner, partly cropped
        { type: 'Laptop', size: 230, pos: { bottom: '-10%', right: '-12%' }, rotate: 10, float: 'A', color: THEME.orange },
      ],
      small: [
        { type: 'Screw', size: 32, pos: { top: '12%', right: '6%' }, rotate: 30, spin: 80, color: THEME.orange },
        { type: 'HexBolt', size: 36, pos: { bottom: '38%', left: '4%' }, rotate: -20, spin: 100, color: THEME.yellow },
      ],
    },
  },

  about: {
    desktop: {
      big: [
        // CPU at top-left edge, ~20% cropped
        { type: 'Cpu', size: 240, pos: { top: '-10%', left: '-5%' }, rotate: -14, float: 'B', color: THEME.orange },
        // M.2 SSD at bottom-right edge, ~25% cropped
        { type: 'M2Ssd', size: 280, pos: { bottom: '-8%', right: '-8%' }, rotate: 22, float: 'C', color: THEME.yellow },
      ],
      small: [
        { type: 'SingleKeycap', size: 44, pos: { top: '25%', right: '7%' }, rotate: 18, color: THEME.yellow },
        { type: 'Standoff', size: 42, pos: { bottom: '30%', left: '6%' }, rotate: -35, color: THEME.orange },
        { type: 'Screw', size: 34, pos: { bottom: '15%', left: '14%' }, rotate: 50, spin: 75, color: THEME.yellow },
      ],
    },
    mobile: {
      big: [
        { type: 'Cpu', size: 190, pos: { top: '-8%', right: '-10%' }, rotate: -15, float: 'B', color: THEME.orange },
      ],
      small: [
        { type: 'SingleKeycap', size: 36, pos: { bottom: '20%', left: '5%' }, rotate: 12, color: THEME.yellow },
        { type: 'Screw', size: 30, pos: { top: '28%', left: '6%' }, rotate: -40, spin: 85, color: THEME.orange },
      ],
    },
  },

  schedule: {
    desktop: {
      big: [
        // Keyboard at bottom-left corner, ~25% cropped
        { type: 'Keyboard', size: 360, pos: { bottom: '-15%', left: '-10%' }, rotate: 14, float: 'A', color: THEME.yellow },
        // RAM stick at top-right corner, ~20% cropped
        { type: 'RamStick', size: 310, pos: { top: '-10%', right: '-8%' }, rotate: -24, float: 'C', color: THEME.orange },
      ],
      small: [
        { type: 'HexBolt', size: 42, pos: { top: '28%', left: '5%' }, rotate: 45, spin: 95, color: THEME.yellow },
        { type: 'JumperPin', size: 38, pos: { bottom: '35%', right: '8%' }, rotate: -15, color: THEME.orange },
        { type: 'SdCard', size: 46, pos: { bottom: '12%', right: '12%' }, rotate: 30, color: THEME.yellow },
      ],
    },
    mobile: {
      big: [
        { type: 'Keyboard', size: 240, pos: { bottom: '-12%', left: '-14%' }, rotate: 12, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'HexBolt', size: 34, pos: { top: '15%', right: '5%' }, rotate: -30, spin: 90, color: THEME.yellow },
        { type: 'JumperPin', size: 32, pos: { bottom: '30%', right: '6%' }, rotate: 20, color: THEME.orange },
      ],
    },
  },

  events: {
    desktop: {
      big: [
        // GPU at top-left corner, ~20% cropped
        { type: 'Gpu', size: 320, pos: { top: '-8%', left: '-6%' }, rotate: -18, float: 'B', color: THEME.orange },
        // Monitor at bottom-right corner, ~25% cropped
        { type: 'Monitor', size: 290, pos: { bottom: '-12%', right: '-8%' }, rotate: 15, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'UsbDrive', size: 54, pos: { top: '35%', right: '6%' }, rotate: -35, color: THEME.orange },
        { type: 'TinyChip', size: 40, pos: { bottom: '25%', left: '7%' }, rotate: 22, color: THEME.yellow },
        { type: 'Screw', size: 36, pos: { bottom: '10%', left: '15%' }, rotate: -60, spin: 80, color: THEME.orange },
      ],
    },
    mobile: {
      big: [
        { type: 'Monitor', size: 210, pos: { bottom: '-10%', right: '-10%' }, rotate: 12, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'UsbDrive', size: 42, pos: { top: '22%', left: '5%' }, rotate: -25, color: THEME.orange },
        { type: 'Screw', size: 32, pos: { bottom: '32%', left: '6%' }, rotate: 45, spin: 85, color: THEME.yellow },
      ],
    },
  },

  footer: {
    desktop: {
      big: [
        // CaseFan at lower-left, ~25% cropped
        { type: 'CaseFan', size: 250, pos: { bottom: '-18%', left: '-6%' }, rotate: 15, float: 'C', color: THEME.orange },
        // Laptop at lower-right, ~25% cropped
        { type: 'Laptop', size: 280, pos: { bottom: '-15%', right: '-6%' }, rotate: -12, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'HexBolt', size: 40, pos: { top: '20%', left: '10%' }, rotate: -45, spin: 110, color: THEME.yellow },
        { type: 'Standoff', size: 42, pos: { top: '25%', right: '12%' }, rotate: 30, color: THEME.orange },
        { type: 'Screw', size: 34, pos: { bottom: '35%', left: '48%' }, rotate: 10, spin: 90, color: THEME.yellow },
      ],
    },
    mobile: {
      big: [
        { type: 'CaseFan', size: 190, pos: { bottom: '-15%', right: '-12%' }, rotate: 15, float: 'C', color: THEME.orange },
      ],
      small: [
        { type: 'HexBolt', size: 34, pos: { top: '20%', left: '8%' }, rotate: -30, spin: 95, color: THEME.yellow },
        { type: 'Screw', size: 30, pos: { bottom: '40%', left: '12%' }, rotate: 40, spin: 80, color: THEME.orange },
      ],
    },
  },
};
