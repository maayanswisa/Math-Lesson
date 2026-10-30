import { c, GREEN, m, SKY, VIOLET } from './tex.js';

/** זווית גובה וזווית עומק: אדם על הקרקע, בניין, וצופה בראש מגדל. */
const ANGLES = `<div class='diagram-box'><svg viewBox='0 0 300 150' width='300' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><line x1='10' y1='130' x2='290' y2='130' stroke='#1a2b3c' stroke-width='1.5'/><rect x='220' y='40' width='40' height='90' fill='rgba(13,110,110,0.12)' stroke='#0d6e6e' stroke-width='2'/><circle cx='40' cy='130' r='3' fill='#1a2b3c'/><line x1='40' y1='130' x2='220' y2='40' stroke='#c45c48' stroke-width='2' stroke-dasharray='5 4'/><path d='M80 130 A40 40 0 0 0 75.8 112.1' fill='none' stroke='#c45c48' stroke-width='1.8'/><text x='88' y='122' font-size='12' font-weight='700' fill='#c45c48'>זווית גובה</text><line x1='220' y1='40' x2='120' y2='40' stroke='#1a2b3c' stroke-width='1' stroke-dasharray='3 3'/><path d='M180 40 A40 40 0 0 0 184.2 57.9' fill='none' stroke='#7c4dcc' stroke-width='1.8'/><text x='176' y='34' text-anchor='end' font-size='12' font-weight='700' fill='#7c4dcc'>זווית עומק</text></svg></div>`;

export default {
  id: 'g11u3-space-trig',
  topicId: 'g11-u3-space-trig',
  grade: 11,
  units: 3,
  emoji: '📐',
  title: 'טריגונומטריה במשולש ישר-זווית',
  subtitle: 'סינוס, קוסינוס, טנגנס — צלעות, זוויות, זווית גובה וזווית עומק',
  sections: [
    {
      id: 'ratios',
      emoji: '🔺',
      title: 'שלושה יחסים',
      blocks: [
        {
          type: 'trigratio',
          angle: 35,
          hyp: 10,
          caption: m`שנו את הזווית $\alpha$ וראו איך היחסים משתנים:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ההגדרות',
          md: m`ביחס לזווית חדה $\alpha$ במשולש ישר-זווית:

$$\sin\alpha=\frac{\text{הניצב שמול}}{\text{היתר}}\qquad\cos\alpha=\frac{\text{הניצב שליד}}{\text{היתר}}\qquad\tan\alpha=\frac{\text{הניצב שמול}}{\text{הניצב שליד}}$$`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'sin α =',
        tolerance: 0.001,
        prompt: m`במשולש ישר-זווית הניצבים $3$ ו-$4$, והיתר $5$. $\alpha$ היא הזווית שמול הניצב $3$. מה $\sin\alpha$?`,
        answer: 0.6,
        hint: 'הניצב שמול חלקי היתר.',
        explain: m`$\frac35=0.6$`,
      },
    },
    {
      id: 'side',
      emoji: '📏',
      title: 'מוצאים צלע',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'איזה יחס לבחור?',
          md: 'מסמנים מה **נתון** ומה **מחפשים** — ביחס לזווית. בוחרים את היחס שמשתמש בשניהם.',
        },
        {
          type: 'steps',
          title: m`סולם באורך $5$ מ' נשען על קיר בזווית של $70°$ עם הקרקע. לאיזה גובה הוא מגיע?`,
          steps: [
            { math: m`\sin70°=\frac{h}{5}`, note: 'הגובה מול הזווית, והסולם הוא היתר.' },
            { math: m`h=5\cdot\sin70°\approx5\cdot0.94`, note: '' },
            { math: m`h\approx${c(GREEN, '4.70')}`, note: 'מטרים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        tolerance: 0.01,
        prompt: m`במשולש ישר-זווית היתר $10$ ס"מ, וזווית חדה בת $30°$. מה אורך הניצב שמול הזווית?`,
        answer: 5,
        hint: m`$\sin30°=0.5$`,
        explain: m`$10\cdot0.5=5$ ס"מ`,
      },
    },
    {
      id: 'angle',
      emoji: '📐',
      title: 'מוצאים זווית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'פונקציה הפוכה במחשבון',
          md: m`יודעים את היחס — מחפשים את הזווית. במחשבון: $\text{shift}$ ואז $\sin$, $\cos$ או $\tan$.

$\tan\alpha=0.75$ ← $\alpha\approx36.87°$`,
        },
        {
          type: 'steps',
          title: m`במשולש ישר-זווית הניצבים $6$ ו-$8$. מה הזווית שמול הניצב $6$?`,
          steps: [
            { math: m`\tan\alpha=\frac68=${c(SKY, '0.75')}`, note: 'מול חלקי ליד.' },
            { math: m`\alpha\approx${c(GREEN, '36.87°')}`, note: 'במחשבון: shift tan.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'α =',
        tolerance: 0.05,
        prompt: m`במשולש ישר-זווית שני הניצבים שווים. מה גודל כל אחת מהזוויות החדות?`,
        answer: 45,
        hint: m`$\tan\alpha=1$`,
        explain: m`$\tan\alpha=1$, ולכן $\alpha=45°$`,
      },
    },
    {
      id: 'elevation',
      emoji: '🏢',
      title: 'זווית גובה',
      blocks: [
        {
          type: 'text',
          md: m`**זווית גובה** — הזווית שבין הקרקע (קו אופקי) לבין קו הראייה **כלפי מעלה**. **זווית עומק** — הזווית שבין קו אופקי לבין קו הראייה **כלפי מטה**.

${ANGLES}`,
        },
        {
          type: 'steps',
          title: m`עומדים $20$ מ' מבניין ורואים את ראשו בזווית גובה של $40°$. מה גובה הבניין?`,
          steps: [
            { math: m`\tan40°=\frac{h}{20}`, note: 'הגובה מול הזווית, והמרחק ליד הזווית.' },
            { math: m`h=20\cdot\tan40°\approx20\cdot0.839`, note: '' },
            { math: m`h\approx${c(GREEN, '16.78')}`, note: 'מטרים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'מטר ≈',
        tolerance: 0.05,
        prompt: m`עומדים $30$ מ' מעץ ורואים את צמרתו בזווית גובה של $25°$. מה גובה העץ, בקירוב?`,
        answer: 13.99,
        hint: m`$h=30\cdot\tan25°$`,
        explain: m`$30\cdot0.4663\approx13.99$ מטר`,
      },
    },
    {
      id: 'depression',
      emoji: '⛵',
      title: 'זווית עומק',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'זווית העומק שווה לזווית הגובה',
          md: 'הקו האופקי למעלה מקביל לקרקע, ולכן זווית העומק מהמגדל שווה לזווית הגובה מהסירה (זוויות מתחלפות).',
        },
        {
          type: 'steps',
          title: m`מראש מגדלור בגובה $50$ מ' רואים סירה בזווית עומק של $20°$. מה המרחק מהסירה לבסיס המגדלור?`,
          steps: [
            { math: m`\tan20°=\frac{50}{d}`, note: 'הגובה מול הזווית שליד הסירה.' },
            { math: m`d=\frac{50}{\tan20°}\approx\frac{50}{0.364}`, note: '' },
            { math: m`d\approx${c(GREEN, '137.4')}`, note: 'מטרים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'מטר ≈',
        tolerance: 0.05,
        prompt: m`מחלון בגובה $15$ מ' רואים מכונית בזווית עומק של $30°$. מה המרחק של המכונית מבסיס הבניין, בקירוב?`,
        answer: 25.98,
        hint: m`$d=\frac{15}{\tan30°}$`,
        explain: m`$\frac{15}{0.5774}\approx25.98$ מטר`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: רמפה לכיסא גלגלים',
      blocks: [
        {
          type: 'steps',
          title: m`רמפה עולה $1$ מ' לגובה, לאורך $12$ מ' אופקיים. מה זווית השיפוע שלה?`,
          steps: [
            { math: m`\tan\alpha=\frac{1}{12}\approx0.083`, note: 'הגובה מול הזווית, והמרחק האופקי לידה.' },
            { math: m`\alpha\approx${c(VIOLET, '4.76°')}`, note: 'במחשבון: shift tan.' },
            { math: m`\sqrt{12^2+1^2}\approx${c(GREEN, '12.04')}`, note: 'אורך הרמפה עצמה — משפט פיתגורס.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'α ≈',
        tolerance: 0.05,
        prompt: m`כביש עולה $50$ מ' לגובה לאורך $1{,}000$ מ' של הכביש עצמו. מה זווית השיפוע של הכביש, בקירוב?`,
        answer: 2.87,
        hint: m`הכביש הוא היתר: $\sin\alpha=\frac{50}{1{,}000}$`,
        explain: m`$\sin\alpha=0.05$, ולכן $\alpha\approx2.87°$`,
      },
    },
  ],
};
