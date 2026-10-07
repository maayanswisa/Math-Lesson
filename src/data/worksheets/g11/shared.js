/**
 * עזרים משותפים לדפי העבודה של כיתה י״א: בדיקות מספריות לנגזרות,
 * אינטגרלים וקיצון — כדי שכל תשובה בדף תהיה מאומתת בחישוב ולא רק בהקלדה.
 */
import { round, svgParts } from '../helpers.js';

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

/**
 * גרף של פונקציה במערכת צירים: f על [x0, x1], חלון אנכי [y0, y1].
 * asym — אסימפטוטות מאונכות (קו מקווקו; הגרף לא מחובר מעליהן),
 * hAsym — אסימפטוטות אופקיות, points — נקודות מסומנות [{ x, y, label }].
 */
export function graphFig({ f, x0, x1, y0, y1, asym = [], hAsym = [], points = [] }) {
  const { svg, label, INK, ACCENT } = svgParts;
  const W = 300;
  const H = 240;
  const X = (x) => round(14 + ((x - x0) / (x1 - x0)) * (W - 28), 2);
  const Y = (y) => round(12 + ((y1 - y) / (y1 - y0)) * (H - 24), 2);
  let body = `<defs><clipPath id="gf${x0}${x1}${y0}${y1}"><rect x="14" y="12" width="${W - 28}" height="${H - 24}"/></clipPath></defs>`;
  for (let k = Math.ceil(x0); k <= x1; k++) body += `<line x1="${X(k)}" y1="${Y(y0)}" x2="${X(k)}" y2="${Y(y1)}" stroke="#eef2f6" stroke-width="1"/>`;
  for (let k = Math.ceil(y0); k <= y1; k++) body += `<line x1="${X(x0)}" y1="${Y(k)}" x2="${X(x1)}" y2="${Y(k)}" stroke="#eef2f6" stroke-width="1"/>`;
  body += `<line x1="${X(x0)}" y1="${Y(0)}" x2="${X(x1)}" y2="${Y(0)}" stroke="${INK}" stroke-width="1.4"/>`;
  body += `<line x1="${X(0)}" y1="${Y(y0)}" x2="${X(0)}" y2="${Y(y1)}" stroke="${INK}" stroke-width="1.4"/>`;
  body += `<text x="${X(x1) - 2}" y="${Y(0) - 5}" font-size="12" font-style="italic" fill="${INK}" text-anchor="end">x</text>`;
  body += `<text x="${X(0) + 5}" y="${Y(y1) + 11}" font-size="12" font-style="italic" fill="${INK}">y</text>`;
  for (const a of asym) body += `<line x1="${X(a)}" y1="${Y(y0)}" x2="${X(a)}" y2="${Y(y1)}" stroke="${ACCENT}" stroke-width="1.3" stroke-dasharray="5 4"/>`;
  for (const b of hAsym) body += `<line x1="${X(x0)}" y1="${Y(b)}" x2="${X(x1)}" y2="${Y(b)}" stroke="${ACCENT}" stroke-width="1.3" stroke-dasharray="5 4"/>`;
  // מקטעים נפרדים בין אסימפטוטות, ובלי לחבר נקודות לא מוגדרות
  const cuts = [x0, ...asym.filter((a) => a > x0 && a < x1).sort((p, q) => p - q), x1];
  for (let i = 0; i < cuts.length - 1; i++) {
    const segs = [];
    let pen = false;
    const n = 240;
    for (let k = 0; k <= n; k++) {
      const x = cuts[i] + ((cuts[i + 1] - cuts[i]) * k) / n;
      const y = asym.includes(x) ? NaN : f(x);
      if (!Number.isFinite(y)) {
        pen = false;
        continue;
      }
      const yy = Math.max(y0 - 50, Math.min(y1 + 50, y));
      segs.push(`${pen ? 'L' : 'M'}${X(x)},${Y(yy)}`);
      pen = true;
    }
    body += `<path d="${segs.join(' ')}" fill="none" stroke="#1f8fe0" stroke-width="2.4" clip-path="url(#gf${x0}${x1}${y0}${y1})"/>`;
  }
  for (const p of points) body += `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="3.6" fill="${INK}"/>` + (p.label ? label(X(p.x) + 6, Y(p.y) - 6, p.label, 'start') : '');
  return svg(W, H, body);
}
