import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';

const W = 300;
const H = 240;
const rad = (d) => (d * Math.PI) / 180;
const ELEV = rad(22);

function projector(theta, scale, center) {
  const ct = Math.cos(rad(theta));
  const st = Math.sin(rad(theta));
  return ([x, y, z]) => {
    const xr = (x - center[0]) * ct - (y - center[1]) * st;
    const depth = (x - center[0]) * st + (y - center[1]) * ct;
    const zz = z - center[2];
    return [W / 2 + scale * xr, H / 2 - scale * (zz * Math.cos(ELEV) - depth * Math.sin(ELEV))];
  };
}

const PAIRS = {
  parallel: { edges: ['AB', 'DC'], label: 'מקבילים', note: 'באותו מישור, ולא נפגשים' },
  cut: { edges: ['AB', "BB'"], label: 'נחתכים', note: 'נקודה משותפת אחת: B' },
  skew: { edges: ['AB', "CC'"], label: 'מצטלבים', note: 'לא נפגשים ולא מקבילים — רק במרחב!' },
  perp: { edges: ["AA'"], label: 'ישר ⟂ מישור', note: "AA' ניצב ל-AB ול-AD — ולכן לכל מישור הבסיס", plane: true },
};

/**
 * גוף במרחב שאפשר לסובב.
 * mode="lines" — תיבה, ובוחרים זוג ישרים: מקבילים / נחתכים / מצטלבים / ישר ניצב למישור.
 * mode="coords" — תיבה במערכת צירים: האלכסון AC′ כווקטור (a, b, c) והאורך שלו.
 * mode="pyramid" — פירמידה ישרה: הגובה נופל למרכז הבסיס, ונפח ⅓·בסיס·גובה.
 */
export default function Space3D({ caption, mode = 'lines' }) {
  const [theta, setTheta] = useState(30);
  const [dims, setDims] = useState([4, 3, 2]);
  const [h, setH] = useState(4);
  const [pair, setPair] = useState('skew');
  const [a, b, c] = dims;

  if (mode === 'pyramid') {
    const side = a;
    const P = projector(theta, 190 / (side + h), [side / 2, side / 2, h / 2]);
    const V = { A: [0, 0, 0], B: [side, 0, 0], C: [side, side, 0], D: [0, side, 0], S: [side / 2, side / 2, h], O: [side / 2, side / 2, 0] };
    const pt = (n) => P(V[n]);
    const edge = (p, q, color, w = 2, dash) => {
      const [x1, y1] = pt(p);
      const [x2, y2] = pt(q);
      return <line key={p + q} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round" />;
    };
    const slant = Math.sqrt(h * h + (side * side) / 2);
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
        {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
        <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
          <polygon points={['A', 'B', 'C', 'D'].map((n) => pt(n).join(',')).join(' ')} fill="rgba(13,110,110,0.1)" stroke="none" />
          {edge('A', 'C', 'var(--color-slate)', 1, '3 3')}
          {edge('B', 'D', 'var(--color-slate)', 1, '3 3')}
          {['AB', 'BC', 'CD', 'DA'].map((e) => edge(e[0], e[1], 'var(--color-teal)'))}
          {['A', 'B', 'C', 'D'].map((n) => edge('S', n, 'var(--color-ink)'))}
          {edge('S', 'O', 'var(--color-coral)', 3, '6 4')}
          {Object.keys(V).map((n) => {
            const [x, y] = pt(n);
            return (
              <text key={n} x={x + 5} y={y - 5} fontSize="12" fontWeight="800" fill={n === 'O' ? 'var(--color-coral)' : 'var(--color-ink)'}>
                {n}
              </text>
            );
          })}
        </svg>
        <div className="space-y-1">
          <LessonSlider
            label="סיבוב"
            value={theta}
            min={-80}
            max={80}
            step={5}
            onChange={setTheta}
            color="var(--color-slate)"
            suffix="°"
            width="w-14"
          />
          <LessonSlider label="צלע" value={a} min={2} max={6} onChange={(v) => setDims([v, b, c])} color="var(--color-teal)" width="w-14" />
          <LessonSlider label="גובה" value={h} min={2} max={7} onChange={setH} color="var(--color-coral)" width="w-14" />
        </div>
        <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
          <MathRenderer inline>{`$V=\\frac13\\cdot${side}^2\\cdot${h}=${fmt((side * side * h) / 3)}$`}</MathRenderer>
          <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">
            פירמידה ישרה: רגל הגובה <span dir="ltr">O</span> — במרכז הבסיס (מפגש האלכסונים). כל המקצועות הצדדיים שווים:{' '}
            <span dir="ltr">
              SA = √({h}² + {fmt((side * side) / 2)}) ≈ {fmt(slant)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const P = projector(theta, 150 / Math.max(a, b, c, 3), [a / 2, b / 2, c / 2]);
  const V = {
    A: [0, 0, 0],
    B: [a, 0, 0],
    C: [a, b, 0],
    D: [0, b, 0],
    "A'": [0, 0, c],
    "B'": [a, 0, c],
    "C'": [a, b, c],
    "D'": [0, b, c],
  };
  const EDGES = ['AB', 'BC', 'CD', 'DA', "A'B'", "B'C'", "C'D'", "D'A'", "AA'", "BB'", "CC'", "DD'"];
  const split = (e) =>
    e.length === 2 ? [e[0], e[1]] : e.length === 3 ? (e[1] === "'" ? [e.slice(0, 2), e[2]] : [e[0], e.slice(1)]) : [e.slice(0, 2), e.slice(2)];
  const hl = mode === 'lines' ? PAIRS[pair] : null;
  const line = (e, color, w, key) => {
    const [p, q] = split(e);
    const [x1, y1] = P(V[p]);
    const [x2, y2] = P(V[q]);
    return <line key={key ?? e} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" />;
  };
  const diag = Math.sqrt(a * a + b * b + c * c);
  const baseDiag = Math.sqrt(a * a + b * b);
  const angle = (Math.atan(c / baseDiag) * 180) / Math.PI;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      {mode === 'lines' && (
        <div className="mb-2 flex flex-wrap justify-center gap-2">
          {Object.entries(PAIRS).map(([k, v]) => (
            <button
              key={k}
              type="button"
              onClick={() => setPair(k)}
              className={`rounded-xl px-3 py-1.5 text-sm font-bold ${pair === k ? 'bg-[var(--color-violet)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {hl?.plane && <polygon points={['A', 'B', 'C', 'D'].map((n) => P(V[n]).join(',')).join(' ')} fill="rgba(124,77,204,0.18)" stroke="none" />}
        {EDGES.map((e) => line(e, 'var(--color-slate)', 1.5))}
        {mode === 'coords' && (
          <>
            {line('AC', 'var(--color-slate)', 1.5, 'ac')}
            {line("AC'", 'var(--color-coral)', 3.5, 'acp')}
          </>
        )}
        {hl && hl.edges.map((e, i) => line(e, i === 0 ? 'var(--color-teal)' : 'var(--color-violet)', 4.5, `hl${e}`))}
        {Object.entries(V).map(([n, p]) => {
          const [x, y] = P(p);
          return (
            <text key={n} x={x + 4} y={y - 4} fontSize="11" fontWeight="800" fill="var(--color-ink)">
              {n}
            </text>
          );
        })}
      </svg>
      <div className="space-y-1">
        <LessonSlider
          label="סיבוב"
          value={theta}
          min={-80}
          max={80}
          step={5}
          onChange={setTheta}
          color="var(--color-slate)"
          suffix="°"
          width="w-14"
        />
        {mode === 'coords' &&
          ['a', 'b', 'c'].map((n, i) => (
            <LessonSlider
              key={n}
              label={<i dir="ltr">{n}</i>}
              value={dims[i]}
              min={1}
              max={6}
              onChange={(v) => setDims((d) => d.map((x, j) => (j === i ? v : x)))}
              color="var(--color-teal)"
              width="w-14"
            />
          ))}
      </div>
      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        {mode === 'lines' ? (
          <>
            <span dir="ltr">{hl.edges.join(' , ')}</span> — {hl.label}
            <span className="block text-xs font-semibold text-[var(--color-slate)]">{hl.note}</span>
          </>
        ) : (
          <>
            <MathRenderer inline>{`$\\overrightarrow{AC'}=(${a},${b},${c})$`}</MathRenderer>
            <div className="mt-1">
              <MathRenderer
                inline
              >{`$|\\overrightarrow{AC'}|=\\sqrt{${a}^2+${b}^2+${c}^2}=\\sqrt{${a * a + b * b + c * c}}\\approx${fmt(diag)}$`}</MathRenderer>
            </div>
            <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">
              הזווית בין האלכסון לבסיס:{' '}
              <span dir="ltr">
                tan α = c / AC = {fmt(c)} / {fmt(baseDiag)}
              </span>{' '}
              ← <span dir="ltr">α ≈ {fmt(angle)}°</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
