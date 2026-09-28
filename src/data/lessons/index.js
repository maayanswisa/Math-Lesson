/**
 * מדריכים אינטראקטיביים לפי נושא.
 *
 * רשימת המזהים קלה ונטענת עם דף הנושאים; תוכן המדריך עצמו נטען רק
 * כשנכנסים אליו (dynamic import), כמו בנק השאלות.
 */
const LOADERS = {
  // כיתה ה׳
  'g5-numbers-million': () => import('./g5-numbers-million.js'),
  'g5-mul-div-adv': () => import('./g5-mul-div-adv.js'),
  'g5-primes': () => import('./g5-primes.js'),
  'g5-fractions-models': () => import('./g5-fractions-models.js'),
  'g5-fractions-meaning': () => import('./g5-fractions-meaning.js'),
  'g5-fractions-compare': () => import('./g5-fractions-compare.js'),
  'g5-fractions-reduce-expand': () => import('./g5-fractions-reduce-expand.js'),
  'g5-fractions-add-sub': () => import('./g5-fractions-add-sub.js'),
  'g5-fractions-mul-whole': () => import('./g5-fractions-mul-whole.js'),
  'g5-decimals-intro': () => import('./g5-decimals-intro.js'),
  'g5-decimals-ops': () => import('./g5-decimals-ops.js'),
  'g5-triangle-height': () => import('./g5-triangle-height.js'),
  'g5-triangle-area': () => import('./g5-triangle-area.js'),
  'g5-parallelogram-height': () => import('./g5-parallelogram-height.js'),
  'g5-parallelogram-area': () => import('./g5-parallelogram-area.js'),
  'g5-solids': () => import('./g5-solids.js'),
  'g5-data-frequency': () => import('./g5-data-frequency.js'),
  'g5-median-average': () => import('./g5-median-average.js'),
  'g5-geometry': () => import('./g5-geometry.js'),
  'g5-percent-intro': () => import('./g5-percent-intro.js'),
  'g5-roman-numerals': () => import('./g5-roman-numerals.js'),
  'g5-quadrilaterals': () => import('./g5-quadrilaterals.js'),
  'g5-trapezoid': () => import('./g5-trapezoid.js'),
  'g5-tessellations': () => import('./g5-tessellations.js'),
  // כיתה ח׳
  'g8-linear-fn': () => import('./g8-linear-fn.js'),
  'g8-linear-eq-of-line': () => import('./g8-linear-eq-of-line.js'),
  'g8-linear-inequalities': () => import('./g8-linear-inequalities.js'),
  'g8-word-problems': () => import('./g8-word-problems.js'),
  'g8-equations-system': () => import('./g8-equations-brackets.js'),
  'g8-system-solutions': () => import('./g8-system-solutions.js'),
  'g8-algebra-technique': () => import('./g8-algebra-technique.js'),
  'g8-factoring': () => import('./g8-factoring.js'),
  'g8-ratio-proportion-scale': () => import('./g8-ratio-proportion-scale.js'),
  'g8-percent': () => import('./g8-percent.js'),
  'g8-stats-prob': () => import('./g8-stats-prob.js'),
  'g8-irrational-numbers': () => import('./g8-irrational-numbers.js'),
  'g8-congruence': () => import('./g8-congruence.js'),
  'g8-triangle-median-isosceles': () => import('./g8-triangle-median-isosceles.js'),
  'g8-exterior-angle': () => import('./g8-exterior-angle.js'),
  'g8-similarity': () => import('./g8-similarity.js'),
  'g8-pythagoras': () => import('./g8-pythagoras.js'),
  'g8-pythagoras-3d': () => import('./g8-pythagoras-3d.js'),
  'g8-circle': () => import('./g8-circle.js'),
  // כיתה י״א
  'g11-u4-normal-dist': () => import('./g11-normal-distribution.js'),
};

export const LESSON_TOPIC_IDS = Object.keys(LOADERS);

export function hasLesson(topicId) {
  return Object.hasOwn(LOADERS, topicId);
}

/** @returns {Promise<object|null>} */
export async function loadLesson(topicId) {
  if (!hasLesson(topicId)) return null;
  const mod = await LOADERS[topicId]();
  return mod.default;
}
