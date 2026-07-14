/** תוכנית לימודים — חטיבה עליונה (תכ\"ל חדשה) */

export const GRADE_LABELS = {
  1: "א'",
  2: "ב'",
  3: "ג'",
  4: "ד'",
  5: "ה'",
  6: "ו'",
  7: "ז'",
  8: "ח'",
  9: "ט'",
  10: "י'",
  11: "י\"א",
  12: "י\"ב",
};

export const UNIT_OPTIONS = [
  { units: 3, title: "3 יחידות לימוד", blurb: "אוריינות, הקשרים מציאותיים ואשכולות מדע / מרחב / פיננסי" },
  { units: 4, title: "4 יחידות לימוד", blurb: "גאומטריה משולבת, חדו״א, סטטיסטיקה והסתברות" },
  { units: 5, title: "5 יחידות לימוד", blurb: "העמקה אנליטית, הוכחות, וקטורים ומספרים מרוכבים" },
];

export const HIGH_SCHOOL_TOPICS = [
  { id: 'g10-u3-science-society', grade: 10, units: 3, cluster: 'אשכול מדע וחברה', title: 'מדע וחברה — מידע, סטטיסטיקה והסתברות', description: 'הסקת מסקנות ממידע חברתי ומדעי, ייצוגים ומעבר ביניהם, עיבוד סטטיסטי והסתברות בסיסית', sortOrder: 1 },
  { id: 'g10-u3-space', grade: 10, units: 3, cluster: 'אשכול התמצאות במישור ובמרחב', title: 'התמצאות במישור ובמרחב', description: 'היקפים, מסלולים ומהירות, שטחים, ריצופים ושילוב נושאים גאומטריים מעשיים', sortOrder: 2 },
  { id: 'g10-u3-finance', grade: 10, units: 3, cluster: 'אשכול פיננסי-כלכלי', title: 'פיננסי-כלכלי — מודל לינארי ומשימות כלכליות', description: 'הסקת מסקנות מנתונים, מודל לינארי לתופעות כלכליות, קנייה ומכירה, רווח והפסד ושכר עבודה', sortOrder: 3 },
  { id: 'g11-u3-science-exp', grade: 11, units: 3, cluster: 'אשכול מדע וחברה', title: 'מדע וחברה — גדילה ודעיכה והסתברות', description: 'תהליכים מעריכיים בהקשר מדעי-חברתי, סטיית תקן וחישוב הסתברות מתקדם', sortOrder: 1 },
  { id: 'g11-u3-space', grade: 11, units: 3, cluster: 'אשכול התמצאות במישור ובמרחב', title: 'יחס, פרופורציה, דמיון וטריגונומטריה מעשית', description: 'יחס ופרופורציה, קנה מידה במפות, דמיון משולשים וטריגונומטריה לפתרון בעיות במישור', sortOrder: 2 },
  { id: 'g11-u3-finance', grade: 11, units: 3, cluster: 'אשכול פיננסי-כלכלי', title: 'פיננסי-כלכלי — גדילה ודעיכה וסטטיסטיקה', description: 'תהליכים מעריכיים בכלכלה, סטיית תקן, רבעונים ועשירונים לעיבוד מידע פיננסי', sortOrder: 3 },
  { id: 'g12-u3-normal', grade: 12, units: 3, cluster: 'אשכול מדע וחברה / פיננסי', title: 'התפלגות נורמלית', description: 'מודל התפלגות נורמלית, ציוני תקן והערכת סיכויים בהקשרים מציאותיים', sortOrder: 1 },
  { id: 'g12-u3-quadratic-model', grade: 12, units: 3, cluster: 'אשכול מדע וחברה / פיננסי', title: 'מודל ריבועי', description: 'תיאור תהליכים ותופעות באמצעות מודל ריבועי ויישומים', sortOrder: 2 },
  { id: 'g12-u3-linear-programming', grade: 12, units: 3, cluster: 'אשכול פיננסי-כלכלי', title: 'תכנון לינארי', description: 'אילוצים לינאריים, תחום פתרונות ואופטימיזציה פשוטה בהקשר כלכלי', sortOrder: 3 },
  { id: 'g12-u3-analytic-geo', grade: 12, units: 3, cluster: 'אשכול פיננסי / מרחב', title: 'גאומטריה אנליטית — ישר', description: 'גאומטריה אנליטית של קו ישר (ללא מעגל) בהקשרים מעשיים', sortOrder: 4 },
  { id: 'g12-u3-solids', grade: 12, units: 3, cluster: 'אשכול התמצאות במישור ובמרחב', title: 'גאומטריה במרחב — גופים וראייה מרחבית', description: 'גופים במרחב, נפחים, שטח מעטפת ושטח פנים, וראייה מרחבית', sortOrder: 5 },
  { id: 'g10-u4-precalculus', grade: 10, units: 4, title: 'קדם-אנליזה וחקירת פונקציות', description: 'גרפים, חיתוכים, עלייה/ירידה וקיצון; חזרה על לינארית וריבועית', sortOrder: 1 },
  { id: 'g10-u4-poly-root', grade: 10, units: 4, title: 'חדו״א — פולינום, שורש וערך קיצון', description: 'פונקציות פולינום ושורש, חקירה ובעיות ערך קיצון', sortOrder: 2 },
  { id: 'g10-u4-analytic-geo', grade: 10, units: 4, title: 'גאומטריה אנליטית (ללא מעגל)', description: 'מערכת צירים, מרחק, שיפוע, משוואת ישר, מקבילים ומאונכים', sortOrder: 3 },
  { id: 'g10-u4-plane-geo', grade: 10, units: 4, title: 'גאומטריה במישור (ללא מעגל)', description: 'משולשים, מרובעים, דמיון, קטע אמצעים וקווים מיוחדים במשולש', sortOrder: 4 },
  { id: 'g10-u4-trig', grade: 10, units: 4, title: 'טריגונומטריה במישור', description: 'יחסים במשולש ישר-זווית, זוויות מיוחדות ושטחים', sortOrder: 5 },
  { id: 'g10-u4-stats', grade: 10, units: 4, title: 'סטטיסטיקה והסתברות', description: 'מדדי מרכז ופיזור, והסתברות בסיסית', sortOrder: 6 },
  { id: 'g11-u4-rational-root', grade: 11, units: 4, title: 'חדו״א — רציונליות, שורש וקיצון', description: 'פונקציות רציונליות ושורש, משיק ובעיות ערך קיצון', sortOrder: 1 },
  { id: 'g11-u4-integral', grade: 11, units: 4, title: 'חשבון אינטגרלי', description: 'אינטגרל כהצטברות ושטח', sortOrder: 2 },
  { id: 'g11-u4-analytic-circle', grade: 11, units: 4, title: 'גאומטריה אנליטית — כולל מעגל', description: 'ישרים ומעגל במערכת צירים', sortOrder: 3 },
  { id: 'g11-u4-plane-circle', grade: 11, units: 4, title: 'גאומטריה במישור — כולל מעגל', description: 'משפטים במעגל, זוויות ומשיקים', sortOrder: 4 },
  { id: 'g11-u4-trig-sine', grade: 11, units: 4, title: 'טריגונומטריה — משפט הסינוסים', description: 'משפט הסינוסים ויישומים במשולש כללי', sortOrder: 5 },
  { id: 'g11-u4-normal-regression', grade: 11, units: 4, title: 'התפלגות נורמלית ורגרסיה לינארית', description: 'מודל נורמלי, מקדם מתאם וקו רגרסיה', sortOrder: 6 },
  { id: 'g12-u4-exp-log', grade: 12, units: 4, title: 'חדו״א — מעריכיות ולוגריתמיות (בסיס e)', description: 'נגזרת ואינטגרל של מעריכיות ולוגריתמיות', sortOrder: 1 },
  { id: 'g12-u4-sequences', grade: 12, units: 4, title: 'סדרות', description: 'סדרה חשבונית והנדסית, סכומים ויישומים', sortOrder: 2 },
  { id: 'g12-u4-growth-decay', grade: 12, units: 4, title: 'בעיות גדילה ודעיכה', description: 'מודלים דיסקרטיים ורציפים לגדילה ודעיכה', sortOrder: 3 },
  { id: 'g12-u4-vectors', grade: 12, units: 4, title: 'וקטורים בגישה גאומטרית ואלגברית', description: 'וקטור במישור ובמרחב', sortOrder: 4 },
  { id: 'g12-u4-hypothesis', grade: 12, units: 4, title: 'סטטיסטיקה — בדיקת השערות', description: 'בדיקת השערות בהקשר סטטיסטי מעשי', sortOrder: 5 },
  { id: 'g10-u5-functions', grade: 10, units: 5, title: 'קדם-אנליזה ומשפחות פונקציות', description: 'חקירה איכותנית, טרנספורמציות, לינארית וריבועית', sortOrder: 1 },
  { id: 'g10-u5-diff-intro', grade: 10, units: 5, title: 'מבוא לחדו״א — נגזרת וקצב שינוי', description: 'נגזרת כקצב שינוי, משיק, חקירת פולינום ושורש', sortOrder: 2 },
  { id: 'g10-u5-analytic', grade: 10, units: 5, title: 'גאומטריה אנליטית — כולל מעגל', description: 'נקודות, ישרים ומשוואה קנונית של מעגל', sortOrder: 3 },
  { id: 'g10-u5-plane-geo', grade: 10, units: 5, title: 'גאומטריה במישור', description: 'משולשים ומרובעים, דמיון, קטע אמצעים ונקודות מיוחדות', sortOrder: 4 },
  { id: 'g10-u5-trig', grade: 10, units: 5, title: 'טריגונומטריה — מעגל היחידה ויחסים', description: 'מעגל היחידה / משולש ישר-זווית, זהויות ומשוואות בסיסיות', sortOrder: 5 },
  { id: 'g11-u5-sequences-induction', grade: 11, units: 5, title: 'סדרות ואינדוקציה מתמטית', description: 'סדרה חשבונית והנדסית ואינדוקציה ככלי הוכחה', sortOrder: 1 },
  { id: 'g11-u5-differential', grade: 11, units: 5, title: 'חשבון דיפרנציאלי מתקדם', description: 'השתנות קצב השינוי ופונקציות עם שורשים', sortOrder: 2 },
  { id: 'g11-u5-integral', grade: 11, units: 5, title: 'חשבון אינטגרלי — פונקציית הצטברות', description: 'אינטגרל כהצטברות, שטחים ויישומים', sortOrder: 3 },
  { id: 'g11-u5-trig-advanced', grade: 11, units: 5, title: 'טריגונומטריה — זהויות, משוואות ופונקציות', description: 'זהויות, פונקציות טריגונומטריות וגרפיהן', sortOrder: 4 },
  { id: 'g11-u5-trig-calc', grade: 11, units: 5, title: 'חדו״א של פונקציות טריגונומטריות', description: 'נגזרת ואינטגרל של פונקציות טריגונומטריות', sortOrder: 5 },
  { id: 'g11-u5-probability', grade: 11, units: 5, title: 'הסתברות', description: 'הסתברות קומבינטורית ומודלית ויישומים', sortOrder: 6 },
  { id: 'g12-u5-analytic-hyperbola', grade: 12, units: 5, title: 'הנדסה אנליטית — כולל היפרבולה', description: 'חרוטים אנליטיים בדגש על היפרבולה', sortOrder: 1 },
  { id: 'g12-u5-vectors', grade: 12, units: 5, title: 'וקטורים וטריגונומטריה במרחב', description: 'וקטורים, גופים וטריגונומטריה במרחב', sortOrder: 2 },
  { id: 'g12-u5-complex', grade: 12, units: 5, title: 'מספרים מרוכבים', description: 'ייצוג אלגברי וקוטבי, פעולות ושימושים', sortOrder: 3 },
  { id: 'g12-u5-exp-log', grade: 12, units: 5, title: 'חדו״א — מעריכיות ולוגריתמיות', description: 'חקירה, נגזרת ואינטגרל של מעריכיות ולוגריתמיות', sortOrder: 4 },
];

export function getTopics(grade, units) {
  return HIGH_SCHOOL_TOPICS
    .filter((t) => t.grade === Number(grade) && t.units === Number(units))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getTopicById(topicId) {
  return HIGH_SCHOOL_TOPICS.find((t) => t.id === topicId) ?? null;
}

export function isHighSchool(grade) {
  const g = Number(grade);
  return g >= 10 && g <= 12;
}
