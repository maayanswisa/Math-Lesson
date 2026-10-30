import { c, GREEN, m, RED, SKY, VIOLET } from './tex.js';

export default {
  id: 'g12u3-solids',
  topicId: 'g12-u3-solids',
  grade: 12,
  units: 3,
  emoji: '🧊',
  title: 'גופים במרחב: נפח ושטח פנים',
  subtitle: 'תיבה, מנסרה, גליל, פירמידה, חרוט וכדור — ופיתגורס במרחב',
  sections: [
    {
      id: 'terms',
      emoji: '🔍',
      title: 'המושגים',
      blocks: [
        {
          type: 'box',
          l: 4,
          w: 3,
          h: 2,
          caption: 'תיבה בנויה מקוביות יחידה. שנו את המידות:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'חלקי הגוף',
          md: m`- **פאה** — כל אחד מהמשטחים השטוחים. **מקצוע** — קו שבו שתי פאות נפגשות. **קודקוד** — נקודה שבה מקצועות נפגשים.
- **בסיס** — הפאה שעליה הגוף "עומד". למנסרה ולגליל — שני בסיסים שווים ומקבילים.
- **מעטפת** — כל הפאות שאינן בסיסים.
- **שטח פנים** — כל המעטפת ועוד הבסיסים.`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'יחידות',
          md: 'נפח — ביחידות מעוקבות (סמ"ק, מ"ק). שטח — ביחידות ריבועיות (סמ"ר, מ"ר).',
        },
      ],
      challenge: {
        type: 'number',
        label: 'פאות =',
        prompt: 'לכמה פאות יש למנסרה משולשת?',
        answer: 5,
        hint: 'שני בסיסים משולשים, ומלבן לכל צלע של המשולש.',
        explain: m`$2$ בסיסים ועוד $3$ פאות צדדיות: $5$`,
      },
    },
    {
      id: 'prism',
      emoji: '📦',
      title: 'תיבה ומנסרה ישרה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שלוש נוסחאות לכל מנסרה',
          md: m`**נפח** — שטח הבסיס כפול הגובה:

$$V=S_{b}\cdot h$$

**שטח המעטפת** — היקף הבסיס כפול הגובה:

$$P_{b}\cdot h$$

**שטח הפנים** — המעטפת ועוד שני בסיסים.

בתיבה שמידותיה $a$, $b$, $c$: $V=abc$, ושטח הפנים $2(ab+ac+bc)$`,
        },
        {
          type: 'steps',
          title: m`מנסרה שהבסיס שלה משולש ישר-זווית עם צלעות $3$, $4$, $5$, וגובהה $10$`,
          steps: [
            { math: m`S_b=\frac{3\cdot4}{2}=${c(SKY, '6')}`, note: 'שטח הבסיס — הניצבים 3 ו-4.' },
            { math: m`V=6\cdot10=${c(GREEN, '60')}`, note: 'הנפח.' },
            { math: m`(3+4+5)\cdot10=${c(VIOLET, '120')}`, note: 'שטח המעטפת: היקף הבסיס כפול הגובה.' },
            { math: m`120+2\cdot6=${c(GREEN, '132')}`, note: 'שטח הפנים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'S =',
        prompt: m`מה שטח הפנים של תיבה שמידותיה $4$, $3$ ו-$2$ ס"מ?`,
        answer: 52,
        hint: m`$2(4\cdot3+4\cdot2+3\cdot2)$`,
        explain: m`$2(12+8+6)=52$ סמ"ר`,
      },
    },
    {
      id: 'diagonal',
      emoji: '📐',
      title: 'פיתגורס במרחב',
      blocks: [
        {
          type: 'text',
          md: m`בגופים במרחב מחפשים **משולש ישר-זווית** — ואז משפט פיתגורס. בתיבה, האלכסון המרחבי מחשבים בשני שלבים: קודם אלכסון הבסיס, ואחר כך משולש עם הגובה.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'האלכסון של תיבה',
          md: m`$$d=\sqrt{a^2+b^2+c^2}$$`,
        },
        {
          type: 'steps',
          title: m`תיבה שמידותיה $3$, $4$, $12$`,
          steps: [
            { math: m`\sqrt{3^2+4^2}=${c(SKY, '5')}`, note: 'אלכסון הבסיס.' },
            { math: m`\sqrt{5^2+12^2}=\sqrt{169}=${c(GREEN, '13')}`, note: 'האלכסון המרחבי: אלכסון הבסיס והגובה הם ניצבים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'd =',
        prompt: m`מה אורך האלכסון של קובייה שצלעה $2$ ס"מ? (בקירוב)`,
        answer: 3.46,
        tolerance: 0.01,
        hint: m`$\sqrt{2^2+2^2+2^2}=\sqrt{12}$`,
        explain: m`$\sqrt{12}\approx3.46$ ס"מ`,
      },
    },
    {
      id: 'cylinder',
      emoji: '🥫',
      title: 'גליל',
      blocks: [
        {
          type: 'cylinder',
          caption: 'פרסו את הגליל: המעטפת היא מלבן שאורכו היקף הבסיס.',
          r: 3,
          h: 5,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'נוסחאות הגליל',
          md: m`$$V=${c(SKY, '\\pi r^2')}\cdot ${c(RED, 'h')}$$

שטח המעטפת: $2\pi r\cdot h$

שטח הפנים: $2\pi r^2+2\pi rh$`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'V ≈',
        suffix: 'סמ"ק',
        tolerance: 0.5,
        prompt: m`פחית: רדיוס $3$ ס"מ, גובה $10$ ס"מ. מה הנפח שלה, בקירוב?`,
        answer: 282.74,
        hint: m`$\pi\cdot9\cdot10$`,
        explain: m`$90\pi\approx282.7$ סמ"ק`,
      },
    },
    {
      id: 'pyramid',
      emoji: '🔺',
      title: 'פירמידה ישרה',
      blocks: [
        {
          type: 'space',
          mode: 'pyramid',
          caption: 'בפירמידה ישרה הגובה יורד אל מרכז הבסיס. סובבו את הפירמידה:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'נפח ושטח פנים',
          md: m`$$V=\frac{S_b\cdot h}{3}$$

שליש מהמנסרה עם אותו בסיס ואותו גובה.

**גובה הפאה** — הגובה של כל משולש צדדי. בפירמידה ריבועית שצלע בסיסה $a$:

$$h_f=\sqrt{h^2+\left(\tfrac{a}{2}\right)^2}$$

שטח המעטפת: ארבעה משולשים, כל אחד $\frac{a\cdot h_f}{2}$`,
        },
        {
          type: 'steps',
          title: m`פירמידה ריבועית: צלע הבסיס $6$, גובה $4$`,
          steps: [
            { math: m`V=\frac{36\cdot4}{3}=${c(GREEN, '48')}`, note: 'הנפח.' },
            { math: m`h_f=\sqrt{4^2+3^2}=${c(SKY, '5')}`, note: 'גובה הפאה: הגובה וחצי צלע הבסיס הם ניצבים.' },
            { math: m`4\cdot\frac{6\cdot5}{2}=${c(VIOLET, '60')}`, note: 'שטח המעטפת.' },
            { math: m`60+36=${c(GREEN, '96')}`, note: 'שטח הפנים: המעטפת ועוד הבסיס.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'V =',
        suffix: 'סמ"ק',
        prompt: m`פירמידה שהבסיס שלה ריבוע בצלע $6$ ס"מ, וגובהה $10$ ס"מ. מה הנפח?`,
        answer: 120,
        hint: m`$\frac{36\cdot10}{3}$`,
        explain: m`$\frac{360}{3}=120$ סמ"ק`,
      },
    },
    {
      id: 'cone',
      emoji: '🍦',
      title: 'חרוט',
      blocks: [
        {
          type: 'cone',
          caption: 'החתך הצירי של חרוט — משולש שווה-שוקיים. ושלושה חרוטים ממלאים גליל אחד:',
          r: 3,
          h: 6,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'נוסחאות החרוט',
          md: m`$$V=\frac{\pi r^2\cdot h}{3}$$

**קו יוצר** — מהקודקוד אל שפת הבסיס: $\ell=\sqrt{r^2+h^2}$

שטח המעטפת: $\pi r\ell$

שטח הפנים: $\pi r^2+\pi r\ell$`,
        },
        {
          type: 'steps',
          title: m`חרוט: רדיוס $6$, גובה $8$`,
          steps: [
            { math: m`\ell=\sqrt{36+64}=${c(SKY, '10')}`, note: 'קו היוצר.' },
            { math: m`V=\frac{\pi\cdot36\cdot8}{3}=${c(GREEN, '96\\pi')}`, note: 'הנפח.' },
            { math: m`\pi\cdot6\cdot10=${c(VIOLET, '60\\pi')}`, note: 'שטח המעטפת.' },
            { math: m`36\pi+60\pi=${c(GREEN, '96\\pi')}`, note: 'שטח הפנים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'ℓ =',
        prompt: m`חרוט ברדיוס $5$ ס"מ ובגובה $12$ ס"מ. מה אורך קו היוצר?`,
        answer: 13,
        hint: m`$\sqrt{5^2+12^2}$`,
        explain: m`$\sqrt{25+144}=\sqrt{169}=13$ ס"מ`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: כדור',
      blocks: [
        {
          type: 'revolution',
          shape: 'sphere',
          elementary: true,
          caption: 'חצי עיגול שמסתובב יוצר כדור. החליפו צורות:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'כדור ברדיוס r',
          md: m`$$V=\frac43\pi r^3$$

$$S=4\pi r^2$$`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'S ≈',
        suffix: 'סמ"ר',
        tolerance: 0.5,
        prompt: m`כמה עור צריך לכדורסל ברדיוס $12$ ס"מ? חשבו את שטח הפנים, בקירוב.`,
        answer: 1809.56,
        hint: m`$4\pi\cdot12^2$`,
        explain: m`$576\pi\approx1809.6$ סמ"ר`,
      },
    },
  ],
};
