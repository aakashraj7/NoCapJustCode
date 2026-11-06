// client/src/components/Scene/hardwareConfig.js

/**
 * Global Hardware Scene Configuration:
 * Tunable knobs for stroke opacities, halos, colors, animation speeds, and per-section layouts.
 * Every piece is fully visible in its safe zone (no cropping, no negative offsets, >= 16px inset).
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

export const FLOAT_AMOUNT = 8;          // translateY under 12px, rotation under 2deg

export const BREAKPOINT_COUNTS = {
  desktop: { big: 2, small: 3 },        // laptop 1200+: 2 big + 3 small
  tablet: { big: 1, small: 3 },         // tablet 768-1199: 1 big + 3 small
  phone: { big: 1, small: 2 },          // phone <768: 1 big + 2 small (max 3 per screen)
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
  parallaxFactor: 0.03,         // Max scroll parallax factor (< 0.1x)
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
 * Safe inset >= 16px from every edge. Zero cropping. Zero overlap with content.
 */
export const SECTION_SCENES = {
  hero: {
    desktop: {
      big: [
        { type: 'Cpu', size: 140, pos: { top: '36px', left: '32px' }, rotate: -10, float: 'C', color: THEME.orange },
        { type: 'Gpu', size: 260, pos: { bottom: '24px', right: '32px' }, rotate: 8, float: 'B', color: THEME.yellow },
      ],
      small: [
        { type: 'Screw', size: 38, pos: { top: '32px', right: '64px' }, rotate: 25, spin: 85, color: THEME.orange },
        { type: 'HexBolt', size: 42, pos: { bottom: '32px', left: '64px' }, rotate: -40, spin: 105, color: THEME.yellow },
        { type: 'TinyChip', size: 40, pos: { top: '50%', left: '24px' }, rotate: -18, color: THEME.orange },
      ],
    },
    tablet: {
      big: [
        { type: 'Laptop', size: 230, pos: { bottom: '28px', right: '36px' }, rotate: 8, float: 'A', color: THEME.orange },
      ],
      small: [
        { type: 'Screw', size: 36, pos: { top: '32px', left: '36px' }, rotate: 20, spin: 85, color: THEME.orange },
        { type: 'HexBolt', size: 38, pos: { top: '36px', right: '48px' }, rotate: -35, spin: 105, color: THEME.yellow },
        { type: 'Standoff', size: 40, pos: { bottom: '36px', left: '48px' }, rotate: 15, color: THEME.yellow },
      ],
    },
    phone: {
      big: [
        { type: 'Laptop', size: 180, pos: { bottom: '24px', right: '20px' }, rotate: 6, float: 'A', color: THEME.orange },
      ],
      small: [
        { type: 'Screw', size: 32, pos: { top: '28px', left: '24px' }, rotate: 25, spin: 80, color: THEME.orange },
        { type: 'HexBolt', size: 34, pos: { bottom: '28px', left: '24px' }, rotate: -25, spin: 100, color: THEME.yellow },
      ],
    },
  },

  about: {
    desktop: {
      big: [
        { type: 'Cpu', size: 190, pos: { top: '28px', left: '32px' }, rotate: -12, float: 'B', color: THEME.orange },
        { type: 'M2Ssd', size: 240, pos: { bottom: '28px', right: '32px' }, rotate: 16, float: 'C', color: THEME.yellow },
      ],
      small: [
        { type: 'SingleKeycap', size: 44, pos: { top: '32px', right: '64px' }, rotate: 18, color: THEME.yellow },
        { type: 'Standoff', size: 42, pos: { bottom: '36px', left: '64px' }, rotate: -35, color: THEME.orange },
        { type: 'Screw', size: 34, pos: { top: '50%', right: '24px' }, rotate: 50, spin: 75, color: THEME.yellow },
      ],
    },
    tablet: {
      big: [
        { type: 'Cpu', size: 170, pos: { bottom: '28px', left: '36px' }, rotate: -12, float: 'B', color: THEME.orange },
      ],
      small: [
        { type: 'SingleKeycap', size: 40, pos: { top: '32px', right: '40px' }, rotate: 16, color: THEME.yellow },
        { type: 'Standoff', size: 42, pos: { top: '32px', left: '48px' }, rotate: -25, color: THEME.orange },
        { type: 'Screw', size: 36, pos: { bottom: '36px', right: '48px' }, rotate: 45, spin: 90, color: THEME.yellow },
      ],
    },
    phone: {
      big: [
        { type: 'Cpu', size: 150, pos: { bottom: '24px', left: '20px' }, rotate: -12, float: 'B', color: THEME.orange },
      ],
      small: [
        { type: 'SingleKeycap', size: 36, pos: { top: '28px', right: '24px' }, rotate: 12, color: THEME.yellow },
        { type: 'Screw', size: 32, pos: { bottom: '28px', right: '24px' }, rotate: -30, spin: 85, color: THEME.orange },
      ],
    },
  },

  schedule: {
    desktop: {
      big: [
        { type: 'RamStick', size: 240, pos: { top: '28px', right: '32px' }, rotate: -16, float: 'C', color: THEME.orange },
        { type: 'Keyboard', size: 270, pos: { bottom: '24px', left: '32px' }, rotate: 10, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'HexBolt', size: 42, pos: { top: '32px', left: '64px' }, rotate: 45, spin: 95, color: THEME.yellow },
        { type: 'JumperPin', size: 38, pos: { bottom: '36px', right: '64px' }, rotate: -15, color: THEME.orange },
        { type: 'SdCard', size: 46, pos: { top: '50%', left: '24px' }, rotate: 30, color: THEME.yellow },
      ],
    },
    tablet: {
      big: [
        { type: 'Keyboard', size: 240, pos: { bottom: '28px', right: '36px' }, rotate: 10, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'HexBolt', size: 40, pos: { top: '32px', left: '40px' }, rotate: 35, spin: 95, color: THEME.yellow },
        { type: 'JumperPin', size: 38, pos: { top: '32px', right: '48px' }, rotate: -15, color: THEME.orange },
        { type: 'SdCard', size: 44, pos: { bottom: '36px', left: '48px' }, rotate: 25, color: THEME.yellow },
      ],
    },
    phone: {
      big: [
        { type: 'Keyboard', size: 200, pos: { bottom: '24px', right: '20px' }, rotate: 8, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'HexBolt', size: 34, pos: { top: '28px', left: '24px' }, rotate: -25, spin: 90, color: THEME.yellow },
        { type: 'JumperPin', size: 34, pos: { bottom: '28px', left: '24px' }, rotate: 20, color: THEME.orange },
      ],
    },
  },

  events: {
    desktop: {
      big: [
        { type: 'Gpu', size: 260, pos: { top: '28px', left: '32px' }, rotate: -12, float: 'B', color: THEME.orange },
        { type: 'Monitor', size: 240, pos: { bottom: '24px', right: '32px' }, rotate: 12, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'UsbDrive', size: 54, pos: { top: '32px', right: '64px' }, rotate: -35, color: THEME.orange },
        { type: 'TinyChip', size: 40, pos: { bottom: '36px', left: '64px' }, rotate: 22, color: THEME.yellow },
        { type: 'Screw', size: 36, pos: { top: '50%', right: '24px' }, rotate: -60, spin: 80, color: THEME.orange },
      ],
    },
    tablet: {
      big: [
        { type: 'Monitor', size: 220, pos: { bottom: '28px', left: '36px' }, rotate: -8, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'UsbDrive', size: 48, pos: { top: '32px', right: '40px' }, rotate: -30, color: THEME.orange },
        { type: 'TinyChip', size: 38, pos: { top: '32px', left: '48px' }, rotate: 20, color: THEME.yellow },
        { type: 'Screw', size: 36, pos: { bottom: '36px', right: '48px' }, rotate: -50, spin: 80, color: THEME.orange },
      ],
    },
    phone: {
      big: [
        { type: 'Monitor', size: 180, pos: { bottom: '24px', left: '20px' }, rotate: -8, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'UsbDrive', size: 42, pos: { top: '28px', right: '24px' }, rotate: -25, color: THEME.orange },
        { type: 'Screw', size: 32, pos: { bottom: '28px', right: '24px' }, rotate: 45, spin: 85, color: THEME.yellow },
      ],
    },
  },

  footer: {
    desktop: {
      big: [
        { type: 'CaseFan', size: 190, pos: { bottom: '24px', left: '32px' }, rotate: 12, float: 'C', color: THEME.orange },
        { type: 'Laptop', size: 240, pos: { bottom: '24px', right: '32px' }, rotate: -10, float: 'A', color: THEME.yellow },
      ],
      small: [
        { type: 'HexBolt', size: 40, pos: { top: '32px', left: '64px' }, rotate: -45, spin: 110, color: THEME.yellow },
        { type: 'Standoff', size: 42, pos: { top: '32px', right: '64px' }, rotate: 30, color: THEME.orange },
        { type: 'Screw', size: 34, pos: { top: '50%', left: '24px' }, rotate: 10, spin: 90, color: THEME.yellow },
      ],
    },
    tablet: {
      big: [
        { type: 'CaseFan', size: 180, pos: { bottom: '28px', right: '36px' }, rotate: 12, float: 'C', color: THEME.orange },
      ],
      small: [
        { type: 'HexBolt', size: 38, pos: { top: '32px', left: '40px' }, rotate: -35, spin: 105, color: THEME.yellow },
        { type: 'Standoff', size: 40, pos: { top: '32px', right: '48px' }, rotate: 25, color: THEME.orange },
        { type: 'Screw', size: 34, pos: { bottom: '36px', left: '48px' }, rotate: 45, spin: 85, color: THEME.yellow },
      ],
    },
    phone: {
      big: [
        { type: 'CaseFan', size: 160, pos: { bottom: '24px', right: '20px' }, rotate: 12, float: 'C', color: THEME.orange },
      ],
      small: [
        { type: 'HexBolt', size: 34, pos: { top: '28px', left: '24px' }, rotate: -30, spin: 95, color: THEME.yellow },
        { type: 'Screw', size: 30, pos: { bottom: '28px', left: '24px' }, rotate: 40, spin: 80, color: THEME.orange },
      ],
    },
  },
};
