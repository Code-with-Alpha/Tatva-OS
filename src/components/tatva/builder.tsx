import { useState } from "react";
import { SectionLabel } from "./forkable";

const presets = [
  "A vertical EHR tool for digital therapy clinics with automated billing",
  "A creator DAO featuring multi-party royalty streams on Solana",
  "An automated DevOps agent cluster resolving edge PR alerts at 3 AM",
];

export function Builder() {
  const [prompt, setPrompt] = useState(presets[0]);
  const [compiling, setCompiling] = useState(false);
  const [compiled, setCompiled] = useState(true);

  const handleCompile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setCompiling(true);
    setCompiled(false);
    setTimeout(() => {
      setCompiling(false);
      setCompiled(true);
    }, 2000);
  };

  return (
    <section id="builder" className="relative border-t border-line bg-ink-0 py-28">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(6,182,212,0.02),transparent_60%)] pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-6">
        <div className="text-center mb-14">
          <SectionLabel index="03" label="AI STARTUP GENERATOR" />
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.02em] text-balance">
            One prompt to full compilation.
          </h2>
          <p className="mx-auto mt-4 max-w-[54ch] text-fg-dim text-[14.5px] leading-relaxed">
            Enter a conceptual blueprint. Tatva builds the architecture graphs, Docker edge pipelines, agent clusters, and monetization formulas instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 items-start max-w-[1160px] mx-auto">
          {/* Prompt Entry Console */}
          <form onSubmit={handleCompile} className="relative group">
            <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[var(--color-prithvi)]/30 to-[var(--color-jal)]/30 opacity-60 blur transition-all group-hover:opacity-85" />
            <div className="relative overflow-hidden rounded-xl border border-line-strong bg-ink-1 p-2 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.25em] text-fg-mute font-bold">
                <span>TATVA › PROMPT CONSOLE</span>
                <span className="text-[var(--color-vayu)] animate-pulse">● MODEL · TATVA-V5</span>
              </div>
              <div className="flex items-start gap-3 p-4">
                <span className="mt-1 font-mono text-[14px] text-[var(--color-jal)] font-bold">›</span>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full resize-none bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-mute font-sans"
                  placeholder="Describe your startup concept here..."
                />
              </div>
              <div className="flex items-center justify-between border-t border-line px-3 py-3 bg-ink-0/30">
                <div className="flex items-center gap-1.5">
                  {["Docker", "Solidity", "LangGraph"].map((t) => (
                    <span
                      key={t}
                      className="rounded border border-line bg-ink-2 px-2.5 py-0.5 font-mono text-[9px] text-fg-mute uppercase tracking-widest font-semibold"
                    >
                      +{t}
                    </span>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={compiling}
                  className="group inline-flex items-center gap-2 rounded bg-fg px-4 py-2 text-[12px] font-bold text-ink-0 transition-all hover:bg-[var(--color-jal)] hover:text-white disabled:opacity-50"
                >
                  {compiling ? "Compiling Node..." : "Generate OS"}
                  <span className="font-mono text-[9px] opacity-75">⌘↵</span>
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 justify-center lg:justify-start">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPrompt(p)}
                  className="rounded-full border border-line bg-ink-1 px-3 py-1 font-mono text-[10px] text-fg-dim transition-colors hover:border-line-strong hover:text-fg"
                >
                  preset_{presets.indexOf(p) + 1}
                </button>
              ))}
            </div>
          </form>

          {/* Compilation Output Telemetry */}
          <div className="relative rounded-xl border border-line bg-ink-1/80 p-5 shadow-2xl backdrop-blur-xl min-h-[320px]">
            {compiling && (
              <div className="absolute inset-0 grid place-items-center bg-ink-0/60 z-20 rounded-xl">
                <div className="text-center font-mono text-xs text-[var(--color-jal)] space-y-2">
                  <div className="animate-spin size-6 border-2 border-[var(--color-jal)] border-t-transparent rounded-full mx-auto" />
                  <p className="uppercase tracking-[0.25em] animate-pulse">Spawning Ecosystem Nodes...</p>
                </div>
              </div>
            )}

            {compiled ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-fg-mute)]">TATVA COMPILER RUN · OK</span>
                  <span className="font-mono text-[9px] text-[var(--color-vayu)] uppercase font-bold">14 nodes deployed</span>
                </div>

                {/* Simulated generated blueprint */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded border border-line bg-ink-2 p-3.5">
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--color-fg-mute)]">AI Agent Core Routing</span>
                    <h4 className="text-[13.5px] font-bold text-fg mt-1">langgraph.agent.mesh</h4>
                    <p className="font-mono text-[9px] text-[var(--color-agni)] uppercase tracking-wider mt-1">Status: Standby</p>
                  </div>
                  <div className="rounded border border-line bg-ink-2 p-3.5">
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--color-fg-mute)]">Monetization Engine</span>
                    <h4 className="text-[13.5px] font-bold text-fg mt-1">jal.revenue.split</h4>
                    <p className="font-mono text-[9px] text-[var(--color-jal)] uppercase tracking-wider mt-1">Split: Idempotent Ledger</p>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-fg-mute)]">Compilation Topology</span>
                  <div className="mt-3.5 space-y-2.5 font-mono text-[11px]">
                    <div className="flex justify-between items-center border-b border-line/40 pb-1.5">
                      <span className="text-fg-dim">› Deploy cloudflare workers</span>
                      <span className="text-[var(--color-vayu)] font-semibold">SUCCESS</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-line/40 pb-1.5">
                      <span className="text-fg-dim">› Configure postgres replica cluster</span>
                      <span className="text-[var(--color-prithvi)] font-semibold">ONLINE</span>
                    </div>
                    <div className="flex justify-between items-center pb-1">
                      <span className="text-fg-dim">› Establish WebSocket mesh handshake</span>
                      <span className="text-[var(--color-akasha)] font-semibold">nominal</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[280px] font-mono text-[11px] text-fg-mute uppercase tracking-[0.25em]">
                awaiting handshake compiler trigger...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
