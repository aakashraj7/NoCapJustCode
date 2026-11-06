// client/src/components/Scene/DevCards/checkOverlaps.js

/**
 * Automated collision detector:
 * Checks getBoundingClientRect of all DevCards against all headings (h1, h2, h3),
 * p, button, a, and .heroLogo elements.
 * Logs a console warning if any card intersects any content rect by > 0 pixels.
 */
export function checkOverlaps() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return [];

  const cards = document.querySelectorAll('[data-dev-card="true"]');
  const targetSelectors = 'h1, h2, h3, p, button, a, .heroLogo, .heroLogoImg';
  const targets = document.querySelectorAll(targetSelectors);
  const warnings = [];

  cards.forEach((card) => {
    // Only check visible cards
    const cardStyle = window.getComputedStyle(card);
    if (
      cardStyle.display === 'none' ||
      cardStyle.visibility === 'hidden' ||
      parseFloat(cardStyle.opacity) === 0
    ) {
      return;
    }

    const cardRect = card.getBoundingClientRect();
    if (cardRect.width === 0 || cardRect.height === 0) return;

    targets.forEach((target) => {
      // Ignore if element is inside the card
      if (card.contains(target)) return;

      const targetStyle = window.getComputedStyle(target);
      if (
        targetStyle.display === 'none' ||
        targetStyle.visibility === 'hidden' ||
        parseFloat(targetStyle.opacity) === 0
      ) {
        return;
      }

      const targetRect = target.getBoundingClientRect();
      if (targetRect.width === 0 || targetRect.height === 0) return;

      // Check standard 2D axis-aligned bounding box intersection
      const intersects = !(
        cardRect.right <= targetRect.left ||
        cardRect.left >= targetRect.right ||
        cardRect.bottom <= targetRect.top ||
        cardRect.top >= targetRect.bottom
      );

      if (intersects) {
        const cardName = card.getAttribute('data-card-name') || 'unknown';
        const targetDesc = `${target.tagName.toLowerCase()}${
          target.className ? '.' + String(target.className).split(' ')[0] : ''
        } ("${(target.textContent || '').trim().slice(0, 20)}...")`;
        const warningMsg = `[DevCard Collision Warning] DevCard "${cardName}" intersects with ${targetDesc} at viewport ${window.innerWidth}x${window.innerHeight}`;
        console.warn(warningMsg);
        warnings.push({
          card: cardName,
          target: targetDesc,
          cardRect,
          targetRect,
        });
      }
    });
  });

  return warnings;
}

/**
 * In development, automatically verify collisions after mount and resize.
 */
export function initDevOverlapChecker() {
  if (typeof window === 'undefined') return;

  const runCheck = () => {
    // Small delay to let fonts and images settle
    requestAnimationFrame(() => {
      const issues = checkOverlaps();
      if (issues.length === 0) {
        // All clean
      }
    });
  };

  window.addEventListener('load', runCheck);
  window.addEventListener('resize', runCheck);

  return () => {
    window.removeEventListener('load', runCheck);
    window.removeEventListener('resize', runCheck);
  };
}
