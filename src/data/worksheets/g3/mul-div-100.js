import { m, timesItem } from '../helpers.js';
import { tf } from './shared.js';

const div = (a, b) => {
  if (a % b) throw new Error(`${a} is not divisible by ${b}`);
  return { q: m`$${a} : ${b} =$ [[${a / b}]]` };
};

/** גורם חסר: a × □ = p. */
const factor = (a, p) => {
  if (p % a) throw new Error(`${p} is not a multiple of ${a}`);
  return { q: m`$${a} \times$ [[${p / a}]] $= ${p}$` };
};

/** משפחת תרגילים: a × b = p ושלושת האחרים. */
const family = (a, b) => ({
  q: m`$${a} \times ${b} = ${a * b}$`,
  a: m`$${b} \times ${a} =$ [[${a * b}]] $\;\cdot\; ${a * b} : ${a} =$ [[${b}]] $\;\cdot\; ${a * b} : ${b} =$ [[${a}]]`,
});

function word(q, answer, unit, check) {
  if (!check(answer)) throw new Error(`answer ${answer} does not fit: ${q}`);
  return { q, a: m`[[${answer}]] ${unit}` };
}

export default {
  id: 'g3-mul-div-100',
  grade: 3,
  emoji: '✖️',
  title: 'כפל וחילוק בתחום ה-100',
  reminder: [
    {
      title: 'כפל וחילוק — משפחה אחת',
      md: m`$6 \times 7 = 42$ ← $7 \times 6 = 42$ · $42 : 6 = 7$ · $42 : 7 = 6$

חילוק הוא "כמה פעמים נכנס": $42 : 6$ — כמה פעמים $6$ נכנס ב-$42$?`,
    },
    {
      title: 'כללים שימושיים',
      md: m`$a \times 1 = a$ · $a \times 0 = 0$ · $a : 1 = a$ · $a : a = 1$

סדר הגורמים לא משנה: $4 \times 9 = 9 \times 4$`,
    },
  ],
  pages: [
    {
      title: 'לוח הכפל',
      exercises: [
        { title: 'חשבו.', cols: 3, items: [timesItem(6, 7), timesItem(8, 4), timesItem(9, 6), timesItem(7, 7), timesItem(3, 8), timesItem(9, 9), timesItem(5, 6), timesItem(8, 8), timesItem(4, 7)] },
        { title: 'חלקו.', cols: 3, items: [div(42, 6), div(56, 8), div(63, 9), div(36, 4), div(48, 6), div(81, 9), div(35, 5), div(72, 8), div(28, 7)] },
        { title: 'השלימו את הגורם החסר.', cols: 2, items: [factor(7, 49), factor(6, 54), factor(8, 64), factor(9, 72)] },
      ],
    },
    {
      title: 'משפחות תרגילים ובעיות',
      exercises: [
        { title: 'השלימו את משפחת התרגילים.', cols: 1, items: [family(6, 8), family(7, 9)] },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            word('בכל קופסה 8 עפרונות. כמה עפרונות יש ב-7 קופסאות?', 56, 'עפרונות', (x) => x === 8 * 7),
            word('45 תלמידים התחלקו שווה בשווה ל-5 קבוצות. כמה תלמידים בכל קבוצה?', 9, 'תלמידים', (x) => x * 5 === 45),
            word('לאורי 36 מדבקות. הוא מדביק 4 מדבקות בכל דף. כמה דפים ימלא?', 9, 'דפים', (x) => x * 4 === 36),
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`$0 \times 9 = 9$`, false), tf(m`$7 \times 8 = 8 \times 7$`, true), tf(m`$54 : 6 = 9$`, 54 / 6 === 9)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו.', cols: 3, items: [timesItem(7, 6), timesItem(9, 8), div(64, 8), div(45, 9), timesItem(6, 6), div(42, 7)] },
      { title: 'השלימו.', cols: 2, items: [factor(8, 56), factor(4, 36)] },
      { title: 'שאלה מילולית.', cols: 1, items: [word('בכל שורה באולם 9 כיסאות. יש 6 שורות. כמה כיסאות באולם?', 54, 'כיסאות', (x) => x === 9 * 6)] },
    ],
  },
};
