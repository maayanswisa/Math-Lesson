import { m, lin } from '../helpers.js';
import { tf, at } from './shared.js';

const t = (x) => (x < 0 ? `-${-x}` : `${x}`);

/** ax + b = cx + d → x (חייב לצאת שלם, ונבדק בהצבה). */
function solve(a, b, c = 0, d = 0, { lhs, rhs } = {}) {
  const x = (d - b) / (a - c);
  if (!Number.isInteger(x)) throw new Error('solution must be whole');
  const L = lhs ?? lin(a, b);
  const R = rhs ?? (c === 0 ? String(d) : lin(c, d));
  if (at(L, { x }) !== at(R, { x })) throw new Error(`x = ${x} does not solve ${L} = ${R}`);
  return { q: m`$${L} = ${R}$`, a: m`$x =$ [[${x}]]` };
}

/** האם k פתרון של המשוואה? */
const isSolution = (L, R, k) => ({ q: m`האם $x = ${t(k)}$ פתרון של $${L} = ${R}$?`, options: ['כן', 'לא'], answer: at(L, { x: k }) === at(R, { x: k }) ? 0 : 1 });

/** איזה מהמספרים הוא הפתרון? */
function whichSolves(L, R, candidates) {
  const hits = candidates.filter((k) => at(L, { x: k }) === at(R, { x: k }));
  if (hits.length !== 1) throw new Error('exactly one candidate must solve');
  return { q: m`איזה מספר פותר את $${L} = ${R}$?`, options: candidates.map((k) => m`$${t(k)}$`), answer: candidates.indexOf(hits[0]) };
}

export default {
  id: 'g7-equations',
  grade: 7,
  emoji: '⚖️',
  title: 'משוואות ממעלה ראשונה',
  reminder: [
    {
      title: 'מהי משוואה?',
      md: m`שוויון עם נעלם. **פתרון** — מספר שכשמציבים אותו, שני האגפים שווים: $\;2x + 1 = 7$ ← $x = 3$ כי $2 \cdot 3 + 1 = 7$.`,
    },
    {
      title: 'פתרון כמו מאזניים',
      md: m`עושים **אותה פעולה בשני האגפים**:

$3x - 4 = 11 \;\xrightarrow{+4}\; 3x = 15 \;\xrightarrow{:3}\; x = 5$`,
    },
    {
      title: 'נעלם בשני האגפים',
      md: m`מעבירים את ה-$x$-ים לצד אחד ואת המספרים לצד השני:

$5x + 2 = 2x + 14 \;\Rightarrow\; 3x = 12 \;\Rightarrow\; x = 4$`,
    },
  ],
  pages: [
    {
      title: 'זיהוי ופתרון פשוט',
      exercises: [
        { title: 'האם זה פתרון?', cols: 1, items: [isSolution('2x + 1', '7', 3), isSolution('5x - 4', '10', 2), isSolution('3x + 8', 'x', -4)] },
        { title: 'בחרו את הפתרון.', cols: 1, items: [whichSolves('4x - 3', '13', [2, 4, 5]), whichSolves('10 - x', '2x + 1', [3, -3, 4])] },
        { title: 'פתרו.', cols: 2, items: [solve(1, 7, 0, 15), solve(3, 0, 0, 21), solve(2, -5, 0, 9), solve(-4, 0, 0, 28), solve(5, 3, 0, -12), solve(-1, 6, 0, 2)] },
      ],
    },
    {
      title: 'נעלם בשני האגפים וסוגריים',
      exercises: [
        { title: 'פתרו.', cols: 2, items: [solve(5, 2, 2, 14), solve(7, -3, 4, 9), solve(2, 10, 6, -2), solve(-3, 4, 1, -12)] },
        {
          title: 'פתחו סוגריים ופתרו.',
          cols: 1,
          items: [
            solve(3, 6, 0, 21, { lhs: '3(x + 2)' }),
            solve(10, -4, 6, 4, { lhs: '2(5x - 2)', rhs: '6x + 4' }),
            solve(-2, 13, 1, 1, { lhs: '7 - 2(x - 3)', rhs: 'x + 1' }),
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`$x = 0$ הוא פתרון של $3x = 0$.`, at('3x', { x: 0 }) === 0), tf(m`אם $x + 5 = 2$, אז $x = 7$.`, false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'האם זה פתרון?', cols: 1, items: [isSolution('6 - 2x', '10', -2)] },
      { title: 'פתרו.', cols: 2, items: [solve(4, -7, 0, 13), solve(-5, 0, 0, 35), solve(8, 1, 3, 26)] },
      { title: 'פתחו סוגריים ופתרו.', cols: 1, items: [solve(4, 3, 1, 15, { lhs: '4(x - 1) + 7', rhs: 'x + 15' })] },
    ],
  },
};
