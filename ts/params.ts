// Tuba Nazlı İpekyüz — 2200004532
// Forms 11–12: study-session planner.
export {}
type Options = { title?: string; minutes?: number }
function makeSession({ title = 'Free practice', minutes = 40 }: Options = {}) {
  return { title, minutes }
}
console.log('form 11:', JSON.stringify(makeSession()))
console.log('form 11 custom:', JSON.stringify(makeSession({ title: 'React', minutes: 25 })))
function totalMinutes([work, pause]: [number, number]): number { return work + pause }
console.log('form 11 array:', totalMinutes([40, 8]))

const targets: Record<string, number> = { reading: 20, coding: 40 }
for (const [topic, minutes] of Object.entries(targets)) {
  console.log('form 12 object:', topic, minutes)
}
const completed = new Map<string, number>([['Monday', 2], ['Tuesday', 3]])
for (const [day, count] of completed) {
  console.log('form 12 map:', day, count)
}

