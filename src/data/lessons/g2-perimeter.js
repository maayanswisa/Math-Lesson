import { m } from './tex.js';

export default {
  id: 'g2-perimeter',
  topicId: 'g2-perimeter',
  grade: 2,
  emoji: '🔲',
  title: 'היקף',
  subtitle: 'הולכים מסביב לצורה — וסוכמים את הצלעות',
  sections: [
    {
      id: 'what',
      emoji: '🐜',
      title: 'מהו היקף?',
      blocks: [
        {
          type: 'text',
          md: 'נמלה הולכת מסביב לצורה, לאורך כל הצלעות, וחוזרת לנקודת ההתחלה. הדרך שהיא עברה היא **ההיקף**.',
        },
        {
          type: 'rect',
          l: 5,
          w: 3,
          showPerimeter: true,
          caption: 'שנו את המלבן — וראו את ההיקף:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס״מ',
        prompt: 'משולש עם צלעות 3, 4 ו-5 ס״מ. מה ההיקף שלו?',
        answer: 12,
        hint: m`$3+4+5$`,
        explain: m`$3+4+5=12$ ס״מ.`,
      },
    },
    {
      id: 'rect',
      emoji: '▭',
      title: 'היקף מלבן',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'צלעות נגדיות שוות',
          md: m`במלבן $6$ על $2$: הצלעות הן $6,\ 2,\ 6,\ 2$ — וההיקף $6+2+6+2=16$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס״מ',
        prompt: 'ריבוע שכל צלע שלו 5 ס״מ. מה ההיקף?',
        answer: 20,
        hint: 'לריבוע 4 צלעות שוות.',
        explain: m`$5+5+5+5=20$ ס״מ.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: גדר לגינה',
      blocks: [
        {
          type: 'text',
          md: 'רוצים לבנות גדר מסביב לגינה מלבנית באורך 8 מטרים וברוחב 4 מטרים. כמה מטרים של גדר צריך? — זה **ההיקף**!',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מטרים',
        prompt: 'כמה מטרים של גדר צריך?',
        answer: 24,
        hint: m`$8+4+8+4$`,
        explain: m`$8+4+8+4=24$ מטרים.`,
      },
    },
  ],
};
