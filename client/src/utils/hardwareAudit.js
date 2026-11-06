// client/src/utils/hardwareAudit.js

/**
 * Dev-only hardware placement assertion:
 * For every hardware piece, asserts:
 * 1. getBoundingClientRect() lies strictly inside the viewport width (left >= 0, right <= viewportWidth).
 * 2. getBoundingClientRect() lies strictly inside its section bounding box.
 * 3. Does not intersect any element containing text, a button, a card, or the logo.
 * Logs every violation and returns violation count.
 */
export function auditHardwarePlacement() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { total: 0, violations: [] };
  }

  const pieces = Array.from(document.querySelectorAll('[data-hardware-piece]'));
  const viewportWidth = window.innerWidth;
  const violations = [];

  // Content elements that hardware pieces must NOT intersect
  const contentElements = Array.from(
    document.querySelectorAll(
      'h1, h2, h3, p, button, a.btn, [class*="presenterPill"], [class*="chip"], [class*="heroLogo"], [class*="eventCard"], [class*="statCard"], [class*="timelineItem"], [class*="brandCol"], [class*="footerCol"]'
    )
  ).filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });

  for (const piece of pieces) {
    const r = piece.getBoundingClientRect();
    // Ignore pieces in currently hidden responsive tiers
    if (r.width === 0 || r.height === 0 || window.getComputedStyle(piece).display === 'none') {
      continue;
    }

    const name = piece.getAttribute('data-hardware-piece') || 'hardware';
    const tier = piece.getAttribute('data-hardware-tier') || 'unknown';
    const section = piece.closest('section, footer');
    const secId = section?.id || section?.tagName?.toLowerCase() || 'unknown';
    const secRect = section ? section.getBoundingClientRect() : null;

    // 1. Viewport width check (with 1px rounding tolerance)
    if (r.left < -1 || r.right > viewportWidth + 1) {
      violations.push({
        type: 'VIEWPORT_OVERFLOW',
        name,
        tier,
        secId,
        details: `left=${r.left.toFixed(1)}, right=${r.right.toFixed(1)}, viewport=${viewportWidth}`,
      });
    }

    // 2. Section bounds check (with 2px tolerance for float animation)
    if (secRect) {
      if (r.top < secRect.top - 2 || r.bottom > secRect.bottom + 2) {
        violations.push({
          type: 'SECTION_OVERFLOW',
          name,
          tier,
          secId,
          details: `piece[top=${r.top.toFixed(1)}, bot=${r.bottom.toFixed(1)}] vs section[top=${secRect.top.toFixed(1)}, bot=${secRect.bottom.toFixed(1)}]`,
        });
      }
    }

    // 3. No intersection with content/text/buttons/cards/logo
    for (const contentEl of contentElements) {
      if (piece.contains(contentEl)) continue;

      const tr = contentEl.getBoundingClientRect();
      const overlap = !(
        r.right <= tr.left ||
        r.left >= tr.right ||
        r.bottom <= tr.top ||
        r.top >= tr.bottom
      );

      if (overlap) {
        violations.push({
          type: 'CONTENT_INTERSECTION',
          name,
          tier,
          secId,
          contentTag: contentEl.tagName,
          contentPreview: contentEl.textContent?.trim().slice(0, 30),
        });
      }
    }
  }

  if (violations.length > 0) {
    console.warn(`[HardwareAudit] ${violations.length} violations found:`, violations);
  } else {
    console.info(`[HardwareAudit] PASS: 0 violations across ${pieces.length} active hardware pieces.`);
  }

  return { total: pieces.length, violations };
}

if (typeof window !== 'undefined') {
  window.__auditHardwarePlacement = auditHardwarePlacement;
}
