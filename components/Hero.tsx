"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const BOOT_LINES = [
  "INITIALIZING NEURAL INTERFACE...",
  "LOADING SKILL MATRIX...",
  "ESTABLISHING CYBER-LINK...",
  "SYSTEM READY.",
];

function TerminalLine({ text, delay }: { text: string; delay: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(iv);
          setDone(true);
        }
      }, 35);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);
  return (
    <div
      className="font-mono text-[11px] mb-1 min-h-[18px]"
      style={{ color: "var(--text-secondary)" }}
    >
      <span className="mr-2" style={{ color: "var(--cyber-green)" }}>
        &gt;
      </span>
      {displayed}
      {!done && (
        <span
          className="ml-px border-r-2 border-cyber-cyan"
          style={{ animation: "blink 0.8s infinite" }}
        />
      )}
    </div>
  );
}

function GridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const particles: { x: number; y: number; vy: number; life: number }[] = [];
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { width: w, height: h } = canvas;
      const sp = 60;
      ctx.strokeStyle = "rgba(0,245,255,0.05)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += sp) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += sp) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(255,0,144,0.03)";
      for (let i = -h; i < w + h; i += 120) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + h, h);
        ctx.stroke();
      }
      for (let x = 0; x < w; x += sp)
        for (let y = 0; y < h; y += sp) {
          if (Math.random() > 0.999)
            particles.push({ x, y, vy: -Math.random() * 0.6, life: 1 });
        }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.vy;
        p.life -= 0.018;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,255,${p.life * 0.9})`;
        ctx.fill();
      }
      const corners = [
        [30, 30],
        [w - 30, 30],
        [30, h - 30],
        [w - 30, h - 30],
      ] as [number, number][];
      corners.forEach(([cx, cy]) => {
        ctx.strokeStyle = "rgba(0,245,255,0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - 12, cy);
        ctx.lineTo(cx + 12, cy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx, cy - 12);
        ctx.lineTo(cx, cy + 12);
        ctx.stroke();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

export default function Hero() {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #020408 0%, #050d1a 50%, #020408 100%)",
        paddingTop: "90px",
      }}
    >
      <GridCanvas />

      {/* Scan line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-40 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00f5ff, transparent)",
          animation: "scan-line 5s linear infinite",
        }}
      />

      {/* Left accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--cyber-cyan), var(--cyber-pink), transparent)",
        }}
      />

      {/* Floating tech pills – right side */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-5 z-10">
        {["TS", "GO", "PY", "K8", "AI"].map((l, i) => (
          <div
            key={l}
            className="w-12 h-12 clip-cyber-sm flex items-center justify-center font-mono text-[11px] font-bold"
            style={{
              background:
                i % 2 === 0 ? "rgba(0,245,255,0.08)" : "rgba(255,0,144,0.08)",
              border: `1px solid ${
                i % 2 === 0 ? "rgba(0,245,255,0.35)" : "rgba(255,0,144,0.35)"
              }`,
              color: i % 2 === 0 ? "var(--cyber-cyan)" : "var(--cyber-pink)",
              animation: `float ${2.2 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            {l}
          </div>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – text */}
          <div>
            {/* Terminal block */}
            <div className="mb-10 p-4 clip-cyber-md border border-cyber-cyan/15 bg-cyber-cyan/[0.03] max-w-md">
              <div className="flex items-center gap-2 mb-3">
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div
                    key={c}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: c }}
                  />
                ))}
                <span className="font-mono text-[10px] text-muted ml-2">
                  SYSTEM.BOOT — v2.0.26
                </span>
              </div>
              {BOOT_LINES.map((line, i) => (
                <TerminalLine key={i} text={line} delay={i * 750} />
              ))}
            </div>

            <div className="section-label">DEVELOPER PROFILE // NODE_001</div>

            {/* Glitch title */}
            <h1
              className="font-display font-black leading-none mb-2 text-primary relative"
              style={{ fontSize: "clamp(52px, 8vw, 100px)" }}
            >
              MARWIN
              {glitch && (
                <>
                  <span
                    className="absolute left-0 top-0 text-cyber-cyan"
                    style={{
                      clipPath: "inset(20% 0 55% 0)",
                      transform: "translate(-3px)",
                      opacity: 0.8,
                    }}
                  >
                    MARWIN
                  </span>
                  <span
                    className="absolute left-0 top-0 text-cyber-pink"
                    style={{
                      clipPath: "inset(60% 0 15% 0)",
                      transform: "translate(3px)",
                      opacity: 0.8,
                    }}
                  >
                    YUTH
                  </span>
                </>
              )}
            </h1>
            <h1
              className="font-display font-black leading-none mb-6"
              style={{ fontSize: "clamp(52px, 8vw, 100px)" }}
            >
              <span
                className="glow-cyan text-cyber-cyan"
                style={{ WebkitTextStroke: "1px #00f5ff" }}
              >
                YUTH
              </span>
              <sup
                className="font-mono text-cyber-yellow ml-2"
                style={{ fontSize: "0.25em", verticalAlign: "super" }}
              >
                {/* v4.2 */}
              </sup>
            </h1>

            <div
              className="font-display tracking-[0.3em] text-secondary mb-8"
              style={{ fontSize: "clamp(12px, 1.5vw, 18px)" }}
            >
              FULL-STACK <span className="text-cyber-pink">//</span>
            </div>

            <p className="font-body text-secondary leading-relaxed mb-10 max-w-lg text-[15px]">
              I'm a Web developer I work with a team of developers and designers
              to create innovative and accessible web solutions to build and
              maintain both the backend and frontend of platforms, ensuring high
              performance, security, and a seamless user experience.
              {/* <span className="text-cyber-cyan">
                {" "}
                Currently available for select missions.
              </span> */}
            </p>

            <div className="flex gap-4 flex-wrap mb-14">
              <a href="#projects" className="cyber-btn cyber-btn-primary">
                VIEW PROJECTS →
              </a>
              <a href="#contact" className="cyber-btn cyber-btn-outline">
                ESTABLISH LINK
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-10 flex-wrap">
              {[
                { v: "2", l: "YEARS ACTIVE" },
                { v: "10+", l: "PROJECTS PARTICIPANT" },
                // { v: "12", l: "TECH MASTERED" },
                // { v: "99%", l: "UPTIME" },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    className="font-display font-black text-cyber-cyan leading-none"
                    style={{ fontSize: 34 }}
                  >
                    {s.v}
                  </div>
                  <div
                    className="font-mono text-muted tracking-[0.2em] mt-1"
                    style={{ fontSize: 9 }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Profile Picture */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer rotating ring */}
              <div
                className="absolute inset-[-20px] rounded-full border border-cyber-cyan/10"
                style={{ animation: "rotate-slow 20s linear infinite" }}
              >
                {[0, 90, 180, 270].map((deg) => (
                  <div
                    key={deg}
                    className="absolute w-2 h-2 bg-cyber-cyan rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${deg}deg) translateX(calc(-50% + 0px)) translateY(-${
                        (100 + 20) / 2
                      }px)`,
                      boxShadow: "0 0 8px #00f5ff",
                    }}
                  />
                ))}
              </div>

              {/* Hex frame */}
              <div
                className="clip-hex overflow-hidden relative"
                style={{
                  width: 340,
                  height: 340,
                  border: "2px solid rgba(0,245,255,0.4)",
                  animation: "pulse-glow 3s ease-in-out infinite",
                }}
              >
                <Image
                  src="/marwin-profile.jpg"
                  alt="Marwin Yuth — Full-Stack Developer"
                  width={340}
                  height={340}
                  className="object-cover w-full h-full"
                  priority
                />
                {/* Scanline overlay on image */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,245,255,0.02) 3px, rgba(0,245,255,0.02) 4px)",
                  }}
                />
              </div>

              {/* Corner brackets */}
              {[
                "top-0 left-0 border-t-2 border-l-2",
                "top-0 right-0 border-t-2 border-r-2",
                "bottom-0 left-0 border-b-2 border-l-2",
                "bottom-0 right-0 border-b-2 border-r-2",
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-8 h-8 ${cls} border-cyber-cyan`}
                />
              ))}

              {/* Status badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 clip-cyber-sm border border-cyber-green/40 bg-cyber-green/10 flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full bg-cyber-green"
                  style={{ boxShadow: "0 0 6px #00ff9d" }}
                />
                <span className="font-mono text-[9px] text-cyber-green tracking-widest">
                  AVAILABLE FOR HIRE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background: "linear-gradient(transparent, var(--cyber-black))",
        }}
      />
    </section>
  );
}
