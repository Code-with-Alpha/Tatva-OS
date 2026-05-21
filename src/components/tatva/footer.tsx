const cols = [
  { h: "Ecosystem Modules", l: ["Genome Graph", "Fork Engine", "Workflow DNA", "AI Builder"] },
  { h: "Ancient Protocols", l: ["Prithvi (Earth)", "Jal (Water)", "Agni (Fire)", "Vayu (Wind)", "Akasha (Ether)"] },
  { h: "Developer Grid", l: ["Documentation", "Network Status", "Secure Handshake", "Audit Trail"] },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-1/40">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3">
            {/* Minimal Sanskrit Cyberpunk Icon */}
            <span className="relative grid size-7 place-items-center">
              <svg viewBox="0 0 100 100" className="size-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 25 30 L 75 30" stroke="url(#footGrad)" strokeWidth="5" strokeLinecap="round" />
                <path d="M 50 30 V 50 C 50 58, 32 55, 32 66 C 32 75, 48 75, 50 75 V 80" stroke="url(#footGrad)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 66 30 V 80" stroke="url(#footGrad)" strokeWidth="5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="footGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--color-prithvi)" />
                    <stop offset="100%" stopColor="var(--color-jal)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="font-display text-[16px] font-bold tracking-[0.1em] text-fg uppercase">Tatva OS</span>
          </div>
          <p className="mt-5 max-w-[34ch] text-[13.5px] leading-relaxed text-fg-dim">
            The digital substrate where startups evolve. Ancient philosophy meets futuristic venture infrastructure. Composable, modular, and autonomous.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-ink-2 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--color-vayu)]">
            <span className="size-1.5 rounded-full bg-[var(--color-vayu)] pulse-dot" />
            Mesh Grid · Nominal Uptime
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.h} className="flex flex-col">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-mute font-bold">{c.h}</h4>
            <ul className="mt-5 space-y-3.5 text-[13.5px]">
              {c.l.map((x) => (
                <li key={x}>
                  <a href="#" className="text-fg-dim transition-colors hover:text-[var(--color-jal)]">
                    {x}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line bg-ink-0/60">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row md:gap-0 font-mono text-[10px] uppercase tracking-[0.25em] text-fg-mute">
          <div className="flex items-center gap-1.5">
            <span>© 2026 Tatva Protocol</span>
            <span className="text-line-strong">|</span>
            <span className="text-[var(--color-prithvi)] font-bold">ELEMENTAL CONSCIOUSNESS</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Mesh: 28.6139 N · 77.2090 E</span>
            <span className="hidden sm:inline">Substrate: Edge-Vayu</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
