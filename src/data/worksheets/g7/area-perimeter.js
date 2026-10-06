import { m, round, triangleFig, parallelogramFig, trapezoidFig } from '../helpers.js';
import { tf } from './shared.js';

const PI = 3.14;
const SQ = 'סמ״ר';

const rect = (a, b) => ({ q: m`מלבן $${a} \times ${b}$ ס״מ.`, a: m`שטח: [[${a * b}]] ${SQ} · היקף: [[${2 * (a + b)}]] ס״מ` });
const tri = (b, h, apex = 0.4) => ({ q: '', figure: triangleFig({ base: b, height: h, apex }), a: m`שטח: [[${(b * h) / 2}]] ${SQ}` });
const para = (b, h) => ({ q: '', figure: parallelogramFig({ base: b, height: h }), a: m`שטח: [[${b * h}]] ${SQ}` });
const trap = (top, bottom, h) => ({ q: '', figure: trapezoidFig({ top, bottom, height: h }), a: m`שטח: [[${((top + bottom) / 2) * h}]] ${SQ}` });

/** מעגל: היקף ושטח עם π ≈ 3.14. הסטייה המותרת מקבלת גם חישוב עם π מדויק יותר. */
const circle = (r) => {
  const P = round(2 * PI * r, 2);
  const S = round(PI * r * r, 2);
  return { q: m`מעגל ברדיוס $${r}$ ס״מ.`, a: m`היקף: [[n:${P}~${round(0.004 * r + 0.02, 2)}]] ס״מ · שטח: [[n:${S}~${round(0.002 * r * r + 0.02, 2)}]] ${SQ}` };
};

/** צלע חסרה ממלבן לפי שטח. */
const rectSide = (S, a) => ({ q: m`שטח מלבן $${S}$ ${SQ} ואורכו $${a}$ ס״מ.`, a: m`רוחבו: [[${S / a}]] ס״מ · היקפו: [[${2 * (a + S / a)}]] ס״מ` });

/** גובה משולש לפי שטח ובסיס. */
const triHeight = (S, b) => ({ q: m`שטח משולש $${S}$ ${SQ} ובסיסו $${b}$ ס״מ. הגובה לבסיס:`, a: m`[[${(2 * S) / b}]] ס״מ` });

export default {
  id: 'g7-area-perimeter',
  grade: 7,
  emoji: '📏',
  title: 'שטחים והיקפים',
  reminder: [
    {
      title: 'נוסחאות שטח',
      wide: true,
      md: m`מלבן: $a \cdot b$ · משולש: $\frac{a \cdot h}{2}$ · מקבילית: $a \cdot h$ · טרפז: $\frac{(a + b) \cdot h}{2}$

הגובה תמיד **מאונך** לבסיס (בשרטוט — הקו המקווקו).`,
    },
    {
      title: 'מעגל',
      md: m`היקף: $2\pi r$ · שטח: $\pi r^2$ · בדף הזה $\pi \approx 3.14$

$r = 10$: היקף $\approx 62.8$, שטח $\approx 314$.`,
    },
  ],
  pages: [
    {
      title: 'מצולעים',
      exercises: [
        { title: 'מלבנים.', cols: 1, items: [rect(8, 5), rect(12, 3)] },
        { title: 'משולשים.', cols: 2, items: [tri(10, 6), tri(7, 4, 0), tri(9, 8, 1.3)] },
        { title: 'מקביליות וטרפזים.', cols: 2, items: [para(12, 5), para(9, 7), trap(6, 10, 4), trap(5, 13, 6)] },
      ],
    },
    {
      title: 'מעגל ובעיות הפוכות',
      exercises: [
        { title: 'מעגלים ($\\pi \\approx 3.14$).', cols: 1, items: [circle(10), circle(5), circle(3)] },
        { title: 'מצאו את הנתון החסר.', cols: 1, items: [rectSide(48, 8), rectSide(60, 12), triHeight(30, 12), triHeight(24, 4)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('אם מכפילים את הרדיוס פי 2 — ההיקף גדל פי 2.', true),
            tf('אם מכפילים את הרדיוס פי 2 — השטח גדל פי 2.', false),
            tf('למשולש ולמקבילית עם אותו בסיס ואותו גובה — אותו שטח.', false),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו את השטח.', cols: 2, items: [tri(14, 5), para(11, 6), trap(4, 8, 5)] },
      { title: 'מעגל.', cols: 1, items: [circle(4)] },
      { title: 'נתון חסר.', cols: 1, items: [rectSide(54, 9)] },
    ],
  },
};
