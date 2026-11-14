// Tuba Nazlı İpekyüz — 2200004532
// Forms 5–10: study-session planner.
const session = { id: 's1', title: 'Review closures', status: 'planned' }
let { title, status } = session
console.log('form 5:', title, status)

const { title: heading } = session
console.log('form 6:', heading)

const { minutes = 40 } = {}
const { minutes: explicitNull = 40 } = { minutes: null }
console.log('form 7:', minutes, explicitNull)

const { id, ...details } = session
console.log('form 8:', id, JSON.stringify(details))

const plan = { room: { label: 'Library B' }, topics: ['closures', 'props'] }
const { room: { label }, topics: [firstTopic] } = plan
console.log('form 9:', label, firstTopic)

const key = 'status'
const { [key]: selectedValue } = session
console.log('form 10:', key, selectedValue)

