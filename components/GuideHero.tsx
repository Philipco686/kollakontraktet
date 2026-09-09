// On-brand illustrativ hero för avtalsguiderna (server-komponent, ren SVG).
export default function GuideHero({ name }: { name: string }) {
  return (
    <div className="mb-10 rounded-2xl bg-brand-50 border border-brand-100 overflow-hidden">
      <svg
        viewBox="0 0 800 240"
        className="w-full h-auto"
        role="img"
        aria-label={`Illustration: granskning av ${name.toLowerCase()}`}
      >
        {/* Dokument */}
        <g transform="translate(300,34)">
          <rect x="0" y="0" width="200" height="172" rx="12" fill="#ffffff" stroke="#c3d1ee" strokeWidth="2" />
          <rect x="28" y="30" width="120" height="10" rx="5" fill="#dfe7f6" />
          <rect x="28" y="56" width="144" height="10" rx="5" fill="#dfe7f6" />
          <rect x="28" y="82" width="96" height="10" rx="5" fill="#f9e6c8" />
          <rect x="28" y="108" width="144" height="10" rx="5" fill="#dfe7f6" />
          <rect x="28" y="134" width="78" height="10" rx="5" fill="#dfe7f6" />
        </g>
        {/* Förstoringsglas */}
        <g transform="translate(452,150)" fill="none" stroke="#1e3a8a" strokeWidth="10" strokeLinecap="round">
          <circle cx="0" cy="0" r="36" />
          <line x1="26" y1="26" x2="58" y2="58" />
        </g>
        {/* Guld-bock (badge) */}
        <g transform="translate(486,40)">
          <circle cx="0" cy="0" r="28" fill="#cf7d12" />
          <path d="M-12 1 L-3 10 L12 -9" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  )
}
