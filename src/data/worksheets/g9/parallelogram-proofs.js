import { m } from '../helpers.js';
import { tf } from './shared.js';

const YES_NO = ['כן', 'לא'];
/** האם התנאי מספיק כדי להוכיח שהמרובע מקבילית? */
const enough = (cond, yes) => ({ q: m`${cond}`, options: YES_NO, answer: yes ? 0 : 1 });

const angles = (A) => ({ q: m`במקבילית $ABCD$: $\angle A = ${A}°$.`, a: m`$\angle B =$ [[${180 - A}]] $° \qquad \angle C =$ [[${A}]] $°$` });
const angleExpr = (k, extra) => {
  // ∠A = x, ∠B = kx + extra, משלימות ל-180°
  const x = (180 - extra) / (k + 1);
  if (!Number.isInteger(x)) throw new Error('not whole');
  const B = `${k === 1 ? '' : k}x${extra ? ` + ${extra}°` : ''}`;
  return { q: m`במקבילית, $\angle A = x$ ו-$\angle B = ${B}$.`, a: m`$x =$ [[${x}]] $° \qquad \angle B =$ [[${180 - x}]] $°$` };
};
const diagonals = (ao, bo) => ({ q: m`האלכסונים של המקבילית $ABCD$ נפגשים ב-$O$: $AO = ${ao}$, $BO = ${bo}$.`, a: m`$AC =$ [[${2 * ao}]] $\qquad BD =$ [[${2 * bo}]]` });
const perimeter = (a, b) => ({ q: m`צלעות המקבילית $${a}$ ו-$${b}$. ההיקף: [[${2 * (a + b)}]]` });

export default {
  id: 'g9r-parallelogram-proofs',
  grade: 9,
  emoji: '▱',
  title: 'מקבילית — תכונות והוכחות',
  reminder: [
    {
      title: 'תכונות המקבילית',
      md: m`- צלעות נגדיות **שוות** (וגם מקבילות)
- זוויות נגדיות **שוות**, זוויות סמוכות **משלימות** ל-$180°$
- האלכסונים **חוצים זה את זה**`,
    },
    {
      title: 'דרכים להוכיח שמרובע הוא מקבילית',
      md: m`שני זוגות צלעות נגדיות מקבילות · **או** שני זוגות צלעות נגדיות שוות · **או** זוג צלעות נגדיות שוות ומקבילות · **או** האלכסונים חוצים זה את זה · **או** שני זוגות זוויות נגדיות שוות`,
    },
    {
      title: 'קטע אמצעים במשולש',
      md: m`מחבר אמצעי שתי צלעות — מקביל לצלע השלישית ושווה למחציתה (מוכיחים בעזרת מקבילית).`,
    },
  ],
  pages: [
    {
      title: 'חישובים במקבילית',
      exercises: [
        { title: 'זוויות.', cols: 1, items: [angles(64), angles(118), angleExpr(2, 0), angleExpr(3, 20), angleExpr(1, 40)] },
        { title: 'אלכסונים והיקף.', cols: 1, items: [diagonals(5, 7), diagonals(4.5, 8), perimeter(9, 6), perimeter(12.5, 4)] },
        {
          title: 'נתון חסר.',
          cols: 1,
          items: [
            { q: m`היקף מקבילית $36$, וצלע אחת $11$. הצלע השנייה: [[${36 / 2 - 11}]]` },
            { q: m`במקבילית, $AB = 3x + 1$ ו-$CD = 2x + 6$. $\;x =$ [[5]] $\quad AB =$ [[16]]` },
          ],
        },
      ],
    },
    {
      title: 'זיהוי מקבילית',
      exercises: [
        {
          title: 'האם הנתון מספיק כדי לקבוע שהמרובע הוא מקבילית?',
          cols: 1,
          items: [
            enough('שני זוגות של צלעות נגדיות שוות.', true),
            enough('האלכסונים חוצים זה את זה.', true),
            enough('זוג אחד של צלעות נגדיות מקבילות.', false),
            enough('זוג אחד של צלעות נגדיות שוות ומקבילות.', true),
            enough('האלכסונים שווים.', false),
            enough('שני זוגות של זוויות נגדיות שוות.', true),
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('במקבילית, האלכסונים חוצים את הזוויות.', false),
            tf('כל מלבן הוא מקבילית.', true),
            tf('אם במרובע זוג צלעות נגדיות מקבילות וזוג אחר שווה — הוא בהכרח מקבילית.', false),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חישובים.', cols: 1, items: [angles(73), angleExpr(4, 30), diagonals(6.5, 9)] },
      { title: 'האם הנתון מספיק?', cols: 1, items: [enough('צלע אחת מקבילה לצלע שמולה ושווה לה.', true), enough('שתי צלעות סמוכות שוות.', false)] },
    ],
  },
};
