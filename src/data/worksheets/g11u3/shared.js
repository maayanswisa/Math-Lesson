/** עזרים לדפי העבודה של כיתה י״א (3 יח״ל): גדילה מעריכית, סטטיסטיקה והסתברות. */
import { m, round } from '../helpers.js';

export { exact, approx, tf, TF } from '../g11/shared.js';

/** משבצת בקירוב: סובלנות יחסית קטנה (עיגול ביניים, π או מחשבון). */
export const near = (x) => `[[n:${round(x, 2)}~${round(Math.abs(x) * 0.002 + 0.01, 2)}]]`;

/** הכמות אחרי t יחידות זמן: A₀·qᵗ */
export const grow = (a0, q, t) => a0 * q ** t;

/** ממוצע וסטיית תקן (של האוכלוסייה — מחלקים ב-n). */
export const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length;
export const sd = (xs) => {
  const mu = mean(xs);
  return Math.sqrt(xs.reduce((s, x) => s + (x - mu) ** 2, 0) / xs.length);
};

/**
 * רבעון / עשירון לפי כלל המיקום של התוכנית: מיקום k·n/parts —
 * שלם ← ממוצע האיבר במקום הזה והבא; לא שלם ← מעגלים למעלה.
 */
export function quantile(sorted, k, parts = 4) {
  const pos = (k * sorted.length) / parts;
  if (Math.abs(pos - Math.round(pos)) < 1e-9) return (sorted[pos - 1] + sorted[pos]) / 2;
  return sorted[Math.ceil(pos) - 1];
}

/** מספר ב-LaTeX עם פסיקי אלפים (רק בחלק השלם) */
export const big = (x) => {
  const [int, dec] = String(x).split('.');
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, '{,}') + (dec ? `.${dec}` : '');
};

/** רשימת מספרים ב-LaTeX: 3,\ 5,\ 8 */
export const list = (xs) => xs.map(big).join(',\\ ');

export { m };
