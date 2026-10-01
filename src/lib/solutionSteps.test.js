import { describe, expect, it } from 'vitest';
import { correctAnswerText, solutionSteps } from './solutionSteps';
import { ELEMENTARY_QUESTIONS } from '../data/questions/elementaryQuestions';
import { MIDDLE_SCHOOL_QUESTIONS } from '../data/questions/middleSchoolQuestions';
import { QUESTIONS as HIGH_SCHOOL_QUESTIONS } from '../data/questions/highSchoolQuestions';

const steps = (explanation, extra = {}) => solutionSteps({ explanation, ...extra });

describe('solutionSteps', () => {
  it('splits sentences but not decimal points', () => {
    expect(steps('המחיר הוא 2.5 שקלים. לכן משלמים $5$ על שניים.')).toEqual(['המחיר הוא 2.5 שקלים.', 'לכן משלמים $5$ על שניים.']);
  });
  it('splits after a colon that introduces a formula', () => {
    expect(steps('היקף ריבוע הוא 4 כפול הצלע: $4\\times 10=40$.')).toEqual(['היקף ריבוע הוא 4 כפול הצלע:', '$4\\times 10=40$.']);
  });
  it('opens an equality chain into lines', () => {
    expect(steps('מחשבים את היתר בעזרת פיתגורס: $\\sqrt{9+16}=\\sqrt{25}=5$.')).toEqual([
      'מחשבים את היתר בעזרת פיתגורס:',
      '$\\sqrt{9+16}=\\sqrt{25}$',
      '$=5$.',
    ]);
  });
  it('splits at implications and keeps "=" inside braces', () => {
    expect(steps('נציב בנוסחה: $\\frac{x}{2}=3\\Rightarrow x=6$')).toEqual(['נציב בנוסחה:', '$\\frac{x}{2}=3$', '$\\Rightarrow x=6$']);
  });
  it('prefers explicit steps', () => {
    expect(steps('הסבר', { steps: ['א', 'ב'] })).toEqual(['א', 'ב']);
  });
  it('never breaks a formula across steps, for any question in the bank', () => {
    const all = [...ELEMENTARY_QUESTIONS, ...MIDDLE_SCHOOL_QUESTIONS, ...HIGH_SCHOOL_QUESTIONS];
    for (const q of all) {
      for (const s of solutionSteps(q)) {
        expect((s.match(/(?<!\\)\$/g) || []).length % 2, `${q.id}: ${s}`).toBe(0);
        expect(s.trim().length, q.id).toBeGreaterThan(0);
      }
    }
  });
});

describe('correctAnswerText', () => {
  it('returns the correct option of an mcq', () => {
    expect(correctAnswerText({ type: 'mcq', options: ['$1$', '$2$'], correct_index: 1 })).toBe('$2$');
  });
  it('returns null for interactive questions', () => {
    expect(correctAnswerText({ type: 'numberLine', payload: {} })).toBeNull();
  });
});
