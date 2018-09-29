export default class Observable {
  constructor (value) {
    this.callbacks = []
    this.value = value
  }

  assign (value = {}) {
    this.set(Object.assign({}, this.get(), value))
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
    if (value === this.value) return
    this.value = value
    this.callbacks.forEach(callback => callback(value))
  }

  get () {
    return this.value
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
