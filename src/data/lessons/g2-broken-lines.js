import { m } from './tex.js';

export default {
  id: 'g2-broken-lines',
  topicId: 'g2-broken-lines',
  grade: 2,
  emoji: '〽️',
  title: 'קווים שבורים',
  subtitle: 'מודדים כל קטע — ומחברים',
  sections: [
    {
      id: 'what',
      emoji: '〽️',
      title: 'מהו קו שבור?',
      blocks: [
        {
          type: 'text',
          md: 'קו שבור בנוי מכמה **קטעים ישרים**, שכל אחד מתחיל איפה שהקודם נגמר — כמו זיגזג ⚡.',
        },
        {
          type: 'ruler',
          mode: 'broken',
          parts: [3, 4, 2],
          caption: 'שנו את אורכי הקטעים. האורך הכולל = כל הקטעים ביחד:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס״מ',
        prompt: 'קו שבור עם קטעים של 2, 5 ו-3 ס״מ. מה האורך הכולל?',
        answer: 10,
        hint: m`$2+5+3$`,
        explain: m`$2+5+3=10$ ס״מ.`,
      },
    },
    {
      id: 'compare',
      emoji: '🐜',
      title: 'איזו דרך קצרה יותר?',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'הקו הישר מנצח',
          md: 'נמלה רוצה להגיע מנקודה לנקודה. הדרך הקצרה ביותר היא תמיד **קו ישר** — כל שבירה מאריכה את הדרך!',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'דרך א׳: קו שבור של 4 ועוד 4 ס״מ. דרך ב׳: קו ישר של 6 ס״מ. איזו קצרה יותר?',
        options: ["דרך א'", "דרך ב'", 'שוות', 'אי אפשר לדעת'],
        answer: 1,
        hint: m`$4+4=8$`,
        explain: m`דרך א׳ — $8$ ס״מ. דרך ב׳ — $6$ ס״מ, קצרה יותר.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: קטע חסר',
      blocks: [
        {
          type: 'text',
          md: m`קו שבור באורך $12$ ס״מ, עם שני קטעים: $5$ ס״מ, ועוד אחד. כמה הקטע השני? $12-5=7$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס״מ',
        prompt: 'קו שבור באורך 15 ס״מ בנוי משלושה קטעים. שניים מהם 4 ס״מ ו-6 ס״מ. מה אורך השלישי?',
        answer: 5,
        hint: m`$15-4-6$`,
        explain: m`$15-10=5$ ס״מ.`,
      },
    },
  ],
};
