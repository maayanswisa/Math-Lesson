const TD = "style='padding:4px 10px;border:1px solid #dde'";
const TABLE = `<div class='diagram-box'><table style='border-collapse:collapse;text-align:center;font-weight:700'><tr><td ${TD}></td><td ${TD}>בנים</td><td ${TD}>בנות</td></tr><tr><td ${TD}>⚽ כדורגל</td><td ${TD}>12</td><td ${TD}>5</td></tr><tr><td ${TD}>🏐 כדורעף</td><td ${TD}>4</td><td ${TD}>9</td></tr><tr><td ${TD}>🏊 שחייה</td><td ${TD}>6</td><td ${TD}>8</td></tr></table></div>`;

export default {
  id: 'g4-data-tables-bars',
  topicId: 'g4-data-tables-bars',
  grade: 4,
  emoji: '📊',
  title: 'טבלאות ודיאגרמת עמודות',
  subtitle: 'קוראים שורה ועמודה, ומשווים שתי קבוצות',
  sections: [
    {
      id: 'table',
      emoji: '📋',
      title: 'טבלה עם שני כיוונים',
      blocks: [
        {
          type: 'text',
          md: `הספורט האהוב בשכבה:

${TABLE}

כדי למצוא ערך — הולכים לשורה ולעמודה, ומחפשים את המפגש.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה בנות אוהבות כדורעף?',
        answer: 9,
        hint: 'שורת הכדורעף, עמודת הבנות.',
        explain: 'במפגש: 9 בנות.',
      },
    },
    {
      id: 'bars',
      emoji: '📊',
      title: 'עמודות',
      blocks: [
        {
          type: 'bars',
          items: [
            { label: '⚽ בנים', count: 12 },
            { label: '⚽ בנות', count: 5 },
            { label: '🏐 בנים', count: 4 },
            { label: '🏐 בנות', count: 9 },
          ],
          caption: 'דיאגרמת עמודות כפולה: בכל ספורט — עמודה לבנים ועמודה לבנות:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'בכמה יותר בנים מבנות אוהבים כדורגל?',
        answer: 7,
        hint: '12 מול 5.',
        explain: '12 פחות 5 — 7.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: ציר מטעה',
      blocks: [
        {
          type: 'bars',
          items: [
            { label: 'שבוע א', count: 42 },
            { label: 'שבוע ב', count: 45 },
          ],
          truncate: 40,
          caption: 'מספר ספרים שהושאלו. לחצו על הכפתור — ושימו לב לציר:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'כשהציר מתחיל ב-40, העמודה של שבוע ב׳ נראית פי 2.5 גבוהה. האם הושאלו פי 2.5 ספרים?',
        options: ['כן', 'לא — רק 3 ספרים יותר', 'לא — פחות ספרים', 'אי אפשר לדעת'],
        answer: 1,
        hint: 'הסתכלו על המספרים עצמם.',
        explain: '45 מול 42 — רק 3 ספרים יותר. הציר החתוך מטעה.',
      },
    },
  ],
};
