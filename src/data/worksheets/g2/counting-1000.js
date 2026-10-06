import { m } from '../helpers.js';
import { tf } from './shared.js';

/** ממשיכים סדרה: מוצגים 3 איברים, משלימים 3. */
function cont(start, step) {
  const all = Array.from({ length: 6 }, (_, i) => start + i * step);
  return { q: m`$${all.slice(0, 3).join(',\\; ')},$ ` + all.slice(3).map((v) => `[[${v}]]`).join(' $,$ ') };
}

const jump = (a, b) => ({ q: m`$${a},\; ${b},\; ${2 * b - a},\; \ldots$ — בכמה קופצים?`, a: `[[${Math.abs(b - a)}]]` });

export default {
  id: 'g2-counting-1000',
  grade: 2,
  emoji: '🦘',
  title: 'ספירה בתחום ה-1,000',
  reminder: [
    {
      title: 'ספירה בקפיצות',
      md: m`קופצים כל פעם באותו מספר: ב-$1$, $2$, $5$, $10$, $100$...

$235 \to 245 \to 255$ (קפיצות של $10$: ספרת העשרות גדלה).`,
    },
    {
      title: 'מעבר מאה',
      md: m`$298 \to 299 \to 300$ · $\;390 \to 400$ (בקפיצות של $10$)`,
    },
    {
      title: 'אחורה',
      md: m`אותו דבר בכיוון ההפוך: $700 \to 600 \to 500$ (קפיצות של $100$ אחורה).`,
    },
  ],
  pages: [
    {
      title: 'ספירה קדימה',
      exercises: [
        { title: 'המשיכו.', cols: 1, items: [cont(296, 1), cont(235, 10), cont(400, 100), cont(370, 10), cont(150, 5), cont(84, 2)] },
        { title: 'בכמה קופצים?', cols: 1, items: [jump(120, 130), jump(300, 400), jump(45, 50)] },
      ],
    },
    {
      title: 'ספירה אחורה',
      exercises: [
        { title: 'ספרו אחורה.', cols: 1, items: [cont(503, -1), cont(860, -10), cont(900, -100), cont(240, -20)] },
        {
          title: 'השלימו.',
          cols: 2,
          items: [
            { q: m`$10$ יותר מ-$395$: [[405]]` },
            { q: m`$100$ פחות מ-$612$: [[512]]` },
            { q: m`$10$ פחות מ-$300$: [[290]]` },
            { q: m`$100$ יותר מ-$899$: [[999]]` },
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`בקפיצות של $10$ מ-$237$ ספרת היחידות תמיד $7$.`, true), tf(m`אחרי $499$ בא $500$.`, true), tf(m`בקפיצות של $5$ מ-$0$ מגיעים ל-$72$.`, 72 % 5 === 0)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'המשיכו.', cols: 1, items: [cont(587, 1), cont(640, 10), cont(800, -100)] },
      { title: 'בכמה קופצים?', cols: 1, items: [jump(510, 530)] },
    ],
  },
};
