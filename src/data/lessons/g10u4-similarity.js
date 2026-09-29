import { m } from './tex.js';

export default {
  id: 'g10u4-similarity',
  topicId: 'g10-u4-similarity',
  grade: 10,
  units: 4,
  emoji: '🔍',
  title: 'דמיון משולשים',
  subtitle: 'אותה צורה, גודל אחר — ויחס דמיון',
  sections: [
    {
      id: 'theorems',
      emoji: '📜',
      title: 'משפטי הדמיון',
      blocks: [
        {
          type: 'similar',
          caption: 'הגדילו את המשולש: הזוויות לא משתנות, הצלעות גדלות באותו יחס:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שלושה משפטים',
          md: m`**ז.ז** — שתי זוויות שוות.

**צ.ז.צ** — שתי צלעות באותו יחס והזווית שביניהן שווה.

**צ.צ.צ** — שלוש צלעות באותו יחס.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`במשולש אחד זוויות $50°$ ו-$70°$, ובשני $60°$ ו-$70°$. האם הם דומים?`,
        options: ['כן — ז.ז', 'לא', 'רק אם הצלעות שוות', 'אי אפשר לדעת'],
        answer: 0,
        hint: m`מה הזווית השלישית בכל משולש?`,
        explain: m`בשניהם $50°, 60°, 70°$ ← דומים לפי ז.ז.`,
      },
    },
    {
      id: 'ratio',
      emoji: '📏',
      title: 'יחס דמיון',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'k',
          md: m`יחס דמיון $k$ ← יחס היקפים $k$, יחס גבהים/תיכונים/חוצי זוויות $k$.

אבל יחס שטחים: $k^2$!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`יחס הדמיון בין שני משולשים הוא $3$. שטח הקטן $5$. מה שטח הגדול?`,
        answer: 45,
        hint: m`$5\cdot3^2$`,
        explain: m`$45$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: קטע מקביל',
      blocks: [
        {
          type: 'thales',
          caption: m`$DE\parallel BC$ — משולש $ADE$ דומה ל-$ABC$ (ז.ז):`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'שימו לב',
          md: m`היחס הוא $\frac{AD}{AB}=\frac{DE}{BC}$ — **כל** הצלע, לא רק $DB$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$DE\parallel BC$, $AD=4$, $DB=6$, $BC=15$. מה אורך $DE$?`,
        answer: 6,
        hint: m`$\frac{DE}{15}=\frac{4}{10}$`,
        explain: m`$DE=6$`,
      },
    },
  ],
};
