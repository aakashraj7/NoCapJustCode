// client/src/hooks/useScrollSpy.js
import { useState, useEffect } from 'react';

/**
 * Tracks the active section on scroll using IntersectionObserver.
 * @param {string[]} sectionIds - Array of section IDs (without `#`)
 * @param {string} offset - Root margin offset
 * @returns {string} activeId
 */
export function useScrollSpy(sectionIds, offset = '-20% 0px -70% 0px') {
  const [activeId, setActiveId] = useState(sectionIds[0] || '');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: offset,
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeId;
}
