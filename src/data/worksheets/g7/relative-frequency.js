import { m, round, reduce } from '../helpers.js';
import { tf } from './shared.js';

/** שכיחות יחסית: כשבר (נבדק לפי ערך — מתקבל גם לא מצומצם) וכאחוז. */
const rel = (label, f, n) => {
  const [a, b] = reduce(f, n);
  return { q: m`${label} ($${f}$ מתוך $${n}$):`, a: m`שבר: [[f:${a}/${b}]] · אחוז: [[${round((100 * f) / n, 2)}]] $\%$` };
};

/** מאחוז לשכיחות. */
const fromPercent = (p, n) => {
  const f = (p * n) / 100;
  if (!Number.isInteger(f)) throw new Error('frequency must be whole');
  return { q: m`$${p}\%$ מתוך $${n}$ תלמידים:`, a: m`[[${f}]] תלמידים` };
};

/** טבלה: אמצעי הגעה לבית הספר של 40 תלמידים. */
const TRANSPORT = { ברגל: 14, אוטובוס: 10, אופניים: 6, רכב: 10 };
const N = Object.values(TRANSPORT).reduce((s, x) => s + x, 0);

export default {
  id: 'g7-relative-frequency',
  grade: 7,
  emoji: '🥧',
  title: 'שכיחות יחסית',
  reminder: [
    {
      title: 'שכיחות יחסית',
      md: m`השכיחות **חלקי** מספר הנתונים — איזה **חלק** מכל הנתונים.

$6$ מתוך $24$: $\;\frac{6}{24} = \frac{1}{4} = 25\%$`,
    },
    {
      title: 'סכום',
      md: m`סכום כל השכיחויות היחסיות $= 1$, כלומר $100\%$.`,
    },
  ],
  pages: [
    {
      title: 'חישוב שכיחות יחסית',
      exercises: [
        {
          title: m`איך $${N}$ תלמידים מגיעים לבית הספר?`,
          cols: 1,
          items: Object.entries(TRANSPORT).map(([k, f]) => rel(k, f, N)),
        },
        { title: 'בדיקה.', cols: 1, items: [{ q: 'סכום האחוזים בטבלה:', a: m`[[100]] $\%$` }] },
      ],
    },
    {
      title: 'מאחוזים לשכיחויות',
      exercises: [
        { title: 'כמה תלמידים?', cols: 2, items: [fromPercent(25, 40), fromPercent(10, 30), fromPercent(50, 26), fromPercent(20, 35), fromPercent(75, 16), fromPercent(5, 60)] },
        {
          title: 'השוו.',
          cols: 1,
          items: [
            { q: m`בכיתה א׳ $12$ מתוך $30$ אוהבים מתמטיקה; בכיתה ב׳ $10$ מתוך $20$. איפה השכיחות היחסית גבוהה יותר?`, options: ['כיתה א׳', 'כיתה ב׳', 'שוות'], answer: 12 / 30 > 10 / 20 ? 0 : 12 / 30 < 10 / 20 ? 1 : 2 },
            { q: m`$9$ מתוך $36$ לעומת $5$ מתוך $20$:`, options: ['הראשון גבוה יותר', 'השני גבוה יותר', 'שוות'], answer: 9 / 36 > 5 / 20 ? 0 : 9 / 36 < 5 / 20 ? 1 : 2 },
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('שכיחות יחסית יכולה להיות גדולה מ-1.', false), tf(m`שכיחות $5$ מתוך $50$ היא $10\%$.`, (5 / 50) * 100 === 10)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'שכיחות יחסית.', cols: 1, items: [rel('אוהבים שוקולד', 18, 24), rel('יש להם כלב', 7, 20)] },
      { title: 'כמה?', cols: 2, items: [fromPercent(30, 50), fromPercent(40, 25)] },
    ],
  },
};
