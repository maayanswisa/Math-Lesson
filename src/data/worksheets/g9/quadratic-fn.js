import { m, coordPlane } from '../helpers.js';
import { exact, poly, roots, vertex, tf, factorTex } from './shared.js';

/** קודקוד מייצוג סטנדרטי. */
const vertexStd = (a, b, c) => {
  const [p, q] = vertex(a, b, c);
  return { q: m`$y = ${poly([a, b, c])}$`, a: m`קודקוד: $($ ${exact(p)} $,\,$ ${exact(q)} $)$` };
};

/** קודקוד מייצוג קודקודי y = a(x - p)² + q. */
const vertexForm = (a, p, q) => ({
  q: m`$y = ${a === 1 ? '' : a === -1 ? '-' : a}${factorTex(p)}^2 ${q < 0 ? '-' : '+'} ${Math.abs(q)}$`,
  a: m`קודקוד: $($ [[${p}]] $,\,$ [[${q}]] $)$`,
});

const MINMAX = ['מינימום', 'מקסימום'];
const kind = (a, b, c) => ({ q: m`$y = ${poly([a, b, c])}$ — לקודקוד יש...`, options: MINMAX, answer: a > 0 ? 0 : 1 });

/** חיתוכים עם הצירים. */
function axes(a, b, c) {
  const r = roots(a, b, c);
  if (r.length !== 2) throw new Error('need two roots');
  return {
    q: m`$y = ${poly([a, b, c])}$`,
    a: m`ציר $y$: $(0,$ [[${c}]] $)$ $\qquad$ ציר $x$: $x_1 =$ ${exact(r[0])} $,\; x_2 =$ ${exact(r[1])} $\;(x_1 > x_2)$`,
  };
}

/** תחומי עלייה/ירידה. */
function monotone(a, b, c) {
  const [p] = vertex(a, b, c);
  const up = a > 0 ? '>' : '<';
  const down = a > 0 ? '<' : '>';
  return { q: m`$y = ${poly([a, b, c])}$`, a: m`עולה: $x$ [[i:${up}]] ${exact(p)} $\qquad$ יורדת: $x$ [[i:${down}]] ${exact(p)}` };
}

/** מייצוג קודקודי לסטנדרטי: a(x - p)² + q = ax² + bx + c. */
const expand = (a, p, q) => ({
  q: m`$y = ${a === 1 ? '' : a}${factorTex(p)}^2 ${q < 0 ? '-' : '+'} ${Math.abs(q)}$`,
  a: m`$y =$ [[${a}]] $x^2 +$ [[${-2 * a * p}]] $x +$ [[${a * p * p + q}]]`,
});

const graph = (a, b, c) => {
  const [p, q] = vertex(a, b, c);
  return {
    q: '',
    figure: coordPlane({ lines: [], points: [{ x: p, y: q, label: '' }] }).replace('</svg>', parabolaPath(a, b, c) + '</svg>'),
    a: m`קודקוד: $($ [[${p}]] $,\,$ [[${q}]] $)$ $\qquad$ חיתוך עם ציר $y$: [[${c}]]`,
  };
};

/** פרבולה כ-polyline באותה מערכת צירים של coordPlane (u = 19, pad = 16, טווח -6..6). */
function parabolaPath(a, b, c) {
  const X = (x) => 16 + (x + 6) * 19;
  const Y = (y) => 16 + (6 - y) * 19;
  const pts = [];
  for (let x = -6; x <= 6.001; x += 0.1) {
    const y = a * x * x + b * x + c;
    if (y >= -6.5 && y <= 6.5) pts.push(`${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
  }
  return `<polyline points="${pts.join(' ')}" fill="none" stroke="#c45c48" stroke-width="2.4"/>`;
}

export default {
  id: 'g9r-quadratic-fn',
  grade: 9,
  emoji: '🌈',
  title: 'הפונקציה הריבועית',
  reminder: [
    {
      title: 'שני ייצוגים',
      md: m`**סטנדרטי**: $y = ax^2 + bx + c$ — ציר הסימטריה $x = -\frac{b}{2a}$
**קודקודי**: $y = a(x - p)^2 + q$ — הקודקוד $(p, q)$`,
    },
    {
      title: 'צורת הפרבולה',
      md: m`$a > 0$ — פותחת **למעלה**, לקודקוד **מינימום** ($\cup$)
$a < 0$ — פותחת **למטה**, לקודקוד **מקסימום** ($\cap$)`,
    },
    {
      title: 'חיתוכים ומונוטוניות',
      wide: true,
      md: m`ציר $y$: מציבים $x = 0$ ← $(0, c)$. ציר $x$: פותרים $y = 0$.

$y = x^2 - 4x + 3$: קודקוד ב-$x = 2$, $y = -1$ ← יורדת כש-$x < 2$, עולה כש-$x > 2$.`,
    },
  ],
  pages: [
    {
      title: 'קודקוד וצורה',
      exercises: [
        { title: 'מצאו את הקודקוד.', cols: 2, items: [vertexStd(1, -4, 3), vertexStd(1, 6, 5), vertexStd(-1, 2, 3), vertexStd(2, -8, 1), vertexStd(-2, -4, 6), vertexStd(1, 0, -9)] },
        { title: 'מייצוג קודקודי.', cols: 2, items: [vertexForm(1, 3, -4), vertexForm(-2, -1, 5), vertexForm(1, 0, 7), vertexForm(3, 2, 0.5)] },
        { title: 'מינימום או מקסימום?', cols: 2, items: [kind(1, -2, 5), kind(-3, 6, 1), kind(-1, 0, 4), kind(0.5, 3, -2)] },
        { title: 'מייצוג קודקודי לסטנדרטי.', cols: 1, items: [expand(1, 2, -1), expand(1, -3, 4), expand(2, 1, -5)] },
      ],
    },
    {
      title: 'חיתוכים, עלייה וירידה, גרף',
      exercises: [
        { title: 'נקודות החיתוך עם הצירים.', cols: 1, items: [axes(1, -4, 3), axes(1, 2, -8), axes(-1, 1, 6), axes(2, -2, -12)] },
        { title: 'תחומי עלייה וירידה.', cols: 1, items: [monotone(1, -4, 3), monotone(-1, 6, 0), monotone(2, 4, -1)] },
        { title: 'לפי הגרף.', cols: 2, items: [graph(1, -2, -3), graph(-1, -2, 3)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf(m`לפרבולה $y = x^2 + 1$ אין נקודות חיתוך עם ציר $x$.`, true),
            tf(m`הפרבולה $y = -x^2 + 4$ פותחת למעלה.`, false),
            tf('ציר הסימטריה עובר דרך הקודקוד.', true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מצאו את הקודקוד.', cols: 2, items: [vertexStd(1, -6, 8), vertexForm(-1, 4, 2)] },
      { title: 'חיתוכים עם הצירים.', cols: 1, items: [axes(1, -1, -6)] },
      { title: 'תחומי עלייה וירידה.', cols: 1, items: [monotone(-1, -4, 1)] },
      { title: 'מייצוג קודקודי לסטנדרטי.', cols: 1, items: [expand(1, -2, 3)] },
    ],
  },
};
