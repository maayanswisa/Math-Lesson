import { c, GREEN, m } from './tex.js';

export default {
  id: 'g5-geometry',
  topicId: 'g5-geometry',
  grade: 5,
  emoji: '📦',
  title: 'שטח, היקף ונפח',
  subtitle: 'היקף ושטח של מלבן, נפח תיבה ושטח הפנים שלה',
  sections: [
    {
      id: 'rect',
      emoji: '▭',
      title: 'היקף ושטח של מלבן',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני דברים שונים',
          md: m`**היקף** = האורך **מסביב**: 2 × (אורך + רוחב) — ביחידות אורך (ס"מ).

**שטח** = כמה **משבצות** בפנים: אורך × רוחב — ביחידות ריבועיות (סמ"ר).`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס"מ',
        prompt: 'מלבן באורך 7 ס"מ וברוחב 3 ס"מ. מה ההיקף שלו?',
        answer: 20,
        hint: m`$2\times(7+3)$`,
        explain: m`$2\times10=20$ ס"מ.`,
      },
    },
    {
      id: 'volume',
      emoji: '🧊',
      title: 'נפח תיבה',
      blocks: [
        {
          type: 'text',
          md: m`**נפח** = כמה **קוביות קטנות** ($1\times1\times1$) נכנסות בתוך התיבה.`,
        },
        {
          type: 'box',
          caption: 'שנו את המידות וספרו קוביות:',
          l: 4,
          w: 3,
          h: 2,
        },
        {
          type: 'card',
          tone: 'why',
          title: 'למה כופלים?',
          md: m`שכבה אחת = אורך × רוחב קוביות ($4\times3=12$). יש **גובה** שכבות כאלה ($2$). ביחד: $12\times2=24$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'קוביות',
        prompt: 'תיבה באורך 5, רוחב 3 וגובה 2. מה הנפח?',
        answer: 30,
        hint: 'אורך × רוחב × גובה.',
        explain: '5×3×2 = 30 קוביות יחידה.',
      },
    },
    {
      id: 'surface',
      emoji: '🎁',
      title: 'שלב הבוס: שטח הפנים',
      blocks: [
        {
          type: 'text',
          md: m`**שטח הפנים** = כמה נייר עטיפה צריך כדי לעטוף את התיבה — סכום השטחים של **6 הפאות**. הפאות באות **בזוגות** זהים.`,
        },
        {
          type: 'steps',
          title: 'תיבה 4 × 3 × 2',
          steps: [
            { math: m`4\times3=12`, note: 'למעלה ולמטה — פעמיים.' },
            { math: m`4\times2=8`, note: 'קדימה ואחורה — פעמיים.' },
            { math: m`3\times2=6`, note: 'ימין ושמאל — פעמיים.' },
            { math: m`2\times(12+8+6)=${c(GREEN, '52')}`, note: 'סה"כ 52 סמ"ר.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: 'מה שטח הפנים של קובייה שכל צלע שלה 3 ס"מ?',
        answer: 54,
        hint: 'לקובייה 6 פאות ריבועיות זהות.',
        explain: m`כל פאה $3\times3=9$, ויש 6: $6\times9=54$ סמ"ר.`,
      },
    },
  ],
};
