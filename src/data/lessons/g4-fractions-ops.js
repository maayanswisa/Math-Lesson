import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g4-fractions-ops',
  topicId: 'g4-fractions-ops',
  grade: 4,
  emoji: '➕',
  title: 'פעולות בשברים',
  subtitle: 'חיבור וחיסור, מספרים מעורבים, ושלם כפול שבר',
  sections: [
    {
      id: 'same',
      emoji: '🍕',
      title: 'אותו מכנה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מחברים רק את המונים',
          md: m`$\frac25+\frac15=\frac35$ — שתי חמישיות ועוד חמישית = שלוש חמישיות. **המכנה לא משתנה!**`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $\frac{5}{8}-\frac{2}{8}$?`,
        options: [m`$\frac{3}{8}$`, m`$\frac{3}{0}$`, m`$\frac{7}{8}$`, m`$\frac{3}{16}$`],
        answer: 0,
        hint: 'מחסרים רק מונים.',
        explain: m`$\frac{5-2}{8}=\frac38$`,
      },
    },
    {
      id: 'multiple',
      emoji: '🔁',
      title: 'מכנה אחד כפולה של השני',
      blocks: [
        {
          type: 'steps',
          title: m`$\frac12+\frac14$`,
          steps: [
            { math: m`\frac12=${c(VIOLET, '\\frac24')}`, note: 'משנים את החצי לרבעים.' },
            { math: m`\frac24+\frac14=${c(GREEN, '\\frac34')}`, note: 'עכשיו אותו מכנה.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $\frac13+\frac16$?`,
        options: [m`$\frac{2}{9}$`, m`$\frac{3}{6}$`, m`$\frac{2}{6}$`, m`$\frac{1}{9}$`],
        answer: 1,
        hint: m`$\frac13=\frac26$`,
        explain: m`$\frac26+\frac16=\frac36$ (וזה גם $\frac12$).`,
      },
    },
    {
      id: 'mixed',
      emoji: '🧁',
      title: 'מספר מעורב',
      blocks: [
        {
          type: 'text',
          md: m`$2\frac13$ = שתי עוגות שלמות ועוד שליש: $2+\frac13$. ואפשר גם לכתוב $\frac73$ — שבעה שלישים.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איך כותבים את $\frac{9}{4}$ כמספר מעורב?`,
        options: [m`$2\frac14$`, m`$1\frac54$`, m`$9\frac14$`, m`$2\frac34$`],
        answer: 0,
        hint: 'כמה רבעים יש בשלם אחד?',
        explain: m`$\frac84=2$, ועוד $\frac14$: $2\frac14$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שלם כפול שבר',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'חיבור חוזר',
          md: m`$3\times\frac25=\frac25+\frac25+\frac25=\frac65$ — כופלים רק את המונה.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $4\times\frac{2}{3}$?`,
        options: [m`$\frac{8}{3}$`, m`$\frac{8}{12}$`, m`$\frac{6}{3}$`, m`$\frac{2}{12}$`],
        answer: 0,
        hint: m`$\frac{4\times2}{3}$`,
        explain: m`$\frac83$, כלומר $2\frac23$.`,
      },
    },
  ],
};
