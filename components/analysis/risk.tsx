import {
  Coins, CalendarDays, Lock, LogOut, PenLine, Shield, type LucideIcon,
} from 'lucide-react'
import type { FindingIcon } from '@/types'
import { RISK_LABEL, type Risk } from '@/lib/analysis/viewmodel'

/* Risk visas alltid med text och aldrig bara med färg. Klasserna står som hela strängar
 * så att Tailwind hittar dem. */
export const RISK_STYLE: Record<Risk, { label: string; dot: string; tint: string }> = {
  high: { label: 'bg-red-100 text-red-900', dot: 'bg-red-600', tint: 'bg-red-50' },
  medium: { label: 'bg-amber-100 text-amber-900', dot: 'bg-amber-500', tint: 'bg-amber-50' },
  low: { label: 'bg-green-100 text-green-900', dot: 'bg-green-600', tint: 'bg-green-50' },
}

export const FINDING_ICON: Record<FindingIcon, LucideIcon> = {
  shield: Shield,
  pencil: PenLine,
  exit: LogOut,
  coin: Coins,
  calendar: CalendarDays,
  lock: Lock,
}

export function RiskLabel({ risk, text }: { risk: Risk; text?: string }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-bold ${RISK_STYLE[risk].label}`}>
      {text ?? RISK_LABEL[risk]}
    </span>
  )
}

export function RiskSquare({ risk }: { risk: Risk }) {
  return <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 shrink-0 rounded-[3px] ${RISK_STYLE[risk].dot}`} />
}

// Knappar och länkar delar samma tydliga fokusring
export const FOCUS = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-600'
