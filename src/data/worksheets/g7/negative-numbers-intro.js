import { m, cmp } from '../helpers.js';
import { tf, signedLine } from './shared.js';

const t = (x) => (x < 0 ? `-${-x}` : `${x}`);

/** קריאת נקודות מישר המספרים: תרגיל עם השרטוט, ומשבצת לכל אות. */
const readLine = (title, min, max, values) => ({
  title,
  cols: 2,
  figure: signedLine({ min, max, points: values.map((at, i) => ({ at, label: 'ABCD'[i] })) }),
  items: values.map((v, i) => ({ q: `$${'ABCD'[i]} =$ [[${v}]]` })),
});

const opposite = (x) => ({ q: m`הנגדי של $${t(x)}$:`, a: `[[${-x}]]` });
const abs = (x) => ({ q: m`$|{${t(x)}}| =$ [[${Math.abs(x)}]]` });
const compare = (a, b) => ({ q: m`$${t(a)}$ [[c:${cmp(a, b)}]] $${t(b)}$` });
const compareAbs = (a, b) => ({ q: m`$|{${t(a)}}|$ [[c:${cmp(Math.abs(a), Math.abs(b))}]] $|{${t(b)}}|$` });

/** סידור מהקטן לגדול: בחירה מתוך שלוש אפשרויות. */
function order(values, wrong1, wrong2) {
  const right = [...values].sort((x, y) => x - y);
  const show = (arr) => m`$${arr.map(t).join(',\\; ')}$`;
  const options = [show(wrong1), show(right), show(wrong2)];
  return { q: m`סדרו מהקטן לגדול: $${values.map(t).join(',\\; ')}$`, options, answer: 1 };
}

export default {
  id: 'g7-negative-numbers-intro',
  grade: 7,
  emoji: '🌡️',
  title: 'מספרים שליליים, נגדיים וערך מוחלט',
  reminder: [
    {
      title: 'ישר המספרים',
      md: m`משמאל ל-$0$ — המספרים **השליליים**: $\ldots, -3, -2, -1, 0, 1, 2, 3, \ldots$

כל מספר **גדול** מכל מספר שמשמאלו: $-2 > -5$ ו-$0 > -100$.`,
    },
    {
      title: 'מספרים נגדיים',
      md: m`באותו מרחק מ-$0$, בצדדים שונים: הנגדי של $4$ הוא $-4$, והנגדי של $-7$ הוא $7$. הנגדי של $0$ הוא $0$.`,
    },
    {
      title: 'ערך מוחלט',
      md: m`המרחק מ-$0$ — תמיד אי-שלילי: $|{-6}| = 6$, $\;|6| = 6$, $\;|0| = 0$.`,
    },
  ],
  pages: [
    {
      title: 'ישר המספרים ונגדיים',
      exercises: [
        readLine('איזה מספר מסומן בכל אות?', -6, 6, [-4, -1, 2, 5]),
        readLine('ועל הישר הזה?', -8, 2, [-7, -3, 0, 1]),
        { title: 'מה הנגדי?', cols: 3, items: [opposite(9), opposite(-3), opposite(-15), opposite(1), opposite(-100), opposite(0)] },
        { title: 'ערך מוחלט.', cols: 2, items: [abs(-8), abs(5), abs(-23), abs(0), abs(-1), abs(40)] },
      ],
    },
    {
      title: 'השוואה וסידור',
      exercises: [
        { title: 'השוו: בחרו $<$, $=$ או $>$.', cols: 2, items: [compare(-3, 2), compare(-5, -2), compare(0, -7), compare(-10, -11), compare(4, -4), compare(-6, -6)] },
        { title: 'השוו ערכים מוחלטים.', cols: 2, items: [compareAbs(-9, 4), compareAbs(-3, 3), compareAbs(-2, -5), compareAbs(7, -8)] },
        {
          title: 'סדרו.',
          cols: 1,
          items: [
            order([3, -5, 0, -1], [0, -1, 3, -5], [-1, -5, 0, 3]),
            order([-8, -12, 4, -3], [-3, -8, -12, 4], [4, -3, -8, -12]),
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf(m`$-20$ קטן מ-$-2$.`, -20 < -2),
            tf('לכל מספר יש ערך מוחלט חיובי.', false),
            tf(m`המספר הנגדי של מספר שלילי הוא חיובי.`, true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      readLine('איזה מספר מסומן?', -5, 5, [-3, 4]),
      { title: 'נגדי וערך מוחלט.', cols: 2, items: [opposite(-12), abs(-17)] },
      { title: 'השוו.', cols: 2, items: [compare(-4, -9), compareAbs(-6, 5)] },
      { title: 'סדרו.', cols: 1, items: [order([-2, 6, -9, 1], [-2, -9, 1, 6], [6, 1, -2, -9])] },
    ],
  },
};
