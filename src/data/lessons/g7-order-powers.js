import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g7-order-powers',
  topicId: 'g7-order-powers',
  grade: 7,
  emoji: '🧮',
  title: 'סדר פעולות וחזקות',
  subtitle: 'מה עושים קודם — וחזקות של מספרים שליליים',
  sections: [
    {
      id: 'order',
      emoji: '🪜',
      title: 'סדר הפעולות',
      blocks: [
        {
          type: 'text',
          md: m`כמה זה $2+3\times4$? אם מחשבים משמאל לימין מקבלים $20$, אבל התשובה הנכונה היא $14$. כדי שכולם יקבלו אותה תוצאה, קבעו **סדר קבוע**:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ארבע מדרגות',
          md: m`**1.** סוגריים

**2.** חזקות

**3.** כפל וחילוק — משמאל לימין

**4.** חיבור וחיסור — משמאל לימין`,
        },
        {
          type: 'steps',
          title: m`$20-2\times(3+4)$`,
          steps: [
            { math: m`20-2\times${c(VIOLET, '7')}`, note: 'קודם הסוגריים.' },
            { math: m`20-${c(VIOLET, '14')}`, note: 'אחר כך הכפל.' },
            { math: c(GREEN, '6'), note: 'ובסוף החיסור.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $18-12:(2+4)$?`,
        answer: 16,
        hint: m`סוגריים: $2+4=6$. אחר כך חילוק: $12:6$.`,
        explain: m`$18-12:6=18-2=16$`,
      },
    },
    {
      id: 'powers',
      emoji: '⚡',
      title: 'חזקות',
      blocks: [
        {
          type: 'text',
          md: m`חזקה היא כפל חוזר: $2^3=2\times2\times2=8$. המספר הגדול ($2$) הוא **הבסיס**, והקטן למעלה ($3$) הוא **המעריך** — כמה פעמים כופלים.`,
        },
        {
          type: 'steps',
          title: 'חזקות של מספר שלילי',
          steps: [
            { math: m`(-2)^2=(-2)\times(-2)=${c(GREEN, '4')}`, note: 'שני מינוסים — התוצאה חיובית.' },
            { math: m`(-2)^3=4\times(-2)=${c(RED, '-8')}`, note: 'שלושה מינוסים — שלילית.' },
            { math: m`(-2)^4=${c(GREEN, '16')}`, note: 'ארבעה — שוב חיובית.' },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'הכלל',
          md: m`בסיס שלילי: מעריך **זוגי** ← תוצאה חיובית. מעריך **אי-זוגי** ← תוצאה שלילית.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $(-3)^3$?`,
        options: [m`$27$`, m`$-27$`, m`$-9$`, m`$9$`],
        answer: 1,
        hint: 'המעריך 3 — אי-זוגי.',
        explain: m`$(-3)\times(-3)\times(-3)=9\times(-3)=-27$`,
      },
    },
    {
      id: 'trap',
      emoji: '⚠️',
      title: 'המלכודת: איפה הסוגריים?',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: m`$(-3)^2$ לעומת $-3^2$`,
          md: m`$(-3)^2=(-3)\times(-3)=${c(GREEN, '9')}$ — הסוגריים אומרים: מעלים בריבוע את **כל** המספר, כולל המינוס.

$-3^2=-(3\times3)=${c(RED, '-9')}$ — בלי סוגריים, החזקה "תופסת" רק את ה-$3$, והמינוס נשאר בחוץ.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $-4^2+20$?`,
        answer: 4,
        hint: m`$-4^2=-16$ (בלי סוגריים!).`,
        explain: m`$-16+20=4$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: הכול ביחד',
      blocks: [
        {
          type: 'steps',
          title: m`$(-2)^2\times3-10:2$`,
          steps: [
            { math: m`${c(VIOLET, '4')}\times3-10:2`, note: 'חזקה.' },
            { math: m`${c(VIOLET, '12')}-${c(VIOLET, '5')}`, note: 'כפל וחילוק.' },
            { math: c(GREEN, '7'), note: 'חיסור.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $5-(-1)^3\times2^2$?`,
        answer: 9,
        hint: m`$(-1)^3=-1$ ו-$2^2=4$. מה זה $(-1)\times4$?`,
        explain: m`$5-(-1)\times4=5-(-4)=5+4=9$`,
      },
    },
  ],
};
