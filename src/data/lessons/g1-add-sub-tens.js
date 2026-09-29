import { m } from './tex.js';

export default {
  id: 'g1-add-sub-tens',
  topicId: 'g1-add-sub-tens',
  grade: 1,
  emoji: '🔟',
  title: 'חיבור וחיסור של עשרות שלמות',
  subtitle: m`אם יודעים $3+4$ — יודעים גם $30+40$`,
  sections: [
    {
      id: 'idea',
      emoji: '💡',
      title: 'עשרות כמו יחידות',
      blocks: [
        {
          type: 'text',
          md: m`$3$ חבילות ועוד $4$ חבילות = $7$ חבילות. אם בכל חבילה 10 — זה $30+40=70$.`,
        },
        {
          type: 'baseten',
          hundreds: false,
          t: 3,
          o: 0,
          caption: 'הוסיפו מוטות של עשר. כל מוט = 10:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $20+50$?`,
        answer: 70,
        hint: m`$2+5=7$`,
        explain: m`שתי עשרות ועוד חמש עשרות = שבע עשרות: $70$.`,
      },
    },
    {
      id: 'sub',
      emoji: '➖',
      title: 'חיסור עשרות',
      blocks: [
        {
          type: 'jumps',
          max: 100,
          start: 90,
          step: 10,
          jumps: 4,
          back: true,
          caption: 'קופצים אחורה בעשרות:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $80-30$?`,
        answer: 50,
        hint: m`$8-3=5$`,
        explain: m`$80-30=50$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: עד 100',
      blocks: [
        {
          type: 'text',
          md: m`$60+40=100$ — עשר עשרות הן **מאה**! 💯`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$30+\square=100$. מה המספר החסר?`,
        answer: 70,
        hint: 'כמה עשרות חסרות ל-10 עשרות?',
        explain: m`$3+7=10$, ולכן $30+70=100$.`,
      },
    },
  ],
};
