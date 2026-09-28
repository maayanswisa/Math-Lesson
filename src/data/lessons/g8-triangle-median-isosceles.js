import { c, GREEN, m } from './tex.js';

const MEDIAN_SVG = `<div class='diagram-box'><svg viewBox='0 0 220 130' width='220' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><polygon points='30,110 190,110 70,20' fill='rgba(13,110,110,0.06)' stroke='#0d6e6e' stroke-width='2.5'/><line x1='70' y1='20' x2='110' y2='110' stroke='#c45c48' stroke-width='2.5' stroke-dasharray='5 3'/><circle cx='110' cy='110' r='4' fill='#c45c48'/><line x1='70' y1='106' x2='70' y2='114' stroke='#c45c48' stroke-width='2.5'/><line x1='150' y1='106' x2='150' y2='114' stroke='#c45c48' stroke-width='2.5'/><text x='110' y='126' text-anchor='middle' font-size='11' fill='#c45c48'>אמצע הצלע</text><text x='96' y='60' font-size='12' font-weight='700' fill='#c45c48'>תיכון</text></svg></div>`;

const ISO_SVG = `<div class='diagram-box'><svg viewBox='0 0 220 140' width='220' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><polygon points='30,115 190,115 110,15' fill='rgba(13,110,110,0.06)' stroke='#0d6e6e' stroke-width='2.5'/><line x1='66' y1='62' x2='74' y2='68' stroke='#c45c48' stroke-width='2.5'/><line x1='146' y1='68' x2='154' y2='62' stroke='#c45c48' stroke-width='2.5'/><path d='M 50,115 A 20,20 0 0,0 43,99' fill='none' stroke='#7c4dcc' stroke-width='3'/><path d='M 170,115 A 20,20 0 0,1 177,99' fill='none' stroke='#7c4dcc' stroke-width='3'/><text x='60' y='50' font-size='11' fill='#c45c48'>שוק</text><text x='150' y='50' font-size='11' fill='#c45c48'>שוק</text><text x='110' y='132' text-anchor='middle' font-size='11' fill='#1a2b3c'>בסיס</text></svg></div>`;

const TRIPLE_SVG = `<div class='diagram-box'><svg viewBox='0 0 220 140' width='220' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><polygon points='30,115 190,115 110,15' fill='rgba(13,110,110,0.06)' stroke='#0d6e6e' stroke-width='2.5'/><line x1='110' y1='15' x2='110' y2='115' stroke='#c45c48' stroke-width='3'/><rect x='110' y='103' width='12' height='12' fill='none' stroke='#1670b3' stroke-width='2'/><line x1='70' y1='111' x2='70' y2='119' stroke='#e2a020' stroke-width='3'/><line x1='150' y1='111' x2='150' y2='119' stroke='#e2a020' stroke-width='3'/><path d='M 110,29 A 14,14 0 0,1 101.3,25.9' fill='none' stroke='#7c4dcc' stroke-width='3'/><path d='M 110,29 A 14,14 0 0,0 118.7,25.9' fill='none' stroke='#7c4dcc' stroke-width='3'/></svg></div>`;

export default {
  id: 'g8-triangle-median-isosceles',
  topicId: 'g8-triangle-median-isosceles',
  grade: 8,
  emoji: '🔺',
  title: 'תיכון ומשולש שווה-שוקיים',
  subtitle: 'מה זה תיכון, התכונות של משולש שווה-שוקיים, והקטע ה"משולש"',
  sections: [
    {
      id: 'median',
      emoji: '📍',
      title: 'מה זה תיכון?',
      blocks: [
        {
          type: 'text',
          md: m`**תיכון** הוא קטע שמחבר **קודקוד** אל **אמצע הצלע שמולו**.

${MEDIAN_SVG}

התיכון חוצה את הצלע לשני חלקים **שווים**. לכל משולש יש **3 תיכונים** — אחד מכל קודקוד.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס"מ',
        prompt: m`במשולש $ABC$, $AM$ הוא תיכון לצלע $BC$, ו-$BC=14$ ס"מ. כמה זה $BM$?`,
        answer: 7,
        hint: m`התיכון מגיע לאמצע של $BC$.`,
        explain: m`$M$ אמצע $BC$, ולכן $BM=\frac{14}{2}=7$ ס"מ.`,
      },
    },
    {
      id: 'isosceles',
      emoji: '⛺',
      title: 'משולש שווה-שוקיים',
      blocks: [
        {
          type: 'text',
          md: m`משולש עם **שתי צלעות שוות** (שוקיים). הצלע השלישית נקראת **בסיס**.

${ISO_SVG}`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'התכונה הראשונה',
          md: m`**זוויות הבסיס שוות.** (שתי הזוויות שליד הבסיס.)`,
        },
        {
          type: 'steps',
          title: 'זווית הראש 40°. מה כל זווית בסיס?',
          steps: [
            { math: m`180°-40°=140°`, note: 'מה שנשאר לשתי זוויות הבסיס ביחד.' },
            { math: m`140°\div2=${c(GREEN, '70°')}`, note: 'והן שוות — מחלקים ב-2.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: 'במשולש שווה-שוקיים כל זווית בסיס היא 50°. מה זווית הראש?',
        answer: 80,
        hint: m`$180-50-50$`,
        explain: m`$180°-2\cdot50°=80°$`,
      },
    },
    {
      id: 'triple',
      emoji: '🎁',
      title: 'קטע אחד — שלושה תפקידים',
      blocks: [
        {
          type: 'text',
          md: m`במשולש שווה-שוקיים, **התיכון מקודקוד הראש לבסיס** הוא בו-זמנית:

${TRIPLE_SVG}

1. **תיכון** — מגיע לאמצע הבסיס (סימון צהוב).
2. **גובה** — מאונך לבסיס, זווית של $90°$ (ריבוע כחול).
3. **חוצה זווית** — מחלק את זווית הראש לשני חצאים שווים (קשתות סגולות).`,
        },
        {
          type: 'card',
          tone: 'why',
          title: 'למה זה נכון?',
          md: m`התיכון מחלק את המשולש לשני משולשים. יש להם: שוק = שוק, חצי בסיס = חצי בסיס, והתיכון משותף — **חופפים לפי צ.צ.צ**! לכן הזוויות המתאימות שוות.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: 'במשולש שווה-שוקיים זווית הראש 70°. מורידים ממנה תיכון לבסיס. מה הזווית בין התיכון לבסיס?',
        answer: 90,
        hint: 'התיכון לבסיס הוא גם… גובה!',
        explain: 'התיכון לבסיס הוא גם גובה, ולכן הוא מאונך לבסיס: 90°.',
      },
    },
  ],
};
