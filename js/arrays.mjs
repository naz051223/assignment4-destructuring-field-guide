// Tuba Nazlı İpekyüz — 2200004532
// Forms 1–4: study-session planner.
function sessionLengths(workMinutes) {
  return [workMinutes, Math.round(workMinutes / 5)]
}
const [work, pause] = sessionLengths(40)
console.log('form 1:', work, pause)

const topics = ['arrays', 'objects', 'parameters', 'props']
const [, nextTopic, ...laterTopics] = topics
console.log('form 2:', nextTopic, JSON.stringify(laterTopics))

let morning = 'TypeScript'
let evening = 'JavaScript'
;[morning, evening] = [evening, morning]
console.log('form 3:', morning, evening)

const settings = [undefined, null]
const [duration = 30, reminder = 'enabled', rounds = 2] = settings
console.log('form 4:', duration, reminder, rounds)

