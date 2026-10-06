import { m, num } from '../helpers.js';
import { tf } from './shared.js';

const times = (a, b) => ({ q: m`$${num(a)} \times ${num(b)} =$ [[${a * b}]]` });
const div = (a, b) => {
  if (a % b) throw new Error(`${a} is not divisible by ${b}`);
  return { q: m`$${num(a)} : ${num(b)} =$ [[${a / b}]]` };
};

/** חילוק בחלקים: a : d = t : d + u : d. */
const splitDiv = (t, u, d) => {
  if (t % d || u % d) throw new Error(`${t} and ${u} must divide by ${d}`);
  return { q: m`$${t + u} : ${d} = ${t} : ${d} + ${u} : ${d} =$ [[${t / d}]] $+$ [[${u / d}]] $=$ [[${(t + u) / d}]]` };
};

/** גורם חסר עם אפסים. */
const factor = (a, p) => {
  if (p % a) throw new Error(`${p} is not a multiple of ${a}`);
  return { q: m`$${num(a)} \times$ [[${p / a}]] $= ${num(p)}$` };
};

function word(q, answer, unit, check) {
  if (!check(answer)) throw new Error(`answer ${answer} does not fit: ${q}`);
  return { q, a: m`[[${answer}]] ${unit}` };
}

export default {
  id: 'g3-mul-div-10000',
  grade: 3,
  emoji: '💯',
  title: 'כפל וחילוק במספרים גדולים',
  reminder: [
    {
      title: 'כפל עם אפסים',
      md: m`מכפילים את הספרות שאינן אפס, ומוסיפים את **כל** האפסים:

$30 \times 40$ ← $3 \times 4 = 12$ ← $1{,}200$ · $\;600 \times 5 = 3{,}000$ (ה-$0$ של $30$ "נוסף" לאפסים!)`,
    },
    {
      title: 'חילוק עם אפסים',
      md: m`$2{,}400 : 6$ ← $24 : 6 = 4$ ← $400$ · $\;3{,}600 : 90$ ← $360 : 9 = 40$`,
    },
    {
      title: 'חילוק בחלקים',
      md: m`$84 : 4 = 80 : 4 + 4 : 4 = 20 + 1 = 21$`,
    },
  ],
  pages: [
    {
      title: 'כפל עם אפסים',
      exercises: [
        { title: 'חשבו.', cols: 2, items: [times(30, 4), times(30, 40), times(200, 5), times(70, 80), times(600, 5), times(9, 400), times(50, 60), times(800, 7)] },
        { title: 'השלימו.', cols: 2, items: [factor(40, 2800), factor(500, 3500), factor(60, 4200), factor(8, 7200)] },
      ],
    },
    {
      title: 'חילוק ובעיות',
      exercises: [
        { title: 'חלקו.', cols: 2, items: [div(2400, 6), div(3600, 90), div(4500, 5), div(560, 70), div(8100, 9), div(6000, 300)] },
        { title: 'חלקו בחלקים.', cols: 1, items: [splitDiv(80, 4, 4), splitDiv(60, 9, 3), splitDiv(120, 12, 6), splitDiv(400, 28, 4)] },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            word('בכל ארגז 40 תפוחים. כמה תפוחים יש ב-30 ארגזים?', 1200, 'תפוחים', (x) => x === 40 * 30),
            word('2,800 שקלים חולקו שווה בשווה ל-7 כיתות. כמה שקלים קיבלה כל כיתה?', 400, 'שקלים', (x) => x * 7 === 2800),
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`$50 \times 40 = 200$`, false), tf(m`$4{,}200 : 7 = 600$`, 4200 / 7 === 600)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו.', cols: 2, items: [times(60, 30), times(400, 8), div(3200, 4), div(5400, 60)] },
      { title: 'חלקו בחלקים.', cols: 1, items: [splitDiv(90, 6, 3)] },
      { title: 'שאלה מילולית.', cols: 1, items: [word('באולם 20 שורות, ובכל שורה 50 כיסאות. כמה כיסאות באולם?', 1000, 'כיסאות', (x) => x === 20 * 50)] },
    ],
  },
};
