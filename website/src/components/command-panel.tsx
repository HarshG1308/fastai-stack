"use client";

import { useState } from "react";

type CommandPreset = {
  label: string;
  command: string;
};

const presets: CommandPreset[] = [
  {
    label: "Quick Start",
    command: "fastai-stack create myapp --interactive",
  },
  {
    label: "AI + Postgres + PGVector",
    command:
      "fastai-stack create ai-core --non-interactive --db postgres --auth jwt --tasks celery+redis --ai openai --vector-db pgvector --docker gpu --monitoring prometheus --frontend none",
  },
  {
    label: "Lean SQLite",
    command:
      "fastai-stack create lean-api --non-interactive --db sqlite --auth none --tasks none --ai none --vector-db none --docker cpu --monitoring none --frontend none",
  },
];

export function CommandPanel() {
  const [active, setActive] = useState<CommandPreset>(presets[0]);
  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    await navigator.clipboard.writeText(active.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="frame rounded-2xl p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">CLI Launcher</h3>
        <span className="code rounded-full border border-cyan-300/35 bg-cyan-300/10 px-2 py-0.5 text-xs text-cyan-100">
          interactive
        </span>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {presets.map((preset) => {
          const selected = preset.label === active.label;
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => setActive(preset)}
              className={`code rounded-lg border px-3 py-2 text-xs transition md:text-sm ${
                selected
                  ? "border-cyan-300/50 bg-cyan-300/12 text-cyan-100"
                  : "border-white/10 text-[var(--muted)] hover:border-cyan-300/30 hover:text-white"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      <div className="code rounded-xl border border-white/10 bg-black/35 p-4 text-sm text-slate-200 md:text-base">
        <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-400">
          <span className="h-2 w-2 rounded-full bg-rose-400" />
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          shell
        </div>
        <span className="mr-2 text-[var(--accent)]">$</span>
        <span className="break-all">{active.command}</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)] md:text-sm">
        <p>One command. Production defaults. Zero boilerplate drag.</p>
        <button
          type="button"
          onClick={copyCommand}
          className="code rounded-md border border-white/15 px-3 py-1.5 transition hover:border-cyan-300/50 hover:text-cyan-100"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
        <p className="code mb-2 text-xs uppercase tracking-widest text-slate-400">What this preset includes</p>
        <p className="text-sm text-[var(--muted)]">
          {active.label === "Quick Start"
            ? "Guided prompts for all stack options with safe defaults for first-time users."
            : active.label === "AI + Postgres + PGVector"
              ? "High-capability profile with queue workers, vector search, observability, and GPU deployment profile."
              : "Minimal profile designed for local APIs, quick iterations, and lower infra costs."}
        </p>
      </div>
    </section>
  );
}
