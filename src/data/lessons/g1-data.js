export default {
  id: 'g1-data',
  topicId: 'g1-data',
  grade: 1,
  emoji: '📊',
  title: 'חקר נתונים',
  subtitle: 'קוראים דיאגרמת עמודות ופיקטוגרם',
  sections: [
    {
      id: 'picto',
      emoji: '🍭',
      title: 'פיקטוגרם',
      blocks: [
        {
          type: 'text',
          md: 'שאלנו ילדים: מה הפרי האהוב עליכם? כל ציור = ילד אחד.\n\n🍎 🍎 🍎 🍎\n\n🍌 🍌\n\n🍓 🍓 🍓 🍓 🍓',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה ילדים אוהבים תות 🍓?',
        answer: 5,
        hint: 'ספרו את התותים.',
        explain: 'יש 5 תותים — 5 ילדים.',
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
            { label: '🍎', count: 4 },
            { label: '🍌', count: 2 },
            { label: '🍓', count: 5 },
          ],
          editable: true,
          caption: 'אותם נתונים — בעמודות. הוסיפו ילדים עם + וראו את העמודה גדלה:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'לפי הנתונים המקוריים, איזה פרי הכי אהוב?',
        options: ['🍎 תפוח', '🍌 בננה', '🍓 תות', 'כולם שווים'],
        answer: 2,
        hint: 'העמודה הגבוהה ביותר.',
        explain: 'לתות יש הכי הרבה ילדים — 5.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: בכמה יותר?',
      blocks: [
        {
          type: 'text',
          md: 'תפוח — 4 ילדים. בננה — 2 ילדים. כדי לדעת **בכמה יותר** — מחסרים: יש 2 ילדים יותר שאוהבים תפוח.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'בכמה ילדים יותר אוהבים תות 🍓 מבננה 🍌? (5 מול 2)',
        answer: 3,
        hint: 'מחסרים את הקטן מהגדול.',
        explain: '5 פחות 2 — עוד 3 ילדים.',
      },
    },
  ],
};
