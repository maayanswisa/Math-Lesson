import { describe, it, expect } from 'vitest';
import { hasLesson, loadLesson } from './index.js';
import { getTopicById } from '../curriculum/index.js';
import { isChallengeCorrect, parseNumberAnswer } from '../../lib/lesson.js';

const BLOCK_TYPES = new Set(['text', 'card', 'steps', 'balance', 'groups']);

describe('lessons registry', () => {
  it('finds the grade-8 equations lesson and nothing for unknown topics', async () => {
    expect(hasLesson('g8-equations-system')).toBe(true);
    expect(hasLesson('not-a-topic')).toBe(false);
    expect(await loadLesson('not-a-topic')).toBeNull();
  });

  it('every lesson is well-formed: real topic, unique sections, one valid challenge each', async () => {
    const lesson = await loadLesson('g8-equations-system');
    expect(getTopicById(lesson.topicId)).not.toBeNull();

    const ids = lesson.sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const section of lesson.sections) {
      expect(section.blocks.length).toBeGreaterThan(0);
      for (const block of section.blocks) expect(BLOCK_TYPES.has(block.type)).toBe(true);

      const ch = section.challenge;
      expect(ch.prompt && ch.hint && ch.explain).toBeTruthy();
      if (ch.type === 'choice') {
        expect(ch.options[ch.answer]).toBeDefined();
        expect(new Set(ch.options).size).toBe(ch.options.length);
      } else {
        expect(ch.type).toBe('number');
        expect(Number.isFinite(ch.answer)).toBe(true);
      }
    }
  });

  it('balance blocks start balanced at the stated solution', async () => {
    const lesson = await loadLesson('g8-equations-system');
    const balances = lesson.sections.flatMap((s) => s.blocks).filter((b) => b.type === 'balance');
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
