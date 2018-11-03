const SCALE = 1.25

const init = view => {
  view.text = view.text || {
    display: '',
    size: 12,
    color: 'black',
    weight: '',
    align: 'left'
  }
}
export default screen => {
  const { EMPTY_ARRAY, LEFT, RIGHT, TOP } = screen
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
      if (view.textbox) {
        view.textbox.value(display)
      }
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
  screen.plugins.aria.push((view, aria) => Object.assign({}, aria, view.text && view.text.display ? {
    text : view.text.display
  } : {}))
  screen.plugins.wrap.unshift((view, dim) => {
    if ((view.text && view.text.display) || view.input) {
      screen.canvas.font(view.text.size * screen.canvas.getRatio(), 'Polly, sans-serif', view.text.weight)
      const mt = screen.canvas.measureText(view.text.display)
      mt.height *= SCALE
      return {
        [dim]: mt[dim]
      }
    }
  })
  screen.plugins.render.push(view => {
    if (view.text && view.text.display && view.isDirty) {
      const margin = view.margin || EMPTY_ARRAY
      const padding = view.padding || EMPTY_ARRAY
      const scroll = view.textbox ? view.textbox.scroll() : [0, 0]
      const x = view.bounds.x - scroll[0]
      const y = view.bounds.y - scroll[1] + padding[TOP] + margin[TOP]
      const wpm = view.bounds.width
      screen.canvas.fillStyle(view.text.color)
      screen.canvas.font(view.text.size * screen.canvas.getRatio(), 'Polly, sans-serif', view.text.weight)
      screen.canvas.textBaseline('top')
      screen.canvas.textAlign(view.text.align)
      let offsetX = padding[LEFT] + margin[LEFT]
      switch (view.text.align) {
        case 'right' : offsetX = wpm - padding[RIGHT] - margin[RIGHT]; break
        case 'center' : offsetX = wpm / 2; break
      }
      const display = view.input === 'password' ? view.text.display.split('').map(it => '\u2022').join('') : view.text.display
      const cy = (view.text.size * SCALE * screen.canvas.getRatio() / 2) - (view.text.size * screen.canvas.getRatio() / 2)
      display.split('\n').forEach((line, index) => {
        screen.canvas.fillText(
          line,
          x + offsetX,
          y + cy + view.text.size * SCALE * screen.canvas.getRatio() * index
        )
      })
    }
  })
}
