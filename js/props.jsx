// Tuba Nazlı İpekyüz — 2200004532
import { renderToStaticMarkup } from 'react-dom/server'
function show(label, element) {
  console.log(label + ':', renderToStaticMarkup(element))
}
function CardA(props) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}
function Card({ title, children }) {
  return <section><h2>{title}</h2>{children}</section>
}
show('P1 object', <CardA title="Study">Closures</CardA>)
show('P1 pattern', <Card title="Study">Closures</Card>)
show('P2 nested', <Card title="Study">Practice</Card>)
show('P2 attribute', <Card title="Study" children="Practice" />)
show('P2 both', <Card title="Study" children="Attribute">Nested</Card>)

show('P3 string', <Card title="Study">Read</Card>)
show('P3 string zero', <Card title="Study">0</Card>)
show('P3 numeric zero', <Card title="Study">{0}</Card>)
show('P3 element', <Card title="Study"><strong>Code</strong></Card>)
show('P3 several', <Card title="Study"><b>Read</b><i>Code</i></Card>)
show('P3 undefined', <Card title="Study" />)
show('P3 null', <Card title="Study">{null}</Card>)
show('P3 false', <Card title="Study">{false}</Card>)
// Capture React's actual diagnostic in stdout so it is preserved in output.txt.
const savedError = console.error
try {
  console.error = (...args) => console.log('P3 diagnostic:', ...args)
  show('P3 raw function', <Card title="Study">{() => 'Read'}</Card>)
} finally { console.error = savedError }
function RenderCard({ children }) { return <section>{children(25)}</section> }
show('P3 invoked function', <RenderCard>{minutes => <b>{minutes} min</b>}</RenderCard>)

function RestFirst({ title, children, ...rest }) {
  return <section {...rest} title={title}>{children}</section>
}
function RestLast({ heading, children, ...rest }) {
  return <section title={heading} {...rest}>{children}</section>
}
// title was removed from rest in RestFirst, so no title collision remains there.
show('P4 separated', <RestFirst title="Session" id="s1" data-topic="props">Read</RestFirst>)
show('P4 explicit last', <section {...{ title: 'Spread' }} title="Explicit">Read</section>)
show('P4 spread last', <RestLast heading="Explicit" title="Spread">Read</RestLast>)

function Slots({ header, footer, children }) {
  return <article><header>{header}</header><main>{children}</main><footer>{footer}</footer></article>
}
function Composition({ children }) { return <article>{children}</article> }
show('P5 slots', <Slots header={<h2>Plan</h2>} footer={<small>Done</small>}><p>Read</p></Slots>)
show('P5 composition', <Composition><header><h2>Plan</h2></header><main><p>Read</p></main><footer><small>Done</small></footer></Composition>)
function DefaultCard({ title = 'Free practice' }) { return <h2>{title}</h2> }
show('P6 undefined', <DefaultCard title={undefined} />)
show('P6 null', <DefaultCard title={null} />)
console.log('P7 JS:', 'No static props type checking; see ts/props.tsx and compiler probes.')


