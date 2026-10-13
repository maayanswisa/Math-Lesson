/**
 * משפחות הפונקציות של "סייר הפונקציות": לכל משפחה — הפרמטרים, הפונקציה והנגזרת,
 * הנוסחאות ב-LaTeX עם הערכים שנבחרו, תחום הגדרה, טווח ואסימפטוטות.
 * הכול פונקציות טהורות של הפרמטרים (p), כדי שאפשר יהיה לבדוק אותן בלי ממשק.
 */

/** מספר קריא: עד שלוש ספרות אחרי הנקודה, בלי אפסים מיותרים ובלי "-0". */
export const num = (v) => String(Number(Number(v).toFixed(3)) || 0);

/** ערכי סליידר מ-min עד max בקפיצות step (אפשר בלי 0 — כשהפרמטר 0 הופך את הפונקציה לאחרת). */
export function range(min, max, step, { noZero = false } = {}) {
  const out = [];
  for (let v = min; v <= max + 1e-9; v += step) {
    const r = Number(v.toFixed(4));
    if (!(noZero && r === 0)) out.push(r);
  }
  return out;
}

/** מקדם לפני ביטוי: 1·x ← x, ‎-1·x ← ‎-x. */
const coef = (a, body) => (a === 1 ? body : a === -1 ? `-${body}` : `${num(a)}${body}`);

/** חיבור איברים עם סימנים נכונים ("+-" לא יופיע). */
function join(terms) {
  const t = terms.filter(Boolean);
  if (!t.length) return '0';
  return t.map((x, i) => (i === 0 || x.startsWith('-') ? x : `+${x}`)).join('');
}

/** שבר עם הסימן מחוץ לו: ‎-\dfrac{2}{x}. */
const frac = (top, bottom) => (top < 0 ? `-\\dfrac{${num(-top)}}{${bottom}}` : `\\dfrac{${num(top)}}{${bottom}}`);

/** x−b כמכנה: x, x-2, x+1.5 */
const shifted = (b) => (b === 0 ? 'x' : `x${b > 0 ? '-' : '+'}${num(Math.abs(b))}`);

const EVERY_X = 'אפשר להציב כל $x$ — אין חילוק במשתנה, שורש או לוגריתם.';

export const FAMILIES = [
  {
    id: 'linear',
    name: 'קווית',
    general: 'f(x)=mx+b',
    derivativeRule: "f'(x)=m",
    params: [
      { key: 'm', values: range(-4, 4, 0.5), initial: 1, hint: 'השיפוע — בכמה $y$ גדל כש-$x$ גדל ב-$1$' },
      { key: 'b', values: range(-5, 5, 0.5), initial: 1, hint: 'נקודת החיתוך עם ציר $y$' },
    ],
    f: ({ m, b }) => (x) => m * x + b,
    df: ({ m }) => () => m,
    tex: ({ m, b }) => join([m !== 0 && coef(m, 'x'), b !== 0 && num(b)]),
    dtex: ({ m }) => num(m),
    domain: () => ({ set: 'כל $x$', why: EVERY_X }),
    range: ({ m, b }) => (m === 0 ? `רק $y=${num(b)}$ (פונקציה קבועה)` : 'כל $y$'),
    asymptotes: () => [],
    insight: ({ m }) =>
      `הנגזרת של פונקציה קווית היא **קבועה**: השיפוע $${num(m)}$ זהה בכל נקודה, ולכן הגרף שלה הוא קו אופקי.`,
  },
  {
    id: 'quadratic',
    name: 'ריבועית',
    general: 'f(x)=ax^2+bx+c',
    derivativeRule: "f'(x)=2ax+b",
    params: [
      { key: 'a', values: range(-3, 3, 0.5, { noZero: true }), initial: 1, hint: 'רוחב הפרבולה, ולאן היא פתוחה (למעלה או למטה)' },
      { key: 'b', values: range(-5, 5, 0.5), initial: 0, hint: 'מזיז את הקודקוד הצידה (ביחד עם $a$)' },
      { key: 'c', values: range(-5, 5, 0.5), initial: -2, hint: 'נקודת החיתוך עם ציר $y$' },
    ],
    f: ({ a, b, c }) => (x) => a * x * x + b * x + c,
    df: ({ a, b }) => (x) => 2 * a * x + b,
    tex: ({ a, b, c }) => join([coef(a, 'x^2'), b !== 0 && coef(b, 'x'), c !== 0 && num(c)]),
    dtex: ({ a, b }) => join([coef(2 * a, 'x'), b !== 0 && num(b)]),
    domain: () => ({ set: 'כל $x$', why: EVERY_X }),
    range: ({ a, b, c }) => {
      const q = c - (b * b) / (4 * a);
      return `$y${a > 0 ? '\\ge' : '\\le'}${num(q)}$ (גובה הקודקוד)`;
    },
    asymptotes: () => [],
    insight: ({ a, b }) =>
      `הנגזרת היא פונקציה קווית. היא מתאפסת בדיוק בקודקוד, ב-$x=${num(-b / (2 * a))}$ — שם השיפוע של הפרבולה הוא $0$.`,
  },
  {
    id: 'exponential',
    name: 'מעריכית',
    general: 'f(x)=a\\cdot e^{bx}+c',
    derivativeRule: "f'(x)=a\\cdot b\\cdot e^{bx}",
    params: [
      { key: 'a', values: range(-3, 3, 0.5, { noZero: true }), initial: 1, hint: 'מתיחה, ושיקוף כש-$a<0$' },
      { key: 'b', values: range(-2, 2, 0.25, { noZero: true }), initial: 1, hint: 'קצב השינוי: חיובי — גדילה, שלילי — דעיכה' },
      { key: 'c', values: range(-4, 4, 0.5), initial: 0, hint: 'הזזה אנכית — וגם האסימפטוטה $y=c$' },
    ],
    f: ({ a, b, c }) => (x) => a * Math.exp(b * x) + c,
    df: ({ a, b }) => (x) => a * b * Math.exp(b * x),
    tex: ({ a, b, c }) => join([coef(a, expBody(b)), c !== 0 && num(c)]),
    dtex: ({ a, b }) => coef(a * b, expBody(b)),
    domain: () => ({ set: 'כל $x$', why: 'חזקה של $e$ מוגדרת לכל מעריך, ולכן אין מגבלה על $x$.' }),
    range: ({ a, c }) => `$y${a > 0 ? '>' : '<'}${num(c)}$`,
    asymptotes: ({ c }) => [{ axis: 'y', at: c }],
    insight: () =>
      'הנגזרת של $e^{x}$ היא $e^{x}$ עצמה. כאן הנגזרת היא $b$ כפול החלק המעריכי, והקבוע $c$ נעלם — הזזה למעלה לא משנה שיפוע.',
  },
  {
    id: 'logarithmic',
    name: 'לוגריתמית',
    general: 'f(x)=a\\cdot\\ln(bx)+c',
    derivativeRule: "f'(x)=\\dfrac{a}{x}",
    params: [
      { key: 'a', values: range(-3, 3, 0.5, { noZero: true }), initial: 1, hint: 'מתיחה, ושיקוף כש-$a<0$' },
      { key: 'b', values: range(-2, 2, 0.5, { noZero: true }), initial: 1, hint: 'כש-$b<0$ הגרף עובר לצד של $x<0$' },
      { key: 'c', values: range(-4, 4, 0.5), initial: 0, hint: 'הזזה אנכית' },
    ],
    f: ({ a, b, c }) => (x) => (b * x > 0 ? a * Math.log(b * x) + c : NaN),
    df: ({ a, b }) => (x) => (b * x > 0 ? a / x : NaN),
    tex: ({ a, b, c }) => join([coef(a, lnBody(b)), c !== 0 && num(c)]),
    dtex: ({ a }) => frac(a, 'x'),
    domain: ({ b }) => {
      const side = b > 0 ? 'x>0' : 'x<0';
      const need = `לוגריתם מוגדר רק למספר חיובי, לכן צריך $${coef(b, 'x')}>0$`;
      if (b === 1) return { set: `$${side}$`, why: `${need}.` };
      if (b > 0) return { set: `$${side}$`, why: `${need}, כלומר $${side}$.` };
      return { set: `$${side}$`, why: `${need}. מחלקים במספר שלילי, ולכן כיוון אי-השוויון מתהפך: $${side}$.` };
    },
    range: () => 'כל $y$',
    asymptotes: () => [{ axis: 'x', at: 0 }],
    excluded: ({ b }) => (b > 0 ? [[-Infinity, 0]] : [[0, Infinity]]),
    insight: () =>
      'שימו לב: $b$ לא מופיע בנגזרת. עבור $b>0$ מתקיים $\\ln(bx)=\\ln b+\\ln x$, כלומר $b$ רק מזיז את הגרף למעלה או למטה — והשיפועים לא משתנים.',
  },
  {
    id: 'rational',
    name: 'רציונלית',
    general: 'f(x)=\\dfrac{a}{x-b}+c',
    derivativeRule: "f'(x)=-\\dfrac{a}{(x-b)^2}",
    params: [
      { key: 'a', values: range(-4, 4, 0.5, { noZero: true }), initial: 1, hint: 'מתיחה, ושיקוף כש-$a<0$' },
      { key: 'b', values: range(-4, 4, 0.5), initial: 0, hint: 'האסימפטוטה האנכית $x=b$' },
      { key: 'c', values: range(-4, 4, 0.5), initial: 0, hint: 'האסימפטוטה האופקית $y=c$' },
    ],
    f: ({ a, b, c }) => (x) => (x === b ? NaN : a / (x - b) + c),
    df: ({ a, b }) => (x) => (x === b ? NaN : -a / (x - b) ** 2),
    tex: ({ a, b, c }) => join([frac(a, shifted(b)), c !== 0 && num(c)]),
    dtex: ({ a, b }) => frac(-a, b === 0 ? 'x^2' : `(${shifted(b)})^2`),
    domain: ({ b }) => ({
      set: `$x\\ne${num(b)}$`,
      why: `אסור לחלק ב-$0$, והמכנה $${shifted(b)}$ מתאפס ב-$x=${num(b)}$.`,
    }),
    range: ({ c }) => `$y\\ne${num(c)}$`,
    asymptotes: ({ b, c }) => [
      { axis: 'x', at: b },
      { axis: 'y', at: c },
    ],
    insight: ({ a }) =>
      `הנגזרת ${a > 0 ? 'שלילית' : 'חיובית'} בכל התחום, ולכן הפונקציה ${a > 0 ? 'יורדת' : 'עולה'} בכל אחד משני הענפים — אבל לא "על פני" האסימפטוטה.`,
  },
];

function expBody(b) {
  return b === 1 ? 'e^{x}' : b === -1 ? 'e^{-x}' : `e^{${num(b)}x}`;
}

function lnBody(b) {
  return b === 1 ? '\\ln x' : `\\ln(${coef(b, 'x')})`;
}

export const getFamily = (id) => FAMILIES.find((f) => f.id === id) ?? FAMILIES[0];

/** קטעי x שמחוץ לתחום ההגדרה (להצללה בגרף). נקודה בודדת — כמו x=b ברציונלית — מסומנת באסימפטוטה. */
export const excludedRanges = (family, p) => family.excluded?.(p) ?? [];

/** ערכי ההתחלה של משפחה: { m: 1, b: 1 } וכו'. */
export const initialParams = (family) => Object.fromEntries(family.params.map((p) => [p.key, p.initial]));

/** אסימפטוטה בכתיב נוסחה: x=2 / y=-1 */
export const asymptoteTex = ({ axis, at }) => `${axis}=${num(at)}`;
