import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  BADGE_DEFS,
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
    badges: [],
    muted: false,
    streak: 0,
  };
}

export function GameProvider({ children }) {
  const [state, setState] = useState(() => ({ ...defaultState(), ...(loadState() || {}) }));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const levelInfo = useMemo(() => nextLevelInfo(state.xp), [state.xp]);
  const level = useMemo(() => levelFromXp(state.xp), [state.xp]);

  const toggleMute = useCallback(() => {
    setState((s) => ({ ...s, muted: !s.muted }));
  }, []);

  const recordAnswer = useCallback(
    (isCorrect) => {
      const nextStreak = isCorrect ? state.streak + 1 : 0;
      const badges = [...state.badges];
      const newBadges = [];
      let xpGained = 0;

      if (isCorrect) {
        xpGained = XP_CORRECT;
        if (nextStreak > 0 && nextStreak % 3 === 0) xpGained += XP_STREAK_BONUS;
        if (nextStreak >= 5 && !badges.includes('hot_streak')) {
          badges.push('hot_streak');
          newBadges.push(BADGE_DEFS.hot_streak);
        }
        const hour = new Date().getHours();
        if (hour >= 20 && !badges.includes('night_owl')) {
          badges.push('night_owl');
          newBadges.push(BADGE_DEFS.night_owl);
        }
      }

      setState((s) => ({
        ...s,
        xp: s.xp + xpGained,
        streak: nextStreak,
        badges,
      }));

      return { xpGained, newBadges };
    },
    [state.streak, state.badges],
  );

  const recordQuizComplete = useCallback(
    ({ topicCluster, perfect }) => {
      const badges = [...state.badges];
      const newBadges = [];
      let xpGained = XP_TOPIC_BONUS;
      if (perfect) xpGained += XP_TOPIC_BONUS;

      const isGeo =
        typeof topicCluster === 'string' &&
        (topicCluster.includes('גאומט') || topicCluster.toLowerCase().includes('geo'));

      if (perfect && isGeo && !badges.includes('geo_perfect')) {
        badges.push('geo_perfect');
        newBadges.push(BADGE_DEFS.geo_perfect);
      }

      setState((s) => ({ ...s, xp: s.xp + xpGained, badges }));
      return { xpGained, newBadges };
    },
    [state.badges],
  );

  const value = useMemo(
    () => ({
      xp: state.xp,
      muted: state.muted,
      streak: state.streak,
      badges: state.badges,
      badgeDefs: BADGE_DEFS,
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
      state.badges,
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
