import { c, GREEN, m } from './tex.js';

const HALF_RECT = `<div class='diagram-box'><svg viewBox='0 0 220 120' width='220' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><rect x='20' y='20' width='180' height='80' fill='none' stroke='#4a5d73' stroke-width='2' stroke-dasharray='6 4'/><polygon points='20,100 200,100 90,20' fill='rgba(13,110,110,0.25)' stroke='#0d6e6e' stroke-width='2.5'/><polygon points='20,100 90,20 20,20' fill='rgba(196,92,72,0.15)'/><polygon points='200,100 90,20 200,20' fill='rgba(196,92,72,0.15)'/><line x1='90' y1='20' x2='90' y2='100' stroke='#c45c48' stroke-width='2' stroke-dasharray='4'/></svg></div>`;

export default {
  id: 'g5-triangle-area',
  topicId: 'g5-triangle-area',
  grade: 5,
  emoji: '🔺',
  title: 'שטח והיקף משולש',
  subtitle: 'למה מחלקים ב-2, בוחרים בסיס וגובה, והיקף',
  sections: [
    {
      id: 'why-half',
      emoji: '✂️',
      title: 'משולש = חצי מלבן',
      blocks: [
        {
          type: 'text',
          md: m`מקיפים את המשולש במלבן. החלקים האדומים שבחוץ הם **בדיוק** כמו החלקים שבפנים — המשולש הוא **חצי** מהמלבן!

${HALF_RECT}`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שטח משולש',
          md: m`בסיס × גובה, ואז **חלקי 2**

בקיצור: $\frac{b\times h}{2}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: 'בסיס משולש 8 ס"מ, והגובה אליו 5 ס"מ. מה השטח?',
        answer: 20,
        hint: m`$\frac{8\times5}{2}$`,
        explain: m`$\frac{40}{2}=20$ סמ"ר.`,
      },
    },
    {
      id: 'same-area',
      emoji: '🎩',
      title: 'קסם: השטח לא משתנה',
      blocks: [
        {
          type: 'shape',
          shape: 'triangle',
          caption: 'הזיזו רק את הקודקוד. הצורה משתנה — אבל השטח?',
          base: 6,
          height: 4,
          shift: 1,
        },
        {
          type: 'card',
          tone: 'why',
          title: 'למה?',
          md: 'השטח תלוי **רק** בבסיס ובגובה. כל עוד הם לא משתנים — גם השטח לא.',
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'בסיס וגובה שמתאימים',
          md: 'הגובה חייב להיות **מאונך לבסיס שבחרתם** — לא סתם צלע אחרת.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: 'משולש קהה-זווית: בסיס 10, הגובה (שנופל בחוץ) 3. מה השטח?',
        answer: 15,
        hint: 'אותה נוסחה בדיוק.',
        explain: m`$\frac{10\times3}{2}=15$ סמ"ר.`,
      },
    },
    {
      id: 'perimeter',
      emoji: '🏆',
      title: 'שלב הבוס: היקף',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'היקף = סכום הצלעות',
          md: 'היקף הוא האורך **מסביב** — מחברים את שלוש הצלעות.',
        },
        {
          type: 'steps',
          title: 'משולש עם צלעות 5, 7, 8',
          steps: [
            { math: m`5+7+8=${c(GREEN, '20')}`, note: 'היקף: 20 ס"מ (יחידות אורך).' },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'לא מתבלבלים',
          md: 'היקף נמדד ב**ס"מ** (אורך). שטח נמדד ב**סמ"ר** — סנטימטרים רבועים (משבצות).',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס"מ',
        prompt: 'משולש שווה-צלעות, כל צלע 6 ס"מ. מה ההיקף?',
        answer: 18,
        hint: 'שלוש צלעות שוות.',
        explain: '6+6+6 = 18 ס"מ.',
      },
    },
  ],
};
