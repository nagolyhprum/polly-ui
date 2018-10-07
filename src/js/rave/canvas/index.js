import Events from 'events'
export default class Canvas {
  constructor() {
    this.events = new Events()
  }
  onMouseMove (cb) {
    this.events.add("onmousemove", cb)
  }
  onMouseUp (cb) {
    this.events.add("onmouseup", cb)
  }
  onClick (cb) {
    this.events.add("onclick", cb)
  }
  onMouseOut (cb) {
    this.events.add("onmouseout", cb)
  }
  onMouseDown (cb) {
    this.events.add("onmousedown", cb)
  }
}
