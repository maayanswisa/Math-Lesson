import { m } from './tex.js';

export default {
  id: 'g4-div-remainder',
  topicId: 'g4-div-remainder',
  grade: 4,
  emoji: '🍪',
  title: 'חילוק עם שארית',
  subtitle: 'מה עושים עם מה שנשאר?',
  sections: [
    {
      id: 'groups',
      emoji: '🍪',
      title: 'מה שלא נכנס',
      blocks: [
        {
          type: 'divgroups',
          n: 23,
          k: 5,
          caption: 'מסדרים עוגיות בשקיות. מה שנשאר בחוץ — השארית:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'בדיקה',
          md: m`מנה × מחלק + שארית = המחולק. $23:5=4$ (שארית $3$), כי $4\times5+3=23$.

השארית תמיד **קטנה מהמחלק**.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$38:6$ — מה השארית?`,
        answer: 2,
        hint: m`$6\times6=36$`,
        explain: m`$38=6\times6+2$ — שארית $2$.`,
      },
    },
    {
      id: 'up',
      emoji: '🚌',
      title: 'לפעמים מעגלים למעלה',
      blocks: [
        {
          type: 'text',
          md: m`130 ילדים, ובכל אוטובוס 40 מקומות. $130:40=3$ (שארית $10$). אבל 10 ילדים לא יישארו בבית! צריך **4** אוטובוסים.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'בכל סירה 4 אנשים. כמה סירות צריך ל-26 אנשים?',
        answer: 7,
        hint: m`$26:4=6$ (שארית $2$) — ומה עם השניים?`,
        explain: m`6 סירות מלאות ועוד אחת לשניים: $7$.`,
      },
    },
    {
      id: 'down',
      emoji: '🏆',
      title: 'שלב הבוס: לפעמים מתעלמים',
      blocks: [
        {
          type: 'text',
          md: m`יש 50 ש"ח, וכל מחברת עולה 8 ש"ח. $50:8=6$ (שארית $2$). אפשר לקנות **6** מחברות — ה-2 ש"ח לא מספיקים לעוד אחת.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מ-100 ביצים ממלאים תבניות של 12. כמה תבניות מלאות יהיו?',
        answer: 8,
        hint: m`$12\times8=96$`,
        explain: m`$100:12=8$ (שארית $4$) — 8 תבניות מלאות.`,
      },
    },
  ],
};
