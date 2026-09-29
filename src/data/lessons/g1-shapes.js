const SHAPES = `<div class='diagram-box'><svg viewBox='0 0 320 90' width='320' xmlns='http://www.w3.org/2000/svg' style='max-width:100%'><polygon points='15,75 55,75 35,20' fill='#f7c9bd' stroke='#c45c48' stroke-width='3'/><rect x='75' y='25' width='50' height='50' fill='#c9e4e4' stroke='#0d6e6e' stroke-width='3'/><rect x='140' y='35' width='70' height='40' fill='#ddd0f5' stroke='#7c4dcc' stroke-width='3'/><circle cx='250' cy='50' r='27' fill='#f9e3b4' stroke='#e2a020' stroke-width='3'/><polygon points='297,28 314,40 308,68 286,68 280,40' fill='#cfe3f7' stroke='#1f8fe0' stroke-width='3'/><g font-size='11' font-weight='700' text-anchor='middle' fill='#1a2b3c'><text x='35' y='88'>משולש</text><text x='100' y='88'>ריבוע</text><text x='175' y='88'>מלבן</text><text x='250' y='88'>עיגול</text><text x='297' y='88'>מחומש</text></g></svg></div>`;

const BUTTERFLY = `<div class='diagram-box'><svg viewBox='0 0 160 100' width='160' xmlns='http://www.w3.org/2000/svg'><path d='M80,50 C50,5 10,20 25,50 C10,80 50,95 80,50 Z' fill='#f7c9bd' stroke='#c45c48' stroke-width='2'/><path d='M80,50 C110,5 150,20 135,50 C150,80 110,95 80,50 Z' fill='#f7c9bd' stroke='#c45c48' stroke-width='2'/><line x1='80' y1='2' x2='80' y2='98' stroke='#7c4dcc' stroke-width='2' stroke-dasharray='5 4'/></svg></div>`;

export default {
  id: 'g1-shapes',
  topicId: 'g1-shapes',
  grade: 1,
  emoji: '🔺',
  title: 'צורות גאומטריות',
  subtitle: 'משולש, ריבוע, מלבן, עיגול — וסימטריה',
  sections: [
    {
      id: 'names',
      emoji: '🔷',
      title: 'מכירים את הצורות',
      blocks: [
        {
          type: 'text',
          md: `${SHAPES}

**משולש** — 3 צלעות. **ריבוע** — 4 צלעות שוות. **מלבן** — 4 צלעות, הנגדיות שוות. **עיגול** — בלי פינות בכלל! **מחומש** — 5 צלעות.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'לאיזו צורה יש 3 צלעות?',
        options: ['ריבוע', 'משולש', 'עיגול', 'מלבן'],
        answer: 1,
        hint: '"משולש" — כמו שלוש.',
        explain: 'למשולש יש 3 צלעות ו-3 קודקודים.',
      },
    },
    {
      id: 'symmetry',
      emoji: '🦋',
      title: 'סימטריה',
      blocks: [
        {
          type: 'text',
          md: `${BUTTERFLY}

אם מקפלים את הפרפר על הקו הסגול — שני הצדדים נפגשים **בדיוק**. זה **ציר סימטריה**.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'לכמה צירי סימטריה יש לריבוע?',
        options: ['1', '2', '4', 'אין לו'],
        answer: 2,
        hint: 'קפלו לגובה, לרוחב — ואל תשכחו את האלכסונים!',
        explain: 'לריבוע 4 צירי סימטריה: אנכי, אופקי ושני האלכסונים.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מרכיבים',
      blocks: [
        {
          type: 'text',
          md: 'שני משולשים יכולים להרכיב **ריבוע** 🔳 — חותכים ריבוע באלכסון, ומקבלים שני משולשים שווים!',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה פינות (קודקודים) יש למלבן?',
        answer: 4,
        hint: 'ספרו את הפינות.',
        explain: 'למלבן 4 פינות, וכולן ישרות.',
      },
    },
  ],
};
