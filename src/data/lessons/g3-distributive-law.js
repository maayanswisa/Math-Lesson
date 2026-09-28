import { m } from './tex.js';

export default {
  id: 'g3-distributive-law',
  topicId: 'g3-distributive-law',
  grade: 3,
  emoji: '🧩',
  title: 'סדר פעולות וחוק הפילוג',
  subtitle: 'מה מחשבים קודם, ואיך מפרקים כפל גדול לשני כפלים קלים',
  sections: [
    {
      id: 'order',
      emoji: '🚦',
      title: 'מה קודם?',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הסדר',
          md: '1. **סוגריים**\n2. **כפל וחילוק**\n3. **חיבור וחיסור**',
        },
        {
          type: 'steps',
          title: m`$5+2\times3$`,
          steps: [
            { math: m`2\times3=6`, note: 'קודם כפל!' },
            { math: m`5+6=\textcolor{#2d7a4f}{11}`, note: 'ואז חיבור. (לא 21!)' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $(5+2)\times3$?`,
        answer: 21,
        hint: 'עכשיו יש סוגריים — הם קודם.',
        explain: m`$5+2=7$, ואז $7\times3=21$.`,
      },
    },
    {
      id: 'split',
      emoji: '✂️',
      title: 'חוק הפילוג: מפרקים',
      blocks: [
        {
          type: 'text',
          md: m`$23\times9$ נראה קשה? **מפרקים** את 23 ל-$20+3$, וכופלים כל חלק בנפרד:`,
        },
        {
          type: 'area',
          caption: 'מלבן שצלעותיו 9 ו-23. לחצו על כל חלק:',
          rows: ['9'],
          cols: ['20', '3'],
          cells: [['180', '27']],
          result: m`23\times9=180+27=207`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $4\times13$? (רמז: $13=10+3$)`,
        answer: 52,
        hint: m`$4\times10+4\times3$`,
        explain: m`$40+12=52$`,
      },
    },
    {
      id: 'subtract',
      emoji: '🏆',
      title: 'שלב הבוס: פילוג עם חיסור',
      blocks: [
        {
          type: 'text',
          md: m`לפעמים קל יותר **לעגל למעלה ולהוריד**:

$3\times29=3\times30-3\times1=90-3=87$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $5\times19$? (רמז: $19=20-1$)`,
        answer: 95,
        hint: m`$5\times20-5\times1$`,
        explain: m`$100-5=95$`,
      },
    },
  ],
};
