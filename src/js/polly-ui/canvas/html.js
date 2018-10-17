import Parent from './'
import Screen from 'polly-ui/screen'
import Observable from 'polly-ui/observable'
const SHADOW = 8
export default class Canvas extends Parent {
  getRatio () {
    return window.devicePixelRatio || 1
  }
  constructor (canvas) {
    super()
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.images = {}
    canvas.onmousemove = e => {
      this.events.call('onmousemove', this.getMouse(e))
    }
    canvas.onmouseup = e => {
      this.events.call('onmouseup', this.getMouse(e))
    }
    canvas.onclick = e => {
      this.events.call('onclick', this.getMouse(e))
    }
    canvas.onmouseout = e => {
      this.events.call('onmouseout', this.getMouse(e))
    }
    canvas.onmousedown = e => {
      this.events.call('onmousedown', this.getMouse(e))
    }
  }
  colorPicker () {
    const cp = document.createElement('input')
    cp.type = 'color'
    return {
      onChange (onchange) {
        cp.onchange = onchange
      },
      value () {
        return cp.value
      },
      choose (color) {
        cp.value = color
        cp.click()
      }
    }
  }
  cursor (cursor) {
    this.canvas.style.cursor = cursor
  }
  textbox () {
    if (!this._textbox) {
      document.body.appendChild(this._textbox = document.createElement('input'))

      this._textbox.style.boxSizing = 'border-box'
      this._textbox.style.padding = 0
      this._textbox.style.border = 0
      this._textbox.style.margin = 0
      this._textbox.style.color = this._textbox.style.background = 'transparent'
      this._textbox.style.outline = 'none'
      this._textbox.style.position = 'absolute'
      this._textbox.style.caretColor = 'black'
      this._textbox.style.font = '12px sans-serif'
    }
    const textbox = this._textbox
    const screen = this
    return {
      view (view) {
        if (arguments.length === 1) {
          textbox.view = view
        }
        return textbox.view
      },
      onBlur (onBlur) {
        textbox.onblur = onBlur
      },
      onInput (onInput) {
        textbox.oninput = onInput
        textbox.onkeydown = e => onInput(e.which)
        textbox.onchange = onInput
        textbox.onselect = onInput
      },
      value (value) {
        if (arguments.length === 1) {
          textbox.value = value
        }
        return textbox.value
      },
      visibility (visible) {
        textbox.style.display = visible ? 'block' : 'none'
      },
      bounds (bounds, padding = [], margin = []) {
        textbox.style.left = `${bounds.x / screen.getRatio()}px`
        textbox.style.top = `${bounds.y / screen.getRatio()}px`
        textbox.style.width = `${bounds.width / screen.getRatio()}px`
        textbox.style.height = `${bounds.height / screen.getRatio()}px`
        textbox.style.padding = padding.map(it => `${it / screen.getRatio()}px`).join(' ')
        textbox.style.margin = margin.map(it => `${it / screen.getRatio()}px`).join(' ')
      },
      focus () {
        if (textbox !== document.activeElement) {
          textbox.focus()
        }
      },
      input (type) {
        textbox.type = type
      },
      scroll () {
        return textbox.scrollLeft
      },
      type (type) {
        textbox.type = type
      }
    }
  }
  arc () {
    this.context.arc(...arguments)
  }
  rect () {
    this.context.rect(...arguments)
  }
  scale (scale) {
    this.context.scale(scale, scale)
  }
  shadow (shadow) {
    if (shadow) {
      this.context.shadowColor = 'rgba(0, 0, 0, .7)'
      this.context.shadowBlur = SHADOW
      this.context.shadowOffsetX = 0
      this.context.shadowOffsetY = SHADOW
    } else {
      this.context.shadowColor = 'transparent'
      this.context.shadowBlur = 0
      this.context.shadowOffsetX = 0
      this.context.shadowOffsetY = 0
    }
  }
  alpha (alpha) {
    if (arguments.length === 1) {
      this.context.globalAlpha = alpha
    }
    return this.context.globalAlpha
  }
  clip () {
    this.context.clip()
  }
  isPointInPath () {
    return this.context.isPointInPath(...arguments)
  }
  getMouse (e) {
    const bounds = this.canvas.getBoundingClientRect()
    return {
      x: e.pageX - bounds.left,
      y: e.pageY - bounds.top
    }
  }
  textBaseline (textBaseline) {
    this.context.textBaseline = textBaseline
  }
  textAlign (textAlign) {
    this.context.textAlign = textAlign
  }
  fillText () {
    this.context.fillText(...arguments)
  }
  strokeRect () {
    this.context.strokeRect(...arguments)
  }
  setLineDash () {
    this.context.setLineDash(...arguments)
  }
  fillRect () {
    this.context.fillRect(...arguments)
  }
  translate () {
    this.context.translate(...arguments)
  }
  save () {
    this.context.save()
  }
  restore () {
    this.context.restore()
  }
  setWidth (width) {
    this.canvas.width = width
  }
  setHeight (height) {
    this.canvas.height = height
  }
  getWidth (image) {
    if (image) {
      return image.width
    }
    return this.canvas.width
  }
  getHeight (image) {
    if (image) {
      return image.height
    }
    return this.canvas.height
  }
  beginPath () {
    this.context.beginPath()
  }
  moveTo () {
    this.context.moveTo(...arguments)
  }
  lineTo () {
    this.context.lineTo(...arguments)
  }
  quadraticCurveTo () {
    this.context.quadraticCurveTo(...arguments)
  }
  closePath () {
    this.context.closePath(...arguments)
  }
  fillStyle (fillStyle) {
    this.context.fillStyle = fillStyle
  }
  fill () {
    this.context.fill(...arguments)
  }
  drawImage (obj, ...rem) {
    if (obj instanceof Canvas) {
      this.context.drawImage(obj.canvas, ...rem)
    } else {
      this.context.drawImage(...arguments)
    }
  }
  strokeStyle (strokeStyle) {
    this.context.strokeStyle = strokeStyle
  }
  stroke () {
    this.context.stroke(...arguments)
  }
  font (size, style, weight) {
    const font = `${weight} ${size}px ${style}`.trim()
    this.context.font = font
  }
  clear () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  measureText (text) {
    return {
      height: parseInt(this.context.font.replace(/[^\d.]+/g, '')),
      width: this.context.measureText(text).width
    }
  }
  image (src, color) {
    const key = `${src}_${color}`
    this.images[key] = this.images[key] || fetch(src).then(res => res.text()).then(text => {
      const image = new Image()
      image.src = `data:image/svg+xml;base64,${btoa(text.replace(/<path/g, '<path fill="' + color + '"'))}`
      return image
    })
    return this.images[key]
  }
  static start (view, resources, state) {
    const canvas = new Canvas(document.getElementsByTagName('canvas')[0])

    const state$ = new Observable(state)

    const screen = new Screen(
      state$,
      resources,
      canvas
    )

    const setSize = () => {
      const ratio = canvas.getRatio() || 1
      canvas.canvas.width = window.innerWidth * ratio
      canvas.canvas.height = window.innerHeight * ratio
      canvas.canvas.style.position = 'absolute'
      canvas.canvas.style.left = 0
      canvas.canvas.style.top = 0
      canvas.canvas.style.width = '100%'
      canvas.canvas.style.height = '100%'
    }
    setSize()
    screen.start(view)
    window.onresize = function () {
      setSize()
      screen.render()
    }
  }
}
