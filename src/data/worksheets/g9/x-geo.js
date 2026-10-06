import { m, triangleFig } from '../helpers.js';
import { approx, tf } from './shared.js';

const rect = (a, b) => ({ q: m`מלבן $${a} \times ${b}$`, a: m`שטח: [[${a * b}]] $\qquad$ היקף: [[${2 * (a + b)}]]` });
const tri = (b, h) => ({ q: m`משולש: בסיס $${b}$, גובה $${h}$. השטח: [[${(b * h) / 2}]]` });
const triFig = (b, h, apex) => ({ q: '', figure: triangleFig({ base: b, height: h, apex }), a: m`שטח: [[${(b * h) / 2}]]` });

function hyp(a, b) {
  const c = Math.sqrt(a * a + b * b);
  return { q: m`ניצבים $${a}$ ו-$${b}$. היתר:`, a: Number.isInteger(c) ? `[[${c}]]` : approx(c) };
}
const leg = (c, a) => ({ q: m`יתר $${c}$, ניצב $${a}$. הניצב השני: [[${Math.sqrt(c * c - a * a)}]]` });

export default {
  id: 'g9x-geo',
  grade: 9,
  emoji: '📐',
  title: 'גאומטריה בסיסית',
  reminder: [
    {
      title: 'שטח והיקף',
      md: m`**מלבן**: שטח $=$ אורך $\times$ רוחב, היקף $= 2 \times$ (אורך $+$ רוחב)
**משולש**: שטח $=$ בסיס $\times$ גובה $: 2$`,
    },
    {
      title: 'משפט פיתגורס',
      md: m`במשולש **ישר-זווית**: $a^2 + b^2 = c^2$ ($c$ — היתר, מול הזווית הישרה).

$3, 4$ ← $c = \sqrt{9 + 16} = 5$`,
    },
  ],
  pages: [
    {
      title: 'שטחים והיקפים',
      exercises: [
        { title: 'מלבן.', cols: 2, items: [rect(8, 5), rect(12, 3), rect(7, 7), rect(10, 4.5)] },
        { title: 'משולש.', cols: 2, items: [tri(10, 6), tri(8, 7), tri(15, 4)] },
        { title: 'לפי השרטוט.', cols: 3, items: [triFig(12, 5, 0.4), triFig(8, 6, 0)] },
        {
          title: 'בעיות.',
          cols: 1,
          items: [
            { q: m`חדר מלבני $5 \times 4$ מטרים. כמה מ״ר ריצוף צריך?`, a: m`[[20]] מ״ר` },
            { q: m`גדר סביב גינה מלבנית $12 \times 8$ מטרים. כמה מטרים גדר צריך?`, a: m`[[40]] מ׳` },
          ],
        },
      ],
    },
    {
      title: 'פיתגורס',
      exercises: [
        { title: 'מצאו את היתר.', cols: 2, items: [hyp(3, 4), hyp(6, 8), hyp(5, 12), hyp(1, 2)] },
        { title: 'מצאו את הניצב.', cols: 2, items: [leg(10, 6), leg(13, 12), leg(5, 4)] },
        {
          title: 'בעיות.',
          cols: 1,
          items: [
            { q: m`סולם באורך $10$ מ׳ נשען על קיר, ורגלו $6$ מ׳ מהקיר. לאיזה גובה מגיע?`, a: m`[[8]] מ׳` },
            { q: m`מסך $16 \times 12$ אינץ׳. מה אורך האלכסון?`, a: m`[[20]] אינץ׳` },
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('משפט פיתגורס נכון בכל משולש.', false), tf('היתר הוא הצלע הארוכה ביותר במשולש ישר-זווית.', true)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'שטח והיקף.', cols: 1, items: [rect(9, 6), tri(14, 5)] },
      { title: 'פיתגורס.', cols: 2, items: [hyp(9, 12), leg(17, 8)] },
    ],
  },
};
