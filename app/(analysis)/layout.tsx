import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import NavBar from '@/components/NavBar'

// Samma inloggningskrav och meny som resten av den inloggade delen, men bredare yta för
// avtalet och analysen sida vid sida.
export default async function AnalysisGroupLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar user={user} />
      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8">{children}</main>
    </div>
  )
}
