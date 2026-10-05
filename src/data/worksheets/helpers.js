/**
 * עזרי כתיבה לדפי העבודה. התשובות מחושבות כאן בקוד ולא נכתבות ביד,
 * כך שתרגיל ותשובתו לא יכולים "להתפצל".
 */
import { formatNumberTex } from '../../lib/worksheet.js';

export const m = String.raw;

export const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** מעגל רעשי נקודה צפה: 0.1+0.2 → 0.3 */
export const round = (x, places = 6) => Number(Number(x).toFixed(places));

/** מספר בתוך LaTeX עם פסיקי אלפים (1{,}250{,}000). */
export const num = (x) => formatNumberTex(round(x));

/** שבר ב-LaTeX. */
export const fr = (n, d) => m`\frac{${n}}{${d}}`;

/** מספר מעורב ב-LaTeX. */
export const mixed = (w, n, d) => m`${w}\frac{${n}}{${d}}`;

/** סימן ההשוואה הנכון בין שני ערכים. */
export const cmp = (a, b) => (Math.abs(a - b) < 1e-9 ? '=' : a < b ? '<' : '>');

/** שבר מצומצם עד הסוף. */
export function reduce(n, d) {
  const g = gcd(n, d);
  return [n / g, d / g];
}

/**
 * משבצת לתוצאה n/d: תמיד שלם + שבר, כך שהצורה לא מסגירה אם התוצאה
 * שלמה או גדולה מ-1. מתקבלת כל צורה שווה ערך.
 */
export const valueBlank = (n, d) => `[[v:${n}/${d}]]`;

/** a × b ב-LaTeX עם התוצאה כמשבצת. */
export const timesItem = (a, b) => ({ q: m`$${num(a)} \times ${num(b)} =$ [[${round(a * b)}]]` });

/**
 * מחשב ביטוי חשבוני פשוט שכתוב ב-LaTeX (\times, :, סוגריים, {,}),
 * כדי שהתשובה תמיד תתאים בדיוק לתרגיל שמוצג.
 */
export function evalTex(tex) {
  const js = tex
    .replace(/\\times|\\cdot/g, '*')
    .replace(/:/g, '/')
    .replace(/\{,\}/g, '')
    .replace(/\\left|\\right/g, '');
  if (!/^[\d+\-*/(). ]+$/.test(js)) throw new Error(`evalTex: unsupported "${tex}"`);
  return round(Function(`"use strict"; return (${js});`)());
}

/** תרגיל חשבון שהתשובה שלו מחושבת מהטקסט עצמו. */
export const calc = (tex) => ({ q: m`$${tex} =$ [[${evalTex(tex)}]]` });

/* ---------- ספרות רומיות ---------- */

const ROMAN = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

export function toRoman(n) {
  let out = '';
  for (const [v, s] of ROMAN) while (n >= v) { out += s; n -= v; }
  return out;
}

export function fromRoman(s) {
  const val = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = val[s[i]];
    const next = val[s[i + 1]] ?? 0;
    total += cur < next ? -cur : cur;
  }
  if (toRoman(total) !== s) throw new Error(`Non-canonical roman numeral "${s}"`);
  return total;
}

/* ---------- שרטוטים (SVG) ---------- */

const INK = '#1a2b3c';
const SHADE = '#8fc3ee';
const ACCENT = '#c45c48';
const svg = (w, h, body, minX = 0, minY = 0) =>
  `<svg viewBox="${minX} ${minY} ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" direction="ltr" font-family="Heebo, sans-serif">${body}</svg>`;

/** רצועת שברים: d חלקים שווים, n הראשונים צבועים. */
export function bar(n, d, width = 220) {
  const cw = width / d;
  const cells = Array.from(
    { length: d },
    (_, i) => `<rect x="${2 + i * cw}" y="2" width="${cw}" height="32" fill="${i < n ? SHADE : '#fff'}" stroke="${INK}" stroke-width="1.5"/>`,
  ).join('');
  return svg(width + 4, 36, cells);
}

/** ריבוע של 100 משבצות, n הראשונות צבועות (שורה אחרי שורה). */
export function grid100(n) {
  const c = 13;
  const cells = Array.from({ length: 100 }, (_, i) => {
    const x = 2 + (i % 10) * c;
    const y = 2 + Math.floor(i / 10) * c;
    return `<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="${i < n ? SHADE : '#fff'}" stroke="${INK}" stroke-width="0.8"/>`;
  }).join('');
  return svg(10 * c + 4, 10 * c + 4, cells);
}

const label = (x, y, text, anchor = 'middle', color = INK) =>
  `<text x="${x}" y="${y}" font-size="15" font-weight="700" fill="${color}" text-anchor="${anchor}">${text}</text>`;

const rightAngle = (x, y, dir = 1) =>
  `<path d="M ${x + dir * 9} ${y} L ${x + dir * 9} ${y - 9} L ${x} ${y - 9}" fill="none" stroke="${ACCENT}" stroke-width="1.3"/>`;

/**
 * משולש עם בסיס ונקודת גובה. apex = מיקום הקודקוד העליון ביחס לבסיס
 * (0 = מעל הקצה השמאלי — משולש ישר-זווית; בין 0 ל-1 — חד-זווית; מחוץ — קהה-זווית).
 * base/height — התוויות שמופיעות בשרטוט (השרטוט לא בקנה מידה).
 */
export function triangleFig({ base, height, apex = 0.4, sides = [] }) {
  const bw = 170;
  const hh = 95;
  const x0 = 0;
  const y0 = hh + 10;
  const ax = x0 + apex * bw;
  const ay = y0 - hh;
  const minX = Math.min(x0, ax) - 30;
  const maxX = Math.max(x0 + bw, ax) + 30;
  let body = `<polygon points="${x0},${y0} ${x0 + bw},${y0} ${ax},${ay}" fill="#eaf4fd" stroke="${INK}" stroke-width="2"/>`;
  if (ax < x0 || ax > x0 + bw) {
    const from = ax < x0 ? ax : x0 + bw;
    const to = ax < x0 ? x0 : ax;
    body += `<line x1="${from}" y1="${y0}" x2="${to}" y2="${y0}" stroke="${INK}" stroke-width="1.2" stroke-dasharray="4 3"/>`;
  }
  if (apex !== 0 && apex !== 1) {
    body += `<line x1="${ax}" y1="${ay}" x2="${ax}" y2="${y0}" stroke="${ACCENT}" stroke-width="1.8" stroke-dasharray="5 4"/>`;
  }
  body += rightAngle(ax, y0, ax > x0 + bw / 2 ? -1 : 1);
  body += label(x0 + bw / 2, y0 + 22, base);
  body += label(ax + (apex >= 1 ? 8 : -8), ay + hh / 2 + 5, height, apex >= 1 ? 'start' : 'end', ACCENT);
  if (sides[0] != null) body += label((x0 + bw + ax) / 2 + 10, (y0 + ay) / 2, sides[0], 'start');
  if (sides[1] != null) body += label((x0 + ax) / 2 - 10, (y0 + ay) / 2, sides[1], 'end');
  return svg(maxX - minX, y0 + 32, body, minX, 0);
}

/** מקבילית: בסיס למטה, גובה מקווקו מהקודקוד השמאלי העליון, ותווית אופציונלית לצלע המשופעת. */
export function parallelogramFig({ base, height, side = null }) {
  const bw = 170;
  const s = 50;
  const hh = 85;
  const y0 = hh + 10;
  const body =
    `<polygon points="0,${y0} ${bw},${y0} ${bw + s},${y0 - hh} ${s},${y0 - hh}" fill="#eaf4fd" stroke="${INK}" stroke-width="2"/>` +
    `<line x1="${s}" y1="${y0 - hh}" x2="${s}" y2="${y0}" stroke="${ACCENT}" stroke-width="1.8" stroke-dasharray="5 4"/>` +
    rightAngle(s, y0, 1) +
    label(bw / 2, y0 + 22, base) +
    label(s + 8, y0 - hh / 2 + 5, height, 'start', ACCENT) +
    (side != null ? label(s / 2 - 8, y0 - hh / 2, side, 'end') : '');
  return svg(bw + s + 60, y0 + 32, body, -40, 0);
}
