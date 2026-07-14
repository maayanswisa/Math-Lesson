const PROGRESS_KEY = 'math-lesson-progress-v1';
const STUDENT_CODE_KEY = 'math-lesson-student-code';

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { attempts: [] };
    return JSON.parse(raw);
  } catch {
    return { attempts: [] };
  }
}

function saveProgress(data) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

export function getOrCreateStudentCode() {
  let code = localStorage.getItem(STUDENT_CODE_KEY);
  if (!code) {
    code = `ML-${Math.random().toString(36).slice(2, 6).toUpperCase()}${Date.now().toString(36).slice(-3).toUpperCase()}`;
    localStorage.setItem(STUDENT_CODE_KEY, code);
  }
  return code;
}

export function logQuizAttempt({
  topicId = null,
  title = '',
  grade = null,
  score = 0,
  correctCount = 0,
  total = 0,
  custom = false,
}) {
  const data = loadProgress();
  data.attempts = data.attempts || [];
  data.attempts.unshift({
    id: `att-${Date.now()}`,
    topicId,
    title,
    grade,
    score,
    correctCount,
    total,
    custom: Boolean(custom),
    at: new Date().toISOString(),
  });
  data.attempts = data.attempts.slice(0, 100);
  saveProgress(data);
  return data.attempts[0];
}

export function getAttempts() {
  return loadProgress().attempts || [];
}

export function getWeakTopics(limit = 5) {
  const attempts = getAttempts().filter((a) => a.topicId && !a.custom);
  const byTopic = {};
  for (const a of attempts) {
    if (!byTopic[a.topicId]) {
      byTopic[a.topicId] = { topicId: a.topicId, title: a.title, scores: [], n: 0 };
    }
    byTopic[a.topicId].scores.push(a.score);
    byTopic[a.topicId].n += 1;
    byTopic[a.topicId].title = a.title || byTopic[a.topicId].title;
  }
  return Object.values(byTopic)
    .map((t) => ({
      ...t,
      avg: Math.round(t.scores.reduce((s, x) => s + x, 0) / t.scores.length),
    }))
    .sort((a, b) => a.avg - b.avg)
    .slice(0, limit);
}

export function getWeeklySummary() {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recent = getAttempts().filter((a) => new Date(a.at).getTime() >= weekAgo);
  if (!recent.length) {
    return { count: 0, avgScore: 0, best: null, improved: false };
  }
  const avgScore = Math.round(recent.reduce((s, a) => s + a.score, 0) / recent.length);
  const best = recent.reduce((b, a) => (a.score > b.score ? a : b), recent[0]);
  const firstHalf = recent.slice(Math.floor(recent.length / 2));
  const secondHalf = recent.slice(0, Math.floor(recent.length / 2) || 1);
  const avgOld =
    firstHalf.reduce((s, a) => s + a.score, 0) / Math.max(firstHalf.length, 1);
  const avgNew =
    secondHalf.reduce((s, a) => s + a.score, 0) / Math.max(secondHalf.length, 1);
  return {
    count: recent.length,
    avgScore,
    best,
    improved: avgNew >= avgOld,
  };
}

const PARENT_LINK_KEY = 'math-lesson-parent-link';

export function linkStudentCode(code) {
  const normalized = String(code || '').trim().toUpperCase();
  if (!normalized) return false;
  localStorage.setItem(PARENT_LINK_KEY, normalized);
  return true;
}

export function getLinkedStudentCode() {
  return localStorage.getItem(PARENT_LINK_KEY);
}
