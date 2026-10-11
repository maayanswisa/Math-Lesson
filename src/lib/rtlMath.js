/**
 * בדיקת קריאוּת של שורות שמערבבות עברית ונוסחאות.
 *
 * כל $...$ מוצג כיחידה סגורה משמאל לימין בתוך שורה שנקראת מימין לשמאל.
 * לכן סימן שנמצא בקצה של נוסחה "נדבק" למילה הלא נכונה:
 * "היקף ריבוע $= 4\times$ צלע" נראה על המסך כמו "היקף ריבוע × 4 = צלע".
 * הכללים כאן מאתרים את המקרים האלה. הכתיבה הנכונה: כל סימן שמחבר מילים
 * בעברית — בנוסחה משלו ("היקף ריבוע $=$ $4$ $\times$ צלע"), חצים בטקסט
 * מצביעים שמאלה (⇐, ←), והשוואות בין מילים נכתבות במילים ("גדול מ-").
 */

const RELATIONS = ['=', '<', '>', '\\le', '\\leq', '\\ge', '\\geq', '\\ne', '\\neq', '\\approx'];
const BINARY = ['+', '-', '\\times', '\\cdot', '\\div', ':', '\\pm'];
const RIGHT_ARROWS = ['\\to', '\\rightarrow', '\\Rightarrow', '\\implies', '\\longrightarrow', '\\Longrightarrow'];
const TWO_WAY_ARROWS = ['\\Leftrightarrow', '\\iff', '\\leftrightarrow', '\\rightleftharpoons'];
/** סימנים "מכוונים" שלא מתהפכים בתוך נוסחה — בין מילים בעברית הם מתחלפים במשמעות. */
const COMPARISONS = ['<', '>', '\\le', '\\leq', '\\ge', '\\geq', '\\lt', '\\gt', '\\subset', '\\supset', '\\subseteq', '\\supseteq'];
const OPERATORS = [...RELATIONS, ...BINARY, ...RIGHT_ARROWS, ...TWO_WAY_ARROWS, ...COMPARISONS, '\\Leftarrow', '\\leftarrow'];
const EDGE_START = [...RELATIONS, ...RIGHT_ARROWS, ...TWO_WAY_ARROWS, '\\times', '\\cdot', '\\div', ':', '+', '\\pm'];
const EDGE_END = [...RELATIONS, ...BINARY, ...RIGHT_ARROWS, ...TWO_WAY_ARROWS];

/** חצים ימינה בטקסט העברי מצביעים אחורה — בעברית כותבים ⇐ / ←. */
const TEXT_RIGHT_ARROWS = /[→⇒⟹⟶]/;
/** מילה בעברית בתוך \text{...}. */
const HEB_TEXT = /\\text\{[^}]*[א-ת][^}]*\}/g;
/** סימן שהסדר שלו חשוב, צמוד למילה בעברית בתוך נוסחה. */
const ORDERED_OP = /(?:-|:|\/|<|>|\\div|\\[lg]eq?|\\to|\\Rightarrow)$/;
const ORDERED_OP_AHEAD = /^(?:-|:|\/|<|>|\\div(?![a-z])|\\[lg]eq?(?![a-z])|\\to(?![a-z])|\\Rightarrow)/;

/** פיצול לקטעי טקסט ונוסחה ($...$ או $$...$$). קטעי הנוסחה תמיד במקומות האי-זוגיים. */
export function splitMath(md) {
  const text = String(md);
  const parts = [];
  const re = /(?<!\\)\$\$([\s\S]*?)(?<!\\)\$\$|(?<!\\)\$([\s\S]*?)(?<!\\)\$/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    parts.push({ math: false, s: text.slice(last, m.index) }, { math: true, s: m[1] ?? m[2] });
    last = m.index + m[0].length;
  }
  parts.push({ math: false, s: text.slice(last) });
  return parts;
}

const SPACE = String.raw`(?:\s|\\[ ,;!]|\\quad|\\qquad|~)`;
/** מסיר רווחים (גם פקודות רווח של LaTeX) מהקצוות. */
export function trimTex(s) {
  return s.replace(new RegExp(`^${SPACE}+|${SPACE}+$`, 'g'), '');
}

/** אופרטור שהנוסחה פותחת בו (או null). פקודה נחשבת רק אם אחריה אין עוד אות. */
function leadingOp(tex, ops) {
  return ops.find((op) => tex.startsWith(op) && !(op.startsWith('\\') && /^[A-Za-z]/.test(tex.slice(op.length)))) ?? null;
}

function trailingOp(tex, ops) {
  // "\:" או "\," הם רווחים, לא אופרטורים
  return ops.find((op) => tex.endsWith(op) && !tex.slice(0, -op.length).endsWith('\\')) ?? null;
}

/** האם יש תוכן (עברית או נוסחה) בקטעים from..to. */
function hasContent(parts, from, to) {
  return parts.slice(from, to).some((p) => (p.math ? trimTex(p.s) !== '' : p.s.trim() !== ''));
}

/** סימני הדגשה של Markdown (**מילה**) לא מפרידים בין המילה לנוסחה. */
const unemphasize = (s) => s.replace(/[*_]+/g, '');

/** האם צמוד לנוסחה "אופרנד" — מילה או נוסחה (ולא פסיק, נקודתיים או קו מפריד). */
function operandBefore(parts, i) {
  const prev = parts[i - 1];
  if (!prev) return false;
  if (prev.s.trim() === '') return i >= 2;
  return /[א-ת'")A-Za-z0-9]\s*$/.test(unemphasize(prev.s));
}

function operandAfter(parts, i) {
  const next = parts[i + 1];
  if (!next) return false;
  if (next.s.trim() === '') return i + 2 < parts.length;
  return /^\s*[א-ת("A-Za-z0-9]/.test(unemphasize(next.s));
}

/** "+" או "±" אחרי סימן פיסוק / "ב-" / חץ הם סימן של מספר ("ב-$+\infty$", "← $\pm3$"), לא חיבור. */
const SIGN_CONTEXT = /(?:^|[-־(:,;|·—–←⇐])\s*$/;

/** מילים בעברית בתוך נוסחה שנקראות בסדר הפוך: ליד חיסור/חילוק/השוואה, או משולבות במשתנים. */
function hebrewInFormulaIssues(tex) {
  const issues = [];
  for (const m of tex.matchAll(HEB_TEXT)) {
    let before = tex.slice(0, m.index).replace(/\s+$/, '');
    const after = tex.slice(m.index + m[0].length).replace(/^\s+/, '');
    // סוגריים פותחים — P(\text{...}) או 2(\text{...}) — מפרידים בין המילה למה שלפניה
    const paren = before.match(/(?:\\big|\\left)?\($/);
    if (paren) before = before.slice(0, -paren[0].length).replace(/\s+$/, '');
    if (ORDERED_OP.test(before) || ORDERED_OP_AHEAD.test(after)) {
      issues.push({ rule: 'hebrew-in-ordered-formula', tex });
    } else if (/^[A-Za-z0-9]/.test(after) || (!paren && /(?<!\\[A-Za-z]*)[A-Za-z0-9]$/.test(before))) {
      issues.push({ rule: 'hebrew-next-to-variable', tex });
    } else if (/^\)?\s*[\^_]/.test(after)) {
      issues.push({ rule: 'script-on-hebrew', tex });
    }
  }
  return issues;
}

/**
 * מחזיר רשימת בעיות קריאה בשורה (ריקה — אם הכול תקין).
 * כל בעיה: { rule, tex } — rule הוא מזהה קצר, tex הקטע הבעייתי.
 */
export function findRtlIssues(md) {
  const parts = splitMath(md);
  const issues = [];

  parts.forEach((p, i) => {
    if (!p.math) {
      if (TEXT_RIGHT_ARROWS.test(p.s) && hasContent(parts, 0, i + 1) && hasContent(parts, i, parts.length)) {
        issues.push({ rule: 'right-arrow-in-text', tex: p.s.trim() });
      }
      // מקף או לוכסן בין שתי נוסחאות: "$90°$-$180°$" נקרא כחיסור / כשבר
      if (i > 0 && i < parts.length - 1 && /^[-/]$/.test(p.s)) {
        issues.push({ rule: 'symbol-between-formulas', tex: p.s });
      }
      // "\ " מחוץ לנוסחה מוצג כלוכסן הפוך
      if (p.s.includes('\\')) issues.push({ rule: 'stray-backslash', tex: p.s.trim() });
      return;
    }

    const tex = trimTex(p.s);
    if (!tex) return;

    if (OPERATORS.includes(tex)) {
      if (RIGHT_ARROWS.includes(tex)) issues.push({ rule: 'right-arrow-in-text', tex });
      // סימן השוואה בנוסחה לא מתהפך בעברית: "מונה $>$ מכנה" נראה כאילו המכנה גדול
      if (COMPARISONS.includes(tex) && operandBefore(parts, i) && operandAfter(parts, i)) {
        issues.push({ rule: 'comparison-between-words', tex });
      }
      return;
    }

    const lead = leadingOp(tex, EDGE_START);
    if (lead && hasContent(parts, 0, i)) {
      const signedNumber = (lead === '+' || lead === '\\pm') && SIGN_CONTEXT.test(unemphasize(parts[i - 1].s));
      if (!signedNumber) issues.push({ rule: 'operator-at-start', tex });
    }
    if (trailingOp(tex, EDGE_END) && hasContent(parts, i + 1, parts.length)) {
      issues.push({ rule: 'operator-at-end', tex });
    }

    // חזקה / אינדקס על מילה בעברית: "צלע$^2$"
    if (/^[\^_]/.test(tex) && /[א-ת)]$/.test(parts[i - 1].s)) {
      issues.push({ rule: 'script-on-hebrew', tex });
    }
    // "$10/100/1000$" נראה כמו שברים
    if (/^\d+(?:\/\d+){2,}$/.test(tex)) issues.push({ rule: 'slash-list', tex });

    issues.push(...hebrewInFormulaIssues(tex));
  });

  return issues;
}
