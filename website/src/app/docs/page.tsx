import { DocsProgress } from "@/components/docs-progress";
import { DocsSidebar } from "@/components/docs-sidebar";
import { Navbar } from "@/components/navbar";

const sections = [
  { id: "quick-start", label: "Quick Start" },
  { id: "philosophy", label: "Philosophy" },
  { id: "commands", label: "CLI Commands" },
  { id: "builder", label: "Builder Deep Dive" },
  { id: "profiles", label: "Stack Profiles" },
  { id: "architecture", label: "Architecture" },
  { id: "recipes", label: "Common Recipes" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "deploy", label: "Deploy" },
  { id: "faq", label: "FAQ" },
];

export default function DocsPage() {
  return (
    <div className="site-surface min-h-screen">
      <Navbar />
      <main className="grid w-full gap-6 px-4 pb-24 pt-10 md:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_240px] md:px-8 xl:px-12">
        <DocsSidebar />

        <article className="frame rounded-2xl p-6 md:p-10">
          <header id="quick-start" className="mb-10 border-b border-white/10 pb-8">
            <p className="code text-xs uppercase tracking-[0.18em] text-cyan-200">Documentation</p>
            <h1 className="mt-3 text-4xl font-semibold">Quick Start</h1>
            <p className="mt-3 max-w-3xl text-[var(--muted)]">
              Spin up your first AI-ready FastAPI backend with fastai-stack, then customize your stack
              for production. This guide focuses on practical setup with robust defaults.
            </p>
            <div className="code mt-5 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200">
              <p>$ pip install fastai-stack</p>
              <p>$ fastai-stack create myapp --interactive</p>
              <p>$ cd myapp && poetry install && poetry run uvicorn app.main:app --reload</p>
            </div>
          </header>

          <section id="philosophy" className="mb-10">
            <h2 className="mb-3 text-2xl font-semibold">Philosophy</h2>
            <ul className="list-disc space-y-2 pl-5 text-[var(--muted)]">
              <li>Roll your own stack: include only what your service needs.</li>
              <li>Production from the start: no toy templates.</li>
              <li>AI-first backend design: streaming, embeddings, and vector stores built in.</li>
              <li>Fast iteration with safe defaults and explicit options.</li>
            </ul>
          </section>

          <section id="commands" className="mb-10">
            <h2 className="mb-3 text-2xl font-semibold">CLI Commands</h2>
            <div className="code space-y-3 rounded-xl border border-white/10 bg-black/35 p-4 text-sm text-slate-200">
              <p>$ pip install fastai-stack</p>
              <p>$ fastai-stack create myapp --interactive</p>
              <p>$ fastai-stack create myapp --non-interactive --db postgres --auth jwt --ai openai</p>
              <p>$ fastai-stack version</p>
            </div>
          </section>

          <section id="builder" className="mb-10">
            <h2 className="mb-3 text-2xl font-semibold">Builder Deep Dive</h2>
            <p className="text-[var(--muted)]">
              The builder transforms option flags into explicit template branches. Each branch controls
              generated files, dependency sets, compose services, and optional endpoints.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <h3 className="code text-xs uppercase tracking-[0.2em] text-cyan-200">Validation layer</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Invalid combinations are blocked before rendering to avoid broken projects.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <h3 className="code text-xs uppercase tracking-[0.2em] text-cyan-200">Template map</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Optional features insert only related modules to keep output focused and maintainable.
                </p>
              </div>
            </div>
          </section>

          <section id="profiles" className="mb-10">
            <h2 className="mb-3 text-2xl font-semibold">Stack Profiles</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <h3 className="code mb-2 text-sm uppercase tracking-widest text-cyan-200">AI Core</h3>
                <p className="text-sm text-[var(--muted)]">Postgres, JWT, Celery, OpenAI, pgvector, Prometheus, GPU.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <h3 className="code mb-2 text-sm uppercase tracking-widest text-amber-200">Lean API</h3>
                <p className="text-sm text-[var(--muted)]">SQLite, no auth, no tasks, no AI, CPU-only minimal service.</p>
              </div>
            </div>
          </section>

          <section id="architecture" className="mb-10">
            <h2 className="mb-3 text-2xl font-semibold">Architecture</h2>
            <div className="code rounded-xl border border-white/10 bg-black/35 p-4 text-sm text-slate-200">
              <p>app/</p>
              <p>├─ core/        # config, deps, security</p>
              <p>├─ api/v1/      # routers and endpoints</p>
              <p>├─ models/      # domain models</p>
              <p>├─ schemas/     # request/response DTOs</p>
              <p>└─ crud/        # data access and repositories</p>
            </div>
            <p className="mt-3 text-[var(--muted)]">
              The generated layout is intentionally opinionated, balancing clarity for solo developers and
              modularity for teams scaling across multiple services.
            </p>
          </section>

          <section id="recipes" className="mb-10">
            <h2 className="mb-3 text-2xl font-semibold">Common Recipes</h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <h3 className="code text-xs uppercase tracking-widest text-cyan-200">AI API + Queue + Vector Search</h3>
                <p className="code mt-2 text-sm text-slate-200">
                  fastai-stack create ai-prod --non-interactive --db postgres --auth jwt --tasks celery+redis --ai openai --vector-db pgvector --docker gpu --monitoring prometheus --frontend none
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <h3 className="code text-xs uppercase tracking-widest text-cyan-200">Mongo + Weaviate profile</h3>
                <p className="code mt-2 text-sm text-slate-200">
                  fastai-stack create mongo-search --non-interactive --db mongodb --auth oauth2 --tasks none --ai huggingface --vector-db weaviate --docker cpu --monitoring sentry --frontend none
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <h3 className="code text-xs uppercase tracking-widest text-cyan-200">Minimal lightweight profile</h3>
                <p className="code mt-2 text-sm text-slate-200">
                  fastai-stack create lean --non-interactive --db sqlite --auth none --tasks none --ai none --vector-db none --docker cpu --monitoring none --frontend none
                </p>
              </div>
            </div>
          </section>

          <section id="troubleshooting" className="mb-10">
            <h2 className="mb-3 text-2xl font-semibold">Troubleshooting</h2>
            <div className="space-y-4 text-[var(--muted)]">
              <p>
                <strong className="text-white">TemplateNotFound error:</strong> upgrade to latest package;
                template packaging is fixed in recent releases.
              </p>
              <p>
                <strong className="text-white">pgvector validation error:</strong> pgvector requires
                postgres. Switch to --db postgres or set --vector-db none.
              </p>
              <p>
                <strong className="text-white">Docker compose parse issue:</strong> regenerate with latest
                version; empty dependency sections are now guarded.
              </p>
              <p>
                <strong className="text-white">Git push TLS warning:</strong> re-enable sslVerify globally and
                clear GIT_SSL_NO_VERIFY overrides.
              </p>
            </div>
          </section>

          <section id="deploy" className="mb-10">
            <h2 className="mb-3 text-2xl font-semibold">Deploy</h2>
            <ol className="list-decimal space-y-2 pl-5 text-[var(--muted)]">
              <li>Create project with fastai-stack.</li>
              <li>Set environment variables from .env.example.</li>
              <li>Install dependencies with Poetry in generated project.</li>
              <li>Run app via Uvicorn or Docker Compose.</li>
              <li>Use GitHub Actions templates for CI checks.</li>
            </ol>
          </section>

          <section id="faq">
            <h2 className="mb-3 text-2xl font-semibold">FAQ</h2>
            <div className="space-y-4 text-[var(--muted)]">
              <p>
                <strong className="text-white">Can I use it without AI?</strong> Yes, choose --ai none and
                generate a lightweight service.
              </p>
              <p>
                <strong className="text-white">Is GPU required?</strong> No. CPU mode is default; GPU mode
                only changes deployment profile.
              </p>
              <p>
                <strong className="text-white">Can I script it in CI?</strong> Yes, use --non-interactive with
                explicit flags.
              </p>
            </div>
          </section>
        </article>

        <DocsProgress sections={sections} />
      </main>
    </div>
  );
}
