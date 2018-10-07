export const assign = (data, ...path) => {
  const value = path.pop()
  const key = path.pop()
  const root = Object.assign({}, data)
  path.reduce((obj, path) => {
    if(obj[path] instanceof Array) {
      return (obj[path] = obj[path].slice(0))
    } else {
      return (obj[path] = Object.assign({}, obj[path]))
    }
  }, root)[key] = value
  return root
}

export const equals = (a, b) => {
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

export const contains = (arr, item) => arr.indexOf(item) !== -1
