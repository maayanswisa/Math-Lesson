import { m } from './tex.js';

const BAR_CHART = `<div class='diagram-box'><svg viewBox='0 0 260 150' width='260' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><line x1='40' y1='120' x2='250' y2='120' stroke='#1a2b3c' stroke-width='2'/><line x1='40' y1='120' x2='40' y2='10' stroke='#1a2b3c' stroke-width='2'/>${[2, 4, 6, 8].map((v) => `<text x='32' y='${124 - v * 12}' text-anchor='end' font-size='11' fill='#4a5d73'>${v}</text><line x1='38' y1='${120 - v * 12}' x2='250' y2='${120 - v * 12}' stroke='#e8eef4'/>`).join('')}${[
  ['🐶', 5, '#1f8fe0'],
  ['🐱', 8, '#0d6e6e'],
  ['🐟', 3, '#e2a020'],
  ['🐰', 4, '#d1487f'],
]
  .map(([e, v, col], i) => `<rect x='${58 + i * 48}' y='${120 - v * 12}' width='30' height='${v * 12}' rx='4' fill='${col}'/><text x='${73 + i * 48}' y='${114 - v * 12}' text-anchor='middle' font-size='12' font-weight='700' fill='#1a2b3c'>${v}</text><text x='${73 + i * 48}' y='140' text-anchor='middle' font-size='16'>${e}</text>`)
  .join('')}</svg></div>`;

export default {
  id: 'g5-data-frequency',
  topicId: 'g5-data-frequency',
  grade: 5,
  emoji: '📊',
  title: 'שכיחות, שכיח וקריאת נתונים',
  subtitle: 'טבלת שכיחויות, השכיח, שכיחות יחסית, ודרכים להציג נתונים',
  sections: [
    {
      id: 'frequency',
      emoji: '🔢',
      title: 'שכיחות',
      blocks: [
        {
          type: 'text',
          md: m`שאלנו 20 ילדים מה החיה האהובה עליהם. **שכיחות** = כמה פעמים כל תשובה הופיעה:

${BAR_CHART}`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'השכיח',
          md: 'הערך שמופיע **הכי הרבה פעמים**. כאן: חתול 🐱 (8 ילדים).',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה השכיח בנתונים: $3,\ 5,\ 3,\ 7,\ 5,\ 3$?`,
        options: ['3', '5', '7', '4'],
        answer: 0,
        hint: 'ספרו כמה פעמים כל מספר מופיע.',
        explain: '3 מופיע 3 פעמים — יותר מכל מספר אחר.',
      },
    },
    {
      id: 'displays',
      emoji: '🥧',
      title: 'אותם נתונים — הרבה ציורים',
      blocks: [
        {
          type: 'text',
          md: `- **טבלה** — הכי מדויקת.
- **דיאגרמת עמודות** — הכי קל **להשוות**.
- **דיאגרמת עוגה** — רואים איזה **חלק מהשלם** כל ערך תופס.
- **פיקטוגרם** — סמלים, וכל סמל שווה כמות קבועה.`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'קוראים פיקטוגרם',
          md: 'אם כל 🍎 = 4 תפוחים, אז 🍎🍎🍎 וחצי 🍎 = 3×4 + 2 = **14** תפוחים.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'בפיקטוגרם כל ⭐ מייצג 5 ילדים. בשורה יש 4 כוכבים. כמה ילדים?',
        answer: 20,
        hint: '4 כוכבים, כל אחד 5.',
        explain: '4×5 = 20 ילדים.',
      },
    },
    {
      id: 'relative',
      emoji: '🍰',
      title: 'שכיחות יחסית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'איזה חלק מכל הנתונים?',
          md: m`**שכיחות יחסית** = השכיחות **חלקי** מספר כל הנתונים. כותבים אותה כ**שבר** או כ**אחוז**.`,
        },
        {
          type: 'steps',
          title: 'בגרף החיות: 8 מתוך 20 ילדים בחרו חתול',
          steps: [
            { math: m`\frac{8}{20}`, note: 'השכיחות חלקי מספר כל הילדים.' },
            { math: m`\frac{8}{20}=\frac{2}{5}`, note: 'מצמצמים.' },
            { math: m`\frac{8}{20}=\frac{40}{100}=40\%`, note: 'מרחיבים למכנה 100 — וזה האחוז.' },
          ],
        },
        {
          type: 'card',
          tone: 'why',
          title: 'בשביל מה זה טוב?',
          md: m`להשוות בין קבוצות **בגדלים שונים**. בכיתה א' $6$ מתוך $20$ ילדים שוחים, ובכיתה ב' $6$ מתוך $30$. השכיחות זהה ($6$), אבל השכיחות היחסית לא: $30\%$ לעומת $20\%$.`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'בדיקה',
          md: m`סכום **כל** השכיחויות היחסיות הוא $1$, כלומר $100\%$. בגרף החיות: $\frac{5}{20}+\frac{8}{20}+\frac{3}{20}+\frac{4}{20}=\frac{20}{20}$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '%',
        prompt: 'לפי גרף החיות (20 ילדים): מה השכיחות היחסית של כלב 🐶, באחוזים?',
        answer: 25,
        hint: m`5 ילדים מתוך 20: $\frac{5}{20}=\frac{?}{100}$`,
        explain: m`$\frac{5}{20}=\frac{25}{100}=25\%$.`,
      },
    },
    {
      id: 'read',
      emoji: '🏆',
      title: 'שלב הבוס: קוראים גרף',
      blocks: [
        {
          type: 'text',
          md: m`חזרו לגרף החיות למעלה. כמה ילדים **יותר** בחרו חתול מאשר דג?

חתול: 8, דג: 3 → $8-3=5$ ילדים יותר.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'לפי גרף החיות: כמה ילדים בחרו כלב או ארנב (ביחד)?',
        answer: 9,
        hint: 'כלב 🐶 ועוד ארנב 🐰.',
        explain: '5 + 4 = 9 ילדים.',
      },
    },
  ],
};
