import { m, bar, pie, rectModel, svgParts } from '../helpers.js';
import { tf } from './shared.js';

const NAMES = ['חצי', 'רבע', 'לא חצי ולא רבע'];

/** איזה חלק צבוע? */
const which = (figure, answer) => ({ q: '', figure, options: NAMES, answer });

/** רצועה בשני חלקים לא שווים — "לא חצי". */
const UNEVEN = (() => {
  const { svg, INK, SHADE } = svgParts;
  return svg(184, 36, `<rect x="2" y="2" width="60" height="32" fill="${SHADE}" stroke="${INK}" stroke-width="1.5"/><rect x="62" y="2" width="120" height="32" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`);
})();

const half = (n) => {
  if (n % 2) throw new Error('must be even');
  return { q: m`חצי מ-$${n}$:`, a: `[[${n / 2}]]` };
};
const quarter = (n) => {
  if (n % 4) throw new Error('must divide by 4');
  return { q: m`רבע מ-$${n}$:`, a: `[[${n / 4}]]` };
};

export default {
  id: 'g2-fractions-half',
  grade: 2,
  emoji: '🍕',
  title: 'שברים — חצי ורבע',
  reminder: [
    {
      title: 'חצי',
      md: m`מחלקים את השלם ל-**$2$ חלקים שווים**. כל חלק — **חצי** ($\frac{1}{2}$). שני חצאים — שלם.`,
    },
    {
      title: 'רבע',
      md: m`מחלקים את השלם ל-**$4$ חלקים שווים**. כל חלק — **רבע** ($\frac{1}{4}$). שני רבעים — חצי; ארבעה רבעים — שלם.`,
    },
    {
      title: 'חצי ורבע ממספר',
      md: m`חצי מ-$12$: $\;12 : 2 = 6$ $\qquad$ רבע מ-$12$: $\;12 : 4 = 3$`,
    },
  ],
  pages: [
    {
      title: 'חצי ורבע בציורים',
      exercises: [
        {
          title: 'איזה חלק צבוע?',
          cols: 3,
          items: [which(pie(1, 2, 32), 0), which(pie(1, 4, 32), 1), which(bar(1, 4, 150), 1), which(pie(1, 3, 32), 2), which(UNEVEN, 2), which(rectModel(1, 2, 2, 28), 1)],
        },
        {
          title: 'בחרו.',
          cols: 1,
          items: [
            { q: 'מה גדול יותר?', options: ['חצי פיצה', 'רבע פיצה', 'שווים'], answer: 0 },
            { q: 'כמה רבעים יש בשלם?', options: ['2', '4', '8'], answer: 1 },
            { q: 'כמה רבעים הם חצי?', options: ['1', '2', '3'], answer: 1 },
          ],
        },
      ],
    },
    {
      title: 'חצי ורבע ממספר',
      exercises: [
        { title: 'חצי.', cols: 3, items: [half(10), half(16), half(30), half(8), half(50), half(100)] },
        { title: 'רבע.', cols: 3, items: [quarter(8), quarter(12), quarter(20), quarter(40), quarter(100), quarter(4)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('שני חצאים של עוגה הם עוגה שלמה.', true), tf('אם מחלקים פיצה ל-4 חלקים לא שווים, כל חלק הוא רבע.', false), tf(m`רבע מ-$20$ קטן מחצי מ-$20$.`, 20 / 4 < 20 / 2)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'איזה חלק צבוע?', cols: 3, items: [which(bar(1, 2, 150), 0), which(pie(1, 4, 32), 1), which(UNEVEN, 2)] },
      { title: 'חשבו.', cols: 2, items: [half(18), quarter(16)] },
    ],
  },
};
