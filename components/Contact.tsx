"use client";
import { useState, useRef, useEffect } from "react";

const socials = [
  {
    label: "GITHUB",
    handle: "https://github.com/MarwinYuth",
    color: "#00f5ff",
    icon: "⌥",
  },
  // {
  //   label: "LINKEDIN",
  //   handle: "/in/alexchen-dev",
  //   color: "#ff0090",
  //   icon: "⌗",
  // },
  // { label: "TWITTER", handle: "@alexchen_dev", color: "#9d00ff", icon: "⌘" },
  {
    label: "EMAIL",
    handle: "yuthmarwin@gmail.com",
    color: "#00ff9d",
    icon: "◉",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });
  const [focused, setFocused] = useState("");
  const [submitted, setSubmitted] = useState(false);
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

  const fieldCls = (name: string) =>
    `w-full font-mono text-[13px] px-4 py-3 outline-none transition-all duration-200 text-primary bg-black/30 ${
      focused === name
        ? "border-cyber-cyan/50 bg-cyber-cyan/[0.04]"
        : "border-white/8"
    } border`;

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 relative overflow-hidden"
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
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            <div className="section-label">UPLINK REQUEST</div>
            <h2
              className="font-display font-black mb-6"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              <span className="text-primary">ESTABLISH</span>
              <br />
              <span className="glow-pink text-cyber-pink">CONNECTION</span>
            </h2>
            {/* <p className="font-body text-secondary text-[15px] leading-relaxed mb-10 max-w-md">
              Available for contract work, full-time roles, and ambitious
              collaborations. Response time:{" "}
              <span className="text-cyber-cyan">&lt; 24 hours</span>.
            </p> */}

            <div className="flex flex-col gap-3 mb-10">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={
                    s.handle.startsWith("http")
                      ? s.handle
                      : `mailto:${s.handle}`
                  }
                  target={s.handle.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-4 py-3 clip-cyber-sm cursor-pointer transition-all duration-200 hover:opacity-80 block no-underline"
                  style={{
                    background: `${s.color}05`,
                    border: `1px solid ${s.color}20`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${s.color}45`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${s.color}20`;
                  }}
                >
                  <span className="text-base" style={{ color: s.color }}>
                    {s.icon}
                  </span>
                  <div>
                    <div
                      className="font-display text-[10px] tracking-[0.2em]"
                      style={{ color: s.color }}
                    >
                      {s.label}
                    </div>
                    <div className="font-mono text-[12px] text-secondary">
                      {s.handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Status */}
            <div className="clip-cyber-sm p-4 flex items-center gap-3 border border-cyber-green/25 bg-cyber-green/5">
              <div
                className="w-2 h-2 rounded-full bg-cyber-green flex-shrink-0"
                style={{
                  boxShadow: "0 0 8px #00ff9d",
                  animation: "pulse-glow 2s infinite",
                }}
              />
              <div>
                <div className="font-display text-[11px] text-cyber-green tracking-[0.2em]">
                  AVAILABLE FOR HIRE
                </div>
                <div className="font-mono text-[10px] text-muted">
                  Open to remote // contract // full-time
                </div>
              </div>
            </div>
          </div>

          {/* Right – Form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(30px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            {!submitted ? (
              <div className="clip-cyber-lg border border-cyber-cyan/15 p-8 bg-cyber-panel relative">
                {/* Terminal header */}
                <div className="flex items-center gap-2 mb-7 pb-4 border-b border-cyber-cyan/10">
                  {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                    <div
                      key={c}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: c }}
                    />
                  ))}
                  <span className="font-mono text-[10px] text-muted ml-2">
                    NEW_MISSION.REQUEST
                  </span>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] text-muted tracking-[0.2em] block mb-2">
                        YOUR_NAME
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused("")}
                        className={fieldCls("name")}
                        style={{ color: "var(--text-primary)" }}
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-muted tracking-[0.2em] block mb-2">
                        EMAIL_ADDR
                      </label>
                      <input
                        type="email"
                        placeholder="you@domain.com"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused("")}
                        className={fieldCls("email")}
                        style={{ color: "var(--text-primary)" }}
                      />
                    </div>
                  </div>

                  {/* <div>
                    <label className="font-mono text-[10px] text-muted tracking-[0.2em] block mb-2">
                      BUDGET_RANGE
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) =>
                        setForm({ ...form, budget: e.target.value })
                      }
                      onFocus={() => setFocused("budget")}
                      onBlur={() => setFocused("")}
                      className={fieldCls("budget")}
                      style={{
                        color: "var(--text-primary)",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">SELECT_RANGE</option>
                      <option value="<5k">&lt; $5,000</option>
                      <option value="5-20k">$5K – $20K</option>
                      <option value="20-50k">$20K – $50K</option>
                      <option value="50k+">$50K+</option>
                    </select>
                  </div> */}

                  <div>
                    <label className="font-mono text-[10px] text-muted tracking-[0.2em] block mb-2">
                      MISSION_BRIEF
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Describe your project, goals, timeline..."
                      required
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused("")}
                      className={fieldCls("message")}
                      style={{
                        color: "var(--text-primary)",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="cyber-btn cyber-btn-primary self-start mt-2"
                  >
                    TRANSMIT MESSAGE →
                  </button>
                </div>
              </div>
            ) : (
              <div className="clip-cyber-lg border border-cyber-green/30 bg-cyber-green/5 p-16 text-center">
                <div className="text-5xl mb-4">◉</div>
                <div className="font-display text-xl text-cyber-green tracking-widest mb-3">
                  TRANSMISSION SENT
                </div>
                <div className="font-mono text-[12px] text-secondary leading-relaxed">
                  Message received. Neural handshake established.
                  <br />
                  Response incoming within 24 cycles.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/[0.06] flex flex-wrap justify-between items-center gap-4">
          <div className="font-mono text-[10px] text-muted">
            © 2026 ALEX.DEV // BUILT WITH NEXT.JS + TAILWIND CSS
          </div>
          <div className="font-mono text-[10px] text-muted">
            ALL SYSTEMS NOMINAL //{" "}
            <span className="text-cyber-green">ONLINE</span>
          </div>
        </div>
      </div>

      <style>{`
        input, textarea, select { font-family: 'Share Tech Mono', monospace !important; }
        input::placeholder, textarea::placeholder { color: rgba(61,106,122,0.6); }
        select option { background: #0a1628; color: #e8f4f8; }
      `}</style>
    </section>
  );

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    setSubmitted(true);
  }
}
