// פריסה של קובייה בצורת צלב
const CROSS = (() => {
  const s = 34;
  const cells = [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 2],
  ];
  const colors = ['#8fd3c7', '#f2b8a8', '#c9b6ee', '#a8d4f5', '#f5d58f', '#b9e0a5'];
  return `<div class='diagram-box'><svg viewBox='0 0 ${4 * s + 4} ${3 * s + 4}' width='${4 * s + 4}' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'>${cells
    .map(([x, y], i) => `<rect x='${2 + x * s}' y='${2 + y * s}' width='${s}' height='${s}' fill='${colors[i]}' stroke='#1a2b3c' stroke-width='2'/><text x='${2 + x * s + s / 2}' y='${2 + y * s + s / 2 + 5}' text-anchor='middle' font-size='14' font-weight='700' fill='#1a2b3c'>${i + 1}</text>`)
    .join('')}</svg></div>`;
})();

export default {
  id: 'g3-box-net',
  topicId: 'g3-box-net',
  grade: 3,
  emoji: '📦',
  title: 'פריסת קופסה',
  subtitle: 'פותחים קופסה לשטוח — וסוגרים אותה בחזרה',
  sections: [
    {
      id: 'what',
      emoji: '✂️',
      title: 'מה זו פריסה?',
      blocks: [
        {
          type: 'text',
          md: `**פריסה** = הקופסה כשהיא **פתוחה ושטוחה** על השולחן. מקפלים לפי הקווים — ומקבלים קופסה סגורה.

פריסה של **קובייה** — 6 ריבועים:

${CROSS}`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מכמה ריבועים בנויה פריסה של קובייה?',
        answer: 6,
        hint: 'כמה פאות יש לקובייה? (למעלה, למטה, ו-4 צדדים)',
        explain: 'לקובייה 6 פאות — 6 ריבועים.',
      },
    },
    {
      id: 'check',
      emoji: '🔍',
      title: 'פריסה תקינה או לא?',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הבדיקה',
          md: 'מדמיינים שמקפלים: אם נשאר **חור**, או ששני ריבועים **עולים זה על זה** — הפריסה לא תקינה.',
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'יש כמה פריסות',
          md: 'לקובייה יש **כמה** פריסות שונות שעובדות — לא רק הצלב!',
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'שורה של 6 לא עובדת',
          md: '6 ריבועים בשורה אחת ארוכה — בקיפול הם מסתובבים סביב, ולמעלה ולמטה נשאר פתוח.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'בפריסה של קובייה, מה אסור שיקרה בקיפול?',
        options: ['שיישאר חור', 'שיהיו ריבועים בצבעים שונים', 'שהפריסה תהיה בצורת צלב', 'שיהיו 6 ריבועים'],
        answer: 0,
        hint: 'הקופסה צריכה להיות סגורה.',
        explain: 'אם נשאר חור, הקובייה לא סגורה — הפריסה לא תקינה.',
      },
    },
    {
      id: 'box',
      emoji: '🏆',
      title: 'שלב הבוס: קופסה ממלבנים',
      blocks: [
        {
          type: 'text',
          md: '**קופסה** (כמו קופסת נעליים) בנויה מ-6 מלבנים — **3 זוגות** של מלבנים זהים: למעלה ולמטה, קדימה ואחורה, ימין ושמאל.\n\n**קובייה** היא קופסה מיוחדת שבה כל 6 הפאות ריבועים זהים.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה זוגות של מלבנים זהים צריך כדי לבנות קופסה?',
        answer: 3,
        hint: 'למעלה-למטה, קדימה-אחורה, ימין-שמאל.',
        explain: '3 זוגות = 6 מלבנים.',
      },
    },
  ],
};
