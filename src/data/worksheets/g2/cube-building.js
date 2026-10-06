import { m } from '../helpers.js';
import { tf, cubeStackFig } from './shared.js';

/** כמה קוביות בתיבה l × w × h? */
const count = (l, w, h) => ({ q: '', figure: cubeStackFig(l, w, h), a: m`[[${l * w * h}]] קוביות` });

/** שכבות: כמה בשכבה וכמה שכבות. */
const layers = (l, w, h) => ({
  q: '',
  figure: cubeStackFig(l, w, h),
  a: m`בשכבה אחת: [[${l * w}]] · שכבות: [[${h}]] · סך הכול: [[${l * w * h}]]`,
});

const describe = (l, w, h) => ({ q: m`תיבה שבנויה מ-$${h}$ שכבות, ובכל שכבה $${l * w}$ קוביות. כמה קוביות בסך הכול?`, a: `[[${l * w * h}]]` });

export default {
  id: 'g2-cube-building',
  grade: 2,
  emoji: '🧱',
  title: 'בנייה מקוביות',
  reminder: [
    {
      title: 'סופרים בשכבות',
      md: m`תיבה בנויה מ**שכבות** זהות. סופרים כמה קוביות בשכבה אחת, וכופלים במספר השכבות:

שכבה של $3 \times 2 = 6$ קוביות, $2$ שכבות ← $6 \times 2 = 12$ קוביות.`,
    },
    {
      title: 'קוביות מוסתרות',
      md: 'בשרטוט לא רואים את כל הקוביות — חלקן מאחור. לכן עדיף לספור שורות ושכבות ולא כל קובייה בנפרד.',
    },
  ],
  pages: [
    {
      title: 'כמה קוביות?',
      exercises: [
        { title: 'כמה קוביות במבנה?', cols: 2, items: [count(3, 1, 1), count(2, 1, 3), count(3, 2, 1), count(2, 2, 2)] },
      ],
    },
    {
      title: 'שכבות',
      exercises: [
        { title: 'ספרו בשכבות.', cols: 1, items: [layers(3, 2, 2), layers(4, 2, 2), layers(2, 3, 3)] },
        { title: 'חשבו.', cols: 1, items: [describe(3, 3, 2), describe(5, 2, 3)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`קובייה גדולה של $2 \times 2 \times 2$ בנויה מ-$8$ קוביות קטנות.`, 2 * 2 * 2 === 8), tf('בשרטוט של מבנה תמיד רואים את כל הקוביות.', false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'כמה קוביות?', cols: 2, items: [count(4, 1, 2), count(3, 2, 2)] },
      { title: 'שכבות.', cols: 1, items: [describe(4, 2, 2)] },
    ],
  },
};
