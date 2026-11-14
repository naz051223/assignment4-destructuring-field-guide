// Tuba Nazlı İpekyüz — 2200004532
// Guided-review experiment: a default expression is evaluated only when needed.
let calls = 0
function fallback() {
  calls++
  return 30
}
const { minutes = fallback() } = { minutes: 0 }
console.log(minutes, calls)
