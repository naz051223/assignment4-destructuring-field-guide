# Verification

Node.js 22.23.3, npm 10.9.9; TypeScript and React versions are pinned by package-lock.json.

Implemented and checked:
- Forms 1–12 in JavaScript and TypeScript.
- Five runnable JavaScript pitfalls and TypeScript topics T1–T5.
- React P1–P7; rejected cases are recorded separately by the compiler probe runner.
- All guided-review scripts are included in npm run all through npm run review.
- README includes real outputs, an eleven-row comparison table and seven review-log entries.
- Log entries 1, 2, 4, 6 and 7 contain actual wrong predictions from the conversation;
  entries 3 and 5 preserve correct follow-up answers.
- All source headers include Tuba Nazlı İpekyüz, 2200004532.

npm run all: passed.
npm run check: passed, with strict and noUncheckedIndexedAccess enabled.
npm run diagnose: completed, recording deliberately rejected in-memory examples.
No any annotations or ts-ignore directives were added. Only T5 uses ts-expect-error.

output.txt is real stdout from npm run all. The JS raw-function demonstration
captures React's actual console.error arguments into stdout and restores the logger.
compiler-diagnostics.txt is generated separately by node tools/check-probes.cjs.

The runs were performed by the assistant on this computer; student predictions
and explanations were collected in a guided review and are identified as such.
No bonuses are claimed. The student should review the guide before submission.

Final package check: extracted assignment4.zip into a separate empty directory; npm ci succeeded from the local cache, npm run all passed, npm run check passed, and the clean output matched the submitted output.txt after newline normalization.

