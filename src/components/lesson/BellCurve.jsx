import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import { normalCdf, normalPdf } from '../../lib/normal';

const W = 400;
const BASE = 150; // y של ציר ה-x
const PEAK_PX = 125; // גובה השיא של העקומה הצרה ביותר
const LEFT = 16;
const RIGHT = W - 16;
const SAMPLES = 120;
const SHADE_SAMPLES = 60;

const RULE_LABELS = { 1: '68%', 2: '95%', 3: '99.7%' };

const fmt = (n, d = 2) => {
  const r = Number(n.toFixed(d));
  return Object.is(r, -0) ? '0' : String(r);
};

/**
 * עקומת פעמון אינטראקטיבית. שלושה מצבים:
 * - sd:   סליידר לסטיית התקן — רואים איך העקומה מתרחבת ומשתטחת.
 * - x:    סליידר לערך — ציון התקן והשטח משמאל (Φ) מתעדכנים בזמן אמת.
 * - rule: כפתורי ±1σ / ±2σ / ±3σ — כלל 68–95–99.7.
 */
export default function BellCurve({
  mode = 'x',
  mean = 0,
  sd: sd0 = 1,
  sdRange = [sd0, sd0],
  x: x0 = mean,
  step = 1,
  varName = 'x',
  caption,
}) {
  const [sd, setSd] = useState(sd0);
  const [x, setX] = useState(x0);
  const [k, setK] = useState(1);

  const widest = mode === 'sd' ? sdRange[1] : sd0;
  const lo = mean - 3.5 * widest;
  const hi = mean + 3.5 * widest;
  const px = (v) => LEFT + ((v - lo) / (hi - lo)) * (RIGHT - LEFT);
  const narrowest = mode === 'sd' ? sdRange[0] : sd0;
  const yScale = PEAK_PX / normalPdf(mean, mean, narrowest);
  const py = (v) => BASE - normalPdf(v, mean, sd) * yScale;

  const curve = Array.from({ length: SAMPLES + 1 }, (_, i) => {
    const v = lo + ((hi - lo) * i) / SAMPLES;
    return `${i ? 'L' : 'M'}${px(v).toFixed(1)},${py(v).toFixed(1)}`;
  }).join(' ');

  function shadePath(a, b) {
    const pts = Array.from({ length: SHADE_SAMPLES + 1 }, (_, i) => {
      const v = a + ((b - a) * i) / SHADE_SAMPLES;
      return `L${px(v).toFixed(1)},${py(v).toFixed(1)}`;
    }).join(' ');
    return `M${px(a).toFixed(1)},${BASE} ${pts} L${px(b).toFixed(1)},${BASE} Z`;
  }

  let shade = null;
  if (mode === 'x') shade = shadePath(lo, x);
  if (mode === 'rule') shade = shadePath(mean - k * sd, mean + k * sd);

  const isStandard = mean === 0 && sd0 === 1 && varName === 'z';
  const z = (x - mean) / sd;
  const zRounded = Number(z.toFixed(2));
  const below = normalCdf(zRounded);

  // שנתות ב-μ+kσ; מספר גולמי למעלה וציון התקן מתחתיו. במצב sd הציר קבוע
  // (כל widest יחידות) כדי שהשנתות לא יתנגשו כשהפעמון צר.
  const ticks =
    mode === 'sd'
      ? [-3, -2, -1, 0, 1, 2, 3].map((t) => ({ t, v: mean + t * widest, raw: true }))
      : [-3, -2, -1, 0, 1, 2, 3].map((t) => ({ t, v: mean + t * sd }));

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <svg
        viewBox={`0 0 ${W} ${mode === 'sd' ? 175 : 195}`}
        className="w-full"
        style={{ direction: 'ltr' }}
        role="img"
        aria-label="עקומת התפלגות נורמלית"
      >
        {shade && (
          <motion.path
            initial={false}
            animate={{ d: shade }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            fill="rgba(13, 110, 110, 0.22)"
          />
        )}
        <motion.path
          initial={false}
          animate={{ d: curve }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          fill="none"
          stroke="var(--color-teal)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line x1={LEFT} x2={RIGHT} y1={BASE} y2={BASE} stroke="var(--color-ink)" strokeWidth="1.5" />

        {ticks.map(({ t, v, raw }) => (
          <g key={t}>
            <line
              x1={px(v)}
              x2={px(v)}
              y1={t === 0 ? py(mean) : BASE - 4}
              y2={BASE + 4}
              stroke={t === 0 ? 'var(--color-coral)' : 'var(--color-slate)'}
              strokeDasharray={t === 0 ? '4 3' : undefined}
              strokeWidth={t === 0 ? 1.5 : 1}
            />
            {!isStandard && (
              <text x={px(v)} y={BASE + 18} textAnchor="middle" fontSize="12" fill="var(--color-ink)">
                {fmt(v, 1)}
              </text>
            )}
            {!raw && (
              <text
                x={px(v)}
                y={BASE + (isStandard ? 18 : 34)}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="var(--color-violet)"
              >
                {isStandard ? fmt(t).replace('-', '−') : `z=${t}`.replace('-', '−')}
              </text>
            )}
          </g>
        ))}

        {mode === 'sd' && (
          // חץ באורך σ מהממוצע — "גודל הצעד" שמשתנה עם הסליידר
          <motion.g initial={false} animate={{ y: py(mean + sd) }} transition={{ duration: 0.35, ease: 'easeOut' }}>
            <motion.line
              initial={false}
              animate={{ x2: px(mean + sd) - 6 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              x1={px(mean)}
              y1={0}
              y2={0}
              stroke="var(--color-violet)"
              strokeWidth="2.5"
            />
            <motion.path
              initial={false}
              animate={{ d: `M${px(mean + sd)},0 l-8,-5 l0,10 Z` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              fill="var(--color-violet)"
            />
            <motion.text
              initial={false}
              animate={{ x: (px(mean) + px(mean + sd)) / 2 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              y={-7}
              textAnchor="middle"
              fontSize="14"
              fontWeight="800"
              fontStyle="italic"
              fill="var(--color-violet)"
            >
              σ
            </motion.text>
          </motion.g>
        )}

        {mode === 'x' && (
          <motion.g initial={false} animate={{ x: px(x) }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <line x1={0} x2={0} y1={BASE} y2={10} stroke="var(--color-coral)" strokeWidth="2.5" />
            <circle cx={0} cy={10} r="6" fill="var(--color-coral)" />
          </motion.g>
        )}

        {mode === 'rule' && (
          <text x={px(mean)} y={BASE - 30} textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--color-teal-dark)">
            {RULE_LABELS[k]}
          </text>
        )}
      </svg>

      {mode === 'sd' && (
        <div className="mt-2 space-y-1">
          <label className="flex items-center gap-3 text-sm font-semibold text-[var(--color-ink)]">
            <span className="whitespace-nowrap">סטיית התקן:</span>
            <input
              type="range"
              dir="ltr"
              min={sdRange[0]}
              max={sdRange[1]}
              step={step}
              value={sd}
              onChange={(e) => setSd(Number(e.target.value))}
              className="w-full accent-[var(--color-teal)]"
            />
            <span dir="ltr" className="w-14 whitespace-nowrap text-[var(--color-teal-dark)]">
              σ = {sd}
            </span>
          </label>
          <p className="text-center text-sm text-[var(--color-slate)]">
            {sd <= sdRange[0] + (sdRange[1] - sdRange[0]) / 3
              ? 'σ קטנה: כמעט כולם קרובים לממוצע — פעמון צר וגבוה'
              : sd >= sdRange[1] - (sdRange[1] - sdRange[0]) / 3
                ? 'σ גדולה: הנתונים מפוזרים רחוק מהממוצע — פעמון רחב ונמוך'
                : 'גררו את הסליידר וראו מה קורה לפעמון'}
          </p>
        </div>
      )}

      {mode === 'x' && (
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-3 text-sm font-semibold text-[var(--color-ink)]">
            <span className="whitespace-nowrap">גררו:</span>
            <input
              type="range"
              dir="ltr"
              min={mean - 3 * sd}
              max={mean + 3 * sd}
              step={step}
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
              className="w-full accent-[var(--color-coral)]"
            />
          </label>
          <div className="flex flex-wrap justify-center gap-2 text-center">
            {!isStandard && (
              <span className="rounded-xl bg-[var(--color-violet)]/10 px-3 py-2 text-[var(--color-violet-dark)]">
                <MathRenderer inline>{`$z=\\dfrac{${fmt(x)}-${fmt(mean)}}{${fmt(sd)}}=\\mathbf{${fmt(z)}}$`}</MathRenderer>
              </span>
            )}
            <span className="rounded-xl bg-[var(--color-teal)]/10 px-3 py-2 text-[var(--color-teal-dark)]">
              <MathRenderer inline>{`$\\Phi(${fmt(zRounded)})=${below.toFixed(4)}$`}</MathRenderer>
              <span className="ms-2 text-sm font-bold">← {fmt(below * 100)}% מתחת</span>
            </span>
          </div>
        </div>
      )}

      {mode === 'rule' && (
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {[1, 2, 3].map((n) => (
            <motion.button
              key={n}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setK(n)}
              className={`rounded-xl px-4 py-2 text-sm font-bold ring-1 ${
                k === n
                  ? 'bg-[var(--color-teal)] text-white ring-[var(--color-teal)]'
                  : 'bg-white text-[var(--color-ink)] ring-black/10 hover:bg-[var(--color-mist)]'
              }`}
            >
              <span dir="ltr">±{n}σ</span>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
