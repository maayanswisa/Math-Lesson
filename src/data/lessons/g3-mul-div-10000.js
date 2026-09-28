import { m } from './tex.js';

export default {
  id: 'g3-mul-div-10000',
  topicId: 'g3-mul-div-10000',
  grade: 3,
  emoji: '🚀',
  title: 'כפל וחילוק במספרים גדולים',
  subtitle: 'עשרות, מאות ואלפים שלמים — והטריק של האפסים',
  sections: [
    {
      id: 'zeros',
      emoji: '0️⃣',
      title: 'כפל עם אפסים',
      blocks: [
        {
          type: 'steps',
          title: m`$20\times300$`,
          steps: [
            { math: m`2\times3=6`, note: 'כופלים את הספרות בלי האפסים.' },
            { math: m`2\textcolor{#c45c48}{0}\times3\textcolor{#c45c48}{00}`, note: 'סופרים אפסים: אחד ועוד שניים = 3 אפסים.' },
            { math: m`6\textcolor{#c45c48}{000}`, note: 'מוסיפים אותם בסוף: 6,000.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $40\times200$?`,
        answer: 8000,
        hint: m`$4\times2=8$, ועוד 3 אפסים.`,
        explain: m`$8{,}000$`,
      },
    },
    {
      id: 'divide',
      emoji: '➗',
      title: 'חילוק עם אפסים',
      blocks: [
        {
          type: 'text',
          md: m`$2{,}400:10=240$ — חילוק ב-10 **מוריד אפס אחד**.

$8{,}000:8=1{,}000$ — כי $8:8=1$, והאפסים נשארים.`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'לא סתם להוסיף ולהוריד אפסים',
          md: 'הטריק עובד רק בכפל וחילוק ב-10, 100, 1,000 ובמספרים עגולים. תמיד בודקים שהתוצאה הגיונית!',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $6{,}000:3$?`,
        answer: 2000,
        hint: m`$6:3=2$, והאפסים נשארים.`,
        explain: m`$2{,}000$`,
      },
    },
    {
      id: 'split',
      emoji: '🏆',
      title: 'שלב הבוס: חילוק בחלקים',
      blocks: [
        {
          type: 'text',
          md: m`$84:4$? מפרקים את 84 לחלקים שקל לחלק:

$84:4=(80:4)+(4:4)=20+1=21$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $96:3$? (רמז: $96=90+6$)`,
        answer: 32,
        hint: m`$90:3=30$, ו-$6:3=?$`,
        explain: m`$30+2=32$`,
      },
    },
  ],
};
