export type SubscriptionPlan = 'personal' | 'business' | 'onetime' | null

export interface Profile {
  id: string
  email: string
  full_name: string | null
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_customer_id: string
  stripe_subscription_id: string | null
  plan: SubscriptionPlan
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  current_period_end: string | null
  analyses_used_this_month: number
  usage_reset_at: string
  created_at: string
  updated_at: string
}

export interface Analysis {
  id: string
  user_id: string
  title: string
  original_text: string
  result: AnalysisResult
  is_unlocked: boolean
  benchmark_opt_in?: boolean
  created_at: string
}

export interface KeyFact {
  icon?: string
  label: string
  value: string
}

export interface QuickSummary {
  what_is_it_about: string
  what_do_i_commit_to: string
  what_do_i_get: string
  biggest_risk: string
}

export interface NegotiationTip {
  item: string
  suggestion: string
  example_wording: string
}

export interface EconomicRisk {
  max_amount: number
  currency: string
  breakdown: string[]
}

export interface TimelineEvent {
  event: string
  date: string
  note: string
}

export interface StandardComparison {
  percentage_standard: number
  deviations: string[]
}

export type FindingIcon = 'shield' | 'pencil' | 'exit' | 'coin' | 'calendar' | 'lock'

// Rubriken ("Förhandla först" osv.) härleds ur risk_level i koden, AI:n ger bara en mening.
export interface Verdict {
  headline: string
}

export interface MissingItem {
  title: string
  body: string
}

export interface AnalysisResult {
  summary: string
  risk_level: 'low' | 'medium' | 'high'
  key_facts: KeyFact[]
  clauses: Clause[]
  common_traps: string[]
  consequences: string[]
  unusual_terms: string[]
  economic_risk: EconomicRisk
  timeline: TimelineEvent[]
  pre_signing_checklist: string[]
  standard_comparison: StandardComparison
  recommendations: string[]
  // Äldre analyser har de här två från AI:n. Nya analyser får förhandlingstipsen byggda av
  // förslagen per klausul, och verdict.headline ersätter quick_summary.
  quick_summary?: QuickSummary
  negotiation_tips?: NegotiationTip[]
  // Nya valfria fält (analyser gjorda före resultatflödet saknar dem)
  contract_type?: string
  verdict?: Verdict
  missing?: MissingItem[]
}

export interface Clause {
  title: string
  original_text: string
  plain_explanation: string
  risk_level: 'low' | 'medium' | 'high'
  is_important: boolean
  // Nya valfria fält. `number` är exakt så som avtalet numrerar klausulen, null om det inte gör det.
  number?: string | null
  area?: string
  icon?: FindingIcon
  short?: string
  // Förslag på ny formulering. null = ingen ändring behövs, saknas = okänt (äldre analys).
  suggestion?: string | null
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
        Relationships: []
      }
      subscriptions: {
        Row: Subscription
        Insert: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Subscription, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      analyses: {
        Row: Analysis
        Insert: Omit<Analysis, 'id' | 'created_at'>
        Update: Partial<Omit<Analysis, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
