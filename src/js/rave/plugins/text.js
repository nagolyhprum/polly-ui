import { EMPTY_ARRAY, LEFT, TOP, LINE_SPACING } from 'rave/screen'

export default function(screen) {
  screen.style = function(text) {
    if (text.size) {
      this.active.text.size = text.size
    }
  },
  screen.text = function(display) {
    this.active.text.display = display
  },
  screen.textColor = function(textColor) {
    this.active.text.color = textColor
  },
  screen.textAlign = function(align) {
    this.active.text.align = align
  }
  return function(view) {
    if (view.text.display) {
      const margin = view.margin || EMPTY_ARRAY
      const padding = view.padding || EMPTY_ARRAY
      const x = view.bounds.x
      const y = view.bounds.y

      const wpm = view.bounds.width
      const hpm = view.bounds.height

      const wp = wpm - screen.getLeftRight(margin)
      const hp = hpm - screen.getTopBottom(margin)

      const w = wp - screen.getLeftRight(padding)
      const h = hp - screen.getTopBottom(padding)

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
  }
}
