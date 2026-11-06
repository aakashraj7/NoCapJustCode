// client/src/components/Scene/hardwareConfig.js

/**
 * Global Hardware Scene Configuration:
 * Every piece has its full bounding box strictly inside the viewport and section (>= 16px safe inset).
 * Zero cropping. Zero overlap with text, buttons, cards or logos.
 */

// Tunable Knobs
export const LAPTOP_HALO = false;       // Hero laptop has zero halo/glow/gradient
export const BIG_OPACITY = 0.16;        // 0.12 to 0.20 stroke opacity
export const SMALL_OPACITY = 0.20;      // Screws, bolts, small chips
export const CREAM_DETAIL_OPACITY = 0.12;// Subtle cream accents
export const HALO_OPACITY = 0.04;       // Soft warm radial tint behind pieces

export const SPIN_SPEED = {
  fan: 12,                              // 10 to 16s linear fan spin
  bolt: 90,                             // 60 to 120s slow screw/bolt spin
};

export const FLOAT_AMOUNT = 6;          // translateY under 8px, rotation under 1deg

export const BREAKPOINT_COUNTS = {
  desktop: { big: 2, small: 3 },        // laptop 1200+: 2 big + 3 small
  tablet: { big: 1, small: 3 },         // tablet 768-1199: 1 big + 3 small
  phone: { big: 1, small: 2 },          // phone <768: at most 1 big + 2 small per section (max 3 per screen)
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

export const OPACITY = {
  strokeStandard: BIG_OPACITY,
  strokeHeroLaptop: 0.18,
  accent: 0.22,
  fillCream: 'rgba(247, 237, 216, 0.02)',
};

export const MOTION = {
  floatDuration: 24,            // 18 to 30s staggered float
  fanSpinDuration: SPIN_SPEED.fan, // 10 to 16s fan spin
  boltSpinDuration: SPIN_SPEED.bolt,// 60 to 120s slow screw/bolt spin
  parallaxFactor: 0.02,         // Max scroll parallax factor (< 0.1x)
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
 * Hand-placed layout per section in empty safe zones (padding & side margins).
 * Inset >= 18px from every edge. Zero cropping. Zero overlap with content.
 */
export const SECTION_SCENES = {
  hero: {
    desktop: {
      big: [
        { type: 'Cpu', size: 100, pos: { top: '24px', left: '24px' }, rotate: 0, float: 'C', color: THEME.orange },
        { type: 'Gpu', size: 210, pos: { bottom: '72px', right: '36px' }, rotate: 0, float: 'B', color: THEME.yellow },
      ],
      small: [
        { type: 'Screw', size: 36, pos: { top: '32px', right: '48px' }, rotate: 0, spin: 85, color: THEME.orange },
        { type: 'HexBolt', size: 38, pos: { bottom: '72px', left: '48px' }, rotate: 0, spin: 105, color: THEME.yellow },
        { type: 'TinyChip', size: 36, pos: { top: '48%', left: '20px' }, rotate: 0, color: THEME.orange },
      ],
    },
    tablet: {
      big: [
        { type: 'Laptop', size: 190, pos: { bottom: '72px', right: '36px' }, rotate: 0, float: 'A', color: THEME.orange },
      ],
      small: [
        { type: 'Screw', size: 36, pos: { top: '32px', left: '36px' }, rotate: 0, spin: 85, color: THEME.orange },
        { type: 'HexBolt', size: 38, pos: { top: '36px', right: '48px' }, rotate: 0, spin: 105, color: THEME.yellow },
        { type: 'Standoff', size: 38, pos: { bottom: '72px', left: '48px' }, rotate: 0, color: THEME.yellow },
      ],
    },
    phone: {
      big: [
        { type: 'Cpu', size: 75, pos: { top: '18px', right: '20px' }, rotate: 0, float: 'A', color: THEME.orange },
      ],
      small: [
        { type: 'Screw', size: 30, pos: { top: '22px', left: '20px' }, rotate: 0, spin: 80, color: THEME.orange },
      ],
    },
  },

  about: {
    desktop: {
      big: [
        { type: 'Cpu', size: 120, pos: { top: '24px', left: '36px' }, rotate: 0, float: 'B', color: THEME.orange },
        { type: 'M2Ssd', size: 180, pos: { bottom: '24px', right: '36px' }, rotate: 0, float: 'C', color: THEME.yellow },
      ],
      small: [
        { type: 'SingleKeycap', size: 40, pos: { top: '28px', right: '48px' }, rotate: 0, color: THEME.yellow },
        { type: 'Standoff', size: 40, pos: { bottom: '28px', left: '48px' }, rotate: 0, color: THEME.orange },
        { type: 'Screw', size: 34, pos: { top: '50%', right: '20px' }, rotate: 0, spin: 75, color: THEME.yellow },
      ],
    },
    tablet: {
      big: [
        { type: 'Cpu', size: 110, pos: { top: '24px', right: '36px' }, rotate: 0, float: 'B', color: THEME.orange },
      ],
      small: [
        { type: 'SingleKeycap', size: 38, pos: { top: '24px', left: '36px' }, rotate: 0, color: THEME.yellow },
        { type: 'Standoff', size: 38, pos: { bottom: '24px', left: '36px' }, rotate: 0, color: THEME.orange },
        { type: 'Screw', size: 32, pos: { bottom: '24px', right: '36px' }, rotate: 0, spin: 90, color: THEME.yellow },
      ],
    },
    phone: {
      big: [
        { type: 'Cpu', size: 75, pos: { top: '18px', right: '20px' }, rotate: 0, float: 'B', color: THEME.orange },
      ],
      small: [
        { type: 'SingleKeycap', size: 32, pos: { top: '22px', left: '20px' }, rotate: 0, color: THEME.yellow },
        { type: 'Screw', size: 30, pos: { bottom: '22px', left: '20px' }, rotate: 0, spin: 85, color: THEME.orange },
      ],
    },
  },

  schedule: {
    desktop: {
      big: [
        { type: 'RamStick', size: 180, pos: { top: '24px', right: '36px' }, rotate: 0, float: 'C', color: THEME.orange },
        { type: 'Keyboard', size: 210, pos: { bottom: '24px', left: '36px' }, rotate: 0, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'HexBolt', size: 38, pos: { top: '28px', left: '48px' }, rotate: 0, spin: 95, color: THEME.yellow },
        { type: 'JumperPin', size: 38, pos: { bottom: '28px', right: '48px' }, rotate: 0, color: THEME.orange },
        { type: 'SdCard', size: 40, pos: { top: '50%', left: '20px' }, rotate: 0, color: THEME.yellow },
      ],
    },
    tablet: {
      big: [
        { type: 'Keyboard', size: 190, pos: { bottom: '28px', right: '36px' }, rotate: 0, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'HexBolt', size: 36, pos: { top: '24px', left: '36px' }, rotate: 0, spin: 95, color: THEME.yellow },
        { type: 'JumperPin', size: 36, pos: { top: '24px', right: '40px' }, rotate: 0, color: THEME.orange },
        { type: 'SdCard', size: 38, pos: { bottom: '28px', left: '36px' }, rotate: 0, color: THEME.yellow },
      ],
    },
    phone: {
      big: [
        { type: 'RamStick', size: 120, pos: { top: '20px', right: '20px' }, rotate: 0, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'HexBolt', size: 32, pos: { top: '22px', left: '20px' }, rotate: 0, spin: 90, color: THEME.yellow },
        { type: 'JumperPin', size: 32, pos: { bottom: '22px', right: '20px' }, rotate: 0, color: THEME.orange },
      ],
    },
  },

  events: {
    desktop: {
      big: [
        { type: 'Gpu', size: 190, pos: { top: '24px', left: '36px' }, rotate: 0, float: 'B', color: THEME.orange },
        { type: 'Monitor', size: 170, pos: { bottom: '24px', right: '36px' }, rotate: 0, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'UsbDrive', size: 44, pos: { top: '28px', right: '48px' }, rotate: 0, color: THEME.orange },
        { type: 'TinyChip', size: 36, pos: { bottom: '28px', left: '48px' }, rotate: 0, color: THEME.yellow },
        { type: 'Screw', size: 34, pos: { top: '50%', right: '20px' }, rotate: 0, spin: 80, color: THEME.orange },
      ],
    },
    tablet: {
      big: [
        { type: 'Monitor', size: 150, pos: { bottom: '28px', left: '36px' }, rotate: 0, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'UsbDrive', size: 40, pos: { top: '28px', right: '40px' }, rotate: 0, color: THEME.orange },
        { type: 'TinyChip', size: 36, pos: { top: '28px', left: '40px' }, rotate: 0, color: THEME.yellow },
        { type: 'Screw', size: 32, pos: { bottom: '28px', right: '40px' }, rotate: 0, spin: 80, color: THEME.orange },
      ],
    },
    phone: {
      big: [
        { type: 'Monitor', size: 100, pos: { top: '18px', right: '20px' }, rotate: 0, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'UsbDrive', size: 34, pos: { top: '22px', left: '20px' }, rotate: 0, color: THEME.orange },
        { type: 'Screw', size: 30, pos: { bottom: '22px', left: '20px' }, rotate: 0, spin: 85, color: THEME.yellow },
      ],
    },
  },

  footer: {
    desktop: {
      big: [
        { type: 'CaseFan', size: 100, pos: { top: '24px', right: '48px' }, rotate: 0, float: 'C', color: THEME.orange },
        { type: 'Laptop', size: 170, pos: { bottom: '24px', left: '48px' }, rotate: 0, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'HexBolt', size: 38, pos: { top: '24px', left: '48px' }, rotate: 0, spin: 110, color: THEME.yellow },
        { type: 'Standoff', size: 38, pos: { bottom: '24px', right: '48px' }, rotate: 0, color: THEME.orange },
        { type: 'Screw', size: 34, pos: { top: '50%', right: '20px' }, rotate: 0, spin: 90, color: THEME.yellow },
      ],
    },
    tablet: {
      big: [
        { type: 'CaseFan', size: 100, pos: { bottom: '28px', right: '36px' }, rotate: 0, float: 'C', color: THEME.orange },
      ],
      small: [
        { type: 'HexBolt', size: 36, pos: { top: '28px', left: '40px' }, rotate: 0, spin: 105, color: THEME.yellow },
        { type: 'Standoff', size: 38, pos: { top: '28px', right: '48px' }, rotate: 0, color: THEME.orange },
        { type: 'Screw', size: 34, pos: { bottom: '28px', left: '48px' }, rotate: 0, spin: 85, color: THEME.yellow },
      ],
    },
    phone: {
      big: [
        { type: 'CaseFan', size: 75, pos: { top: '18px', right: '20px' }, rotate: 0, float: 'C', color: THEME.orange },
      ],
      small: [
        { type: 'HexBolt', size: 32, pos: { top: '22px', left: '20px' }, rotate: 0, spin: 95, color: THEME.yellow },
        { type: 'Screw', size: 30, pos: { bottom: '22px', left: '20px' }, rotate: 0, spin: 80, color: THEME.orange },
      ],
    },
  },
};
