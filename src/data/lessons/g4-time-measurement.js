import { m } from './tex.js';

export default {
  id: 'g4-time-measurement',
  topicId: 'g4-time-measurement',
  grade: 4,
  emoji: '📅',
  title: 'לוח שנה וחישובי זמן',
  subtitle: 'ימים, שבועות וחודשים — וההמרות ביניהם',
  sections: [
    {
      id: 'calendar',
      emoji: '📅',
      title: 'לוח השנה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'יחידות זמן',
          md: m`שבוע $=7$ ימים

שנה $=12$ חודשים $\approx52$ שבועות

בחודש יש $28$ עד $31$ ימים`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'שני לוחות',
          md: 'בלוח **הלועזי** השנה מתחילה בינואר. בלוח **העברי** — בתשרי (ראש השנה). החגים היהודיים נקבעים לפי הלוח העברי.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ימים',
        prompt: 'כמה ימים יש ב-3 שבועות ו-4 ימים?',
        answer: 25,
        hint: m`$3\times7+4$`,
        explain: m`$21+4=25$ ימים.`,
      },
    },
    {
      id: 'weeks',
      emoji: '🔄',
      title: 'מימים לשבועות',
      blocks: [
        {
          type: 'divgroups',
          n: 30,
          k: 7,
          emoji: '📆',
          caption: 'מסדרים ימים בשבועות של 7. מה שנשאר — ימים בודדים:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'כמה שבועות וימים יש ב-45 ימים?',
        options: ['6 שבועות ו-3 ימים', '5 שבועות ו-10 ימים', '6 שבועות', '7 שבועות ו-1 ימים'],
        answer: 0,
        hint: m`$6\times7=42$`,
        explain: m`$45:7=6$ (שארית $3$) — 6 שבועות ו-3 ימים.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: כמה ימים עד?',
      blocks: [
        {
          type: 'text',
          md: 'מ-**20 במרץ** עד **5 באפריל**: במרץ יש 31 ימים, אז נשארו עוד 11 ימים במרץ, ועוד 5 באפריל — **16 ימים**.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ימים',
        prompt: 'מ-25 בינואר עד 3 בפברואר — כמה ימים? (בינואר 31 ימים)',
        answer: 9,
        hint: 'עוד 6 ימים בינואר, ועוד 3 בפברואר.',
        explain: m`$6+3=9$ ימים.`,
      },
    },
  ],
};
