import { m } from './tex.js';

export default {
  id: 'g10u3-finance-stats',
  topicId: 'g10-u3-finance-stats',
  grade: 10,
  units: 3,
  emoji: '⚖️',
  title: 'מדדי מרכז בהקשר כלכלי',
  subtitle: 'ממוצע, חציון, שכיח וממוצע משוקלל',
  sections: [
    {
      id: 'salaries',
      emoji: '💼',
      title: 'ממוצע מול חציון',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'משכורות בחברה (באלפי ₪)',
          md: m`$8, 9, 9, 10, 44$

ממוצע: $\frac{80}{5}=16$ · חציון: $9$ · שכיח: $9$

המנכ"ל "מושך" את הממוצע למעלה — החציון מתאר טוב יותר עובד טיפוסי.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה מדד הכי פחות מושפע מערך קיצוני?',
        options: ['חציון', 'ממוצע', 'סכום', 'טווח'],
        answer: 0,
        hint: 'רק הערך האמצעי קובע.',
        explain: 'החציון תלוי רק במקום האמצעי, לא בגודל הקצוות.',
      },
    },
    {
      id: 'weighted',
      emoji: '🧮',
      title: 'ממוצע משוקלל',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שתי קבוצות',
          md: m`$$\bar x=\frac{n_1\bar x_1+n_2\bar x_2}{n_1+n_2}$$

$10$ עובדים עם ממוצע $8$ ו-$30$ עם ממוצע $12$: $\frac{80+360}{40}=11$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`מכרו $20$ כרטיסים ב-$50$ ₪ ו-$30$ כרטיסים ב-$80$ ₪. מה המחיר הממוצע לכרטיס?`,
        answer: 68,
        hint: m`$\frac{1000+2400}{50}$`,
        explain: m`$\frac{3400}{50}=68$ ₪.`,
      },
    },
    {
      id: 'change',
      emoji: '🏆',
      title: 'שלב הבוס: מוסיפים נתון',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'לאן זז הממוצע?',
          md: m`נתון חדש **גדול** מהממוצע ← הממוצע עולה. **קטן** ← יורד. **שווה** ← לא משתנה.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`ממוצע המשכורות של $9$ עובדים הוא $10{,}000$ ₪. הצטרף עובד עם $20{,}000$ ₪. מה הממוצע החדש?`,
        answer: 11000,
        hint: m`$\frac{90{,}000+20{,}000}{10}$`,
        explain: m`$11{,}000$ ₪.`,
      },
    },
  ],
};
