import { m } from './tex.js';

export default {
  id: 'g3-area',
  topicId: 'g3-area',
  grade: 3,
  emoji: '🟩',
  title: 'שטח מלבן',
  subtitle: 'סופרים משבצות — ומגלים קיצור דרך',
  sections: [
    {
      id: 'count',
      emoji: '🔢',
      title: 'שטח = כמה משבצות',
      blocks: [
        {
          type: 'text',
          md: '**שטח** = כמה מקום הצורה תופסת. מודדים אותו במשבצות קטנות — כל משבצת היא **יחידת שטח**.',
        },
        {
          type: 'rect',
          caption: 'שנו את המלבן וספרו משבצות:',
          l: 4,
          w: 3,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'משבצות',
        prompt: 'מלבן של 5 משבצות לאורך ו-2 לרוחב. כמה משבצות בסך הכול?',
        answer: 10,
        hint: 'שתי שורות של 5.',
        explain: m`$5\times2=10$`,
      },
    },
    {
      id: 'formula',
      emoji: '⚡',
      title: 'קיצור דרך: אורך × רוחב',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שטח מלבן',
          md: m`**אורך × רוחב**

במקום לספור 12 משבצות: $4\times3=12$`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'יחידה',
          md: 'משבצת של 1 ס"מ על 1 ס"מ נקראת **סמ"ר** (סנטימטר רבוע).',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: 'מה השטח של מלבן באורך 7 ס"מ וברוחב 4 ס"מ?',
        answer: 28,
        hint: 'אורך × רוחב.',
        explain: m`$7\times4=28$ סמ"ר.`,
      },
    },
    {
      id: 'perimeter',
      emoji: '🏆',
      title: 'שלב הבוס: שטח ≠ היקף',
      blocks: [
        {
          type: 'rect',
          caption: 'הקו הסגול הוא ההיקף — האורך מסביב. נסו: 6×1 ו-3×2. אותו שטח?',
          l: 6,
          w: 1,
          showPerimeter: true,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'אותו שטח, היקף שונה!',
          md: '6×1 ו-3×2 — לשניהם שטח 6. אבל ההיקף של 6×1 הוא 14, ושל 3×2 רק 10.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מה ההיקף של מלבן 5 על 3?',
        answer: 16,
        hint: '5 + 3 + 5 + 3',
        explain: '5 + 3 + 5 + 3 = 16',
      },
    },
  ],
};
