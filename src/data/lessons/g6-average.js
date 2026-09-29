import { m } from './tex.js';

export default {
  id: 'g6-average',
  topicId: 'g6-average',
  grade: 6,
  emoji: '⚖️',
  title: 'ממוצע',
  subtitle: 'מחלקים שווה בשווה',
  sections: [
    {
      id: 'level',
      emoji: '🧱',
      title: 'מיישרים את העמודות',
      blocks: [
        {
          type: 'bars',
          items: [
            { label: 'א', count: 2 },
            { label: 'ב', count: 7 },
            { label: 'ג', count: 3 },
          ],
          editable: true,
          caption: 'שלושה ילדים ומספר הסוכריות שלהם. אם נחלק שווה — כמה לכל אחד?',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ממוצע',
          md: m`**ממוצע** = סכום כל הערכים, חלקי מספר הערכים.

$\frac{2+7+3}{3}=\frac{12}{3}=4$ סוכריות לכל ילד.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה הממוצע של $6, 8, 10, 12$?`,
        answer: 9,
        hint: m`$36:4$`,
        explain: m`$\frac{36}{4}=9$`,
      },
    },
    {
      id: 'missing',
      emoji: '🔍',
      title: 'הציון החסר',
      blocks: [
        {
          type: 'steps',
          title: 'ממוצע 3 מבחנים הוא 80. בשניים קיבלתי 70 ו-85. מה בשלישי?',
          steps: [
            { math: m`3\times80=240`, note: 'הסכום הכולל.' },
            { math: m`240-70-85=85`, note: 'מה שנשאר — המבחן השלישי.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`ממוצע של $4$ מספרים הוא $5$. שלושה מהם: $3, 4, 6$. מה הרביעי?`,
        answer: 7,
        hint: m`הסכום $20$.`,
        explain: m`$20-13=7$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מוסיפים ערך',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'ערך גבוה מושך למעלה',
          md: m`ממוצע $5$ תלמידים: $10$. הצטרף תלמיד עם $16$: $\frac{50+16}{6}=11$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`הממוצע של קבוצה הוא $20$. מצטרף ערך $20$. מה קורה לממוצע?`,
        options: ['עולה', 'יורד', 'לא משתנה', 'תלוי כמה ערכים יש'],
        answer: 2,
        hint: 'הערך החדש שווה בדיוק לממוצע.',
        explain: 'ערך ששווה לממוצע לא מזיז אותו.',
      },
    },
  ],
};
