// Tuba Nazlı İpekyüz — 2200004532
// Bonus 2: type-level tuple extraction, distinct from runtime destructuring.
export {}
type First<T extends readonly unknown[]> = T extends readonly [infer Head, ...unknown[]] ? Head : never
type Rest<T extends readonly unknown[]> = T extends readonly [unknown, ...infer Tail] ? Tail : []
const session = [40, 'closures', true] as const
const first: First<typeof session> = session[0]
const rest: Rest<typeof session> = [session[1], session[2]]
console.log('depth TS infer:', first, JSON.stringify(rest))
function planSession(topic: string, minutes: number): string {
  return `${topic}: ${minutes} min`
}
const argumentsForPlan: Parameters<typeof planSession> = ['props', 25]
console.log('depth TS Parameters:', planSession(...argumentsForPlan))
// An ordinary possibly-empty array does not guarantee a first tuple position.
type EmptyFirst = First<[]>
type ArrayFirst = First<string[]>
// Both aliases are never for this non-empty-tuple utility. No value is invented.
const emptyRest: Rest<[]> = []
console.log('depth TS empty Rest:', JSON.stringify(emptyRest))
// Keep the limitation explicit; this utility is for tuples, not arbitrary arrays.
