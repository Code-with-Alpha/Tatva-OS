import { useMemo, useState } from "react";
import { Orb } from "./orb";
import { SectionLabel } from "./forkable";

type Mood = "idle" | "watching" | "thinking" | "happy" | "angry";

export function Auth() {
  const [handle, setHandle] = useState("");
  const [pw, setPw] = useState("");
  const [hovering, setHovering] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const mood: Mood = useMemo(() => {
    if (status === "success") return "happy";
    if (status === "error") return "angry";
    if (hovering) return "thinking";
    if (handle || pw) return "watching";
    return "idle";
  }, [handle, pw, hovering, status]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle || pw.length < 5) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1800);
      return;
    }
    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      // clear fields on success simulate transition
      setHandle("");
      setPw("");
    }, 2400);
  };

  return (
    <section id="auth" className="relative py-28 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 items-center gap-12 overflow-hidden rounded-2xl border border-line-strong bg-ink-1 lg:grid-cols-2 shadow-2xl backdrop-blur">
          
          {/* Holographic Companion Canvas side */}
          <div className="relative grid h-[480px] place-items-center overflow-hidden border-b border-line lg:border-b-0 lg:border-r bg-ink-0/20">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(6,182,212,0.04),transparent_60%)]" />
            
            <Orb mood={mood} />
            
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-fg-mute font-bold">
              <span>TATVA-AETHER · HANDSHAKE TUNNEL</span>
              <span className={status === "error" ? "text-[var(--color-agni)]" : status === "success" ? "text-[var(--color-vayu)]" : "text-fg-mute"}>
                {status === "idle" ? "● STANDBY" : status === "error" ? "● SHIELD REJECTED" : "● ACCESS GRANTED"}
              </span>
            </div>
          </div>

          {/* Secure Handshake Console Form */}
          <div className="p-8 md:p-12">
            <SectionLabel index="07" label="SECURE IDENTITY HANDSHAKE" />
            <h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.02em] text-balance">
              Initialize identity workspace.
            </h2>
            <p className="mt-3 text-fg-dim text-[14.5px] leading-relaxed">
              Authenticate your builder signature to load composite nodes, deploy container pipelines, and sync multiplayer whiteboards.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <Field label="Developer Signature / Handle">
                <input
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="builder_name"
                  className="w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-mute font-mono"
                  disabled={status === "success"}
                />
              </Field>
              <Field label="Secure Access Passkey (Min 5 chars)">
                <input
                  type="password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-mute font-mono"
                  disabled={status === "success"}
                />
              </Field>

              <button
                type="submit"
                disabled={status === "success"}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className="group relative mt-2.5 w-full overflow-hidden rounded bg-fg py-4 text-[13px] font-bold text-ink-0 transition-transform active:scale-[0.99] uppercase tracking-widest cursor-pointer disabled:opacity-50"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[var(--color-prithvi)] to-[var(--color-jal)] transition-transform duration-500 group-hover:translate-x-0" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {status === "success" ? "TRANSITIONING GRID..." : "Initialize Handshake"}
                </span>
              </button>
            </form>

            <div className="mt-7 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-fg-mute font-bold">
              <a href="#" className="hover:text-fg transition-colors">lost mesh connection?</a>
              <span>SECURE TUNNEL · SHA-256</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block rounded border border-line bg-ink-0 px-4 py-3 transition-colors focus-within:border-[var(--color-jal)]/50">
      <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-fg-mute font-bold">{label}</div>
      <div className="mt-1">{children}</div>
    </label>
  );
}
