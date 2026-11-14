# Destructuring Field Guide

Name: Tuba Nazlı İpekyüz  
Student number: 2200004532

Bonuses claimed: none yet.

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


