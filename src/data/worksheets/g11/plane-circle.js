import { m } from '../helpers.js';
import { tf } from './shared.js';

const inscribedFromCentral = (c) => ({ q: m`זווית מרכזית $${c}°$ ← זווית היקפית על אותה קשת: [[${c / 2}]] $°$` });
const centralFromInscribed = (i) => ({ q: m`זווית היקפית $${i}°$ ← הזווית המרכזית על אותה קשת: [[${2 * i}]] $°$` });

/** מרחק מיתר מהמרכז: האנך מהמרכז חוצה את המיתר (פיתגורס). */
function chordDistance(r, chord) {
  const d = Math.sqrt(r * r - (chord / 2) ** 2);
  if (!Number.isInteger(d)) throw new Error('not whole');
  return { q: m`רדיוס $${r}$, מיתר באורך $${chord}$. המרחק של המיתר מהמרכז: [[${d}]]` };
}
function chordLength(r, d) {
  const half = Math.sqrt(r * r - d * d);
  if (!Number.isInteger(half)) throw new Error('not whole');
  return { q: m`רדיוס $${r}$, מיתר במרחק $${d}$ מהמרכז. אורך המיתר: [[${2 * half}]]` };
}

/** משולש חסום במעגל ש-AB קוטר שלו: ∠C = 90°. */
const diameterTriangle = (A) => ({
  q: m`$AB$ קוטר במעגל, ו-$C$ נקודה על המעגל. $\;\angle A = ${A}°$`,
  a: m`$\angle C =$ [[90]] $° \qquad \angle B =$ [[${90 - A}]] $°$`,
});

export default {
  id: 'g11-u4-plane-circle',
  grade: 11,
  emoji: '⭕',
  title: 'המעגל: זוויות, קשתות ומיתרים',
  reminder: [
    {
      title: 'זווית מרכזית והיקפית',
      md: m`**מרכזית** — הקודקוד במרכז. **היקפית** — הקודקוד על המעגל.

זווית היקפית $= \frac{1}{2}$ הזווית המרכזית הנשענת **על אותה קשת**. זוויות היקפיות על אותה קשת — **שוות**.`,
    },
    {
      title: 'זווית על קוטר',
      md: m`זווית היקפית שנשענת על **קוטר** היא **$90°$** (וגם להפך: אם זווית היקפית ישרה — היא נשענת על קוטר).`,
    },
    {
      title: 'מיתרים',
      wide: true,
      md: m`**אנך מהמרכז למיתר חוצה אותו**. ולכן: רדיוס $r$, מיתר $c$, מרחק $d$ מהמרכז ← $\;r^2 = d^2 + \left(\frac{c}{2}\right)^2$

מיתרים שווים ⟺ זוויות מרכזיות שוות ⟺ שווים במרחקם מהמרכז.`,
    },
  ],
  pages: [
    {
      title: 'זוויות מרכזיות והיקפיות',
      exercises: [
        { title: 'השלימו.', cols: 1, items: [inscribedFromCentral(80), inscribedFromCentral(130), centralFromInscribed(35), centralFromInscribed(72)] },
        { title: 'משולש שצלע אחת שלו היא קוטר.', cols: 1, items: [diameterTriangle(30), diameterTriangle(52), diameterTriangle(17)] },
        {
          title: 'זוויות על אותה קשת.',
          cols: 1,
          items: [
            { q: m`$\angle ACB$ ו-$\angle ADB$ זוויות היקפיות על הקשת $AB$, ו-$\angle ACB = 40°$. $\;\angle ADB =$ [[40]] $°$` },
            { q: m`$\angle AOB$ מרכזית ($O$ המרכז) והיא $110°$. כל זווית היקפית על הקשת $AB$ (מאותו צד): [[55]] $°$` },
            { q: m`זווית היקפית $\angle ACB = 90°$. הקטע $AB$ הוא...`, options: ['קוטר', 'רדיוס', 'משיק'], answer: 0 },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('זווית היקפית שווה למחצית הזווית המרכזית הנשענת על אותה קשת.', true),
            tf('כל הזוויות ההיקפיות הנשענות על קוטר שוות ל-90°.', true),
            tf('זווית מרכזית שווה למחצית הזווית ההיקפית על אותה קשת.', false),
          ],
        },
      ],
    },
    {
      title: 'מיתרים ומרחקים',
      exercises: [
        { title: 'מרחק מיתר מהמרכז.', cols: 1, items: [chordDistance(5, 8), chordDistance(13, 24), chordDistance(10, 12), chordDistance(25, 48)] },
        { title: 'אורך מיתר.', cols: 1, items: [chordLength(10, 6), chordLength(5, 3), chordLength(17, 8)] },
        {
          title: 'השלימו.',
          cols: 1,
          items: [
            { q: m`במעגל, המיתרים $AB$ ו-$CD$ שווים, והזווית המרכזית $\angle AOB = 70°$. $\;\angle COD =$ [[70]] $°$` },
            { q: m`רדיוס המעגל $6$. מה אורך המיתר הארוך ביותר במעגל?`, a: '[[12]]' },
            {
              q: m`האנך מהמרכז $O$ למיתר $AB$ פוגש אותו בנקודה $M$, ו-$AM = 7$. $\;AB =$ [[14]]`,
            },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'השלימו.', cols: 1, items: [inscribedFromCentral(96), centralFromInscribed(28)] },
      { title: 'משולש שצלע אחת שלו היא קוטר.', cols: 1, items: [diameterTriangle(38)] },
      { title: 'מיתרים.', cols: 1, items: [chordDistance(17, 30), chordLength(13, 5)] },
      { title: 'נכון או לא נכון?', cols: 1, items: [tf('מיתרים שווים במעגל נמצאים באותו מרחק מהמרכז.', true)] },
    ],
  },
};

/** מחוללי פריטים — לשימוש חוזר בדפי התרגול המסכם. */
export { inscribedFromCentral, centralFromInscribed, chordDistance, chordLength, diameterTriangle };
