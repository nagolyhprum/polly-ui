import {
  equals
} from 'utils'
import Observable from 'rave/observable'
// plugins
import link from 'plugins/link'
import layout from 'plugins/layout'
import shadow from 'plugins/shadow'
import background from 'plugins/background'
import image from 'plugins/image'
import alpha from 'plugins/alpha'
import separator from 'plugins/separator'
import overflow from 'plugins/overflow'
import textbox from 'plugins/textbox'
import text from 'plugins/text'
import scrollable from 'plugins/scrollable'
import mouse from 'plugins/mouse'
import components from 'plugins/components'
import linear from 'plugins/linear'
import highlight from 'plugins/highlight'
import round from 'plugins/round'
import circle from 'plugins/circle'
import colorPI from 'plugins/color'
import screen from 'plugins/screen'
import clear from 'plugins/clear'

const PLUGINS = [
  clear,
  alpha,
  shadow,
  background,
  round,
  circle,
  image,
  overflow,
  separator,
  text,
  screen,
  layout(false),
  // not drawn
  link,
  textbox,
  components,
  scrollable,
  mouse,
  linear,
  highlight,
  colorPI
]

const COMPLEMENTARY_DIMENSIONS = {
  width: 'x',
  height: 'y',
  x: 'width',
  y: 'height'
}
const OPPOSITE_DIMENSIONS = {
  x: 'y',
  y: 'x',
  width: 'height',
  height: 'width'
}
const DIMENSIONS = {
  x: 'width',
  y: 'height',
  width: 'height',
  height: 'width'
}

function Screen (state$, resources, canvas, ...plugins) {
  this.main = this
  this.bounds = {}
  this.state$ = state$
  this.TOP = 0
  this.RIGHT = 1
  this.BOTTOM = 2
  this.LEFT = 3
  this.EMPTY_ARRAY = [0, 0, 0, 0]
  this.isInBounds = true
  this.canvas = canvas
  this.plugins = {
    wrap: [childrenWrapper],
    prerender: [],
    render: [],
    view: [],
    reposition: []
  }
  this.resources = resources
  PLUGINS.concat(plugins).map(plugin => plugin(this))
  this.children = []
  this.active = this
  this.bind()
}

const childrenWrapper = (view, dim) => {
  if (view.children.length) {
    return {
      [dim]: Math.max(1, ...view.children.map(child => child[COMPLEMENTARY_DIMENSIONS[dim]] + child.bounds[dim]))
    }
  }
}

Screen.prototype = {
  select (view) {
    this.active = view
  },
  extend (extension) {
    Object.keys(extension).forEach(key => {
      this[key] = (...args) => extension[key](this.active, ...args)
    })
  },
  reposition (view) {
    const padding = view.parent.padding instanceof Array ? view.parent.padding : this.EMPTY_ARRAY
    const margin = view.parent.margin instanceof Array ? view.parent.margin : this.EMPTY_ARRAY
    return this.plugins.reposition.reduce((position, plugin) => {
      const translate = plugin(view)
      return {
        x: position.x + translate.x,
        y: position.y + translate.y
      }
    }, {
      x: view.parent.bounds.x + padding[this.LEFT] + margin[this.LEFT] + view.x,
      y: view.parent.bounds.y + padding[this.TOP] + margin[this.TOP] + view.y
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
  PERCENT (percent) {
    return dim => view => {
      const vp = this.getViewPortSize(view.parent)
      return {
        [dim]: vp[OPPOSITE_DIMENSIONS[DIMENSIONS[dim]]] * percent / 100
      }
    }
  },
  MATCH (dim) {
    return view => {
      const vp = this.getViewPortSize(view.parent)
      switch (dim) {
        case 'width' :
          return {
            width: vp.width
          }
        case 'height' :
          return {
            height: vp.height
          }
      }
    }
  },
  WRAP: dim => (view, screen) => {
    const spaceAround = {
      width: screen.getLeftRight(view.padding) + screen.getLeftRight(view.margin),
      height: screen.getTopBottom(view.padding) + screen.getTopBottom(view.margin)
    }[dim]
    const size = screen.plugins.wrap.reduce((size, wrap) => {
      return size || wrap(view, dim)
    }, null) || {
        [dim]: 0
      }
    size[dim] += spaceAround
    return size
  },
  view (parent, width, height) {
    return this.plugins.view.reduce((view, plugin) => plugin(view), {
      render: _ => _,
      managers: [
        typeof width === 'function' ? width('width') : () => ({ width: width * this.canvas.getRatio() }),
        typeof height === 'function' ? height('height') : () => ({ height: height * this.canvas.getRatio() }),
        this.reposition
      ],
      parent,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      bounds: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      children: []
    })
  },
  container (width, height, render) {
    const parent = this.active
    const child = this.view(parent, width, height)
    parent.children.push(child)
    this.active = child
    render(child)
    this.active = parent
    return child
  },
  getViewPortSize (view) {
    return {
      width: view.bounds.width - this.getLeftRight(view.padding) - this.getLeftRight(view.margin),
      height: view.bounds.height - this.getTopBottom(view.padding) - this.getTopBottom(view.margin)
    }
  },
  position (x, y) {
    this.active.managers.push(view => {
      const vp = this.getViewPortSize(view.parent)
      return {
        x: vp.width * x,
        y: vp.height * y
      }
    })
  },
  anchor (x, y) {
    this.active.managers.push(view => ({
      x: -Math.max(view.bounds.width, 0) * x,
      y: -Math.max(view.bounds.height, 0) * y
    }))
  },
  visibility (visible) {
    this.active.hidden = !visible
  },
  animateVisibility (visible) {
    const view = this.active
    if (visible) {
      view.hidden = false
      this.animate({
        alpha: view.alpha || 0
      }, {
        alpha: 1
      }, this.firstRender ? 0 : 300)
    } else {
      this.animate({
        alpha: view.alpha || 1
      }, {
        alpha: 0
      }, this.firstRender ? 0 : 300, () => {
        view.hidden = true
      })
    }
  },
  timeout (callback, ms) {
    const active = this.active
    this.setTimeout(() => {
      this.active = active
      callback()
      this.main.render()
    }, ms)
  },
  margin (...margin) {
    if (margin.length === 1) {
      const scaled = margin[0] * this.canvas.getRatio()
      this.active.margin = [scaled, scaled, scaled, scaled]
    } else {
      this.active.margin = margin.map(it => it * this.canvas.getRatio())
    }
  },
  padding (...padding) {
    if (padding.length === 1) {
      const scaled = padding[0] * this.canvas.getRatio()
      this.active.padding = [scaled, scaled, scaled, scaled]
    } else {
      this.active.padding = padding.map(it => it * this.canvas.getRatio())
    }
  },
  setInterval (interval, ms) {
    return setInterval(interval, ms) // TODO
  },
  setTimeout (timeout, ms) {
    return setTimeout(timeout, ms) // TODO
  },
  animateObject (object, from, to, ms, cb) {
    const start = Date.now()
    const handler = (now = Date.now()) => {
      const percent = Math.min((now - start) / ms, 1)
      const weight = percent
      Object.keys(from).forEach(key => {
        object[key] = from[key] + (to[key] - from[key]) * weight
      })
      if (percent === 1) {
        clearInterval(interval)
        cb && cb()
      }
      this.main.render()
    }
    handler(start)
    const interval = this.setInterval(handler, 1000 / 60)
  },
  animate (from, to, ms, cb) {
    this.animateObject(this.active, from, to, ms, cb)
  },
  start (view, clear) {
    this.firstRender = true
    this.active = this
    this.container(this.MATCH, this.MATCH, () => {
      view(this)
      if (this.children.length > 1) {
        this.animate({
          alpha: 0.25,
          x: this.bounds.width,
          scale: 0.25
        }, {
          alpha: 1,
          x: 0,
          scale: 1
        }, 300)
      }
    })
    this.main.render()
    this.firstRender = false
    return this
  },
  back () {
    if (this.children.length > 1) {
      this.active = this.children[this.children.length - 1]
      this.animate({
        alpha: 1,
        x: 0,
        scale: 1
      }, {
        alpha: 0.25,
        x: this.bounds.width,
        scale: 0.25
      }, 300, () => {
        this.children.pop()
      })
    } else {
      console.log('TODO')
    }
  },
  render (bounds = {
    x: 0,
    y: 0,
    width: this.canvas.getWidth(),
    height: this.canvas.getHeight()
  }) {
    this.bounds = {
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height
    }
    this.intersection = {
      left: bounds.x,
      top: bounds.y,
      right: bounds.width,
      bottom: bounds.height,
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height
    }
    const start = Date.now()
    this.plugins.prerender.forEach(plugin => plugin(this))
    this.children.slice(this.children.length - 2).forEach(child => {
      this.layoutView(child)
      this.renderView(child)
    })
    const diff = Date.now() - start
    if (diff >= 1000 / 60) {
      console.log('slow draw', diff, 'ms')
    }
  },
  highlightArea (
    color,
    x1, y1, w1, h1,
    x2, y2, w2, h2
  ) {
    this.canvas.fillStyle(color)
    this.canvas.fillRect(x1, y1, w1, y2 - y1) // full top
    this.canvas.fillRect(x1, y2, x2 - x1, h2) // part left
    this.canvas.fillRect(x2 + w2, y2, (x1 + w1) - (x2 + w2), h2) // part right
    this.canvas.fillRect(x1, y2 + h2, w1, (y1 + h1) - (y2 + h2)) // full bottom
  },
  getIntersection (view) {
    view.isInBounds = false
    if (!view.hidden) {
      const parent = view.parent
      const intersection = {
        x: Math.max(parent.intersection.x, view.bounds.x),
        y: Math.max(parent.intersection.y, view.bounds.y)
      }
      intersection.left = intersection.x
      intersection.top = intersection.y
      intersection.right = Math.min(parent.intersection.x + parent.intersection.width, view.bounds.x + view.bounds.width)
      intersection.bottom = Math.min(parent.intersection.y + parent.intersection.height, view.bounds.y + view.bounds.height)
      intersection.width = intersection.right - intersection.left
      intersection.height = intersection.bottom - intersection.top
      view.intersection = intersection
      // then check if its in bounds
      view.isInBounds = intersection.width > 0 && intersection.height > 0
    }
  },
  layoutView (view) {
    const bounds = view.hidden ? { x: 0, y: 0, width: 0, height: 0 } : view.managers.reduce((bounds, manager) => {
      const wrapper = manager(view, this)
      const current = typeof wrapper === 'function' ? wrapper() : wrapper
      return {
        x: Math.round((current.x || 0) + bounds.x),
        y: Math.round((current.y || 0) + bounds.y),
        width: Math.round((current.width || 0) + bounds.width),
        height: Math.round((current.height || 0) + bounds.height)
      }
    }, {
      x: 0,
      y: 0,
      width: view.width,
      height: view.height
    })
    const moved = !equals(view.bounds, bounds)
    view.bounds = bounds
    this.getIntersection(view)
    if (view.isInBounds && view.children.reduce((moved, child) => this.layoutView(child) || moved, moved)) {
      this.layoutView(view)
      return true
    }
    return false
  },
  renderView (view) {
    if (view.isInBounds) {
      this.canvas.save()
      this.plugins.render.forEach(plugin => plugin(view))
      view.children.forEach((child, index) => {
        this.renderView(child)
      })
      this.canvas.restore()
    }
  },
  observe (...args) {
    const observables$ = args
    const onChange = observables$.pop()
    const view = this.active
    observables$.forEach((observable$, i) => {
      observable$.observe(Observable.skipFirst(observable => {
        this.active = view
        const values = observables$.map(it => it.get())
        values[i] = observable
        onChange(...values)
      }))
    })
    onChange(...observables$.map(it => it.get()))
  },
  bind () {
    for (let i in this) {
      if (typeof this[i] === 'function') {
        this[i] = this[i].bind(this)
      }
    }
  }
}
export default Screen
