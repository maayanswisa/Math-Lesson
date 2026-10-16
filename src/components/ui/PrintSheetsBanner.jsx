import { Link } from 'react-router-dom';
import { getPrintSheets, printSheetsHref } from '../../data/printSheets';

/** כרטיס קישור לדפי התרגילים להדפסה של הכיתה (או של רמת היחידות); לא מוצג אם אין דפים. */
export default function PrintSheetsBanner({ grade, units = null }) {
  const count = getPrintSheets(grade, units).length;
  if (count === 0) return null;
  return (
    <Link
      to={printSheetsHref(grade, units)}
      className="group flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl bg-white p-5 shadow-sm ring-2 ring-[var(--color-violet)]/25 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-[var(--color-violet)]/50"
    >
      <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-violet)]/12 text-2xl">
        🖨️
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-bold text-[var(--color-ink)]">דפי תרגילים להדפסה</span>
        <span className="block text-sm text-[var(--color-slate)]">
          {count} דפים לפי תכנית הלימודים · 2 עמודי תרגול ברמות ★–★★★ ועמוד תשובות · חוברת לתלמיד וחוברת תשובות
        </span>
      </span>
      <span className="hidden text-sm font-bold text-[var(--color-violet-dark)] transition group-hover:-translate-x-1 sm:inline">לדפי התרגילים ←</span>
    </Link>
  );
}
