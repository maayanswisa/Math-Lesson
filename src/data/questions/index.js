import { getInteractiveQuestionsForTopic as getIx } from './interactiveQuestions.js';
import { getTopicById, isElementary, isMiddleSchool } from '../curriculum/index.js';

/** How many questions appear in a normal topic quiz. */
export const TOPIC_QUIZ_SIZE = 5;

/** Effectively "all of them" — passed as the pick count so speed-run mode gets the whole topic bank instead of just TOPIC_QUIZ_SIZE. */
export const SPEED_RUN_POOL_SIZE = 500;

/**
 * Total questions across every bank, as of the last time this was updated.
 * Kept as a static number (rather than summing the live arrays) so the home
 * page's stats display doesn't force-load every question bank — those are
 * code-split per grade level below. After adding questions, update this by
 * summing the array lengths in elementaryQuestions.js, middleSchoolQuestions.js,
 * highSchoolQuestions.js, and interactiveQuestions.js.
 */
export const TOTAL_QUESTION_COUNT = 4723;

/**
 * Full bank for a topic (interactive + MCQ). The three big per-stage banks
 * are dynamically imported so a visitor only downloads the question data for
 * the grade level they're actually using.
 */
export async function getAllQuestionsForTopic(topicId) {
  const interactive = getIx(topicId);
  const topic = getTopicById(topicId);
  if (!topic) return interactive;

  if (isElementary(topic.grade)) {
    const { getElementaryQuestionsForTopic } = await import('./elementaryQuestions.js');
    return [...interactive, ...getElementaryQuestionsForTopic(topicId)];
  }
  if (isMiddleSchool(topic.grade)) {
    const { getMiddleSchoolQuestionsForTopic } = await import('./middleSchoolQuestions.js');
    return [...interactive, ...getMiddleSchoolQuestionsForTopic(topicId)];
  }
  const { getQuestionsForTopic: getHighSchoolQuestionsForTopic } = await import('./highSchoolQuestions.js');
  return [...interactive, ...getHighSchoolQuestionsForTopic(topicId)];
}

function pickRandom(list, n) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(n, arr.length));
}

/** A question's difficulty, defaulting to 2 (medium) only when it's actually missing. */
function difficultyOf(q) {
  const d = Number(q.difficulty);
  return Number.isFinite(d) ? d : 2;
}

/**
 * @param {'easy'|'medium'|'hard'} band
 */
function matchesDifficulty(q, band) {
  const d = difficultyOf(q);
  if (band === 'easy') return d <= 1;
  if (band === 'hard') return d >= 4;
  return d >= 2 && d <= 3;
}

/** How far a question's difficulty sits from the requested band — lower is closer. */
function bandDistance(q, band) {
  const d = difficultyOf(q);
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
 * Topic quiz: `count` questions from the full bank, optionally weighted
 * toward a difficulty band. Defaults to the normal 5-question topic quiz;
 * pass SPEED_RUN_POOL_SIZE to get the whole bank for speed-run mode.
 * @param {string} topicId
 * @param {'easy'|'medium'|'hard'|null} [difficultyBand]
 * @param {number} [count]
 */
export async function getQuestionsForTopic(topicId, difficultyBand = null, count = TOPIC_QUIZ_SIZE) {
  const pool = await getAllQuestionsForTopic(topicId);
  return pickForBand(pool, difficultyBand, count);
}

/**
 * Build a shuffled custom quiz from multiple topics.
 * @param {{ topicIds: string[], count: number, difficultyBand: 'easy'|'medium'|'hard' }} opts
 */
export async function buildCustomQuiz({ topicIds = [], count = 10, difficultyBand = 'medium' }) {
  const perTopic = await Promise.all(topicIds.map((tid) => getAllQuestionsForTopic(tid)));
  const pool = [];
  const seen = new Set();
  for (const qs of perTopic) {
    for (const q of qs) {
      if (seen.has(q.id)) continue;
      seen.add(q.id);
      pool.push(q);
    }
  }

  return pickForBand(pool, difficultyBand, count);
}

export { getHintsForQuestion } from '../../lib/hints.js';
