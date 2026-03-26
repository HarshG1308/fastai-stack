"use client";

import { useMemo, useState } from "react";

const dbChoices = ["postgres", "mongodb", "sqlite"];
const authChoices = ["none", "jwt", "oauth2"];
const aiChoices = ["none", "openai", "langchain", "huggingface"];
const taskChoices = ["none", "celery+redis"];
const vectorChoices = ["none", "pgvector", "weaviate"];
const dockerChoices = ["cpu", "gpu"];
const monitoringChoices = ["none", "sentry", "prometheus"];
const frontendChoices = ["none", "htmx+vite"];

type Choice = {
  db: string;
  auth: string;
  ai: string;
  tasks: string;
  vector: string;
  docker: string;
  monitoring: string;
  frontend: string;
};

export function StackBuilder() {
  const [choice, setChoice] = useState<Choice>({
    db: "postgres",
    auth: "jwt",
    ai: "openai",
    tasks: "celery+redis",
    vector: "pgvector",
    docker: "gpu",
    monitoring: "prometheus",
    frontend: "none",
  });
  const [copied, setCopied] = useState(false);

  const resolvedVector = useMemo(() => {
    if (choice.vector === "pgvector" && choice.db !== "postgres") {
      return "none";
    }
    return choice.vector;
  }, [choice.db, choice.vector]);

  const qualityNotes = useMemo(() => {
    const notes: string[] = [];
    if (choice.db !== "postgres" && choice.vector === "pgvector") {
      notes.push("pgvector only works with postgres, so command auto-falls back to --vector-db none.");
    }
    if (choice.docker === "gpu") {
      notes.push("GPU profile includes device reservation in compose for NVIDIA runtime.");
    }
    if (choice.ai === "none") {
      notes.push("AI endpoints are excluded, resulting in a leaner generated API surface.");
    }
    if (notes.length === 0) {
      notes.push("Stack is fully compatible and ready for generation.");
    }
    return notes;
  }, [choice.ai, choice.db, choice.docker, choice.vector]);

  const command = useMemo(() => {
    return [
      "fastai-stack create shockstack",
      "--non-interactive",
      `--db ${choice.db}`,
      `--auth ${choice.auth}`,
      `--tasks ${choice.tasks}`,
      `--ai ${choice.ai}`,
      `--vector-db ${resolvedVector}`,
      `--docker ${choice.docker}`,
      `--monitoring ${choice.monitoring}`,
      `--frontend ${choice.frontend}`,
    ].join(" ");
  }, [choice, resolvedVector]);

  const estimatedModules = useMemo(() => {
    let modules = 6;
    if (choice.ai !== "none") modules += 2;
    if (choice.tasks !== "none") modules += 2;
    if (resolvedVector !== "none") modules += 1;
    if (choice.monitoring !== "none") modules += 1;
    if (choice.frontend !== "none") modules += 1;
    return modules;
  }, [choice.ai, choice.tasks, resolvedVector, choice.monitoring, choice.frontend]);

  const copyCommand = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section id="builder" className="frame rounded-2xl p-6 md:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-semibold md:text-2xl">Interactive Stack Builder Preview</h3>
        <span className="code rounded-md border border-amber-300/40 bg-amber-300/10 px-2 py-1 text-xs text-amber-200">
          live command
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Select title="Database" values={dbChoices} value={choice.db} onChange={(value) => setChoice((prev) => ({ ...prev, db: value }))} />
        <Select title="Auth" values={authChoices} value={choice.auth} onChange={(value) => setChoice((prev) => ({ ...prev, auth: value }))} />
        <Select title="AI" values={aiChoices} value={choice.ai} onChange={(value) => setChoice((prev) => ({ ...prev, ai: value }))} />
        <Select title="Tasks" values={taskChoices} value={choice.tasks} onChange={(value) => setChoice((prev) => ({ ...prev, tasks: value }))} />
        <Select title="Vector DB" values={vectorChoices} value={choice.vector} onChange={(value) => setChoice((prev) => ({ ...prev, vector: value }))} />
        <Select title="Docker" values={dockerChoices} value={choice.docker} onChange={(value) => setChoice((prev) => ({ ...prev, docker: value }))} />
        <Select title="Monitoring" values={monitoringChoices} value={choice.monitoring} onChange={(value) => setChoice((prev) => ({ ...prev, monitoring: value }))} />
        <Select title="Frontend" values={frontendChoices} value={choice.frontend} onChange={(value) => setChoice((prev) => ({ ...prev, frontend: value }))} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_260px]">
        <pre className="code overflow-x-auto rounded-xl border border-white/10 bg-black/35 p-4 text-sm text-cyan-100">{command}</pre>
        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <p className="code text-xs uppercase tracking-[0.2em] text-slate-400">Generator metrics</p>
          <p className="mt-3 text-3xl font-semibold text-cyan-100">{estimatedModules}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">estimated optional modules included</p>
          <button
            type="button"
            onClick={copyCommand}
            className="code mt-4 w-full rounded-md border border-cyan-300/35 bg-cyan-300/10 px-3 py-2 text-xs text-cyan-100 transition hover:bg-cyan-300/20"
          >
            {copied ? "command copied" : "copy command"}
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
        <p className="code mb-2 text-xs uppercase tracking-widest text-slate-400">Builder notes</p>
        <ul className="space-y-2 text-sm text-[var(--muted)]">
          {qualityNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type SelectProps = {
  title: string;
  values: string[];
  value: string;
  onChange: (value: string) => void;
};

function Select({ title, values, value, onChange }: SelectProps) {
  return (
    <label className="code rounded-xl border border-white/10 bg-black/25 px-3 py-3 text-sm text-[var(--muted)]">
      <span className="mb-2 block text-xs uppercase tracking-widest text-slate-400">{title}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-white/10 bg-[#090d1d] px-3 py-2 text-slate-100 outline-none"
      >
        {values.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}
