export default extend => Object.assign({
  drawn: [],
  getWidth: () => 0,
  getHeight: () => 0,
  clear () {
    this.drawn = []
  },
  onScroll () {

  },
  cursor () {

  },
  getRatio () {
    return 1
  },
  image (src, callback) {
    return Promise.resolve(src)
  },
  onMouseDown (onmousedown) {
    this.onmousedown = onmousedown
  },
  onMouseOut (onmouseout) {
    this.onmouseout = onmouseout
  },
  onMouseMove (onmousemove) {
    this.onmousemove = onmousemove
  },
  onMouseUp (onmouseup) {
    this.onmouseup = onmouseup
  },
  onClick (onclick) {
    this.onclick = onclick
  },
  isPointInPath () {
    return true
  },
  textbox: () => ({
    onSubmit () {

    },
    onBlur (onBlur) {
      this.onblur = onBlur
    },
    onInput (onInput) {
      this.oninput = onInput
    },
    value (value) {
      if (arguments.length === 1) {
        this._value = value
      }
      return this._value
    },
    type (type) {
      if (arguments.length === 1) {
        this._type = type
      }
      return this._type
    },
    visibility (visibility) {
      if (arguments.length === 1) {
        this._visibility = visibility
      }
      return this._visibility
    },
    bounds (bounds, padding, margin) {
      if (arguments.length === 3) {
        this._bounds = bounds
      }
      return this._bounds
    },
    focus () {
    },
    view (view) {
      if (arguments.length === 1) {
        this._view = view
      }
      return this._view
    }
  }),
  moveTo () {
    this.drawn.push(['moveTo', ...arguments])
  },
  lineTo () {
    this.drawn.push(['lineTo', ...arguments])
  },
  quadraticCurveTo () {
    this.drawn.push(['quadraticCurveTo', ...arguments])
  },
  beginPath () {
    this.drawn.push(['beginPath'])
  },
  closePath () {
    this.drawn.push(['closePath'])
  },
  rect () {
    this.drawn.push(['rect', ...arguments])
  },
  fill () {
    this.drawn.push(['fill', ...arguments])
  },
  fillStyle () {
    this.drawn.push(['fillStyle', ...arguments])
  },
  strokeStyle () {
    this.drawn.push(['strokeStyle', ...arguments])
  },
  setLineDash () {
    this.drawn.push(['setLineDash', ...arguments])
  },
  strokeRect () {
    this.drawn.push(['strokeRect', ...arguments])
  },
  arc () {
    this.drawn.push(['arc', ...arguments])
  },
  stroke () {
    this.drawn.push(['stroke'])
  },
  shadow () {
    this.drawn.push(['shadow', ...arguments])
  }
}, extend)
