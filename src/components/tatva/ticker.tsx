const ELEMENTS = [
  { t: "PRITHVI.CORE.LOAD", v: "14%", c: "text-[var(--color-prithvi)]" },
  { t: "JAL.LIQUIDITY.RATE", v: "$428K/S", c: "text-[var(--color-jal)]" },
  { t: "AGNI.PROCESSOR.TEMPS", v: "42°C", c: "text-[var(--color-agni)]" },
  { t: "VAYU.AGENT.MESH.PING", v: "82MS", c: "text-[var(--color-vayu)]" },
  { t: "AKASHA.COMPUTE.FLOPS", v: "4.8 TFLOPS", c: "text-[var(--color-akasha)]" },
  { t: "SUBSTRATE.STABILITY", v: "99.998%", c: "text-white" },
  { t: "FORK.ACTIVE.DAILS", v: "+1,241", c: "text-[var(--color-vayu)]" },
];

export function Ticker() {
  const row = [...ELEMENTS, ...ELEMENTS, ...ELEMENTS];
  return (
    <div className="relative border-y border-line bg-ink-1/80 z-20">
      <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-0 to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-0 to-transparent" />
      <div className="overflow-hidden py-4.5">
        <div className="ticker flex w-max gap-16 whitespace-nowrap">
          {row.map((e, i) => (
            <span
              key={`${e.t}-${i}`}
              className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-fg-dim"
            >
              <span className="size-1.5 rounded-full bg-line-strong" />
              <span>{e.t}</span>
              <span className={`font-bold ${e.c}`}>{e.v}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
