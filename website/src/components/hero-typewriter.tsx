"use client";

import { useEffect, useMemo, useState } from "react";

type HeroTypewriterProps = {
  lines: string[];
  speedMs?: number;
  linePauseMs?: number;
};

export function HeroTypewriter({
  lines,
  speedMs = 34,
  linePauseMs = 480,
}: HeroTypewriterProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const currentLine = lines[lineIndex] ?? "";
  const renderedLines = useMemo(() => {
    const finished = lines.slice(0, lineIndex);
    const current = currentLine.slice(0, charIndex);
    return [...finished, current];
  }, [charIndex, currentLine, lineIndex, lines]);

  useEffect(() => {
    const isLastLine = lineIndex === lines.length - 1;
    const lineComplete = charIndex >= currentLine.length;

    if (lines.length === 0) {
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    if (!lineComplete) {
      timer = setTimeout(() => setCharIndex((prev) => prev + 1), speedMs);
    } else if (!isLastLine) {
      timer = setTimeout(() => {
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, linePauseMs);
    }

    return () => clearTimeout(timer);
  }, [charIndex, currentLine.length, lineIndex, linePauseMs, lines, speedMs]);

  const finishedTyping =
    lines.length > 0 && lineIndex === lines.length - 1 && charIndex >= currentLine.length;

  return (
    <h1 className="text-4xl font-semibold leading-[1.05] text-white md:text-7xl">
      {renderedLines.map((line, index) => (
        <span key={`${index}-${line}`} className="block">
          {line}
          {index === renderedLines.length - 1 && !finishedTyping ? (
            <span className="ml-1 inline-block h-8 w-[3px] animate-pulse bg-cyan-200 align-middle md:h-12" />
          ) : null}
        </span>
      ))}
    </h1>
  );
}
