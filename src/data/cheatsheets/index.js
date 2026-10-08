/**
 * דפי עזר מסכמים לפי נושא (מזהה הנושא בתוכנית הלימודים).
 * התוכן נטען רק כשנכנסים לדף.
 */
const LOADERS = {
  // כיתה ח' — אלגברה
  'g8-linear-fn': () => import('./g8-linear-fn.js'),
  'g8-linear-eq-of-line': () => import('./g8-linear-eq-of-line.js'),
  'g8-linear-inequalities': () => import('./g8-linear-inequalities.js'),
  'g8-word-problems': () => import('./g8-word-problems.js'),
  'g8-equations-system': () => import('./g8-equations-system.js'),
  'g8-system-solutions': () => import('./g8-system-solutions.js'),
  'g8-algebra-technique': () => import('./g8-algebra-technique.js'),
  'g8-factoring': () => import('./g8-factoring.js'),
  // כיתה ח' — תחום מספרי
  'g8-ratio-proportion-scale': () => import('./g8-ratio-proportion-scale.js'),
  'g8-percent': () => import('./g8-percent.js'),
  'g8-stats-prob': () => import('./g8-stats-prob.js'),
  'g8-irrational-numbers': () => import('./g8-irrational-numbers.js'),
  // כיתה ח' — גאומטריה
  'g8-congruence': () => import('./g8-congruence.js'),
  'g8-triangle-median-isosceles': () => import('./g8-triangle-median-isosceles.js'),
  'g8-exterior-angle': () => import('./g8-exterior-angle.js'),
  'g8-similarity': () => import('./g8-similarity.js'),
  'g8-pythagoras': () => import('./g8-pythagoras.js'),
  'g8-pythagoras-3d': () => import('./g8-pythagoras-3d.js'),
  'g8-circle': () => import('./g8-circle.js'),

  // י"א 4 יח"ל — חשבון דיפרנציאלי ואינטגרלי
  'g11-u4-precalc-rational': () => import('./g11-u4-precalc-rational.js'),
  'g11-u4-rational-transform': () => import('./g11-u4-rational-transform.js'),
  'g11-u4-rational-root': () => import('./g11-u4-rational-root.js'),
  'g11-u4-rational-params': () => import('./g11-u4-rational-params.js'),
  'g11-u4-derivative-graph': () => import('./g11-u4-derivative-graph.js'),
  'g11-u4-root-equations': () => import('./g11-u4-root-equations.js'),
  'g11-u4-function-investigation': () => import('./g11-u4-function-investigation.js'),
  'g11-u4-absolute-extrema': () => import('./g11-u4-absolute-extrema.js'),
  'g11-u4-extremum-3d': () => import('./g11-u4-extremum-3d.js'),
  'g11-u4-extremum-applied': () => import('./g11-u4-extremum-applied.js'),
  'g11-u4-extremum-geometry': () => import('./g11-u4-extremum-geometry.js'),
  'g11-u4-extremum-space': () => import('./g11-u4-extremum-space.js'),
  'g11-u4-integral': () => import('./g11-u4-integral.js'),
  'g11-u4-integral-functions': () => import('./g11-u4-integral-functions.js'),
  'g11-u4-areas': () => import('./g11-u4-areas.js'),
  'g11-u4-analysis-review': () => import('./g11-u4-analysis-review.js'),
  // גאומטריה וטריגונומטריה
  'g11-u4-plane-circle': () => import('./g11-u4-plane-circle.js'),
  'g11-u4-circle-tangents': () => import('./g11-u4-circle-tangents.js'),
  'g11-u4-trig-sine': () => import('./g11-u4-trig-sine.js'),
  'g11-u4-analytic-circle': () => import('./g11-u4-analytic-circle.js'),
  'g11-u4-geometry-review': () => import('./g11-u4-geometry-review.js'),
  // סטטיסטיקה והסתברות
  'g11-u4-normal-dist': () => import('./g11-u4-normal-dist.js'),
  'g11-u4-correlation-regression': () => import('./g11-u4-correlation-regression.js'),
  'g11-u4-normal-regression': () => import('./g11-u4-normal-regression.js'),
};

export const CHEATSHEET_TOPIC_IDS = Object.keys(LOADERS);

export const hasCheatSheet = (topicId) => topicId in LOADERS;

export async function loadCheatSheet(topicId) {
  const load = LOADERS[topicId];
  return load ? (await load()).default : null;
}
