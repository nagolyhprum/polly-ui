import {
  equals
} from 'utils'
import Observable from 'rave/observable'
import font from 'font'

let isDebug = true

const slightRound = 4
const EMPTY_ARRAY = [0, 0, 0, 0]
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
const LINE_SPACING = 8

function roundRect (context, x, y, width, height, radius, fill, stroke) {
  radius = { tl: radius, tr: radius, br: radius, bl: radius }
  context.beginPath()
  context.moveTo(x + radius.tl, y)
  context.lineTo(x + width - radius.tr, y)
  context.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
  context.lineTo(x + width, y + height - radius.br)
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  )
  context.lineTo(x + radius.bl, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
  context.lineTo(x, y + radius.tl)
  context.quadraticCurveTo(x, y, x + radius.tl, y)
  context.closePath()
  if (fill) {
    context.fillStyle = fill
    context.fill()
  }
  if (stroke) {
    context.strokeStyle = stroke
    context.stroke()
  }
}

const getValue = (view, dim) => {
  if (typeof view[dim] === 'function') {
    return view[dim](view, dim)
  } else {
    return view[dim]
  }
}

const getTopBottom = r => {
  return r instanceof Array ? r[0] + r[2] : 0
}

const getLeftRight = r => {
  return r instanceof Array ? r[1] + r[3] : 0
}

const getName = view => view.text.display || view.image || `(${view.children.map(getName)})`

const reposition = view => {
  const padding = view.parent.padding instanceof Array ? view.parent.padding : EMPTY_ARRAY
  const margin = view.parent.margin instanceof Array ? view.parent.margin : EMPTY_ARRAY
  return {
    x: view.parent.bounds.x + padding[3] + margin[3] + view.x + (view.parent.scrollX || 0),
    y: view.parent.bounds.y + padding[0] + margin[0] + view.y + (view.parent.scrollY || 0)
  }
}

function Screen (canvas) {
  this.textbox = document.createElement('input')
  document.body.appendChild(this.textbox)
  this.textbox.onblur = e => {
    const view = this.textbox.view
    if (view) {
      this.textbox.view = null
      view.textbox = null
      this.render()
    }
  }
  this.textbox.oninput = e => {
    const view = this.textbox.view
    if (view) {
      view.text.display = this.textbox.value
      this.render()
    }
  }

  this.children = []
  this.active = this
  this.canvas = canvas
  this.bounds = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height
  }
  this.intersection = {
    left: 0,
    top: 0,
    right: canvas.width,
    bottom: canvas.height,
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height
  }
  this.context = canvas.getContext('2d')
  this.bind()

  const getMouse = (e, name) => {
    const bounds = canvas.getBoundingClientRect()
    return {
      x: e.pageX - bounds.left,
      y: e.pageY - bounds.top,
      name
    }
  }

  this.last = []
  const call = (e, name) => {
    const mouse = getMouse(e, name)
    const mouseOver = this.mouseOver(mouse, this)
    this.last.forEach(view => {
      if (!mouseOver.contains(view)) {
        view.onMouseOut && view.onMouseOut(getMouse(e, 'onMouseOut'))
      }
    })
    mouseOver.forEach(view => {
      if (!this.last.contains(view)) {
        view.onMouseIn && view.onMouseIn(getMouse(e, 'onMouseIn'))
      }
    })
    this.last = mouseOver
    let view = mouseOver[mouseOver.length - 1]
    while (view && !view[name]) {
      view = view.parent
    }
    if (view && view !== this) {
      view[name](mouse)
    }
  }

  let moved
  canvas.onmousedown = e => {
    moved = 0
    call(e, 'onMouseDown')
  }

  canvas.onmouseout = e => {
    const mouse = getMouse(e, 'onMouseOut')
    this.last.forEach(view => {
      view.onMouseOut && view.onMouseOut(mouse)
    })
    this.last = []
  }

  canvas.onmousemove = e => {
    moved++
    call(e, 'onMouseMove')
  }

  canvas.onmouseup = e => {
    call(e, 'onMouseUp')
  }

  canvas.onclick = e => {
    if (moved < 5) {
      call(e, 'onClick')
    }
  }
}

Screen.prototype = {
  mouseOver (mouse, view) {
    return view.children.reduce((mouseOver, child) => {
      const {
        x,
        y,
        width,
        height
      } = child.bounds
      const margin = child.margin || EMPTY_ARRAY
      child.render(
        this.context,
        x + margin[3],
        y + margin[0],
        width - getLeftRight(margin),
        height - getTopBottom(margin),
        getValue(child, 'round')
      )
      if (child.isInBounds && this.context.isPointInPath(mouse.x, mouse.y)) {
        return mouseOver.concat([child]).concat(this.mouseOver(mouse, child))
      }
      return mouseOver
    }, [])
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
  WRAP: (function () {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    return dim => view => {
      const spaceAround = {
        width: getLeftRight(view.padding) + getLeftRight(view.margin),
        height: getTopBottom(view.padding) + getTopBottom(view.margin)
      }[dim]
      if (view.image) {
        const imageBounds = {
          width: view.image.width || view.image.naturalWidth,
          height: view.image.height || view.image.naturalHeight
        }
        const other = OPPOSITE_DIMENSIONS[dim]
        const opposite = Math.max(0, view.bounds[other] - spaceAround) / imageBounds[other] * imageBounds[dim]
        return {
          [dim]: (opposite || view.image[dim]) + spaceAround
        }
      } else if (view.children.length) {
        return {
          [dim]: Math.max(...view.children.map(
            child =>
              child[COMPLEMENTARY_DIMENSIONS[dim]] + // child.x
              // child.bounds[COMPLEMENTARY_DIMENSIONS[dim]] + //child.bounds.x
              child.bounds[dim] + // child.bounds.width
              spaceAround
          ))
        }
      } else if (view.text.display || view.input) {
        if (dim === 'width') {
          context.font = `${view.text.size}px sans-serif`
          return {
            width: Math.max(...view.text.display.split('\n').map(display => context.measureText(display).width)) + spaceAround
          }
        } else if (dim === 'height') {
          const count = view.text.display.split('\n').length
          return {
            height: (
              view.text.size * count + LINE_SPACING * (count - 1) + spaceAround
            )
          }
        }
      }
      return {
        [dim]: spaceAround
      }
    }
  })(),
  container (width, height, render) {
    const parent = this.active
    const child = {
      render: roundRect,
      round: 0,
      // margin
      // padding
      // background
      // onClick
      managers: [
        typeof width === 'function' ? width('width') : () => ({ width }),
        typeof height === 'function' ? height('height') : () => ({ height }),
        reposition
      ],
      overflow: true,
      parent,
      alpha: 1,
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
      scrollX: 0,
      scrollY: 0,
      children: [],
      text: {
        // display
        size: 12,
        color: 'black',
        weight: 'normal',
        align: 'left'
      }
    }
    parent.children.push(child)
    this.active = child
    render(child)
    this.active = parent
    return child
  },
  style (text) {
    if (text.size) {
      this.active.text.size = text.size
    }
  },
  getViewPortSize (view) {
    return {
      width: view.bounds.width - getLeftRight(view.padding) - getLeftRight(view.margin),
      height: view.bounds.height - getTopBottom(view.padding) - getTopBottom(view.margin)
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
        alpha: view.alpha
      }, {
        alpha: 1
      }, this.firstRender ? 0 : 300)
    } else {
      this.animate({
        alpha: view.alpha
      }, {
        alpha: 0
      }, this.firstRender ? 0 : 300, () => {
        view.hidden = true
      })
    }
  },
  timeout (callback, ms) {
    const active = this.active
    setTimeout(() => {
      this.active = active
      callback()
      this.render()
    }, ms)
  },
  margin (...margin) {
    if (margin.length === 1) {
      this.active.margin = [margin[0], margin[0], margin[0], margin[0]]
    } else {
      this.active.margin = margin
    }
  },
  padding (...padding) {
    if (padding.length === 1) {
      this.active.padding = [padding[0], padding[0], padding[0], padding[0]]
    } else {
      this.active.padding = padding
    }
  },
  background (background) {
    this.active.background = background
  },
  onClick (onClick) {
    this.active.onClick = onClick
  },
  text (display) {
    this.active.text.display = display
  },
  round (round) {
    this.active.round = round
  },
  shadow (shadow = true) {
    this.active.shadow = shadow
  },
  src (image) {
    this.active.image = image
  },
  textColor (textColor) {
    this.active.text.color = textColor
  },
  textAlign (align) {
    this.active.text.align = align
  },
  input (input = 'text') {
    const view = this.active
    view.input = input
    view.overflow = false
    view.onClick = () => {
      view.textbox = this.textbox
      this.textbox.view = view
      this.textbox.value = view.text.display
      this.textbox.type = input
      this.render()
    }
  },
  animate (from, to, ms, cb) {
    const view = this.active
    const start = Date.now()
    const handler = (now = Date.now()) => {
      const percent = Math.min((now - start) / ms, 1)
      const weight = percent
      Object.keys(from).forEach(key => {
        view[key] = from[key] + (to[key] - from[key]) * weight
      })
      if (percent === 1) {
        clearInterval(interval)
        cb && cb()
      }
      this.render()
    }
    handler(start)
    const interval = setInterval(handler, 1000 / 60)
  },
  start (view, state) {
    this.firstRender = true
    this.active = this
    this.container(this.MATCH, this.MATCH, () => {
      view.call(this, state)
      if (this.children.length > 1) {
        this.animate({
          alpha: 0.25,
          x: this.bounds.width
        }, {
          alpha: 1,
          x: 0
        }, 300)
      }
    })
    this.render()
    this.firstRender = false
    return this
  },
  back () {
    if (this.children.length > 1) {
      this.active = this.children[this.children.length - 1]
      this.animate({
        alpha: 1,
        x: 0
      }, {
        alpha: 0.25,
        x: this.bounds.width
      }, 300, () => {
        this.children.pop()
      })
    } else {
      console.log('TODO')
    }
  },
  separator () {
    this.active.separator = true
  },
  linear (spacing = 0, direction = 'vertical') {
    this.active.managers.unshift(view => {
      const weight = view.children.reduce((weight, child) => weight + (child.weight || 0), 0)
      if (weight) {
        const dim = direction === 'vertical' ? 'height' : 'width'
        const vp = this.getViewPortSize(view)
        const space = view.children.reduce((space, child) => {
          return space - (child.weight ? 0 : child.bounds[dim])
        }, vp[dim] - spacing * (view.children.length - 1))
        view.children.forEach(child => {
          if (child.weight) {
            child[dim] = (child.weight / weight) * space
          }
        })
      }
      view.children.forEach((child, index) => {
        if (index) {
          const previous = view.children[index - 1]
          if (direction === 'vertical') {
            child.y = previous.y + previous.bounds.height + spacing
          } else if (direction === 'horizontal') {
            child.x = previous.x + previous.bounds.width + spacing
          }
        }
      })
      return {}
    })
  },
  weight (weight) {
    this.active.weight = weight
  },
  render () {
    this.textbox.style.display = 'none'
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.children.forEach(child => {
      this.layoutView(child)
      this.renderView(child)
    })
    const ctx = this.context
    const cvs = this.canvas
    ctx.beginPath()

    ctx.moveTo(0, 0)
    ctx.lineTo(cvs.width, 0)
    ctx.lineTo(cvs.width, cvs.height)
    ctx.lineTo(0, cvs.height)
    ctx.lineTo(0, 0)

    ctx.moveTo(cvs.width / 4, cvs.height / 4)
    ctx.lineTo(3 * cvs.width / 4, cvs.height / 4)
    ctx.lineTo(3 * cvs.width / 4, 3 * cvs.height / 4)
    ctx.lineTo(cvs.width / 4, 3 * cvs.height / 4)
    ctx.lineTo(cvs.width / 4, cvs.height / 4)
    ctx.fillStyle = 'rgba(0,0,0,.7)'
    ctx.fill()
  },
  scrollable () {
    const active = this.active
    active.overflow = false
    let lastMouse; let dx = 0; let dy = 0
    // TODO : DO SOMETHING WITH THIS
    // let lastTs = Date.now();
    setInterval(() => {
      // const now = Date.now()
      // const dt = (now - lastTs) / 1000
      // lastTs = now
      dx /= 1.2
      if (Math.abs(dx) < 1) {
        dx = 0
      }
      dy /= 1.2
      if (Math.abs(dy) < 1) {
        dy = 0
      }
      if (!lastMouse && (dx || dy)) {
        update()
      }
    }, 1000 / 60)
    const update = () => {
      const right = Math.max(0, ...active.children.map(child => child.bounds.x + child.bounds.width - (active.bounds.x + active.bounds.width + active.scrollX)))
      const bottom = Math.max(0, ...active.children.map(child => child.bounds.y + child.bounds.height - (active.bounds.y + active.bounds.height + active.scrollY)))
      active.scrollX = Math.max(Math.min(active.scrollX + dx, 0), -right)
      active.scrollY = Math.max(Math.min(active.scrollY + dy, 0), -bottom)
      this.render()
    }
    active.onMouseMove = function (mouse) {
      if (lastMouse) {
        dx = mouse.x - lastMouse.x
        dy = mouse.y - lastMouse.y
        update()
        lastMouse = mouse
      }
    }
    active.onMouseDown = function (mouse) {
      lastMouse = mouse
    }
    active.onMouseUp = active.onMouseOut = function (mouse) {
      lastMouse = null
    }
  },
  getIntersection (view) {
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
    view.isInBounds = intersection.width > 0 && intersection.height > 0 && !view.hidden
  },
  layoutView (view) {
    const bounds = view.hidden ? { x: 0, y: 0, width: 0, height: 0 } : view.managers.reduce((bounds, manager) => {
      const wrapper = manager(view)
      const current = typeof wrapper === 'function' ? wrapper(view) : wrapper
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
    if (moved) {
      this.layoutView(view)
    } else {
      this.getIntersection(view)
    }
    if (view.children.length) {
      if (view.children.reduce((moved, child) => this.layoutView(child) || moved, false)) {
        this.layoutView(view)
        return true
      }
    }
    return moved
  },
  renderView (view) {
    if (view.isInBounds) {
      this.context.save()
      this.context.globalAlpha = this.context.globalAlpha * view.alpha
      const x = view.bounds.x
      const y = view.bounds.y
      const width = view.bounds.width
      const height = view.bounds.height
      const margin = view.margin || EMPTY_ARRAY
      const padding = view.padding || EMPTY_ARRAY
      const mw = width - getLeftRight(margin)
      const mh = height - getTopBottom(margin)

      if (view.shadow) {
        const shadow = 2
        this.context.shadowColor = 'rgba(0, 0, 0, .7)'
        this.context.shadowBlur = shadow
        this.context.shadowOffsetX = shadow
        this.context.shadowOffsetY = shadow
      }
      view.render(
        this.context,
        x + margin[3],
        y + margin[0],
        mw,
        mh,
        getValue(view, 'round'),
        view.background || 'transparent'
      )
      this.context.shadowColor = 'transparent'
      this.context.shadowBlur = 0
      this.context.shadowOffsetX = 0
      this.context.shadowOffsetY = 0
      // DEBUG HERE
      if (isDebug) {
        this.context.translate(x, y)
        // padding
        if (padding) {
          this.context.fillStyle = 'rgba(0, 255, 0, .7)'
          // top
          this.context.fillRect(margin[3], margin[0], width - (margin[3] + margin[1]), padding[0])
          // left
          this.context.fillRect(margin[3], margin[0] + padding[0], padding[3], height - (margin[0] + margin[2] + padding[0]))
          // right
          this.context.fillRect(width - margin[1] - padding[1], margin[0] + padding[0], padding[1], height - (margin[0] + margin[2] + padding[0]))
          // bottom
          this.context.fillRect(margin[3] + padding[3], height - margin[2] - padding[2], width - (margin[3] + padding[3] + margin[1] + padding[1]), padding[2])
        }
        // margin
        if (margin) {
          this.context.fillStyle = 'rgba(0, 0, 255, .7)'
          // top
          this.context.fillRect(0, 0, width, margin[0])
          // left
          this.context.fillRect(0, margin[0], margin[3], height - margin[0])
          // right
          this.context.fillRect(width - margin[1], margin[0], margin[1], height - margin[0])
          // bottom
          this.context.fillRect(margin[3], height - margin[2], width - margin[1] - margin[3], margin[2])
        }
        // outline
        this.context.strokeStyle = 'rgba(0, 0, 0, .7)'
        this.context.setLineDash([2, 4])
        this.context.strokeRect(0, 0, width, height)
        this.context.setLineDash([])
        this.context.translate(-x, -y)
      }
      if (view.image && view.image.complete) {
        this.context.drawImage(view.image, x + padding[3], y + padding[0], mw - getLeftRight(padding), mh - getTopBottom(padding))
      }
      // STOP DEBUG
      if (!view.overflow) {
        this.context.clip()
      }
      if (view.textbox) {
        view.textbox.style.display = 'block'
        view.textbox.style.left = `${view.bounds.x}px`
        view.textbox.style.top = `${view.bounds.y}px`
        view.textbox.style.width = `${view.bounds.width}px`
        view.textbox.style.height = `${view.bounds.height}px`
        if (this.textbox !== document.activeElement) {
          this.textbox.focus()
        }
      }
      if (view.text.display) {
        const offset = view.textbox ? view.textbox.scrollLeft : 0
        this.context.fillStyle = view.text.color
        this.context.font = `${view.text.size}px sans-serif`
        this.context.textBaseline = 'top'
        this.context.textAlign = view.text.align
        const lines = view.text.display.split('\n')
        lines.forEach((line, index) => {
          let offsetX = 0
          switch (this.context.textAlign) {
            case 'right' : offsetX = width - getLeftRight(padding); break
            case 'center' : offsetX = mw / 2 - padding[3]; break
          }
          // \u25CF
          // \u2022
          this.context.fillText(
            view.input === 'password' ? line.split('').map(it => '\u2022').join('') : line,
            x + offsetX + padding[3] - offset,
            y + index * (view.text.size + LINE_SPACING) + padding[0]
          )
        })
      }
      view.children.forEach((child, index) => {
        this.renderView(child)
        if (index > 0 && view.separator) {
          this.context.beginPath()
          this.context.moveTo(
            child.bounds.x,
            child.bounds.y
          )
          this.context.lineTo(
            child.bounds.x + child.bounds.width,
            child.bounds.y
          )
          this.context.strokeStyle = 'rgba(0, 0, 0, .7)'
          this.context.stroke()
        }
      })
      this.context.globalAlpha = this.context.globalAlpha / view.alpha
      this.context.restore()
    }
  },
  button (color) {
    this.textAlign('center')
    this.padding(16)
    this.textColor('white')
    if (color) {
      this.round(child => Math.min(child.bounds.width / 2, child.bounds.height / 2))
      this.background(color)
    }
  },
  card () {
    this.background('white')
    this.round(slightRound)
    this.shadow()
  },
  tabs (...tabs) {
    const tab$ = new Observable(0)
    this.container(this.MATCH, this.WRAP, container => {
      this.container(this.MATCH, this.WRAP, () => {
        this.linear(0, 'horizontal')
        tabs.forEach((text, index) => {
          this.container(0, this.WRAP, () => {
            this.textColor(index ? 'black' : 'white')
            this.padding(16)
            this.weight(1)
            this.text(text)
            this.style(font.normal_12)
            this.textAlign('center')
            this.onClick(() => tab$.set(index))
          })
        })
      })
      const indicator = this.container(dim => view => ({
        width: view.parent.bounds.width / tabs.length
      }), 5, () => {
        this.position(0, 1)
        this.anchor(0, 1)
        this.background('gold')
      })
      tab$.observe(tab => {
        container.children[0].children.forEach(child => {
          child.text.color = 'black'
        })
        container.children[0].children[tab].text.color = 'white'
        this.active = indicator
        this.animate({
          x: indicator.x
        }, {
          x: tab * container.bounds.width / tabs.length
        }, 300)
      })
    })
    return tab$
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
    for (var i in this) {
      if (typeof this[i] === 'function') {
        this[i] = this[i].bind(this)
      }
    }
  }
}
export default Screen
