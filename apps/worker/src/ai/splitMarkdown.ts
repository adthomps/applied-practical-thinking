// Split markdown into chunks for embedding (by heading or paragraph)
export function splitMarkdown(md: string): Array<{ id: string, text: string, heading: string }> {
  const lines = md.split(/\r?\n/);
  let heading = '';
  let buffer: string[] = [];
  let chunks: Array<{ id: string, text: string, heading: string }> = [];
  let chunkId = 0;
  for (const line of lines) {
    if (/^#+ /.test(line)) {
      if (buffer.length > 0) {
        chunks.push({ id: `chunk-${chunkId++}`, text: buffer.join('\n'), heading });
        buffer = [];
      }
      heading = line.replace(/^#+ /, '');
    } else if (line.trim() !== '') {
      buffer.push(line);
    }
  }
  if (buffer.length > 0) {
    chunks.push({ id: `chunk-${chunkId++}`, text: buffer.join('\n'), heading });
  }
  return chunks;
}
