/**
 * דפי עבודה לפי נושא: תזכורת, שני עמודי תרגול, מבדק ותשובות.
 *
 * המפתח הוא מזהה הנושא בתוכנית הלימודים (אחד-לאחד), כך שהכותרת,
 * האשכול והכיתה נלקחים משם. התוכן עצמו נטען רק כשנכנסים לדף.
 */
import { getTopicById } from '../curriculum/index.js';

const LOADERS = {
  'g5-numbers-million': () => import('./g5/numbers-million.js'),
  'g5-mul-div-adv': () => import('./g5/mul-div-adv.js'),
  'g5-primes': () => import('./g5/primes.js'),
  'g5-fractions-models': () => import('./g5/fractions-models.js'),
  'g5-fractions-meaning': () => import('./g5/fractions-meaning.js'),
  'g5-fractions-compare': () => import('./g5/fractions-compare.js'),
  'g5-fractions-reduce-expand': () => import('./g5/fractions-reduce-expand.js'),
  'g5-fractions-add-sub': () => import('./g5/fractions-add-sub.js'),
  'g5-fractions-mul-whole': () => import('./g5/fractions-mul-whole.js'),
  'g5-decimals-intro': () => import('./g5/decimals-intro.js'),
  'g5-decimals-ops': () => import('./g5/decimals-ops.js'),
  'g5-triangle-height': () => import('./g5/triangle-height.js'),
  'g5-triangle-area': () => import('./g5/triangle-area.js'),
  'g5-parallelogram-height': () => import('./g5/parallelogram-height.js'),
  'g5-parallelogram-area': () => import('./g5/parallelogram-area.js'),
  'g5-solids': () => import('./g5/solids.js'),
  'g5-data-frequency': () => import('./g5/data-frequency.js'),
  'g5-median-average': () => import('./g5/median-average.js'),
  'g5-geometry': () => import('./g5/geometry.js'),
  'g5-percent-intro': () => import('./g5/percent-intro.js'),
  'g5-roman-numerals': () => import('./g5/roman-numerals.js'),
  'g5-quadrilaterals': () => import('./g5/quadrilaterals.js'),
  'g5-trapezoid': () => import('./g5/trapezoid.js'),
  'g5-tessellations': () => import('./g5/tessellations.js'),
};

export const WORKSHEET_TOPIC_IDS = Object.keys(LOADERS);

export function hasWorksheet(topicId) {
  return Object.hasOwn(LOADERS, topicId);
}

/** נושאי הכיתה שיש להם דף עבודה, לפי סדר תוכנית הלימודים. */
export function getWorksheetTopics(grade) {
  return WORKSHEET_TOPIC_IDS.map(getTopicById)
    .filter((t) => t && t.grade === Number(grade))
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

/** @returns {Promise<object|null>} */
export async function loadWorksheet(topicId) {
  if (!hasWorksheet(topicId)) return null;
  const mod = await LOADERS[topicId]();
  return mod.default;
}
