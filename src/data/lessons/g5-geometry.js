import { c, GREEN, m } from './tex.js';

/**
 * צורת L בגודל 8×6 שחסרה לה פינה של 5×3 (ס"מ, קנה מידה 20).
 * split — מחולקת לשני מלבנים; complete — משלימים למלבן ומחסירים.
 */
function lShape(mode) {
  const txt = (x, y, t, color = '#1a2b3c', anchor = 'middle') =>
    `<text x='${x}' y='${y}' font-size='13' font-weight='700' fill='${color}' text-anchor='${anchor}'>${t}</text>`;
  const body =
    mode === 'split'
      ? `<rect x='30' y='20' width='60' height='60' fill='rgba(13,110,110,0.22)'/><rect x='30' y='80' width='160' height='60' fill='rgba(226,160,32,0.28)'/><line x1='30' y1='80' x2='90' y2='80' stroke='#1a2b3c' stroke-width='1.5' stroke-dasharray='5 4'/>${txt(60, 55, '9', '#0a5555')}${txt(110, 115, '24', '#8a5a00')}`
      : `<polygon points='30,20 90,20 90,80 190,80 190,140 30,140' fill='rgba(31,143,224,0.18)'/><rect x='90' y='20' width='100' height='60' fill='rgba(196,92,72,0.12)' stroke='#c45c48' stroke-width='1.5' stroke-dasharray='5 4'/>${txt(140, 55, '15', '#a13a2a')}${txt(140, 14, '5', '#a13a2a')}`;
  return `<div class='diagram-box'><svg viewBox='0 0 220 165' width='220' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'>${body}<polygon points='30,20 90,20 90,80 190,80 190,140 30,140' fill='none' stroke='#1a2b3c' stroke-width='2'/>${txt(60, 14, '3')}${txt(22, 84, '6', '#1a2b3c', 'end')}${txt(110, 158, '8')}${txt(198, 114, '3', '#1a2b3c', 'start')}</svg></div>`;
}

export default {
  id: 'g5-geometry',
  topicId: 'g5-geometry',
  grade: 5,
  emoji: '📦',
  title: 'שטח, היקף ונפח',
  subtitle: 'היקף ושטח של מלבן, יחידות שטח, צורות מורכבות, נפח תיבה ושטח פנים',
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
      id: 'units',
      emoji: '📐',
      title: 'יחידות מידה של שטח',
      blocks: [
        {
          type: 'text',
          md: m`ריבוע של $1$ ס"מ על $1$ ס"מ הוא **סנטימטר רבוע** (סמ"ר). ריבוע של $1$ מטר על $1$ מטר הוא **מטר רבוע** (מ"ר).

כמה סמ"ר יש במ"ר אחד? בכל צלע יש $100$ ס"מ — ולכן $100\times100=10{,}000$ סמ"ר!`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'טבלת המעבר',
          md: m`- $1$ סמ"ר הוא $100$ ממ"ר ($10\times10$)
- $1$ מ"ר הוא $10{,}000$ סמ"ר ($100\times100$)
- $1$ דונם הוא $1{,}000$ מ"ר`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'מלכודת',
          md: m`$1$ מטר הוא $100$ ס"מ — אבל $1$ מ"ר הוא **לא** $100$ סמ"ר. זה ריבוע: $100$ **כפול** $100$.`,
        },
        {
          type: 'steps',
          title: 'מלבן: 2 מטר על 50 ס"מ — מה השטח?',
          steps: [
            { math: m`200\times50=10{,}000`, note: 'קודם ממירים לאותה יחידה: 2 מ׳ הם 200 ס"מ. השטח בסמ"ר.' },
            { math: m`10{,}000\div10{,}000=${c(GREEN, '1')}`, note: 'כלומר בדיוק 1 מ"ר.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: 'כמה סמ"ר יש ב-3 מ"ר?',
        answer: 30000,
        hint: 'במ"ר אחד יש 10,000 סמ"ר.',
        explain: m`$3\times10{,}000=30{,}000$ סמ"ר.`,
      },
    },
    {
      id: 'composite',
      emoji: '🧩',
      title: 'שטח של צורה מורכבת',
      blocks: [
        {
          type: 'text',
          md: 'לצורת L אין נוסחה משלה — אבל אפשר להיעזר במלבנים. יש שתי דרכים (המידות בס"מ):',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'דרך 1: מפרקים ומחברים',
          md: m`${lShape('split')}

חותכים לשני מלבנים: $3\times3=9$ ו-$8\times3=24$. ביחד: $9+24=33$ סמ"ר.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'דרך 2: משלימים ומחסירים',
          md: m`${lShape('complete')}

משלימים למלבן גדול $8\times6=48$, ומחסירים את החלק החסר $5\times3=15$: $48-15=33$ סמ"ר.`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'אותה תשובה',
          md: 'בוחרים את הדרך הנוחה — ובודקים בעזרת השנייה.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ"ר',
        prompt: 'גינה מלבנית של 10 מ׳ על 8 מ׳, ובתוכה בריכה מלבנית של 4 מ׳ על 3 מ׳. מה שטח הדשא (בלי הבריכה)?',
        answer: 68,
        hint: 'שטח הגינה פחות שטח הבריכה.',
        explain: m`$10\times8-4\times3=80-12=68$ מ"ר.`,
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
