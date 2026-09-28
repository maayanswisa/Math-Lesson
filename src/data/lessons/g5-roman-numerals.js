import { m } from './tex.js';

// ה-Markdown באתר בלי טבלאות, אז הטבלה כתובה ב-HTML
const SYMBOLS_TABLE = `<div class='diagram-box'><table dir='ltr' style='border-collapse:separate;border-spacing:4px;text-align:center;font-weight:700'><tr>${['I', 'V', 'X', 'L', 'C', 'D', 'M']
  .map((s) => `<td style='background:rgba(13,110,110,0.1);color:#0a5555;border-radius:8px;padding:6px 10px;font-family:monospace;font-size:1.3em'>${s}</td>`)
  .join('')}</tr><tr>${[1, 5, 10, 50, 100, 500, 1000].map((v) => `<td style='padding:2px 6px'>${v}</td>`).join('')}</tr></table></div>`;

export default {
  id: 'g5-roman-numerals',
  topicId: 'g5-roman-numerals',
  grade: 5,
  emoji: '🏛️',
  title: 'ספרות רומיות',
  subtitle: 'שבעה סמלים, כלל החיבור וכלל החיסור',
  sections: [
    {
      id: 'symbols',
      emoji: '🔤',
      title: 'שבעה סמלים',
      blocks: [
        {
          type: 'text',
          md: m`הרומאים כתבו כל מספר בעזרת **7 אותיות** בלבד:

${SYMBOLS_TABLE}`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'כלל החיבור',
          md: 'סמל **קטן אחרי** גדול → **מחברים**: VII = 5+1+1 = 7.\n\nאותו סמל מופיע **לכל היותר 3 פעמים** ברצף: III = 3.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה זה XVI?',
        answer: 16,
        hint: 'X=10, V=5, I=1. קטן אחרי גדול — מחברים.',
        explain: '10+5+1 = 16',
      },
    },
    {
      id: 'subtract',
      emoji: '➖',
      title: 'כלל החיסור',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'קטן לפני גדול → מחסירים',
          md: 'IV = 5−1 = 4 · IX = 10−1 = 9\n\nיש רק **6** צירופים כאלה: IV (4), IX (9), XL (40), XC (90), CD (400), CM (900).',
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'למה לא IIII?',
          md: 'כי אסור 4 סמלים זהים ברצף — לכן 4 נכתב IV.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה זה XC?',
        answer: 90,
        hint: 'X (10) לפני C (100) — קטן לפני גדול.',
        explain: '100−10 = 90',
      },
    },
    {
      id: 'convert',
      emoji: '🔄',
      title: 'שלב הבוס: מתרגמים מספרים',
      blocks: [
        {
          type: 'text',
          md: 'מפרקים את המספר ל**אלפים, מאות, עשרות ויחידות**, וכותבים כל חלק בנפרד:',
        },
        {
          type: 'roman',
          caption: 'בחרו מספר וראו איך הוא נבנה:',
          value: 48,
        },
        {
          type: 'steps',
          title: 'MCMXCIV = ?',
          steps: [
            { math: m`\mathrm{M}=1000`, note: 'אלפים' },
            { math: m`\mathrm{CM}=900`, note: 'מאות (C לפני M — מחסירים)' },
            { math: m`\mathrm{XC}=90`, note: 'עשרות' },
            { math: m`\mathrm{IV}=4`, note: 'יחידות' },
            { math: m`1000+900+90+4=\textcolor{#2d7a4f}{1994}`, note: 'מחברים את החלקים.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איך כותבים 49 בספרות רומיות?',
        options: ['IL', 'XLIX', 'XXXXIX', 'XLVIIII'],
        answer: 1,
        hint: '49 = 40 + 9. איך כותבים 40? ואיך 9?',
        explain: '40 = XL, ו-9 = IX, ביחד XLIX. (IL אסור — אין צירוף כזה ברשימה)',
      },
    },
  ],
};
