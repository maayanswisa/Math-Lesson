import { m } from './tex.js';

export default {
  id: 'g3-mul-div-100',
  topicId: 'g3-mul-div-100',
  grade: 3,
  emoji: '✖️',
  title: 'כפל וחילוק עד 100',
  subtitle: 'לוח הכפל, כפל בעשרות, והקשר בין כפל לחילוק',
  sections: [
    {
      id: 'table',
      emoji: '🧮',
      title: 'כפל = חיבור חוזר',
      blocks: [
        {
          type: 'text',
          md: m`$3\times4$ = שלוש קבוצות של 4:

🍎🍎🍎🍎 · 🍎🍎🍎🍎 · 🍎🍎🍎🍎 = **12**

כדאי לדעת את **לוח הכפל** עד $10\times10$ בעל-פה — זה חוסך המון זמן!`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'תכונות של 0 ו-1',
          md: m`$6\times1=6$ (כפול 1 — לא משתנה) · $6\times0=0$ (כפול 0 — תמיד 0)`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $7\times8$?`,
        answer: 56,
        hint: m`$7\times8$ = 7 קבוצות של 8. או: $5\times8+2\times8$.`,
        explain: m`$7\times8=56$`,
      },
    },
    {
      id: 'tens',
      emoji: '🔟',
      title: 'כפל בעשרות',
      blocks: [
        {
          type: 'steps',
          title: m`$3\times40$`,
          steps: [
            { math: m`3\times4=12`, note: 'כופלים בלי האפס.' },
            { math: m`3\times40=12\textcolor{#c45c48}{0}`, note: 'ומוסיפים את האפס בסוף.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $6\times30$?`,
        answer: 180,
        hint: m`$6\times3=18$, ועכשיו מוסיפים אפס.`,
        explain: m`$6\times30=180$`,
      },
    },
    {
      id: 'division',
      emoji: '🏆',
      title: 'שלב הבוס: חילוק = כפל הפוך',
      blocks: [
        {
          type: 'text',
          md: m`$56:8$ שואל: **כמה פעמים 8 נכנס ב-56?**

אם יודעים ש-$7\times8=56$, אז $56:8=7$. כפל וחילוק הם **הפוכים**!`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'סוגריים קודם',
          md: m`$2\times(3+4)$: קודם הסוגריים $3+4=7$, ואז $2\times7=14$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $63:9$?`,
        answer: 7,
        hint: m`כמה פעמים 9 נותן 63? $9\times?=63$`,
        explain: m`$9\times7=63$, ולכן $63:9=7$.`,
      },
    },
  ],
};
