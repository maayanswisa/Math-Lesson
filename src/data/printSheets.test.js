import fs from 'node:fs';
import { describe, it, expect } from 'vitest';
import { PRINT_SHEET_GRADES, bookletFile, getPrintSheets, hasPrintSheets, printSheetsHref, sheetFile } from './printSheets.js';

const publicPath = (href) => new URL(`../../public${href}`, import.meta.url);

describe('printable sheets', () => {
  it('lists numbered sheets for grades 5, 7, 8 and 9', () => {
    expect(PRINT_SHEET_GRADES).toEqual([5, 7, 8, 9]);
    for (const g of PRINT_SHEET_GRADES) {
      const sheets = getPrintSheets(g);
      expect(sheets.map((s) => s.no)).toEqual(sheets.map((_, i) => i + 1));
      for (const s of sheets) {
        expect(s.title).toBeTruthy();
        expect(s.tag).toBeTruthy();
      }
    }
    expect(hasPrintSheets(6)).toBe(false);
    expect(getPrintSheets(6)).toEqual([]);
    expect(printSheetsHref(9)).toBe('/grade/9/print-sheets');
  });

  it('has a PDF in public/ for every sheet and both booklets', () => {
    for (const g of PRINT_SHEET_GRADES) {
      const files = [...getPrintSheets(g).map((s) => sheetFile(g, s.no)), bookletFile(g, 'student'), bookletFile(g, 'answers')];
      for (const href of files) expect(fs.existsSync(publicPath(href)), href).toBe(true);
    }
    expect(sheetFile(7, 3)).toBe('/print-sheets/g7/03.pdf');
  });
});
