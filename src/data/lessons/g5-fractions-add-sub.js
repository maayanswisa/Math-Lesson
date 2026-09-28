import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g5-fractions-add-sub',
  topicId: 'g5-fractions-add-sub',
  grade: 5,
  emoji: '➕',
  title: 'חיבור וחיסור שברים',
  subtitle: 'אותו מכנה, מכנים שונים, ומספרים מעורבים',
  sections: [
    {
      id: 'same',
      emoji: '🟰',
      title: 'אותו מכנה — קל!',
      blocks: [
        {
          type: 'text',
          md: m`כשהמכנים **שווים**, החלקים באותו גודל — פשוט סופרים אותם:

$\frac38+\frac28=\frac58$ (3 שמיניות ועוד 2 שמיניות = 5 שמיניות)`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'מלכודת',
          md: m`**לא** מחברים את המכנים! $\frac38+\frac28\neq\frac5{16}$. המכנה רק אומר מה **גודל** החלק.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $\frac{2}{7}+\frac{4}{7}$?`,
        options: [m`$\frac{6}{14}$`, m`$\frac{6}{7}$`, m`$\frac{8}{7}$`, m`$\frac{2}{7}$`],
        answer: 1,
        hint: 'אותו מכנה — מחברים רק מונים.',
        explain: m`$\frac{2+4}{7}=\frac67$`,
      },
    },
    {
      id: 'different',
      emoji: '🔀',
      title: 'מכנים שונים',
      blocks: [
        {
          type: 'text',
          md: 'קודם **מכנה משותף**, ואז מחברים. שלושה מקרים:',
        },
        {
          type: 'steps',
          title: 'שלושה מקרים',
          steps: [
            { math: m`\frac12+\frac14=${c(VIOLET, '\\frac24')}+\frac14=\frac34`, note: '1. 4 הוא כפולה של 2 — מרחיבים רק את החצי.' },
            { math: m`\frac14+\frac16=\frac3{12}+\frac2{12}=\frac5{12}`, note: '2. יש גורם משותף — 12 מספיק (לא צריך 24).' },
            { math: m`\frac13+\frac15=\frac5{15}+\frac3{15}=${c(GREEN, '\\frac8{15}')}`, note: '3. אין גורם משותף — כופלים מכנים: $3\\times5=15$.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $\frac{1}{2}+\frac{1}{3}$?`,
        options: [m`$\frac{2}{5}$`, m`$\frac{5}{6}$`, m`$\frac{2}{6}$`, m`$\frac{1}{5}$`],
        answer: 1,
        hint: m`מכנה משותף 6: $\frac12=\frac36$, $\frac13=\frac26$.`,
        explain: m`$\frac36+\frac26=\frac56$`,
      },
    },
    {
      id: 'mixed',
      emoji: '🏆',
      title: 'שלב הבוס: מספרים מעורבים',
      blocks: [
        {
          type: 'text',
          md: m`מחברים **שלמים עם שלמים**, ו**שברים עם שברים**:

$2\frac14+1\frac24=3\frac34$`,
        },
        {
          type: 'steps',
          title: m`מחסרים: $3\frac14-1\frac34$`,
          steps: [
            { math: m`\frac14-\frac34\ ?`, note: 'אי אפשר — רבע קטן משלושה רבעים!' },
            { math: m`3\frac14=2+\frac44+\frac14=2\frac54`, note: '"שואלים" שלם אחד והופכים אותו לרבעים.' },
            { math: m`2\frac54-1\frac34=${c(GREEN, '1\\frac24')}`, note: m`$2-1=1$, ו-$\frac54-\frac34=\frac24$ (שזה חצי).` },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $4\frac{1}{5}+2\frac{3}{5}$?`,
        options: [m`$6\frac{4}{5}$`, m`$6\frac{4}{10}$`, m`$2\frac{2}{5}$`, m`$7\frac{4}{5}$`],
        answer: 0,
        hint: 'שלמים עם שלמים, חמישיות עם חמישיות.',
        explain: m`$4+2=6$, ו-$\frac15+\frac35=\frac45$: $6\frac45$.`,
      },
    },
  ],
};
