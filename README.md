# Destructuring Field Guide

Name: Tuba Nazlı İpekyüz  
Student number: 2200004532

Bonuses claimed: **Bonus 1: LaTeX**, **Bonus 2: Depth**, **Bonus 3: Real code**. **Bonus 4: Git repository** is included with a public repository, as requested by the instructor.

This guide uses a study-session planner. I used AI help to prepare the code and
explanations. I still need to review and explain the work myself before submission.
The project includes forms 1–12, five pitfalls, T1–T5 and P1–P7. They were checked.

## Run

Requires Node.js 20.19 or newer.

```sh
npm install
npm run all
npm run check
npm run diagnose # separate intentional compiler failures
```

`output.txt` saves the real output of this project. JS and TS print the same
values for forms 1–12. `npm run all` also runs the review and extra examples.

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

**Use it when:** a function returns a few values in a fixed order.

**Watch out:** The first name gets the first value. The second name gets the second value.
Names do not choose the positions. Without destructuring, save the result once
and read `result[0]` and `result[1]`. In TS, `[number, number]` says both items exist.

### Form 2: skip and rest

**Syntax:** `const [, nextTopic, ...laterTopics] = topics`

**Example** (`js/arrays.mjs`):

```js
const topics = ['arrays', 'objects', 'parameters', 'props']
const [, nextTopic, ...laterTopics] = topics
console.log('form 2:', nextTopic, JSON.stringify(laterTopics))
```

**Output:** `form 2: objects ["parameters","props"]`

**Use it when:** you need one item and all the items after it.

**Watch out:** Rest must come last. It makes a new array and does not change topics.
For this example, use `topics[1]` and `topics.slice(2)` without destructuring.
With `noUncheckedIndexedAccess`, nextTopic has type `string | undefined`.
The array may not have a second item.

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

**Use it when:** you want to swap two variables.

**Watch out:** Use let variables because their values must change. The first semicolon keeps
this line separate from the previous line. Without destructuring, save morning
in a temporary variable before changing it. In TS, the new value must fit the
type of the variable that receives it.

### Form 4: array defaults

**Syntax:** `const [duration = 30, reminder = 'enabled', rounds = 2] = settings`

**Example** (`js/arrays.mjs`):

```js
const settings = [undefined, null]
const [duration = 30, reminder = 'enabled', rounds = 2] = settings
console.log('form 4:', duration, reminder, rounds)
```

**Output:** `form 4: 30 null 2`

**Use it when:** a missing array item should use a default value.

**Watch out:** A default is used for undefined or when no item was given. It is not used for
null. Without destructuring, check each item with `=== undefined`.
The TS example uses a two-item tuple for the first two values. It uses a separate
empty `number[]` for rounds, so it does not read past the end of that tuple.

### Form 5: properties by name

**Syntax:** `let { title, status } = session`

**Example** (`js/objects.mjs`, typed version in `ts/objects.ts`):

```js
const session = { id: 's1', title: 'Review closures', status: 'planned' }
let { title, status } = session
console.log('form 5:', title, status)
```

**Output:** `form 5: Review closures planned`

**Use it when:** you need several properties from one object.

**Watch out:** Object patterns use property names. The order of the properties does not matter.
Without destructuring, write `let title = session.title` and
`let status = session.status`. Changing these string variables does not change session.

### Form 6: rename

**Syntax:** `const { title: heading } = session`

**Example** (`js/objects.mjs`, using the session from form 5):

```js
const { title: heading } = session
console.log('form 6:', heading)
```

**Output:** `form 6: Review closures`

**Use it when:** you want a clearer name or the property name is already in use.

**Watch out:** This creates heading. It does not create another variable named title.
It means `const heading = session.title`. The colon changes the local name in
both JS and TS. To add a type in TS, write it after the whole pattern.

### Form 7: object defaults

**Syntax:** `const { minutes = 40 } = options`

**Example** (`js/objects.mjs`):

```js
const { minutes = 40 } = {}
const { minutes: explicitNull = 40 } = { minutes: null }
console.log('form 7:', minutes, explicitNull)
```

**Output:** `form 7: 40 null`

**Use it when:** an optional property should use a default value.

**Watch out:** Defaults replace undefined or missing values, never null.
The source cannot be null. In TS, null stays allowed after a default.
Without destructuring, check `=== undefined` before using 40.

### Form 8: object rest

**Syntax:** `const { id, ...details } = session`

**Example** (`js/objects.mjs`, using the session from form 5):

```js
const { id, ...details } = session
console.log('form 8:', id, JSON.stringify(details))
```

**Output:** `form 8: s1 {"title":"Review closures","status":"planned"}`

**Use it when:** you want to keep id separate from the other properties.

**Watch out:** Object rest makes a new object. It copies the remaining own enumerable
properties: the object's own properties that are marked for enumeration.
It does not make separate copies of objects inside those properties.
For our plain object, read id separately and put title and status in a new object.
Rest collects properties into an object. Spread uses those properties in an expression.

### Form 9: nested patterns

**Syntax:** `const { room: { label }, topics: [firstTopic] } = plan`

**Example** (`js/objects.mjs`):

```js
const plan = { room: { label: 'Library B' }, topics: ['closures', 'props'] }
const { room: { label }, topics: [firstTopic] } = plan
console.log('form 9:', label, firstTopic)
```

**Output:** `form 9: Library B closures`

**Use it when:** you need values inside an object or array.

**Watch out:** This creates label and firstTopic, not room or topics. If room is missing,
reading label throws an error. Without destructuring, read `plan.room.label`
and `plan.topics[0]`. In TS, firstTopic may still be undefined because topics can be empty.

### Form 10: computed property

**Syntax:** `const { [key]: selectedValue } = session`

**Example** (`js/objects.mjs`, using the session from form 5):

```js
const key = 'status'
const { [key]: selectedValue } = session
console.log('form 10:', key, selectedValue)
```

**Output:** `form 10: status planned`

**Use it when:** a variable holds the name of the property you need.

**Watch out:** `[key]` uses the value stored in key. Without brackets, key would mean a
property named key. The plain version is `const selectedValue = session[key]`.
In TS, `keyof Session` limits the variable to known property names.

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

**Use it when:** a function takes named options or a small tuple.

**Watch out:** The outer `= {}` handles a missing argument. The inner defaults handle missing
properties. Neither replaces null. Without the pattern, receive `options = {}`
and read the properties inside the function. In TS, put `: Options` after the
pattern. Its properties must be optional for the default `{}` to work.

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

**Use it when:** you need both the key and value in a loop.

**Watch out:** Use for...of to read entries. A for...in loop gives property names instead.
Without destructuring, store each pair in entry and read entry[0] and entry[1].
The TS example uses `Record<string, number>` for the object and
`Map<string, number>` for the Map.

## Pitfalls

The examples are in `js/pitfalls.mjs`. The invalid syntax is tested with
`new Function` and its error is caught. This lets the rest of the file run.

1. You cannot take properties from undefined. The actual output was
   `pitfall 1: TypeError: Cannot destructure property 'minutes' of 'undefined' as it is undefined.`
   Check the source first. A parameter default can handle undefined, but not null.
   You also cannot take properties from null.
2. A default does not replace null. `{ minutes = 40 } = { minutes: null }`
   printed `pitfall 2: null`. Defaults are only used for undefined or missing values.
3. At the start of a statement, `{` is read as a code block. The attempt without
   parentheses printed `pitfall 3 invalid: SyntaxError: Unexpected token '='`.
   Adding parentheses made it an expression. The fixed version
   `({ minutes: assignedMinutes } = { minutes: 25 })` printed `pitfall 3 fixed: 25`.
4. Two variables can point to the same object. Changing room.label changed the
   original room. Changing the string id in the rest object did not change the
   original id. The result was `pitfall 4: Library C s1 s2`. Rest is a shallow copy:
   it does not make a separate copy of the nested room object.
5. Object patterns use names. Array patterns use positions. Changing the order of
   object properties still gave `pitfall 5 object: React practice planned`.
   The array gave `pitfall 5 array: planned React practice` because its positions were different.

## TypeScript topics T1–T5

Code: `ts/types.ts`. TypeScript checks types before the code runs.
It does not change how JavaScript takes values from a pattern.

### T1: a colon can rename

`const { minutes: string } = { minutes: 25 }` creates a variable named string.
Its value is 25, so its type is number. The word string here is a name, not a type.
To add a type, write it after the whole pattern:
`const { minutes: duration }: { minutes: number } = ...`.
Actual output: `T1: 25 number 25`.
Calling `string.toUpperCase()` gives TS2339 because numbers do not have that method.

### T2: tuples and as const

`sessionSummary(): [number, string]` returns two items: a number, then a string.
This type is called a tuple. It tells TypeScript the type at each position.
`const fixed = [25, 'props'] as const` gives the type `readonly [25, 'props']`.
It keeps those exact values as types and prevents changing the tuple's positions
through this variable. It does not freeze the array at runtime.
Actual output: `T2: 40 closures 25 props`.

### T3: unchecked array access

A `string[]` can be empty. With noUncheckedIndexedAccess enabled,
`const [first] = topics` gives first the type `string | undefined`.
Before calling a string method, check `first !== undefined`.
Another option is a default: `[safeFirst = 'free practice']`.
Actual output: `T3: undefined free practice`.
Calling the method without a check gives TS18048: `'first' is possibly 'undefined'.`

### T4: optional fields and defaults

The question mark in `minutes?: number` means the property can be missing.
Without a default, the extracted value has type `number | undefined`.
With `minutes = 40`, it has type number.
A default is used when the value is undefined or has not been supplied.
It is not used for null. If null is allowed, it stays in the type and the value.
Actual output: `T4: undefined 40 null`.
Calling a number method on a possibly null value gives
TS18047: `'minutes' is possibly 'null'.`

### T5: wrong property and fix

The source has minutes, but `{ duration: wrongName }` asks for duration.
TypeScript reports TS2339: `Property 'duration' does not exist on type
'{ minutes: number; }'.` The one allowed `@ts-expect-error` marks this example.
The fix is to ask for the existing property: `{ minutes: correctedName }`.
Actual output: `T5: undefined 25`.
The comment lets us demonstrate the error; it does not fix the property lookup.
TypeScript also reports an error if an expect-error comment is no longer needed.

## Props and children P1–P7

Run the examples in `js/props.jsx` and `ts/props.tsx`.
They use `renderToStaticMarkup` to produce HTML as text.
The output below comes from real runs. These runs do not test browser clicks or events.

### P1: one props object, two ways to read it

React passes one props object to each component.
`CardA(props)` reads `props.title` and `props.children` in the function body.
`Card({ title, children })` reads the same properties in the parameter list.
This uses form 5 for object properties and form 11 for function parameters.
Both versions receive one object and produce the same HTML.

```jsx
function Card({ title, children }) {
  return <section><h2>{title}</h2>{children}</section>
}
```

### P2: children is a field in that object

`<Card title="Study">Practice</Card>` and
`<Card title="Study" children="Practice" />` produce the same HTML.
Children is one property inside props. React does not pass it as a second argument.

In the JS example, `<Card children="Attribute">Nested</Card>` displays Nested.
Content between the tags wins when children is also written as an attribute.
TypeScript reports TS2710 for this example. We check that error separately in
`compiler-diagnostics.txt`, so the normal TS file still passes its check.

### P3: the value of children matters

A string appears as text. A number, including 0, also appears as text.
A React element becomes HTML. Several elements appear in order.
Undefined, null and false show no child content. The section and heading still appear.

React does not call a function child for us. The JS example passes a function
without calling it. React logs a warning and shows no child content.
RenderCard works differently: it calls `children(25)` and displays the returned element.

```jsx
function RenderCard({ children }) {
  return <section>{children(25)}</section>
}
```

For this function child, the TS type is
`{ children: (minutes: number) => ReactNode }`.
It is different from ordinary `children?: ReactNode`.
The JS file copies React's warning to stdout so it appears in output.txt.
It restores console.error in finally. The `%s` text is part of React's raw warning.

### P4: separate component props, forward DOM props

```jsx
function RestFirst({ title, children, ...rest }) {
  return <section {...rest} title={title}>{children}</section>
}
```

The pattern takes title and children out of props. The other properties, such as
id and data-topic, stay in rest. `<section {...rest}>` passes them to section.
Only pass valid HTML properties to an HTML element. Take out properties that are
only meant for your own component. TS uses `ComponentProps<'section'>` for the section's types.

If a spread and an explicit property use the same name, the last value wins.
RestFirst already takes title out of rest, so those two values cannot conflict there.
RestLast uses a separate heading property. This lets us test what happens when
rest still contains title: the later spread replaces the earlier title.

### P5: named slots or composition

Slots takes header, footer and children. Header and footer are normal named props.
Children is the body between the tags. Slots creates the header/main/footer layout.
I would use this version when each card should have the same structure.

Composition takes children and puts it inside article. The caller chooses the
elements and their order. I would use it when cards need different structures.
Both versions produce the same HTML in this example. They give control of the layout
to different parts of the code.

These are the functions. Both source files include the full JSX calls:

```jsx
function Slots({ header, footer, children }) {
  return <article><header>{header}</header><main>{children}</main><footer>{footer}</footer></article>
}
function Composition({ children }) {
  return <article>{children}</article>
}
```

### P6: undefined triggers a default, null does not

`function DefaultCard({ title = 'Free practice' })` gives title a default value.
Undefined displays `<h2>Free practice</h2>`. Null displays `<h2></h2>`.
A default is used for undefined or when no value was given. It is not used for null.
The TS type `title?: string | null` allows both tests.
To replace both null and undefined, use `title ?? 'Free practice'` instead.

### P7: three useful props types

`{ title: string; children?: ReactNode }` requires title. Children is optional.
It accepts text, numbers, elements, null and booleans. It does not accept a normal
function child or a plain object such as `{ topic: 'read' }`.
A function child needs its own function type, as in RenderCard.

`PropsWithChildren<{ title: string }>` adds optional ReactNode children.
Title is still required. Children does not become required.
Our Composition uses `PropsWithChildren` without any other required props.

`ComponentProps<'button'>` gives us the usual button prop types.
It includes children, disabled, type and event handlers.
TypedButton takes children out and passes the other props to button.
It accepts type="button" and disabled. It rejects href because href belongs on a link.
The HTML output shows disabled. Testing a click handler would need a browser.

`compiler-diagnostics.txt` has the actual rejected cases:
TS2322 for a function child, TS2353 for an object child, TS2322 for href on a button,
and TS2710 for children written twice. These errors are tested separately.
We did not add more suppression comments to the normal project.

Types and functions from ts/props.tsx:

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

### Extra React experiment: key and a separate ID

React uses key to identify an item. A component cannot read it as a normal prop.
If the component also needs the ID, pass it with a different name, such as itemId.
Both versions run in `npm run all`. The assistant ran this extra experiment;
it is not a new prediction or mistake from me.

JavaScript:

```jsx
function KeyCard(props) {
  console.log('key JS visible fields:', Object.keys(props).sort().join(','))
  const { key, itemId, children } = props
  console.log('key JS read:', String(key))
  return <section data-item-id={itemId}>{children}</section>
}
// Rendered with renderToStaticMarkup:
<KeyCard key="session-1" itemId="session-1">Read</KeyCard>
```

The JS source saves React's warning in stdout, then restores console.error.
The `%s` below comes from that raw warning. Object.keys lists the normal
enumerable properties. Key does not appear in that list.

The typed version uses itemId:

```tsx
type KeyCardProps = { itemId: string; children?: ReactNode }
function KeyCard(props: KeyCardProps) {
  console.log('key TS visible fields:', Object.keys(props).sort().join(','))
  const { itemId, children } = props
  return <section data-item-id={itemId}>{children}</section>
}
// key is allowed by JSX, without being a field of KeyCardProps:
<KeyCard key="session-1" itemId="session-1">Read</KeyCard>
```

Actual output:

```text
key JS visible fields: children,itemId
key JS diagnostic: %s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props) KeyCard
key JS read: undefined
key JS output: <section data-item-id="session-1">Read</section>
key TS visible fields: children,itemId
key TS output: <section data-item-id="session-1">Read</section>
```

The separate tests in `tools/check-probes.cjs` check the types too.
JSX accepts key on KeyCard. But adding key to an object with type
`ComponentProps<typeof KeyCard>` gives TS2353. Reading key from that type gives TS2339.
The full errors are in `compiler-diagnostics.txt`. The normal project passes
`npm run check`.

The fix is to read itemId in our code and let React use key.
See [React's special-props explanation](https://react.dev/warnings/special-props).

## JavaScript vs TypeScript

JS and TS choose the same values when the code runs.
These error examples were tested separately. Their code and full messages are
saved in compiler-diagnostics.txt.

| Form/topic | Same when the code runs | TS type or check | Error in the wrong example |
|---|---|---|---|
| 1, tuple return | Read values by position | Return `[number, string]` | TS2339: toUpperCase does not exist on number |
| 2, skipped array item | A missing item gives undefined | Check `string \| undefined` | TS18048: first is possibly undefined |
| 3, swap | Read the right side first | New values must fit the types | TS2322: string is not assignable to number |
| 6, rename | The colon gives a new name | Put the type after the pattern | TS2339: toUpperCase does not exist on number |
| 7, default | A default does not replace null | Allow null and check for it | TS18047: minutes is possibly null |
| 8, rest/source fields | Read properties the source has | Describe available properties | TS2339: missing does not exist on the source type |
| 9, nesting | The inner object must exist | Check whether room exists | TS2339: label does not exist on room-or-undefined |
| 10, computed key | Use the property name in key | Use keyof for valid property names | TS2322: unknown is not assignable to minutes |
| 11, options default | A missing argument uses {} | Fields must allow `{}` | TS2741: title is missing in type {} |
| 12, entry loop | Each loop step gives a pair | Record and Map value types | TS2339: toUpperCase does not exist on number |
| P7, children | Props is still one object | ReactNode or a render-function signature | TS2322: function is not assignable to ReactNode |

## Verification and review

The checks used Node.js 22.23.3 and npm 10.9.9.
`npm run all` and `npm run check` passed. Output.txt has the real run output.
Compiler-diagnostics.txt has expected errors from separate wrong-code examples.
Run `node tools/check-probes.cjs` to repeat those examples.

The log records my real guesses, surprises and later answers.
It has more than five wrong guesses or surprises. It also says which answers I got right.
It shows where I used AI help and where the assistant ran the code.
I still need to explain the guide in my own words. All four bonuses are included.
The public repository link is below.

## Bonus 1: LaTeX

`latex/main.tex` and `latex/main.pdf` contain the full guide.
They include the twelve forms, pitfalls, React examples, comparison table, bonuses
and personal log. The PDF is not a shorter summary.
It uses listings for code, real LaTeX tables, and a contents page with links.
In PDF code blocks, [U+1F9E0] stands for the brain emoji. The source files and
output files keep the original emoji.

Pandoc 3.14 converts this README to LaTeX. Tectonic 0.17.0 compiles it to PDF.
After installing these tools, run these commands in assignment4:

```sh
pandoc README.md --standalone --shift-heading-level-by=-1 --toc --number-sections --listings --pdf-engine=xelatex --lua-filter=latex/layout.lua -V documentclass=article -V papersize=a4 -V fontsize=10pt -V geometry:margin=22mm -V title="Destructuring Field Guide" -V author="Tuba Nazlı İpekyüz - 2200004532" -V date="" -H latex/style.tex -o latex/main.tex
tectonic --keep-logs --keep-intermediates --outdir latex latex/main.tex
```

Pandoc only writes the TeX source here. Its pdf-engine option chooses a preamble
that supports Unicode. Tectonic then creates the PDF with its XeTeX-based engine.
The first Tectonic run may download the required TeX packages.
VERIFICATION.md records the build and visual checks.
The LaTeX editor can also compile main.tex.
With both tools on PATH, `npm run build:guide` runs these steps and adds the name
and student-number comment to the generated source.

## Bonus 4: Git repository

[https://github.com/naz051223/assignment4-destructuring-field-guide](https://github.com/naz051223/assignment4-destructuring-field-guide)

Owner: [naz051223](https://github.com/naz051223).
The repository is public, as requested by the instructor. It can be read without
a collaborator invitation. The final upload was checked against the local version.

The .gitignore excludes node_modules. The real history shows more than five
meaningful commits across three days, including the final React review.
No earlier commit was redated or replaced.
The latest runnable version passed a clean installation, npm run all and
npm run check. The validation snapshot is recorded in CLEAN-CLONE-CHECK.txt.

## Bonus 2: Depth

These extra examples test how destructuring works.
The full code is in `js/depth.mjs` and `ts/depth.ts`. Run `npm run depth`.
Depth-output.txt has the real output. `npm run all` includes the same examples.
The assistant ran these experiments. They are separate from my personal log.

### D1: an array pattern consumes an iterator

An array pattern reads values through an iterator: a way to get one value at a time.
Strings, Set, Map and generators all provide one.
A Set removes duplicates and keeps insertion order. A Map gives key-value pairs.
The nested pattern in our example takes the first pair, then its key and value.

The string `'🧠A'` gives two values when iterated: the emoji and A. Its length is 3
because string length counts UTF-16 code units, and this emoji uses two units.
Iteration counts code points here. It does not always separate text into visible
characters: a visible character can contain more than one code point.

The generator logs start and closed. It does not reach the second yield.
The pattern asks for one value, then closes the iterator, which runs finally.
A rest pattern would keep reading the remaining values. With an infinite
generator, collecting all remaining values would not finish.

The plain object with index 0 and length 1 has no iterator. Its array pattern
throws a TypeError. Having numbered properties is not enough.

### D2: defaults are lazy and dependencies have an order

The default function increases a counter. Values 0 and null keep their values;
undefined calls the function. The result is `0 30 null 1`: one call, not three.

In `[work = 40, pause = work / 5]`, work is ready before pause uses it.
The result is 40 and 8. Reading a later variable before it is initialized throws
a ReferenceError.

The getter example records when each property is read. The pattern asks for title
first, so the order is title, minutes, even though the object lists minutes first.
The minutes getter returns undefined, so its default runs. The final counter is 2
because the earlier experiment already called the function once.

### D3: assignments, catch, and loop inputs

`[destination.minutes, destination.pause] = [40, 8]` changes existing properties.
It does not declare new variables. The leading semicolon keeps the array assignment
separate from the previous statement.

`catch ({ message })` reads message from the Error object we throw.
It is not safe for every possible thrown value: JavaScript can also throw null.
For unknown errors, check the value before taking its properties.

Our for...in loop gives the array's index keys, 0 and 1. The for...of loop gives
its values, arrays and props. Choose the loop based on which values you need.

### D4: type-level extraction is not runtime destructuring

First and Rest work on types. First finds the first type in a non-empty tuple;
Rest finds the remaining types. The keyword infer names the part that was found.
The readonly pattern also accepts tuples created with as const.

For our tuple, First is the type 40 and Rest is `['closures', true]`.
The resulting Rest type is not readonly in this example. These types check our
variables; they do not create or cut up an array at runtime.

`First<[]>` and `First<string[]>` are never here: neither promises a first item.
`Rest<[]>` is []. This helper is for tuples; ordinary arrays need a different rule.
`Parameters<typeof planSession>` gets the function's parameter types:
`[topic: string, minutes: number]`. The spread passes our two values to the function.
TypeScript removes these type rules before execution.

### D5: a readability refactoring with a defined behavior change

The compact function reads several nested values in one pattern.
It works for the complete plan, but throws when owner is missing.
The longer version uses separate variables and checks missing objects first.
It returns Incomplete plan for missing data.

Both print Tuba: 40 min for the complete plan. They behave differently for missing
data, so the rewrite changes error handling as well as readability.
These small runs do not measure performance, so I do not claim either is faster.

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

These five cases use three sources: the instructor's Assignment 3 starter
(`Downloads/starter.zip`), TypeScript 5.8.3, and TanStack Query.
The TanStack version is commit `36dd7927c85ce6cee37ab1eb3af25e7fc7ccbb14`.
The line numbers refer to those exact versions.
References/source-excerpts.txt keeps the source extracts and SHA-256 hashes
that identify the files. The full outside projects are not included.
Each rewrite shows the same selected code without destructuring.
These are code comparisons, not separate apps. Hooks stay at the component's top level.
Do not call the hook again just to read a second value.

### Case 1: TaskRow receives one props object

Source: Assignment 3 starter, `starter/src/TaskRow.tsx`, line 5.

```tsx
export default function TaskRow({ task, onNext, onDelete }: TaskRowProps) {
  return (
    <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <span style={{ flex: 1 }}>{task.title}</span>
      <em>{task.status}</em>
      <button onClick={onNext}>Next</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  )
}
```

Forms: 5 and 11. Expanded parameter access:

```tsx
export default function TaskRow(props: TaskRowProps) {
  const task = props.task
  const onNext = props.onNext
  const onDelete = props.onDelete
  return (
    <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <span style={{ flex: 1 }}>{task.title}</span>
      <em>{task.status}</em>
      <button onClick={onNext}>Next</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  )
}
```

TaskList passes task, onNext and onDelete as named props. TaskRowProps has no
children field, and TaskRow does not read children. Next and Delete are children
of the inner buttons. They are not children passed to TaskRow.
React uses key={t.id} to identify list items; key is not an ordinary props field.
I would keep this short pattern because it shows which props the component uses.

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

Tasks holds the current state. Dispatch is the function used to send actions.
The first and second positions decide what we receive, not the variable names.
The rewrite calls useReducer once and reads both results from that call.
Calling it twice would create two separate hooks. Named imports also use braces,
but their syntax is different from object destructuring.

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

The function puts * between prefix and suffix. Both values come from one object,
not two separate arguments. Both versions fail if that object is null or undefined.
I would keep the original pattern because two fields are easy to read.

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

The first match item is the whole matched text. The leading comma skips it.
Missing groups use defaults. I find this pattern harder to read because I have
to count positions and check the regular expression to understand each value.
In code I maintain, I would use named groups or a small helper with clear names.
BuildMetadata would also be clearer than build2. This is generated library code,
so I would not edit the installed file itself. The rewrite uses the normal match
array returned by this function's regular expression.

### Case 5: an open-source hook result

Source: TanStack Query,
[examples/react/simple/src/index.tsx, lines 21–30](https://github.com/TanStack/query/blob/36dd7927c85ce6cee37ab1eb3af25e7fc7ccbb14/examples/react/simple/src/index.tsx#L21-L30).

```tsx
const { isPending, error, data, isFetching } = useQuery({
  queryKey: ['repoData'],
  queryFn: async () => {
    const response = await fetch(
      'https://api.github.com/repos/TanStack/query',
    )
    if (!response.ok) throw new Error('Failed to fetch repo data')
    return await response.json()
  },
})
```

Form: 5. Expanded access, preserving one hook call:

```tsx
const query = useQuery({
  queryKey: ['repoData'],
  queryFn: async () => {
    const response = await fetch(
      'https://api.github.com/repos/TanStack/query',
    )
    if (!response.ok) throw new Error('Failed to fetch repo data')
    return await response.json()
  },
})
const isPending = query.isPending
const error = query.error
const data = query.data
const isFetching = query.isFetching
```

These fields come from the object returned by useQuery, not from props.
The rewrite keeps the same options and calls the hook once. The component checks
loading and errors before showing data, and uses isFetching for Updating....
The same values are selected at runtime. In typed code, separate variables can
lose the relationship TypeScript uses to check a result after a condition.
Keeping query.isPending and query.data on one object can preserve that relationship.
I would keep the original short pattern. This is a source-code comparison;
I did not run its GitHub network request as part of the local examples.

## Extra example: const and readonly

Run `npm run readonly` to check these assignments with TypeScript.
The command is also part of `npm run all`. It checks each line separately, so
one expected error does not hide the results of the other lines.

```ts
type Session = {
  readonly minutes: number;
  readonly room: { label: string };
};
const session: Session = { minutes: 40, room: { label: 'A' } };
const { minutes, room } = session;
```

`const` prevents assigning a new value to the local variable `minutes`.
`readonly` prevents assigning a new value to `session.minutes` or `session.room`.
However, `label` is not readonly, so `session.room.label` can still change.

Destructuring `room` gives us another reference to the same object. Changing its
label changes the shared object. A number works differently: a new `let` variable
can change without changing the number stored in `session`.

Actual output, also saved in `readonly-output.txt`:

```text
minutes = 60;
TS2588: Cannot assign to 'minutes' because it is a constant.
room.label = 'B';
OK (no compiler errors)
session.minutes = 60;
TS2540: Cannot assign to 'minutes' because it is a read-only property.
session.room = { label: 'B' };
TS2540: Cannot assign to 'room' because it is a read-only property.
session.room.label = 'C';
OK (no compiler errors)
let { minutes: editableMinutes } = session; editableMinutes = 60;
OK (no compiler errors)
runtime: 40 60 40 C
runtime frozen: false false
```

The runtime values are 40 for the const number, 60 for the local let number,
40 for the original number, and C for the shared label. Only accepted code runs.
`readonly` checks assignments in TypeScript; it does not freeze objects at runtime.
Both frozen checks are false. To protect label too, use `readonly label: string`.

## Extra example: changing an object or replacing a reference

Run `npx tsx ts/reference-followup.ts`. The experiment is also included in
`npm run ts` and `npm run all`, and is checked by `npm run check`.
The following is the complete runnable source:

```ts
// Tuba Nazlı İpekyüz — 2200004532
// Changing a shared object versus assigning a new object.
export {}

{
  const session: { readonly room: { label: string } } = {
    room: { label: 'A' }
  };
  let { room } = session;
  console.log('shared before:', room === session.room);
  room.label = 'B';
  room = { label: 'C' };
  console.log('shared after:', room === session.room);
  console.log('after rebinding:', room.label, session.room.label);
  room.label = 'D';
  console.log('after local mutation:', room.label, session.room.label);
}

{
  const original = { label: 'A' };
  let copy = original;
  copy = { label: 'B' };
  original.label = 'C';
  console.log('ordinary alias:', copy.label, original.label);
}
```

Actual output, also saved in `reference-followup-output.txt`:

```text
shared before: true
shared after: false
after rebinding: C B
after local mutation: D B
ordinary alias: B C
```

At first, `room` and `session.room` point to the same object. This is why
`room === session.room` is true. Setting `room.label` to B changes that object.

Then `room = { label: 'C' }` makes the local variable point to a new object.
`session.room` still points to the first object, whose label is B. The two
references are now different. Changing the new object's label to D leaves the
first object at B. This gives C B first, then D B.

The second example uses the same rule without destructuring. Assigning a new
object to `copy` leaves it separate from `original`. The final labels are B and C.
The name `copy` does not create a separate object by itself.

## Sources and assistance

The starter and handout gave the project structure. I used AI help for the
examples and code. The log separates my guesses from the assistant's actual runs
on this computer. These sources were used to check the rules, not to copy examples:

- [MDN: Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring): defaults and source-value rules.
- [TypeScript Handbook: Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html): property patterns, optional fields, tuples and readonly tuples.
- [React: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component): one props object, children and defaults.
- [React DOM: Common components](https://react.dev/reference/react-dom/components/common): renderable children values.
- [React: Render Props](https://legacy.reactjs.org/docs/render-props.html): explicitly called function props.

## Submission contents

The ZIP contains one folder named assignment4. It does not include node_modules.
It includes the guide, code, package files, tsconfig.json, output.txt,
compiler-diagnostics.txt, LaTeX source and PDF.
After extracting it, run npm install to install the dependencies.
All four bonuses are included. The public repository link is above.
The GitHub upload was checked against the local version.

## My own log

These are my real guesses and corrections from the review with an AI assistant.
The assistant ran the code on this computer. I discussed the examples and results.
The notes include wrong guesses, surprises and correct later answers.
They do not claim that I found or ran every error on my own.
The exact error messages and outputs are above and in the output files.

### 1. I expected the default function to run

In `js/default-review.mjs`, I thought fallback() would run. It did not, which
surprised me. The assistant ran the code on this computer. The output was `0 0`:
minutes stayed 0 and the function was not called.

I did not know the default rule clearly before this example. A default is used
for undefined or when no value was given. It is not used for 0.
The default function only runs when the default is needed. There was no error message.

```js
let calls = 0
function fallback() {
  calls++
  return 30
}
const { minutes = fallback() } = { minutes: 0 }
console.log(minutes, calls)
```

Run `node js/default-review.mjs`. Actual output:

```text
0 0
```

### 2. I expected renaming to change the existing title variable

In `js/rename-review.mjs`, I guessed that both lines would print React çalışması.
I thought making the values equal would also change title.
The assistant ran it on this computer. The actual output was:

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

The title inside the pattern is the property name. Heading is the new variable.
The line means `const heading = session.title`. It does not change the existing
title variable, so title stays Haftalık plan. There was no error message.
I needed to separate reading a property from changing another variable.
Run `node js/rename-review.mjs`.

### 3. I compared a number with a shared nested object

In `js/reference-review.mjs`, I correctly guessed 40 and B.
Minutes received 40 when destructuring ran. The later change to session.minutes
did not change that separate number variable. Room and session.room still pointed
to the same object, so changing its label was visible through both names.

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

The assistant ran this code on this computer. Actual output:

```text
40
B
```

This example helped me compare a number with an object reference.
Destructuring does not make a separate copy of every nested object.
There was no error message. Run `node js/reference-review.mjs`.

### 4. I overlooked the zero passed to a conditional child

I guessed that Çalışma var would appear. I then explained that I had missed
count={0} in the example. I knew that && stops at a falsy left value, but I had
not noticed which value was passed in.

```jsx
function Session({ count }) {
  return <section>{count && <span>Çalışma var</span>}</section>
}
// Rendered usage: <Session count={0} />
```

The assistant rendered it on this computer. The actual HTML was
`<section>0</section>`. Here && returns 0, not false. React shows the number 0 as text.

In `js/children-review.jsx`, the fixed check is
`count > 0 && <span>Çalışma var</span>`. For count=0, it returns false.
React does not show false. There was no error message.
Run `npx tsx js/children-review.jsx`. Actual output:

```text
original: <section>0</section>
checked: <section></section>
```

### 5. I traced a function child and its returned element

I said children was a function and separated it from children(). That was correct
for this example. Children holds the function; children(2) calls it.
The call returns a React element. It is not another function.
I also correctly calculated 5 for number + 3. This note records an example I
checked, not a wrong answer.

```jsx
function Card({ children }) {
  return <section>{children(2)}</section>
}
// Rendered usage:
<Card>{number => <strong>{number + 3}</strong>}</Card>
```

The assistant rendered it on this computer. Actual HTML:

```html
<section><strong>5</strong></section>
```

React does not call the function automatically. Card calls it and displays the result.
The TS type must describe the function:
`{ children: (number: number) => ReactNode }`.
Ordinary ReactNode children do not include this function type.
There was no error message. Run `npx tsx js/function-review.jsx`.

### 6. I predicted the wrong length for a destructured string property

For `const { length } = 'React'; console.log(length)`, I guessed 2.
I explained that I had thought of React as one whole word. I had not paid attention
to its characters. The assistant ran it on this computer. The output was 5.

The pattern reads the string's length property. It does not count words or the
variables in the pattern. JavaScript temporarily wraps the string to read the property.
React has five ASCII characters. In general, length counts UTF-16 code units,
so it may differ from the number of visible characters.
There was no error message. The code is in `js/edge-review.mjs`.

### 7. I expected a later default binding to be available

For `const [a = b, b = 2] = []`, I guessed b for a and 2 for b.
The assistant ran the code on this computer. It did not print the values.
It threw this exact error:

```text
ReferenceError: Cannot access 'b' before initialization
```

The first missing item uses a's default straight away. At that point b is not
ready yet, so reading it throws. The code stops before b gets its value 2.
This is called the temporal dead zone: a let or const variable cannot be read
before it is initialized. Putting the earlier value first fixes the dependency:

```js
const [b = 2, a = b] = []
console.log(a, b) // actual output: 2 2
```

`js/edge-review.mjs` includes the caught error and the working example.

### 8. I forgot what readonly prevents

I correctly guessed that the const variable minutes could not be assigned 60,
while room.label could change. After readonly was added, I thought all three
assignments would work. I was surprised that assigning to session.minutes and
replacing session.room both gave TS2540 errors.
I had forgotten that readonly prevents assigning new values to those properties.

The assistant checked the code on this computer. `session.room.label = 'C'`
was allowed because label was not readonly. The extra example above has the
actual compiler messages and output.

### 9. I mixed up changing an object and replacing a reference

I guessed A and B for the room example. The result was C and B.
After `room.label = 'D'`, I guessed D and C. The result was D and B.
For the copy example, I guessed A and C. The result was B and C.
The assistant ran the examples on this computer and saved their output.

I was mixing up two steps. `room.label = 'B'` changes the shared object.
`room = { label: 'C' }` makes only room point to a new object.
The original object keeps its B label.

My earlier answer of 40 and 60 in the number example was an order slip.
I said I had not paid attention to the order. It is not counted as a new mistake
about how the code works.

In a later example, I correctly guessed C and D. Room pointed to a new object,
so changing the original object's label did not change it.
I also explained the default rule correctly: a default is used for undefined or
when no value was given, but not for null. I corrected a typing slip in that sentence.
