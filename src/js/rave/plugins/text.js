import { EMPTY_ARRAY, LEFT, TOP, RIGHT, LINE_SPACING } from 'rave/screen'
export default function (screen) {
  const init = function (view) {
    view.text = view.text || {
      display: '',
      size: 12,
      color: 'black',
      weight: 'normal',
      align: 'left'
    }
  }
  screen.style = function (text) {
    init(this.active)
    for (var i in text) {
      this.active.text[i] = text[i]
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
      const x = view.bounds.x - (view.textbox ? view.textbox.scroll() : 0)
      const y = view.bounds.y + padding[TOP] + margin[TOP]
      const wpm = view.bounds.width
      screen.canvas.fillStyle(view.text.color)
      screen.canvas.font(view.text.size, 'sans-serif')
      screen.canvas.textBaseline('top')
      screen.canvas.textAlign(view.text.align)
      const lines = view.text.display.split('\n')
      lines.forEach((line, index) => {
        let offsetX = padding[LEFT] + margin[LEFT]
        switch (view.text.align) {
          case 'right' : offsetX = wpm - padding[RIGHT] - margin[RIGHT]; break
          case 'center' : offsetX = wpm / 2; break
        }
        screen.canvas.fillText(
          view.input === 'password' ? line.split('').map(it => '\u2022').join('') : line,
          x + offsetX,
          y + index * (view.text.size + LINE_SPACING)
        )
      })
    }
  })
}
