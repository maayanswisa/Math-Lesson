import { describe, it, expect } from 'vitest';
import { hasLesson, loadLesson, LESSON_TOPIC_IDS } from './index.js';
import { getTopicById, getAllTopicsForGrade } from '../curriculum/index.js';
import { isChallengeCorrect, parseNumberAnswer } from '../../lib/lesson.js';
import { normalCdf } from '../../lib/normal.js';
import { BLOCK_TYPES } from '../../components/lesson/LessonBlock.jsx';

describe('lessons registry', () => {
  it('finds registered lessons and nothing for unknown topics', async () => {
    expect(hasLesson('g8-equations-system')).toBe(true);
    expect(hasLesson('not-a-topic')).toBe(false);
    expect(await loadLesson('not-a-topic')).toBeNull();
  });

  it.each([3, 5, 7, 8, 9])('every grade-%i topic has a lesson', (grade) => {
    const missing = getAllTopicsForGrade(grade)
      .map((t) => t.id)
      .filter((id) => !hasLesson(id));
    expect(missing).toEqual([]);
  });

  it.each(LESSON_TOPIC_IDS)('%s is well-formed: real topic, unique sections, one valid challenge each', async (topicId) => {
    const lesson = await loadLesson(topicId);
    expect(lesson.topicId).toBe(topicId);
    expect(getTopicById(lesson.topicId)).not.toBeNull();
    expect(lesson.title && lesson.subtitle && lesson.emoji).toBeTruthy();

    const ids = lesson.sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(lesson.sections.length).toBeGreaterThanOrEqual(3);

    for (const section of lesson.sections) {
      expect(section.blocks.length).toBeGreaterThan(0);
      for (const block of section.blocks) expect(BLOCK_TYPES).toContain(block.type);

      const ch = section.challenge;
      expect(ch.prompt && ch.hint && ch.explain).toBeTruthy();
      if (ch.type === 'choice') {
        expect(ch.options[ch.answer]).toBeDefined();
        expect(new Set(ch.options).size).toBe(ch.options.length);
      } else {
        expect(ch.type).toBe('number');
        expect(Number.isFinite(ch.answer)).toBe(true);
        // the stored answer must itself pass the checker (catches label/tolerance mistakes)
        expect(isChallengeCorrect(ch, String(ch.answer))).toBe(true);
      }
    }
  });

  it('balance blocks start balanced at the stated solution', async () => {
    const lessons = await Promise.all(LESSON_TOPIC_IDS.map(loadLesson));
    const balances = lessons
      .flatMap((l) => l.sections)
      .flatMap((s) => s.blocks)
      .filter((b) => b.type === 'balance');
    for (const b of balances) {
      const w = (side) => side.x * b.solution + side.units;
      expect(w(b.left)).toBe(w(b.right));
    }
  });
});

describe('parseNumberAnswer / isChallengeCorrect', () => {
  it('accepts the usual ways students type a number', () => {
    expect(parseNumberAnswer('7')).toBe(7);
    expect(parseNumberAnswer(' x = 7 ')).toBe(7);
    expect(parseNumberAnswer('−3')).toBe(-3);
    expect(parseNumberAnswer('2,5')).toBe(2.5);
    expect(parseNumberAnswer('1,000')).toBe(1000);
    expect(parseNumberAnswer('2,437,158')).toBe(2437158);
    expect(parseNumberAnswer('abc')).toBeNaN();
    expect(parseNumberAnswer('')).toBeNaN();
  });

  it('checks number and choice challenges', () => {
    expect(isChallengeCorrect({ type: 'number', answer: 7 }, 'x=7')).toBe(true);
    expect(isChallengeCorrect({ type: 'number', answer: 7 }, '8')).toBe(false);
    expect(isChallengeCorrect({ type: 'choice', answer: 1 }, 1)).toBe(true);
    expect(isChallengeCorrect({ type: 'choice', answer: 1 }, 0)).toBe(false);
  });
});

describe('normalCdf', () => {
  it('matches the standard normal table to 4 decimals', () => {
    for (const [z, phi] of [[0, 0.5], [1, 0.8413], [2, 0.9772], [1.28, 0.8997], [-1, 0.1587]]) {
      expect(normalCdf(z)).toBeCloseTo(phi, 4);
    }
  });
});

describe('percent answers', () => {
  it('accepts a trailing % and honours tolerance', () => {
    const ch = { type: 'number', answer: 15.87, tolerance: 0.01 };
    expect(isChallengeCorrect(ch, '15.87%')).toBe(true);
    expect(isChallengeCorrect(ch, '15.87')).toBe(true);
    expect(isChallengeCorrect(ch, '84.13')).toBe(false);
  });
});
