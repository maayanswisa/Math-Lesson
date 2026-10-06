import { m } from '../helpers.js';
import { approx, tf } from './shared.js';

const SHAPES = ['מקבילית', 'מלבן', 'מעוין', 'ריבוע', 'טרפז', 'דלתון'];
const which = (q, shape) => ({ q, options: SHAPES, answer: SHAPES.indexOf(shape) });

const midsegment = (side) => ({ q: m`צלע המשולש $${side}$. קטע האמצעים המקביל לה: [[${side / 2}]]` });
const sideFromMid = (mid) => ({ q: m`קטע אמצעים במשולש שווה $${mid}$. הצלע המקבילה לו: [[${mid * 2}]]` });

const parallelogramAngles = (A) => ({ q: m`במקבילית $ABCD$, $\angle A = ${A}°$.`, a: m`$\angle B =$ [[${180 - A}]] $° \quad \angle C =$ [[${A}]] $° \quad \angle D =$ [[${180 - A}]] $°$` });

function rectDiagonal(a, b) {
  const d = Math.sqrt(a * a + b * b);
  return { q: m`מלבן $${a} \times ${b}$. אורך האלכסון:`, a: Number.isInteger(d) ? `[[${d}]]` : approx(d) };
}

export default {
  id: 'g9r-geometry',
  grade: 9,
  emoji: '🔷',
  title: 'גאומטריה — מרובעים ומשולשים',
  reminder: [
    {
      title: 'משפחת המרובעים',
      md: m`**מקבילית** — צלעות נגדיות מקבילות ושוות, זוויות נגדיות שוות, האלכסונים חוצים זה את זה.
**מלבן** = מקבילית + זווית ישרה · **מעוין** = מקבילית + צלעות שוות · **ריבוע** = מלבן וגם מעוין.`,
    },
    {
      title: 'קטע אמצעים במשולש',
      md: m`מחבר אמצעי שתי צלעות — **מקביל לצלע השלישית ושווה למחציתה**: צלע $14$ ← קטע אמצעים $7$.`,
    },
    {
      title: 'פיתגורס',
      md: m`במשולש ישר-זווית: $a^2 + b^2 = c^2$. אלכסון מלבן $6 \times 8$: $\sqrt{36 + 64} = 10$.`,
    },
  ],
  pages: [
    {
      title: 'מרובעים וזוויות',
      exercises: [
        {
          title: 'איזה מרובע? (הכי מדויק)',
          cols: 1,
          items: [
            which('מקבילית עם זווית ישרה אחת.', 'מלבן'),
            which('מקבילית שכל צלעותיה שוות, והזוויות לא ישרות.', 'מעוין'),
            which('מלבן שבו שתי צלעות סמוכות שוות.', 'ריבוע'),
            which('מרובע עם זוג אחד בלבד של צלעות מקבילות.', 'טרפז'),
            which('מרובע שהאלכסונים שלו חוצים זה את זה (ולא יותר מזה).', 'מקבילית'),
          ],
        },
        { title: 'זוויות במקבילית.', cols: 1, items: [parallelogramAngles(70), parallelogramAngles(115), parallelogramAngles(90)] },
        {
          title: 'אלכסונים.',
          cols: 1,
          items: [
            { q: m`במקבילית $ABCD$ האלכסונים נפגשים ב-$O$, ו-$AO = 6$. $\;AC =$ [[12]]` },
            { q: m`במלבן אורך אלכסון אחד $15$. $\;$ האלכסון השני: [[15]]` },
            { q: m`במעוין, הזווית בין האלכסונים: [[90]] $°$` },
          ],
        },
      ],
    },
    {
      title: 'קטע אמצעים ופיתגורס',
      exercises: [
        { title: 'קטע אמצעים במשולש.', cols: 2, items: [midsegment(14), midsegment(9), sideFromMid(6.5), sideFromMid(11)] },
        {
          title: 'היקף משולש האמצעים.',
          cols: 1,
          items: [{ q: m`צלעות המשולש $8$, $10$, $12$. מחברים את אמצעי הצלעות. היקף המשולש הקטן: [[${(8 + 10 + 12) / 2}]]` }],
        },
        { title: 'אלכסון מלבן.', cols: 1, items: [rectDiagonal(6, 8), rectDiagonal(5, 12), rectDiagonal(4, 7), rectDiagonal(9, 40)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf('כל מעוין הוא מקבילית.', true), tf('כל מלבן הוא ריבוע.', false), tf('במקבילית, האלכסונים תמיד שווים.', false), tf('קטע אמצעים במשולש מקביל לצלע השלישית.', true)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'איזה מרובע?', cols: 1, items: [which('מעוין שיש בו זווית ישרה.', 'ריבוע')] },
      { title: 'זוויות במקבילית.', cols: 1, items: [parallelogramAngles(62)] },
      { title: 'קטע אמצעים.', cols: 2, items: [midsegment(17), sideFromMid(4.5)] },
      { title: 'אלכסון.', cols: 1, items: [rectDiagonal(8, 15)] },
    ],
  },
};
