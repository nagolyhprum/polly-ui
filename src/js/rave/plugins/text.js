const init = view => {
  view.text = view.text || {
    display: '',
    size: 12,
    color: 'black',
    weight: 'normal',
    align: 'left'
  }
}
export default screen => {
  const { EMPTY_ARRAY, LEFT, TOP, RIGHT, LINE_SPACING } = screen
  screen.extend({
    style (view, text) {
      init(view)
      for (let i in text) {
        view.text[i] = text[i]
      }
    },
    text (view, display) {
      init(view)
      view.text.display = display
    },
    textColor (view, textColor) {
      init(view)
      view.text.color = textColor
    },
    textAlign (view, align) {
      init(view)
      view.text.align = align
    }
  })
  screen.plugins.render.push(view => {
    if (view.text && view.text.display) {
      const margin = view.margin || EMPTY_ARRAY
      const padding = view.padding || EMPTY_ARRAY
      const x = view.bounds.x - (view.textbox ? view.textbox.scroll() : 0)
      const y = view.bounds.y + view.bounds.height / 2
      const wpm = view.bounds.width
      screen.canvas.fillStyle(view.text.color)
      screen.canvas.font(view.text.size, 'Roboto')
      screen.canvas.textBaseline('middle')
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
