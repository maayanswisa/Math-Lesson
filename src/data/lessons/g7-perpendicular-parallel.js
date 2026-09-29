import { m } from './tex.js';

const LINES = `<div class='diagram-box'><svg viewBox='0 0 300 110' width='300' xmlns='http://www.w3.org/2000/svg' style='max-width:100%'><g stroke-width='3' stroke-linecap='round'><line x1='20' y1='80' x2='130' y2='80' stroke='#0d6e6e'/><line x1='75' y1='15' x2='75' y2='100' stroke='#0d6e6e'/><rect x='75' y='66' width='14' height='14' fill='none' stroke='#c45c48' stroke-width='2'/><line x1='170' y1='35' x2='285' y2='20' stroke='#7c4dcc'/><line x1='170' y1='85' x2='285' y2='70' stroke='#7c4dcc'/></g><text x='75' y='12' font-size='12' font-weight='700' text-anchor='middle' fill='#0d6e6e'>ניצבים</text><text x='228' y='105' font-size='12' font-weight='700' text-anchor='middle' fill='#7c4dcc'>מקבילים</text></svg></div>`;

const DIST = `<div class='diagram-box'><svg viewBox='0 0 300 140' width='300' xmlns='http://www.w3.org/2000/svg' style='max-width:100%'><line x1='10' y1='115' x2='290' y2='115' stroke='#1a2b3c' stroke-width='3'/><circle cx='150' cy='25' r='6' fill='#7c4dcc'/><text x='162' y='16' font-size='13' font-weight='700' fill='#7c4dcc'>P</text><g stroke='#c45c48' stroke-width='2' stroke-dasharray='5 4'><line x1='150' y1='25' x2='60' y2='115'/><line x1='150' y1='25' x2='250' y2='115'/><line x1='150' y1='25' x2='205' y2='115'/></g><line x1='150' y1='25' x2='150' y2='115' stroke='#2d7a4f' stroke-width='4'/><rect x='150' y='101' width='14' height='14' fill='none' stroke='#2d7a4f' stroke-width='2'/></svg></div>`;

export default {
  id: 'g7-perpendicular-parallel',
  topicId: 'g7-perpendicular-parallel',
  grade: 7,
  emoji: '📏',
  title: 'ניצבות, הקבלה, מלבן ותיבה',
  subtitle: 'ישרים שנפגשים בזווית ישרה, ישרים שלא נפגשים אף פעם',
  sections: [
    {
      id: 'lines',
      emoji: '✚',
      title: 'ניצבים ומקבילים',
      blocks: [
        {
          type: 'text',
          md: m`${LINES}

**ניצבים** — נחתכים בזווית ישרה ($90°$). מסמנים ריבוע קטן בפינה.

**מקבילים** — באותו מישור ולא נפגשים אף פעם, כמו פסי רכבת.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'שני ישרים נחתכים בזווית של 90°. איך קוראים להם?',
        options: ['מקבילים', 'ניצבים', 'חוצים', 'שווים'],
        answer: 1,
        hint: 'זווית ישרה.',
        explain: 'ישרים שנחתכים בזווית ישרה נקראים ניצבים (מאונכים).',
      },
    },
    {
      id: 'distance',
      emoji: '📐',
      title: 'המרחק מנקודה לישר',
      blocks: [
        {
          type: 'text',
          md: m`מהנקודה $P$ אפשר למתוח הרבה קטעים לישר. איזה מהם הוא "המרחק"?

${DIST}`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'המרחק = הקטע הניצב',
          md: 'המרחק של נקודה מישר הוא אורך **הקטע הניצב** (הירוק). הוא **הקצר ביותר** מכל הקטעים האפשריים.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מנקודה לישר מתחו קטעים באורכים 5, 7, 4 ו-9 ס"מ. אחד מהם ניצב לישר. מה אורכו?',
        options: ['5 ס"מ', '7 ס"מ', '4 ס"מ', '9 ס"מ'],
        answer: 2,
        hint: 'הניצב הוא הקצר ביותר.',
        explain: 'הקטע הניצב הוא תמיד הקצר ביותר — 4 ס"מ.',
      },
    },
    {
      id: 'rect-box',
      emoji: '📦',
      title: 'שלב הבוס: מלבן ותיבה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'במלבן',
          md: 'ארבע זוויות ישרות · צלעות נגדיות **שוות ומקבילות** · צלעות סמוכות **ניצבות** · האלכסונים **שווים**.',
        },
        {
          type: 'box',
          caption: 'תיבה בנויה משש פאות מלבניות. ספרו את הפאות, המקצועות והקודקודים:',
          l: 4,
          w: 3,
          h: 2,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'בתיבה',
          md: '**6** פאות (3 זוגות מקבילים) · **12** מקצועות · **8** קודקודים',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה מקצועות יש לתיבה?',
        answer: 12,
        hint: '4 למעלה, 4 למטה, ו-4 עומדים.',
        explain: '4 + 4 + 4 = 12 מקצועות.',
      },
    },
  ],
};
