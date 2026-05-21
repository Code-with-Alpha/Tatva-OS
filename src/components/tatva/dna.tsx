import { SectionLabel } from "./forkable";

const NODES = [
  { id: "vayu_trigger", x: 10, y: 50, label: "vayu.trigger", kind: "vayu", status: "idle" },
  { id: "docker_run",   x: 32, y: 22, label: "docker.run",    kind: "vayu", status: "active" },
  { id: "ai_lang",      x: 32, y: 78, label: "langgraph.ai",  kind: "agni", status: "active" },
  { id: "db_write",     x: 56, y: 22, label: "prithvi.commit",kind: "prithvi", status: "active" },
  { id: "jal_route",    x: 56, y: 78, label: "jal.settle",    kind: "jal", status: "idle" },
  { id: "edge_deploy",  x: 82, y: 50, label: "edge.deploy",   kind: "akasha", status: "success" },
];

const EDGES: [string, string][] = [
  ["vayu_trigger", "docker_run"],
  ["vayu_trigger", "ai_lang"],
  ["docker_run", "db_write"],
  ["ai_lang", "jal_route"],
  ["db_write", "edge_deploy"],
  ["jal_route", "edge_deploy"],
];

const elementColors: Record<string, string> = {
  prithvi: "var(--color-prithvi)",
  jal: "var(--color-jal)",
  agni: "var(--color-agni)",
  vayu: "var(--color-vayu)",
  akasha: "var(--color-akasha)",
};

export function DNA() {
  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <section id="dna" className="relative border-t border-line bg-ink-1/30 py-28">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.03),transparent_70%)] pointer-events-none" />

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 lg:grid-cols-[5fr_7fr] items-center">
        <div>
          <SectionLabel index="02" label="WORKFLOW DNA" />
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.02em] text-balance">
            Interactive, node-based visual pipelines.
          </h2>
          <p className="mt-5 text-fg-dim text-[14.5px] leading-relaxed max-w-[48ch]">
            Startups on Tatva live as executable dependency graphs. Inject Docker modules, orchestrate local AI agent weights, and map edge deployments directly onto an organic visual substrate.
          </p>

          <div className="mt-8 space-y-4">
            {[
              ["Docker Isolate Runtimes", "sandboxed docker container execution at edge nodes", "vayu"],
              ["Time-Travel Pipeline Replay", "re-trigger historical states with deep graph diff logs", "jal"],
              ["Dynamic LLM Hot-Swaps", "swap reasoning models without refactoring node outputs", "agni"],
            ].map(([title, desc, el]) => (
              <div key={title} className="flex gap-4 border-l border-line-strong pl-5 group hover:border-white transition-colors duration-300">
                <span
                  className="mt-1.5 size-2 rounded-full pulse-dot shrink-0"
                  style={{ backgroundColor: elementColors[el] }}
                />
                <div>
                  <h4 className="text-[14.5px] font-bold text-fg">{title}</h4>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-fg-mute mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Node Graph Canvas Panel */}
        <div className="relative rounded-xl border border-line-strong bg-ink-0 p-5 shadow-2xl backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between border-b border-line pb-3.5">
            <div className="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.25em] text-fg-mute">
              <span className="size-2 rounded-full bg-[var(--color-vayu)] animate-pulse" />
              TOPOLOGY · tatva/auth-ledger-chain
            </div>
            <div className="flex gap-1.5">
              {["Inspect", "Replay", "Fork Graph"].map((b) => (
                <button
                  key={b}
                  className="rounded border border-line bg-ink-2 px-2.5 py-0.5 font-mono text-[9px] text-fg-dim hover:text-white transition-colors uppercase tracking-widest"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="relative aspect-[16/9.5] w-full overflow-hidden rounded-lg bg-[radial-gradient(circle_at_50%_50%,#09090e,#030305_75%)] border border-line">
            <div className="absolute inset-0 grid-bg opacity-30" />

            {/* Glowing SVG Connectors */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full pointer-events-none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="glowPath" x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--color-vayu)" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="var(--color-jal)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--color-akasha)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {EDGES.map(([a, b], idx) => {
                const A = nodeMap[a];
                const B = nodeMap[b];
                const mx = (A.x + B.x) / 2;
                return (
                  <g key={idx}>
                    {/* Background path line */}
                    <path
                      d={`M${A.x} ${A.y} C ${mx} ${A.y}, ${mx} ${B.y}, ${B.x} ${B.y}`}
                      stroke="url(#glowPath)"
                      strokeWidth="0.8"
                      fill="none"
                    />
                    {/* Animated running pulse dots along paths */}
                    <path
                      d={`M${A.x} ${A.y} C ${mx} ${A.y}, ${mx} ${B.y}, ${B.x} ${B.y}`}
                      stroke="#ffffff"
                      strokeWidth="1.2"
                      strokeDasharray="4 24"
                      strokeDashoffset="0"
                      fill="none"
                      className="animate-[dash_6s_linear_infinite]"
                      style={{
                        animation: `dash ${3 + idx}s linear infinite`,
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Node Components */}
            {NODES.map((n) => (
              <div
                key={n.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <div className="relative grid place-items-center group/node cursor-pointer">
                  {/* Ambient Glow Aura */}
                  <div
                    className="absolute size-12 rounded-full opacity-20 blur-xl group-hover/node:opacity-40 transition-opacity duration-300"
                    style={{ backgroundColor: elementColors[n.kind] }}
                  />
                  {/* Glowing Node Box */}
                  <div className="relative flex items-center gap-2.5 rounded border border-line-strong bg-ink-2/95 px-3 py-2 shadow-lg backdrop-blur transition-all group-hover/node:border-white/35">
                    <span
                      className="size-2 rounded-full pulse-dot"
                      style={{
                        backgroundColor: elementColors[n.kind],
                        boxShadow: `0 0 10px ${elementColors[n.kind]}`,
                      }}
                    />
                    <span className="font-mono text-[10px] text-fg font-semibold">{n.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3.5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-fg-mute font-bold">
            <span>6 active nodes · edge bound</span>
            <span className="text-[var(--color-jal)] cursor-pointer">/ Inspect run_9a2e</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -120;
          }
        }
      `}</style>
    </section>
  );
}
