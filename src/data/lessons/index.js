/**
 * מדריכים אינטראקטיביים לפי נושא.
 *
 * רשימת המזהים קלה ונטענת עם דף הנושאים; תוכן המדריך עצמו נטען רק
 * כשנכנסים אליו (dynamic import), כמו בנק השאלות.
 */
const LOADERS = {
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
