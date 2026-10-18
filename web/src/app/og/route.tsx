import { ImageResponse } from 'next/og'

// Default social share image (1200×630) for pages without a cover or a CMS share image.
export function GET() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#120030', color: '#f2eee9' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 44, fontWeight: 800 }}>
        <svg width="64" height="64" viewBox="-50 -50 100 100">
          <g fill="#eb4304">
            <rect x="-9" y="-48" width="18" height="96" rx="3" />
            <rect x="-9" y="-48" width="18" height="96" rx="3" transform="rotate(60)" />
            <rect x="-9" y="-48" width="18" height="96" rx="3" transform="rotate(120)" />
          </g>
        </svg>
        nexusbee
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>Website development, digital marketing &amp; AI automation</div>
        <div style={{ fontSize: 32, color: '#eb4304' }}>Digital agency in India · Noida · 7+ years</div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  )
}
