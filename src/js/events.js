export default class Events {
  constructor () {
    this.events = {}
  }
  add (name, cb) {
    this.events[name] = this.events[name] || []
    this.events[name].push(cb)
    return () => this.remove(name, cb)
  }
  call (name, ...args) {
    (this.events[name] || []).forEach(event => event(...args))
  }
  remove(name, cb) {
    this.events[name] = (this.events[name] || []).filter(it => it !== cb)
  }
}
