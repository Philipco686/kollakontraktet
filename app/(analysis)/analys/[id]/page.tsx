import type { Metadata } from 'next'
import Overview from '@/components/analysis/Overview'
import { loadViewAnalysis } from '@/lib/analysis/load'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const a = await loadViewAnalysis(id)
  return { title: a ? `Översikt: ${a.title}` : 'Analys', robots: { index: false, follow: false } }
}

export default function OverviewPage() {
  return <Overview />
}
