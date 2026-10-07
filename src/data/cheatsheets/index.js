/**
 * דפי עזר מסכמים לפי נושא (מזהה הנושא בתוכנית הלימודים).
 * התוכן נטען רק כשנכנסים לדף.
 */
const LOADERS = {
  'g11-u4-precalc-rational': () => import('./g11-u4-precalc-rational.js'),
};

export const CHEATSHEET_TOPIC_IDS = Object.keys(LOADERS);

export const hasCheatSheet = (topicId) => topicId in LOADERS;

export async function loadCheatSheet(topicId) {
  const load = LOADERS[topicId];
  return load ? (await load()).default : null;
}
