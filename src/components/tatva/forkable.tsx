import { useState } from "react";

const elements = [
  {
    element: "PRITHVI",
    handle: "tatva/prithvi-db",
    title: "Sovereign Ledger Stack",
    desc: "A highly resilient, region-aware relational layer built for high-throughput transactional isolation and automatic database shards.",
    tech: ["postgres", "redis", "sharding"],
    forks: "1,204",
    uptime: "99.999%",
    color: "var(--color-prithvi)",
  },
  {
    element: "JAL",
    handle: "tatva/jal-settlement",
    title: "High-Freq Settlement Protocol",
    desc: "Idempotent payment gateways and automated liquidity splits routing real-time global revenue sharing via Edge execution points.",
    tech: ["rust", "wasm", "cloudflare"],
    forks: "842",
    uptime: "99.997%",
    color: "var(--color-jal)",
  },
  {
    element: "AGNI",
    handle: "tatva/agni-agents",
    title: "AI Orchestration Chain",
    desc: "Autonomous developer agents, PR review triggers, and SDR chains running locally or on server grids with integrated vector index buffers.",
    tech: ["langgraph", "llama-3", "pgvector"],
    forks: "1,894",
    uptime: "99.982%",
    color: "var(--color-agni)",
  },
  {
    element: "VAYU",
    handle: "tatva/vayu-mesh",
    title: "Edge Container Orchestrator",
    desc: "Docker container runners executing high-efficiency API routes at edge bounds with sub-millisecond route optimization pipelines.",
    tech: ["docker", "k8s", "nats-io"],
    forks: "621",
    uptime: "99.999%",
    color: "var(--color-vayu)",
  },
  {
    element: "AKASHA",
    handle: "tatva/akasha-rooms",
    title: "Realtime Collaboration Grid",
    desc: "Multiplayer room servers managing structural whiteboard boards, live editor locks, and synchronized cursor coordinate channels.",
    tech: ["websockets", "yjs", "webrtc"],
    forks: "482",
    uptime: "99.992%",
    color: "var(--color-akasha)",
  },
  {
    element: "TATVA UI",
    handle: "tatva/ui-cyber",
    title: "Cyber-Sanskrit Layout Kit",
    desc: "High-fidelity component kit using organic fluid SVG lines, neon glow indicators, and keyboard-driven terminal controls.",
    tech: ["react", "tailwind", "framer"],
    forks: "2,391",
    uptime: "100%",
    color: "text-white",
  },
];

export function Forkable() {
  const [forkedIdx, setForkedIdx] = useState<number | null>(null);

  const handleFork = (idx: number) => {
    setForkedIdx(idx);
    setTimeout(() => setForkedIdx(null), 1800);
  };

  return (
    <section id="ecosystem" className="relative py-28 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Asymmetrical header */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[55ch]">
            <SectionLabel index="01" label="THE COMPOSABLE ELEMENT GRID" />
            <h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.02em] text-balance">
              Modular elemental blocks. Ready to be cloned and composed.
            </h2>
            <p className="mt-4 text-fg-dim text-[14.5px] leading-relaxed">
              Every element on Tatva contains complete, structured execution DNA. Select a block, fork its configuration, and link it straight into your startup ecosystem.
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-jal)] cursor-pointer hover:underline">
            Inspect Schema Registry →
          </span>
        </div>

        {/* Asymmetrical grid composition */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {elements.map((el, i) => (
            <article
              key={el.handle}
              className="group relative flex flex-col gap-6 bg-ink-1 p-6 transition-all hover:bg-ink-2 duration-300"
            >
              <header className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="grid size-11 place-items-center rounded-md font-mono text-[10px] font-bold ring-1 ring-line-strong"
                    style={{ backgroundColor: "rgba(255,255,255,0.02)", color: el.color }}
                  >
                    {el.element}
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-fg-mute uppercase tracking-widest">
                      {el.handle}
                    </div>
                    <h3 className="text-[16px] font-bold mt-0.5">{el.title}</h3>
                  </div>
                </div>
                <div className="text-right font-mono text-[9px] uppercase tracking-widest text-fg-mute">
                  Uptime
                  <div className="mt-0.5 font-bold text-[var(--color-vayu)]">{el.uptime}</div>
                </div>
              </header>

              <p className="text-[13.5px] leading-relaxed text-fg-dim text-pretty mt-1">
                {el.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {el.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-line bg-ink-2 px-2 py-0.5 font-mono text-[10px] text-fg-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <footer className="mt-auto flex items-center justify-between border-t border-line pt-4.5">
                <span className="font-mono text-[10px] text-fg-mute uppercase tracking-widest">
                  {el.forks} composited
                </span>
                <button
                  onClick={() => handleFork(i)}
                  className="font-mono text-[10px] uppercase tracking-widest font-bold text-[var(--color-jal)] hover:text-white transition-colors duration-200"
                >
                  {forkedIdx === i ? "🧬 FORKING NODE..." : "FORK SYSTEM →"}
                </button>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-fg-mute font-bold">
      <span className="text-[var(--color-prithvi)]">{index}</span>
      <span className="h-px w-10 bg-line-strong" strokeDasharray="2" />
      <span>{label}</span>
    </div>
  );
}
