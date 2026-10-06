import { m, lin, round, coordPlane, ineqItem, solveIneq, signTex } from '../helpers.js';

/** האם x = v מקיים את ax + b (sign) c? */
function satisfies(a, b, sign, c, v) {
  const L = a * v + b;
  const ok = { '<': L < c, '>': L > c, '≤': L <= c, '≥': L >= c }[sign];
  return { q: m`האם $x = ${v}$ מקיים את $${lin(a, b)} ${signTex(sign)} ${c}$?`, options: ['כן', 'לא'], answer: ok ? 0 : 1 };
}

/** המספר השלם הקטן/הגדול ביותר שמקיים את אי-השוויון. */
function extremeInt(a, b, sign, c) {
  const { sign: s, value } = solveIneq(a, b, sign, 0, c);
  const ans = { '>': Math.floor(value) + 1, '≥': Math.ceil(value), '<': Math.ceil(value) - 1, '≤': Math.floor(value) }[s];
  const word = s === '>' || s === '≥' ? 'הקטן' : 'הגדול';
  return { q: m`$${lin(a, b)} ${signTex(sign)} ${c}$ — המספר השלם ${word} ביותר שמקיים: [[${ans}]]` };
}

/** תחומי חיוביות ושליליות של y = ax + b. */
function domains(a, b, withGraph = false) {
  const x0 = round(-b / a);
  const pos = a > 0 ? '>' : '<';
  const neg = a > 0 ? '<' : '>';
  return {
    q: withGraph ? '' : m`$y = ${lin(a, b)}$`,
    figure: withGraph ? coordPlane({ lines: [{ m: a, b }] }) : undefined,
    a: m`חיובית: $x$ [[i:${pos}]] [[${x0}]] $\qquad$ שלילית: $x$ [[i:${neg}]] [[${x0}]]`,
  };
}

export default {
  id: 'g8-linear-inequalities',
  grade: 8,
  emoji: '⚖️',
  title: 'אי-שוויונות קוויים ותחומי חיוביות ושליליות',
  reminder: [
    {
      title: 'פתרון אי-שוויון',
      md: m`פותרים כמו משוואה: מעבירים אגפים ומחלקים במקדם של $x$.

$3x + 4 > x + 10 \;\Rightarrow\; 2x > 6 \;\Rightarrow\; x > 3$`,
    },
    {
      title: 'מספר שלילי — הופכים סימן!',
      md: m`כשכופלים או מחלקים במספר **שלילי**, הסימן מתהפך:

$-2x \ge 8 \;\Rightarrow\; x \le -4$`,
    },
    {
      title: 'תחומי חיוביות ושליליות',
      wide: true,
      md: m`**חיובית** — הגרף **מעל** ציר $x$ ($y > 0$), **שלילית** — **מתחת** ($y < 0$).

מוצאים איפה $y = 0$, ולפי השיפוע קובעים צד: ב-$y = 2x - 6$ האפס ב-$x = 3$, הפונקציה עולה ← חיובית כש-$x > 3$, שלילית כש-$x < 3$.`,
    },
  ],
  pages: [
    {
      title: 'פתרון אי-שוויונות',
      exercises: [
        {
          title: 'פתרו (בחרו סימן והשלימו מספר).',
          cols: 1,
          items: [
            ineqItem(1, 5, '>', 0, 9),
            ineqItem(1, -3, '≤', 0, 2),
            ineqItem(4, 0, '<', 0, 20),
            ineqItem(-2, 0, '≥', 0, 8),
            ineqItem(1 / 3, 0, '>', 0, 2, { lhs: '\\frac{x}{3}' }),
            ineqItem(-1 / 2, 0, '<', 0, 1, { lhs: '-\\frac{x}{2}' }),
          ],
        },
        {
          title: 'נעלם בשני האגפים.',
          cols: 1,
          items: [
            ineqItem(3, 4, '>', 1, 10),
            ineqItem(-2, 5, '≥', 1, -4, { lhs: '5 - 2x' }),
            ineqItem(2, 2, '<', 3, -4, { lhs: '2(x + 1)' }),
            ineqItem(7, -3, '≤', 4, 9),
          ],
        },
        {
          title: 'הציבו ובדקו.',
          cols: 1,
          items: [satisfies(3, -1, '>', 4, 2), satisfies(-2, 6, '≤', 0, 3), satisfies(5, 0, '<', 10, 2), satisfies(-1, 4, '≥', 1, 4)],
        },
        {
          title: 'מספרים שלמים.',
          cols: 1,
          items: [extremeInt(2, 1, '>', 8), extremeInt(3, 0, '≤', 14), extremeInt(-2, 0, '<', 5)],
        },
      ],
    },
    {
      title: 'תחומי חיוביות ושליליות',
      exercises: [
        { title: 'מצאו את תחומי החיוביות והשליליות.', cols: 1, items: [domains(2, -6), domains(-1, 4), domains(3, 6), domains(-2, -4)] },
        { title: 'מצאו את התחומים לפי הגרף.', cols: 2, items: [domains(1, -2, true), domains(-0.5, 2, true)] },
        {
          title: 'שאלות מילוליות (רשמו אי-שוויון ופתרו).',
          cols: 1,
          items: [
            {
              q: m`לדנה יש $50$ ש״ח, והיא חוסכת $20$ ש״ח בכל שבוע. אחרי כמה שבועות **לפחות** יהיו לה יותר מ-$200$ ש״ח?`,
              a: m`[[${Math.floor((200 - 50) / 20) + 1}]] שבועות`,
            },
            {
              q: m`נסיעה במונית עולה $12$ ש״ח ועוד $3$ ש״ח לכל ק״מ. מה המרחק **הגדול ביותר** שאפשר לנסוע ב-$60$ ש״ח?`,
              a: m`[[${(60 - 12) / 3}]] ק״מ`,
            },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'פתרו.', cols: 1, items: [ineqItem(-3, 0, '<', 0, 15), ineqItem(5, -1, '≥', 2, 8), ineqItem(2, 7, '>', 0, 1)] },
      { title: 'מצאו את תחומי החיוביות והשליליות.', cols: 1, items: [domains(-3, 9)] },
      { title: 'לפי הגרף.', cols: 1, items: [domains(2, 2, true)] },
      { title: 'מספרים שלמים.', cols: 1, items: [extremeInt(4, -1, '<', 10)] },
    ],
  },
};
