import { c, GREEN, m } from './tex.js';

export default {
  id: 'g9r-rhombus-square',
  topicId: 'g9r-rhombus-square',
  grade: 9,
  emoji: '🔶',
  title: 'מעוין וריבוע',
  subtitle: 'אלכסונים מאונכים, שטח לפי אלכסונים, ויחסי הכלה',
  sections: [
    {
      id: 'rhombus',
      emoji: '🔶',
      title: 'מעוין',
      blocks: [
        {
          type: 'text',
          md: '**מעוין** — כל 4 הצלעות שוות. הוא מקבילית, **ובנוסף: האלכסונים מאונכים** (וחוצים את הזוויות).',
        },
        {
          type: 'quad',
          caption: 'השוו מעוין לריבוע:',
          shape: 'rhombus',
          only: ['rhombus', 'square', 'rectangle'],
        },
        {
          type: 'card',
          tone: 'key',
          title: 'איך מוכיחים?',
          md: 'מקבילית + **אלכסונים מאונכים** ⟺ מעוין. (או מקבילית + שתי צלעות סמוכות שוות)',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'במקבילית האלכסונים מאונכים זה לזה. מה היא בהכרח?',
        options: ['מלבן', 'מעוין', 'ריבוע', 'טרפז'],
        answer: 1,
        hint: 'איזה תכונה מתווספת למקבילית עם אלכסונים מאונכים?',
        explain: 'מקבילית עם אלכסונים מאונכים היא מעוין (ריבוע רק אם גם שווים).',
      },
    },
    {
      id: 'area',
      emoji: '📐',
      title: 'שטח לפי אלכסונים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שטח מעוין',
          md: m`$$S=\frac{d_1\cdot d_2}{2}$$
האלכסונים מאונכים — המעוין הוא חצי מהמלבן שנבנה סביבם.`,
        },
        {
          type: 'steps',
          title: 'אלכסונים 6 ו-10',
          steps: [{ math: m`\frac{6\cdot10}{2}=${c(GREEN, '30')}`, note: 'שטח המעוין.' }],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'אלכסוני מעוין 8 ו-12. מה השטח?',
        answer: 48,
        hint: m`$\frac{8\cdot12}{2}$`,
        explain: m`$\frac{96}{2}=48$`,
      },
    },
    {
      id: 'inclusion',
      emoji: '🏆',
      title: 'שלב הבוס: מי בתוך מי?',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'יחסי הכלה',
          md: '**ריבוע = מלבן ∩ מעוין** — כל ריבוע הוא גם מלבן וגם מעוין, ויש לו את כל התכונות של שניהם.\n\nאבל **לא** כל מעוין הוא ריבוע, ולא כל מלבן הוא ריבוע.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזו טענה נכונה?',
        options: ['כל מעוין הוא ריבוע', 'כל ריבוע הוא מעוין', 'כל מלבן הוא מעוין', 'כל מקבילית היא מעוין'],
        answer: 1,
        hint: 'לריבוע יש 4 צלעות שוות?',
        explain: 'לריבוע 4 צלעות שוות — ולכן הוא מעוין. ההפך לא תמיד נכון.',
      },
    },
  ],
};
