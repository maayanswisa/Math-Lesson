import MathRenderer from '../ui/MathRenderer';
import BalanceScale from './BalanceScale';
import ConceptCard from './ConceptCard';
import GroupsVisual from './GroupsVisual';
import StepByStep from './StepByStep';

/** ממפה בלוק מנתוני המדריך לרכיב המתאים. */
export default function LessonBlock({ block }) {
  switch (block.type) {
    case 'text':
      return <MathRenderer className="text-lg text-[var(--color-ink)]">{block.md}</MathRenderer>;
    case 'card':
      return <ConceptCard tone={block.tone} title={block.title} md={block.md} />;
    case 'steps':
      return <StepByStep title={block.title} steps={block.steps} />;
    case 'balance':
      return (
        <BalanceScale caption={block.caption} solution={block.solution} left={block.left} right={block.right} />
      );
    case 'groups':
      return <GroupsVisual k={block.k} xs={block.xs} units={block.units} />;
    default:
      return null;
  }
}
