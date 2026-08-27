import { getElementaryQuestionsForTopic as getEl } from './elementaryQuestions.js';
import { getMiddleSchoolQuestionsForTopic as getMs } from './middleSchoolQuestions.js';
import { getQuestionsForTopic as getHs } from './highSchoolQuestions.js';
import { getInteractiveQuestionsForTopic as getIx } from './interactiveQuestions.js';

/** How many questions appear in a normal topic quiz. */
export const TOPIC_QUIZ_SIZE = 5;

/** Full bank for a topic (interactive + MCQ). */
export function getAllQuestionsForTopic(topicId) {
  const interactive = getIx(topicId);
  const el = getEl(topicId);
  if (el.length) return [...interactive, ...el];
  const hs = getHs(topicId);
  if (hs.length) return [...interactive, ...hs];
  const ms = getMs(topicId);
  return [...interactive, ...ms];
}

function pickRandom(list, n) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(n, arr.length));
}

/**
 * @param {'easy'|'medium'|'hard'} band
 */
function matchesDifficulty(q, band) {
  const d = Number(q.difficulty) || 2;
  if (band === 'easy') return d <= 1;
  if (band === 'hard') return d >= 4;
  return d >= 2 && d <= 3;
}

/** How far a question's difficulty sits from the requested band — lower is closer. */
function bandDistance(q, band) {
  const d = Number(q.difficulty) || 2;
  if (band === 'easy') return d;
  if (band === 'hard') return -d;
  return Math.abs(d - 2.5);
}

/**
 * Pick `count` questions from `pool`, preferring ones matching `band`. Many
 * topics don't have enough questions at a given band (e.g. no difficulty-1
 * question at all) — instead of ignoring the band entirely in that case, fill
 * the remaining slots with the closest difficulty available, so the result
 * still skews toward what was asked for.
 * @param {'easy'|'medium'|'hard'|null} band
 */
function pickForBand(pool, band, count) {
  if (!band || band === 'all') return pickRandom(pool, count);
  const matching = pickRandom(pool.filter((q) => matchesDifficulty(q, band)), count);
  if (matching.length >= count) return matching;
  const usedIds = new Set(matching.map((q) => q.id));
  const rest = pickRandom(pool.filter((q) => !usedIds.has(q.id)), pool.length).sort(
    (a, b) => bandDistance(a, band) - bandDistance(b, band),
  );
  return [...matching, ...rest.slice(0, count - matching.length)];
}

/**
 * Topic quiz: 5 questions from the full bank, optionally weighted toward a
 * difficulty band.
 * @param {string} topicId
 * @param {'easy'|'medium'|'hard'|null} [difficultyBand]
 */
export function getQuestionsForTopic(topicId, difficultyBand = null) {
  return pickForBand(getAllQuestionsForTopic(topicId), difficultyBand, TOPIC_QUIZ_SIZE);
}

/**
 * Build a shuffled custom quiz from multiple topics.
 * @param {{ topicIds: string[], count: number, difficultyBand: 'easy'|'medium'|'hard' }} opts
 */
export function buildCustomQuiz({ topicIds = [], count = 10, difficultyBand = 'medium' }) {
  const pool = [];
  const seen = new Set();
  for (const tid of topicIds) {
    for (const q of getAllQuestionsForTopic(tid)) {
      if (seen.has(q.id)) continue;
      seen.add(q.id);
      pool.push(q);
    }
  }

  return pickForBand(pool, difficultyBand, count);
}

export { getHintsForQuestion } from '../../lib/hints.js';
