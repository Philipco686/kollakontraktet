import { clauseLabel, type ViewAnalysis } from './viewmodel'

// Förslagsfrågor under frågefältet i Översikt. De byggs av den här analysens egna fynd.
export function overviewChips(a: ViewAnalysis): string[] {
  const chips: string[] = []
  const top = a.findings[0]
  if (top) {
    const clause = a.clauses.find(c => c.id === top.clauseId)
    chips.push(
      clause?.number
        ? `Vad händer om jag bryter mot ${clause.number}?`
        : `Vad innebär ”${top.title}” för mig?`
    )
  }
  chips.push('Vad är mest riskabelt?')
  return chips
}

export const CHAT_CHIPS = ['Sammanfatta avtalet', 'Vad är mest riskabelt?', 'Vad bör jag förhandla om?']

export const whyFlaggedQuestion = (c: { number: string | null; title: string }) =>
  c.number ? `Varför flaggas ${c.number}?` : `Varför flaggas ”${clauseLabel(c)}”?`
