import { Link } from 'react-router-dom';
import { getPrintSheets, printSheetsHref, topicSeriesForGrade, topicSeriesHref } from '../../data/printSheets';

/**
 * כרטיס קישור לדפי התרגילים להדפסה של הכיתה (או של רמת היחידות).
 * בכיתה שאין לה סדרה משלה — קישור לסדרה לפי נושא שמתאימה לה (למשל חיבור בכיתות א'–ב'); לא מוצג אם אין דפים בכלל.
 */
export default function PrintSheetsBanner({ grade, units = null }) {
  const count = getPrintSheets(grade, units).length;
  const topic = count === 0 && !units ? topicSeriesForGrade(grade)[0] : null;
  if (count === 0 && !topic) return null;
  const to = topic ? topicSeriesHref(topic.key) : printSheetsHref(grade, units);
  const title = topic ? `דפי תרגילים להדפסה — ${topic.short}` : 'דפי תרגילים להדפסה';
  const text = topic
    ? `${topic.sheets.length} דפים מהבסיס ועד רמה מתקדמת · 2 עמודי תרגול ברמות ★–★★★ ועמוד תשובות · חוברת לתלמיד וחוברת תשובות`
    : `${count} דפים לפי תכנית הלימודים · 2 עמודי תרגול ברמות ★–★★★ ועמוד תשובות · חוברת לתלמיד וחוברת תשובות`;
  return (
    <Link
      to={to}
      className="group flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl bg-white p-5 shadow-sm ring-2 ring-[var(--color-violet)]/25 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-[var(--color-violet)]/50"
    >
      <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-violet)]/12 text-2xl">
        {topic ? topic.emoji : '🖨️'}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-bold text-[var(--color-ink)]">{title}</span>
        <span className="block text-sm text-[var(--color-slate)]">{text}</span>
      </span>
      <span className="hidden text-sm font-bold text-[var(--color-violet-dark)] transition group-hover:-translate-x-1 sm:inline">לדפי התרגילים ←</span>
    </Link>
  );
}
