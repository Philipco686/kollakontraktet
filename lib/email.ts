import { Resend } from 'resend'
import type { Analysis, AnalysisResult } from '@/types'

// Returnerar en Resend-klient om en API-nyckel finns, annars null.
// Då kan appen byggas och köras även innan e-post är konfigurerat.
export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

export const EMAIL_FROM = process.env.EMAIL_FROM ?? 'Kolla Kontraktet <onboarding@resend.dev>'

const riskText: Record<string, string> = {
  low: '🟢 Låg risk',
  medium: '🟡 Medel risk',
  high: '🔴 Hög risk',
}

export function buildAnalysisEmailHtml(analysis: Analysis, siteUrl: string): string {
  const r = analysis.result as AnalysisResult
  const locked = !analysis.is_unlocked

  const facts = (r.key_facts ?? [])
    .map(
      f => `<td style="padding:8px;text-align:center;border:1px solid #e2e8f0;">
        <div style="font-size:20px">${f.icon}</div>
        <div style="font-size:11px;color:#64748b">${f.label}</div>
        <div style="font-weight:600;font-size:13px;color:#0f172a">${f.value}</div>
      </td>`
    )
    .join('')

  const clauses = locked
    ? ''
    : (r.clauses ?? [])
        .map(
          c => `<div style="background:#f8fafc;border-radius:10px;padding:12px;margin-bottom:8px">
            <strong style="color:#0f172a;font-size:14px">${c.title}</strong>
            <p style="color:#475569;font-size:13px;margin:4px 0 0">${c.plain_explanation}</p>
          </div>`
        )
        .join('')

  const recommendations = locked
    ? ''
    : (r.recommendations ?? [])
        .map(rec => `<li style="color:#475569;font-size:13px;margin-bottom:4px">${rec}</li>`)
        .join('')

  const lockedBlock = locked
    ? `<div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;padding:20px;text-align:center;margin-top:16px">
        <div style="font-size:28px">🔒</div>
        <p style="color:#0f172a;font-weight:600;margin:8px 0 4px">Resten av analysen är låst</p>
        <p style="color:#64748b;font-size:13px;margin:0 0 12px">Lås upp för att se alla klausuler, ekonomisk risk och förhandlingstips.</p>
        <a href="${siteUrl}/pricing" style="background:#0284c7;color:#fff;text-decoration:none;padding:10px 20px;border-radius:10px;font-weight:600;font-size:14px">Lås upp hela analysen</a>
      </div>`
    : ''

  return `<!doctype html>
  <html lang="sv"><body style="margin:0;background:#f8fafc;font-family:-apple-system,Segoe UI,Roboto,sans-serif">
    <div style="max-width:600px;margin:0 auto;padding:24px">
      <p style="color:#0284c7;font-weight:700;font-size:18px;margin:0 0 16px">Kolla Kontraktet</p>
      <div style="background:#fff;border-radius:16px;padding:24px;border:1px solid #e2e8f0">
        <h1 style="font-size:20px;color:#0f172a;margin:0 0 4px">${analysis.title}</h1>
        <p style="color:#64748b;font-size:13px;margin:0 0 16px">${riskText[r.risk_level] ?? ''}</p>
        <p style="color:#334155;font-size:14px;line-height:1.6">${r.summary}</p>
        ${facts ? `<table style="border-collapse:collapse;width:100%;margin:16px 0"><tr>${facts}</tr></table>` : ''}
        ${recommendations ? `<h3 style="font-size:15px;color:#0f172a;margin:16px 0 8px">Rekommendationer</h3><ul style="padding-left:18px;margin:0">${recommendations}</ul>` : ''}
        ${clauses ? `<h3 style="font-size:15px;color:#0f172a;margin:16px 0 8px">Klausuler</h3>${clauses}` : ''}
        ${lockedBlock}
      </div>
      <p style="color:#94a3b8;font-size:12px;text-align:center;margin-top:16px">
        Detta är en AI-genererad analys och ersätter inte juridisk rådgivning.
      </p>
    </div>
  </body></html>`
}

export function buildTeamInviteEmailHtml(inviterEmail: string, siteUrl: string): string {
  return `<!doctype html>
  <html lang="sv"><body style="margin:0;background:#f8fafc;font-family:-apple-system,Segoe UI,Roboto,sans-serif">
    <div style="max-width:600px;margin:0 auto;padding:24px">
      <p style="color:#1e3a8a;font-weight:700;font-size:18px;margin:0 0 16px">Kolla Kontraktet</p>
      <div style="background:#fff;border-radius:16px;padding:28px;border:1px solid #e2e8f0;text-align:center">
        <div style="font-size:32px">👥</div>
        <h1 style="font-size:20px;color:#0f172a;margin:12px 0 8px">Du är inbjuden till ett team!</h1>
        <p style="color:#334155;font-size:14px;line-height:1.6;margin:0 0 20px">
          <strong>${inviterEmail}</strong> har lagt till dig i sitt Företag-team på Kolla Kontraktet.
          Logga in med <strong>den här mejladressen</strong> så får du obegränsade avtalsanalyser –
          utan att betala något själv.
        </p>
        <a href="${siteUrl}/login" style="background:#b45309;color:#fff;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:600;font-size:14px;display:inline-block">
          Logga in och kom igång
        </a>
      </div>
      <p style="color:#94a3b8;font-size:12px;text-align:center;margin-top:16px">
        Fick du detta av misstag? Då kan du ignorera mejlet.
      </p>
    </div>
  </body></html>`
}
