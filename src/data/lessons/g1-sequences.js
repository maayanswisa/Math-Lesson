import { m } from './tex.js';

export default {
  id: 'g1-sequences',
  topicId: 'g1-sequences',
  grade: 1,
  emoji: '🔁',
  title: 'סדרות',
  subtitle: 'מגלים את החוק — ומנחשים מה בא אחר כך',
  sections: [
    {
      id: 'shapes',
      emoji: '🔴',
      title: 'דגם שחוזר',
      blocks: [
        {
          type: 'text',
          md: 'מסתכלים: 🔴🔵🔴🔵🔴🔵 — אדום, כחול, אדום, כחול... **החוק**: שני צבעים שחוזרים.\n\nעוד דגם: 🍎🍎🍌🍎🍎🍌 — שני תפוחים ובננה, וחוזר חלילה.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה בא אחרי: ⭐🌙🌙⭐🌙🌙⭐ ?',
        options: ['⭐', '🌙', '☀️', '⭐⭐'],
        answer: 1,
        hint: 'כוכב, ירח, ירח — ושוב מההתחלה.',
        explain: 'אחרי הכוכב באים שני ירחים — אז הבא הוא 🌙.',
      },
    },
    {
      id: 'numbers',
      emoji: '🔢',
      title: 'סדרה של מספרים',
      blocks: [
        {
          type: 'text',
          md: m`$2,\ 4,\ 6,\ 8,\ \dots$ — בכל פעם **עוד 2**.

$15,\ 14,\ 13,\ 12,\ \dots$ — בכל פעם **אחד פחות**.`,
        },
        {
          type: 'jumps',
          max: 20,
          start: 2,
          step: 2,
          jumps: 4,
          caption: 'סדרה בקפיצות — כל קפיצה היא החוק:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה המספר הבא? $5,\ 10,\ 15,\ \_\_$`,
        answer: 20,
        hint: 'בכל פעם עוד 5.',
        explain: m`$15+5=20$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מספר חסר',
      blocks: [
        {
          type: 'text',
          md: m`$3,\ 6,\ \_\_,\ 12$ — קודם מגלים את החוק (עוד 3), ואז משלימים: $9$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`איזה מספר חסר? $20,\ 18,\ \_\_,\ 14$`,
        answer: 16,
        hint: 'בכל פעם 2 פחות.',
        explain: m`$18-2=16$`,
      },
    },
  ],
};
