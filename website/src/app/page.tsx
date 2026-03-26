import Link from "next/link";

import { CommandPanel } from "@/components/command-panel";
import { HeroTypewriter } from "@/components/hero-typewriter";
import { Navbar } from "@/components/navbar";
import { StackBuilder } from "@/components/stack-builder";

export default function Home() {
  return (
    <div className="site-surface min-h-screen">
      <Navbar />
      <main className="w-full px-4 pb-24 pt-10 md:px-8 md:pt-14 xl:px-12">
        <section className="scanlines frame hero-grid relative overflow-hidden rounded-3xl p-7 md:p-12">
          <div className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-52 w-52 rounded-full bg-amber-300/20 blur-3xl" />

          <p className="code mb-5 inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200">
            FastAPI x AI x Production
          </p>
          <HeroTypewriter
            lines={[
              "Build AI backends",
              "that feel enterprise-ready on day one.",
            ]}
          />
          <p className="mt-5 max-w-3xl text-lg text-[var(--muted)] md:text-xl">
            fastai-stack is an opinionated stack generator for AI developers who care about speed,
            reliability, and clean architecture. Generate FastAPI projects with auth, tasks,
            vector databases, observability, and GPU-aware deployment in minutes.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://pypi.org/project/fastai-stack/"
              target="_blank"
              rel="noreferrer"
              className="code cta-strong rounded-lg border border-cyan-300/55 bg-cyan-300/18 px-6 py-3.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/26"
            >
              Install from PyPI
            </a>
            <Link
              href="/docs"
              className="code cta-warm rounded-lg border border-amber-300/50 bg-amber-300/12 px-6 py-3.5 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/20"
            >
              Explore Documentation
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <CommandPanel />
          <div className="frame rounded-2xl p-6">
            <h2 className="mb-4 text-2xl font-semibold">What you can scaffold</h2>
            <ul className="space-y-3 text-sm text-[var(--muted)] md:text-base">
              <li>Async FastAPI service architecture with versioned APIs</li>
              <li>Pydantic v2 settings and dependency injection structure</li>
              <li>AI modules: OpenAI streaming, LangChain stubs, Hugging Face starter</li>
              <li>DB options: PostgreSQL, MongoDB, SQLite plus pgvector or Weaviate</li>
              <li>Task queues with Celery + Redis and observability hooks</li>
              <li>Docker and GPU-ready deployment paths with CI templates</li>
            </ul>
            <div className="code mt-6 rounded-xl border border-white/10 bg-black/30 p-4 text-xs text-slate-300 md:text-sm">
              Quality guardrails included: input validation, template integrity checks, and edge-case-tested compose rendering.
            </div>
          </div>
        </section>

        <section className="mt-8">
          <StackBuilder />
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-3">
          <div className="frame rounded-2xl p-6 xl:col-span-2">
            <h2 className="text-2xl font-semibold">Builder Details: what happens under the hood</h2>
            <p className="mt-3 max-w-4xl text-[var(--muted)]">
              Every selection in fastai-stack resolves into deterministic template branches. This means
              generated projects are predictable, reviewable, and easy to version-control. You are not
              getting opaque generated magic. You get explicit backend architecture you can own from day one.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <h3 className="code text-xs uppercase tracking-[0.2em] text-cyan-200">Template engine</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Jinja2 conditional templates map stack flags to concrete files and dependency sets.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <h3 className="code text-xs uppercase tracking-[0.2em] text-cyan-200">Config safety</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Invalid combinations are blocked early, with explicit guidance in CLI output.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <h3 className="code text-xs uppercase tracking-[0.2em] text-cyan-200">Runtime defaults</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Generated tests and settings are pre-wired for smooth first run and onboarding.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <h3 className="code text-xs uppercase tracking-[0.2em] text-cyan-200">Deployment tracks</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  CPU and GPU compose profiles support local runs and production orchestration paths.
                </p>
              </div>
            </div>
          </div>

          <div className="frame rounded-2xl p-6">
            <h2 className="text-xl font-semibold">Project at a glance</h2>
            <dl className="mt-4 space-y-3 text-sm text-[var(--muted)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <dt>CLI framework</dt>
                <dd className="code text-cyan-100">Typer</dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <dt>Templates</dt>
                <dd className="code text-cyan-100">Jinja2</dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <dt>Package manager</dt>
                <dd className="code text-cyan-100">Poetry</dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <dt>Target runtime</dt>
                <dd className="code text-cyan-100">Python 3.10+</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Current channel</dt>
                <dd className="code text-cyan-100">PyPI + GitHub</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="mt-8 frame rounded-2xl p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold md:text-3xl">From idea to deploy in one focused flow</h2>
              <p className="mt-3 text-[var(--muted)]">
                Fast iterations are useless without confidence. fastai-stack balances velocity with
                structure, giving teams a standardized baseline while keeping stack choice open.
              </p>
            </div>
            <Link
              href="/docs"
              className="code rounded-lg border border-cyan-300/35 bg-cyan-300/12 px-5 py-3 text-sm text-cyan-100 transition hover:bg-cyan-300/20"
            >
              Read complete docs
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <Step title="1. Design" text="Pick database, auth, AI, vector, tasks, monitoring, and runtime profile." />
            <Step title="2. Generate" text="Run one command and get a production-oriented FastAPI codebase instantly." />
            <Step title="3. Customize" text="Plug business logic into clean modules without fighting generated chaos." />
            <Step title="4. Ship" text="Use Docker/CI templates to deploy with fewer surprises." />
          </div>
        </section>
      </main>
    </div>
  );
}

type StepProps = {
  title: string;
  text: string;
};

function Step({ title, text }: StepProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/25 p-4">
      <h3 className="code text-xs uppercase tracking-[0.2em] text-amber-200">{title}</h3>
      <p className="mt-2 text-sm text-[var(--muted)]">{text}</p>
    </div>
  );
}
