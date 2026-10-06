import { describe, it, expect } from 'vitest';
import { WORKSHEET_TOPIC_IDS, getWorksheetTopics, hasWorksheet, loadWorksheet, worksheetsHref } from './index.js';
import { getTopicById } from '../curriculum/index.js';
import {
  PARTS,
  correctValues,
  gradeBlank,
  gradeExercise,
  groupTemplate,
  itemBlanks,
  blankAnswerMarkdown,
  parseBlank,
  parseNumber,
  parseTemplate,
  partOf,
} from '../../lib/worksheet.js';
import { valueBlank } from './helpers.js';

describe('worksheet registry', () => {
  it('maps topic ids to real curriculum topics', () => {
    expect(WORKSHEET_TOPIC_IDS.length).toBeGreaterThan(0);
    for (const id of WORKSHEET_TOPIC_IDS) expect(getTopicById(id)).not.toBeNull();
    expect(hasWorksheet('not-a-topic')).toBe(false);
    expect(getWorksheetTopics(5).length).toBe(WORKSHEET_TOPIC_IDS.filter((id) => id.startsWith('g5-')).length);
  });

  it('filters high-school worksheets by units, and links to the matching list', () => {
    const u4 = getWorksheetTopics(11, { units: 4 });
    expect(u4.length).toBeGreaterThan(0);
    expect(u4.every((t) => t.units === 4)).toBe(true);
    expect(getWorksheetTopics(11, { units: 3 }).every((t) => t.units === 3)).toBe(true);
    expect(worksheetsHref(u4[0])).toBe('/grade/11/units/4/worksheets');
    expect(worksheetsHref(getTopicById('g5-primes'))).toBe('/grade/5/worksheets');
    expect(worksheetsHref({ grade: 9, track: 'high' })).toBe('/grade/9/track/high/worksheets');
  });

  it.each(WORKSHEET_TOPIC_IDS)('%s is well-formed and its own answers grade as correct', async (topicId) => {
    const ws = await loadWorksheet(topicId);
    expect(ws.id).toBe(topicId);
    expect(ws.grade).toBe(getTopicById(topicId).grade);
    expect(ws.reminder.length).toBeGreaterThan(0);
    for (const r of ws.reminder) expect(r.md).toBeTruthy();
    expect(ws.pages).toHaveLength(2);

    for (const partId of PARTS) {
      const part = partOf(ws, partId);
      expect(part.exercises.length).toBeGreaterThan(0);
      part.exercises.forEach((ex, exIdx) => {
        expect(ex.title).toBeTruthy();
        expect(ex.items.length).toBeGreaterThan(0);
        for (const item of ex.items) {
          if (item.options) {
            expect(item.options[item.answer]).toBeDefined();
            expect(new Set(item.options).size).toBe(item.options.length);
            expect(item.a).toBeUndefined();
          } else {
            // כל פריט שאינו שאלת בחירה צריך לפחות משבצת אחת
            expect(itemBlanks(item).length).toBeGreaterThan(0);
          }
          // $ מאוזנים בכל קטע טקסט — אחרת KaTeX נשבר סביב משבצת
          for (const tpl of [item.q, item.a ?? '']) {
            for (const seg of parseTemplate(tpl)) {
              if (seg.type === 'text') expect((seg.text.match(/\$/g) || []).length % 2, `unbalanced $ in "${tpl}"`).toBe(0);
            }
          }
        }
        const { items } = gradeExercise(ex, partId, exIdx, correctValues(ex, partId, exIdx));
        expect(items.every(Boolean)).toBe(true);
        // ודאו שתשובה ריקה לא נחשבת נכונה
        expect(gradeExercise(ex, partId, exIdx, {}).items.some(Boolean)).toBe(false);
      });
    }
  });
});

describe('parseNumber', () => {
  it('accepts the usual ways students type numbers', () => {
    expect(parseNumber('7')).toBe(7);
    expect(parseNumber(' 0.75 ')).toBe(0.75);
    expect(parseNumber('3,5')).toBe(3.5);
    expect(parseNumber('250,000')).toBe(250000);
    expect(parseNumber('1,250,000')).toBe(1250000);
    expect(parseNumber('.5')).toBe(0.5);
    expect(parseNumber('−3')).toBe(-3);
    expect(parseNumber('1/2')).toBe(0.5);
    expect(parseNumber('−3/4')).toBe(-0.75);
    expect(parseNumber('1/0')).toBeNaN();
    expect(parseNumber('abc')).toBeNaN();
    expect(parseNumber('')).toBeNaN();
  });
});

describe('blanks', () => {
  it('parses every blank kind', () => {
    expect(parseBlank('42')).toMatchObject({ kind: 'number', answers: [42] });
    expect(parseBlank('n:2|3')).toMatchObject({ kind: 'number', answers: [2, 3] });
    expect(parseBlank('f:3/4')).toMatchObject({ kind: 'fraction', exact: false, n: { value: 3 }, d: { value: 4 } });
    expect(parseBlank('fx:{9}/12')).toMatchObject({ exact: true, n: { value: 9, fixed: true }, d: { value: 12, fixed: false } });
    expect(parseBlank('m:2 3/4')).toMatchObject({ kind: 'mixed', w: { value: 2 }, n: { value: 3 }, d: { value: 4 } });
    expect(parseBlank('c:>')).toEqual({ kind: 'compare', answer: '>', signs: ['<', '=', '>'] });
    expect(parseBlank('t:XIV')).toEqual({ kind: 'text', answers: ['XIV'] });
    expect(() => parseBlank('c:?')).toThrow();
    expect(() => parseBlank('zz:1')).toThrow();
  });

  it('grades fractions by value, exactly, or with a given part', () => {
    const f = parseBlank('f:3/4');
    expect(gradeBlank(f, { n: '6', d: '8' })).toBe(true);
    expect(gradeBlank(f, { n: '3', d: '5' })).toBe(false);
    expect(gradeBlank(f, { n: '3', d: '0' })).toBe(false);
    const fx = parseBlank('fx:3/4');
    expect(gradeBlank(fx, { n: '6', d: '8' })).toBe(false);
    expect(gradeBlank(fx, { n: '3', d: '4' })).toBe(true);
    const given = parseBlank('f:{9}/12');
    expect(gradeBlank(given, { d: '12' })).toBe(true);
    expect(gradeBlank(given, { d: '4' })).toBe(false);
  });

  it('grades mixed numbers, accepting an improper fraction when not exact', () => {
    const mixed = parseBlank('m:1 1/4');
    expect(gradeBlank(mixed, { w: '1', n: '1', d: '4' })).toBe(true);
    expect(gradeBlank(mixed, { w: '', n: '5', d: '4' })).toBe(true);
    expect(gradeBlank(mixed, { w: '1', n: '2', d: '8' })).toBe(true);
    expect(gradeBlank(mixed, { w: '2', n: '1', d: '4' })).toBe(false);
    expect(gradeBlank(parseBlank('mx:1 1/4'), { w: '1', n: '2', d: '8' })).toBe(false);
  });

  it('groups a row into Hebrew labels and left-to-right math runs', () => {
    const shape = (tpl) =>
      groupTemplate(tpl).map((g) => (g.type === 'label' ? `L:${g.text.trim()}` : `M:${g.parts.map((p) => (p.type === 'blank' ? '□' : p.text.trim())).filter(Boolean).join(' ')}`));
    // תווית ואחריה קואורדינטות — הסוגריים נשארים ברצף מתמטי אחד
    expect(shape('קודקוד: $($ [[1]] $,\\,$ [[2]] $)$')).toEqual(['L:קודקוד:', 'M:$($ □ $,\\,$ □ $)$']);
    // מתמטיקה לפני מילה עברית נשארת חלק מהתווית
    expect(shape('ב-$3$ שלמים יש [[12]] רבעים')).toEqual(['L:ב-$3$ שלמים יש', 'M:□', 'L:רבעים']);
    expect(shape('$100 : 7 =$ [[14]] שארית [[2]]')).toEqual(['M:$100 : 7 =$ □', 'L:שארית', 'M:□']);
    // שורה בלי עברית — רצף אחד
    expect(shape('$x =$ [[3]]')).toEqual(['M:$x =$ □']);
  });

  it('grades approximate numbers and inequality signs', () => {
    const approx = parseBlank('n:31.4~0.1');
    expect(gradeBlank(approx, '31.4')).toBe(true);
    expect(gradeBlank(approx, '31.42')).toBe(true);
    expect(gradeBlank(approx, '31.6')).toBe(false);
    expect(blankAnswerMarkdown(approx)).toBe('$\\approx 31.4$');
    expect(gradeBlank(parseBlank('-4'), '−4')).toBe(true);

    const ineq = parseBlank('i:≥');
    expect(ineq.signs).toEqual(['<', '≤', '>', '≥']);
    expect(gradeBlank(ineq, '≥')).toBe(true);
    expect(gradeBlank(ineq, '>')).toBe(false);
    expect(blankAnswerMarkdown(ineq)).toBe('$\\ge$');
    expect(() => parseBlank('i:=')).toThrow();
  });

  it('grades numbers, text and comparisons', () => {
    expect(gradeBlank(parseBlank('0.75'), '0,75')).toBe(true);
    expect(gradeBlank(parseBlank('n:2|3'), '3')).toBe(true);
    expect(gradeBlank(parseBlank('t:XIV'), ' xiv ')).toBe(true);
    expect(gradeBlank(parseBlank('c:<'), '<')).toBe(true);
    expect(gradeBlank(parseBlank('c:<'), '>')).toBe(false);
    expect(gradeBlank(parseBlank('5'), '')).toBe(false);
  });

  it('grades a value blank in any equivalent form, and shows the simplest one', () => {
    const v = parseBlank(valueBlank(10, 4).slice(2, -2)); // 2 1/2
    expect(gradeBlank(v, { w: '2', n: '1', d: '2' })).toBe(true);
    expect(gradeBlank(v, { w: '', n: '5', d: '2' })).toBe(true);
    expect(gradeBlank(v, { w: '1', n: '6', d: '4' })).toBe(true);
    expect(gradeBlank(v, { w: '2', n: '', d: '' })).toBe(false);
    expect(gradeBlank(v, { w: '2', n: '1', d: '' })).toBe(false);
    expect(blankAnswerMarkdown(v)).toBe('$2\\frac{1}{2}$');

    const whole = parseBlank('v:12/4');
    expect(gradeBlank(whole, { w: '3' })).toBe(true);
    expect(gradeBlank(whole, { n: '12', d: '4' })).toBe(true);
    expect(blankAnswerMarkdown(whole)).toBe('$3$');

    const proper = parseBlank('v:6/8');
    expect(gradeBlank(proper, { n: '3', d: '4' })).toBe(true);
    expect(blankAnswerMarkdown(proper)).toBe('$\\frac{3}{4}$');
    expect(() => parseBlank('v:1/0')).toThrow();
  });
});
