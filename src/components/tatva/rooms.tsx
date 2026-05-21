import { useEffect, useState, useRef } from "react";
import { SectionLabel } from "./forkable";

export function Rooms() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursors, setCursors] = useState([
    { id: 1, name: "SDR-Agent-V2", x: 120, y: 150, color: "var(--color-agni)" },
    { id: 2, name: "DevOps-Node",  x: 340, y: 80,  color: "var(--color-vayu)" },
    { id: 3, name: "AI-Copilot",   x: 250, y: 220, color: "var(--color-jal)" },
  ]);

  // Simulate remote cursors moving around the board
  useEffect(() => {
    let active = true;
    const interval = setInterval(() => {
      if (!active) return;
      setCursors((prev) =>
        prev.map((c) => {
          const dx = (Math.random() - 0.5) * 45;
          const dy = (Math.random() - 0.5) * 45;
          const nx = Math.max(20, Math.min(580, c.x + dx));
          const ny = Math.max(20, Math.min(280, c.y + dy));
          return { ...c, x: nx, y: ny };
        })
      );
    }, 450);

    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
    });
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={containerRef} id="rooms" className="relative border-t border-line bg-ink-1/40 py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 items-center">
          
          {/* Collaborative Sandbox Canvas */}
          <div className="relative rounded-xl border border-line-strong bg-ink-0 p-4 shadow-2xl backdrop-blur-xl">
            <div className="mb-3.5 flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.25em] text-fg-mute font-bold">
                <span className="size-2 rounded-full bg-[var(--color-agni)] pulse-dot" />
                WAR ROOM · MULTIPLAYER COLLABORATION
              </div>
              <div className="flex -space-x-1.5">
                {cursors.map((c) => (
                  <div
                    key={c.id}
                    className="size-5.5 rounded-full ring-2 ring-ink-0 font-mono text-[8px] font-bold grid place-items-center uppercase border border-line"
                    style={{ backgroundColor: c.color, color: "#000" }}
                    title={c.name}
                  >
                    {c.name[0]}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-[16/9.5] w-full overflow-hidden rounded-lg bg-[radial-gradient(circle_at_50%_50%,#09090e,#030305_80%)] border border-line">
              <div className="absolute inset-0 grid-bg opacity-25" />

              {/* Simulated whiteboard architectural block */}
              <div className="absolute left-[15%] top-[25%] p-3 rounded border border-line bg-ink-2/95 shadow-md max-w-[140px] pointer-events-none">
                <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-fg-mute">Node Group</span>
                <h4 className="text-[12px] font-bold text-fg mt-0.5">Jal.Liquidity</h4>
                <div className="w-full h-1 bg-[var(--color-jal)] rounded mt-2" />
              </div>

              <div className="absolute left-[55%] top-[45%] p-3 rounded border border-line bg-ink-2/95 shadow-md max-w-[140px] pointer-events-none">
                <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-fg-mute">Node Group</span>
                <h4 className="text-[12px] font-bold text-fg mt-0.5">Agni.Weights</h4>
                <div className="w-full h-1 bg-[var(--color-agni)] rounded mt-2" />
              </div>

              {/* Dynamic Remote Cursors */}
              {cursors.map((c) => (
                <div
                  key={c.id}
                  className="absolute pointer-events-none transition-all duration-500 ease-out z-30"
                  style={{ left: `${(c.x / 600) * 100}%`, top: `${(c.y / 300) * 100}%` }}
                >
                  <svg viewBox="0 0 100 100" className="size-4 rotate-[-15deg]">
                    <polygon points="0,0 100,45 45,45 45,100" fill={c.color} />
                  </svg>
                  <span
                    className="ml-3 mt-1 inline-block rounded-sm px-1.5 py-0.5 font-mono text-[8px] font-bold text-ink-0 whitespace-nowrap shadow-md uppercase tracking-wider"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3.5 flex justify-between items-center font-mono text-[9px] uppercase tracking-[0.25em] text-fg-mute font-bold">
              <span>Canvas Sync: 24ms latency</span>
              <span className="text-[var(--color-vayu)] font-semibold">Active Session</span>
            </div>
          </div>

          {/* Descriptive Content */}
          <div>
            <SectionLabel index="04" label="TATVA BUILD ROOMS" />
            <h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.02em] text-balance">
              Multiplayer builder war rooms.
            </h2>
            <p className="mt-5 text-fg-dim text-[14.5px] leading-relaxed">
              Ship as a civilization. Share architectural canvases with engineering partners and autonomous AI copilots. Watch code reviews, Docker builds, and vector deployments compile collectively in real-time.
            </p>
            <ul className="mt-8 space-y-3.5 font-mono text-[11px] text-fg-dim">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[var(--color-jal)]" />
                Multiplayer Whiteboard Architecture Graphs
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[var(--color-agni)]" />
                AI Agent Collaborative Nodes
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[var(--color-vayu)]" />
                Unified Action Logs and Execution Playbacks
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
