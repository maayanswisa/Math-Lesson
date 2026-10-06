import { m } from '../helpers.js';
import { tf, groupsFig, arrayFig } from './shared.js';

/** קבוצות שוות: כמה קבוצות, כמה בכל אחת, כמה בסך הכול. */
const groups = (g, per) => ({ q: '', figure: groupsFig(g, per), a: m`[[${g}]] קבוצות של [[${per}]] $=$ [[${g * per}]]` });

/** מחיבור חוזר לכפל. */
const repeated = (n, times) => ({ q: m`$${Array(times).fill(n).join(' + ')} =$ [[${times}]] $\times ${n} =$ [[${n * times}]]` });

/** מערך: שורות × עמודות. */
const array = (r, c) => ({ q: '', figure: arrayFig(r, c), a: m`[[${r}]] שורות של [[${c}]] $=$ [[${r * c}]]` });

const times = (a, b) => ({ q: m`$${a} \times ${b} =$ [[${a * b}]]` });
const div = (a, b) => {
  if (a % b) throw new Error('must divide');
  return { q: m`$${a} : ${b} =$ [[${a / b}]]` };
};

function word(q, answer, unit, check) {
  if (!check(answer)) throw new Error(`answer ${answer} does not fit: ${q}`);
  return { q, a: m`[[${answer}]] ${unit}` };
}

export default {
  id: 'g2-mul-div-intro',
  grade: 2,
  emoji: '✖️',
  title: 'כפל וחילוק — מבוא',
  reminder: [
    {
      title: 'כפל = חיבור חוזר',
      md: m`$4 + 4 + 4 = 3 \times 4 = 12$ — שלוש קבוצות של $4$.`,
    },
    {
      title: 'שתי משמעויות לחילוק',
      md: m`**חלוקה שווה**: $12$ סוכריות ל-$3$ ילדים ← כל ילד מקבל $12 : 3 = 4$.

**הכלה**: $12$ סוכריות, $4$ בכל שקית ← $12 : 4 = 3$ שקיות.`,
    },
    {
      title: 'כפולות',
      md: m`של $2$: $2, 4, 6, 8, 10, \ldots$ · של $5$: $5, 10, 15, 20, \ldots$ · של $10$: $10, 20, 30, \ldots$ · של $4$: $4, 8, 12, 16, \ldots$`,
    },
  ],
  pages: [
    {
      title: 'משמעות הכפל',
      exercises: [
        { title: 'כמה בסך הכול?', cols: 1, items: [groups(3, 4), groups(5, 2), groups(2, 5)] },
        { title: 'מחיבור לכפל.', cols: 1, items: [repeated(5, 3), repeated(2, 6), repeated(10, 4)] },
        { title: 'מערכים.', cols: 2, items: [array(2, 6), array(4, 5)] },
      ],
    },
    {
      title: 'כפולות וחילוק',
      exercises: [
        { title: 'כפולות של 2, 4, 5 ו-10.', cols: 3, items: [times(2, 7), times(4, 3), times(5, 6), times(10, 8), times(4, 5), times(2, 9), times(5, 9), times(10, 10), times(4, 4)] },
        { title: 'חלקו.', cols: 3, items: [div(12, 3), div(20, 5), div(16, 4), div(30, 10), div(18, 2), div(40, 5)] },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            word('12 סוכריות חולקו שווה בשווה ל-3 ילדים. כמה קיבל כל ילד?', 4, 'סוכריות', (x) => x * 3 === 12),
            word('20 עוגיות, 5 בכל שקית. כמה שקיות?', 4, 'שקיות', (x) => x * 5 === 20),
            word('ב-4 קופסאות יש 10 עפרונות בכל אחת. כמה עפרונות בסך הכול?', 40, 'עפרונות', (x) => x === 4 * 10),
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`$3 \times 5 = 5 + 5 + 5$`, true), tf(m`$35$ הוא כפולה של $5$.`, 35 % 5 === 0), tf(m`$18$ הוא כפולה של $4$.`, 18 % 4 === 0)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'כמה בסך הכול?', cols: 1, items: [groups(4, 3)] },
      { title: 'חשבו.', cols: 3, items: [times(5, 7), times(2, 8), div(24, 4), div(50, 10)] },
      { title: 'שאלה מילולית.', cols: 1, items: [word('15 בלונים חולקו ל-5 ילדים שווה בשווה. כמה קיבל כל ילד?', 3, 'בלונים', (x) => x * 5 === 15)] },
    ],
  },
};
