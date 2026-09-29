import { m } from './tex.js';

export default {
  id: 'g4-fractions-compare-numberline',
  topicId: 'g4-fractions-compare-numberline',
  grade: 4,
  emoji: '⚖️',
  title: 'משווים שברים',
  subtitle: 'על ישר המספרים, לעומת חצי, ומה חסר לשלם',
  sections: [
    {
      id: 'unit',
      emoji: '🍕',
      title: 'שברי יחידה',
      blocks: [
        {
          type: 'fraction',
          bars: [
            { n: 1, d: 3, label: 'שליש' },
            { n: 1, d: 5, label: 'חמישית' },
            { n: 1, d: 8, label: 'שמינית' },
          ],
          caption: 'ככל שמחלקים ליותר חלקים — כל חלק קטן יותר:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה גדול יותר?',
        options: [m`$\frac{1}{6}$`, m`$\frac{1}{9}$`, 'הם שווים', 'אי אפשר לדעת'],
        answer: 0,
        hint: 'מכנה קטן — חלק גדול.',
        explain: m`$\frac16>\frac19$: שישית גדולה מתשיעית.`,
      },
    },
    {
      id: 'half',
      emoji: '½',
      title: 'לעומת חצי',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'בודקים מול חצי',
          md: m`$\frac38$ — פחות מחצי (חצי זה $\frac48$). $\frac35$ — יותר מחצי (חצי זה $2.5$ חמישיות). לכן $\frac35>\frac38$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה שבר גדול מחצי?',
        options: [m`$\frac{2}{6}$`, m`$\frac{4}{10}$`, m`$\frac{5}{8}$`, m`$\frac{1}{3}$`],
        answer: 2,
        hint: 'חצי מ-8 הוא 4.',
        explain: m`$\frac58>\frac48=\frac12$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מה חסר לשלם?',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'השלמה לשלם',
          md: m`$\frac78$ או $\frac34$? ל-$\frac78$ חסרה $\frac18$, ל-$\frac34$ חסר $\frac14$. חסר **פחות** ל-$\frac78$ — לכן הוא **גדול** יותר.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה גדול יותר?',
        options: [m`$\frac{9}{10}$`, m`$\frac{4}{5}$`, 'שווים', 'אי אפשר לדעת'],
        answer: 0,
        hint: m`ל-$\frac{9}{10}$ חסרה עשירית, ל-$\frac45$ חמישית.`,
        explain: m`עשירית קטנה מחמישית — לכן $\frac{9}{10}>\frac45$.`,
      },
    },
  ],
};
