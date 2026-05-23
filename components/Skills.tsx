"use client";
import { useEffect, useRef, useState } from "react";

const skillGroups = [
  {
    category: "FRONTEND",
    color: "#00f5ff",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    category: "BACKEND",
    color: "#ff0090",
    skills: [
      { name: "Node.js", level: 93 },
      { name: "Express", level: 85 },
      { name: "JAVA", level: 60 },
    ],
  },
  // {
  //   category: "INFRA",
  //   color: "#9d00ff",
  //   skills: [
  //     { name: "Kubernetes", level: 80 },
  //     { name: "Docker", level: 92 },
  //   ],
  // },
  // { category: 'AI / DATA',color: '#ffe600', skills: [{ name: 'LLM Integration', level: 88 }, { name: 'PostgreSQL', level: 90 }, { name: 'Redis', level: 85 }, { name: 'Data Pipelines', level: 78 }] },
];

function RadarChart({ visible }: { visible: boolean }) {
  const pts = [
    { label: "FRONTEND", value: 0.94, angle: -90 },
    { label: "BACKEND", value: 0.89, angle: -18 },
    { label: "INFRA", value: 0.82, angle: 54 },
    { label: "AI/ML", value: 0.85, angle: 126 },
    { label: "DESIGN", value: 0.76, angle: 198 },
  ];
  const cx = 150,
    cy = 150,
    r = 100;
  const xy = (a: number, rad: number) => ({
    x: cx + rad * Math.cos((a * Math.PI) / 180),
    y: cy + rad * Math.sin((a * Math.PI) / 180),
  });
  const path =
    pts
      .map((p, i) => {
        const { x, y } = xy(p.angle, r * p.value * (visible ? 1 : 0));
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ") + " Z";
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[260px]">
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <polygon
          key={s}
          points={pts
            .map((p) => {
              const { x, y } = xy(p.angle, r * s);
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="rgba(0,245,255,0.1)"
          strokeWidth="1"
        />
      ))}
      {pts.map((p) => {
        const { x, y } = xy(p.angle, r);
        return (
          <line
            key={p.label}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="rgba(0,245,255,0.12)"
            strokeWidth="1"
          />
        );
      })}
      <path
        d={path}
        fill="rgba(0,245,255,0.1)"
        stroke="#00f5ff"
        strokeWidth="2"
        style={{
          filter: "drop-shadow(0 0 6px rgba(0,245,255,0.4))",
          transition: "d 1s ease",
        }}
      />
      {pts.map((p, i) => {
        const { x, y } = xy(p.angle, r * p.value * (visible ? 1 : 0));
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="4"
            fill="#00f5ff"
            style={{
              filter: "drop-shadow(0 0 4px #00f5ff)",
              transition: `all 1s ease ${i * 0.1}s`,
            }}
          />
        );
      })}
      {pts.map((p) => {
        const { x, y } = xy(p.angle, r * 1.22);
        return (
          <text
            key={p.label}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              fill: "rgba(0,245,255,0.65)",
              letterSpacing: "0.1em",
            }}
          >
            {p.label}
          </text>
        );
      })}
      <circle cx={cx} cy={cy} r="3" fill="var(--cyber-pink)" />
    </svg>
  );
}

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className="py-32 relative overflow-hidden"
      style={{ background: "var(--cyber-black)" }}
    >
      <div
        className="absolute right-5 top-0 bottom-0 w-px overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,245,255,0.15), transparent)",
        }}
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full"
            style={{
              height: 20,
              background: "rgba(0,245,255,0.5)",
              top: `${(i * 49) % 100}%`,
              animation: `data-stream ${
                2 + ((i * 0.28) % 2.5)
              }s linear infinite`,
              animationDelay: `${(i * 0.35) % 2.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap justify-between items-start gap-10 mb-16">
          <div>
            <div className="section-label">CAPABILITY MATRIX</div>
            <h2
              className="font-display font-black"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              <span className="text-primary">SKILL</span>
              <br />
              <span className="glow-cyan text-cyber-cyan">ARSENAL</span>
            </h2>
          </div>
          <RadarChart visible={visible} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {skillGroups.map((group, gi) => (
            <div
              key={group.category}
              className="clip-cyber-md relative p-6"
              style={{
                background: "var(--cyber-panel)",
                border: `1px solid ${group.color}20`,
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: `all 0.6s ease ${gi * 0.12}s`,
              }}
            >
              <div
                className="absolute top-0 right-0"
                style={{
                  borderTop: `16px solid ${group.color}25`,
                  borderLeft: "16px solid transparent",
                }}
              />
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-0.5 h-5 rounded-full"
                  style={{
                    background: group.color,
                    boxShadow: `0 0 8px ${group.color}`,
                  }}
                />
                <span
                  className="font-display font-bold text-[11px] tracking-[0.2em]"
                  style={{ color: group.color }}
                >
                  {group.category}
                </span>
              </div>
              {group.skills.map((sk, si) => (
                <div key={si} className="mb-3.5">
                  <div className="flex justify-between mb-1.5">
                    <span className="font-body text-secondary text-sm">
                      {sk.name}
                    </span>
                    <span
                      className="font-mono text-[11px]"
                      style={{ color: group.color }}
                    >
                      {visible ? `${sk.level}%` : "---"}
                    </span>
                  </div>
                  <div
                    className="h-[3px] relative overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0"
                      style={{
                        width: visible ? `${sk.level}%` : "0%",
                        background: `linear-gradient(90deg, ${group.color}88, ${group.color})`,
                        boxShadow: `0 0 8px ${group.color}`,
                        transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                    {[25, 50, 75].map((t) => (
                      <div
                        key={t}
                        className="absolute top-0 bottom-0 w-px"
                        style={{
                          left: `${t}%`,
                          background: "rgba(255,255,255,0.08)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="mt-14 flex flex-wrap gap-2.5 justify-center">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "PostgreSQL",
            "Docker",
            "Tailwind",
          ].map((tech, i) => (
            <div
              key={tech}
              className="font-mono text-[10px] tracking-widest px-3.5 py-1.5 clip-cyber-sm cursor-default text-muted border border-white/8 bg-white/[0.02] transition-all duration-200 hover:border-cyber-cyan/40 hover:text-cyber-cyan hover:bg-cyber-cyan/5"
              style={{
                opacity: visible ? 1 : 0,
                animation: visible
                  ? `hex-appear 0.4s ease ${i * 0.04}s forwards`
                  : "none",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
