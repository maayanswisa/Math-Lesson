import { describe, expect, it } from 'vitest';
import { BLOCK_TYPES } from '../../components/lesson/LessonBlock';
import { getAllTopicsForGrade, getTopicById } from '../curriculum/index.js';
import { CHEATSHEET_TOPIC_IDS, hasCheatSheet, loadCheatSheet } from './index.js';

/** מספר זוגי של $ (לא מוסתרים) — כל נוסחה נסגרת. */
const balanced = (s) => (s.match(/(?<!\\)\$/g) || []).length % 2 === 0;

describe('cheat sheets', () => {
  it('finds registered sheets and nothing for unknown topics', async () => {
    expect(hasCheatSheet('g11-u4-precalc-rational')).toBe(true);
    expect(hasCheatSheet('not-a-topic')).toBe(false);
    expect(await loadCheatSheet('not-a-topic')).toBeNull();
  });

  it.each([
    [8, null],
    [11, 4],
  ])('every grade-%i topic (units: %s) has a cheat sheet', (grade, units) => {
    const missing = getAllTopicsForGrade(grade)
      .filter((t) => units == null || t.units === units)
      .map((t) => t.id)
      .filter((id) => !hasCheatSheet(id));
    expect(missing).toEqual([]);
  });

  it.each(CHEATSHEET_TOPIC_IDS)('%s is well formed', async (topicId) => {
    const sheet = await loadCheatSheet(topicId);
    expect(sheet.topicId).toBe(topicId);
    expect(getTopicById(topicId)).not.toBeNull();
    expect(sheet.title && sheet.subtitle && sheet.emoji).toBeTruthy();
    expect(sheet.sections.length).toBeGreaterThan(0);
    for (const section of sheet.sections) {
      expect(section.title && section.blocks.length).toBeTruthy();
      for (const block of section.blocks) {
        if (block.type === 'table') {
          for (const row of block.rows) expect(row.length).toBe(block.head.length);
          for (const cell of [...block.head, ...block.rows.flat()]) expect(balanced(cell), cell).toBe(true);
        } else {
          expect(BLOCK_TYPES).toContain(block.type);
          if (block.md) expect(balanced(block.md), block.md).toBe(true);
        }
      }
    }
  });
});
