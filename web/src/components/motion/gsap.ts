'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP)

export { gsap, ScrollTrigger, SplitText, useGSAP }

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768
export const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
