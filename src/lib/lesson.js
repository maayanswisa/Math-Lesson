import { readJSON, writeJSON } from './storage.js';

/**
 * Parse a typed numeric answer leniently: "7", " 7 ", "x=7", "x = -7",
 * "−7" (Unicode minus), "3,5" (decimal comma), "1,000,000" (thousands
 * separators). Returns NaN when nothing numeric is left.
 */
export function parseNumberAnswer(raw) {
  let s = String(raw ?? '')
    .replace(/\s+/g, '')
    .replace(/[−–]/g, '-')
    .replace(/^[a-zA-Z]=/, '')
    .replace(/%$/, '');
  // "1,000" / "2,437,158" are thousands separators; any other comma is a decimal comma
  s = /^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(s) ? s.replace(/,/g, '') : s.replace(',', '.');
  if (!/^-?\d+(\.\d+)?$/.test(s)) return NaN;
  return Number(s);
}

export function isChallengeCorrect(challenge, response) {
  if (challenge.type === 'choice') return response === challenge.answer;
  const n = parseNumberAnswer(response);
  return !Number.isNaN(n) && Math.abs(n - challenge.answer) <= (challenge.tolerance ?? 1e-9);
}

const keyFor = (lessonId) => `math-lesson-guide-${lessonId}`;

/** @returns {{ solved: Record<string, { firstTry: boolean }>, completed: boolean }} */
export function readLessonProgress(lessonId) {
  const p = readJSON(keyFor(lessonId), null);
  if (!p || typeof p.solved !== 'object' || p.solved === null) return { solved: {}, completed: false };
  return { solved: p.solved, completed: Boolean(p.completed) };
}

export function writeLessonProgress(lessonId, progress) {
  writeJSON(keyFor(lessonId), progress);
}
