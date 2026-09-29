import { m } from './tex.js';

export default {
  id: 'g4-divisibility-369',
  topicId: 'g4-divisibility-369',
  grade: 4,
  emoji: '🔍',
  title: 'סימני התחלקות ב-3, ב-6 וב-9',
  subtitle: 'בודקים בלי לחלק — בעזרת סכום הספרות',
  sections: [
    {
      id: 'three',
      emoji: '3️⃣',
      title: 'ב-3',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'סכום הספרות',
          md: m`מספר מתחלק ב-3 אם **סכום הספרות** שלו מתחלק ב-3.

$372$: $3+7+2=12$ — מתחלק ב-3 ✔️`,
        },
        {
          type: 'hundred',
          step: 3,
          steps: [3, 6, 9],
          caption: 'הכפולות של 3, 6 ו-9 בלוח המאה. בדקו את סכום הספרות שלהן:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה מספר מתחלק ב-3?',
        options: ['251', '412', '531', '700'],
        answer: 2,
        hint: 'חשבו את סכום הספרות של כל אחד.',
        explain: m`$5+3+1=9$ — מתחלק ב-3.`,
      },
    },
    {
      id: 'nine',
      emoji: '9️⃣',
      title: 'ב-9',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'אותו רעיון',
          md: m`מתחלק ב-9 אם סכום הספרות מתחלק ב-9.

$4{,}581$: $4+5+8+1=18$ ✔️`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה מספר מתחלק ב-9?',
        options: ['1,234', '3,609', '5,000', '8,101'],
        answer: 1,
        hint: 'חפשו סכום ספרות 9, 18, 27...',
        explain: m`$3+6+0+9=18$ — מתחלק ב-9.`,
      },
    },
    {
      id: 'six',
      emoji: '🏆',
      title: 'שלב הבוס: ב-6',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני תנאים',
          md: m`מתחלק ב-6 אם הוא **זוגי** וגם מתחלק ב-**3**.

$714$: זוגי ✔️, $7+1+4=12$ ✔️ — מתחלק ב-6.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה מספר מתחלק ב-6?',
        options: ['123', '222', '345', '410'],
        answer: 1,
        hint: 'זוגי + סכום ספרות שמתחלק ב-3.',
        explain: m`$222$: זוגי, ו-$2+2+2=6$ ✔️`,
      },
    },
  ],
};
