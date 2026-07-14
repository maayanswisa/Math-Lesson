const MATH_4_YOU_URL = 'https://math-4-you.com/';

/** Promo popup shown after a quiz with more than one mistake. */
export default function StudyMorePopup({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      dir="rtl"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg ring-1 ring-black/5">
        <p className="text-lg font-semibold text-[var(--color-ink)]">
          כדי לקבל 100 בכל מבחן, מוזמנים ללמוד באתר הלמידה שלי!
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={MATH_4_YOU_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-teal-dark)]"
          >
            בואו נלמד יחד
          </a>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-[var(--color-slate)] hover:text-[var(--color-ink)]"
          >
            אולי בפעם אחרת
          </button>
        </div>
      </div>
    </div>
  );
}
