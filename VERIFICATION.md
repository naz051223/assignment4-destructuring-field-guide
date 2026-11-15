# Verification

Owner: Tuba Nazlı İpekyüz, 2200004532.
Environment: Node.js 22.23.3, npm 10.9.9, TypeScript 5.8.3.

## Required work

- Twelve forms in JavaScript and TypeScript; five pitfalls; T1–T5 and P1–P7.
- Eleven comparison-table rows and nine personal-log entries.
- Student predictions are separated from assistant-run experiments.
- npm run all and npm run check passed after the latest runnable-code changes.
- No any annotations or ts-ignore comments. Only T5 uses ts-expect-error.
- compiler-diagnostics.txt contains separate expected compiler errors.
- output.txt contains the real output of npm run all.

## Bonuses

- Bonus 1: the complete guide is supplied as LaTeX and a 22-page PDF. Listings, real tables and linked contents
  are included. The final PDF is rendered and visually checked.
- Bonus 2: iterator, default, evaluation-order, type and readability experiments
  include code, actual output and explanations.
- Bonus 3: five cases use the instructor starter, TypeScript and a fixed TanStack
  Query revision. The two previously shortened rewrites now include their full
  function body or hook options. The comparisons are not separate applications.
- Bonus 4: the initial private repository is published. Newer commits are local
  and await a push. Local work spans two days. Instructor access and further work
  over several days remain pending.

## Packaging and earlier checks

The ZIP excludes node_modules, .git and intermediate TeX files. It includes an
offline history bundle. The protected original ZIP is kept unchanged.
CLEAN-CLONE-CHECK.txt records an earlier clean-clone check of its named commit;
it is historical evidence, not a claim that the latest version was cloned again.
Later changes to explanations and source excerpts do not alter the runnable examples.
The guide and PDF are rebuilt together; the final TeX log is checked for errors,
overfull/underfull boxes and missing characters.

Final documentation checks passed: required-section audit, source comparisons,
whitespace check, PDF compilation and visual review of all 22 pages. No TeX
layout or missing-character warnings were found. Runnable code was unchanged.
