# Verification — required guide and bonus edition

Owner: Tuba Nazlı İpekyüz, 2200004532.
Node.js 22.23.3, npm 10.9.9. Dependencies are pinned by package-lock.json.

Required guide: forms 1–12 in JS and strict TS, five JS pitfalls, T1–T5,
React P1–P7, real output and the comparison table are implemented.
Seven guided-review log entries distinguish student predictions from assistant runs.

Commands checked:
- npm run all: passed, including review and depth experiments.
- npm run check: passed with strict and noUncheckedIndexedAccess.
- npm run diagnose: separate deliberate compiler failures reproduced.
- npm run build:guide: complete README converted to TeX and compiled successfully.

Bonus 1: complete 19-page A4 LaTeX/PDF guide, linked contents, listings and real tables.
Built with Pandoc 3.14 and Tectonic 0.17.0. All pages rendered and visually reviewed;
short code blocks stay together. Final TeX log has no overfull/underfull boxes,
missing-character diagnostics or compilation errors. The Fontconfig environment
notice did not prevent use of the bundled fonts; fonts are embedded in the PDF.

Bonus 2: iterator closing, string/Set/Map iteration, lazy defaults and getter order,
assignment targets, catch and loops, conditional tuple types, Parameters and a
readability/robustness comparison. Code and actual depth output are included.

Bonus 3: five cases from the instructor's Assignment 3 starter, TypeScript 5.8.3
and a pinned TanStack Query revision. Includes expanded equivalents, one readability
criticism, a props-versus-children analysis, exact lines and hashed source evidence.

Bonus 4 is NOT complete: local commits use genuine timestamps. GitHub publication,
instructor access and work across several days remain. GIT-NEXT-STEPS.md explains
how to restore the bundled local history and publish it after normal authentication.

No any annotations or ts-ignore directives were introduced. Only T5 uses
ts-expect-error. output.txt is real stdout from the complete npm run all.
The raw-function demonstration captures React's console.error arguments into stdout.
Compiler experiments are separate, intentional failures, not hidden project errors.

The package excludes node_modules, .git and intermediate TeX build files.
The source and PDF cover the same complete guide. Review the explanations before
submission; bonus points depend on the instructor's assessment of understanding.
