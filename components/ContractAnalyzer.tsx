'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FileText } from 'lucide-react'

const LOADING_MESSAGES = [
  'Läser igenom avtalet...',
  'Identifierar klausuler...',
  'Bedömer risker...',
  'Letar efter dolda fällor...',
  'Beräknar ekonomisk risk...',
  'Jämför med svenska standardavtal...',
  'Skriver förslag på nya formuleringar...',
  'Snart klart...',
]

// Formuläret för att ladda upp eller klistra in ett avtal. När analysen är klar öppnas
// resultatet på sin egen adress, /analys/<id>, där Översikt, Detaljer och Fråga finns.
export default function ContractAnalyzer() {
  const router = useRouter()
  const [contractText, setContractText] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [statusIdx, setStatusIdx] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [contribute, setContribute] = useState(false)

  async function handlePdfUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/extract-pdf', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Kunde inte läsa PDF:en'); return }
      setContractText(data.text)
      if (!title) setTitle(file.name.replace(/\.pdf$/i, ''))
    } catch {
      setError('Kunde inte läsa PDF:en. Försök igen')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  useEffect(() => {
    if (!loading) { setStatusIdx(0); return }
    const id = setInterval(() => {
      setStatusIdx(i => Math.min(i + 1, LOADING_MESSAGES.length - 1))
    }, 5000)
    return () => clearInterval(id)
  }, [loading])

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault()
    if (!contractText.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractText, title: title || 'Min analys', contribute }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Något gick fel'); setLoading(false); return }
      const id = data.analysis?.id
      if (!id) { setError('Något gick fel. Försök igen.'); setLoading(false); return }
      // Knappen står kvar som "arbetar" tills nästa sida har öppnats
      router.push(`/analys/${id}`)
    } catch {
      setError('Nätverksfel. Försök igen')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleAnalyze} className="space-y-4">
      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Namn på avtalet (valfritt)</label>
          <input type="text" className="input" placeholder="T.ex. Hyreskontrakt lägenhet" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Ladda upp PDF</label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:border-brand-300 hover:bg-brand-50/40 transition-colors">
            <input type="file" accept="application/pdf" className="hidden" onChange={handlePdfUpload} disabled={uploading} />
            {uploading ? (
              <span className="flex items-center gap-2 text-sm text-slate-500"><Spinner />Läser PDF...</span>
            ) : (
              <>
                <FileText className="w-6 h-6 mb-1 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Klicka för att ladda upp ett PDF-avtal</span>
                <span className="text-xs text-slate-400 mt-0.5">Texten fylls i automatiskt nedan</span>
              </>
            )}
          </label>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-slate-400">eller klistra in text</span></div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Avtalstext</label>
          <textarea className="input min-h-[300px] resize-y font-mono text-sm" placeholder="Klistra in hela avtalstexten här..." value={contractText} onChange={e => setContractText(e.target.value)} required />
          <p className="text-xs text-slate-400 mt-1">{contractText.length.toLocaleString('sv-SE')} tecken</p>
        </div>

        <label htmlFor="benchmark-optin" className="flex items-start gap-2.5 text-left text-xs leading-relaxed cursor-pointer rounded-lg p-3 border border-slate-200 bg-slate-50">
          <input
            id="benchmark-optin"
            type="checkbox"
            checked={contribute}
            onChange={e => setContribute(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand-600"
          />
          <span className="text-slate-600">
            <strong className="text-slate-700">Var med och bygg Avtalsbenchmarken (frivilligt).</strong> Tillåt att
            avidentifierade klausuler från det här avtalet används för att bygga upp svensk jämförelsedata, så att du
            och andra så småningom kan se om ett villkor är normalt. Aldrig parter, belopp eller identifierbara uppgifter,
            och aldrig kopplat till dig. Du får tillgång till jämförelserna när de är klara.
          </span>
        </label>

        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>}
        <button type="submit" className="btn-primary w-full" disabled={loading || contractText.trim().length < 50}>
          {loading ? <span className="flex items-center justify-center gap-2"><Spinner />{LOADING_MESSAGES[statusIdx]}</span> : 'Analysera avtal'}
        </button>
      </div>
    </form>
  )
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
