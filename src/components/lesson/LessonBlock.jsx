import MathRenderer from '../ui/MathRenderer';
import AreaModel from './AreaModel';
import BalanceScale from './BalanceScale';
import BellCurve from './BellCurve';
import BoxVolume from './BoxVolume';
import CirclePi from './CirclePi';
import ConceptCard from './ConceptCard';
import DiceSim from './DiceSim';
import ExteriorAngle from './ExteriorAngle';
import FractionBars from './FractionBars';
import GroupsVisual from './GroupsVisual';
import LineGraph from './LineGraph';
import PercentBar from './PercentBar';
import PlaceValue from './PlaceValue';
import PrimeSieve from './PrimeSieve';
import RightTriangle from './RightTriangle';
import RomanConverter from './RomanConverter';
import ShapeArea from './ShapeArea';
import SimilarScale from './SimilarScale';
import StepByStep from './StepByStep';
import TessellationPoint from './TessellationPoint';

/** בלוקים אינטראקטיביים שמקבלים את שדות הבלוק כמו שהם (props). */
const VISUALS = {
  area: AreaModel,
  bell: BellCurve,
  box: BoxVolume,
  circle: CirclePi,
  dice: DiceSim,
  exterior: ExteriorAngle,
  fraction: FractionBars,
  line: LineGraph,
  percent: PercentBar,
  place: PlaceValue,
  primes: PrimeSieve,
  pythagoras: RightTriangle,
  roman: RomanConverter,
  shape: ShapeArea,
  similar: SimilarScale,
  tessellation: TessellationPoint,
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
