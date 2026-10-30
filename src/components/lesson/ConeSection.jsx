import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider from './LessonSlider';
import { K, approx, coneHiddenArc, coneSide, cylinderSide, fmt, halfEllipse, piTex, rightMark } from './solidShapes';

const W = 340;
const H = 242;
const BASE = 192;
const TEAL = 'var(--color-teal)';
const SKY = 'var(--color-sky)';
const CORAL = 'var(--color-coral)';
const VIOLET = 'var(--color-violet)';
const INK = 'var(--color-ink)';
const WATER = '#5aa9e6';

const MODES = [
  { id: 'section', label: 'חתך צירי' },
  { id: 'third', label: 'שליש מגליל' },
];

/**
 * חרוט עם סליידרים לרדיוס ולגובה, בשני מצבים:
 * "חתך צירי" — המשולש שווה-השוקיים שבתוך החרוט, ולצידו אותו משולש פרוש עם המידות;
 * "שליש מגליל" — שופכים חרוטים מלאים לגליל עם אותו בסיס וגובה: שלושה ממלאים אותו.
 */
export default function ConeSection({ caption, r: r0 = 3, h: h0 = 6, mode: m0 = 'section', poured: p0 = 0 }) {
  const [r, setR] = useState(r0);
  const [h, setH] = useState(h0);
  const [mode, setMode] = useState(m0);
  const [poured, setPoured] = useState(p0);

  const s = Math.min(130 / (2 * r), 165 / (h + 2 * K * r));
  const a = r * s;
  const b = a * K;
  const hs = h * s;
  const cx = 255; // החרוט מימין — הדף נקרא מימין לשמאל
  const apexY = BASE - hs;
  const slant = Math.sqrt(r * r + h * h);

  const change = (set) => (v) => {
    set(v);
    setPoured(0);
  };

  // המשולש הפרוש (חתך צירי) — באותו קנה מידה
  const tx = 88;

  // הגליל להשוואה
  const gx = 88;
  const level = (poured / 3) * hs;

  const cone = (
    <g>
      <path d={coneHiddenArc(cx, BASE, a, b, hs)} fill="none" stroke={INK} strokeWidth="1.3" strokeDasharray="4 3" />
      <path
        d={coneSide(cx, BASE, a, b, hs)}
        fill={mode === 'third' ? WATER : TEAL}
        fillOpacity={mode === 'third' ? 0.45 : 0.1}
        stroke={TEAL}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d={halfEllipse(cx, BASE, a, b, 'front')} fill="none" stroke={TEAL} strokeWidth="2.2" />
      {mode === 'section' && (
        <g>
          <polygon points={`${cx},${apexY} ${cx - a},${BASE} ${cx + a},${BASE}`} fill={CORAL} fillOpacity="0.32" stroke={CORAL} strokeWidth="2" strokeLinejoin="round" />
          <line x1={cx} y1={apexY} x2={cx} y2={BASE} stroke={VIOLET} strokeWidth="2" strokeDasharray="5 4" />
          <path d={rightMark(cx, BASE)} fill="none" stroke={VIOLET} strokeWidth="1.4" />
        </g>
      )}
      <circle cx={cx} cy={apexY} r="2.6" fill={INK} />
      <circle cx={cx} cy={BASE} r="2" fill={INK} />
      <text x={cx} y={apexY - 7} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK}>
        קודקוד
      </text>
    </g>
  );

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="mb-2 flex justify-center gap-2">
        {MODES.map((md) => (
          <button
            key={md.id}
            type="button"
            onClick={() => setMode(md.id)}
            aria-pressed={mode === md.id}
            className={`rounded-xl px-3 py-1.5 text-sm font-bold ${mode === md.id ? 'bg-[var(--color-teal)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
          >
            {md.label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md" style={{ direction: 'ltr' }} role="img" aria-label={mode === 'section' ? 'חרוט וחתך צירי' : 'חרוט וגליל עם אותו בסיס וגובה'}>
        {cone}

        {mode === 'section' ? (
          <g>
            <polygon points={`${tx},${apexY} ${tx - a},${BASE} ${tx + a},${BASE}`} fill={CORAL} fillOpacity="0.22" stroke={CORAL} strokeWidth="2.2" strokeLinejoin="round" />
            <line x1={tx} y1={apexY} x2={tx} y2={BASE} stroke={VIOLET} strokeWidth="2" strokeDasharray="5 4" />
            <path d={rightMark(tx, BASE)} fill="none" stroke={VIOLET} strokeWidth="1.4" />
            <text x={tx + 5} y={(apexY + BASE) / 2 + 4} fontSize="12" fontWeight="700" fill={VIOLET}>
              {`h = ${h}`}
            </text>
            <text x={tx} y={BASE + 16} textAnchor="middle" fontSize="12" fontWeight="700" fill={CORAL}>
              {`2r = ${2 * r}`}
            </text>
            <text x={tx - a / 2 - 6} y={(apexY + BASE) / 2 - 10} fontSize="11" fontWeight="700" fill={INK} textAnchor="end">
              {`ℓ≈${fmt(Math.round(slant * 100) / 100)}`}
            </text>
            <text x={(cx + tx) / 2} y={BASE - hs / 2} textAnchor="middle" fontSize="18" fill="var(--color-slate)">
              ←
            </text>
          </g>
        ) : (
          <g>
            <path d={halfEllipse(gx, BASE, a, b, 'back')} fill="none" stroke={INK} strokeWidth="1.3" strokeDasharray="4 3" />
            <motion.rect
              x={gx - a}
              width={2 * a}
              initial={false}
              animate={{ y: BASE - level, height: level }}
              transition={{ duration: 0.7 }}
              fill={WATER}
              fillOpacity="0.45"
            />
            {poured > 0 && <path d={halfEllipse(gx, BASE, a, b, 'front')} fill={WATER} fillOpacity="0.45" stroke="none" />}
            {poured > 0 && (
              <motion.ellipse
                cx={gx}
                rx={a}
                ry={b}
                initial={false}
                animate={{ cy: BASE - level }}
                transition={{ duration: 0.7 }}
                fill={WATER}
                fillOpacity="0.55"
                stroke={SKY}
                strokeWidth="1.2"
              />
            )}
            <path d={cylinderSide(gx, BASE, a, b, hs)} fill="none" stroke={INK} strokeWidth="2" />
            <path d={halfEllipse(gx, BASE - hs, a, b, 'back')} fill="none" stroke={INK} strokeWidth="2" />
            {[1, 2].map((k) => (
              <path key={k} d={halfEllipse(gx, BASE - (k * hs) / 3, a, b, 'front')} fill="none" stroke={INK} strokeWidth="0.8" strokeDasharray="2 3" />
            ))}
            <text x={gx} y={BASE + b + 16} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK}>
              {`חרוטים בגליל: ${poured} מתוך 3`}
            </text>
          </g>
        )}
      </svg>

      {mode === 'third' && (
        <div className="mt-1 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setPoured((p) => Math.min(3, p + 1))}
            disabled={poured >= 3}
            className="rounded-xl bg-[var(--color-sky)] px-4 py-1.5 text-sm font-bold text-white disabled:opacity-50"
          >
            שפכו חרוט מלא לגליל
          </button>
          <button type="button" onClick={() => setPoured(0)} className="rounded-xl bg-white px-3 py-1.5 text-sm font-bold text-[var(--color-slate)] ring-1 ring-black/10">
            רוקנו
          </button>
        </div>
      )}

      <div className="mt-3 space-y-1">
        <LessonSlider label="רדיוס r" value={r} min={1} max={6} onChange={change(setR)} color={CORAL} width="w-14" />
        <LessonSlider label="גובה h" value={h} min={2} max={12} onChange={change(setH)} color={VIOLET} width="w-14" />
      </div>

      <div className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
        {mode === 'section' ? (
          <>
            <div className="rounded-xl p-2" style={{ backgroundColor: 'var(--color-mist)' }}>
              <span className="font-bold">שטח החתך הצירי: </span>
              <MathRenderer inline>{`$\\frac{2r\\cdot h}{2}=r\\cdot h=${r * h}$`}</MathRenderer>
            </div>
            <div className="rounded-xl p-2" style={{ backgroundColor: 'var(--color-mist)' }}>
              <span className="font-bold">נפח החרוט: </span>
              <MathRenderer inline>{`$\\frac{\\pi r^2\\cdot h}{3}=${piTex(r * r * h, 3)}\\approx${approx((r * r * h) / 3)}$`}</MathRenderer>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-xl p-2" style={{ backgroundColor: 'var(--color-mist)' }}>
              <span className="font-bold">נפח הגליל: </span>
              <MathRenderer inline>{`$\\pi r^2\\cdot h=${piTex(r * r * h)}$`}</MathRenderer>
            </div>
            <div className="rounded-xl p-2" style={{ backgroundColor: 'var(--color-mist)' }}>
              <span className="font-bold">נפח החרוט: </span>
              <MathRenderer inline>{`$\\frac{\\pi r^2\\cdot h}{3}=${piTex(r * r * h, 3)}$`}</MathRenderer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
