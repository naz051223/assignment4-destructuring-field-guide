// Tuba Nazlı İpekyüz — 2200004532
import type { ReactNode, PropsWithChildren, ComponentProps } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
function show(label: string, element: ReactNode) {
  console.log(label + ':', renderToStaticMarkup(element))
}
type CardProps = { title: string; children?: ReactNode }
function CardA(props: CardProps) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}
function Card({ title, children }: CardProps) {
  return <section><h2>{title}</h2>{children}</section>
}
show('P1 object', <CardA title="Study">Closures</CardA>)
show('P1 pattern', <Card title="Study">Closures</Card>)
show('P2 nested', <Card title="Study">Practice</Card>)
show('P2 attribute', <Card title="Study" children="Practice" />)
// TS rejects duplicate children; the JS version demonstrates runtime precedence.

show('P3 string', <Card title="Study">Read</Card>)
show('P3 string zero', <Card title="Study">0</Card>)
show('P3 numeric zero', <Card title="Study">{0}</Card>)
show('P3 element', <Card title="Study"><strong>Code</strong></Card>)
show('P3 several', <Card title="Study"><b>Read</b><i>Code</i></Card>)
show('P3 undefined', <Card title="Study" />)
show('P3 null', <Card title="Study">{null}</Card>)
show('P3 false', <Card title="Study">{false}</Card>)
// A raw function child is rejected by ReactNode; see compiler-diagnostics.txt.
function RenderCard({ children }: { children: (minutes: number) => ReactNode }) { return <section>{children(25)}</section> }
show('P3 invoked function', <RenderCard>{minutes => <b>{minutes} min</b>}</RenderCard>)

function RestFirst({ title, children, ...rest }: ComponentProps<'section'>) {
  return <section {...rest} title={title}>{children}</section>
}
function RestLast({ heading, children, ...rest }: ComponentProps<'section'> & { heading: string }) {
  return <section title={heading} {...rest}>{children}</section>
}
// title was removed from rest in RestFirst, so no title collision remains there.
show('P4 separated', <RestFirst title="Session" id="s1" data-topic="props">Read</RestFirst>)
show('P4 explicit last', <section {...{ title: 'Spread' }} title="Explicit">Read</section>)
show('P4 spread last', <RestLast heading="Explicit" title="Spread">Read</RestLast>)

function Slots({ header, footer, children }: { header: ReactNode; footer: ReactNode; children?: ReactNode }) {
  return <article><header>{header}</header><main>{children}</main><footer>{footer}</footer></article>
}
function Composition({ children }: PropsWithChildren) { return <article>{children}</article> }
show('P5 slots', <Slots header={<h2>Plan</h2>} footer={<small>Done</small>}><p>Read</p></Slots>)
show('P5 composition', <Composition><header><h2>Plan</h2></header><main><p>Read</p></main><footer><small>Done</small></footer></Composition>)
function DefaultCard({ title = 'Free practice' }: { title?: string | null }) { return <h2>{title}</h2> }
show('P6 undefined', <DefaultCard title={undefined} />)
show('P6 null', <DefaultCard title={null} />)
function TypedButton({ children, ...rest }: ComponentProps<'button'>) {
  return <button {...rest}>{children}</button>
}
show('P7 ReactNode', <Card title="Typed">{7}</Card>)
show('P7 PropsWithChildren', <Composition><em>Review</em></Composition>)
show('P7 ComponentProps', <TypedButton type="button" disabled>Start</TypedButton>)




