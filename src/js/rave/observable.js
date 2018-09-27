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
    this.callbacks.forEach(function (callback) {
      callback(value)
    })
  }

  get () {
    return this.value
  }

  static derive (...args) {
    const obs = args.slice(0, args.length - 1)
    const observe = args[args.length - 1]
    const observable$ = new Observable(observe(...obs.map(it => it.get())))
    obs.forEach(function (ob, i) {
      ob.observe(Observable.skipFirst(function (value) {
        const values = obs.map(function (it) {
          return it.get()
        })
        values[i] = value
        observable$.set(observe(...values))
      }))
    })
    return observable$
  }

  static hasValue (hasValue) {
    return function (value) {
      value && hasValue(value)
    }
  }

  static skipFirst (skipFirst) {
    const count = 1// getArgCount(callback)
    let skipped = 0
    return function (...args) {
      if (skipped >= count) {
        return skipFirst(...args)
      }
      skipped++
    }
  }
}
