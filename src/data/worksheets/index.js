/**
 * דפי עבודה לפי נושא: תזכורת, שני עמודי תרגול, מבדק ותשובות.
 *
 * המפתח הוא מזהה הנושא בתוכנית הלימודים (אחד-לאחד), כך שהכותרת,
 * האשכול והכיתה נלקחים משם. התוכן עצמו נטען רק כשנכנסים לדף.
 */
import { getTopicById } from '../curriculum/index.js';

const LOADERS = {
  'g2-numbers-1000': () => import('./g2/numbers-1000.js'),
  'g2-counting-1000': () => import('./g2/counting-1000.js'),
  'g2-even-odd': () => import('./g2/even-odd.js'),
  'g2-sequences': () => import('./g2/sequences.js'),
  'g2-add-sub-100': () => import('./g2/add-sub-100.js'),
  'g2-add-sub-properties': () => import('./g2/add-sub-properties.js'),
  'g2-mul-div-intro': () => import('./g2/mul-div-intro.js'),
  'g2-mul-div-properties': () => import('./g2/mul-div-properties.js'),
  'g2-fractions-half': () => import('./g2/fractions-half.js'),
  'g2-triangles': () => import('./g2/triangles.js'),
  'g2-right-angle': () => import('./g2/right-angle.js'),
  'g2-shapes-measure': () => import('./g2/shapes-measure.js'),
  'g2-length-measure': () => import('./g2/length-measure.js'),
  'g2-broken-lines': () => import('./g2/broken-lines.js'),
  'g2-perimeter': () => import('./g2/perimeter.js'),
  'g2-solids': () => import('./g2/solids.js'),
  'g2-volume-compare': () => import('./g2/volume-compare.js'),
  'g2-cube-building': () => import('./g2/cube-building.js'),
  'g2-clock': () => import('./g2/clock.js'),
  'g2-data': () => import('./g2/data.js'),

  'g3-numbers-10000': () => import('./g3/numbers-10000.js'),
  'g3-counting-10000': () => import('./g3/counting-10000.js'),
  'g3-gematria': () => import('./g3/gematria.js'),
  'g3-sequences': () => import('./g3/sequences.js'),
  'g3-add-sub-large': () => import('./g3/add-sub-large.js'),
  'g3-mul-div-100': () => import('./g3/mul-div-100.js'),
  'g3-divisibility': () => import('./g3/divisibility.js'),
  'g3-division-remainder': () => import('./g3/division-remainder.js'),
  'g3-distributive-law': () => import('./g3/distributive-law.js'),
  'g3-mul-div-10000': () => import('./g3/mul-div-10000.js'),
  'g3-fractions-unit': () => import('./g3/fractions-unit.js'),
  'g3-geometry': () => import('./g3/geometry.js'),
  'g3-area': () => import('./g3/area.js'),
  'g3-box-net': () => import('./g3/box-net.js'),
  'g3-clock-minutes': () => import('./g3/clock-minutes.js'),
  'g3-data': () => import('./g3/data.js'),
  'g5-numbers-million': () => import('./g5/numbers-million.js'),
  'g5-mul-div-adv': () => import('./g5/mul-div-adv.js'),
  'g5-word-problems': () => import('./g5/word-problems.js'),
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

  'g7-negative-numbers-intro': () => import('./g7/negative-numbers-intro.js'),
  'g7-signed': () => import('./g7/signed.js'),
  'g7-signed-mul-div': () => import('./g7/signed-mul-div.js'),
  'g7-order-powers': () => import('./g7/order-powers.js'),
  'g7-square-roots': () => import('./g7/square-roots.js'),
  'g7-coordinates': () => import('./g7/coordinates.js'),
  'g7-angles-basics': () => import('./g7/angles-basics.js'),
  'g7-angle-relationships': () => import('./g7/angle-relationships.js'),
  'g7-angles-triangles': () => import('./g7/angles-triangles.js'),
  'g7-transformations': () => import('./g7/transformations.js'),
  'g7-area-perimeter': () => import('./g7/area-perimeter.js'),
  'g7-solids-cube-box': () => import('./g7/solids-cube-box.js'),
  'g7-pythagorean': () => import('./g7/pythagorean.js'),
  'g7-prism': () => import('./g7/prism.js'),
  'g7-algebra-expr': () => import('./g7/algebra-expr.js'),
  'g7-combine-distribute': () => import('./g7/combine-distribute.js'),
  'g7-algebra-identity': () => import('./g7/algebra-identity.js'),
  'g7-equations': () => import('./g7/equations.js'),
  'g7-equations-applications': () => import('./g7/equations-applications.js'),
  'g7-graphs-quadrant1': () => import('./g7/graphs-quadrant1.js'),
  'g7-data-frequency': () => import('./g7/data-frequency.js'),
  'g7-relative-frequency': () => import('./g7/relative-frequency.js'),
  'g7-probability-intro': () => import('./g7/probability-intro.js'),
  'g7-functions-intro': () => import('./g7/functions-intro.js'),
  'g7-perpendicular-parallel': () => import('./g7/perpendicular-parallel.js'),

  'g8-linear-fn': () => import('./g8/linear-fn.js'),
  'g8-linear-eq-of-line': () => import('./g8/linear-eq-of-line.js'),
  'g8-linear-inequalities': () => import('./g8/linear-inequalities.js'),
  'g8-word-problems': () => import('./g8/word-problems.js'),
  'g8-equations-system': () => import('./g8/equations-system.js'),
  'g8-system-solutions': () => import('./g8/system-solutions.js'),
  'g8-algebra-technique': () => import('./g8/algebra-technique.js'),
  'g8-factoring': () => import('./g8/factoring.js'),
  'g8-ratio-proportion-scale': () => import('./g8/ratio-proportion-scale.js'),
  'g8-percent': () => import('./g8/percent.js'),
  'g8-stats-prob': () => import('./g8/stats-prob.js'),
  'g8-irrational-numbers': () => import('./g8/irrational-numbers.js'),
  'g8-congruence': () => import('./g8/congruence.js'),
  'g8-triangle-median-isosceles': () => import('./g8/triangle-median-isosceles.js'),
  'g8-exterior-angle': () => import('./g8/exterior-angle.js'),
  'g8-similarity': () => import('./g8/similarity.js'),
  'g8-pythagoras': () => import('./g8/pythagoras.js'),
  'g8-pythagoras-3d': () => import('./g8/pythagoras-3d.js'),
  'g8-circle': () => import('./g8/circle.js'),

  'g9r-powers': () => import('./g9/powers.js'),
  'g9r-factor-expand': () => import('./g9/factor-expand.js'),
  'g9r-algebraic-fractions': () => import('./g9/algebraic-fractions.js'),
  'g9r-quad-eq': () => import('./g9/quad-eq.js'),
  'g9r-inequalities': () => import('./g9/inequalities.js'),
  'g9r-quadratic-fn': () => import('./g9/quadratic-fn.js'),
  'g9r-quadratic-factored-form': () => import('./g9/quadratic-factored-form.js'),
  'g9r-geometry': () => import('./g9/geometry.js'),
  'g9r-parallel-trapezoid': () => import('./g9/parallel-trapezoid.js'),
  'g9r-parallelogram-proofs': () => import('./g9/parallelogram-proofs.js'),
  'g9r-rectangle-proofs': () => import('./g9/rectangle-proofs.js'),
  'g9r-rhombus-square': () => import('./g9/rhombus-square.js'),
  'g9r-kite-isosceles': () => import('./g9/kite-isosceles.js'),
  'g9r-triangle-inequality': () => import('./g9/triangle-inequality.js'),
  'g9r-constructions': () => import('./g9/constructions.js'),
  'g9r-proof-by-contradiction': () => import('./g9/proof-by-contradiction.js'),
  'g9r-circle-chords': () => import('./g9/circle-chords.js'),
  'g9r-circle-inscribed-tangent': () => import('./g9/circle-inscribed-tangent.js'),
  'g9r-solid-prism-pyramid': () => import('./g9/solid-prism-pyramid.js'),
  'g9r-solid-cylinder-cone': () => import('./g9/solid-cylinder-cone.js'),
  'g9r-probability': () => import('./g9/probability.js'),
  'g9r-probability-tree': () => import('./g9/probability-tree.js'),
  'g9x-linear': () => import('./g9/x-linear.js'),
  'g9x-quadratic': () => import('./g9/x-quadratic.js'),
  'g9x-equations': () => import('./g9/x-equations.js'),
  'g9x-geo': () => import('./g9/x-geo.js'),
  'g9x-percent-prob': () => import('./g9/x-percent-prob.js'),

  'g11-u4-precalc-rational': () => import('./g11/precalc-rational.js'),
  'g11-u4-rational-root': () => import('./g11/rational-root.js'),
  'g11-u4-extremum-3d': () => import('./g11/extremum-3d.js'),
  'g11-u4-integral': () => import('./g11/integral.js'),
  'g11-u4-analysis-review': () => import('./g11/analysis-review.js'),
  'g11-u4-plane-circle': () => import('./g11/plane-circle.js'),
  'g11-u4-circle-tangents': () => import('./g11/circle-tangents.js'),
  'g11-u4-trig-sine': () => import('./g11/trig-sine.js'),
  'g11-u4-analytic-circle': () => import('./g11/analytic-circle.js'),
  'g11-u4-geometry-review': () => import('./g11/geometry-review.js'),
  'g11-u4-normal-dist': () => import('./g11/normal-dist.js'),
  'g11-u4-correlation-regression': () => import('./g11/correlation-regression.js'),
  'g11-u4-normal-regression': () => import('./g11/normal-regression.js'),
  'g11-u4-rational-transform': () => import('./g11/rational-transform.js'),
  'g11-u4-rational-params': () => import('./g11/rational-params.js'),
  'g11-u4-derivative-graph': () => import('./g11/derivative-graph.js'),
  'g11-u4-root-equations': () => import('./g11/root-equations.js'),
  'g11-u4-extremum-applied': () => import('./g11/extremum-applied.js'),
  'g11-u4-extremum-geometry': () => import('./g11/extremum-geometry.js'),
  'g11-u4-integral-functions': () => import('./g11/integral-functions.js'),
  'g11-u4-areas': () => import('./g11/areas.js'),
  'g11-u4-function-investigation': () => import('./g11/function-investigation.js'),
  'g11-u4-absolute-extrema': () => import('./g11/absolute-extrema.js'),
  'g11-u4-extremum-space': () => import('./g11/extremum-space.js'),
};

export const WORKSHEET_TOPIC_IDS = Object.keys(LOADERS);

export function hasWorksheet(topicId) {
  return Object.hasOwn(LOADERS, topicId);
}

/**
 * נושאי הכיתה שיש להם דף עבודה, לפי סדר תוכנית הלימודים.
 * בתיכון — רק של אותן יחידות לימוד; בכיתה ט׳ — רק של אותו מסלול.
 */
export function getWorksheetTopics(grade, { units = null, track = null } = {}) {
  return WORKSHEET_TOPIC_IDS.map(getTopicById)
    .filter(
      (t) =>
        t &&
        t.grade === Number(grade) &&
        (units == null || t.units === Number(units)) &&
        (track == null || t.track === track),
    )
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

/** הנתיב לרשימת דפי העבודה של כיתה (ויחידות / מסלול). */
export function worksheetsHref({ grade, units = null, track = null }) {
  if (units != null) return `/grade/${grade}/units/${units}/worksheets`;
  if (track != null) return `/grade/${grade}/track/${track}/worksheets`;
  return `/grade/${grade}/worksheets`;
}

/** @returns {Promise<object|null>} */
export async function loadWorksheet(topicId) {
  if (!hasWorksheet(topicId)) return null;
  const mod = await LOADERS[topicId]();
  return mod.default;
}
