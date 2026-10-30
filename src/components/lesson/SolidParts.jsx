import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import { K, coneHiddenArc, coneSide, cylinderSide, halfEllipse, rightMark } from './solidShapes';

const PARTS = [
  {
    id: 'base',
    label: 'בסיס',
    color: 'var(--color-sky)',
    cyl: 'שני בסיסים — עיגולים שווים ומקבילים זה לזה.',
    cone: 'בסיס אחד — עיגול.',
  },
  {
    id: 'lateral',
    label: 'מעטפת',
    color: 'var(--color-teal)',
    cyl: 'המשטח המעוגל שמקיף את הגליל בין שני הבסיסים. כשפורסים אותו — מלבן.',
    cone: 'המשטח המעוגל שעולה מהבסיס עד הקודקוד.',
  },
  {
    id: 'height',
    label: 'גובה',
    color: 'var(--color-violet)',
    cyl: 'המרחק בין שני הבסיסים — קטע שמאונך לשניהם.',
    cone: 'הקטע מהקודקוד אל מרכז הבסיס — מאונך לבסיס.',
  },
  {
    id: 'radius',
    label: 'רדיוס',
    color: 'var(--color-sunshine-dark)',
    cyl: 'הרדיוס של עיגול הבסיס.',
    cone: 'הרדיוס של עיגול הבסיס.',
  },
  {
    id: 'apex',
    label: 'קודקוד',
    color: 'var(--color-coral)',
    cyl: 'לגליל אין קודקוד.',
    cone: 'הנקודה החדה שבראש החרוט.',
  },
  {
    id: 'slant',
    label: 'קו יוצר',
    color: 'var(--color-berry)',
    cyl: 'קטע ישר על המעטפת בין שני הבסיסים. אורכו שווה לגובה.',
    cone: 'קטע ישר על המעטפת, מהקודקוד אל שפת הבסיס. הוא ארוך מהגובה.',
  },
];

const INK = 'var(--color-ink)';
const FAINT = 'rgba(26,43,60,0.05)';

/**
 * גליל וחרוט זה לצד זה. בוחרים מושג (בסיס, מעטפת, גובה...) והוא נצבע בשני הגופים,
 * עם הסבר קצר לכל גוף.
 */
export default function SolidParts({ caption, start = 'base' }) {
  const [sel, setSel] = useState(start);
  const P = PARTS.find((p) => p.id === sel);
  const on = (id) => sel === id;
  const col = (id, fallback = INK) => (on(id) ? P.color : fallback);
  const w = (id, base = 2) => (on(id) ? base + 1.6 : base);

  // גליל — מימין, כמו ההסבר שלו מתחת (הדף נקרא מימין לשמאל)
  const c = { x: 262, bottom: 172, r: 52, h: 112 };
  const cry = c.r * K;
  const cTop = c.bottom - c.h;
  const slantX = c.x + c.r * 0.45;
  const slantDy = cry * Math.sqrt(1 - 0.45 ** 2);

  // חרוט
  const k = { x: 88, base: 172, r: 58, h: 132 };
  const kry = k.r * K;
  const apexY = k.base - k.h;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="mb-3 flex flex-wrap justify-center gap-2">
        {PARTS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSel(p.id)}
            aria-pressed={on(p.id)}
            className="rounded-xl px-3 py-1.5 text-sm font-bold ring-1 ring-black/10 transition-colors"
            style={on(p.id) ? { backgroundColor: p.color, color: '#fff' } : { color: p.color, backgroundColor: '#fff' }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 350 212" className="mx-auto w-full max-w-md" style={{ direction: 'ltr' }} role="img" aria-label={`גליל וחרוט — ${P.label}`}>
        {/* ---------- גליל ---------- */}
        <path d={halfEllipse(c.x, c.bottom, c.r, cry, 'back')} fill="none" stroke={col('base')} strokeWidth={w('base', 1.4)} strokeDasharray="4 3" />
        <path d={cylinderSide(c.x, c.bottom, c.r, cry, c.h)} fill={on('lateral') ? P.color : FAINT} fillOpacity={on('lateral') ? 0.28 : 1} stroke="none" />
        <line x1={c.x - c.r} y1={cTop} x2={c.x - c.r} y2={c.bottom} stroke={col('lateral')} strokeWidth={w('lateral')} />
        <line x1={c.x + c.r} y1={cTop} x2={c.x + c.r} y2={c.bottom} stroke={col('lateral')} strokeWidth={w('lateral')} />
        <path d={halfEllipse(c.x, c.bottom, c.r, cry, 'front')} fill="none" stroke={col('base')} strokeWidth={w('base')} />
        <ellipse cx={c.x} cy={cTop} rx={c.r} ry={cry} fill={on('base') ? P.color : '#fff'} fillOpacity={on('base') ? 0.3 : 1} stroke={col('base')} strokeWidth={w('base')} />
        {on('base') && <ellipse cx={c.x} cy={c.bottom} rx={c.r} ry={cry} fill={P.color} fillOpacity="0.15" stroke="none" />}

        {on('height') && (
          <g stroke={P.color} strokeWidth="2.6" fill="none">
            <line x1={c.x} y1={cTop} x2={c.x} y2={c.bottom} strokeDasharray="5 4" />
            <path d={rightMark(c.x, c.bottom)} strokeWidth="1.5" />
          </g>
        )}
        {on('radius') && <line x1={c.x} y1={cTop} x2={c.x + c.r} y2={cTop} stroke={P.color} strokeWidth="3" />}
        {on('slant') && <line x1={slantX} y1={cTop + slantDy} x2={slantX} y2={c.bottom + slantDy} stroke={P.color} strokeWidth="3.2" />}
        <circle cx={c.x} cy={cTop} r="2.2" fill={INK} />
        {on('radius') && <circle cx={c.x} cy={c.bottom} r="2.2" fill={INK} />}

        {/* ---------- חרוט ---------- */}
        <path d={coneHiddenArc(k.x, k.base, k.r, kry, k.h)} fill="none" stroke={col('base')} strokeWidth={w('base', 1.4)} strokeDasharray="4 3" />
        {on('base') && <ellipse cx={k.x} cy={k.base} rx={k.r} ry={kry} fill={P.color} fillOpacity="0.3" stroke="none" />}
        <path
          d={coneSide(k.x, k.base, k.r, kry, k.h)}
          fill={on('lateral') ? P.color : FAINT}
          fillOpacity={on('lateral') ? 0.28 : 1}
          stroke={col('lateral')}
          strokeWidth={w('lateral')}
          strokeLinejoin="round"
        />
        <path d={halfEllipse(k.x, k.base, k.r, kry, 'front')} fill="none" stroke={col('base')} strokeWidth={w('base')} />

        {on('height') && (
          <g stroke={P.color} strokeWidth="2.6" fill="none">
            <line x1={k.x} y1={apexY} x2={k.x} y2={k.base} strokeDasharray="5 4" />
            <path d={rightMark(k.x, k.base)} strokeWidth="1.5" />
          </g>
        )}
        {on('radius') && <line x1={k.x} y1={k.base} x2={k.x + k.r} y2={k.base} stroke={P.color} strokeWidth="3" />}
        {on('slant') && <line x1={k.x} y1={apexY} x2={k.x + k.r * 0.6} y2={k.base + kry * 0.8} stroke={P.color} strokeWidth="3.2" />}
        <circle cx={k.x} cy={k.base} r="2.2" fill={INK} />
        <circle cx={k.x} cy={apexY} r={on('apex') ? 5.5 : 2.4} fill={col('apex')} />
        {on('apex') && (
          <circle cx={k.x} cy={apexY} r="10" fill="none" stroke={P.color} strokeWidth="1.6" strokeDasharray="3 2.5" />
        )}

        <text x={c.x} y="208" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>
          גליל
        </text>
        <text x={k.x} y="208" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>
          חרוט
        </text>
      </svg>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {[
          ['בגליל', P.cyl],
          ['בחרוט', P.cone],
        ].map(([where, text]) => (
          <div key={where} className="rounded-xl p-2.5 text-sm" style={{ backgroundColor: 'var(--color-mist)' }}>
            <span className="font-bold" style={{ color: P.color }}>
              {P.label} {where}:
            </span>{' '}
            <span className="text-[var(--color-ink)]">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
