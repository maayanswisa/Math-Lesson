import { m } from './tex.js';

export default {
  id: 'g9x-geo',
  topicId: 'g9x-geo',
  grade: 9,
  emoji: '📐',
  title: 'גאומטריה בסיסית',
  subtitle: 'היקף, שטח, ומשפט פיתגורס',
  sections: [
    {
      id: 'perimeter-area',
      emoji: '▭',
      title: 'היקף ושטח',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני דברים שונים',
          md: '**היקף** — האורך **מסביב** (סכום הצלעות).\n\n**שטח** — כמה **משטח** הצורה מכסה.\n\nמלבן: שטח = אורך × רוחב.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מלבן 8 על 5. מה השטח שלו?',
        answer: 40,
        hint: 'אורך × רוחב.',
        explain: '8 × 5 = 40.',
      },
    },
    {
      id: 'triangle',
      emoji: '🔺',
      title: 'שטח משולש',
      blocks: [
        {
          type: 'shape',
          shape: 'triangle',
          caption: 'בסיס × גובה, חלקי 2. הזיזו את הקודקוד — השטח לא משתנה:',
          base: 6,
          height: 4,
          shift: 2,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'משולש עם בסיס 10 וגובה 7. מה השטח?',
        answer: 35,
        hint: m`$\frac{10\cdot7}{2}$`,
        explain: m`$\frac{70}{2}=35$`,
      },
    },
    {
      id: 'pythagoras',
      emoji: '🏆',
      title: 'שלב הבוס: פיתגורס',
      blocks: [
        {
          type: 'pythagoras',
          caption: 'במשולש ישר-זווית: ריבוע ניצב + ריבוע ניצב = ריבוע היתר.',
          a: 3,
          b: 4,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'ניצבים 9 ו-12. מה אורך היתר?',
        answer: 15,
        hint: m`$\sqrt{81+144}$`,
        explain: m`$\sqrt{225}=15$`,
      },
    },
  ],
};
