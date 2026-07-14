/**
 * Whether the "study more" popup should show after a quiz.
 * Fires whenever the student had more than one mistake.
 */
export function shouldShowStudyMorePopup(wrongCount) {
  return wrongCount > 1;
}
