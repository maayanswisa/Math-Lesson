import { c, GREEN, m, SKY, VIOLET } from './tex.js';

export default {
  id: 'g11u3-space-ratio',
  topicId: 'g11-u3-space-ratio',
  grade: 11,
  units: 3,
  emoji: '🗺️',
  title: 'יחס, פרופורציה וקנה מידה',
  subtitle: 'חלוקה לפי יחס, מפות, תוכניות של דירות ויחס שטחים',
  sections: [
    {
      id: 'ratio',
      emoji: '⚖️',
      title: 'יחס וחלוקה לפי יחס',
      blocks: [
        {
          type: 'ratio',
          a: 2,
          b: 3,
          total: 40,
          caption: m`מחלקים $40$ לפי היחס $2:3$. שנו את היחס ואת הכמות:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'חלקים שווים',
          md: m`יחס $a:b$ — יש $a+b$ חלקים שווים בסך הכול.

$40$ לפי $2:3$: חמישה חלקים, כל חלק $8$ — ולכן $16$ ו-$24$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'החלק הגדול =',
        prompt: m`מחלקים $1{,}200$ ₪ בין שני שותפים לפי היחס $3:5$. כמה יקבל השותף שמקבל יותר?`,
        answer: 750,
        hint: m`$8$ חלקים, כל חלק $150$ ₪.`,
        explain: m`$5\cdot150=750$ ₪. השותף השני — $450$ ₪.`,
      },
    },
    {
      id: 'proportion',
      emoji: '✖️',
      title: 'פרופורציה וכפל בהצלבה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני יחסים שווים',
          md: m`$$\frac{a}{b}=\frac{c}{d}\quad\Longleftrightarrow\quad a\cdot d=b\cdot c$$`,
        },
        {
          type: 'steps',
          title: m`$3$ ק"ג תפוחים עולים $27$ ₪. כמה עולים $5$ ק"ג?`,
          steps: [
            { math: m`\frac{3}{27}=\frac{5}{x}`, note: 'קילוגרמים לשקלים — באותו סדר בשני הצדדים.' },
            { math: m`3x=27\cdot5=135`, note: 'כפל בהצלבה.' },
            { math: m`x=${c(GREEN, '45')}`, note: '₪' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: m`פתרו: $\frac{3}{5}=\frac{x}{20}$`,
        answer: 12,
        hint: m`$5x=60$`,
        explain: m`$x=\frac{3\cdot20}{5}=12$`,
      },
    },
    {
      id: 'units',
      emoji: '📏',
      title: 'המרת יחידות אורך',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'טבלת המרה',
          md: m`- $1$ ק"מ $=$ $1{,}000$ מ'
- $1$ מ' $=$ $100$ ס"מ
- ולכן: $1$ ק"מ $=$ $100{,}000$ ס"מ`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'ס"מ =',
        prompt: m`כמה סנטימטרים יש ב-$2.5$ ק"מ?`,
        answer: 250000,
        hint: m`$2.5\cdot100{,}000$`,
        explain: m`$250{,}000$ ס"מ`,
      },
    },
    {
      id: 'scale',
      emoji: '🗺️',
      title: 'קנה מידה במפה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`קנה מידה $1:n$`,
          md: m`$1$ ס"מ במפה הוא $n$ ס"מ במציאות.

- מהמפה למציאות — **כופלים** ב-$n$.
- מהמציאות למפה — **מחלקים** ב-$n$.`,
        },
        {
          type: 'steps',
          title: m`מפה בקנה מידה $1:50{,}000$. המרחק בין שני כפרים במפה $4$ ס"מ. מה המרחק במציאות?`,
          steps: [
            { math: m`4\cdot50{,}000=200{,}000`, note: 'ס"מ במציאות.' },
            { math: m`200{,}000\ \text{ס"מ}=${c(GREEN, '2')}\ \text{ק"מ}`, note: 'מחלקים ב-100,000.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'ס"מ =',
        prompt: m`במפה בקנה מידה $1:50{,}000$ — כמה סנטימטרים במפה מייצגים $3$ ק"מ במציאות?`,
        answer: 6,
        hint: m`$3$ ק"מ $=$ $300{,}000$ ס"מ. מחלקים ב-$50{,}000$.`,
        explain: m`$300{,}000\div50{,}000=6$ ס"מ`,
      },
    },
    {
      id: 'plans',
      emoji: '🏠',
      title: 'תוכנית של דירה',
      blocks: [
        {
          type: 'steps',
          title: m`בתוכנית בקנה מידה $1:100$ חדר נראה כמלבן של $4.5$ ס"מ על $3$ ס"מ. מה שטח החדר במציאות?`,
          steps: [
            { math: m`4.5\cdot100=450\ \text{ס"מ}=${c(SKY, '4.5')}\ \text{מ'}`, note: 'האורך.' },
            { math: m`3\cdot100=300\ \text{ס"מ}=${c(SKY, '3')}\ \text{מ'}`, note: 'הרוחב.' },
            { math: m`4.5\cdot3=${c(GREEN, '13.5')}`, note: 'מ"ר.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'מ"ר =',
        prompt: m`בתוכנית בקנה מידה $1:200$ סלון נראה כמלבן של $3$ ס"מ על $2.5$ ס"מ. מה שטח הסלון במציאות?`,
        answer: 30,
        hint: m`$3$ ס"מ ← $6$ מ'. $\;2.5$ ס"מ ← $5$ מ'.`,
        explain: m`$6\cdot5=30$ מ"ר`,
      },
    },
    {
      id: 'area',
      emoji: '🟦',
      title: 'יחס שטחים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שטח — פי k בריבוע',
          md: m`כשכל האורכים גדלים פי $k$, השטח גדל פי $k^2$.

בקנה מידה $1:100$ — כל סמ"ר בתוכנית הוא $100^2=10{,}000$ סמ"ר, כלומר $1$ מ"ר.`,
        },
        {
          type: 'steps',
          title: m`דגם של שולחן בקנה מידה $1:20$. שטח השולחן בדגם $30$ סמ"ר.`,
          steps: [
            { math: m`20^2=${c(VIOLET, '400')}`, note: 'פי כמה השטח במציאות.' },
            { math: m`30\cdot400=12{,}000\ \text{ס"מ}^2=${c(GREEN, '1.2')}\ \text{מ"ר}`, note: '' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'פי =',
        prompt: 'מגדילים תמונה כך שהאורך והרוחב גדלים פי 3. פי כמה גדל השטח?',
        answer: 9,
        hint: m`$k^2$`,
        explain: m`$3^2=9$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מה קנה המידה?',
      blocks: [
        {
          type: 'steps',
          title: m`במפה, דרך באורך $3$ ק"מ נראית כקו באורך $6$ ס"מ. מה קנה המידה?`,
          steps: [
            { math: m`3\ \text{ק"מ}=300{,}000\ \text{ס"מ}`, note: 'אותן יחידות.' },
            { math: m`\frac{300{,}000}{6}=${c(GREEN, '50{,}000')}`, note: 'כל ס"מ במפה הוא 50,000 ס"מ.' },
            { math: m`1:50{,}000`, note: 'קנה המידה.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'n =',
        prompt: m`במפה, מרחק של $8$ ק"מ נראה כ-$4$ ס"מ. קנה המידה הוא $1:n$. מה $n$?`,
        answer: 200000,
        hint: m`$8$ ק"מ $=$ $800{,}000$ ס"מ.`,
        explain: m`$800{,}000\div4=200{,}000$`,
      },
    },
  ],
};
