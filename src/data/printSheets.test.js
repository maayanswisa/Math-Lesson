import fs from 'node:fs';
import { describe, it, expect } from 'vitest';
import {
  PRINT_SHEET_GRADES,
  PRINT_SHEET_SERIES,
  TOPIC_SERIES_KEYS,
  bookletFile,
  getPrintSheets,
  getTopicSeries,
  hasPrintSheets,
  printSheetsHref,
  sheetFile,
  topicBookletFile,
  topicSeriesForGrade,
  topicSeriesHref,
  topicSheetFile,
} from './printSheets.js';

const publicPath = (href) => new URL(`../../public${href}`, import.meta.url);

describe('printable sheets', () => {
  it('lists numbered sheets for grades 3 to 9 and for grade 11 (4 units)', () => {
    expect(PRINT_SHEET_GRADES).toEqual([3, 4, 5, 6, 7, 8, 9, 11]);
    expect(PRINT_SHEET_SERIES).toContainEqual({ grade: 11, units: 4 });
    for (const { grade, units } of PRINT_SHEET_SERIES) {
      const sheets = getPrintSheets(grade, units);
      expect(sheets.map((s) => s.no)).toEqual(sheets.map((_, i) => i + 1));
      for (const s of sheets) {
        expect(s.title).toBeTruthy();
        expect(s.tag).toBeTruthy();
      }
    }
    expect(hasPrintSheets(2)).toBe(false);
    expect(getPrintSheets(2)).toEqual([]);
    expect(hasPrintSheets(11)).toBe(false);
    expect(hasPrintSheets(11, 5)).toBe(false);
    expect(getPrintSheets(11, 4).length).toBe(22);
    expect(printSheetsHref(9)).toBe('/grade/9/print-sheets');
    expect(printSheetsHref(11, 4)).toBe('/grade/11/units/4/print-sheets');
  });

  it('has a PDF in public/ for every sheet and both booklets', () => {
    for (const { grade, units } of PRINT_SHEET_SERIES) {
      const files = [...getPrintSheets(grade, units).map((s) => sheetFile(grade, s.no, units)), bookletFile(grade, 'student', units), bookletFile(grade, 'answers', units)];
      for (const href of files) expect(fs.existsSync(publicPath(href)), href).toBe(true);
    }
    expect(sheetFile(7, 3)).toBe('/print-sheets/g7/03.pdf');
    expect(sheetFile(11, 3, 4)).toBe('/print-sheets/g11-4u/03.pdf');
  });

  it('lists topic series (sheets that span grades) with numbered sheets and their PDFs', () => {
    expect(TOPIC_SERIES_KEYS).toContain('addition');
    for (const key of TOPIC_SERIES_KEYS) {
      const s = getTopicSeries(key);
      expect(s.title && s.short && s.emoji && s.intro).toBeTruthy();
      expect(s.sheets.map((x) => x.no)).toEqual(s.sheets.map((_, i) => i + 1));
      for (const sheet of s.sheets) expect(sheet.title && sheet.tag && sheet.topics.length).toBeTruthy();
      for (const href of [...s.sheets.map((x) => topicSheetFile(key, x.no)), topicBookletFile(key, 'student'), topicBookletFile(key, 'answers')]) {
        expect(fs.existsSync(publicPath(href)), href).toBe(true);
      }
    }
    expect(getTopicSeries('addition').sheets.length).toBe(12);
    expect(getTopicSeries('nope')).toBeNull();
    expect(getTopicSeries('constructor')).toBeNull();
    expect(topicSeriesHref('addition')).toBe('/print-sheets/addition');
    expect(topicSheetFile('addition', 3)).toBe('/print-sheets/addition/03.pdf');
    // the addition series shows up for grades 1-4 only
    expect(topicSeriesForGrade(1).map((s) => s.key)).toEqual(['addition']);
    expect(topicSeriesForGrade(4).map((s) => s.key)).toEqual(['addition']);
    expect(topicSeriesForGrade(5)).toEqual([]);
  });
});
