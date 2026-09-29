import { m } from './tex.js';

export default {
  id: 'g4-fractions-meaning',
  topicId: 'g4-fractions-meaning',
  grade: 4,
  emoji: '🧺',
  title: 'משמעות השבר',
  subtitle: 'חלק משלם, חלק מכמות, ושמות שונים לאותו שבר',
  sections: [
    {
      id: 'amount',
      emoji: '🍎',
      title: 'חלק מכמות',
      blocks: [
        {
          type: 'text',
          md: m`$\frac14$ מ-12 תפוחים: מחלקים ל-**4** קבוצות שוות — בכל קבוצה $3$.

🍎🍎🍎 | 🍎🍎🍎 | 🍎🍎🍎 | 🍎🍎🍎`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'איך מחשבים',
          md: m`מחלקים במכנה, ולוקחים כמספר המונה: $\frac34$ מ-$12$ ← $12:4=3$, ו-$3\times3=9$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $\frac{2}{5}$ מ-$20$?`,
        answer: 8,
        hint: m`$20:5=4$`,
        explain: m`$4\times2=8$`,
      },
    },
    {
      id: 'names',
      emoji: '🏷️',
      title: 'שמות שונים',
      blocks: [
        {
          type: 'fraction',
          bars: [
            { n: 1, d: 2 },
            { n: 2, d: 4 },
            { n: 4, d: 8 },
          ],
          caption: 'שלוש רצועות — אותו חלק צבוע:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'אותו גודל',
          md: m`$\frac12=\frac24=\frac48$ — שלושה **שמות** לאותו שבר.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איזה שבר שווה ל-$\frac13$?`,
        options: [m`$\frac{2}{6}$`, m`$\frac{3}{1}$`, m`$\frac{2}{3}$`, m`$\frac{1}{6}$`],
        answer: 0,
        hint: 'כופלים מונה ומכנה באותו מספר.',
        explain: m`$\frac{1\times2}{3\times2}=\frac26$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מהחלק לשלם',
      blocks: [
        {
          type: 'text',
          md: m`$\frac14$ מהכיתה זה 7 ילדים. כמה ילדים בכל הכיתה? — ארבעה רבעים: $7\times4=28$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$\frac13$ מהספרים על המדף הם 5 ספרים. כמה ספרים יש על המדף?`,
        answer: 15,
        hint: 'שלושה שלישים.',
        explain: m`$5\times3=15$`,
      },
    },
  ],
};
