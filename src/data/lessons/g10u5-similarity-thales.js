import { m } from './tex.js';

export default {
  id: 'g10u5-similarity-thales',
  topicId: 'g10-u5-similarity-thales',
  grade: 10,
  units: 5,
  emoji: '📏',
  title: 'תאלס, פרופורציה ודמיון במעגל',
  subtitle: 'קטעים מקבילים, יחסי דמיון ומיתרים נחתכים',
  sections: [
    {
      id: 'thales',
      emoji: '📐',
      title: 'משפט תאלס',
      blocks: [
        {
          type: 'thales',
          caption: 'הזיזו את הישר המקביל — היחסים נשארים שווים:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'והמשפט ההפוך',
          md: m`$DE\parallel BC\Rightarrow\frac{AD}{DB}=\frac{AE}{EC}$. וגם להפך: אם היחסים שווים — הישרים מקבילים.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$DE\parallel BC$, $AD=6$, $DB=4$, $AE=9$. מה $EC$?`,
        answer: 6,
        hint: m`$\frac64=\frac9{EC}$`,
        explain: m`$EC=6$`,
      },
    },
    {
      id: 'ratios',
      emoji: '🔍',
      title: 'יחסי דמיון',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`$k$ ו-$k^2$`,
          md: m`היקפים, גבהים, תיכונים — ביחס $k$. שטחים — ביחס $k^2$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`שני משולשים דומים, שטחים $12$ ו-$75$. גובה הקטן $4$. מה גובה הגדול?`,
        answer: 10,
        hint: m`$k^2=\frac{75}{12}=6.25$`,
        explain: m`$k=2.5$ ← $10$`,
      },
    },
    {
      id: 'chords',
      emoji: '🏆',
      title: 'שלב הבוס: מיתרים ומשיקים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני משפטים',
          md: m`**מיתרים נחתכים:** $AP\cdot PB=CP\cdot PD$

**משיק וחותך:** המשיק בריבוע = החותך השלם כפול החלק החיצוני`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`שני מיתרים נחתכים ב-$P$: $AP=3$, $PB=8$, $CP=4$. מה $PD$?`,
        answer: 6,
        hint: m`$3\cdot8=4\cdot PD$`,
        explain: m`$PD=6$`,
      },
    },
  ],
};
