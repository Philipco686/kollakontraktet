import { notFound } from 'next/navigation'
import { loadViewAnalysis } from '@/lib/analysis/load'
import AnalysisProvider from '@/components/analysis/AnalysisProvider'

// Hämtar analysen en gång och delar den (och konversationen) mellan Översikt, Detaljer och Fråga.
// Layouter återmonteras inte vid vybyte, så chatten ligger kvar under hela besöket.
export default async function AnalysisLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const analysis = await loadViewAnalysis(id)
  if (!analysis) notFound()
  return <AnalysisProvider analysis={analysis}>{children}</AnalysisProvider>
}
