import { m, ineqItem } from '../helpers.js';
import { poly, roots, tf } from './shared.js';

/**
 * אי-שוויון ריבועי ax² + bx + c (sign) 0 עם שני שורשים.
 * "בין השורשים" — שורה אחת r2 < x < r1; "מחוץ" — x < r2 או x > r1.
 */
function quadIneq(a, b, c, sign) {
  const [r1, r2] = roots(a, b, c);
  if (r2 == null) throw new Error('need two roots');
  const negativeBetween = a > 0; // פרבולה פותחת למעלה — שלילית בין השורשים
  const wantNegative = sign === '<' || sign === '≤';
  const strict = sign === '<' || sign === '>';
  const tex = m`$${poly([a, b, c])} ${sign === '≤' ? '\\le' : sign === '≥' ? '\\ge' : sign} 0$`;
  if (negativeBetween === wantNegative) {
    const s = strict ? '<' : '\\le';
    return { q: tex, a: m`[[${r2}]] $${s} x ${s}$ [[${r1}]]` };
  }
  return { q: tex, a: m`$x$ [[i:${strict ? '<' : '≤'}]] [[${r2}]] $\;$ או $\;x$ [[i:${strict ? '>' : '≥'}]] [[${r1}]]` };
}

export default {
  id: 'g9r-inequalities',
  grade: 9,
  emoji: '⚖️',
  title: 'אי-שוויונות',
  reminder: [
    {
      title: 'אי-שוויון לינארי',
      md: m`פותרים כמו משוואה. **כפל/חילוק במספר שלילי — הופכים את הסימן**: $\;-2x > 6 \Rightarrow x < -3$`,
    },
    {
      title: 'אי-שוויון ריבועי',
      md: m`1. פותרים את המשוואה $= 0$ (השורשים)
2. מסתכלים על הפרבולה: $a > 0$ פותחת למעלה — **שלילית בין השורשים**, חיובית מחוץ להם

$x^2 - 5x + 6 < 0$: שורשים $2, 3$ ← $\;2 < x < 3$`,
    },
    {
      title: 'שימו לב',
      md: m`$x^2 - 4 > 0$ ← **מחוץ** לשורשים: $\;x < -2$ **או** $x > 2$.

כש-$a < 0$ (פותחת למטה) — הכול מתהפך: חיובית **בין** השורשים.`,
    },
  ],
  pages: [
    {
      title: 'אי-שוויונות לינאריים',
      exercises: [
        {
          title: 'פתרו.',
          cols: 1,
          items: [
            ineqItem(3, -4, '>', 0, 11),
            ineqItem(-2, 0, '≤', 0, 10),
            ineqItem(5, 2, '<', 2, 14),
            ineqItem(-4, 1, '≥', 1, -9, { lhs: '1 - 4x' }),
            ineqItem(0.5, 3, '>', 0, 1, { lhs: '\\frac{x}{2} + 3' }),
            ineqItem(6, -6, '≤', 4, 0, { lhs: '3(2x - 2)' }),
          ],
        },
      ],
    },
    {
      title: 'אי-שוויונות ריבועיים',
      exercises: [
        {
          title: 'פתרו (מספר שלילי — עם מינוס).',
          cols: 1,
          items: [quadIneq(1, -5, 6, '<'), quadIneq(1, 0, -4, '>'), quadIneq(1, -2, -8, '≤'), quadIneq(1, 1, -6, '≥'), quadIneq(-1, 0, 9, '>'), quadIneq(1, -4, 0, '<')],
        },
        {
          title: 'בחרו.',
          cols: 1,
          items: [
            { q: m`מתי $x^2 + 1 > 0$?`, options: ['לכל x', 'אף פעם', 'רק כש-x > 0'], answer: 0 },
            { q: m`מתי $x^2 < 0$?`, options: ['לכל x', 'אף פעם', 'רק כש-x < 0'], answer: 1 },
            { q: m`$(x - 3)^2 \le 0$ — כמה פתרונות?`, options: ['אין', 'אחד (x = 3)', 'אינסוף'], answer: 1 },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf(m`אם $x^2 > 9$ אז $x > 3$.`, false), tf(m`פרבולה שפותחת למטה חיובית בין השורשים שלה.`, true)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'פתרו.', cols: 1, items: [ineqItem(-3, 5, '<', 0, 20), ineqItem(2, 1, '≥', 5, -8)] },
      { title: 'פתרו.', cols: 1, items: [quadIneq(1, -3, -10, '<'), quadIneq(1, 0, -25, '≥'), quadIneq(-1, 2, 3, '≤')] },
    ],
  },
};
