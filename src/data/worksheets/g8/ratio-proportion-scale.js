import { m, num, gcd, round } from '../helpers.js';

/** צמצום יחס a:b עד הסוף. */
function simplify(a, b) {
  const g = gcd(a, b);
  if (g === 1) throw new Error('already simplest');
  return { q: m`$${num(a)} : ${num(b)} =$ [[${a / g}]] $:$ [[${b / g}]]` };
}

/** חלוקת כמות ביחס a:b. */
function divide(total, a, b, what, unit) {
  const part = total / (a + b);
  if (!Number.isInteger(part)) throw new Error('not whole');
  return {
    q: m`מחלקים $${num(total)}$ ${what} ביחס $${a} : ${b}$.`,
    a: m`חלק ראשון: [[${a * part}]] ${unit} $\qquad$ חלק שני: [[${b * part}]] ${unit}`,
  };
}

/** פרופורציה a/b = c/d עם נעלם במקום אחד (index). */
function proportion(vals, index) {
  const [a, b, c, d] = vals;
  if (a * d !== b * c) throw new Error('not a proportion');
  const shown = vals.map((v, i) => (i === index ? 'x' : v));
  return { q: m`$\frac{${shown[0]}}{${shown[1]}} = \frac{${shown[2]}}{${shown[3]}} \qquad x =$ [[${vals[index]}]]` };
}

/** קנה מידה 1:n — ס״מ במפה ↔ ק״מ/מטרים במציאות. */
const mapToReal = (n, cm, unit) => {
  const realCm = n * cm;
  const value = unit === 'ק״מ' ? round(realCm / 100000) : round(realCm / 100);
  return { q: m`במפה בקנה מידה $1 : ${num(n)}$, מרחק של $${cm}$ ס״מ`, a: m`במציאות: [[${value}]] ${unit}` };
};
const realToMap = (n, km) => ({
  q: m`בקנה מידה $1 : ${num(n)}$, מרחק של $${km}$ ק״מ במציאות`,
  a: m`במפה: [[${round((km * 100000) / n)}]] ס״מ`,
});

export default {
  id: 'g8-ratio-proportion-scale',
  grade: 8,
  emoji: '🗺️',
  title: 'יחס, פרופורציה וקנה מידה',
  reminder: [
    {
      title: 'יחס',
      md: m`יחס משווה בין כמויות: $12 : 18$. אפשר **לצמצם** (מחלקים את שני הצדדים באותו מספר): $12 : 18 = 2 : 3$.

**חלוקה ביחס $2 : 3$** של $60$: יש $2 + 3 = 5$ חלקים, כל חלק $12$ ← $24$ ו-$36$.`,
    },
    {
      title: 'פרופורציה',
      md: m`שוויון בין שני יחסים: $\frac{a}{b} = \frac{c}{d}$ ← **כפל בהצלבה**: $a \cdot d = b \cdot c$

$\frac{x}{4} = \frac{15}{20} \Rightarrow 20x = 60 \Rightarrow x = 3$`,
    },
    {
      title: 'קנה מידה',
      md: m`$1 : 50{,}000$ ← כל $1$ ס״מ במפה הוא $50{,}000$ ס״מ $= 500$ מ׳ במציאות.

$1$ מ׳ $= 100$ ס״מ · $1$ ק״מ $= 100{,}000$ ס״מ`,
    },
    {
      title: 'יחס ישר והפוך',
      md: m`**ישר**: פי $2$ עבודה ← פי $2$ זמן (המנה קבועה).
**הפוך**: פי $2$ פועלים ← חצי מהזמן (המכפלה קבועה).`,
    },
  ],
  pages: [
    {
      title: 'יחס ופרופורציה',
      exercises: [
        { title: 'צמצמו את היחס עד הסוף.', cols: 2, items: [simplify(12, 18), simplify(25, 10), simplify(8, 32), simplify(45, 60), simplify(14, 21), simplify(100, 250)] },
        {
          title: 'חלקו ביחס הנתון.',
          cols: 1,
          items: [divide(60, 2, 3, 'ש״ח', 'ש״ח'), divide(48, 5, 3, 'סוכריות', 'סוכריות'), divide(1000, 1, 4, 'גרם', 'גרם')],
        },
        {
          title: 'פתרו את הפרופורציה.',
          cols: 2,
          items: [proportion([3, 4, 15, 20], 0), proportion([2, 5, 8, 20], 3), proportion([6, 9, 4, 6], 1), proportion([7, 2, 21, 6], 2)],
        },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            { q: m`היחס בין מספר הבנים למספר הבנות בכיתה הוא $3 : 4$. בכיתה $28$ תלמידים. כמה בנים בכיתה?`, a: m`[[${(28 / 7) * 3}]] בנים` },
            { q: m`במתכון: $2$ כוסות קמח לכל $3$ ביצים. כמה כוסות קמח צריך ל-$12$ ביצים?`, a: m`[[${(12 / 3) * 2}]] כוסות` },
          ],
        },
      ],
    },
    {
      title: 'קנה מידה, יחס ישר ויחס הפוך',
      exercises: [
        {
          title: 'מהמפה למציאות.',
          cols: 1,
          items: [mapToReal(50000, 3, 'ק״מ'), mapToReal(100000, 7, 'ק״מ'), mapToReal(200, 5, 'מ׳'), mapToReal(25000, 8, 'ק״מ')],
        },
        { title: 'מהמציאות למפה.', cols: 1, items: [realToMap(50000, 2), realToMap(100000, 15), realToMap(200000, 9)] },
        {
          title: 'יחס ישר או הפוך? פתרו.',
          cols: 1,
          items: [
            { q: m`$3$ מחברות עולות $18$ ש״ח. כמה עולות $7$ מחברות?`, a: m`[[${(18 / 3) * 7}]] ש״ח` },
            { q: m`$3$ פועלים מסיימים עבודה ב-$12$ ימים. בכמה ימים יסיימו אותה $4$ פועלים (באותו קצב)?`, a: m`[[${(3 * 12) / 4}]] ימים` },
            { q: m`מכונית נוסעת $240$ ק״מ ב-$3$ שעות. כמה ק״מ תיסע ב-$5$ שעות באותה מהירות?`, a: m`[[${(240 / 3) * 5}]] ק״מ` },
            {
              q: m`בנסיעה במהירות $60$ קמ״ש הדרך נמשכת $2$ שעות. כמה זמן תימשך במהירות $80$ קמ״ש?`,
              a: m`[[${(60 * 2) / 80}]] שעות`,
            },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'צמצמו את היחס.', cols: 2, items: [simplify(36, 48), simplify(150, 90)] },
      { title: 'חלקו ביחס הנתון.', cols: 1, items: [divide(90, 4, 5, 'ש״ח', 'ש״ח')] },
      { title: 'פתרו את הפרופורציה.', cols: 1, items: [proportion([5, 8, 15, 24], 2)] },
      { title: 'קנה מידה.', cols: 1, items: [mapToReal(20000, 6, 'ק״מ'), realToMap(50000, 4)] },
      {
        title: 'יחס ישר או הפוך?',
        cols: 1,
        items: [{ q: m`$6$ ברזים ממלאים בריכה ב-$10$ שעות. בכמה שעות ימלאו אותה $4$ ברזים?`, a: m`[[${(6 * 10) / 4}]] שעות` }],
      },
    ],
  },
};
