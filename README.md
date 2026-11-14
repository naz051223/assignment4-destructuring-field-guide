# Destructuring Field Guide

Name: Tuba Nazlı İpekyüz  
Student number: 2200004532

Bonuses in progress: Bonus 1: LaTeX; Bonus 2: Depth; Bonus 3: Real code. Bonus 4: Git repository is being prepared and is not yet claimed.

This guide uses a study-session planner. The examples and explanations were
prepared with AI assistance and need student review and explanation before submission.
Forms 1–12, five pitfalls, T1–T5 and P1–P7 are implemented and verified.

## Run

Requires Node.js 20.19 or newer.

```sh
npm install
npm run all
npm run check
npm run diagnose # separate intentional compiler failures
```

`output.txt` contains the actual output of the current project. The JS and TS
versions print the same values for forms 1–12. The all command also runs the guided-review examples through npm run review.

## Field guide

### Form 1: values by position

**Syntax:** `const [work, pause] = sessionLengths(40)`

**Example** (`js/arrays.mjs`, typed version in `ts/arrays.ts`):

```js
function sessionLengths(workMinutes) {
  return [workMinutes, Math.round(workMinutes / 5)]
}
const [work, pause] = sessionLengths(40)
console.log('form 1:', work, pause)
```

**Output:** `form 1: 40 8`

**Use it when:** a function returns a small ordered group of related values.

**Watch out:** names do not select positions. Swapping the names swaps their meaning.
In plain assignments, save the result once, then read `result[0]` and `result[1]`.
The TS return type `[number, number]` guarantees those two positions exist.

### Form 2: skip and rest

**Syntax:** `const [, nextTopic, ...laterTopics] = topics`

**Example** (`js/arrays.mjs`):

```js
const topics = ['arrays', 'objects', 'parameters', 'props']
const [, nextTopic, ...laterTopics] = topics
console.log('form 2:', nextTopic, JSON.stringify(laterTopics))
```

**Output:** `form 2: objects ["parameters","props"]`

**Use it when:** only one position and the remaining items matter.

**Watch out:** rest must be last. It creates a new array without changing the source.
For this array the corresponding operations are `topics[1]` and `topics.slice(2)`.
With `noUncheckedIndexedAccess`, TS gives `nextTopic` type `string | undefined`.

### Form 3: swap

**Syntax:** `[morning, evening] = [evening, morning]`

**Example** (`js/arrays.mjs`):

```js
let morning = 'TypeScript'
let evening = 'JavaScript'
;[morning, evening] = [evening, morning]
console.log('form 3:', morning, evening)
```

**Output:** `form 3: JavaScript TypeScript`

**Use it when:** exchanging two existing variables.

**Watch out:** use mutable bindings. The leading semicolon prevents the array
expression from continuing the preceding statement. Without destructuring, save
`morning` in a temporary variable before overwriting it. TS also requires each
assigned value to be compatible with its destination variable.

### Form 4: array defaults

**Syntax:** `const [duration = 30, reminder = 'enabled', rounds = 2] = settings`

**Example** (`js/arrays.mjs`):

```js
const settings = [undefined, null]
const [duration = 30, reminder = 'enabled', rounds = 2] = settings
console.log('form 4:', duration, reminder, rounds)
```

**Output:** `form 4: 30 null 2`

**Use it when:** missing positions should have fallback values.

**Watch out:** undefined and a missing position trigger defaults; null does not.
The plain version checks each indexed value with `=== undefined` before choosing
a fallback. In TS the first two values use a two-element tuple; a separate empty
`number[]` demonstrates the missing rounds position without indexing past a tuple.

### Form 5: properties by name

**Syntax:** `let { title, status } = session`

**Example** (`js/objects.mjs`, typed version in `ts/objects.ts`):

```js
const session = { id: 's1', title: 'Review closures', status: 'planned' }
let { title, status } = session
console.log('form 5:', title, status)
```

**Output:** `form 5: Review closures planned`

**Use it when:** several fields of the same object are needed locally.

**Watch out:** object fields are selected by name, regardless of their order.
Plain assignments are `let title = session.title` and `let status = session.status`.
Reassigning these string variables does not update the source object.

### Form 6: rename

**Syntax:** `const { title: heading } = session`

**Example** (`js/objects.mjs`, using the session from form 5):

```js
const { title: heading } = session
console.log('form 6:', heading)
```

**Output:** `form 6: Review closures`

**Use it when:** a local name would be clearer or the original name is already used.

**Watch out:** this declares `heading`, not a new `title` binding.
It means `const heading = session.title`. The colon is a rename, including in TS;
a type annotation belongs after the whole pattern.

### Form 7: object defaults

**Syntax:** `const { minutes = 40 } = options`

**Example** (`js/objects.mjs`):

```js
const { minutes = 40 } = {}
const { minutes: explicitNull = 40 } = { minutes: null }
console.log('form 7:', minutes, explicitNull)
```

**Output:** `form 7: 40 null`

**Use it when:** an optional configuration field needs a fallback.

**Watch out:** the fallback does not replace null or protect against a null source
object. Plain code reads the property, then substitutes 40 only if it is undefined.
The TS settings type allows `number | null`; a default removes undefined, not null.

### Form 8: object rest

**Syntax:** `const { id, ...details } = session`

**Example** (`js/objects.mjs`, using the session from form 5):

```js
const { id, ...details } = session
console.log('form 8:', id, JSON.stringify(details))
```

**Output:** `form 8: s1 {"title":"Review closures","status":"planned"}`

**Use it when:** separating an identifier from the remaining fields.

**Watch out:** rest is a shallow copy of remaining own enumerable properties.
Nested object references remain shared. For this specific plain object, the
expanded version reads id, title and status separately and builds a details object.
`...details` in an expression is spread: it expands fields instead of collecting them.

### Form 9: nested patterns

**Syntax:** `const { room: { label }, topics: [firstTopic] } = plan`

**Example** (`js/objects.mjs`):

```js
const plan = { room: { label: 'Library B' }, topics: ['closures', 'props'] }
const { room: { label }, topics: [firstTopic] } = plan
console.log('form 9:', label, firstTopic)
```

**Output:** `form 9: Library B closures`

**Use it when:** a few values inside a known structure are needed.

**Watch out:** this does not declare room or topics. A missing room throws before
label can be read. Plain assignments read `plan.room.label` and `plan.topics[0]`.
The TS array element remains possibly undefined, because the topics array may be empty.

### Form 10: computed property

**Syntax:** `const { [key]: selectedValue } = session`

**Example** (`js/objects.mjs`, using the session from form 5):

```js
const key = 'status'
const { [key]: selectedValue } = session
console.log('form 10:', key, selectedValue)
```

**Output:** `form 10: status planned`

**Use it when:** a variable decides which property to read.

**Watch out:** `[key]` evaluates the variable; `key` without brackets would select
a property literally named key. Plain code is `const selectedValue = session[key]`.
In TS, `keyof Session` restricts the key to known property names.

### Form 11: parameters

**Syntax:** `function makeSession({ title = 'Free practice', minutes = 40 } = {})`

**Example** (`js/params.mjs`, typed version in `ts/params.ts`):

```js
function makeSession({ title = 'Free practice', minutes = 40 } = {}) {
  return { title, minutes }
}
console.log('form 11:', JSON.stringify(makeSession()))
console.log('form 11 custom:', JSON.stringify(makeSession({ title: 'React', minutes: 25 })))
function totalMinutes([work, pause]) { return work + pause }
console.log('form 11 array:', totalMinutes([40, 8]))
```

**Output:**

```text
form 11: {"title":"Free practice","minutes":40}
form 11 custom: {"title":"React","minutes":25}
form 11 array: 48
```

**Use it when:** callers should supply named options, or a small tuple parameter.

**Watch out:** the outer `= {}` handles a missing argument; the inner defaults
handle missing fields. Neither replaces a null argument. Without a parameter
pattern, receive `options = {}` and read each field inside the function. TS writes
`: Options` after the object pattern; its fields must be optional for `{}` to work.

### Form 12: loop entries

**Syntax:** `for (const [topic, minutes] of Object.entries(targets))`

**Example** (`js/params.mjs`):

```js
const targets = { reading: 20, coding: 40 }
for (const [topic, minutes] of Object.entries(targets)) {
  console.log('form 12 object:', topic, minutes)
}
const completed = new Map([['Monday', 2], ['Tuesday', 3]])
for (const [day, count] of completed) {
  console.log('form 12 map:', day, count)
}
```

**Output:**

```text
form 12 object: reading 20
form 12 object: coding 40
form 12 map: Monday 2
form 12 map: Tuesday 3
```

**Use it when:** both the key and value are needed for each entry.

**Watch out:** use for...of for entries. for...in enumerates property names instead.
Without destructuring, receive an entry variable, then read entry[0] and entry[1].
Here TS uses `Record<string, number>` and `Map<string, number>` to describe the values.

## Pitfalls

Code: `js/pitfalls.mjs`. The deliberately invalid assignment is compiled inside
`new Function` and caught; otherwise a syntax error would prevent the whole file running.

1. Destructuring undefined throws before a property can be read. The actual output
   was `pitfall 1: TypeError: Cannot destructure property 'minutes' of 'undefined' as it is undefined.`
   Check the source first, or use an appropriate parameter default for undefined.
   Null also cannot be destructured; an undefined-only default does not fix null.
2. Defaults are not null replacement. `{ minutes = 40 } = { minutes: null }`
   printed `pitfall 2: null`, because the default runs only for undefined.
3. A statement starting with `{` is parsed as a block, not an object assignment
   pattern. The unparenthesized attempt printed
   `pitfall 3 invalid: SyntaxError: Unexpected token '='`.
   `({ minutes: assignedMinutes } = { minutes: 25 })` printed
   `pitfall 3 fixed: 25` because parentheses make it an expression.
4. Object values can be shared references. Changing the destructured room changed
   the original, while changing the copied rest object's string id did not.
   `pitfall 4: Library C s1 s2` shows this is a shallow operation, not a deep copy.
5. Object patterns select names, array patterns select positions. Reordered object
   properties still printed `pitfall 5 object: React practice planned`; the array
   printed `pitfall 5 array: planned React practice` because its positions differ.

## TypeScript topics T1–T5

Code: `ts/types.ts`. TypeScript checks patterns before execution; it does not
change the JavaScript rules for choosing values.

### T1: a colon can rename

`const { minutes: string } = { minutes: 25 }` creates a variable called string,
whose value is a number. It does not annotate minutes with the string type.
The typed form is `const { minutes: duration }: { minutes: number } = ...`.
Actual output: `T1: 25 number 25`.
Calling `string.toUpperCase()` produced TS2339 in the compiler experiment.

### T2: tuples and as const

`sessionSummary(): [number, string]` promises a number and a string in that order.
`const fixed = [25, 'props'] as const` infers the readonly tuple
`readonly [25, 'props']`. Destructuring keeps the specific element types.
Actual output: `T2: 40 closures 25 props`.
The readonly type prevents assignments to tuple positions through this binding;
it does not freeze an object at runtime.

### T3: unchecked array access

For `const [first] = topics` with `topics: string[]`, first is `string | undefined`.
An empty array is legal, so calling a string method immediately is unsafe.
Check `first !== undefined` first, or use `[safeFirst = 'free practice']`.
Actual output: `T3: undefined free practice`. The unsafe method call produced
TS18048: `'first' is possibly 'undefined'.`

### T4: optional fields and defaults

With `minutes?: number`, an ordinary destructured value is `number | undefined`.
Adding `minutes = 40` gives a number. If the field also permits null, null remains
in the type and the runtime value. Actual output: `T4: undefined 40 null`.
The nullable method call produced TS18047: `'minutes' is possibly 'null'.`

### T5: wrong property and fix

The source has a minutes property, but `{ duration: wrongName }` asks for duration.
The actual diagnostic is TS2339: `Property 'duration' does not exist on type
'{ minutes: number; }'.` The one `@ts-expect-error` in the project marks this
intentional error. The fix is `{ minutes: correctedName }`.
Actual output: `T5: undefined 25`. Suppressing an error does not repair the runtime
property lookup. An unnecessary expect-error itself makes the check fail.

## Props and children P1–P7

Runnable sources: `js/props.jsx` and `ts/props.tsx`. They use
`renderToStaticMarkup`, so the output below is actual HTML from server rendering,
not a browser screenshot or a prediction. It does not demonstrate browser events.
The output excerpts after this section are copied from the real run.

### P1: one props object, two ways to read it

`CardA(props)` reads `props.title` and `props.children` inside its body.
`Card({ title, children })` takes those same fields apart at the parameter boundary.
This combines form 5 (named object properties) with form 11 (a parameter pattern).
Both receive one object, not two positional arguments, and both render the same HTML.

```jsx
function Card({ title, children }) {
  return <section><h2>{title}</h2>{children}</section>
}
```

### P2: children is a field in that object

`<Card title="Study">Practice</Card>` and
`<Card title="Study" children="Practice" />` render identically.
In the JS conflict experiment, nested content wins over the children attribute:
`<Card children="Attribute">Nested</Card>` renders Nested.
TypeScript rejects that spelling with TS2710, so the TS runnable file does not
include the rejected expression. It is recorded in `compiler-diagnostics.txt`.
Children is part of props; separating it is a useful convention, not a second
argument that React supplies.

### P3: the value of children matters

A string becomes text, a number such as 0 also becomes text, and an element becomes
its HTML. Several elements render in sequence. Undefined, null and false add no
visible content; the surrounding section and heading still render.

A function is different: React does not call an arbitrary function child for us.
The JS raw-function experiment logs React's actual diagnostic and renders no child
content. A render-prop component instead explicitly calls `children(25)` and renders
its returned element:

```jsx
function RenderCard({ children }) {
  return <section>{children(25)}</section>
}
```

The TS type for this API is `{ children: (minutes: number) => ReactNode }`.
That is a different contract from `children?: ReactNode`.
The JS example temporarily redirects console.error to console.log so the real
React diagnostic is included in output.txt, and restores it in finally.
The `%s` markers in that captured diagnostic are React's raw logging arguments.

### P4: separate component props, forward DOM props

```jsx
function RestFirst({ title, children, ...rest }) {
  return <section {...rest} title={title}>{children}</section>
}
```

Title and children are consumed by the component; id and data-topic remain in rest.
The section receives the remaining fields through expression spread.
Only valid DOM attributes should be forwarded; custom component-only fields should
be extracted first. In TS, `ComponentProps<'section'>` supplies DOM prop types.

A later explicit title overrides an earlier spread title. A later spread title
overrides an earlier explicit title. There is no title collision inside RestFirst
itself, because destructuring has already removed title from rest. RestLast uses
a distinct heading prop to make the spread collision observable.

### P5: named slots or composition

Slots accepts header, footer and children. Header and footer are ordinary named
props; children is the body content supplied between the tags. The component owns
the header/main/footer structure. Choose this when a consistent layout matters.

Composition accepts only children and wraps it in article. The caller supplies
header, main and footer elements in the desired order. Choose this when callers
need flexible structure. Both versions render the same HTML in this example,
but their responsibilities differ. Neither approach is automatically better.


Runnable API definitions (the complete JSX calls are in both props source files):

```jsx
function Slots({ header, footer, children }) {
  return <article><header>{header}</header><main>{children}</main><footer>{footer}</footer></article>
}
function Composition({ children }) {
  return <article>{children}</article>
}
```

### P6: undefined triggers a default, null does not

`function DefaultCard({ title = 'Free practice' })` uses a property default.
Undefined produces `<h2>Free practice</h2>`; null produces `<h2></h2>`.
In TS the prop is `title?: string | null` so both experiments are permitted.
A default does not normalize every empty value. If the design should replace
both null and undefined, an explicit `title ?? 'Free practice'` would do that.

### P7: three useful props types

`{ title: string; children?: ReactNode }` requires title and permits optional
renderable children, including text, numbers, elements, null and booleans.
It rejects an ordinary function child; functions need a separate render-prop type.
It also rejects an arbitrary object such as `{ topic: 'read' }` as rendered content.

`PropsWithChildren<{ title: string }>` adds optional ReactNode children to the
named props. It does not make title optional or require children to be supplied.
Our Composition uses `PropsWithChildren` without additional required props.

`ComponentProps<'button'>` reuses the native button props contract, including
children, disabled, type and event handler types. TypedButton forwards the remaining
props after extracting children. It accepts type="button" and disabled, and rejects
href because a button is not an anchor. Server-rendered output shows the disabled
attribute; an event callback would require a browser interaction to demonstrate.

The real rejected cases and full messages are in `compiler-diagnostics.txt`:
TS2322 for a function child, TS2353 for an object child, TS2322 for href on a button,
and TS2710 for children specified twice. The probes ran separately from the valid
project; no extra suppressions were added to make them pass.


Typed API definitions from ts/props.tsx:

```tsx
type CardProps = { title: string; children?: ReactNode }
function Composition({ children }: PropsWithChildren) {
  return <article>{children}</article>
}
function TypedButton({ children, ...rest }: ComponentProps<'button'>) {
  return <button {...rest}>{children}</button>
}
```

### Actual React output (JavaScript)


```text
pitfall 1: TypeError: Cannot destructure property 'minutes' of 'undefined' as it is undefined.
pitfall 2: null
pitfall 3 invalid: SyntaxError: Unexpected token '='
pitfall 3 fixed: 25
pitfall 4: Library C s1 s2
pitfall 5 object: React practice planned
pitfall 5 array: planned React practice
P1 object: <section><h2>Study</h2>Closures</section>
P1 pattern: <section><h2>Study</h2>Closures</section>
P2 nested: <section><h2>Study</h2>Practice</section>
P2 attribute: <section><h2>Study</h2>Practice</section>
P2 both: <section><h2>Study</h2>Nested</section>
P3 string: <section><h2>Study</h2>Read</section>
P3 string zero: <section><h2>Study</h2>0</section>
P3 numeric zero: <section><h2>Study</h2>0</section>
P3 element: <section><h2>Study</h2><strong>Code</strong></section>
P3 several: <section><h2>Study</h2><b>Read</b><i>Code</i></section>
P3 undefined: <section><h2>Study</h2></section>
P3 null: <section><h2>Study</h2></section>
P3 false: <section><h2>Study</h2></section>
P3 diagnostic: Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it. children children
P3 raw function: <section><h2>Study</h2></section>
P3 invoked function: <section><b>25 min</b></section>
P4 separated: <section id="s1" data-topic="props" title="Session">Read</section>
P4 explicit last: <section title="Explicit">Read</section>
P4 spread last: <section title="Spread">Read</section>
P5 slots: <article><header><h2>Plan</h2></header><main><p>Read</p></main><footer><small>Done</small></footer></article>
P5 composition: <article><header><h2>Plan</h2></header><main><p>Read</p></main><footer><small>Done</small></footer></article>
P6 undefined: <h2>Free practice</h2>
P6 null: <h2></h2>
P7 JS: No static props type checking; see ts/props.tsx and compiler probes.
```

### Actual P7 TypeScript output

```text
P7 ReactNode: <section><h2>Typed</h2>7</section>
P7 PropsWithChildren: <article><em>Review</em></article>
P7 ComponentProps: <button type="button" disabled="">Start</button>
```

## JavaScript vs TypeScript

The runtime selection rules stay the same. These errors came from intentional
compiler experiments, saved with their source in compiler-diagnostics.txt.

| Form/topic | Same at runtime | Type information or handling | Actual error when wrong |
|---|---|---|---|
| 1, tuple return | Positions select values | Return `[number, string]` | TS2339: toUpperCase does not exist on number |
| 2, skipped array item | An absent position yields undefined | Narrow `string \| undefined` | TS18048: first is possibly undefined |
| 3, swap | RHS is read before assignments | Compatible destination types | TS2322: string is not assignable to number |
| 6, rename | Colon selects a new variable name | Annotation after the pattern | TS2339: toUpperCase does not exist on number |
| 7, default | Null survives the default | Include null, then narrow it | TS18047: minutes is possibly null |
| 8, rest/source fields | Only source fields can be extracted | Describe available properties | TS2339: missing does not exist on the source type |
| 9, nesting | The nested source must exist | Guard an optional room | TS2339: label does not exist on room-or-undefined |
| 10, computed key | The key expression selects a property | Use keyof the source type | TS2322: unknown is not assignable to minutes |
| 11, options default | Empty argument defaults to an object | Fields must allow `{}` | TS2741: title is missing in type {} |
| 12, entry loop | Each iteration supplies a pair | Record and Map value types | TS2339: toUpperCase does not exist on number |
| P7, children | Props remain one runtime object | ReactNode or a render-function signature | TS2322: function is not assignable to ReactNode |

## Verification and remaining work

Node.js 22.23.3, npm 10.9.9. Both npm run all and npm run check passed.
output.txt is the actual current run. compiler-diagnostics.txt contains separately
collected intentional failures, not failures hidden in the project check. Reproduce them with `node tools/check-probes.cjs`.

The guided-review log below records actual predictions and results from the discussion. It includes five wrong-prediction cases (entries 1, 2, 4, 6 and 7), plus correct follow-up comparisons (3 and 5). The student should review the complete guide and practise explaining the code independently. No optional bonuses are claimed.

## Bonus 2: Depth

These are additional investigations, not just a list of syntax forms. The complete
experiments are in `js/depth.mjs` and `ts/depth.ts`; run `npm run depth`.
Actual output is in `depth-output.txt` and is also included by `npm run all`.
These assistant-run experiments are separate from the student's personal log.

### D1: an array pattern consumes an iterator

A string, Set, Map and generator all supply iterators. A Set removes duplicates
and yields its remaining values in insertion order. A Map yields entry pairs,
so the nested pattern first takes an entry and then its key and value.

The string experiment distinguishes string iteration from indexed length:
`'🧠A'.length` is 3 UTF-16 code units, but the iterator yields two code points.
Consequently `[symbol, letter]` receives the brain symbol and A. This does not
mean string iteration splits user-perceived grapheme clusters: combining marks
and multi-code-point emoji can still occupy several iterations.

The generator experiment logs start and closed, but never logs second yield
reached. The pattern only requests its first value and then closes the iterator;
the generator's finally block runs. Rest would instead consume the remaining
values, so applying rest to an infinite generator would never finish.

The object with index 0 and length 1 is array-like but supplies no iterator.
Its failure demonstrates why an array pattern is not just syntactic indexing.
This interpretation follows the specification's iterator binding initialization
and iterator-closing rules, rather than treating every object as an array.

### D2: defaults are lazy and dependencies have an order

The three default expressions are calls to the same counter-incrementing function.
The values 0 and null do not trigger defaults; undefined does. The result is
`0 30 null 1`, including exactly one function call. With an earlier binding,
`[work = 40, pause = work / 5]` produces 40 and 8. Reading a later uninitialized
binding throws a ReferenceError instead of waiting for its default to be assigned.

A second experiment uses getters. Although minutes appears first in the source
object, the pattern asks for title first. The logged order is title, minutes.
The default runs only after the minutes getter returns undefined. The final call
count is 2 because the earlier experiment had already called fallback once.
The source object's insertion order does not override the explicit pattern order.

### D3: assignments, catch, and loop inputs

`[destination.minutes, destination.pause] = [40, 8]` writes existing object
properties; it does not declare variables called destination.minutes.
The parentheses-free array assignment is preceded by a semicolon for safe parsing.
`catch ({ message })` extracts the message from the Error object we deliberately
throw. It is not a universally safe catch pattern: JavaScript can throw null or
other values, so unknown exceptions should usually be checked before destructuring.

The for...in loop prints the array's enumerable index keys 0 and 1. The for...of
loop prints its values arrays and props. Destructuring cannot compensate for
choosing a loop that supplies the wrong kind of input.

### D4: type-level extraction is not runtime destructuring

First uses `infer Head` in a conditional tuple type; Rest uses `infer Tail`.
The readonly prefix permits input from an as-const tuple. For our tuple, First is
the literal type 40 and Rest is the tuple type ['closures', true]. Rest itself is
not readonly in this particular utility. The annotations check the values assigned
to the variables; they do not create or slice runtime arrays.

The utility is deliberately limited to non-empty tuple shapes. `First<[]>` and
`First<string[]>` are never here, since neither type promises an initial position.
`Rest<[]>` is []. A different definition would be needed for arbitrary arrays.
`Parameters<typeof planSession>` extracts `[topic: string, minutes: number]`;
the runtime spread passes those two argument values to the existing function.
These features are checked by TypeScript and erased before execution.

### D5: a readability refactoring with a defined behavior change

The compact nested pattern aliases student and duration in one line. It works for
the complete plan but fails when owner is absent. The readable function names the
intermediate objects, checks missing values, and returns Incomplete plan. Both
versions print Tuba: 40 min for the valid input. For the missing input, the compact
version throws while the readable version handles it. This is a robustness change
as well as a readability refactoring; they are not equivalent for all inputs.
No speed claim is made: these tiny runs are not a performance benchmark.

### Complete runnable JavaScript investigation

```js
// Tuba Nazlı İpekyüz — 2200004532
// Bonus 2: investigate iterator behavior, evaluation order and readability.
const [symbol, letter] = '🧠A'
console.log('depth string:', symbol, letter, '🧠A'.length)
const [firstUnique, ...otherUnique] = new Set(['arrays', 'arrays', 'props'])
console.log('depth Set:', firstUnique, JSON.stringify(otherUnique))
const [[day, minutes]] = new Map([['Monday', 40]])
console.log('depth Map:', day, minutes)
function* planned() {
  try {
    console.log('depth generator: start')
    yield 'arrays'
    console.log('depth generator: second yield reached')
    yield 'props'
  } finally {
    console.log('depth generator: closed')
  }
}
const [onlyFirst] = planned()
console.log('depth generator result:', onlyFirst)
// This is array-like but not iterable: an array pattern requires an iterator.
try {
  const [value] = { 0: 'arrays', length: 1 }
  console.log(value)
} catch (error) {
  console.log('depth array-like:', error.name + ': ' + error.message)
}

let calls = 0
function fallback() { calls++; return 30 }
const [zero = fallback(), missing = fallback(), explicitNull = fallback()] = [0, undefined, null]
console.log('depth lazy defaults:', zero, missing, explicitNull, calls)
const [work = 40, pause = work / 5] = []
console.log('depth earlier default:', work, pause)
try {
  const [early = later, later = 2] = []
  console.log(early, later)
} catch (error) {
  console.log('depth later default:', error.name + ': ' + error.message)
}
const reads = []
const settings = {
  get minutes() { reads.push('minutes'); return undefined },
  get title() { reads.push('title'); return 'React' }
}
const { title, minutes: duration = fallback() } = settings
console.log('depth getter order:', JSON.stringify(reads), title, duration, calls)

const destination = { minutes: 0, pause: 0 }
;[destination.minutes, destination.pause] = [40, 8]
console.log('depth targets:', JSON.stringify(destination))
try { throw new Error('Session unavailable') }
catch ({ message }) { console.log('depth catch:', message) }
const topics = ['arrays', 'props']
for (const index in topics) console.log('depth for-in:', index)
for (const topic of topics) console.log('depth for-of:', topic)

// A compact nested pattern can fail at an intermediate missing object.
function compact(plan) {
  const { owner: { name: student }, sessions: [{ minutes: duration }] } = plan
  return `${student}: ${duration} min`
}
function readable(plan) {
  const owner = plan.owner
  const firstSession = plan.sessions?.[0]
  if (owner == null || firstSession == null) return 'Incomplete plan'
  return `${owner.name}: ${firstSession.minutes} min`
}
const completePlan = { owner: { name: 'Tuba' }, sessions: [{ minutes: 40 }] }
console.log('depth compact:', compact(completePlan))
console.log('depth readable:', readable(completePlan))
try { console.log(compact({ sessions: [] })) }
catch (error) { console.log('depth compact missing:', error.name + ': ' + error.message) }
console.log('depth readable missing:', readable({ sessions: [] }))
```

### Complete TypeScript investigation

```ts
// Tuba Nazlı İpekyüz — 2200004532
// Bonus 2: type-level tuple extraction, distinct from runtime destructuring.
export {}
type First<T extends readonly unknown[]> = T extends readonly [infer Head, ...unknown[]] ? Head : never
type Rest<T extends readonly unknown[]> = T extends readonly [unknown, ...infer Tail] ? Tail : []
const session = [40, 'closures', true] as const
const first: First<typeof session> = session[0]
const rest: Rest<typeof session> = [session[1], session[2]]
console.log('depth TS infer:', first, JSON.stringify(rest))
function planSession(topic: string, minutes: number): string {
  return `${topic}: ${minutes} min`
}
const argumentsForPlan: Parameters<typeof planSession> = ['props', 25]
console.log('depth TS Parameters:', planSession(...argumentsForPlan))
// An ordinary possibly-empty array does not guarantee a first tuple position.
type EmptyFirst = First<[]>
type ArrayFirst = First<string[]>
// Both aliases are never for this non-empty-tuple utility. No value is invented.
const emptyRest: Rest<[]> = []
console.log('depth TS empty Rest:', JSON.stringify(emptyRest))
// Keep the limitation explicit; this utility is for tuples, not arbitrary arrays.
```

### Actual depth output

```text
> destructuring-guide@0.0.0 depth
> node js/depth.mjs && tsx ts/depth.ts

depth string: 🧠 A 3
depth Set: arrays ["props"]
depth Map: Monday 40
depth generator: start
depth generator: closed
depth generator result: arrays
depth array-like: TypeError: {(intermediate value)(intermediate value)} is not iterable
depth lazy defaults: 0 30 null 1
depth earlier default: 40 8
depth later default: ReferenceError: Cannot access 'later' before initialization
depth getter order: ["title","minutes"] React 30 2
depth targets: {"minutes":40,"pause":8}
depth catch: Session unavailable
depth for-in: 0
depth for-in: 1
depth for-of: arrays
depth for-of: props
depth compact: Tuba: 40 min
depth readable: Tuba: 40 min
depth compact missing: TypeError: Cannot read properties of undefined (reading 'name')
depth readable missing: Incomplete plan
depth TS infer: 40 ["closures",true]
depth TS Parameters: props: 25 min
depth TS empty Rest: []
```

References: [ECMAScript iterator binding initialization](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-destructuring-binding-patterns-runtime-semantics-iteratorbindinginitialization), [TypeScript conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html), [Parameters utility](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype).

## Bonus 3: Real code

The five cases below come from three sources: the instructor's Assignment 3 Task
Manager starter (`Downloads/starter.zip`, not my completed Assignment 3), the
installed TypeScript 5.8.3 package, and TanStack Query at immutable revision
`36dd7927c85ce6cee37ab1eb3af25e7fc7ccbb14`. Source line numbers refer to those exact
copies. Extracted evidence and SHA-256 identifiers are in
`references/source-excerpts.txt`; full third-party projects are not redistributed.
The expansions are explanations of the selected operations, not replacement
projects. In particular, React hooks must still be called once at the component's
top level.

### Case 1: TaskRow receives one props object

Source: Assignment 3 starter, `starter/src/TaskRow.tsx`, line 5.

```tsx
export default function TaskRow({ task, onNext, onDelete }: TaskRowProps) {
```

Forms: 5 and 11. Expanded parameter access:

```tsx
export default function TaskRow(props: TaskRowProps) {
  const task = props.task
  const onNext = props.onNext
  const onDelete = props.onDelete
  // The original return body follows unchanged.
}
```

Task, onNext and onDelete are named props supplied by TaskList. There is no
children field in TaskRowProps, and the component does not read children.
The text Next and Delete belongs to the inner button elements' children;
it is not content passed to TaskRow. At the call site, key={t.id} is React's
special list identity rather than an ordinary field available as props.key.
The short parameter pattern makes this small component's dependencies visible.

### Case 2: useReducer returns a pair

Source: Assignment 3 starter, `starter/src/App.tsx`, line 37.

```tsx
const [tasks, dispatch] = useReducer(taskReducer, [])
```

Form: 1. Expanded:

```tsx
const reducerResult = useReducer(taskReducer, [])
const tasks = reducerResult[0]
const dispatch = reducerResult[1]
```

Tasks is the current state; dispatch is the action-dispatching function. Their
positions carry the meaning, not their chosen names. Calling useReducer twice
would not be an equivalent expansion: it would create two hook instances.
Imports in this file use named-import syntax, which should not be counted as an
object destructuring example despite the similar braces.

### Case 3: a library helper extracts pattern fields

Source: `node_modules/typescript/lib/typescript.js`, version 5.8.3,
lines 3631–3633; same function is visible in the
[versioned package](https://unpkg.com/typescript@5.8.3/lib/typescript.js).

```js
function patternText({ prefix, suffix }) {
  return `${prefix}*${suffix}`;
}
```

Forms: 5 and 11. Expanded:

```js
function patternText(pattern) {
  const prefix = pattern.prefix
  const suffix = pattern.suffix
  return `${prefix}*${suffix}`
}
```

This helper builds text for a wildcard pattern. The object fields describe the
parts surrounding the wildcard; they are not arguments passed separately.
Neither version accepts a null or undefined pattern. Here the two-field pattern
is short and clear enough that I would keep it.

### Case 4: a dense library pattern I would simplify

Source: TypeScript 5.8.3, `node_modules/typescript/lib/typescript.js`, line 4872,
inside tryParseComponents. The preceding lines check that the regular expression
match exists.

```js
const [, major, minor = "0", patch = "0", prerelease = "", build2 = ""] = match;
```

Forms: 2 (skip), 4 (defaults). Expanded:

```js
const major = match[1]
const minor = match[2] === undefined ? '0' : match[2]
const patch = match[3] === undefined ? '0' : match[3]
const prerelease = match[4] === undefined ? '' : match[4]
const build2 = match[5] === undefined ? '' : match[5]
```

The first match element is the whole matched text, so the leading comma skips it.
Optional capture groups receive defaults. In this location, the destructuring
makes review harder: five positional groups and a skipped whole match require
counting commas and consulting the regex. I would use named capture groups or
extract a documented parsing helper in hand-maintained code. The emitted build2
name is also less descriptive than buildMetadata, although editing generated
library output itself would be inappropriate. The expansion assumes an ordinary
RegExp match array with stable indexed values, which is what this function uses.

### Case 5: an open-source hook result

Source: TanStack Query,
[examples/react/simple/src/index.tsx, lines 21–30](https://github.com/TanStack/query/blob/36dd7927c85ce6cee37ab1eb3af25e7fc7ccbb14/examples/react/simple/src/index.tsx#L21-L30).

```tsx
const { isPending, error, data, isFetching } = useQuery({
  // The original query options and query function follow here.
})
```

Form: 5. Expanded access, preserving one hook call:

```tsx
const query = useQuery({
  // Keep the original options unchanged.
})
const isPending = query.isPending
const error = query.error
const data = query.data
const isFetching = query.isFetching
```

This is not destructured props: it takes fields from a hook's return object.
The component checks pending and error states before rendering data and separately
uses isFetching for an updating indicator. Runtime property selection is the same
in the expansion. TypeScript narrowing can depend on retaining related fields
from a discriminated result together; the clearest typed rewrite can instead keep
query.isPending and query.data on the query object. I would retain the original
short destructuring here. The queryFn's network request was inspected as source,
not run as part of this assignment's deterministic examples.

## Sources and assistance

The starter project and assignment handout supplied the required structure.
The example theme and runnable files were developed with AI assistance; the log
separates my predictions from runs performed by the assistant on this computer.
The following references were consulted to check behavior, not copied as examples:

- [MDN: Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring): defaults and source-value rules.
- [TypeScript Handbook: Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html): property patterns, optional fields, tuples and readonly tuples.
- [React: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component): one props object, children and defaults.
- [React DOM: Common components](https://react.dev/reference/react-dom/components/common): renderable children values.
- [React: Render Props](https://legacy.reactjs.org/docs/render-props.html): explicitly called function props.

## Submission contents

Submit one assignment4 folder inside the ZIP, without node_modules. The guide,
source files, package files, tsconfig.json, output.txt and compiler-diagnostics.txt
are included. Install dependencies again with npm install after extracting.
Optional LaTeX, depth, real-project analysis and repository bonuses are not claimed.

## My own log

These notes record my predictions and corrections during a guided review with
an AI assistant. The assistant ran the project on this computer; I discussed the
examples and their recorded results. These include actual wrong predictions, surprises and correct follow-up answers,
not claims that I independently ran into compiler errors. The exact runtime and
compiler diagnostics from the experiments appear above and in the output files.

### 1. I expected the default function to run

In the guided-review experiment in `js/default-review.mjs`, I expected fallback()
to run. What surprised me was that it did not. The assistant ran the example on
this computer and the real output was `0 0`: minutes stayed 0 and calls stayed 0.
I did not understand this rule clearly before the experiment: a destructuring
default is used only when the property is missing or its value is undefined.
Since 0 is an existing value, the default expression is not evaluated at all.
There was no error message. The lesson is not only that 0 is preserved, but that
a function used as the default will not be called unless that default is needed.

```js
let calls = 0
function fallback() {
  calls++
  return 30
}
const { minutes = fallback() } = { minutes: 0 }
console.log(minutes, calls)
```

Run separately with `node js/default-review.mjs`. Actual output:

```text
0 0
```
### 2. I expected renaming to change the existing title variable

For the experiment in `js/rename-review.mjs`, I predicted that both console.log
calls would print React çalışması. I thought the destructuring assignment had
made the two variables equal, so the existing title would change too. The assistant
ran the example on this computer. The actual output was:

```text
Haftalık plan
React çalışması
```

```js
const title = 'Haftalık plan'
const session = { title: 'React çalışması' }
const { title: heading } = session
console.log(title)
console.log(heading)
```

In this declaration, title inside the pattern selects the source property;
heading is the new binding. It is equivalent to `const heading = session.title`.
It does not assign anything to the existing title variable, which keeps Haftalık
plan. There was no error message. The distinction I needed to make was between
selecting a property by its name and assigning to an existing variable of that name.
Run separately with `node js/rename-review.mjs`.

### 3. I compared a number with a shared nested object

In the guided-review example in `js/reference-review.mjs`, I correctly predicted
40 and B for the final two console.log calls. My reasoning was that minutes
received 40 at the destructuring step, session.minutes was later set to 60, and
the room label was later set to B. The distinction clarified in the discussion
was that changing session.minutes does not reassign the separate minutes binding,
whereas room and session.room refer to the same nested object.

```js
const session = {
  minutes: 40,
  room: { label: 'A' }
}
const { minutes, room } = session
session.minutes = 60
room.label = 'B'
console.log(minutes)
console.log(session.room.label)
```

The assistant ran the example on this computer. Actual output:

```text
40
B
```

This comparison helped clarify why destructuring is not a deep copy: a number
binding keeps the value it received, while a nested object reference still points
to the source's object. There was no error message. Run separately with
`node js/reference-review.mjs`.

### 4. I overlooked the zero passed to a conditional child

In the guided-review example below, I predicted that Çalışma var would appear.
I then explained that I had not noticed count={0} in the component usage; I knew
that && short-circuits on a falsy left operand, but overlooked this input.

```jsx
function Session({ count }) {
  return <section>{count && <span>Çalışma var</span>}</section>
}
// Rendered usage: <Session count={0} />
```

The assistant rendered the example on this computer. The actual HTML was
`<section>0</section>`. The important distinction is that && returns the operand
0, not the boolean false. React displays numeric 0 as text even though 0 is falsy
in a JavaScript condition. Reading the supplied prop carefully and distinguishing
short-circuit evaluation from React rendering explains the result.

In `js/children-review.jsx`, the revised condition is
`count > 0 && <span>Çalışma var</span>`. With count=0, that expression returns false,
which React omits from the rendered content. There was no error message.
Run separately with `npx tsx js/children-review.jsx`. Actual output:

```text
original: <section>0</section>
checked: <section></section>
```

### 5. I traced a function child and its returned element

In the guided review, I described children as a function and distinguished it from
children(). For this example that distinction was correct: children holds the
function, while the call returns a React element. The discussion clarified the
terminology: children(2) is a call expression, not a second function. This entry
records an examined example, not a claim that my original distinction was wrong.
In the follow-up below, I correctly identified that children(2) calls the function,
and correctly calculated 5 for number + 3.

```jsx
function Card({ children }) {
  return <section>{children(2)}</section>
}
// Rendered usage:
<Card>{number => <strong>{number + 3}</strong>}</Card>
```

The assistant rendered the example on this computer. Actual HTML:

```html
<section><strong>5</strong></section>
```

React does not automatically invoke an ordinary function child. This component
explicitly calls the supplied function and renders its returned element. The
function-child API needs a TS signature such as
`{ children: (number: number) => ReactNode }`, rather than ordinary ReactNode children.
There was no error message for this example. Run separately with
`npx tsx js/function-review.jsx`.


### 6. I predicted the wrong length for a destructured string property

For `const { length } = 'React'; console.log(length)`, I predicted 2.
I later explained that I had been thinking of React as one whole word rather
than considering its individual characters. I had not distinguished word count
from string length when interpreting the example.
The assistant ran the experiment on this computer and the actual result was 5.
The object pattern reads the named length property of the string through temporary
object wrapping; it does not count variables in the pattern. React contains five
ASCII characters, so its length is 5. String length counts UTF-16 code units in
general, which need not equal the number of visible characters. This case showed
that an object pattern can read a property from a non-null primitive value too.
There was no error message. The runnable case is in `js/edge-review.mjs`.

### 7. I expected a later default binding to be available

For `const [a = b, b = 2] = []`, I predicted b for a and 2 for b.
The assistant ran the experiment on this computer. Instead of printing values,
it threw the exact error:

```text
ReferenceError: Cannot access 'b' before initialization
```

The first missing position triggers a's default immediately. At that moment b
has not been initialized, so evaluation stops before b can receive 2. The right
side of a default is an expression evaluated at that step, not a promise that a
later binding will be filled in first. This is the temporal dead zone for a lexical
binding. Reversing the dependency makes it valid:

```js
const [b = 2, a = b] = []
console.log(a, b) // actual output: 2 2
```

Both the caught failure and the working version are in `js/edge-review.mjs`.
Their actual output, included in the complete npm run all output, is:

```text
review string length: 5
review later binding: ReferenceError: Cannot access 'b' before initialization
review earlier binding: 2 2
```


