import { describe, it, expect } from 'vitest';
import { ELEMENTARY_QUESTIONS } from './elementaryQuestions.js';
import { MIDDLE_SCHOOL_QUESTIONS } from './middleSchoolQuestions.js';
import { QUESTIONS as HIGH_SCHOOL_QUESTIONS } from './highSchoolQuestions.js';
import { INTERACTIVE_QUESTIONS } from './interactiveQuestions.js';
import { allTopics } from '../curriculum/index.js';

const BANKS = {
  elementary: ELEMENTARY_QUESTIONS,
  middle: MIDDLE_SCHOOL_QUESTIONS,
  high: HIGH_SCHOOL_QUESTIONS,
  interactive: INTERACTIVE_QUESTIONS,
};

const ALL_QUESTIONS = [
  ...ELEMENTARY_QUESTIONS,
  ...MIDDLE_SCHOOL_QUESTIONS,
  ...HIGH_SCHOOL_QUESTIONS,
  ...INTERACTIVE_QUESTIONS,
];

const TOPIC_IDS = new Set(allTopics().map((t) => t.id));

describe('question bank integrity', () => {
  it('has no duplicate ids across any bank', () => {
    const seen = new Map();
    const duplicates = [];
    for (const q of ALL_QUESTIONS) {
      if (seen.has(q.id)) duplicates.push(q.id);
      seen.set(q.id, true);
    }
    expect(duplicates).toEqual([]);
  });

  it('every question has a valid difficulty between 1 and 5', () => {
    const bad = ALL_QUESTIONS.filter(
      (q) => !Number.isFinite(q.difficulty) || q.difficulty < 1 || q.difficulty > 5,
    );
    expect(bad.map((q) => q.id)).toEqual([]);
  });

  it('every question has a non-empty question_text and explanation', () => {
    const bad = ALL_QUESTIONS.filter(
      (q) => !q.question_text?.trim() || !q.explanation?.trim(),
    );
    expect(bad.map((q) => q.id)).toEqual([]);
  });

  it('every question points to a topic that actually exists in the curriculum', () => {
    const bad = ALL_QUESTIONS.filter((q) => !TOPIC_IDS.has(q.topic_id));
    expect(bad.map((q) => `${q.id} -> ${q.topic_id}`)).toEqual([]);
  });

  for (const [bankName, bank] of Object.entries(BANKS)) {
    describe(`${bankName} bank`, () => {
      it('every mcq question has exactly 4 options and a correct_index within range', () => {
        const bad = bank
          .filter((q) => (q.type || 'mcq') === 'mcq')
          .filter(
            (q) =>
              !Array.isArray(q.options) ||
              q.options.length !== 4 ||
              !Number.isInteger(q.correct_index) ||
              q.correct_index < 0 ||
              q.correct_index > 3,
          );
        expect(bad.map((q) => q.id)).toEqual([]);
      });
    });
  }
});
