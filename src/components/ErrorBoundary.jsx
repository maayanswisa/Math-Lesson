import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Unhandled error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center px-4" dir="rtl">
        <div className="max-w-md space-y-4 rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5">
          <div className="text-4xl" aria-hidden="true">
            😕
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">
            אופס, משהו השתבש
          </h1>
          <p className="text-sm leading-relaxed text-[var(--color-slate)]">
            קרתה שגיאה בלתי צפויה. נסו לרענן את הדף — אם זה ממשיך לקרות, חִזרו לדף הבית והתחילו משם.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl bg-[var(--color-teal)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-teal-dark)]"
            >
              רענון הדף
            </button>
            <a
              href="/"
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] ring-1 ring-black/10 hover:ring-[var(--color-teal)]/40"
            >
              חזרה לדף הבית
            </a>
          </div>
        </div>
      </div>
    );
  }
}
