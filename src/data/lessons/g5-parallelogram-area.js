import { m } from './tex.js';

const CUT_SVG = `<div class='diagram-box'><svg viewBox='0 0 300 100' width='300' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><polygon points='10,85 110,85 140,15 40,15' fill='rgba(13,110,110,0.12)' stroke='#0d6e6e' stroke-width='2.5'/><polygon points='10,85 40,85 40,15' fill='rgba(196,92,72,0.3)' stroke='#c45c48' stroke-width='1.5'/><text x='155' y='55' font-size='22' fill='#4a5d73'>→</text><rect x='190' y='15' width='100' height='70' fill='rgba(13,110,110,0.12)' stroke='#0d6e6e' stroke-width='2.5'/><polygon points='260,85 290,85 290,15' fill='rgba(196,92,72,0.3)' stroke='#c45c48' stroke-width='1.5'/></svg></div>`;

export default {
  id: 'g5-parallelogram-area',
  topicId: 'g5-parallelogram-area',
  grade: 5,
  emoji: '▰',
  title: 'שטח מקבילית',
  subtitle: 'בסיס × גובה — ולמה זה בדיוק כמו מלבן',
  sections: [
    {
      id: 'cut',
      emoji: '✂️',
      title: 'גוזרים והופכים למלבן',
      blocks: [
        {
          type: 'text',
          md: m`גוזרים את המשולש האדום מצד אחד ומדביקים בצד השני — וקיבלנו **מלבן** עם אותו שטח!

${CUT_SVG}`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שטח מקבילית',
          md: m`**בסיס × גובה**

הגובה — המרחק הישר, **לא** הצלע המשופעת.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: 'בסיס מקבילית 9 ס"מ והגובה 4 ס"מ. מה השטח?',
        answer: 36,
        hint: 'בסיס × גובה.',
        explain: '9×4 = 36 סמ"ר.',
      },
    },
    {
      id: 'play',
      emoji: '🎮',
      title: 'משחקים עם המקבילית',
      blocks: [
        {
          type: 'shape',
          shape: 'parallelogram',
          caption: 'שנו בסיס, גובה ושיפוע — מתי השטח משתנה?',
          base: 5,
          height: 3,
          shift: 2,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'קשר למשולש',
          md: 'אלכסון מחלק מקבילית לשני משולשים זהים — לכן שטח משולש הוא **חצי** מבסיס × גובה.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מקבילית: בסיס 8, צלע משופעת 5, גובה 4. מה השטח?',
        options: ['40', '32', '20', '16'],
        answer: 1,
        hint: 'הצלע המשופעת היא מלכודת!',
        explain: 'בסיס × גובה = 8×4 = 32. הצלע המשופעת (5) לא משתתפת.',
      },
    },
    {
      id: 'two-ways',
      emoji: '🏆',
      title: 'שלב הבוס: שתי דרכים',
      blocks: [
        {
          type: 'text',
          md: m`למקבילית שני גבהים, ולכן **שתי דרכים** לחשב שטח — ושתיהן נותנות **אותה תוצאה**:

בסיס 10 עם גובה 3 → $30$. בסיס 6 עם גובה 5 → $30$. ✔️`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'במקבילית: בסיס 12 עם גובה 5. לבסיס השני (אורכו 10) — מה הגובה?',
        answer: 6,
        hint: 'השטח זהה בשתי הדרכים: 12×5 = 60. אז 10 × ? = 60.',
        explain: '60 ÷ 10 = 6.',
      },
    },
  ],
};
