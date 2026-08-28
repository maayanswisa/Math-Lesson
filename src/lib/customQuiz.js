const CUSTOM_QUIZ_KEY = 'math-lesson-custom-quiz';

/** The stored { questions, grade, topicIds, title } payload, or null if there isn't one / it's malformed. */
export function readCustomQuiz() {
  try {
    const raw = sessionStorage.getItem(CUSTOM_QUIZ_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Throws if sessionStorage is unavailable (e.g. private browsing) or full — callers decide how to surface that. */
export function writeCustomQuiz(payload) {
  sessionStorage.setItem(CUSTOM_QUIZ_KEY, JSON.stringify(payload));
}
