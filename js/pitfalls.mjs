// Tuba Nazlı İpekyüz — 2200004532
// Five pitfalls, including failures caught so the complete run can continue.
try {
  const { minutes } = undefined
  console.log(minutes)
} catch (error) {
  console.log('pitfall 1:', error.name + ': ' + error.message)
}
const { minutes = 40 } = { minutes: null }
console.log('pitfall 2:', minutes)
try {
  new Function('let minutes; { minutes } = { minutes: 25 }')()
} catch (error) {
  console.log('pitfall 3 invalid:', error.name + ': ' + error.message)
}
let assignedMinutes
;({ minutes: assignedMinutes } = { minutes: 25 })
console.log('pitfall 3 fixed:', assignedMinutes)
const original = { room: { label: 'Library B' }, id: 's1' }
const { room, ...rest } = original
room.label = 'Library C'
rest.id = 's2'
console.log('pitfall 4:', original.room.label, original.id, rest.id)
const { title, status } = { status: 'planned', title: 'React practice' }
const [first, second] = ['planned', 'React practice']
console.log('pitfall 5 object:', title, status)
console.log('pitfall 5 array:', first, second)

