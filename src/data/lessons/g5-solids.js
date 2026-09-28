import { m } from './tex.js';

const SOLIDS_SVG = `<div class='diagram-box'><svg viewBox='0 0 280 130' width='280' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><polygon points='20,105 90,105 110,85 40,85' fill='rgba(13,110,110,0.1)' stroke='#0d6e6e' stroke-width='2'/><line x1='20' y1='105' x2='65' y2='15' stroke='#0d6e6e' stroke-width='2'/><line x1='90' y1='105' x2='65' y2='15' stroke='#0d6e6e' stroke-width='2'/><line x1='110' y1='85' x2='65' y2='15' stroke='#0d6e6e' stroke-width='2'/><line x1='40' y1='85' x2='65' y2='15' stroke='#0d6e6e' stroke-width='1.5' stroke-dasharray='4'/><circle cx='65' cy='15' r='4' fill='#c45c48'/><text x='65' y='124' text-anchor='middle' font-size='12' font-weight='700' fill='#1a2b3c'>פירמידה</text><polygon points='170,105 240,105 262,85 192,85' fill='rgba(196,92,72,0.1)' stroke='#c45c48' stroke-width='2'/><polygon points='170,45 240,45 262,25 192,25' fill='rgba(196,92,72,0.1)' stroke='#c45c48' stroke-width='2'/><line x1='170' y1='105' x2='170' y2='45' stroke='#c45c48' stroke-width='2'/><line x1='240' y1='105' x2='240' y2='45' stroke='#c45c48' stroke-width='2'/><line x1='262' y1='85' x2='262' y2='25' stroke='#c45c48' stroke-width='2'/><line x1='192' y1='85' x2='192' y2='25' stroke='#c45c48' stroke-width='1.5' stroke-dasharray='4'/><text x='215' y='124' text-anchor='middle' font-size='12' font-weight='700' fill='#1a2b3c'>מנסרה</text></svg></div>`;

export default {
  id: 'g5-solids',
  topicId: 'g5-solids',
  grade: 5,
  emoji: '🔷',
  title: 'גופים: פירמידות ומנסרות',
  subtitle: 'פאות, מקצועות וקודקודים — ומה ההבדל בין פירמידה למנסרה',
  sections: [
    {
      id: 'parts',
      emoji: '🏷️',
      title: 'שלושה מושגים',
      blocks: [
        {
          type: 'text',
          md: `- **פאה** — משטח שטוח של הגוף (כמו צד של קופסה).
- **מקצוע** — הקו שבו שתי פאות נפגשות.
- **קודקוד** — הנקודה שבה כמה מקצועות נפגשים.`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'קובייה לדוגמה',
          md: 'לקובייה יש **6** פאות, **12** מקצועות ו-**8** קודקודים.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה קודקודים יש לתיבה (קופסת נעליים)?',
        answer: 8,
        hint: '4 פינות למטה ו-4 למעלה.',
        explain: '4 + 4 = 8 קודקודים.',
      },
    },
    {
      id: 'kinds',
      emoji: '🔺',
      title: 'פירמידה או מנסרה?',
      blocks: [
        {
          type: 'text',
          md: m`${SOLIDS_SVG}

**פירמידה** — **בסיס אחד**, ופאות **משולשות** שנפגשות בנקודה אחת למעלה (הפסגה 🔴).

**מנסרה** — **שני בסיסים** זהים ומקבילים (למעלה ולמטה), ופאות **מלבניות** ביניהם.`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'השם לפי הבסיס',
          md: 'בסיס ריבועי → "פירמידה מרובעת". בסיס משולש → "מנסרה משולשת".',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'לגוף יש שני בסיסים משולשים ו-3 פאות מלבניות. מה הוא?',
        options: ['פירמידה משולשת', 'מנסרה משולשת', 'פירמידה מרובעת', 'קובייה'],
        answer: 1,
        hint: 'שני בסיסים + פאות מלבניות.',
        explain: 'שני בסיסים זהים ופאות מלבניות — מנסרה. הבסיס משולש — מנסרה משולשת.',
      },
    },
    {
      id: 'net',
      emoji: '🏆',
      title: 'שלב הבוס: פריסה',
      blocks: [
        {
          type: 'text',
          md: '**פריסה** = הגוף "פתוח" ושטוח על השולחן. מקפלים אותה — ומקבלים את הגוף בדיוק, בלי חורים ובלי חפיפות.',
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'איך בודקים פריסה?',
          md: 'סופרים פאות: לפירמידה מרובעת — ריבוע אחד + 4 משולשים = **5 פאות**. אם יש בפריסה יותר או פחות — היא לא נכונה.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה פאות יש לפירמידה שהבסיס שלה משושה?',
        answer: 7,
        hint: 'בסיס אחד + משולש לכל צלע של הבסיס.',
        explain: '1 בסיס + 6 משולשים = 7 פאות.',
      },
    },
  ],
};
