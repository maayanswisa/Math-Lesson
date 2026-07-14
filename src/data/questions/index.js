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

/** Topic quiz: 5 random questions from the full bank. */
export function getQuestionsForTopic(topicId) {
  return pickRandom(getAllQuestionsForTopic(topicId), TOPIC_QUIZ_SIZE);
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

  let filtered = pool.filter((q) => matchesDifficulty(q, difficultyBand));
  if (filtered.length < count) {
    filtered = pool;
  }

  return pickRandom(filtered, count);
}

export { getHintsForQuestion } from '../../lib/hints.js';
