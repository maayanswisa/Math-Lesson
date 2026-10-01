/**
 * מפרק הסבר של שאלה לשלבי פתרון קצרים — כדי להציג "איך פותרים?" צעד אחר צעד.
 * אם לשאלה יש שדה steps (מערך) — הוא קובע. אחרת מפרקים את explanation:
 * לפי סוף משפט, ירידת שורה, ";" ו"←", ואם יצא שלב אחד ארוך — גם לפי ":" ו"לכן".
 * חיתוך נעשה רק מחוץ לנוסחאות ($…$), כדי לא לשבור LaTeX.
 */

const MIN_LEN = 12;

/** מחלק טקסט במקומות שבהם splitAt מחזיר true — רק מחוץ ל-$…$. */
function splitOutsideMath(text, isBoundary) {
  const parts = [];
  let buf = '';
  let inMath = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '$' && text[i - 1] !== '\\') inMath = !inMath;
    if (!inMath) {
      const cut = isBoundary(text, i);
      if (cut) {
        buf += cut.keep ?? '';
        parts.push(buf);
        buf = '';
        i += cut.skip - 1;
        continue;
      }
    }
    buf += ch;
  }
  parts.push(buf);
  return parts.map((p) => p.trim()).filter(Boolean);
}

// סוף משפט: ". " / "! " / "? " (לא נקודה עשרונית), ירידת שורה, ";", "←"
function sentenceBoundary(t, i) {
  const ch = t[i];
  if (ch === '\n') return { skip: 1 };
  if (ch === ';') return { skip: 1 };
  if (ch === '←' || ch === '⇐') return { skip: 1 };
  if ((ch === '.' || ch === '!' || ch === '?') && (i === t.length - 1 || /\s/.test(t[i + 1])) && !/\d/.test(t[i - 1] ?? '')) {
    return { keep: ch, skip: 1 };
  }
  if ((ch === '.' || ch === '!' || ch === '?') && /\s/.test(t[i + 1] ?? '') && /\d/.test(t[i - 1] ?? '') && /[֐-׿]/.test(t[i + 2] ?? '')) {
    return { keep: ch, skip: 1 };
  }
  return null;
}

// חיתוך משני: אחרי ":" שאחריו נוסחה, ולפני מילות קישור של מסקנה
const CONNECTORS = [', ולכן', ', לכן', ', ומכיוון', ', נובע', ', כלומר', ', ואז', ', ומכאן', ', ומקבלים', ' ולכן ', ' לכן '];
function softBoundary(t, i) {
  if (t[i] === ':' && /^\s*\$/.test(t.slice(i + 1, i + 4))) return { keep: ':', skip: 1 };
  for (const c of CONNECTORS) if (t.startsWith(c, i)) return { skip: c.startsWith(',') ? 2 : 1 };
  return null;
}

/** מפצל מחרוזת LaTeX לפי מפריד — רק ברמה העליונה (לא בתוך {}). */
function splitTop(math, sep) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < math.length; i++) {
    const ch = math[i];
    if (ch === '{') depth++;
    if (ch === '}') depth--;
    if (depth === 0 && math.startsWith(sep, i) && (sep !== '=' || math[i - 1] !== '\\')) {
      out.push(cur);
      cur = '';
      i += sep.length - 1;
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out;
}

/**
 * שלב שהוא נוסחה אחת ארוכה נפתח לשורות:
 * "$a=b=c$" → "$a=b$", "$=c$"; וגם "$x=1\\Rightarrow y=2$" → "$x=1$", "$\\Rightarrow y=2$".
 */
function splitChain(step) {
  const m = step.match(/^([^$]*)\$([^$]+)\$([^$]*)$/s);
  if (!m) return [step];
  const [, before, math, after] = m;
  const lines = [];
  splitTop(math, '\\Rightarrow').forEach((seg, si) => {
    const pre = si > 0 ? '\\Rightarrow ' : '';
    const eq = splitTop(seg, '=');
    if (eq.length < 3 || eq.some((x) => !x.trim())) {
      lines.push(`$${pre}${seg.trim()}$`);
      return;
    }
    lines.push(`$${pre}${eq[0].trim()}=${eq[1].trim()}$`);
    for (let k = 2; k < eq.length; k++) lines.push(`$=${eq[k].trim()}$`);
  });
  if (lines.length < 2) return [step];
  if (before.trim()) lines[0] = `${before.trim()} ${lines[0]}`;
  const tail = after.trim();
  if (tail) lines[lines.length - 1] += /^[.,;!?]/.test(tail) ? tail : ` ${tail}`;
  return lines;
}

/** מאחד חלקים קצרים מדי לשלב שלפניהם (או אחריהם). */
function mergeShort(parts) {
  const out = [];
  for (const p of parts) {
    const plain = p.replace(/\$([^$]*)\$/g, '$1');
    if (out.length && plain.length < MIN_LEN) out[out.length - 1] = `${out[out.length - 1]} ${p}`;
    else out.push(p);
  }
  if (out.length > 1 && out[0].replace(/\$([^$]*)\$/g, '$1').length < MIN_LEN) {
    out[1] = `${out[0]} ${out[1]}`;
    out.shift();
  }
  return out;
}

export function solutionSteps(question) {
  if (!question) return [];
  if (Array.isArray(question.steps) && question.steps.length) return question.steps;
  const text = String(question.explanation ?? '').trim();
  if (!text) return [];
  const sentences = mergeShort(splitOutsideMath(text, sentenceBoundary));
  const parts = sentences.flatMap((s) => mergeShort(splitOutsideMath(s, softBoundary)));
  return parts
    .map((p) => p.replace(/^[,\s—-]+/, '').trim())
    .filter(Boolean)
    .flatMap(splitChain);
}

/** הטקסט של התשובה הנכונה (לשאלות אמריקאיות), או null. */
export function correctAnswerText(question) {
  if (!question || (question.type && question.type !== 'mcq') || !Array.isArray(question.options)) return null;
  return question.options[question.correct_index] ?? null;
}
