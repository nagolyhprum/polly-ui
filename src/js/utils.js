export const slice = function (input) {
  return Array.prototype.slice.call(input)
}
export function equals (a, b) {
  let i
  if (a === b) {
    return true
  }
  for (i in a) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  for (i in b) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}
