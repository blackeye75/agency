'use client'
import type Lenis from 'lenis'

// The page's Lenis instance, shared with the menu, the transition and sections.
export const scroll: { lenis: Lenis | null } = { lenis: null }

// Resolves once the loader has finished (or right away when there is none).
let introDone = false
const waiting: (() => void)[] = []
export function whenIntroDone(cb: () => void) {
  if (introDone) cb()
  else waiting.push(cb)
}
export function finishIntro() {
  if (introDone) return
  introDone = true
  document.documentElement.classList.remove('intro-pending')
  waiting.splice(0).forEach((cb) => cb())
}

// While a page transition covers the screen, entrance animations wait for it.
let covered = false
const revealWaiters: (() => void)[] = []
export function setCovered(on: boolean) {
  covered = on
  if (!on) revealWaiters.splice(0).forEach((cb) => cb())
}
export function whenRevealed(cb: () => void) {
  if (covered) revealWaiters.push(cb)
  else cb()
}
