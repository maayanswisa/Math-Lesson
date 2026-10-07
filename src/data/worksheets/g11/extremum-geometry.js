import { m } from '../helpers.js';
import { argExtreme, exact, tf } from './shared.js';

/** בעיית קיצון גאומטרית: x ו-value נבדקים מול חיפוש מספרי. */
function optimum(text, f, lo, hi, x, value, labels) {
  const found = argExtreme(f, lo, hi, 'max');
  if (Math.abs(found - x) > 1e-3 || Math.abs(f(x) - value) > 1e-6) throw new Error(`wrong optimum for: ${text}`);
  return { q: text, a: m`${labels[0]} $=$ ${exact(x)} $\;\cdot\;$ ${labels[1]} $=$ ${exact(value)}` };
}

/** מלבן חסום במשולש עם בסיס a וגובה h: גובה המלבן y, רוחב a(h−y)/h. */
const inTriangle = (a, h) =>
  optimum(m`משולש עם בסיס $${a}$ וגובה $${h}$, ומלבן חסום שבסיסו על בסיס המשולש.`, (y) => y * a * (h - y) / h, 0, h, h / 2, (a * h) / 4, ['גובה המלבן', 'השטח המקסימלי']);

export default {
  id: 'g11-u4-extremum-geometry',
  grade: 11,
  emoji: '📐',
  title: 'בעיות קיצון גאומטריות',
  reminder: [
    {
      title: 'דמיון משולשים',
      md: m`מלבן חסום במשולש (בסיס $a$, גובה $h$), גובה המלבן $y$: רוחבו $a\cdot\frac{h-y}{h}$. המקסימום — כש-$y=\frac h2$.`,
    },
    {
      title: 'פיתגורס ומעגל',
      md: m`מלבן חסום במעגל: האלכסון הוא קוטר. גזרה: היקף $2r+L$, שטח $\frac{rL}{2}$.`,
    },
    {
      title: 'טריק',
      md: m`כשיש שורש בשטח — גוזרים את **ריבוע** השטח (אותה נקודת מקסימום).`,
    },
  ],
  pages: [
    {
      title: 'משולשים ודמיון',
      exercises: [
        { title: 'מלבן חסום במשולש.', cols: 1, items: [inTriangle(12, 10), inTriangle(10, 6), inTriangle(8, 9)] },
        {
          title: 'במשולש ישר-זווית.',
          cols: 1,
          items: [
            optimum(m`ניצבים $8$ (אופקי) ו-$6$ (אנכי). מלבן עם קודקוד בזווית הישרה וקודקוד נגדי על היתר; רוחבו $x$.`, (x) => x * 6 * (1 - x / 8), 0, 8, 4, 12, ['x', 'השטח המקסימלי']),
            optimum(m`משולש ישר-זווית עם יתר $8$; ניצב אחד $x$.`, (x) => (x * Math.sqrt(64 - x * x)) / 2, 0, 8, Math.sqrt(32), 16, ['x', 'השטח המקסימלי']),
          ],
        },
      ],
    },
    {
      title: 'מעגלים ומלבנים',
      exercises: [
        {
          title: 'פתרו.',
          cols: 1,
          items: [
            optimum(m`מלבן חסום במעגל שרדיוסו $3$; צלע אחת $x$.`, (x) => x * Math.sqrt(36 - x * x), 0, 6, Math.sqrt(18), 18, ['x', 'השטח המקסימלי']),
            optimum(m`גזרה של מעגל שהיקפה $24$; רדיוס $r$.`, (r) => (r * (24 - 2 * r)) / 2, 0, 12, 6, 36, ['r', 'השטח המקסימלי']),
            optimum(m`מלבן בחצי מעגל שרדיוסו $6$ (בסיס על הקוטר); חצי הבסיס $x$.`, (x) => 2 * x * Math.sqrt(36 - x * x), 0, 6, Math.sqrt(18), 36, ['x', 'השטח המקסימלי']),
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('מבין כל המלבנים עם היקף נתון — לריבוע השטח הגדול ביותר.', true), tf('המלבן הגדול ביותר החסום במשולש תופס את כל שטח המשולש.', false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      {
        title: 'פתרו.',
        cols: 1,
        items: [
          inTriangle(14, 8),
          optimum(m`גזרה של מעגל שהיקפה $16$; רדיוס $r$.`, (r) => (r * (16 - 2 * r)) / 2, 0, 8, 4, 16, ['r', 'השטח המקסימלי']),
        ],
      },
    ],
  },
};
