const TD = "style='padding:4px 12px;border:1px solid #dde'";
const TABLE = `<div class='diagram-box'><table style='border-collapse:collapse;text-align:center;font-weight:700'><tr><td ${TD}>חיה</td><td ${TD}>מספר ילדים</td></tr><tr><td ${TD}>🐶 כלב</td><td ${TD}>9</td></tr><tr><td ${TD}>🐱 חתול</td><td ${TD}>6</td></tr><tr><td ${TD}>🐠 דג</td><td ${TD}>3</td></tr><tr><td ${TD}>🐰 ארנב</td><td ${TD}>4</td></tr></table></div>`;

export default {
  id: 'g2-data',
  topicId: 'g2-data',
  grade: 2,
  emoji: '📊',
  title: 'חקר נתונים',
  subtitle: 'טבלה, דיאגרמת עמודות ופיקטוגרם',
  sections: [
    {
      id: 'table',
      emoji: '📋',
      title: 'טבלה',
      blocks: [
        {
          type: 'text',
          md: `שאלנו ילדים: איזו חיית מחמד אתם הכי אוהבים?

${TABLE}`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה ילדים ענו בסך הכול?',
        answer: 22,
        hint: 'חברו את כל המספרים בטבלה.',
        explain: '9, 6, 3 ו-4 — ביחד 22.',
      },
    },
    {
      id: 'bars',
      emoji: '📊',
      title: 'דיאגרמת עמודות',
      blocks: [
        {
          type: 'bars',
          items: [
            { label: '🐶', count: 9 },
            { label: '🐱', count: 6 },
            { label: '🐠', count: 3 },
            { label: '🐰', count: 4 },
          ],
          editable: true,
          caption: 'אותה טבלה — כעמודות. קל לראות מי הכי גבוה!',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'לפי הנתונים המקוריים, איזו חיה פחות אהובה?',
        options: ['🐶 כלב', '🐱 חתול', '🐠 דג', '🐰 ארנב'],
        answer: 2,
        hint: 'העמודה הנמוכה ביותר.',
        explain: 'לדג רק 3 ילדים — העמודה הנמוכה ביותר.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: פיקטוגרם עם מקרא',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'כל ציור = 2 ילדים',
          md: '🐶🐶🐶🐶 ועוד חצי ציור\n\nכשציור אחד שווה **2**, סופרים בקפיצות של 2. חצי ציור = ילד אחד.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'בפיקטוגרם כל 🐱 שווה 2 ילדים. יש 🐱🐱🐱🐱🐱. כמה ילדים?',
        answer: 10,
        hint: 'סופרים בקפיצות של 2.',
        explain: '5 ציורים, כל אחד 2 ילדים — 10 ילדים.',
      },
    },
  ],
};
