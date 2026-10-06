import { m } from '../helpers.js';
import { tf } from './shared.js';

/** פירוק לחיבור: a × (t + u) = a × t + a × u. */
const split = (a, t, u) => ({
  q: m`$${a} \times ${t + u} = ${a} \times ${t} + ${a} \times ${u} =$ [[${a * t}]] $+$ [[${a * u}]] $=$ [[${a * (t + u)}]]`,
});

/** פירוק לחיסור: a × (t − u) = a × t − a × u. */
const splitMinus = (a, t, u) => ({
  q: m`$${a} \times ${t - u} = ${a} \times ${t} - ${a} \times ${u} =$ [[${a * t}]] $-$ [[${a * u}]] $=$ [[${a * (t - u)}]]`,
});

/** פירוק פתוח: התלמיד בוחר איך לפרק, רק התוצאה נבדקת. */
const open = (a, b) => ({ q: m`$${a} \times ${b} =$ [[${a * b}]]` });

/** השלמת הפירוק: a × n = a × □ + a × u. */
const fill = (a, t, u) => ({ q: m`$${a} \times ${t + u} = ${a} \times$ [[${t}]] $+ ${a} \times ${u}$` });

/** איזה פירוק נכון? */
function whichSplit(a, n, options, answer) {
  return { q: m`איזה פירוק מתאים ל-$${a} \times ${n}$?`, options, answer };
}

export default {
  id: 'g3-distributive-law',
  grade: 3,
  emoji: '🧩',
  title: 'חוק הפילוג',
  reminder: [
    {
      title: 'פירוק לחיבור',
      md: m`מפרקים את המספר הגדול לעשרות ויחידות:

$4 \times 23 = 4 \times 20 + 4 \times 3 = 80 + 12 = 92$`,
    },
    {
      title: 'פירוק לחיסור',
      md: m`כשהמספר קרוב לעשרת עגולה:

$3 \times 29 = 3 \times 30 - 3 \times 1 = 90 - 3 = 87$`,
    },
  ],
  pages: [
    {
      title: 'פירוק לחיבור',
      exercises: [
        { title: 'חשבו בעזרת פירוק.', cols: 1, items: [split(4, 20, 3), split(6, 10, 7), split(3, 40, 5), split(5, 30, 6), split(7, 20, 4)] },
        { title: 'השלימו את הפירוק.', cols: 2, items: [fill(8, 10, 2), fill(6, 30, 4), fill(9, 20, 1), fill(4, 50, 3)] },
      ],
    },
    {
      title: 'פירוק לחיסור ובחירה',
      exercises: [
        { title: 'חשבו בעזרת פירוק לחיסור.', cols: 1, items: [splitMinus(3, 30, 1), splitMinus(4, 20, 1), splitMinus(6, 50, 2), splitMinus(5, 40, 1)] },
        {
          title: 'איזה פירוק מתאים?',
          cols: 1,
          items: [
            whichSplit(6, 18, [m`$6 \times 10 + 6 \times 8$`, m`$6 \times 10 + 8$`, m`$6 + 18$`], 0),
            whichSplit(4, 39, [m`$4 \times 30 + 9$`, m`$4 \times 40 - 4 \times 1$`, m`$4 \times 40 - 1$`], 1),
          ],
        },
        { title: 'חשבו בדרך שלכם.', cols: 2, items: [open(3, 27), open(5, 19), open(8, 12), open(7, 31)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`$5 \times 14 = 5 \times 10 + 5 \times 4 = 70$`, 5 * 14 === 70), tf(m`$2 \times 49 = 2 \times 50 - 1$`, false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו בעזרת פירוק.', cols: 1, items: [split(3, 20, 6), splitMinus(7, 30, 1)] },
      { title: 'השלימו את הפירוק.', cols: 1, items: [fill(5, 40, 3)] },
      { title: 'חשבו.', cols: 2, items: [open(6, 21), open(4, 48)] },
    ],
  },
};
