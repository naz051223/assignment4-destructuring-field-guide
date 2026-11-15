// Tuba Nazlı İpekyüz — 2200004532
// Rebuild the complete LaTeX source and PDF from README.md.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const root = path.resolve(__dirname, '..');
const pandoc = process.env.PANDOC_BIN || 'pandoc';
const tectonic = process.env.TECTONIC_BIN || 'tectonic';
function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit', env: process.env });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} exited with ${result.status}`);
}
run(pandoc, ['README.md', '--standalone', '--shift-heading-level-by=-1', '--toc', '--number-sections', '--listings',
  '--pdf-engine=xelatex', '--lua-filter=latex/layout.lua', '-V', 'documentclass=article', '-V', 'papersize=a4', '-V', 'fontsize=10pt',
  '-V', 'geometry:margin=22mm', '-V', 'title=Destructuring Field Guide',
  '-V', 'author=Tuba Nazlı İpekyüz - 2200004532', '-V', 'date=15 November 2026',
  '-H', 'latex/style.tex', '-o', 'latex/main.tex']);
const tex = path.join(root, 'latex/main.tex');
fs.writeFileSync(tex, '% Tuba Nazlı İpekyüz — 2200004532\n' + fs.readFileSync(tex, 'utf8'));
run(tectonic, ['--keep-logs', '--keep-intermediates', '--outdir', 'latex', 'latex/main.tex']);



