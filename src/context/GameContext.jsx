import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  XP_CORRECT,
  XP_STREAK_BONUS,
  XP_TOPIC_BONUS,
  levelFromXp,
  nextLevelInfo,
} from '../lib/gameConfig';

const STORAGE_KEY = 'math-lesson-game-v1';

const GameContext = createContext(null);

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function defaultState() {
  return {
    xp: 0,
    muted: false,
    streak: 0,
  };
}

export function GameProvider({ children }) {
  const [state, setState] = useState(() => ({ ...defaultState(), ...(loadState() || {}) }));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable (e.g. private browsing) — progress just won't persist
    }
  }, [state]);

  const levelInfo = useMemo(() => nextLevelInfo(state.xp), [state.xp]);
  const level = useMemo(() => levelFromXp(state.xp), [state.xp]);

  const toggleMute = useCallback(() => {
    setState((s) => ({ ...s, muted: !s.muted }));
  }, []);

  const recordAnswer = useCallback(
    (isCorrect) => {
      const nextStreak = isCorrect ? state.streak + 1 : 0;
      let xpGained = 0;

      if (isCorrect) {
        xpGained = XP_CORRECT;
        if (nextStreak > 0 && nextStreak % 3 === 0) xpGained += XP_STREAK_BONUS;
      }

      setState((s) => ({
        ...s,
        xp: s.xp + xpGained,
        streak: nextStreak,
      }));

      return { xpGained };
    },
    [state.streak],
  );

  const recordQuizComplete = useCallback(
    ({ perfect }) => {
      let xpGained = XP_TOPIC_BONUS;
      if (perfect) xpGained += XP_TOPIC_BONUS;

      setState((s) => ({ ...s, xp: s.xp + xpGained }));
      return { xpGained };
    },
    [],
  );

  const value = useMemo(
    () => ({
      xp: state.xp,
      muted: state.muted,
      streak: state.streak,
      level,
      levelInfo,
      toggleMute,
      recordAnswer,
      recordQuizComplete,
    }),
    [
      state.xp,
      state.muted,
      state.streak,
      level,
      levelInfo,
      toggleMute,
      recordAnswer,
      recordQuizComplete,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
