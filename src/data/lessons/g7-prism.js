import { c, GREEN, m, VIOLET } from './tex.js';

const PRISM = `<div class='diagram-box'><svg viewBox='0 0 260 150' width='260' xmlns='http://www.w3.org/2000/svg' style='max-width:100%'><polygon points='30,120 110,120 70,55' fill='rgba(124,77,204,0.25)' stroke='#7c4dcc' stroke-width='2.5'/><polygon points='110,120 230,95 190,30 70,55' fill='rgba(13,110,110,0.10)' stroke='#0d6e6e' stroke-width='2'/><line x1='30' y1='120' x2='150' y2='95' stroke='#0d6e6e' stroke-width='2' stroke-dasharray='5 4'/><line x1='150' y1='95' x2='230' y2='95' stroke='#7c4dcc' stroke-width='2' stroke-dasharray='5 4'/><line x1='150' y1='95' x2='190' y2='30' stroke='#7c4dcc' stroke-width='2' stroke-dasharray='5 4'/><line x1='110' y1='120' x2='230' y2='95' stroke='#0d6e6e' stroke-width='2'/><text x='62' y='110' font-size='11' font-weight='700' fill='#7c4dcc'>בסיס</text><text x='175' y='132' font-size='11' font-weight='700' fill='#0d6e6e'>גובה המנסרה</text></svg></div>`;

export default {
  id: 'g7-prism',
  topicId: 'g7-prism',
  grade: 7,
  emoji: '⛺',
  title: 'מנסרה משולשת',
  subtitle: 'גוף עם שני משולשים ושלושה מלבנים — שטח פנים ונפח',
  sections: [
    {
      id: 'parts',
      emoji: '🔎',
      title: 'איך היא בנויה?',
      blocks: [
        {
          type: 'text',
          md: m`כמו אוהל: שני **בסיסים** משולשים חופפים (מלפנים ומאחור), ושלוש **פאות צדדיות** מלבניות.

${PRISM}`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ספירה',
          md: m`$5$ פאות ($2$ משולשים + $3$ מלבנים) · $9$ מקצועות · $6$ קודקודים`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה פאות מלבניות יש למנסרה משולשת?',
        answer: 3,
        hint: 'לכל צלע של המשולש יש פאה צדדית.',
        explain: 'למשולש 3 צלעות — ולכן 3 פאות צדדיות מלבניות.',
      },
    },
    {
      id: 'volume',
      emoji: '🧊',
      title: 'נפח',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'נפח מנסרה',
          md: m`$$V=S\times h$$

**שטח הבסיס × גובה המנסרה** (המרחק בין שני הבסיסים). בדיוק כמו בתיבה — שם הבסיס מלבן.`,
        },
        {
          type: 'steps',
          title: 'בסיס: משולש ישר-זווית עם ניצבים 3 ו-4. גובה המנסרה: 10',
          steps: [
            { math: m`\frac{3\times4}{2}=${c(VIOLET, '6')}`, note: 'שטח הבסיס.' },
            { math: m`6\times10=${c(GREEN, '60')}`, note: 'נפח: 60 סמ"ק.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ק',
        prompt: 'שטח הבסיס של מנסרה משולשת הוא 12 סמ"ר, וגובה המנסרה 5 ס"מ. מה הנפח?',
        answer: 60,
        hint: m`$12\times5$`,
        explain: m`$12\times5=60$ סמ"ק.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שטח פנים',
      blocks: [
        {
          type: 'steps',
          title: 'בסיס: משולש עם צלעות 3, 4, 5 (ישר-זווית). גובה המנסרה: 10',
          steps: [
            { math: m`2\times\frac{3\times4}{2}=${c(VIOLET, '12')}`, note: 'שני הבסיסים.' },
            { math: m`(3+4+5)\times10=${c(VIOLET, '120')}`, note: 'שלושת המלבנים — היקף הבסיס כפול הגובה.' },
            { math: m`12+120=${c(GREEN, '132')}`, note: 'סמ"ר.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'סמ"ר',
        prompt: 'בסיס מנסרה: משולש שווה-צלעות עם צלע 4 ס"מ ושטח 7 סמ"ר (בקירוב). גובה המנסרה 10 ס"מ. מה שטח הפנים (בקירוב)?',
        answer: 134,
        hint: m`$2\times7+3\times(4\times10)$`,
        explain: m`$14+120=134$ סמ"ר.`,
      },
    },
  ],
};
