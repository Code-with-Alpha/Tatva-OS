import { useState } from "react";
import { SectionLabel } from "./forkable";

export function Simulator() {
  const [load, setLoad] = useState(45); // 0 to 100

  // Calculate dynamic metrics based on load parameter
  const edgeRequests = Math.floor(load * 1250 + 200);
  const cpuStress = Math.floor(load * 0.85 + 10);
  const burnRate = Math.floor(load * 450 + 1500);
  const revenueRate = Math.floor(load * load * 0.95 + 100);

  // Generate dynamic path coords for SVG lines based on load multiplier
  const requestsPoints = Array.from({ length: 12 }, (_, i) => {
    const x = i * 20;
    const noise = Math.sin(i * 1.5) * 5 * (load / 30);
    const y = 60 - (i * 3 * (load / 50)) - noise;
    return `${x},${Math.max(10, Math.min(75, y))}`;
  }).join(" ");

  const burnPoints = Array.from({ length: 12 }, (_, i) => {
    const x = i * 20;
    const y = 65 - (i * 1.5 * (load / 45));
    return `${x},${Math.max(15, Math.min(75, y))}`;
  }).join(" ");

  return (
    <section id="simulator" className="relative py-28 border-t border-line bg-ink-1/40">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(244,63,94,0.02),transparent_60%)] pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 items-center">
          
          <div>
            <SectionLabel index="06" label="TATVA LAUNCH SIMULATOR" />
            <h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.02em] text-balance">
              Stress-test your venture before launch.
            </h2>
            <p className="mt-5 text-fg-dim text-[14.5px] leading-relaxed">
              Run simulated stress tests to evaluate your startup operating system. Tune edge request concurrency parameters and watch the engine project database scaling, cash flows, and resource bottlenecks instantly.
            </p>

            {/* Slider Control Terminal */}
            <div className="mt-8 rounded-xl border border-line bg-ink-2 p-5 shadow-lg">
              <div className="flex justify-between items-center font-mono text-[9px] uppercase tracking-[0.2em] text-fg-mute font-bold mb-3">
                <span>SIMULATOR LOAD CONCURRENCY</span>
                <span className="text-[var(--color-jal)] font-bold">{load * 10}K USERS</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={load}
                onChange={(e) => setLoad(Number(e.target.value))}
                className="w-full h-1.5 bg-ink-3 rounded-lg appearance-none cursor-pointer accent-[var(--color-jal)]"
              />
              <div className="flex justify-between text-[9px] font-mono uppercase text-fg-mute mt-2">
                <span>Min Stress</span>
                <span>Max Concurrency Stress</span>
              </div>
            </div>
          </div>

          {/* Graphical Dashboard Telemetry */}
          <div className="relative rounded-xl border border-line-strong bg-ink-0 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-fg-mute font-bold">Launch Sandbox Telemetry</span>
              <span className="rounded-sm bg-[var(--color-agni)]/10 px-1.5 py-0.5 font-mono text-[9px] text-[var(--color-agni)] font-bold">
                SIMULATION LIVE
              </span>
            </div>

            {/* Grid display of metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded border border-line bg-ink-2 p-3 font-mono">
                <span className="text-[8px] uppercase tracking-[0.2em] text-fg-mute">Edge Request Speed</span>
                <div className="text-[16px] font-bold text-[var(--color-jal)] mt-1">{edgeRequests.toLocaleString()}/sec</div>
              </div>
              <div className="rounded border border-line bg-ink-2 p-3 font-mono">
                <span className="text-[8px] uppercase tracking-[0.2em] text-fg-mute">Postgres CPU Stress</span>
                <div className="text-[16px] font-bold text-[var(--color-vayu)] mt-1">{cpuStress}% load</div>
              </div>
              <div className="rounded border border-line bg-ink-2 p-3 font-mono">
                <span className="text-[8px] uppercase tracking-[0.2em] text-fg-mute">Monthly Burn Projection</span>
                <div className="text-[16px] font-bold text-[var(--color-agni)] mt-1">${burnRate.toLocaleString()}/mo</div>
              </div>
              <div className="rounded border border-line bg-ink-2 p-3 font-mono">
                <span className="text-[8px] uppercase tracking-[0.2em] text-fg-mute">Gross Revenue Run-rate</span>
                <div className="text-[16px] font-bold text-[var(--color-prithvi)] mt-1">${revenueRate.toLocaleString()}/mo</div>
              </div>
            </div>

            {/* SVG Visualizing Neon Graph Lines */}
            <div className="relative h-32 rounded border border-line bg-ink-2/30 p-2.5 overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-15" />
              <svg viewBox="0 0 220 80" className="w-full h-full" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="var(--color-jal)"
                  strokeWidth="1.8"
                  points={requestsPoints}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  fill="none"
                  stroke="var(--color-agni)"
                  strokeWidth="1.8"
                  points={burnPoints}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="absolute bottom-2 left-2 flex gap-4 font-mono text-[8px] uppercase tracking-wider text-fg-mute">
                <div className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[var(--color-jal)]" />
                  Edge Load
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[var(--color-agni)]" />
                  Venture Burn
                </div>
              </div>
            </div>

            {/* Simulated compiler logs */}
            <div className="mt-4 font-mono text-[9px] text-fg-mute uppercase leading-5 border-t border-line pt-3.5 space-y-1">
              <div>› warning: vayu.mesh memory buffers at {cpuStress + 12}% in region ap-south</div>
              <div>› jal.payments: idempotent database splits synchronizing... ok</div>
              <div>› simulation: overall architecture reliability run nominal</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
