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

Bonus 4 is NOT complete: GitHub publication is verified, with genuine commit timestamps.
Instructor access and work across several days remain. GIT-NEXT-STEPS.md explains
how to restore the bundled local history and continue work on the published repository.

No any annotations or ts-ignore directives were introduced. Only T5 uses
ts-expect-error. output.txt is real stdout from the complete npm run all.
The raw-function demonstration captures React's console.error arguments into stdout.
Compiler experiments are separate, intentional failures, not hidden project errors.

The package excludes node_modules, .git and intermediate TeX build files.
The source and PDF cover the same complete guide. Review the explanations before
submission; bonus points depend on the instructor's assessment of understanding.

Clean-clone validation completed on 14 November 2026: restored the real Git history from the bundle into a separate directory; npm install succeeded from cache, npm run all and npm run check passed, and the output matched output.txt. See CLEAN-CLONE-CHECK.txt. The ZIP also preserves the history bundle; all current commits are dated today, so the several-day Bonus 4 condition is still pending.


Remote publication verified: https://github.com/naz051223/assignment4-destructuring-field-guide (PRIVATE). The initial remote HEAD matched c157664fc82d790bab905b49d14ee0bf73c0ac26, preserving the five original commits. README and PDF are updated with the actual repository link.


## 15 November 2026 follow-up

- Added six independent strict TypeScript compiler probes for const bindings,
  shallow readonly properties and destructuring into a let binding.
- Verified exact diagnostic codes TS2588 and TS2540; the runner fails on a mismatch.
- Executed only the accepted program: runtime values 40 60 40 C; neither object frozen.
- npm run all and npm run check passed after the change.
- Rebuilt the complete 20-page PDF; rendered all pages, visually inspected contact
  sheets, and checked the TeX log for missing characters and over/underfull boxes.
- Recorded the student's actual initial guesses and readonly surprise in log entry 8.
