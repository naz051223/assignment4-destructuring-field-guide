// Tuba Nazlı İpekyüz — 2200004532
// Guided review: explicitly invoke a function child.
import { renderToStaticMarkup } from 'react-dom/server'
function Card({ children }) {
  return <section>{children(2)}</section>
}
console.log(renderToStaticMarkup(
  <Card>{number => <strong>{number + 3}</strong>}</Card>
))
