// client/src/components/Scene/SectionScene.jsx
import React, { useEffect, useRef } from 'react';
import styles from './Hardware/Hardware.module.css';
import { SECTION_SCENES, THEME } from './hardwareConfig.js';
import * as Hardware from './Hardware/index.js';
import * as SmallBits from './Hardware/SmallBits/index.js';

const ASPECT_RATIOS = {
  Laptop: 240 / 150,
  Gpu: 220 / 95,
  Cpu: 95 / 95,
  Keyboard: 200 / 75,
  RamStick: 175 / 50,
  M2Ssd: 135 / 42,
  Monitor: 185 / 145,
  CaseFan: 85 / 85,
  Mouse: 56 / 80,
  UsbDrive: 75 / 36,
  Sbc: 125 / 85,
  MotherboardFragment: 110 / 110,
};

export default function SectionScene({ section }) {
  const sceneConfig = SECTION_SCENES[section];
  const sceneRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const rafBox = { id: null };

    const handleScroll = () => {
      if (rafBox.id) return;
      rafBox.id = requestAnimationFrame(() => {
        rafBox.id = null;
        if (!sceneRef.current || !parallaxRef.current) return;
        const rect = sceneRef.current.getBoundingClientRect();
        // Parallax only when section is within active viewport range (< 0.1x factor)
        if (rect.bottom > -200 && rect.top < window.innerHeight + 200) {
          const offset = (window.innerHeight - rect.top) * 0.04;
          parallaxRef.current.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafBox.id) cancelAnimationFrame(rafBox.id);
    };
  }, []);

  if (!sceneConfig) return null;

  const renderGroup = (config) => {
    if (!config) return null;

    const bigItems = (config.big || []).map((item, idx) => {
      const Component = Hardware[item.type];
      if (!Component) return null;

      const width = item.size;
      const aspect = ASPECT_RATIOS[item.type] || 1;
      const height = Math.round(width / aspect);

      return (
        <div
          key={`big-${item.type}-${idx}`}
          className={styles.scatteredItem}
          style={{
            ...item.pos,
            transform: `rotate(${item.rotate || 0}deg)`,
          }}
        >
          <Component
            width={width}
            height={height}
            color={item.color || THEME.orange}
            opacity={THEME.bigPieceOpacity}
            floatVariant={item.float || 'A'}
            hasHalo={true}
          />
        </div>
      );
    });

    const smallItems = (config.small || []).map((item, idx) => {
      const SmallComponent = SmallBits[item.type] || Hardware[item.type];
      if (!SmallComponent) return null;

      return (
        <div
          key={`small-${item.type}-${idx}`}
          className={styles.scatteredItem}
          style={{
            ...item.pos,
            transform: `rotate(${item.rotate || 0}deg)`,
          }}
        >
          <SmallComponent
            size={item.size}
            color={item.color || THEME.yellow}
            opacity={THEME.smallPieceOpacity}
            spinSpeed={item.spin}
          />
        </div>
      );
    });

    return (
      <>
        {bigItems}
        {smallItems}
      </>
    );
  };

  return (
    <div className={styles.sectionScene} ref={sceneRef} aria-hidden="true">
      <div className={styles.parallaxLayer} ref={parallaxRef}>
        <div className={styles.desktopScene}>
          {renderGroup(sceneConfig.desktop)}
        </div>
        <div className={styles.mobileScene}>
          {renderGroup(sceneConfig.mobile)}
        </div>
      </div>
    </div>
  );
}
