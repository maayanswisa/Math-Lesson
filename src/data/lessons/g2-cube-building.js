import { m } from './tex.js';

export default {
  id: 'g2-cube-building',
  topicId: 'g2-cube-building',
  grade: 2,
  emoji: '🧱',
  title: 'בונים מקוביות',
  subtitle: 'כמה קוביות צריך לבנות תיבה?',
  sections: [
    {
      id: 'layer',
      emoji: '🟫',
      title: 'שכבה אחת',
      blocks: [
        {
          type: 'text',
          md: m`שכבה של $3$ שורות, ובכל שורה $4$ קוביות: $4+4+4=12$ קוביות.`,
        },
        {
          type: 'box',
          l: 4,
          w: 3,
          h: 1,
          caption: 'שכבה אחת של קוביות:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'שכבה של 2 שורות, ובכל שורה 5 קוביות. כמה קוביות?',
        answer: 10,
        hint: m`$5+5$`,
        explain: m`$5+5=10$`,
      },
    },
    {
      id: 'layers',
      emoji: '🏢',
      title: 'שכבות על שכבות',
      blocks: [
        {
          type: 'box',
          l: 4,
          w: 3,
          h: 2,
          caption: 'הוסיפו שכבות (גובה). כל שכבה — אותו מספר קוביות:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'בכל שכבה 6 קוביות, ויש 3 שכבות. כמה קוביות בתיבה?',
        answer: 18,
        hint: m`$6+6+6$`,
        explain: m`$6+6+6=18$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: קובייה גדולה',
      blocks: [
        {
          type: 'text',
          md: 'קובייה גדולה של 2 על 2 על 2: בכל שכבה 4 קוביות, ויש 2 שכבות.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה קוביות קטנות צריך לקובייה גדולה של 2 על 2 על 2?',
        answer: 8,
        hint: m`$4+4$`,
        explain: m`$4+4=8$ קוביות.`,
      },
    },
  ],
};
