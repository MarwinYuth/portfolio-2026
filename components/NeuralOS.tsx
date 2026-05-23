"use client";
import { useEffect, useRef, useState } from "react";

function useLive(base: number, variance: number, ms = 1200) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const t = setInterval(
      () => setV(base + (Math.random() - 0.5) * variance),
      ms
    );
    return () => clearInterval(t);
  }, [base, variance, ms]);
  return v;
}

function CodeRain({ height = 220 }: { height?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = height;
    const cols = Math.floor(canvas.width / 14);
    const drops = Array(cols)
      .fill(0)
      .map(() => Math.random() * -40);
    const chars = "01アイウエカキクコNEXASYNAPSE><{}";
    const tick = setInterval(() => {
      ctx.fillStyle = "rgba(2,4,8,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '12px "Share Tech Mono",monospace';
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = `rgba(0,245,255,${
          y > (canvas.height / 14) * 0.8 ? 1 : 0.2
        })`;
        ctx.fillText(ch, i * 14, y * 14);
        if (y * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        else drops[i] += 0.5;
      });
    }, 50);
    return () => clearInterval(tick);
  }, [height]);
  return (
    <canvas ref={ref} style={{ width: "100%", height, display: "block" }} />
  );
}

function ActivityLog() {
  const [logs, setLogs] = useState<
    { time: string; msg: string; type: string }[]
  >([]);
  const msgs = [
    { msg: "Deploy pipeline triggered — nexalink-prod", type: "info" },
    { msg: "Health check PASS — all 12 services nominal", type: "success" },
    { msg: "New GitHub star on CIPHER-UI", type: "ping" },
    { msg: "AI model inference cache hit 94.2%", type: "success" },
    { msg: "Rate limit warning — /api/infer endpoint", type: "warn" },
    { msg: "Kubernetes pod auto-scaled to 8 replicas", type: "info" },
    { msg: "New contributor PR merged — GHOST-MESH", type: "ping" },
    { msg: "SSL certificate renewed — expires 2027", type: "info" },
  ];
  useEffect(() => {
    const add = () => {
      const e = msgs[Math.floor(Math.random() * msgs.length)];
      const time = new Date().toLocaleTimeString("en-US", { hour12: false });
      setLogs((prev) => [{ time, ...e }, ...prev].slice(0, 10));
    };
    add();
    const t = setInterval(add, 2000);
    return () => clearInterval(t);
  }, []);
  const colors: Record<string, string> = {
    info: "#00f5ff",
    success: "#00ff9d",
    warn: "#ffe600",
    ping: "#ff0090",
  };
  return (
    <div className="font-mono text-[11px]">
      {logs.map((log, i) => (
        <div
          key={i}
          className="py-1.5 border-b border-white/[0.04] flex gap-3 items-start transition-opacity duration-500"
          style={{
            opacity: 1 - i * 0.07,
            color: i === 0 ? colors[log.type] : "var(--text-muted)",
          }}
        >
          <span
            className="whitespace-nowrap"
            style={{ color: "rgba(0,245,255,0.35)" }}
          >
            {log.time}
          </span>
          <span className="opacity-60">[{log.type.toUpperCase()}]</span>
          <span>{log.msg}</span>
        </div>
      ))}
    </div>
  );
}

function Gauge({
  value,
  max,
  label,
  color,
}: {
  value: number;
  max: number;
  label: string;
  color: string;
}) {
  const pct = value / max;
  const r = 34;
  const cx = 42;
  const cy = 42;
  const arc = 2 * Math.PI * r;
  const dash = arc * pct * 0.75;
  const offset = arc * 0.125;
  return (
    <div className="text-center">
      <svg viewBox="0 0 84 84" className="w-20 h-20">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="4"
          strokeDasharray={`${arc * 0.75} ${arc * 0.25}`}
          strokeDashoffset={-offset}
          transform={`rotate(135, ${cx}, ${cy})`}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={`${dash} ${arc - dash}`}
          strokeDashoffset={-offset}
          transform={`rotate(135, ${cx}, ${cy})`}
          style={{
            transition: "stroke-dasharray 0.6s ease",
            filter: `drop-shadow(0 0 4px ${color})`,
          }}
        />
        <text
          x={cx}
          y={cy - 2}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 14,
            fontWeight: 700,
            fill: color,
          }}
        >
          {Math.round(pct * 100)}
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 7,
            fill: "var(--text-muted)",
          }}
        >
          %
        </text>
      </svg>
      <div className="font-mono text-[9px] text-muted tracking-widest -mt-1">
        {label}
      </div>
    </div>
  );
}

export default function NeuralOS() {
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

  const cpu = useLive(62, 22, 1400);
  const mem = useLive(74, 14, 1800);
  const gpu = useLive(46, 28, 900);
  const net = useLive(82, 16, 1100);
  const rps = useLive(2847, 400, 1000);
  const lat = useLive(11.4, 4, 700);

  return (
    <section
      id="neural"
      ref={ref}
      className="py-32 relative overflow-hidden"
      style={{ background: "var(--cyber-black)" }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* <div className="section-label">UNIQUE FEATURE // EXCLUSIVE</div>
        <h2 className="font-display font-black mb-3" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
          <span className="text-primary">NEURAL</span><br />
          <span className="glow-cyan text-cyber-cyan">COMMAND CENTER</span>
        </h2>
        <p className="font-body text-secondary text-[15px] mb-14 max-w-xl">
          Live dashboard of deployed infrastructure — real-time vitals, activity logs, and system telemetry.
          <span className="text-cyber-cyan"> Yours to observe.</span>
        </p> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* System gauges */}
          <div
            className="clip-cyber-md border border-cyber-cyan/15 p-7 bg-cyber-panel"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            <div className="font-display text-[11px] tracking-[0.2em] text-cyber-cyan mb-6">
              ◈ SYSTEM VITALS // LIVE
            </div>
            <div className="flex justify-around flex-wrap gap-3 mb-6">
              <Gauge value={cpu} max={100} label="CPU" color="#00f5ff" />
              <Gauge value={mem} max={100} label="MEM" color="#ff0090" />
              <Gauge value={gpu} max={100} label="GPU" color="#9d00ff" />
              <Gauge value={net} max={100} label="NET" color="#00ff9d" />
            </div>
            <div className="flex gap-8 pt-5 border-t border-white/[0.06]">
              {[
                {
                  v: Math.round(rps).toLocaleString(),
                  l: "REQ/MIN",
                  c: "var(--cyber-cyan)",
                },
                {
                  v: `${lat.toFixed(1)}ms`,
                  l: "P99 LATENCY",
                  c: "var(--cyber-green)",
                },
                { v: "99.97%", l: "UPTIME 30D", c: "var(--cyber-pink)" },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    className="font-display font-black text-2xl"
                    style={{ color: s.c }}
                  >
                    {s.v}
                  </div>
                  <div className="font-mono text-[9px] text-muted tracking-widest mt-0.5">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity log */}
          <div
            className="clip-cyber-md border border-cyber-pink/15 p-7 bg-cyber-panel overflow-hidden"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.15s",
            }}
          >
            <div className="font-display text-[11px] tracking-[0.2em] text-cyber-pink mb-5">
              ◈ ACTIVITY FEED // LIVE
            </div>
            <ActivityLog />
          </div>

          {/* Code rain */}
          <div
            className="clip-cyber-md border border-cyber-cyan/10 overflow-hidden bg-cyber-panel"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.25s",
            }}
          >
            <div className="px-5 py-4 border-b border-cyber-cyan/10 font-display text-[11px] tracking-[0.2em] text-cyber-cyan">
              ◈ DATA STREAM // ENCRYPTED
            </div>
            <CodeRain height={210} />
          </div>

          {/* Contribution grid */}
          <div
            className="clip-cyber-md border border-cyber-purple/15 p-7 bg-cyber-panel"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.35s",
            }}
          >
            <div
              className="font-display text-[11px] tracking-[0.2em] mb-5"
              style={{ color: "var(--cyber-purple)" }}
            >
              ◈ CONTRIBUTION GRID // 2026
            </div>
            <div
              className="grid gap-[2px]"
              style={{ gridTemplateColumns: "repeat(52, 1fr)" }}
            >
              {Array.from({ length: 52 * 7 }).map((_, i) => {
                const v = Math.random();
                const bg =
                  v > 0.85
                    ? "#9d00ff"
                    : v > 0.65
                    ? "#6d00b3"
                    : v > 0.45
                    ? "#3d0066"
                    : v > 0.2
                    ? "#1a0033"
                    : "rgba(255,255,255,0.04)";
                return (
                  <div
                    key={i}
                    style={{ aspectRatio: 1, background: bg, borderRadius: 1 }}
                  />
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-5">
              {[
                { l: "COMMITS", v: "847" },
                { l: "PRs MERGED", v: "193" },
                { l: "ISSUES", v: "412" },
                { l: "REPOS", v: "38" },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    className="font-display font-black text-lg"
                    style={{ color: "var(--cyber-purple)" }}
                  >
                    {s.v}
                  </div>
                  <div className="font-mono text-[8px] text-muted tracking-widest">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
