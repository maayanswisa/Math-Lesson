import { m, boxFig } from '../helpers.js';
import { tf, netFig } from './shared.js';

/* ---------- בדיקת פריסה של קובייה ---------- */

/**
 * מקפלים את הפריסה בפועל. לכל משבצת שומרים מסגרת: n — הנורמל של הפאה שהיא
 * הופכת אליה, u/v — הכיוונים במרחב של "ימינה"/"למטה" בפריסה. מעבר לשכנה
 * ימנית מקפל ב-90°: הנורמל החדש הוא u, ו-"ימינה" החדש הוא −n (וכך הלאה).
 * פריסה תקינה ⇔ 6 משבצות קשורות שנופלות על 6 פאות שונות.
 */
const neg = (a) => a.map((x) => -x);
const STEPS_3D = [
  [1, 0, ([n, u, v]) => [u, neg(n), v]],
  [-1, 0, ([n, u, v]) => [neg(u), n, v]],
  [0, 1, ([n, u, v]) => [v, u, neg(n)]],
  [0, -1, ([n, u, v]) => [neg(v), u, n]],
];
function isCubeNet(cells) {
  if (cells.length !== 6) return false;
  const key = ([x, y]) => `${x},${y}`;
  const set = new Set(cells.map(key));
  const frames = new Map([[key(cells[0]), [[0, 0, -1], [1, 0, 0], [0, 1, 0]]]]);
  const queue = [cells[0]];
  while (queue.length) {
    const [cx, cy] = queue.shift();
    for (const [dx, dy, fold] of STEPS_3D) {
      const next = [cx + dx, cy + dy];
      if (!set.has(key(next)) || frames.has(key(next))) continue;
      frames.set(key(next), fold(frames.get(key([cx, cy]))));
      queue.push(next);
    }
  }
  if (frames.size !== 6) return false;
  return new Set([...frames.values()].map(([n]) => n.join(','))).size === 6;
}

const netItem = (cells) => ({ q: '', figure: netFig(cells, 22), options: ['כן', 'לא'], answer: isCubeNet(cells) ? 0 : 1 });

const CROSS = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]];
const T_NET = [[0, 0], [1, 0], [2, 0], [1, 1], [1, 2], [1, 3]];
const STAIRS = [[0, 0], [1, 0], [2, 0], [2, 1], [3, 1], [4, 1]];
const ZIG = [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2], [2, 3]];
const BLOCK = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]];
const ROW = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]];
const SIDE_FOUR = [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [3, 1]];
const L_NET = [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [3, 2]];
const SQUARE_TAIL = [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1], [3, 1]];
const FIVE = [[0, 0], [1, 0], [2, 0], [3, 0], [1, 1]];

// בדיקה עצמית מול פריסות ידועות
for (const net of [CROSS, T_NET, STAIRS, ZIG, L_NET]) if (!isCubeNet(net)) throw new Error(`valid net rejected: ${JSON.stringify(net)}`);
for (const net of [BLOCK, ROW, SIDE_FOUR, SQUARE_TAIL, FIVE]) if (isCubeNet(net)) throw new Error(`invalid net accepted: ${JSON.stringify(net)}`);

/** כמה פאות / מקצועות / קודקודים. */
const count = (q, n) => ({ q, a: `[[${n}]]` });

/** שטח הפאות של תיבה בזוגות. */
const faceAreas = (l, w, h) => ({
  q: '',
  figure: boxFig({ l, w, h }),
  a: m`עליונה ותחתונה $(${l} \times ${w})$: [[${l * w}]] · קדמית ואחורית $(${l} \times ${h})$: [[${l * h}]] · צדדיות $(${w} \times ${h})$: [[${w * h}]] סמ״ר`,
});

export default {
  id: 'g3-box-net',
  grade: 3,
  emoji: '📦',
  title: 'תיבה, קובייה ופריסות',
  reminder: [
    {
      title: 'תיבה וקובייה',
      md: m`לתיבה $6$ פאות (מלבנים), $12$ מקצועות ו-$8$ קודקודים. הפאות באות ב-**$3$ זוגות** של פאות זהות (מול זו).

**קובייה** — תיבה שכל $6$ הפאות שלה ריבועים שווים.`,
    },
    {
      title: 'פריסה',
      md: m`פריסה = "פותחים" את הקופסה ושוטחים. בפריסת קובייה יש בדיוק $6$ ריבועים, וכשמקפלים — אין שתי פאות שנופלות זו על זו.

${netFig(CROSS, 18)} פריסה תקינה $\qquad$ ${netFig(BLOCK, 18)} לא תקינה`,
    },
  ],
  pages: [
    {
      title: 'פאות, מקצועות וקודקודים',
      exercises: [
        {
          title: 'השלימו.',
          cols: 1,
          items: [
            count('כמה פאות יש לתיבה?', 6),
            count('כמה מקצועות יש לתיבה?', 12),
            count('כמה קודקודים יש לתיבה?', 8),
            count('כמה זוגות של פאות זהות יש בתיבה?', 3),
            count('כמה ריבועים יש בפריסה של קובייה?', 6),
          ],
        },
        { title: 'חשבו את שטחי הפאות.', cols: 1, items: [faceAreas(5, 3, 2), faceAreas(6, 4, 3)] },
      ],
    },
    {
      title: 'פריסות של קובייה',
      exercises: [
        { title: 'האם זו פריסה של קובייה?', cols: 3, items: [netItem(CROSS), netItem(BLOCK), netItem(STAIRS), netItem(ROW), netItem(T_NET), netItem(SIDE_FOUR)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('לכל הפאות של קובייה אותו שטח.', true),
            tf('בפריסה של קובייה מספיקים 5 ריבועים.', isCubeNet(FIVE)),
            tf('בתיבה, כל פאה זהה לפאה שמולה.', true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'השלימו.', cols: 1, items: [count('כמה מקצועות יש לקובייה?', 12), count('כמה פאות ריבועיות יש לקובייה?', 6)] },
      { title: 'האם זו פריסה של קובייה?', cols: 3, items: [netItem(ZIG), netItem(SQUARE_TAIL), netItem(L_NET)] },
      { title: 'חשבו את שטחי הפאות.', cols: 1, items: [faceAreas(4, 2, 3)] },
    ],
  },
};
