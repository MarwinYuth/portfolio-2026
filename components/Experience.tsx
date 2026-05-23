"use client";
import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    period: "2025 — Present",
    role: "Back-End Developer",
    company: "Chip Mong Commercial Bank",
    color: "#139D61",
    badge: "CURRENT",
    badgeColor: "#00ff9d",
    bullets: [
      "Implemented an external-facing merchant portal featuring daily KHQR transaction report generation for individual stores.",
      "Integrated unique Terminal IDs across POS terminals to support dynamic QR code generation for scan-to-pay transactions.",
      "Identified and documented the root cause of instant account scanning failures that were causing system downtime.",
    ],
  },
  {
    period: "2023 — 2025",
    role: "Full-Stack Developer",
    company: "Kodenique",
    color: "#00346A",
    badge: "PREV",
    badgeColor: "#00C2FF",
    bullets: [
      "Developed backend services using Node.js with a strong understanding of handling route parameters, user authentication using JWT.",
      "Worked with database and PostgreSQL using Knex.js and Objection.js for relational data modeling",
      "Analyzed algorithms and logic structures to improve application flow and performance",
      "Contribute the frontend and backend web services for both web application ensuring responsive design and smooth user interaction",
      "Built a custom content management system (CMS) tailored to organizational needs for efficient content control and scalability",
      "Developed a user-friendly admin dashboard enabling users to efficiently manage and customize their content",
    ],
  },
];

export default function Experience() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      className="py-32 relative overflow-hidden"
      style={{ background: "var(--cyber-dark)" }}
    >
      {/* Top border gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--cyber-pink), transparent)",
        }}
      />

      {/* Background hex grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ff0090 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container mx-auto px-6 lg:px-12">
        <div
          className="mb-14"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}
        >
          <div className="section-label">CAREER TIMELINE</div>
          <h2
            className="font-display font-black"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
          >
            <span className="text-primary">WORK</span>
            <br />
            <span className="glow-pink text-cyber-pink">EXPERIENCE</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[22px] lg:left-[30px] top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--cyber-cyan), var(--cyber-pink), var(--cyber-purple), var(--cyber-yellow))",
            }}
          />

          <div className="flex flex-col gap-6">
            {experiences.map((exp, i) => (
              <div
                key={i}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateX(-24px)",
                  transition: `all 0.6s ease ${i * 0.12}s`,
                }}
              >
                <div className="flex gap-6 lg:gap-10 items-start">
                  {/* Timeline node */}
                  <div
                    className="relative flex-shrink-0"
                    style={{ marginLeft: 6, marginTop: 20 }}
                  >
                    <div
                      className="w-8 h-8 clip-hex flex items-center justify-center"
                      style={{
                        background: `${exp.color}20`,
                        border: `1.5px solid ${exp.color}`,
                        boxShadow: `0 0 12px ${exp.color}40`,
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: exp.color }}
                      />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    <div
                      className="relative clip-cyber-md border p-6 lg:p-8 transition-all duration-300"
                      style={{
                        background:
                          open === i ? `${exp.color}06` : "var(--cyber-panel)",
                        borderColor:
                          open === i
                            ? `${exp.color}40`
                            : "rgba(255,255,255,0.06)",
                        boxShadow:
                          open === i ? `0 0 30px ${exp.color}10` : "none",
                      }}
                    >
                      {/* Corner cut */}
                      <div
                        className="absolute top-0 right-0"
                        style={{
                          borderTop: `16px solid ${
                            open === i
                              ? exp.color + "40"
                              : "rgba(255,255,255,0.06)"
                          }`,
                          borderLeft: "16px solid transparent",
                          transition: "border-color 0.3s",
                        }}
                      />

                      {/* Header row */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          {/* Period */}
                          <div
                            className="font-mono text-[11px] tracking-widest mb-2"
                            style={{ color: exp.color }}
                          >
                            {exp.period}
                          </div>
                          {/* Role */}
                          <h3
                            className="font-display font-bold text-primary mb-1"
                            style={{ fontSize: "clamp(16px, 2vw, 22px)" }}
                          >
                            {exp.role}
                          </h3>
                          {/* Company */}
                          <div className="font-mono text-[12px] text-secondary tracking-wider">
                            @ {exp.company}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Badge */}
                          <span
                            className="font-mono text-[9px] tracking-widest px-3 py-1 clip-cyber-sm"
                            style={{
                              background: `${exp.badgeColor}15`,
                              border: `1px solid ${exp.badgeColor}40`,
                              color: exp.badgeColor,
                            }}
                          >
                            {exp.badge}
                          </span>

                          {/* Expand toggle */}
                          <div
                            className="w-6 h-6 flex items-center justify-center border text-cyber-cyan font-mono text-sm transition-transform duration-300"
                            style={{
                              borderColor: `${exp.color}40`,
                              transform:
                                open === i ? "rotate(45deg)" : "rotate(0deg)",
                            }}
                          >
                            +
                          </div>
                        </div>
                      </div>

                      {/* Expandable bullets */}
                      <div
                        style={{
                          maxHeight: open === i ? "300px" : "0px",
                          overflow: "hidden",
                          transition:
                            "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
                        }}
                      >
                        <div
                          className="pt-4 border-t"
                          style={{ borderColor: `${exp.color}20` }}
                        >
                          <ul className="flex flex-col gap-3">
                            {exp.bullets.map((b, bi) => (
                              <li key={bi} className="flex gap-3 items-start">
                                <span
                                  className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                                  style={{
                                    background: exp.color,
                                    boxShadow: `0 0 6px ${exp.color}`,
                                  }}
                                />
                                <span className="font-body text-secondary text-[14px] leading-relaxed">
                                  {b}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
