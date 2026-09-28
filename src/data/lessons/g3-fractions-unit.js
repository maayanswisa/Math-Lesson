import { m } from './tex.js';

export default {
  id: 'g3-fractions-unit',
  topicId: 'g3-fractions-unit',
  grade: 3,
  emoji: '🍕',
  title: 'שברי יחידה',
  subtitle: 'חצי, שליש, רבע… ולמה שמינית קטנה מרבע',
  sections: [
    {
      id: 'what',
      emoji: '🍕',
      title: 'חלק אחד מתוך…',
      blocks: [
        {
          type: 'text',
          md: m`מחלקים פיצה ל-**4 חלקים שווים**. חלק אחד = **רבע** = $\frac{1}{4}$.

המספר **למטה** אומר לכמה חלקים חילקנו. המספר **למעלה** (1) — שלקחנו חלק אחד.`,
        },
        {
          type: 'fraction',
          caption: 'שנו את המכנה (המספר למטה) — לכמה חלקים מחלקים:',
          bars: [{ n: 1, d: 4 }],
          editable: true,
          maxD: 10,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מחלקים עוגה ל-3 חלקים שווים. איך קוראים לחלק אחד?',
        options: ['חצי', 'שליש', 'רבע', 'שלושה'],
        answer: 1,
        hint: '3 חלקים — "של-ישׁ".',
        explain: m`חלק אחד מתוך 3 = שליש = $\frac13$.`,
      },
    },
    {
      id: 'names',
      emoji: '🏷️',
      title: 'השמות',
      blocks: [
        {
          type: 'text',
          md: m`$\frac12$ חצי · $\frac13$ שליש · $\frac14$ רבע · $\frac15$ חמישית · $\frac16$ שישית · $\frac18$ שמינית · $\frac1{10}$ עשירית`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'חלקים שווים!',
          md: 'שבר יחידה הוא רק כשכל החלקים **שווים** בגודלם. פיצה שנחתכה לחתיכות עקומות — זה לא רבעים.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איך קוראים ל-⅛?',
        options: ['שמינית', 'שישית', 'עשירית', 'שמונה'],
        answer: 0,
        hint: '8 חלקים.',
        explain: 'חלק אחד מתוך 8 — שמינית.',
      },
    },
    {
      id: 'compare',
      emoji: '🏆',
      title: 'שלב הבוס: מי גדול?',
      blocks: [
        {
          type: 'fraction',
          caption: 'השוו: חצי, רבע ושמינית של אותה רצועה:',
          bars: [
            { n: 1, d: 2, label: 'חצי' },
            { n: 1, d: 4, label: 'רבע' },
            { n: 1, d: 8, label: 'שמינית' },
          ],
        },
        {
          type: 'card',
          tone: 'key',
          title: 'המפתיע',
          md: m`**מספר גדול למטה = חתיכה קטנה!** כי מחלקים את אותה פיצה ליותר ילדים.

$\frac18<\frac14<\frac12$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה גדול יותר?',
        options: [m`$\frac{1}{3}$`, m`$\frac{1}{6}$`, 'הם שווים'],
        answer: 0,
        hint: 'לחלק ל-3 ילדים או ל-6 ילדים — מתי כל אחד מקבל יותר?',
        explain: m`$\frac13>\frac16$ — פחות חלקים, כל חלק גדול יותר.`,
      },
    },
  ],
};
