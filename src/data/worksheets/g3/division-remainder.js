import { m } from '../helpers.js';
import { tf } from './shared.js';

const divR = (a, b) => ({ q: m`$${a} : ${b} =$ [[${Math.floor(a / b)}]] שארית [[${a % b}]]` });

/** בדיקה: מנה × מחלק + שארית. */
const check = (q, b, r) => ({ q: m`$${q} \times ${b} + ${r} =$ [[${q * b + r}]]` });

/** האם החילוק נכון? (השארית חייבת להיות קטנה מהמחלק) */
function isCorrect(a, b, q, r) {
  const ok = q * b + r === a && r < b;
  return { q: m`$${a} : ${b} = ${q}$ שארית $${r}$`, options: ['נכון', 'לא נכון'], answer: ok ? 0 : 1 };
}

function word(q, a, check) {
  if (!check()) throw new Error(`check failed: ${q}`);
  return { q, a };
}

export default {
  id: 'g3-division-remainder',
  grade: 3,
  emoji: '🍪',
  title: 'חילוק עם שארית',
  reminder: [
    {
      title: 'מה זו שארית?',
      md: m`$17 : 5 = 3$ שארית $2$ — כי $5$ נכנס ב-$17$ שלוש פעמים ($15$), ונשארים $2$.

השארית תמיד **קטנה מהמחלק**.`,
    },
    {
      title: 'בדיקה',
      md: m`מנה $\times$ מחלק $+$ שארית $=$ המחולק: $\;3 \times 5 + 2 = 17$ ✓`,
    },
  ],
  pages: [
    {
      title: 'חילוק עם שארית',
      exercises: [
        { title: 'חלקו.', cols: 2, items: [divR(17, 5), divR(23, 4), divR(38, 6), divR(50, 7), divR(29, 3), divR(65, 8), divR(47, 9), divR(33, 10)] },
        { title: 'בדקו.', cols: 2, items: [check(3, 5, 2), check(5, 4, 3), check(7, 6, 2), check(8, 9, 5)] },
      ],
    },
    {
      title: 'נכון או לא? ובעיות',
      exercises: [
        { title: 'האם החילוק נכון?', cols: 1, items: [isCorrect(26, 4, 6, 2), isCorrect(31, 5, 5, 6), isCorrect(44, 7, 6, 3), isCorrect(52, 8, 6, 3)] },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            word('29 עוגיות חולקו שווה בשווה ל-4 ילדים. כמה עוגיות קיבל כל ילד, וכמה נשארו?', m`כל ילד: [[7]] עוגיות · נשארו: [[1]]`, () => 7 * 4 + 1 === 29),
            word('ב-30 מכוניות צעצוע ממלאים קופסאות של 8. כמה קופסאות מלאות יהיו, וכמה מכוניות יישארו?', m`[[3]] קופסאות מלאות · נשארו: [[6]]`, () => 3 * 8 + 6 === 30),
            word('23 ילדים נוסעים בסירות, 4 ילדים בכל סירה. כמה סירות צריך כדי שכולם ייסעו?', m`[[6]] סירות`, () => 5 * 4 < 23 && 6 * 4 >= 23),
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`בחילוק ב-$6$ השארית יכולה להיות $6$.`, false), tf(m`$40 : 10 = 4$ בלי שארית.`, 40 % 10 === 0)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חלקו.', cols: 2, items: [divR(19, 4), divR(58, 7), divR(41, 6), divR(75, 9)] },
      { title: 'בדקו.', cols: 1, items: [check(6, 7, 4)] },
      { title: 'האם החילוק נכון?', cols: 1, items: [isCorrect(35, 4, 7, 7)] },
      { title: 'שאלה מילולית.', cols: 1, items: [word('34 פרחים מסדרים בזרים של 5. כמה זרים שלמים יהיו, וכמה פרחים יישארו?', m`[[6]] זרים · נשארו: [[4]]`, () => 6 * 5 + 4 === 34)] },
    ],
  },
};
