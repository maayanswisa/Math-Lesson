import { m } from './tex.js';

export default {
  id: 'g6-data-reading',
  topicId: 'g6-data-reading',
  grade: 6,
  emoji: '📊',
  title: 'קריאת נתונים',
  subtitle: 'דיאגרמות עמודות ועוגה',
  sections: [
    {
      id: 'bars',
      emoji: '📊',
      title: 'דיאגרמת עמודות',
      blocks: [
        {
          type: 'bars',
          items: [
            { label: 'א', count: 12 },
            { label: 'ב', count: 18 },
            { label: 'ג', count: 9 },
            { label: 'ד', count: 15 },
          ],
          caption: 'מספר ספרים שקראה כל כיתה:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'בכמה ספרים קראה כיתה ב יותר מכיתה ג?',
        answer: 9,
        hint: m`$18-9$`,
        explain: m`$9$ ספרים.`,
      },
    },
    {
      id: 'pie',
      emoji: '🥧',
      title: 'דיאגרמת עוגה',
      blocks: [
        {
          type: 'pie',
          items: [
            { label: '⚽ כדורגל', value: 2 },
            { label: '🏀 כדורסל', value: 1 },
            { label: '🏊 שחייה', value: 1 },
          ],
          total: 200,
          caption: '200 תלמידים בחרו ספורט. לחצו על פרוסה:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'חלק מהשלם',
          md: m`חצי עוגה $=50\%$, רבע $=25\%$. $50\%$ מ-$200$ הם $100$ תלמידים.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה תלמידים בחרו שחייה?',
        answer: 50,
        hint: 'רבע מ-200.',
        explain: m`$\frac14\times200=50$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: ציר מקוצר',
      blocks: [
        {
          type: 'bars',
          items: [
            { label: 'א', count: 52 },
            { label: 'ב', count: 55 },
          ],
          truncate: 50,
          caption: 'לחצו על הכפתור ותראו מה קורה כשהציר מתחיל ב-50:',
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'בודקים את הציר',
          md: m`ההפרש האמיתי הוא רק $3$. ציר שלא מתחיל באפס מגזים הבדלים.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה צריך לבדוק קודם כשקוראים דיאגרמה?',
        options: ['את הצבעים', 'איפה הציר מתחיל ומה היחידות', 'את הכותרת בלבד', 'כמה עמודות יש'],
        answer: 1,
        hint: 'ראיתם למעלה.',
        explain: 'הציר והיחידות קובעים איך לקרוא את הגבהים.',
      },
    },
  ],
};
