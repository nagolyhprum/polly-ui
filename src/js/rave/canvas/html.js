const SHADOW = 8
export default class Canvas {
  getRatio () {
    return window.devicePixelRatio || 1
  }
  constructor (canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.images = {}
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
    const textbox = document.createElement('input')
    document.body.appendChild(textbox)
    return {
      onBlur (onBlur) {
        textbox.onblur = onBlur
      },
      onInput (onInput) {
        textbox.oninput = onInput
        textbox.onkeydown = onInput
        textbox.onmousedown = onInput
        window.onselect = onInput
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
      bounds (bounds) {
        textbox.style.left = `${bounds.x}px`
        textbox.style.top = `${bounds.y}px`
        textbox.style.width = `${bounds.width}px`
        textbox.style.height = `${bounds.height}px`
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
  onMouseMove (cb) {
    this.canvas.onmousemove = e => {
      cb(this.getMouse(e))
    }
  }
  onMouseUp (cb) {
    this.canvas.onmouseup = e => {
      cb(this.getMouse(e))
    }
  }
  onClick (cb) {
    this.canvas.onclick = e => {
      cb(this.getMouse(e))
    }
  }
  onMouseOut (cb) {
    this.canvas.onmouseout = e => {
      cb(this.getMouse(e))
    }
  }
  onMouseDown (cb) {
    this.canvas.onmousedown = e => {
      cb(this.getMouse(e))
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
  setWidth(width) {
    this.canvas.width = width
  }
  setHeight(height) {
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
    if(obj instanceof Canvas) {
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
}
