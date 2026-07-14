import { HIGH_SCHOOL_TOPICS, UNIT_OPTIONS, getTopics as getHsTopics, getTopicById as getHsTopicById, isHighSchool, GRADE_LABELS } from './highSchool.js';
import {
  MIDDLE_SCHOOL_TOPICS,
  GRADE9_TRACKS,
  getMiddleSchoolTopics,
} from './middleSchool.js';
import {
  ELEMENTARY_TOPICS,
  getElementaryTopics,
} from './elementarySchool.js';

export {
  GRADE_LABELS,
  UNIT_OPTIONS,
  GRADE9_TRACKS,
  isHighSchool,
  HIGH_SCHOOL_TOPICS,
  MIDDLE_SCHOOL_TOPICS,
  ELEMENTARY_TOPICS,
};

export function isMiddleSchool(grade) {
  const g = Number(grade);
  return g >= 7 && g <= 9;
}

export function isElementary(grade) {
  const g = Number(grade);
  return g >= 1 && g <= 6;
}

export function allTopics() {
  return [...ELEMENTARY_TOPICS, ...MIDDLE_SCHOOL_TOPICS, ...HIGH_SCHOOL_TOPICS];
}

export function getTopicById(topicId) {
  return allTopics().find((t) => t.id === topicId) ?? null;
}

/**
 * @param {number|string} grade
 * @param {{ units?: number|null, track?: string|null }} [opts]
 */
export function getTopics(grade, opts = {}) {
  const g = Number(grade);
  if (isHighSchool(g)) {
    return getHsTopics(g, opts.units);
  }
  if (isMiddleSchool(g)) {
    return getMiddleSchoolTopics(g, g === 9 ? opts.track : null);
  }
  if (isElementary(g)) {
    return getElementaryTopics(g);
  }
  return [];
}

/** All topics for a grade (any track / units) — used by custom test builder. */
export function getAllTopicsForGrade(grade) {
  const g = Number(grade);
  return allTopics()
    .filter((t) => t.grade === g)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}
