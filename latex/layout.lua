-- Tuba Nazlı İpekyüz — 2200004532
-- Preserve Unicode through listings' explicit TeX escape mechanism.
local specials = {['\\']='\\textbackslash{}', ['{']='\\{', ['}']='\\}',
  ['$']='\\$', ['&']='\\&', ['#']='\\#', ['%']='\\%', ['_']='\\_',
  ['~']='\\textasciitilde{}', ['^']='\\textasciicircum{}'}
local function escaped(text)
  local parts = {}
  for _, cp in utf8.codes(text) do
    local ch = utf8.char(cp)
    if cp == 0x1F9E0 then
      parts[#parts + 1] = '[U+1F9E0]'
    else
      parts[#parts + 1] = specials[ch] or ch
      if ch == '/' or ch == '.' or ch == ':' then parts[#parts + 1] = '\\allowbreak{}' end
    end
  end
  return table.concat(parts)
end
function Code(code)
  return pandoc.RawInline('latex', '\\texttt{' .. escaped(code.text) .. '}')
end
function CodeBlock(block)
  local converted = {}
  for _, cp in utf8.codes(block.text) do
    if cp == 0x1F9E0 then
      converted[#converted + 1] = '[U+1F9E0]'
    elseif cp > 127 then
      converted[#converted + 1] = '(*@\\texttt{' .. utf8.char(cp) .. '}@*)'
    else
      converted[#converted + 1] = utf8.char(cp)
    end
  end
  block.text = table.concat(converted)
  local _, lines = block.text:gsub('\n', '\n')
  if lines < 15 then
    return {pandoc.RawBlock('latex', '\\begin{minipage}{\\linewidth}'), block,
      pandoc.RawBlock('latex', '\\end{minipage}\\par')}
  end
  return block
end
function Header(header)
  local text = pandoc.utils.stringify(header.content)
  if text == 'Field guide' then
    return {pandoc.RawBlock('latex', '\\clearpage'), header}
  elseif text == 'JavaScript vs TypeScript' then
    return {pandoc.RawBlock('latex', '\\Needspace{27\\baselineskip}'), header}
  end
end
function Para(paragraph)
  local text = pandoc.utils.stringify(paragraph.content)
  if text == 'Output:' or text:match('[Aa]ctual output:%s*$') or text:match('[Aa]ctual HTML:%s*$') then
    return {pandoc.RawBlock('latex', '\\Needspace{7\\baselineskip}'), paragraph}
  end
end
