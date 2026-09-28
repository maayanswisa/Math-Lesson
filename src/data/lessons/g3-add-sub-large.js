import { m } from './tex.js';

// חיבור במאונך עם נשיאה: 2,475 + 1,368
const COLUMN = `<div class='diagram-box'><svg viewBox='0 0 190 130' width='190' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><g font-family='monospace' font-size='12' fill='#c45c48' font-weight='700' text-anchor='middle'><text x='82' y='14'>1</text><text x='110' y='14'>1</text></g><g font-family='monospace' font-size='24' fill='#1a2b3c' text-anchor='middle'>${['2', '4', '7', '5'].map((d, i) => `<text x='${54 + i * 28}' y='42'>${d}</text>`).join('')}${['1', '3', '6', '8'].map((d, i) => `<text x='${54 + i * 28}' y='74'>${d}</text>`).join('')}<text x='26' y='74'>+</text></g><line x1='16' y1='84' x2='166' y2='84' stroke='#0d6e6e' stroke-width='2.5'/><g font-family='monospace' font-size='24' fill='#2d7a4f' font-weight='700' text-anchor='middle'>${['3', '8', '4', '3'].map((d, i) => `<text x='${54 + i * 28}' y='114'>${d}</text>`).join('')}</g></svg></div>`;

export default {
  id: 'g3-add-sub-large',
  topicId: 'g3-add-sub-large',
  grade: 3,
  emoji: '➕',
  title: 'חיבור וחיסור עד 10,000',
  subtitle: 'במאונך, עם נשיאה ושאילה, מספר חסר, ואומדן',
  sections: [
    {
      id: 'column',
      emoji: '📝',
      title: 'חיבור במאונך',
      blocks: [
        {
          type: 'text',
          md: `כותבים **יחידות מתחת ליחידות**, עשרות מתחת לעשרות… ומתחילים **מימין**.

אם בעמודה יוצא 10 או יותר — **נושאים 1** לעמודה הבאה (המספרים האדומים הקטנים):

${COLUMN}`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $1{,}256+2{,}437$?`,
        answer: 3693,
        hint: 'יחידות: 6+7=13 — כותבים 3 ונושאים 1.',
        explain: m`$1{,}256+2{,}437=3{,}693$`,
      },
    },
    {
      id: 'subtract',
      emoji: '➖',
      title: 'חיסור עם שאילה',
      blocks: [
        {
          type: 'steps',
          title: m`$352-128$`,
          steps: [
            { math: m`2-8\ ?`, note: 'ביחידות: אי אפשר להוריד 8 מ-2!' },
            { math: m`12-8=4`, note: '"שואלים" עשרת אחת: 5 עשרות הופכות ל-4, ו-2 הופך ל-12.' },
            { math: m`4-2=2`, note: 'עשרות: 4 (אחרי השאילה) פחות 2.' },
            { math: m`3-1=2`, note: 'מאות.' },
            { math: m`\textcolor{#2d7a4f}{224}`, note: 'בדיקה: 224 + 128 = 352 ✔️' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $500-236$?`,
        answer: 264,
        hint: 'אפשר לבדוק: מה + 236 = 500?',
        explain: m`$500-236=264$, ובדיקה: $264+236=500$ ✔️`,
      },
    },
    {
      id: 'missing',
      emoji: '🏆',
      title: 'שלב הבוס: המספר החסר',
      blocks: [
        {
          type: 'steps',
          title: m`$\square+200=300+148$`,
          steps: [
            { math: m`300+148=448`, note: 'קודם מחשבים את הצד שאנחנו יודעים.' },
            { math: m`\square+200=448`, note: 'עכשיו: מה ועוד 200 נותן 448?' },
            { math: m`\square=448-200=\textcolor{#2d7a4f}{248}`, note: 'מחסרים.' },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'אומדן',
          md: m`$498+302$? בערך $500+300=800$. הסימן $\approx$ אומר "בערך שווה".`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$\square-150=350$. מה חסר?`,
        answer: 500,
        hint: 'איזה מספר, כשמורידים ממנו 150, נשאר 350?',
        explain: m`$350+150=500$`,
      },
    },
  ],
};
