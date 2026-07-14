import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import GameHUD from './components/ui/GameHUD';
import HomePage from './pages/HomePage';
import UnitsPage from './pages/UnitsPage';
import TopicsPage from './pages/TopicsPage';
import QuizPage from './pages/QuizPage';
import CustomTestPage from './pages/CustomTestPage';
import ParentDashboardPage from './pages/ParentDashboardPage';

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <header className="border-b border-black/5 bg-white/50 backdrop-blur-sm">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
              <Link
                to="/"
                className="font-[family-name:var(--font-display)] text-xl text-[var(--color-ink)]"
              >
                Math Lesson
              </Link>
              <nav className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-slate)]">
                <Link to="/custom-test" className="hover:text-[var(--color-teal)]">
                  מבחן מותאם
                </Link>
                <Link to="/parent" className="hover:text-[var(--color-teal)]">
                  הורים / מורים
                </Link>
                <GameHUD />
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-5xl px-4 py-10">
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
          </main>
        </div>
      </BrowserRouter>
    </GameProvider>
  );
}
