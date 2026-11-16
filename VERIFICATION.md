# Verification

Owner: Tuba Nazlı İpekyüz, 2200004532.
Environment: Node.js 22.23.3, npm 10.9.9, TypeScript 5.8.3.

## Required work

- Twelve forms in JavaScript and TypeScript; five pitfalls; T1–T5 and P1–P7.
- Eleven comparison-table rows and nine personal-log entries.
- Student predictions are separated from assistant-run experiments.
- No explicit any annotations or ts-ignore comments. Only T5 uses ts-expect-error.
- npm run all and npm run check passed after the latest runnable-code changes.
- npm run diagnose reproduced the expected compiler errors separately.
- output.txt is the real stdout of npm run all, including captured React warnings.

## Extra React review

The key experiment runs in both js/props.jsx and ts/props.tsx. JavaScript records
React's warning and undefined result when reading key. Both components read the
explicit itemId prop. Separate compiler probes show that JSX accepts key, while
ComponentProps excludes it from the component's own props. These are assistant-run
investigations, not invented student mistakes.

## Bonuses

- Bonus 1: the full README is converted to LaTeX and PDF, including the latest
  React example. Code listings, real tables and linked contents are included.
- Bonus 2: iterator, default, evaluation-order, type and readability experiments
  include code, actual output and explanations.
- Bonus 3: five cases use the instructor starter, TypeScript and a fixed TanStack
  Query revision. Rewrites include the selected function bodies or hook options.
- Bonus 4: the repository is public as requested by the instructor. The owner's repository
  link is in README. The history has more than five meaningful commits across
  three days. Public visibility and matching remote HEAD were verified.

## Final checks

CLEAN-CLONE-CHECK.txt records the exact runnable-code commit tested from a fresh
bundle clone with a clean dependency installation. Final documentation changes
are checked separately. The full PDF is rendered and inspected, and its TeX log
is checked for compilation errors, overfull/underfull boxes and missing characters.
The ZIP excludes node_modules, .git and TeX intermediates. Its contents are checked
against the project. The protected original ZIP is not overwritten.

Final local audit: 12 forms, 5 TypeScript topics, 7 React topics, 5 source cases,
11 comparison rows, 9 personal-log entries and 23 identified source files.
The rebuilt PDF has 23 pages. All pages were rendered and visually inspected;
no TeX layout or missing-character warnings remain. Clean-checkout output matches
output.txt. The final GitHub upload and public visibility were also verified.
