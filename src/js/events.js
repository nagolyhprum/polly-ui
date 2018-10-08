export default class Events {
  constructor () {
    this.events = {}
  }
  add (name, cb) {
    this.events[name] = this.events[name] || []
    this.events[name].push(cb)
  }
  call (name, ...args) {
    (this.events[name] || []).forEach(event => event(...args))
  }
}
