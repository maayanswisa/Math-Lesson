import { m } from '../helpers.js';
import { tf, gridFig } from './shared.js';

const t = (x) => (x < 0 ? `-${-x}` : `${x}`);

/* ---------- הצורה והתמונות שלה ---------- */

const L = [[1, 1], [4, 1], [4, 3], [2, 3], [2, 5], [1, 5]];
const move = (pts, dx, dy) => pts.map(([x, y]) => [x + dx, y + dy]);
const mirrorX = (pts, c) => pts.map(([x, y]) => [2 * c - x, y]);
const rot180 = (pts, cx, cy) => pts.map(([x, y]) => [2 * cx - x, 2 * cy - y]);

const KINDS = ['הזזה', 'שיקוף', 'סיבוב'];
const FIGS = {
  move: gridFig({ w: 12, h: 7, shapes: [{ pts: L, kind: 'orig' }, { pts: move(L, 6, 1), kind: 'image' }] }),
  mirror: gridFig({ w: 12, h: 6, shapes: [{ pts: L, kind: 'orig' }, { pts: mirrorX(L, 6), kind: 'image' }], mirror: [[6, 0], [6, 6]] }),
  rotate: gridFig({ w: 12, h: 8, shapes: [{ pts: L, kind: 'orig' }, { pts: rot180(L, 6, 4), kind: 'image' }], center: [6, 4] }),
};
const which = (kind) => ({ q: '', figure: FIGS[kind], options: KINDS, answer: ['move', 'mirror', 'rotate'].indexOf(kind) });

/** וקטור ההזזה מהשרטוט. */
const moveVector = { q: 'בשרטוט של ההזזה: בכמה משבצות זזה הצורה?', figure: FIGS.move, a: m`ימינה: [[6]] · למעלה: [[1]]` };

/* ---------- שיעורים ---------- */

const translate = ([x, y], dx, dy) => ({
  q: m`מזיזים את $(${t(x)}, ${t(y)})$ ${Math.abs(dx)} ${dx >= 0 ? 'ימינה' : 'שמאלה'} ו-${Math.abs(dy)} ${dy >= 0 ? 'למעלה' : 'למטה'}:`,
  a: m`$($ [[${x + dx}]] $,$ [[${y + dy}]] $)$`,
});
const AXIS = { x: m`ציר $x$`, y: m`ציר $y$` };
const reflect = ([x, y], axis) => ({
  q: m`שיקוף של $(${t(x)}, ${t(y)})$ ב${AXIS[axis]}:`,
  a: axis === 'x' ? m`$($ [[${x}]] $,$ [[${-y}]] $)$` : m`$($ [[${-x}]] $,$ [[${y}]] $)$`,
});
const rotate = ([x, y]) => ({ q: m`סיבוב של $(${t(x)}, ${t(y)})$ ב-$180°$ סביב הראשית:`, a: m`$($ [[${-x}]] $,$ [[${-y}]] $)$` });

export default {
  id: 'g7-transformations',
  grade: 7,
  emoji: '🔄',
  title: 'חפיפה וטרנספורמציות',
  reminder: [
    {
      title: 'צורות חופפות',
      md: m`צורות **חופפות** — אפשר להניח אחת על השנייה בדיוק: אותן צלעות ואותן זוויות. הזזה, שיקוף וסיבוב **שומרים על חפיפה**.`,
    },
    {
      title: 'שלוש טרנספורמציות',
      md: m`**הזזה** — כל הנקודות זזות באותו כיוון ובאותו מרחק. **שיקוף** — "מראה" בציר: כל נקודה ותמונתה באותו מרחק מהציר. **סיבוב** — סביב נקודה, בזווית מסוימת.`,
    },
    {
      title: 'בשיעורים',
      md: m`הזזה ב-$3$ ימינה ו-$2$ למטה: $(x, y) \to (x + 3, y - 2)$

שיקוף בציר $x$: $(x, -y)$ · בציר $y$: $(-x, y)$ · סיבוב $180°$ סביב הראשית: $(-x, -y)$`,
    },
  ],
  pages: [
    {
      title: 'מזהים טרנספורמציות',
      exercises: [
        { title: 'הצורה הכחולה עברה טרנספורמציה לצורה האדומה. איזו?', cols: 1, items: [which('move'), which('mirror'), which('rotate')] },
        { title: 'וקטור ההזזה.', cols: 1, items: [moveVector] },
      ],
    },
    {
      title: 'טרנספורמציות בשיעורים',
      exercises: [
        { title: 'הזזה.', cols: 1, items: [translate([2, 3], 4, -1), translate([-1, 5], -3, -6), translate([0, -2], 5, 4)] },
        { title: 'שיקוף.', cols: 1, items: [reflect([3, 4], 'x'), reflect([3, 4], 'y'), reflect([-5, -2], 'y'), reflect([6, -1], 'x')] },
        { title: 'סיבוב.', cols: 1, items: [rotate([2, 5]), rotate([-4, 3])] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('בהזזה, הצורה והתמונה שלה חופפות.', true),
            tf('בשיקוף, הצורה "מתהפכת" — כמו בבבואה במראה.', true),
            tf('בסיבוב, אורכי הצלעות משתנים.', false),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'איזו טרנספורמציה?', cols: 1, items: [which('mirror')] },
      { title: 'חשבו.', cols: 1, items: [translate([-3, 1], 2, 5), reflect([-2, 7], 'x'), rotate([-6, -1])] },
    ],
  },
};
