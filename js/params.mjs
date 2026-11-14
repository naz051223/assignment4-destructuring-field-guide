// Tuba Nazlı İpekyüz — 2200004532
// Forms 11–12: study-session planner.
function makeSession({ title = 'Free practice', minutes = 40 } = {}) {
  return { title, minutes }
}
console.log('form 11:', JSON.stringify(makeSession()))
console.log('form 11 custom:', JSON.stringify(makeSession({ title: 'React', minutes: 25 })))
function totalMinutes([work, pause]) { return work + pause }
console.log('form 11 array:', totalMinutes([40, 8]))

const targets = { reading: 20, coding: 40 }
for (const [topic, minutes] of Object.entries(targets)) {
  console.log('form 12 object:', topic, minutes)
}
const completed = new Map([['Monday', 2], ['Tuesday', 3]])
for (const [day, count] of completed) {
  console.log('form 12 map:', day, count)
}

