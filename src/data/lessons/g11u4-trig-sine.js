import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g11u4-trig-sine',
  topicId: 'g11-u4-trig-sine',
  grade: 11,
  units: 4,
  emoji: '📐',
  title: 'משפט הסינוסים ושטחי צורות',
  subtitle: 'טריגונומטריה בכל משולש — לא רק ישר-זווית',
  sections: [
    {
      id: 'law',
      emoji: '✨',
      title: 'משפט הסינוסים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'בכל משולש',
          md: m`$$\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}=2R$$

כל צלע חלקי הסינוס של **הזווית שמולה** — ויוצא תמיד אותו מספר: **קוטר** המעגל החוסם.`,
        },
        {
          type: 'sinelaw',
          caption: 'שנו את הזוויות ואת הרדיוס. שלושת היחסים תמיד שווים ל-2R:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`במשולש $a=10$ ו-$\angle A=30°$. מה רדיוס המעגל החוסם?`,
        answer: 10,
        hint: m`$\frac{a}{\sin A}=2R$, ו-$\sin30°=0.5$.`,
        explain: m`$\frac{10}{0.5}=20=2R$, ולכן $R=10$.`,
      },
    },
    {
      id: 'side',
      emoji: '🔎',
      title: 'מוצאים צלע',
      blocks: [
        {
          type: 'steps',
          title: m`$\angle A=45°$, $\angle B=60°$, $a=8$. מה $b$?`,
          steps: [
            { math: m`\frac{8}{\sin45°}=\frac{b}{\sin60°}`, note: 'לוקחים שני זוגות: צלע + הזווית שמולה.' },
            { math: m`b=\frac{8\cdot\sin60°}{\sin45°}`, note: 'מבודדים את b.' },
            { math: m`b=\frac{8\cdot0.866}{0.707}\approx${c(GREEN, '9.8')}`, note: 'מחשבון.' },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'מתי משתמשים?',
          md: 'כשיודעים **צלע והזווית שמולה**, ועוד נתון אחד (זווית או צלע).',
        },
      ],
      challenge: {
        type: 'number',
        label: 'b =',
        prompt: m`במשולש $\angle A=30°$, $\angle B=90°$, $a=5$. מה $b$?`,
        answer: 10,
        hint: m`$\frac{5}{\sin30°}=\frac{b}{\sin90°}$`,
        explain: m`$\frac{5}{0.5}=10=\frac{b}{1}$, ולכן $b=10$.`,
      },
    },
    {
      id: 'area',
      emoji: '🟩',
      title: 'שטח משולש ומקבילית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שתי נוסחאות',
          md: m`**משולש**: $S=\frac12ab\sin\gamma$ — שתי צלעות והזווית **שביניהן**.

**מקבילית**: $S=ab\sin\theta$ — שתי צלעות סמוכות והזווית שביניהן (בלי החצי — מקבילית היא שני משולשים חופפים).`,
        },
        {
          type: 'sinelaw',
          showArea: true,
          caption: m`אותו משולש — עכשיו גם עם השטח $\frac12ab\sin C$:`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`במשולש שתי צלעות $6$ ו-$10$, והזווית ביניהן $30°$. מה השטח?`,
        answer: 15,
        hint: m`$\frac12\cdot6\cdot10\cdot\sin30°$`,
        explain: m`$\frac12\cdot60\cdot0.5=15$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מקבילית',
      blocks: [
        {
          type: 'steps',
          title: m`מקבילית עם צלעות $8$ ו-$5$ וזווית חדה $${c(VIOLET, '60°')}$`,
          steps: [
            { math: m`S=8\cdot5\cdot\sin60°`, note: 'הנוסחה.' },
            { math: m`S=40\cdot0.866\approx${c(GREEN, '34.6')}`, note: 'והזווית הקהה (120°) נותנת אותו סינוס — אותה תשובה!' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מקבילית עם צלעות $12$ ו-$7$, והזווית ביניהן $150°$. מה השטח?`,
        answer: 42,
        hint: m`$\sin150°=\sin30°=0.5$`,
        explain: m`$12\cdot7\cdot0.5=42$`,
      },
    },
  ],
};
