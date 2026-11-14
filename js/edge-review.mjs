// Tuba Nazlı İpekyüz — 2200004532
// Guided-review cases: string properties and default evaluation order.
const { length } = 'React'
console.log('review string length:', length)
try {
  const [a = b, b = 2] = []
  console.log(a, b)
} catch (error) {
  console.log('review later binding:', error.name + ': ' + error.message)
}
const [b = 2, a = b] = []
console.log('review earlier binding:', a, b)
