import { m, round, triangleFig } from '../helpers.js';

const PI = 3.14;

function hyp(a, b) {
  const c = Math.sqrt(a * a + b * b);
  return Number.isInteger(c)
    ? { q: m`ניצבים $${a}$ ו-$${b}$. היתר: [[${c}]]` }
    : { q: m`ניצבים $${a}$ ו-$${b}$. היתר (עגלו לעשיריות): [[n:${round(c, 1)}~0.05]]` };
}
function leg(c, a) {
  const b = Math.sqrt(c * c - a * a);
  if (!Number.isInteger(b)) throw new Error('leg not whole');
  return { q: m`יתר $${c}$ וניצב $${a}$. הניצב השני: [[${b}]]` };
}
const hypFig = (a, b) => ({
  q: '',
  figure: triangleFig({ base: a, height: b, apex: 0, sides: ['?'] }),
  a: m`היתר: [[${Math.sqrt(a * a + b * b)}]]`,
});

/** האם משולש עם הצלעות האלה ישר-זווית? (המשפט ההפוך) */
function isRight(sides) {
  const [a, b, c] = [...sides].sort((x, y) => x - y);
  return { q: m`צלעות $${sides.join(', ')}$ — האם המשולש ישר-זווית?`, options: ['כן', 'לא'], answer: a * a + b * b === c * c ? 0 : 1 };
}

const cylVolume = (r, h) => ({ q: m`גליל: רדיוס $${r}$ ס״מ, גובה $${h}$ ס״מ. הנפח: [[n:${round(PI * r * r * h)}~${round(PI * r * r * h * 0.002 + 0.01, 2)}]] סמ״ק` });
const cylArea = (r, h) => {
  const S = PI * 2 * r * r + 2 * PI * r * h;
  return { q: m`גליל: רדיוס $${r}$ ס״מ, גובה $${h}$ ס״מ. שטח הפנים: [[n:${round(S)}~${round(S * 0.002 + 0.01, 2)}]] סמ״ר` };
};

export default {
  id: 'g8-pythagoras',
  grade: 8,
  emoji: '📐',
  title: 'משפט פיתגורס וגליל',
  reminder: [
    {
      title: 'משפט פיתגורס',
      md: m`במשולש **ישר-זווית**, עם ניצבים $a, b$ ויתר $c$ (מול הזווית הישרה):

$$a^2 + b^2 = c^2$$

ניצבים $3$ ו-$4$: $\;c^2 = 9 + 16 = 25 \Rightarrow c = 5$`,
    },
    {
      title: 'מציאת ניצב',
      md: m`$b^2 = c^2 - a^2$. $\;$ יתר $13$, ניצב $5$: $\;b^2 = 169 - 25 = 144 \Rightarrow b = 12$

**המשפט ההפוך**: אם $a^2 + b^2 = c^2$ — המשולש ישר-זווית.`,
    },
    {
      title: 'גליל',
      wide: true,
      md: m`**נפח** $= \pi r^2 \cdot h$ $\qquad$ **שטח פנים** $= 2\pi r^2 + 2\pi r h$ (שני בסיסים + מעטפת)

בדף הזה משתמשים ב-$\pi \approx 3.14$. $\;r = 2, h = 5$: נפח $\approx 3.14 \cdot 4 \cdot 5 = 62.8$`,
    },
  ],
  pages: [
    {
      title: 'משפט פיתגורס',
      exercises: [
        { title: 'מצאו את היתר.', cols: 2, items: [hyp(3, 4), hyp(6, 8), hyp(5, 12), hyp(8, 15), hyp(9, 12), hyp(1, 1), hyp(2, 3)] },
        { title: 'מצאו את היתר לפי השרטוט.', cols: 3, items: [hypFig(6, 8), hypFig(12, 5), hypFig(7, 24)] },
        { title: 'מצאו את הניצב החסר.', cols: 2, items: [leg(5, 3), leg(13, 5), leg(10, 6), leg(17, 8), leg(25, 7)] },
        { title: 'המשפט ההפוך.', cols: 1, items: [isRight([6, 8, 10]), isRight([4, 5, 6]), isRight([5, 12, 13]), isRight([7, 8, 11])] },
      ],
    },
    {
      title: 'בעיות, וגליל',
      exercises: [
        {
          title: 'בעיות.',
          cols: 1,
          items: [
            { q: m`סולם באורך $5$ מ׳ נשען על קיר. רגל הסולם נמצאת $3$ מ׳ מהקיר. לאיזה גובה מגיע הסולם?`, a: m`[[${Math.sqrt(25 - 9)}]] מ׳` },
            { q: m`מלבן שצלעותיו $6$ ו-$8$ ס״מ. מה אורך האלכסון?`, a: m`[[${Math.sqrt(36 + 64)}]] ס״מ` },
            { q: m`ריבוע שצלעו $5$ ס״מ. מה אורך האלכסון? (עגלו לעשיריות)`, a: m`[[n:${round(Math.sqrt(50), 1)}~0.05]] ס״מ` },
            { q: m`במשולש שווה-שוקיים, כל שוק $10$ ס״מ והבסיס $12$ ס״מ. מה הגובה לבסיס?`, a: m`[[${Math.sqrt(100 - 36)}]] ס״מ` },
          ],
        },
        { title: m`נפח גליל ($\pi \approx 3.14$).`, cols: 1, items: [cylVolume(2, 5), cylVolume(3, 10), cylVolume(5, 4)] },
        { title: m`שטח פנים של גליל ($\pi \approx 3.14$).`, cols: 1, items: [cylArea(1, 4), cylArea(2, 3), cylArea(5, 10)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מצאו את היתר.', cols: 2, items: [hyp(9, 40), hyp(20, 21)] },
      { title: 'מצאו את הניצב.', cols: 1, items: [leg(15, 9)] },
      { title: 'המשפט ההפוך.', cols: 1, items: [isRight([9, 12, 15])] },
      { title: 'בעיה.', cols: 1, items: [{ q: m`מסך בגודל $24 \times 18$ אינץ׳. מה אורך האלכסון?`, a: m`[[${Math.sqrt(24 * 24 + 18 * 18)}]] אינץ׳` }] },
      { title: m`גליל ($\pi \approx 3.14$).`, cols: 1, items: [cylVolume(4, 5)] },
    ],
  },
};

