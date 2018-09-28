import { EMPTY_ARRAY, LEFT, TOP, RIGHT, LINE_SPACING } from 'rave/screen'

export default function (screen) {
  const init = function (view) {
    view.text = view.text || {
      // display
      size: 12,
      color: 'black',
      weight: 'normal',
      align: 'left'
    }
  }
  screen.style = function (text) {
    init(this.active)
    if (text.size) {
      this.active.text.size = text.size
    }
  }
  screen.text = function (display) {
    init(this.active)
    this.active.text.display = display
  }
  screen.textColor = function (textColor) {
    init(this.active)
    this.active.text.color = textColor
  }
  screen.textAlign = function (align) {
    init(this.active)
    this.active.text.align = align
  }
  screen.plugins.render.push(function (view) {
    if (view.text && view.text.display) {
      const margin = view.margin || EMPTY_ARRAY
      const padding = view.padding || EMPTY_ARRAY
      const x = view.bounds.x
      const y = view.bounds.y

      const wpm = view.bounds.width

      const wp = wpm - screen.getLeftRight(margin)

      const w = wp - screen.getLeftRight(padding)

      const offset = view.textbox ? view.textbox.scrollLeft : 0
      screen.canvas.fillStyle(view.text.color)
      screen.canvas.font(view.text.size, 'sans-serif')
      screen.canvas.textBaseline('top')
      screen.canvas.textAlign(view.text.align)
      const lines = view.text.display.split('\n')
      lines.forEach((line, index) => {
        let offsetX = padding[LEFT] + margin[LEFT]
        switch (view.text.align) {
          case 'right' : offsetX = w - padding[RIGHT] - margin[RIGHT]; break
          case 'center' : offsetX = wpm / 2; break
        }
        screen.canvas.fillText(
          view.input === 'password' ? line.split('').map(it => '\u2022').join('') : line,
          x + offsetX - offset,
          y + index * (view.text.size + LINE_SPACING) + padding[TOP]
        )
      })
    }
  })
}
