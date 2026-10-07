/**
 * טיפים למחשבון מדעי. לכל טיפ — צעדים לשני דגמים נפוצים:
 * es = Casio fx-991ES PLUS, ex = Casio fx-991EX (ClassWiz). כשהצעדים זהים — shared.
 * כל צעד: { text, keys } — keys הם המקשים הפיזיים, לפי הסדר.
 * התוצאות בדוגמאות מחושבות כאן בקוד, כדי שלא יהיו שגיאות הקלדה.
 */
import { normalCdf } from '../lib/normal';

const r = (x, p = 4) => Number(x.toFixed(p));
const deg = (rad) => (rad * 180) / Math.PI;

export const MODELS = [
  { id: 'es', label: 'fx-991ES PLUS' },
  { id: 'ex', label: 'fx-991EX ClassWiz' },
];

export const CATEGORIES = [
  { id: 'basics', label: 'הגדרות וכללי זהב', emoji: '⚙️' },
  { id: 'calc', label: 'חישובים', emoji: '🔢' },
  { id: 'trig', label: 'זוויות וטריגו', emoji: '📐' },
  { id: 'equations', label: 'משוואות', emoji: '⚖️' },
  { id: 'stats', label: 'סטטיסטיקה והסתברות', emoji: '📊' },
  { id: 'calculus', label: 'נגזרות ואינטגרלים', emoji: '∫' },
];

export const TIPS = [
  {
    id: 'degrees',
    category: 'basics',
    title: 'מצב מעלות (Deg) — לפני כל תרגיל בזוויות',
    why: 'אם המחשבון במצב רדיאנים, כל חישוב של sin, cos, tan ייצא שגוי.',
    steps: {
      es: [{ text: 'נכנסים להגדרות ובוחרים Deg', keys: ['SHIFT', 'MODE', '3'] }],
      ex: [{ text: 'נכנסים להגדרות, בוחרים Angle Unit ואז Degree', keys: ['SHIFT', 'MENU', '2', '1'] }],
    },
    example: { task: 'sin 30', result: '0.5', note: `אם יצא ${r(Math.sin(30), 3)} — המחשבון ברדיאנים!` },
    grades: 'ט׳–י״ב',
  },
  {
    id: 'reset',
    category: 'basics',
    title: 'איפוס מלא כשהמחשבון "מתנהג מוזר"',
    why: 'מחזיר את כל ההגדרות לברירת המחדל (שימו לב: אחרי איפוס חוזרים למצב מעלות).',
    steps: {
      es: [{ text: 'תפריט ניקוי, בוחרים All ומאשרים', keys: ['SHIFT', '9', '3', '=', 'AC'] }],
      ex: [{ text: 'תפריט ניקוי, בוחרים Initialize All ומאשרים', keys: ['SHIFT', '9', '3', '=', 'AC'] }],
    },
    grades: 'כולם',
  },
  {
    id: 'negative',
    category: 'basics',
    title: 'מינוס של מספר שלילי ≠ מקש החיסור',
    why: 'למספר שלילי משתמשים במקש (−). ובחזקה — חובה סוגריים!',
    shared: [
      { text: 'מספר שלילי בריבוע: סוגריים, מינוס, מספר, סוגריים, ריבוע', keys: ['(', '(−)', '3', ')', 'x²'] },
    ],
    example: { task: '(−3)²  ,  −3²', result: `${(-3) ** 2}  ,  ${-(3 ** 2)}` },
    grades: 'ז׳–י״ב',
  },
  {
    id: 'fractions',
    category: 'calc',
    title: 'שברים ומעבר לעשרוני',
    why: 'המחשבון מחשב בשברים מדויקים. מקש S⇔D מחליף בין שבר לעשרוני.',
    shared: [
      { text: 'מקלידים שבר בעזרת מקש השבר', keys: ['□/□', '3', '▼', '4'] },
      { text: 'מעבר בין שבר לעשרוני', keys: ['S⇔D'] },
    ],
    example: { task: '3/4 + 5/6', result: `19/12 ⇔ ${r(19 / 12)}` },
    grades: 'ה׳–י״ב',
  },
  {
    id: 'memory',
    category: 'calc',
    title: 'שמירת תוצאה בזיכרון (A, B…)',
    why: 'כך לא מעגלים באמצע — שומרים את התוצאה המדויקת ומשתמשים בה בהמשך.',
    shared: [
      { text: 'שמירת התוצאה האחרונה ב-A (STO ואז המקש שעליו A)', keys: ['SHIFT', 'RCL', '(−)'] },
      { text: 'שימוש ב-A בתרגיל', keys: ['ALPHA', '(−)'] },
      { text: 'או: התוצאה הקודמת תמיד שמורה במקש', keys: ['Ans'] },
    ],
    grades: 'ח׳–י״ב',
  },
  {
    id: 'log',
    category: 'calc',
    title: 'לוגריתם בכל בסיס',
    why: 'יש מקש לוגריתם עם בסיס — לא צריך לחלק ln בן ln.',
    shared: [{ text: 'מקש log עם שתי משבצות: בסיס, ואז המספר', keys: ['log□□', '2', '▶', '8'] }],
    example: { task: 'log₂ 8', result: String(Math.log2(8)) },
    grades: 'י׳–י״ב',
  },
  {
    id: 'inverse-trig',
    category: 'trig',
    title: 'מציאת זווית מצלעות (sin⁻¹, cos⁻¹, tan⁻¹)',
    why: 'כשיודעים יחס בין צלעות ורוצים את הזווית — משתמשים בפונקציה ההפוכה.',
    shared: [
      { text: 'למשל זווית שה-sin שלה 3/5', keys: ['SHIFT', 'sin', '3', '÷', '5', ')', '='] },
      { text: 'הצגה במעלות-דקות-שניות', keys: ["°'\""] },
    ],
    example: { task: 'מול הזווית 3, יתר 5', result: `≈ ${r(deg(Math.asin(0.6)), 2)}°` },
    grades: 'ט׳–י״ב',
  },
  {
    id: 'cosine-law',
    category: 'trig',
    title: 'זווית ממשפט הקוסינוסים — בשורה אחת',
    why: 'מקלידים את כל הביטוי בתוך cos⁻¹ עם סוגריים — בלי לעגל בדרך.',
    shared: [
      { text: 'פותחים cos⁻¹ ומקלידים את המונה בסוגריים: (a² + b² − c²)', keys: ['SHIFT', 'cos', '(', '5', 'x²', '+', '6', 'x²', '−', '7', 'x²', ')'] },
      { text: 'מחלקים ב-(2ab), סוגרים ו-=', keys: ['÷', '(', '2', '×', '5', '×', '6', ')', ')', '='] },
    ],
    example: { task: 'צלעות 5, 6 והזווית מול 7', result: `≈ ${r(deg(Math.acos((25 + 36 - 49) / 60)), 2)}°` },
    grades: 'י׳–י״ב',
  },
  {
    id: 'quadratic',
    category: 'equations',
    title: 'פתרון משוואה ריבועית אוטומטית',
    why: 'מכניסים רק את המקדמים a, b, c — והמחשבון נותן את שני הפתרונות. מעולה לבדיקה!',
    steps: {
      es: [
        { text: 'מצב משוואות, ובוחרים aX²+bX+c=0', keys: ['MODE', '5', '3'] },
        { text: 'מקדמים: a, b, c (אחרי כל אחד =), ואז = לפתרונות', keys: ['1', '=', '(−)', '5', '=', '6', '=', '='] },
      ],
      ex: [
        { text: 'MENU, עוברים עם החצים לסמל Equation/Func ולוחצים =, ואז Polynomial ומעלה 2', keys: ['MENU', '▶', '=', '2', '2'] },
        { text: 'מקדמים: a, b, c (אחרי כל אחד =), ואז = לפתרונות', keys: ['1', '=', '(−)', '5', '=', '6', '=', '='] },
      ],
    },
    example: { task: 'x² − 5x + 6 = 0', result: 'x₁ = 3, x₂ = 2', note: 'מופיע i? — אין פתרון ממשי.' },
    grades: 'ט׳–י״ב',
  },
  {
    id: 'system',
    category: 'equations',
    title: 'מערכת של שתי משוואות',
    why: 'כותבים כל משוואה בצורה ax + by = c ומכניסים את המקדמים.',
    steps: {
      es: [{ text: 'מצב משוואות, ובוחרים שני נעלמים', keys: ['MODE', '5', '1'] }],
      ex: [{ text: 'MENU, עוברים עם החצים לסמל Equation/Func ולוחצים =, ואז Simul Equation ו-2 נעלמים', keys: ['MENU', '▶', '=', '1', '2'] }],
    },
    example: { task: '2x + y = 7, x − y = 2', result: 'x = 3, y = 1' },
    grades: 'ח׳–י״ב',
  },
  {
    id: 'solve',
    category: 'equations',
    title: 'SOLVE — פתרון כל משוואה (גם עם חזקות ו-log)',
    why: 'המחשבון מחפש פתרון מספרי. את סימן השוויון שבתוך המשוואה מקלידים עם ALPHA ואז CALC — לא עם המקש =',
    shared: [
      { text: 'מקלידים את המשוואה (סימן השוויון: ALPHA ואז CALC)', keys: ['2', 'x■', 'X', '▶', 'ALPHA', 'CALC', '2', '0'] },
      { text: 'SOLVE ואישור', keys: ['SHIFT', 'CALC', '='] },
    ],
    example: { task: '2ˣ = 20', result: `x ≈ ${r(Math.log2(20))}`, note: 'ב-ES PLUS ה-X הוא ALPHA ). ב-EX יש מקש x.' },
    grades: 'י׳–י״ב',
  },
  {
    id: 'calc-check',
    category: 'equations',
    title: 'CALC — הצבה מהירה לבדיקת תשובה',
    why: 'מקלידים ביטוי עם X פעם אחת, ומציבים בו כמה ערכים שרוצים.',
    shared: [{ text: 'מקלידים ביטוי, לוחצים CALC, מקלידים ערך ו-=', keys: ['CALC', '3', '='] }],
    example: { task: 'הצבת x = 3 ב- x² − 5x + 6', result: String(9 - 15 + 6), note: 'יצא 0 — אז 3 באמת פתרון.' },
    grades: 'ח׳–י״ב',
  },
  {
    id: 'mean-sd',
    category: 'stats',
    title: 'ממוצע וסטיית תקן',
    why: 'מכניסים את הנתונים לטבלה — והמחשבון מחשב הכל.',
    steps: {
      es: [
        { text: 'מצב סטטיסטיקה, בוחרים 1-VAR ומקלידים את הנתונים (= אחרי כל אחד)', keys: ['MODE', '3', '1'] },
        { text: 'ממוצע: תפריט STAT, ואז Var ואז x̄', keys: ['AC', 'SHIFT', '1', '4', '2', '='] },
        { text: 'סטיית תקן: תפריט STAT, ואז Var ואז σx', keys: ['AC', 'SHIFT', '1', '4', '3', '='] },
      ],
      ex: [
        { text: 'MENU, בוחרים Statistics ואז 1-Variable, ומקלידים את הנתונים', keys: ['MENU', '6', '1'] },
        { text: 'AC, ואז OPTN ובוחרים בתפריט 1-Variable Calc — מוצגים הממוצע (x̄) וסטיית התקן (σx)', keys: ['AC', 'OPTN'] },
      ],
    },
    example: (() => {
      const d = [4, 7, 7, 9, 13];
      const mean = d.reduce((s, x) => s + x, 0) / d.length;
      const sd = Math.sqrt(d.reduce((s, x) => s + (x - mean) ** 2, 0) / d.length);
      return { task: d.join(', '), result: `x̄ = ${mean}, σx ≈ ${r(sd)}` };
    })(),
    grades: 'ט׳–י״ב',
  },
  {
    id: 'combinatorics',
    category: 'stats',
    title: 'צירופים, תמורות ועצרת',
    why: 'nCr — בחירה בלי חשיבות לסדר; nPr — עם סדר; x! — עצרת.',
    shared: [
      { text: 'nCr', keys: ['1', '0', 'SHIFT', '÷', '3', '='] },
      { text: 'nPr', keys: ['SHIFT', '×'] },
      { text: 'עצרת x!', keys: ['5', 'SHIFT', 'x⁻¹', '='] },
    ],
    example: { task: '10C3 · 5!', result: '120 · 120' },
    grades: 'י״א–י״ב',
  },
  {
    id: 'normal',
    category: 'stats',
    title: 'התפלגות נורמלית — בלי טבלה',
    why: 'המחשבון נותן את השטח מתחת לעקומה.',
    steps: {
      es: [
        { text: 'מצב 1-VAR, ואז תפריט STAT, בוחרים Distr ואז את הפונקציה P', keys: ['MODE', '3', '1', 'AC', 'SHIFT', '1', '5', '1'] },
        { text: 'מקלידים את z (המחושב: (x − μ) ÷ σ) וסוגרים', keys: ['1', '.', '5', ')', '='] },
      ],
      ex: [{ text: 'MENU, בוחרים Distribution ואז Normal CD. מקלידים גבול תחתון (מספר שלילי גדול, כמו מינוס 1000), גבול עליון, σ ו-μ', keys: ['MENU', '7', '2'] }],
    },
    example: { task: 'μ = 70, σ = 10, P(X < 85)', result: `≈ ${r(normalCdf(1.5))}` },
    grades: 'י״א–י״ב',
  },
  {
    id: 'derivative',
    category: 'calculus',
    title: 'ערך נגזרת בנקודה',
    why: 'מעולה לבדוק שיפוע משיק או אם נגזרת שחישבתם נכונה.',
    shared: [
      { text: 'פותחים d/dx (SHIFT ואז מקש האינטגרל) ומקלידים את הפונקציה', keys: ['SHIFT', '∫□'] },
      { text: 'עוברים בחץ ימינה לשדה x= , מקלידים את הנקודה ו-=', keys: ['▶', '2', '='] },
    ],
    example: { task: "f(x) = x³ − 2x, f'(2)", result: String(3 * 4 - 2) },
    grades: 'י״א–י״ב',
  },
  {
    id: 'integral',
    category: 'calculus',
    title: 'אינטגרל מסוים — בדיקת שטח',
    why: 'בודקים את התשובה של חישוב שטח בין גרפים.',
    shared: [
      { text: 'מקש האינטגרל, ומקלידים את הפונקציה', keys: ['∫□', 'X', 'x²'] },
      { text: 'עוברים עם החצים לגבול התחתון ולעליון, ו-=', keys: ['▶', '0', '▶', '2', '='] },
    ],
    example: { task: '∫₀² x² dx', result: `8/3 ≈ ${r(8 / 3)}` },
    grades: 'י״א–י״ב',
  },
];
