import { m } from './tex.js';

export default {
  id: 'g1-counting-100',
  topicId: 'g1-counting-100',
  grade: 1,
  emoji: '🦘',
  title: 'סופרים עד 100',
  subtitle: 'קדימה, אחורה ובקפיצות — ומי ראשון בתור',
  sections: [
    {
      id: 'jumps',
      emoji: '🦘',
      title: 'סופרים בקפיצות',
      blocks: [
        {
          type: 'jumps',
          max: 100,
          start: 0,
          step: 10,
          jumps: 5,
          caption: 'קופצים על הישר. נסו קפיצות של 10, של 5 ושל 2:',
        },
        {
          type: 'text',
          md: m`בקפיצות של 10: $10,\ 20,\ 30,\ 40,\ \dots$

בקפיצות של 5: $5,\ 10,\ 15,\ 20,\ \dots$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה המספר הבא? $20,\ 30,\ 40,\ \_\_$`,
        answer: 50,
        hint: 'קפיצות של 10.',
        explain: m`$40+10=50$`,
      },
    },
    {
      id: 'back',
      emoji: '⬅️',
      title: 'סופרים אחורה',
      blocks: [
        {
          type: 'jumps',
          max: 100,
          start: 60,
          step: 10,
          jumps: 3,
          back: true,
          caption: 'עכשיו אחורה — המספרים קטנים:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`סופרים אחורה: $45,\ 44,\ 43,\ \_\_$`,
        answer: 42,
        hint: 'בכל פעם אחד פחות.',
        explain: m`$43-1=42$`,
      },
    },
    {
      id: 'ordinal',
      emoji: '🏆',
      title: 'שלב הבוס: ראשון, שני, שלישי',
      blocks: [
        {
          type: 'text',
          md: 'בתור לגלידה: 🧒👧👦🧑👩\n\nמי שעומד **ראשון** — הילד הראשון. אחריו **שני**, **שלישי**, **רביעי**, **חמישי**. אלה **מספרים סודרים** — הם אומרים **איפה** בתור.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'בתור יש 7 ילדים. דנה עומדת אחרונה. באיזה מקום היא?',
        options: ['ראשונה', 'שנייה', 'שביעית', 'שישית'],
        answer: 2,
        hint: 'כמה ילדים יש בתור?',
        explain: 'יש 7 ילדים, והאחרונה היא במקום השביעי.',
      },
    },
  ],
};
