import { m } from '../helpers.js';
import { tf, ev, evItem } from './shared.js';

/** חזקה כמכפלה: כמה פעמים כופלים? */
const asProduct = (b, e) => ({ q: m`$${b < 0 ? `(${b})` : b}^{${e}} = ${Array(e).fill(b < 0 ? `(${b})` : b).join(' \\cdot ')} =$ [[${b ** e}]]` });

/** כתבו כחזקה: בסיס ומעריך. */
const toPower = (b, e) => ({ q: m`$${Array(e).fill(b).join(' \\cdot ')} =$ [[${b}]] בחזקת [[${e}]]` });

/** איפה הסוגריים? בדיוק אחת מהאפשרויות נותנת את target. */
function parens(tex, target, options) {
  const hits = options.filter((e) => ev(e) === target);
  if (hits.length !== 1) throw new Error(`expected one option equal to ${target} for ${tex}`);
  return { q: m`$${tex} = ${target}$`, options: options.map((e) => `$${e}$`), answer: options.indexOf(hits[0]) };
}

const SIGNS = ['חיובי', 'שלילי'];
const powSign = (b, e) => ({ q: m`הסימן של $(${b})^{${e}}$:`, options: SIGNS, answer: b ** e > 0 ? 0 : 1 });

export default {
  id: 'g7-order-powers',
  grade: 7,
  emoji: '🧮',
  title: 'סדר פעולות וחזקות',
  reminder: [
    {
      title: 'חזקה',
      md: m`$2^5 = 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 = 32$ — **הבסיס** $2$, **המעריך** $5$ (כמה פעמים כופלים).

$a^1 = a$ · $1^n = 1$ · $0^n = 0$`,
    },
    {
      title: 'חזקה של מספר שלילי',
      md: m`$(-2)^4 = 16$ (מעריך זוגי — חיובי) · $(-2)^3 = -8$ (אי-זוגי — שלילי)

שימו לב: $-3^2 = -9$ (החזקה רק על ה-$3$), אבל $(-3)^2 = 9$.`,
    },
    {
      title: 'סדר פעולות',
      md: m`1. סוגריים $\;$ 2. חזקות $\;$ 3. כפל וחילוק (משמאל לימין) $\;$ 4. חיבור וחיסור (משמאל לימין)

$2 + 3 \cdot 4^2 = 2 + 3 \cdot 16 = 2 + 48 = 50$`,
    },
  ],
  pages: [
    {
      title: 'חזקות',
      exercises: [
        { title: 'חשבו את החזקה.', cols: 1, items: [asProduct(3, 4), asProduct(-2, 3), asProduct(-1, 6), asProduct(5, 3)] },
        { title: 'כתבו כחזקה.', cols: 1, items: [toPower(7, 3), toPower(10, 4), toPower(2, 6)] },
        { title: 'מה הסימן?', cols: 2, items: [powSign(-4, 3), powSign(-5, 2), powSign(-1, 101), powSign(-3, 10)] },
        {
          title: 'שימו לב לסוגריים.',
          cols: 2,
          items: [
            // מינוס בלי סוגריים: החזקה רק על המספר (ev לא מפרש -3^2 בכוונה)
            { q: m`$-3^2 =$ [[${-(3 ** 2)}]]` },
            evItem(m`(-3)^2`),
            { q: m`$-2^4 =$ [[${-(2 ** 4)}]]` },
            evItem(m`(-2)^4`),
          ],
        },
      ],
    },
    {
      title: 'סדר פעולות',
      exercises: [
        {
          title: 'חשבו לפי סדר הפעולות.',
          cols: 2,
          items: [
            evItem(m`2 + 3 \times 4^2`),
            evItem(m`(2 + 3) \times 4`),
            evItem(m`20 - 12 : 4 \times 2`),
            evItem(m`(-5) + 2 \times (-3)`),
            evItem(m`(-2)^3 + 10`),
            evItem(m`3 \times (4 - 6)^2`),
            evItem(m`[8 - (2 + 4)] \times (-5)`),
            evItem(m`(-18) : (5 - 8) - 1`),
          ],
        },
        {
          title: 'איפה לשים סוגריים כדי שהתוצאה תהיה נכונה?',
          cols: 1,
          items: [
            parens(m`6 + 4 \times 3 - 1`, 29, [m`(6 + 4) \times 3 - 1`, m`6 + 4 \times (3 - 1)`, m`6 + (4 \times 3 - 1)`]),
            parens(m`12 : 2 + 4 \times 2`, 4, [m`12 : 2 + (4 \times 2)`, m`(12 : 2 + 4) \times 2`, m`12 : (2 + 4) \times 2`]),
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`$(-1)^{100} = 1$`, ev('(-1)^{100}') === 1), tf(m`$2^3 = 6$`, ev('2^3') === 6)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו.', cols: 2, items: [evItem(m`(-4)^3`), evItem(m`2^5`), { q: m`$-5^2 =$ [[${-(5 ** 2)}]]` }, evItem(m`(-1)^7`)] },
      { title: 'סדר פעולות.', cols: 2, items: [evItem(m`5 - 2 \times 3^2`), evItem(m`(7 - 9)^3 : 4`), evItem(m`[(-3) + 1] \times (-6) + 2`)] },
    ],
  },
};
