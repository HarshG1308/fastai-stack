"use client";

import { useEffect, useMemo, useState } from "react";

type Section = { id: string; label: string };

type DocsProgressProps = {
  sections: Section[];
};

export function DocsProgress({ sections }: DocsProgressProps) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: [0.1, 0.3, 0.6] }
    );

    sections.forEach((section) => {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    });

    const onScroll = () => {
      const fullHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (fullHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, (window.scrollY / fullHeight) * 100));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  const activeLabel = useMemo(() => {
    return sections.find((section) => section.id === active)?.label ?? sections[0]?.label ?? "Quick Start";
  }, [active, sections]);

  return (
    <aside className="frame hidden h-fit rounded-2xl p-4 xl:sticky xl:top-24 xl:block">
      <p className="code text-xs uppercase tracking-widest text-slate-400">Reading Position</p>
      <p className="mt-2 text-sm font-semibold text-cyan-100">{activeLabel}</p>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-amber-300 transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="code mt-2 text-[11px] text-[var(--muted)]">{progress.toFixed(0)}% complete</p>
    </aside>
  );
}
