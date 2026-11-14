// Tuba Nazlı İpekyüz — 2200004532
// Guided-review experiment: renaming does not reassign an existing binding.
const title = 'Haftalık plan'
const session = { title: 'React çalışması' }
const { title: heading } = session
console.log(title)
console.log(heading)
