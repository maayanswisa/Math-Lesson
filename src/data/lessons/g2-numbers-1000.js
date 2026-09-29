import { m } from './tex.js';

export default {
  id: 'g2-numbers-1000',
  topicId: 'g2-numbers-1000',
  grade: 2,
  emoji: '💯',
  title: 'מספרים עד 1,000',
  subtitle: 'מאות, עשרות ויחידות — ומי גדול יותר',
  sections: [
    {
      id: 'blocks',
      emoji: '🧱',
      title: 'מאות, עשרות ויחידות',
      blocks: [
        {
          type: 'baseten',
          h: 2,
          t: 4,
          o: 6,
          caption: 'לוח = מאה (10 עשרות). בנו מספרים:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'המספר 246',
          md: m`$246=200+40+6$ — **2** מאות, **4** עשרות, **6** יחידות.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'איזה מספר בנוי מ-3 מאות, 0 עשרות ו-8 יחידות?',
        answer: 308,
        hint: 'אין עשרות — כותבים 0 באמצע.',
        explain: m`$300+0+8=308$`,
      },
    },
    {
      id: 'compare',
      emoji: '🐊',
      title: 'משווים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'קודם המאות',
          md: m`משווים **מאות**. אם שוות — **עשרות**. אם גם הן שוות — **יחידות**.

$512>498$ — כי $5$ מאות יותר מ-$4$ מאות.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה מספר הכי גדול?',
        options: ['689', '698', '869', '896'],
        answer: 3,
        hint: 'מי עם הכי הרבה מאות? ואחר כך עשרות?',
        explain: m`$896$ — 8 מאות ו-9 עשרות.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: אלף!',
      blocks: [
        {
          type: 'text',
          md: m`$999+1=1000$ — **עשר מאות** הן **אלף**. 🎉`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה מאות יש ב-1,000?',
        answer: 10,
        hint: 'כל מאה = 100.',
        explain: 'עשר מאות הן אלף.',
      },
    },
  ],
};
