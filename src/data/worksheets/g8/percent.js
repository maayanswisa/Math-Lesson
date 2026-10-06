import { m, num, round } from '../helpers.js';

const pctOf = (p, n) => ({ q: m`$${p}\%$ מ-$${num(n)}$ הם [[${round((p * n) / 100)}]]` });
const whole = (p, part) => ({ q: m`$${p}\%$ ממספר הם $${num(part)}$. המספר הוא [[${round((part * 100) / p)}]]` });
const whatPct = (part, n) => ({ q: m`$${num(part)}$ מתוך $${num(n)}$ הם [[${round((part / n) * 100)}]] $\%$` });
/** אחוז השינוי — התשובה הנכונה ושתי טעויות נפוצות (כיוון הפוך, הפרש במקום אחוז), בסדר מתחלף. */
const change = (from, to) => {
  const p = round(((to - from) / from) * 100);
  const up = p > 0 ? 'עלייה' : 'ירידה';
  const down = p > 0 ? 'ירידה' : 'עלייה';
  const options = [`${up} של ${Math.abs(p)}%`, `${down} של ${Math.abs(p)}%`, `${up} של ${Math.abs(to - from)}%`];
  const r = Math.abs(to - from) % 3;
  return {
    q: m`המחיר השתנה מ-$${num(from)}$ ל-$${num(to)}$ ש״ח.`,
    options: [...options.slice(r), ...options.slice(0, r)],
    answer: (3 - r) % 3,
  };
};
const afterDiscount = (price, p) => ({ q: m`מחיר $${num(price)}$ ש״ח, הנחה של $${p}\%$.`, a: m`מחיר אחרי ההנחה: [[${round(price * (1 - p / 100))}]] ש״ח` });
const afterRaise = (price, p) => ({ q: m`מחיר $${num(price)}$ ש״ח, התייקרות של $${p}\%$.`, a: m`מחיר חדש: [[${round(price * (1 + p / 100))}]] ש״ח` });
const factor = (p, up) => ({ q: m`${up ? 'עלייה' : 'ירידה'} של $${p}\%$ — כופלים ב-`, a: `[[${round(up ? 1 + p / 100 : 1 - p / 100)}]]` });

export default {
  id: 'g8-percent',
  grade: 8,
  emoji: '🏷️',
  title: 'אחוזים',
  reminder: [
    {
      title: 'שלוש שאלות בסיסיות',
      md: m`- **אחוז ממספר**: $20\%$ מ-$150$ $= 0.2 \times 150 = 30$
- **מציאת השלם**: $20\%$ ממספר הם $30$ ← $30 : 0.2 = 150$
- **כמה אחוזים**: $30$ מתוך $150$ ← $\frac{30}{150} = 0.2 = 20\%$`,
    },
    {
      title: 'הנחה והתייקרות',
      md: m`הנחה של $p\%$ ← כופלים ב-$(1 - \frac{p}{100})$: $\;$ הנחה $20\%$ ← $\times 0.8$
התייקרות של $p\%$ ← כופלים ב-$(1 + \frac{p}{100})$: $\;$ התייקרות $15\%$ ← $\times 1.15$`,
    },
    {
      title: 'אחוז השינוי',
      wide: true,
      md: m`**אחוז השינוי** = (השינוי : המחיר המקורי) $\times 100$

מ-$80$ ל-$100$: השינוי $20$, ו-$\frac{20}{80} = 25\%$ עלייה. **מחלקים תמיד במקורי!**`,
    },
  ],
  pages: [
    {
      title: 'אחוז, שלם ואחוזים',
      exercises: [
        { title: 'חשבו.', cols: 2, items: [pctOf(20, 150), pctOf(15, 80), pctOf(35, 200), pctOf(8, 250), pctOf(120, 50), pctOf(2.5, 400)] },
        { title: 'מצאו את השלם.', cols: 1, items: [whole(20, 30), whole(15, 45), whole(40, 18), whole(75, 60)] },
        { title: 'כמה אחוזים?', cols: 2, items: [whatPct(30, 150), whatPct(18, 24), whatPct(7, 20), whatPct(45, 60)] },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            { q: m`בבית ספר $${num(800)}$ תלמידים, ו-$35\%$ מהם מגיעים ברגל. כמה תלמידים מגיעים ברגל?`, a: m`[[${0.35 * 800}]] תלמידים` },
            { q: m`$12$ תלמידים בכיתה, שהם $30\%$ מהכיתה, נסעו לטיול. כמה תלמידים בכיתה?`, a: m`[[${(12 * 100) / 30}]] תלמידים` },
          ],
        },
      ],
    },
    {
      title: 'הנחות, התייקרויות ואחוז השינוי',
      exercises: [
        { title: 'בכמה כופלים?', cols: 2, items: [factor(20, false), factor(15, true), factor(5, false), factor(30, true)] },
        { title: 'חשבו את המחיר החדש.', cols: 1, items: [afterDiscount(250, 20), afterDiscount(80, 15), afterRaise(60, 10), afterRaise(400, 25)] },
        { title: 'מה היה השינוי?', cols: 1, items: [change(80, 100), change(200, 150), change(50, 60)] },
        {
          title: 'שינויים בזה אחר זה.',
          cols: 1,
          items: [
            {
              q: m`מחיר מעיל $${num(500)}$ ש״ח. הוא התייקר ב-$10\%$, ואחר כך הוזל ב-$10\%$. מה המחיר הסופי?`,
              a: m`[[${round(500 * 1.1 * 0.9)}]] ש״ח`,
            },
            {
              q: m`אחרי הנחה של $25\%$, חולצה עולה $90$ ש״ח. מה היה המחיר לפני ההנחה?`,
              a: m`[[${round(90 / 0.75)}]] ש״ח`,
            },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו.', cols: 2, items: [pctOf(45, 120), whole(25, 40), whatPct(9, 36)] },
      { title: 'חשבו את המחיר החדש.', cols: 1, items: [afterDiscount(320, 25), afterRaise(150, 20)] },
      { title: 'מה היה השינוי?', cols: 1, items: [change(40, 50)] },
      {
        title: 'שאלה מילולית.',
        cols: 1,
        items: [{ q: m`אחרי התייקרות של $20\%$, מחיר המשחק $180$ ש״ח. מה היה המחיר לפני ההתייקרות?`, a: m`[[${round(180 / 1.2)}]] ש״ח` }],
      },
    ],
  },
};
