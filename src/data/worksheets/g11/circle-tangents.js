import { m, round } from '../helpers.js';
import { tf, approx } from './shared.js';

/** אורך משיק מנקודה חיצונית: רדיוס ⊥ משיק → פיתגורס. */
function tangentLength(r, d) {
  const t = Math.sqrt(d * d - r * r);
  if (!Number.isInteger(t)) throw new Error('not whole');
  return { q: m`רדיוס $${r}$, והמרחק מהנקודה החיצונית $P$ למרכז $${d}$. אורך המשיק מ-$P$: [[${t}]]` };
}

/** שני משיקים מ-P: ∠APB ו-∠AOB משלימים ל-180° (מרובע עם שתי זוויות ישרות). */
const tangentAngle = (apb) => ({ q: m`שני משיקים מנקודה $P$ נוגעים במעגל ב-$A$ וב-$B$, ו-$\angle APB = ${apb}°$. $\;\angle AOB =$ [[${180 - apb}]] $°$` });

/** במרובע חסום — זוויות נגדיות משלימות ל-180°. */
const cyclicOpposite = (A) => ({ q: m`מרובע $ABCD$ חסום במעגל, $\;\angle A = ${A}°$. $\;\angle C =$ [[${180 - A}]] $°$` });

function isCyclic(angles) {
  const [A, B, C, D] = angles;
  if (A + B + C + D !== 360) throw new Error('angles must sum to 360');
  return {
    q: m`זוויות המרובע $ABCD$ לפי הסדר: $${angles.map((a) => `${a}°`).join(',\\;')}$. האם אפשר לחסום אותו במעגל?`,
    options: ['כן', 'לא'],
    answer: A + C === 180 ? 0 : 1,
  };
}

/** מעגל חסום במשולש: קטעי המשיקים מהקודקודים. */
function incircleSegments(a, b, c) {
  // a = BC, b = CA, c = AB; המשיק מ-A הוא s - a
  const s = (a + b + c) / 2;
  return {
    q: m`במשולש $ABC$ חסום מעגל. $\;AB = ${c}$, $BC = ${a}$, $CA = ${b}$.`,
    a: m`קטע המשיק מ-$A$: [[${s - a}]] $\quad$ מ-$B$: [[${s - b}]] $\quad$ מ-$C$: [[${s - c}]]`,
  };
}

export default {
  id: 'g11-u4-circle-tangents',
  grade: 11,
  emoji: '🎯',
  title: 'משיקים למעגל, מרובע חסום ומעגל חוסם/חסום במשולש',
  reminder: [
    {
      title: 'משיק',
      md: m`**המשיק מאונך לרדיוס** בנקודת ההשקה.

**שני משיקים מאותה נקודה חיצונית — שווים באורכם**: $PA = PB$.`,
    },
    {
      title: 'מרובע חסום במעגל',
      md: m`אפשר לחסום מרובע במעגל **אם ורק אם** סכום כל זוג **זוויות נגדיות** הוא $180°$: $\;\angle A + \angle C = 180°$.`,
    },
    {
      title: 'מעגל חוסם ומעגל חסום',
      wide: true,
      md: m`לכל משולש יש מעגל **חוסם** (מרכזו — מפגש האנכים האמצעיים) ומעגל **חסום** (מרכזו — מפגש חוצי הזוויות).

במשולש **ישר-זווית**, מרכז המעגל החוסם הוא אמצע היתר: $\;R = \frac{\text{יתר}}{2}$.`,
    },
  ],
  pages: [
    {
      title: 'משיקים',
      exercises: [
        { title: 'אורך המשיק.', cols: 1, items: [tangentLength(5, 13), tangentLength(6, 10), tangentLength(8, 17), tangentLength(7, 25)] },
        { title: 'שני משיקים מאותה נקודה.', cols: 1, items: [tangentAngle(60), tangentAngle(40), tangentAngle(90)] },
        {
          title: 'השלימו.',
          cols: 1,
          items: [
            { q: m`$PA$ ו-$PB$ משיקים מנקודה $P$, ו-$PA = 9$. $\;PB =$ [[9]]` },
            { q: m`$PA$ משיק למעגל ב-$A$, ו-$O$ המרכז. $\;\angle OAP =$ [[90]] $°$` },
            {
              q: m`$PA$ ו-$PB$ משיקים, $\angle APB = 50°$. המשולש $APB$ שווה-שוקיים, ולכן $\angle PAB =$ [[${(180 - 50) / 2}]] $°$`,
            },
          ],
        },
      ],
    },
    {
      title: 'מרובע חסום, ומעגל חוסם/חסום',
      exercises: [
        { title: 'מרובע חסום.', cols: 1, items: [cyclicOpposite(70), cyclicOpposite(115), cyclicOpposite(88)] },
        { title: 'האם אפשר לחסום במעגל?', cols: 1, items: [isCyclic([85, 100, 95, 80]), isCyclic([70, 110, 100, 80]), isCyclic([90, 90, 90, 90])] },
        { title: 'קטעי משיקים במשולש עם מעגל חסום.', cols: 1, items: [incircleSegments(8, 9, 7), incircleSegments(10, 12, 14)] },
        {
          title: 'מעגל חוסם משולש ישר-זווית.',
          cols: 1,
          items: [
            { q: m`ניצבים $6$ ו-$8$. רדיוס המעגל החוסם:`, a: `[[${10 / 2}]]` },
            { q: m`ניצבים $5$ ו-$12$. רדיוס המעגל החוסם:`, a: `[[${13 / 2}]]` },
            { q: m`ניצבים $6$ ו-$8$. שטח העיגול החוסם ($\pi \approx 3.14$):`, a: approx(3.14 * 25) },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('לכל מלבן אפשר לחסום מעגל מסביב (מעגל חוסם).', true),
            tf('לכל מקבילית אפשר לחסום מעגל מסביב.', false),
            tf('מרכז המעגל החסום במשולש הוא מפגש חוצי הזוויות.', true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'אורך המשיק.', cols: 1, items: [tangentLength(9, 15)] },
      { title: 'שני משיקים.', cols: 1, items: [tangentAngle(72)] },
      { title: 'מרובע חסום.', cols: 1, items: [cyclicOpposite(64), isCyclic([75, 95, 105, 85])] },
      { title: 'קטעי משיקים.', cols: 1, items: [incircleSegments(13, 14, 15)] },
      { title: 'מעגל חוסם.', cols: 1, items: [{ q: m`ניצבים $9$ ו-$12$. רדיוס המעגל החוסם:`, a: `[[${round(15 / 2)}]]` }] },
    ],
  },
};

/** מחוללי פריטים — לשימוש חוזר בדפי התרגול המסכם. */
export { tangentLength, tangentAngle, cyclicOpposite, isCyclic, incircleSegments };
