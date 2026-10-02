import { readJSON, writeJSON } from './storage.js';

const KEY = 'math-lesson-seen-questions-v1';

/**
 * מתי כל שאלה נענתה לאחרונה — כמונה עולה, לא כזמן: { n, at: { [questionId]: n } }.
 * בבחירת שאלות למבחן מעדיפים שאלות שלא נענו כלל, ואחריהן את אלה שנענו הכי מזמן —
 * כך מבחנים קצרים חוזרים לא מציגים את אותן שאלות שוב ושוב.
 */
export function readSeen() {
  const v = readJSON(KEY, null);
  return v && typeof v === 'object' && v.at && typeof v.at === 'object' ? v : { n: 0, at: {} };
}

/** מפת questionId → מתי נענתה (0 = מעולם לא). */
export function seenMap() {
  return readSeen().at;
}

export function markSeen(questionId) {
  if (!questionId) return;
  const s = readSeen();
  s.n += 1;
  s.at[questionId] = s.n;
  writeJSON(KEY, s);
}
