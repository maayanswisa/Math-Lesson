import { m } from './tex.js';

export default {
  id: 'g2-sequences',
  topicId: 'g2-sequences',
  grade: 2,
  emoji: '🔁',
  title: 'סדרות',
  subtitle: 'דגמים של צורות, ומספרים שקופצים ב-1, ב-10 וב-100',
  sections: [
    {
      id: 'shapes',
      emoji: '🔺',
      title: 'דגם של צורות',
      blocks: [
        {
          type: 'text',
          md: '🔺🟦🟦🔺🟦🟦🔺 — משולש ואחריו שני ריבועים. **היחידה שחוזרת**: 🔺🟦🟦',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה הצורה העשירית בדגם 🔺🟦🟦🔺🟦🟦...?',
        options: ['🔺', '🟦', '⭐', 'אי אפשר לדעת'],
        answer: 0,
        hint: 'היחידה באורך 3. משולשים במקומות 1, 4, 7, 10...',
        explain: 'המשולשים במקומות 1, 4, 7, 10 — אז העשירית היא 🔺.',
      },
    },
    {
      id: 'chart',
      emoji: '🔢',
      title: 'קפיצות בלוח המאה',
      blocks: [
        {
          type: 'hundred',
          step: 10,
          steps: [2, 5, 10],
          caption: 'בקפיצות של 10 — כל המספרים באותו טור! נסו גם 5 ו-2:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה המספר הבא? $34,\ 44,\ 54,\ \_\_$`,
        answer: 64,
        hint: 'בכל פעם עוד 10.',
        explain: m`$54+10=64$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: קפיצות של 100',
      blocks: [
        {
          type: 'text',
          md: m`$215,\ 315,\ 415,\ \dots$ — עוד 100 בכל פעם: משתנה רק **ספרת המאות**.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`איזה מספר חסר? $780,\ 680,\ \_\_,\ 480$`,
        answer: 580,
        hint: 'בכל פעם 100 פחות.',
        explain: m`$680-100=580$`,
      },
    },
  ],
};
