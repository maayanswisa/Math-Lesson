const LINES_SVG = `<div class='diagram-box'><svg viewBox='0 0 280 100' width='280' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><line x1='20' y1='80' x2='120' y2='80' stroke='#0d6e6e' stroke-width='4' stroke-linecap='round'/><line x1='70' y1='80' x2='70' y2='15' stroke='#0d6e6e' stroke-width='4' stroke-linecap='round'/><rect x='70' y='66' width='14' height='14' fill='none' stroke='#c45c48' stroke-width='2'/><text x='70' y='98' text-anchor='middle' font-size='12' font-weight='700' fill='#1a2b3c'>מאונכים</text><line x1='160' y1='30' x2='270' y2='30' stroke='#7c4dcc' stroke-width='4' stroke-linecap='round'/><line x1='160' y1='65' x2='270' y2='65' stroke='#7c4dcc' stroke-width='4' stroke-linecap='round'/><text x='215' y='98' text-anchor='middle' font-size='12' font-weight='700' fill='#1a2b3c'>מקבילים</text></svg></div>`;

export default {
  id: 'g3-geometry',
  topicId: 'g3-geometry',
  grade: 3,
  emoji: '📐',
  title: 'זוויות, מאונכים ומקבילים',
  subtitle: 'זווית ישרה, חדה, קהה ושטוחה — וקווים שנפגשים או לא',
  sections: [
    {
      id: 'angles',
      emoji: '🐊',
      title: 'מה זו זווית?',
      blocks: [
        {
          type: 'text',
          md: '**זווית** = שני קווים שיוצאים מאותה נקודה — כמו פה של תנין 🐊 שנפתח.',
        },
        {
          type: 'angle',
          caption: 'פתחו וסגרו את הזווית:',
          angle: 50,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'בודקים עם פינה של דף',
          md: 'פינה של דף היא **זווית ישרה**. קטנה ממנה — **חדה**. גדולה ממנה — **קהה**.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'זווית שקטנה מפינה של דף נקראת:',
        options: ['חדה', 'ישרה', 'קהה', 'שטוחה'],
        answer: 0,
        hint: 'חד כמו חוד של עיפרון.',
        explain: 'זווית קטנה מזווית ישרה נקראת חדה.',
      },
    },
    {
      id: 'lines',
      emoji: '🛤️',
      title: 'מאונכים ומקבילים',
      blocks: [
        {
          type: 'text',
          md: `${LINES_SVG}

**מאונכים** — נפגשים ויוצרים **זווית ישרה** (כמו האות ⊥).

**מקבילים** — **לעולם לא נפגשים**, כמו פסי רכבת 🛤️. המרחק ביניהם תמיד שווה.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'פסי רכבת הם דוגמה לקווים:',
        options: ['מאונכים', 'מקבילים', 'נחתכים', 'עקומים'],
        answer: 1,
        hint: 'האם הפסים נפגשים אי פעם?',
        explain: 'הפסים לא נפגשים לעולם — הם מקבילים.',
      },
    },
    {
      id: 'size',
      emoji: '🏆',
      title: 'שלב הבוס: מה קובע את גודל הזווית?',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'מלכודת',
          md: 'גודל הזווית תלוי רק **בכמה היא פתוחה** — **לא** באורך הקווים! קווים ארוכים לא עושים זווית גדולה יותר.',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'מהקטן לגדול',
          md: 'חדה ← ישרה (90°) ← קהה ← שטוחה (180°, קו ישר)',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'זווית שנראית כמו קו ישר נקראת:',
        options: ['חדה', 'ישרה', 'קהה', 'שטוחה'],
        answer: 3,
        hint: 'שטוחה כמו שולחן.',
        explain: 'זווית של 180° — קו ישר — נקראת זווית שטוחה.',
      },
    },
  ],
};
