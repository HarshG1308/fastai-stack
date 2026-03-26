"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { href: "/docs", label: "Quick Start" },
  { href: "/docs#philosophy", label: "Philosophy" },
  { href: "/docs#commands", label: "CLI Commands" },
  { href: "/docs#builder", label: "Builder Deep Dive" },
  { href: "/docs#profiles", label: "Stack Profiles" },
  { href: "/docs#architecture", label: "Architecture" },
  { href: "/docs#deploy", label: "Deploy" },
  { href: "/docs#faq", label: "FAQ" },
];

export function DocsSidebar() {
  const [activeId, setActiveId] = useState<string>("quick-start");

  useEffect(() => {
    const targets = sections
      .map((item) => item.href.split("#")[1])
      .filter((id): id is string => Boolean(id))
      .map((id) => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: [0.1, 0.3, 0.6] }
    );

    targets.forEach((target) => target && observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="frame h-fit rounded-2xl p-4 md:sticky md:top-24">
      <p className="code mb-3 text-xs uppercase tracking-widest text-slate-400">Documentation</p>
      <ul className="space-y-1">
        {sections.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`code block rounded-md px-3 py-2 text-sm transition ${
                item.href.endsWith(`#${activeId}`)
                  ? "bg-cyan-300/12 text-cyan-100"
                  : "text-[var(--muted)] hover:bg-cyan-300/10 hover:text-cyan-100"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
