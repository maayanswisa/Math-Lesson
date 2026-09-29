import MathRenderer from '../ui/MathRenderer';
import AngleMaker from './AngleMaker';
import AreaModel from './AreaModel';
import BalanceScale from './BalanceScale';
import BellCurve from './BellCurve';
import BoxVolume from './BoxVolume';
import CirclePi from './CirclePi';
import ClockFace from './ClockFace';
import ConceptCard from './ConceptCard';
import DiceSim from './DiceSim';
import ExteriorAngle from './ExteriorAngle';
import FractionBars from './FractionBars';
import GematriaCalc from './GematriaCalc';
import GroupsVisual from './GroupsVisual';
import LineGraph from './LineGraph';
import PercentBar from './PercentBar';
import PlaceValue from './PlaceValue';
import PrimeSieve from './PrimeSieve';
import RectGrid from './RectGrid';
import RightTriangle from './RightTriangle';
import RomanConverter from './RomanConverter';
import ShapeArea from './ShapeArea';
import SimilarScale from './SimilarScale';
import CircleTheorems from './CircleTheorems';
import ParabolaGraph from './ParabolaGraph';
import ParallelAngles from './ParallelAngles';
import QuadExplorer from './QuadExplorer';
import TreeDiagram from './TreeDiagram';
import TriangleSides from './TriangleSides';
import StepByStep from './StepByStep';
import CoinSim from './CoinSim';
import CoordPlane from './CoordPlane';
import CrossingLines from './CrossingLines';
import FreqBars from './FreqBars';
import FunctionMachine from './FunctionMachine';
import SignedLine from './SignedLine';
import TransformGrid from './TransformGrid';
import AreaIntegral from './AreaIntegral';
import BoxOptimizer from './BoxOptimizer';
import CircleLine from './CircleLine';
import CircleTangents from './CircleTangents';
import ReciprocalGraph from './ReciprocalGraph';
import ScatterCorr from './ScatterCorr';
import SineLaw from './SineLaw';
import TangentExplorer from './TangentExplorer';
import BinomialBars from './BinomialBars';
import DominoInduction from './DominoInduction';
import Revolution from './Revolution';
import RiemannSum from './RiemannSum';
import SequencePlot from './SequencePlot';
import SineWave from './SineWave';
import UnitCircle from './UnitCircle';
import VennProb from './VennProb';
import ExpLogGraph from './ExpLogGraph';
import GrowthModel from './GrowthModel';
import HypothesisTest from './HypothesisTest';
import Space3D from './Space3D';
import VectorPlane from './VectorPlane';
import TessellationPoint from './TessellationPoint';

/** בלוקים אינטראקטיביים שמקבלים את שדות הבלוק כמו שהם (props). */
const VISUALS = {
  angle: AngleMaker,
  area: AreaModel,
  bell: BellCurve,
  box: BoxVolume,
  circle: CirclePi,
  clock: ClockFace,
  dice: DiceSim,
  exterior: ExteriorAngle,
  fraction: FractionBars,
  gematria: GematriaCalc,
  line: LineGraph,
  percent: PercentBar,
  place: PlaceValue,
  primes: PrimeSieve,
  pythagoras: RightTriangle,
  rect: RectGrid,
  roman: RomanConverter,
  shape: ShapeArea,
  similar: SimilarScale,
  tessellation: TessellationPoint,
  triangle: TriangleSides,
  tree: TreeDiagram,
  quad: QuadExplorer,
  parallel: ParallelAngles,
  parabola: ParabolaGraph,
  circletheorems: CircleTheorems,
  signed: SignedLine,
  coords: CoordPlane,
  transform: TransformGrid,
  coins: CoinSim,
  machine: FunctionMachine,
  crossing: CrossingLines,
  bars: FreqBars,
  reciprocal: ReciprocalGraph,
  tangent: TangentExplorer,
  boxopt: BoxOptimizer,
  integral: AreaIntegral,
  tangents: CircleTangents,
  sinelaw: SineLaw,
  circleline: CircleLine,
  scatter: ScatterCorr,
  sequence: SequencePlot,
  domino: DominoInduction,
  riemann: RiemannSum,
  revolution: Revolution,
  unitcircle: UnitCircle,
  sinewave: SineWave,
  venn: VennProb,
  binomial: BinomialBars,
  explog: ExpLogGraph,
  growth: GrowthModel,
  vectors: VectorPlane,
  space: Space3D,
  hypothesis: HypothesisTest,
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
