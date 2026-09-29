import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g9r-probability-tree',
  topicId: 'g9r-probability-tree',
  grade: 9,
  emoji: '🌳',
  title: 'ניסוי דו-שלבי ודיאגרמת עץ',
  subtitle: 'כופלים לאורך מסלול, מחברים בין מסלולים, והסתברות מותנית',
  sections: [
    {
      id: 'tree',
      emoji: '🌳',
      title: 'דיאגרמת עץ',
      blocks: [
        {
          type: 'text',
          md: m`מוציאים **שני** כדורים מהשקית, אחד אחרי השני. בעץ: ענף לכל אפשרות בשלב הראשון, ומכל אחד — ענפים לשלב השני.`,
        },
        {
          type: 'tree',
          caption: 'שנו את מספר הכדורים, ונסו עם החזרה ובלי:',
          red: 3,
          blue: 2,
          replace: false,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שני כללים',
          md: m`**לאורך מסלול** — **כופלים**. **בין מסלולים שונים** — **מחברים**.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'בשקית 3 אדומים ו-2 כחולים. מוציאים שניים בלי החזרה. מה ההסתברות ששניהם אדומים?',
        options: [m`$\frac{9}{25}$`, m`$\frac{3}{10}$`, m`$\frac{6}{25}$`, m`$\frac{1}{2}$`],
        answer: 1,
        hint: m`$\frac35\cdot\frac24$`,
        explain: m`$\frac35\cdot\frac24=\frac{6}{20}=\frac3{10}$`,
      },
    },
    {
      id: 'sum-paths',
      emoji: '➕',
      title: 'כמה מסלולים — מחברים',
      blocks: [
        {
          type: 'steps',
          title: 'אותה שקית: מה ההסתברות לצבעים שונים?',
          steps: [
            { math: m`P(RB)=\frac35\cdot\frac24=\frac{6}{20}`, note: 'אדום ואז כחול.' },
            { math: m`P(BR)=\frac25\cdot\frac34=\frac{6}{20}`, note: 'כחול ואז אדום.' },
            { math: m`\frac6{20}+\frac6{20}=${c(GREEN, '\\frac35')}`, note: 'שני מסלולים — מחברים.' },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'בדיקה',
          md: 'סכום כל המסלולים בעץ תמיד **1**.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מטילים מטבע פעמיים. מה ההסתברות לקבל בדיוק "עץ" אחד?',
        options: [m`$\frac14$`, m`$\frac12$`, m`$\frac34$`, m`$1$`],
        answer: 1,
        hint: 'עץ-פלי או פלי-עץ.',
        explain: m`$\frac14+\frac14=\frac12$`,
      },
    },
    {
      id: 'conditional',
      emoji: '🏆',
      title: 'שלב הבוס: הסתברות מותנית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`$P(A|B)$`,
          md: m`ההסתברות ש-$A$ יקרה, **בידיעה** ש-$B$ כבר קרה. בעץ — זה בדיוק מה שכתוב על הענף של השלב **השני**!`,
        },
        {
          type: 'steps',
          title: 'יצא אדום ראשון (3 אדומים, 2 כחולים, בלי החזרה). מה הסיכוי שגם השני אדום?',
          steps: [
            { math: m`${c(VIOLET, '2')}+2=4`, note: 'אחרי שהוצאנו אדום נשארו 2 אדומים ו-2 כחולים — 4 כדורים.' },
            { math: m`P=${c(GREEN, '\\frac24=\\frac12')}`, note: '4 כדורים, 2 אדומים.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'בשקית 4 אדומים ו-1 כחול. הוציאו כחול (בלי החזרה). מה הסיכוי שהבא אדום?',
        options: [m`$\frac45$`, m`$1$`, m`$\frac34$`, m`$\frac14$`],
        answer: 1,
        hint: 'מה נשאר בשקית?',
        explain: 'נשארו רק 4 אדומים — אדום בוודאות: 1.',
      },
    },
  ],
};
