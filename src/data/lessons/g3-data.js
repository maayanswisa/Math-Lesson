// דיאגרמת עמודות כפולה: צבעים אהובים — בנים (טורקיז) ובנות (אדום)
const DOUBLE_BARS = (() => {
  const data = [
    ['🔴', 'אדום', 4, 7],
    ['🔵', 'כחול', 8, 5],
    ['🟢', 'ירוק', 3, 6],
    ['🟡', 'צהוב', 5, 2],
  ];
  const u = 12;
  const bars = data
    .map(([emoji, , boys, girls], i) => {
      const x = 60 + i * 60;
      return `<rect x='${x}' y='${130 - boys * u}' width='20' height='${boys * u}' rx='3' fill='#0d6e6e'/><text x='${x + 10}' y='${125 - boys * u}' text-anchor='middle' font-size='11' font-weight='700' fill='#0a5555'>${boys}</text><rect x='${x + 22}' y='${130 - girls * u}' width='20' height='${girls * u}' rx='3' fill='#c45c48'/><text x='${x + 32}' y='${125 - girls * u}' text-anchor='middle' font-size='11' font-weight='700' fill='#a13a2a'>${girls}</text><text x='${x + 21}' y='150' text-anchor='middle' font-size='15'>${emoji}</text>`;
    })
    .join('');
  return `<div class='diagram-box'><svg viewBox='0 0 300 190' width='300' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><line x1='45' y1='130' x2='290' y2='130' stroke='#1a2b3c' stroke-width='2'/><line x1='45' y1='130' x2='45' y2='20' stroke='#1a2b3c' stroke-width='2'/>${bars}<rect x='80' y='166' width='14' height='14' fill='#0d6e6e'/><text x='98' y='178' font-size='12' fill='#1a2b3c'>בנים</text><rect x='170' y='166' width='14' height='14' fill='#c45c48'/><text x='188' y='178' font-size='12' fill='#1a2b3c'>בנות</text></svg></div>`;
})();

export default {
  id: 'g3-data',
  topicId: 'g3-data',
  grade: 3,
  emoji: '📊',
  title: 'חקר נתונים',
  subtitle: 'אוספים מידע, ומשווים שתי קבוצות בדיאגרמת עמודות כפולה',
  sections: [
    {
      id: 'collect',
      emoji: '📋',
      title: 'איך אוספים מידע?',
      blocks: [
        {
          type: 'text',
          md: 'שתי דרכים:\n\n- **שאלון** — שואלים אנשים ("מה הצבע האהוב עליך?").\n- **תצפית** — סופרים בעצמנו (כמה מכוניות אדומות עברו ברחוב).',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'סופרים כמה ציפורים נחתו על העץ בחצר. זה:',
        options: ['שאלון', 'תצפית', 'ניחוש', 'גרף'],
        answer: 1,
        hint: 'אנחנו לא שואלים אף אחד — רק מסתכלים וסופרים.',
        explain: 'מסתכלים וסופרים בעצמנו — תצפית.',
      },
    },
    {
      id: 'double',
      emoji: '📊',
      title: 'דיאגרמת עמודות כפולה',
      blocks: [
        {
          type: 'text',
          md: `שאלנו בנים ובנות מה הצבע האהוב עליהם. **שתי עמודות** לכל צבע — אחת לבנים ואחת לבנות:

${DOUBLE_BARS}`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'המקרא',
          md: '**המקרא** (למטה) אומר איזה צבע עמודה שייך לאיזו קבוצה. בלעדיו — לא מבינים את הגרף!',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'לפי הגרף: כמה **בנות** בחרו ירוק?',
        answer: 6,
        hint: 'העמודה האדומה ליד 🟢.',
        explain: 'העמודה האדומה (בנות) ליד ירוק מגיעה ל-6.',
      },
    },
    {
      id: 'questions',
      emoji: '🏆',
      title: 'שלב הבוס: עונים מהגרף',
      blocks: [
        {
          type: 'text',
          md: 'בכחול: 8 בנים ו-5 בנות. **בכמה יותר** בנים? 8 − 5 = **3**.\n\n**כמה בסך הכול** בחרו כחול? 8 + 5 = **13**.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'לפי הגרף: בכמה **יותר** בנות מבנים בחרו אדום?',
        answer: 3,
        hint: 'באדום: בנות 7, בנים 4.',
        explain: '7 − 4 = 3.',
      },
    },
  ],
};
