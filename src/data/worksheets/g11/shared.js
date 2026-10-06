/**
 * עזרים משותפים לדפי העבודה של כיתה י״א: בדיקות מספריות לנגזרות,
 * אינטגרלים וקיצון — כדי שכל תשובה בדף תהיה מאומתת בחישוב ולא רק בהקלדה.
 */
import { round } from '../helpers.js';

/** משבצת מספר: שבר עשרוני סופי — מדויק; אחרת — בקירוב (מתקבל גם 2/3 וגם 0.67). */
export function exact(x) {
  const r = round(x, 4);
  if (Math.abs(r - x) < 1e-9) return `[[${r}]]`;
  return `[[n:${round(x, 2)}~0.006]]`;
}

/** משבצת בקירוב ל-places ספרות אחרי הנקודה (סובלנות קטנה לעיגול ולחישוב בטבלה). */
export const approx = (x, places = 2, tol = Math.max(10 ** -places, Math.abs(x) * 0.003)) =>
  `[[n:${round(x, places)}~${round(tol, 4)}]]`;

/** נגזרת מספרית — לבדיקת הנגזרות שכתובות בדף. */
export const numDeriv = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);

export function checkDeriv(f, fp, xs) {
  for (const x of xs) {
    if (Math.abs(numDeriv(f, x) - fp(x)) > 1e-4 * Math.max(1, Math.abs(fp(x)))) {
      throw new Error(`derivative mismatch at x=${x}`);
    }
  }
}

/** אינטגרל מסוים בשיטת סימפסון — לבדיקת התשובות. */
export function integrate(f, a, b, n = 2000) {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h);
  return (s * h) / 3;
}

/** חיפוש מקסימום/מינימום בקטע (רשת צפופה) — מאמת את תשובת הקיצון. */
export function argExtreme(f, a, b, kind = 'max', n = 20000) {
  let best = a;
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    if (kind === 'max' ? f(x) > f(best) : f(x) < f(best)) best = x;
  }
  return best;
}

/** פונקציית ההתפלגות הנורמלית הסטנדרטית Φ(z). */
export function Phi(z) {
  // קירוב Abramowitz–Stegun 7.1.26 ל-erf (שגיאה קטנה מ-1.5e-7)
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return 0.5 * (1 + (z < 0 ? -y : y));
}

export const sinD = (deg) => Math.sin((deg * Math.PI) / 180);
export const asinD = (v) => (Math.asin(v) * 180) / Math.PI;

export const TF = ['נכון', 'לא נכון'];
export const tf = (q, truth) => ({ q, options: TF, answer: truth ? 0 : 1 });
