import { m } from './tex.js';

const COLUMN = `<div class='diagram-box'><svg viewBox='0 0 160 110' width='160' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><g font-family='monospace' font-size='24' fill='#1a2b3c'><text x='30' y='32'> 3</text><text x='30' y='64'>+1</text></g><g font-family='monospace' font-size='24' fill='#1a2b3c'><text x='74' y='32'>40</text><text x='74' y='64'>25</text></g><g font-family='monospace' font-size='24' fill='#c45c48' font-weight='700'><text x='60' y='32'>.</text><text x='60' y='64'>.</text><text x='60' y='100'>.</text></g><line x1='20' y1='74' x2='120' y2='74' stroke='#0d6e6e' stroke-width='2'/><g font-family='monospace' font-size='24' fill='#2d7a4f' font-weight='700'><text x='44' y='100'>4</text><text x='74' y='100'>65</text></g><line x1='67' y1='6' x2='67' y2='106' stroke='#c45c48' stroke-width='1' stroke-dasharray='3 3'/></svg></div>`;

export default {
  id: 'g5-decimals-ops',
  topicId: 'g5-decimals-ops',
  grade: 5,
  emoji: '🧾',
  title: 'שברים עשרוניים — פעולות',
  subtitle: 'חיבור וחיסור, עיגול, ומעבר לשבר פשוט',
  sections: [
    {
      id: 'add',
      emoji: '➕',
      title: 'חיבור וחיסור: מיישרים נקודות',
      blocks: [
        {
          type: 'text',
          md: m`הכלל היחיד: **נקודה מתחת לנקודה**. כך עשיריות נפגשות עם עשיריות, ומאיות עם מאיות.

${COLUMN}`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'חסרה ספרה?',
          md: m`משלימים באפס: $3.4=3.40$. אפס בסוף לא משנה את המספר.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $2.5+1.35$?`,
        answer: 3.85,
        tolerance: 0.001,
        hint: m`כתבו $2.50+1.35$ — נקודה מתחת לנקודה.`,
        explain: m`$2.50+1.35=3.85$`,
      },
    },
    {
      id: 'round',
      emoji: '🎯',
      title: 'עיגול',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מסתכלים על הספרה הבאה',
          md: m`**5 ומעלה** — מעגלים למעלה. **4 ומטה** — משאירים.

$3.46\approx3.5$ (כי 6 ≥ 5) · $3.42\approx3.4$ (כי 2 < 5)`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`עגלו את $7.84$ לעשיריות.`,
        answer: 7.8,
        tolerance: 0.001,
        hint: 'הספרה שאחרי העשיריות היא 4.',
        explain: m`4 < 5, ולכן $7.84\approx7.8$.`,
      },
    },
    {
      id: 'to-fraction',
      emoji: '🔄',
      title: 'שלב הבוס: לשבר פשוט',
      blocks: [
        {
          type: 'text',
          md: m`קוראים את המספר בקול — והוא אומר לנו את השבר!

$0.35$ = "35 **מאיות**" = $\frac{35}{100}$, ואחרי צמצום ב-5: $\frac{7}{20}$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איזה שבר שווה ל-$0.25$?`,
        options: [m`$\frac{1}{4}$`, m`$\frac{2}{5}$`, m`$\frac{25}{10}$`, m`$\frac{1}{25}$`],
        answer: 0,
        hint: m`$0.25=\frac{25}{100}$. צמצמו ב-25.`,
        explain: m`$\frac{25}{100}=\frac14$`,
      },
    },
  ],
};
