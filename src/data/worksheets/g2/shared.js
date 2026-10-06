/** שרטוטים לדפי העבודה של כיתה ב׳. */
import { round, svgParts } from '../helpers.js';

export { tf } from '../g11/shared.js';
export { clockFig, angleFig } from '../g3/shared.js';
export { gridFig } from '../g7/shared.js';

const { svg, label, INK, ACCENT, SHADE } = svgParts;

/* ---------- סדרות צורניות ---------- */

const SHAPE_FILL = { circle: SHADE, square: '#f2b8a8', triangle: '#c9e4b4', star: '#f7d774' };
function shapeAt(kind, cx, cy, r = 13) {
  const fill = SHAPE_FILL[kind];
  const s = `fill="${fill}" stroke="${INK}" stroke-width="1.5"`;
  if (kind === 'circle') return `<circle cx="${cx}" cy="${cy}" r="${r}" ${s}/>`;
  if (kind === 'square') return `<rect x="${cx - r}" y="${cy - r}" width="${2 * r}" height="${2 * r}" ${s}/>`;
  if (kind === 'triangle') return `<polygon points="${cx},${cy - r} ${cx + r},${cy + r} ${cx - r},${cy + r}" ${s}/>`;
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r + 2 : r / 2;
    return `${round(cx + rr * Math.cos(a), 2)},${round(cy + rr * Math.sin(a), 2)}`;
  }).join(' ');
  return `<polygon points="${pts}" ${s}/>`;
}

/** סדרת צורות משמאל לימין, ובסוף סימן שאלה. */
export function patternFig(kinds) {
  const step = 34;
  let body = kinds.map((k, i) => shapeAt(k, 20 + i * step, 22)).join('');
  body += label(20 + kinds.length * step, 28, '?', 'middle', ACCENT);
  return svg(kinds.length * step + 40, 44, body);
}
export const SHAPE_NAMES = { circle: 'עיגול', square: 'ריבוע', triangle: 'משולש', star: 'כוכב' };

/* ---------- כפל: קבוצות ומערכים ---------- */

/** groups קבוצות, בכל אחת per נקודות (בתוך עיגול). */
export function groupsFig(groups, per) {
  const cols = Math.ceil(Math.sqrt(per));
  const rows = Math.ceil(per / cols);
  const gw = cols * 14 + 16;
  const gh = rows * 14 + 16;
  let body = '';
  for (let g = 0; g < groups; g++) {
    const x0 = 4 + g * (gw + 8);
    body += `<rect x="${x0}" y="4" width="${gw}" height="${gh}" rx="12" fill="#fff" stroke="${INK}" stroke-width="1.4"/>`;
    for (let i = 0; i < per; i++) {
      body += `<circle cx="${x0 + 15 + (i % cols) * 14}" cy="${19 + Math.floor(i / cols) * 14}" r="5" fill="${ACCENT}"/>`;
    }
  }
  return svg(groups * (gw + 8) + 4, gh + 8, body);
}

/** מערך: rows שורות של cols נקודות. */
export function arrayFig(rows, cols) {
  let body = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) body += `<circle cx="${12 + c * 20}" cy="${12 + r * 20}" r="6.5" fill="${SHADE}" stroke="${INK}" stroke-width="1.2"/>`;
  return svg(cols * 20 + 4, rows * 20 + 4, body);
}

/** n עיגולים מסודרים בזוגות (עמודות של שניים); אם n אי-זוגי — האחרון לבד. */
export function pairsFig(n) {
  let body = '';
  for (let i = 0; i < n; i++) body += `<circle cx="${12 + Math.floor(i / 2) * 22}" cy="${12 + (i % 2) * 22}" r="7.5" fill="${SHADE}" stroke="${INK}" stroke-width="1.2"/>`;
  return svg(Math.ceil(n / 2) * 22 + 4, 46, body);
}

/* ---------- מדידה ---------- */

/** סרגל בס״מ (0..max) וקטע מעליו מ-from עד to. */
export function rulerFig(from, to, max = 12) {
  const u = 24;
  const x0 = 14;
  let body = `<rect x="${x0 - 8}" y="30" width="${max * u + 16}" height="34" rx="4" fill="#fdf6dc" stroke="${INK}" stroke-width="1.3"/>`;
  for (let k = 0; k <= max; k++) {
    body += `<line x1="${x0 + k * u}" y1="30" x2="${x0 + k * u}" y2="44" stroke="${INK}" stroke-width="1.4"/>`;
    if (k < max) body += `<line x1="${x0 + k * u + u / 2}" y1="30" x2="${x0 + k * u + u / 2}" y2="37" stroke="${INK}" stroke-width="0.9"/>`;
    body += `<text x="${x0 + k * u}" y="58" font-size="11" fill="${INK}" text-anchor="middle">${k}</text>`;
  }
  body += `<line x1="${x0 + from * u}" y1="18" x2="${x0 + to * u}" y2="18" stroke="${ACCENT}" stroke-width="4" stroke-linecap="round"/>`;
  return svg(max * u + 30, 68, body);
}

/** קו שבור: אורכי הקטעים (בס״מ) כתובים ליד כל קטע. */
export function brokenLineFig(lengths) {
  const dirs = [[1, -0.8], [1, 0.9], [1, -0.6], [1, 0.7], [1, -0.9]];
  let x = 12;
  let y = 70;
  let body = '';
  lengths.forEach((len, i) => {
    const [dx, dy] = dirs[i % dirs.length];
    const scale = 14 + len * 4;
    const nx = round(x + dx * scale, 2);
    const ny = round(y + dy * scale * 0.6, 2);
    body += `<line x1="${x}" y1="${y}" x2="${nx}" y2="${ny}" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`;
    body += `<circle cx="${x}" cy="${y}" r="3.2" fill="${INK}"/>`;
    body += label((x + nx) / 2, (y + ny) / 2 - 8, len, 'middle', ACCENT);
    x = nx;
    y = ny;
  });
  body += `<circle cx="${x}" cy="${y}" r="3.2" fill="${INK}"/>`;
  return svg(x + 16, 120, body, 0, 10);
}

/** מצולע עם אורכי צלעות: מלבן, משולש, מחומש או משושה (לא בקנה מידה). */
export function polygonFig(kind, labels) {
  const P = {
    rect: [[20, 20], [190, 20], [190, 100], [20, 100]],
    square: [[30, 15], [125, 15], [125, 110], [30, 110]],
    triangle: [[20, 110], [190, 110], [80, 15]],
    pentagon: [[105, 12], [195, 75], [160, 125], [50, 125], [15, 75]],
    hexagon: [[60, 15], [150, 15], [195, 70], [150, 125], [60, 125], [15, 70]],
  }[kind];
  let body = `<polygon points="${P.map((p) => p.join(',')).join(' ')}" fill="#eaf4fd" stroke="${INK}" stroke-width="2"/>`;
  const cx = P.reduce((s, p) => s + p[0], 0) / P.length;
  const cy = P.reduce((s, p) => s + p[1], 0) / P.length;
  P.forEach((p, i) => {
    const q = P[(i + 1) % P.length];
    if (labels[i] == null) return;
    const mx = (p[0] + q[0]) / 2;
    const my = (p[1] + q[1]) / 2;
    const d = Math.hypot(mx - cx, my - cy) || 1;
    body += label(round(mx + ((mx - cx) / d) * 14, 2), round(my + ((my - cy) / d) * 14 + 5, 2), labels[i]);
  });
  const xs = P.map((p) => p[0]);
  return svg(Math.max(...xs) + 40, 150, body, -15, -8);
}

/* ---------- קוביות וגופים ---------- */

/** מבנה של l × w × h קוביות (היטל אלכסוני). */
export function cubeStackFig(l, w, h, c = 22) {
  const dx = c * 0.55;
  const dy = c * 0.45;
  const x0 = 6;
  const y0 = 8 + w * dy + h * c;
  let body = '';
  const face = (pts, fill) => `<polygon points="${pts.map(([x, y]) => `${round(x, 2)},${round(y, 2)}`).join(' ')}" fill="${fill}" stroke="${INK}" stroke-width="1.1"/>`;
  // חזית
  for (let i = 0; i < l; i++) for (let k = 0; k < h; k++) {
    const x = x0 + i * c;
    const y = y0 - (k + 1) * c;
    body += face([[x, y], [x + c, y], [x + c, y + c], [x, y + c]], '#eaf4fd');
  }
  // גג
  for (let i = 0; i < l; i++) for (let j = 0; j < w; j++) {
    const x = x0 + i * c + j * dx;
    const y = y0 - h * c - j * dy;
    body += face([[x, y], [x + c, y], [x + c + dx, y - dy], [x + dx, y - dy]], '#d6e9fa');
  }
  // צד ימין
  for (let j = 0; j < w; j++) for (let k = 0; k < h; k++) {
    const x = x0 + l * c + j * dx;
    const y = y0 - (k + 1) * c - j * dy;
    body += face([[x, y], [x + dx, y - dy], [x + dx, y - dy + c], [x, y + c]], '#c4def6');
  }
  return svg(x0 + l * c + w * dx + 8, y0 + 6, body);
}

/** מגדלי קוביות זה לצד זה, עם אות מתחת לכל מגדל. */
export function towersFig(heights, names = 'ABCDE') {
  const c = 18;
  const top = Math.max(...heights) * c + 10;
  let body = '';
  heights.forEach((h, i) => {
    const x = 10 + i * 46;
    for (let k = 0; k < h; k++) body += `<rect x="${x}" y="${top - (k + 1) * c}" width="${c}" height="${c}" fill="${SHADE}" stroke="${INK}" stroke-width="1.2"/>`;
    body += label(x + c / 2, top + 18, names[i]);
  });
  return svg(heights.length * 46 + 4, top + 26, body);
}

/** גופים פשוטים: cube, box, cylinder, cone, sphere, pyramid, prism. */
export function solidFig(kind) {
  const f = `fill="#eaf4fd" stroke="${INK}" stroke-width="2"`;
  const dash = `fill="none" stroke="${INK}" stroke-width="1.1" stroke-dasharray="4 3"`;
  const bodies = {
    cube: `<polygon points="15,40 75,40 75,100 15,100" ${f}/><polygon points="15,40 40,18 100,18 75,40" ${f}/><polygon points="75,40 100,18 100,78 75,100" ${f}/>`,
    box: `<polygon points="10,45 95,45 95,95 10,95" ${f}/><polygon points="10,45 35,22 120,22 95,45" ${f}/><polygon points="95,45 120,22 120,72 95,95" ${f}/>`,
    cylinder: `<path d="M 20 25 L 20 95 A 40 12 0 0 0 100 95 L 100 25" ${f}/><ellipse cx="60" cy="25" rx="40" ry="12" ${f}/><path d="M 20 95 A 40 12 0 0 1 100 95" ${dash}/>`,
    cone: `<path d="M 60 10 L 20 95 A 40 12 0 0 0 100 95 Z" ${f}/><path d="M 20 95 A 40 12 0 0 1 100 95" ${dash}/>`,
    sphere: `<circle cx="60" cy="58" r="44" ${f}/><path d="M 16 58 A 44 13 0 0 0 104 58" fill="none" stroke="${INK}" stroke-width="1.2"/><path d="M 16 58 A 44 13 0 0 1 104 58" ${dash}/>`,
    pyramid: `<polygon points="15,95 85,95 60,10" ${f}/><polygon points="85,95 110,75 60,10" ${f}/><path d="M 15 95 L 40 75 L 110 75 M 40 75 L 60 10" ${dash}/>`,
    prism: `<polygon points="10,95 70,95 40,40" ${f}/><polygon points="70,95 110,70 80,15 40,40" ${f}/><path d="M 10 95 L 50 70 L 110 70 M 50 70 L 80 15" ${dash}/>`,
  };
  return svg(125, 110, bodies[kind]);
}
export const SOLID_NAMES = { cube: 'קובייה', box: 'תיבה', cylinder: 'גליל', cone: 'חרוט', sphere: 'כדור', pyramid: 'פירמידה', prism: 'מנסרה' };

/* ---------- נתונים ---------- */

/** פיקטוגרם: שורות של סמלים (עיגולים; 0.5 — חצי עיגול). */
export function pictogram(rows) {
  const W = 300;
  const rowH = 34;
  let body = '';
  rows.forEach(({ label: text, symbols }, r) => {
    const cy = 20 + r * rowH;
    body += label(W - 4, cy + 5, text, 'end');
    for (let i = 0; i < Math.ceil(symbols); i++) {
      const cx = 18 + i * 28;
      body += symbols - i === 0.5
        ? `<path d="M ${cx},${cy - 11} A 11 11 0 0 0 ${cx},${cy + 11} Z" fill="${SHADE}" stroke="${INK}" stroke-width="1.3"/>`
        : `<circle cx="${cx}" cy="${cy}" r="11" fill="${SHADE}" stroke="${INK}" stroke-width="1.3"/>`;
    }
  });
  return svg(W, rows.length * rowH + 8, body);
}
