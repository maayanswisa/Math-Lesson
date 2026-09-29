import { m } from './tex.js';

export default {
  id: 'g1-numbers-100',
  topicId: 'g1-numbers-100',
  grade: 1,
  emoji: '🧱',
  title: 'מספרים עד 100: עשרות ויחידות',
  subtitle: 'כל מספר בנוי מחבילות של עשר ועוד בודדים',
  sections: [
    {
      id: 'tens',
      emoji: '📦',
      title: 'עשרות ויחידות',
      blocks: [
        {
          type: 'baseten',
          hundreds: false,
          t: 3,
          o: 4,
          caption: 'מוט = עשר קוביות (עשרת). קובייה בודדת = יחידה. בנו מספרים:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'המספר 34',
          md: 'הספרה **3** — שלוש **עשרות** (30). הספרה **4** — ארבע **יחידות**.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'איזה מספר בנוי מ-5 עשרות ו-2 יחידות?',
        answer: 52,
        hint: 'חמש עשרות = 50.',
        explain: m`$50+2=52$`,
      },
    },
    {
      id: 'zero',
      emoji: '0️⃣',
      title: 'המספר אפס',
      blocks: [
        {
          type: 'text',
          md: 'אפס = **אין כלום**. בצלחת ריקה יש 0 עוגיות 🍽️.\n\nבמספר **40** — ארבע עשרות ו**אפס** יחידות. האפס שומר על המקום!',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'במספר 70, כמה יחידות יש?',
        options: ['7', '0', '70', '10'],
        answer: 1,
        hint: 'הספרה הימנית היא היחידות.',
        explain: '70 = שבע עשרות ו-0 יחידות.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מפרקים',
      blocks: [
        {
          type: 'text',
          md: m`$86=80+6$ — שמונה עשרות ועוד שש יחידות.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה עשרות יש במספר 91?',
        answer: 9,
        hint: 'הספרה השמאלית.',
        explain: m`$91=90+1$ — 9 עשרות.`,
      },
    },
  ],
};
