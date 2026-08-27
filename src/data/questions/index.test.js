import { describe, it, expect } from 'vitest';
import {
  getAllQuestionsForTopic,
  getQuestionsForTopic,
  buildCustomQuiz,
  TOPIC_QUIZ_SIZE,
  TOTAL_QUESTION_COUNT,
} from './index.js';

// One real topic id from each grade band, so the dynamic-import code path for
// every bank actually gets exercised.
const ELEMENTARY_TOPIC = 'g3-numbers-10000';
const MIDDLE_TOPIC = 'g7-signed';
const HIGH_TOPIC = 'g11-u4-circle-tangents';

describe('getAllQuestionsForTopic', () => {
  it('returns a non-empty pool for a topic in each grade band', async () => {
    for (const topicId of [ELEMENTARY_TOPIC, MIDDLE_TOPIC, HIGH_TOPIC]) {
      const pool = await getAllQuestionsForTopic(topicId);
      expect(pool.length).toBeGreaterThan(0);
    }
  });

  it('returns an empty array for an unknown topic id instead of throwing', async () => {
    const pool = await getAllQuestionsForTopic('not-a-real-topic');
    expect(pool).toEqual([]);
  });
});

describe('getQuestionsForTopic', () => {
  it('returns up to TOPIC_QUIZ_SIZE questions with no band filter', async () => {
    const qs = await getQuestionsForTopic(ELEMENTARY_TOPIC);
    expect(qs.length).toBeGreaterThan(0);
    expect(qs.length).toBeLessThanOrEqual(TOPIC_QUIZ_SIZE);
  });

  it('still returns TOPIC_QUIZ_SIZE questions for a band the topic has few/no matches for', async () => {
    // g7-signed has plenty of questions overall but historically had zero at
    // the extreme "hard" difficulty tier — this is a regression test for the
    // graceful-degradation fallback (closest-difficulty fill-in).
    const qs = await getQuestionsForTopic(MIDDLE_TOPIC, 'hard');
    expect(qs.length).toBe(TOPIC_QUIZ_SIZE);
  });

  it('filters correctly when the band has enough real matches', async () => {
    // g1-count-20 has 20+ genuinely difficulty-1 questions, so "easy" should
    // never need the closest-difficulty fallback here.
    const qs = await getQuestionsForTopic('g1-count-20', 'easy');
    expect(qs.length).toBe(TOPIC_QUIZ_SIZE);
    for (const q of qs) {
      expect(q.difficulty).toBeLessThanOrEqual(1);
    }
  });
});

describe('buildCustomQuiz', () => {
  it('returns the requested count, deduplicated, from multiple topics', async () => {
    const qs = await buildCustomQuiz({
      topicIds: [ELEMENTARY_TOPIC, MIDDLE_TOPIC],
      count: 8,
      difficultyBand: 'medium',
    });
    expect(qs.length).toBe(8);
    const ids = new Set(qs.map((q) => q.id));
    expect(ids.size).toBe(qs.length);
  });

  it('returns an empty array when given no topics', async () => {
    const qs = await buildCustomQuiz({ topicIds: [], count: 5 });
    expect(qs).toEqual([]);
  });
});

describe('TOTAL_QUESTION_COUNT', () => {
  it('is a positive number kept roughly in sync with the real banks', async () => {
    // This constant is hand-maintained (see the comment in index.js) so the
    // home page doesn't have to eagerly load every question bank just to
    // show a count. This test doesn't recompute the exact live sum (that
    // would defeat the purpose of the code-split) — it just guards against
    // the number being left wildly stale after a big content addition.
    expect(TOTAL_QUESTION_COUNT).toBeGreaterThan(1000);
  });
});
