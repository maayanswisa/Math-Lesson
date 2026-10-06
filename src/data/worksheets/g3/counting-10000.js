import { m, num } from '../helpers.js';
import { tf } from './shared.js';

/** ממשיכים סדרה: מוצגים shown איברים, משלימים next. */
function cont(start, step, shown = 3, next = 3) {
  const all = Array.from({ length: shown + next }, (_, i) => start + i * step);
  return {
    q: m`$${all.slice(0, shown).map(num).join(',\\; ')},$ ` + all.slice(shown).map((v) => `[[${v}]]`).join(' $,$ '),
  };
}

const jump = (a, b) => ({ q: m`$${num(a)},\; ${num(b)},\; ${num(2 * b - a)},\; \ldots$ — בכמה קופצים?`, a: `[[${b - a}]]` });

export default {
  id: 'g3-counting-10000',
  grade: 3,
  emoji: '🦘',
  title: 'ספירה בתחום ה-10,000',
  reminder: [
    {
      title: 'קפיצות',
      md: m`קופצים באותו גודל כל פעם: ב-$10$, $100$, $1{,}000$ — וגם ב-$20$, $25$, $50$, $200$, $500$.`,
    },
    {
      title: 'ממספר לא עגול',
      md: m`בקפיצות של $10$ **ספרת היחידות לא משתנה**; בקפיצות של $100$ — גם העשרות נשארות:

$3{,}457 \to 3{,}467 \to 3{,}477$`,
    },
    {
      title: 'אחורה',
      md: m`אותו עיקרון בכיוון ההפוך (קפיצות של $200$ אחורה):

$5{,}200 \to 5{,}000 \to 4{,}800$`,
    },
  ],
  pages: [
    {
      title: 'ספירה קדימה',
      exercises: [
        { title: 'המשיכו את הספירה.', cols: 1, items: [cont(3450, 10), cont(2700, 100), cont(4000, 1000), cont(1250, 25), cont(3457, 10), cont(6130, 200)] },
        { title: 'בכמה קופצים?', cols: 1, items: [jump(150, 175), jump(2300, 2800), jump(7040, 7090)] },
      ],
    },
    {
      title: 'ספירה אחורה ומעבר לאלפים',
      exercises: [
        { title: 'ספרו אחורה.', cols: 1, items: [cont(5200, -200), cont(9000, -500), cont(3060, -10), cont(8125, -25)] },
        {
          title: 'מעבר אלפים.',
          cols: 2,
          items: [
            { q: m`המספר שבא אחרי $3{,}999$: [[4000]]` },
            { q: m`המספר שבא לפני $7{,}000$: [[6999]]` },
            { q: m`$4{,}990 + 10 =$ [[5000]]` },
            { q: m`$6{,}000 - 100 =$ [[5900]]` },
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`בספירה בקפיצות של $10$ מ-$3{,}457$ ספרת היחידות תמיד $7$.`, true), tf(m`בקפיצות של $25$ מ-$0$ מגיעים ל-$1{,}000$.`, 1000 % 25 === 0)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'המשיכו.', cols: 1, items: [cont(2850, 50), cont(7600, -100), cont(1975, 5)] },
      { title: 'בכמה קופצים?', cols: 1, items: [jump(4400, 4600)] },
    ],
  },
};
