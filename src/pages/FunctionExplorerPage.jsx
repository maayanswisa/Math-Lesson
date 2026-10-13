import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DomainInfo from '../components/functions/DomainInfo';
import FamilyPicker from '../components/functions/FamilyPicker';
import FormulaPanel from '../components/functions/FormulaPanel';
import FunctionPlot from '../components/functions/FunctionPlot';
import ParamControls from '../components/functions/ParamControls';
import { getFamily, initialParams } from '../lib/functionFamilies';

/**
 * סייר הפונקציות: בוחרים סוג פונקציה, מזיזים את הפרמטרים ורואים את הגרף, תחום ההגדרה והנגזרת.
 * סוג הפונקציה שמור בכתובת (?f=log...) כדי שאפשר יהיה לשתף קישור.
 */
export default function FunctionExplorerPage() {
  const [search, setSearch] = useSearchParams();
  const family = getFamily(search.get('f'));
  const [state, setState] = useState(() => ({ id: family.id, params: initialParams(family) }));
  const [showDerivative, setShowDerivative] = useState(false);

  // מעבר למשפחה אחרת (גם בכפתורי "אחורה" של הדפדפן) מתחיל מערכי ברירת המחדל שלה
  const params = state.id === family.id ? state.params : initialParams(family);

  const choose = (id) => {
    setSearch(id === 'linear' ? {} : { f: id }, { replace: true });
    setState({ id, params: initialParams(getFamily(id)) });
  };
  const setParam = (key, value) => setState({ id: family.id, params: { ...params, [key]: value } });
  const reset = () => setState({ id: family.id, params: initialParams(family) });

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
          <span aria-hidden="true">📈 </span>סייר הפונקציות
        </h1>
        <p className="mt-2 text-[var(--color-slate)]">
          בוחרים סוג פונקציה, מזיזים את הפרמטרים ורואים מה קורה לגרף, לתחום ההגדרה — ולנגזרת.
        </p>
      </div>

      <FamilyPicker value={family.id} onChange={choose} />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="order-1 lg:col-start-1 lg:row-start-1">
          <FormulaPanel
            family={family}
            params={params}
            showDerivative={showDerivative}
            onToggleDerivative={() => setShowDerivative((v) => !v)}
          />
        </div>
        <div className="order-2 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-3 lg:row-start-1">
          <FunctionPlot family={family} params={params} showDerivative={showDerivative} />
        </div>
        <div className="order-3 lg:col-start-1 lg:row-start-2">
          <ParamControls family={family} params={params} onChange={setParam} onReset={reset} />
        </div>
        <div className="order-4 lg:col-start-1 lg:row-start-3">
          <DomainInfo family={family} params={params} />
        </div>
      </div>
    </div>
  );
}
