import { m } from './tex.js';

export default {
  id: 'g2-fractions-half',
  topicId: 'g2-fractions-half',
  grade: 2,
  emoji: '🍕',
  title: 'חצי ורבע',
  subtitle: 'מחלקים שלם לחלקים שווים',
  sections: [
    {
      id: 'half',
      emoji: '🍎',
      title: 'חצי',
      blocks: [
        {
          type: 'text',
          md: m`חותכים תפוח ל-**2 חלקים שווים** — כל חלק הוא **חצי**: $\frac12$.

⚠️ החלקים חייבים להיות **שווים**! חתיכה גדולה וחתיכה קטנה — זה לא חצי.`,
        },
        {
          type: 'fraction',
          bars: [{ n: 1, d: 2, label: 'חצי' }],
          caption: 'רצועה שמחולקת לשני חלקים שווים:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'יש 10 סוכריות. מה זה חצי מהן?',
        answer: 5,
        hint: 'מחלקים לשתי ערימות שוות.',
        explain: '5 ועוד 5 זה 10 — חצי הוא 5.',
      },
    },
    {
      id: 'quarter',
      emoji: '🍕',
      title: 'רבע',
      blocks: [
        {
          type: 'text',
          md: m`פיצה שמחולקת ל-**4 משולשים שווים** — כל משולש הוא **רבע**: $\frac14$.`,
        },
        {
          type: 'fraction',
          bars: [
            { n: 1, d: 2, label: 'חצי' },
            { n: 1, d: 4, label: 'רבע' },
          ],
          caption: 'השוו: חצי ורבע של אותה רצועה:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה גדול יותר — חצי פיצה או רבע פיצה?',
        options: ['חצי', 'רבע', 'שווים', 'תלוי בפיצה'],
        answer: 0,
        hint: 'לכמה חלקים חותכים בכל פעם?',
        explain: 'חצי גדול מרבע — שני רבעים הם חצי אחד!',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: רבע של כמות',
      blocks: [
        {
          type: 'text',
          md: 'רבע מ-12 עפרונות: מחלקים ל-**4 ערימות שוות** — בכל ערימה 3. ✏️✏️✏️ | ✏️✏️✏️ | ✏️✏️✏️ | ✏️✏️✏️',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מה זה רבע מ-20?',
        answer: 5,
        hint: 'מחלקים ל-4 חלקים שווים.',
        explain: 'ארבע ערימות של 5 — רבע מ-20 הוא 5.',
      },
    },
  ],
};
