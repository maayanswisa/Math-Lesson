import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g11u5-probability-tree',
  topicId: 'g11-u5-probability-tree',
  grade: 11,
  units: 5,
  emoji: '🌳',
  title: 'עצי הסתברות ונוסחת הבינום',
  subtitle: 'ניסוי רב-שלבי, ספירת מסלולים, ובדיוק k הצלחות',
  sections: [
    {
      id: 'tree',
      emoji: '🌳',
      title: 'עץ הסתברויות',
      blocks: [
        {
          type: 'tree',
          red: 3,
          blue: 2,
          replace: false,
          caption: 'שתי הוצאות משקית עם 3 אדומים ו-2 כחולים. על כל ענף — הסתברות מותנית:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'חוק המכפלה',
          md: m`הסתברות של **מסלול** = מכפלת ההסתברויות לאורכו. מאורע שמורכב מכמה מסלולים — **מחברים** את המסלולים.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'בשקית 3 אדומים ו-2 כחולים. מוציאים שניים בלי החזרה. מה הסיכוי ששניהם באותו צבע?',
        answer: 0.4,
        tolerance: 0.001,
        hint: m`$\frac35\cdot\frac24+\frac25\cdot\frac14$`,
        explain: m`$\frac{6}{20}+\frac{2}{20}=\frac{8}{20}=0.4$`,
      },
    },
    {
      id: 'choose',
      emoji: '🔢',
      title: 'כמה מסלולים?',
      blocks: [
        {
          type: 'text',
          md: m`מטילים מטבע 3 פעמים. בכמה מסלולים יש **בדיוק 2** עץ? עעפ, עפע, פעע — **3** מסלולים.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'מקדם הבינום',
          md: m`$$\binom{n}{k}=\frac{n!}{k!\,(n-k)!}$$

מספר הדרכים לבחור **איפה** יהיו $k$ ההצלחות מתוך $n$ ניסויים. $\binom32=\frac{6}{2\cdot1}=3$ ✓`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $\binom{5}{2}$?`,
        answer: 10,
        hint: m`$\frac{5!}{2!\cdot3!}=\frac{120}{2\cdot6}$`,
        explain: m`$\frac{120}{12}=10$`,
      },
    },
    {
      id: 'binomial',
      emoji: '📊',
      title: 'נוסחת הבינום',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'בדיוק k הצלחות מתוך n',
          md: m`$$P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$$

יש $\binom nk$ מסלולים כאלה, ולכל אחד אותה הסתברות $p^k(1-p)^{n-k}$.`,
        },
        {
          type: 'binomial',
          n: 5,
          p: 0.5,
          k: 2,
          caption: 'שנו את n ואת p. לחצו על עמודה כדי לראות את החישוב שלה:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`שחקן קולע ב-$80\%$ מהזריקות. מה הסיכוי שיקלע בדיוק 3 מתוך 4?`,
        answer: 0.4096,
        tolerance: 0.001,
        hint: m`$\binom43\cdot0.8^3\cdot0.2$`,
        explain: m`$4\cdot0.512\cdot0.2=0.4096$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: לפחות אחד',
      blocks: [
        {
          type: 'steps',
          title: 'מטילים קובייה 4 פעמים. מה הסיכוי לקבל לפחות 6 אחד?',
          steps: [
            { math: m`P(X=0)=\left(\frac56\right)^4`, note: 'המשלים: אף שש.' },
            { math: m`\left(\frac56\right)^4\approx${c(VIOLET, '0.482')}`, note: 'חישוב.' },
            { math: m`1-0.482=${c(GREEN, '0.518')}`, note: '"לפחות אחד" — תמיד דרך המשלים!' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`הסיכוי שמנורה תקולה הוא $0.1$. בודקים 3 מנורות. מה הסיכוי שלפחות אחת תקולה?`,
        answer: 0.271,
        tolerance: 0.001,
        hint: m`$1-0.9^3$`,
        explain: m`$1-0.729=0.271$`,
      },
    },
  ],
};
