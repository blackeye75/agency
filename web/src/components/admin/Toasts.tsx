'use client'
import { createContext, use, useCallback, useState, type ReactNode } from 'react'

type Toast = { id: number; text: string; error?: boolean }
const Ctx = createContext<(text: string, error?: boolean) => void>(() => {})
export const useToast = () => use(Ctx)

export function Toasts({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const push = useCallback((text: string, error?: boolean) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, text, error }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), error ? 6000 : 2600)
  }, [])
  return (
    <Ctx value={push}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map((t) => <div key={t.id} className={`toast${t.error ? ' toast--err' : ''}`}>{t.text}</div>)}
      </div>
    </Ctx>
  )
}
