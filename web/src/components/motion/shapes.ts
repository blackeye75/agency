// Pure SVG path builders shared by the sections (server or client).
export function starPath(n: number, ro: number, ri: number) {
  let d = ''
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? ri : ro
    const a = (Math.PI * i) / n - Math.PI / 2
    d += (i ? 'L' : 'M') + (r * Math.cos(a)).toFixed(2) + ' ' + (r * Math.sin(a)).toFixed(2)
  }
  return d + 'Z'
}

export function scallop(n: number, R: number, depth: number, steps = 360) {
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const r = R - depth + depth * Math.abs(Math.cos((n * t) / 2))
    d += (i ? 'L' : 'M') + (r * Math.cos(t - Math.PI / 2)).toFixed(2) + ' ' + (r * Math.sin(t - Math.PI / 2)).toFixed(2)
  }
  return d + 'Z'
}

export function scallopOval() {
  let d = ''
  for (let i = 0; i <= 720; i++) {
    const t = (i / 720) * Math.PI * 2
    const w = Math.abs(Math.sin(t)) ** 3
    const k = 1 - 0.075 * w * (1 - Math.abs(Math.cos(10 * t)))
    d += (i ? 'L' : 'M') + (0.5 + 0.5 * k * Math.cos(t)).toFixed(4) + ' ' + (0.5 + 0.5 * k * Math.sin(t)).toFixed(4)
  }
  return d + 'Z'
}

export function coilPath() {
  const T = Math.PI * 2 * 11
  const s = 352 / T
  let d = 'M0 96 L14 96'
  for (let i = 0; i <= 900; i++) {
    const t = (i / 900) * T
    d += ` L${(24 + s * t - 17 * Math.sin(t)).toFixed(2)} ${(58 + 38 * Math.cos(t)).toFixed(2)}`
  }
  return d + ' L400 96'
}

export function wavePath(phase: number) {
  const AMP = 34, LAMBDA = 1800
  let d = 'M0 100'
  for (let i = 0; i <= 40; i++) {
    const x = i * 25
    d += ` L${x} ${(52 + AMP * Math.sin((2 * Math.PI * x) / LAMBDA + phase)).toFixed(2)}`
  }
  return d + ' L1000 100 Z'
}
export const WAVE_PHASE = -3.6
