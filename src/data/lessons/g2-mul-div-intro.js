import { m } from './tex.js';

export default {
  id: 'g2-mul-div-intro',
  topicId: 'g2-mul-div-intro',
  grade: 2,
  emoji: '✖️',
  title: 'כפל וחילוק — מבוא',
  subtitle: 'קבוצות שוות, שורות וטורים, ושתי דרכים לחלק',
  sections: [
    {
      id: 'groups',
      emoji: '🍪',
      title: 'קבוצות שוות',
      blocks: [
        {
          type: 'text',
          md: m`🍪🍪🍪 🍪🍪🍪 🍪🍪🍪 🍪🍪🍪 — 4 צלחות, בכל אחת 3 עוגיות.

$3+3+3+3=12$, ובקיצור: $4\times3=12$ ("4 פעמים 3").`,
        },
        {
          type: 'rect',
          l: 4,
          w: 3,
          caption: 'שורות וטורים: מספר השורות כפול מספר המשבצות בשורה:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`5 אופניים, לכל אחד 2 גלגלים. כמה גלגלים? ($5\times2$)`,
        answer: 10,
        hint: m`$2+2+2+2+2$`,
        explain: m`$5\times2=10$`,
      },
    },
    {
      id: 'divide',
      emoji: '➗',
      title: 'שתי דרכים לחלק',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'חלוקה והכלה',
          md: m`**חלוקה**: 12 סוכריות ל-3 ילדים — כמה לכל ילד? $12:3=4$.

**הכלה**: 12 סוכריות, 4 בכל שקית — כמה שקיות? $12:4=3$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: '20 כדורים מחלקים שווה בשווה ל-5 קופסאות. כמה כדורים בכל קופסה?',
        answer: 4,
        hint: m`$5\times\square=20$`,
        explain: m`$20:5=4$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: כפולות',
      blocks: [
        {
          type: 'hundred',
          step: 5,
          steps: [2, 4, 5, 10],
          caption: 'הכפולות של 2, 4, 5 ו-10 בלוח המאה. איזה דגם יש לכפולות של 5?',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $4\times5$?`,
        answer: 20,
        hint: m`$5+5+5+5$`,
        explain: m`$4\times5=20$`,
      },
    },
  ],
};
