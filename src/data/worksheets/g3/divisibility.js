import { m, num } from '../helpers.js';
import { tf } from './shared.js';

/** בחירה: האם n מתחלק ב-d? */
const divisible = (n, d) => ({ q: m`האם $${num(n)}$ מתחלק ב-$${d}$ בלי שארית?`, options: ['כן', 'לא'], answer: n % d === 0 ? 0 : 1 });

/** בחירה מתוך רשימה: איזה מספר מתחלק ב-d? בדיוק אחד מתאים. */
function whichDivisible(d, nums) {
  const ok = nums.filter((n) => n % d === 0);
  if (ok.length !== 1) throw new Error(`exactly one of ${nums} must divide by ${d}`);
  return { q: m`איזה מספר מתחלק ב-$${d}$?`, options: nums.map((n) => m`$${num(n)}$`), answer: nums.indexOf(ok[0]) };
}

/** כמה מספרים ברשימה מתחלקים ב-d. */
const countDivisible = (d, nums) => ({
  q: m`כמה מהמספרים $\;${nums.map(num).join(',\\; ')}\;$ מתחלקים ב-$${d}$?`,
  a: `[[${nums.filter((n) => n % d === 0).length}]]`,
});

/** ספרת אחדות שתשלים: 3□ מתחלק ב-10. */
const lastDigit = (prefix, d, answer) => {
  const n = Number(`${prefix}${answer}`);
  if (n % d) throw new Error(`${n} not divisible by ${d}`);
  return { q: m`השלימו ספרה כך ש-$${prefix}\square$ יתחלק ב-$${d}$: ספרת האחדות היא`, a: `[[${answer}]]` };
};

export default {
  id: 'g3-divisibility',
  grade: 3,
  emoji: '🔍',
  title: 'סימני התחלקות ב-2, 5 ו-10',
  reminder: [
    {
      title: 'מסתכלים על ספרת האחדות',
      md: m`**ב-$2$** — ספרת האחדות זוגית: $0, 2, 4, 6, 8$

**ב-$5$** — ספרת האחדות $0$ או $5$

**ב-$10$** — ספרת האחדות $0$`,
    },
    {
      title: 'שימו לב',
      md: m`מספר שמתחלק ב-$10$ מתחלק **גם** ב-$2$ **וגם** ב-$5$: $\;340$ ✓ ✓ ✓

$125$ מתחלק ב-$5$ אבל לא ב-$2$ ולא ב-$10$.`,
    },
  ],
  pages: [
    {
      title: 'מתחלק או לא?',
      exercises: [
        { title: 'ענו כן או לא.', cols: 2, items: [divisible(348, 2), divisible(1235, 2), divisible(470, 5), divisible(2003, 5), divisible(5600, 10), divisible(705, 10), divisible(96, 2), divisible(4445, 5)] },
        { title: 'איזה מספר מתחלק?', cols: 1, items: [whichDivisible(10, [255, 340, 512]), whichDivisible(5, [1234, 3006, 785]), whichDivisible(2, [457, 333, 1918])] },
      ],
    },
    {
      title: 'מיונים והשלמות',
      exercises: [
        { title: 'כמה מתחלקים?', cols: 1, items: [countDivisible(2, [14, 25, 38, 41, 60, 77]), countDivisible(5, [15, 32, 50, 65, 99, 120]), countDivisible(10, [100, 105, 250, 307, 490, 55])] },
        { title: 'השלימו ספרה.', cols: 1, items: [lastDigit(47, 10, 0), lastDigit(23, 5, 5), lastDigit(81, 2, 8)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf(m`כל מספר שמתחלק ב-$10$ מתחלק גם ב-$5$.`, true),
            tf(m`כל מספר שמתחלק ב-$5$ מתחלק גם ב-$10$.`, false),
            tf(m`$1{,}000$ מתחלק ב-$2$, ב-$5$ וב-$10$.`, [2, 5, 10].every((d) => 1000 % d === 0)),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'ענו כן או לא.', cols: 2, items: [divisible(574, 2), divisible(905, 10), divisible(3330, 5), divisible(121, 2)] },
      { title: 'איזה מספר מתחלק?', cols: 1, items: [whichDivisible(10, [2005, 1990, 1999])] },
      { title: 'כמה מתחלקים?', cols: 1, items: [countDivisible(5, [10, 23, 45, 58, 75])] },
    ],
  },
};
