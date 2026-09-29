const LINES = `<div class='diagram-box'><svg viewBox='0 0 300 110' width='300' xmlns='http://www.w3.org/2000/svg' style='max-width:100%'><g stroke-width='3' stroke-linecap='round'><line x1='20' y1='80' x2='130' y2='80' stroke='#0d6e6e'/><line x1='75' y1='15' x2='75' y2='100' stroke='#0d6e6e'/><rect x='75' y='66' width='14' height='14' fill='none' stroke='#c45c48' stroke-width='2'/><line x1='170' y1='35' x2='285' y2='20' stroke='#7c4dcc'/><line x1='170' y1='85' x2='285' y2='70' stroke='#7c4dcc'/></g><text x='75' y='12' font-size='12' font-weight='700' text-anchor='middle' fill='#0d6e6e'>מאונכים</text><text x='228' y='105' font-size='12' font-weight='700' text-anchor='middle' fill='#7c4dcc'>מקבילים</text></svg></div>`;

export default {
  id: 'g4-parallel-perpendicular',
  topicId: 'g4-parallel-perpendicular',
  grade: 4,
  emoji: '🛤️',
  title: 'ישרים מקבילים ומאונכים',
  subtitle: 'ישרים שלא נפגשים לעולם — וישרים שנפגשים בזווית ישרה',
  sections: [
    {
      id: 'define',
      emoji: '🛤️',
      title: 'שני סוגים',
      blocks: [
        {
          type: 'text',
          md: `${LINES}

**מאונכים** — נחתכים ויוצרים **זווית ישרה** (90°), כמו פינת דף.

**מקבילים** — **לא נפגשים אף פעם**, והמרחק ביניהם תמיד שווה, כמו פסי רכבת.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה זוג הוא דוגמה לישרים מקבילים?',
        options: ['מחוגי שעון בשעה 3', 'שני פסי רכבת', 'צלעות שנפגשות בפינת החדר', 'קו אופקי וקו אנכי'],
        answer: 1,
        hint: 'מה לא נפגש לעולם?',
        explain: 'פסי רכבת — תמיד באותו מרחק, ולא נפגשים.',
      },
    },
    {
      id: 'shapes',
      emoji: '🟦',
      title: 'במצולעים',
      blocks: [
        {
          type: 'quad',
          shape: 'rectangle',
          caption: 'במלבן: הצלעות הנגדיות מקבילות, והצלעות הסמוכות מאונכות:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה זוגות של צלעות מקבילות יש במלבן?',
        answer: 2,
        hint: 'למעלה-למטה, וימין-שמאל.',
        explain: 'שני זוגות: העליונה עם התחתונה, והימנית עם השמאלית.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: רק אחד',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מנקודה אחת',
          md: 'מנקודה שמחוץ לישר אפשר להעביר **רק ישר מקביל אחד** אליו, ו**רק אנך אחד** אליו.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'כמה ישרים מאונכים לישר נתון אפשר להעביר דרך נקודה אחת שמחוצה לו?',
        options: ['אפס', 'אחד', 'שניים', 'אינסוף'],
        answer: 1,
        hint: 'חשבו על המרחק הקצר ביותר מהנקודה לישר.',
        explain: 'רק אנך אחד.',
      },
    },
  ],
};
