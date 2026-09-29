import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g7-area-perimeter',
  topicId: 'g7-area-perimeter',
  grade: 7,
  emoji: '📏',
  title: 'שטחים והיקפים',
  subtitle: 'מלבן, משולש, מקבילית, טרפז ומעגל',
  sections: [
    {
      id: 'rect',
      emoji: '▭',
      title: 'היקף מול שטח',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני דברים שונים',
          md: m`**היקף** — האורך **מסביב** (ס"מ). במלבן: $2\times(a+b)$.

**שטח** — כמה משבצות **בפנים** (סמ"ר). במלבן: $a\times b$.`,
        },
        {
          type: 'rect',
          caption: 'שנו את המלבן. האם היקף גדול תמיד אומר שטח גדול?',
          l: 5,
          w: 3,
          showPerimeter: true,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס"מ',
        prompt: 'מלבן ששטחו 24 סמ"ר ואורכו 6 ס"מ. מה ההיקף שלו?',
        answer: 20,
        hint: 'קודם מוצאים את הרוחב: 24 חלקי 6.',
        explain: m`רוחב $4$, והיקף $2\times(6+4)=20$ ס"מ.`,
      },
    },
    {
      id: 'triangle',
      emoji: '🔺',
      title: 'משולש ומקבילית',
      blocks: [
        {
          type: 'shape',
          shape: 'parallelogram',
          caption: 'מקבילית: בסיס × גובה. הזיזו את הקודקוד — השטח לא משתנה!',
          base: 6,
          height: 4,
          shift: 2,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'משולש = חצי מקבילית',
          md: m`אלכסון חוצה מקבילית לשני משולשים חופפים. לכן:

$$S_{\triangle}=\frac{a\times h}{2}$$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: 'משולש עם בסיס 10 ס"מ וגובה 7 ס"מ. מה השטח?',
        answer: 35,
        hint: m`$\frac{10\times7}{2}$`,
        explain: m`$70:2=35$ סמ"ר.`,
      },
    },
    {
      id: 'trapezoid',
      emoji: '⏢',
      title: 'טרפז',
      blocks: [
        {
          type: 'shape',
          shape: 'trapezoid',
          caption: 'שנו את הבסיסים ואת הגובה:',
          base: 7,
          top: 3,
          height: 4,
          shift: 2,
        },
        {
          type: 'steps',
          title: 'בסיסים 10 ו-6, גובה 5',
          steps: [
            { math: m`\frac{10+6}{2}=${c(VIOLET, '8')}`, note: 'ממוצע הבסיסים.' },
            { math: m`8\times5=${c(GREEN, '40')}`, note: 'כפול הגובה.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: 'טרפז עם בסיסים 12 ו-8 ס"מ וגובה 3 ס"מ. מה השטח?',
        answer: 30,
        hint: m`$\frac{12+8}{2}\times3$`,
        explain: m`$10\times3=30$ סמ"ר.`,
      },
    },
    {
      id: 'circle',
      emoji: '🏆',
      title: 'שלב הבוס: מעגל',
      blocks: [
        {
          type: 'circle',
          caption: 'שנו את הרדיוס ובדקו: ההיקף חלקי הקוטר תמיד יוצא π:',
          r: 4,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שתי נוסחאות',
          md: m`היקף: $P=2\pi r$ · שטח: $S=\pi r^2$ (כאשר $\pi\approx3.14$)`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: m`מה שטח מעגל שרדיוסו $10$ ס"מ? (השתמשו ב-$\pi\approx3.14$)`,
        answer: 314,
        tolerance: 0.5,
        hint: m`$3.14\times10^2$`,
        explain: m`$3.14\times100=314$ סמ"ר.`,
      },
    },
  ],
};
