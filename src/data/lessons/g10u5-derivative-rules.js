import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g10u5-derivative-rules',
  topicId: 'g10-u5-derivative-rules',
  grade: 10,
  units: 5,
  emoji: '📜',
  title: 'כללי גזירה והוכחתם',
  subtitle: 'סכום, מכפלה, פונקציה מורכבת וגרף הנגזרת',
  sections: [
    {
      id: 'product',
      emoji: '✖️',
      title: 'כלל המכפלה',
      blocks: [
        {
          type: 'card',
          tone: 'why',
          title: 'למה לא פשוט מכפלת הנגזרות?',
          md: m`מלבן עם צלעות $f$ ו-$g$. כשהצלעות גדלות מעט, השטח גדל ב**שתי רצועות**: $f'\cdot g$ ו-$f\cdot g'$. לכן:

$$(fg)'=f'g+fg'$$
`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה הנגזרת של $x^2(x+1)$?`,
        options: [m`$3x^2+2x$`, m`$2x$`, m`$x^2+2x$`, m`$2x(x+1)$`],
        answer: 0,
        hint: m`$2x(x+1)+x^2$`,
        explain: m`$2x^2+2x+x^2=3x^2+2x$`,
      },
    },
    {
      id: 'chain',
      emoji: '⛓️',
      title: 'פונקציה מורכבת',
      blocks: [
        {
          type: 'steps',
          title: m`$f(x)=(x^2+1)^5$`,
          steps: [
            { math: m`5(x^2+1)^4`, note: 'גוזרים את החיצונית.' },
            { math: m`\cdot${c(VIOLET, '2x')}`, note: 'כפול נגזרת הפנימית.' },
            { math: c(GREEN, "f'(x)=10x(x^2+1)^4"), note: 'כלל השרשרת.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$f(x)=(3x-2)^4$. כמה זה $f'(1)$?`,
        answer: 12,
        hint: m`$4(3x-2)^3\cdot3$`,
        explain: m`$4\cdot1\cdot3=12$`,
      },
    },
    {
      id: 'graph',
      emoji: '🏆',
      title: 'שלב הבוס: הגרף וגרף הנגזרת',
      blocks: [
        {
          type: 'tangent',
          fn: 'cubic',
          showDeriv: true,
          caption: m`הגרף של $f$ והגרף של $f'$ יחד: איפה $f'$ חיובית — $f$ עולה.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'לקרוא נכון',
          md: m`אפס של $f'$ ← קיצון חשוד של $f$. $f'>0$ ← $f$ עולה. **גובה** $f'$ = **שיפוע** $f$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`הגרף של $f'$ חוצה את ציר $x$ מלמטה למעלה ב-$x=2$. מה יש ל-$f$ ב-$x=2$?`,
        options: ['מינימום', 'מקסימום', 'אפס', 'אסימפטוטה'],
        answer: 0,
        hint: m`$f'$ עובר מ-$-$ ל-$+$.`,
        explain: 'יורדת ואז עולה — מינימום.',
      },
    },
  ],
};
