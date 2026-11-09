// Tankstreck (en-dash och em-dash) används inte i text som visas för användaren (designregel).
// Tecknen byggs ur teckenkoder så att ingen redigerare eller formatterare råkar skriva om dem.
const DASH = `[${String.fromCharCode(0x2013)}${String.fromCharCode(0x2014)}]`
const RANGE = new RegExp(`(\\d)\\s*${DASH}\\s*(\\d)`, 'g')
const SPACED = new RegExp(`\\s+${DASH}\\s+`, 'g')
const ANY = new RegExp(DASH, 'g')

export function stripDashes(s: string): string {
  return s
    .replace(RANGE, '$1 till $2')
    .replace(SPACED, ', ')
    .replace(ANY, '-')
}

// Går igenom ett helt objekt och rensar alla strängar. Nycklar i `keep` lämnas orörda
// (till exempel citerad avtalstext som ska återges ordagrant).
export function stripDashesDeep<T>(value: T, keep: string[] = [], key?: string): T {
  if (typeof value === 'string') return (key && keep.includes(key) ? value : stripDashes(value)) as T
  if (Array.isArray(value)) return value.map(v => stripDashesDeep(v, keep)) as T
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, stripDashesDeep(v, keep, k)])
    ) as T
  }
  return value
}
