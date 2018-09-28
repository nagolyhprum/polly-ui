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

export const contains = function (arr, item) {
  return arr.indexOf(item) !== -1
}
