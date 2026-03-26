import Link from "next/link";

const links = [
  { href: "/docs", label: "Docs" },
  { href: "/docs#commands", label: "CLI" },
  { href: "https://github.com/HarshG1308/fastai-stack", label: "GitHub" },
  { href: "https://pypi.org/project/fastai-stack/", label: "PyPI" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070dcc] backdrop-blur-xl">
      <nav className="mx-auto flex w-full items-center justify-between px-4 py-3 md:px-8 xl:px-12">
        <Link href="/" className="flex items-center gap-3">
          <span className="code inline-flex h-8 w-8 items-center justify-center rounded-md border border-cyan-300/40 bg-cyan-300/12 text-sm font-semibold text-cyan-200">
            fs
          </span>
          <span className="text-lg font-semibold tracking-wide">fastai-stack</span>
        </Link>
        <div className="code hidden items-center gap-3 text-sm text-[var(--muted)] md:flex md:gap-5">
          {links.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white" target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <div className="code flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/45 bg-cyan-300/12 text-xs font-semibold text-cyan-100">
            HG
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-100">Harsh Gautam</p>
            <p className="code text-[11px] text-[var(--muted)]">building fastai-stack for AI developers</p>
          </div>
        </div>
      </nav>
    </header>
  );
}
