import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g4-median-average',
  topicId: 'g4-median-average',
  grade: 4,
  emoji: '⚖️',
  title: 'ממוצע וחציון',
  subtitle: 'שתי דרכים לתאר "ערך מרכזי"',
  sections: [
    {
      id: 'average',
      emoji: '🧮',
      title: 'ממוצע',
      blocks: [
        {
          type: 'text',
          md: 'לשלושה ילדים יש 2, 5 ו-8 סוכריות. אם נחלק את כל הסוכריות **שווה בשווה** — כמה יקבל כל אחד? זה **הממוצע**.',
        },
        {
          type: 'steps',
          title: 'ממוצע של 2, 5, 8',
          steps: [
            { math: m`2+5+8=${c(VIOLET, '15')}`, note: 'מחברים הכול.' },
            { math: m`15:3=${c(GREEN, '5')}`, note: 'מחלקים במספר הילדים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מה הממוצע של 4, 6, 7, 11?',
        answer: 7,
        hint: m`$(4+6+7+11):4$`,
        explain: m`$28:4=7$`,
      },
    },
    {
      id: 'median',
      emoji: '🎯',
      title: 'חציון',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'האמצעי בשורה',
          md: m`**קודם ממיינים** מהקטן לגדול, ואז לוקחים את האמצעי.

$9,\ 3,\ 7,\ 1,\ 5$ ← ממיינים: $1,\ 3,\ 5,\ 7,\ 9$ ← החציון: $5$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה החציון של $8,\ 2,\ 10,\ 4,\ 6$?`,
        answer: 6,
        hint: 'קודם ממיינים!',
        explain: m`$2,\ 4,\ 6,\ 8,\ 10$ — האמצעי $6$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: ערך חריג',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'ממוצע "נמשך" לקצוות',
          md: m`ציונים: $70,\ 75,\ 80,\ 85,\ 20$. הממוצע $66$ — אבל רוב הציונים מעל $70$! החציון $75$ מתאר טוב יותר. ערך חריג אחד משנה מאוד את הממוצע, ובקושי את החציון.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה החציון של $1,\ 2,\ 3,\ 4,\ 100$?`,
        answer: 3,
        hint: 'הם כבר ממוינים.',
        explain: m`האמצעי הוא $3$ (הממוצע היה $22$ — בגלל ה-$100$).`,
      },
    },
  ],
};
