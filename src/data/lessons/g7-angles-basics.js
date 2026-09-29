import { m } from './tex.js';

const NAMING = `<div class='diagram-box'><svg viewBox='0 0 260 130' width='260' xmlns='http://www.w3.org/2000/svg' style='direction:ltr;max-width:100%'><g stroke='#1a2b3c' stroke-width='3' stroke-linecap='round'><line x1='60' y1='105' x2='240' y2='105'/><line x1='60' y1='105' x2='200' y2='20'/></g><path d='M100,105 A40,40 0 0 0 94,84' fill='none' stroke='#7c4dcc' stroke-width='3'/><text x='112' y='96' font-size='14' font-weight='700' fill='#7c4dcc'>α</text><circle cx='60' cy='105' r='4' fill='#1a2b3c'/><text x='44' y='112' font-size='14' font-weight='700' fill='#c45c48'>B</text><text x='204' y='18' font-size='14' font-weight='700' fill='#0d6e6e'>A</text><text x='240' y='124' font-size='14' font-weight='700' fill='#0d6e6e'>C</text></svg></div>`;

export default {
  id: 'g7-angles-basics',
  topicId: 'g7-angles-basics',
  grade: 7,
  emoji: '📐',
  title: 'זוויות: סימון, השוואה ומדידה',
  subtitle: 'איך קוראים לזווית, ממה תלוי הגודל שלה, ואיך מעריכים',
  sections: [
    {
      id: 'naming',
      emoji: '🏷️',
      title: 'איך קוראים לזווית?',
      blocks: [
        {
          type: 'text',
          md: m`זווית נוצרת משתי **קרניים** שיוצאות מאותה נקודה — **הקודקוד**.

${NAMING}

אפשר לקרוא לה באות יוונית ($\alpha$), או בשלוש אותיות **והקודקוד באמצע**: $\angle ABC$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`בזווית $\angle PQR$, מהו הקודקוד?`,
        options: [m`$P$`, m`$Q$`, m`$R$`, 'אין קודקוד'],
        answer: 1,
        hint: 'הקודקוד תמיד באמצע.',
        explain: m`האות האמצעית — $Q$.`,
      },
    },
    {
      id: 'types',
      emoji: '🔭',
      title: 'חדה, ישרה, קהה, שטוחה',
      blocks: [
        {
          type: 'angle',
          caption: 'פתחו וסגרו את הזווית וראו איך קוראים לה:',
          angle: 50,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ארבעה סוגים',
          md: m`**חדה** — קטנה מ-$90°$ · **ישרה** — בדיוק $90°$ · **קהה** — בין $90°$ ל-$180°$ · **שטוחה** — $180°$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'זווית של 135° היא:',
        options: ['חדה', 'ישרה', 'קהה', 'שטוחה'],
        answer: 2,
        hint: m`היא בין $90°$ ל-$180°$.`,
        explain: m`$90°<135°<180°$ — קהה.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מה קובע את הגודל?',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'קווים ארוכים ≠ זווית גדולה',
          md: 'גודל הזווית הוא **הפתיחה** בין הקרניים — לא אורך הקווים המצוירים. זווית עם קווים קצרצרים יכולה להיות גדולה יותר מזווית עם קווים ארוכים.',
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'אומדן בלי מד-זווית',
          md: m`משווים לזוויות מוכרות: פינת דף = $90°$, חצי ממנה = $45°$, קו ישר = $180°$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'זווית נראית קצת יותר גדולה מחצי פינה של דף. מה האומדן הסביר?',
        options: ['10°', '50°', '100°', '170°'],
        answer: 1,
        hint: m`חצי פינה = $45°$.`,
        explain: m`קצת יותר מ-$45°$ — בערך $50°$.`,
      },
    },
  ],
};
