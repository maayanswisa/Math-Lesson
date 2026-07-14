/**
 * Progressive hints for quiz questions.
 * Uses question.hints when present; otherwise topic/type defaults.
 */

const GENERIC = [
  'קראו את השאלה פעם נוספת לאט, ושימו לב למה בדיוק מבקשים למצוא.',
  'רשמו לצד השאלה את הנתונים הידועים ואת מה שעדיין חסר.',
  'נסו לחשוב על שאלה דומה שכבר פתרתם — איזו שיטה עבדה שם?',
];

const BY_KEYWORD = [
  {
    keys: ['frac', 'שבר', 'pizza', 'percent', 'ratio', 'אחוז'],
    hints: [
      'זכרו: המונה מציין כמה חלקים יש, והמכנה מציין מכמה חלקים מורכב השלם.',
      'אפשר לצייר את השבר כעיגול או כמלבן שמחולק לחלקים שווים.',
      'אם מדובר באחוזים — הפכו אותם לשבר עשרוני (למשל 25% = 0.25) ואז המשיכו לחשב.',
    ],
  },
  {
    keys: ['geo', 'shape', 'area', 'angle', 'trig', 'שטח', 'זווית', 'משולש'],
    hints: [
      'ציירו סקיצה של הצורה וסמנו עליה את הנתונים שכבר יש לכם.',
      'בדקו אם יש נוסחה מוכרת לשטח, להיקף או לזווית שמתאימה לצורה הזו.',
      'חפשו זוויות או צלעות שוות — הן יכולות לעזור להשלים את מה שחסר.',
    ],
  },
  {
    keys: ['algebra', 'equat', 'func', 'poly', 'signed', 'משוואה'],
    hints: [
      'העבירו איברים משני צדי המשוואה כדי לבודד את הנעלם.',
      'הקפידו לבצע את אותה פעולה בשני צידי המשוואה.',
      'הציבו את התשובה שקיבלתם בחזרה במשוואה כדי לוודא שהיא נכונה.',
    ],
  },
  {
    keys: ['stat', 'prob', 'data', 'normal', 'הסתברות', 'סטטיסטיקה'],
    hints: [
      'ספרו כמה תוצאות אפשריות יש בסך הכול, וכמה מהן מתאימות למבוקש.',
      'הסתברות מחושבת כך: מספר המקרים הרצויים חלקי מספר המקרים האפשריים.',
      'ארגנו את הנתונים בטבלה או ברשימה כדי לא לפספס אף אפשרות.',
    ],
  },
  {
    keys: ['number', 'add', 'mul', 'count', 'line'],
    hints: [
      'נסו לפרק את המספר ליחידות, עשרות ומאות כדי להקל על החישוב.',
      'אפשר להיעזר בציר המספרים כדי לספור קדימה או אחורה.',
      'בדקו את התשובה שלכם בעזרת פעולה הפוכה (למשל חיסור אחרי חיבור).',
    ],
  },
];

function matchHints(question) {
  const blob = `${question.topic_id || ''} ${question.question_text || ''} ${question.type || ''}`.toLowerCase();
  for (const row of BY_KEYWORD) {
    if (row.keys.some((k) => blob.includes(k))) return row.hints;
  }
  return GENERIC;
}

/** @returns {string[]} up to 3 hints */
export function getHintsForQuestion(question) {
  if (!question) return GENERIC;
  if (Array.isArray(question.hints) && question.hints.length) {
    return question.hints.slice(0, 3);
  }
  return matchHints(question).slice(0, 3);
}
