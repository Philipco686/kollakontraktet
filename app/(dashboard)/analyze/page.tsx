import ContractAnalyzer from '@/components/ContractAnalyzer'

export default function AnalyzePage() {
  return (
    <div className="space-y-6">
      <div className="reveal">
        <h1 className="text-2xl font-bold text-slate-900">Analysera avtal</h1>
        <p className="text-slate-500 mt-1">
          Klistra in din avtalstext så förklarar vi den på vanlig svenska.
          Första gången ser du den största risken gratis.
        </p>
      </div>
      <ContractAnalyzer />
    </div>
  )
}
