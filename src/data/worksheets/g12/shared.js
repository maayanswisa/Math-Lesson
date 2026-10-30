/** עזרים לדפי העבודה של כיתה י״ב (3 יח״ל). */
import { round, svgParts } from '../helpers.js';

export { exact, approx, tf, TF } from '../g11/shared.js';

/** π בדפים האלה — כמו בבגרות. */
export const PI = 3.14;

/** משבצת בקירוב: סובלנות קטנה, כדי שגם π מדויק יותר (3.1416) יתקבל. */
export const near = (x) => `[[n:${round(x, 2)}~${round(Math.abs(x) * 0.002 + 0.01, 2)}]]`;

/** האחוזים בכל רצועה של סטיית תקן אחת, מהממוצע והלאה (צד אחד). */
export const BANDS = [34.13, 13.59, 2.14, 0.13];

/**
 * האחוז בין שני ערכים שנמדדים בסטיות תקן מהממוצע (שלמים מ-−4 עד 4; ±4 = "מעבר לכל").
 * לפי השרטוט: 34.13 / 13.59 / 2.14 / 0.13 בכל צד.
 */
export function pct(from, to) {
  const band = (k) => BANDS[k < 0 ? -k - 1 : k]; // הרצועה שבין k ל-k+1
  let s = 0;
  for (let k = from; k < to; k++) s += band(k);
  return round(s, 2);
}

/** שרטוט העקומה הנורמלית עם האחוזים בכל רצועה. */
export function bellFig() {
  const { svg } = svgParts;
  const W = 340;
  const base = 120;
  const X = (z) => 28 + ((z + 3.6) / 7.2) * (W - 56);
  const Y = (z) => base - 96 * Math.exp((-z * z) / 2);
  const curve = Array.from({ length: 145 }, (_, i) => -3.6 + (7.2 * i) / 144)
    .map((z, i) => `${i ? 'L' : 'M'}${X(z).toFixed(1)} ${Y(z).toFixed(1)}`)
    .join(' ');
  const band = (a, b, fill) => {
    const pts = Array.from({ length: 31 }, (_, i) => a + ((b - a) * i) / 30);
    return `<path d="M${X(a).toFixed(1)} ${base} ${pts.map((z) => `L${X(z).toFixed(1)} ${Y(z).toFixed(1)}`).join(' ')} L${X(b).toFixed(1)} ${base} Z" fill="${fill}"/>`;
  };
  const shades = ['#cfe6e6', '#e1efef', '#eef6f6'];
  let body = '';
  [0, 1, 2].forEach((k) => {
    body += band(k, k + 1, shades[k]) + band(-k - 1, -k, shades[k]);
  });
  body += `<path d="${curve}" fill="none" stroke="#0d6e6e" stroke-width="2"/>`;
  body += `<line x1="20" y1="${base}" x2="${W - 20}" y2="${base}" stroke="#1a2b3c" stroke-width="1.2"/>`;
  ['μ−3σ', 'μ−2σ', 'μ−σ', 'μ', 'μ+σ', 'μ+2σ', 'μ+3σ'].forEach((t, i) => {
    const z = i - 3;
    body += `<line x1="${X(z)}" y1="${Y(z)}" x2="${X(z)}" y2="${base + 4}" stroke="#1a2b3c" stroke-width="0.9" stroke-dasharray="${z ? '3 2' : ''}"/>`;
    body += `<text x="${X(z)}" y="${base + 15}" text-anchor="middle" font-size="10" font-weight="700" fill="#1a2b3c">${t}</text>`;
  });
  [
    [0.5, '34.13%', 90],
    [1.5, '13.59%', 108],
    [2.5, '2.14%', 114],
  ].forEach(([z, t, y]) => {
    body += `<text x="${X(z)}" y="${y}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0a5555">${t}</text>`;
    body += `<text x="${X(-z)}" y="${y}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0a5555">${t}</text>`;
  });
  body += `<text x="${X(3.3)}" y="${base - 9}" text-anchor="middle" font-size="9" font-weight="700" fill="#c45c48">0.13%</text>`;
  body += `<text x="${X(-3.3)}" y="${base - 9}" text-anchor="middle" font-size="9" font-weight="700" fill="#c45c48">0.13%</text>`;
  return svg(W, 140, body);
}
