import { m } from './tex.js';

export default {
  id: 'g2-counting-1000',
  topicId: 'g2-counting-1000',
  grade: 2,
  emoji: '🦘',
  title: 'סופרים עד 1,000',
  subtitle: 'קדימה ואחורה, מכל מספר, ובקפיצות גדולות',
  sections: [
    {
      id: 'big',
      emoji: '🦘',
      title: 'קפיצות גדולות',
      blocks: [
        {
          type: 'jumps',
          max: 1000,
          start: 100,
          step: 100,
          jumps: 5,
          steps: [10, 50, 100],
          caption: 'קפיצות של 100, של 50 ושל 10:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה המספר הבא? $250,\ 300,\ 350,\ \_\_$`,
        answer: 400,
        hint: 'בכל פעם עוד 50.',
        explain: m`$350+50=400$`,
      },
    },
    {
      id: 'any',
      emoji: '🎯',
      title: 'מכל מספר',
      blocks: [
        {
          type: 'text',
          md: m`אפשר להתחיל מכל מספר: $137,\ 147,\ 157,\ \dots$ — בקפיצות של 10 משתנה רק **ספרת העשרות**.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`סופרים בקפיצות של 10: $463,\ 473,\ 483,\ \_\_$`,
        answer: 493,
        hint: 'ספרת העשרות גדלה ב-1.',
        explain: m`$483+10=493$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: אחורה ועוברים מאה',
      blocks: [
        {
          type: 'jumps',
          max: 1000,
          start: 620,
          step: 10,
          jumps: 4,
          back: true,
          steps: [10, 50, 100],
          caption: 'אחורה בקפיצות של 10 — שימו לב מה קורה במעבר ה-600:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`סופרים אחורה ב-10: $720,\ 710,\ 700,\ \_\_$`,
        answer: 690,
        hint: 'מתחת ל-700...',
        explain: m`$700-10=690$`,
      },
    },
  ],
};
