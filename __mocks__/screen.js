import Canvas from 'canvas'
export default (extend = {}) => Object.assign({
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3,
  EMPTY_ARRAY: [0, 0, 0, 0],
  LINE_SPACING: 8,
  plugins: {
    render: [],
    view: [],
    prerender: [],
    reposition: []
  },
  setInterval (interval) {
    this.interval = interval
  },
  extend (extension) {
    Object.keys(extension).forEach(key => {
      this[key] = (...args) => extension[key](this.active, ...args)
    })
  },
  getValue (view, dim) {
    if (typeof view[dim] === 'function') {
      return view[dim](view, dim) || 0
    } else {
      return view[dim] || 0
    }
  },
  getTopBottom (r) {
    return r instanceof Array ? r[this.TOP] + r[this.BOTTOM] : 0
  },
  getLeftRight (r) {
    return r instanceof Array ? r[this.RIGHT] + r[this.LEFT] : 0
  },
  render () {

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
