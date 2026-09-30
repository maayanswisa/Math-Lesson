import { m } from './tex.js';

export default {
  id: 'g11u3-finance-stats',
  topicId: 'g11-u3-finance-stats',
  grade: 11,
  units: 3,
  emoji: '💼',
  title: 'סטיית תקן, רבעונים ועשירונים',
  subtitle: 'איפה אני ביחס לכולם?',
  sections: [
    {
      id: 'quartiles',
      emoji: '🧱',
      title: 'רבעונים',
      blocks: [
        {
          type: 'spread',
          mode: 'quartile',
          values: [6, 7, 7, 8, 9, 10, 12, 12, 14, 15, 18, 22],
          caption: m`משכורות של $12$ עובדים (באלפי ₪), ממוינות. בחרו רבעון:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'כלל המיקום',
          md: m`מיקום $Q_k$: $\frac{k\cdot n}{4}$.

מיקום **שלם** ← ממוצע האיבר במקום הזה והבא אחריו. מיקום **לא שלם** ← מעגלים למעלה.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`ב-$12$ המשכורות למעלה — מה $Q_3$?`,
        answer: 14.5,
        tolerance: 0.001,
        hint: m`מיקום $\frac{3\cdot12}{4}=9$ — שלם.`,
        explain: m`ממוצע האיבר ה-$9$ וה-$10$: $\frac{14+15}{2}=14.5$`,
      },
    },
    {
      id: 'deciles',
      emoji: '🔟',
      title: 'עשירונים',
      blocks: [
        {
          type: 'spread',
          mode: 'quartile',
          kind: 'decile',
          values: [3, 5, 6, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 20, 22, 25, 28, 35],
          caption: m`$20$ הכנסות משפחה. העשירון העליון מתחיל ב-$D_9$:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'עשר קבוצות',
          md: m`מיקום $D_k$: $\frac{k\cdot n}{10}$. "העשירון העליון" — $10\%$ המרוויחים הכי הרבה, מעל $D_9$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`ב-$20$ ההכנסות למעלה — מה $D_2$?`,
        answer: 6.5,
        tolerance: 0.001,
        hint: m`מיקום $\frac{2\cdot20}{10}=4$ — שלם.`,
        explain: m`ממוצע האיבר ה-$4$ וה-$5$: $\frac{6+7}{2}=6.5$`,
      },
    },
    {
      id: 'sd',
      emoji: '🏆',
      title: 'שלב הבוס: פיזור שכר',
      blocks: [
        {
          type: 'spread',
          mode: 'sigma',
          values: [8, 9, 10, 11, 12],
          caption: m`שכר בחברה (באלפי ₪). מתחו את הפיזור — מה קורה ל-$\sigma$?`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'תוספת מול העלאה באחוזים',
          md: m`תוספת של $1{,}000$ ₪ לכולם ← $\sigma$ **לא משתנה**. העלאה של $10\%$ לכולם ← $\sigma$ גדלה ב-$10\%$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`סטיית התקן של השכר $2{,}000$ ₪. כל העובדים קיבלו תוספת קבועה של $500$ ₪. מה סטיית התקן עכשיו?`,
        options: [m`$2{,}000$`, m`$2{,}500$`, m`$1{,}500$`, m`$2{,}200$`],
        answer: 0,
        hint: 'כולם זזו באותה כמות.',
        explain: 'המרחקים מהממוצע לא השתנו.',
      },
    },
  ],
};
