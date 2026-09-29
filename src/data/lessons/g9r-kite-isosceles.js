import { c, GREEN, m } from './tex.js';

export default {
  id: 'g9r-kite-isosceles',
  topicId: 'g9r-kite-isosceles',
  grade: 9,
  emoji: '🪁',
  title: 'דלתון ומשולש שווה-שוקיים',
  subtitle: 'האלכסון הראשי, שטח דלתון, ומשפטי משולש שווה-שוקיים',
  sections: [
    {
      id: 'kite',
      emoji: '🪁',
      title: 'דלתון',
      blocks: [
        {
          type: 'text',
          md: '**דלתון** — שני זוגות של צלעות **סמוכות** שוות (כמו עפיפון). הוא בנוי משני משולשים שווי-שוקיים עם בסיס משותף.',
        },
        {
          type: 'quad',
          caption: 'השוו דלתון למעוין:',
          shape: 'kite',
          only: ['kite', 'rhombus'],
        },
        {
          type: 'card',
          tone: 'key',
          title: 'האלכסון הראשי',
          md: 'הוא **ציר סימטריה**, חוצה את זוויות הראש, **מאונך** לאלכסון השני **וחוצה אותו**.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'בדלתון, האלכסון המשני 10. האלכסון הראשי חוצה אותו. מה אורך כל חצי?',
        answer: 5,
        hint: 'חוצה = לשני חלקים שווים.',
        explain: '10 ÷ 2 = 5.',
      },
    },
    {
      id: 'area',
      emoji: '📐',
      title: 'שטח דלתון',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'כמו במעוין',
          md: m`האלכסונים מאונכים, ולכן: $$S=\frac{d_1\cdot d_2}{2}$$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'אלכסוני דלתון 9 ו-14. מה השטח?',
        answer: 63,
        hint: m`$\frac{9\cdot14}{2}$`,
        explain: m`$\frac{126}{2}=63$`,
      },
    },
    {
      id: 'isosceles',
      emoji: '🏆',
      title: 'שלב הבוס: משולש שווה-שוקיים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שלושה בחינם',
          md: 'במשולש שווה-שוקיים: **חוצה זווית הראש = התיכון לבסיס = הגובה לבסיס** — אותו קטע!',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'המשפט ההפוך',
          md: 'משולש עם **שתי זוויות שוות** — הוא שווה-שוקיים (הצלעות שמול הזוויות השוות — שוות).',
        },
        {
          type: 'steps',
          title: 'משולש עם זוויות 50° ו-50°',
          steps: [
            { math: m`180°-50°-50°=80°`, note: 'הזווית השלישית.' },
            { math: m`${c(GREEN, 'AB=AC')}`, note: 'שתי זוויות שוות — הצלעות שמולן שוות.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'במשולש שתי זוויות של 45°. מה נכון?',
        options: ['הוא שווה-צלעות', 'הוא שווה-שוקיים וישר-זווית', 'הוא קהה-זווית', 'אין מספיק מידע'],
        answer: 1,
        hint: 'מה הזווית השלישית?',
        explain: '180 − 45 − 45 = 90°: ישר-זווית, ושתי זוויות שוות — שווה-שוקיים.',
      },
    },
  ],
};
