export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/25">
      <div className="mx-auto grid w-full max-w-[1920px] gap-6 px-4 py-10 md:grid-cols-3 md:px-8 xl:px-12">
        <div>
          <p className="text-lg font-semibold">fastai-stack</p>
          <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
            AI-native FastAPI stack generator built for developers who want speed, structure,
            and production-ready defaults.
          </p>
        </div>
        <div className="code text-sm text-[var(--muted)]">
          <p className="mb-2 text-slate-300">Resources</p>
          <ul className="space-y-1">
            <li><a href="/docs" className="hover:text-cyan-100">Documentation</a></li>
            <li><a href="https://pypi.org/project/fastai-stack/" target="_blank" rel="noreferrer" className="hover:text-cyan-100">PyPI package</a></li>
            <li><a href="https://github.com/HarshG1308/fastai-stack" target="_blank" rel="noreferrer" className="hover:text-cyan-100">GitHub repository</a></li>
          </ul>
        </div>
        <div className="code text-sm text-[var(--muted)]">
          <p className="mb-2 text-slate-300">Builder focus</p>
          <ul className="space-y-1">
            <li>FastAPI + Pydantic v2</li>
            <li>AI integrations and vector options</li>
            <li>Docker CPU/GPU deployment profiles</li>
            <li>Edge-case tested template generation</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-3 text-center text-xs text-[var(--muted)] md:px-8 xl:px-12">
        © 2026 fastai-stack • Built by Harsh Gautam
      </div>
    </footer>
  );
}
