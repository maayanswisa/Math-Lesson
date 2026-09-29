import { m } from './tex.js';

export default {
  id: 'g1-add-sub-20',
  topicId: 'g1-add-sub-20',
  grade: 1,
  emoji: '➕',
  title: 'חיבור וחיסור עד 20',
  subtitle: 'מוסיפים, מורידים, ומוצאים את המספר החסר',
  sections: [
    {
      id: 'add',
      emoji: '➕',
      title: 'חיבור — מוסיפים',
      blocks: [
        {
          type: 'tenframe',
          mode: 'add',
          a: 8,
          b: 5,
          caption: 'נקודות כחולות ועוד נקודות אדומות. כמה ביחד?',
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'טריק: משלימים לעשר',
          md: m`$8+5$: קודם $8+2=10$, ונשארו עוד $3$ — ביחד $13$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $9+4$?`,
        answer: 13,
        hint: m`$9+1=10$, ועוד $3$.`,
        explain: m`$9+4=13$`,
      },
    },
    {
      id: 'sub',
      emoji: '➖',
      title: 'חיסור — מורידים',
      blocks: [
        {
          type: 'text',
          md: m`היו 🎈🎈🎈🎈🎈🎈🎈 (7 בלונים), ו-2 עפו. נשארו 🎈🎈🎈🎈🎈 — $7-2=5$.`,
        },
        {
          type: 'jumps',
          max: 20,
          start: 14,
          step: 1,
          jumps: 6,
          back: true,
          caption: 'חיסור = קופצים אחורה על הישר:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $15-6$?`,
        answer: 9,
        hint: m`$15-5=10$, ועוד אחד פחות.`,
        explain: m`$15-6=9$`,
      },
    },
    {
      id: 'missing',
      emoji: '🏆',
      title: 'שלב הבוס: מספר חסר',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הסימן = אומר "אותו דבר"',
          md: m`$6+\square=10$ — כמה חסר ל-6 כדי להגיע ל-10? סופרים מ-6 עד 10: **4**.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$7+\square=15$. מה המספר בריבוע?`,
        answer: 8,
        hint: m`כמה צריך להוסיף ל-7 כדי להגיע ל-15?`,
        explain: m`$7+8=15$`,
      },
    },
  ],
};
