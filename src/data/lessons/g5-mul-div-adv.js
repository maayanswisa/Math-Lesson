import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g5-mul-div-adv',
  topicId: 'g5-mul-div-adv',
  grade: 5,
  emoji: '➗',
  title: 'ארבע פעולות החשבון',
  subtitle: 'סדר פעולות, בדיקה בפעולה ההפוכה, חילוק עם שארית ואומדן',
  sections: [
    {
      id: 'order',
      emoji: '🚦',
      title: 'סדר הפעולות',
      blocks: [
        {
          type: 'text',
          md: m`בתרגיל עם כמה פעולות, יש **סדר** קבוע — כמו רמזור:

1. 🔴 **סוגריים** קודם
2. 🟡 אחר כך **כפל וחילוק**
3. 🟢 בסוף **חיבור וחיסור**`,
        },
        {
          type: 'steps',
          title: m`פותרים: $20+3\times(8-2)$`,
          steps: [
            { math: m`20+3\times${c(RED, '(8-2)')}`, note: '🔴 קודם הסוגריים: $8-2=6$' },
            { math: m`20+${c(VIOLET, '3\\times6')}`, note: '🟡 אחר כך כפל: $3\\times6=18$' },
            { math: m`20+18=${c(GREEN, '38')}`, note: '🟢 בסוף חיבור.' },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'מלכודת נפוצה',
          md: m`$20+3\times6$ **אינו** $23\times6$! קודם כפל, ורק אחר כך חיבור.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $50-4\times10$?`,
        answer: 10,
        hint: 'קודם הכפל!',
        explain: m`$4\times10=40$, ואז $50-40=10$.`,
      },
    },
    {
      id: 'check',
      emoji: '🔍',
      title: 'בודקים בפעולה ההפוכה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'כל פעולה והפוכה שלה',
          md: m`חיבור ↔ חיסור · כפל ↔ חילוק

אם $25\times4=100$, אז $100\div4$ חייב לצאת $25$. ✔️`,
        },
        {
          type: 'steps',
          title: m`בודקים: $350+128=478$?`,
          steps: [
            { math: m`478-128`, note: 'מחסרים את מה שהוספנו.' },
            { math: m`=350\ \checkmark`, note: 'חזרנו למספר ההתחלתי — החישוב נכון!' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איך בודקים ש-$63\div7=9$?`,
        options: [m`$63+7$`, m`$9\times7$`, m`$63-9$`, m`$9\div7$`],
        answer: 1,
        hint: 'מה ההפך של חילוק?',
        explain: m`$9\times7=63$ ✔️ — כפל הוא הפעולה ההפוכה לחילוק.`,
      },
    },
    {
      id: 'remainder',
      emoji: '🍪',
      title: 'חילוק עם שארית',
      blocks: [
        {
          type: 'text',
          md: m`מחלקים 17 עוגיות ל-5 ילדים. כל אחד מקבל 3 (זה 15 עוגיות), ו**נשארות 2**.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'כותבים כך',
          md: m`$17\div5=3$ **שארית** $2$

בדיקה: $3\times5+2=17$ ✔️`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'אומדן לפני חישוב',
          md: m`$498\times21$? עגלו: $500\times20=10{,}000$. התשובה המדויקת צריכה להיות **קרובה** לזה.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה השארית של $29\div4$?`,
        answer: 1,
        hint: m`כמה פעמים 4 נכנס ב-29? $4\times7=28$.`,
        explain: m`$29\div4=7$ שארית $1$, כי $7\times4+1=29$.`,
      },
    },
  ],
};
