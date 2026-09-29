import { m } from './tex.js';

export default {
  id: 'g10u3-science-stats',
  topicId: 'g10-u3-science-stats',
  grade: 10,
  units: 3,
  emoji: '🧪',
  title: 'מדדי מרכז בהקשר מדעי-חברתי',
  subtitle: 'בוחרים את המדד המתאים ומשווים קבוצות',
  sections: [
    {
      id: 'table-mean',
      emoji: '🧮',
      title: 'ממוצע מטבלת שכיחויות',
      blocks: [
        {
          type: 'steps',
          title: m`מספר מכוניות למשפחה: $0$ — $3$ משפחות, $1$ — $5$, $2$ — $2$`,
          steps: [
            { math: m`0\cdot3+1\cdot5+2\cdot2=9`, note: 'ערך כפול שכיחות — הסכום.' },
            { math: m`3+5+2=10`, note: 'מספר המשפחות.' },
            { math: m`\bar x=\frac{9}{10}=0.9`, note: 'הממוצע.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`ציונים: $70$ — $4$ תלמידים, $80$ — $10$, $90$ — $6$. מה הממוצע?`,
        answer: 81,
        hint: m`$\frac{280+800+540}{20}$`,
        explain: m`$\frac{1620}{20}=81$`,
      },
    },
    {
      id: 'median',
      emoji: '🎯',
      title: 'חציון מטבלה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'המקום האמצעי',
          md: m`ב-$20$ נתונים — החציון הוא ממוצע הנתון ה-$10$ וה-$11$. סופרים שכיחויות מצטברות: $70$ תופס מקומות $1$–$4$, ו-$80$ תופס $5$–$14$ ← החציון $80$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מספר ילדים: $1$ — $6$ משפחות, $2$ — $3$, $3$ — $2$. מה החציון?`,
        answer: 1,
        hint: m`$11$ משפחות — המקום ה-$6$.`,
        explain: m`המקום ה-$6$ עדיין בערך $1$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: השוואת קבוצות',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'שתי כיתות',
          md: m`בכיתה א $25$ תלמידים עם ממוצע $80$, ובכיתה ב $15$ עם ממוצע $88$. הממוצע של כולם **אינו** $84$ — הכיתה הגדולה "שוקלת" יותר:

$$\frac{25\cdot80+15\cdot88}{40}=83$$
`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס"מ',
        prompt: m`גובה ממוצע של $12$ בנים: $170$ ס"מ, ושל $18$ בנות: $160$ ס"מ. מה הגובה הממוצע בכיתה?`,
        answer: 164,
        hint: m`$\frac{2040+2880}{30}$`,
        explain: m`$\frac{4920}{30}=164$ ס"מ.`,
      },
    },
  ],
};
