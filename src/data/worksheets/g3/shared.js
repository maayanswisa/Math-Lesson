/** שרטוטים לדפי העבודה של כיתה ג׳: שעון, זווית, פריסה ודיאגרמת עמודות כפולה. */
import { round, svgParts } from '../helpers.js';

export { tf } from '../g11/shared.js';

const { svg, label, INK, ACCENT, SHADE } = svgParts;

/** שעון מחוגים שמראה h:mm. */
export function clockFig(h, mm, size = 150) {
  const c = size / 2;
  const r = c - 6;
  const pt = (deg, len) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [round(c + len * Math.cos(a), 2), round(c + len * Math.sin(a), 2)];
  };
  let body = `<circle cx="${c}" cy="${c}" r="${r}" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`;
  for (let i = 0; i < 60; i++) {
    const [x1, y1] = pt(i * 6, r);
    const [x2, y2] = pt(i * 6, i % 5 === 0 ? r - 8 : r - 4);
    body += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="${i % 5 === 0 ? 2 : 1}"/>`;
  }
  const [hx, hy] = pt(((h % 12) + mm / 60) * 30, r * 0.5);
  const [mx, my] = pt(mm * 6, r * 0.8);
  body += `<line x1="${c}" y1="${c}" x2="${hx}" y2="${hy}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
  body += `<line x1="${c}" y1="${c}" x2="${mx}" y2="${my}" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round"/>`;
  body += `<circle cx="${c}" cy="${c}" r="4" fill="${INK}"/>`;
  // המספרים מעל המחוגים, עם הילה לבנה — כדי שיהיו קריאים גם כשמחוג עובר עליהם
  for (let n = 1; n <= 12; n++) {
    const [x, y] = pt(n * 30, r - 18);
    body += `<text x="${x}" y="${y + 5}" font-size="13" font-weight="700" fill="${INK}" stroke="#fff" stroke-width="3" paint-order="stroke" text-anchor="middle">${n}</text>`;
  }
  return svg(size, size, body);
}

/** זווית בגודל deg: קרן אופקית וקרן נוספת, עם קשת (ריבוע קטן לזווית ישרה). */
export function angleFig(deg) {
  const vx = 60;
  const vy = 110;
  const len = 90;
  const a = (deg * Math.PI) / 180;
  const ex = round(vx + len * Math.cos(a), 2);
  const ey = round(vy - len * Math.sin(a), 2);
  let body = `<line x1="${vx}" y1="${vy}" x2="${vx + len}" y2="${vy}" stroke="${INK}" stroke-width="2.5"/>`;
  body += `<line x1="${vx}" y1="${vy}" x2="${ex}" y2="${ey}" stroke="${INK}" stroke-width="2.5"/>`;
  if (deg === 90) {
    body += `<path d="M ${vx + 14} ${vy} L ${vx + 14} ${vy - 14} L ${vx} ${vy - 14}" fill="none" stroke="${ACCENT}" stroke-width="1.8"/>`;
  } else {
    const r = 22;
    const large = deg > 180 ? 1 : 0;
    body += `<path d="M ${vx + r} ${vy} A ${r} ${r} 0 ${large} 0 ${round(vx + r * Math.cos(a), 2)} ${round(vy - r * Math.sin(a), 2)}" fill="none" stroke="${ACCENT}" stroke-width="1.8"/>`;
  }
  return svg(200, 130, body, -10, 0);
}

/** פריסה: רשימת משבצות [עמודה, שורה]. */
export function netFig(cells, size = 26) {
  const cols = Math.max(...cells.map((c) => c[0])) + 1;
  const rows = Math.max(...cells.map((c) => c[1])) + 1;
  const body = cells
    .map(([x, y]) => `<rect x="${2 + x * size}" y="${2 + y * size}" width="${size}" height="${size}" fill="${SHADE}" stroke="${INK}" stroke-width="1.6"/>`)
    .join('');
  return svg(cols * size + 4, rows * size + 4, body);
}

/** דיאגרמת עמודות כפולה עם מקרא. series: [{ name, values }] (שתי סדרות). */
export function doubleBarChart({ labels, series, step }) {
  const max = Math.max(...series.flatMap((s) => s.values));
  const top = Math.ceil(max / step) * step;
  const ph = 130;
  const x0 = 34;
  const group = 64;
  const bw = 20;
  const y0 = ph + 30;
  const yOf = (v) => round(y0 - (v / top) * ph, 2);
  const colors = [SHADE, '#f2b8a8'];
  const width = x0 + labels.length * group + 10;
  let body = '';
  for (let v = 0; v <= top; v += step) {
    body += `<line x1="${x0}" y1="${yOf(v)}" x2="${width - 6}" y2="${yOf(v)}" stroke="#cfd8e3" stroke-width="1"/>`;
    body += `<text x="${x0 - 5}" y="${yOf(v) + 4}" font-size="11" fill="${INK}" text-anchor="end">${v}</text>`;
  }
  labels.forEach((l, i) => {
    series.forEach((s, j) => {
      const x = x0 + 10 + i * group + j * (bw + 2);
      body += `<rect x="${x}" y="${yOf(s.values[i])}" width="${bw}" height="${round(y0 - yOf(s.values[i]), 2)}" fill="${colors[j]}" stroke="${INK}" stroke-width="1"/>`;
    });
    body += `<text x="${x0 + 10 + i * group + bw + 1}" y="${y0 + 16}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">${l}</text>`;
  });
  body += `<line x1="${x0}" y1="${y0}" x2="${width - 6}" y2="${y0}" stroke="${INK}" stroke-width="1.5"/>`;
  // מקרא — מימין לשמאל: ריבוע הצבע ואחריו (משמאלו) השם
  series.forEach((s, j) => {
    const rx = width - 24 - j * 110;
    body += `<rect x="${rx}" y="6" width="14" height="14" fill="${colors[j]}" stroke="${INK}" stroke-width="1"/>` + label(rx - 6, 18, s.name, 'end');
  });
  return svg(width, y0 + 24, body);
}
