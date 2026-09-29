import { m } from './tex.js';

export default {
  id: 'g2-length-measure',
  topicId: 'g2-length-measure',
  grade: 2,
  emoji: '📏',
  title: 'מדידת אורך: ס״מ ומטר',
  subtitle: 'מודדים ומסרטטים — ומכירים את המטר',
  sections: [
    {
      id: 'cm',
      emoji: '✏️',
      title: 'מודדים ומסרטטים',
      blocks: [
        {
          type: 'ruler',
          len: 6,
          caption: 'כדי לסרטט קטע של 6 ס״מ: נקודה על 0, נקודה על 6, ומחברים בסרגל:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס״מ',
        prompt: 'קטע אחד באורך 8 ס״מ וקטע שני באורך 5 ס״מ. בכמה הראשון ארוך יותר?',
        answer: 3,
        hint: m`$8-5$`,
        explain: m`$8-5=3$ ס״מ.`,
      },
    },
    {
      id: 'meter',
      emoji: '🚪',
      title: 'המטר',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: '1 מטר = 100 ס״מ',
          md: 'מטר הוא בערך הגובה של ידית הדלת, או צעד גדול של מבוגר. מודדים במטרים דברים ארוכים: חדר, חצר, מגרש.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'במה כדאי למדוד את אורך מגרש הכדורגל?',
        options: ['בס״מ', 'במטרים', 'באטבים', 'בכפות ידיים'],
        answer: 1,
        hint: 'המגרש ארוך מאוד.',
        explain: 'דברים ארוכים מודדים במטרים.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: ס״מ ומטרים',
      blocks: [
        {
          type: 'text',
          md: m`$2$ מטרים $=200$ ס״מ. חצי מטר $=50$ ס״מ.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס״מ',
        prompt: 'כמה ס״מ יש ב-3 מטרים?',
        answer: 300,
        hint: 'כל מטר — 100 ס״מ.',
        explain: m`$100+100+100=300$ ס״מ.`,
      },
    },
  ],
};
