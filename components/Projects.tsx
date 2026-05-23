"use client";
import { useRef, useState, useEffect } from "react";

const projects = [
  {
    id: "PRJ-001",
    name: "VNFTZ",
    subtitle: "",
    desc: "A new digital art marketplace has launched on the Vitruveo Blockchain — the premier platform for discovering, collecting, and creating VNFTZ. I contributed by integrating APIs to display collections and implementing the user interaction features, including the ability to like collections and view liked items on user profiles,etc",
    stack: ["Next.js", "TypeScript", "Express.js", "MongoDB"],
    color: "#4834BC",
    status: "DEPLOYED",
    // metrics: { users: "", uptime: "", latency: "" },
    year: "2025",
  },
  {
    id: "PRJ-002",
    name: "Poor Doge",
    subtitle: "",
    desc: "Poor Doge (PDOGE) is a cryptocurrency launched in May 2023 with the mission of ending the dog meat trade. It is a decentralized, community-driven project focused on raising awareness and driving change. I contributed by developing APIs, integrating data fetching, and building the admin dashboard for content management.",
    stack: ["Next.js", "TypeScript", "Express.js", "PostgreSQL"],
    color: "#FFBB03",
    status: "DEPLOYED",
    // metrics: { "API/day": "2M+", savings: "10×", models: "8" },
    year: "2024",
  },
  {
    id: "PRJ-003",
    name: "QrGrub",
    subtitle: "",
    desc: "QRGrub is a platform designed to help restaurants manage their operations more efficiently. I contributed by building the store menu display and developing the merchant dashboard for store management. Additionally, I worked on several API endpoints related to response handling.",
    stack: ["Next.js", "TypeScript", "Express.js", "PostgreSQL"],
    color: "#4C9C39",
    status: "DEPLOYED",
    // metrics: { services: "120+", throughput: "100k RPS", P99: "8ms" },
    year: "2024",
  },
  {
    id: "PRJ-004",
    name: "BizKhmer Media",
    subtitle: "",
    desc: "BizKhmer Digital Media is Cambodia's premier digital marketing agency, specializing in web development, SEO, social media marketing, and comprehensive digital solutions. I contributed by developing user interfaces and integrating APIs to dynamically display content across the platform.",
    stack: ["Next.js", "TypeScript", "Express.js", "PostgreSQL"],
    color: "#01649B",
    status: "DEPLOYED",
    // metrics: { events: "5M/hr", dashboards: "200+", query: "<100ms" },
    year: "2025",
  },
];

function Card({
  p,
  i,
  visible,
}: {
  p: (typeof projects)[0];
  i: number;
  visible: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="clip-cyber-md border relative p-7 transition-all duration-300 cursor-default"
      style={{
        background: hov ? `${p.color}06` : "var(--cyber-panel)",
        borderColor: hov ? `${p.color}45` : "rgba(255,255,255,0.06)",
        boxShadow: hov ? `0 0 30px ${p.color}12` : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${
          i * 0.08
        }s, background 0.3s, border-color 0.3s, box-shadow 0.3s`,
      }}
    >
      <div
        className="absolute top-0 right-0"
        style={{
          borderTop: `20px solid ${
            hov ? p.color + "40" : "rgba(255,255,255,0.05)"
          }`,
          borderLeft: "20px solid transparent",
          transition: "border-color 0.3s",
        }}
      />

      <div className="flex justify-between items-start mb-4 gap-3">
        <div>
          <div className="font-mono text-[9px] tracking-widest text-muted mb-1.5">
            {p.id} // {p.year}
          </div>
          <h3
            className="font-display font-black tracking-wide mb-1"
            style={{ fontSize: 22, color: p.color }}
          >
            {p.name}
          </h3>
          <div className="font-body text-[13px] text-muted">{p.subtitle}</div>
        </div>
        <span
          className="flex-shrink-0 font-mono text-[9px] tracking-widest px-2.5 py-1 clip-cyber-sm whitespace-nowrap"
          style={{
            background: `${p.color}12`,
            border: `1px solid ${p.color}35`,
            color: p.color,
          }}
        >
          {p.status}
        </span>
      </div>

      <p className="font-body text-secondary text-[14px] leading-relaxed mb-5">
        {p.desc}
      </p>

      {/* <div className="flex gap-4 mb-5">
        {Object.entries(p.metrics).map(([k, v]) => (
          <div key={k}>
            <div
              className="font-display font-black text-lg"
              style={{ color: p.color }}
            >
              {v}
            </div>
            <div className="font-mono text-[8px] text-muted tracking-widest">
              {k.toUpperCase()}
            </div>
          </div>
        ))}
      </div> */}

      <div className="flex flex-wrap gap-1.5">
        {p.stack.map((t) => (
          <span
            key={t}
            className="font-mono text-[9px] px-2 py-0.5 text-muted border border-white/8 bg-white/[0.02]"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Bottom glow sweep */}
      <div
        className="absolute bottom-0 left-0 h-[2px] transition-all duration-400"
        style={{
          width: hov ? "100%" : "0%",
          background: `linear-gradient(90deg, ${p.color}, transparent)`,
        }}
      />
    </div>
  );
}

export default function Projects() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.04 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-32 relative"
      style={{ background: "var(--cyber-dark)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--cyber-cyan), var(--cyber-pink), transparent)",
        }}
      />
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <div className="section-label">MISSION LOG</div>
          <h2
            className="font-display font-black mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
          >
            <span className="text-primary">Project</span>
            <br />
            <span className="glow-pink text-cyber-pink">Participant</span>
          </h2>
          <p className="font-body text-secondary text-[15px] max-w-lg">
            Systems built for scale, speed, and resilience. Each project a new
            mission, each challenge overcome.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <Card key={p.id} p={p} i={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
