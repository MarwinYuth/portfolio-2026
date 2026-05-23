# ⚡ CYBERPUNK PORTFOLIO 2026

A blazing full-stack developer portfolio with a cyberpunk aesthetic — built with Next.js 15, TypeScript, and zero UI libraries.

## Features

- **Glitch Hero** — Animated title with matrix rain background, terminal boot sequence, and live clock
- **Holographic ID Card** — 3D tilt-on-hover developer card with scanline effects
- **Skill Arsenal** — Animated progress bars + SVG radar chart
- **Project Operations** — 6 projects with hover effects and live metrics
- **Neural Command Center** ← The unique section no one else has:
  - Live system gauges (CPU, RAM, GPU, NET) that animate in real-time
  - Scrolling activity log with live timestamp
  - Matrix-style code rain canvas
  - GitHub contribution grid visualization
- **Cyberpunk Contact Form** — Terminal-styled form with glow focus states
- **Custom Hex Cursor** — Crosshair cursor with trailing ring

## Stack

- **Next.js 15** (App Router)
- **TypeScript** — full type safety
- **Pure CSS** — No Tailwind, no UI kit, hand-crafted cyberpunk design system
- **Canvas API** — Matrix rain, grid background animations
- **Web Animations** — CSS keyframes, IntersectionObserver reveals
- **Google Fonts** — Orbitron + Share Tech Mono + Rajdhani

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Customization

1. **Your name/info** → `components/Hero.tsx` and `components/About.tsx`
2. **Projects** → `components/Projects.tsx` — edit the `projects` array
3. **Skills** → `components/Skills.tsx` — edit `skillGroups`
4. **Contact links** → `components/Contact.tsx` — edit `socials`
5. **Colors** → `app/globals.css` — all CSS variables at the top

## Color Palette

| Variable | Color | Usage |
|---|---|---|
| `--cyber-cyan` | `#00f5ff` | Primary accent, glow |
| `--cyber-pink` | `#ff0090` | Secondary accent |
| `--cyber-yellow` | `#ffe600` | Version badges |
| `--cyber-green` | `#00ff9d` | Success/available |
| `--cyber-purple` | `#9d00ff` | Contribution grid |

## Performance

- No animation libraries (Framer Motion not used — pure CSS)
- Canvas-based effects are GPU-accelerated
- IntersectionObserver for scroll-triggered reveals (no scroll event spam)
- Fonts loaded via Google Fonts with `display=swap`
