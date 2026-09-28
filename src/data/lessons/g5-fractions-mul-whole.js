import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g5-fractions-mul-whole',
  topicId: 'g5-fractions-mul-whole',
  grade: 5,
  emoji: '✖️',
  title: 'כפל שלם בשבר',
  subtitle: 'כפל כחיבור חוזר, קיצור הדרך, ומספרים מעורבים',
  sections: [
    {
      id: 'repeat',
      emoji: '🔁',
      title: 'כפל = חיבור חוזר',
      blocks: [
        {
          type: 'text',
          md: m`$3\times4$ זה $4+4+4$. בדיוק כך גם עם שברים:

$4\times\frac25=\frac25+\frac25+\frac25+\frac25=\frac85$`,
        },
        {
          type: 'fraction',
          caption: m`4 פעמים $\frac25$ — 8 חמישיות, כלומר יותר משלם:`,
          bars: [{ n: 8, d: 5 }],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה שווה $\frac{1}{4}+\frac{1}{4}+\frac{1}{4}$?`,
        options: [m`$3\times\frac14=\frac34$`, m`$\frac{3}{12}$`, m`$\frac{1}{12}$`, m`$3\times4$`],
        answer: 0,
        hint: 'שלוש פעמים רבע.',
        explain: m`$3\times\frac14=\frac34$`,
      },
    },
    {
      id: 'shortcut',
      emoji: '⚡',
      title: 'קיצור הדרך',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'כופלים רק את המונה',
          md: m`$${c(VIOLET, '4')}\times\frac25=\frac{${c(VIOLET, '4')}\times2}{5}=\frac85$

המכנה (גודל החלק) לא משתנה — רק **כמות** החלקים.`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'יותר או פחות?',
          md: m`כפל בשבר **קטן מ-1** נותן פחות מהשלם: $6\times\frac12=3$. כפל בשבר **גדול מ-1** נותן יותר.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $5\times\frac{3}{8}$?`,
        options: [m`$\frac{15}{40}$`, m`$\frac{15}{8}$`, m`$\frac{8}{15}$`, m`$\frac{3}{40}$`],
        answer: 1,
        hint: 'כופלים רק את המונה.',
        explain: m`$\frac{5\times3}{8}=\frac{15}8=1\frac78$`,
      },
    },
    {
      id: 'mixed',
      emoji: '🏆',
      title: 'שלב הבוס: כפל במספר מעורב',
      blocks: [
        {
          type: 'steps',
          title: m`$3\times2\frac14$`,
          steps: [
            { math: m`2\frac14=\frac{9}{4}`, note: m`קודם הופכים לשבר מדומה: $2\times4+1=9$.` },
            { math: m`3\times\frac94=\frac{27}{4}`, note: 'כופלים את המונה.' },
            { math: m`\frac{27}4=${c(GREEN, '6\\frac34')}`, note: m`$27\div4=6$ שארית 3.` },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $2\times1\frac{1}{3}$?`,
        options: [m`$2\frac13$`, m`$2\frac23$`, m`$2\frac26$`, m`$3\frac13$`],
        answer: 1,
        hint: m`$1\frac13=\frac43$`,
        explain: m`$2\times\frac43=\frac83=2\frac23$`,
      },
    },
  ],
};
