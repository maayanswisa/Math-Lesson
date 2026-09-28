import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g5-fractions-reduce-expand',
  topicId: 'g5-fractions-reduce-expand',
  grade: 5,
  emoji: '🔍',
  title: 'צמצום והרחבה של שברים',
  subtitle: 'שברים שנראים שונים אבל שווים — ומכנה משותף',
  sections: [
    {
      id: 'expand',
      emoji: '🔎',
      title: 'הרחבה',
      blocks: [
        {
          type: 'fraction',
          mode: 'expand',
          caption: m`$\frac{1}{3}$ של רצועה. חתכו כל חלק לחלקים קטנים יותר:`,
          bars: [{ n: 1, d: 3 }],
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הרחבה',
          md: m`כופלים **מונה ומכנה באותו מספר** — והשבר לא משתנה: $\frac13=\frac{1\times2}{3\times2}=\frac26$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$\frac{3}{4}=\frac{?}{12}$. מה חסר במונה?`,
        answer: 9,
        hint: m`מה עשו למכנה? $4\times3=12$. עשו אותו דבר למונה.`,
        explain: m`$\frac{3\times3}{4\times3}=\frac9{12}$`,
      },
    },
    {
      id: 'reduce',
      emoji: '✂️',
      title: 'צמצום',
      blocks: [
        {
          type: 'text',
          md: m`**צמצום** = הפעולה ההפוכה: מחלקים מונה ומכנה **באותו מספר**, ומקבלים שבר "פשוט" יותר.`,
        },
        {
          type: 'steps',
          title: m`מצמצמים את $\frac{6}{8}$`,
          steps: [
            { math: m`6=${c(VIOLET, '2')}\times3\qquad 8=${c(VIOLET, '2')}\times4`, note: 'איזה מספר נכנס גם ב-6 וגם ב-8? 2.' },
            { math: m`\frac{6\div${c(VIOLET, '2')}}{8\div${c(VIOLET, '2')}}=${c(GREEN, '\\frac34')}`, note: 'מחלקים את שניהם ב-2.' },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'צמצמו עד הסוף',
          md: m`$\frac{12}{18}=\frac{6}{9}=\frac23$. ממשיכים עד שאין מספר שנכנס גם במונה וגם במכנה.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו $\frac{10}{15}$ מצומצם עד הסוף?`,
        options: [m`$\frac{5}{10}$`, m`$\frac{2}{3}$`, m`$\frac{1}{5}$`, m`$\frac{10}{3}$`],
        answer: 1,
        hint: '5 נכנס גם ב-10 וגם ב-15.',
        explain: m`$\frac{10\div5}{15\div5}=\frac23$`,
      },
    },
    {
      id: 'common',
      emoji: '🏆',
      title: 'שלב הבוס: מכנה משותף',
      blocks: [
        {
          type: 'text',
          md: m`כדי לחבר או להשוות $\frac13$ ו-$\frac14$, צריך **אותו מכנה**. מחפשים מספר ששני המכנים נכנסים בו:`,
        },
        {
          type: 'steps',
          title: m`מכנה משותף ל-$\frac13$ ול-$\frac14$`,
          steps: [
            { math: m`3,6,9,${c(GREEN, '12')}\quad 4,8,${c(GREEN, '12')}`, note: 'כפולות של 3 וכפולות של 4 — הראשונה המשותפת: 12.' },
            { math: m`\frac13=\frac4{12}\qquad\frac14=\frac3{12}`, note: 'מרחיבים כל שבר ל-12.' },
          ],
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שבר מדומה',
          md: m`מונה גדול מהמכנה (כמו $\frac74$) — **שבר מדומה**, גדול מ-1. אפשר לכתוב אותו גם $1\frac34$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מהו המכנה המשותף **הקטן ביותר** של $\frac12$ ו-$\frac13$?`,
        answer: 6,
        hint: 'איזה המספר הקטן ביותר שגם 2 וגם 3 נכנסים בו?',
        explain: m`6 — כי $6=2\times3$. $\frac12=\frac36$ ו-$\frac13=\frac26$.`,
      },
    },
  ],
};
