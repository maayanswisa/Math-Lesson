/** Normal-distribution helpers for the lesson visuals. */

/** erf via Abramowitz–Stegun 7.1.26 (max error ~1.5e-7 — well under table precision). */
function erf(x) {
  const sign = Math.sign(x);
  const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-a * a);
  return sign * y;
}

/** Φ(z): share of a standard normal population below z (what the table gives). */
export function normalCdf(z) {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

export function normalPdf(x, mean = 0, sd = 1) {
  const z = (x - mean) / sd;
  return Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
}
