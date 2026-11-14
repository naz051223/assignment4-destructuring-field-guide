// Tuba Nazlı İpekyüz — 2200004532
// Bonus 2: investigate iterator behavior, evaluation order and readability.
const [symbol, letter] = '🧠A'
console.log('depth string:', symbol, letter, '🧠A'.length)
const [firstUnique, ...otherUnique] = new Set(['arrays', 'arrays', 'props'])
console.log('depth Set:', firstUnique, JSON.stringify(otherUnique))
const [[day, minutes]] = new Map([['Monday', 40]])
console.log('depth Map:', day, minutes)
function* planned() {
  try {
    console.log('depth generator: start')
    yield 'arrays'
    console.log('depth generator: second yield reached')
    yield 'props'
  } finally {
    console.log('depth generator: closed')
  }
}
const [onlyFirst] = planned()
console.log('depth generator result:', onlyFirst)
// This is array-like but not iterable: an array pattern requires an iterator.
try {
  const [value] = { 0: 'arrays', length: 1 }
  console.log(value)
} catch (error) {
  console.log('depth array-like:', error.name + ': ' + error.message)
}

let calls = 0
function fallback() { calls++; return 30 }
const [zero = fallback(), missing = fallback(), explicitNull = fallback()] = [0, undefined, null]
console.log('depth lazy defaults:', zero, missing, explicitNull, calls)
const [work = 40, pause = work / 5] = []
console.log('depth earlier default:', work, pause)
try {
  const [early = later, later = 2] = []
  console.log(early, later)
} catch (error) {
  console.log('depth later default:', error.name + ': ' + error.message)
}
const reads = []
const settings = {
  get minutes() { reads.push('minutes'); return undefined },
  get title() { reads.push('title'); return 'React' }
}
const { title, minutes: duration = fallback() } = settings
console.log('depth getter order:', JSON.stringify(reads), title, duration, calls)

const destination = { minutes: 0, pause: 0 }
;[destination.minutes, destination.pause] = [40, 8]
console.log('depth targets:', JSON.stringify(destination))
try { throw new Error('Session unavailable') }
catch ({ message }) { console.log('depth catch:', message) }
const topics = ['arrays', 'props']
for (const index in topics) console.log('depth for-in:', index)
for (const topic of topics) console.log('depth for-of:', topic)

// A compact nested pattern can fail at an intermediate missing object.
function compact(plan) {
  const { owner: { name: student }, sessions: [{ minutes: duration }] } = plan
  return `${student}: ${duration} min`
}
function readable(plan) {
  const owner = plan.owner
  const firstSession = plan.sessions?.[0]
  if (owner == null || firstSession == null) return 'Incomplete plan'
  return `${owner.name}: ${firstSession.minutes} min`
}
const completePlan = { owner: { name: 'Tuba' }, sessions: [{ minutes: 40 }] }
console.log('depth compact:', compact(completePlan))
console.log('depth readable:', readable(completePlan))
try { console.log(compact({ sessions: [] })) }
catch (error) { console.log('depth compact missing:', error.name + ': ' + error.message) }
console.log('depth readable missing:', readable({ sessions: [] }))
