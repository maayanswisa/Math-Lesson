import { m } from './tex.js';

export default {
  id: 'g1-count-20',
  topicId: 'g1-count-20',
  grade: 1,
  emoji: '🔢',
  title: 'סופרים עד 20',
  subtitle: 'סופרים, מונים ומשווים — מי יותר ומי פחות',
  sections: [
    {
      id: 'count',
      emoji: '👆',
      title: 'סופרים נקודות',
      blocks: [
        {
          type: 'text',
          md: 'כשסופרים, נוגעים בכל דבר **פעם אחת בלבד**, ואומרים מספר אחד לכל דבר: 1, 2, 3...',
        },
        {
          type: 'tenframe',
          n: 6,
          caption: 'לחצו על + ועל − וספרו את הנקודות:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה תפוחים יש? 🍎🍎🍎🍎🍎🍎🍎🍎',
        answer: 8,
        hint: 'געו בכל תפוח עם האצבע וספרו.',
        explain: 'יש 8 תפוחים.',
      },
    },
    {
      id: 'ten',
      emoji: '🔟',
      title: 'עשר ועוד',
      blocks: [
        {
          type: 'text',
          md: 'מסגרת אחת מלאה = **10**. אם יש עוד נקודות במסגרת השנייה — מוסיפים אותן לעשר.',
        },
        {
          type: 'tenframe',
          n: 13,
          caption: 'מסגרת מלאה ועוד 3. כמה זה?',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מסגרת אחת מלאה, ובשנייה 5 נקודות. כמה נקודות יש בסך הכול?',
        answer: 15,
        hint: 'עשר ועוד 5.',
        explain: m`$10+5=15$`,
      },
    },
    {
      id: 'compare',
      emoji: '🏆',
      title: 'שלב הבוס: איפה יותר?',
      blocks: [
        {
          type: 'text',
          md: m`🐶🐶🐶🐶🐶 — 5 כלבים

🐱🐱🐱🐱🐱🐱🐱 — 7 חתולים

יש **יותר** חתולים: $7$ גדול מ-$5$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איפה יש יותר?',
        options: ['⭐⭐⭐⭐⭐⭐⭐⭐⭐ (9 כוכבים)', '🌙🌙🌙🌙🌙🌙 (6 ירחים)', 'שווה', 'אי אפשר לדעת'],
        answer: 0,
        hint: 'ספרו כל שורה.',
        explain: m`9 כוכבים ו-6 ירחים. $9$ גדול מ-$6$.`,
      },
    },
  ],
};
