"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function About() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 14, y: -x * 14 });
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-32 relative overflow-hidden"
      style={{ background: "var(--cyber-dark)" }}
    >
      {/* BG hexagons */}
      <svg
        className="absolute right-0 top-0 opacity-[0.04] w-1/2 pointer-events-none"
        viewBox="0 0 400 400"
      >
        {[0, 1, 2, 3, 4].flatMap((row) =>
          [0, 1, 2, 3].map((col) => {
            const x = col * 90 + (row % 2) * 45 + 20;
            const y = row * 78 + 20;
            return (
              <polygon
                key={`${row}-${col}`}
                points={`${x},${y - 40} ${x + 35},${y - 20} ${x + 35},${
                  y + 20
                } ${x},${y + 40} ${x - 35},${y + 20} ${x - 35},${y - 20}`}
                fill="none"
                stroke="#00f5ff"
                strokeWidth="1"
              />
            );
          })
        )}
      </svg>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Holographic ID Card */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            className="cursor-none"
            style={{
              transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.08s ease",
              opacity: visible ? 1 : 0,
              animation: visible ? "hex-appear 0.8s ease forwards" : "none",
            }}
          >
            <div
              className="clip-cyber-lg border border-cyber-cyan/25 p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0d1f38, #0a1628)",
                boxShadow:
                  "0 0 40px rgba(0,245,255,0.08), inset 0 0 40px rgba(0,245,255,0.02)",
              }}
            >
              {/* Holographic shimmer */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(${
                    tilt.y * 5 + 45
                  }deg, rgba(0,245,255,0.04) 0%, rgba(255,0,144,0.04) 50%, rgba(157,0,255,0.04) 100%)`,
                }}
              />

              {/* Card header */}
              <div className="flex items-center justify-between mb-6">
                <div className="clip-cyber-sm px-3 py-1 border border-cyber-green/30 bg-cyber-green/10 font-mono text-[9px] text-cyber-green tracking-widest">
                  ● ACTIVE
                </div>
              </div>

              {/* Avatar + name */}
              <div className="flex gap-6 mb-6">
                <div
                  className="clip-hex w-20 h-20 flex-shrink-0 flex items-center justify-center font-display font-black text-cyber-cyan text-2xl"
                  style={{
                    border: "2px solid var(--cyber-cyan)",
                    background:
                      "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(157,0,255,0.15))",
                    animation: "pulse-glow 3s infinite",
                  }}
                >
                  <Image
                    src="/marwin-profile.jpg"
                    alt="Alex Chen"
                    width={80}
                    height={80}
                    className="clip-hex object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-primary text-xl mb-1">
                    MARWIN YUTH
                  </div>
                  <div className="font-mono text-[11px] text-cyber-pink tracking-widest mb-2">
                    FULL-STACK DEVELOPER
                  </div>
                  <div className="font-mono text-[9px] text-muted leading-relaxed">
                    LANG: EN / KH
                  </div>
                </div>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {["REACT", "JAVA", "EXPRESS JS", "NODE", "VUE", "POSTGRES"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[9px] tracking-widest px-2 py-0.5 clip-cyber-sm border border-cyber-cyan/20 bg-cyber-cyan/8 text-cyber-cyan"
                      style={{ background: "rgba(0,245,255,0.06)" }}
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>

              {/* Barcode */}
              <div className="flex gap-0.5 items-end opacity-30 mb-1">
                {Array.from({ length: 42 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-cyber-cyan"
                    style={{
                      width: Math.random() > 0.5 ? 2 : 1,
                      height: 8 + Math.random() * 14,
                    }}
                  />
                ))}
              </div>
              <div className="font-mono text-[8px] text-muted tracking-[0.3em]">
                7829-AC-2026-FSTACK-001
              </div>
            </div>
          </div>

          {/* Text column */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(40px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            <div className="section-label">BIOGRAPHICAL DATA</div>
            <h2
              className="font-display font-black mb-5"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              <span className="text-primary">ABOUT THE</span>
              <br />
              <span className="glow-pink text-cyber-pink">DEVELOPER</span>
            </h2>
            <p className="font-body text-secondary leading-relaxed text-[15px] mb-8 max-w-md">
              A full-stack engineer who thrives at the intersection of
              performance and creativity.
            </p>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: "LOCATION", value: "Phnom Penh, Cambodia" },
                { label: "EXPERIENCE", value: "2.5 Years" },
                { label: "SPECIALITY", value: "Full-Stack" },
                { label: "STATUS", value: "Available Now" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="clip-cyber-sm border border-white/6 bg-cyber-panel px-4 py-3"
                >
                  <div className="font-mono text-[9px] text-muted tracking-widest mb-1">
                    {s.label}
                  </div>
                  <div className="font-display text-[13px] font-bold text-cyber-cyan">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <a href="#experience" className="cyber-btn cyber-btn-outline">
                VIEW EXPERIENCE
              </a>
              <a href="#projects" className="cyber-btn cyber-btn-primary">
                SEE PROJECTS →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
