export function getHighlightedSegments(text: string, query: string) {
  const trimmed = query.trim()
  if (!trimmed) return [{ text, match: false }]

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))

  return parts.map((part) => ({
    text: part,
    match: part.toLowerCase() === trimmed.toLowerCase(),
  }))
}
