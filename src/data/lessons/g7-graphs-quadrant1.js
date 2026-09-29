import { m } from './tex.js';

// גרף מרחק-זמן של טיול: 0→0, 1→4, 2→8, 3→8 (הפסקה), 4→12
const PTS = [
  [0, 0],
  [1, 4],
  [2, 8],
  [3, 8],
  [4, 12],
];
const gx = (t) => 40 + t * 55;
const gy = (d) => 180 - d * 12.5;
const WALK = `<div class='diagram-box'><svg viewBox='0 0 310 210' width='310' xmlns='http://www.w3.org/2000/svg' style='direction:ltr;max-width:100%'>${[0, 1, 2, 3, 4]
  .map((t) => `<line x1='${gx(t)}' y1='${gy(0)}' x2='${gx(t)}' y2='${gy(12)}' stroke='#e3e8ee'/><text x='${gx(t)}' y='${gy(0) + 15}' font-size='11' text-anchor='middle' fill='#4a5d73'>${t}</text>`)
  .join('')}${[0, 4, 8, 12]
  .map((d) => `<line x1='${gx(0)}' y1='${gy(d)}' x2='${gx(4)}' y2='${gy(d)}' stroke='#e3e8ee'/><text x='${gx(0) - 7}' y='${gy(d) + 4}' font-size='11' text-anchor='end' fill='#4a5d73'>${d}</text>`)
  .join('')}<line x1='${gx(0)}' y1='${gy(0)}' x2='${gx(4) + 10}' y2='${gy(0)}' stroke='#1a2b3c' stroke-width='2'/><line x1='${gx(0)}' y1='${gy(0)}' x2='${gx(0)}' y2='${gy(12) - 10}' stroke='#1a2b3c' stroke-width='2'/><polyline points='${PTS.map(([t, d]) => `${gx(t)},${gy(d)}`).join(' ')}' fill='none' stroke='#0d6e6e' stroke-width='3.5'/>${PTS.map(([t, d]) => `<circle cx='${gx(t)}' cy='${gy(d)}' r='4.5' fill='#7c4dcc'/>`).join('')}<text x='${gx(4) + 14}' y='${gy(0) + 4}' font-size='11' font-weight='700' fill='#1a2b3c'>שעות</text><text x='${gx(0) + 6}' y='${gy(12) - 6}' font-size='11' font-weight='700' fill='#1a2b3c'>ק"מ</text></svg></div>`;

const TD = "style='padding:4px 10px;border:1px solid #dde'";
const TABLE = `<div class='diagram-box'><table dir='ltr' style='border-collapse:collapse;text-align:center;font-weight:700'><tr><td ${TD}>שעות</td>${PTS.map(([t]) => `<td ${TD}>${t}</td>`).join('')}</tr><tr><td ${TD}>ק"מ</td>${PTS.map(([, d]) => `<td ${TD}>${d}</td>`).join('')}</tr></table></div>`;

export default {
  id: 'g7-graphs-quadrant1',
  topicId: 'g7-graphs-quadrant1',
  grade: 7,
  emoji: '📈',
  title: 'נקודות על גרף ברביע הראשון',
  subtitle: 'מסמנים נקודות, קוראים גרף, ועוברים בין טבלה לגרף',
  sections: [
    {
      id: 'plot',
      emoji: '📍',
      title: 'מסמנים נקודה',
      blocks: [
        {
          type: 'text',
          md: m`כל נקודה מתוארת בזוג מספרים $(x,y)$: **קודם** $x$ — כמה זזים ימינה, **אחר כך** $y$ — כמה עולים למעלה. ברביע הראשון שני המספרים חיוביים.`,
        },
        {
          type: 'coords',
          firstOnly: true,
          range: 8,
          x: 3,
          y: 5,
          caption: 'הזיזו את הנקודה. שימו לב לקווים המקווקווים — הם "הדרך" מהצירים לנקודה:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מתחילים בראשית, זזים $6$ ימינה ו-$2$ למעלה. איזו נקודה הגענו?`,
        options: [m`$(2,6)$`, m`$(6,2)$`, m`$(8,0)$`, m`$(6,6)$`],
        answer: 1,
        hint: m`ימינה זה $x$, והוא נכתב ראשון.`,
        explain: m`$x=6$ (ימינה), $y=2$ (למעלה): $(6,2)$.`,
      },
    },
    {
      id: 'table',
      emoji: '🗂️',
      title: 'מטבלה לגרף',
      blocks: [
        {
          type: 'text',
          md: m`טליה יצאה לטיול. הטבלה מראה כמה קילומטרים עברה אחרי כל שעה:

${TABLE}

כל עמודה בטבלה היא **נקודה אחת** בגרף:

${WALK}`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שני ייצוגים — אותו מידע',
          md: m`העמודה "2 שעות, 8 ק"מ" בטבלה היא הנקודה $(2,8)$ בגרף.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'בין שעה 2 לשעה 3 הקו בגרף אופקי. מה קרה?',
        options: ['טליה רצה מהר', 'טליה עצרה להפסקה', 'טליה חזרה אחורה', 'הגרף שגוי'],
        answer: 1,
        hint: 'הזמן עבר, אבל כמה קילומטרים נוספו?',
        explain: 'המרחק נשאר 8 ק"מ — הזמן עבר אבל היא לא התקדמה: הפסקה.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: קוראים גרף',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'איך קוראים ערך',
          md: m`רוצים לדעת את $y$ עבור $x$ מסוים? עולים **אנכית** מ-$x$ עד שפוגשים את הקו, ומשם הולכים **אופקית** לציר $y$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ק"מ',
        prompt: 'לפי הגרף של טליה, כמה קילומטרים עברה אחרי 4 שעות?',
        answer: 12,
        hint: 'מצאו את הנקודה שמעל 4 בציר הזמן.',
        explain: m`הנקודה $(4,12)$ — 12 ק"מ.`,
      },
    },
  ],
};
