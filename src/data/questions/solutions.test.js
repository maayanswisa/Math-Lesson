import { describe, expect, it } from 'vitest';
import { ELEMENTARY_QUESTIONS } from './elementaryQuestions';
import { MIDDLE_SCHOOL_QUESTIONS } from './middleSchoolQuestions';
import { QUESTIONS as HIGH_SCHOOL_QUESTIONS } from './highSchoolQuestions';

const FILES = import.meta.glob('./solutions/g*.js', { eager: true });
const BANK = new Map([...ELEMENTARY_QUESTIONS, ...MIDDLE_SCHOOL_QUESTIONS, ...HIGH_SCHOOL_QUESTIONS].map((q) => [q.id, q]));
const balanced = (s) => (s.match(/(?<!\\)\$/g) || []).length % 2 === 0;

describe.each(Object.entries(FILES))('%s', (path, mod) => {
  const grade = Number(path.match(/g(\d+)\.js$/)[1]);
  const sol = mod.default;

  it('covers every question of the grade', () => {
    const missing = [...BANK.values()].filter((q) => q.topic_id.startsWith(`g${grade}-`) && !sol[q.id]).map((q) => q.id);
    expect(missing).toEqual([]);
  });

  it.each(Object.entries(sol))('%s is well formed', (id, entry) => {
    const q = BANK.get(id);
    expect(q, 'unknown question id').toBeTruthy();
    expect(q.topic_id.startsWith(`g${grade}-`)).toBe(true);
    expect(Array.isArray(entry.hints) && entry.hints.length >= 1).toBe(true);
    expect(Array.isArray(entry.steps) && entry.steps.length >= 1).toBe(true);
    for (const s of [...entry.hints, ...entry.steps]) {
      expect(typeof s === 'string' && s.trim().length > 0).toBe(true);
      expect(balanced(s), s).toBe(true);
    }
  });
});
