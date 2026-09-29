import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider from './LessonSlider';

const TRACK = 300; // ק"מ לאורך המסלול

/**
 * שני כלי רכב על מסלול. משנים את המהירויות ואת הזמן — ורואים כמה כל אחד עבר:
 * דרך = מהירות × זמן.
 */
export default function MotionRace({ caption, v1: a0 = 60, v2: b0 = 90 }) {
  const [v1, setV1] = useState(a0);
  const [v2, setV2] = useState(b0);
  const [t, setT] = useState(2);
  const d1 = v1 * t;
  const d2 = v2 * t;
  const pct = (d) => `${Math.min(100, (d / TRACK) * 100)}%`;

  const lane = (emoji, d, color) => (
    <div className="relative h-10 rounded-lg bg-[var(--color-mist)]" dir="ltr">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-lg"
        style={{ backgroundColor: color, opacity: 0.25 }}
        initial={false}
        animate={{ width: pct(d) }}
      />
      <motion.span
        className="absolute top-1/2 text-2xl"
        style={{ transform: 'translateY(-50%) scaleX(-1)' }}
        initial={false}
        animate={{ left: `calc(${pct(d)} - ${d > 0 ? 28 : 0}px)` }}
      >
        {emoji}
      </motion.span>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--color-slate)]">🏁</span>
    </div>
  );

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <div className="space-y-2">
        {lane('🚗', d1, 'var(--color-teal)')}
        {lane('🏍️', d2, 'var(--color-coral)')}
      </div>
      <div className="mt-3 space-y-1">
        <LessonSlider label="🚗 מהירות" value={v1} min={10} max={120} step={10} onChange={setV1} color="var(--color-teal)" width="w-20" />
        <LessonSlider label="🏍️ מהירות" value={v2} min={10} max={120} step={10} onChange={setV2} color="var(--color-coral)" width="w-20" />
        <LessonSlider label="⏱️ שעות" value={t} min={0} max={5} step={0.5} onChange={setT} color="var(--color-violet)" width="w-20" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-center text-sm font-bold">
        <p className="rounded-xl bg-[var(--color-teal)]/10 p-2 text-[var(--color-teal-dark)]">
          🚗{' '}
          <span dir="ltr">
            {v1} × {t} = {d1}
          </span>{' '}
          ק"מ
        </p>
        <p className="rounded-xl bg-[var(--color-coral)]/10 p-2 text-[var(--color-coral-dark)]">
          🏍️{' '}
          <span dir="ltr">
            {v2} × {t} = {d2}
          </span>{' '}
          ק"מ
        </p>
      </div>
      <p className="mt-2 text-center text-xs font-semibold text-[var(--color-slate)]">מהירות בקמ"ש · דרך = מהירות × זמן · אורך המסלול {TRACK} ק"מ</p>
    </div>
  );
}
