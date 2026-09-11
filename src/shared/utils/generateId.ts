export function generateId(): string {
  return Math.floor(Math.random() * 0xffff)
    .toString(16)
    .padStart(4, '0')
}
