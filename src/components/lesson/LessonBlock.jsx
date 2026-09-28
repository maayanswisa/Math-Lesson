import MathRenderer from '../ui/MathRenderer';
import AreaModel from './AreaModel';
import BalanceScale from './BalanceScale';
import BellCurve from './BellCurve';
import CirclePi from './CirclePi';
import ConceptCard from './ConceptCard';
import DiceSim from './DiceSim';
import ExteriorAngle from './ExteriorAngle';
import GroupsVisual from './GroupsVisual';
import LineGraph from './LineGraph';
import PercentBar from './PercentBar';
import RightTriangle from './RightTriangle';
import SimilarScale from './SimilarScale';
import StepByStep from './StepByStep';

/** בלוקים אינטראקטיביים שמקבלים את שדות הבלוק כמו שהם (props). */
const VISUALS = {
  area: AreaModel,
  bell: BellCurve,
  circle: CirclePi,
  dice: DiceSim,
  exterior: ExteriorAngle,
  line: LineGraph,
  percent: PercentBar,
  pythagoras: RightTriangle,
  similar: SimilarScale,
};

/** סוגי הבלוקים המוכרים — משמש גם את בדיקות התוכן. */
export const BLOCK_TYPES = ['text', 'card', 'steps', 'balance', 'groups', ...Object.keys(VISUALS)];

/** ממפה בלוק מנתוני המדריך לרכיב המתאים. */
export default function LessonBlock({ block }) {
  const Visual = VISUALS[block.type];
  if (Visual) {
    const { type: _type, ...props } = block;
    return <Visual {...props} />;
  }
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
