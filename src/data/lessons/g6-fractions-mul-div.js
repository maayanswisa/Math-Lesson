import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g6-fractions-mul-div',
  topicId: 'g6-fractions-mul-div',
  grade: 6,
  emoji: '✖️',
  title: 'כפל וחילוק שברים',
  subtitle: 'מונה כפול מונה, והפיכת השבר בחילוק',
  sections: [
    {
      id: 'mul',
      emoji: '✖️',
      title: 'שבר כפול שבר',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מונה במונה, מכנה במכנה',
          md: m`$$\frac{a}{b}\times\frac{c}{d}=\frac{a\times c}{b\times d}$$

$\frac12\times\frac34=\frac38$ — חצי מתוך שלושה רבעים.`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'כפל שמקטין!',
          md: m`כפל בשבר **קטן מ-1** נותן תוצאה **קטנה** יותר: $10\times\frac12=5$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $\frac{2}{3}\times\frac{3}{5}$?`,
        options: [m`$\frac{6}{15}$`, m`$\frac{5}{8}$`, m`$\frac{6}{8}$`, m`$\frac{10}{9}$`],
        answer: 0,
        hint: 'מונה במונה, מכנה במכנה.',
        explain: m`$\frac{6}{15}=\frac25$`,
      },
    },
    {
      id: 'mixed',
      emoji: '🧁',
      title: 'מספרים מעורבים',
      blocks: [
        {
          type: 'steps',
          title: m`$2\frac12\times\frac23$`,
          steps: [
            { math: m`2\frac12=${c(VIOLET, '\\frac52')}`, note: 'קודם הופכים לשבר מדומה.' },
            { math: m`\frac52\times\frac23=\frac{10}{6}`, note: 'כופלים.' },
            { math: m`=${c(GREEN, '1\\frac23')}`, note: 'מצמצמים ומחזירים למעורב.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $1\frac12\times4$?`,
        options: [m`$6$`, m`$4\frac12$`, m`$5$`, m`$\frac{3}{8}$`],
        answer: 0,
        hint: m`$\frac32\times4$`,
        explain: m`$\frac{12}{2}=6$`,
      },
    },
    {
      id: 'div',
      emoji: '🏆',
      title: 'שלב הבוס: חילוק',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'כופלים בהופכי',
          md: m`$$\frac{a}{b}:\frac{c}{d}=\frac{a}{b}\times\frac{d}{c}$$

$3:\frac12=3\times2=6$ — כמה חצאים נכנסים ב-3? שישה! חילוק בשבר קטן מ-1 **מגדיל**.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $\frac34:\frac38$?`,
        options: [m`$2$`, m`$\frac{9}{32}$`, m`$\frac12$`, m`$\frac{3}{8}$`],
        answer: 0,
        hint: m`$\frac34\times\frac83$`,
        explain: m`$\frac{24}{12}=2$ — שתי שמיניות-שלוש נכנסות ב-שלושה-רבעים.`,
      },
    },
  ],
};
