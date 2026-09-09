'use client'

import { useState, useEffect } from 'react'
import { Check, Download } from 'lucide-react'

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string
  ))
}

export default function GuideChecklist({
  items,
  storageKey,
  title,
}: {
  items: string[]
  storageKey: string
  title: string
}) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false))

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`checklist:${storageKey}`)
      if (raw) {
        const saved = JSON.parse(raw)
        if (Array.isArray(saved) && saved.length === items.length) setChecked(saved)
      }
    } catch {}
  }, [storageKey, items.length])

  function toggle(i: number) {
    setChecked(prev => {
      const next = prev.map((v, idx) => (idx === i ? !v : v))
      try { localStorage.setItem(`checklist:${storageKey}`, JSON.stringify(next)) } catch {}
      return next
    })
  }

  function printChecklist() {
    const rows = items
      .map(q => `<li>&#9744;&nbsp;&nbsp;${escapeHtml(q)}</li>`)
      .join('')
    const html = `<!doctype html><html lang="sv"><head><meta charset="utf-8"><title>Checklista – ${escapeHtml(title)}</title>
<style>
  body{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;max-width:640px;margin:40px auto;padding:0 28px}
  .brand{color:#1e3a8a;font-weight:600;font-size:14px;margin-bottom:18px}
  h1{font-size:22px;margin:0 0 4px}
  p{color:#64748b;font-size:13px;margin:0 0 26px}
  ul{list-style:none;padding:0;margin:0}
  li{font-size:15px;line-height:1.5;padding:11px 2px;border-bottom:1px solid #e2e8f0}
  .foot{color:#94a3b8;font-size:11px;margin-top:26px}
</style></head>
<body>
  <div class="brand">Kolla Kontraktet</div>
  <h1>Checklista: ${escapeHtml(title)}</h1>
  <p>Kryssa av innan du signerar.</p>
  <ul>${rows}</ul>
  <p class="foot">Informationssyfte – inte juridisk rådgivning. kollakontraktet.se</p>
</body></html>`
    const w = window.open('', '_blank', 'width=780,height=900')
    if (!w) return
    w.document.write(html)
    w.document.close()
    w.focus()
    setTimeout(() => { try { w.print() } catch {} }, 300)
  }

  return (
    <div>
      <ul className="space-y-1">
        {items.map((q, i) => (
          <li key={q}>
            <button
              onClick={() => toggle(i)}
              className="flex items-start gap-3 text-left w-full group py-1.5"
              aria-pressed={checked[i]}
            >
              <span
                className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                  checked[i] ? 'bg-brand-600 border-brand-600' : 'border-slate-300 group-hover:border-brand-400'
                }`}
              >
                {checked[i] && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
              </span>
              <span className={`text-sm sm:text-base ${checked[i] ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                {q}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <button onClick={printChecklist} className="btn-secondary text-sm py-2 px-4 mt-5 inline-flex items-center gap-2">
        <Download className="w-4 h-4" /> Skriv ut / spara som PDF
      </button>
    </div>
  )
}
