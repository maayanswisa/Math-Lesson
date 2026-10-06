/** עזרים לדפי העבודה של כיתה ט׳ — פולינומים ופונקציה ריבועית. */
import { round } from '../helpers.js';

export { exact, approx, tf, TF } from '../g11/shared.js';

/**
 * פולינום ב-LaTeX מהמקדמים (מהחזקה הגבוהה): poly([1, -5, 6]) → "x^2 - 5x + 6".
 * מקדם 0 מושמט, 1/-1 בלי ספרה, וסימנים נקיים.
 */
export function poly(coeffs, v = 'x') {
  const deg = coeffs.length - 1;
  let out = '';
  coeffs.forEach((c, i) => {
    if (c === 0) return;
    const p = deg - i;
    const abs = Math.abs(c);
    const num = p > 0 && abs === 1 ? '' : String(abs);
    const term = `${num}${p > 0 ? v : ''}${p > 1 ? `^${p}` : ''}`;
    out += out === '' ? `${c < 0 ? '-' : ''}${term}` : ` ${c < 0 ? '-' : '+'} ${term}`;
  });
  return out || '0';
}

/** שורשי ax² + bx + c (מהגדול לקטן); [] כשאין. */
export function roots(a, b, c) {
  const D = b * b - 4 * a * c;
  if (D < 0) return [];
  if (D === 0) return [round(-b / (2 * a))];
  const s = Math.sqrt(D);
  return [(-b + s) / (2 * a), (-b - s) / (2 * a)].map((x) => round(x)).sort((p, q) => q - p);
}

/** קודקוד הפרבולה y = ax² + bx + c. */
export function vertex(a, b, c) {
  const p = -b / (2 * a);
  return [round(p), round(a * p * p + b * p + c)];
}

/** (x - m) עם סימן נקי: m = -3 → "(x + 3)". */
export const factorTex = (m, v = 'x') => (m === 0 ? v : `(${v} ${m < 0 ? '+' : '-'} ${Math.abs(m)})`);
