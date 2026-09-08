'use client'

import Link from 'next/link'

// Aktivt samtycke till omedelbar leverans + information om att ångerrätten
// upphör när tjänsten utförts. Krävs enligt distansavtalslagen (2005:59)
// innan en digital tjänst får levereras under ångerfristen.
export default function WithdrawalConsent({
  checked,
  onChange,
  error = false,
  id = 'withdrawal-consent',
}: {
  checked: boolean
  onChange: (value: boolean) => void
  error?: boolean
  id?: string
}) {
  return (
    <label
      htmlFor={id}
      className={`flex items-start gap-2.5 text-left text-xs leading-relaxed cursor-pointer rounded-lg p-3 border transition-colors ${
        error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-brand-600"
      />
      <span className="text-slate-600">
        Jag begär att tjänsten börjar levereras <strong>direkt</strong> efter köpet och samtycker
        till detta. Jag är införstådd med att jag därmed <strong>förlorar min ångerrätt</strong> när
        tjänsten har utförts i sin helhet. Jag har läst och godkänner{' '}
        <Link href="/terms" target="_blank" className="text-brand-700 underline hover:text-brand-800">
          användarvillkoren
        </Link>
        .
      </span>
    </label>
  )
}
