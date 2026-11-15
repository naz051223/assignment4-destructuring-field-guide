// Tuba Nazlı İpekyüz — 2200004532
// Check each assignment separately with the TypeScript compiler.
const ts = require('typescript');
const path = require('path');
const assert = require('node:assert/strict');
const filename = path.resolve(__dirname, '../ts/__readonly_probe.ts');
const setup = `export {};
type Session = { readonly minutes: number; readonly room: { label: string } };
const session: Session = { minutes: 40, room: { label: 'A' } };
const { minutes, room } = session;
`;
const cases = [
  ['minutes = 60;', [2588]],
  ["room.label = 'B';", []],
  ['session.minutes = 60;', [2540]],
  ["session.room = { label: 'B' };", [2540]],
  ["session.room.label = 'C';", []],
  ['let { minutes: editableMinutes } = session; editableMinutes = 60;', []],
];
const options = { strict: true, noEmit: true, skipLibCheck: true, target: ts.ScriptTarget.ES2022 };
for (const [statement, expected] of cases) {
  const host = ts.createCompilerHost(options);
  const read = host.readFile.bind(host);
  const exists = host.fileExists.bind(host);
  host.readFile = f => path.resolve(f) === filename ? setup + statement : read(f);
  host.fileExists = f => path.resolve(f) === filename || exists(f);
  const program = ts.createProgram([filename], options, host);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.deepEqual(diagnostics.map(d => d.code), expected, statement);
  console.log(statement);
  console.log(diagnostics.length ? diagnostics.map(d => `TS${d.code}: ${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`).join('\n') : 'OK (no compiler errors)');
}
// Transpile and execute only the accepted example; no invalid assignment is run.
const accepted = setup + `
room.label = 'C';
let { minutes: editableMinutes } = session;
editableMinutes = 60;
console.log('runtime:', minutes, editableMinutes, session.minutes, session.room.label);
console.log('runtime frozen:', Object.isFrozen(session), Object.isFrozen(session.room));
`;
const compiled = ts.transpileModule(accepted, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } });
new Function('exports', compiled.outputText)({});
