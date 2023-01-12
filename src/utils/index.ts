export function fillArray(length: number) {
  return Array.from({ length }, (_, i) => `Item ${i}`);
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
