import { m } from './tex.js';

export default {
  id: 'g4-quadrilaterals',
  topicId: 'g4-quadrilaterals',
  grade: 4,
  emoji: '🔷',
  title: 'מרובעים: תכונות, היקף ושטח',
  subtitle: 'ריבוע, מלבן, מעוין, מקבילית וטרפז',
  sections: [
    {
      id: 'family',
      emoji: '👨‍👩‍👧',
      title: 'המשפחה',
      blocks: [
        {
          type: 'quad',
          shape: 'parallelogram',
          caption: 'בחרו מרובע וראו את התכונות שלו:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'בקצרה',
          md: '**טרפז** — זוג צלעות מקבילות אחד. **מקבילית** — שני זוגות. **מלבן** — מקבילית עם זוויות ישרות. **מעוין** — מקבילית עם כל הצלעות שוות. **ריבוע** — גם מלבן וגם מעוין!',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'לאיזה מרובע יש 4 צלעות שוות ו-4 זוויות ישרות?',
        options: ['מלבן', 'מעוין', 'ריבוע', 'טרפז'],
        answer: 2,
        hint: 'גם מלבן וגם מעוין.',
        explain: 'ריבוע — כל הצלעות שוות וכל הזוויות ישרות.',
      },
    },
    {
      id: 'perimeter',
      emoji: '🐜',
      title: 'היקף',
      blocks: [
        {
          type: 'rect',
          l: 6,
          w: 3,
          showPerimeter: true,
          caption: 'היקף = סכום כל הצלעות. שנו את המלבן:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס"מ',
        prompt: 'מה ההיקף של ריבוע שצלעו 9 ס"מ?',
        answer: 36,
        hint: m`$4\times9$`,
        explain: m`$4\times9=36$ ס"מ.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שטח',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שטח = כמה משבצות',
          md: m`מלבן: אורך × רוחב ($6\times3=18$ סמ"ר)

ריבוע: צלע × צלע`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: 'מלבן שהיקפו 20 ס"מ ואורכו 7 ס"מ. מה השטח שלו?',
        answer: 21,
        hint: m`רוחב: $(20-14):2=3$`,
        explain: m`$7\times3=21$ סמ"ר.`,
      },
    },
  ],
};
