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

/** מודל עוגה: עיגול ב-d חלקים שווים, n הראשונים צבועים. */
export function pie(n, d, r = 42) {
  const c = r + 3;
  const pt = (k) => {
    const a = -Math.PI / 2 + (2 * Math.PI * k) / d;
    return `${round(c + r * Math.cos(a), 2)},${round(c + r * Math.sin(a), 2)}`;
  };
  const sectors = Array.from({ length: d }, (_, i) => {
    const large = 1 / d > 0.5 ? 1 : 0;
    return `<path d="M ${c},${c} L ${pt(i)} A ${r} ${r} 0 ${large} 1 ${pt(i + 1)} Z" fill="${i < n ? SHADE : '#fff'}" stroke="${INK}" stroke-width="1.5"/>`;
  }).join('');
  return svg(2 * c, 2 * c, d === 1 ? `<circle cx="${c}" cy="${c}" r="${r}" fill="${n ? SHADE : '#fff'}" stroke="${INK}" stroke-width="1.5"/>` : sectors);
}

/** מודל מלבני: rows × cols משבצות, n הראשונות צבועות. */
export function rectModel(n, rows, cols, cell = 24) {
  const cells = Array.from({ length: rows * cols }, (_, i) => {
    const x = 2 + (i % cols) * cell;
    const y = 2 + Math.floor(i / cols) * cell;
    return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${i < n ? SHADE : '#fff'}" stroke="${INK}" stroke-width="1.3"/>`;
  }).join('');
  return svg(cols * cell + 4, rows * cell + 4, cells);
}

/**
 * ישר מספרים מ-0 עד max, עם שנתות כל 1/parts.
 * points: [{ at: ערך, label: 'A' }] — נקודות מסומנות מעל הישר.
 */
export function numberLine({ max, parts, points = [] }) {
  const x0 = 16;
  const unit = Math.min(130, 300 / max);
  const y = 40;
  let body = `<line x1="${x0 - 8}" y1="${y}" x2="${x0 + unit * max + 12}" y2="${y}" stroke="${INK}" stroke-width="2"/>`;
  for (let k = 0; k <= max * parts; k++) {
    const x = round(x0 + (unit * k) / parts, 2);
    const whole = k % parts === 0;
    body += `<line x1="${x}" y1="${y - (whole ? 9 : 5)}" x2="${x}" y2="${y + (whole ? 9 : 5)}" stroke="${INK}" stroke-width="${whole ? 2 : 1.2}"/>`;
    if (whole) body += label(x, y + 26, k / parts);
  }
  for (const p of points) {
    const x = round(x0 + unit * p.at, 2);
    body += `<circle cx="${x}" cy="${y}" r="4.5" fill="${ACCENT}"/>` + label(x, y - 14, p.label, 'middle', ACCENT);
  }
  return svg(x0 + unit * max + 26, y + 34, body);
}

/** דיאגרמת עמודות: labels מתחת לעמודות, קווי רשת כל step. */
export function barChart({ labels, values, step, max = Math.max(...values) }) {
  const top = Math.ceil(max / step) * step;
  const ph = 130;
  const x0 = 38;
  const bw = 34;
  const gap = 22;
  const y0 = ph + 12;
  const yOf = (v) => round(y0 - (v / top) * ph, 2);
  let body = '';
  for (let v = 0; v <= top; v += step) {
    body += `<line x1="${x0}" y1="${yOf(v)}" x2="${x0 + labels.length * (bw + gap) + 6}" y2="${yOf(v)}" stroke="#cfd8e3" stroke-width="1"/>`;
    body += `<text x="${x0 - 6}" y="${yOf(v) + 4}" font-size="12" fill="${INK}" text-anchor="end">${v}</text>`;
  }
  labels.forEach((l, i) => {
    const x = x0 + 12 + i * (bw + gap);
    body += `<rect x="${x}" y="${yOf(values[i])}" width="${bw}" height="${round(y0 - yOf(values[i]), 2)}" fill="${SHADE}" stroke="${INK}" stroke-width="1.2"/>`;
    body += `<text x="${x + bw / 2}" y="${y0 + 18}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">${l}</text>`;
  });
  body += `<line x1="${x0}" y1="${y0}" x2="${x0 + labels.length * (bw + gap) + 6}" y2="${y0}" stroke="${INK}" stroke-width="1.6"/>`;
  return svg(x0 + labels.length * (bw + gap) + 12, y0 + 26, body);
}

/** טרפז: בסיס גדול למטה, בסיס קטן למעלה, גובה מקווקו. rightAngled — שוק שמאלית מאונכת. */
export function trapezoidFig({ top, bottom, height, rightAngled = false }) {
  const bw = 190;
  const tw = 105;
  const hh = 85;
  const y0 = hh + 30;
  const tx = rightAngled ? 0 : 45;
  const hx = rightAngled ? 0 : tx;
  let body = `<polygon points="0,${y0} ${bw},${y0} ${tx + tw},${y0 - hh} ${tx},${y0 - hh}" fill="#eaf4fd" stroke="${INK}" stroke-width="2"/>`;
  if (!rightAngled) body += `<line x1="${hx}" y1="${y0 - hh}" x2="${hx}" y2="${y0}" stroke="${ACCENT}" stroke-width="1.8" stroke-dasharray="5 4"/>`;
  body += rightAngle(hx, y0, 1);
  body += label(bw / 2, y0 + 22, bottom) + label(tx + tw / 2, y0 - hh - 10, top);
  body += label(hx + (rightAngled ? -8 : 8), y0 - hh / 2 + 5, height, rightAngled ? 'end' : 'start', ACCENT);
  return svg(bw + 50, y0 + 32, body, -30, 0);
}

/** תיבה בהיטל אלכסוני, עם תוויות אורך / רוחב / גובה. */
export function boxFig({ l, w, h }) {
  const L = 130;
  const H = 70;
  const dx = 40;
  const dy = 28;
  const x0 = 10;
  const y0 = dy + H + 10;
  const front = `${x0},${y0} ${x0 + L},${y0} ${x0 + L},${y0 - H} ${x0},${y0 - H}`;
  const topFace = `${x0},${y0 - H} ${x0 + L},${y0 - H} ${x0 + L + dx},${y0 - H - dy} ${x0 + dx},${y0 - H - dy}`;
  const side = `${x0 + L},${y0} ${x0 + L + dx},${y0 - dy} ${x0 + L + dx},${y0 - H - dy} ${x0 + L},${y0 - H}`;
  const hidden =
    `<line x1="${x0}" y1="${y0}" x2="${x0 + dx}" y2="${y0 - dy}" stroke="${INK}" stroke-width="1" stroke-dasharray="4 3"/>` +
    `<line x1="${x0 + dx}" y1="${y0 - dy}" x2="${x0 + L + dx}" y2="${y0 - dy}" stroke="${INK}" stroke-width="1" stroke-dasharray="4 3"/>` +
    `<line x1="${x0 + dx}" y1="${y0 - dy}" x2="${x0 + dx}" y2="${y0 - H - dy}" stroke="${INK}" stroke-width="1" stroke-dasharray="4 3"/>`;
  const body =
    hidden +
    `<polygon points="${front}" fill="#eaf4fd" stroke="${INK}" stroke-width="2"/>` +
    `<polygon points="${topFace}" fill="#d6e9fa" stroke="${INK}" stroke-width="2"/>` +
    `<polygon points="${side}" fill="#c4def6" stroke="${INK}" stroke-width="2"/>` +
    label(x0 + L / 2, y0 + 20, l) +
    label(x0 - 6, y0 - H / 2 + 5, h, 'end') +
    label(x0 + L + dx / 2 + 8, y0 - dy / 2 + 12, w, 'start');
  return svg(x0 + L + dx + 40, y0 + 28, body, -24, 0);
}

/** אבני בניין לשרטוטים מיוחדים בקבצי הנושאים. */
export const svgParts = { svg, label, rightAngle, INK, ACCENT, SHADE };

/**
 * "איזה קטע הוא הגובה?" — משולש ABC עם בסיס BC אופקי ושלושה קטעים מ-A
 * לנקודות D, E, F על BC או על המשכו. בדיוק אחד מהם מאונך (x של הרגל = ax).
 * רגל ב-0 היא הקודקוד B עצמו — הקטע הוא הצלע AB (במשולש ישר-זווית).
 */
export function heightCandidates({ ax, feet }) {
  const bw = 170;
  const hh = 95;
  const y0 = hh + 16;
  const xs = [0, bw, ax, ...feet];
  const minX = Math.min(...xs) - 26;
  const maxX = Math.max(...xs) + 26;
  let body = `<polygon points="0,${y0} ${bw},${y0} ${ax},${y0 - hh}" fill="#eaf4fd" stroke="${INK}" stroke-width="2"/>`;
  const ext = Math.min(...feet, ax);
  const extR = Math.max(...feet, ax);
  if (ext < 0) body += `<line x1="${ext - 8}" y1="${y0}" x2="0" y2="${y0}" stroke="${INK}" stroke-width="1.2" stroke-dasharray="4 3"/>`;
  if (extR > bw) body += `<line x1="${bw}" y1="${y0}" x2="${extR + 8}" y2="${y0}" stroke="${INK}" stroke-width="1.2" stroke-dasharray="4 3"/>`;
  ['D', 'E', 'F'].slice(0, feet.length).forEach((name, i) => {
    if (feet[i] === 0) return; // רגל ב-B: הקטע הוא הצלע AB עצמה
    body += `<line x1="${ax}" y1="${y0 - hh}" x2="${feet[i]}" y2="${y0}" stroke="${ACCENT}" stroke-width="1.6" stroke-dasharray="5 3"/>`;
    body += `<circle cx="${feet[i]}" cy="${y0}" r="2.8" fill="${ACCENT}"/>` + label(feet[i], y0 + 19, name, 'middle', ACCENT);
  });
  body += label(ax, y0 - hh - 6, 'A') + label(-3, y0 + 19, 'B', 'end') + label(bw + 3, y0 + 19, 'C', 'start');
  return svg(maxX - minX, y0 + 28, body, minX, 0);
}
