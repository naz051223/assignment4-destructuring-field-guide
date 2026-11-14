// Tuba Nazlı İpekyüz — 2200004532
// Guided review: zero is falsy, but is still rendered as a React child.
import { renderToStaticMarkup } from 'react-dom/server'
function Session({ count }) {
  return <section>{count && <span>Çalışma var</span>}</section>
}
function CheckedSession({ count }) {
  return <section>{count > 0 && <span>Çalışma var</span>}</section>
}
console.log('original:', renderToStaticMarkup(<Session count={0} />))
console.log('checked:', renderToStaticMarkup(<CheckedSession count={0} />))
