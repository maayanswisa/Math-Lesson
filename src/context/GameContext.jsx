import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  XP_CORRECT,
  XP_STREAK_BONUS,
  XP_TOPIC_BONUS,
  levelFromXp,
  nextLevelInfo,
} from '../lib/gameConfig';
import { readJSON, writeJSON } from '../lib/storage.js';

const STORAGE_KEY = 'math-lesson-game-v1';

const GameContext = createContext(null);

function loadState() {
  const parsed = readJSON(STORAGE_KEY, null);
  if (
    !parsed ||
    typeof parsed.xp !== 'number' ||
    typeof parsed.muted !== 'boolean' ||
    typeof parsed.streak !== 'number'
  ) {
    return null;
  }
  return parsed;
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
    writeJSON(STORAGE_KEY, state);
  }, [state]);

  const levelInfo = useMemo(() => nextLevelInfo(state.xp), [state.xp]);
  const level = useMemo(() => levelFromXp(state.xp), [state.xp]);

  const toggleMute = useCallback(() => {
    setState((s) => ({ ...s, muted: !s.muted }));
  }, []);

  const recordAnswer = useCallback((isCorrect) => {
    let xpGained = 0;
    setState((s) => {
      const nextStreak = isCorrect ? s.streak + 1 : 0;
      if (isCorrect) {
        xpGained = XP_CORRECT;
        if (nextStreak > 0 && nextStreak % 3 === 0) xpGained += XP_STREAK_BONUS;
      }
      return { ...s, xp: s.xp + xpGained, streak: nextStreak };
    });
    return { xpGained };
  }, []);

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
