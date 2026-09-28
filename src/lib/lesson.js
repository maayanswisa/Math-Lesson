import { readJSON, writeJSON } from './storage.js';

/**
 * Parse a typed numeric answer leniently: "7", " 7 ", "x=7", "x = -7",
 * "−7" (Unicode minus), "3,5". Returns NaN when nothing numeric is left.
 */
export function parseNumberAnswer(raw) {
  const s = String(raw ?? '')
    .replace(/\s+/g, '')
    .replace(/[−–]/g, '-')
    .replace(/^[a-zA-Z]=/, '')
    .replace(',', '.');
  if (!/^-?\d+(\.\d+)?$/.test(s)) return NaN;
  return Number(s);
}

export function isChallengeCorrect(challenge, response) {
  if (challenge.type === 'choice') return response === challenge.answer;
  const n = parseNumberAnswer(response);
  return !Number.isNaN(n) && Math.abs(n - challenge.answer) < 1e-9;
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
