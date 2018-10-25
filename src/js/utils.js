export const splice = (data, ...path) => {
  const key = path.pop()
  const root = Object.assign({}, data)
  const found = path.reduce((obj, path) => {
    if (obj[path] instanceof Array) {
      return (obj[path] = obj[path].slice(0))
    } else {
      return (obj[path] = Object.assign({}, obj[path]))
    }
  }, root)
  if (found instanceof Array) {
    found.splice(key, 1)
  } else {
    delete found[key]
  }
  return root
}

export const assign = (data, ...path) => {
  const value = path.pop()
  const key = path.pop()
  const root = Object.assign({}, data)
  path.reduce((obj, path) => {
    if (obj[path] instanceof Array) {
      return (obj[path] = obj[path].slice(0))
    } else {
      return (obj[path] = Object.assign({}, obj[path]))
    }
  }, root)[key] = value
  return root
}

export const push = (data, ...path) => {
  const value = path.pop()
  const key = path.pop()
  const root = Object.assign({}, data)
  const r = path.reduce((obj, path) => {
    if (obj[path] instanceof Array) {
      return (obj[path] = obj[path].slice(0))
    } else {
      return (obj[path] = Object.assign({}, obj[path]))
    }
  }, root)
  r[key] = r[key].slice(0).concat(value)
  return root
}

export const getter = (data, ...path) => path.reduce((obj, path) => obj[path], data)

export const equals = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    let i
    for (i in a) {
      if (!equals(a[i], b[i])) {
        return false
      }
    }
    for (i in b) {
      if (!equals(a[i], b[i])) {
        return false
      }
    }
    return true
  }
  return a === b
}

const echo = _ => _

export const deepFreeze = input => clone(input, Object.freeze)

export const clone = (src, mutate = echo) => {
  if (src instanceof Array) {
    return mutate(src.map(it => clone(it, mutate)))
  } else if (typeof src === 'object') {
    return mutate(Object.keys(src).reduce((obj, key) => Object.assign(obj, {
      [key]: clone(src[key], mutate)
    }), {}))
  }
  return src
}

export const contains = (arr, item) => arr.indexOf(item) !== -1
