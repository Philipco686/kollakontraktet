import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Details from '@/components/analysis/Details'
import { loadViewAnalysis } from '@/lib/analysis/load'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ anmarkning?: string | string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const a = await loadViewAnalysis(id)
  return { title: a ? `Detaljerad genomgång: ${a.title}` : 'Analys', robots: { index: false, follow: false } }
}

export default async function DetailsPage({ params, searchParams }: Props) {
  const { id } = await params
  const { anmarkning } = await searchParams
  const a = await loadViewAnalysis(id)
  // Genomgången finns bara för upplåsta, färdiga analyser
  if (!a || a.state !== 'full') redirect(`/analys/${id}`)
  const finding = Array.isArray(anmarkning) ? anmarkning[0] : anmarkning
  // key gör att vyn startar om med rätt anmärkning öppen om adressen ändras
  return <Details key={finding ?? 'start'} initialFinding={finding} />
}
