export function getRandomElementInArray <T>(elements: T[]): T {
  return elements[Math.floor(Math.random() * elements.length)]
}