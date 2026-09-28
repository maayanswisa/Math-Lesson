import { m } from './tex.js';

/** שני משולשים עם סימוני חפיפה; marks = אילו חלקים מסומנים (צלעות s1..s3, זוויות a1..a3). */
const pair = (marks, label) => {
  const tri = (dx) => {
    const P = [
      [dx + 20, 110],
      [dx + 120, 110],
      [dx + 55, 25],
    ];
    const side = (i, j, n) => {
      const [x1, y1] = P[i];
      const [x2, y2] = P[j];
      const len = Math.hypot(x2 - x1, y2 - y1);
      const [ux, uy] = [(x2 - x1) / len, (y2 - y1) / len]; // לאורך הצלע
      const [nx, ny] = [-uy, ux]; // ניצב לצלע
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      return Array.from({ length: n }, (_, k) => {
        const off = (k - (n - 1) / 2) * 5;
        const cx = mx + ux * off;
        const cy = my + uy * off;
        return `<line x1='${cx - nx * 6}' y1='${cy - ny * 6}' x2='${cx + nx * 6}' y2='${cy + ny * 6}' stroke='#c45c48' stroke-width='2.5'/>`;
      }).join('');
    };
    const angle = (i, r, color) => `<circle cx='${P[i][0]}' cy='${P[i][1]}' r='${r}' fill='none' stroke='${color}' stroke-width='2.5' clip-path='url(#tri${dx})'/>`;
    let out = `<clipPath id='tri${dx}'><polygon points='${P.map((p) => p.join(',')).join(' ')}'/></clipPath>`;
    out += `<polygon points='${P.map((p) => p.join(',')).join(' ')}' fill='rgba(13,110,110,0.06)' stroke='#0d6e6e' stroke-width='2.5'/>`;
    if (marks.includes('s1')) out += side(0, 1, 1);
    if (marks.includes('s2')) out += side(1, 2, 2);
    if (marks.includes('s3')) out += side(0, 2, 3);
    if (marks.includes('a1')) out += angle(0, 18, '#7c4dcc');
    if (marks.includes('a2')) out += angle(1, 18, '#1670b3');
    if (marks.includes('a3')) out += angle(2, 16, '#e2a020');
    return out;
  };
  return `<div class='diagram-box'><svg viewBox='0 0 300 130' width='300' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'>${tri(0)}${tri(150)}<text x='150' y='126' text-anchor='middle' font-size='13' font-weight='700' fill='#0a5555'>${label}</text></svg></div>`;
};

export default {
  id: 'g8-congruence',
  topicId: 'g8-congruence',
  grade: 8,
  emoji: '👯',
  title: 'חפיפת משולשים',
  subtitle: 'מתי שני משולשים זהים לגמרי — ואיך מוכיחים את זה בלי למדוד הכול',
  sections: [
    {
      id: 'what',
      emoji: '🪞',
      title: 'מה זה משולשים חופפים?',
      blocks: [
        {
          type: 'text',
          md: m`שני משולשים **חופפים** אם אפשר להניח אחד על השני והם מתכסים **בדיוק** — כל 3 הצלעות וכל 3 הזוויות שוות.

החדשות הטובות: **לא צריך לבדוק את כל 6**. מספיק 3 נתונים נכונים — לפי **משפט חפיפה**.`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'איך קוראים את הסימונים',
          md: m`צלעות עם **אותו מספר קווקווים** שוות. זוויות עם **אותה קשת** שוות.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה נתונים (צלעות וזוויות) יש בסך הכול במשולש?',
        answer: 6,
        hint: 'כמה צלעות? כמה זוויות?',
        explain: '3 צלעות + 3 זוויות = 6. משפטי החפיפה חוסכים לנו לבדוק את כולם.',
      },
    },
    {
      id: 'theorems',
      emoji: '📜',
      title: 'שלושת משפטי החפיפה',
      blocks: [
        {
          type: 'text',
          md: m`**צ.צ.צ** — שלוש צלעות שוות בהתאמה:

${pair(['s1', 's2', 's3'], 'צ.צ.צ')}

**צ.ז.צ** — שתי צלעות **והזווית שביניהן**:

${pair(['s1', 's3', 'a1'], 'צ.ז.צ')}

**ז.צ.ז** — שתי זוויות **והצלע שביניהן**:

${pair(['a1', 'a2', 's1'], 'ז.צ.ז')}`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'המילה החשובה: "שביניהן"',
          md: m`ב-צ.ז.צ הזווית חייבת להיות **בין** שתי הצלעות. שתי צלעות וזווית שאינה ביניהן — **לא** מספיק!`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'ידוע ששתי צלעות שוות, וגם הזווית שנמצאת **ביניהן** שווה. לפי איזה משפט המשולשים חופפים?',
        options: ['צ.צ.צ', 'צ.ז.צ', 'ז.צ.ז', 'אי אפשר לדעת'],
        answer: 1,
        hint: 'צלע, זווית, צלע — בסדר הזה.',
        explain: 'שתי צלעות והזווית שביניהן — צ.ז.צ.',
      },
    },
    {
      id: 'right',
      emoji: '📐',
      title: 'משולש ישר-זווית: עוד משפט',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'יתר וניצב',
          md: m`בשני משולשים **ישרי-זווית**: אם **היתר** שווה ו**ניצב** אחד שווה — הם חופפים.

(הזווית הישרה כבר ידועה, ובזכות פיתגורס גם הניצב השני יוצא שווה.)`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'בשני משולשים ישרי-זווית היתר שווה (10 ס"מ) וניצב אחד שווה (6 ס"מ). מה נכון?',
        options: ['הם חופפים', 'הם לא חופפים', 'אי אפשר לדעת בלי זווית נוספת', 'רק אם גם הניצב השני נתון'],
        answer: 0,
        hint: 'יש משפט חפיפה מיוחד למשולשים ישרי-זווית.',
        explain: 'יתר + ניצב במשולש ישר-זווית מספיקים לחפיפה (וגם הניצב השני הוא 8 בשניהם).',
      },
    },
    {
      id: 'proof',
      emoji: '🏆',
      title: 'שלב הבוס: הוכחה קטנה',
      blocks: [
        {
          type: 'text',
          md: m`הוכחה = שרשרת של טענות, ולכל טענה **נימוק**. זה המבנה:`,
        },
        {
          type: 'steps',
          title: m`$AB=AC$, ו-$AD$ חוצה את זווית $A$. הוכיחו: $\triangle ABD\cong\triangle ACD$`,
          steps: [
            { math: m`AB=AC`, note: 'נתון.' },
            { math: m`\angle BAD=\angle CAD`, note: m`$AD$ חוצה זווית (נתון).` },
            { math: m`AD=AD`, note: 'צלע משותפת לשני המשולשים.' },
            { math: m`\triangle ABD\cong\triangle ACD`, note: '**צ.ז.צ** — ✔️ הוכחנו!' },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'טריק שכדאי לזכור',
          md: m`**צלע משותפת** ו**זוויות קודקודיות** הן "נתונים חינם" — הם שווים תמיד.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`בהוכחה, מה הנימוק לכך ש-$AD=AD$?`,
        options: ['נתון', 'צלע משותפת', 'זוויות קודקודיות', 'צ.ז.צ'],
        answer: 1,
        hint: 'זו אותה צלע בדיוק, בשני המשולשים.',
        explain: m`$AD$ שייכת לשני המשולשים — צלע משותפת.`,
      },
    },
  ],
};
