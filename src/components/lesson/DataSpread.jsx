import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';

const W = 300;

function Sigma({ values }) {
  const [k, setK] = useState(1);
  const [extra, setExtra] = useState(false);
  const mean0 = values.reduce((a, b) => a + b, 0) / values.length;
  const pts = values.map((v) => mean0 + k * (v - mean0));
  if (extra) pts.push(mean0);
  const n = pts.length;
  const mean = pts.reduce((a, b) => a + b, 0) / n;
  const sd = Math.sqrt(pts.reduce((a, b) => a + (b - mean) ** 2, 0) / n);
  const lo = Math.min(...values, mean0 - 2 * Math.abs(mean0 - Math.min(...values))) - 2;
  const hi = Math.max(...values, mean0 + 2 * Math.abs(Math.max(...values) - mean0)) + 2;
  const sx = (v) => 16 + ((v - lo) / (hi - lo)) * (W - 32);
  const stack = {};
  const dots = pts.map((v, i) => {
    const key = Math.round(v * 2) / 2;
    stack[key] = (stack[key] ?? 0) + 1;
    return { v, i, row: stack[key] - 1, isExtra: extra && i === n - 1 };
  });

  return (
    <>
      <svg viewBox={`0 0 ${W} 130`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        <rect x={sx(mean - sd)} y="10" width={Math.max(sx(mean + sd) - sx(mean - sd), 0)} height="90" fill="rgba(124,77,204,0.12)" />
        <line x1={sx(mean)} y1="6" x2={sx(mean)} y2="104" stroke="var(--color-coral)" strokeWidth="2" strokeDasharray="5 4" />
        <line x1="10" y1="100" x2={W - 10} y2="100" stroke="var(--color-ink)" strokeWidth="1.5" />
        {dots.map((d) => (
          <circle key={d.i} cx={sx(d.v)} cy={92 - d.row * 13} r="6" fill={d.isExtra ? 'var(--color-sunshine-dark)' : 'var(--color-teal)'} />
        ))}
        <text x={sx(mean)} y="120" fontSize="11" fontWeight="700" textAnchor="middle" fill="var(--color-coral)">
          x̄ = {fmt(mean)}
        </text>
      </svg>
      <LessonSlider
        label="פיזור"
        value={k}
        min={0}
        max={2}
        step={0.25}
        onChange={setK}
        color="var(--color-violet)"
        width="w-12"
        display={`×${fmt(k)}`}
      />
      <div className="mt-2 flex justify-center">
        <button
          onClick={() => setExtra((e) => !e)}
          className="rounded-full bg-[var(--color-mist)] px-3 py-1 text-sm font-bold text-[var(--color-ink)]"
        >
          {extra ? 'הסירו את הנתון שנוסף' : '➕ הוסיפו נתון השווה לממוצע'}
        </button>
      </div>
      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        <MathRenderer inline>{`$\\sigma=${fmt(sd)}$`}</MathRenderer>
        <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">
          {k === 0 ? (
            <>
              כל הערכים שווים — אין פיזור, <span dir="ltr">σ = 0</span>
            </>
          ) : (
            'הרצועה הסגולה: ממוצע ± סטיית תקן'
          )}
        </div>
      </div>
    </>
  );
}

function Quartile({ values, kind }) {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const parts = kind === 'decile' ? 10 : 4;
  const [k, setK] = useState(kind === 'decile' ? 9 : 1);
  const pos = (k * n) / parts;
  const whole = Math.abs(pos - Math.round(pos)) < 1e-9;
  const picks = whole ? [Math.round(pos), Math.round(pos) + 1] : [Math.ceil(pos)];
  const val = whole ? (sorted[picks[0] - 1] + sorted[picks[1] - 1]) / 2 : sorted[picks[0] - 1];
  const name = kind === 'decile' ? `D_{${k}}` : `Q_{${k}}`;

  return (
    <>
      <div className="flex flex-wrap justify-center gap-1" dir="ltr">
        {sorted.map((v, i) => (
          <div
            key={i}
            className={`flex w-9 flex-col items-center rounded-lg py-1 text-sm font-bold ${picks.includes(i + 1) ? 'bg-[var(--color-teal)] text-white' : 'bg-[var(--color-mist)] text-[var(--color-ink)]'}`}
          >
            <span className="text-[10px] opacity-70">{i + 1}</span>
            {v}
          </div>
        ))}
      </div>
      <div className="mt-3">
        <LessonSlider label="k" value={k} min={1} max={parts - 1} step={1} onChange={setK} color="var(--color-violet)" />
      </div>
      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        <MathRenderer inline>{`מיקום: $\\frac{${k}\\cdot${n}}{${parts}}=${fmt(pos)}$`}</MathRenderer>
        <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">
          {whole ? 'מיקום שלם ← ממוצע האיבר במקום הזה והאיבר שאחריו' : 'מיקום לא שלם ← מעגלים למעלה ולוקחים את האיבר'}
        </div>
        <div className="mt-1">
          <MathRenderer inline>{`$${name}=${fmt(val)}$`}</MathRenderer>
        </div>
      </div>
    </>
  );
}

/**
 * פיזור נתונים: mode='sigma' — סטיית תקן על דיאגרמת נקודות, עם מתיחה והוספת נתון;
 * mode='quartile' — מיקום רבעון/עשירון (kind='decile') ברשימה ממוינת.
 */
export default function DataSpread({ caption, mode = 'sigma', values = [4, 6, 7, 8, 10], kind = 'quartile' }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      {mode === 'sigma' ? <Sigma values={values} /> : <Quartile values={values} kind={kind} />}
    </div>
  );
}
