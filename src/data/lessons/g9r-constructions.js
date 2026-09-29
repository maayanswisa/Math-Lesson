const BISECTOR_SVG = `<div class='diagram-box'><svg viewBox='0 0 240 150' width='240' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><line x1='40' y1='75' x2='200' y2='75' stroke='#0d6e6e' stroke-width='3'/><circle cx='40' cy='75' r='4' fill='#1a2b3c'/><circle cx='200' cy='75' r='4' fill='#1a2b3c'/><path d='M 150 20 A 100 100 0 0 0 150 130' fill='none' stroke='#7c4dcc' stroke-width='1.5' stroke-dasharray='4 3'/><path d='M 90 20 A 100 100 0 0 1 90 130' fill='none' stroke='#7c4dcc' stroke-width='1.5' stroke-dasharray='4 3'/><line x1='120' y1='8' x2='120' y2='142' stroke='#c45c48' stroke-width='3'/><circle cx='120' cy='22' r='4' fill='#c45c48'/><circle cx='120' cy='128' r='4' fill='#c45c48'/><rect x='120' y='63' width='12' height='12' fill='none' stroke='#c45c48' stroke-width='1.5'/></svg></div>`;

export default {
  id: 'g9r-constructions',
  topicId: 'g9r-constructions',
  grade: 9,
  emoji: '🧭',
  title: 'בניות בסרגל ומחוגה',
  subtitle: 'העתקה, אנך אמצעי, חציית זווית — ומתי הבנייה יחידה',
  sections: [
    {
      id: 'tools',
      emoji: '🧰',
      title: 'שני כלים בלבד',
      blocks: [
        {
          type: 'text',
          md: '**סרגל ללא שנתות** — רק לשרטוט קו ישר (לא למדידה!).\n\n**מחוגה** — לשרטוט מעגלים, ולהעתקת אורכים.',
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'למה בלי שנתות?',
          md: 'כי בגאומטריה רוצים בנייה **מדויקת** שמוכיחים אותה — לא מדידה שיש בה טעות.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'בבנייה גאומטרית, איך מעתיקים קטע באורך מסוים?',
        options: ['מודדים בסרגל', 'פותחים את המחוגה לאורך הקטע ומעבירים', 'מעריכים בעין', 'עם מד-זווית'],
        answer: 1,
        hint: 'בסרגל אין שנתות.',
        explain: 'פותחים את המחוגה בדיוק לאורך הקטע, ומסמנים את אותו אורך במקום אחר.',
      },
    },
    {
      id: 'bisector',
      emoji: '✂️',
      title: 'אנך אמצעי',
      blocks: [
        {
          type: 'text',
          md: `מעגל מכל קצה של הקטע, **באותו רדיוס** (גדול מחצי הקטע). מחברים את שתי נקודות החיתוך — וזה האנך האמצעי: עובר **באמצע** הקטע, ו**מאונך** לו.

${BISECTOR_SVG}`,
        },
        {
          type: 'card',
          tone: 'why',
          title: 'למה זה עובד?',
          md: 'כל נקודת חיתוך נמצאת **באותו מרחק** משני הקצוות — והישר שעובר דרך שתיהן הוא האנך האמצעי. (מוכיחים בחפיפת משולשים)',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'נקודה על האנך האמצעי של קטע AB נמצאת:',
        options: ['קרוב יותר ל-A', 'קרוב יותר ל-B', 'באותו מרחק מ-A ומ-B', 'על הקטע AB'],
        answer: 2,
        hint: 'בשביל מה בכלל בנינו אותו?',
        explain: 'כל נקודה על האנך האמצעי שווה-מרחק משני קצות הקטע.',
      },
    },
    {
      id: 'unique',
      emoji: '🏆',
      title: 'שלב הבוס: מתי הבנייה יחידה?',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'לפי משפטי החפיפה',
          md: 'אם הנתונים תואמים **משפט חפיפה** (צ.צ.צ, צ.ז.צ, ז.צ.ז) — יש רק משולש **אחד** (עד כדי חפיפה).',
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'חסר או עודף',
          md: '**מעט מדי** נתונים — אפשר לבנות כמה משולשים שונים.\n\n**נתונים סותרים** (כמו 3, 4, 9) — אי אפשר לבנות בכלל.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'נתונות רק שתי צלעות: 5 ו-7. כמה משולשים שונים אפשר לבנות?',
        options: ['אף אחד', 'אחד בלבד', 'הרבה — חסר נתון', 'בדיוק שניים'],
        answer: 2,
        hint: 'איזה משפט חפיפה מתאים לשתי צלעות בלבד?',
        explain: 'חסרה הזווית שביניהן (או צלע שלישית) — אפשר "לפתוח" את הזווית ולקבל הרבה משולשים.',
      },
    },
  ],
};
