import { m } from '../helpers.js';
import { exact, tf } from './shared.js';

/**
 * קיצון מוחלט בתחום סגור: max ו-min נבדקים מול דגימה צפופה של f על [a, b].
 */
function absolute(fTex, f, a, b, max, min) {
  let hi = -Infinity;
  let lo = Infinity;
  for (let k = 0; k <= 40000; k++) {
    const y = f(a + ((b - a) * k) / 40000);
    hi = Math.max(hi, y);
    lo = Math.min(lo, y);
  }
  if (Math.abs(hi - max) > 1e-6 || Math.abs(lo - min) > 1e-6) throw new Error(`wrong absolute extrema for ${fTex}`);
  return { q: m`$f(x)=${fTex}$ בתחום $[${a},${b}]$`, a: m`מקסימום מוחלט: ${exact(max)} $\;\cdot\;$ מינימום מוחלט: ${exact(min)}` };
}

export default {
  id: 'g11-u4-absolute-extrema',
  grade: 11,
  emoji: '🏔️',
  title: 'מינימום ומקסימום מוחלטים',
  reminder: [
    {
      title: 'בתחום סגור',
      md: m`מחשבים את $f$ בכל נקודה **בתוך** התחום שבה $f'=0$, **ובשני הקצוות**. הגדול — מקסימום מוחלט, הקטן — מינימום מוחלט.`,
    },
    {
      title: 'שימו לב',
      md: m`נקודה שבה $f'=0$ אבל היא **מחוץ** לתחום — לא משתתפת. ולעיתים הקיצון המוחלט בקצה.`,
    },
    {
      title: 'תחום פתוח',
      md: 'בתחום פתוח או אינסופי ייתכן שאין קיצון מוחלט (הפונקציה גדלה בלי גבול, או מתקרבת לערך בלי להגיע).',
    },
  ],
  pages: [
    {
      title: 'פולינומים ופונקציות רציונליות',
      exercises: [
        {
          title: 'מצאו את המקסימום והמינימום המוחלטים.',
          cols: 1,
          items: [
            absolute(m`x^2-4x`, (x) => x * x - 4 * x, 0, 5, 5, -4),
            absolute(m`x^3-3x`, (x) => x ** 3 - 3 * x, 0, 3, 18, -2),
            absolute(m`-x^2+6x`, (x) => -x * x + 6 * x, 0, 2, 8, 0),
            absolute(m`x+\frac4x`, (x) => x + 4 / x, 1, 5, 5.8, 4),
            absolute(m`x+\frac9x`, (x) => x + 9 / x, 1, 6, 10, 6),
          ],
        },
      ],
    },
    {
      title: 'פונקציות שורש ותחום פתוח',
      exercises: [
        {
          title: 'מצאו את המקסימום והמינימום המוחלטים.',
          cols: 1,
          items: [
            absolute(m`\sqrt x-\frac x2`, (x) => Math.sqrt(x) - x / 2, 0, 4, 0.5, 0),
            absolute(m`2\sqrt x-x`, (x) => 2 * Math.sqrt(x) - x, 0, 9, 1, -3),
            absolute(m`x\sqrt{4-x}`, (x) => x * Math.sqrt(4 - x), 0, 4, (8 / 3) * Math.sqrt(4 / 3), 0),
          ],
        },
        {
          title: 'יש קיצון מוחלט?',
          cols: 1,
          items: [
            { q: m`$f(x)=\frac{1}{x^2+1}$ (בכל המספרים)`, options: ['יש מקסימום מוחלט בלבד', 'יש מינימום מוחלט בלבד', 'יש שניהם', 'אין אף אחד'], answer: 0 },
            { q: m`$f(x)=x+\frac4x$ בתחום $x>0$`, options: ['יש מקסימום מוחלט בלבד', 'יש מינימום מוחלט בלבד', 'יש שניהם', 'אין אף אחד'], answer: 1 },
            { q: m`$f(x)=\frac1x$ בתחום $x>0$`, options: ['יש מקסימום מוחלט בלבד', 'יש מינימום מוחלט בלבד', 'יש שניהם', 'אין אף אחד'], answer: 3 },
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('המקסימום המוחלט תמיד נמצא בנקודה שבה f′=0.', false), tf('בתחום סגור, לפונקציה רציפה יש תמיד מקסימום ומינימום מוחלטים.', true)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      {
        title: 'מצאו את המקסימום והמינימום המוחלטים.',
        cols: 1,
        items: [absolute(m`x^2-6x+5`, (x) => x * x - 6 * x + 5, 0, 4, 5, -4), absolute(m`x+\frac{16}{x}`, (x) => x + 16 / x, 2, 8, 10, 8)],
      },
    ],
  },
};
