'use client'
import { useEffect, useState, useRef } from 'react'

export default function CyberCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const trail = useRef({ x: -100, y: -100 })
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    const down = () => setClicking(true)
    const up   = () => setClicking(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    let id: number
    const animate = () => {
      trail.current.x += (pos.x - trail.current.x) * 0.12
      trail.current.y += (pos.y - trail.current.y) * 0.12
      setTrailPos({ ...trail.current })
      id = requestAnimationFrame(animate)
    }
    id = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      cancelAnimationFrame(id)
    }
  }, [pos.x, pos.y])

  return (
    <>
      {/* Dot */}
      <div
        className="fixed pointer-events-none z-[99999] rounded-none"
        style={{
          left: pos.x, top: pos.y,
          width: clicking ? 6 : 8, height: clicking ? 6 : 8,
          background: 'var(--cyber-cyan)',
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 ${clicking ? 4 : 12}px var(--cyber-cyan)`,
          transition: 'width 0.1s, height 0.1s',
        }}
      />
      {/* Ring */}
      <div
        className="fixed pointer-events-none z-[99998]"
        style={{
          left: trailPos.x, top: trailPos.y,
          width: clicking ? 24 : 32, height: clicking ? 24 : 32,
          border: '1px solid rgba(0,245,255,0.5)',
          transform: 'translate(-50%, -50%)',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          transition: 'width 0.15s, height 0.15s',
        }}
      />
      <style>{`
        @media (min-width: 769px) { * { cursor: none !important; } }
      `}</style>
    </>
  )
}
