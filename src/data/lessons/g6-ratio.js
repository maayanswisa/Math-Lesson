import { m } from './tex.js';

export default {
  id: 'g6-ratio',
  topicId: 'g6-ratio',
  grade: 6,
  emoji: '🔵',
  title: 'יחס',
  subtitle: 'כמה מזה על כל כמה מזה',
  sections: [
    {
      id: 'meet',
      emoji: '🧃',
      title: 'מה זה יחס',
      blocks: [
        {
          type: 'ratio',
          a: 2,
          b: 3,
          total: 40,
          caption: 'יחס 2:3 — על כל 2 כחולים יש 3 אדומים. שנו את היחס:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'בכיתה 12 בנים ו-18 בנות. מה היחס בין הבנים לבנות (מצומצם)?',
        options: [m`$2:3$`, m`$3:2$`, m`$12:30$`, m`$1:2$`],
        answer: 0,
        hint: m`מחלקים את שניהם ב-$6$.`,
        explain: m`$12:18=2:3$`,
      },
    },
    {
      id: 'split',
      emoji: '✂️',
      title: 'חלוקה לפי יחס',
      blocks: [
        {
          type: 'steps',
          title: m`מחלקים $40$ סוכריות ביחס $2:3$`,
          steps: [
            { math: m`2+3=5`, note: 'כמה חלקים בסך הכול.' },
            { math: m`40:5=8`, note: 'כמה בכל חלק.' },
            { math: m`2\times8=16,\;3\times8=24`, note: 'לכל צד — מספר החלקים שלו.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מחלקים $60$ ₪ בין דנה ליואב ביחס $1:4$. כמה מקבל יואב?`,
        answer: 48,
        hint: m`$5$ חלקים של $12$.`,
        explain: m`$4\times12=48$ ₪.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: יחס שווה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מכפילים את שני הצדדים',
          md: m`מתכון: $2$ כוסות קמח ל-$3$ ביצים. כפול $3$: $6$ כוסות קמח ל-$9$ ביצים — אותו יחס.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מיץ: $1$ כוס תרכיז על $5$ כוסות מים. כמה מים צריך ל-$4$ כוסות תרכיז?`,
        answer: 20,
        hint: m`כופלים ב-$4$.`,
        explain: m`$5\times4=20$ כוסות.`,
      },
    },
  ],
};
