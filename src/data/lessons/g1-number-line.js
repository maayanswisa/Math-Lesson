import { m } from './tex.js';

export default {
  id: 'g1-number-line',
  topicId: 'g1-number-line',
  grade: 1,
  emoji: '📏',
  title: 'ישר המספרים',
  subtitle: 'כל מספר גר במקום שלו על הישר',
  sections: [
    {
      id: 'line',
      emoji: '➡️',
      title: 'מהקטן לגדול',
      blocks: [
        {
          type: 'text',
          md: 'על ישר המספרים, המספרים הולכים ו**גדלים** ככל שמתקדמים **ימינה** ➡️. כל קפיצה של 1 — צעד אחד.',
        },
        {
          type: 'jumps',
          max: 20,
          start: 4,
          step: 1,
          jumps: 3,
          caption: 'קפצו על הישר ובדקו לאן מגיעים:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מתחילים ב-7 וקופצים 3 צעדים קדימה. לאיזה מספר מגיעים?',
        answer: 10,
        hint: '8, 9, ...',
        explain: m`$7+3=10$`,
      },
    },
    {
      id: 'middle',
      emoji: '🎯',
      title: 'איפה בערך?',
      blocks: [
        {
          type: 'text',
          md: m`על ישר מ-$0$ עד $20$, המספר $10$ נמצא **באמצע**. המספר $19$ — קרוב מאוד לסוף.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`על ישר מ-$0$ עד $100$, איפה בערך נמצא $50$?`,
        options: ['בהתחלה', 'באמצע', 'בסוף', 'מחוץ לישר'],
        answer: 1,
        hint: '50 הוא חצי מ-100.',
        explain: m`$50$ בדיוק באמצע בין $0$ ל-$100$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: קופצים אחורה',
      blocks: [
        {
          type: 'jumps',
          max: 20,
          start: 15,
          step: 2,
          jumps: 3,
          back: true,
          caption: 'קפיצות אחורה — המספרים קטנים:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מתחילים ב-12 וקופצים 4 צעדים אחורה. לאן מגיעים?',
        answer: 8,
        hint: '11, 10, ...',
        explain: m`$12-4=8$`,
      },
    },
  ],
};
