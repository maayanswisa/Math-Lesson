import { m, round, triangleFig, coordPlane } from '../helpers.js';
import { tf } from './shared.js';

const t = (x) => (x < 0 ? `-${-x}` : `${x}`);

const hyp = (a, b) => {
  const c = Math.sqrt(a * a + b * b);
  return Number.isInteger(c)
    ? { q: '', figure: triangleFig({ base: a, height: b, apex: 0, sides: ['?'] }), a: m`היתר: [[${c}]]` }
    : { q: '', figure: triangleFig({ base: a, height: b, apex: 0, sides: ['?'] }), a: m`היתר (לעשיריות): [[n:${round(c, 1)}~0.05]]` };
};
const leg = (c, a) => {
  const b = Math.sqrt(c * c - a * a);
  if (!Number.isInteger(b)) throw new Error('leg not whole');
  return { q: m`במשולש ישר-זווית היתר $${c}$ וניצב אחד $${a}$. הניצב השני:`, a: `[[${b}]]` };
};

/** מרחק בין שתי נקודות במערכת צירים. */
const dist = ([x1, y1], [x2, y2]) => {
  const d = Math.hypot(x2 - x1, y2 - y1);
  if (!Number.isInteger(d)) throw new Error('distance not whole');
  return { q: m`המרחק בין $(${t(x1)}, ${t(y1)})$ ל-$(${t(x2)}, ${t(y2)})$:`, a: `[[${d}]]` };
};

const isRight = (sides) => {
  const [a, b, c] = [...sides].sort((x, y) => x - y);
  return { q: m`צלעות $${sides.join(', ')}$ — האם המשולש ישר-זווית?`, options: ['כן', 'לא'], answer: a * a + b * b === c * c ? 0 : 1 };
};

function word(q, answer, check) {
  if (!check(answer)) throw new Error(`answer ${answer} does not fit: ${q}`);
  return { q, a: m`[[${answer}]] מטר` };
}

export default {
  id: 'g7-pythagorean',
  grade: 7,
  emoji: '📐',
  title: 'משפט פיתגורס ושימושיו',
  reminder: [
    {
      title: 'משפט פיתגורס',
      md: m`במשולש ישר-זווית עם ניצבים $a, b$ ויתר $c$ (מול הזווית הישרה): $\;a^2 + b^2 = c^2$

$3, 4 \to 5$: $\;9 + 16 = 25$. $\;$ ניצב: $b^2 = c^2 - a^2$.`,
    },
    {
      title: 'מרחק במערכת צירים',
      md: m`מ-$(1, 1)$ ל-$(4, 5)$: הפרש $x$ הוא $3$, הפרש $y$ הוא $4$ — ולכן המרחק $\sqrt{9 + 16} = 5$.`,
    },
    {
      title: 'המשפט ההפוך',
      md: m`אם $a^2 + b^2 = c^2$ (כש-$c$ הצלע הארוכה) — המשולש ישר-זווית.`,
    },
  ],
  pages: [
    {
      title: 'יתר וניצב',
      exercises: [
        { title: 'מצאו את היתר.', cols: 2, items: [hyp(3, 4), hyp(6, 8), hyp(5, 12), hyp(2, 3)] },
        { title: 'מצאו את הניצב.', cols: 1, items: [leg(10, 6), leg(13, 5), leg(17, 8), leg(25, 7)] },
        { title: 'ישר-זווית?', cols: 1, items: [isRight([9, 12, 15]), isRight([4, 5, 6]), isRight([8, 15, 17])] },
      ],
    },
    {
      title: 'מערכת צירים ומסלולים',
      exercises: [
        { title: 'מרחק בין נקודות.', cols: 1, figure: coordPlane({ points: [{ x: 1, y: 1, label: 'A' }, { x: 4, y: 5, label: 'B' }, { x: -4, y: -2, label: 'C' }] }), items: [dist([1, 1], [4, 5]), dist([-4, -2], [4, 4]), dist([-4, -2], [1, -2])] },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            word('סולם באורך 5 מטר נשען על קיר. רגל הסולם רחוקה 3 מטר מהקיר. לאיזה גובה מגיע הסולם?', 4, (x) => x * x + 9 === 25),
            word('מגרש מלבני 30 על 40 מטר. כמה מטר חוסכים כשהולכים באלכסון במקום לאורך שתי הצלעות?', 20, (x) => x === 30 + 40 - Math.hypot(30, 40)),
          ],
        },
        { title: 'היקף.', cols: 1, items: [{ q: m`משולש ישר-זווית עם ניצבים $9$ ו-$12$. ההיקף:`, a: `[[${9 + 12 + Math.hypot(9, 12)}]]` }] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('היתר הוא תמיד הצלע הארוכה במשולש ישר-זווית.', true), tf(m`במשולש עם צלעות $5, 12, 13$ הזווית הישרה מול הצלע $12$.`, false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו.', cols: 2, items: [hyp(9, 12), leg(15, 9)] },
      { title: 'ישר-זווית?', cols: 1, items: [isRight([7, 24, 25])] },
      { title: 'מרחק.', cols: 1, items: [dist([-2, 1], [4, 9])] },
      { title: 'שאלה מילולית.', cols: 1, items: [word('עמוד בגובה 8 מטר נתמך בכבל שמחובר לראשו ולקרקע, 6 מטר מבסיס העמוד. מה אורך הכבל?', 10, (x) => x === Math.hypot(8, 6))] },
    ],
  },
};
