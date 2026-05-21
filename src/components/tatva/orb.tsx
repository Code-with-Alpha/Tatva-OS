import { useEffect, useRef, useState } from "react";

type Mood = "idle" | "watching" | "thinking" | "happy" | "angry";

export function Orb({ mood }: { mood: Mood }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  // Magnetic cursor tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      
      // Scale coordinates to small range for companion focus
      setPointer({
        x: (dx / dist) * Math.min(22, dist / 25),
        y: (dy / dist) * Math.min(22, dist / 25),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 260;
    let h = 260;
    canvas.width = w * window.devicePixelRatio;
    canvas.height = h * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let frame = 0;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; color: string; life: number }> = [];
    let active = true;
    let rafId = 0;

    // Spawn green-gold success particles
    const spawnParticles = () => {
      particles = Array.from({ length: 50 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.8 + 1.2;
        return {
          x: w / 2,
          y: h / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: Math.random() * 2 + 1,
          color: Math.random() > 0.4 ? "rgba(16, 185, 129, 0.95)" : "rgba(217, 119, 6, 0.95)",
          life: 1.0,
        };
      });
    };

    if (mood === "happy") {
      spawnParticles();
    }

    const draw = () => {
      if (!active) return;
      ctx.clearRect(0, 0, w, h);
      frame++;

      const cx = w / 2;
      const cy = h / 2;

      // Subtle breathing flotation logic
      const floatY = mood === "idle" ? Math.sin(frame * 0.03) * 6 : Math.sin(frame * 0.05) * 3;
      let shakeX = 0;
      let glitchActive = false;

      // Chromatic glitched shaking in wrong password state
      if (mood === "angry") {
        shakeX = Math.sin(frame * 0.7) * 9;
        if (Math.random() < 0.12) glitchActive = true;
      }

      // Drawing Ambient Holographic Halos
      let haloColor = "rgba(255, 255, 255, 0.02)";
      if (mood === "watching") haloColor = "rgba(6, 182, 212, 0.06)";
      if (mood === "thinking") haloColor = "rgba(139, 92, 246, 0.08)";
      if (mood === "happy")    haloColor = "rgba(16, 185, 129, 0.12)";
      if (mood === "angry")    haloColor = "rgba(244, 63, 94, 0.14)";

      ctx.fillStyle = haloColor;
      ctx.shadowColor = mood === "angry" ? "#f43f5e" : mood === "happy" ? "#10b981" : "#06b6d4";
      ctx.shadowBlur = mood === "idle" ? 30 : 50;
      ctx.beginPath();
      ctx.arc(cx + shakeX, cy + floatY, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      // Draw rotating geometric cyberpunk orbital nodes
      const ringColor = mood === "angry" ? "rgba(244,63,94,0.18)" : "rgba(255,255,255,0.06)";
      ctx.strokeStyle = ringColor;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.arc(cx + shakeX, cy + floatY, 82, 0, Math.PI * 2);
      ctx.stroke();

      // Dashed outer ring
      ctx.strokeStyle = mood === "happy" ? "rgba(16,185,129,0.3)" : "rgba(6,182,212,0.15)";
      ctx.setLineDash([4, 18]);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx + shakeX, cy + floatY, 94, frame * 0.007, frame * 0.007 + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Draw Main Iris
      const eyeX = cx + shakeX + (glitchActive ? (Math.random() - 0.5) * 15 : pointer.x);
      const eyeY = cy + floatY + (glitchActive ? (Math.random() - 0.5) * 15 : pointer.y);

      // Core Outer Body
      const coreBorder = mood === "angry" ? "rgba(244,63,94,0.65)" : mood === "happy" ? "rgba(16,185,129,0.65)" : "rgba(6,182,212,0.45)";
      ctx.strokeStyle = coreBorder;
      ctx.lineWidth = 2.0;
      ctx.fillStyle = "#09090e";
      ctx.beginPath();
      ctx.arc(cx + shakeX, cy + floatY, 42, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Pupillary eye structure
      let pupilColor = "rgba(6, 182, 212, 0.85)"; // Jal
      if (mood === "happy") pupilColor = "rgba(16, 185, 129, 0.95)"; // Vayu
      if (mood === "angry") pupilColor = "rgba(244, 63, 94, 0.95)";  // Agni
      if (mood === "thinking") pupilColor = "rgba(139, 92, 246, 0.85)"; // Akasha
      if (mood === "idle") pupilColor = "rgba(255, 255, 255, 0.65)"; // neutral

      // Dynamic scaling of iris
      let irisSize = 14;
      if (mood === "angry") irisSize = 9;
      if (mood === "happy") irisSize = 18;

      ctx.fillStyle = pupilColor;
      ctx.shadowColor = pupilColor;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, irisSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      // Blinking cycle: Blink every ~120 frames for 6 frames
      const isBlinking = frame % 150 < 8;
      if (isBlinking) {
        ctx.fillStyle = "#09090e";
        ctx.beginPath();
        ctx.ellipse(eyeX, eyeY, irisSize + 1, irisSize / 4, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Iris reflection shine
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(eyeX - 4, eyeY - 4, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render success burst particles
      if (mood === "happy" && particles.length > 0) {
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.015;
          if (p.life > 0) {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0; // reset
          }
        });
      }

      rafId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
    });

    observer.observe(canvas);
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [mood, pointer]);

  return (
    <div className="relative grid place-items-center">
      {/* Outer grid boundary */}
      <canvas ref={canvasRef} className="relative z-10 size-64" />
      <div className="absolute font-mono text-[9px] uppercase tracking-[0.35em] text-fg-mute -bottom-6">
        AETHER // COMPANION // STATUS: {mood}
      </div>
    </div>
  );
}
