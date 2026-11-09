// Trygghetspoäng som en ring. Färgen följer samma gränser som den samlade bedömningen:
// under 50 röd, under 75 bärnsten, annars grön.
export default function ScoreRing({ score }: { score: number }) {
  const C = 2 * Math.PI * 72
  const dash = (score / 100) * C
  const color = score < 50 ? '#dc2626' : score < 75 ? '#d97706' : '#16a34a'
  return (
    <div className="flex shrink-0 flex-col items-center gap-2">
      <div className="relative h-44 w-44">
        <svg width="176" height="176" viewBox="0 0 176 176" role="img" aria-label={`Trygghetspoäng ${score} av 100`} aria-describedby="score-note">
          <circle cx="88" cy="88" r="72" fill="none" stroke="#e2e8f0" strokeWidth="16" />
          <circle
            cx="88" cy="88" r="72" fill="none" stroke={color} strokeWidth="16" strokeLinecap="round"
            strokeDasharray={`${dash.toFixed(1)} ${C.toFixed(1)}`} transform="rotate(-90 88 88)"
          />
        </svg>
        <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-display text-[52px] font-medium leading-none tracking-tight text-slate-900">{score}</div>
          <div className="mt-1 text-xs font-semibold text-slate-600">av 100</div>
        </div>
      </div>
      <p className="text-xs font-semibold text-slate-600">Vägledande poäng</p>
      <p id="score-note" className="sr-only">Poängen bygger på antal och allvar av de villkor som flaggats i avtalet.</p>
    </div>
  )
}
