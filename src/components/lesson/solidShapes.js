/**
 * עזרים לשרטוט גליל וחרוט במבט מעט מלמעלה: עיגול נראה כאליפסה שגובהה K מרוחבה.
 * ציר y של המסך יורד, ולכן "מעל" הוא y קטן יותר.
 */
export const K = 0.32;

export const PI_APPROX = 3.14;

/** חצי אליפסה: 'front' — החצי הקדמי (התחתון במסך), 'back' — האחורי (העליון). */
export function halfEllipse(cx, cy, rx, ry, part) {
  return `M${cx - rx} ${cy} A${rx} ${ry} 0 0 ${part === 'front' ? 0 : 1} ${cx + rx} ${cy}`;
}

/** המעטפת הנראית של גליל (מלבן עם קשתות קדמיות למעלה ולמטה). */
export function cylinderSide(cx, bottom, rx, ry, height) {
  const top = bottom - height;
  return `M${cx - rx} ${top} L${cx - rx} ${bottom} A${rx} ${ry} 0 0 0 ${cx + rx} ${bottom} L${cx + rx} ${top} A${rx} ${ry} 0 0 1 ${cx - rx} ${top} Z`;
}

/**
 * נקודות ההשקה של קווי המתאר של חרוט: מהקודקוד (בגובה height מעל מרכז הבסיס)
 * אל אליפסת הבסיס. מחזיר את ההיסט [x, y] מהמרכז של הנקודה הימנית.
 */
export function coneTangent(rx, ry, height) {
  const y = -(ry * ry) / height;
  return [rx * Math.sqrt(Math.max(0, 1 - (y / ry) ** 2)), y];
}

/** המעטפת הנראית של חרוט: קודקוד, קו מתאר ימני, הקשת הקדמית, וקו מתאר שמאלי. */
export function coneSide(cx, base, rx, ry, height) {
  const [tx, ty] = coneTangent(rx, ry, height);
  return `M${cx} ${base - height} L${cx + tx} ${base + ty} A${rx} ${ry} 0 1 1 ${cx - tx} ${base + ty} Z`;
}

/** החלק האחורי (הנסתר) של בסיס החרוט — בין שתי נקודות ההשקה. */
export function coneHiddenArc(cx, base, rx, ry, height) {
  const [tx, ty] = coneTangent(rx, ry, height);
  return `M${cx - tx} ${base + ty} A${rx} ${ry} 0 0 1 ${cx + tx} ${base + ty}`;
}

/** סימון זווית ישרה בין קו אנכי לקו אופקי בנקודה (x, y), פונה ימינה ולמעלה. */
export const rightMark = (x, y, size = 7) => `M${x + size} ${y} L${x + size} ${y - size} L${x} ${y - size}`;

const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const clean = (x) => Number(Number(x).toFixed(4));

/** מקדם של π ב-LaTeX: 45 ← 45\pi, 20/3 ← \frac{20}{3}\pi, 1 ← \pi. מקדם לא שלם — עשרוני. */
export function piTex(num, den = 1) {
  if (!Number.isInteger(num) || !Number.isInteger(den)) {
    const v = clean(num / den);
    return v === 1 ? '\\pi' : `${v}\\pi`;
  }
  const g = gcd(num, den) || 1;
  const [n, d] = [num / g, den / g];
  if (n === 0) return '0';
  if (d === 1) return n === 1 ? '\\pi' : `${n}\\pi`;
  return `\\frac{${n}}{${d}}\\pi`;
}

/** ערך מקורב עם π ≈ 3.14, עד שתי ספרות אחרי הנקודה. */
export const approx = (coef) => String(Number((coef * PI_APPROX).toFixed(2)));

/** מספר נקי לתצוגה (בלי 0.30000000000000004). */
export const fmt = (x) => String(clean(x));
