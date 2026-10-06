import { m, round } from '../helpers.js';
import { approx, tf } from './shared.js';

const YES_NO = ['כן', 'לא'];
const enough = (cond, yes) => ({ q: cond, options: YES_NO, answer: yes ? 0 : 1 });

/** במלבן האלכסונים שווים וחוצים זה את זה. */
const diag = (a, b) => {
  const d = Math.sqrt(a * a + b * b);
  return {
    q: m`מלבן $ABCD$ עם צלעות $${a}$ ו-$${b}$, האלכסונים נפגשים ב-$O$.`,
    a: Number.isInteger(d) ? m`$AC =$ [[${d}]] $\quad BD =$ [[${d}]] $\quad AO =$ [[${d / 2}]]` : m`$AC \approx$ ${approx(d)} $\quad AO \approx$ ${approx(d / 2)}`,
  };
};

/** התיכון ליתר = מחצית היתר. */
const median = (a, b) => ({ q: m`משולש ישר-זווית עם ניצבים $${a}$ ו-$${b}$. התיכון ליתר: [[${round(Math.sqrt(a * a + b * b) / 2)}]]` });

/** זווית בין אלכסון לצלע במלבן → זוויות במשולשים שווי-השוקיים. */
const angleInRect = (alpha) => ({
  q: m`במלבן $ABCD$ ($O$ מפגש האלכסונים), $\angle OAB = ${alpha}°$.`,
  a: m`$\angle OBA =$ [[${alpha}]] $° \quad \angle AOB =$ [[${180 - 2 * alpha}]] $° \quad \angle OAD =$ [[${90 - alpha}]] $°$`,
});

export default {
  id: 'g9r-rectangle-proofs',
  grade: 9,
  emoji: '▭',
  title: 'מלבן — תכונות והוכחות',
  reminder: [
    {
      title: 'תכונות המלבן',
      md: m`כל תכונות המקבילית, ובנוסף: **כל הזוויות ישרות** ו**האלכסונים שווים**.

לכן $AO = BO = CO = DO$ — המשולשים שהאלכסונים יוצרים **שווי-שוקיים**.`,
    },
    {
      title: 'זיהוי מלבן',
      md: m`**מקבילית + זווית ישרה אחת** ← מלבן
**מקבילית + אלכסונים שווים** ← מלבן
מרובע עם **3 זוויות ישרות** ← מלבן`,
    },
    {
      title: 'התיכון ליתר',
      md: m`במשולש ישר-זווית, **התיכון ליתר שווה למחצית היתר** (כי המשולש הוא חצי מלבן).

**דוגמה נגדית אחת** מספיקה כדי להראות שטענה לא נכונה.`,
    },
  ],
  pages: [
    {
      title: 'חישובים במלבן',
      exercises: [
        { title: 'אלכסונים.', cols: 1, items: [diag(6, 8), diag(5, 12), diag(9, 12), diag(3, 5)] },
        { title: 'זוויות.', cols: 1, items: [angleInRect(30), angleInRect(52), angleInRect(65)] },
        { title: 'התיכון ליתר.', cols: 2, items: [median(6, 8), median(5, 12), median(9, 40), median(8, 15)] },
      ],
    },
    {
      title: 'זיהוי מלבן וטענות',
      exercises: [
        {
          title: 'האם הנתון מספיק כדי לקבוע שהמרובע הוא מלבן?',
          cols: 1,
          items: [
            enough('מקבילית עם זווית ישרה אחת.', true),
            enough('מקבילית שבה האלכסונים שווים.', true),
            enough('מרובע שבו האלכסונים שווים.', false),
            enough('מרובע עם שלוש זוויות ישרות.', true),
            enough('מקבילית שבה האלכסונים מאונכים.', false),
          ],
        },
        {
          title: 'טענה תמיד-נכונה או לא?',
          cols: 1,
          items: [
            tf('בכל מלבן האלכסונים חוצים את הזוויות.', false),
            tf('בכל מלבן האלכסונים שווים.', true),
            tf('כל מרובע שאלכסוניו שווים הוא מלבן.', false),
            tf('אם התיכון לצלע במשולש שווה למחצית הצלע — המשולש ישר-זווית.', true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חישובים.', cols: 1, items: [diag(12, 16), angleInRect(40), median(7, 24)] },
      { title: 'האם הנתון מספיק?', cols: 1, items: [enough('מקבילית שבה זווית אחת היא 90°.', true), enough('טרפז שבו האלכסונים שווים.', false)] },
    ],
  },
};
