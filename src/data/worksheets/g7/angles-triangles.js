import { m } from '../helpers.js';
import { tf, triangleAnglesFig, quadAnglesFig } from './shared.js';

/** משולש: שתי זוויות נתונות, השלישית חסרה. */
const third = (a, b) => ({ q: '', figure: triangleAnglesFig([`${a}°`, `${b}°`, '?']), a: m`$\angle C =$ [[${180 - a - b}]] $°$` });

/** מרובע: שלוש זוויות נתונות. */
const fourth = (a, b, c) => ({ q: '', figure: quadAnglesFig([`${a}°`, `${b}°`, `${c}°`, '?']), a: m`$? =$ [[${360 - a - b - c}]] $°$` });

const BY_ANGLES = ['חד-זווית', 'ישר-זווית', 'קהה-זווית'];
function classify(a, b) {
  const c = 180 - a - b;
  const max = Math.max(a, b, c);
  return { q: m`זוויות המשולש: $${a}°$, $${b}°$ ו-$${c}°$. המשולש:`, options: BY_ANGLES, answer: max < 90 ? 0 : max === 90 ? 1 : 2 };
}

const BY_SIDES = ['שווה-צלעות', 'שווה-שוקיים (לא שווה-צלעות)', 'שונה-צלעות'];
function bySides(a, b, c) {
  const distinct = new Set([a, b, c]).size;
  return { q: m`צלעות: $${a}$, $${b}$, $${c}$`, options: BY_SIDES, answer: distinct === 1 ? 0 : distinct === 2 ? 1 : 2 };
}

/** משולש שווה-שוקיים: זווית הראש → זוויות הבסיס, ולהפך. */
const isoFromApex = (apex) => ({ q: m`במשולש שווה-שוקיים זווית הראש $${apex}°$. כל זווית בסיס:`, a: m`[[${(180 - apex) / 2}]] $°$` });
const isoFromBase = (base) => ({ q: m`במשולש שווה-שוקיים זווית בסיס $${base}°$. זווית הראש:`, a: m`[[${180 - 2 * base}]] $°$` });

export default {
  id: 'g7-angles-triangles',
  grade: 7,
  emoji: '🔺',
  title: 'זוויות במשולשים ובמרובעים',
  reminder: [
    {
      title: 'סכום זוויות',
      md: m`במשולש: $\alpha + \beta + \gamma = 180°$ $\qquad$ במרובע: סכום הזוויות $360°$ (שני משולשים).`,
    },
    {
      title: 'סיווג משולשים',
      md: m`**לפי זוויות**: חד-זווית (כל הזוויות חדות) · ישר-זווית · קהה-זווית.

**לפי צלעות**: שווה-צלעות (כל הזוויות $60°$) · שווה-שוקיים (זוויות הבסיס שוות) · שונה-צלעות.`,
    },
  ],
  pages: [
    {
      title: 'סכום זוויות',
      exercises: [
        { title: 'מצאו את הזווית החסרה במשולש.', cols: 2, items: [third(50, 60), third(90, 35), third(25, 110), third(45, 45)] },
        { title: 'מצאו את הזווית החסרה במרובע.', cols: 2, items: [fourth(90, 90, 70), fourth(100, 80, 120), fourth(75, 105, 75)] },
      ],
    },
    {
      title: 'סיווג ומשולש שווה-שוקיים',
      exercises: [
        { title: 'סווגו לפי זוויות.', cols: 1, items: [classify(50, 60), classify(30, 60), classify(20, 35)] },
        { title: 'סווגו לפי צלעות.', cols: 1, items: [bySides(5, 5, 5), bySides(7, 4, 7), bySides(3, 4, 5)] },
        { title: 'משולש שווה-שוקיים.', cols: 1, items: [isoFromApex(40), isoFromApex(100), isoFromBase(70), isoFromBase(25)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('במשולש יכולות להיות שתי זוויות ישרות.', false),
            tf(m`כל זווית במשולש שווה-צלעות היא $60°$.`, true),
            tf(m`יכול להיות משולש עם זוויות $100°$, $50°$, $40°$.`, 100 + 50 + 40 === 180),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מצאו את הזווית החסרה.', cols: 2, items: [third(72, 48), fourth(85, 95, 110)] },
      { title: 'סווגו.', cols: 1, items: [classify(90, 25), bySides(6, 9, 6)] },
      { title: 'משולש שווה-שוקיים.', cols: 1, items: [isoFromApex(36)] },
    ],
  },
};
