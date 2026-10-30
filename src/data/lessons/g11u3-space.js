import { c, GREEN, m, SKY } from './tex.js';

export default {
  id: 'g11u3-space',
  topicId: 'g11-u3-space',
  grade: 11,
  units: 3,
  emoji: '🧭',
  title: 'תרגול מסכם — התמצאות במישור ובמרחב',
  subtitle: 'יחס, קנה מידה, דמיון וטריגונומטריה — בשאלות כמו בבגרות',
  sections: [
    {
      id: 'proportion',
      emoji: '⚖️',
      title: 'פרופורציה',
      blocks: [
        {
          type: 'steps',
          title: m`מתכון ל-$4$ אנשים דורש $300$ גרם קמח. כמה קמח צריך ל-$10$ אנשים?`,
          steps: [
            { math: m`\frac{4}{300}=\frac{10}{x}`, note: 'אנשים לקמח — באותו סדר.' },
            { math: m`x=\frac{300\cdot10}{4}=${c(GREEN, '750')}`, note: 'גרם.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'ליטר =',
        prompt: m`מכונית נוסעת $60$ ק"מ על $4$ ליטר דלק. כמה ליטר תצטרך ל-$210$ ק"מ?`,
        answer: 14,
        hint: m`$\frac{60}{4}=\frac{210}{x}$`,
        explain: m`$x=\frac{4\cdot210}{60}=14$ ליטר`,
      },
    },
    {
      id: 'scale',
      emoji: '🗺️',
      title: 'קנה מידה',
      blocks: [
        {
          type: 'steps',
          title: m`במפה בקנה מידה $1:25{,}000$ המרחק בין שתי תחנות $7$ ס"מ. כמה זמן ייקח ללכת ביניהן במהירות של $5$ קמ"ש?`,
          steps: [
            { math: m`7\cdot25{,}000=175{,}000\ \text{ס"מ}=${c(SKY, '1.75')}\ \text{ק"מ}`, note: 'המרחק במציאות.' },
            { math: m`\frac{1.75}{5}=0.35\ \text{שעות}`, note: 'זמן = דרך חלקי מהירות.' },
            { math: m`0.35\cdot60=${c(GREEN, '21')}`, note: 'דקות.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'ס"מ =',
        prompt: m`בתוכנית בקנה מידה $1:50$ קיר באורך $4$ מ'. מה אורך הקיר בתוכנית?`,
        answer: 8,
        hint: m`$4$ מ' $=$ $400$ ס"מ. מחלקים ב-$50$.`,
        explain: m`$400\div50=8$ ס"מ`,
      },
    },
    {
      id: 'similarity',
      emoji: '📐',
      title: 'דמיון',
      blocks: [
        {
          type: 'steps',
          title: m`מקל באורך $2$ מ' מטיל צל של $1.6$ מ'. באותו זמן לעמוד חשמל צל של $6$ מ'. מה גובה העמוד?`,
          steps: [
            { math: m`\frac{h}{6}=\frac{2}{1.6}`, note: 'גובה לצל — באותו יחס.' },
            { math: m`h=6\cdot1.25=${c(GREEN, '7.5')}`, note: 'מטרים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'שטח =',
        prompt: m`שני משולשים דומים. צלע במשולש הגדול פי $3$ מהצלע המתאימה בקטן. שטח הקטן $6$ סמ"ר. מה שטח הגדול?`,
        answer: 54,
        hint: m`השטח פי $3^2$`,
        explain: m`$6\cdot9=54$ סמ"ר`,
      },
    },
    {
      id: 'trig',
      emoji: '🔺',
      title: 'טריגונומטריה',
      blocks: [
        {
          type: 'steps',
          title: m`עפיפון קשור בחוט באורך $40$ מ', והחוט יוצר זווית של $50°$ עם הקרקע. באיזה גובה העפיפון? (מזניחים את גובה האדם)`,
          steps: [
            { math: m`\sin50°=\frac{h}{40}`, note: 'החוט הוא היתר.' },
            { math: m`h=40\cdot\sin50°\approx${c(GREEN, '30.64')}`, note: 'מטרים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'α ≈',
        tolerance: 0.05,
        prompt: m`סולם באורך $6$ מ' נשען על קיר, ורגלו $2$ מ' מהקיר. מה הזווית בין הסולם לקרקע, בקירוב?`,
        answer: 70.53,
        hint: m`$\cos\alpha=\frac26$`,
        explain: m`$\cos\alpha\approx0.333$, ולכן $\alpha\approx70.53°$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: זווית עומק ומפה',
      blocks: [
        {
          type: 'text',
          md: m`מתצפית בגובה $120$ מ' רואים בית בזווית עומק של $15°$. מה המרחק האופקי לבית? ובמפה בקנה מידה $1:10{,}000$ — כמה ס"מ זה?`,
        },
        {
          type: 'steps',
          title: 'שני שלבים',
          steps: [
            { math: m`d=\frac{120}{\tan15°}\approx\frac{120}{0.268}\approx${c(SKY, '447.8')}`, note: 'מטרים במציאות.' },
            { math: m`447.8\ \text{מ'}=44{,}780\ \text{ס"מ}`, note: '' },
            { math: m`44{,}780\div10{,}000\approx${c(GREEN, '4.48')}`, note: 'ס"מ במפה.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'מטר ≈',
        tolerance: 0.1,
        prompt: m`מראש צוק בגובה $80$ מ' רואים סירה בזווית עומק של $35°$. מה המרחק האופקי לסירה, בקירוב?`,
        answer: 114.25,
        hint: m`$d=\frac{80}{\tan35°}$`,
        explain: m`$\frac{80}{0.7002}\approx114.25$ מטר`,
      },
    },
  ],
};
