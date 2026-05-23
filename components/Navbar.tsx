"use client";
import { useState, useEffect } from "react";

const links = [
  { href: "#hero", label: "INIT", id: "01" },
  { href: "#about", label: "ABOUT", id: "02" },
  { href: "#experience", label: "XP", id: "03" },
  { href: "#skills", label: "SKILLS", id: "04" },
  { href: "#projects", label: "PROJECTS", id: "05" },
  { href: "#neural", label: "NEURAL", id: "06" },
  { href: "#contact", label: "CONTACT", id: "07" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => {
      clearInterval(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300"
      style={{
        height: "90px",
        background: scrolled ? "rgba(2,4,8,0.97)" : "rgba(2,4,8,0.92)",
        borderBottom: scrolled
          ? "1px solid rgba(0,245,255,0.12)"
          : "1px solid rgba(0,245,255,0.06)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-cyber-cyan to-transparent opacity-60" />

      <div className="h-full flex items-center justify-between px-8 lg:px-12">
        {/* ── Logo ── */}
        <a href="#hero" className="no-underline flex items-center gap-4 group">
          <div
            className="clip-hex flex items-center justify-center font-display font-black text-cyber-cyan"
            style={{
              width: 52,
              height: 52,
              background: "rgba(0,245,255,0.08)",
              border: "1.5px solid rgba(0,245,255,0.5)",
              fontSize: 18,
              animation: "pulse-glow 3s ease-in-out infinite",
            }}
          >
            M.Y
          </div>
          <div>
            <div className="font-display font-black text-cyber-cyan tracking-widest text-base glow-cyan">
              MARWIN YUTH
            </div>
            <div className="font-mono text-[9px] text-muted tracking-[0.25em]">
              FULL-STACK // 2026
            </div>
          </div>
        </a>

        {/* ── Desktop Nav ── */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.href)}
              className="relative px-4 py-2 no-underline group transition-colors duration-200"
              style={{
                color:
                  active === link.href
                    ? "var(--cyber-cyan)"
                    : "var(--text-secondary)",
              }}
            >
              <span
                className="font-mono text-[9px] mr-1"
                style={{ color: "var(--cyber-pink)" }}
              >
                {link.id}.
              </span>
              <span
                className="font-display font-bold text-[11px] tracking-widest transition-colors duration-200 group-hover:text-cyber-cyan"
                style={{ color: "inherit" }}
              >
                {link.label}
              </span>
              {/* Hover underline */}
              <span
                className="absolute bottom-0 left-0 h-[1px] bg-cyber-cyan transition-all duration-300 group-hover:w-full"
                style={{ width: active === link.href ? "100%" : "0%" }}
              />
            </a>
          ))}
        </div>

        {/* ── Clock + Status ── */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Live dot */}
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full bg-cyber-green"
              style={{ animation: "pulse-glow 2s infinite" }}
            />
            <span className="font-mono text-[9px] text-cyber-green tracking-widest">
              ONLINE
            </span>
          </div>

          {/* Clock */}
          <div
            className="clip-cyber-sm px-4 py-2 border border-cyber-cyan/20 bg-cyber-cyan/5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--cyber-cyan)",
              letterSpacing: "0.1em",
            }}
          >
            {time}
          </div>
        </div>

        {/* ── Mobile Menu Btn ── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden font-display text-[10px] tracking-widest px-4 py-2 border border-cyber-cyan/40 text-cyber-cyan bg-transparent cursor-pointer"
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </div>

      {/* ── Mobile Dropdown ── */}
      {menuOpen && (
        <div
          className="lg:hidden border-b border-cyber-cyan/25 px-8 pb-6 flex flex-col gap-1"
          style={{ background: "rgb(2,4,8)", backdropFilter: "blur(20px)" }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="no-underline font-display text-xs text-cyber-cyan tracking-widest py-3 border-b border-cyber-cyan/10"
            >
              <span className="font-mono text-[9px] text-cyber-pink mr-2">
                {link.id}.
              </span>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
