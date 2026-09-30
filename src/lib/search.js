import { allTopics, GRADE_LABELS } from '../data/curriculum';

// אותיות סופיות → רגילות, כדי ש"שברים" ימצא גם "שבר"
const FINALS = { ם: 'מ', ן: 'נ', ץ: 'צ', ף: 'פ', ך: 'כ' };
// מילים שלא עוזרות בחיפוש
const STOP = new Set(['של', 'את', 'עם', 'על', 'או', 'גם', 'כיתה', 'כיתת', 'נושא', 'הסבר']);

/** מנרמל טקסט עברי לחיפוש: בלי ניקוד, גרשיים ומקפים, אותיות סופיות → רגילות. */
export function normalize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[֑-ׇ]/g, '') // ניקוד וטעמים
    .replace(/<[^>]*>/g, ' ')
    .replace(/[$\\{}]/g, ' ')
    .replace(/["'׳״`]/g, '')
    .replace(/[-–—_/.,:;!?()[\]]/g, ' ')
    .replace(/[םןץףך]/g, (c) => FINALS[c])
    .replace(/\s+/g, ' ')
    .trim();
}

/** מילת חיפוש → גזע: מורידים סיומת רבים (ים/ות), וה"א הידיעה בתחילת מילה ארוכה. */
function stem(word) {
  let w = word;
  if (w.length >= 5 && /(ימ|ות)$/.test(w)) w = w.slice(0, -2);
  if (w.length >= 4 && w.startsWith('ה')) w = w.slice(1);
  return w;
}

export function tokenize(query) {
  return normalize(query)
    .split(' ')
    .filter((w) => w.length >= 2 && !STOP.has(w))
    .map(stem);
}

/** תווית קצרה למיקום הנושא: "כיתה י׳ · 5 יח״ל" */
export function topicPlace(t) {
  const grade = `כיתה ${GRADE_LABELS[t.grade] ?? t.grade}`;
  if (t.units) return `${grade} · ${t.units} יח״ל`;
  if (t.track) return `${grade} · מסלול ${t.track === 'reduced' ? '3' : '4/5'} יח״ל`;
  return grade;
}

let INDEX = null;
function index() {
  if (!INDEX) {
    INDEX = allTopics().map((t) => ({
      topic: t,
      title: normalize(t.title),
      meta: normalize(`${t.cluster ?? ''} ${t.description ?? ''}`),
      formulas: normalize((t.keyFormulas ?? []).join(' ')),
    }));
  }
  return INDEX;
}

/**
 * מחפש נושאים. כל מילה בשאילתה חייבת להופיע (בכותרת, בתיאור או בנוסחאות);
 * התאמה בכותרת שווה יותר, והתאמה לכל הביטוי ברצף — עוד יותר.
 * @returns {Array<{topic: object, score: number}>}
 */
export function searchTopics(query, { grade = null, limit = 40 } = {}) {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  const phrase = normalize(query);
  const results = [];
  for (const e of index()) {
    if (grade != null && e.topic.grade !== grade) continue;
    let score = 0;
    let all = true;
    for (const tok of tokens) {
      if (e.title.includes(tok)) score += e.title.split(' ').some((w) => w.startsWith(tok) || w.slice(1).startsWith(tok)) ? 6 : 4;
      else if (e.meta.includes(tok)) score += 2;
      else if (e.formulas.includes(tok)) score += 1;
      else {
        all = false;
        break;
      }
    }
    if (!all) continue;
    if (phrase.length > 2 && e.title.includes(phrase)) score += 8;
    results.push({ topic: e.topic, score });
  }
  return results.sort((a, b) => b.score - a.score || a.topic.grade - b.topic.grade || (a.topic.units ?? 0) - (b.topic.units ?? 0)).slice(0, limit);
}
