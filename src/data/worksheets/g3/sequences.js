import { m, num } from '../helpers.js';
import { tf } from './shared.js';

/** סדרה עם איבר חסר במקום index. */
function missing(start, step, len, index) {
  const all = Array.from({ length: len }, (_, i) => start + i * step);
  const before = all.slice(0, index).map(num).join(',\\, ');
  const after = all.slice(index + 1).map(num).join(',\\, ');
  return { q: (before ? m`$${before},$ ` : '') + `[[${all[index]}]]` + (after ? m` $,\, ${after}$` : '') };
}

/** איתור טעות: האיבר במקום bad שגוי. */
function findError(start, step, bad, wrong) {
  const all = Array.from({ length: 6 }, (_, i) => (i === bad ? wrong : start + i * step));
  return {
    q: m`איזה מספר לא מתאים לסדרה? $\;${all.map(num).join(',\\; ')}$`,
    options: all.map((v) => m`$${num(v)}$`),
    answer: bad,
  };
}

/** סדרה מעורבת: במקומות האי-זוגיים קופצים ב-a, בזוגיים ב-b. */
function mixed(s1, d1, s2, d2) {
  const seq = [];
  for (let i = 0; i < 4; i++) seq.push(s1 + i * d1, s2 + i * d2);
  return {
    q: m`$${seq.slice(0, 6).map(num).join(',\\; ')},$ [[${seq[6]}]] $,$ [[${seq[7]}]]`,
  };
}

const kind = (start, step) => ({
  q: m`$${[0, 1, 2, 3].map((i) => num(start + i * step)).join(',\\; ')}, \ldots$`,
  a: m`הקפיצה: [[${Math.abs(step)}]]`,
});

export default {
  id: 'g3-sequences',
  grade: 3,
  emoji: '🔗',
  title: 'סדרות מספרים',
  reminder: [
    {
      title: 'סדרה עולה ויורדת',
      md: m`אותה **קפיצה קבועה** בין כל שני מספרים סמוכים: $\;15, 20, 25, 30$ (עולה ב-$5$) · $\;90, 80, 70$ (יורדת ב-$10$)`,
    },
    {
      title: 'סדרה מעורבת',
      md: m`שתי סדרות "משולבות": $\;1, 10, 2, 20, 3, 30$ — במקומות הראשון, השלישי, החמישי: $1, 2, 3$; ובשאר: $10, 20, 30$.`,
    },
    {
      title: 'איתור טעות',
      md: m`בודקים את הקפיצה בין **כל** זוג סמוך — היכן שהיא "נשברת", שם הטעות.`,
    },
  ],
  pages: [
    {
      title: 'השלמת סדרות',
      exercises: [
        { title: 'השלימו את המספר החסר.', cols: 1, items: [missing(15, 5, 6, 3), missing(90, -10, 6, 4), missing(250, 50, 5, 2), missing(1000, -125, 5, 4), missing(36, 9, 6, 1)] },
        { title: 'מה הקפיצה?', cols: 2, items: [kind(12, 4), kind(300, -25), kind(1450, 150), kind(64, -8)] },
      ],
    },
    {
      title: 'סדרות מעורבות ואיתור טעויות',
      exercises: [
        { title: 'המשיכו את הסדרה המעורבת.', cols: 1, items: [mixed(1, 1, 10, 10), mixed(5, 5, 100, -10), mixed(2, 2, 50, 50)] },
        { title: 'מצאו את הטעות.', cols: 1, items: [findError(4, 4, 3, 15), findError(100, -7, 2, 84), findError(30, 15, 4, 95)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`בסדרה $3, 6, 9, 12$ המספר הבא הוא $15$.`, true), tf(m`בסדרה $50, 45, 40$ הקפיצה היא $+5$.`, false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'השלימו.', cols: 1, items: [missing(7, 7, 6, 4), missing(500, -50, 5, 2)] },
      { title: 'המשיכו את הסדרה המעורבת.', cols: 1, items: [mixed(3, 3, 20, -2)] },
      { title: 'מצאו את הטעות.', cols: 1, items: [findError(12, 6, 4, 38)] },
    ],
  },
};
