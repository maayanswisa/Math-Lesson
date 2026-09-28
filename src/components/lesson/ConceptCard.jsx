import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const TONES = {
  key: { icon: '🔑', label: 'כלל', color: 'var(--color-teal)', bg: 'rgba(13, 110, 110, 0.08)' },
  tip: { icon: '⭐', label: 'טיפ', color: 'var(--color-sunshine-dark)', bg: 'rgba(226, 160, 32, 0.1)' },
  warn: { icon: '⚠️', label: 'זהירות', color: 'var(--color-coral)', bg: 'rgba(196, 92, 72, 0.08)' },
  why: { icon: '💡', label: 'למה?', color: 'var(--color-violet)', bg: 'rgba(124, 77, 204, 0.08)' },
};

/**
 * כרטיס הסבר צבעוני. טון "why" מתחיל סגור — ה"למה" מחכה ללחיצה,
 * כך שהמסך הראשוני נשאר קצר ולא מאיים.
 */
export default function ConceptCard({ tone = 'key', title, md }) {
  const t = TONES[tone] ?? TONES.key;
  const collapsible = tone === 'why';
  const [open, setOpen] = useState(!collapsible);

  const header = (
    <span className="flex items-center gap-2 font-bold" style={{ color: t.color }}>
      <span aria-hidden="true">{t.icon}</span>
      <MathRenderer inline>{title ?? t.label}</MathRenderer>
    </span>
  );

  return (
    <div
      className="rounded-2xl p-4 ring-1 ring-black/5"
      style={{ backgroundColor: t.bg, borderInlineStart: `4px solid ${t.color}` }}
    >
      {collapsible ? (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-2 text-start"
        >
          {header}
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 180 : 0 }}
            className="text-sm"
            style={{ color: t.color }}
          >
            ▼
          </motion.span>
        </button>
      ) : (
        header
      )}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <MathRenderer className="pt-2 text-[var(--color-ink)]">{md}</MathRenderer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
