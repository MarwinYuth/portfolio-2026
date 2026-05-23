/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'monospace'],
        mono: ['"Share Tech Mono"', 'monospace'],
        body: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        cyber: {
          black: '#020408',
          dark: '#080d14',
          panel: '#0a1628',
          card: '#0d1f38',
          cyan: '#00f5ff',
          'cyan-dim': '#00a8b3',
          pink: '#ff0090',
          'pink-dim': '#b3006a',
          yellow: '#ffe600',
          green: '#00ff9d',
          purple: '#9d00ff',
          orange: '#ff6b00',
          red: '#ff2d55',
        },
        text: {
          primary: '#e8f4f8',
          secondary: '#7ab8cc',
          muted: '#3d6a7a',
        },
      },
      animation: {
        'glitch': 'glitch 0.3s steps(1) infinite',
        'flicker': 'flicker 6s infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'pulse-pink': 'pulse-pink 3s ease-in-out infinite',
        'scan-line': 'scan-line 4s linear infinite',
        'blink': 'blink 0.8s step-end infinite',
        'float': 'float 3s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'data-stream': 'data-stream 2s linear infinite',
        'hex-appear': 'hex-appear 0.4s ease forwards',
        'type-cursor': 'type-cursor 0.8s step-end infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { clipPath: 'inset(0 0 100% 0)', transform: 'translate(0)' },
          '20%': { clipPath: 'inset(20% 0 60% 0)', transform: 'translate(-3px, 1px)' },
          '40%': { clipPath: 'inset(50% 0 30% 0)', transform: 'translate(3px, -1px)' },
          '60%': { clipPath: 'inset(70% 0 10% 0)', transform: 'translate(-2px, 2px)' },
          '80%': { clipPath: 'inset(10% 0 80% 0)', transform: 'translate(2px, -2px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.4' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.6' },
          '97%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,245,255,0.3), 0 0 30px rgba(0,245,255,0.1)' },
          '50%': { boxShadow: '0 0 20px rgba(0,245,255,0.6), 0 0 60px rgba(0,245,255,0.2)' },
        },
        'pulse-pink': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255,0,144,0.3), 0 0 30px rgba(255,0,144,0.1)' },
          '50%': { boxShadow: '0 0 20px rgba(255,0,144,0.6), 0 0 60px rgba(255,0,144,0.2)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'rotate-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'data-stream': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100px)', opacity: '0' },
        },
        'hex-appear': {
          from: { opacity: '0', transform: 'scale(0.5) rotate(-30deg)' },
          to: { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        'type-cursor': {
          '0%, 100%': { borderRightColor: '#00f5ff' },
          '50%': { borderRightColor: 'transparent' },
        },
      },
      backgroundImage: {
        'grid-cyber': 'linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-60': '60px 60px',
      },
    },
  },
  plugins: [],
}
