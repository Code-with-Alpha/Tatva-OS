import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    let nodes: Array<{
      x: number;
      y: number;
      ox: number; // original position
      oy: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
      label: string;
    }> = [];
    let rafId = 0;
    let active = true;

    const labels = [
      "Agni.Core", "Jal.Router", "Prithvi.DB", "Vayu.Queue", "Akasha.Model",
      "SDR.Agent", "Docker.Edge", "Monetize.Flow", "Wasm.Sand", "Temporal.Workflow"
    ];

    const colors = [
      "rgba(217, 119, 6, 0.7)",  // Prithvi - gold
      "rgba(6, 182, 212, 0.7)",  // Jal - aqua
      "rgba(244, 63, 94, 0.7)",  // Agni - red
      "rgba(16, 185, 129, 0.7)", // Vayu - green
      "rgba(139, 92, 246, 0.7)"  // Akasha - purple
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initNodes();
    };

    const initNodes = () => {
      nodes = Array.from({ length: 48 }, (_, i) => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x,
          y,
          ox: x,
          oy: y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 2 + 1,
          color: colors[i % colors.length],
          label: i % 4 === 0 ? labels[(i / 4) % labels.length] : "",
        };
      });
    };

    const draw = () => {
      if (!active) return;
      ctx.clearRect(0, 0, w, h);

      // Scroll compression multiplier: as scroll goes down, nodes draw closer to center groups
      const ratio = Math.min(scrollY / 600, 1.0);
      const attractionForce = ratio * 0.035;

      // Update positions
      nodes.forEach((n, idx) => {
        // Base drift
        n.x += n.vx;
        n.y += n.vy;

        // Bounce borders
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // Pull towards modular cluster centers based on scroll ratio
        if (attractionForce > 0) {
          const groupIdx = idx % 3;
          const targetX = groupIdx === 0 ? w * 0.35 : groupIdx === 1 ? w * 0.5 : w * 0.65;
          const targetY = groupIdx === 0 ? h * 0.4 : groupIdx === 1 ? h * 0.65 : h * 0.45;
          n.x += (targetX - n.x) * attractionForce;
          n.y += (targetY - n.y) * attractionForce;
        }
      });

      // Draw connection lines - proximity threshold decreases with scroll to look tighter
      const threshold = ratio > 0.5 ? 90 : 130;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < threshold) {
            const alpha = (1 - dist / threshold) * (0.05 + ratio * 0.18);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5 + ratio * 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = ratio > 0.3 ? 8 : 0;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + ratio * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Label rendering for key nodes
        if (n.label && ratio > 0.2) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
          ctx.font = "8px JetBrains Mono";
          ctx.fillText(n.label, n.x + 8, n.y + 3);
        }
      });

      rafId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
    }, { threshold: 0.05 });

    observer.observe(canvas);
    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [scrollY]);

  return (
    <section ref={containerRef} className="relative isolate overflow-hidden pt-36 pb-28 min-h-[95vh] flex items-center">
      {/* Background structure */}
      <div className="absolute inset-0 grid-bg radial-fade opacity-40 z-0" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-0 to-transparent z-10" />

      <div className="relative mx-auto max-w-[1280px] px-6 w-full z-20 grid grid-cols-1 lg:grid-cols-[7.5fr_4.5fr] gap-12 items-center">
        <div>
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-ink-1/80 px-3.5 py-1 backdrop-blur"
          >
            <span className="relative grid size-1.5 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-jal)] opacity-75" />
              <span className="relative size-1.5 rounded-full bg-[var(--color-jal)]" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--color-fg-dim)]">
              TATVA MESH · 18,924 NODE COMPOSITES · 421 FORKS/HR
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.5rem,6.5vw,5.25rem)] font-extrabold leading-[0.9] tracking-[-0.03em] text-balance">
            The digital
            <br />
            <span className="relative inline-block mt-1">
              <span className="bg-gradient-to-r from-[var(--color-prithvi)] via-white to-[var(--color-jal)] bg-clip-text text-transparent">
                substrate
              </span>
            </span>{" "}
            where startups evolve.
          </h1>

          <p className="mt-8 max-w-[46ch] text-[16px] leading-relaxed text-fg-dim">
            Tatva is a startup operating system. Describe a business, compile its elemental graph, and spawn workflows, deployment charts, and autonomous agent meshes instantly.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#auth"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-gradient-to-r from-[var(--color-prithvi)] to-[var(--color-jal)] px-6 py-3.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_25px_rgba(217,119,6,0.3)] active:scale-[0.98]"
            >
              <span>Initialize Workspace</span>
              <svg className="size-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3v3a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3M5 13V8m6 5V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="5" cy="3" r="1.2" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="11" cy="3" r="1.2" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="8" cy="13" r="1.2" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </a>
            <a
              href="#ecosystem"
              className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-haze px-6 py-3.5 text-sm font-semibold text-fg transition-all hover:bg-ink-2 hover:border-white/20"
            >
              Explore Elemental Grid
              <span className="font-mono text-[10px] text-fg-mute">→</span>
            </a>
          </div>
        </div>

        {/* Telemetry Panels (Asymmetric & Cyberpunk) */}
        <div className="relative space-y-6 lg:mt-8">
          {/* Main Genome Matrix */}
          <div className="relative overflow-hidden rounded-xl border border-line bg-ink-1/95 p-5 shadow-2xl backdrop-blur-xl hairline-sweep">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-fg-mute)]">Genome DNA · Active</span>
              <span className="rounded-sm bg-[var(--color-vayu)]/10 px-1.5 py-0.5 font-mono text-[9px] text-[var(--color-vayu)] font-semibold">
                COMPILING
              </span>
            </div>
            <div className="mt-4 space-y-3 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-fg-dim">› prithvi.architecture</span>
                <span className="text-[var(--color-prithvi)]">remixable</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-dim">› jal.orchestrator</span>
                <span className="text-[var(--color-jal)]">active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-dim">› agni.latency</span>
                <span className="text-[var(--color-agni)]">4ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-dim">› vayu.intelligence</span>
                <span className="text-[var(--color-vayu)]">ready</span>
              </div>
            </div>
          </div>

          {/* Connected Graph Telemetry */}
          <div className="relative overflow-hidden rounded-xl border border-line bg-ink-2/95 p-4 shadow-xl backdrop-blur-lg">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-fg-mute)]">Evolution Topology</span>
            <svg viewBox="0 0 200 70" className="mt-3 h-14 w-full">
              <g stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" fill="none">
                <line x1="10" y1="35" x2="60" y2="35" />
                <line x1="60" y1="35" x2="110" y2="15" />
                <line x1="60" y1="35" x2="110" y2="55" />
                <line x1="110" y1="15" x2="160" y2="15" />
                <line x1="110" y1="55" x2="160" y2="35" />
                <line x1="110" y1="55" x2="160" y2="55" />
              </g>
              {[
                { x: 10, y: 35, c: "var(--color-prithvi)" },
                { x: 60, y: 35, c: "var(--color-jal)" },
                { x: 110, y: 15, c: "var(--color-vayu)" },
                { x: 110, y: 55, c: "var(--color-agni)" },
                { x: 160, y: 15, c: "var(--color-akasha)" },
                { x: 160, y: 35, c: "var(--color-jal)" },
                { x: 160, y: 55, c: "var(--color-vayu)" },
              ].map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="3" fill={pt.c} className="pulse-dot" />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
