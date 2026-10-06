import { m, rectModel, svgParts } from '../helpers.js';
import { tf } from './shared.js';

const SQ = 'סמ״ר';

/** מלבן משבצות — סופרים שטח. */
const countArea = (rows, cols) => ({ q: '', figure: rectModel(rows * cols, rows, cols, 20), a: m`שטח: [[${rows * cols}]] משבצות` });

/** מלבן עם אורך ורוחב בס״מ. */
const rectArea = (l, w) => ({ q: m`מלבן שאורכו $${l}$ ס״מ ורוחבו $${w}$ ס״מ.`, a: m`שטח: [[${l * w}]] ${SQ}` });

/** צלע חסרה: שטח ואורך ידועים. */
const missingSide = (area, l) => {
  if (area % l) throw new Error(`${area} is not divisible by ${l}`);
  return { q: m`שטח מלבן $${area}$ ${SQ}, ואורכו $${l}$ ס״מ.`, a: m`רוחבו: [[${area / l}]] ס״מ` };
};

/** שטח והיקף של מלבן. */
const both = (l, w) => ({ q: m`מלבן $${l} \times ${w}$ ס״מ`, a: m`שטח: [[${l * w}]] ${SQ} · היקף: [[${2 * (l + w)}]] ס״מ` });

/** צורה מורכבת ממשבצות: cells = [עמודה, שורה]. */
function shapeFig(cells, size = 20) {
  const { svg, INK, SHADE } = svgParts;
  const cols = Math.max(...cells.map((c) => c[0])) + 1;
  const rows = Math.max(...cells.map((c) => c[1])) + 1;
  let body = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      body += `<rect x="${2 + x * size}" y="${2 + y * size}" width="${size}" height="${size}" fill="#fff" stroke="#cfd8e3" stroke-width="1"/>`;
    }
  }
  body += cells.map(([x, y]) => `<rect x="${2 + x * size}" y="${2 + y * size}" width="${size}" height="${size}" fill="${SHADE}" stroke="${INK}" stroke-width="1.3"/>`).join('');
  return svg(cols * size + 4, rows * size + 4, body);
}
const block = (x0, y0, w, h) => Array.from({ length: w * h }, (_, i) => [x0 + (i % w), y0 + Math.floor(i / w)]);
const shapeArea = (cells) => ({ q: '', figure: shapeFig(cells), a: m`שטח: [[${cells.length}]] משבצות` });

const L_SHAPE = [...block(0, 0, 2, 4), ...block(2, 2, 3, 2)];
const T_SHAPE = [...block(0, 0, 5, 2), ...block(1, 2, 3, 2)];
const STEPS = [...block(0, 2, 1, 1), ...block(0, 1, 2, 1), ...block(0, 0, 3, 1), ...block(3, 0, 1, 3)];

export default {
  id: 'g3-area',
  grade: 3,
  emoji: '⬛',
  title: 'שטח מלבן',
  reminder: [
    {
      title: 'שטח = כמה משבצות',
      md: m`שטח הוא כמה משבצות (יחידות שטח) מכסות את הצורה. משבצת של $1$ ס״מ על $1$ ס״מ היא **סמ״ר** (סנטימטר רבוע).`,
    },
    {
      title: 'קיצור דרך',
      md: m`במלבן: $\;$ שטח $=$ אורך $\times$ רוחב $\quad 5 \times 3 = 15$ ${SQ}`,
    },
    {
      title: 'שטח ≠ היקף',
      md: m`**היקף** = אורך המסגרת (ס״מ). **שטח** = כמה משבצות בפנים (${SQ}).

$4 \times 4$ ו-$8 \times 2$: שניהם בשטח $16$, אבל ההיקפים $16$ ו-$20$.`,
    },
  ],
  pages: [
    {
      title: 'סופרים משבצות',
      exercises: [
        { title: 'מה השטח?', cols: 3, items: [countArea(3, 4), countArea(2, 6), countArea(5, 5)] },
        { title: 'מה שטח הצורה?', cols: 3, items: [shapeArea(L_SHAPE), shapeArea(T_SHAPE), shapeArea(STEPS)] },
        { title: 'חשבו את השטח: אורך × רוחב.', cols: 2, items: [rectArea(7, 3), rectArea(9, 6), rectArea(8, 8), rectArea(10, 4)] },
      ],
    },
    {
      title: 'צלע חסרה, שטח והיקף',
      exercises: [
        { title: 'מצאו את הרוחב.', cols: 1, items: [missingSide(24, 6), missingSide(35, 7), missingSide(36, 9)] },
        { title: 'חשבו שטח והיקף.', cols: 1, items: [both(4, 4), both(8, 2), both(6, 3)] },
        {
          title: 'בחרו את התשובה.',
          cols: 1,
          items: [
            { q: m`לאיזה מלבן שטח של $12$ ${SQ}?`, options: [m`$3 \times 4$`, m`$6 \times 6$`, m`$5 \times 7$`], answer: 0 },
            { q: 'באיזו יחידה מודדים שטח?', options: ['ס״מ', SQ, 'ק״ג'], answer: 1 },
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('לשני מלבנים עם אותו שטח יש תמיד אותו היקף.', false), tf(m`שטח ריבוע שצלעו $5$ ס״מ הוא $25$ ${SQ}.`, 5 * 5 === 25)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מה השטח?', cols: 2, items: [countArea(4, 6), shapeArea([...block(0, 0, 4, 1), ...block(0, 1, 1, 2), ...block(3, 1, 1, 2)])] },
      { title: 'חשבו.', cols: 1, items: [rectArea(9, 5), missingSide(42, 7), both(5, 2)] },
    ],
  },
};
