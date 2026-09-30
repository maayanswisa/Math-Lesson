import { m } from './tex.js';

export default {
  id: 'g12u5-explog-growth-decay',
  topicId: 'g12-u5-explog-growth-decay',
  grade: 12,
  units: 5,
  emoji: '☢️',
  title: 'גדילה, דעיכה והמספר e',
  subtitle: 'מחצית חיים, הפונקציה ההפוכה ונגזרות',
  sections: [
    {
      id: 'model',
      emoji: '📈',
      title: 'המודל',
      blocks: [
        {
          type: 'growth',
          p: -20,
          caption: 'שנו את אחוז השינוי — דעיכה (שלילי) או גדילה (חיובי):',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'מחצית חיים',
          md: m`$$N(t)=N_0\cdot\left(\tfrac12\right)^{t/T}$$

$T$ — הזמן שבו נשארת חצי מהכמות.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'גרם',
        prompt: m`מחצית החיים של יסוד היא $5$ שנים. מ-$80$ גרם — כמה יישארו אחרי $15$ שנים?`,
        answer: 10,
        hint: m`שלוש מחציות: $80\cdot\frac18$`,
        explain: m`$10$ גרם.`,
      },
    },
    {
      id: 'solve-t',
      emoji: '⏱️',
      title: 'מוצאים זמן — עם לוגריתם',
      blocks: [
        {
          type: 'steps',
          title: m`מתי $1000\cdot1.05^t$ יגיע ל-$2000$?`,
          steps: [
            { math: m`1.05^t=2`, note: 'מחלקים.' },
            { math: m`t=\log_{1.05}2=\frac{\log2}{\log1.05}`, note: 'לוגריתם ומעבר בסיס.' },
            { math: m`t\approx14.2`, note: 'מחשבון.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'שנים',
        tolerance: 0.1,
        prompt: m`תוך כמה שנים כמות שדועכת ב-$10\%$ לשנה יורדת לחצי? (בערך)`,
        answer: 6.58,
        hint: m`$0.9^t=0.5$`,
        explain: m`$t=\frac{\log0.5}{\log0.9}\approx6.58$`,
      },
    },
    {
      id: 'e',
      emoji: '🏆',
      title: 'שלב הבוס: e והנגזרות',
      blocks: [
        {
          type: 'tangent',
          fn: 'exp',
          caption: m`$f(x)=e^x$: השיפוע בכל נקודה שווה לגובה!`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שלוש נגזרות',
          md: m`$(e^x)'=e^x$

$(\ln x)'=\frac1x$

$(a^x)'=a^x\ln a$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.01,
        prompt: m`$f(x)=2^x$. כמה זה $f'(3)$? (בערך, $\ln2\approx0.693$)`,
        answer: 5.545,
        hint: m`$8\ln2$`,
        explain: m`$8\cdot0.693\approx5.55$`,
      },
    },
  ],
};
