// client/src/components/Scene/hardwareConfig.js

/**
 * Global Hardware Scene Configuration:
 * Purely decorative background layer (z-index: 0, pointer-events: none, takes zero flow space).
 * Low opacity (0.10 to 0.14) so content & text are 100% crisp and readable.
 * Sized 1.2x to 1.4x larger and placed at section edges/corners with partial edge cropping.
 */

// Tunable Knobs
export const LAPTOP_HALO = false;       // Hero laptop has zero halo/glow/gradient
export const BIG_OPACITY = 0.11;        // Low opacity for subtle background art behind text
export const SMALL_OPACITY = 0.14;      // Faint screws, bolts, small chips
export const CREAM_DETAIL_OPACITY = 0.08;// Subtle cream accents
export const HALO_OPACITY = 0.03;       // Soft warm radial tint behind pieces

export const SPIN_SPEED = {
  fan: 12,                              // 10 to 16s linear fan spin
  bolt: 90,                             // 60 to 120s slow screw/bolt spin
};

export const FLOAT_AMOUNT = 8;          // translateY under 12px, rotation under 2deg

export const BREAKPOINT_COUNTS = {
  desktop: { big: 2, small: 3 },        // laptop 1200+: 2 big + 3 small
  tablet: { big: 1, small: 3 },         // tablet 768-1199: 1 big + 3 small
  phone: { big: 1, small: 2 },          // phone <768: 1 big + 2 small
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
  accent: 0.18,
  fillCream: 'rgba(247, 237, 216, 0.02)',
};

export const MOTION = {
  floatDuration: 24,            // 18 to 30s staggered float
  fanSpinDuration: SPIN_SPEED.fan, // 10 to 16s fan spin
  boltSpinDuration: SPIN_SPEED.bolt,// 60 to 120s slow screw/bolt spin
  parallaxFactor: 0.025,        // Max scroll parallax factor (< 0.1x)
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
 * Hand-placed layout per section in margins & edges behind content.
 * Pieces are ~1.2x–1.4x larger, at low opacity, partially cropped at section edges.
 */
export const SECTION_SCENES = {
  hero: {
    desktop: {
      big: [
        { type: 'Cpu', size: 180, pos: { top: '8%', left: '-3%' }, rotate: -10, float: 'C', color: THEME.orange },
        { type: 'Gpu', size: 320, pos: { bottom: '5%', right: '-4%' }, rotate: 8, float: 'B', color: THEME.yellow },
      ],
      small: [
        { type: 'Screw', size: 48, pos: { top: '6%', right: '8%' }, rotate: 25, spin: 85, color: THEME.orange },
        { type: 'HexBolt', size: 50, pos: { bottom: '8%', left: '8%' }, rotate: -40, spin: 105, color: THEME.yellow },
        { type: 'TinyChip', size: 48, pos: { top: '48%', left: '2%' }, rotate: -18, color: THEME.orange },
      ],
    },
    tablet: {
      big: [
        { type: 'Laptop', size: 280, pos: { bottom: '6%', right: '-5%' }, rotate: 8, float: 'A', color: THEME.orange },
      ],
      small: [
        { type: 'Screw', size: 44, pos: { top: '6%', left: '5%' }, rotate: 20, spin: 85, color: THEME.orange },
        { type: 'HexBolt', size: 46, pos: { top: '8%', right: '6%' }, rotate: -35, spin: 105, color: THEME.yellow },
        { type: 'Standoff', size: 48, pos: { bottom: '8%', left: '6%' }, rotate: 15, color: THEME.yellow },
      ],
    },
    phone: {
      big: [
        { type: 'Laptop', size: 230, pos: { bottom: '4%', right: '-8%' }, rotate: 6, float: 'A', color: THEME.orange },
      ],
      small: [
        { type: 'Screw', size: 40, pos: { top: '6%', left: '4%' }, rotate: 25, spin: 80, color: THEME.orange },
        { type: 'HexBolt', size: 42, pos: { bottom: '8%', left: '4%' }, rotate: -25, spin: 100, color: THEME.yellow },
      ],
    },
  },

  about: {
    desktop: {
      big: [
        { type: 'Cpu', size: 240, pos: { top: '6%', left: '-4%' }, rotate: -12, float: 'B', color: THEME.orange },
        { type: 'M2Ssd', size: 300, pos: { bottom: '6%', right: '-4%' }, rotate: 16, float: 'C', color: THEME.yellow },
      ],
      small: [
        { type: 'SingleKeycap', size: 52, pos: { top: '8%', right: '8%' }, rotate: 18, color: THEME.yellow },
        { type: 'Standoff', size: 50, pos: { bottom: '8%', left: '8%' }, rotate: -35, color: THEME.orange },
        { type: 'Screw', size: 44, pos: { top: '48%', right: '3%' }, rotate: 50, spin: 75, color: THEME.yellow },
      ],
    },
    tablet: {
      big: [
        { type: 'Cpu', size: 210, pos: { bottom: '6%', left: '-5%' }, rotate: -12, float: 'B', color: THEME.orange },
      ],
      small: [
        { type: 'SingleKeycap', size: 46, pos: { top: '6%', right: '6%' }, rotate: 16, color: THEME.yellow },
        { type: 'Standoff', size: 48, pos: { top: '8%', left: '6%' }, rotate: -25, color: THEME.orange },
        { type: 'Screw', size: 42, pos: { bottom: '8%', right: '6%' }, rotate: 45, spin: 90, color: THEME.yellow },
      ],
    },
    phone: {
      big: [
        { type: 'Cpu', size: 190, pos: { bottom: '4%', left: '-8%' }, rotate: -12, float: 'B', color: THEME.orange },
      ],
      small: [
        { type: 'SingleKeycap', size: 42, pos: { top: '6%', right: '5%' }, rotate: 12, color: THEME.yellow },
        { type: 'Screw', size: 38, pos: { bottom: '8%', right: '5%' }, rotate: -30, spin: 85, color: THEME.orange },
      ],
    },
  },

  schedule: {
    desktop: {
      big: [
        { type: 'RamStick', size: 300, pos: { top: '6%', right: '-4%' }, rotate: -16, float: 'C', color: THEME.orange },
        { type: 'Keyboard', size: 340, pos: { bottom: '5%', left: '-4%' }, rotate: 10, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'HexBolt', size: 50, pos: { top: '8%', left: '8%' }, rotate: 45, spin: 95, color: THEME.yellow },
        { type: 'JumperPin', size: 46, pos: { bottom: '8%', right: '8%' }, rotate: -15, color: THEME.orange },
        { type: 'SdCard', size: 52, pos: { top: '48%', left: '3%' }, rotate: 30, color: THEME.yellow },
      ],
    },
    tablet: {
      big: [
        { type: 'Keyboard', size: 290, pos: { bottom: '6%', right: '-5%' }, rotate: 10, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'HexBolt', size: 46, pos: { top: '6%', left: '6%' }, rotate: 35, spin: 95, color: THEME.yellow },
        { type: 'JumperPin', size: 44, pos: { top: '8%', right: '6%' }, rotate: -15, color: THEME.orange },
        { type: 'SdCard', size: 48, pos: { bottom: '8%', left: '6%' }, rotate: 25, color: THEME.yellow },
      ],
    },
    phone: {
      big: [
        { type: 'Keyboard', size: 240, pos: { bottom: '4%', right: '-8%' }, rotate: 8, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'HexBolt', size: 40, pos: { top: '6%', left: '5%' }, rotate: -25, spin: 90, color: THEME.yellow },
        { type: 'JumperPin', size: 40, pos: { bottom: '8%', left: '5%' }, rotate: 20, color: THEME.orange },
      ],
    },
  },

  events: {
    desktop: {
      big: [
        { type: 'Gpu', size: 330, pos: { top: '6%', left: '-4%' }, rotate: -12, float: 'B', color: THEME.orange },
        { type: 'Monitor', size: 300, pos: { bottom: '5%', right: '-4%' }, rotate: 12, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'UsbDrive', size: 62, pos: { top: '8%', right: '8%' }, rotate: -35, color: THEME.orange },
        { type: 'TinyChip', size: 48, pos: { bottom: '8%', left: '8%' }, rotate: 22, color: THEME.yellow },
        { type: 'Screw', size: 44, pos: { top: '48%', right: '3%' }, rotate: -60, spin: 80, color: THEME.orange },
      ],
    },
    tablet: {
      big: [
        { type: 'Monitor', size: 270, pos: { bottom: '6%', left: '-5%' }, rotate: -8, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'UsbDrive', size: 54, pos: { top: '6%', right: '6%' }, rotate: -30, color: THEME.orange },
        { type: 'TinyChip', size: 44, pos: { top: '8%', left: '6%' }, rotate: 20, color: THEME.yellow },
        { type: 'Screw', size: 42, pos: { bottom: '8%', right: '6%' }, rotate: -50, spin: 80, color: THEME.orange },
      ],
    },
    phone: {
      big: [
        { type: 'Monitor', size: 220, pos: { bottom: '4%', left: '-8%' }, rotate: -8, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'UsbDrive', size: 48, pos: { top: '6%', right: '5%' }, rotate: -25, color: THEME.orange },
        { type: 'Screw', size: 38, pos: { bottom: '8%', right: '5%' }, rotate: 45, spin: 85, color: THEME.yellow },
      ],
    },
  },

  footer: {
    desktop: {
      big: [
        { type: 'CaseFan', size: 240, pos: { bottom: '4%', left: '-3%' }, rotate: 12, float: 'C', color: THEME.orange },
        { type: 'Laptop', size: 300, pos: { bottom: '4%', right: '-3%' }, rotate: -10, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'HexBolt', size: 48, pos: { top: '8%', left: '8%' }, rotate: -45, spin: 110, color: THEME.yellow },
        { type: 'Standoff', size: 50, pos: { top: '8%', right: '8%' }, rotate: 30, color: THEME.orange },
        { type: 'Screw', size: 42, pos: { top: '48%', left: '3%' }, rotate: 10, spin: 90, color: THEME.yellow },
      ],
    },
    tablet: {
      big: [
        { type: 'CaseFan', size: 220, pos: { bottom: '6%', right: '-4%' }, rotate: 12, float: 'C', color: THEME.orange },
      ],
      small: [
        { type: 'HexBolt', size: 46, pos: { top: '6%', left: '6%' }, rotate: -35, spin: 105, color: THEME.yellow },
        { type: 'Standoff', size: 48, pos: { top: '8%', right: '6%' }, rotate: 25, color: THEME.orange },
        { type: 'Screw', size: 42, pos: { bottom: '8%', left: '6%' }, rotate: 45, spin: 85, color: THEME.yellow },
      ],
    },
    phone: {
      big: [
        { type: 'CaseFan', size: 190, pos: { bottom: '4%', right: '-6%' }, rotate: 12, float: 'C', color: THEME.orange },
      ],
      small: [
        { type: 'HexBolt', size: 40, pos: { top: '6%', left: '5%' }, rotate: -30, spin: 95, color: THEME.yellow },
        { type: 'Screw', size: 36, pos: { bottom: '8%', left: '5%' }, rotate: 40, spin: 80, color: THEME.orange },
      ],
    },
  },
};
