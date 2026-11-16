// Tuba Nazlı İpekyüz — 2200004532
const path = require('path');
const fs = require('fs');
const root = path.resolve(__dirname, '..');
const ts = require(path.join(root, 'node_modules/typescript'));
const filename = path.join(root, 'ts', '__probe.tsx');
const source = `import type { ReactNode, PropsWithChildren, ComponentProps } from 'react';
const { duration } = { minutes: 25 };
const { minutes: string } = { minutes: 25 }; string.toUpperCase();
const [first] = [] as string[]; first.toUpperCase();
function pair(): [number, string] { return [40, 'rest'] }; const [work, pause] = pair(); work.toUpperCase();
let count = 1; [count] = ['wrong'];
const { minutes = 40 } = {} as { minutes?: number | null }; minutes.toFixed();
const { missing } = { id: 's1' };
const { room: { label } } = {} as { room?: { label: string } };
const key: keyof { minutes: number } = 'unknown';
function make({ title }: { title: string } = {}) { return title }
const [third] = [1, 2, 3]; third.toFixed();
const targets: Record<string, number> = { read: 20 };
for (const [key, value] of Object.entries(targets)) value.toUpperCase();
function Card({ children }: { children?: ReactNode }) { return <section>{children}</section> }
function Box({ children }: PropsWithChildren<{ title: string }>) { return <div>{children}</div> }
function Button(props: ComponentProps<'button'>) { return <button {...props} /> }
const invalidNode = <Card>{() => 'read'}</Card>;
const invalidChildren = <Box title="Plan">{{ topic: 'read' }}</Box>;
const invalidButton = <Button href="/read" />;
const duplicateChildren = <Card children="attribute">Nested</Card>;
function KeyCard({ itemId }: { itemId: string }) { return <section>{itemId}</section> }
const validJSXKey = <KeyCard key="session-1" itemId="session-1" />;
const invalidOwnKey: ComponentProps<typeof KeyCard> = { itemId: 'session-1', key: 'session-1' };
const { key: missingKey } = {} as ComponentProps<typeof KeyCard>;
`;
const options = { strict: true, noUncheckedIndexedAccess: true, noEmit: true, skipLibCheck: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.NodeNext, moduleResolution: ts.ModuleResolutionKind.NodeNext, jsx: ts.JsxEmit.ReactJSX };
const host = ts.createCompilerHost(options);
const originalRead = host.readFile.bind(host);
const originalExists = host.fileExists.bind(host);
host.readFile = f => path.resolve(f) === filename ? source : originalRead(f);
host.fileExists = f => path.resolve(f) === filename || originalExists(f);
const program = ts.createProgram([filename], options, host);
const diagnostics = ts.getPreEmitDiagnostics(program);
const output = diagnostics.map(d => {
  const position = d.file && d.start !== undefined ? d.file.getLineAndCharacterOfPosition(d.start) : null;
  return `probe:${position ? position.line + 1 : '?'} TS${d.code}: ${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`;
}).join('\n');
fs.writeFileSync(path.join(root, 'compiler-diagnostics.txt'), 'Intentional in-memory compiler experiments; not part of npm run check.\n\n' + source + '\nACTUAL DIAGNOSTICS\n' + output + '\n');
console.log(output);
if (!diagnostics.length) process.exitCode = 1;


