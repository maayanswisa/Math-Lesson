import { m } from './tex.js';

const LSHAPE = `<div class='diagram-box'><svg viewBox='0 0 240 170' width='240' xmlns='http://www.w3.org/2000/svg' style='max-width:100%'><polygon points='20,20 100,20 100,90 220,90 220,150 20,150' fill='rgba(13,110,110,0.12)' stroke='#0d6e6e' stroke-width='3'/><line x1='100' y1='90' x2='20' y2='90' stroke='#c45c48' stroke-width='2' stroke-dasharray='5 4'/><g font-size='12' font-weight='700' fill='#1a2b3c'><text x='60' y='14' text-anchor='middle'>4</text><text x='8' y='88' text-anchor='middle'>6</text><text x='120' y='166' text-anchor='middle'>10</text><text x='230' y='124'>3</text></g><text x='60' y='60' font-size='11' fill='#c45c48' text-anchor='middle'>א</text><text x='120' y='125' font-size='11' fill='#c45c48' text-anchor='middle'>ב</text></svg></div>`;

export default {
  id: 'g6-composite-shapes',
  topicId: 'g6-composite-shapes',
  grade: 6,
  emoji: '🧩',
  title: 'מצולעים מורכבים',
  subtitle: 'מפרקים לחלקים — או משלימים ומחסרים',
  sections: [
    {
      id: 'split',
      emoji: '✂️',
      title: 'דרך א: פירוק',
      blocks: [
        {
          type: 'text',
          md: m`${LSHAPE}

חותכים לשני מלבנים (הקו האדום): **א** — $4\times3=12$, **ב** — $10\times3=30$. השטח: $12+30=42$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`צורת L: מלבן $8\times5$ ועוד מלבן $3\times2$ שמחובר אליו. מה השטח הכולל?`,
        answer: 46,
        hint: m`$40+6$`,
        explain: m`$8\times5+3\times2=40+6=46$`,
      },
    },
    {
      id: 'subtract',
      emoji: '➖',
      title: 'דרך ב: השלמה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מלבן גדול פחות החור',
          md: m`את אותה צורה אפשר לראות כמלבן $10\times6=60$ שחסר ממנו מלבן $6\times3=18$: $60-18=42$ — אותה תשובה!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ"ר',
        prompt: m`חצר $12\times8$ מטר, ובאמצעה בריכה $4\times3$ מטר. מה שטח הדשא מסביב?`,
        answer: 84,
        hint: m`$96-12$`,
        explain: m`$12\times8-4\times3=96-12=84$ מ"ר.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: היקף',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'היקף — רק הצלעות החיצוניות',
          md: m`בצורת ה-L למעלה: $4+6+10+3+6+3=32$. הקו האדום הפנימי **לא** נכלל. ושימו לב: שטח שווה לא אומר היקף שווה!`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מלבן $6\times2$ ומלבן $4\times3$ — לשניהם שטח 12. מה נכון לגבי ההיקף?`,
        options: ['שווה', m`ל-$6\times2$ היקף גדול יותר`, m`ל-$4\times3$ היקף גדול יותר`, 'אי אפשר לדעת'],
        answer: 1,
        hint: m`$2(6+2)$ מול $2(4+3)$`,
        explain: m`$16$ מול $14$ — אותו שטח, היקף שונה.`,
      },
    },
  ],
};
