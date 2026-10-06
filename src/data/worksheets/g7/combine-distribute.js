import { m, lin } from '../helpers.js';
import { tf, at } from './shared.js';

/**
 * פישוט לצורה ax + b. התשובה נבדקת: הביטוי המקורי והתוצאה שווים
 * בהצבה של כמה ערכים (שני ערכים מספיקים לביטוי ממעלה ראשונה).
 */
function simplify(tex, a, b, v = 'x') {
  for (const x of [0, 1, 5, -3]) {
    const want = a * x + b;
    if (at(tex, { [v]: x }) !== want) throw new Error(`${tex} is not ${a}${v} + ${b}`);
  }
  const tail = b === 0 ? '' : b > 0 ? m` $+$ [[${b}]]` : m` $-$ [[${-b}]]`;
  return { q: m`$${tex} =$ [[${a}]] $${v}$${tail}` };
}

/** דומים או לא? */
const LIKE = ['דומים', 'לא דומים'];
const like = (p, q, isLike) => ({ q: m`$${p}$ ו-$${q}$`, options: LIKE, answer: isLike ? 0 : 1 });

/** פתיחת סוגריים: מה המקדם של x ומה המספר החופשי. */
const expand = (k, a, b) => simplify(m`${k < 0 ? `-${k === -1 ? '' : -k}` : k}(${lin(a, b)})`, k * a, k * b);

export default {
  id: 'g7-combine-distribute',
  grade: 7,
  emoji: '🧲',
  title: 'כינוס איברים דומים וחוק הפילוג',
  reminder: [
    {
      title: 'איברים דומים',
      md: m`אותו משתנה **באותה חזקה**: $3x$ ו-$-5x$ דומים; $3x$ ו-$3x^2$ — לא; $4$ ו-$-7$ (מספרים) — דומים.

מכנסים רק דומים: $\;5x + 3 - 2x + 4 = 3x + 7$`,
    },
    {
      title: 'חוק הפילוג',
      md: m`$a(b + c) = ab + ac$: $\;3(x + 4) = 3x + 12$

מינוס לפני סוגריים הופך את כל הסימנים: $\;-(x - 5) = -x + 5$, $\;-2(x - 3) = -2x + 6$`,
    },
  ],
  pages: [
    {
      title: 'כינוס',
      exercises: [
        { title: 'דומים או לא?', cols: 2, items: [like('3x', '-5x', true), like('2x', '2x^2', false), like('7', '-4', true), like('4y', '4x', false)] },
        { title: 'כנסו איברים דומים.', cols: 1, items: [simplify('5x + 3 - 2x + 4', 3, 7), simplify('x + x + x - 6', 3, -6), simplify('7 - 4x + 2x - 10', -2, -3), simplify('9a - 3 - 6a + 8', 3, 5, 'a'),simplify('-x + 2 + 5x', 4, 2)] },
      ],
    },
    {
      title: 'חוק הפילוג',
      exercises: [
        { title: 'פתחו סוגריים.', cols: 1, items: [expand(3, 1, 4), expand(5, 2, -1), expand(-2, 1, -3), expand(-1, 1, -5), expand(4, -3, 2)] },
        { title: 'פתחו וכנסו.', cols: 1, items: [simplify('2(x + 3) + 4x', 6, 6), simplify('5x - (x - 7)', 4, 7), simplify('3(x - 1) - 2(x + 4)', 1, -11), simplify('10 - 2(3 - x)', 2, 4)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`$3x + 2 = 5x$`, false), tf(m`$-(x + 4) = -x - 4$`, at('-(x + 4)', { x: 3 }) === -3 - 4)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'כנסו.', cols: 1, items: [simplify('4x - 9 + x + 2', 5, -7)] },
      { title: 'פתחו סוגריים.', cols: 1, items: [expand(-3, 2, -5)] },
      { title: 'פתחו וכנסו.', cols: 1, items: [simplify('4(x + 2) - 3x', 1, 8), simplify('7 - (2x - 3) + 5x', 3, 10)] },
    ],
  },
};
