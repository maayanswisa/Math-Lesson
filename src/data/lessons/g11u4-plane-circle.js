import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g11u4-plane-circle',
  topicId: 'g11-u4-plane-circle',
  grade: 11,
  units: 4,
  emoji: '⭕',
  title: 'המעגל: זוויות, קשתות ומיתרים',
  subtitle: 'זווית מרכזית, זווית היקפית, והמשפטים שמחברים ביניהן',
  sections: [
    {
      id: 'terms',
      emoji: '🏷️',
      title: 'מושגי יסוד',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'המילון',
          md: m`**מיתר** — קטע בין שתי נקודות על המעגל. **קוטר** — מיתר שעובר דרך המרכז (הארוך ביותר).

**זווית מרכזית** — הקודקוד ב**מרכז**. **זווית היקפית** — הקודקוד **על המעגל**.

זוויות מרכזיות שוות ⟺ מיתרים שווים ⟺ קשתות שוות.`,
        },
        {
          type: 'circletheorems',
          mode: 'chord',
          caption: 'האנך מהמרכז למיתר תמיד חוצה אותו. הזיזו את המיתר:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'במעגל ברדיוס 5 יש מיתר באורך 8. מה המרחק של המיתר מהמרכז?',
        answer: 3,
        hint: m`האנך חוצה את המיתר: חצי מיתר $4$, רדיוס $5$ — פיתגורס.`,
        explain: m`$\sqrt{5^2-4^2}=\sqrt9=3$`,
      },
    },
    {
      id: 'inscribed',
      emoji: '✨',
      title: 'המשפט המרכזי',
      blocks: [
        {
          type: 'circletheorems',
          mode: 'inscribed',
          caption: 'הזיזו את הנקודה על המעגל. מה היחס בין הזווית ההיקפית למרכזית?',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'זווית היקפית = חצי מרכזית',
          md: m`זווית היקפית שווה ל**מחצית** הזווית המרכזית הנשענת על אותה קשת.

מכאן: כל הזוויות ההיקפיות שנשענות על **אותה קשת** — **שוות** זו לזו.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: 'זווית מרכזית של 140° נשענת על קשת. מה גודל זווית היקפית הנשענת על אותה קשת?',
        answer: 70,
        hint: 'חצי.',
        explain: m`$140°:2=70°$`,
      },
    },
    {
      id: 'diameter',
      emoji: '⌀',
      title: 'זווית על קוטר',
      blocks: [
        {
          type: 'steps',
          title: 'למה זווית היקפית על קוטר היא ישרה?',
          steps: [
            { math: m`${c(VIOLET, '180°')}`, note: 'הקוטר הוא "זווית מרכזית" שטוחה.' },
            { math: m`180°:2=${c(GREEN, '90°')}`, note: 'זווית היקפית = חצי ממנה.' },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'וגם ההפך',
          md: 'אם זווית היקפית ישרה — המיתר שעליו היא נשענת הוא **קוטר**. שימושי מאוד כדי למצוא מרכז של מעגל!',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`המשולש $ABC$ חסום במעגל, ו-$AB$ קוטר. $AC=6$, $BC=8$. מה אורך הרדיוס?`,
        answer: 5,
        hint: m`$\angle C=90°$ — פיתגורס נותן את הקוטר.`,
        explain: m`$AB=\sqrt{36+64}=10$, והרדיוס $5$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שילוב',
      blocks: [
        {
          type: 'text',
          md: m`הנקודות $A,B,C,D$ על מעגל שמרכזו $O$. $\angle AOB=100°$. הנקודות $C$ ו-$D$ נמצאות על הקשת הגדולה.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה נכון לגבי $\angle ACB$ ו-$\angle ADB$?`,
        options: [m`$\angle ACB=100°$, $\angle ADB=50°$`, m`שתיהן $50°$`, m`שתיהן $100°$`, m`$\angle ACB+\angle ADB=180°$`],
        answer: 1,
        hint: 'שתיהן היקפיות על אותה קשת AB.',
        explain: m`זוויות היקפיות על אותה קשת שוות, וכל אחת חצי מהמרכזית: $50°$.`,
      },
    },
  ],
};
