// Tuba Nazlı İpekyüz — 2200004532
// Guided review: primitive values versus shared object references.
const session = {
  minutes: 40,
  room: { label: 'A' }
}
const { minutes, room } = session
session.minutes = 60
room.label = 'B'
console.log(minutes)
console.log(session.room.label)
