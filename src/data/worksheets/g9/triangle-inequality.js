import { m } from '../helpers.js';
import { tf } from './shared.js';

const exists = (a, b, c) => {
  const [x, y, z] = [a, b, c].sort((p, q) => p - q);
  return { q: m`צלעות $${a}$, $${b}$, $${c}$ — האם קיים משולש כזה?`, options: ['כן', 'לא'], answer: x + y > z ? 0 : 1 };
};

/** הצלע השלישית c: |a - b| < c < a + b — הערכים השלמים הקטן והגדול ביותר. */
const thirdSide = (a, b) => ({
  q: m`שתי צלעות במשולש: $${a}$ ו-$${b}$. הצלע השלישית היא מספר שלם.`,
  a: m`הקטנה ביותר: [[${Math.abs(a - b) + 1}]] $\qquad$ הגדולה ביותר: [[${a + b - 1}]]`,
});

/** מול הצלע הגדולה — הזווית הגדולה. */
function biggestAngle(sides) {
  const names = ['A', 'B', 'C'];
  // a = BC מול A, b = CA מול B, c = AB מול C
  const idx = sides.indexOf(Math.max(...sides));
  return {
    q: m`במשולש $ABC$: $BC = ${sides[0]}$, $CA = ${sides[1]}$, $AB = ${sides[2]}$. איזו זווית הגדולה ביותר?`,
    options: names.map((n) => m`$\angle ${n}$`),
    answer: idx,
  };
}

function longestSide(angles) {
  // angles = [A, B, C]; הצלע הארוכה מול הזווית הגדולה
  const opposite = ['BC', 'CA', 'AB'];
  const idx = angles.indexOf(Math.max(...angles));
  return {
    q: m`במשולש $ABC$: $\angle A = ${angles[0]}°$, $\angle B = ${angles[1]}°$, $\angle C = ${angles[2]}°$. איזו צלע הארוכה ביותר?`,
    options: opposite.map((s) => m`$${s}$`),
    answer: idx,
  };
}

export default {
  id: 'g9r-triangle-inequality',
  grade: 9,
  emoji: '📏',
  title: 'אי-שוויון המשולש והיחס בין צלעות לזוויות',
  reminder: [
    {
      title: 'אי-שוויון המשולש',
      md: m`**כל צלע קטנה מסכום שתי האחרות.** מספיק לבדוק את הארוכה: $3, 4, 8$ — $3 + 4 = 7 < 8$ ← אין משולש.

הצלע השלישית: $\;|a - b| < c < a + b$`,
    },
    {
      title: 'צלעות וזוויות',
      md: m`**מול צלע ארוכה יותר — זווית גדולה יותר** (ולהפך).

הצלע הארוכה ביותר מול הזווית הגדולה ביותר; הקצרה מול הקטנה.`,
    },
  ],
  pages: [
    {
      title: 'האם קיים משולש?',
      exercises: [
        { title: 'בדקו.', cols: 1, items: [exists(3, 4, 5), exists(3, 4, 8), exists(5, 5, 10), exists(6, 7, 12), exists(2, 9, 10), exists(1, 1, 1)] },
        { title: 'טווח הצלע השלישית.', cols: 1, items: [thirdSide(5, 8), thirdSide(4, 4), thirdSide(10, 3), thirdSide(7, 12)] },
      ],
    },
    {
      title: 'צלעות וזוויות',
      exercises: [
        { title: 'איזו זווית הגדולה ביותר?', cols: 1, items: [biggestAngle([7, 5, 9]), biggestAngle([12, 8, 6]), biggestAngle([4, 10, 7])] },
        { title: 'איזו צלע הארוכה ביותר?', cols: 1, items: [longestSide([50, 70, 60]), longestSide([100, 30, 50]), longestSide([45, 45, 90])] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('במשולש ישר-זווית, היתר הוא הצלע הארוכה ביותר.', true),
            tf('אם שתי זוויות במשולש שוות, גם הצלעות שמולן שוות.', true),
            tf('קיים משולש עם צלעות 2, 3 ו-5.', false),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'האם קיים משולש?', cols: 1, items: [exists(4, 6, 9), exists(5, 8, 13)] },
      { title: 'טווח הצלע השלישית.', cols: 1, items: [thirdSide(9, 4)] },
      { title: 'צלעות וזוויות.', cols: 1, items: [biggestAngle([6, 11, 8]), longestSide([35, 85, 60])] },
    ],
  },
};
