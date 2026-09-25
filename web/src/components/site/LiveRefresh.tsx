'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { browserClient } from '@/lib/supabase/browser'

const TABLES = ['settings', 'pages', 'sections', 'services', 'projects', 'posts'] as const

// Realtime: when content changes in the CMS, open pages re-render with it.
export function LiveRefresh() {
  const router = useRouter()
  useEffect(() => {
    const db = browserClient()
    if (!db) return
    let timer: ReturnType<typeof setTimeout> | undefined
    const refresh = () => {
      clearTimeout(timer)
      timer = setTimeout(() => router.refresh(), 700)
    }
    const channel = db.channel('cms-live')
    TABLES.forEach((table) => channel.on('postgres_changes', { event: '*', schema: 'public', table }, refresh))
    channel.subscribe()
    return () => {
      clearTimeout(timer)
      db.removeChannel(channel)
    }
  }, [router])
  return null
}
