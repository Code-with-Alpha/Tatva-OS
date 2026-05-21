import { useEffect, useState } from "react";

const links = [
  { label: "Elemental Stacks", href: "#ecosystem" },
  { label: "Workflow DNA", href: "#dna" },
  { label: "Agent Mesh", href: "#agents" },
  { label: "Launch Sandbox", href: "#simulator" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line-strong bg-ink-0/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        <a href="/" className="group flex items-center gap-3">
          {/* Customized 'त' (Ta) Sanskrit-Cyberpunk Icon */}
          <span className="relative grid size-9 place-items-center">
            <svg
              viewBox="0 0 100 100"
              className="size-9 transition-transform duration-500 group-hover:rotate-6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="tatvaGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--color-prithvi)" />
                  <stop offset="50%" stopColor="var(--color-jal)" />
                  <stop offset="100%" stopColor="var(--color-akasha)" />
                </linearGradient>
                <filter id="glowFilter" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="var(--color-jal)" floodOpacity="0.4" />
                </filter>
              </defs>
              {/* Geometric Grid Accents */}
              <circle cx="50" cy="50" r="46" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" strokeDasharray="3 3" />
              {/* Horizontal Shirorekha with technical endpoint cut */}
              <path d="M 22 26 L 78 26" stroke="url(#tatvaGrad)" strokeWidth="4.5" strokeLinecap="round" />
              {/* Sanskrit Calligraphic flow 'त' curve connecting to vertical stem */}
              <path
                d="M 52 26 V 46 C 52 56, 30 52, 30 64 C 30 76, 48 76, 52 76 V 82"
                stroke="url(#tatvaGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glowFilter)"
              />
              <path
                d="M 68 26 V 82"
                stroke="url(#tatvaGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              {/* Ethereal node/joint */}
              <circle cx="52" cy="46" r="3.5" fill="#ffffff" />
            </svg>
            <span className="absolute -inset-0.5 rounded-full bg-[var(--color-jal)]/5 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
          </span>
          <div className="flex flex-col">
            <span className="font-display text-[17px] font-bold tracking-[0.08em] text-fg uppercase">Tatva</span>
            <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--color-vayu)] -mt-1">
              Startup OS
            </span>
          </div>
          <span className="ml-1 hidden rounded border border-line px-1.5 py-0.5 font-mono text-[9px] text-fg-dim md:inline">
            v5.0.0-alpha
          </span>
        </a>

        <nav className="hidden items-center gap-1.5 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-md px-3.5 py-2 text-[13px] font-medium text-fg-dim transition-all hover:bg-haze hover:text-fg relative group/navlink"
            >
              {l.label}
              <span className="absolute bottom-1 left-3.5 right-3.5 h-px bg-[var(--color-jal)] scale-x-0 transition-transform duration-300 group-hover/navlink:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#auth" className="hidden text-[13px] font-medium text-fg-dim hover:text-fg md:inline transition-colors">
            Access Handshake
          </a>
          <a
            href="#auth"
            className="group relative overflow-hidden rounded-md bg-fg px-4 py-2 text-[13px] font-semibold text-ink-0 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] active:scale-[0.97]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-jal)] to-[var(--color-akasha)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
              Initialize Tatva
              <span className="font-mono text-[9px] opacity-75">⌘K</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
