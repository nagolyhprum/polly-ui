const SCALE = 1.25

const init = (view, scale) => {
  view.text = view.text || {
    display: '',
    size: 12 * scale,
    color: 'black',
    weight: '',
    align: 'left'
  }
}
export default screen => {
  const { EMPTY_ARRAY, LEFT, RIGHT, TOP } = screen
  screen.extend({
    style (view, text) {
      init(view, screen.canvas.getRatio())
      for (let i in text) {
        console.log(i, text[i])
        if(typeof text[i] === "number") {
          view.text[i] = text[i] * screen.canvas.getRatio()
        } else {
          view.text[i] = text[i]
        }
      }
    },
    text (view, display) {
      init(view, screen.canvas.getRatio())
      view.text.display = display + ''
      if (view.textbox) {
        view.textbox.value(display)
      }
    },
    textColor (view, textColor) {
      init(view, screen.canvas.getRatio())
      view.text.color = textColor
    },
    textAlign (view, align) {
      init(view, screen.canvas.getRatio())
      view.text.align = align
    }
  })
  screen.plugins.aria.push((view, aria) => Object.assign({}, aria, view.text && view.text.display ? {
    text: view.text.display
  } : {}))
  screen.plugins.wrap.unshift((view, dim) => {
    if ((view.text && view.text.display) || view.input) {
      screen.canvas.font(view.text.size, 'Polly, sans-serif', view.text.weight)
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
      const wpm = view.bounds.width
      screen.canvas.fillStyle(view.text.color)
      screen.canvas.font(view.text.size, 'Polly, sans-serif', view.text.weight)
      screen.canvas.textBaseline('top')
      screen.canvas.textAlign(view.text.align)
      let offsetX = padding[LEFT]
      switch (view.text.align) {
        case 'right' : offsetX = wpm - padding[RIGHT] - margin[RIGHT]; break
        case 'center' : offsetX = wpm / 2; break
      }
      const display = view.input === 'password' ? view.text.display.split('').map(it => '\u2022').join('') : view.text.display
      const cy = padding[TOP]// (view.text.size * SCALE * screen.canvas.getRatio() / 2) - (view.text.size * screen.canvas.getRatio() / 2)
      display.split('\n').forEach((line, index) => {
        screen.canvas.fillText(
          line,
          view.bounds.x + offsetX,
          view.bounds.y + cy + view.text.size * SCALE * index
        )
      })
    }
  })
}
