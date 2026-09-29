import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g4-order-of-operations',
  topicId: 'g4-order-of-operations',
  grade: 4,
  emoji: '🪜',
  title: 'סדר פעולות החשבון',
  subtitle: 'מה קודם — כפל, חיבור או סוגריים?',
  sections: [
    {
      id: 'no-brackets',
      emoji: '✖️',
      title: 'כפל וחילוק קודם',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'בלי סוגריים',
          md: 'קודם **כפל וחילוק**, אחר כך **חיבור וחיסור**. פעולות מאותה רמה — משמאל לימין.',
        },
        {
          type: 'steps',
          title: m`$12-2\times3$`,
          steps: [
            { math: m`12-${c(VIOLET, '6')}`, note: 'קודם הכפל.' },
            { math: c(GREEN, '6'), note: 'ואז החיסור.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $5+4\times2$?`,
        answer: 13,
        hint: 'הכפל קודם.',
        explain: m`$5+8=13$`,
      },
    },
    {
      id: 'brackets',
      emoji: '🔒',
      title: 'סוגריים — הכי קודם',
      blocks: [
        {
          type: 'text',
          md: m`$(12-2)\times3=10\times3=30$ — אותם מספרים, תשובה שונה לגמרי! הסוגריים אומרים "את זה קודם".`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $(5+4)\times2$?`,
        answer: 18,
        hint: 'קודם הסוגריים.',
        explain: m`$9\times2=18$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: משמאל לימין',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'שימו לב לכיוון',
          md: m`$24:4\times2$ — חילוק וכפל באותה רמה, אז **משמאל לימין**: $6\times2=12$ (ולא $24:8=3$).`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $20-8:2+3$?`,
        answer: 19,
        hint: m`קודם $8:2$, ואז משמאל לימין.`,
        explain: m`$20-4+3=19$`,
      },
    },
  ],
};
