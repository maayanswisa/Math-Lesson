import { m, round, boxFig } from '../helpers.js';

const sq = (x) => x * x;

/** אלכסון פאה ואלכסון מרחבי של תיבה l×w×h (המספרים נבחרו כך שיוצאים שלמים). */
function diagonals(l, w, h, withFig = false) {
  const face = Math.sqrt(sq(l) + sq(w));
  const space = Math.sqrt(sq(l) + sq(w) + sq(h));
  if (!Number.isInteger(face) || !Number.isInteger(space)) throw new Error(`${l}×${w}×${h} is not whole`);
  return {
    q: withFig ? '' : m`תיבה $${l} \times ${w} \times ${h}$`,
    figure: withFig ? boxFig({ l, w, h }) : undefined,
    a: m`אלכסון הבסיס: [[${face}]] $\qquad$ אלכסון התיבה: [[${space}]]`,
  };
}

const spaceOnly = (l, w, h) => {
  const d = Math.sqrt(sq(l) + sq(w) + sq(h));
  return Number.isInteger(d)
    ? { q: m`תיבה $${l} \times ${w} \times ${h}$. אלכסון התיבה: [[${d}]]` }
    : { q: m`תיבה $${l} \times ${w} \times ${h}$. אלכסון התיבה (עגלו לעשיריות): [[n:${round(d, 1)}~0.05]]` };
};

const cube = (a) => ({
  q: m`קובייה שמקצועה $${a}$`,
  a: m`אלכסון פאה: [[n:${round(a * Math.SQRT2, 1)}~0.05]] $\qquad$ אלכסון הקובייה: [[n:${round(a * Math.sqrt(3), 1)}~0.05]]`,
});

export default {
  id: 'g8-pythagoras-3d',
  grade: 8,
  emoji: '📦',
  title: 'משפט פיתגורס במרחב — תיבה',
  reminder: [
    {
      title: 'אלכסון פאה',
      md: m`<div class="diagram-box">${boxFig({ l: 'a', w: 'b', h: 'c' })}</div>

אלכסון של פאה (למשל הבסיס) — פיתגורס על שתי המידות של הפאה: $\;\sqrt{a^2 + b^2}$`,
    },
    {
      title: 'אלכסון התיבה (המרחבי)',
      md: m`מפעילים פיתגורס **פעמיים**: אלכסון הבסיס $d$, ואז משולש ישר-זווית עם הגובה:

$$D = \sqrt{d^2 + c^2} = \sqrt{a^2 + b^2 + c^2}$$

תיבה $3 \times 4 \times 12$: $\;d = 5$, $\;D = \sqrt{25 + 144} = 13$`,
    },
  ],
  pages: [
    {
      title: 'אלכסון הבסיס ואלכסון התיבה',
      exercises: [
        { title: 'חשבו את שני האלכסונים.', cols: 1, items: [diagonals(3, 4, 12), diagonals(6, 8, 24), diagonals(5, 12, 84), diagonals(12, 16, 21)] },
        { title: 'חשבו לפי השרטוט (המידות בס״מ).', cols: 2, items: [diagonals(3, 4, 12, true), diagonals(9, 12, 20, true)] },
        { title: 'חשבו ישר את אלכסון התיבה.', cols: 1, items: [spaceOnly(2, 3, 6), spaceOnly(1, 4, 8), spaceOnly(2, 6, 9), spaceOnly(4, 4, 7), spaceOnly(2, 2, 2)] },
      ],
    },
    {
      title: 'קובייה ובעיות',
      exercises: [
        { title: m`קובייה: חשבו את האלכסונים (עגלו לעשיריות).`, cols: 1, items: [cube(1), cube(5), cube(10)] },
        {
          title: 'בעיות.',
          cols: 1,
          items: [
            {
              q: m`קופסה בצורת תיבה: $30 \times 40$ ס״מ בבסיס, וגובה $120$ ס״מ. האם מקל באורך $125$ ס״מ ייכנס לקופסה (באלכסון)?`,
              options: ['כן', 'לא'],
              answer: Math.sqrt(30 * 30 + 40 * 40 + 120 * 120) >= 125 ? 0 : 1,
            },
            { q: m`אלכסון בסיס של תיבה הוא $10$, והגובה $24$. מה אורך אלכסון התיבה?`, a: `[[${Math.sqrt(100 + 576)}]]` },
            { q: m`אלכסון תיבה הוא $13$, ואלכסון הבסיס $5$. מה גובה התיבה?`, a: `[[${Math.sqrt(169 - 25)}]]` },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            { q: 'אלכסון התיבה ארוך מכל אחד מאלכסוני הפאות.', options: ['נכון', 'לא נכון'], answer: 0 },
            { q: 'לכל תיבה יש 4 אלכסונים מרחביים, וכולם שווים.', options: ['נכון', 'לא נכון'], answer: 0 },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו את שני האלכסונים.', cols: 1, items: [diagonals(12, 16, 15)] },
      { title: 'חשבו את אלכסון התיבה.', cols: 1, items: [spaceOnly(1, 2, 2), spaceOnly(6, 6, 7)] },
      { title: 'קובייה (עגלו לעשיריות).', cols: 1, items: [cube(4)] },
      { title: 'בעיה.', cols: 1, items: [{ q: m`אלכסון תיבה הוא $25$, ואלכסון הבסיס $24$. מה גובה התיבה?`, a: `[[${Math.sqrt(625 - 576)}]]` }] },
    ],
  },
};
