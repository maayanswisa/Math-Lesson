import { m } from '../helpers.js';
import { exact, numDeriv, tf } from './shared.js';

/**
 * פריט פרמטר: f(a, x) עם נתון אחד. check(a) — האם הערך שבתשובה מקיים
 * את הנתון (נבדק מספרית בטעינה).
 */
function param(text, answer, check) {
  if (!check(answer)) throw new Error(`parameter ${answer} does not satisfy: ${text}`);
  return { q: text, a: m`$a =$ ${exact(answer)}` };
}

const near = (u, v) => Math.abs(u - v) < 1e-4;

/* נתון: נקודה על הגרף */
const point = (fTex, f, x0, y0, a) => param(m`הגרף של $f(x)=${fTex}$ עובר בנקודה $(${x0},${y0})$.`, a, (aa) => near(f(aa, x0), y0));
/* נתון: קיצון ב-x0 */
const extremum = (fTex, f, x0, a) => param(m`לפונקציה $f(x)=${fTex}$ יש נקודת קיצון ב-$x=${x0}$.`, a, (aa) => near(numDeriv((x) => f(aa, x), x0), 0));
/* נתון: שיפוע משיק */
const slope = (fTex, f, x0, s, a) => param(m`שיפוע המשיק לגרף $f(x)=${fTex}$ ב-$x=${x0}$ הוא $${s}$.`, a, (aa) => near(numDeriv((x) => f(aa, x), x0), s));

export default {
  id: 'g11-u4-rational-params',
  grade: 11,
  emoji: '🔑',
  title: 'חדו״א עם פרמטרים',
  reminder: [
    {
      title: 'כל נתון — משוואה',
      md: m`נקודה $(x_0,y_0)$ ← $f(x_0)=y_0$ · קיצון ב-$x_0$ ← $f'(x_0)=0$ · שיפוע משיק $s$ ← $f'(x_0)=s$`,
    },
    {
      title: 'אסימפטוטות של שבר קווי',
      md: m`$\dfrac{ax+b}{cx+d}$: מאונכת $x=-\frac dc$, אופקית $y=\frac ac$.`,
    },
    {
      title: 'אחרי שמוצאים',
      md: 'מציבים את הפרמטר בחזרה, ובודקים שהנתון באמת מתקיים (למשל שבקיצון הנגזרת מחליפה סימן).',
    },
  ],
  pages: [
    {
      title: 'נקודה וקיצון',
      exercises: [
        {
          title: 'מצאו את $a$.',
          cols: 1,
          items: [
            point(m`\dfrac{a}{x-1}`, (a, x) => a / (x - 1), 3, 5, 10),
            point(m`\dfrac{ax+2}{x+1}`, (a, x) => (a * x + 2) / (x + 1), 1, 4, 6),
            point(m`\dfrac{x^2+a}{x}`, (a, x) => (x * x + a) / x, 2, 5, 6),
          ],
        },
        {
          title: 'מצאו את $a$ לפי נקודת הקיצון.',
          cols: 1,
          items: [
            extremum(m`x+\dfrac ax`, (a, x) => x + a / x, 4, 16),
            extremum(m`x^2+\dfrac ax`, (a, x) => x * x + a / x, 1, 2),
            extremum(m`\dfrac{x^2+a}{x-1}`, (a, x) => (x * x + a) / (x - 1), 3, 3),
          ],
        },
      ],
    },
    {
      title: 'משיק ואסימפטוטות',
      exercises: [
        {
          title: 'מצאו את $a$ לפי שיפוע המשיק.',
          cols: 1,
          items: [
            slope(m`\dfrac ax`, (a, x) => a / x, 3, -2, 18),
            slope(m`\dfrac{a}{x+1}`, (a, x) => a / (x + 1), 1, -1, 4),
            slope(m`\dfrac{ax}{x^2+1}`, (a, x) => (a * x) / (x * x + 1), 0, 3, 3),
          ],
        },
        {
          title: 'אסימפטוטות.',
          cols: 1,
          items: [
            { q: m`ל-$f(x)=\dfrac{ax+1}{x-2}$ אסימפטוטה אופקית $y=3$.`, a: m`$a =$ [[3]]` },
            { q: m`ל-$f(x)=\dfrac{3x+1}{x+b}$ אסימפטוטה מאונכת $x=5$.`, a: m`$b =$ [[-5]]` },
            { q: m`ל-$f(x)=\dfrac{ax+3}{2x-b}$ אסימפטוטות $x=4$ ו-$y=3$.`, a: m`$a =$ [[6]] $,\quad b =$ [[8]]` },
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`אם $f'(x_0)=0$, בהכרח יש קיצון ב-$x_0$.`, false), tf(m`משיק אופקי פירושו $f'(x_0)=0$.`, true)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      {
        title: 'מצאו את $a$.',
        cols: 1,
        items: [
          point(m`\dfrac{a}{x+2}`, (a, x) => a / (x + 2), 2, 3, 12),
          extremum(m`x+\dfrac ax`, (a, x) => x + a / x, 5, 25),
          slope(m`1+\dfrac ax`, (a, x) => 1 + a / x, 1, -2, 2),
        ],
      },
    ],
  },
};
