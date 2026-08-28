import { lazy, Suspense } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import GameHUD from './components/ui/GameHUD';

// Each page is its own chunk, downloaded only when a visitor actually
// navigates there — a first-time visitor no longer has to fetch every
// page's code just to see the home page.
const HomePage = lazy(() => import('./pages/HomePage'));
const UnitsPage = lazy(() => import('./pages/UnitsPage'));
const TopicsPage = lazy(() => import('./pages/TopicsPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const CustomTestPage = lazy(() => import('./pages/CustomTestPage'));
const ParentDashboardPage = lazy(() => import('./pages/ParentDashboardPage'));

function PageLoading() {
  return (
    <div className="rounded-2xl bg-white/80 p-8 text-center text-[var(--color-slate)] shadow-sm ring-1 ring-black/5">
      טוען…
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <header
            className="bg-white/60 backdrop-blur-sm"
            style={{
              borderBottom: '3px solid transparent',
              borderImage:
                'linear-gradient(90deg, var(--color-teal), var(--color-sky), var(--color-violet), var(--color-berry), var(--color-sunshine)) 1',
            }}
          >
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
              <Link
                to="/"
                className="flex items-center gap-2 font-[family-name:var(--font-display)] text-[var(--color-ink)]"
              >
                <span aria-hidden="true" className="text-xl">
                  🧮
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-xl">Math Lesson</span>
                  <span className="text-xs font-normal text-[var(--color-slate)]">תרגול מתמטיקה</span>
                </span>
              </Link>
              <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-[var(--color-slate)]">
                <Link to="/custom-test" className="hover:text-[var(--color-teal)]">
                  מבחן מותאם
                </Link>
                <Link to="/parent" className="hover:text-[var(--color-violet)]">
                  ההתקדמות שלי
                </Link>
                <GameHUD />
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-5xl px-4 py-10">
            <Suspense fallback={<PageLoading />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/custom-test" element={<CustomTestPage />} />
                <Route path="/parent" element={<ParentDashboardPage />} />
                <Route path="/grade/:grade" element={<UnitsPage />} />
                <Route path="/grade/:grade/topics" element={<TopicsPage />} />
                <Route path="/grade/:grade/track/:track" element={<TopicsPage />} />
                <Route path="/grade/:grade/units/:units" element={<TopicsPage />} />
                <Route path="/quiz/:topicId" element={<QuizPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </BrowserRouter>
    </GameProvider>
  );
}
