// Visas medan analysen hämtas. Stilla platshållare utan rörelse.
export default function Loading() {
  return (
    <div className="space-y-6" role="status" aria-label="Hämtar analysen">
      <div className="h-5 w-64 rounded-md bg-slate-200" />
      <div className="flex flex-wrap gap-6">
        <div className="h-64 min-w-0 flex-[2_1_520px] rounded-2xl bg-white" />
        <div className="h-64 min-w-0 flex-[1_1_300px] rounded-2xl bg-white" />
      </div>
      <div className="h-48 rounded-2xl bg-white" />
    </div>
  )
}
