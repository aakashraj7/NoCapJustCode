// client/src/components/Scene/Prop.jsx
import React, { useEffect, useRef } from 'react';
import styles from './Scene.module.css';

/**
 * Prop component renders coding-themed inline SVG line art decorations.
 * Strokes: 1.5 - 2px, rounded caps.
 * Colors: Cream (7-11% opacity) with Orange accents (12-16% opacity).
 * Large sizing: clamp(220px, 32vw, 560px), partly cropped, with mask-image fades.
 */
export default function Prop({
  name,
  className = '',
  parallaxFactor = 0.04,
  style = {},
  variant = 'default',
}) {
  const propRef = useRef(null);

  // Subtle scroll parallax (disabled for prefers-reduced-motion)
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced || !parallaxFactor) return;

    const scrollStateRef = { ticking: false, animId: null };

    const handleScroll = () => {
      if (!scrollStateRef.ticking) {
        scrollStateRef.animId = requestAnimationFrame(() => {
          if (propRef.current && !document.hidden) {
            const scrollY = window.scrollY || window.pageYOffset;
            const yOffset = Math.round(scrollY * parallaxFactor * 10) / 10;
            propRef.current.style.setProperty('--parallax-y', `${yOffset}px`);
          }
          scrollStateRef.ticking = false;
        });
        scrollStateRef.ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollStateRef.animId) cancelAnimationFrame(scrollStateRef.animId);
    };
  }, [parallaxFactor]);

  const creamStroke = 'rgba(247, 237, 216, 0.095)';
  const orangeStroke = 'rgba(242, 107, 58, 0.15)';
  const orangeFill = 'rgba(242, 107, 58, 0.14)';

  const renderSvg = () => {
    switch (name) {
      case 'laptop':
        return (
          <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Laptop Screen Bezel */}
            <rect x="60" y="30" width="360" height="220" rx="16" stroke={creamStroke} strokeWidth="2" />
            <rect x="76" y="46" width="328" height="188" rx="8" stroke={creamStroke} strokeWidth="1.5" />
            {/* Web camera dot */}
            <circle cx="240" cy="38" r="2.5" fill={creamStroke} />
            {/* Screen code lines */}
            <line x1="96" y1="74" x2="160" y2="74" stroke={orangeStroke} strokeWidth="2" strokeLinecap="round" />
            <line x1="172" y1="74" x2="230" y2="74" stroke={creamStroke} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="116" y1="98" x2="270" y2="98" stroke={creamStroke} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="12 6" />
            <line x1="116" y1="122" x2="310" y2="122" stroke={creamStroke} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="136" y1="146" x2="220" y2="146" stroke={orangeStroke} strokeWidth="2" strokeLinecap="round" />
            <line x1="230" y1="146" x2="340" y2="146" stroke={creamStroke} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="116" y1="170" x2="190" y2="170" stroke={creamStroke} strokeWidth="1.8" strokeLinecap="round" />
            {/* Blinking screen cursor */}
            <rect x="200" y="163" width="9" height="14" fill={orangeFill} className={styles.blinkingCursor} />
            <line x1="96" y1="194" x2="140" y2="194" stroke={orangeStroke} strokeWidth="2" strokeLinecap="round" />
            {/* Base / Keyboard hinge */}
            <path d="M20 270 L80 250 L400 250 L460 270 Q466 273 460 276 L440 286 Q434 290 420 290 L60 290 Q46 290 40 286 L20 276 Q14 273 20 270 Z" stroke={creamStroke} strokeWidth="2" />
            {/* Trackpad */}
            <rect x="195" y="260" width="90" height="22" rx="4" stroke={creamStroke} strokeWidth="1.5" />
            {/* Orange Status LED */}
            <circle cx="240" cy="254" r="1.5" fill={orangeFill} />
          </svg>
        );

      case 'terminal':
        return (
          <svg viewBox="0 0 440 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Window frame */}
            <rect x="20" y="20" width="400" height="260" rx="14" stroke={creamStroke} strokeWidth="2" />
            {/* Header bar */}
            <line x1="20" y1="56" x2="420" y2="56" stroke={creamStroke} strokeWidth="1.5" />
            {/* 3 control dots (left one orange accent) */}
            <circle cx="44" cy="38" r="4" fill={orangeFill} stroke={orangeStroke} strokeWidth="1" />
            <circle cx="62" cy="38" r="4" stroke={creamStroke} strokeWidth="1.5" />
            <circle cx="80" cy="38" r="4" stroke={creamStroke} strokeWidth="1.5" />
            {/* Window title */}
            <line x1="180" y1="38" x2="260" y2="38" stroke={creamStroke} strokeWidth="1.5" strokeLinecap="round" />
            {/* Prompt lines */}
            <path d="M 46 90 L 56 98 L 46 106" stroke={orangeStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="68" y1="98" x2="180" y2="98" stroke={creamStroke} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="46" y1="126" x2="320" y2="126" stroke={creamStroke} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="14 6" />
            <line x1="46" y1="150" x2="260" y2="150" stroke={creamStroke} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 46 186 L 56 194 L 46 202" stroke={orangeStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="68" y1="194" x2="140" y2="194" stroke={creamStroke} strokeWidth="1.8" strokeLinecap="round" />
            {/* Blinking cursor */}
            <rect x="150" y="186" width="8" height="15" fill={orangeFill} className={styles.blinkingCursor} />
            <line x1="46" y1="228" x2="210" y2="228" stroke={creamStroke} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="222" y1="228" x2="290" y2="228" stroke={orangeStroke} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );

      case 'braces':
        return (
          <svg viewBox="0 0 380 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Large Left Brace */}
            <path
              d="M 120 50 C 90 50, 75 80, 75 120 L 75 140 C 75 155, 60 160, 45 160 C 60 160, 75 165, 75 180 L 75 200 C 75 240, 90 270, 120 270"
              stroke={creamStroke}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Large Right Brace */}
            <path
              d="M 260 50 C 290 50, 305 80, 305 120 L 305 140 C 305 155, 320 160, 335 160 C 320 160, 305 165, 305 180 L 305 200 C 305 240, 290 270, 260 270"
              stroke={creamStroke}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Code dots inside */}
            <circle cx="160" cy="160" r="4" fill={creamStroke} />
            <circle cx="190" cy="160" r="4.5" fill={orangeFill} stroke={orangeStroke} strokeWidth="1" />
            <circle cx="220" cy="160" r="4" fill={creamStroke} />
            {/* Subtle semicolon */}
            <circle cx="340" cy="265" r="2.5" fill={creamStroke} />
            <path d="M 340 272 C 340 278, 336 283, 332 286" stroke={orangeStroke} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );

      case 'gitBranch':
        return (
          <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Main branch trunk */}
            <line x1="80" y1="40" x2="80" y2="280" stroke={creamStroke} strokeWidth="2.2" strokeLinecap="round" />
            {/* Feature branch 1 */}
            <path
              d="M 80 90 C 140 90, 200 120, 200 160 C 200 200, 140 230, 80 230"
              stroke={creamStroke}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Sub-branch 2 */}
            <path
              d="M 200 160 C 260 160, 320 180, 320 220 L 320 280"
              stroke={orangeStroke}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Commit nodes */}
            <circle cx="80" cy="90" r="7" stroke={creamStroke} strokeWidth="2" fill="#000000" />
            <circle cx="80" cy="160" r="6" stroke={creamStroke} strokeWidth="2" fill="#000000" />
            <circle cx="200" cy="160" r="8" stroke={orangeStroke} strokeWidth="2.2" fill={orangeFill} />
            <circle cx="80" cy="230" r="7" stroke={creamStroke} strokeWidth="2" fill="#000000" />
            <circle cx="320" cy="220" r="6" stroke={creamStroke} strokeWidth="2" fill="#000000" />
            <circle cx="320" cy="270" r="5" stroke={orangeStroke} strokeWidth="1.8" fill={orangeFill} />
            {/* Commit message pills */}
            <rect x="100" y="82" width="70" height="16" rx="4" stroke={creamStroke} strokeWidth="1.2" />
            <line x1="110" y1="90" x2="155" y2="90" stroke={creamStroke} strokeWidth="1.2" />
            <rect x="220" y="152" width="80" height="16" rx="4" stroke={orangeStroke} strokeWidth="1.2" />
            <line x1="230" y1="160" x2="285" y2="160" stroke={orangeStroke} strokeWidth="1.2" />
          </svg>
        );

      case 'keycaps':
        return (
          <svg viewBox="0 0 420 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Keycap 1: Esc */}
            <g transform="translate(40, 40)">
              <rect x="0" y="0" width="80" height="74" rx="10" stroke={creamStroke} strokeWidth="2" />
              <rect x="8" y="6" width="64" height="52" rx="6" stroke={creamStroke} strokeWidth="1.4" />
              <text x="22" y="38" fill={creamStroke} fontSize="16" fontFamily="var(--font-mono)">ESC</text>
              <circle cx="60" cy="24" r="2.5" fill={orangeFill} />
            </g>
            {/* Keycap 2: Enter */}
            <g transform="translate(160, 80)">
              <rect x="0" y="0" width="120" height="84" rx="12" stroke={creamStroke} strokeWidth="2" />
              <rect x="10" y="8" width="100" height="58" rx="8" stroke={creamStroke} strokeWidth="1.4" />
              <path d="M 90 32 L 60 32 L 60 48 L 46 38 L 60 28 L 60 32" stroke={orangeStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={orangeFill} />
              <text x="24" y="54" fill={creamStroke} fontSize="14" fontFamily="var(--font-mono)">ENTER</text>
            </g>
            {/* Keycap 3: Command / Ctrl */}
            <g transform="translate(70, 160)">
              <rect x="0" y="0" width="90" height="80" rx="10" stroke={creamStroke} strokeWidth="2" />
              <rect x="9" y="7" width="72" height="56" rx="6" stroke={creamStroke} strokeWidth="1.4" />
              <path
                d="M 38 32 A 6 6 0 1 1 44 38 L 44 48 A 6 6 0 1 1 38 42 L 52 42 A 6 6 0 1 1 46 48 L 46 38 A 6 6 0 1 1 52 32 Z"
                stroke={creamStroke}
                strokeWidth="1.8"
                fill="none"
              />
            </g>
          </svg>
        );

      case 'bug':
        return (
          <svg viewBox="0 0 380 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Antennae */}
            <path d="M 160 80 Q 140 40, 110 35" stroke={creamStroke} strokeWidth="2" strokeLinecap="round" />
            <circle cx="106" cy="35" r="3" fill={orangeFill} />
            <path d="M 220 80 Q 240 40, 270 35" stroke={creamStroke} strokeWidth="2" strokeLinecap="round" />
            <circle cx="274" cy="35" r="3" fill={orangeFill} />
            {/* Head */}
            <path d="M 160 85 C 160 65, 220 65, 220 85 Z" stroke={creamStroke} strokeWidth="2" />
            {/* Bug Thorax & Segmented Body */}
            <ellipse cx="190" cy="140" rx="55" ry="45" stroke={creamStroke} strokeWidth="2" />
            <ellipse cx="190" cy="225" rx="68" ry="60" stroke={creamStroke} strokeWidth="2" />
            <line x1="190" y1="95" x2="190" y2="285" stroke={orangeStroke} strokeWidth="1.8" strokeLinecap="round" />
            {/* Internal Circuit Lines */}
            <line x1="145" y1="210" x2="235" y2="210" stroke={creamStroke} strokeWidth="1.5" />
            <line x1="140" y1="240" x2="240" y2="240" stroke={creamStroke} strokeWidth="1.5" />
            <circle cx="190" cy="140" r="5" stroke={orangeStroke} strokeWidth="1.8" fill={orangeFill} />
            {/* Left Legs (3 legs) */}
            <path d="M 140 125 L 90 100 L 60 115" stroke={creamStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 130 180 L 80 175 L 50 195" stroke={creamStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 140 240 L 90 260 L 70 290" stroke={creamStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Right Legs (3 legs) */}
            <path d="M 240 125 L 290 100 L 320 115" stroke={creamStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 250 180 L 300 175 L 330 195" stroke={creamStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 240 240 L 290 260 L 310 290" stroke={creamStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'chip':
        return (
          <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* CPU Chip Body */}
            <rect x="110" y="70" width="180" height="180" rx="16" stroke={creamStroke} strokeWidth="2.2" />
            <rect x="135" y="95" width="130" height="130" rx="8" stroke={creamStroke} strokeWidth="1.5" />
            {/* Inner Die & Core */}
            <rect x="165" y="125" width="70" height="70" rx="4" stroke={orangeStroke} strokeWidth="1.8" fill={orangeFill} />
            {/* Top Pins */}
            {[135, 160, 185, 210, 235, 260].map((x) => (
              <line key={`pin-t-${x}`} x1={x} y1="36" x2={x} y2="70" stroke={creamStroke} strokeWidth="2" strokeLinecap="round" />
            ))}
            {/* Bottom Pins */}
            {[135, 160, 185, 210, 235, 260].map((x) => (
              <line key={`pin-b-${x}`} x1={x} y1="250" x2={x} y2="284" stroke={creamStroke} strokeWidth="2" strokeLinecap="round" />
            ))}
            {/* Left Pins */}
            {[95, 120, 145, 170, 195, 220].map((y) => (
              <line key={`pin-l-${y}`} x1="76" y1={y} x2="110" y2={y} stroke={creamStroke} strokeWidth="2" strokeLinecap="round" />
            ))}
            {/* Right Pins */}
            {[95, 120, 145, 170, 195, 220].map((y) => (
              <line key={`pin-r-${y}`} x1="290" y1={y} x2="324" y2={y} stroke={creamStroke} strokeWidth="2" strokeLinecap="round" />
            ))}
            {/* Circuit traces */}
            <path d="M 110 110 L 70 80 L 30 80" stroke={creamStroke} strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="28" cy="80" r="3" fill={creamStroke} />
            <path d="M 290 210 L 330 240 L 370 240" stroke={orangeStroke} strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="372" cy="240" r="3" fill={orangeFill} />
          </svg>
        );

      case 'cursor':
        return (
          <svg viewBox="0 0 360 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Arrow Cursor in classic angled flight */}
            <g transform="translate(100, 70)">
              <path
                d="M 10 10 L 10 120 L 45 88 L 75 145 L 98 132 L 68 76 L 115 76 Z"
                stroke={creamStroke}
                strokeWidth="2.4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M 18 28 L 18 95 L 43 72 L 70 125 L 82 118 L 56 65 L 92 65 Z"
                stroke={orangeStroke}
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </g>
            {/* Click ripple arcs */}
            <path d="M 85 60 A 35 35 0 0 1 145 60" stroke={orangeStroke} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 4" />
            <path d="M 70 45 A 55 55 0 0 1 160 45" stroke={creamStroke} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="6 6" />
            {/* Motion trail dashes */}
            <line x1="240" y1="210" x2="275" y2="235" stroke={creamStroke} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="220" y1="230" x2="250" y2="250" stroke={orangeStroke} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );

      case 'folderTree':
        return (
          <svg viewBox="0 0 420 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Root folder icon */}
            <path
              d="M 40 45 L 85 45 L 100 60 L 170 60 L 170 105 L 40 105 Z"
              stroke={creamStroke}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M 40 55 L 75 55 L 85 65 L 155 65" stroke={orangeStroke} strokeWidth="1.5" />
            <text x="185" y="85" fill={creamStroke} fontSize="17" fontFamily="var(--font-mono)">src/</text>
            {/* Branch lines */}
            <line x1="80" y1="105" x2="80" y2="260" stroke={creamStroke} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Node 1: components/ */}
            <line x1="80" y1="150" x2="120" y2="150" stroke={creamStroke} strokeWidth="1.8" strokeLinecap="round" />
            <rect x="125" y="138" width="22" height="18" rx="3" stroke={creamStroke} strokeWidth="1.5" />
            <text x="156" y="154" fill={creamStroke} fontSize="14" fontFamily="var(--font-mono)">components/</text>
            {/* Node 2: App.jsx */}
            <line x1="80" y1="200" x2="120" y2="200" stroke={creamStroke} strokeWidth="1.8" strokeLinecap="round" />
            <rect x="125" y="188" width="18" height="22" rx="3" stroke={orangeStroke} strokeWidth="1.5" />
            <text x="156" y="204" fill={orangeStroke} fontSize="14" fontFamily="var(--font-mono)">App.jsx</text>
            {/* Node 3: main.js */}
            <line x1="80" y1="250" x2="120" y2="250" stroke={creamStroke} strokeWidth="1.8" strokeLinecap="round" />
            <rect x="125" y="238" width="18" height="22" rx="3" stroke={creamStroke} strokeWidth="1.5" />
            <text x="156" y="254" fill={creamStroke} fontSize="14" fontFamily="var(--font-mono)">main.js</text>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={propRef}
      className={`${styles.propWrapper} ${styles[name] || ''} ${className} ${styles[variant] || ''}`}
      style={style}
      aria-hidden="true"
    >
      <div className={styles.propFloat}>
        {renderSvg()}
      </div>
    </div>
  );
}
