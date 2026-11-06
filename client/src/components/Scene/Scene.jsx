// client/src/components/Scene/Scene.jsx
import React, { useEffect, useRef } from 'react';
import styles from './Scene.module.css';

/**
 * Scene renders the fixed background base layer behind the whole page.
 * - #000 base
 * - Faint dot grid at 4-5% opacity
 * - Subtle ambient radial tints (hero warm glow & edge vignette)
 * - Lightweight canvas of slow-rising embers (10 phone, 16 tablet, 24 laptop)
 * - Aria-hidden, pointer-events: none, z-index: 0
 * - Paused on hidden tabs, disabled on prefers-reduced-motion
 */
export default function Scene() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle count: 10 on phone, 16 on tablet, 24 on laptop/desktop
    const getEmbersCount = (w) => {
      if (w >= 1200) return 24;
      if (w >= 768) return 16;
      return 10;
    };

    let embersCount = getEmbersCount(width);

    const createEmbers = (count, w, h) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vy: 0.22 + Math.random() * 0.35, // slow upward float
        vx: (Math.random() - 0.5) * 0.18, // gentle horizontal drift
        r: 1.2 + Math.random() * 1.6,
        alpha: 0.15 + Math.random() * 0.32, // max opacity < 0.5
        isOrange: Math.random() > 0.45,
      }));

    let embers = createEmbers(embersCount, width, height);

    const timerRef = { current: null };
    const handleResize = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        embersCount = getEmbersCount(width);
        embers = createEmbers(embersCount, width, height);
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      if (!document.hidden && canvas) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < embers.length; i++) {
          const p = embers[i];
          p.y -= p.vy;
          p.x += p.vx;

          // Wrap around top to bottom
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

          if (p.isOrange) {
            ctx.fillStyle = `rgba(242, 107, 58, ${p.alpha})`;
          } else {
            ctx.fillStyle = `rgba(247, 237, 216, ${p.alpha * 0.85})`;
          }
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className={styles.sceneContainer} aria-hidden="true">
      {/* Base Dot Grid & Ambient Glows */}
      <div className={styles.dotGrid} />
      <div className={styles.radialGlowTop} />
      <div className={styles.edgeVignette} />

      {/* Floating Embers Canvas */}
      <canvas ref={canvasRef} className={styles.embersCanvas} />
    </div>
  );
}
