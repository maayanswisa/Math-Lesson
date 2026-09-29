import { useId } from 'react';

/**
 * עזרי שרטוט לגרפים: קנה מידה, צירים ומסלול של פונקציה
 * שנשבר ליד אסימפטוטות (כשהערך "בורח" או לא מוגדר).
 */
export function makeScale({ W = 300, H = 260, x0, x1, y0, y1, pad = 14 }) {
  const sx = (x) => pad + ((x - x0) / (x1 - x0)) * (W - 2 * pad);
  const sy = (y) => H - pad - ((y - y0) / (y1 - y0)) * (H - 2 * pad);
  return { W, H, x0, x1, y0, y1, sx, sy };
}

export function fnPath(f, s, { from = s.x0, to = s.x1, step } = {}) {
  const dx = step ?? (s.x1 - s.x0) / 400;
  const limit = (s.y1 - s.y0) * 1.5;
  let d = '';
  let pen = false;
  let prev = null;
  for (let x = from; x <= to + 1e-9; x += dx) {
    const y = f(x);
    const bad = !Number.isFinite(y) || y > s.y1 + limit || y < s.y0 - limit || (prev !== null && Math.abs(y - prev) > limit);
    if (bad) {
      pen = false;
      prev = Number.isFinite(y) ? y : null;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${s.sx(x).toFixed(1)},${s.sy(y).toFixed(1)}`;
    pen = true;
    prev = y;
  }
  return d;
}

export function Axes({ s, step = 1, yStep = step, labelEvery = 2, xLabel = 'x', yLabel = 'y' }) {
  const xs = [];
  for (let v = Math.ceil(s.x0 / step) * step; v <= s.x1; v += step) xs.push(Number(v.toFixed(6)));
  const ys = [];
  for (let v = Math.ceil(s.y0 / yStep) * yStep; v <= s.y1; v += yStep) ys.push(Number(v.toFixed(6)));
  const ox = Math.min(Math.max(0, s.x0), s.x1);
  const oy = Math.min(Math.max(0, s.y0), s.y1);
  const show = (v, st = step) => v !== 0 && Math.abs(Math.round(v / st)) % labelEvery === 0;
  return (
    <g>
      {xs.map((v) => (
        <line key={`gx${v}`} x1={s.sx(v)} y1={s.sy(s.y0)} x2={s.sx(v)} y2={s.sy(s.y1)} stroke="#eef1f5" />
      ))}
      {ys.map((v) => (
        <line key={`gy${v}`} x1={s.sx(s.x0)} y1={s.sy(v)} x2={s.sx(s.x1)} y2={s.sy(v)} stroke="#eef1f5" />
      ))}
      <line x1={s.sx(s.x0)} y1={s.sy(oy)} x2={s.sx(s.x1)} y2={s.sy(oy)} stroke="var(--color-ink)" strokeWidth="1.5" />
      <line x1={s.sx(ox)} y1={s.sy(s.y0)} x2={s.sx(ox)} y2={s.sy(s.y1)} stroke="var(--color-ink)" strokeWidth="1.5" />
      {xs.filter(show).map((v) => (
        <text key={`lx${v}`} x={s.sx(v)} y={s.sy(oy) + 12} fontSize="9" textAnchor="middle" fill="var(--color-slate)">
          {v}
        </text>
      ))}
      {ys.filter((v) => show(v, yStep)).map((v) => (
        <text key={`ly${v}`} x={s.sx(ox) - 4} y={s.sy(v) + 3} fontSize="9" textAnchor="end" fill="var(--color-slate)">
          {v}
        </text>
      ))}
      <text x={s.sx(s.x1) - 2} y={s.sy(oy) - 5} fontSize="11" fontStyle="italic" fontWeight="700" textAnchor="end" fill="var(--color-ink)">
        {xLabel}
      </text>
      <text x={s.sx(ox) + 5} y={s.sy(s.y1) + 10} fontSize="11" fontStyle="italic" fontWeight="700" fill="var(--color-ink)">
        {yLabel}
      </text>
    </g>
  );
}

/** אזור חיתוך בגבולות הגרף — כדי שעקומות ליד אסימפטוטה לא יגלשו מחוץ למסגרת. */
export function usePlotClip(s) {
  const id = `clip${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const defs = (
    <defs>
      <clipPath id={id}>
        <rect x={s.sx(s.x0)} y={s.sy(s.y1)} width={s.sx(s.x1) - s.sx(s.x0)} height={s.sy(s.y0) - s.sy(s.y1)} />
      </clipPath>
    </defs>
  );
  return { defs, clip: `url(#${id})` };
}
