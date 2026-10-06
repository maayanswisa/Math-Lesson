import { readJSON, writeJSON } from './storage.js';

/**
 * מנוע דפי העבודה: פענוח תבניות עם משבצות ריקות ובדיקת תשובות.
 *
 * תרגיל נכתב כמחרוזת רגילה (Markdown + LaTeX), וכל משבצת שהתלמיד ממלא
 * מסומנת בסוגריים כפולים [[...]]:
 *
 *   [[42]]  או [[n:42]]       מספר (אפשר כמה תשובות נכונות: [[n:2|3]])
 *   [[n:31.4~0.1]]            מספר בקירוב: מתקבל כל ערך שרחוק עד 0.1 מהתשובה (π, שורשים)
 *   [[f:3/4]]                 שבר — מתקבל כל שבר שווה ערך (6/8 נכון)
 *   [[fx:3/4]]                שבר — בדיוק המונה והמכנה האלה (לצמצום/הרחבה)
 *   [[m:2 3/4]]               מספר מעורב — מתקבל כל ערך שווה
 *   [[mx:2 3/4]]              מספר מעורב — בדיוק השלם, המונה והמכנה
 *   [[v:7/4]]                 תוצאה בשבר: משבצת שלם + שבר, ומתקבלת כל צורה שווה
 *                             (1 3/4, 7/4, 14/8). הצורה לא מסגירה אם התוצאה שלמה/גדולה מ-1.
 *   [[c:>]]                   סימן השוואה: < / = / >
 *   [[i:≥]]                   סימן אי-שוויון: < / ≤ / > / ≥
 *   [[t:XIV]]                 טקסט קצר (בלי תלות ברווחים ובאותיות גדולות/קטנות)
 *
 * בשבר ובמספר מעורב, חלק שעטוף ב-{} הוא נתון ולא משבצת:
 * [[fx:{9}/12]] מציג 9 במונה ומשבצת במכנה.
 */

const BLANK_RE = /\[\[(.+?)\]\]/g;

/** @returns {Array<{type:'text', text:string} | {type:'blank', blank:object}>} */
export function parseTemplate(str) {
  const out = [];
  let last = 0;
  for (const match of String(str ?? '').matchAll(BLANK_RE)) {
    if (match.index > last) out.push({ type: 'text', text: str.slice(last, match.index) });
    out.push({ type: 'blank', blank: parseBlank(match[1]) });
    last = match.index + match[0].length;
  }
  if (last < String(str ?? '').length) out.push({ type: 'text', text: str.slice(last) });
  return out;
}

export function hasBlanks(str) {
  return /\[\[.+?\]\]/.test(String(str ?? ''));
}

/** חלק של שבר/מספר מעורב: "{9}" = נתון, "9" = משבצת שהתשובה בה 9. */
function part(raw) {
  const s = raw.trim();
  const fixed = s.startsWith('{') && s.endsWith('}');
  const value = Number(fixed ? s.slice(1, -1) : s);
  if (!Number.isInteger(value)) throw new Error(`Bad fraction part "${raw}"`);
  return { value, fixed };
}

export function parseBlank(token) {
  const t = token.trim();
  const colon = t.indexOf(':');
  const kind = colon === -1 ? 'n' : t.slice(0, colon);
  const body = colon === -1 ? t : t.slice(colon + 1).trim();

  switch (kind) {
    case 'n': {
      const alts = body.split('|').map((s) => s.trim().split('~'));
      const answers = alts.map(([v]) => Number(v));
      const tol = alts[0][1] != null ? Number(alts[0][1]) : 1e-9;
      if (answers.some((a) => !Number.isFinite(a)) || !(tol > 0)) throw new Error(`Bad number blank "${token}"`);
      return { kind: 'number', answers, tol, approx: tol > 1e-9, width: Math.max(...alts.map(([v]) => v.length)) };
    }
    case 'f':
    case 'fx': {
      const [n, d] = body.split('/');
      if (d == null) throw new Error(`Bad fraction blank "${token}"`);
      return { kind: 'fraction', exact: kind === 'fx', n: part(n), d: part(d) };
    }
    case 'm':
    case 'mx': {
      const mm = body.match(/^(\{?\d+\}?)\s+(\{?\d+\}?)\/(\{?\d+\}?)$/);
      if (!mm) throw new Error(`Bad mixed blank "${token}"`);
      return { kind: 'mixed', exact: kind === 'mx', w: part(mm[1]), n: part(mm[2]), d: part(mm[3]) };
    }
    case 'v': {
      const [n, d] = body.split('/').map((x) => part(x));
      if (d == null || n.fixed || d.fixed || d.value === 0) throw new Error(`Bad value blank "${token}"`);
      return { kind: 'value', n, d };
    }
    case 'c':
    case 'i': {
      const signs = kind === 'c' ? ['<', '=', '>'] : ['<', '≤', '>', '≥'];
      if (!signs.includes(body)) throw new Error(`Bad sign blank "${token}"`);
      return { kind: 'compare', answer: body, signs };
    }
    case 't':
      return { kind: 'text', answers: body.split('|').map((s) => s.trim()) };
    default:
      throw new Error(`Unknown blank kind "${kind}" in "${token}"`);
  }
}

/**
 * מספר כמו שתלמידים מקלידים: "7", " 7 ", "3.5", "3,5" (פסיק עשרוני),
 * "250,000" / "1,000,000" (פסיקי אלפים), "−3", "1/2" או "-3/4" (שבר).
 * NaN אם לא נשאר מספר.
 */
export function parseNumber(raw) {
  let s = String(raw ?? '')
    .replace(/\s+/g, '')
    .replace(/[−–]/g, '-');
  const frac = s.match(/^(-?\d+)\/(\d+)$/);
  if (frac) return Number(frac[2]) === 0 ? NaN : Number(frac[1]) / Number(frac[2]);
  if (/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) s = s.replace(/,/g, '');
  else s = s.replace(',', '.');
  if (!/^-?(\d+(\.\d*)?|\.\d+)$/.test(s)) return NaN;
  return Number(s);
}

/** מספר שלם לא שלילי מתוך משבצת של מונה/מכנה/שלם; NaN אם ריק או לא תקין. */
function parseInt0(raw) {
  const s = String(raw ?? '').trim();
  return /^\d+$/.test(s) ? Number(s) : NaN;
}

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

/** ערך של משבצת "v" בצורה הפשוטה ביותר: { w, n, d } (n = 0 → שלם, w = 0 → שבר). */
function simplest(blank) {
  const g = gcd(blank.n.value, blank.d.value);
  const [n, d] = [blank.n.value / g, blank.d.value / g];
  return { w: Math.floor(n / d), n: n % d, d };
}

const normText = (s) => String(s ?? '').replace(/\s+/g, '').toUpperCase();

/** האם המשבצת ריקה (אין מה לבדוק). */
export function isBlankEmpty(blank, value) {
  if (value == null) return true;
  if (blank.kind === 'value') return ['w', 'n', 'd'].every((k) => !String(value[k] ?? '').trim());
  if (blank.kind === 'fraction' || blank.kind === 'mixed') {
    return ['w', 'n', 'd'].every((k) => blank[k] == null || blank[k].fixed || !String(value[k] ?? '').trim());
  }
  return !String(value).trim();
}

/** @returns {boolean} האם הערך שהתלמיד מילא נכון. */
export function gradeBlank(blank, value) {
  if (isBlankEmpty(blank, value)) return false;
  switch (blank.kind) {
    case 'number': {
      const x = parseNumber(value);
      return !Number.isNaN(x) && blank.answers.some((a) => Math.abs(a - x) <= blank.tol + 1e-12);
    }
    case 'text':
      return blank.answers.some((a) => normText(a) === normText(value));
    case 'compare':
      return value === blank.answer;
    case 'value': {
      // שלם ריק = 0; שבר ריק (גם מונה וגם מכנה) = 0. חצי שבר — לא תקין.
      const filled = (k) => String(value[k] ?? '').trim() !== '';
      const w = filled('w') ? parseInt0(value.w) : 0;
      const [n, d] = filled('n') || filled('d') ? [parseInt0(value.n), parseInt0(value.d)] : [0, 1];
      if ([w, n, d].some(Number.isNaN) || d === 0) return false;
      return (w * d + n) * blank.d.value === blank.n.value * d;
    }
    case 'fraction':
    case 'mixed': {
      const keys = blank.kind === 'mixed' ? ['w', 'n', 'd'] : ['n', 'd'];
      const got = {};
      for (const k of keys) {
        if (blank[k].fixed) got[k] = blank[k].value;
        else {
          // שלם ריק במספר מעורב לא-מדויק נחשב 0 (5/4 שווה ל-1 1/4)
          const raw = value[k];
          got[k] = k === 'w' && !blank.exact && !String(raw ?? '').trim() ? 0 : parseInt0(raw);
        }
      }
      if (keys.some((k) => Number.isNaN(got[k])) || got.d === 0) return false;
      // כשחלק נתון, החלק השני נקבע — אין "שווה ערך", צריך בדיוק.
      const exact = blank.exact || keys.some((k) => blank[k].fixed);
      if (exact) return keys.every((k) => got[k] === blank[k].value);
      const want = (blank.w ? blank.w.value * blank.d.value : 0) + blank.n.value;
      const have = (got.w ? got.w * got.d : 0) + got.n;
      return have * blank.d.value === want * got.d;
    }
    default:
      return false;
  }
}

/** התשובה הנכונה כמחרוזת Markdown/LaTeX להצגה בדף התשובות. */
export function blankAnswerMarkdown(blank) {
  switch (blank.kind) {
    case 'number':
      return blank.answers.map((a) => `$${blank.approx ? '\\approx ' : ''}${formatNumberTex(a)}$`).join(' או ');
    case 'text':
      return blank.answers.join(' או ');
    case 'compare':
      return `$${{ '≤': '\\le', '≥': '\\ge' }[blank.answer] ?? blank.answer}$`;
    case 'fraction':
      return `$\\frac{${blank.n.value}}{${blank.d.value}}$`;
    case 'mixed':
      return `$${blank.w.value}\\frac{${blank.n.value}}{${blank.d.value}}$`;
    case 'value': {
      const { w, n, d } = simplest(blank);
      return n === 0 ? `$${w}$` : `$${w || ''}\\frac{${n}}{${d}}$`;
    }
    default:
      return '';
  }
}

/** מספר עם פסיקי אלפים, בטוח ל-KaTeX: 1250000 → 1{,}250{,}000 */
export function formatNumberTex(x) {
  const [int, frac] = String(x).split('.');
  const sign = int.startsWith('-') ? '-' : '';
  const digits = sign ? int.slice(1) : int;
  const grouped = digits.length > 3 ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, '{,}') : digits;
  return sign + grouped + (frac ? `.${frac}` : '');
}

const HEB = /[֐-׿]/;

/**
 * מחלק שורה לקבוצות: "תוויות" בעברית, ו"רצפים מתמטיים" (LaTeX ומשבצות) ביניהן.
 *
 * כל רצף מתמטי נפרש משמאל לימין כיחידה אחת, והקבוצות עצמן מסודרות מימין
 * לשמאל. כך "קודקוד: ( □ , □ )" נשאר "( □ , □ )" ולא מתהפך, ו"100 : 7 = □
 * שארית □" נקרא נכון. מתמטיקה שבאה לפני מילה עברית באותו קטע טקסט
 * (למשל "$3$ שלמים") נשארת חלק מהתווית.
 */
export function groupTemplate(template) {
  const out = [];
  let math = null;
  const pushMath = (part) => {
    if (!math) {
      math = { type: 'math', parts: [] };
      out.push(math);
    }
    math.parts.push(part);
  };
  const pushLabel = (text) => {
    math = null;
    const last = out[out.length - 1];
    if (last?.type === 'label') last.text += text;
    else out.push({ type: 'label', text });
  };

  for (const seg of parseTemplate(template)) {
    if (seg.type === 'blank') {
      pushMath(seg);
      continue;
    }
    const tokens = seg.text.split(/(\$[^$]*\$)/).filter(Boolean);
    let lastHeb = -1;
    tokens.forEach((t, i) => {
      if (!t.startsWith('$') && HEB.test(t)) lastHeb = i;
    });
    if (lastHeb >= 0) pushLabel(tokens.slice(0, lastHeb + 1).join(''));
    for (const t of tokens.slice(lastHeb + 1)) pushMath({ type: 'text', text: t });
  }
  // רצף שכולו רווחים/פיסוק בלי מתמטיקה ובלי משבצת — לא צריך קבוצה משלו
  return out.filter((g) => g.type === 'label' || g.parts.some((p) => p.type === 'blank' || p.text.trim()));
}

/** כל המשבצות של פריט (בשאלה ובשורת התשובה), בסדר הופעתן. */
export function itemBlanks(item) {
  return [...parseTemplate(item.q), ...parseTemplate(item.a ?? '')]
    .filter((s) => s.type === 'blank')
    .map((s) => s.blank);
}

/* ---------- מפתחות, בדיקה ומצב ---------- */

export const PARTS = ['p0', 'p1', 'quiz'];

export function partOf(ws, partId) {
  return partId === 'quiz' ? ws.quiz : ws.pages[Number(partId.slice(1))];
}

export const itemKey = (partId, exIdx, itemIdx) => `${partId}.${exIdx}.${itemIdx}`;
export const blankKey = (partId, exIdx, itemIdx, blankIdx) => `${itemKey(partId, exIdx, itemIdx)}.${blankIdx}`;
export const choiceKey = (partId, exIdx, itemIdx) => `${itemKey(partId, exIdx, itemIdx)}.c`;

/**
 * בודק תרגיל שלם מול הערכים שמולאו.
 * skipEmpty — בתרגול לא מסמנים משבצת ריקה כטעות, רק משאירים אותה בלי סימון.
 * @returns {{ marks: Record<string, boolean>, items: boolean[] }}
 *   marks — לכל משבצת (ולכל שאלת בחירה) האם נכונה; items — האם כל פריט נכון כולו.
 */
export function gradeExercise(ex, partId, exIdx, values, { skipEmpty = false } = {}) {
  const marks = {};
  const items = ex.items.map((item, itemIdx) => {
    if (item.options) {
      const k = choiceKey(partId, exIdx, itemIdx);
      const ok = values[k] === item.answer;
      if (!(skipEmpty && values[k] == null)) marks[k] = ok;
      return ok;
    }
    return itemBlanks(item)
      .map((blank, b) => {
        const k = blankKey(partId, exIdx, itemIdx, b);
        const ok = gradeBlank(blank, values[k]);
        if (!(skipEmpty && isBlankEmpty(blank, values[k]))) marks[k] = ok;
        return ok;
      })
      .every(Boolean);
  });
  return { marks, items };
}

/** ערכים "מושלמים" לתרגיל — לבדיקות ולתצוגת "מלא תשובות". */
export function correctValues(ex, partId, exIdx) {
  const values = {};
  ex.items.forEach((item, itemIdx) => {
    if (item.options) {
      values[choiceKey(partId, exIdx, itemIdx)] = item.answer;
      return;
    }
    itemBlanks(item).forEach((blank, b) => {
      const k = blankKey(partId, exIdx, itemIdx, b);
      if (blank.kind === 'number') values[k] = String(blank.answers[0]);
      else if (blank.kind === 'text') values[k] = blank.answers[0];
      else if (blank.kind === 'compare') values[k] = blank.answer;
      else if (blank.kind === 'value') {
        const { w, n, d } = simplest(blank);
        values[k] = { w: w ? String(w) : '', n: n ? String(n) : '', d: n ? String(d) : '' };
      } else {
        values[k] = {};
        for (const p of ['w', 'n', 'd']) if (blank[p]) values[k][p] = String(blank[p].value);
      }
    });
  });
  return values;
}

/** מצב פריט אחרי בדיקה: 'right' | 'wrong' | null (לא נבדק / נערך מאז). */
export function itemStatus(item, partId, exIdx, itemIdx, marks) {
  const keys = item.options
    ? [choiceKey(partId, exIdx, itemIdx)]
    : itemBlanks(item).map((_, b) => blankKey(partId, exIdx, itemIdx, b));
  const ms = keys.map((k) => marks[k]);
  if (ms.some((m) => m === false)) return 'wrong';
  if (ms.every((m) => m === true)) return 'right';
  return null;
}

/** כמה תרגילים בחלק נפתרו במלואם (כל הפריטים מסומנים נכון). */
export function partProgress(ws, partId, marks) {
  const part = partOf(ws, partId);
  const done = part.exercises.filter((ex, exIdx) =>
    ex.items.every((item, itemIdx) => itemStatus(item, partId, exIdx, itemIdx, marks) === 'right'),
  ).length;
  return { done, total: part.exercises.length };
}

export function countItems(part) {
  return part.exercises.reduce((sum, ex) => sum + ex.items.length, 0);
}

/* ---------- שמירה ב-localStorage ---------- */

const stateKey = (id) => `math-lesson-ws-${id}`;
const SUMMARY_KEY = 'math-lesson-ws-summary-v1';

export function emptyWorksheetState() {
  return { values: {}, marks: {}, awarded: {}, quiz: { submitted: false, correct: 0, total: 0, rewarded: false } };
}

export function readWorksheetState(id) {
  const s = readJSON(stateKey(id), null);
  if (!s || typeof s.values !== 'object' || typeof s.marks !== 'object') return emptyWorksheetState();
  return { ...emptyWorksheetState(), ...s, quiz: { ...emptyWorksheetState().quiz, ...(s.quiz || {}) } };
}

export function writeWorksheetState(id, state) {
  writeJSON(stateKey(id), state);
}

/** סיכום קצר לכל דף (לרשימת דפי העבודה, בלי לטעון את התוכן). */
export function readWorksheetSummaries() {
  const s = readJSON(SUMMARY_KEY, {});
  return s && typeof s === 'object' ? s : {};
}

export function writeWorksheetSummary(id, summary) {
  writeJSON(SUMMARY_KEY, { ...readWorksheetSummaries(), [id]: summary });
}
