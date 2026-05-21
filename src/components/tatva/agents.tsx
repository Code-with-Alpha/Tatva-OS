import { SectionLabel } from "./forkable";

const agents = [
  { name: "Scout", role: "SDR · lead generation", element: "AGNI", lat: "68ms", desc: "Automates outbound sequences, scans developer cohorts, and handles CRM handoffs autonomously.", color: "var(--color-agni)" },
  { name: "Forge", role: "INFRA · docker monitor", element: "VAYU", lat: "124ms", desc: "Monitors edge build states, triages Docker compose errors, and pushes hot-fixes.", color: "var(--color-vayu)" },
  { name: "Echo",  role: "CS · multilingual chat", element: "JAL", lat: "54ms", desc: "Resolves high-frequency user tickets and routes revenue operations automatically.", color: "var(--color-jal)" },
  { name: "Atlas", role: "OPS · incident response", element: "PRITHVI", lat: "92ms", desc: "Monitors PostgreSQL shards, syncs vector caches, and manages backup replicas.", color: "var(--color-prithvi)" },
];

export function Agents() {
  return (
    <section id="agents" className="relative py-28 border-t border-line bg-ink-0">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14">
          <div className="max-w-[48ch]">
            <SectionLabel index="05" label="AI AGENT MARKETPLACE" />
            <h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.02em]">
              Hire your autonomous agent workforce.
            </h2>
          </div>
          <p className="max-w-[42ch] text-fg-dim text-[14.5px] leading-relaxed">
            Plug pre-trained element agents into any workflow graph node. Fully audited, secure, and hot-swappable to scale workloads instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {agents.map((a) => (
            <article
              key={a.name}
              className="group relative overflow-hidden rounded-xl border border-line bg-ink-1 p-5.5 transition-all hover:border-white/30 duration-300"
            >
              {/* Background ambient glow */}
              <div
                className="absolute -right-12 -top-12 size-36 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-20 pointer-events-none"
                style={{ backgroundColor: a.color }}
              />

              <div className="flex items-center justify-between">
                <div
                  className="grid h-9 px-2.5 place-items-center rounded font-mono text-[9px] font-bold border border-line"
                  style={{ backgroundColor: "rgba(255,255,255,0.02)", color: a.color }}
                >
                  {a.element}
                </div>
                <span className="rounded border border-line bg-ink-2 px-2 py-0.5 font-mono text-[9px] text-fg-mute font-semibold">
                  LAT: {a.lat}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="font-display text-[20px] font-extrabold tracking-tight text-fg">{a.name}</h3>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-fg-mute font-bold">
                  {a.role}
                </div>
              </div>

              <p className="mt-4 text-[13px] leading-relaxed text-fg-dim">
                {a.desc}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-[9px] uppercase tracking-widest">
                <span className="text-fg-mute font-bold">plug & play</span>
                <span className="text-[var(--color-jal)] font-bold group-hover:translate-x-1 transition-transform duration-200 cursor-pointer">
                  compose →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
