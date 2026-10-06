/** עזרים לדפי העבודה של כיתה ז׳: מספרים מכוונים, חזקות ושרטוטים. */
import { num, round, svgParts } from '../helpers.js';

export { tf, exact } from '../g11/shared.js';

const { svg, label, INK, ACCENT, SHADE } = svgParts;

/** מספר מכוון ב-LaTeX: שלילי בסוגריים — (-3). */
export const sn = (x) => (x < 0 ? `(-${num(-x)})` : num(x));

/**
 * מחשב ביטוי שכתוב ב-LaTeX: \times, :, סוגריים (גם מרובעים), חזקות ^{n} או ^n.
 * מינוס אונרי לפני חזקה (כמו -3^2) לא נתמך בכוונה — JS זורק עליו, וזה טוב:
 * כך לא "נבחר" בטעות פירוש.
 */
export function ev(tex) {
  const js = tex
    .replace(/\\times|\\cdot/g, '*')
    .replace(/:/g, '/')
    .replace(/\{,\}/g, '')
    .replace(/\\left|\\right/g, '')
    .replace(/\^\{(\d+)\}/g, '**$1')
    .replace(/\^(\d)/g, '**$1')
    .replace(/\[/g, '(')
    .replace(/\]/g, ')');
  if (!/^[\d+\-*/(). ]+$/.test(js)) throw new Error(`ev: unsupported "${tex}"`);
  return round(Function(`"use strict"; return (${js});`)());
}

/**
 * ערך של ביטוי אלגברי (ב-LaTeX) בהצבה: at('3x + 2', { x: 4 }) → 14.
 * כפל סמוי (3x, 2(x + 1), xy) הופך לכפל מפורש לפני ההצבה.
 */
export function at(tex, vals) {
  const s = tex
    .replace(/\\times|\\cdot/g, '*')
    .replace(/(\d|\))\s*(?=[a-z(])/g, '$1*')
    .replace(/([a-z])\s*(?=[a-z(])/g, '$1*')
    .replace(/[a-z]/g, (v) => {
      if (!(v in vals)) throw new Error(`at: no value for ${v} in "${tex}"`);
      return `(${vals[v]})`;
    });
  return ev(s);
}

/** תרגיל שהתשובה שלו מחושבת מהטקסט עצמו (עם חזקות ומספרים מכוונים). */
export const evItem = (tex) => ({ q: `$${tex} =$ [[${ev(tex)}]]` });

/* ---------- שרטוטים ---------- */

/** ישר מספרים מ-min עד max (שלמים), עם נקודות מסומנות באותיות. */
export function signedLine({ min, max, points = [] }) {
  const n = max - min;
  const unit = Math.min(34, 300 / n);
  const x0 = 14;
  const y = 34;
  const X = (v) => round(x0 + (v - min) * unit, 2);
  let body = `<line x1="${x0 - 8}" y1="${y}" x2="${X(max) + 10}" y2="${y}" stroke="${INK}" stroke-width="2"/>`;
  for (let v = min; v <= max; v++) {
    const big = v === 0;
    body += `<line x1="${X(v)}" y1="${y - (big ? 9 : 6)}" x2="${X(v)}" y2="${y + (big ? 9 : 6)}" stroke="${INK}" stroke-width="${big ? 2.2 : 1.3}"/>`;
    if (v === 0 || v === min || v === max) body += `<text x="${X(v)}" y="${y + 24}" font-size="13" fill="${INK}" text-anchor="middle" direction="ltr">${v < 0 ? '−' + -v : v}</text>`;
  }
  for (const p of points) body += `<circle cx="${X(p.at)}" cy="${y}" r="4.5" fill="${ACCENT}"/>` + label(X(p.at), y - 13, p.label, 'middle', ACCENT);
  return svg(X(max) + 22, y + 32, body);
}

/** שני ישרים נחתכים; angle — הזווית בין הקרן הימנית לקרן העליונה. labels: [ימין-למעלה, שמאל-למעלה, שמאל-למטה, ימין-למטה]. */
export function crossFig(angle, labels) {
  const cx = 110;
  const cy = 70;
  const L = 95;
  const a = (angle * Math.PI) / 180;
  const dx = round(L * Math.cos(a) * 0.75, 2);
  const dy = round(L * Math.sin(a) * 0.75, 2);
  let body = `<line x1="${cx - L}" y1="${cy}" x2="${cx + L}" y2="${cy}" stroke="${INK}" stroke-width="2"/>`;
  body += `<line x1="${cx - dx}" y1="${cy + dy}" x2="${cx + dx}" y2="${cy - dy}" stroke="${INK}" stroke-width="2"/>`;
  const at = (mid, r = 26) => [round(cx + r * Math.cos(mid), 2), round(cy - r * Math.sin(mid) + 5, 2)];
  const mids = [a / 2, (a + Math.PI) / 2, Math.PI + a / 2, (Math.PI + a + 2 * Math.PI) / 2];
  labels.forEach((t, i) => {
    if (t == null) return;
    const [x, y] = at(mids[i], i % 2 === 0 ? 34 : 30);
    body += label(x, y, t, 'middle', i === 0 ? ACCENT : INK);
  });
  return svg(220, 140, body);
}

/** קרן שיוצאת מישר: זוויות צמודות. labels: [ימין, שמאל]. */
export function adjacentFig(angle, labels) {
  const cx = 110;
  const cy = 100;
  const a = (angle * Math.PI) / 180;
  let body = `<line x1="10" y1="${cy}" x2="210" y2="${cy}" stroke="${INK}" stroke-width="2"/>`;
  body += `<line x1="${cx}" y1="${cy}" x2="${round(cx + 85 * Math.cos(a), 2)}" y2="${round(cy - 85 * Math.sin(a), 2)}" stroke="${INK}" stroke-width="2"/>`;
  const at = (mid, r) => [round(cx + r * Math.cos(mid), 2), round(cy - r * Math.sin(mid) + 5, 2)];
  const [x1, y1] = at(a / 2, 34);
  const [x2, y2] = at((a + Math.PI) / 2, 30);
  body += label(x1, y1, labels[0], 'middle', ACCENT) + label(x2, y2, labels[1]);
  return svg(220, 115, body);
}

/** משולש עם תוויות ליד הקודקודים (לא בקנה מידה). */
export function triangleAnglesFig(labels, names = ['A', 'B', 'C']) {
  const P = [[20, 125], [210, 125], [85, 18]];
  let body = `<polygon points="${P.map((p) => p.join(',')).join(' ')}" fill="#eaf4fd" stroke="${INK}" stroke-width="2"/>`;
  const inside = [[48, 117], [178, 117], [87, 48]];
  const outside = [[10, 140, 'end'], [220, 140, 'start'], [85, 12, 'middle']];
  labels.forEach((t, i) => {
    if (t != null) body += label(inside[i][0], inside[i][1], t, 'middle', ACCENT);
    body += label(outside[i][0], outside[i][1], names[i], outside[i][2]);
  });
  return svg(240, 150, body, -10, -6);
}

/** מרובע עם תוויות זוויות. */
export function quadAnglesFig(labels) {
  const P = [[20, 120], [200, 120], [175, 25], [55, 15]];
  let body = `<polygon points="${P.map((p) => p.join(',')).join(' ')}" fill="#eaf4fd" stroke="${INK}" stroke-width="2"/>`;
  const inside = [[45, 110], [178, 110], [160, 45], [65, 40]];
  labels.forEach((t, i) => {
    if (t != null) body += label(inside[i][0], inside[i][1], t, 'middle', ACCENT);
  });
  return svg(220, 135, body);
}

/**
 * רשת משבצות עם מצולעים. shapes: [{ pts: [[x,y],...], kind: 'orig'|'image', name }].
 * axes: [x, y] — היכן לצייר את הצירים; mirror: [[x1,y1],[x2,y2]] — ציר שיקוף; center: [x,y] — מרכז סיבוב.
 */
export function gridFig({ w, h, shapes, axes = null, mirror = null, center = null, cell = 20 }) {
  const X = (x) => 4 + x * cell;
  const Y = (y) => 4 + (h - y) * cell;
  let body = '';
  for (let x = 0; x <= w; x++) body += `<line x1="${X(x)}" y1="${Y(0)}" x2="${X(x)}" y2="${Y(h)}" stroke="#dde4ec" stroke-width="1"/>`;
  for (let y = 0; y <= h; y++) body += `<line x1="${X(0)}" y1="${Y(y)}" x2="${X(w)}" y2="${Y(y)}" stroke="#dde4ec" stroke-width="1"/>`;
  if (axes) {
    body += `<line x1="${X(0)}" y1="${Y(axes[1])}" x2="${X(w)}" y2="${Y(axes[1])}" stroke="${INK}" stroke-width="1.5"/>`;
    body += `<line x1="${X(axes[0])}" y1="${Y(0)}" x2="${X(axes[0])}" y2="${Y(h)}" stroke="${INK}" stroke-width="1.5"/>`;
  }
  for (const s of shapes) {
    const fill = s.kind === 'image' ? '#f2b8a8' : SHADE;
    body += `<polygon points="${s.pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')}" fill="${fill}" fill-opacity="0.85" stroke="${INK}" stroke-width="1.6"/>`;
    if (s.name) {
      const cxs = s.pts.reduce((t, p) => t + p[0], 0) / s.pts.length;
      const cys = s.pts.reduce((t, p) => t + p[1], 0) / s.pts.length;
      body += label(X(cxs), Y(cys) + 5, s.name);
    }
  }
  if (mirror) body += `<line x1="${X(mirror[0][0])}" y1="${Y(mirror[0][1])}" x2="${X(mirror[1][0])}" y2="${Y(mirror[1][1])}" stroke="${ACCENT}" stroke-width="2" stroke-dasharray="6 4"/>`;
  if (center) body += `<circle cx="${X(center[0])}" cy="${Y(center[1])}" r="4" fill="${ACCENT}"/>`;
  return svg(w * cell + 8, h * cell + 8, body);
}

/** מנסרה משולשת שוכבת (בהיטל אלכסוני). */
export function prismFig({ base, height, length }) {
  const A = [20, 120];
  const B = [120, 120];
  const C = [55, 45];
  const d = [70, -35];
  const sh = ([x, y]) => [x + d[0], y + d[1]];
  const pts = (arr) => arr.map((p) => p.join(',')).join(' ');
  const [A2, B2, C2] = [A, B, C].map(sh);
  let body = `<line x1="${A[0]}" y1="${A[1]}" x2="${A2[0]}" y2="${A2[1]}" stroke="${INK}" stroke-width="1" stroke-dasharray="4 3"/>`;
  body += `<line x1="${A2[0]}" y1="${A2[1]}" x2="${B2[0]}" y2="${B2[1]}" stroke="${INK}" stroke-width="1" stroke-dasharray="4 3"/>`;
  body += `<line x1="${A2[0]}" y1="${A2[1]}" x2="${C2[0]}" y2="${C2[1]}" stroke="${INK}" stroke-width="1" stroke-dasharray="4 3"/>`;
  body += `<polygon points="${pts([B, B2, C2, C])}" fill="#d6e9fa" stroke="${INK}" stroke-width="2"/>`;
  body += `<polygon points="${pts([A, B, C])}" fill="#eaf4fd" stroke="${INK}" stroke-width="2"/>`;
  body += `<line x1="${C[0]}" y1="${C[1]}" x2="${C[0]}" y2="${A[1]}" stroke="${ACCENT}" stroke-width="1.6" stroke-dasharray="5 4"/>`;
  if (base != null) body += label((A[0] + B[0]) / 2, A[1] + 20, base);
  if (height != null) body += label(C[0] - 6, (C[1] + A[1]) / 2 + 8, height, 'end', ACCENT);
  if (length != null) body += label((B[0] + B2[0]) / 2 + 10, (B[1] + B2[1]) / 2 + 12, length, 'start');
  return svg(230, 150, body, -10, 0);
}
