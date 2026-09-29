import { m } from './tex.js';

const TD = "style='padding:4px 12px;border:1px solid #dde'";
const TABLE = `<div class='diagram-box'><table style='border-collapse:collapse;text-align:center;font-weight:700'><tr><td ${TD}>מספר אחים</td><td ${TD}>0</td><td ${TD}>1</td><td ${TD}>2</td><td ${TD}>3</td></tr><tr><td ${TD}>שכיחות</td><td ${TD}>4</td><td ${TD}>10</td><td ${TD}>8</td><td ${TD}>3</td></tr></table></div>`;

export default {
  id: 'g10u3-science-freq',
  topicId: 'g10-u3-science-freq',
  grade: 10,
  units: 3,
  emoji: '📋',
  title: 'טבלאות שכיחויות',
  subtitle: 'שכיחות ושכיחות יחסית',
  sections: [
    {
      id: 'table',
      emoji: '📋',
      title: 'טבלת שכיחויות',
      blocks: [
        {
          type: 'text',
          md: m`${TABLE}

**שכיחות** — כמה פעמים כל ערך מופיע. סכום השכיחויות $=$ מספר הנבדקים: $4+10+8+3=25$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'לכמה תלמידים יש לפחות 2 אחים?',
        answer: 11,
        hint: m`$8+3$`,
        explain: m`$11$ תלמידים.`,
      },
    },
    {
      id: 'relative',
      emoji: '💯',
      title: 'שכיחות יחסית',
      blocks: [
        {
          type: 'bars',
          items: [
            { label: '0', count: 4 },
            { label: '1', count: 10 },
            { label: '2', count: 8 },
            { label: '3', count: 3 },
          ],
          relative: true,
          caption: 'אותם נתונים — עברו בין שכיחות לשכיחות יחסית:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'חלק מהשלם',
          md: m`**שכיחות יחסית** = השכיחות חלקי סך הכול. לערך $1$: $\frac{10}{25}=40\%$. כל השכיחויות היחסיות יחד — $100\%$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '%',
        prompt: 'מה השכיחות היחסית של תלמידים בלי אחים?',
        answer: 16,
        hint: m`$\frac{4}{25}$`,
        explain: m`$\frac{4}{25}=16\%$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מהאחוז למספר',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'משתנה איכותני',
          md: m`צבע אהוב, עיר מגורים — אין להם ממוצע! רק **שכיח** הוא בעל משמעות.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`בסקר של $200$ איש, השכיחות היחסית של "אוטובוס" היא $35\%$. כמה אנשים ענו "אוטובוס"?`,
        answer: 70,
        hint: m`$0.35\times200$`,
        explain: m`$70$`,
      },
    },
  ],
};
