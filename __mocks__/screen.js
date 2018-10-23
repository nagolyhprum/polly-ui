import Canvas from 'canvas'
import View from 'view'
export default (extend = {}, self = {}) => Object.assign(self, {
  main: self,
  resources: {
    color: {},
    drawable: {
      content: {}
    },
    string: {},
    font: {}
  },
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3,
  EMPTY_ARRAY: [0, 0, 0, 0],
  plugins: {
    render: [],
    view: [],
    prerender: [],
    reposition: [],
    wrap: []
  },
  calls: [],
  highlightArea () {
    this.calls.push(['highlightArea', ...arguments])
  },
  setInterval (interval) {
    this.interval = interval
  },
  extend (extension) {
    Object.keys(extension).forEach(key => {
      this[key] = (...args) => extension[key](this.active, ...args)
    })
  },
  setDirty (view) {
    view.isDirty = true
  },
  position () {

  },
  anchor () {

  },
  getValue (view, dim) {
    if (typeof view[dim] === 'function') {
      return view[dim](view, dim) || 0
    } else {
      return view[dim] || 0
    }
  },
  animateObject () {

  },
  getTopBottom (r) {
    return r instanceof Array ? r[this.TOP] + r[this.BOTTOM] : 0
  },
  getLeftRight (r) {
    return r instanceof Array ? r[this.RIGHT] + r[this.LEFT] : 0
  },
  container (width, height, callback) {
    const view = View({
      parent: this.active
    })
    this.active.children.push(view)
    this.active = view
    callback(view)
    this.active = view.parent
    return view
  },
  render () {

  },
  padding () {

  },
  getViewPortSize (view) {
    return {
      width: view.bounds.width - this.getLeftRight(view.padding) - this.getLeftRight(view.margin),
      height: view.bounds.height - this.getTopBottom(view.padding) - this.getTopBottom(view.margin)
    }
  },
  children: []
}, extend, {
  canvas: Canvas(extend.canvas)
})
