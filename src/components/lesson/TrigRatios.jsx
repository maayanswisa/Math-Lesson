import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';

const W = 300;
const H = 200;

/**
 * משולש ישר-זווית עם זווית α משתנה ויתר קבוע.
 * מראים את הניצב שמול α, הניצב שליד α, ואת sin / cos / tan.
 */
export default function TrigRatios({ caption, angle: a0 = 35, hyp: h0 = 10 }) {
  const [a, setA] = useState(a0);
  const [c, setC] = useState(h0);
  const rad = (a * Math.PI) / 180;
  const adj = c * Math.cos(rad);
  const opp = c * Math.sin(rad);
  const k = Math.min(230 / adj, 150 / Math.max(opp, 0.01), 230 / c);
  const A = { x: 30, y: H - 25 };
  const B = { x: A.x + adj * k, y: A.y };
  const C = { x: B.x, y: A.y - opp * k };
  const r = 26;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="rgba(13,110,110,0.08)" stroke="var(--color-ink)" strokeWidth="1.5" />
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="var(--color-sky-dark)" strokeWidth="4" />
        <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="var(--color-coral)" strokeWidth="4" />
        <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="var(--color-violet)" strokeWidth="4" />
        <rect x={B.x - 10} y={B.y - 10} width="10" height="10" fill="none" stroke="var(--color-ink)" />
        <path
          d={`M${A.x + r},${A.y} A${r},${r} 0 0 0 ${A.x + r * Math.cos(rad)},${A.y - r * Math.sin(rad)}`}
          fill="none"
          stroke="var(--color-teal)"
          strokeWidth="2"
        />
        <text x={A.x + r + 4} y={A.y - 6} fontSize="12" fontWeight="700" fill="var(--color-teal)">
          α
        </text>
        <text x={(A.x + B.x) / 2} y={A.y + 16} fontSize="11" fontWeight="700" textAnchor="middle" fill="var(--color-sky-dark)">
          {fmt(adj)}
        </text>
        <text x={B.x + 6} y={(B.y + C.y) / 2 + 4} fontSize="11" fontWeight="700" fill="var(--color-coral)">
          {fmt(opp)}
        </text>
        <text x={(A.x + C.x) / 2 - 8} y={(A.y + C.y) / 2 - 6} fontSize="11" fontWeight="700" textAnchor="end" fill="var(--color-violet)">
          {fmt(c)}
        </text>
      </svg>
      <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-bold">
        <span className="text-[var(--color-coral)]">━ ניצב מול α</span>
        <span className="text-[var(--color-sky-dark)]">━ ניצב ליד α</span>
        <span className="text-[var(--color-violet)]">━ יתר</span>
      </div>
      <div className="mt-2 space-y-1">
        <LessonSlider label="α" value={a} min={10} max={80} step={1} onChange={setA} color="var(--color-teal)" suffix="°" />
        <LessonSlider label="יתר" value={c} min={4} max={12} step={1} onChange={setC} color="var(--color-violet)" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm" dir="ltr">
        <div className="rounded-xl bg-[var(--color-mist)] p-2">
          <MathRenderer inline>{`$\\sin\\alpha=\\frac{${fmt(opp)}}{${fmt(c)}}=${Math.sin(rad).toFixed(3)}$`}</MathRenderer>
        </div>
        <div className="rounded-xl bg-[var(--color-mist)] p-2">
          <MathRenderer inline>{`$\\cos\\alpha=\\frac{${fmt(adj)}}{${fmt(c)}}=${Math.cos(rad).toFixed(3)}$`}</MathRenderer>
        </div>
        <div className="rounded-xl bg-[var(--color-mist)] p-2">
          <MathRenderer inline>{`$\\tan\\alpha=\\frac{${fmt(opp)}}{${fmt(adj)}}=${Math.tan(rad).toFixed(3)}$`}</MathRenderer>
        </div>
      </div>
      <p className="mt-2 text-center text-xs font-semibold text-[var(--color-slate)]">
        שנו את היתר: הצלעות משתנות — אבל היחסים נשארים! הם תלויים רק בזווית.
      </p>
    </div>
  );
}
