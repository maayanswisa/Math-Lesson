import { m } from './tex.js';

export default {
  id: 'g3-counting-10000',
  topicId: 'g3-counting-10000',
  grade: 3,
  emoji: '🦘',
  title: 'ספירה בקפיצות',
  subtitle: 'קופצים ב-10, 50, 100 ועוד — קדימה ואחורה',
  sections: [
    {
      id: 'jumps',
      emoji: '🦘',
      title: 'קופצים כמו קנגורו',
      blocks: [
        {
          type: 'text',
          md: m`ספירה בקפיצות = מוסיפים **אותו מספר** בכל פעם.

קפיצות של 50: $50,\ 100,\ 150,\ 200,\ \dots$

קפיצות של 25: $25,\ 50,\ 75,\ 100,\ \dots$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה המספר הבא? $200,\ 400,\ 600,\ \_\_$`,
        answer: 800,
        hint: 'בכמה קופצים בכל פעם?',
        explain: 'קפיצות של 200: 600 + 200 = 800.',
      },
    },
    {
      id: 'not-round',
      emoji: '🔎',
      title: 'מתחילים ממספר לא עגול',
      blocks: [
        {
          type: 'steps',
          title: 'מ-138 בקפיצות של 10',
          steps: [
            { math: m`13\textcolor{#c45c48}{8}`, note: 'מתחילים.' },
            { math: m`14\textcolor{#c45c48}{8}`, note: '+10' },
            { math: m`15\textcolor{#c45c48}{8}`, note: '+10' },
            { math: m`16\textcolor{#c45c48}{8}`, note: 'שמתם לב? ספרת היחידות (8) **לא משתנה**!' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$1{,}245,\ 1{,}345,\ 1{,}445,\ \_\_$. מה הבא?`,
        answer: 1545,
        hint: 'איזו ספרה משתנה? המאות!',
        explain: 'קפיצות של 100: 1,445 + 100 = 1,545.',
      },
    },
    {
      id: 'back',
      emoji: '🏆',
      title: 'שלב הבוס: ספירה לאחור',
      blocks: [
        {
          type: 'text',
          md: m`אותו דבר — רק **מורידים** בכל קפיצה: $500,\ 450,\ 400,\ 350,\ \dots$ (אחורה ב-50)`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$3{,}000,\ 2{,}500,\ 2{,}000,\ \_\_$. מה הבא?`,
        answer: 1500,
        hint: 'בכל פעם יורדים באותה כמות. כמה?',
        explain: 'יורדים ב-500: 2,000 − 500 = 1,500.',
      },
    },
  ],
};
