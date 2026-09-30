import { m } from './tex.js';

const TD = "style='padding:4px 12px;border:1px solid #dde'";
const TABLE = `<div class='diagram-box'><table style='border-collapse:collapse;text-align:center;font-weight:700'><tr><td ${TD}>שעות שינה</td><td ${TD}>6</td><td ${TD}>7</td><td ${TD}>8</td><td ${TD}>9</td></tr><tr><td ${TD}>תלמידים</td><td ${TD}>5</td><td ${TD}>8</td><td ${TD}>12</td><td ${TD}>5</td></tr></table></div>`;

export default {
  id: 'g10u3-science-integration',
  topicId: 'g10-u3-science-integration',
  grade: 10,
  units: 3,
  emoji: '🔗',
  title: 'אינטגרציה — סטטיסטיקה והסתברות',
  subtitle: 'אותה טבלה, שאלות מכל הכיוונים',
  sections: [
    {
      id: 'stats',
      emoji: '📋',
      title: 'מדדי מרכז',
      blocks: [
        {
          type: 'text',
          md: m`${TABLE}

סך הכול $30$ תלמידים. **שכיח:** $8$ שעות (הכי הרבה תלמידים).`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מה ממוצע שעות השינה?',
        answer: 7.57,
        tolerance: 0.01,
        hint: m`$\frac{30+56+96+45}{30}$`,
        explain: m`$\frac{227}{30}\approx7.57$`,
      },
    },
    {
      id: 'prob',
      emoji: '🎲',
      title: 'הסתברות מהטבלה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שכיחות יחסית = הסתברות',
          md: m`בוחרים תלמיד באקראי. $P(8)=\frac{12}{30}=0.4$ — בדיוק השכיחות היחסית.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`בוחרים תלמיד באקראי. מה ההסתברות שישן **יותר** מ-$7$ שעות?`,
        options: [m`$\frac{17}{30}$`, m`$\frac{12}{30}$`, m`$\frac{13}{30}$`, m`$\frac{25}{30}$`],
        answer: 0,
        hint: m`$8$ או $9$ שעות.`,
        explain: m`$\frac{12+5}{30}=\frac{17}{30}$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מעל הממוצע',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'שני צעדים',
          md: 'קודם מחשבים מדד (ממוצע / חציון), ואז משתמשים בו בשאלת ההסתברות.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה ההסתברות שתלמיד אקראי ישן **פחות** מהממוצע ($7.57$)?`,
        options: [m`$\frac{13}{30}$`, m`$\frac{5}{30}$`, m`$\frac{17}{30}$`, m`$\frac12$`],
        answer: 0,
        hint: m`$6$ או $7$ שעות.`,
        explain: m`$\frac{5+8}{30}=\frac{13}{30}$`,
      },
    },
  ],
};
