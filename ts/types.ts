// Tuba Nazlı İpekyüz — 2200004532
export {}
// T1: the colon inside the pattern renames; the annotation follows it.
const { minutes: string } = { minutes: 25 }
const { minutes: duration }: { minutes: number } = { minutes: 25 }
console.log('T1:', string, typeof string, duration)

// T2: a tuple return and a readonly literal tuple from as const.
function sessionSummary(): [number, string] { return [40, 'closures'] }
const [minutes, topic] = sessionSummary()
const fixed = [25, 'props'] as const
const [fixedMinutes, fixedTopic] = fixed
console.log('T2:', minutes, topic, fixedMinutes, fixedTopic)

// T3: normal arrays may be empty. Narrow before using the value.
const topics: string[] = []
const [first] = topics // string | undefined
const [safeFirst = 'free practice'] = topics // string
console.log('T3:', first, safeFirst)
if (first !== undefined) console.log(first.toUpperCase())

// T4: defaults eliminate undefined, not null.
type Options = { minutes?: number; label?: string | null }
const options: Options = { label: null }
const { minutes: optionalMinutes } = options // number | undefined
const { minutes: defaultMinutes = 40, label = 'Untitled' } = options
console.log('T4:', optionalMinutes, defaultMinutes, label)

// T5: the source has minutes, not duration. Runtime JS would return undefined.
const source = { minutes: 25 }
// @ts-expect-error TS2339: Property 'duration' does not exist on type '{ minutes: number; }'.
const { duration: wrongName } = source
const { minutes: correctedName } = source
console.log('T5:', wrongName, correctedName)

