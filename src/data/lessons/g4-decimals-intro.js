import { m } from './tex.js';

export default {
  id: 'g4-decimals-intro',
  topicId: 'g4-decimals-intro',
  grade: 4,
  emoji: '🔹',
  title: 'שברים עשרוניים — מבוא',
  subtitle: 'עשיריות ומאיות, עם נקודה',
  sections: [
    {
      id: 'tenths',
      emoji: '🔟',
      title: 'עשיריות',
      blocks: [
        {
          type: 'text',
          md: m`מחלקים שלם ל-10 חלקים — כל חלק **עשירית**: $\frac{1}{10}=0.1$. שלוש עשיריות: $\frac{3}{10}=0.3$.`,
        },
        {
          type: 'fraction',
          bars: [{ n: 3, d: 10 }],
          caption: m`$0.3$ — שלוש עשיריות מהרצועה:`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איך כותבים $\frac{7}{10}$ עם נקודה?`,
        options: ['0.7', '7.0', '0.07', '70'],
        answer: 0,
        hint: 'שבע עשיריות — ספרה אחת אחרי הנקודה.',
        explain: m`$0.7$`,
      },
    },
    {
      id: 'hundredths',
      emoji: '💯',
      title: 'מאיות',
      blocks: [
        {
          type: 'place',
          start: '2.45',
          places: [1, 0, -1, -2],
          shift: false,
          caption: 'הספרה השנייה אחרי הנקודה — מאיות:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'כמו כסף',
          md: m`$2.45$ ש"ח = 2 שקלים ו-45 אגורות. אגורה = מאית השקל: $0.01$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה ערך הספרה 8 במספר $3.08$?`,
        options: ['8 עשיריות', '8 מאיות', '8 שלמים', '80'],
        answer: 1,
        hint: 'היא במקום השני אחרי הנקודה.',
        explain: m`$3.08=3+\frac{8}{100}$ — 8 מאיות.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מי גדול?',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'אפס בסוף לא משנה',
          md: m`$0.5=0.50$. לכן $0.5$ **גדול** מ-$0.45$ — כי $50$ מאיות יותר מ-$45$ מאיות.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה מספר הכי גדול?',
        options: ['0.6', '0.59', '0.09', '0.56'],
        answer: 0,
        hint: 'השלימו לשתי ספרות אחרי הנקודה.',
        explain: m`$0.60$ — הכי הרבה מאיות.`,
      },
    },
  ],
};
