import {
  AlertOctagon, AlertTriangle, BarChart3, CalendarDays, CheckCircle2, Coins, FileText, Gift,
  Handshake, ListChecks, PenLine, Zap, type LucideIcon,
} from 'lucide-react'
import type { ViewExtras } from '@/lib/analysis/viewmodel'

/* "Mer i analysen": allt som redan ingår i analysen men som inte får plats i de tre huvudvyerna.
 * Varje kort visas bara om det finns innehåll. */

const TONE = {
  brand: { icon: 'text-brand-700', dot: 'bg-brand-600' },
  amber: { icon: 'text-amber-600', dot: 'bg-amber-500' },
  red: { icon: 'text-red-600', dot: 'bg-red-600' },
  accent: { icon: 'text-accent-600', dot: 'bg-accent-600' },
} as const
type Tone = keyof typeof TONE

function InfoCard({ title, Icon, tone = 'brand', wide = false, children }: {
  title: string; Icon: LucideIcon; tone?: Tone; wide?: boolean; children: React.ReactNode
}) {
  return (
    <section className={`card print-block ${wide ? 'md:col-span-2' : ''}`}>
      <h3 className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
        <Icon className={`h-5 w-5 shrink-0 ${TONE[tone].icon}`} aria-hidden="true" />{title}
      </h3>
      {children}
    </section>
  )
}

function Bullets({ items, tone = 'brand' }: { items: string[]; tone?: Tone }) {
  return (
    <ul className="space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
          <span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${TONE[tone].dot}`} />{t}
        </li>
      ))}
    </ul>
  )
}

export default function ExtraCards({ extras }: { extras: ViewExtras }) {
  const e = extras
  const has =
    e.quick || e.economicRisk || e.standard || e.commonTraps.length || e.consequences.length ||
    e.unusualTerms.length || e.tips.length || e.timeline.length || e.checklist.length || e.recommendations.length
  if (!has) return null

  return (
    <section aria-labelledby="more-h">
      <h2 id="more-h" className="mb-3.5 font-display text-[22px] font-medium tracking-tight text-slate-900">Mer i analysen</h2>
      <div className="grid items-start gap-4 md:grid-cols-2">
        {e.quick && (
          <InfoCard title="Kort version (1 minut)" Icon={FileText} wide>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: 'Vad handlar det om?', value: e.quick.what_is_it_about, Icon: FileText },
                { label: 'Vad förbinder jag mig till?', value: e.quick.what_do_i_commit_to, Icon: PenLine },
                { label: 'Vad får jag tillbaka?', value: e.quick.what_do_i_get, Icon: Gift },
                { label: 'Största risken?', value: e.quick.biggest_risk, Icon: AlertTriangle },
              ].filter(q => q.value).map(({ label, value, Icon }) => (
                <div key={label} className="rounded-xl bg-slate-50 p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">{value}</p>
                </div>
              ))}
            </div>
          </InfoCard>
        )}

        {e.economicRisk && (
          <InfoCard title="Ekonomisk risk, worst case" Icon={Coins} tone="accent">
            <p className="mb-3 font-display text-3xl font-medium tracking-tight text-red-700">
              {e.economicRisk.max_amount.toLocaleString('sv-SE')} {e.economicRisk.currency}
            </p>
            {e.economicRisk.breakdown.length > 0 && <Bullets items={e.economicRisk.breakdown} tone="red" />}
          </InfoCard>
        )}

        {e.standard && (
          <InfoCard title="Jämförelse med svenska standardavtal" Icon={BarChart3}>
            <p className="mb-2 text-sm text-slate-600">
              <span className="font-display text-2xl font-medium text-brand-700">{e.standard.percentage_standard} %</span>{' '}
              standard, enligt AI:ns uppskattning
            </p>
            <div
              role="img"
              aria-label={`${e.standard.percentage_standard} procent standard`}
              className="mb-3 h-2.5 w-full overflow-hidden rounded-md bg-slate-200"
            >
              <div className="h-full rounded-md bg-brand-600" style={{ width: `${e.standard.percentage_standard}%` }} />
            </div>
            {e.standard.deviations.length > 0 && <Bullets items={e.standard.deviations} tone="amber" />}
          </InfoCard>
        )}

        {e.commonTraps.length > 0 && (
          <InfoCard title="Det här missar folk ofta" Icon={AlertTriangle} tone="amber">
            <Bullets items={e.commonTraps} tone="amber" />
          </InfoCard>
        )}

        {e.consequences.length > 0 && (
          <InfoCard title="Vad händer om du bryter avtalet?" Icon={Zap} tone="red">
            <Bullets items={e.consequences} tone="red" />
          </InfoCard>
        )}

        {e.unusualTerms.length > 0 && (
          <InfoCard title="Ovanliga eller oskäliga villkor" Icon={AlertOctagon} tone="red">
            <Bullets items={e.unusualTerms} tone="red" />
          </InfoCard>
        )}

        {e.tips.length > 0 && (
          <InfoCard title="Det här kan du förhandla" Icon={Handshake} wide>
            <div className="grid gap-3 md:grid-cols-2">
              {e.tips.map((tip, i) => (
                <div key={i} className="rounded-xl border border-slate-200 p-4">
                  <p className="mb-1 text-sm font-semibold text-slate-900">{tip.item}</p>
                  {tip.suggestion && <p className="mb-2 text-sm text-slate-600">{tip.suggestion}</p>}
                  <div className="rounded-lg bg-brand-50 p-3">
                    <p className="mb-1 text-xs font-semibold text-brand-700">Förslag på formulering</p>
                    <p className="font-doc text-sm leading-relaxed text-slate-800">{tip.example_wording}</p>
                  </div>
                </div>
              ))}
            </div>
          </InfoCard>
        )}

        {e.timeline.length > 0 && (
          <InfoCard title="Viktiga datum" Icon={CalendarDays}>
            <div className="space-y-2">
              {e.timeline.map((t, i) => (
                <div key={i} className="flex items-start gap-4 border-b border-slate-100 py-2 last:border-0">
                  <div className="min-w-[96px] text-sm font-semibold text-brand-700">{t.date}</div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">{t.event}</div>
                    {t.note && <div className="text-xs text-slate-600">{t.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </InfoCard>
        )}

        {e.checklist.length > 0 && (
          <InfoCard title="Fråga detta innan du signerar" Icon={ListChecks}>
            <ul className="space-y-2">
              {e.checklist.map((q, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                  <span aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 rounded-md border-2 border-slate-300" />{q}
                </li>
              ))}
            </ul>
          </InfoCard>
        )}

        {e.recommendations.length > 0 && (
          <InfoCard title="Rekommendationer" Icon={CheckCircle2}>
            <Bullets items={e.recommendations} />
          </InfoCard>
        )}
      </div>
    </section>
  )
}
