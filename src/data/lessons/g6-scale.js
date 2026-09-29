import { m } from './tex.js';

export default {
  id: 'g6-scale',
  topicId: 'g6-scale',
  grade: 6,
  emoji: '🗺️',
  title: 'קנה מידה',
  subtitle: 'מפות, שרטוטים ודגמים',
  sections: [
    {
      id: 'map',
      emoji: '🗺️',
      title: 'מה אומר 1:100,000',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'ס"מ במפה, ס"מ במציאות',
          md: m`$1:100{,}000$ — כל $1$ ס"מ במפה הוא $100{,}000$ ס"מ במציאות, כלומר $1$ ק"מ.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ק"מ',
        prompt: m`במפה בקנה מידה $1:100{,}000$ המרחק בין שתי ערים הוא $7$ ס"מ. מה המרחק במציאות?`,
        answer: 7,
        hint: m`כל ס"מ = ק"מ.`,
        explain: m`$7$ ק"מ.`,
      },
    },
    {
      id: 'back',
      emoji: '📐',
      title: 'מהמציאות לשרטוט',
      blocks: [
        {
          type: 'steps',
          title: m`חדר באורך $5$ מטר, בקנה מידה $1:50$`,
          steps: [
            { math: m`5\times100=500`, note: 'קודם אותן יחידות: $5$ מטר $=500$ ס"מ.' },
            { math: m`500:50=10`, note: 'מחלקים בקנה המידה — 10 ס"מ בשרטוט.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס"מ',
        prompt: m`מכונית באורך $4$ מטר. דגם שלה בקנה מידה $1:20$. מה אורך הדגם?`,
        answer: 20,
        hint: m`$400:20$`,
        explain: m`$20$ ס"מ.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שטח בקנה מידה',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'שטח גדל פי N²',
          md: m`קנה מידה $1:10$: כל אורך פי $10$ — אבל ריבוע $1\times1$ בשרטוט הוא $10\times10=100$ במציאות. השטח גדל פי $10^2=100$!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`שרטוט בקנה מידה $1:3$. פי כמה השטח במציאות גדול מהשטח בשרטוט?`,
        answer: 9,
        hint: m`$3\times3$`,
        explain: m`$3^2=9$`,
      },
    },
  ],
};
