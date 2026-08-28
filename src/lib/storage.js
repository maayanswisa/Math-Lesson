/** Parse JSON from localStorage, falling back to `fallback` on any error (missing key, malformed JSON, storage unavailable). */
export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/** Write JSON to localStorage, silently doing nothing if storage is unavailable (e.g. private browsing). */
export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable — write is best-effort
  }
}
