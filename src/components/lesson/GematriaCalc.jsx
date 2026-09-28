import { useState } from 'react';
import { motion } from 'framer-motion';

export const GEMATRIA = {
  א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9, י: 10,
  כ: 20, ך: 20, ל: 30, מ: 40, ם: 40, נ: 50, ן: 50, ס: 60, ע: 70, פ: 80, ף: 80, צ: 90, ץ: 90,
  ק: 100, ר: 200, ש: 300, ת: 400,
};

/** כותבים מילה — וכל אות מקבלת את הערך שלה, והסכום מחושב. */
export default function GematriaCalc({ caption, word: w0 = 'טוב' }) {
  const [word, setWord] = useState(w0);
  const letters = [...word].filter((ch) => GEMATRIA[ch]);
  const total = letters.reduce((s, ch) => s + GEMATRIA[ch], 0);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <p className="mb-3 text-[var(--color-ink)]">{caption}</p>}

      <input
        type="text"
        value={word}
        maxLength={12}
        onChange={(e) => setWord(e.target.value)}
        aria-label="מילה"
        className="mx-auto block w-48 rounded-xl bg-[var(--color-mist)] py-2 text-center text-2xl font-bold outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
      />

      <div className="mt-4 flex flex-wrap items-end justify-center gap-2">
        {letters.map((ch, i) => (
          <motion.div
            key={`${i}-${ch}`}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.06 }}
            className="flex flex-col items-center rounded-xl bg-[var(--color-teal)]/10 px-3 py-2"
          >
            <span className="text-2xl font-extrabold text-[var(--color-ink)]">{ch}</span>
            <span className="text-sm font-bold text-[var(--color-teal-dark)]">{GEMATRIA[ch]}</span>
          </motion.div>
        ))}
      </div>

      <p className="mt-3 text-center text-xl font-extrabold text-[var(--color-violet-dark)]">
        {letters.length ? (
          <>
            <span dir="ltr">{letters.map((ch) => GEMATRIA[ch]).join(' + ')}</span> = {total}
          </>
        ) : (
          'כתבו מילה בעברית'
        )}
      </p>
    </div>
  );
}
