import { m, coordPlane } from '../helpers.js';
import { tf } from './shared.js';

const t = (x) => (x < 0 ? `-${-x}` : `${x}`);

/** טבלה: האם היא מתארת פונקציה (לכל x — y אחד)? */
function isFunction(pairs) {
  const seen = new Map();
  const ok = pairs.every(([x, y]) => (seen.has(x) ? seen.get(x) === y : (seen.set(x, y), true)));
  return {
    q: m`$${pairs.map(([x, y]) => `(${t(x)}, ${t(y)})`).join(',\\; ')}$`,
    options: ['פונקציה', 'לא פונקציה'],
    answer: ok ? 0 : 1,
  };
}

/** ערכי פונקציה לפי כלל: f(x) = a·x + b. */
const values = (a, b, xs) => {
  const rule = `${a === 1 ? '' : a === -1 ? '-' : a}x${b ? (b > 0 ? ` + ${b}` : ` - ${-b}`) : ''}`;
  return { q: m`$f(x) = ${rule}$: ` + xs.map((x) => m`$f(${t(x)}) =$ [[${a * x + b}]]`).join(' $\\;$ ') };
};

/** קריאה מגרף של y = x/2 + 1 (קו ישר). */
const GRAPH = coordPlane({ min: -6, max: 6, lines: [{ m: 0.5, b: 1 }] });
const readGraph = (x) => ({ q: m`לפי הגרף, $f(${t(x)}) =$`, a: `[[${x / 2 + 1}]]` });

export default {
  id: 'g7-functions-intro',
  grade: 7,
  emoji: '🔁',
  title: 'מבוא לפונקציות',
  reminder: [
    {
      title: 'מהי פונקציה?',
      md: m`כלל שמתאים **לכל** $x$ ערך **אחד בלבד** של $y$. $\;$ $(1, 3), (2, 5), (3, 7)$ — פונקציה. $\;$ $(1, 3), (1, 4)$ — לא: ל-$x = 1$ שני ערכים.`,
    },
    {
      title: 'ייצוגים',
      md: m`**מילולי**: "כפול $2$ ועוד $1$" · **אלגברי**: $f(x) = 2x + 1$ · **טבלה** · **גרף**

$f(3)$ — הערך של הפונקציה כש-$x = 3$: $\;f(3) = 2 \cdot 3 + 1 = 7$`,
    },
  ],
  pages: [
    {
      title: 'פונקציה או לא?',
      exercises: [
        { title: 'האם הזוגות מתארים פונקציה?', cols: 1, items: [isFunction([[1, 3], [2, 5], [3, 7]]), isFunction([[1, 3], [1, 4], [2, 5]]), isFunction([[-1, 2], [0, 2], [1, 2]]), isFunction([[4, 1], [5, 2], [4, 1]])] },
        {
          title: 'בחרו.',
          cols: 1,
          items: [
            { q: 'לכל תלמיד בכיתה מתאימים את תאריך הלידה שלו. האם זו פונקציה?', options: ['כן', 'לא'], answer: 0 },
            { q: 'לכל תאריך מתאימים את התלמיד שנולד בו. האם זו בהכרח פונקציה?', options: ['כן', 'לא'], answer: 1 },
          ],
        },
      ],
    },
    {
      title: 'ערכים וגרפים',
      exercises: [
        { title: 'חשבו ערכים.', cols: 1, items: [values(2, 1, [0, 3, -2]), values(-1, 5, [1, 5, -4]), values(3, -4, [2, 0, -1])] },
        { title: 'קראו מהגרף.', cols: 2, figure: GRAPH, items: [readGraph(0), readGraph(2), readGraph(4), readGraph(-4)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`אם $f(x) = x^2$, אז $f(-3) = -9$.`, (-3) ** 2 === -9), tf('בפונקציה, לשני ערכי x שונים יכול להיות אותו y.', true)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'פונקציה או לא?', cols: 1, items: [isFunction([[2, 0], [3, 0], [2, 1]]), isFunction([[0, 5], [1, 6], [2, 7]])] },
      { title: 'חשבו.', cols: 1, items: [values(4, -3, [1, 0, -2])] },
      { title: 'מהגרף.', cols: 2, figure: GRAPH, items: [readGraph(-2), readGraph(6)] },
    ],
  },
};
