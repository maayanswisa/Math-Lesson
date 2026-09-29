import { m } from './tex.js';

export default {
  id: 'g1-measure-cm',
  topicId: 'g1-measure-cm',
  grade: 1,
  emoji: '📏',
  title: 'מודדים בסרגל',
  subtitle: 'סנטימטר — יחידה שכולם מסכימים עליה',
  sections: [
    {
      id: 'why',
      emoji: '🤝',
      title: 'למה סנטימטר?',
      blocks: [
        {
          type: 'text',
          md: 'אטבים וכפות ידיים — כל אחד בגודל אחר. **סנטימטר** (ס״מ) — אותו אורך לכולם! בסרגל, המרחק בין שני מספרים צמודים הוא ס״מ אחד.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'למה מודדים בסנטימטרים ולא בכפות ידיים?',
        options: ['כי זה יפה יותר', 'כי ס״מ זהה לכולם', 'כי אין לנו ידיים', 'כי זה מהר'],
        answer: 1,
        hint: 'האם כל הידיים באותו גודל?',
        explain: 'ס״מ הוא יחידה מוסכמת — אצל כולם הוא אותו אורך.',
      },
    },
    {
      id: 'ruler',
      emoji: '✏️',
      title: 'מודדים!',
      blocks: [
        {
          type: 'ruler',
          len: 7,
          caption: 'שנו את אורך העיפרון וקראו על הסרגל:',
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'לא לשכוח!',
          md: 'מתחילים מה-**0** של הסרגל — לא מה-1 ולא מקצה הסרגל.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס״מ',
        prompt: 'קצה אחד של הקיסם על 0, והקצה השני על 9. מה אורך הקיסם?',
        answer: 9,
        hint: 'מתחילים מאפס.',
        explain: 'הקיסם באורך 9 ס״מ.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: לא מתחילים מאפס',
      blocks: [
        {
          type: 'text',
          md: m`אם הקצה על $2$ והקצה השני על $8$ — סופרים את הרווחים: $8-2=6$ ס״מ.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס״מ',
        prompt: 'עיפרון מתחיל על 3 ונגמר על 10. מה האורך שלו?',
        answer: 7,
        hint: m`$10-3$`,
        explain: m`$10-3=7$ ס״מ.`,
      },
    },
  ],
};
