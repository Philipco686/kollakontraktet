'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAnalysis } from './AnalysisProvider'
import { copyText } from './clipboard'

/* Sparar en fråga och öppnar chatten, där den skickas automatiskt. Ett tomt fält gör ingenting. */
export function useGoAsk() {
  const { base, queueQuestion } = useAnalysis()
  const router = useRouter()
  return useCallback((question: string) => {
    const q = question.trim()
    if (!q) return
    queueQuestion(q)
    router.push(`${base}/fraga`)
  }, [base, queueQuestion, router])
}

/* Kopiera till urklipp och visa "Kopierat" en kort stund. */
export function useCopied(ms = 1800) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  const copy = useCallback(async (text: string) => {
    if (!(await copyText(text))) return false
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), ms)
    return true
  }, [ms])
  return [copied, copy] as const
}

/* Flyttar fokus till sidans H1 vid vybyte, så att skärmläsare och tangentbord börjar överst. */
export function useFocusHeading() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => { ref.current?.focus({ preventScroll: true }) }, [])
  return ref
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
