import { describe, expect, it } from 'vitest';
import { findRtlIssues } from '../../lib/rtlMath.js';
import { allTopics } from './index.js';

/** דף הנוסחאות של כל כיתה בנוי מ-keyFormulas — כל שורה צריכה להיקרא נכון מימין לשמאל. */
describe('key formulas read correctly right-to-left', () => {
  it.each(allTopics().filter((t) => t.keyFormulas?.length).map((t) => [t.id, t.keyFormulas]))('%s', (_id, formulas) => {
    const bad = formulas.map((f) => [f, findRtlIssues(f)]).filter(([, issues]) => issues.length);
    expect(bad).toEqual([]);
  });
});
