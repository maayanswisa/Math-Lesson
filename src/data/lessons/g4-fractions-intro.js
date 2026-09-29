import { m } from './tex.js';

export default {
  id: 'g4-fractions-intro',
  topicId: 'g4-fractions-intro',
  grade: 4,
  emoji: '🍰',
  title: 'הכרת השברים',
  subtitle: 'מונה ומכנה — ושברים קטנים, שווים וגדולים מ-1',
  sections: [
    {
      id: 'parts',
      emoji: '🍰',
      title: 'מונה ומכנה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`$\frac{3}{4}$`,
          md: '**המכנה** (למטה, 4) — לכמה חלקים **שווים** חילקנו. **המונה** (למעלה, 3) — כמה חלקים **לקחנו**.',
        },
        {
          type: 'fraction',
          bars: [{ n: 3, d: 4 }],
          editable: true,
          maxD: 10,
          caption: 'שנו את המונה ואת המכנה:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'עוגה חולקה ל-8 חלקים שווים, ואכלו 3. איזה שבר אכלו?',
        options: [m`$\frac{3}{8}$`, m`$\frac{8}{3}$`, m`$\frac{5}{8}$`, m`$\frac{3}{5}$`],
        answer: 0,
        hint: 'המכנה — כמה חלקים בסך הכול.',
        explain: m`3 מתוך 8: $\frac38$.`,
      },
    },
    {
      id: 'unit',
      emoji: '1️⃣',
      title: 'שבר יחידה',
      blocks: [
        {
          type: 'text',
          md: m`שבר שהמונה שלו $1$ נקרא **שבר יחידה**: $\frac12,\ \frac13,\ \frac14$... חלק **אחד** מתוך השלם.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה מהם שבר יחידה?',
        options: [m`$\frac{2}{5}$`, m`$\frac{1}{7}$`, m`$\frac{7}{1}$`, m`$\frac{3}{3}$`],
        answer: 1,
        hint: 'המונה הוא 1.',
        explain: m`$\frac17$ — מונה $1$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שווה, גדול או אפס',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שלושה מקרים',
          md: m`מונה = מכנה ← השבר שווה **1**: $\frac44=1$

מונה גדול מהמכנה ← **יותר** מ-1: $\frac54$

מונה $0$ ← השבר שווה **0**: $\frac06=0$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איזה שבר גדול מ-$1$?`,
        options: [m`$\frac{5}{5}$`, m`$\frac{7}{9}$`, m`$\frac{9}{7}$`, m`$\frac{0}{3}$`],
        answer: 2,
        hint: 'איפה המונה גדול מהמכנה?',
        explain: m`$\frac97$: יותר חלקים ממה שיש בשלם אחד.`,
      },
    },
  ],
};
