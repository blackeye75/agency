import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// The three-bar star from /icon.svg on the brand's ink background.
export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#120030' }}>
      <svg width="120" height="120" viewBox="-50 -50 100 100">
        <g fill="#eb4304">
          <rect x="-9" y="-48" width="18" height="96" rx="3" />
          <rect x="-9" y="-48" width="18" height="96" rx="3" transform="rotate(60)" />
          <rect x="-9" y="-48" width="18" height="96" rx="3" transform="rotate(120)" />
        </g>
      </svg>
    </div>,
    size,
  )
}
