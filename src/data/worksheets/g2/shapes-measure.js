import { m, svgParts } from '../helpers.js';
import { tf, gridFig, rulerFig } from './shared.js';

/* ---------- הזזה ושיקוף ---------- */

const FLAG = [[1, 1], [2, 1], [2, 3], [4, 3], [4, 5], [1, 5]];
const move = (pts, dx, dy) => pts.map(([x, y]) => [x + dx, y + dy]);
const mirrorX = (pts, c) => pts.map(([x, y]) => [2 * c - x, y]);
const KINDS = ['הזזה', 'שיקוף'];
const FIGS = {
  move: gridFig({ w: 11, h: 6, shapes: [{ pts: FLAG, kind: 'orig' }, { pts: move(FLAG, 6, 0), kind: 'image' }] }),
  mirror: gridFig({ w: 10, h: 6, shapes: [{ pts: FLAG, kind: 'orig' }, { pts: mirrorX(FLAG, 5), kind: 'image' }], mirror: [[5, 0], [5, 6]] }),
};
const which = (k) => ({ q: '', figure: FIGS[k], options: KINDS, answer: k === 'move' ? 0 : 1 });

/* ---------- מדידה בסרגל ---------- */

const measure = (from, to) => ({ q: '', figure: rulerFig(from, to, 10), a: m`אורך הקטע: [[${to - from}]] ס״מ` });

/* ---------- השוואת שטחים: ספירת משבצות ---------- */

function cellsFig(cells, size = 18) {
  const { svg, INK, SHADE } = svgParts;
  const cols = Math.max(...cells.map((c) => c[0])) + 1;
  const rows = Math.max(...cells.map((c) => c[1])) + 1;
  return svg(cols * size + 4, rows * size + 4, cells.map(([x, y]) => `<rect x="${2 + x * size}" y="${2 + y * size}" width="${size}" height="${size}" fill="${SHADE}" stroke="${INK}" stroke-width="1.2"/>`).join(''));
}
const block = (w, h) => Array.from({ length: w * h }, (_, i) => [i % w, Math.floor(i / w)]);
const SHAPE_A = block(4, 2);
const SHAPE_B = [...block(3, 2), [0, 2], [1, 2], [2, 2]];
const SHAPE_C = [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [3, 3]];
const area = (cells) => ({ q: '', figure: cellsFig(cells), a: m`[[${cells.length}]] משבצות` });

export default {
  id: 'g2-shapes-measure',
  grade: 2,
  emoji: '📏',
  title: 'הזזה, שיקוף, מדידה ושטח',
  reminder: [
    {
      title: 'הזזה ושיקוף',
      md: '**הזזה** — הצורה זזה בלי להסתובב ובלי להתהפך. **שיקוף** — כמו במראה: הצורה מתהפכת מעבר לקו.',
    },
    {
      title: 'מדידה בסרגל',
      md: m`מתחילים למדוד מה-$0$. אם הקטע לא מתחיל ב-$0$ — מחסרים: מ-$2$ עד $7$ ← $7 - 2 = 5$ ס״מ.`,
    },
    {
      title: 'השוואת שטחים',
      md: 'לצורה שמכסה **יותר משבצות** יש שטח גדול יותר.',
    },
  ],
  pages: [
    {
      title: 'הזזה ושיקוף',
      exercises: [
        { title: 'הצורה הכחולה עברה לצורה האדומה. איך?', cols: 1, items: [which('move'), which('mirror')] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('בהזזה הצורה נשארת באותו גודל.', true), tf('בשיקוף הצורה גדלה.', false)] },
      ],
    },
    {
      title: 'מדידה ושטח',
      exercises: [
        { title: 'מה אורך הקטע?', cols: 1, items: [measure(0, 6), measure(2, 7), measure(3, 10), measure(1, 5)] },
        { title: 'כמה משבצות?', cols: 3, items: [area(SHAPE_A), area(SHAPE_B), area(SHAPE_C)] },
        { title: 'השוו.', cols: 1, items: [{ q: 'לאיזו צורה (מהשלוש למעלה) השטח הגדול ביותר?', options: ['הראשונה', 'השנייה', 'השלישית'], answer: [SHAPE_A, SHAPE_B, SHAPE_C].map((s) => s.length).indexOf(Math.max(SHAPE_A.length, SHAPE_B.length, SHAPE_C.length)) }] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'איך עברה הצורה?', cols: 1, items: [which('mirror')] },
      { title: 'מה אורך הקטע?', cols: 1, items: [measure(4, 9)] },
      { title: 'כמה משבצות?', cols: 2, items: [area(block(3, 3)), area(SHAPE_C)] },
    ],
  },
};
