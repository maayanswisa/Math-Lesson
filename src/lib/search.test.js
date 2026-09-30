import { describe, expect, it } from 'vitest';
import { normalize, searchTopics, tokenize } from './search';

const ids = (q, opts) => searchTopics(q, opts).map((r) => r.topic.id);

describe('normalize / tokenize', () => {
  it('maps final letters and strips punctuation', () => {
    expect(normalize('שברים — "חדו״א"')).toBe('שברימ חדוא');
  });
  it('stems plurals and drops stop words', () => {
    expect(tokenize('שברים כיתה ה')).toEqual(['שבר']);
  });
});

describe('searchTopics', () => {
  it('finds the law of sines', () => {
    const r = ids('משפט הסינוסים');
    expect(r.length).toBeGreaterThan(0);
    expect(r).toContain('g10-u5-trig-plane');
  });
  it('finds fraction topics from a plural query', () => {
    const r = searchTopics('שברים');
    expect(r.length).toBeGreaterThan(3);
    expect(r[0].topic.title).toMatch(/שבר/);
  });
  it('filters by grade', () => {
    const r = searchTopics('שברים', { grade: 5 });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((x) => x.topic.grade === 5)).toBe(true);
  });
  it('requires every word to match', () => {
    expect(ids('סינוסים שברים')).toEqual([]);
  });
  it('returns nothing for an empty query', () => {
    expect(ids('  ')).toEqual([]);
  });
});
