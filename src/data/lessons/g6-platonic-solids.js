import { m } from './tex.js';

const TD = "style='padding:4px 12px;border:1px solid #dde'";
const TABLE = `<div class='diagram-box'><table style='border-collapse:collapse;text-align:center;font-weight:700'><tr><td ${TD}>גוף</td><td ${TD}>פאות</td><td ${TD}>צורת פאה</td></tr><tr><td ${TD}>ארבעון</td><td ${TD}>4</td><td ${TD}>משולש</td></tr><tr><td ${TD}>קובייה</td><td ${TD}>6</td><td ${TD}>ריבוע</td></tr><tr><td ${TD}>תמניון</td><td ${TD}>8</td><td ${TD}>משולש</td></tr><tr><td ${TD}>תריסרון</td><td ${TD}>12</td><td ${TD}>מחומש</td></tr><tr><td ${TD}>עשרימון</td><td ${TD}>20</td><td ${TD}>משולש</td></tr></table></div>`;

export default {
  id: 'g6-platonic-solids',
  topicId: 'g6-platonic-solids',
  grade: 6,
  emoji: '💎',
  title: 'גופים משוכללים',
  subtitle: 'חמשת הגופים של אפלטון ונוסחת אוילר',
  sections: [
    {
      id: 'five',
      emoji: '🎲',
      title: 'רק חמישה!',
      blocks: [
        {
          type: 'text',
          md: m`גוף משוכלל — כל הפאות אותו מצולע משוכלל, ובכל קודקוד נפגשות אותו מספר פאות. יש בדיוק **חמישה**:

${TABLE}`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'לאיזה גוף משוכלל יש פאות מחומשות?',
        options: ['תריסרון', 'עשרימון', 'תמניון', 'קובייה'],
        answer: 0,
        hint: m`$12$ פאות.`,
        explain: m`לתריסרון $12$ פאות מחומשות.`,
      },
    },
    {
      id: 'count',
      emoji: '🧮',
      title: 'פאות, קודקודים, מקצועות',
      blocks: [
        {
          type: 'box',
          l: 3,
          w: 3,
          h: 3,
          caption: 'קובייה: ספרו פאות, קודקודים ומקצועות:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'בקובייה',
          md: m`$6$ פאות, $8$ קודקודים, $12$ מקצועות.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה קודקודים יש לארבעון (פירמידה משולשת)?',
        answer: 4,
        hint: 'שלושה בבסיס ואחד למעלה.',
        explain: m`$3+1=4$`,
      },
    },
    {
      id: 'euler',
      emoji: '🏆',
      title: 'שלב הבוס: נוסחת אוילר',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'קסם שעובד תמיד',
          md: m`קודקודים פחות מקצועות ועוד פאות:

$$V-E+F=2$$

קובייה: $8-12+6=2$ ✓`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`לתמניון $8$ פאות ו-$6$ קודקודים. כמה מקצועות?`,
        answer: 12,
        hint: m`$6-E+8=2$`,
        explain: m`$14-E=2$ ← $E=12$`,
      },
    },
  ],
};
