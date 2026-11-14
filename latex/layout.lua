-- Tuba Nazlı İpekyüz — 2200004532
-- Keep short code samples together; leave long investigations breakable.
function CodeBlock(block)
  local _, lines = block.text:gsub('\n', '\n')
  if lines < 15 then
    return {
      pandoc.RawBlock('latex', '\\begin{minipage}{\\linewidth}'),
      block,
      pandoc.RawBlock('latex', '\\end{minipage}\\par')
    }
  end
end
function Header(header)
  if pandoc.utils.stringify(header.content) == 'Field guide' then
    return {pandoc.RawBlock('latex', '\\clearpage'), header}
  elseif pandoc.utils.stringify(header.content) == 'JavaScript vs TypeScript' then
    return {pandoc.RawBlock('latex', '\\Needspace{27\\baselineskip}'), header}
  end
end

function Para(paragraph)
  if pandoc.utils.stringify(paragraph.content) == 'Output:' then
    return {pandoc.RawBlock('latex', '\\Needspace{7\\baselineskip}'), paragraph}
  end
end

