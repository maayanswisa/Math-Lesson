import { hasDirectTopics } from '../data/curriculum';

/** הנתיב של רשימת הנושאים המתאימה — לכפתור "חזרה". */
export function topicsHref(grade, units, track) {
  if (units != null) return `/grade/${grade}/units/${units}`;
  if (track) return `/grade/${grade}/track/${track}`;
  return hasDirectTopics(grade) ? `/grade/${grade}/topics` : `/grade/${grade}`;
}

/** הנתיב של דף הנוסחאות לכיתה / מסלול. */
export function formulasHref(grade, units, track) {
  if (units != null) return `/formulas/${grade}/units/${units}`;
  if (track) return `/formulas/${grade}/track/${track}`;
  return `/formulas/${grade}`;
}
