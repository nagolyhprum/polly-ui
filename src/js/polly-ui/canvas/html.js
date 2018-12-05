import Parent from './'
import Screen from 'polly-ui/screen'
import Observable from 'polly-ui/observable'
const SHADOW = 8
const EMPTY_ARRAY = [0, 0, 0, 0]

const animationTimeout = window.requestAnimationFrame

export default class Canvas extends Parent {
  getRatio () {
    return window.devicePixelRatio || 1
  }
  onScroll (onscroll) {
    this.canvas.onmousewheel = e => {
      e.preventDefault && e.preventDefault()
      e.stopPropagation && e.stopPropagation()
      onscroll(Object.assign({
        deltaX: e.wheelDeltaX,
        deltaY: e.wheelDeltaY
      }, this.getMouse(e)))
      return false
    }
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
    document.body.onkeydown = e => {
      this.events.call('onkeydown', e.which)
    }
    document.body.onkeyup = e => {
      this.events.call('onkeyup', e.which)
    }
    this.last = new Date()
    this.render()
  }
  render() {
    animationTimeout(() => this.render())
    const now = new Date()
    const diff = now - this.last
    this.last = now
    this.events.call("onRender", diff)
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
    const inputs = [this._textarea, this._input]
    if (!this._input) {
      this._input = document.createElement('input')
      this._textarea = document.createElement('textarea')
      document.body.appendChild(this._input)
      document.body.appendChild(this._textarea)
      inputs[0] = this._input
      inputs[1] = this._textarea
      inputs.forEach(textbox => {
        textbox.style.whiteSpace = 'nowrap'
        textbox.style.overflow = 'auto'
        textbox.style.boxSizing = 'border-box'
        textbox.style.padding = 0
        textbox.style.border = 0
        textbox.style.margin = 0
        textbox.style.color = 'transparent'
        textbox.style.background = 'transparent'
        textbox.style.outline = 'none'
        textbox.style.position = 'absolute'
        textbox.style.caretColor = 'black'
        textbox.style.font = '12px sans-serif'
        textbox.style.lineHeight = '100%'
      })
    }
    const screen = this
    return {
      view (view) {
        if (arguments.length === 1) {
          inputs.forEach(textbox => {
            textbox.view = view
          })
        }
        return screen._input.view
      },
      onBlur (onBlur) {
        inputs.forEach(textbox => {
          textbox.onblur = onBlur
        })
      },
      onInput (onInput) {
        inputs.forEach(textbox => {
          textbox.oninput = e => onInput(-1, textbox.value)
          textbox.onkeydown = e => onInput(e.which, textbox.value)
          textbox.onchange = e => onInput(-1, textbox.value)
          textbox.onselect = e => onInput(-1, textbox.value)
        })
      },
      value (value) {
        if (arguments.length === 1) {
          inputs.forEach(textbox => {
            textbox.value = value
          })
        }
      },
      visibility (type) {
        screen._input.style.display = type === 'single' ? 'block' : 'none'
        screen._textarea.style.display = type === 'multi' ? 'block' : 'none'
      },
      bounds (bounds, padding = EMPTY_ARRAY, margin = EMPTY_ARRAY) {
        inputs.forEach(textbox => {
          textbox.style.left = `${bounds.x / screen.getRatio()}px`
          textbox.style.top = `${bounds.y / screen.getRatio()}px`
          textbox.style.width = `${bounds.width / screen.getRatio()}px`
          textbox.style.height = `${bounds.height / screen.getRatio()}px`
          textbox.style.padding = padding.map(it => `${it / screen.getRatio()}px`).join(' ')
          textbox.style.margin = margin.map(it => `${it / screen.getRatio()}px`).join(' ')
        })
      },
      focus () {
        inputs.forEach(textbox => {
          if (textbox !== document.activeElement) {
            textbox.focus()
          }
        })
      },
      scroll () {
        return [
          inputs.reduce((total, textbox) => total + textbox.scrollLeft, 0),
          inputs.reduce((total, textbox) => total + textbox.scrollTop, 0)
        ]
      },
      type (type) {
        screen._input.type = type
      }
    }
  }
  rotate () {
    this.context.rotate(...arguments)
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
  aria (input) {
    this.canvas.innerHTML = ''
    this.generateAria(input, this.canvas)
  }
  generateAria (input, parent) {
    const tag = input.aria && input.aria.type
    const text = input.text || (typeof input.aria === 'string' ? input.aria : '')
    if (tag || text || input.onClick) {
      if (input.onClick) {
        const a = document.createElement('a')
        if (text) {
          a.innerHTML = text
        } else {
          input.children.forEach(child => this.generateAria(child, a))
        }
        a.href = 'javascript:void(0)'
        a.onclick = input.onClick
        a.view = input.view
        const wrap = document.createElement(tag || 'div')
        wrap.appendChild(a)
        parent.appendChild(wrap)
      } else {
        const wrap = document.createElement(tag || 'div')
        wrap.innerHTML = text
        parent.appendChild(wrap)
        input.children.forEach(child => this.generateAria(child, wrap))
      }
    } else {
      input.children.forEach(child => this.generateAria(child, parent))
    }
  }
  font (size, style, weight) {
    const font = `${weight} ${size}px ${style}`.trim()
    this.context.font = font
  }
  measureText (text) {
    const lines = text.split('\n')
    return {
      height: lines.length * parseInt(this.context.font.replace(/[^\d.]+/g, '')),
      width: Math.max(...lines.map(line => this.context.measureText(line).width))
    }
  }
  image (src, extra) {
    const key = `${src}_${extra}`
    this.images[key] = this.images[key] || fetch(src).then(res => res.arrayBuffer()).then(buffer => {
      const image = new Image()
      const ext = src.replace(/.*\.(.*)/g, "$1")
      switch(ext) {
        case "svg" :
          const text = String.fromCharCode.apply(null, new Uint8Array(buffer))
          if (extra) {
            image.src = `data:image/svg+xml;base64,${btoa(text.replace(/<path/g, '<path fill="' + extra + '"'))}`
          } else {
            image.src = `data:image/svg+xml;base64,${btoa(text)}`
          }
          break;
        case "png":
        case "jpg":
        case "jpeg":
          var bytes = new Uint8Array(buffer);
          var blob = new Blob([bytes.buffer]);
          image.src = URL.createObjectURL(blob)
          break
      }
      if(extra === "trim") {
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")
        image.onload = function() {
          canvas.width = this.naturalWidth
          canvas.height = this.naturalHeight
          context.drawImage(this, 0, 0)
          const { data } = context.getImageData(0, 0, canvas.width, canvas.height)
          let top = 0, right = this.naturalWidth, bottom = this.naturalHeight, left = 0
          //TOP
          let found = false
          for(var i = 0; i < this.naturalHeight && !found; i++) {
            for(var j = 0; j < this.naturalWidth && !found; j++) {
              const offset = (i * this.naturalWidth + j) * 4,
                r = data[offset],
                g = data[offset + 1],
                b = data[offset + 2],
                a = data[offset + 3]
              if(a && (r || g || b)) {
                found = true
              }
            }
            if(!found) {
              top++
            }
          }
          //BOTTOM
          found = false
          for(var i = this.naturalHeight - 1; i >= 0 && !found; i--) {
            for(var j = 0; j < this.naturalWidth && !found; j++) {
              const offset = (i * this.naturalWidth + j) * 4,
                r = data[offset],
                g = data[offset + 1],
                b = data[offset + 2],
                a = data[offset + 3]
              if(a && (r || g || b)) {
                console.log(a, r, g, b)
                found = true
              }
            }
            if(!found) {
              bottom--
            }
          }
          //LEFT
          found = false
          for(var i = 0; i < this.naturalWidth && !found; i++) {
            for(var j = 0; j < this.naturalHeight && !found; j++) {
              const offset = (i + j * this.naturalWidth) * 4,
                r = data[offset],
                g = data[offset + 1],
                b = data[offset + 2],
                a = data[offset + 3]
              if(a && (r || g || b)) {
                console.log(a, r, g, b)
                found = true
              }
            }
            if(!found) {
              left++
            }
          }
          //RIGHT
          found = false
          for(var i = this.naturalWidth - 1; i >= 0 && !found; i--) {
            for(var j = 0; j < this.naturalHeight && !found; j++) {
              const offset = (i + j * this.naturalWidth) * 4,
                r = data[offset],
                g = data[offset + 1],
                b = data[offset + 2],
                a = data[offset + 3]
              if(a && (r || g || b)) {
                console.log(a, r, g, b)
                found = true
              }
            }
            if(!found) {
              right--
            }
          }
          canvas.width = right - left
          canvas.height = bottom - top
          context.drawImage(this, -left, -top)
          canvas.complete = true
        }
        return canvas
      }
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
      screen.setDirty()
      screen.render({
        x: 0,
        y: 0,
        width: canvas.getWidth(),
        height: canvas.getHeight()
      }, true)
    }
  }
}
