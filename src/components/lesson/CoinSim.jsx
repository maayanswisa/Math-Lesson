import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const W = 300;
const H = 150;
const PAD = 26;
const MAX_POINTS = 120;

/**
 * הטלת מטבע: גרף של השכיחות היחסית של "עץ" לאורך ההטלות.
 * בהתחלה היא קופצת — ואחרי הרבה הטלות מתייצבת ליד 0.5.
 */
export default function CoinSim({ caption }) {
  const [heads, setHeads] = useState(0);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState([]); // [total, rel]
  const [last, setLast] = useState(null);

  function flip(n) {
    let h = heads;
    let t = total;
    const hist = [...history];
    const step = Math.max(1, Math.floor(n / 25));
    let side = null;
    for (let i = 0; i < n; i++) {
      side = Math.random() < 0.5;
      if (side) h += 1;
      t += 1;
      if (i % step === step - 1 || i === n - 1) hist.push([t, h / t]);
    }
    // שומרים מספר נקודות סביר לגרף
    const thin = hist.length > MAX_POINTS ? hist.filter((_, i) => i % Math.ceil(hist.length / MAX_POINTS) === 0 || i === hist.length - 1) : hist;
    setHeads(h);
    setTotal(t);
    setHistory(thin);
    setLast(side);
  }

  const rel = total ? heads / total : 0;
  // ציר x לוגריתמי — כדי לראות גם את ההתחלה הקופצנית וגם את ההתייצבות
  const maxT = Math.max(10, total);
  const gx = (t) => PAD + (Math.log10(t) / Math.log10(maxT)) * (W - PAD - 8);
  const gy = (r) => H - 18 - r * (H - 30);
  const path = history.map(([t, r], i) => `${i ? 'L' : 'M'}${gx(t).toFixed(1)},${gy(r).toFixed(1)}`).join(' ');

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="flex items-center justify-center gap-4">
        <motion.div
          key={total}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 0.4 }}
          className={`flex h-14 w-14 items-center justify-center rounded-full text-sm font-extrabold text-white shadow ${
            last === null ? 'bg-[var(--color-slate)]' : last ? 'bg-[var(--color-sunshine)]' : 'bg-[var(--color-sky-dark)]'
          }`}
        >
          {last === null ? '?' : last ? 'עץ' : 'פלי'}
        </motion.div>
        <div className="text-sm font-semibold text-[var(--color-ink)]">
          <div>
            הטלות: <b>{total}</b>
          </div>
          <div>
            עץ: <b>{heads}</b>
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto mt-2 w-full max-w-sm" style={{ direction: 'ltr' }}>
        <line x1={PAD} y1={gy(0)} x2={W - 8} y2={gy(0)} stroke="var(--color-slate)" />
        <line x1={PAD} y1={gy(0)} x2={PAD} y2={gy(1)} stroke="var(--color-slate)" />
        {[0, 0.5, 1].map((r) => (
          <text key={r} x={PAD - 4} y={gy(r) + 3} fontSize="9" textAnchor="end" fill="var(--color-slate)">
            {r}
          </text>
        ))}
        <line x1={PAD} y1={gy(0.5)} x2={W - 8} y2={gy(0.5)} stroke="var(--color-coral)" strokeWidth="2" strokeDasharray="5 4" />
        {path && <path d={path} fill="none" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinejoin="round" />}
        {total > 0 && <circle cx={gx(total)} cy={gy(rel)} r="4" fill="var(--color-violet)" />}
        <text x={W - 8} y={H - 4} fontSize="9" textAnchor="end" fill="var(--color-slate)">
          מספר הטלות →
        </text>
      </svg>
      <p className="text-center text-xs text-[var(--color-coral)]">- - - קו מקווקו = ההסתברות 0.5</p>

      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {[1, 10, 100, 1000].map((n) => (
          <motion.button
            key={n}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => flip(n)}
            className="rounded-xl bg-[var(--color-teal)] px-3 py-2 text-sm font-bold text-white shadow-sm hover:bg-[var(--color-teal-dark)]"
          >
            🪙 ×{n}
          </motion.button>
        ))}
        <button
          type="button"
          onClick={() => {
            setHeads(0);
            setTotal(0);
            setHistory([]);
            setLast(null);
          }}
          className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[var(--color-slate)] ring-1 ring-black/10"
        >
          ↺ איפוס
        </button>
      </div>

      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        {total === 0 ? (
          'הטילו את המטבע וראו מה קורה לשכיחות היחסית'
        ) : (
          <>
            שכיחות יחסית של עץ:{' '}
            <span dir="ltr">
              {heads}/{total} ≈ {rel.toFixed(3)}
            </span>
          </>
        )}
      </p>
    </div>
  );
}
