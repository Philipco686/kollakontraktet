import Link from 'next/link'

// Visas när analysen inte finns eller tillhör någon annan. Samma text i båda fallen,
// så att ingen kan ta reda på vilka analyser som finns hos andra.
export default function AnalysisNotFound() {
  return (
    <div className="card mx-auto max-w-lg text-center">
      <h1 className="mb-2 text-xl font-bold text-slate-900">Analysen hittades inte</h1>
      <p className="mb-6 text-slate-600">
        Länken kan vara felaktig, eller så har analysen raderats. Du hittar alla dina analyser i historiken.
      </p>
      <Link href="/history" className="btn-primary inline-block">Till historiken</Link>
    </div>
  )
}
