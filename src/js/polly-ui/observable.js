import { assign, push, splice, deepFreeze, equals } from 'utils'
export default class Observable {
  constructor (value) {
    this.callbacks = []
    this.value = deepFreeze(value)
  }

  observe (callback) {
    this.callbacks.push(callback)
    callback(this.value)
    return callback
  }

  remove (callback) {
    const io = this.callbacks.indexOf(callback)
    if (io !== -1) {
      this.callbacks.splice(io, 1)
    }
  }

  set (value) {
    if (equals(value, this.value)) return
    this.value = deepFreeze(value)
    this.callbacks.forEach(callback => callback(value))
  }

  get () {
    return this.value
  }

  splice (...path) {
    this.set(splice(this.value, ...path))
  }

  push (...path) {
    this.set(push(this.value, ...path))
  }

  assign (...path) {
    this.set(assign(this.value, ...path))
  }

  prop (...path) {
    const observable$ = new Observable()
    this.observe(it => observable$.set(path.reduce((value, path) => value[path], it)))
    return observable$
  }

  static derive (...args) {
    const obs = args.slice(0, args.length - 1)
    const observe = args[args.length - 1]
    const observable$ = new Observable(observe(...obs.map(it => it.get())))
    obs.forEach((ob, i) => {
      ob.observe(Observable.skipFirst(value => {
        const values = obs.map(it => it.get())
        values[i] = value
        observable$.set(observe(...values))
      }))
    })
    return observable$
  }

  static hasValue (hasValue) {
    return value => value && hasValue(value)
  }

  static skipFirst (skipFirst) {
    const count = 1// getArgCount(callback)
    let skipped = 0
    return (...args) => {
      if (skipped >= count) {
        return skipFirst(...args)
      }
      skipped++
    }
  }
}
