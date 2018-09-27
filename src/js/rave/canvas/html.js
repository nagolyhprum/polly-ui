export default class Canvas {
  constructor (canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.images = {}
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
  drawImage () {
    this.context.drawImage(...arguments)
  }
  strokeStyle (strokeStyle) {
    this.context.strokeStyle = strokeStyle
  }
  stroke () {
    this.context.stroke(...arguments)
  }
  font (size, style) {
    this.context.font = `${size}px ${style}`
  }
  clear () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  measureText (text) {
    return this.context.measureText(text).width
  }
  image (src, cb) {
    if (!this.images[src]) {
      const image = this.images[src] = new Image()
      image.onload = () => {
        cb(image)
      }
      image.src = src
    }
    return this.images[src]
  }
}