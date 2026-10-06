import { m } from '../helpers.js';
import { tf, at } from './shared.js';

const t = (x) => (x < 0 ? `-${-x}` : `${x}`);

/** הצבה: הערך של הביטוי כש-x (ואולי y) נתונים. */
const subst = (tex, vals) => ({
  q: m`$${tex}$ כאשר $${Object.entries(vals).map(([k, v]) => `${k} = ${t(v)}`).join(',\\; ')}$:`,
  a: `[[${at(tex, vals)}]]`,
});

/** תרגום מילים לביטוי: בחירה. בודקים בהצבה שבדיוק אפשרות אחת שווה לביטוי הנכון. */
function translate(words, right, wrongs) {
  const probe = { x: 7, y: 3 };
  const options = [right, ...wrongs];
  const hits = options.filter((e) => at(e, probe) === at(right, probe));
  if (hits.length !== 1) throw new Error(`ambiguous options for "${words}"`);
  const shift = words.length % options.length;
  const rotated = [...options.slice(shift), ...options.slice(0, shift)];
  return { q: words, options: rotated.map((e) => `$${e}$`), answer: rotated.indexOf(right) };
}

/** טבלת הצבה: ערכי הביטוי לכמה ערכי x. */
const table = (tex, xs) => ({ q: m`$${tex}$: ` + xs.map((x) => m`$x = ${t(x)} \to$ [[${at(tex, { x })}]]`).join(' $\\;$ ') });

export default {
  id: 'g7-algebra-expr',
  grade: 7,
  emoji: '🔤',
  title: 'משתנים וביטויים אלגבריים',
  reminder: [
    {
      title: 'משתנה',
      md: m`אות ($x$, $y$, $n$...) שמייצגת מספר. $\;3x$ פירושו $3 \cdot x$, ו-$x^2$ פירושו $x \cdot x$.`,
    },
    {
      title: 'מילים לביטוי',
      md: m`"גדול מ-$x$ ב-$5$" ← $x + 5$ · "פי $3$ מ-$x$" ← $3x$ · "קטן מ-$x$ ב-$2$" ← $x - 2$ · "חצי מ-$x$" ← $\frac{x}{2}$`,
    },
    {
      title: 'הצבה',
      md: m`מחליפים את המשתנה במספר (שלילי — בסוגריים!) ומחשבים לפי סדר הפעולות:

$2x - 7$, $\;x = -3$: $\;2 \cdot (-3) - 7 = -13$`,
    },
  ],
  pages: [
    {
      title: 'בונים ביטויים',
      exercises: [
        {
          title: 'בחרו את הביטוי המתאים.',
          cols: 1,
          items: [
            translate(m`מספר גדול מ-$x$ ב-$8$`, 'x + 8', ['8x', 'x - 8']),
            translate(m`פי $4$ מ-$x$, פחות $1$`, '4x - 1', ['4(x - 1)', 'x + 4 - 1']),
            translate(m`סכום של $x$ ו-$y$, כפול $2$`, '2(x + y)', ['2x + y', 'x + 2y']),
            translate(m`ריבוע של $x$, ועוד $3$`, 'x^2 + 3', ['2x + 3', '(x + 3)^2']),
          ],
        },
        {
          title: 'כתבו ביטוי — ובדקו בהצבה.',
          cols: 1,
          items: [
            { q: m`לדני $x$ שקלים, ולרוני פי $3$ ועוד $10$. כמה לרוני, כש-$x = 20$?`, a: `[[${at('3x + 10', { x: 20 })}]]` },
            { q: m`היקף מלבן שצלעותיו $x$ ו-$x + 4$, כש-$x = 6$:`, a: `[[${at('2(x + x + 4)', { x: 6 })}]]` },
          ],
        },
      ],
    },
    {
      title: 'הצבה',
      exercises: [
        { title: 'הציבו וחשבו.', cols: 1, items: [subst('3x + 2', { x: 4 }), subst('2x - 7', { x: -3 }), subst('x^2 - 5', { x: 6 }), subst('5(x - 2)', { x: 1 }), subst('2x + 3y', { x: 5, y: -2 }), subst('xy - x', { x: 4, y: 3 })] },
        { title: 'השלימו את הטבלה.', cols: 1, items: [table('4x - 1', [0, 1, 2, -1]), table('x^2 + x', [1, 2, 3, -2])] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf(m`כאשר $x = 5$, $\;3x = 35$.`, at('3x', { x: 5 }) === 35),
            tf(m`כאשר $x = -2$, $\;x^2 = 4$.`, at('x^2', { x: -2 }) === 4),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'בחרו.', cols: 1, items: [translate(m`קטן מ-$x$ ב-$6$, כפול $5$`, '5(x - 6)', ['5x - 6', '6 - 5x'])] },
      { title: 'הציבו.', cols: 1, items: [subst('6 - 2x', { x: 4 }), subst('x^2 + 2x', { x: -3 }), subst('3x - y', { x: 2, y: 9 })] },
      { title: 'טבלה.', cols: 1, items: [table('2x + 5', [0, 3, -4])] },
    ],
  },
};
