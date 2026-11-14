// Tuba Nazlı İpekyüz — 2200004532
// Forms 1–4: study-session planner.
export {}
function sessionLengths(workMinutes: number): [number, number] {
  return [workMinutes, Math.round(workMinutes / 5)]
}
const [work, pause] = sessionLengths(40)
console.log('form 1:', work, pause)

const topics: string[] = ['arrays', 'objects', 'parameters', 'props']
const [, nextTopic, ...laterTopics] = topics
console.log('form 2:', nextTopic, JSON.stringify(laterTopics))

let morning: string = 'TypeScript'
let evening: string = 'JavaScript'
;[morning, evening] = [evening, morning]
console.log('form 3:', morning, evening)

const settings: [number | undefined, string | null] = [undefined, null]
const [duration = 30, reminder = 'enabled'] = settings
const missingRounds: number[] = []
const [rounds = 2] = missingRounds
console.log('form 4:', duration, reminder, rounds)

