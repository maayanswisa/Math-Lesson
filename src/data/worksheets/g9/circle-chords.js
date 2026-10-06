import { m } from '../helpers.js';
import { tf } from './shared.js';
import { chordDistance, chordLength } from '../g11/plane-circle.js';

const arcFromCentral = (c) => ({ q: m`זווית מרכזית $${c}°$. הקשת שהיא נשענת עליה: [[${c}]] $°$, והקשת המשלימה: [[${360 - c}]] $°$` });

/** משולש שווה-שוקיים OAB (OA = OB רדיוסים): מהזווית המרכזית לזוויות הבסיס. */
const isoscelesOAB = (c) => ({
  q: m`$O$ מרכז המעגל, $AB$ מיתר, $\angle AOB = ${c}°$.`,
  a: m`$\angle OAB =$ [[${(180 - c) / 2}]] $°$ (כי $OA = OB$)`,
});

const halfChord = (chord) => ({ q: m`האנך מהמרכז למיתר באורך $${chord}$ חוצה אותו. כל חצי: [[${chord / 2}]]` });

export default {
  id: 'g9r-circle-chords',
  grade: 9,
  emoji: '⭕',
  title: 'מעגל: מושגי יסוד, זוויות מרכזיות ומיתרים',
  reminder: [
    {
      title: 'מושגים',
      md: m`**רדיוס** — מהמרכז למעגל · **קוטר** $= 2 \times$ רדיוס · **מיתר** — קטע בין שתי נקודות על המעגל · **קשת** — חלק מהמעגל`,
    },
    {
      title: 'זווית מרכזית',
      md: m`הקודקוד במרכז. **הזווית המרכזית = מספר המעלות של הקשת** שהיא נשענת עליה. כל המעגל $360°$.`,
    },
    {
      title: 'מיתרים',
      md: m`**האנך מהמרכז למיתר חוצה אותו** — ולכן $r^2 = d^2 + (\frac{c}{2})^2$.

מיתרים **שווים** ⟺ **באותו מרחק** מהמרכז ⟺ נשענים על **קשתות שוות**. ככל שהמיתר קרוב יותר למרכז — הוא **ארוך** יותר; הקוטר הארוך מכולם.`,
    },
  ],
  pages: [
    {
      title: 'זוויות מרכזיות וקשתות',
      exercises: [
        { title: 'קשתות.', cols: 1, items: [arcFromCentral(80), arcFromCentral(150), arcFromCentral(36)] },
        { title: 'משולש שבין שני רדיוסים.', cols: 1, items: [isoscelesOAB(100), isoscelesOAB(60), isoscelesOAB(140)] },
        {
          title: 'השלימו.',
          cols: 1,
          items: [
            { q: m`רדיוס $7$. הקוטר: [[14]]` },
            { q: m`המעגל מחולק ל-$6$ קשתות שוות. הזווית המרכזית של כל אחת: [[${360 / 6}]] $°$` },
            { q: m`$\angle AOB = 60°$ ו-$OA = 5$. המשולש $AOB$ שווה-צלעות, ולכן $AB =$ [[5]]` },
          ],
        },
      ],
    },
    {
      title: 'מיתרים ומרחק מהמרכז',
      exercises: [
        { title: 'האנך מהמרכז חוצה את המיתר.', cols: 2, items: [halfChord(16), halfChord(9)] },
        { title: 'מרחק המיתר מהמרכז.', cols: 1, items: [chordDistance(5, 8), chordDistance(10, 16), chordDistance(13, 10)] },
        { title: 'אורך המיתר.', cols: 1, items: [chordLength(5, 4), chordLength(15, 9), chordLength(25, 24)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('הקוטר הוא המיתר הארוך ביותר במעגל.', true),
            tf('מיתר שקרוב יותר למרכז — קצר יותר.', false),
            tf('מיתרים שווים נשענים על זוויות מרכזיות שוות.', true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'קשתות וזוויות.', cols: 1, items: [arcFromCentral(124), isoscelesOAB(80)] },
      { title: 'מיתרים.', cols: 1, items: [chordDistance(17, 16), chordLength(10, 8)] },
      { title: 'נכון או לא נכון?', cols: 1, items: [tf('אם שני מיתרים באותו מרחק מהמרכז — הם שווים.', true)] },
    ],
  },
};
