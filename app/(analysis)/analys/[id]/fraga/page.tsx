import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Chat from '@/components/analysis/Chat'
import { loadViewAnalysis } from '@/lib/analysis/load'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const a = await loadViewAnalysis(id)
  return { title: a ? `Fråga om avtalet: ${a.title}` : 'Analys', robots: { index: false, follow: false } }
}

export default async function AskPage({ params }: Props) {
  const { id } = await params
  const a = await loadViewAnalysis(id)
  // Frågor kan bara ställas om upplåsta, färdiga analyser
  if (!a || a.state !== 'full') redirect(`/analys/${id}`)
  return <Chat />
}
