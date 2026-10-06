import { m, num, round } from '../helpers.js';
import { exact, tf } from './shared.js';

/** חוקי חזקות: מוצאים את המעריך n. */
const expo = (tex, n) => ({ q: m`$${tex} = a^n \qquad n =$ [[${n}]]` });
const value = (tex, v) => ({ q: m`$${tex} =$ ${exact(v)}` });

/** כתיב מדעי: x = d × 10^n. */
function sci(x) {
  const n = Math.floor(Math.log10(Math.abs(x)));
  const d = round(x / 10 ** n);
  return { q: m`$${num(x)} = d \times 10^n$`, a: m`$d =$ [[${d}]] $\qquad n =$ [[${n}]]` };
}
const fromSci = (d, n) => ({ q: m`$${d} \times 10^{${n}} =$ [[${round(d * 10 ** n, 10)}]]` });

/** √(k²·r) = k√r */
const simplifyRoot = (n, k, r) => {
  if (k * k * r !== n) throw new Error('bad root');
  return { q: m`$\sqrt{${n}} =$ [[${k}]] $\sqrt{${r}}$` };
};

export default {
  id: 'g9r-powers',
  grade: 9,
  emoji: '⚡',
  title: 'חזקות ושורשים וכתיב מדעי',
  reminder: [
    {
      title: 'חוקי חזקות',
      md: m`$a^m \cdot a^n = a^{m+n}$ $\;\cdot\;$ $\frac{a^m}{a^n} = a^{m-n}$ $\;\cdot\;$ $(a^m)^n = a^{mn}$

$a^0 = 1$ $\;\cdot\;$ $a^{-n} = \frac{1}{a^n}$: $\;2^{-3} = \frac{1}{8}$`,
    },
    {
      title: 'כתיב מדעי',
      md: m`$d \times 10^n$ כש-$1 \le d < 10$:

$45{,}000 = 4.5 \times 10^4$ $\;\cdot\;$ $0.0032 = 3.2 \times 10^{-3}$`,
    },
    {
      title: 'שורשים',
      wide: true,
      md: m`$\sqrt{ab} = \sqrt{a}\sqrt{b}$ $\;\cdot\;$ $\sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}}$ (כש-$a, b \ge 0$)

הוצאה מהשורש: $\sqrt{50} = \sqrt{25 \cdot 2} = 5\sqrt{2}$. שימו לב: $(-3)^2 = 9$ אבל $-3^2 = -9$.`,
    },
  ],
  pages: [
    {
      title: 'חוקי חזקות',
      exercises: [
        {
          title: m`רשמו כחזקה אחת ומצאו את המעריך $n$.`,
          cols: 2,
          items: [
            expo('a^3 \\cdot a^4', 7),
            expo('\\frac{a^9}{a^4}', 5),
            expo('(a^2)^5', 10),
            expo('a^5 \\cdot a^{-2}', 3),
            expo('\\frac{a^2}{a^6}', -4),
            expo('(a^{-3})^2', -6),
          ],
        },
        {
          title: 'חשבו (אפשר לכתוב שבר, למשל 1/8).',
          cols: 2,
          items: [
            value('2^{-3}', 1 / 8),
            value('5^0', 1),
            value('(-3)^2', 9),
            value('-3^2', -9),
            value('10^{-2}', 0.01),
            value('\\left(\\frac{1}{2}\\right)^{-2}', 4),
            value('4^{-1} + 4^0', 1.25),
            value('\\frac{2^5 \\cdot 2^3}{2^6}', 4),
          ],
        },
      ],
    },
    {
      title: 'כתיב מדעי ושורשים',
      exercises: [
        { title: 'רשמו בכתיב מדעי.', cols: 2, items: [sci(45000), sci(0.0032), sci(6700000), sci(0.5), sci(908), sci(0.00071)] },
        { title: 'רשמו כמספר רגיל.', cols: 2, items: [fromSci(3, 4), fromSci(2.5, -2), fromSci(7.1, 6), fromSci(4, -3)] },
        {
          title: 'חשבו בכתיב מדעי.',
          cols: 1,
          items: [
            { q: m`$(3 \times 10^4)(2 \times 10^5) = d \times 10^n$`, a: m`$d =$ [[6]] $\qquad n =$ [[9]]` },
            { q: m`$\frac{8 \times 10^7}{2 \times 10^3} = d \times 10^n$`, a: m`$d =$ [[4]] $\qquad n =$ [[4]]` },
          ],
        },
        { title: 'הוציאו מהשורש.', cols: 2, items: [simplifyRoot(50, 5, 2), simplifyRoot(72, 6, 2), simplifyRoot(12, 2, 3), simplifyRoot(45, 3, 5)] },
        {
          title: 'חשבו.',
          cols: 2,
          items: [value('\\sqrt{4 \\cdot 9}', 6), value('\\sqrt{12} \\cdot \\sqrt{3}', 6), value('\\frac{\\sqrt{18}}{\\sqrt{2}}', 3), value('\\sqrt{\\frac{16}{25}}', 0.8)],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf(m`$\sqrt{9 + 16} = \sqrt{9} + \sqrt{16}$`, false), tf(m`$a^{-2}$ תמיד שלילי.`, false), tf(m`$2^{10} > 10^3$`, 2 ** 10 > 1000)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: m`מצאו את $n$.`, cols: 2, items: [expo('a^4 \\cdot a^{-7}', -3), expo('(a^3)^4', 12)] },
      { title: 'חשבו.', cols: 2, items: [value('3^{-2}', 1 / 9), value('7^0 - 2^{-1}', 0.5)] },
      { title: 'כתיב מדעי.', cols: 2, items: [sci(380000), sci(0.006)] },
      { title: 'הוציאו מהשורש.', cols: 1, items: [simplifyRoot(98, 7, 2)] },
    ],
  },
};
