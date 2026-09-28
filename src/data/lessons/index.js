/**
 * מדריכים אינטראקטיביים לפי נושא.
 *
 * רשימת המזהים קלה ונטענת עם דף הנושאים; תוכן המדריך עצמו נטען רק
 * כשנכנסים אליו (dynamic import), כמו בנק השאלות.
 */
const LOADERS = {
  'g8-equations-system': () => import('./g8-equations-brackets.js'),
  'g11-u4-normal-dist': () => import('./g11-normal-distribution.js'),
};

export function hasLesson(topicId) {
  return Object.hasOwn(LOADERS, topicId);
}

/** @returns {Promise<object|null>} */
export async function loadLesson(topicId) {
  if (!hasLesson(topicId)) return null;
  const mod = await LOADERS[topicId]();
  return mod.default;
}
